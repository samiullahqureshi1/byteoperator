/**
 * Answers HEAD requests for `public/` files (`/images/*`, `/favicon.ico`).
 *
 * Oxygen serves those files at the site root for GET only. A HEAD falls
 * through to the app, which has no route for them and returns its 404 page,
 * so crawlers that check images with HEAD report every image as broken while
 * browsers load them fine. The deploy build uploads the same files to the
 * Software CDN under Vite's `base`, and the CDN answers HEAD, so reply with
 * its status and headers.
 *
 * `assetBase` is `import.meta.env.BASE_URL`: the CDN URL in deploy builds and
 * `/` in local dev, where the dev server already handles HEAD itself.
 */
export async function headPublicAsset(
  request: Request,
  assetBase: string,
): Promise<Response | null> {
  if (request.method !== 'HEAD' || !/^https?:\/\//.test(assetBase)) {
    return null;
  }

  const {pathname} = new URL(request.url);

  // Only file-like paths; pages and resource routes stay with the app.
  if (!/\/[^/]+\.[a-z0-9]+$/i.test(pathname)) return null;

  const asset = await fetch(new URL(pathname.slice(1), assetBase), {
    method: 'HEAD',
  });

  return asset.ok
    ? new Response(null, {status: asset.status, headers: asset.headers})
    : null;
}
