import {resolveCanonicalPath} from '~/lib/route-mappings';

/**
 * Canonical URL redirect for full document requests.
 *
 * This is the single place where a URL is rewritten to its canonical
 * spelling, including the trailing slash. React Router single fetch data
 * requests (`/services/shopify-app-development.data`) are deliberately left
 * untouched: single fetch has already stripped the trailing slash from that
 * URL, so canonicalizing it would redirect the client back to the exact
 * location it is navigating to and loop forever. Data requests still receive
 * genuine alias redirects from the route loaders, which compare paths without
 * the trailing slash.
 */
export function getCleanUrlRedirect(request: Request): Response | null {
  const url = new URL(request.url);

  if (isDataRequest(url.pathname)) {
    return null;
  }

  const canonicalPath = resolveCanonicalPath(url.pathname);

  if (canonicalPath === url.pathname) {
    return null;
  }

  url.pathname = canonicalPath;

  return Response.redirect(url.toString(), 301);
}

function isDataRequest(pathname: string): boolean {
  return pathname.endsWith('.data');
}
