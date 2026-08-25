import type {Route} from './+types/sitemap.$type.$page[.xml]';
import {getSitemap} from '@shopify/hydrogen';
import {
  ARTICLES_CLEAN_PATH,
  getArticlePath,
  ARTICLES_BLOG_HANDLE,
} from '~/lib/route-mappings';

export async function loader({
  request,
  params,
  context: {storefront},
}: Route.LoaderArgs) {
  const response = await getSitemap({
    storefront,
    request,
    params,
    locales: ['EN-US', 'EN-CA', 'FR-CA'],
    getLink: ({type, baseUrl, handle, locale}) => {
      const resourcePath = getSitemapResourcePath(type, handle);

      if (!locale) return `${baseUrl}${resourcePath}`;
      return `${baseUrl}/${locale}${resourcePath}`;
    },
  });

  response.headers.set('Cache-Control', `max-age=${60 * 60 * 24}`);

  return response;
}
function getSitemapResourcePath(type: string, handle?: string): string {
  if (type === 'articles' && handle) {
    return getArticlePath(handle);
  }

  if (type === 'blogs' && handle === ARTICLES_BLOG_HANDLE) {
    return ARTICLES_CLEAN_PATH;
  }

  return `/${type}/${handle ?? ''}`;
}
