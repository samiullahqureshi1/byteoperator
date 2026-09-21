import type {Route} from './+types/sitemap.$type.$page[.xml]';
import {getSitemap} from '@shopify/hydrogen';
import {
  ARTICLES_CLEAN_PATH,
  getArticlePath,
  ARTICLES_BLOG_HANDLE,
  getCaseStudyPath,
  resolveCanonicalPath,
} from '~/lib/route-mappings';

export async function loader({
  request,
  params,
  context: {storefront},
}: Route.LoaderArgs) {
  /*
   * Kept in step with the `types` list in `[sitemap.xml].tsx`. Excluding a
   * type from the index is not enough on its own — the child sitemap is still
   * reachable at its own URL, and Google remembers sitemap URLs it has seen
   * before, so `/sitemap/products/1.xml` would keep serving noindexed URLs
   * long after the index stopped linking to it.
   */
  if (params.type === 'products' || params.type === 'collections') {
    throw new Response('Not Found', {status: 404});
  }

  // Hydrogen only hands us the article handle, so learn which are case studies.
  const caseStudyHandles = new Set<string>();
  if (params.type === 'articles') {
    const data = await storefront.query(CASE_STUDY_HANDLES_QUERY);
    for (const blog of [data.featured, data.top, data.caseStudies]) {
      blog?.articles.nodes.forEach(({handle}) => caseStudyHandles.add(handle));
    }
  }

  const response = await getSitemap({
    storefront,
    request,
    params,
    /*
     * `locales` is intentionally omitted. It generates alternate URLs such
     * as `/EN-CA/...`, but this storefront has no locale route segment
     * (`context.ts` pins i18n to EN-US), so every locale-prefixed URL fell
     * through to the `$.tsx` catch-all and returned 404. Advertising 404s
     * in the sitemap is worse than shipping no alternates.
     */
    getLink: ({type, baseUrl, handle, locale}) => {
      const resourcePath =
        type === 'articles' && handle && caseStudyHandles.has(handle)
          ? getCaseStudyPath(handle)
          : getSitemapResourcePath(type, handle);

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

  /*
   * Shopify pages are served at `/pages/:handle`, but most of them are
   * canonicalized to a clean public URL (`/pages/about-us` -> `/about`).
   * Listing the `/pages/*` spelling would advertise a URL that then points
   * its canonical somewhere else, so resolve to the canonical path first.
   */
  if (type === 'pages' && handle) {
    return resolveCanonicalPath(`/pages/${handle}`);
  }

  return `/${type}/${handle ?? ''}`;
}

const CASE_STUDY_HANDLES_QUERY = `#graphql
  query SitemapCaseStudyHandles {
    featured: blog(handle: "featured") {
      articles(first: 250) { nodes { handle } }
    }
    top: blog(handle: "top-case-studies") {
      articles(first: 250) { nodes { handle } }
    }
    caseStudies: blog(handle: "case-studies") {
      articles(first: 250) { nodes { handle } }
    }
  }
` as const;
