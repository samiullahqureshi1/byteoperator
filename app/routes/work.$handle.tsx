import {useLoaderData} from 'react-router';
import type {Route} from './+types/work.$handle';
import {CaseStudyDetail} from '~/components/work/CaseStudyDetail';
import caseStudyDetailStyles from '~/styles/case-study-detail.css?url';
import homeExpertsStyles from '~/styles/home-experts.css?url';

export const links: Route.LinksFunction = () => [
  {rel: 'stylesheet', href: caseStudyDetailStyles},
  // <HomeExperts/> renders last, well below the fold on every case study —
  // deferred (see DEFER_STYLES_SCRIPT in root.tsx).
  {
    rel: 'preload',
    as: 'style',
    href: homeExpertsStyles,
    'data-defer': 'true',
  },
];

export const meta: Route.MetaFunction = ({data}) => {
  const article = data?.article;

  if (!article) return [{title: 'Case study not found | FoldTech'}];

  const title = article.seo?.title || `${article.title} | FoldTech`;

  const description = article.seo?.description;

  return [
    {title},

    ...(description ? [{name: 'description', content: description}] : []),

    {property: 'og:type', content: 'article'},
    {property: 'og:title', content: title},

    ...(description
      ? [{property: 'og:description', content: description}]
      : []),

    ...(article.handle
      ? [
          {
            tagName: 'link',
            rel: 'canonical',
            href: `/work/${article.handle}`,
          },
        ]
      : []),
  ];
};

export async function loader({context, params}: Route.LoaderArgs) {
  if (!params.handle) {
    throw new Response('Not found', {status: 404});
  }

  const data = await context.storefront.query(CASE_STUDY_DETAIL_QUERY, {
    variables: {articleHandle: params.handle},
  });
  const article =
    data.featured?.articleByHandle ??
    data.topCaseStudies?.articleByHandle ??
    data.caseStudies?.articleByHandle;

  if (!article) {
    throw new Response('Not found', {status: 404});
  }

  return {article};
}

export default function WorkCaseStudyRoute() {
  const {article} = useLoaderData<typeof loader>();

  return <CaseStudyDetail article={article} />;
}

const CASE_STUDY_DETAIL_QUERY = `#graphql
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

  fragment CaseStudyArticle on Article {
    id
    title
    handle
    tags
    image {
      ...CaseStudyImage
    }
    excerpt
    excerptHtml
    contentHtml
    publishedAt
    seo {
      title
      description
    }
    services: metafield(namespace: "custom", key: "services") {
      value
    }
    platform: metafield(namespace: "custom", key: "platform") {
      value
    }
    caseStudyTitle: metafield(namespace: "custom", key: "case_study_title") {
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

  query CaseStudyDetail(
    $articleHandle: String!
    $language: LanguageCode
    $country: CountryCode
  ) @inContext(language: $language, country: $country) {
    featured: blog(handle: "featured") {
      articleByHandle(handle: $articleHandle) {
        ...CaseStudyArticle
      }
    }
    topCaseStudies: blog(handle: "top-case-studies") {
      articleByHandle(handle: $articleHandle) {
        ...CaseStudyArticle
      }
    }
    caseStudies: blog(handle: "case-studies") {
      articleByHandle(handle: $articleHandle) {
        ...CaseStudyArticle
      }
    }
  }
` as const;
