import {createCookie} from 'react-router';

/**
 * One-time Shopify OAuth setup helpers for /api/shopify-oauth/*.
 *
 * Server-only. `SHOPIFY_ADMIN_CLIENT_SECRET` is read by the callback route
 * and used here for HMAC verification and the token exchange; it must never
 * be imported into a component or otherwise reach the client bundle.
 */

/**
 * The only shop this flow will ever authorize. Hard-coded rather than taken
 * from the environment so a mistyped or swapped `SHOPIFY_ADMIN_SHOP` cannot
 * point the flow at another store.
 */
export const ALLOWED_SHOP = 'the-fold-tech.myshopify.com';

/** The single scope this app requests. */
export const REQUESTED_SCOPES = 'write_customers';

export const STATE_COOKIE_NAME = 'shopify_oauth_state';

/** The CSRF state is only in flight for one redirect round trip. */
const STATE_COOKIE_MAX_AGE = 600;

export function htmlResponse(body: string, status = 200) {
  return new Response(body, {
    status,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      // Never let a proxy or the browser retain a page that may hold a token.
      'cache-control': 'no-store, no-cache, must-revalidate, private',
      'referrer-policy': 'no-referrer',
      'x-robots-tag': 'noindex, nofollow',
    },
  });
}

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Names of the variables that are absent or empty on `context.env`, in the
 * order given. Names only — a value is never returned or rendered.
 */
export function missingEnvNames(values: Record<string, string | undefined>) {
  return Object.entries(values)
    .filter(([, value]) => !value)
    .map(([name]) => name);
}

/**
 * Signed, httpOnly cookie holding the CSRF state between the start redirect
 * and the callback. Signed with `SESSION_SECRET`, the same secret the app's
 * session cookie already uses. `sameSite: 'lax'` still sends the cookie on
 * Shopify's top-level GET redirect back to the callback.
 */
export function createStateCookie(request: Request, secret: string) {
  return createCookie(STATE_COOKIE_NAME, {
    httpOnly: true,
    path: '/api/shopify-oauth',
    sameSite: 'lax',
    secure: new URL(request.url).protocol === 'https:',
    maxAge: STATE_COOKIE_MAX_AGE,
    secrets: [secret],
  });
}

export function generateState() {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);

  return Array.from(bytes, (byte) =>
    byte.toString(16).padStart(2, '0'),
  ).join('');
}

/**
 * Length-independent constant-time comparison, so neither the state check nor
 * the HMAC check leaks the expected value through response timing.
 */
export function safeEqual(a: string, b: string) {
  const encoder = new TextEncoder();
  const left = encoder.encode(a);
  const right = encoder.encode(b);

  let mismatch = left.length ^ right.length;

  for (let index = 0; index < left.length; index++) {
    mismatch |= left[index] ^ (right[index] ?? 0);
  }

  return mismatch === 0;
}

/**
 * Build the message Shopify signs: every query parameter except `hmac` and
 * `signature`, with `%`, `&` (and `=` in keys) percent-encoded, sorted
 * lexicographically as `key=value` pairs and joined with `&`.
 */
function buildHmacMessage(url: URL) {
  const params = new URLSearchParams(url.search);

  params.delete('hmac');
  params.delete('signature');

  return Array.from(params.entries())
    .map(([key, value]) => {
      const encodedKey = key
        .replace(/%/g, '%25')
        .replace(/&/g, '%26')
        .replace(/=/g, '%3D');
      const encodedValue = value
        .replace(/%/g, '%25')
        .replace(/&/g, '%26');

      return `${encodedKey}=${encodedValue}`;
    })
    .sort()
    .join('&');
}

/**
 * Verify the `hmac` query parameter Shopify appends to the callback, proving
 * the redirect came from Shopify and was not tampered with in transit.
 */
export async function verifyCallbackHmac(url: URL, clientSecret: string) {
  const provided = url.searchParams.get('hmac');

  if (!provided) {
    return false;
  }

  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(clientSecret),
    {name: 'HMAC', hash: 'SHA-256'},
    false,
    ['sign'],
  );

  const signature = await crypto.subtle.sign(
    'HMAC',
    key,
    new TextEncoder().encode(buildHmacMessage(url)),
  );

  const expected = Array.from(new Uint8Array(signature), (byte) =>
    byte.toString(16).padStart(2, '0'),
  ).join('');

  return safeEqual(expected, provided.toLowerCase());
}
