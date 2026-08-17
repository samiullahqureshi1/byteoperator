import workHeroStyles from '~/styles/work-hero.css?url';
import workResultsStyles from '~/styles/work-results.css?url';
import workFeaturedProjectsStyles from '~/styles/work-featured-projects.css?url';
import workTopCaseStudiesStyles from '~/styles/work-top-case-studies.css?url';
import workTeamCtaStyles from '~/styles/work-team-cta.css?url';
import workCaseStudiesStyles from '~/styles/work-case-studies.css?url';
import workTestimonialStyles from '~/styles/work-testimonial.css?url';
import type {WorkCaseStudiesQuery} from 'storefrontapi.generated';
import homeFeatureStyles from '~/styles/home-feature.css?url';
import homePeopleStyles from '~/styles/home-people.css?url';
import servicesDirectoryStyles from '~/styles/services-directory.css?url';
import servicesWideImageStyles from '~/styles/services-wide-image.css?url';
import {ServicesPage} from '~/components/ServicesPage';
import servicesHeroStyles from '~/styles/services-hero.css?url';
import {
  useLoaderData,
} from 'react-router';
import type {Route} from './+types/pages.$handle';
import {redirectIfHandleIsLocalized} from '~/lib/redirect';
import {WorkPage} from '~/components/WorkPage';
import homeExpertsStyles from '~/styles/home-experts.css?url';
import servicesPageStyles from '~/styles/services-page.css?url';
import homePartnersStyles from '~/styles/home-partners.css?url';

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
];
export async function loader(args: Route.LoaderArgs) {
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
async function loadCriticalData({
  context,
  request,
  params,
}: Route.LoaderArgs) {
  if (!params.handle) {
    throw new Error('Missing page handle');
  }

  const [
    {page},
    featuredBlogData,
    topCaseStudiesBlogData,
    caseStudyArticles,
  ] = await Promise.all([
    context.storefront.query(PAGE_QUERY, {
      variables: {
        handle: params.handle,
      },
    }),
    params.handle === 'work'
      ? context.storefront.query(FEATURED_PROJECTS_QUERY)
      : Promise.resolve({blog: null}),
    params.handle === 'work'
      ? context.storefront.query(TOP_CASE_STUDIES_QUERY)
      : Promise.resolve({blog: null}),
    params.handle === 'work'
      ? loadAllCaseStudies(context)
      : Promise.resolve([]),
  ]);

  if (!page) {
    throw new Response('Not Found', {status: 404});
  }

  redirectIfHandleIsLocalized(request, {handle: params.handle, data: page});

  return {
    page,
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
  const {
    page,
    featuredArticles,
    topCaseStudyArticles,
    caseStudyArticles,
  } = useLoaderData<typeof loader>();

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
