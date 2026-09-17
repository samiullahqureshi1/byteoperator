import type {Route} from './+types/[sitemap.xml]';
import {getSitemapIndex} from '@shopify/hydrogen';

export async function loader({
  request,
  context: {storefront},
}: Route.LoaderArgs) {
  const response = await getSitemapIndex({
    storefront,
    request,
    /*
     * `products` and `collections` are excluded. This is an agency site, not a
     * storefront — those routes come from the Hydrogen template and are served
     * `noindex,follow` (see `products.$handle.tsx`). Publishing 69 URLs in the
     * sitemap while telling crawlers not to index them is a direct
     * contradiction, and Search Console reports it as "Submitted URL marked
     * noindex".
     *
     * `metaObjects` is omitted too: nothing on this site renders a metaobject
     * at its own URL, so those entries would 404.
     *
     * If real products ever ship, add them back here AND remove the noindex.
     */
    types: ['pages', 'articles', 'blogs'],
  });

  response.headers.set('Cache-Control', `max-age=${60 * 60 * 24}`);

  return response;
}
