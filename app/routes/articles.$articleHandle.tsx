import {useLoaderData} from 'react-router';
import type {Route} from './+types/articles.$articleHandle';
import {redirectIfHandleIsLocalized} from '~/lib/redirect';
import {getArticlePath} from '~/lib/route-mappings';
import {getIncludedArticleBlogs} from '~/lib/articles-data.server';
import {CaseStudyDetail} from '~/components/work/CaseStudyDetail';
import caseStudyDetailStyles from '~/styles/case-study-detail.css?url';
import homeExpertsStyles from '~/styles/home-experts.css?url';
import {articleJsonLd} from '~/lib/seo/jsonld';

export const links: Route.LinksFunction = () => [
  // Article/case-study media is served from Shopify's CDN, so this
  // preconnect is only declared on routes that actually render it (see
  // app/root.tsx).
  {rel: 'preconnect', href: 'https://cdn.shopify.com'},
  {rel: 'stylesheet', href: caseStudyDetailStyles},
  {rel: 'stylesheet', href: homeExpertsStyles},
];

export const meta: Route.MetaFunction = ({data}) => {
  const title =
    data?.article.seo?.title ||
    `${data?.article.title ?? ''} | FoldTech`;
  const description = data?.article.seo?.description;
  const canonical = data?.article.handle
    ? getArticlePath(data.article.handle)
    : undefined;

  const article = data?.article;

  return [
    {title},
    ...(description ? [{name: 'description', content: description}] : []),
    ...(canonical ? [{tagName: 'link', rel: 'canonical', href: canonical}] : []),
    ...(article && canonical
      ? articleJsonLd({
          path: canonical,
          title: article.title,
          seoDescription: article.seo?.description,
          excerpt: article.excerpt,
          contentHtml: article.contentHtml,
          imageUrl: article.image?.url,
          publishedAt: article.publishedAt,
          // The Storefront API exposes no `updatedAt` on Article, so the
          // refresh script records it in custom.last_modified instead. When
          // it is absent — an article written since the last run — the field
          // is omitted rather than back-filled with publishedAt, which would
          // assert a modification date that isn't true.
          updatedAt: article.lastModified?.value,
          authorName: article.authorV2?.name,
        })
      : []),
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

  return (
    <div className="ft-article-detail-page">
      <CaseStudyDetail
        article={article}
        fallbackEyebrow={
          article.articleType?.value.trim() || 'Ecommerce Insights'
        }
        fallbackSubtitle={article.excerpt}
      />
    </div>
  );
}

const ARTICLE_QUERY = `#graphql
  fragment CaseStudyImage on Image {
    url
    altText
    width
    height
  }

  fragment CaseStudyMediaReference on MetafieldReference {
    ... on MediaImage {
      image {
        ...CaseStudyImage
      }
    }
    ... on Video {
      alt
      previewImage {
        ...CaseStudyImage
      }
      sources {
        url
        mimeType
      }
    }
    ... on GenericFile {
      alt
      mimeType
      url
      previewImage {
        ...CaseStudyImage
      }
    }
  }

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
        tags
        excerpt
        contentHtml
        publishedAt
        authorV2 {
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
        lastModified: metafield(
          namespace: "custom"
          key: "last_modified"
        ) {
          value
        }
        articleType: metafield(namespace: "custom", key: "article_type") {
          value
        }
        services: metafield(namespace: "custom", key: "services") {
          value
        }
        platform: metafield(namespace: "custom", key: "platform") {
          value
        }
        caseStudyTitle: metafield(
          namespace: "custom"
          key: "case_study_title"
        ) {
          value
        }
        caseStudySubheading: metafield(
          namespace: "custom"
          key: "case_study_subheading"
        ) {
          value
        }
        caseStudyBlogDetails: metafield(
          namespace: "custom"
          key: "case_study_blog_post"
        ) {
          reference {
            ... on Metaobject {
              fields {
                key
                type
                value
                reference {
                  ...CaseStudyMediaReference
                }
                references(first: 20) {
                  nodes {
                    ...CaseStudyMediaReference
                  }
                }
              }
            }
          }
        }
      }
    }
  }
` as const;
