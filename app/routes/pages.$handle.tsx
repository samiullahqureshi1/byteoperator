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
import {redirect, useLoaderData} from 'react-router';
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
import migrationPlatformsAccordionStyles from '~/styles/migration-platforms-accordion.css?url';
import servicePlusAgencyCtaStyles from '~/styles/service-plus-agency-cta.css?url';
import ecommerceSeoHeroStyles from '~/styles/ecommerce-seo-hero.css?url';
import ecommerceSeoCasesStyles from '~/styles/ecommerce-seo-cases.css?url';
import ecommerceSeoAboutStyles from '~/styles/ecommerce-seo-about.css?url';
import ecommerceSeoProcessStyles from '~/styles/ecommerce-seo-process.css?url';
import ecommerceSeoServicesStyles from '~/styles/ecommerce-seo-services.css?url';
import ecommerceSeoTechStackStyles from '~/styles/ecommerce-seo-tech-stack.css?url';
import ecommerceSeoEducationStyles from '~/styles/ecommerce-seo-education.css?url';
import ecommerceSeoReportingStyles from '~/styles/ecommerce-seo-reporting.css?url';
import ecommerceSeoFaqStyles from '~/styles/ecommerce-seo-faq.css?url';
import ecommerceSeoTestimonialStyles from '~/styles/ecommerce-seo-testimonial.css?url';
import ecommerceSeoExpertsStyles from '~/styles/ecommerce-seo-experts.css?url';
import ecommerceSeoResultsStyles from '~/styles/ecommerce-seo-results.css?url';
import ecommerceSeoWhoItsForStyles from '~/styles/ecommerce-seo-who-its-for.css?url';
import ecommerceSeoShopifySpecialismStyles from '~/styles/ecommerce-seo-shopify-specialism.css?url';
import shopifyCroOptimiseStyles from '~/styles/shopify-cro-optimise.css?url';
import aboutHeroStyles from '~/styles/about-hero.css?url';
import aboutStoryStatsStyles from '~/styles/about-story-stats.css?url';
import aboutValuesStyles from '~/styles/about-values.css?url';
import aboutTestimonialsStyles from '~/styles/about-testimonials.css?url';
import aboutSpaceStyles from '~/styles/about-space.css?url';
import aboutTeamStyles from '~/styles/about-team.css?url';
import aboutJoinStyles from '~/styles/about-join.css?url';
import homeSideRailStyles from '~/styles/home-side-rail.css?url';
import {ServiceDetailPage} from '~/components/services/ServiceDetailPage';
import {ShopifyPlusPage} from '~/components/services/ShopifyPlusPage';
import {EcommerceSeoHero} from '~/components/seo/EcommerceSeoHero';
import {EcommerceSeoCases} from '~/components/seo/EcommerceSeoCases';
import {EcommerceSeoProcess} from '~/components/seo/EcommerceSeoProcess';
import {EcommerceSeoServices} from '~/components/seo/EcommerceSeoServices';
import {ShopifyCroOptimise} from '~/components/cro/ShopifyCroOptimise';
import {AboutHero} from '~/components/about/AboutHero';
import {AboutStoryStats} from '~/components/about/AboutStoryStats';
import {AboutValues} from '~/components/about/AboutValues';
import {AboutTestimonials} from '~/components/about/AboutTestimonials';
import {AboutSpace} from '~/components/about/AboutSpace';
import {AboutTeam} from '~/components/about/AboutTeam';
import {AboutJoin} from '~/components/about/AboutJoin';
import {HomeObservatory} from '~/components/HomeObservatory';
import {HomeSideRail} from '~/components/HomeSideRail';
import {EcommerceSeoTechStack} from '~/components/seo/EcommerceSeoTechStack';
import {EcommerceSeoEducation} from '~/components/seo/EcommerceSeoEducation';
import {EcommerceSeoReporting} from '~/components/seo/EcommerceSeoReporting';
import {ServiceDetailFaqs} from '~/components/services/detail/ServiceDetailFaqs';
import {WorkTestimonial} from '~/components/work/WorkTestimonial';
import {EcommerceSeoResults} from '~/components/seo/EcommerceSeoResults';
import {HomeExperts} from '~/components/HomeExperts';
import {ServicePlusAgencyCta} from '~/components/services/detail/ServicePlusAgencyCta';
import {EcommerceSeoShopifySpecialism} from '~/components/seo/EcommerceSeoShopifySpecialism';
import {
  ECOMMERCE_SEO_PARTNER_LOGOS,
  HomePartners,
} from '~/components/HomePartners';
import {
  ECOMMERCE_SEO_VERIFIED_PROOF_ITEMS,
  EcommerceSeoProofStrip,
} from '~/components/seo/EcommerceSeoProofStrip';
import {
  SERVICE_PAGE_CONFIGS,
  type ServicePageHandle,
} from '~/data/servicePages';
import type {ServiceDetailFaqItem} from '~/components/services/detail/ServiceDetailFaqs';
import {
  isSamePath,
  resolveCleanPath,
  resolveServiceConfigHandle,
  AI_SEO_PAGE_HANDLE,
  GEO_PAGE_HANDLE,
  CRO_PAGE_HANDLE,
  SHOPIFY_PLUS_PAGE_HANDLE,
} from '~/lib/route-mappings';

const GEO_SERVICE_PILLARS = [
  {key: 'geo-foundations', number: '01', title: 'GEO Services for Shopify', accordionDescription: 'We review Shopify foundations, product information and content structures that help generative engines understand an ecommerce store.', previewDescription: 'GEO starts with clear, accessible store information that can be accurately understood and surfaced by generative search systems.', checks: ['Generative search audit', 'Shopify information review', 'Machine-readable content foundations']},
  {key: 'prompt-research', number: '02', title: 'Prompt & Intent Research', accordionDescription: 'We research the questions, prompts and commercial intents that matter to your customers across emerging AI search journeys.', previewDescription: 'Understanding how shoppers ask for recommendations and comparisons helps focus GEO work on useful, relevant opportunities.', checks: ['Prompt discovery', 'Intent mapping', 'Commercial question research']},
  {key: 'generative-content', number: '03', title: 'Content for Generative Engines', accordionDescription: 'We plan and improve product, collection and editorial content so key information is clear, useful and consistently structured.', previewDescription: 'Helpful content gives generative engines stronger context about products, categories and customer needs.', checks: ['Product information clarity', 'Collection content planning', 'Editorial content priorities']},
  {key: 'structured-data', number: '04', title: 'Structured Data & Schema', accordionDescription: 'We review structured data and schema opportunities that make important ecommerce details easier for systems to interpret.', previewDescription: 'Structured information supports a clearer, more consistent representation of your store across search experiences.', checks: ['Schema review', 'Product data structure', 'Technical implementation priorities']},
  {key: 'entity-brand', number: '05', title: 'Entity & Brand Optimisation', accordionDescription: 'We strengthen the signals that help systems understand your brand, products, categories and relevant areas of expertise.', previewDescription: 'Clear entity and brand signals make it easier to connect your ecommerce offering with relevant customer questions.', checks: ['Brand information consistency', 'Entity relationships', 'Category context']},
  {key: 'product-feed', number: '06', title: 'Product Feed & AI Readability', accordionDescription: 'We review product feeds and onsite information for clarity, consistency and the details customers need to compare products.', previewDescription: 'Readable product information supports more useful product discovery across changing search environments.', checks: ['Product attribute review', 'Feed clarity checks', 'Comparison-ready information']},
  {key: 'digital-pr', number: '07', title: 'Digital PR & Citation Building', accordionDescription: 'We identify credible opportunities to build useful references and supporting signals around your brand and ecommerce offering.', previewDescription: 'Relevant third-party references can help establish clearer context around a brand, its products and its expertise.', checks: ['Relevant reference opportunities', 'Brand mention review', 'Credible outreach priorities']},
  {key: 'geo-reporting', number: '08', title: 'GEO Reporting & Citation Tracking', accordionDescription: 'We document generative search observations, ongoing work and the priorities that should shape the next phase of optimisation.', previewDescription: 'Clear reporting turns evolving GEO signals into practical actions for ecommerce teams.', checks: ['Generative visibility review', 'Citation monitoring', 'Prioritised next steps']},
] as const;

const CRO_PROCESS_STEPS = [
  {number: '01', title: 'Audit & Discovery', description: 'Review customer journeys, analytics and storefront behaviour to identify practical conversion opportunities.'},
  {number: '02', title: 'Hypothesise & Prioritise', description: 'Turn observations into clear hypotheses, then prioritise the changes worth testing first.'},
  {number: '03', title: 'Test & Iterate', description: 'Improve key journeys through structured testing and learn from how customers respond.'},
  {number: '04', title: 'Scale & Compound', description: 'Apply validated learnings across the store and use them to guide the next optimisation cycle.'},
] as const;

const CRO_SERVICE_PILLARS = [
  {key: 'product-pages', number: '01', title: 'Product Pages & Collections', accordionDescription: 'We review product and collection experiences for clarity, confidence and easier decision-making.', previewDescription: 'Product and collection pages are key commercial touchpoints where clearer information can support conversion.', checks: ['Product information review', 'Collection journey checks', 'Merchandising priorities']},
  {key: 'checkout-flow', number: '02', title: 'Checkout & Cart Flow', accordionDescription: 'We examine cart and checkout journeys for friction, reassurance and opportunities to make completing an order feel simpler.', previewDescription: 'A focused review of cart and checkout helps identify practical improvements in the path to purchase.', checks: ['Cart journey review', 'Checkout friction checks', 'Reassurance opportunities']},
  {key: 'landing-pages', number: '03', title: 'Homepage & Landing Pages', accordionDescription: 'We improve key entry pages so messaging, navigation and calls to action support the visitor journey.', previewDescription: 'Landing experiences should make the next step clear for visitors arriving from different channels.', checks: ['Message clarity', 'Call-to-action review', 'Entry-page journeys']},
  {key: 'navigation', number: '04', title: 'Navigation & Site Search', accordionDescription: 'We assess navigation, filtering and search journeys to make product discovery easier and more intuitive.', previewDescription: 'Customers need to find relevant products quickly, especially in larger ecommerce catalogues.', checks: ['Navigation review', 'Search experience checks', 'Filter usability']},
  {key: 'mobile', number: '05', title: 'Mobile Experience', accordionDescription: 'We review the mobile storefront for readable, usable journeys that support shoppers on smaller screens.', previewDescription: 'Mobile optimisation focuses on the details that make browsing and buying feel straightforward on any device.', checks: ['Mobile journey review', 'Touchpoint usability', 'Responsive content checks']},
  {key: 'pricing', number: '06', title: 'Pricing & Promotions', accordionDescription: 'We assess how price, value, delivery and promotional information is presented throughout the buying journey.', previewDescription: 'Clear commercial information helps customers understand value before they commit to a purchase.', checks: ['Value communication', 'Promotion clarity', 'Delivery information']},
] as const;

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
  href: migrationPlatformsAccordionStyles,
},
{
  rel: 'stylesheet',
  href: servicePlusAgencyCtaStyles,
},
  {
    rel: 'stylesheet',
    href: shopifyPlusPageStyles,
},
{
  rel: 'stylesheet',
  href: ecommerceSeoHeroStyles,
},
{
  rel: 'stylesheet',
  href: ecommerceSeoCasesStyles,
},
{
  rel: 'stylesheet',
  href: ecommerceSeoAboutStyles,
},
{
  rel: 'stylesheet',
  href: ecommerceSeoProcessStyles,
},
{
  rel: 'stylesheet',
  href: ecommerceSeoServicesStyles,
},
{
  rel: 'stylesheet',
  href: ecommerceSeoTechStackStyles,
},
{
  rel: 'stylesheet',
  href: ecommerceSeoEducationStyles,
},
{
  rel: 'stylesheet',
  href: ecommerceSeoReportingStyles,
},
{
  rel: 'stylesheet',
  href: ecommerceSeoFaqStyles,
},
{
  rel: 'stylesheet',
  href: ecommerceSeoTestimonialStyles,
},
{
  rel: 'stylesheet',
  href: ecommerceSeoExpertsStyles,
},
{
  rel: 'stylesheet',
  href: ecommerceSeoResultsStyles,
},
{
  rel: 'stylesheet',
  href: ecommerceSeoWhoItsForStyles,
},
{
  rel: 'stylesheet',
  href: ecommerceSeoShopifySpecialismStyles,
},
{
  rel: 'stylesheet',
  href: shopifyCroOptimiseStyles,
},
{
  rel: 'stylesheet',
  href: aboutHeroStyles,
},
{
  rel: 'stylesheet',
  href: aboutStoryStatsStyles,
},
{
  rel: 'stylesheet',
  href: aboutValuesStyles,
},
{
  rel: 'stylesheet',
  href: aboutTestimonialsStyles,
},
{
  rel: 'stylesheet',
  href: aboutSpaceStyles,
},
{
  rel: 'stylesheet',
  href: aboutTeamStyles,
},
{
  rel: 'stylesheet',
  href: aboutJoinStyles,
},
{
  rel: 'stylesheet',
  href: homeSideRailStyles,
},
];
export async function loader(args: Route.LoaderArgs) {
  const rawHandle = args.params.handle;

  if (!rawHandle) {
    throw new Error('Missing page handle');
  }

  // Single-fetch data requests may expose the `.data` suffix as part of the
  // parameter. Canonicalize the public route handle, never the raw data URL.
  const handle = rawHandle.endsWith('.data')
    ? rawHandle.slice(0, -'.data'.length)
    : rawHandle;
  const requestUrl = new URL(args.request.url);
  const pagePath = `/pages/${handle}`;
  const cleanPath = resolveCleanPath(pagePath);

  // Ignore a trailing-slash-only difference for React Router single fetches.
  // A genuine alias still redirects once to its canonical public URL.
  if (!isSamePath(cleanPath, pagePath)) {
    throw redirect(cleanPath + requestUrl.search, 301);
  }

  const deferredData = loadDeferredData(args);
  const criticalData = await loadPageData({
    context: args.context,
    request: args.request,
    handle,
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
    handle === 'work' ||
      handle === 'ecommerce-seo-agency' ||
      handle === AI_SEO_PAGE_HANDLE ||
      handle === GEO_PAGE_HANDLE ||
      handle === CRO_PAGE_HANDLE
      ? context.storefront.query(FEATURED_PROJECTS_QUERY)
      : Promise.resolve({blog: null}),
    handle === 'work'
      ? context.storefront.query(TOP_CASE_STUDIES_QUERY)
      : Promise.resolve({blog: null}),
    handle === 'work' ||
      handle === 'ecommerce-seo-agency' ||
      handle === AI_SEO_PAGE_HANDLE ||
      handle === GEO_PAGE_HANDLE ||
      handle === CRO_PAGE_HANDLE
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
  const seenCursors = new Set<string>();
  let after: string | null = null;

  do {
    const data: WorkCaseStudiesQuery = await context.storefront.query(
      CASE_STUDIES_QUERY,
      {variables: {after}},
    );
    const connection: NonNullable<
      WorkCaseStudiesQuery['blog']
    >['articles'] | undefined = data.blog?.articles;

    if (!connection) break;

    articles.push(...connection.nodes);

    const nextCursor = connection.pageInfo.hasNextPage
      ? connection.pageInfo.endCursor
      : null;

    if (!nextCursor || seenCursors.has(nextCursor)) break;

    seenCursors.add(nextCursor);
    after = nextCursor;
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

  if (page.handle === 'about-us' || page.handle === 'about') {
    return (
      <>
        <HomeSideRail heroSelector=".ft-about-hero" />
        <AboutHero />
        <AboutStoryStats />
        <AboutValues />
        <AboutTestimonials />
        <AboutSpace />
        <AboutTeam />
        <AboutJoin />
        <HomeObservatory />
      </>
    );
  }

  if (page.handle === SHOPIFY_PLUS_PAGE_HANDLE) {
    return <ShopifyPlusPage />;
  }

  if (
    page.handle === 'ecommerce-seo-agency' ||
    page.handle === AI_SEO_PAGE_HANDLE ||
    page.handle === GEO_PAGE_HANDLE ||
    page.handle === CRO_PAGE_HANDLE
  ) {
    const isAiSeo = page.handle === AI_SEO_PAGE_HANDLE;
    const isGeoSeo = page.handle === GEO_PAGE_HANDLE;
    const isCro = page.handle === CRO_PAGE_HANDLE;
    const isGenerativeSeo = isAiSeo || isGeoSeo;
    const generativeResults = isGeoSeo ? [
      {stat: '01', title: 'Generative Search Baseline', description: 'Establish a clear baseline for how your brand, products and content appear across relevant generative search experiences.'},
      {stat: '02', title: 'Entity & Content Priorities', description: 'Identify the structured information and content improvements that can make your ecommerce offering clearer to AI systems.'},
      {stat: '03', title: 'Citation Tracking Roadmap', description: 'Review changing generative search behaviour and prioritise the next practical opportunities as platforms evolve.'},
    ] : [
      {stat: '01', title: 'AI Visibility Baseline', description: 'Establish a clear baseline for how your brand and content appear across relevant AI-powered search experiences.'},
      {stat: '02', title: 'Structured Content Priorities', description: 'Identify the technical and content improvements that can make product and category information clearer to AI systems.'},
      {stat: '03', title: 'Ongoing AI Search Review', description: 'Review changing search behaviour and prioritise the next practical opportunities as AI search develops.'},
    ];

    return (
      <>
        <EcommerceSeoHero
          croInteractive={isCro}
          title={isCro ? 'Shopify CRO Agency Built for Ecommerce Conversion Growth' : isGeoSeo ? 'Generative Engine Optimisation for Ecommerce. Built for Shopify. Ready for AI Search.' : isAiSeo ? 'AI SEO Agency Built for Ecommerce Discovery' : undefined}
          description={isCro ? 'FoldTech helps ecommerce brands improve key customer journeys through research-led optimisation, practical testing and continuous learning.' : isGeoSeo ? 'FoldTech helps ecommerce brands make their products, content and brand information clearer for generative search through structured, search-led optimisation.' : isAiSeo ? 'FoldTech helps ecommerce brands improve visibility across AI-powered search through technical foundations, structured content and search-led optimisation.' : undefined}
          pillLabel={isGeoSeo ? 'Preparing ecommerce stores for generative search' : isAiSeo ? 'Looking to improve organic visibility? Explore Ecommerce SEO' : undefined}
          pillTo={isGeoSeo ? '/ai-seo-agency/' : isAiSeo ? '/ecommerce-seo-agency/' : undefined}
          ctaLabel={isCro ? 'Talk to our CRO team' : isGeoSeo ? 'Talk to our GEO team' : isAiSeo ? 'Talk to our AI SEO team' : undefined}
          secondaryCta={isGeoSeo ? {label: 'Looking for AI SEO? Click here →', to: '/ai-seo-agency/'} : isAiSeo ? {label: 'Looking for Ecommerce SEO? Click here →', to: '/ecommerce-seo-agency/'} : undefined}
        />
        <EcommerceSeoCases pageTag={page.handle} articles={caseStudyArticles} featuredArticles={featuredArticles} />
        <EcommerceSeoProcess
          compactTestimonial={isCro}
          label={isCro ? 'Our CRO Process' : undefined}
          title={isCro ? 'How We Optimise Ecommerce Conversion' : undefined}
          subtitle={isCro ? 'A structured four-step process connects customer insight, testing and continuous improvement.' : undefined}
          steps={isCro ? CRO_PROCESS_STEPS : undefined}
        />
        {isCro ? <ShopifyCroOptimise /> : null}
        {!isCro ? (
          <EcommerceSeoServices
            label={isGeoSeo ? 'Our GEO Services' : undefined}
            title={isGeoSeo ? 'Every Layer of Generative Engine Optimisation. Covered.' : undefined}
            pillars={isGeoSeo ? GEO_SERVICE_PILLARS : undefined}
          />
        ) : null}
        <EcommerceSeoTechStack />
        <EcommerceSeoResults
          variant={isGenerativeSeo || isCro ? 'ai' : undefined}
          eyebrow={isCro ? 'Conversion Performance' : isGeoSeo ? 'Generative Search Visibility' : isAiSeo ? 'AI Search Visibility' : undefined}
          title={isCro ? 'A Clear View of Ecommerce Optimisation Opportunities' : isGeoSeo ? 'A Clear View of Generative Search Opportunities' : isAiSeo ? 'A Clear View of AI Search Opportunities' : undefined}
          results={isCro ? [{stat: '01', title: 'Journey Baseline', description: 'Understand how customers currently move through key ecommerce journeys.'}, {stat: '02', title: 'Prioritised Hypotheses', description: 'Focus optimisation work on clear, testable opportunities.'}, {stat: '03', title: 'Ongoing Learning', description: 'Use each iteration to inform the next practical improvement.'}] : isGenerativeSeo ? generativeResults : undefined}
        />
        <HomeExperts
          variant="ecommerce-seo"
          eyebrow={isCro ? 'Is CRO Right for You?' : isGeoSeo ? 'Is GEO Right for You?' : isAiSeo ? 'Is AI SEO Right for You?' : 'Is Ecommerce SEO Right for You?'}
          heading={isCro ? 'CRO Works Best for Brands Ready to Scale With Data' : isGeoSeo ? 'GEO Works Best for Brands Ready to Make Their Information Clearer' : isAiSeo ? 'AI SEO Works Best for Brands Ready to Build Search Resilience' : 'SEO Works Best for Brands Ready to Invest in Sustainable Growth'}
          description={isCro ? 'Our CRO services are designed for ecommerce teams ready to learn from customer behaviour, improve key journeys and build a more deliberate optimisation programme.' : isGeoSeo ? 'Our GEO services are designed for ecommerce teams preparing their stores for generative search. The strongest fit is with brands ready to invest in clear product information, structured content, entity signals and ongoing optimisation.' : isAiSeo ? 'Our AI SEO services are designed for ecommerce teams that want to prepare their stores for changing search behaviour. The strongest fit is with brands ready to invest in clear product information, technical foundations, structured content and ongoing optimisation.' : 'Our ecommerce SEO services are designed for online stores that want organic search to become a reliable, long-term growth channel. The strongest fit is with ecommerce teams that are ready to invest consistently in technical improvements, content, site structure and ongoing optimisation rather than looking for short-term ranking fixes. We work alongside businesses that want SEO decisions connected to their wider ecommerce goals, development roadmap and customer journey.'}
          ctaLabel="See if we're a good fit"
          ctaTo="/contact"
        />
        {!isCro ? <EcommerceSeoShopifySpecialism /> : null}
        <div className="ft-ecommerce-seo-partners">
          <HomePartners
            label={isCro ? 'Our CRO & Analytics Stack' : isGeoSeo ? 'Our GEO & Analytics Stack' : isAiSeo ? 'Our AI SEO & Analytics Stack' : 'Our SEO & Analytics Stack'}
            heading={isCro ? 'The Platforms Behind Every Optimisation We Deliver' : isGeoSeo ? 'The Platforms Behind Every GEO Campaign We Deliver' : isAiSeo ? 'The Platforms Behind Every AI SEO Campaign We Deliver' : 'The Platforms Behind Every Ecommerce SEO Campaign We Deliver'}
            description={[isCro ? 'Effective conversion optimisation requires the right combination of analytics, research and experimentation tools. Our stack helps us understand customer behaviour, review key journeys and turn data into clear optimisation priorities for ecommerce stores.' : isGeoSeo ? 'Effective generative engine optimisation requires the right combination of crawling, analytics, research and content tools. Our stack brings together the platforms we use to review technical performance, understand search demand and turn data into clear optimisation priorities for ecommerce stores.' : isAiSeo ? 'Effective AI SEO requires the right combination of crawling, analytics, research and content tools. Our stack brings together the platforms we use to review technical performance, understand search demand and turn data into clear optimisation priorities for ecommerce stores.' : 'Effective ecommerce SEO requires the right combination of crawling, analytics, research and content tools. Our stack brings together the platforms we use to audit technical performance, understand search demand, measure user behaviour and turn data into clear optimisation priorities for ecommerce stores.']}
            logos={ECOMMERCE_SEO_PARTNER_LOGOS}
            showCta={false}
          />
          <EcommerceSeoProofStrip items={ECOMMERCE_SEO_VERIFIED_PROOF_ITEMS} />
        </div>
        <EcommerceSeoEducation html={page.body} />
        {!isCro ? <EcommerceSeoReporting
          eyebrow={isGenerativeSeo ? 'Transparency & Reporting' : undefined}
          title={isGeoSeo ? 'How We Measure GEO Success' : isAiSeo ? 'How We Measure AI SEO Success' : undefined}
          intro={isGeoSeo ? 'Effective GEO should be measured against meaningful search and commercial signals, not isolated vanity metrics. We review generative search visibility alongside organic performance to understand what is improving, where opportunities remain and what should be prioritised next.' : isAiSeo ? 'Effective AI SEO should be measured against meaningful search and commercial signals, not isolated vanity metrics. We review AI search visibility alongside organic performance to understand what is improving, where opportunities remain and what should be prioritised next.' : undefined}
        /> : null}
        {page.faqs.length ? (
          <div className="ft-ecommerce-seo-faq">
            <ServiceDetailFaqs title={isCro ? 'Shopify CRO Services' : isGeoSeo ? 'GEO Services' : isAiSeo ? 'AI SEO Services' : 'Ecommerce SEO Services'} faqs={page.faqs} />
          </div>
        ) : null}
        <div className="ft-ecommerce-seo-testimonial"><WorkTestimonial /></div>
        {SERVICE_PAGE_CONFIGS['shopify-app-development'].plusAgencyCta ? <ServicePlusAgencyCta data={SERVICE_PAGE_CONFIGS['shopify-app-development'].plusAgencyCta} /> : null}
        <div className="ft-ecommerce-seo-experts"><HomeExperts /></div>
      </>
    );
  }

  const servicePageConfig =
    SERVICE_PAGE_CONFIGS[
      resolveServiceConfigHandle(page.handle) as ServicePageHandle
    ];

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
