import {redirect, useLoaderData} from 'react-router';
import type {Route} from './+types/$pageHandle';
import {
  isSamePath,
  resolveCanonicalPath,
  resolveLegacyPath,
} from '~/lib/route-mappings';
import {
  buildPageMeta,
  getPageStylesheetLinks,
  links as pageLinks,
  loadPageData,
  PageContent,
} from './pages.$handle';

export const links = pageLinks;

export const meta: Route.MetaFunction = ({data}) => {
  const stylesheetLinks = getPageStylesheetLinks(data?.page);

  if (data?.page.handle === 'podcast') {
    return [
      {title: 'Shopify Ecommerce Podcast | FoldTech'},
      {
        name: 'description',
        content:
          'Explore Shopify ecommerce conversations from FoldTech on growth, SEO, CRO, development, Shopify Plus, retention and ecommerce strategy.',
      },
      {tagName: 'link', rel: 'canonical', href: '/podcast'},
      ...stylesheetLinks,
    ];
  }
  if (data?.page.handle === 'webinars') {
    return [
      {title: 'Shopify Ecommerce Webinars | FoldTech'},
      {
        name: 'description',
        content:
          'Explore FoldTech Shopify ecommerce webinars on growth, SEO, CRO, development, Shopify Plus, retention and ecommerce strategy.',
      },
      {tagName: 'link', rel: 'canonical', href: '/webinars'},
      ...stylesheetLinks,
    ];
  }
  if (data?.page.handle === 'guides') {
    return [
      {title: 'Shopify & Ecommerce Guides | FoldTech'},
      {
        name: 'description',
        content:
          'Explore FoldTech Shopify and ecommerce guides on growth strategy, SEO, CRO, development, migrations, Shopify Plus and retention.',
      },
      {tagName: 'link', rel: 'canonical', href: '/guides'},
      ...stylesheetLinks,
    ];
  }
  if (data?.page.handle === 'search-first') {
    return [
      {title: 'Shopify Search & Product Discovery | FoldTech'},
      {
        name: 'description',
        content:
          'FoldTech improves ecommerce site search and product discovery on Shopify, covering search UX, relevance, merchandising, filtering and search-led customer journeys.',
      },
      {tagName: 'link', rel: 'canonical', href: '/search-first'},
      ...stylesheetLinks,
    ];
  }
  if (data?.page.handle === 'why-shopify') {
    return [
      {title: 'Why Shopify for Ecommerce Growth | FoldTech'},
      {
        name: 'description',
        content:
          'Why ecommerce brands choose Shopify and Shopify Plus: hosted infrastructure, scalability, integrations, international commerce, custom development and the flexibility SEO and CRO work depend on.',
      },
      {tagName: 'link', rel: 'canonical', href: '/why-shopify'},
      ...stylesheetLinks,
    ];
  }
  if (data?.page.handle === 'shopify-experts') {
    return [
      {title: 'Shopify Experts & Development Agency | FoldTech'},
      {
        name: 'description',
        content:
          'FoldTech is a team of Shopify and Shopify Plus experts covering store design, development, migrations, integrations, SEO, CRO and ongoing ecommerce support.',
      },
      {tagName: 'link', rel: 'canonical', href: '/shopify-experts'},
      ...stylesheetLinks,
    ];
  }
  if (data?.page.handle === 'memberships') {
    return [
      {title: 'Shopify Retainers & Ongoing Support | FoldTech'},
      {
        name: 'description',
        content:
          'FoldTech memberships are monthly Shopify retainers covering ongoing support, maintenance, development time, CRO and technical work for growing ecommerce and Shopify Plus stores.',
      },
      {tagName: 'link', rel: 'canonical', href: '/memberships'},
      ...stylesheetLinks,
    ];
  }
  if (data?.page.handle === 'shopify-consultant') {
    return [
      {title: 'Shopify Consultant & Ecommerce Strategy | FoldTech'},
      {
        name: 'description',
        content:
          'FoldTech works as a Shopify and Shopify Plus consultant, covering store audits, ecommerce growth strategy, SEO and CRO priorities, migrations, integrations and ongoing support.',
      },
      {tagName: 'link', rel: 'canonical', href: '/shopify-consultant'},
      ...stylesheetLinks,
    ];
  }
  if (data?.page.handle === 'ab-testing') {
    return [
      {title: 'Shopify A/B Testing Services | FoldTech'},
      {
        name: 'description',
        content:
          'FoldTech runs Shopify A/B testing and ecommerce experimentation programmes, from research and hypotheses to landing page, product page and checkout journey tests.',
      },
      {tagName: 'link', rel: 'canonical', href: '/ab-testing'},
      ...stylesheetLinks,
    ];
  }
  if (data?.page.handle === 'headless-commerce') {
    return [
      {
        title: 'Headless Commerce Development for Shopify | FoldTech',
      },
      {
        name: 'description',
        content:
          'Build faster, flexible Shopify storefronts with FoldTech headless commerce development, Hydrogen expertise, API integrations and ongoing support.',
      },
      {
        tagName: 'link',
        rel: 'canonical',
        href: '/headless-commerce',
      },
      ...stylesheetLinks,
    ];
  }

  /*
   * Every other clean page reuses the shared builder so it gets the
   * Shopify SEO title/description and a canonical pointing at the clean
   * public URL rather than the `/pages/*` implementation route.
   */
  return [...buildPageMeta(data?.page), ...stylesheetLinks];
};

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
