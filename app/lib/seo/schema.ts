/**
 * The Fold Tech — Structured data (JSON-LD)
 * ------------------------------------------------------------------
 * Single source of truth for every schema.org node emitted by
 * thefoldtech.com (Shopify Hydrogen / Oxygen storefront).
 *
 * Every value in this file is real and verified. There are no
 * placeholders. If a fact changes (headcount, address, a new service
 * page), change it HERE and it propagates to every page.
 *
 * Location: app/lib/seo/schema.ts
 * Version:  1.0 — 12 September 2026
 *
 * Data provenance:
 *   legalName, address .... TechBehemoths + Clutch company listings
 *   foundingDate .......... Clutch listing (confirmed by Malik Rehan)
 *   numberOfEmployees ..... confirmed by Malik Rehan, 12 Sep 2026
 *   email, telephone ...... thefoldtech.com/contact + Shopify Partner Directory
 *   logo .................. fetched and measured: 512×512 PNG
 *   areaServed ............ supported locations on Shopify Partner Directory
 */

/* ------------------------------------------------------------------ */
/* Constants                                                           */
/* ------------------------------------------------------------------ */

import {COMPANY_FACTS} from '~/data/companyFacts';

export const SITE_URL = 'https://thefoldtech.com';

export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const LOGO_URL =
  'https://cdn.shopify.com/oxygen-v2/57096/165594/338611/4441171/images/favicon_the_fold_tech.png';

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

type JsonLd = Record<string, unknown>;

export interface ServiceDefinition {
  /** Path only, exactly as it resolves live — trailing slash matters. */
  path: string;
  /** Human name of the service, used as schema `name`. */
  name: string;
  /** schema `serviceType` — the capability, not the marketing headline. */
  serviceType: string;
  /** One or two sentences. Fact-first, no adjectives. */
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export interface ArticleInput {
  path: string;
  headline: string;
  description: string;
  imageUrl: string;
  datePublished: string; // ISO 8601
  dateModified: string; // ISO 8601
  authorName: string;
  authorUrl?: string;
}

/* ------------------------------------------------------------------ */
/* 1. Organization — emitted sitewide                                  */
/* ------------------------------------------------------------------ */

export const ORGANIZATION: JsonLd = {
  '@type': 'ProfessionalService',
  '@id': ORG_ID,
  name: 'The Fold Tech',
  alternateName: ['FoldTech', 'The Fold Tech Shopify Agency'],
  url: `${SITE_URL}/`,
  logo: {
    '@type': 'ImageObject',
    url: LOGO_URL,
    width: 512,
    height: 512,
  },
  image: LOGO_URL,
  description:
    'The Fold Tech is a commerce technology company and Shopify Partner agency. It designs, builds, migrates and optimises Shopify and Shopify Plus stores, combining ecommerce engineering with technical SEO, AI SEO, generative engine optimisation and conversion rate optimisation.',
  slogan: 'The Shopify agency that drives real growth',
  foundingDate: '2010',
  numberOfEmployees: {
    '@type': 'QuantitativeValue',
    value: COMPANY_FACTS.team.target,
  },
  email: 'info@thefoldtech.com',
  telephone: '+1-512-387-6926',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '1001 South Main Street, Suite 500',
    addressLocality: 'Kalispell',
    addressRegion: 'MT',
    postalCode: '59901',
    addressCountry: 'US',
  },
  priceRange: '$$',
  currenciesAccepted: 'USD',
  areaServed: [
    {'@type': 'Country', name: 'United States'},
    {'@type': 'Country', name: 'United Kingdom'},
    {'@type': 'Country', name: 'Canada'},
    {'@type': 'Country', name: 'Australia'},
    {'@type': 'Country', name: 'Germany'},
    {'@type': 'Country', name: 'France'},
    {'@type': 'Country', name: 'Italy'},
  ],
  knowsAbout: [
    'Shopify',
    'Shopify Plus',
    'Shopify Hydrogen',
    'Headless commerce',
    'Ecommerce SEO',
    'Technical SEO',
    'Generative engine optimisation',
    'AI search visibility',
    'Agentic commerce',
    'Conversion rate optimisation',
    'A/B testing',
    'Ecommerce replatforming',
    'Shopify app development',
    'Shopify Markets and international commerce',
    'Shopify B2B and wholesale',
    'Subscription commerce',
    'Klaviyo email and SMS marketing',
  ],
  sameAs: [
    'https://www.shopify.com/partners/directory/partner/1stfold',
    'https://clutch.co/profile/fold-tech',
    'https://www.linkedin.com/company/thefoldtech',
    'https://www.instagram.com/thefoldtech/',
    'https://www.facebook.com/thefoldtech',
    'https://techbehemoths.com/company/the-fold-tech',
    'https://techreviewer.co/companies/the-fold-tech',
    'https://superbcompanies.com/organizations/the-fold-tech/',
    'https://land-book.com/the_fold_tech_shopify_experts',
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: 'info@thefoldtech.com',
      telephone: '+1-512-387-6926',
      availableLanguage: ['English'],
      areaServed: ['US', 'GB', 'CA', 'AU', 'DE', 'FR', 'IT'],
    },
    {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: 'info@thefoldtech.com',
      availableLanguage: ['English'],
    },
  ],
};

/* ------------------------------------------------------------------ */
/* 2. WebSite — emitted sitewide                                       */
/* ------------------------------------------------------------------ */

export const WEBSITE: JsonLd = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: `${SITE_URL}/`,
  name: 'The Fold Tech',
  description:
    'Shopify and Shopify Plus design, development, migration, SEO and AI search visibility services.',
  publisher: {'@id': ORG_ID},
  inLanguage: 'en',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

/** The two nodes every page carries, wrapped in one @graph. */
export const SITEWIDE_GRAPH: JsonLd = {
  '@context': 'https://schema.org',
  '@graph': [ORGANIZATION, WEBSITE],
};

/* ------------------------------------------------------------------ */
/* 3. Services — every live service page, verified 200 on 12 Sep 2026  */
/* ------------------------------------------------------------------ */

export const SERVICES: ServiceDefinition[] = [
  /* --- Build ----------------------------------------------------- */
  {
    path: '/shopify-plus-agency',
    name: 'Shopify Plus Development',
    serviceType: 'Shopify Plus development',
    description:
      'Enterprise Shopify Plus development, including Shopify Functions, checkout extensibility, B2B company accounts and multi-store architecture.',
  },
  {
    path: '/pages/custom-store-project',
    name: 'Custom Shopify Store Project',
    serviceType: 'Ecommerce store design and build',
    description:
      'End-to-end design and build of a custom Shopify store, from discovery and information architecture through launch.',
  },
  {
    path: '/shopify-theme-development-builds/',
    name: 'Shopify Theme Development',
    serviceType: 'Shopify theme development',
    description:
      'Custom Shopify theme development in Liquid, built for Core Web Vitals performance and merchandising flexibility.',
  },
  {
    path: '/shopify-web-design',
    name: 'Shopify Web Design',
    serviceType: 'Ecommerce web design',
    description:
      'Ecommerce web design for Shopify stores, covering art direction, design systems and conversion-focused user experience.',
  },
  {
    path: '/headless-commerce',
    name: 'Headless Commerce and Hydrogen Development',
    serviceType: 'Headless commerce development',
    description:
      'Headless Shopify storefronts built with Hydrogen and deployed on Oxygen, for brands that need full control of the front end.',
  },
  {
    path: '/shopify-app-development/',
    name: 'Shopify App Development',
    serviceType: 'Shopify app development',
    description:
      'Custom public and private Shopify app development, including embedded admin apps, theme app extensions and checkout UI extensions.',
  },
  {
    path: '/shopify-integrations/',
    name: 'Shopify Integrations',
    serviceType: 'Ecommerce systems integration',
    description:
      'Integration of Shopify with ERP, PIM, CRM, 3PL, accounting and marketing systems, including custom middleware where no connector exists.',
  },

  /* --- Migrate --------------------------------------------------- */
  {
    path: '/shopify-migrations/',
    name: 'Shopify Migrations',
    serviceType: 'Ecommerce replatforming',
    description:
      'Replatforming to Shopify and Shopify Plus with full product, customer and order migration plus a complete URL redirect map.',
  },
  {
    path: '/woocommerce-shopify-migrations/',
    name: 'WooCommerce to Shopify Migration',
    serviceType: 'WooCommerce to Shopify migration',
    description:
      'Migration from WooCommerce to Shopify, preserving catalogue structure, customer accounts, order history and organic search rankings.',
  },
  {
    path: '/magento-shopify-migrations/',
    name: 'Magento to Shopify Migration',
    serviceType: 'Magento to Shopify migration',
    description:
      'Migration from Magento or Adobe Commerce to Shopify Plus, including complex attribute sets, customer groups and B2B pricing structures.',
  },
  {
    path: '/bigcommerce-shopify-migrations/',
    name: 'BigCommerce to Shopify Migration',
    serviceType: 'BigCommerce to Shopify migration',
    description:
      'Migration from BigCommerce to Shopify, covering catalogue, content, customers and redirect mapping.',
  },
  {
    path: '/salesforce-shopify-migrations/',
    name: 'Salesforce Commerce Cloud to Shopify Migration',
    serviceType: 'Salesforce Commerce Cloud to Shopify migration',
    description:
      'Replatforming from Salesforce Commerce Cloud to Shopify Plus, including catalogue modelling, integration rebuild and phased cutover.',
  },
  {
    path: '/ecommerce-seo-migrations/',
    name: 'Ecommerce SEO Migration',
    serviceType: 'SEO migration',
    description:
      'Protecting organic traffic and rankings through a replatform or redesign, with redirect mapping, content parity auditing and post-launch monitoring.',
  },

  /* --- Optimise -------------------------------------------------- */
  {
    path: '/shopify-cro-agency/',
    name: 'Shopify Conversion Rate Optimisation',
    serviceType: 'Conversion rate optimisation',
    description:
      'Research-led conversion rate optimisation for Shopify stores, combining analytics, qualitative research and structured experimentation.',
  },
  {
    path: '/ab-testing',
    name: 'A/B Testing',
    serviceType: 'Ecommerce experimentation',
    description:
      'Ongoing A/B and multivariate testing programmes for Shopify and Shopify Plus stores, with statistical rigour applied to result calls.',
  },
  {
    path: '/services/shopify-audits/',
    name: 'Shopify Audits',
    serviceType: 'Ecommerce audit',
    description:
      'Design, technical, performance and SEO audits of an existing Shopify store, delivered as a prioritised remediation plan.',
  },
  {
    path: '/support-and-maintenance/',
    name: 'Shopify Support and Maintenance',
    serviceType: 'Ecommerce technical support',
    description:
      'Retained Shopify technical support covering bug fixing, release management, performance monitoring and ongoing development capacity.',
  },
  {
    path: '/shopify-internationalisation/',
    name: 'Shopify Internationalisation',
    serviceType: 'International ecommerce expansion',
    description:
      'Cross-border expansion using Shopify Markets, including multi-currency, multi-language, domain strategy and international SEO.',
  },

  /* --- Search and AI visibility ---------------------------------- */
  {
    path: '/seo-agency',
    name: 'SEO Services',
    serviceType: 'Search engine optimisation',
    description:
      'Technical and content SEO for commerce brands, covering crawlability, indexation, site architecture and topical authority.',
  },
  {
    path: '/ecommerce-seo-agency/',
    name: 'Ecommerce SEO',
    serviceType: 'Ecommerce SEO',
    description:
      'Organic growth for ecommerce catalogues, covering collection architecture, faceted navigation, indexation control and product content.',
  },
  {
    path: '/ai-seo-agency/',
    name: 'Ecommerce AI SEO',
    serviceType: 'AI search optimisation',
    description:
      'Optimising ecommerce sites for AI-powered search, including entity modelling, structured data and content built to be retrieved and cited.',
  },
  {
    path: '/geo-agency/',
    name: 'Generative Engine Optimisation',
    serviceType: 'Generative engine optimisation',
    description:
      'Making a brand visible and citable inside ChatGPT, Perplexity, Gemini, Copilot and Google AI Overviews, measured as citation share on buying-intent prompts.',
  },
  {
    path: '/ai-ecommerce-agency/',
    name: 'AI Ecommerce Services',
    serviceType: 'AI implementation for ecommerce',
    description:
      'Applying AI to ecommerce operations, merchandising, content production and customer experience on Shopify.',
  },
  {
    path: '/agentic-commerce/',
    name: 'Agentic Commerce Readiness',
    serviceType: 'Agentic commerce enablement',
    description:
      'Preparing Shopify stores for AI agents that browse, compare and transact on a shopper behalf, covering machine-readable product data and agent access.',
  },

  /* --- Retain ---------------------------------------------------- */
  {
    path: '/email-marketing-agency/',
    name: 'Email and SMS Marketing',
    serviceType: 'Retention marketing',
    description:
      'Email and SMS retention programmes for ecommerce brands, covering lifecycle flows, segmentation and campaign calendars.',
  },
  {
    path: '/klaviyo-agency/',
    name: 'Klaviyo Services',
    serviceType: 'Klaviyo implementation',
    description:
      'Klaviyo implementation and optimisation, including data integration, automated flows, segmentation and deliverability.',
  },
  {
    path: '/shopify-b2b-wholesale/',
    name: 'Shopify B2B and Wholesale',
    serviceType: 'B2B ecommerce implementation',
    description:
      'B2B selling on Shopify, covering company accounts, price lists, payment terms, quantity rules and wholesale channel setup.',
  },
  {
    path: '/subscriptions-on-shopify/',
    name: 'Shopify Subscriptions',
    serviceType: 'Subscription commerce implementation',
    description:
      'Subscription commerce on Shopify, covering selling plans, app selection, customer portal experience and churn reduction.',
  },
];

/* ------------------------------------------------------------------ */
/* Builders                                                            */
/* ------------------------------------------------------------------ */

const abs = (path: string) => `${SITE_URL}${path}`;

/** Service node for a service page. Look the definition up by path. */
export function serviceSchema(path: string): JsonLd | null {
  const def = SERVICES.find((s) => s.path === path);
  if (!def) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${abs(def.path)}#service`,
    name: def.name,
    url: abs(def.path),
    description: def.description,
    serviceType: def.serviceType,
    provider: {'@id': ORG_ID},
    areaServed: [
      {'@type': 'Country', name: 'United States'},
      {'@type': 'Country', name: 'United Kingdom'},
    ],
    audience: {
      '@type': 'BusinessAudience',
      name: 'Ecommerce brands trading on Shopify and Shopify Plus',
    },
  };
}

/** Breadcrumb trail. Pass the ancestors; the current page is last. */
export function breadcrumbSchema(items: BreadcrumbItem[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{name: 'Home', path: '/'}, ...items].map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}

/**
 * FAQ node. Every question and answer passed here MUST also be visible
 * in the rendered page — invisible FAQ markup is a policy violation,
 * not a shortcut.
 */
export function faqSchema(path: string, items: FaqItem[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${abs(path)}#faq`,
    mainEntity: items.map(({question, answer}) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {'@type': 'Answer', text: answer},
    })),
  };
}

/** Article node for blog content. Author must be a real named person. */
export function articleSchema(input: ArticleInput): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${abs(input.path)}#article`,
    headline: input.headline,
    description: input.description,
    image: input.imageUrl,
    datePublished: input.datePublished,
    dateModified: input.dateModified,
    author: {
      '@type': 'Person',
      name: input.authorName,
      ...(input.authorUrl ? {url: input.authorUrl} : {}),
    },
    publisher: {'@id': ORG_ID},
    mainEntityOfPage: {'@type': 'WebPage', '@id': abs(input.path)},
    inLanguage: 'en',
  };
}

/** Case study pages: a CreativeWork the Organization produced. */
export function caseStudySchema(opts: {
  path: string;
  clientName: string;
  headline: string;
  description: string;
  imageUrl?: string;
  datePublished?: string;
}): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': `${abs(opts.path)}#casestudy`,
    name: opts.headline,
    headline: opts.headline,
    description: opts.description,
    about: {'@type': 'Organization', name: opts.clientName},
    creator: {'@id': ORG_ID},
    publisher: {'@id': ORG_ID},
    url: abs(opts.path),
    ...(opts.imageUrl ? {image: opts.imageUrl} : {}),
    ...(opts.datePublished ? {datePublished: opts.datePublished} : {}),
    inLanguage: 'en',
  };
}

/** Serialise safely for dangerouslySetInnerHTML. */
export function jsonLdString(schema: JsonLd | JsonLd[]): string {
  return JSON.stringify(schema).replace(/</g, '\\u003c');
}
