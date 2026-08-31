import type {Route} from './+types/api.newsletter-subscribe';

/**
 * Admin API version these operations were written against. Kept in step with
 * the Storefront/Customer Account version Hydrogen 2026.1.0 ships.
 */
const ADMIN_API_VERSION = '2026-01';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** RFC 5321 caps an address at 254 characters. */
const EMAIL_MAX_LENGTH = 254;

const GENERIC_ERROR = 'We could not sign you up right now. Please try again.';

/**
 * States the consent mutation cannot move a customer out of. REDACTED and
 * INVALID are read-only, and an already-SUBSCRIBED customer needs no write.
 */
const CONSENT_LOCKED_STATES = ['SUBSCRIBED', 'REDACTED', 'INVALID'];

const CUSTOMER_LOOKUP_QUERY = `#graphql
  query NewsletterCustomerLookup($query: String!) {
    customers(first: 1, query: $query) {
      nodes {
        id
        defaultEmailAddress {
          emailAddress
          marketingState
        }
      }
    }
  }
` as const;

const CUSTOMER_CREATE_MUTATION = `#graphql
  mutation NewsletterCustomerCreate($input: CustomerInput!) {
    customerCreate(input: $input) {
      customer {
        id
        defaultEmailAddress {
          emailAddress
          marketingState
        }
      }
      userErrors {
        field
        message
      }
    }
  }
` as const;

const CUSTOMER_CONSENT_MUTATION = `#graphql
  mutation NewsletterConsentUpdate(
    $input: CustomerEmailMarketingConsentUpdateInput!
  ) {
    customerEmailMarketingConsentUpdate(input: $input) {
      customer {
        id
        defaultEmailAddress {
          emailAddress
          marketingState
        }
      }
      userErrors {
        field
        message
      }
    }
  }
` as const;

type UserError = {field?: string[] | null; message: string};

type CustomerNode = {
  id: string;
  defaultEmailAddress?: {
    emailAddress?: string | null;
    marketingState?: string | null;
  } | null;
};

type LookupData = {customers: {nodes: CustomerNode[]}};

type CreateData = {
  customerCreate: {
    customer: CustomerNode | null;
    userErrors: UserError[];
  } | null;
};

type ConsentData = {
  customerEmailMarketingConsentUpdate: {
    customer: CustomerNode | null;
    userErrors: UserError[];
  } | null;
};

function jsonResponse(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    },
  });
}

function readField(form: FormData, name: string) {
  const value = form.get(name);

  return typeof value === 'string' ? value.trim() : '';
}

/**
 * Shopify's search syntax takes a quoted string, so a backslash or double
 * quote in the address has to be escaped or it could break out of the
 * `email:"…"` term and change which customer the lookup matches.
 */
function escapeSearchValue(value: string) {
  return value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

class AdminApiError extends Error {}

/**
 * The only entry point to the Admin API. The access token is read from
 * `context.env` inside this server-only route and never reaches the browser.
 */
async function adminGraphql<TData>(
  storeDomain: string,
  accessToken: string,
  query: string,
  variables: Record<string, unknown>,
): Promise<TData> {
  const endpoint = `https://${storeDomain}/admin/api/${ADMIN_API_VERSION}/graphql.json`;

  let response: Response;

  try {
    response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'X-Shopify-Access-Token': accessToken,
      },
      body: JSON.stringify({query, variables}),
    });
  } catch (error) {
    throw new AdminApiError(
      `could not reach the Admin API. Reason: ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
  }

  const body = await response.text();

  if (!response.ok) {
    throw new AdminApiError(
      `HTTP ${response.status} ${response.statusText}. Body: ${
        body || '(empty response body)'
      }`,
    );
  }

  let payload: {data?: TData; errors?: {message: string}[]};

  try {
    payload = JSON.parse(body) as typeof payload;
  } catch {
    throw new AdminApiError(
      `the Admin API returned a non-JSON body: ${body || '(empty)'}`,
    );
  }

  if (payload.errors?.length) {
    throw new AdminApiError(
      `GraphQL errors: ${payload.errors
        .map((error) => error.message)
        .join('; ')}`,
    );
  }

  if (!payload.data) {
    throw new AdminApiError('the Admin API returned no data.');
  }

  return payload.data;
}

async function findCustomerByEmail(
  storeDomain: string,
  accessToken: string,
  email: string,
) {
  const data = await adminGraphql<LookupData>(
    storeDomain,
    accessToken,
    CUSTOMER_LOOKUP_QUERY,
    {query: `email:"${escapeSearchValue(email)}"`},
  );

  return data.customers.nodes[0] ?? null;
}

async function subscribeExistingCustomer(
  storeDomain: string,
  accessToken: string,
  customerId: string,
  consentUpdatedAt: string,
) {
  const data = await adminGraphql<ConsentData>(
    storeDomain,
    accessToken,
    CUSTOMER_CONSENT_MUTATION,
    {
      input: {
        customerId,
        emailMarketingConsent: {
          marketingState: 'SUBSCRIBED',
          marketingOptInLevel: 'SINGLE_OPT_IN',
          consentUpdatedAt,
        },
      },
    },
  );

  return data.customerEmailMarketingConsentUpdate?.userErrors ?? [];
}

/**
 * Subscribe a customer that already exists, unless their consent state is one
 * the mutation cannot write. Returns the JSON response for either outcome.
 */
async function subscribeFoundCustomer(
  storeDomain: string,
  accessToken: string,
  customer: CustomerNode,
  email: string,
  consentUpdatedAt: string,
) {
  const state = customer.defaultEmailAddress?.marketingState ?? '';

  if (CONSENT_LOCKED_STATES.includes(state)) {
    console.log(
      `[newsletter-subscribe] SUCCESS — "${email}" already exists with marketing state ${state}. No write performed.`,
    );

    return jsonResponse({ok: true});
  }

  const consentErrors = await subscribeExistingCustomer(
    storeDomain,
    accessToken,
    customer.id,
    consentUpdatedAt,
  );

  if (consentErrors.length) {
    console.error(
      `[newsletter-subscribe] FAIL — could not update marketing consent for "${email}". Reason: ${consentErrors
        .map((error) => error.message)
        .join('; ')}`,
    );

    return jsonResponse({ok: false, error: GENERIC_ERROR}, 502);
  }

  console.log(
    `[newsletter-subscribe] SUCCESS — updated marketing consent for existing customer "${email}".`,
  );

  return jsonResponse({ok: true});
}

export async function loader() {
  return jsonResponse({error: 'Method not allowed.'}, 405);
}

export async function action({context, request}: Route.ActionArgs) {
  if (request.method !== 'POST') {
    return jsonResponse({error: 'Method not allowed.'}, 405);
  }

  let form: FormData;

  try {
    form = await request.formData();
  } catch {
    return jsonResponse(
      {error: 'We could not read that submission. Please try again.'},
      400,
    );
  }

  const email = readField(form, 'email');

  if (!email) {
    return jsonResponse({error: 'Please enter your email address.'}, 400);
  }

  if (email.length > EMAIL_MAX_LENGTH || !EMAIL_PATTERN.test(email)) {
    return jsonResponse({error: 'Please enter a valid email address.'}, 400);
  }

  const storeDomain = context.env.PUBLIC_STORE_DOMAIN;
  const accessToken = context.env.PRIVATE_ADMIN_API_ACCESS_TOKEN;

  if (!storeDomain || !accessToken) {
    console.error(
      '[newsletter-subscribe] FAIL — the Shopify Admin API is not configured. Missing env var(s):',
      {
        PUBLIC_STORE_DOMAIN: Boolean(storeDomain),
        PRIVATE_ADMIN_API_ACCESS_TOKEN: Boolean(accessToken),
      },
    );

    return jsonResponse({ok: false, error: GENERIC_ERROR}, 500);
  }

  const consentUpdatedAt = new Date().toISOString();

  try {
    const existing = await findCustomerByEmail(storeDomain, accessToken, email);

    if (existing) {
      return subscribeFoundCustomer(
        storeDomain,
        accessToken,
        existing,
        email,
        consentUpdatedAt,
      );
    }

    const created = await adminGraphql<CreateData>(
      storeDomain,
      accessToken,
      CUSTOMER_CREATE_MUTATION,
      {
        input: {
          email,
          emailMarketingConsent: {
            marketingState: 'SUBSCRIBED',
            marketingOptInLevel: 'SINGLE_OPT_IN',
            consentUpdatedAt,
          },
        },
      },
    );

    const createErrors = created.customerCreate?.userErrors ?? [];

    if (!createErrors.length) {
      console.log(
        `[newsletter-subscribe] SUCCESS — created subscribed customer "${email}".`,
      );

      return jsonResponse({ok: true});
    }

    /*
     * The customer search index is eventually consistent, so a record created
     * moments ago can be missed by the lookup above and then rejected here as
     * a duplicate. Re-read it and update that customer rather than surfacing
     * an error or creating a second record.
     */
    const isTaken = createErrors.some((error) =>
      /taken|already/i.test(error.message),
    );

    if (!isTaken) {
      console.error(
        `[newsletter-subscribe] FAIL — customerCreate rejected "${email}". Reason: ${createErrors
          .map((error) => error.message)
          .join('; ')}`,
      );

      return jsonResponse({ok: false, error: GENERIC_ERROR}, 502);
    }

    const duplicate = await findCustomerByEmail(storeDomain, accessToken, email);

    if (!duplicate) {
      console.error(
        `[newsletter-subscribe] FAIL — "${email}" was reported as taken but could not be found for a consent update.`,
      );

      return jsonResponse({ok: false, error: GENERIC_ERROR}, 502);
    }

    return subscribeFoundCustomer(
      storeDomain,
      accessToken,
      duplicate,
      email,
      consentUpdatedAt,
    );
  } catch (error) {
    console.error(
      `[newsletter-subscribe] FAIL — Admin API request failed for "${email}". Reason: ${
        error instanceof Error ? error.message : String(error)
      }`,
    );

    return jsonResponse({ok: false, error: GENERIC_ERROR}, 502);
  }
}
