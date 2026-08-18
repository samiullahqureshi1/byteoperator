import workHeroStyles from '~/styles/work-hero.css?url';
import workResultsStyles from '~/styles/work-results.css?url';
import workFeaturedProjectsStyles from '~/styles/work-featured-projects.css?url';
import workTopCaseStudiesStyles from '~/styles/work-top-case-studies.css?url';
import workTeamCtaStyles from '~/styles/work-team-cta.css?url';
import workCaseStudiesStyles from '~/styles/work-case-studies.css?url';
import workTestimonialStyles from '~/styles/work-testimonial.css?url';
import type {WorkCaseStudiesQuery} from 'storefrontapi.generated';
import homeFeatureStyles from '~/styles/home-feature.css?url';
import homeHeroGalleryStyles from '~/styles/home-hero-gallery.css?url';
import homeAboutStyles from '~/styles/home-about.css?url';
import homeServicesStyles from '~/styles/home-services.css?url';
import clientLogoGridStyles from '~/styles/client-logo-grid.css?url';
import homeProjectsStyles from '~/styles/home-projects.css?url';
import homePeopleStyles from '~/styles/home-people.css?url';
import servicesDirectoryStyles from '~/styles/services-directory.css?url';
import servicesWideImageStyles from '~/styles/services-wide-image.css?url';
import {ServicesPage} from '~/components/ServicesPage';
import servicesHeroStyles from '~/styles/services-hero.css?url';
import {useLoaderData} from 'react-router';
import type {Route} from './+types/pages.$handle';
import {redirectIfHandleIsLocalized} from '~/lib/redirect';
import {WorkPage} from '~/components/WorkPage';
import homeExpertsStyles from '~/styles/home-experts.css?url';
import homeObservatoryStyles from '~/styles/home-observatory.css?url';
import servicesPageStyles from '~/styles/services-page.css?url';
import shopifyPlusPageStyles from '~/styles/shopify-plus-page.css?url';
import homePartnersStyles from '~/styles/home-partners.css?url';
import serviceAboutSectionStyles from '~/styles/service-about-section.css?url';
import serviceDetailFaqStyles from '~/styles/service-detail-faqs.css?url';
import {ServiceDetailPage} from '~/components/services/ServiceDetailPage';
import {ShopifyPlusPage} from '~/components/services/ShopifyPlusPage';
import {
  SERVICE_PAGE_CONFIGS,
  type ServicePageHandle,
} from '~/data/servicePages';
import type {ServiceDetailFaqItem} from '~/components/services/detail/ServiceDetailFaqs';
import {SHOPIFY_PLUS_PAGE_HANDLE} from '~/lib/route-mappings';

export const meta: Route.MetaFunction = ({data}) => {
  return [{title: `Hydrogen | ${data?.page.title ?? ''}`}];
};
export const links: Route.LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: workHeroStyles,
  },
  {
    rel: 'stylesheet',
    href: workResultsStyles,
  },
  {
    rel: 'stylesheet',
    href: workFeaturedProjectsStyles,
  },
  {
    rel: 'stylesheet',
    href: workTopCaseStudiesStyles,
  },
  {
    rel: 'stylesheet',
    href: workTeamCtaStyles,
  },
  {
    rel: 'stylesheet',
    href: workCaseStudiesStyles,
  },
  {
    rel: 'stylesheet',
    href: homeFeatureStyles,
  },
  {
    rel: 'stylesheet',
    href: homeHeroGalleryStyles,
  },
  {
    rel: 'stylesheet',
    href: homeAboutStyles,
  },
  {
    rel: 'stylesheet',
    href: homeServicesStyles,
  },
  {
    rel: 'stylesheet',
    href: clientLogoGridStyles,
  },
  {
    rel: 'stylesheet',
    href: homeProjectsStyles,
  },
  {
  rel: 'stylesheet',
  href: homePeopleStyles,
},
  {
    rel: 'stylesheet',
    href: workTestimonialStyles,
  },
  {
  rel: 'stylesheet',
  href: homeExpertsStyles,
},
  {
    rel: 'stylesheet',
    href: homeObservatoryStyles,
  },
{
  rel: 'stylesheet',
  href: servicesHeroStyles,
},
{
  rel: 'stylesheet',
  href: servicesWideImageStyles,
},
{
  rel: 'stylesheet',
  href: servicesDirectoryStyles,
},
{
  rel: 'stylesheet',
  href: servicesPageStyles,
},
{
  rel: 'stylesheet',
  href: homePartnersStyles,
},
{
  rel: 'stylesheet',
  href: serviceAboutSectionStyles,
},
{
  rel: 'stylesheet',
  href: serviceDetailFaqStyles,
},
{
  rel: 'stylesheet',
  href: shopifyPlusPageStyles,
},
];
export async function loader(args: Route.LoaderArgs) {
  if (!args.params.handle) {
    throw new Error('Missing page handle');
  }

  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadPageData({
    context: args.context,
    request: args.request,
    handle: args.params.handle,
  });

  return {...deferredData, ...criticalData};
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
export async function loadPageData({
  context,
  request,
  handle,
}: {
  context: Route.LoaderArgs['context'];
  request: Request;
  handle: string;
}) {
  const [
    {page},
    featuredBlogData,
    topCaseStudiesBlogData,
    caseStudyArticles,
  ] = await Promise.all([
    context.storefront.query(PAGE_QUERY, {
      variables: {
        handle,
      },
    }),
    handle === 'work'
      ? context.storefront.query(FEATURED_PROJECTS_QUERY)
      : Promise.resolve({blog: null}),
    handle === 'work'
      ? context.storefront.query(TOP_CASE_STUDIES_QUERY)
      : Promise.resolve({blog: null}),
    handle === 'work'
      ? loadAllCaseStudies(context)
      : Promise.resolve([]),
  ]);

  if (!page) {
    throw new Response('Not Found', {status: 404});
  }

  redirectIfHandleIsLocalized(request, {handle, data: page});

  return {
    page: {
      ...page,
      faqs: parseFaqs(page.faq?.value),
    },
    featuredArticles:
      featuredBlogData.blog?.articles.nodes ?? [],
    topCaseStudyArticles:
      topCaseStudiesBlogData.blog?.articles.nodes ?? [],
    caseStudyArticles,
  };
}

type WorkCaseStudyArticle = NonNullable<
  WorkCaseStudiesQuery['blog']
>['articles']['nodes'][number];

async function loadAllCaseStudies(
  context: Route.LoaderArgs['context'],
): Promise<WorkCaseStudyArticle[]> {
  const articles: WorkCaseStudyArticle[] = [];
  let after: string | null = null;

  do {
    const data: WorkCaseStudiesQuery = await context.storefront.query(
      CASE_STUDIES_QUERY,
      {
      variables: {after},
      },
    );
    const connection: NonNullable<
      WorkCaseStudiesQuery['blog']
    >['articles'] | undefined = data.blog?.articles;

    if (!connection) break;

    articles.push(...connection.nodes);
    after = connection.pageInfo.hasNextPage
      ? (connection.pageInfo.endCursor ?? null)
      : null;
  } while (after);

  return articles;
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context}: Route.LoaderArgs) {
  return {};
}

export default function Page() {
  const data = useLoaderData<typeof loader>();

  return <PageContent data={data} />;
}

function parseFaqs(value: string | undefined): ServiceDetailFaqItem[] {
  if (!value?.trim()) return [];

  try {
    const parsed: unknown = JSON.parse(value);

    if (!Array.isArray(parsed)) return [];

    return parsed.flatMap((item): ServiceDetailFaqItem[] => {
      if (
        typeof item !== 'object' ||
        item === null ||
        !('question' in item) ||
        !('answer' in item) ||
        typeof item.question !== 'string' ||
        typeof item.answer !== 'string'
      ) {
        return [];
      }

      const question = item.question.trim();
      const answer = item.answer.trim();

      return question && answer ? [{question, answer}] : [];
    });
  } catch {
    return [];
  }
}

export function PageContent({
  data,
}: {
  data: Awaited<ReturnType<typeof loadPageData>>;
}) {
  const {
    page,
    featuredArticles,
    topCaseStudyArticles,
    caseStudyArticles,
  } = data;

  if (page.handle === 'work') {
    return (
      <WorkPage
        page={page}
        featuredArticles={featuredArticles}
        topCaseStudyArticles={topCaseStudyArticles}
        caseStudyArticles={caseStudyArticles}
      />
    );
  }

  if (page.handle === 'services') {
    return <ServicesPage page={page} />;
  }

  if (page.handle === SHOPIFY_PLUS_PAGE_HANDLE) {
    return <ShopifyPlusPage />;
  }

  const servicePageConfig =
    SERVICE_PAGE_CONFIGS[page.handle as ServicePageHandle];

  if (servicePageConfig) {
    return (
      <ServiceDetailPage
        page={page}
        config={servicePageConfig}
      />
    );
  }

  return (
    <div className="page">
      <header>
        <h1>{page.title}</h1>
      </header>

      <main
        dangerouslySetInnerHTML={{
          __html: page.body,
        }}
      />
    </div>
  );
}

const PAGE_QUERY = `#graphql
  query Page(
    $language: LanguageCode,
    $country: CountryCode,
    $handle: String!
  )
  @inContext(language: $language, country: $country) {
    page(handle: $handle) {
      handle
      id
      title
      body
      faq: metafield(namespace: "custom", key: "faqs") {
        value
      }
      seo {
        description
        title
      }
    }
  }
` as const;

const FEATURED_PROJECTS_QUERY = `#graphql
  query WorkFeaturedProjects(
    $language: LanguageCode
    $country: CountryCode
  ) @inContext(language: $language, country: $country) {
    blog(handle: "featured") {
      articles(first: 50, sortKey: PUBLISHED_AT, reverse: true) {
        nodes {
          title
          handle
          image {
            url
            altText
            width
            height
          }
          excerpt
          content
          result: metafield(namespace: "custom", key: "result") {
            value
          }
          services: metafield(namespace: "custom", key: "services") {
            value
          }
          logo: metafield(namespace: "custom", key: "logo") {
            reference {
              ... on MediaImage {
                image {
                  url
                  altText
                  width
                  height
                }
              }
            }
          }
        }
      }
    }
  }
` as const;

const TOP_CASE_STUDIES_QUERY = `#graphql
  query WorkTopCaseStudies(
    $language: LanguageCode
    $country: CountryCode
  ) @inContext(language: $language, country: $country) {
    blog(handle: "top-case-studies") {
      articles(first: 6, sortKey: PUBLISHED_AT, reverse: true) {
        nodes {
          title
          handle
          tags
          image {
            url
            altText
            width
            height
          }
          excerpt
          content
          result: metafield(namespace: "custom", key: "result") {
            value
          }
          services: metafield(namespace: "custom", key: "services") {
            value
          }
          logo: metafield(namespace: "custom", key: "logo") {
            reference {
              ... on MediaImage {
                image {
                  url
                  altText
                  width
                  height
                }
              }
            }
          }
        }
      }
    }
  }
` as const;

const CASE_STUDIES_QUERY = `#graphql
  query WorkCaseStudies(
    $after: String
    $language: LanguageCode
    $country: CountryCode
  ) @inContext(language: $language, country: $country) {
    blog(handle: "case-studies") {
      articles(
        first: 250
        after: $after
        sortKey: PUBLISHED_AT
        reverse: true
      ) {
        nodes {
          title
          handle
          tags
          image {
            url
            altText
            width
            height
          }
          excerpt
          content
          result: metafield(namespace: "custom", key: "result") {
            value
          }
          services: metafield(namespace: "custom", key: "services") {
            value
          }
          logo: metafield(namespace: "custom", key: "logo") {
            reference {
              ... on MediaImage {
                image {
                  url
                  altText
                  width
                  height
                }
              }
            }
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
` as const;
