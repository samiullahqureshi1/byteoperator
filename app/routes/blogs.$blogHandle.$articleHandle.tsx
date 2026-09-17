import {useLoaderData} from 'react-router';
import type {Route} from './+types/blogs.$blogHandle.$articleHandle';
import {Image} from '@shopify/hydrogen';
import {redirectIfHandleIsLocalized} from '~/lib/redirect';
import {getArticlesUrlRedirect} from '~/services/redirects.server';
import {resolveCanonicalPath} from '~/lib/route-mappings';
import {absoluteUrl} from '~/lib/seo/schema';

// Article images are served from Shopify's CDN, so this preconnect is only
// declared on routes that actually render them (see app/root.tsx).
export const links: Route.LinksFunction = () => [
  {rel: 'preconnect', href: 'https://cdn.shopify.com'},
];

export const meta: Route.MetaFunction = ({data, params}) => {
  const article = data?.article;

  /* `ARTICLE_QUERY` already requests the article's Shopify `seo` fields. */
  const title =
    article?.seo?.title || `${article?.title ?? ''} | FoldTech`;

  const description = article?.seo?.description;

  /*
   * The same article is reachable at `/articles/{handle}/`, which is the
   * canonical form (`resolveArticlesPath`). Self-canonicalising here would put
   * two URLs forward for one article, so the canonical is resolved rather than
   * echoed back.
   *
   * This route deliberately emits NO structured data for the same reason: the
   * canonical URL owns the Article node, and a duplicate surface asserting its
   * own competing `@id` is worse than none.
   */
  const canonical =
    params.blogHandle && article?.handle
      ? absoluteUrl(
          resolveCanonicalPath(`/blogs/${params.blogHandle}/${article.handle}`),
        )
      : undefined;

  return [
    {title},

    ...(description ? [{name: 'description', content: description}] : []),

    {property: 'og:type', content: 'article'},
    {property: 'og:title', content: title},

    ...(description
      ? [{property: 'og:description', content: description}]
      : []),

    ...(canonical
      ? [{tagName: 'link', rel: 'canonical', href: canonical}]
      : []),
  ];
};

export async function loader(args: Route.LoaderArgs) {
  const articlesRedirect = getArticlesUrlRedirect(args.request);

  if (articlesRedirect) {
    throw articlesRedirect;
  }
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return {...deferredData, ...criticalData};
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({context, request, params}: Route.LoaderArgs) {
  const {blogHandle, articleHandle} = params;

  if (!articleHandle || !blogHandle) {
    throw new Response('Not found', {status: 404});
  }

  const [{blog}] = await Promise.all([
    context.storefront.query(ARTICLE_QUERY, {
      variables: {blogHandle, articleHandle},
    }),
    // Add other queries here, so that they are loaded in parallel
  ]);

  if (!blog?.articleByHandle) {
    throw new Response(null, {status: 404});
  }

  redirectIfHandleIsLocalized(
    request,
    {
      handle: articleHandle,
      data: blog.articleByHandle,
    },
    {
      handle: blogHandle,
      data: blog,
    },
  );

  const article = blog.articleByHandle;

  return {article};
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context}: Route.LoaderArgs) {
  return {};
}

export default function Article() {
  const {article} = useLoaderData<typeof loader>();
  const {title, image, contentHtml, author} = article;

  const publishedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(article.publishedAt));

  return (
    <div className="article">
      {/*
        * The byline used to sit inside the <h1>, which put the date and
        * author into the page's primary heading and nested flow content
        * (<div>, <address>) inside a heading that only permits phrasing
        * content. It is now a sibling; `.article__byline` restates the
        * typography it previously inherited from the <h1>.
        */}
      <h1>{title}</h1>

      <div className="article__byline">
        <time dateTime={article.publishedAt}>{publishedDate}</time> &middot;{' '}
        <address>{author?.name}</address>
      </div>

      {image && <Image data={image} sizes="90vw" loading="eager" />}
      <div
        dangerouslySetInnerHTML={{__html: contentHtml}}
        className="article"
      />
    </div>
  );
}

// NOTE: https://shopify.dev/docs/api/storefront/latest/objects/blog#field-blog-articlebyhandle
const ARTICLE_QUERY = `#graphql
  query Article(
    $articleHandle: String!
    $blogHandle: String!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(language: $language, country: $country) {
    blog(handle: $blogHandle) {
      handle
      articleByHandle(handle: $articleHandle) {
        handle
        title
        contentHtml
        publishedAt
        author: authorV2 {
          name
        }
        image {
          id
          altText
          url
          width
          height
        }
        seo {
          description
          title
        }
      }
    }
  }
` as const;
