import {redirect, useLoaderData} from 'react-router';
import type {Route} from './+types/$pageHandle';
import {
  resolveCleanPath,
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
 * 1. retired clean URLs are permanently redirected to their current path
 * 2. the clean path is resolved back to its Shopify page handle
 * 3. non-canonical spellings of the clean path are permanently redirected
 */
export async function loadCleanPage({
  context,
  request,
}: {
  context: Route.LoaderArgs['context'];
  request: Request;
}) {
  const url = new URL(request.url);
  const mappedPath = resolveCleanPath(url.pathname);

  if (mappedPath !== url.pathname) {
    throw redirect(mappedPath + url.search, 301);
  }

  const legacyPath = resolveLegacyPath(url.pathname);

  if (!legacyPath) {
    throw new Response('Not Found', {status: 404});
  }

  const canonicalPath = resolveCleanPath(legacyPath);

  if (canonicalPath !== url.pathname) {
    throw redirect(canonicalPath + url.search, 301);
  }

  return loadPageData({
    context,
    request,
    handle: legacyPath.slice('/pages/'.length),
  });
}

export async function loader(args: Route.LoaderArgs) {
  return loadCleanPage({
    context: args.context,
    request: args.request,
  });
}

export default function CleanPage() {
  const data = useLoaderData<typeof loader>();

  return <PageContent data={data} />;
}
