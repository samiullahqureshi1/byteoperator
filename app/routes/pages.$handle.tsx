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
import bulkHoursCtaStyles from '~/styles/bulk-hours-cta.css?url';
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
import aiVisibilityAuditStyles from '~/styles/ai-visibility-audit.css?url';
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
// TEMPORARILY DISABLED: "Our Leadership Team" section.
// To restore, uncomment this import and the <AboutTeam /> render below.
// import {AboutTeam} from '~/components/about/AboutTeam';
import {AboutJoin} from '~/components/about/AboutJoin';
import {HomeObservatory} from '~/components/HomeObservatory';
import {HomeSideRail} from '~/components/HomeSideRail';
import {AiVisibilityAuditHero} from '~/components/audit/AiVisibilityAuditHero';
import {EcommerceSeoTechStack} from '~/components/seo/EcommerceSeoTechStack';
import {EcommerceSeoEducation} from '~/components/seo/EcommerceSeoEducation';
import {EcommerceSeoReporting} from '~/components/seo/EcommerceSeoReporting';
import {ServiceDetailFaqs} from '~/components/services/detail/ServiceDetailFaqs';
import {WorkTestimonial} from '~/components/work/WorkTestimonial';
import {EcommerceSeoResults} from '~/components/seo/EcommerceSeoResults';
import {HomeExperts} from '~/components/HomeExperts';
import {
  caseStudyJsonLd,
  clientNameFromHandle,
  contentPageJsonLd,
  findService,
  serviceJsonLd,
  textFromHtml,
} from '~/lib/seo/jsonld';
import {absoluteUrl, type WebPageType} from '~/lib/seo/schema';
import {isKnownEmptyPage} from '~/lib/seo/empty-pages';
import {ServicePlusAgencyCta} from '~/components/services/detail/ServicePlusAgencyCta';
import {BulkHoursCta} from '~/components/services/detail/BulkHoursCta';
import {BULK_HOURS_HANDLE, BULK_HOURS_QUERY} from '~/components/BulkHours';
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
  type ServicePageConfig,
  type ServicePageHandle,
} from '~/data/servicePages';
import type {ServiceDetailFaqItem} from '~/components/services/detail/ServiceDetailFaqs';
import {
  isSamePath,
  resolveCanonicalPath,
  resolveCleanPath,
  resolveServiceConfigHandle,
  CONTACT_PAGE_HANDLE,
  CONTACT_CLEAN_PATH,
  AI_SEO_PAGE_HANDLE,
  GEO_PAGE_HANDLE,
  AI_VISIBILITY_AUDIT_PAGE_HANDLE,
  CRO_PAGE_HANDLE,
  CRO_CLEAN_PATH,
  AB_TESTING_PAGE_HANDLE,
  SHOPIFY_PLUS_PAGE_HANDLE,
} from '~/lib/route-mappings';

/*
 * `links()` has no access to loader data, so a static links() export can
 * only ever be "load every stylesheet any branch of <PageContent> might
 * need, on every request" — that used to mean downloading all ~49 section
 * stylesheets below even for a page that only renders 8-10 of them.
 *
 * `meta()` *does* receive loader data, and <Meta/> is able to render
 * `{tagName: 'link', ...}` entries (already used above for canonical
 * links), so `getPageStylesheetLinks` mirrors the exact branching logic in
 * <PageContent> and is called from `meta()` instead, letting each request
 * download only the stylesheets its own branch actually renders.
 *
 * STYLESHEET_ORDER preserves the combined ordering the old static links()
 * array used, so cascade order (rules of equal specificity) is unchanged.
 */
const STYLESHEET_ORDER: ReadonlyArray<readonly [string, string]> = [
  ['work-hero', workHeroStyles],
  ['work-results', workResultsStyles],
  ['work-featured-projects', workFeaturedProjectsStyles],
  ['work-top-case-studies', workTopCaseStudiesStyles],
  ['work-team-cta', workTeamCtaStyles],
  ['work-case-studies', workCaseStudiesStyles],
  ['home-feature', homeFeatureStyles],
  ['home-hero-gallery', homeHeroGalleryStyles],
  ['home-about', homeAboutStyles],
  ['home-services', homeServicesStyles],
  ['client-logo-grid', clientLogoGridStyles],
  ['home-projects', homeProjectsStyles],
  ['home-people', homePeopleStyles],
  ['work-testimonial', workTestimonialStyles],
  ['home-experts', homeExpertsStyles],
  ['home-observatory', homeObservatoryStyles],
  ['services-hero', servicesHeroStyles],
  ['services-wide-image', servicesWideImageStyles],
  ['services-directory', servicesDirectoryStyles],
  ['services-page', servicesPageStyles],
  ['home-partners', homePartnersStyles],
  ['service-about-section', serviceAboutSectionStyles],
  ['service-detail-faqs', serviceDetailFaqStyles],
  ['migration-platforms-accordion', migrationPlatformsAccordionStyles],
  ['service-plus-agency-cta', servicePlusAgencyCtaStyles],
  ['bulk-hours-cta', bulkHoursCtaStyles],
  ['shopify-plus-page', shopifyPlusPageStyles],
  ['ecommerce-seo-hero', ecommerceSeoHeroStyles],
  ['ecommerce-seo-cases', ecommerceSeoCasesStyles],
  ['ecommerce-seo-about', ecommerceSeoAboutStyles],
  ['ecommerce-seo-process', ecommerceSeoProcessStyles],
  ['ecommerce-seo-services', ecommerceSeoServicesStyles],
  ['ecommerce-seo-tech-stack', ecommerceSeoTechStackStyles],
  ['ecommerce-seo-education', ecommerceSeoEducationStyles],
  ['ecommerce-seo-reporting', ecommerceSeoReportingStyles],
  ['ecommerce-seo-faq', ecommerceSeoFaqStyles],
  ['ecommerce-seo-testimonial', ecommerceSeoTestimonialStyles],
  ['ecommerce-seo-experts', ecommerceSeoExpertsStyles],
  ['ecommerce-seo-results', ecommerceSeoResultsStyles],
  ['ecommerce-seo-who-its-for', ecommerceSeoWhoItsForStyles],
  ['ecommerce-seo-shopify-specialism', ecommerceSeoShopifySpecialismStyles],
  ['shopify-cro-optimise', shopifyCroOptimiseStyles],
  ['about-hero', aboutHeroStyles],
  ['about-story-stats', aboutStoryStatsStyles],
  ['about-values', aboutValuesStyles],
  ['about-testimonials', aboutTestimonialsStyles],
  ['about-space', aboutSpaceStyles],
  ['about-team', aboutTeamStyles],
  ['about-join', aboutJoinStyles],
  ['home-side-rail', homeSideRailStyles],
  ['ai-visibility-audit', aiVisibilityAuditStyles],
];

type PageStylesheetSource = {
  handle?: string | null;
  faqs?: readonly unknown[];
};

/**
 * Mirrors the `page.handle` branching in <PageContent> below so each
 * request's <head> only gets the stylesheets that branch actually renders.
 * Keep this in sync with <PageContent> when that branching changes.
 */
export function getPageStylesheetLinks(page: PageStylesheetSource | undefined) {
  const handle = page?.handle;
  if (!handle) return [];

  const hasFaqs = (page?.faqs?.length ?? 0) > 0;
  const needed = new Set<string>();
  const add = (...keys: string[]) => keys.forEach((key) => needed.add(key));

  if (handle === AI_VISIBILITY_AUDIT_PAGE_HANDLE) {
    add('ai-visibility-audit');
  } else if (handle === 'work') {
    add(
      'work-hero',
      'work-results',
      'work-featured-projects',
      'work-top-case-studies',
      'work-team-cta',
      'work-case-studies',
      'work-testimonial',
      'home-people',
      'home-experts',
    );
  } else if (handle === 'services') {
    add(
      'services-hero',
      'work-hero', // ServiceHero's ClientProof block on the services landing page
      'services-wide-image',
      'services-directory',
      'home-people',
      'home-feature',
      'home-partners',
      'work-testimonial',
      'home-experts',
      'services-page',
    );
  } else if (handle === 'about-us' || handle === 'about') {
    add(
      'home-side-rail',
      'about-hero',
      'work-hero', // VideoModal in AboutHero / AboutTestimonials
      'about-story-stats',
      'about-values',
      'about-testimonials',
      'about-space',
      'about-team', // <AboutTeam/> is currently disabled but kept ready
      'about-join',
      'home-observatory',
    );
  } else if (handle === SHOPIFY_PLUS_PAGE_HANDLE) {
    add(
      'services-hero',
      'work-hero', // both ServiceHero configs on this page set showClientProof
      'home-hero-gallery',
      'client-logo-grid',
      'home-projects',
      'home-feature',
      'home-people',
      'home-partners',
      'home-experts',
      'home-observatory',
      'shopify-plus-page',
    );
  } else if (
    handle === 'ecommerce-seo-agency' ||
    handle === AI_SEO_PAGE_HANDLE ||
    handle === GEO_PAGE_HANDLE ||
    handle === CRO_PAGE_HANDLE ||
    handle === AB_TESTING_PAGE_HANDLE ||
    handle === 'search-first'
  ) {
    const isCro = handle === CRO_PAGE_HANDLE;
    const isSearchFirst = handle === 'search-first';
    const usesCroLayout = isCro || isSearchFirst;

    add(
      'ecommerce-seo-hero',
      'ecommerce-seo-cases',
      'ecommerce-seo-about', // EcommerceSeoAboutStatement, rendered inside EcommerceSeoCases
      'work-featured-projects', // used inside EcommerceSeoCases
      'ecommerce-seo-process',
      'ecommerce-seo-tech-stack',
      'ecommerce-seo-results',
      'home-experts',
      'ecommerce-seo-who-its-for', // HomeExperts variant="ecommerce-seo" overrides
      'ecommerce-seo-shopify-specialism', // also carries the always-rendered partners/proof wrapper
      'home-partners',
      'ecommerce-seo-education',
      'ecommerce-seo-testimonial',
      'work-testimonial',
      'ecommerce-seo-experts',
    );

    if (usesCroLayout) add('shopify-cro-optimise');
    if (!usesCroLayout) add('ecommerce-seo-services', 'ecommerce-seo-reporting');
    if (isCro) add('work-hero'); // EcommerceSeoProcess renders ClientProof when compactTestimonial
    if (hasFaqs) add('service-detail-faqs', 'ecommerce-seo-faq');
    if (SERVICE_PAGE_CONFIGS['shopify-app-development']?.plusAgencyCta) {
      add('service-plus-agency-cta');
    }
  } else {
    const config = SERVICE_PAGE_CONFIGS[
      resolveServiceConfigHandle(handle) as ServicePageHandle
    ] as ServicePageConfig | undefined;

    if (config) {
      add('services-hero', 'services-page', 'work-testimonial', 'home-experts');
      if (config.hero?.showClientProof) add('work-hero');
      if (config.about) add('service-about-section');
      if (config.platforms) add('migration-platforms-accordion');
      if (config.features?.length) add('home-feature');
      if (config.showPartners) add('home-partners');
      if (hasFaqs) add('service-detail-faqs');
      if (config.plusAgencyCta) add('service-plus-agency-cta');
    }
  }

  if (isServicePageHandle(handle)) add('bulk-hours-cta');

  return STYLESHEET_ORDER.filter(([key]) => needed.has(key)).map(([, href]) => ({
    tagName: 'link' as const,
    rel: 'stylesheet' as const,
    href,
  }));
}

/**
 * Pages in the SERVICES list (the ones in the Services menu) close with the
 * bulk hours section. Config-driven pages that are not services, such as the
 * podcast, guides or memberships pages, do not.
 */
function findServiceByHandle(handle: string) {
  return findService(resolveCanonicalPath(`/pages/${handle}`));
}

function isServicePageHandle(handle: string) {
  return Boolean(findServiceByHandle(handle));
}

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

/*
 * Content-only overrides for the shared <ShopifyCroOptimise /> comparison
 * section. Layout, toggle behaviour, wireframe and styling are untouched.
 */
const SEARCH_FIRST_PROCESS_STEPS = [
  {number: '01', title: 'Search Behaviour Review', description: 'Look at what customers actually search for, which queries return nothing useful, and where searching visitors drop out compared with those who browse.'},
  {number: '02', title: 'Product Data & Relevance', description: 'Review the product attributes, naming and taxonomy that search relies on, since relevance is usually limited by data quality before it is limited by the search tool.'},
  {number: '03', title: 'Search UX & Merchandising', description: 'Improve the search field, suggestions, results layout, filtering and merchandising rules so results answer intent and reflect commercial priorities.'},
  {number: '04', title: 'Measure & Refine', description: 'Track search usage, no-result queries and conversion from search, then refine synonyms, ranking and content as the catalogue and customer language change.'},
] as const;

const SEARCH_FIRST_COMPARISON = {
  eyebrow: 'What We Improve',
  titleLines: ['Every Search Your Customers Make.', 'Designed to Find Products.'],
  beforeLabel: 'Standard Store Search',
  afterLabel: 'Search-First Experience',
  beforeWireframeLabel: 'Standard store search wireframe',
  afterWireframeLabel: 'Search-first experience wireframe',
  toggleGroupLabel: 'Store search experience preview',
  toggleHint: 'Toggle to see the search-first experience',
  headlineTag: 'Clearer intent',
  ctaTag: 'Guided results',
  gridTag: 'Merchandised results',
  items: [
    {id: 'search-ux', title: 'Search UX & Query Handling', description: 'Review how the search field is surfaced, how suggestions appear as customers type, and how synonyms, misspellings and empty results are handled.'},
    {id: 'results-relevance', title: 'Results Relevance & Ranking', description: 'Examine how products are ranked for a query, which attributes influence relevance, and whether the first screen of results answers the intent behind the search.'},
    {id: 'merchandising', title: 'Search Merchandising', description: 'Consider how commercial priorities, availability and promotions are reflected in results without overriding what the customer actually asked for.'},
    {id: 'filtering', title: 'Filtering & Refinement', description: 'Review the filters offered after a search, how they map to product data, and whether customers can narrow results without losing their place.'},
    {id: 'discovery-journeys', title: 'Discovery & Collection Journeys', description: 'Look at how search connects to navigation and collections, so customers browsing and customers searching reach relevant products by either route.'},
    {id: 'mobile-search', title: 'Mobile Search Experience', description: 'Review the mobile search journey specifically: field visibility, suggestion behaviour, result density and how refinement works on a small screen.'},
  ],
} as const;

const AB_TESTING_SERVICE_PILLARS = [
  {key: 'ab-testing-strategy', number: '01', title: 'Shopify A/B Testing Strategy', accordionDescription: 'We define what is worth testing on your Shopify store, why it matters commercially, and how each experiment will be measured before any build work starts.', previewDescription: 'A testing programme works best when it answers real commercial questions. We prioritise experiments around revenue, customer journeys and the decisions your team actually needs to make.', checks: ['Experiment roadmap and prioritisation', 'Commercial goal and metric definition', 'Test scope and success criteria']},
  {key: 'research-hypotheses', number: '02', title: 'Research & Hypotheses', accordionDescription: 'We combine analytics, heatmaps, session recordings and on-site behaviour to understand where customers hesitate, then turn those findings into clear, testable hypotheses.', previewDescription: 'Strong experiments start with evidence. Research shows where friction exists so tests address real customer behaviour rather than assumptions.', checks: ['Analytics and funnel review', 'Heatmaps and session recordings', 'Structured hypothesis writing']},
  {key: 'landing-page-testing', number: '03', title: 'Landing Page Testing', accordionDescription: 'We test landing page structure, messaging hierarchy, proof, imagery and calls to action to understand what helps visitors move from interest to intent.', previewDescription: 'Landing pages carry campaign traffic. Testing their structure and messaging helps you learn which propositions and layouts genuinely support conversion.', checks: ['Headline and proposition testing', 'Page structure and content order', 'Call-to-action placement and wording']},
  {key: 'product-page-testing', number: '04', title: 'Product Page Testing', accordionDescription: 'We run product page experiments across imagery, descriptions, variant selection, delivery information, reviews and add-to-cart journeys.', previewDescription: 'Product pages are where most purchase decisions happen. Testing the information and layout customers rely on can reduce hesitation at the point of choice.', checks: ['Imagery and gallery experiments', 'Product information and specification layout', 'Variant selection and add-to-cart journeys']},
  {key: 'checkout-journey-testing', number: '05', title: 'Checkout & Customer Journey Testing', accordionDescription: 'We examine cart, checkout and wider customer journeys to find where customers drop out, then test practical changes within the limits of your Shopify plan.', previewDescription: 'Small amounts of friction late in the journey can be costly. Journey testing focuses on the steps between intent and completed order.', checks: ['Cart and mini-cart experiments', 'Checkout journey and friction review', 'Cross-device and mobile journey testing']},
  {key: 'measurement-analysis', number: '06', title: 'Measurement & Analysis', accordionDescription: 'We set up reliable tracking, define sample and duration expectations up front, and analyse results against the commercial metrics that matter.', previewDescription: 'A test is only useful if the result can be trusted. Clear measurement and honest analysis separate genuine learning from noise.', checks: ['Tracking and event configuration', 'Sample size and duration planning', 'Result analysis and significance review']},
  {key: 'experimentation-programme', number: '07', title: 'Ongoing Experimentation Programme', accordionDescription: 'We run testing as a continuous programme, documenting what was learned from each experiment so insight compounds across your store over time.', previewDescription: 'Experimentation works best as a habit rather than a one-off project. Each result informs the next hypothesis and builds a clearer picture of your customers.', checks: ['Documented experiment log', 'Learning reviews and next priorities', 'Roadmap iteration with your team']},
] as const;

const AB_TESTING_PROCESS_STEPS = [
  {number: '01', title: 'Research & Baseline', description: 'Review analytics, customer behaviour and key ecommerce journeys to understand where friction exists and what a realistic baseline looks like.'},
  {number: '02', title: 'Hypothesis & Prioritisation', description: 'Turn findings into clear, testable hypotheses and prioritise them against commercial impact, traffic levels and build effort.'},
  {number: '03', title: 'Build & Run the Test', description: 'Implement the variant, confirm tracking is accurate, and run the experiment for a planned duration so the result can be interpreted fairly.'},
  {number: '04', title: 'Analyse & Iterate', description: 'Review the outcome against the original hypothesis, document what was learned, and feed that insight into the next round of experiments.'},
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

/*
 * Shared page metadata builder.
 *
 * `PAGE_QUERY` already requests the Shopify `seo` fields, so titles and
 * descriptions come from the content that has been approved in Shopify and
 * fall back to the page title only when no SEO title is set.
 *
 * The canonical href is resolved through `resolveCanonicalPath` so a page
 * reachable at both `/pages/x` and its clean URL always points at the single
 * public URL, rather than at the implementation route.
 */
type PageSeoSource = {
  handle?: string | null;
  title?: string | null;
  seo?: {
    title?: string | null;
    description?: string | null;
  } | null;
  /** Parsed `custom.faqs`, rendered visibly by `ServiceDetailFaqs`. */
  faqs?: readonly {question: string; answer: string}[];
};

export function buildPageMeta(
  page: PageSeoSource | undefined,
  canonicalPath?: string,
): ReturnType<Route.MetaFunction> {
  if (!page) {
    return [{title: 'FoldTech'}];
  }

  const title =
    page.seo?.title ||
    (page.title ? `${page.title} | FoldTech` : 'FoldTech');

  const description = page.seo?.description ?? undefined;

  const canonical =
    canonicalPath ??
    (page.handle
      ? resolveCanonicalPath(`/pages/${page.handle}`)
      : undefined);

  return [
    {title},

    ...(description
      ? [{name: 'description', content: description}]
      : []),

    {property: 'og:type', content: 'website'},
    {property: 'og:title', content: title},

    ...(description
      ? [{property: 'og:description', content: description}]
      : []),

    ...(canonical
      ? [{tagName: 'link', rel: 'canonical', href: absoluteUrl(canonical)}]
      : []),
  ];
}

export const meta: Route.MetaFunction = (args) => {
  const page = args.data?.page;

  return [
    ...buildPageMeta(page),
    ...getPageStylesheetLinks(page),
    ...pageJsonLd(args.location.pathname, page),
  ];
};

/**
 * Structured data for `/pages/*`. This route owns one SERVICES path
 * (`/pages/custom-store-project`) and all 19 `/pages/cs-*` case studies, so
 * both are handled here rather than in per-page route files.
 */
export function pageJsonLd(
  pathname: string,
  page: PageSeoSource | undefined,
): ReturnType<Route.MetaFunction> {
  /*
   * 74 of the 128 pages in the sitemap render nothing but header and footer,
   * including all 18 `/pages/cs-*` case studies (runbook 0.5). Describing a
   * blank page as a Service or a CreativeWork asserts content that isn't
   * there, so those pages get no structured data until they are built.
   *
   * Remove a path from KNOWN_EMPTY_PAGE_PATHS and its schema returns.
   */
  if (isKnownEmptyPage(pathname)) return [];

  const description =
    page?.seo?.description?.trim() ||
    textFromHtml((page as {body?: string} | undefined)?.body);

  /* A service page: Service + FAQPage when the page renders FAQs. */
  const service = serviceJsonLd(pathname, {
    description,
    faqs: page?.faqs,
  });
  if (service.length) return service;

  if (page?.handle?.startsWith('cs-')) {
    return caseStudyJsonLd({
      path: `/pages/${page.handle}`,
      clientName: clientNameFromHandle(page.handle),
      headline: page.seo?.title || page.title || '',
      description: description ?? '',
    });
  }

  /*
   * Everything else — /about, /work, /services and the remaining CMS pages.
   * Before this, these carried no structured data at all, so nothing tied
   * their content to the Organization that publishes it.
   */
  const canonical = page?.handle
    ? resolveCanonicalPath(`/pages/${page.handle}`)
    : pathname;

  const name = page?.seo?.title || page?.title;
  if (!name) return [];

  return contentPageJsonLd({
    path: canonical,
    name,
    description,
    type: WEB_PAGE_TYPES[canonical] ?? 'WebPage',
    breadcrumbs: [{name: page?.title || name, path: canonical}],
    faqs: page?.faqs,
  });
}

/**
 * The few pages with a more specific type than `WebPage`. Keyed by canonical
 * path; anything absent is a plain WebPage.
 */
const WEB_PAGE_TYPES: Record<string, WebPageType> = {
  '/about': 'AboutPage',
  '/work': 'CollectionPage',
  '/services': 'CollectionPage',
};

// Route-level stylesheets are loaded conditionally from `meta()` above
// (see `getPageStylesheetLinks`), since `links()` has no access to loader
// data and can't tell which of <PageContent>'s branches a given request
// needs. Kept as an empty, exported function since `services.$serviceHandle.tsx`
// re-exports it.
export const links: Route.LinksFunction = () => [];
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

  // These backend booking pages intentionally route to the contact flow instead
  // of rendering their content.
  if (
    handle === 'discovery-meeting-with-the-shopify-experts' ||
    handle === 'shopify-experts'
  ) {
    throw redirect(CONTACT_CLEAN_PATH + requestUrl.search, 301);
  }

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
    bulkHoursData,
  ] = await Promise.all([
    context.storefront.query(PAGE_QUERY, {
      variables: {
        handle,
      },
    }),
    handle === 'work' ||
      handle === CONTACT_PAGE_HANDLE ||
      handle === 'ecommerce-seo-agency' ||
      handle === AI_SEO_PAGE_HANDLE ||
      handle === GEO_PAGE_HANDLE ||
      handle === CRO_PAGE_HANDLE ||
      handle === AB_TESTING_PAGE_HANDLE ||
      handle === 'search-first'
      ?context.storefront.query(FEATURED_PROJECTS_QUERY)
      : Promise.resolve({blog: null}),
    handle === 'work'
      ? context.storefront.query(TOP_CASE_STUDIES_QUERY)
      : Promise.resolve({blog: null}),
    handle === 'work' ||
      handle === 'ecommerce-seo-agency' ||
      handle === AI_SEO_PAGE_HANDLE ||
      handle === GEO_PAGE_HANDLE ||
      handle === CRO_PAGE_HANDLE ||
      handle === AB_TESTING_PAGE_HANDLE ||
      handle === 'search-first'
      ?loadAllCaseStudies(context)
      : Promise.resolve([]),
    // Live prices for the bulk hours section on service pages.
    isServicePageHandle(handle)
      ? context.storefront
          .query(BULK_HOURS_QUERY, {variables: {handle: BULK_HOURS_HANDLE}})
          // The section is optional; never fail a service page over it.
          .catch((error: Error) => {
            console.error(error);
            return {product: null};
          })
      : Promise.resolve({product: null}),
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
    bulkHoursProduct: bulkHoursData.product,
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
    bulkHoursProduct,
  } = data;

  const bulkHoursCta = bulkHoursProduct ? (
    <BulkHoursCta
      product={bulkHoursProduct}
      serviceName={findServiceByHandle(page.handle)?.name}
    />
  ) : null;

  if (page.handle === AI_VISIBILITY_AUDIT_PAGE_HANDLE) {
    return <AiVisibilityAuditHero />;
  }

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
        {/* TEMPORARILY DISABLED: "Our Leadership Team" section. */}
        {/* To restore, uncomment this line and its import above. */}
        {/* <AboutTeam /> */}
        <AboutJoin />
        <HomeObservatory />
      </>
    );
  }

  if (page.handle === SHOPIFY_PLUS_PAGE_HANDLE) {
    return <ShopifyPlusPage bulkHoursCta={bulkHoursCta} />;
  }

  if (
    page.handle === 'ecommerce-seo-agency' ||
    page.handle === AI_SEO_PAGE_HANDLE ||
    page.handle === GEO_PAGE_HANDLE ||
    page.handle === CRO_PAGE_HANDLE ||
    page.handle === AB_TESTING_PAGE_HANDLE ||
    page.handle === 'search-first'
  ) {
    const isAiSeo = page.handle === AI_SEO_PAGE_HANDLE;
    const isGeoSeo = page.handle === GEO_PAGE_HANDLE;
    const isCro = page.handle === CRO_PAGE_HANDLE;
    const isAbTesting = page.handle === AB_TESTING_PAGE_HANDLE;
    const isSearchFirst = page.handle === 'search-first';

    /*
     * Search First reuses the CRO page's section shape: the comparison
     * section is shown, and the SEO-specific Services, Specialism and
     * Reporting sections are omitted, exactly as on /shopify-cro-agency/.
     */
    const usesCroLayout = isCro || isSearchFirst;
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
          title={isSearchFirst ? 'Search-First Ecommerce. Built Around How Customers Look for Products.' : isAbTesting ? 'Shopify A/B Testing Built on Evidence, Not Opinion' : isCro ? 'Shopify CRO Agency Built for Ecommerce Conversion Growth' : isGeoSeo ? 'Generative Engine Optimisation for Ecommerce. Built for Shopify. Ready for AI Search.' : isAiSeo ? 'AI SEO Agency Built for Ecommerce Discovery' : undefined}
          description={isSearchFirst ? 'FoldTech improves ecommerce site search and product discovery on Shopify, so the customers who already know what they want can find it, refine it and buy it without leaving.' : isAbTesting ? 'FoldTech plans and runs ecommerce A/B testing programmes for Shopify brands, turning customer behaviour into clear hypotheses, structured experiments and decisions your team can act on.' : isCro ? 'FoldTech helps ecommerce brands improve key customer journeys through research-led optimisation, practical testing and continuous learning.' : isGeoSeo ? 'FoldTech helps ecommerce brands make their products, content and brand information clearer for generative search through structured, search-led optimisation.' : isAiSeo ? 'FoldTech helps ecommerce brands improve visibility across AI-powered search through technical foundations, structured content and search-led optimisation.' : undefined}
          pillLabel={isSearchFirst ? 'Looking for wider conversion work? Explore Shopify CRO' : isAbTesting ? 'Looking for wider conversion work? Explore Shopify CRO' : isGeoSeo ? 'Preparing ecommerce stores for generative search' : isAiSeo ? 'Looking to improve organic visibility? Explore Ecommerce SEO' : undefined}
          pillTo={isSearchFirst ? CRO_CLEAN_PATH : isAbTesting ? CRO_CLEAN_PATH : isGeoSeo ? '/ai-seo-agency/' : isAiSeo ? '/ecommerce-seo-agency/' : undefined}
          ctaLabel={isSearchFirst ? 'Talk to our search team' : isAbTesting ? 'Talk to our experimentation team' : isCro ? 'Talk to our CRO team' : isGeoSeo ? 'Talk to our GEO team' : isAiSeo ? 'Talk to our AI SEO team' : undefined}
          secondaryCta={isGeoSeo ? {label: 'Looking for AI SEO? Click here →', to: '/ai-seo-agency/'} : isAiSeo ? {label: 'Looking for Ecommerce SEO? Click here →', to: '/ecommerce-seo-agency/'} : undefined}
        />
        <EcommerceSeoCases pageTag={page.handle} articles={caseStudyArticles} featuredArticles={featuredArticles} />
        <EcommerceSeoProcess
          compactTestimonial={isCro}
          label={isSearchFirst ? 'Our Search Process' : isAbTesting ? 'Our Testing Process' : isCro ? 'Our CRO Process' : undefined}
          title={isSearchFirst ? 'How We Improve Ecommerce Search' : isAbTesting ? 'How We Run Ecommerce Experiments' : isCro ? 'How We Optimise Ecommerce Conversion' : undefined}
          subtitle={isSearchFirst ? 'A structured four-step process connects search behaviour, product data, merchandising and continuous refinement.' : isAbTesting ? 'A structured four-step cycle turns customer research into experiments, results and the next set of priorities.' : isCro ? 'A structured four-step process connects customer insight, testing and continuous improvement.' : undefined}
          steps={isSearchFirst ? SEARCH_FIRST_PROCESS_STEPS : isAbTesting ? AB_TESTING_PROCESS_STEPS : isCro ? CRO_PROCESS_STEPS : undefined}
        />
        {usesCroLayout ? (
          <ShopifyCroOptimise
            {...(isSearchFirst ? SEARCH_FIRST_COMPARISON : {})}
          />
        ) : null}
        {!usesCroLayout ? (
          <EcommerceSeoServices
            label={isAbTesting ? 'Our A/B Testing Services' : isGeoSeo ? 'Our GEO Services' : undefined}
            title={isAbTesting ? 'Every Stage of Ecommerce Experimentation. Covered.' : isGeoSeo ? 'Every Layer of Generative Engine Optimisation. Covered.' : undefined}
            pillars={isAbTesting ? AB_TESTING_SERVICE_PILLARS : isGeoSeo ? GEO_SERVICE_PILLARS : undefined}
          />
        ) : null}
        <EcommerceSeoTechStack />
        <EcommerceSeoResults
          variant={isGenerativeSeo || usesCroLayout || isAbTesting ? 'ai' : undefined}
          eyebrow={isSearchFirst ? 'Search Performance' : isAbTesting ? 'Experimentation Outcomes' : isCro ? 'Conversion Performance' : isGeoSeo ? 'Generative Search Visibility' : isAiSeo ? 'AI Search Visibility' : undefined}
          title={isSearchFirst ? 'A Clearer View of How Customers Search' : isAbTesting ? 'What a Structured Testing Programme Gives You' : isCro ? 'A Clear View of Ecommerce Optimisation Opportunities' : isGeoSeo ? 'A Clear View of Generative Search Opportunities' : isAiSeo ? 'A Clear View of AI Search Opportunities' : undefined}
          results={isSearchFirst ? [{stat: '01', title: 'Search Demand Visibility', description: 'Understand what customers ask for in their own words, including the queries your catalogue does not answer.'}, {stat: '02', title: 'Relevant, Merchandised Results', description: 'Results that reflect both customer intent and commercial priorities rather than one at the expense of the other.'}, {stat: '03', title: 'A Discovery Roadmap', description: 'A prioritised view of the product data, UX and merchandising work that will make discovery easier next.'}] : isAbTesting ? [{stat: '01', title: 'Evidence Over Opinion', description: 'Replace internal debate about design and copy with measured customer behaviour.'}, {stat: '02', title: 'Prioritised Experiment Roadmap', description: 'Know which tests are worth running next and why they matter commercially.'}, {stat: '03', title: 'Compounding Insight', description: 'Build a documented record of what works for your customers and what does not.'}] : isCro ? [{stat: '01', title: 'Journey Baseline', description: 'Understand how customers currently move through key ecommerce journeys.'}, {stat: '02', title: 'Prioritised Hypotheses', description: 'Focus optimisation work on clear, testable opportunities.'}, {stat: '03', title: 'Ongoing Learning', description: 'Use each iteration to inform the next practical improvement.'}] : isGenerativeSeo ? generativeResults : undefined}
        />
        <HomeExperts
          variant="ecommerce-seo"
          eyebrow={isSearchFirst ? 'Is Search-First Right for You?' : isAbTesting ? 'Is A/B Testing Right for You?' : isCro ? 'Is CRO Right for You?' : isGeoSeo ? 'Is GEO Right for You?' : isAiSeo ? 'Is AI SEO Right for You?' : 'Is Ecommerce SEO Right for You?'}
          heading={isSearchFirst ? 'Search-First Works Best for Stores With Large or Complex Catalogues' : isAbTesting ? 'A/B Testing Works Best for Stores With Steady Traffic and Real Questions' : isCro ? 'CRO Works Best for Brands Ready to Scale With Data' : isGeoSeo ? 'GEO Works Best for Brands Ready to Make Their Information Clearer' : isAiSeo ? 'AI SEO Works Best for Brands Ready to Build Search Resilience' : 'SEO Works Best for Brands Ready to Invest in Sustainable Growth'}
          description={isSearchFirst ? 'Search-first work suits ecommerce teams whose customers arrive knowing roughly what they want: broad catalogues, many variants, technical products or ranges where browsing alone is slow. If your catalogue is small enough that navigation already covers it, we will usually point you towards conversion or SEO work instead.' : isAbTesting ? 'Our A/B testing services suit ecommerce teams with enough traffic for experiments to reach a readable result, and a genuine question about how customers behave. If your store is still early in its growth, we will usually recommend broader conversion work first and tell you so directly rather than running tests that cannot conclude.' : isCro ?'Our CRO services are designed for ecommerce teams ready to learn from customer behaviour, improve key journeys and build a more deliberate optimisation programme.' : isGeoSeo ? 'Our GEO services are designed for ecommerce teams preparing their stores for generative search. The strongest fit is with brands ready to invest in clear product information, structured content, entity signals and ongoing optimisation.' : isAiSeo ? 'Our AI SEO services are designed for ecommerce teams that want to prepare their stores for changing search behaviour. The strongest fit is with brands ready to invest in clear product information, technical foundations, structured content and ongoing optimisation.' : 'Our ecommerce SEO services are designed for online stores that want organic search to become a reliable, long-term growth channel. The strongest fit is with ecommerce teams that are ready to invest consistently in technical improvements, content, site structure and ongoing optimisation rather than looking for short-term ranking fixes. We work alongside businesses that want SEO decisions connected to their wider ecommerce goals, development roadmap and customer journey.'}
          ctaLabel="See if we're a good fit"
          ctaTo="/contact"
        />
        {/*
          * The specialism section argues platform-specific *SEO* differences,
          * so it stays off the A/B testing page rather than showing search
          * copy under an experimentation heading.
          */}
        {!usesCroLayout && !isAbTesting ? <EcommerceSeoShopifySpecialism /> : null}
        <div className="ft-ecommerce-seo-partners">
          <HomePartners
            label={isSearchFirst ? 'Our Search & Analytics Stack' : isAbTesting ? 'Our Testing & Analytics Stack' : isCro ? 'Our CRO & Analytics Stack' : isGeoSeo ? 'Our GEO & Analytics Stack' : isAiSeo ? 'Our AI SEO & Analytics Stack' : 'Our SEO & Analytics Stack'}
            heading={isSearchFirst ? 'The Platforms Behind Every Search Experience We Build' : isAbTesting ? 'The Platforms Behind Every Experiment We Run' : isCro ? 'The Platforms Behind Every Optimisation We Deliver' : isGeoSeo ? 'The Platforms Behind Every GEO Campaign We Deliver' : isAiSeo ? 'The Platforms Behind Every AI SEO Campaign We Deliver' : 'The Platforms Behind Every Ecommerce SEO Campaign We Deliver'}
            description={[isSearchFirst ? 'Ecommerce search depends on the search platform, the product data behind it and the analytics that show how customers use it. Our stack brings together the tools we use to review search behaviour, structure product information and measure whether discovery is genuinely improving.' : isAbTesting ? 'Reliable A/B testing depends on accurate measurement as much as on the experiment itself. Our stack brings together the analytics, behavioural research and experimentation tools we use to size tests, track them correctly and interpret the results honestly.' : isCro ?'Effective conversion optimisation requires the right combination of analytics, research and experimentation tools. Our stack helps us understand customer behaviour, review key journeys and turn data into clear optimisation priorities for ecommerce stores.' : isGeoSeo ? 'Effective generative engine optimisation requires the right combination of crawling, analytics, research and content tools. Our stack brings together the platforms we use to review technical performance, understand search demand and turn data into clear optimisation priorities for ecommerce stores.' : isAiSeo ? 'Effective AI SEO requires the right combination of crawling, analytics, research and content tools. Our stack brings together the platforms we use to review technical performance, understand search demand and turn data into clear optimisation priorities for ecommerce stores.' : 'Effective ecommerce SEO requires the right combination of crawling, analytics, research and content tools. Our stack brings together the platforms we use to audit technical performance, understand search demand, measure user behaviour and turn data into clear optimisation priorities for ecommerce stores.']}
            logos={ECOMMERCE_SEO_PARTNER_LOGOS}
            showCta={false}
          />
          <EcommerceSeoProofStrip items={ECOMMERCE_SEO_VERIFIED_PROOF_ITEMS} />
        </div>
        <EcommerceSeoEducation html={page.body} />
        {!usesCroLayout ? <EcommerceSeoReporting
          eyebrow={isGenerativeSeo || isAbTesting ? 'Transparency & Reporting' : undefined}
          title={isAbTesting ? 'How We Report on Experiments' : isGeoSeo ? 'How We Measure GEO Success' : isAiSeo ? 'How We Measure AI SEO Success' : undefined}
          intro={isAbTesting ? 'Every experiment is reported against the hypothesis it set out to answer, including the tests that show no meaningful difference. We share what changed, how the result was measured, how confident we are in it, and what we recommend testing next.' : isGeoSeo ?'Effective GEO should be measured against meaningful search and commercial signals, not isolated vanity metrics. We review generative search visibility alongside organic performance to understand what is improving, where opportunities remain and what should be prioritised next.' : isAiSeo ? 'Effective AI SEO should be measured against meaningful search and commercial signals, not isolated vanity metrics. We review AI search visibility alongside organic performance to understand what is improving, where opportunities remain and what should be prioritised next.' : undefined}
        /> : null}
        {page.faqs.length ? (
          <div className="ft-ecommerce-seo-faq">
            <ServiceDetailFaqs title={isSearchFirst ? 'Ecommerce Search Services' : isAbTesting ? 'Shopify A/B Testing Services' : isCro ? 'Shopify CRO Services' : isGeoSeo ? 'GEO Services' : isAiSeo ? 'AI SEO Services' : 'Ecommerce SEO Services'} faqs={page.faqs} />
          </div>
        ) : null}
        <div className="ft-ecommerce-seo-testimonial"><WorkTestimonial /></div>
        {bulkHoursCta}
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
        bulkHoursCta={bulkHoursCta}
      />
    );
  }

  return (
    <div className="page">
      <header>
        <h1>{page.title}</h1>
      </header>

      <div
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
