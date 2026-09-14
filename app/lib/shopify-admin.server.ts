/**
 * Minimal Shopify Admin GraphQL client.
 *
 * The Storefront API cannot write to the customer database beyond
 * `customerCreate` (which fails outright for an email that already exists and
 * cannot set tags, notes or metafields). Lead capture needs all of that, so it
 * goes through the store's custom-app Admin token instead.
 *
 * Server-only: the token lives in `context.env` and must never reach the
 * browser. The `.server.ts` suffix keeps this module out of the client bundle.
 */

export type AdminUserError = {
  field?: string[] | null;
  message: string;
};

export class AdminApiError extends Error {}

type AdminEnv = {
  SHOPIFY_STORE_DOMAIN?: string;
  SHOPIFY_ADMIN_TOKEN?: string;
  SHOPIFY_API_VERSION?: string;
};

/** Matches the version pinned in `.env`; only used if that var is missing. */
const FALLBACK_API_VERSION = '2026-07';

type GraphQLResponse<TData> = {
  data?: TData | null;
  errors?: {message: string}[];
};

/**
 * Runs one Admin GraphQL operation and returns its `data`.
 *
 * Throws `AdminApiError` for anything that is not a usable response —
 * missing credentials, a non-2xx status, or top-level GraphQL errors. Field
 * level `userErrors` are left to the caller, since those are business
 * outcomes (e.g. "email has already been taken") rather than failures.
 */
export async function adminGraphql<TData>(
  env: AdminEnv,
  query: string,
  variables?: Record<string, unknown>,
): Promise<TData> {
  const domain = env.SHOPIFY_STORE_DOMAIN;
  const token = env.SHOPIFY_ADMIN_TOKEN;
  const version = env.SHOPIFY_API_VERSION || FALLBACK_API_VERSION;

  if (!domain || !token) {
    throw new AdminApiError(
      'Shopify Admin API is not configured. Missing SHOPIFY_STORE_DOMAIN and/or SHOPIFY_ADMIN_TOKEN.',
    );
  }

  const response = await fetch(
    `https://${domain}/admin/api/${version}/graphql.json`,
    {
      method: 'POST',
      headers: {
        'X-Shopify-Access-Token': token,
        'content-type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({query, variables}),
    },
  );

  const body = await response.text();

  if (!response.ok) {
    throw new AdminApiError(
      `Admin API returned HTTP ${response.status} ${response.statusText}: ${
        body || '(empty response body)'
      }`,
    );
  }

  let parsed: GraphQLResponse<TData>;

  try {
    parsed = JSON.parse(body) as GraphQLResponse<TData>;
  } catch {
    throw new AdminApiError(
      `Admin API returned a non-JSON response: ${body.slice(0, 500)}`,
    );
  }

  if (parsed.errors?.length) {
    throw new AdminApiError(
      parsed.errors.map((error) => error.message).join('; '),
    );
  }

  if (!parsed.data) {
    throw new AdminApiError('Admin API returned no data.');
  }

  return parsed.data;
}

/** Formats `userErrors` into one line for logging. */
export function formatUserErrors(errors: AdminUserError[]) {
  return errors
    .map((error) =>
      error.field?.length
        ? `${error.field.join('.')}: ${error.message}`
        : error.message,
    )
    .join('; ');
}

/* =========================================================
   LEAD CAPTURE
   ========================================================= */

export type LeadMetafield = {
  namespace: string;
  key: string;
  type: string;
  value: string;
  /**
   * Written only when the customer is newly created. With
   * `preserveExistingProfile`, an existing customer's value is left alone.
   */
  onlyIfNew?: boolean;
};

export type CustomerLead = {
  email: string;
  firstName?: string;
  lastName?: string;
  /** Written to the native customer field only if it is valid E.164. */
  phone?: string;
  /** Replaces the customer's note. Visible on the admin customer page. */
  note?: string;
  /** Added to whatever tags the customer already has; never replaces them. */
  tags: readonly string[];
  metafields: readonly LeadMetafield[];
  /**
   * Only ever true when the visitor actively opted in. False leaves an
   * existing customer's consent untouched rather than unsubscribing them.
   */
  subscribeToMarketing: boolean;
  /**
   * For forms anyone can submit with any email address. When the email
   * belongs to an existing customer, their name, phone, note and `onlyIfNew`
   * metafields are not touched — only tags and the remaining metafields are
   * added — and someone who unsubscribed is never re-subscribed. Without this,
   * a stranger could rewrite a real customer's record just by knowing their
   * email.
   */
  preserveExistingProfile?: boolean;
};

export type UpsertLeadResult =
  | {
      ok: true;
      customerId: string;
      /** False when an existing customer was updated in place. */
      created: boolean;
      /** Set when the lead saved but marketing consent did not apply. */
      consentWarning?: string;
    }
  | {ok: false; reason: string};

/**
 * Shopify's rules for a customer phone number are strict and not fully
 * documented: it wants E.164, rejects numbers already held by another
 * customer, and refuses some well-formed values outright. A rejected phone
 * fails the entire mutation, which would lose an otherwise good lead over a
 * formatting detail.
 *
 * So the phone is offered optimistically and dropped on the retry if Shopify
 * objects to it — see `runLeadMutation`. Callers additionally store the raw
 * value in a metafield, which has no such constraints, so the number is never
 * lost even when the native field will not take it.
 */
const E164_PATTERN = /^\+[1-9]\d{7,14}$/;

/** True when every error Shopify returned is about the phone field. */
function isPhoneOnlyFailure(errors: AdminUserError[]) {
  return (
    errors.length > 0 &&
    errors.every(
      (error) =>
        error.field?.includes('phone') || /phone/i.test(error.message),
    )
  );
}

const LEAD_CREATE_MUTATION = `#graphql
  mutation LeadCustomerCreate($input: CustomerInput!) {
    customerCreate(input: $input) {
      customer {
        id
      }
      userErrors {
        field
        message
      }
    }
  }
` as const;

/*
 * An exact lookup rather than `customers(query: "email:…")`. The search index
 * lags writes by seconds, so a customer created moments earlier is not
 * findable by search — and worse, a tokenized email can match a *different*
 * customer, writing one visitor's lead onto someone else's record.
 */
const LEAD_BY_EMAIL_QUERY = `#graphql
  query LeadCustomerByEmail($email: String!) {
    customerByIdentifier(identifier: {emailAddress: $email}) {
      id
      defaultEmailAddress {
        marketingState
      }
    }
  }
` as const;

/*
 * `customerUpdate` replaces the whole tag list, so tags go through `tagsAdd`
 * and the customer keeps any tags they already carry. Both run in one
 * document; GraphQL executes root mutation fields in order.
 */
const LEAD_UPDATE_MUTATION = `#graphql
  mutation LeadCustomerUpdate(
    $input: CustomerInput!
    $id: ID!
    $tags: [String!]!
  ) {
    customerUpdate(input: $input) {
      customer {
        id
      }
      userErrors {
        field
        message
      }
    }
    tagsAdd(id: $id, tags: $tags) {
      userErrors {
        field
        message
      }
    }
  }
` as const;

/*
 * Consent needs its own mutation: `customerUpdate` rejects an
 * `emailMarketingConsent` input outright ("please use the
 * customerEmailMarketingConsentUpdate Mutation instead") and fails the entire
 * update along with it. `customerCreate` is the exception and takes it inline.
 */
const LEAD_CONSENT_MUTATION = `#graphql
  mutation LeadCustomerConsent(
    $input: CustomerEmailMarketingConsentUpdateInput!
  ) {
    customerEmailMarketingConsentUpdate(input: $input) {
      customer {
        id
      }
      userErrors {
        field
        message
      }
    }
  }
` as const;

type LeadMutationPayload = {
  customer: {id: string} | null;
  userErrors: AdminUserError[];
} | null;

/**
 * Writes a form submission into the Shopify customer database.
 *
 * Creates the customer when the email is new and updates them in place when it
 * is not, so a repeat enquiry enriches the existing record instead of failing.
 * Never throws for a business outcome — callers get `{ok: false, reason}` and
 * decide whether that should fail the visitor's submission.
 */
export async function upsertCustomerLead(
  env: AdminEnv,
  lead: CustomerLead,
): Promise<UpsertLeadResult> {
  const consentUpdatedAt = new Date().toISOString();

  const emailMarketingConsent = lead.subscribeToMarketing
    ? {
        marketingState: 'SUBSCRIBED',
        marketingOptInLevel: 'SINGLE_OPT_IN',
        consentUpdatedAt,
      }
    : undefined;

  // `onlyIfNew` is local bookkeeping; the Admin API rejects unknown input fields.
  const toMetafieldInput = ({onlyIfNew: _onlyIfNew, ...metafield}: LeadMetafield) =>
    metafield;

  const shared = {
    firstName: lead.firstName || undefined,
    lastName: lead.lastName || undefined,
    note: lead.note || undefined,
    metafields: lead.metafields.map(toMetafieldInput),
  };

  /** What an existing customer receives when their profile is preserved. */
  const enrichOnly = {
    metafields: lead.metafields
      .filter((metafield) => !metafield.onlyIfNew)
      .map(toMetafieldInput),
  };

  // Offered only when it is already E.164; dropped on retry if Shopify balks.
  const phone =
    lead.phone && E164_PATTERN.test(lead.phone) ? lead.phone : undefined;

  /**
   * Runs a lead mutation, retrying once without the phone number if that is
   * the only thing Shopify objected to. Returns the errors from whichever
   * attempt was decisive.
   */
  async function runLeadMutation<TData>(
    query: string,
    buildVariables: (input: Record<string, unknown>) => Record<string, unknown>,
    readErrors: (data: TData) => AdminUserError[],
    base: Record<string, unknown> = shared,
  ): Promise<{data: TData; errors: AdminUserError[]}> {
    if (base !== shared) {
      const data = await adminGraphql<TData>(env, query, buildVariables(base));

      return {data, errors: readErrors(data)};
    }

    const withPhone = phone ? {...shared, phone} : shared;

    const first = await adminGraphql<TData>(
      env,
      query,
      buildVariables(withPhone),
    );

    const firstErrors = readErrors(first);

    if (!phone || !isPhoneOnlyFailure(firstErrors)) {
      return {data: first, errors: firstErrors};
    }

    const retried = await adminGraphql<TData>(
      env,
      query,
      buildVariables(shared),
    );

    return {data: retried, errors: readErrors(retried)};
  }

  const {data: created, errors: createErrors} = await runLeadMutation<{
    customerCreate: LeadMutationPayload;
  }>(
    LEAD_CREATE_MUTATION,
    (input) => ({
      input: {
        ...input,
        email: lead.email,
        tags: [...lead.tags],
        ...(emailMarketingConsent ? {emailMarketingConsent} : {}),
      },
    }),
    (data) => data.customerCreate?.userErrors ?? [],
  );

  const newCustomerId = created.customerCreate?.customer?.id;

  if (!createErrors.length && newCustomerId) {
    return {ok: true, customerId: newCustomerId, created: true};
  }

  const isTaken = createErrors.some((error) =>
    /already been taken|already exists/i.test(error.message),
  );

  if (!isTaken) {
    return {
      ok: false,
      reason: `customerCreate rejected the lead: ${formatUserErrors(
        createErrors,
      )}`,
    };
  }

  const found = await adminGraphql<{
    customerByIdentifier: {
      id: string;
      defaultEmailAddress: {marketingState: string | null} | null;
    } | null;
  }>(env, LEAD_BY_EMAIL_QUERY, {email: lead.email});

  const existingId = found.customerByIdentifier?.id;
  const existingMarketingState =
    found.customerByIdentifier?.defaultEmailAddress?.marketingState ?? null;

  if (!existingId) {
    return {
      ok: false,
      reason: 'the email is already taken but no matching customer was found',
    };
  }

  const {errors: updateErrors} = await runLeadMutation<{
    customerUpdate: LeadMutationPayload;
    tagsAdd: {userErrors: AdminUserError[]} | null;
  }>(
    LEAD_UPDATE_MUTATION,
    (input) => ({
      id: existingId,
      tags: [...lead.tags],
      input: {...input, id: existingId},
    }),
    (data) => [
      ...(data.customerUpdate?.userErrors ?? []),
      ...(data.tagsAdd?.userErrors ?? []),
    ],
    lead.preserveExistingProfile ? enrichOnly : shared,
  );

  if (updateErrors.length) {
    return {
      ok: false,
      reason: `updating customer ${existingId} was rejected: ${formatUserErrors(
        updateErrors,
      )}`,
    };
  }

  /*
   * The lead itself is saved by this point, so a consent failure is reported
   * as a warning rather than a failure — telling someone their submission did
   * not go through when it did would be worse than a missed opt-in.
   */
  let consentWarning: string | undefined;

  /*
   * An anonymous form cannot prove the visitor owns the address, so it may
   * opt in someone who never had a preference — but it must not overturn an
   * explicit unsubscribe, a pending confirmation, or an invalid address.
   */
  const mayChangeConsent =
    !lead.preserveExistingProfile ||
    existingMarketingState === null ||
    existingMarketingState === 'NOT_SUBSCRIBED';

  if (emailMarketingConsent && !mayChangeConsent) {
    if (existingMarketingState !== 'SUBSCRIBED') {
      consentWarning = `consent left unchanged; the customer's marketing state is ${existingMarketingState}`;
    }
  } else if (emailMarketingConsent) {
    try {
      const consent = await adminGraphql<{
        customerEmailMarketingConsentUpdate: {
          userErrors: AdminUserError[];
        } | null;
      }>(env, LEAD_CONSENT_MUTATION, {
        input: {customerId: existingId, emailMarketingConsent},
      });

      const consentErrors =
        consent.customerEmailMarketingConsentUpdate?.userErrors ?? [];

      if (consentErrors.length) {
        consentWarning = formatUserErrors(consentErrors);
      }
    } catch (error) {
      consentWarning = error instanceof Error ? error.message : String(error);
    }
  }

  return {ok: true, customerId: existingId, created: false, consentWarning};
}

/**
 * Turns a form answer into a Shopify tag.
 *
 * Commas separate tags in Shopify, so a raw value like "$10,000 - $25,000"
 * would silently split into two. The metafield keeps the exact wording; the
 * tag only has to be stable and segmentable.
 */
export function toTagSlug(prefix: string, value: string) {
  const slug = value
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 200);

  return slug ? `${prefix}-${slug}` : '';
}
