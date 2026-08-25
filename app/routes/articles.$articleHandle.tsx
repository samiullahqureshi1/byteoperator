import {useLoaderData} from 'react-router';
import type {Route} from './+types/articles.$articleHandle';
import {redirectIfHandleIsLocalized} from '~/lib/redirect';
import {getArticlePath} from '~/lib/route-mappings';
import {getIncludedArticleBlogs} from '~/lib/articles-data.server';
import {CaseStudyDetail} from '~/components/work/CaseStudyDetail';
import caseStudyDetailStyles from '~/styles/case-study-detail.css?url';
import homeExpertsStyles from '~/styles/home-experts.css?url';

export const links: Route.LinksFunction = () => [
  {rel: 'stylesheet', href: caseStudyDetailStyles},
  {rel: 'stylesheet', href: homeExpertsStyles},
];

export const meta: Route.MetaFunction = ({data}) => {
  const title =
    data?.article.seo?.title ||
    `Hydrogen | ${data?.article.title ?? ''} article`;
  const description = data?.article.seo?.description;
  const canonical = data?.article.handle
    ? getArticlePath(data.article.handle)
    : undefined;

  return [
    {title},
    ...(description ? [{name: 'description', content: description}] : []),
    ...(canonical ? [{tagName: 'link', rel: 'canonical', href: canonical}] : []),
  ];
};

export async function loader(args: Route.LoaderArgs) {
  const deferredData = loadDeferredData(args);
  const criticalData = await loadCriticalData(args);

  return {...deferredData, ...criticalData};
}

async function loadCriticalData({context, request, params}: Route.LoaderArgs) {
  const {articleHandle} = params;

  if (!articleHandle) {
    throw new Response('Not found', {status: 404});
  }

  const includedBlogs = await getIncludedArticleBlogs(context.storefront);
  const results = await Promise.all(
    includedBlogs.map(({handle: blogHandle}) =>
      context.storefront.query(ARTICLE_QUERY, {
        variables: {blogHandle, articleHandle},
      }),
    ),
  );
  const article = results.find(({blog}) => blog?.articleByHandle)?.blog
    ?.articleByHandle;

  if (!article) {
    throw new Response(null, {status: 404});
  }

  redirectIfHandleIsLocalized(request, {
    handle: articleHandle,
    data: article,
  });

  return {article};
}

function loadDeferredData({context}: Route.LoaderArgs) {
  return {};
}

export default function Article() {
  const {article} = useLoaderData<typeof loader>();
  const eyebrow = article.articleType?.value.trim() || 'Ecommerce Insights';
  const subtitle = article.excerpt?.trim() || null;

  return (
    <CaseStudyDetail
      article={article}
      variant="article"
      eyebrow={eyebrow}
      subtitle={subtitle}
    />
  );
}

const ARTICLE_QUERY = `#graphql
  query JournalArticle(
    $articleHandle: String!
    $blogHandle: String!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(language: $language, country: $country) {
    blog(handle: $blogHandle) {
      handle
      articleByHandle(handle: $articleHandle) {
        id
        handle
        title
        excerpt
        contentHtml
        publishedAt
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
        articleType: metafield(namespace: "custom", key: "article_type") {
          value
        }
      }
    }
  }
` as const;