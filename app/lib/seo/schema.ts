/**
 * Byte Operator — Structured data (JSON-LD)
 * ------------------------------------------------------------------
 * Single source of truth for every schema.org node emitted by
 * byteoperator.com (Software Hydrogen / Oxygen storefront).
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
 *   email, telephone ...... byteoperator.com/contact + Software Engineering Partner Directory
 *   logo .................. fetched and measured: 512×512 PNG
 *   areaServed ............ supported locations on Software Engineering Partner Directory
 */

/* ------------------------------------------------------------------ */
/* Constants                                                           */
/* ------------------------------------------------------------------ */

import {COMPANY_FACTS} from '~/data/companyFacts';
import {FOUNDERS} from '~/data/founders';

export const SITE_URL = 'https://www.byteoperator.com';

export const ORG_ID = `${SITE_URL}/#organization`;

/** Stable Person @id: the About page, where the founders are shown. */
export const personId = (slug: string) => `${SITE_URL}/about#${slug}`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const LOGO_URL =
  'https://cdn.shopify.com/s/files/1/0928/7421/1691/files/final.png?v=1790264655';

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

type JsonLd = Record<string, unknown>;

export interface ServiceDefinition {
  /** Path only, exactly as it resolves live — trailing slash matters. */
  path: string;
  /** Human name of the service, used as schema `name`. */
  name: string;
  /** Optional schema `serviceType` — only when it adds a distinct, true value. */
  serviceType?: string;
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

/**
 * The WebPage subtypes this site uses. `AboutPage` for `/about`,
 * `ContactPage` for `/contact`, `CollectionPage` for anything that lists other
 * pages, plain `WebPage` for everything else.
 */
export type WebPageType =
  | 'WebPage'
  | 'AboutPage'
  | 'ContactPage'
  | 'CollectionPage';

export interface WebPageInput {
  /** Path only. Must match the page's `rel=canonical`. */
  path: string;
  name: string;
  type?: WebPageType;
  description?: string;
  /** `@id` of the node this page is primarily about (Service, Article…). */
  mainEntityId?: string;
  imageUrl?: string;
  /** Set when the graph also carries a BreadcrumbList for this path. */
  hasBreadcrumb?: boolean;
  datePublished?: string; // ISO 8601
  dateModified?: string; // ISO 8601
}

export interface ArticleInput {
  path: string;
  headline: string;
  description: string;
  imageUrl: string;
  datePublished: string; // ISO 8601
  dateModified: string; // ISO 8601
  /** A real named person. Omit to credit the Organization instead. */
  authorName?: string;
  authorUrl?: string;
}

/* ------------------------------------------------------------------ */
/* 1. Organization — emitted sitewide                                  */
/* ------------------------------------------------------------------ */

/**
 * The countries the business sells into, per the Software Engineering Partner Directory.
 * Shared by `ORGANIZATION` and `serviceSchema()` so a service page can never
 * claim a narrower reach than the organization that provides it.
 */
const AREA_SERVED: JsonLd[] = [
  {'@type': 'Country', name: 'United States'},
  {'@type': 'Country', name: 'United Kingdom'},
  {'@type': 'Country', name: 'Canada'},
  {'@type': 'Country', name: 'Australia'},
  {'@type': 'Country', name: 'Germany'},
  {'@type': 'Country', name: 'France'},
  {'@type': 'Country', name: 'Italy'},
];

export const ORGANIZATION: JsonLd = {
  '@type': 'ProfessionalService',
  '@id': ORG_ID,
  name: 'Byte Operator',
  alternateName: ['Byte Operator', 'Byte Operator Software Agency'],
  legalName: 'TAB ON TECH (PVT.) LTD',
  url: `${SITE_URL}/`,
  logo: {
    '@type': 'ImageObject',
    url: LOGO_URL,
    width: 512,
    height: 512,
  },
  image: LOGO_URL,
  description:
    'Byte Operator is a premier digital engineering and custom software development agency. It designs, builds, migrates and optimises scalable web applications, enterprise platforms, and cloud systems, combining modern full-stack engineering with technical SEO, AI systems, and conversion rate optimisation.',
  slogan: 'The software agency that drives real growth',
  foundingDate: '2025',
  numberOfEmployees: {
    '@type': 'QuantitativeValue',
    value: COMPANY_FACTS.team.target,
  },
  email: 'samiullah@byteoperator.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Islamabad',
    addressRegion: 'Islamabad Capital Territory',
    addressCountry: 'PK',
  },
  priceRange: '$$',
  currenciesAccepted: 'USD',
  areaServed: AREA_SERVED,
  knowsAbout: [
    'Custom Software Engineering',
    'Full-Stack Web Development',
    'Enterprise Cloud Architecture',
    'API & System Integrations',
    'Technical SEO & Search Architecture',
    'Generative Engine Optimisation (GEO)',
    'AI Search Visibility & Systems',
    'Conversion Rate & Performance Optimisation',
    'SaaS & Platform Development',
    'UI/UX & Product Design',
  ],
  /* Founder (Samiullah Qureshi) and Co-Founder (Uzair Khan); their roles
     are carried by each Person's jobTitle. */
  founder: FOUNDERS.map((person) => ({'@id': personId(person.id)})),
  sameAs: [
    'https://www.linkedin.com/company/byte-operator',
    'https://www.instagram.com/byteoperatorofficial/',
    'https://www.facebook.com/profile.php?id=61595095910822',
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: 'samiullah@byteoperator.com',
      availableLanguage: ['English'],
      areaServed: ['US', 'GB', 'CA', 'AU', 'DE', 'FR', 'IT'],
    },
    {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: 'samiullah@byteoperator.com',
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
  name: 'Byte Operator',
  description:
    'Software and Enterprise Platform Solutions design, development, migration, SEO and AI search visibility services.',
  publisher: {'@id': ORG_ID},
  inLanguage: 'en',
  /*
   * No `potentialAction` / `SearchAction` on purpose. Google retired the
   * sitelinks searchbox rich result, so it earns nothing — and here it
   * contradicted the site's own crawl policy: `[robots.txt].tsx` emits
   * `Disallow: /search` and `search.tsx` sets `noindex`, so the node was
   * advertising an endpoint crawlers are told not to fetch.
   */
};

/** The two nodes every page carries, wrapped in one @graph. */
/**
 * The founders, from `~/data/founders.ts`. Verified facts only: name, role
 * and the LinkedIn profile Byte Operator provided. No image, bio or
 * credentials until they are supplied.
 */
export const FOUNDER_PERSONS: JsonLd[] = FOUNDERS.map((person) => ({
  '@type': 'Person',
  '@id': personId(person.id),
  name: person.name,
  jobTitle: person.role,
  worksFor: {'@id': ORG_ID},
  ...(person.linkedin ? {sameAs: [person.linkedin]} : {}),
}));

export const SITEWIDE_GRAPH: JsonLd = {
  '@context': 'https://schema.org',
  '@graph': [ORGANIZATION, WEBSITE, ...FOUNDER_PERSONS],
};

/* ------------------------------------------------------------------ */
/* 3. Services                                                          */
/* ------------------------------------------------------------------ */
/*
 * There is no central list here any more. The old `SERVICES` array had
 * drifted from the live pages (garbled names and descriptions), so each
 * service page now passes its own visible title and meta description to
 * `serviceSchema()` — the schema can never disagree with the page.
 */

/* ------------------------------------------------------------------ */
/* Builders                                                            */
/* ------------------------------------------------------------------ */

/**
 * The one URL helper. Every canonical, every `url` and every `@id` the site
 * emits is built from it, so a page's `rel=canonical` and its WebPage `@id`
 * cannot drift apart.
 */
export const absoluteUrl = (path: string) => `${SITE_URL}${path}`;

const abs = absoluteUrl;

/*
 * The builders below return graph *nodes*, not standalone documents — none of
 * them carries `@context`. `pageGraph()` in `jsonld.ts` wraps whatever a route
 * emits in a single `@graph` with one `@context`, so a page ships one
 * connected graph instead of several unrelated JSON-LD islands.
 */

/**
 * The page spine. Every indexable page emits exactly one of these, and it is
 * what ties the page's content to the entity that published it — `isPartOf`
 * the WebSite, `about` the Organization.
 *
 * `@id` is always `<canonical>#webpage`, where `<canonical>` is the same
 * absolute URL the page's `rel=canonical` carries. Other nodes point at it
 * (`Article.mainEntityOfPage`) and it points back at them (`mainEntity`).
 *
 * Optional fields are omitted rather than invented — a `dateModified` that
 * isn't known is worse than no `dateModified`.
 */
export function webPageSchema(input: WebPageInput): JsonLd {
  const url = abs(input.path);

  return {
    '@type': input.type ?? 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: input.name,
    ...(input.description ? {description: input.description} : {}),
    isPartOf: {'@id': WEBSITE_ID},
    about: {'@id': ORG_ID},
    publisher: {'@id': ORG_ID},
    inLanguage: 'en',
    ...(input.hasBreadcrumb ? {breadcrumb: {'@id': `${url}#breadcrumb`}} : {}),
    ...(input.mainEntityId ? {mainEntity: {'@id': input.mainEntityId}} : {}),
    ...(input.imageUrl
      ? {primaryImageOfPage: {'@type': 'ImageObject', url: input.imageUrl}}
      : {}),
    ...(input.datePublished ? {datePublished: input.datePublished} : {}),
    ...(input.dateModified ? {dateModified: input.dateModified} : {}),
  };
}

/**
 * Listing node for index pages (articles, blogs, work, services). Positions
 * are 1-based and every `url` is absolute, so the list is resolvable rather
 * than decorative.
 */
export function itemListSchema(
  path: string,
  items: Array<{name: string; path: string}>,
): JsonLd {
  return {
    '@type': 'ItemList',
    '@id': `${abs(path)}#itemlist`,
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      url: abs(item.path),
    })),
  };
}

/** Service node for a service page. Look the definition up by path. */
export function serviceSchema(def: ServiceDefinition): JsonLd {
  return {
    '@type': 'Service',
    '@id': `${abs(def.path)}#service`,
    name: def.name,
    url: abs(def.path),
    description: def.description,
    ...(def.serviceType ? {serviceType: def.serviceType} : {}),
    /* Name, address and service area live once, on the Organization node. */
    provider: {'@id': ORG_ID},
  };
}

/**
 * Breadcrumb trail. Pass the ancestors; the current page is last.
 *
 * The `@id` is derived from that last item, so the page's WebPage node can
 * reference this list as `breadcrumb: {'@id': `${url}#breadcrumb`}` without the
 * caller having to pass the path twice.
 */
export function breadcrumbSchema(items: BreadcrumbItem[]): JsonLd {
  const current = items[items.length - 1];

  return {
    '@type': 'BreadcrumbList',
    ...(current ? {'@id': `${abs(current.path)}#breadcrumb`} : {}),
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
    '@type': 'FAQPage',
    '@id': `${abs(path)}#faq`,
    mainEntity: items.map(({question, answer}) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {'@type': 'Answer', text: answer},
    })),
  };
}

/** Article node for blog content. Author is a real named person, else the Organization. */
export function articleSchema(input: ArticleInput): JsonLd {
  return {
    '@type': 'Article',
    '@id': `${abs(input.path)}#article`,
    headline: input.headline,
    description: input.description,
    image: input.imageUrl,
    datePublished: input.datePublished,
    dateModified: input.dateModified,
    author: input.authorName
      ? {
          '@type': 'Person',
          name: input.authorName,
          ...(input.authorUrl ? {url: input.authorUrl} : {}),
        }
      : {'@id': ORG_ID},
    publisher: {'@id': ORG_ID},
    /* Resolves against the WebPage node `pageGraph()` emits for this path. */
    mainEntityOfPage: {'@id': `${abs(input.path)}#webpage`},
    inLanguage: 'en',
  };
}

/**
 * Case study pages: a CreativeWork the Organization produced.
 *
 * `clientName` is OPTIONAL and `about` is omitted without it. It used to be
 * derived from the URL handle, which is only reliable for `/pages/cs-{client}`
 * — on `/work/{handle}` the handle is not dependably the client, so deriving
 * one there asserted a company relationship that the page did not support.
 * Pass a name only when it is known to be the client.
 */
export function caseStudySchema(opts: {
  path: string;
  clientName?: string;
  headline: string;
  description: string;
  imageUrl?: string;
  datePublished?: string;
}): JsonLd {
  return {
    '@type': 'CreativeWork',
    '@id': `${abs(opts.path)}#casestudy`,
    name: opts.headline,
    headline: opts.headline,
    /* An empty description is worse than no description. */
    ...(opts.description ? {description: opts.description} : {}),
    ...(opts.clientName
      ? {about: {'@type': 'Organization', name: opts.clientName}}
      : {}),
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
