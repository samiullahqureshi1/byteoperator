import {redirect, useLoaderData} from 'react-router';
import type {Route} from './+types/services.$serviceHandle';
import {links as pageLinks, loadPageData, PageContent} from './pages.$handle';
import {
  SERVICE_PAGE_CONFIGS,
  type ServicePageHandle,
} from '~/data/servicePages';
import {isSamePath, resolveCleanPath} from '~/lib/route-mappings';

export const links = pageLinks;

export const meta: Route.MetaFunction = ({data}) => [
  {title: `Hydrogen | ${data?.page.title ?? ''}`},
];

export async function loader(args: Route.LoaderArgs) {
  const serviceHandle = args.params.serviceHandle;

  if (
    !serviceHandle ||
    !SERVICE_PAGE_CONFIGS[
      serviceHandle as ServicePageHandle
    ]
  ) {
    throw new Response('Not Found', {status: 404});
  }

  const url = new URL(args.request.url);
  const canonicalPath = resolveCleanPath(
    `/pages/${serviceHandle}`,
  );

  // Only services explicitly mapped to `/services/:serviceHandle` use this
  // route. Root-level service URLs keep their existing canonical routes.
  //
  // The comparison ignores the trailing slash on purpose: React Router single
  // fetch requests `/services/foo/` as `/services/foo.data`, so this loader
  // sees `/services/foo` during client navigation. Redirecting on that alone
  // would bounce the client back to the URL it is already navigating to and
  // loop until the worker gave up. Document requests are canonicalized in
  // `getCleanUrlRedirect`.
  if (!isSamePath(canonicalPath, url.pathname)) {
    throw redirect(canonicalPath + url.search, 301);
  }

  return loadPageData({
    context: args.context,
    request: args.request,
    handle: serviceHandle,
  });
}

export default function CleanServicePage() {
  const data = useLoaderData<typeof loader>();

  return <PageContent data={data} />;
}
