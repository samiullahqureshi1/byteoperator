import {resolveCleanPath} from '~/lib/route-mappings';

export function getCleanUrlRedirect(request: Request): Response | null {
  const url = new URL(request.url);
  const cleanPath = resolveCleanPath(url.pathname);

  if (cleanPath === url.pathname) {
    return null;
  }

  url.pathname = cleanPath;

  return Response.redirect(url.toString(), 301);
}
