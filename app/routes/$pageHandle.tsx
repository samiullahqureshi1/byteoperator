import {useLoaderData} from 'react-router';
import type {Route} from './+types/$pageHandle';
import {resolveLegacyPath} from '~/lib/route-mappings';
import {
  links as pageLinks,
  loadPageData,
  PageContent,
} from './pages.$handle';

export const links = pageLinks;

export const meta: Route.MetaFunction = ({data}) => [
  {title: `Hydrogen | ${data?.page.title ?? ''}`},
];

export async function loader(args: Route.LoaderArgs) {
  const pathname = new URL(args.request.url).pathname;
  const legacyPath = resolveLegacyPath(pathname);

  if (!legacyPath) {
    throw new Response('Not Found', {status: 404});
  }

  return loadPageData({
    context: args.context,
    request: args.request,
    handle: legacyPath.slice('/pages/'.length),
  });
}

export default function CleanPage() {
  const data = useLoaderData<typeof loader>();

  return <PageContent data={data} />;
}
