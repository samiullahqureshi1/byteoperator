import {useLoaderData} from 'react-router';
import type {Route} from './+types/services.$serviceHandle';
import {
  links as cleanPageLinks,
  loadCleanPage,
} from './$pageHandle';
import {PageContent} from './pages.$handle';

export const links = cleanPageLinks;

export const meta: Route.MetaFunction = ({data}) => [
  {title: `Hydrogen | ${data?.page.title ?? ''}`},
];

export async function loader(args: Route.LoaderArgs) {
  return loadCleanPage({
    context: args.context,
    request: args.request,
  });
}

export default function CleanServicePage() {
  const data = useLoaderData<typeof loader>();

  return <PageContent data={data} />;
}
