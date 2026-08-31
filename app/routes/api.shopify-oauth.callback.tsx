import type {Route} from './+types/api.shopify-oauth.callback';
import {
  ALLOWED_SHOP,
  REQUESTED_SCOPES,
  createStateCookie,
  escapeHtml,
  htmlResponse,
  missingEnvNames,
  safeEqual,
  verifyCallbackHmac,
} from '~/lib/shopify-oauth.server';

type TokenResponse = {
  access_token?: string;
  scope?: string;
  /** Present only on per-user (online) tokens, which this flow rejects. */
  expires_in?: number;
  associated_user?: unknown;
};

/**
 * Renders the token once, in the browser that ran the flow. It is never
 * logged and never written to disk — the operator copies it from here into
 * their secret store.
 */
function tokenPage(token: string, scope: string) {
  return `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><title>Shopify offline token</title></head>
<body style="font-family: system-ui, sans-serif; max-width: 46rem; margin: 3rem auto; padding: 0 1rem; line-height: 1.6;">
  <h1>Offline Admin API token issued</h1>
  <p>Shop: <strong>${escapeHtml(ALLOWED_SHOP)}</strong><br>Granted scopes: <strong>${escapeHtml(scope)}</strong></p>
  <p>Copy this value now — it is shown only here and is not stored or logged anywhere:</p>
  <pre style="padding: 1rem; background: #f4f4f5; border: 1px solid #d4d4d8; border-radius: 0.5rem; overflow-x: auto; user-select: all;">${escapeHtml(token)}</pre>
  <p>Save it as <code>PRIVATE_ADMIN_API_ACCESS_TOKEN</code>, then close this tab. Do not paste it into a file that is committed to git.</p>
</body>
</html>`;
}

/**
 * Step 2 of the one-time Shopify OAuth setup. Shopify redirects here with
 * `code`, `hmac`, `shop`, `state` and `timestamp`. Every one of those is
 * checked before the authorization code is exchanged.
 */
export async function loader({context, request}: Route.LoaderArgs) {
  if (context.env.PRIVATE_ADMIN_API_ACCESS_TOKEN) {
    return htmlResponse(
      '<h1>Already authorized</h1><p>PRIVATE_ADMIN_API_ACCESS_TOKEN is already set. Unset it to run this flow again.</p>',
      409,
    );
  }

  const clientId = context.env.SHOPIFY_ADMIN_CLIENT_ID;
  const clientSecret = context.env.SHOPIFY_ADMIN_CLIENT_SECRET;
  const sessionSecret = context.env.SESSION_SECRET;

  const missing = missingEnvNames({
    SHOPIFY_ADMIN_CLIENT_ID: clientId,
    SHOPIFY_ADMIN_CLIENT_SECRET: clientSecret,
    SESSION_SECRET: sessionSecret,
  });

  if (missing.length) {
    console.error(
      `[shopify-oauth/callback] FAIL — the OAuth flow is not configured. Missing env var(s): ${missing.join(
        ', ',
      )}`,
    );

    return htmlResponse(
      '<h1>Not configured</h1><p>The Shopify OAuth environment variables are not all set for this deployment.</p>',
      500,
    );
  }

  const url = new URL(request.url);
  const shop = url.searchParams.get('shop') ?? '';
  const code = url.searchParams.get('code') ?? '';
  const state = url.searchParams.get('state') ?? '';

  // 1. Only ever authorize the one hard-coded shop.
  if (shop !== ALLOWED_SHOP) {
    console.error(
      `[shopify-oauth/callback] FAIL — rejected callback for shop "${shop}". Only ${ALLOWED_SHOP} is allowed.`,
    );

    return htmlResponse(
      '<h1>Shop not allowed</h1><p>This callback only accepts a single, fixed shop.</p>',
      403,
    );
  }

  // 2. CSRF: the state must match the one this server issued.
  const stateCookie = createStateCookie(request, sessionSecret);
  const expectedState = (await stateCookie.parse(
    request.headers.get('Cookie'),
  )) as string | null;

  if (!state || !expectedState || !safeEqual(expectedState, state)) {
    console.error(
      '[shopify-oauth/callback] FAIL — state mismatch or missing state cookie. Possible CSRF, or the flow was not started at /api/shopify-oauth/start.',
    );

    return htmlResponse(
      '<h1>Invalid state</h1><p>Start the flow again at <code>/api/shopify-oauth/start</code>.</p>',
      403,
    );
  }

  // 3. Proof the redirect really came from Shopify and was not tampered with.
  if (!(await verifyCallbackHmac(url, clientSecret))) {
    console.error(
      '[shopify-oauth/callback] FAIL — HMAC verification failed. The callback was not signed by Shopify.',
    );

    return htmlResponse(
      '<h1>Invalid signature</h1><p>The callback could not be verified.</p>',
      403,
    );
  }

  if (!code) {
    return htmlResponse(
      '<h1>Missing code</h1><p>Shopify did not return an authorization code.</p>',
      400,
    );
  }

  // 4. Exchange the code server-side. The client secret never leaves here.
  let response: Response;

  try {
    response = await fetch(`https://${ALLOWED_SHOP}/admin/oauth/access_token`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
      }),
    });
  } catch (error) {
    console.error(
      `[shopify-oauth/callback] FAIL — could not reach Shopify's token endpoint. Reason: ${
        error instanceof Error ? error.message : String(error)
      }`,
    );

    return htmlResponse(
      '<h1>Token exchange failed</h1><p>Shopify could not be reached.</p>',
      502,
    );
  }

  if (!response.ok) {
    // The body can echo request details, so log the status only.
    console.error(
      `[shopify-oauth/callback] FAIL — Shopify rejected the token exchange. HTTP ${response.status} ${response.statusText}.`,
    );

    return htmlResponse(
      '<h1>Token exchange failed</h1><p>Shopify rejected the authorization code. Start the flow again.</p>',
      502,
    );
  }

  let payload: TokenResponse;

  try {
    payload = (await response.json()) as TokenResponse;
  } catch {
    console.error(
      '[shopify-oauth/callback] FAIL — Shopify returned a non-JSON token response.',
    );

    return htmlResponse(
      '<h1>Token exchange failed</h1><p>Shopify returned an unexpected response.</p>',
      502,
    );
  }

  const token = payload.access_token;

  if (!token) {
    console.error(
      '[shopify-oauth/callback] FAIL — the token response contained no access_token.',
    );

    return htmlResponse(
      '<h1>Token exchange failed</h1><p>No access token was returned.</p>',
      502,
    );
  }

  /*
   * An offline token has no expiry and no associated user. If either appears,
   * an online token was issued and must not be used as a long-lived secret.
   */
  if (payload.expires_in !== undefined || payload.associated_user) {
    console.error(
      '[shopify-oauth/callback] FAIL — Shopify issued an online (per-user) token, not an offline one.',
    );

    return htmlResponse(
      '<h1>Wrong token type</h1><p>An online token was issued. Remove any <code>grant_options[]=per-user</code> from the app configuration and try again.</p>',
      500,
    );
  }

  const scope = payload.scope ?? '';

  if (!scope.split(',').includes(REQUESTED_SCOPES)) {
    console.error(
      `[shopify-oauth/callback] FAIL — the token is missing ${REQUESTED_SCOPES}. Granted: ${scope}`,
    );

    return htmlResponse(
      `<h1>Missing scope</h1><p>The token was granted <code>${escapeHtml(
        scope,
      )}</code> but <code>${REQUESTED_SCOPES}</code> is required.</p>`,
      500,
    );
  }

  console.log(
    `[shopify-oauth/callback] SUCCESS — offline token issued for ${ALLOWED_SHOP} with scopes: ${scope}. The token itself is not logged.`,
  );

  // Clear the state cookie; it is single-use.
  return new Response(tokenPage(token, scope), {
    status: 200,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'no-store, no-cache, must-revalidate, private',
      'referrer-policy': 'no-referrer',
      'x-robots-tag': 'noindex, nofollow',
      'set-cookie': await stateCookie.serialize('', {maxAge: 0}),
    },
  });
}
