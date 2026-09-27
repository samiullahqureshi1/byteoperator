import {NextResponse, type NextRequest} from 'next/server';
import {resolveCanonicalPath} from '~/lib/route-mappings';

/**
 * 301 every known legacy, alias, or retired URL to its single canonical path
 * (see OLD_TO_CLEAN_PATHS), so crawlers and old links land on a live page in
 * one hop instead of a 404 or a duplicate copy.
 */
export function middleware(request: NextRequest) {
  const {pathname} = request.nextUrl;
  // Trailing slashes are handled here (skipTrailingSlashRedirect is on) so a
  // legacy `/x/` reaches its target in one hop instead of two.
  const trimmed =
    pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
  const canonicalPath = resolveCanonicalPath(trimmed);

  if (canonicalPath === pathname) {
    return NextResponse.next();
  }

  // Built from a plain URL: NextURL re-appends the original trailing slash.
  const url = new URL(canonicalPath + request.nextUrl.search, request.url);
  return NextResponse.redirect(url, 301);
}

export const config = {
  // Skip Next internals, API routes, and static files.
  matcher: ['/((?!_next/|api/|images/|videos/|assets/|.*\\.[a-z0-9]+$).*)'],
};
