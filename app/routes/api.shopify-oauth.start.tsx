import type {Route} from './+types/api.shopify-oauth.start';
import {
  ALLOWED_SHOP,
  REQUESTED_SCOPES,
  createStateCookie,
  generateState,
  htmlResponse,
  missingEnvNames,
} from '~/lib/shopify-oauth.server';

/**
 * Step 1 of the one-time Shopify OAuth setup: redirect to Shopify's consent
 * screen. Open this once in a browser to mint the offline Admin API token,
 * then set that token as `PRIVATE_ADMIN_API_ACCESS_TOKEN` and this route
 * refuses to run again.
 *
 * No `grant_options[]` is sent, which is what makes Shopify issue an offline
 * (non-expiring) token rather than a per-user one.
 */
export async function loader({context, request}: Route.LoaderArgs) {
  // Once the token exists the flow is done. Do not leave it re-runnable.
  if (context.env.PRIVATE_ADMIN_API_ACCESS_TOKEN) {
    return htmlResponse(
      '<h1>Already authorized</h1><p>PRIVATE_ADMIN_API_ACCESS_TOKEN is already set. Unset it to run this flow again.</p>',
      409,
    );
  }

  const clientId = context.env.SHOPIFY_ADMIN_CLIENT_ID;
  const clientSecret = context.env.SHOPIFY_ADMIN_CLIENT_SECRET;
  const shop = context.env.SHOPIFY_ADMIN_SHOP;
  const redirectUri = context.env.SHOPIFY_ADMIN_REDIRECT_URI;
  const sessionSecret = context.env.SESSION_SECRET;

  /*
   * TEMPORARY DIAGNOSTIC — remove once the OAuth flow has run.
   * Presence only. No value is ever logged.
   */
  console.error('[shopify-oauth/start] env presence:', {
    SHOPIFY_ADMIN_CLIENT_ID: Boolean(clientId),
    SHOPIFY_ADMIN_CLIENT_SECRET: Boolean(clientSecret),
    SHOPIFY_ADMIN_SHOP: Boolean(shop),
    SHOPIFY_ADMIN_REDIRECT_URI: Boolean(redirectUri),
    SESSION_SECRET: Boolean(sessionSecret),
  });

  const missing = missingEnvNames({
    SHOPIFY_ADMIN_CLIENT_ID: clientId,
    SHOPIFY_ADMIN_CLIENT_SECRET: clientSecret,
    SHOPIFY_ADMIN_SHOP: shop,
    SHOPIFY_ADMIN_REDIRECT_URI: redirectUri,
    SESSION_SECRET: sessionSecret,
  });

  if (missing.length) {
    console.error(
      `[shopify-oauth/start] FAIL — the OAuth flow is not configured. Missing env var(s): ${missing.join(
        ', ',
      )}`,
    );

    return htmlResponse(
      '<h1>Not configured</h1><p>The Shopify OAuth environment variables are not all set for this deployment. The deployment log names the missing variable.</p>',
      500,
    );
  }

  if (shop !== ALLOWED_SHOP) {
    console.error(
      `[shopify-oauth/start] FAIL — SHOPIFY_ADMIN_SHOP is "${shop}" but this flow only authorizes ${ALLOWED_SHOP}.`,
    );

    return htmlResponse(
      '<h1>Shop not allowed</h1><p>This flow only authorizes a single, fixed shop.</p>',
      400,
    );
  }

  const state = generateState();

  const authorizeUrl = new URL(`https://${ALLOWED_SHOP}/admin/oauth/authorize`);

  authorizeUrl.searchParams.set('client_id', clientId);
  authorizeUrl.searchParams.set('scope', REQUESTED_SCOPES);
  authorizeUrl.searchParams.set('redirect_uri', redirectUri);
  authorizeUrl.searchParams.set('state', state);

  const stateCookie = createStateCookie(request, sessionSecret);

  return new Response(null, {
    status: 302,
    headers: {
      location: authorizeUrl.toString(),
      'set-cookie': await stateCookie.serialize(state),
      'cache-control': 'no-store',
    },
  });
}
