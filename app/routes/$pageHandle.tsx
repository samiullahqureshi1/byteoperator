import {redirect, useLoaderData} from 'react-router';
import type {Route} from './+types/$pageHandle';
import {
  isSamePath,
  resolveCanonicalPath,
  resolveLegacyPath,
} from '~/lib/route-mappings';
import {
  links as pageLinks,
  loadPageData,
  PageContent,
} from './pages.$handle';

export const links = pageLinks;

export const meta: Route.MetaFunction = ({data}) => [
  {title: `Hydrogen | ${data?.page.title ?? ''}`},
];

/**
 * Shared loader for every clean (non `/pages/*`) page route.
 *
 * Resolution order, all driven by the centralized route mappings:
 * 1. retired clean URLs are permanently redirected to their canonical path
 * 2. the clean path is resolved back to its Shopify page handle
 * 3. unknown clean paths 404
 *
 * A trailing-slash-only difference is never a redirect here. React Router can
 * include the single-fetch `.data` suffix in the route parameter, so every
 * lookup uses the normalized public handle. See `isSamePath`. Document
 * requests are canonicalized in
 * `getCleanUrlRedirect` before React Router ever runs.
 */
export async function loadCleanPage({
  context,
  request,
  pageHandle,
}: {
  context: Route.LoaderArgs['context'];
  request: Request;
  pageHandle: string;
}) {
  const url = new URL(request.url);
  const routePathname = `/${pageHandle}`;
  const canonicalPath = resolveCanonicalPath(routePathname);

  if (!isSamePath(canonicalPath, routePathname)) {
    throw redirect(canonicalPath + url.search, 301);
  }

  const legacyPath = resolveLegacyPath(routePathname);

  if (!legacyPath) {
    throw new Response('Not Found', {status: 404});
  }

  return loadPageData({
    context,
    request,
    handle: legacyPath.slice('/pages/'.length),
  });
}

export async function loader(args: Route.LoaderArgs) {
  const rawHandle = args.params.pageHandle ?? '';
  const pageHandle = rawHandle.endsWith('.data')
    ? rawHandle.slice(0, -'.data'.length)
    : rawHandle;

  return loadCleanPage({
    context: args.context,
    request: args.request,
    pageHandle,
  });
}

export default function CleanPage() {
  const data = useLoaderData<typeof loader>();

  return <PageContent data={data} />;
}
