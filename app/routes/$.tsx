import type {Route} from './+types/$';

/*
 * A 404 that renders no robots directive can still be indexed if anything
 * links to it. The status code is the primary signal; this is the second.
 */
export const meta: Route.MetaFunction = () => [
  {title: 'Page not found | FoldTech'},
  {name: 'robots', content: 'noindex,follow'},
];

export async function loader({request}: Route.LoaderArgs) {
  throw new Response(`${new URL(request.url).pathname} not found`, {
    status: 404,
  });
}

export default function CatchAllPage() {
  return null;
}
