import type {Route} from './+types/api.newsletter-subscribe';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** RFC 5321 caps an address at 254 characters. */
const EMAIL_MAX_LENGTH = 254;

const GENERIC_ERROR = 'We could not sign you up right now. Please try again.';

/**
 * Shopify's native, credential-free way to opt an email into marketing: the
 * Storefront API's `customerCreate`, with `acceptsMarketing: true`. This uses
 * the same public Storefront client the rest of the app already queries with
 * — no Admin API token, no custom app, no OAuth.
 */
const CUSTOMER_CREATE_MUTATION = `#graphql
  mutation NewsletterCustomerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
` as const;

type CustomerUserError = {
  code?: string | null;
  field?: string[] | null;
  message: string;
};

type CustomerCreateData = {
  customerCreate: {
    customer: {id: string} | null;
    customerUserErrors: CustomerUserError[];
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
 * `customerCreate` requires a password even though this is a marketing-only
 * signup with no account for the visitor to log into. Generated fresh per
 * request and discarded immediately after — never logged, stored, or
 * returned to the client.
 */
function generateThrowawayPassword() {
  // Shopify caps customer passwords at 40 characters; 16 bytes -> 32 hex chars.
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);

  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join(
    '',
  );
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

  try {
    const data = await context.storefront.mutate<CustomerCreateData>(
      CUSTOMER_CREATE_MUTATION,
      {
        variables: {
          input: {
            email,
            password: generateThrowawayPassword(),
            acceptsMarketing: true,
          },
        },
      },
    );

    const errors = data.customerCreate?.customerUserErrors ?? [];

    /*
     * An email that already belongs to a Shopify customer can't be created
     * again through this public mutation, and updating an existing
     * customer's marketing consent needs either their own logged-in session
     * or the Admin API — neither of which this flow uses. Treating "taken"
     * as success avoids showing an existing customer a confusing error for
     * simply already being known to the store.
     */
    const isTaken = errors.some((error) => error.code === 'TAKEN');

    if (!errors.length || isTaken) {
      console.log(
        `[newsletter-subscribe] SUCCESS — ${
          isTaken ? 'existing' : 'new'
        } customer "${email}" opted into marketing.`,
      );

      return jsonResponse({ok: true});
    }

    console.error(
      `[newsletter-subscribe] FAIL — customerCreate rejected "${email}". Reason: ${errors
        .map((error) => error.message)
        .join('; ')}`,
    );

    return jsonResponse({ok: false, error: GENERIC_ERROR}, 502);
  } catch (error) {
    console.error(
      `[newsletter-subscribe] FAIL — Storefront API request failed for "${email}". Reason: ${
        error instanceof Error ? error.message : String(error)
      }`,
    );

    return jsonResponse({ok: false, error: GENERIC_ERROR}, 502);
  }
}
