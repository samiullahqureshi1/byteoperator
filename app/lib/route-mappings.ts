export const SHOPIFY_PLUS_PAGE_HANDLE = 'software-plus-agency';
export const SHOPIFY_PLUS_CLEAN_PATH = '/shopify-plus-agency';

export const ARTICLES_BLOG_HANDLE = 'news';
export const LEGACY_JOURNAL_BLOG_HANDLE = 'journal';
export const ARTICLES_CLEAN_PATH = '/articles';

export const CONTACT_PAGE_HANDLE = 'contact';
export const CONTACT_CLEAN_PATH = '/contact';

export const SHOPIFY_SEO_PAGE_HANDLE = 'seo-agency';
export const SHOPIFY_SEO_CLEAN_PATH = '/ecommerce-seo-agency';

export const ECOMMERCE_SEO_PAGE_HANDLE = 'ecommerce-seo-agency';
export const ECOMMERCE_SEO_CLEAN_PATH = '/ecommerce-seo-agency';

export const AI_SEO_PAGE_HANDLE = 'ai-seo-agency';
export const AI_SEO_CLEAN_PATH = '/ai-visibility-audit';

export const GEO_PAGE_HANDLE = 'geo-agency';
export const GEO_CLEAN_PATH = '/ai-visibility-audit';

export const AI_VISIBILITY_AUDIT_PAGE_HANDLE = 'ai-visibility-audit';
export const AI_VISIBILITY_AUDIT_CLEAN_PATH = '/ai-visibility-audit';

export const CRO_PAGE_HANDLE = 'software-cro-agency';
export const CRO_CLEAN_PATH = '/shopify-cro-audit';

export const AB_TESTING_PAGE_HANDLE = 'ab-testing';
export const AB_TESTING_CLEAN_PATH = '/shopify-cro-audit';

export const ECOMMERCE_SEO_MIGRATIONS_PAGE_HANDLE = 'ecommerce-seo-migrations';
export const ECOMMERCE_SEO_MIGRATIONS_CLEAN_PATH = '/services/ecommerce-seo-migrations';

const SERVICE_CONFIG_HANDLES_BY_SHOPIFY_HANDLE = {
  'software-development': 'software-theme-development-builds',
} as const;

export const OLD_TO_CLEAN_PATHS = {
  '/pages/services': '/services',
  '/pages/work': '/work',
  '/pages/our-work': '/work',
  // Retired case-study handles: they used to render a duplicate of another
  // case study (flagged by Google as "Alternative page with proper canonical
  // tag"). A 301 consolidates them into the live page instead.
  '/work/triangl': '/work/collabix',
  '/work/chimi-eyewear': '/work/replex-engine',
  '/pages/about-us': '/about',
  '/pages/about': '/about',
  // Root-level canonical URL for the AI ecommerce agency page. The Software
  // source handle stays first so `resolveLegacyPath` keeps querying
  // `ai-ecommerce-agency`; the retired `/ai` spellings are one-way aliases
  // below it and resolve to the canonical path in a single hop.
  '/pages/ai-ecommerce-agency': '/services/ai-automations-agents',
  '/pages/ai': '/services/ai-automations-agents',
  '/ai': '/services/ai-automations-agents',
  '/ai-ecommerce-agency': '/services/ai-automations-agents',
  // Sits under AI in the Software main menu.
  '/pages/ai-visibility-audit': AI_VISIBILITY_AUDIT_CLEAN_PATH,
  [`/pages/${CONTACT_PAGE_HANDLE}`]: CONTACT_CLEAN_PATH,
  '/pages/contact-us': CONTACT_CLEAN_PATH,
  // Keep these backend pages pointed to the main contact flow instead of
  // rendering the Software-managed content.
  '/pages/discovery-meeting-with-the-software-experts': CONTACT_CLEAN_PATH,
  /*
   * Both spellings go to /contact, which matches the explicit rule in
   * `pages.$handle.tsx`'s loader that treats `software-experts` as a booking
   * page rather than a content page.
   *
   * This entry used to be duplicated further down, pointing at
   * `/software-experts` instead. A duplicate key in an object literal takes its
   * LAST value, so that one silently won for the no-slash spelling — and
   * `/software-experts` 404s, because no Software page carries that handle. The
   * duplicate was removed rather than honoured.
   *
   * TO PUBLISH THE REAL PAGE: create a Software page with handle
   * `software-experts`. Its layout already exists as
   * SERVICE_PAGE_CONFIGS['software-experts'] in `app/data/servicePages.ts`, and
   * `$pageHandle.tsx` already has its title, description and canonical. Then
   * point both spellings here at '/software-experts' and delete the handle from
   * the redirect check in `pages.$handle.tsx`.
   */
  '/pages/software-experts': CONTACT_CLEAN_PATH,
  /*
   * The clean spellings too. Without these, `/software-experts` 404s — nothing
   * links to it, but it is a URL people and crawlers have, and a 301 to the
   * contact flow is a better answer than a dead end.
   */
  '/software-experts': CONTACT_CLEAN_PATH,
  /*
   * `/case-studies` was never a real page — no Software page carries that
   * handle, so the clean URL 404'd while `/pages/case-studies` happily 301'd
   * into it. The homepage feature grid links here ten times via
   * `ROUTES.caseStudies`, so every one of those was a dead end.
   *
   * `/work` is the live case-study index. Kept below `/pages/work` so
   * `resolveLegacyPath('/work')` still resolves to the `work` page handle.
   */
  '/pages/case-studies': '/work',
  '/case-studies': '/work',
  // Canonical Software source handle first: `resolveLegacyPath` returns the
  // first `/pages/*` entry that points at a clean path, so the retired
  // `software-development` / `theme-development` spellings must stay below it.
  '/pages/software-theme-development-builds':
    '/services/software-theme-development-builds',
  '/pages/software-development': '/services/software-theme-development-builds',
  '/software-development': '/services/software-theme-development-builds',
  '/software-theme-development-builds': '/services/software-theme-development-builds',
  '/pages/software-developers': '/services/software-developers',
  '/software-developers': '/services/software-developers',
  '/pages/software-web-design': '/services/software-web-design',
  '/software-web-design': '/services/software-web-design',
  [`/pages/${SHOPIFY_PLUS_PAGE_HANDLE}`]: SHOPIFY_PLUS_CLEAN_PATH,
  '/pages/software-plus': SHOPIFY_PLUS_CLEAN_PATH,
  '/software-plus': SHOPIFY_PLUS_CLEAN_PATH,
  '/pages/software-migrations': '/services/software-migrations',
  '/software-migrations': '/services/software-migrations',
  '/pages/software-app-development': '/services/software-app-development',
  '/software-app-development': '/services/software-app-development',
  '/pages/software-integrations': '/services/software-integrations',
  '/software-integrations': '/services/software-integrations',
  '/pages/integrations': '/services/software-integrations',
  '/integrations': '/services/software-integrations',
  [`/pages/${SHOPIFY_SEO_PAGE_HANDLE}`]: ECOMMERCE_SEO_CLEAN_PATH,
  '/pages/software-seo': ECOMMERCE_SEO_CLEAN_PATH,
  '/software-seo': ECOMMERCE_SEO_CLEAN_PATH,
  // The Software source handle is the canonical public route. Retired
  // Software and clean spellings below remain one-way aliases.
  [`/pages/${ECOMMERCE_SEO_PAGE_HANDLE}`]: ECOMMERCE_SEO_CLEAN_PATH,
  '/pages/ecommerce-seo': ECOMMERCE_SEO_CLEAN_PATH,
  '/ecommerce-seo': ECOMMERCE_SEO_CLEAN_PATH,
  // The Software source handle is canonical; the retired ecommerce-ai-seo
  // spellings remain one-way aliases so redirects complete in one hop.
  [`/pages/${AI_SEO_PAGE_HANDLE}`]: AI_SEO_CLEAN_PATH,
  '/pages/ecommerce-ai-seo': AI_SEO_CLEAN_PATH,
  '/ecommerce-ai-seo': AI_SEO_CLEAN_PATH,
  '/ai-seo-agency': AI_SEO_CLEAN_PATH,
  '/pages/geo-agency': AI_VISIBILITY_AUDIT_CLEAN_PATH,
  '/pages/ecommerce-geo': AI_VISIBILITY_AUDIT_CLEAN_PATH,
  '/ecommerce-geo': AI_VISIBILITY_AUDIT_CLEAN_PATH,
  '/geo-agency': AI_VISIBILITY_AUDIT_CLEAN_PATH,
  /* `/pages/ab-testing` is already mapped further down this table. */
  [`/pages/${ECOMMERCE_SEO_MIGRATIONS_PAGE_HANDLE}`]:
    '/services/ecommerce-seo-migrations',
  '/pages/seo-migrations': '/services/ecommerce-seo-migrations',
  '/seo-migrations': '/services/ecommerce-seo-migrations',
  '/ecommerce-seo-migrations': '/services/ecommerce-seo-migrations',
  '/pages/headless-commerce': '/services/headless-commerce',
  '/headless-commerce': '/services/headless-commerce',
  '/conversion-rate-optimisation': '/shopify-cro-audit',
  '/pages/support-and-maintenance': '/services/support-and-maintenance',
  '/pages/software-maintenance': '/services/support-and-maintenance',
  '/software-maintenance': '/services/support-and-maintenance',
  '/support-and-maintenance': '/services/support-and-maintenance',
  '/pages/software-support': '/services/support-and-maintenance',
  '/software-support': '/services/support-and-maintenance',
  '/pages/support-maintenance': '/services/support-and-maintenance',
  '/support-maintenance': '/services/support-and-maintenance',
  '/pages/software-audits': '/services/software-audits',
  '/software-audits': '/services/software-audits',
  '/pages/software-internationalisation': '/services/software-internationalisation',
  '/pages/internationalisation': '/services/software-internationalisation',
  '/software-internationalisation': '/services/software-internationalisation',
  '/internationalisation': '/services/software-internationalisation',
  '/pages/email-marketing-agency': '/services/email-marketing-agency',
  '/email-marketing-agency': '/services/email-marketing-agency',
  '/pages/email-sms-marketing': '/services/email-marketing-agency',
  '/email-sms-marketing': '/services/email-marketing-agency',
  '/pages/email-marketing-services-1': '/services/email-marketing-agency',
  '/email-marketing-services-1': '/services/email-marketing-agency',
  '/pages/klaviyo-agency': '/services/klaviyo-agency',
  '/pages/klaviyo': '/services/klaviyo-agency',
  '/klaviyo': '/services/klaviyo-agency',
  [`/pages/${CRO_PAGE_HANDLE}`]: '/shopify-cro-audit',
  '/pages/conversion-rate-optimisation': '/shopify-cro-audit',
  '/pages/cro-agency': '/shopify-cro-audit',
  '/cro-agency': '/shopify-cro-audit',
  '/software-cro-agency': '/shopify-cro-audit',
  '/pages/software-b2b-wholesale': '/services/software-b2b-wholesale',
  '/pages/software-b2b': '/services/software-b2b-wholesale',
  '/software-b2b': '/services/software-b2b-wholesale',
  '/software-b2b-wholesale': '/services/software-b2b-wholesale',
  '/pages/b2b': '/services/software-b2b-wholesale',
  '/b2b': '/services/software-b2b-wholesale',
  '/pages/subscriptions-on-software': '/services/subscriptions-on-software',
  '/pages/software-subscriptions': '/services/subscriptions-on-software',
  '/software-subscriptions': '/services/subscriptions-on-software',
  '/pages/subscriptions': '/services/subscriptions-on-software',
  '/subscriptions': '/services/subscriptions-on-software',
  '/pages/agentic-commerce': '/services/agentic-commerce',
  '/agentic-commerce': '/services/agentic-commerce',
  '/pages/ab-testing': AB_TESTING_CLEAN_PATH,
  '/ab-testing': AB_TESTING_CLEAN_PATH,
  /* Architecture & Tech consulting */
  '/pages/software-consultant': '/services/software-consultant',
  '/software-consultant': '/services/software-consultant',
  '/pages/magento-software-migrations': '/services/magento-software-migrations',
  '/magento-software-migrations': '/services/magento-software-migrations',
  '/pages/woocommerce-software-migrations': '/services/woocommerce-software-migrations',
  '/woocommerce-software-migrations': '/services/woocommerce-software-migrations',
  '/pages/bigcommerce-software-migrations': '/services/bigcommerce-software-migrations',
  '/bigcommerce-software-migrations': '/services/bigcommerce-software-migrations',
  '/pages/salesforce-software-migrations': '/services/salesforce-software-migrations',
  '/salesforce-software-migrations': '/services/salesforce-software-migrations',
  '/pages/theme-development': '/services/software-theme-development-builds',
  '/theme-development': '/services/software-theme-development-builds',
  '/pages/memberships': '/services/memberships',
  '/pages/search-first': '/search',
  /*
   * `/pages/software-experts` is NOT mapped here. It used to be, which made
   * `/pages/software-experts` resolve to `/software-experts` — a URL that 404s,
   * because no Software page carries that handle. It is mapped to /contact with
   * the other booking pages near the top of this object; see the note there
   * for how to publish the real page.
   */
  '/pages/ecommerce-agency': ECOMMERCE_SEO_CLEAN_PATH,
  '/ecommerce-agency': ECOMMERCE_SEO_CLEAN_PATH,
  '/pages/podcast': '/podcast',
  '/pages/webinars': '/webinars',
  '/pages/guides': '/guides',
  /*
   * Canonical Software source handle first, per the rule above: the page that
   * actually exists is `join-our-newsletter`. There is no Software page with
   * the handle `newsletter`, so listing `/pages/newsletter` first made
   * `resolveLegacyPath('/newsletter')` return a handle the Storefront API has
   * no record of, and `/newsletter` 404'd while still being published in
   * sitemap/pages/1.xml. The retired spelling stays below as a one-way alias.
   */
  '/pages/join-our-newsletter': '/newsletter',
  '/pages/newsletter': '/newsletter',
  '/pages/events': '/webinars',
  '/events': '/webinars',
  '/pages/careers': '/about',
  '/careers': '/about',
  '/pages/why-custom-software': '/services/why-custom-software',
  '/why-custom-software': '/services/why-custom-software',

  /* =====================================================
     DEAD LINKS — site crawl, 21 Sep 2026

     Old-theme URLs still linked from blog post bodies, and
     Software admin URL Redirects that ended on a 404 or took
     2–3 hops. This map runs before the app, so each lands
     on a live page in one hop.
  ===================================================== */

  // Retired service pages.
  '/pages/software-migration': '/services/software-migrations',
  '/pages/magento-to-software-plus-migration': '/services/magento-software-migrations',
  '/pages/bigcommerce-to-software-plus-migration':
    '/services/bigcommerce-software-migrations',
  '/pages/bigcommerce-to-software-plus': '/services/bigcommerce-software-migrations',
  '/pages/woocommerce-to-software-plus-migration':
    '/services/woocommerce-software-migrations',
  '/pages/wix-to-software-migration': '/services/software-migrations',
  '/pages/wix-to-software': '/services/software-migrations',
  '/pages/software-plus-maintenance': '/services/support-and-maintenance',
  '/pages/software-development-services': '/services/software-theme-development-builds',
  '/pages/email-marketing-services': '/services/email-marketing-agency',
  '/pages/software-audit': '/services/shopify-audits',
  '/pages/free-software-audit-software-store-seo-cro-and-speed-review':
    '/services/shopify-audits',
  '/pages/software-plus-custom-solutions': SHOPIFY_PLUS_CLEAN_PATH,
  '/pages/software-website-design': '/services/software-web-design',
  '/pages/store-speed': '/services/software-developers',
  '/pages/about-us-1': '/about',

  // Booking spellings — straight to contact instead of via two redirects.
  '/pages/book-a-call': CONTACT_CLEAN_PATH,
  '/pages/schedule-a-call': CONTACT_CLEAN_PATH,
  '/bookacall': CONTACT_CLEAN_PATH,

  // Old theme's service products and collections.
  '/products/software-experts-the-fold-tech-software-logo-and-visual-branding-services':
    '/services/software-web-design',
  '/products/software-experts-the-fold-tech-software-store-build-or-redesign-services':
    '/services/software-web-design',
  '/products/software-experts-the-fold-tech-software-seo-search-engine-optimization-services':
    ECOMMERCE_SEO_CLEAN_PATH,
  '/products/software-experts-the-fold-tech-software-analytics-and-tracking-services':
    '/services',
  '/products/premium-package': '/services/software-web-design',
  '/products/premium-theme-license': '/services/software-theme-development-builds',
  '/products/edit-credits': CONTACT_CLEAN_PATH,
  '/products/dedicated-hourly-service': CONTACT_CLEAN_PATH,
  '/products/monthly-dedicated-resource': CONTACT_CLEAN_PATH,
  '/products/buy-bulk-hours': CONTACT_CLEAN_PATH,
  '/products/service-invoice-0001844': '/services',
  '/collections/store-setup': '/services/software-web-design',
  '/collections/visual-content-and-branding': '/services/software-web-design',
  '/collections/turnkey-dropshipping-websites-for-sale': '/services/software-web-design',
  '/collections/development-and-troubleshooting': '/services/support-and-maintenance',
  '/collections/marketing-and-sales': '/services',
  '/collections/frontpage': '/services',

  // Blog URLs whose post was renamed, unpublished or never existed.
  '/blogs/news/10-best-omnichannel-platforms-in-2025-pricing-pros-amp-cons':
    ARTICLES_CLEAN_PATH,
  '/articles/10-best-omnichannel-platforms-in-2025-pricing-pros-amp-cons':
    ARTICLES_CLEAN_PATH,
  '/blogs/news/tagged/css-z-index-what-it-is': ARTICLES_CLEAN_PATH,
  '/blogs/news/byteoperator.com': ARTICLES_CLEAN_PATH,
  '/blogs/news/the-pros-and-cons-of-law-firm-seo-services':
    ECOMMERCE_SEO_CLEAN_PATH,
  '/blogs/news/tagged/law-firm-seo-services': ECOMMERCE_SEO_CLEAN_PATH,
  '/blogs/the-pros-and-cons-of-law-firm-seo-services': ECOMMERCE_SEO_CLEAN_PATH,

  /* =====================================================
     EMPTY PAGES — see docs/empty-pages-redirect-plan.md
  ===================================================== */

  // Reachable from a live menu — a visitor can click into these.
  '/pages/ai-visibility': AI_VISIBILITY_AUDIT_CLEAN_PATH,
  '/pages/ai-visibility-implementation': AI_VISIBILITY_AUDIT_CLEAN_PATH,
  '/pages/ai-visibility-monitoring': AI_VISIBILITY_AUDIT_CLEAN_PATH,
  '/pages/bigcommerce-to-software-migration': '/services/bigcommerce-software-migrations',
  '/pages/conversion-rate-optimization': '/shopify-cro-audit',
  '/pages/free-ai-visibility-snapshot': AI_VISIBILITY_AUDIT_CLEAN_PATH,
  '/pages/resources': '/guides',
  '/pages/reviews': '/work',
  '/pages/software-design-services': '/services/software-web-design',
  '/pages/software-development-services-1': '/services/software-developers',
  '/pages/software-marketing-services': '/services',
  '/pages/software-speed-optimization': '/services/shopify-audits',

  // Not linked from a menu; reachable by search or old links.
  '/pages/analytics-tracking': '/services',
  '/pages/branding-creative-direction': '/services',
  '/pages/cart-drawer': '/services/software-developers',
  '/pages/case-studies-1': '/work',
  '/pages/custom-store-project': '/services/software-web-design',
  '/pages/digital-branding-creative-direction-services': '/services',
  '/pages/free-software-audit': '/services/shopify-audits',
  '/pages/funnel-building-lead-generation': '/services',
  '/pages/getting-started': CONTACT_CLEAN_PATH,
  '/pages/launch': '/services',
  '/pages/lead-generation-services-and-funnel-building': '/services',
  '/pages/learn-more': '/about',
  '/pages/magento-to-software-migration': '/services/magento-software-migrations',
  '/pages/marketing-analytics-and-tracking': '/services',
  '/pages/marketing-automation': '/services/email-marketing-agency',
  '/pages/marketing-sales': '/services',
  '/pages/paid-social-scaling': '/services',
  '/pages/retain': '/services/support-and-maintenance',
  '/pages/search': '/search',
  '/pages/search-engine-optimization-seo': ECOMMERCE_SEO_CLEAN_PATH,
  '/pages/software-app-development-services': '/services/software-app-development',
  '/pages/software-conversion-rate-optimization': '/shopify-cro-audit',
  '/pages/software-custom-solutions': '/services',
  '/pages/software-maintenance-services-1': '/services/support-and-maintenance',
  '/pages/software-marketing-automation': '/services/email-marketing-agency',
  '/pages/software-marketing-seo': ECOMMERCE_SEO_CLEAN_PATH,
  '/pages/software-migration-services': '/services/software-migrations',
  '/pages/software-paid-social': '/services',
  '/pages/software-plus-partner-agency': '/shopify-plus-agency',
  '/pages/software-seo-services': ECOMMERCE_SEO_CLEAN_PATH,
  '/pages/software-theme-customization': '/services/software-theme-development-builds',
  '/pages/sitelab-helpdesk': '/services/support-and-maintenance',
  '/pages/testimonials': '/work',
  '/pages/the-fold-tech-approach-to-cro': '/shopify-cro-audit',
  '/pages/website-audit-service': '/services/shopify-audits',
  '/pages/website-audit-services': '/services/shopify-audits',
  '/pages/wix-to-software-migration-1': '/services/software-migrations',
  '/pages/woocommerce-to-software': '/services/woocommerce-software-migrations',
  '/pages/woocommerce-to-software-migration': '/services/woocommerce-software-migrations',

  /* =====================================================
     ROOT-LEVEL HYDROGEN PATHS — these were real routes on the
     old storefront; the Next.js app only serves /services/*.
  ===================================================== */
  '/seo-agency': SHOPIFY_SEO_CLEAN_PATH,
  '/software-plus-agency': SHOPIFY_PLUS_CLEAN_PATH,
  '/software-cro-audit': CRO_CLEAN_PATH,
  '/klaviyo-agency': '/services/klaviyo-agency',
  '/subscriptions-on-software': '/services/subscriptions-on-software',
  '/memberships': '/services/memberships',

  /* =====================================================
     SERVICE ALIASES — alternate /services/* handles that used
     to render duplicate copies of a service page.
  ===================================================== */
  '/services/custom-software-platforms': '/services/software-developers',
  '/services/custom-software-development': '/services/software-developers',
  '/services/full-stack-web-development': '/services/software-theme-development-builds',
  '/services/software-development': '/services/software-theme-development-builds',
  '/services/mobile-app-development': '/services/software-app-development',
  '/services/api-system-integrations': '/services/software-integrations',
  '/services/integrations': '/services/software-integrations',
  '/services/headless-cloud-architecture': '/services/headless-commerce',
  '/services/technical-seo-architecture': SHOPIFY_SEO_CLEAN_PATH,
  '/services/ecommerce-seo': SHOPIFY_SEO_CLEAN_PATH,
  '/services/generative-engine-optimisation': AI_VISIBILITY_AUDIT_CLEAN_PATH,
  '/services/ai-visibility-audit': AI_VISIBILITY_AUDIT_CLEAN_PATH,
  '/services/ai-automation': '/services/ai-automations-agents',
  '/services/ai-ecommerce-agency': '/services/ai-automations-agents',
  '/services/platform-seo-migrations': ECOMMERCE_SEO_MIGRATIONS_CLEAN_PATH,
  '/services/international-seo-markets': '/services/software-internationalisation',
  '/services/performance-speed-audits': '/services/shopify-audits',
  '/services/dedicated-engineering-support': '/services/support-and-maintenance',
  '/services/architecture-tech-consulting': '/services/software-consultant',
  '/services/shopify-store-development': '/services/software-web-design',
  '/services/shopify-apps-extensions': '/services/shopify-app-development',
  '/services/platform-migrations': '/services/software-migrations',
  '/services/b2b-wholesale-systems': '/services/software-b2b-wholesale',
  '/services/shopify-plus': SHOPIFY_PLUS_CLEAN_PATH,
  '/services/shopify-plus-agency': SHOPIFY_PLUS_CLEAN_PATH,
  '/services/software-plus': SHOPIFY_PLUS_CLEAN_PATH,
  '/services/software-plus-agency': SHOPIFY_PLUS_CLEAN_PATH,
  '/services/shopify-enterprise': SHOPIFY_PLUS_CLEAN_PATH,
  '/services/enterprise-shopify': SHOPIFY_PLUS_CLEAN_PATH,
  '/services/shopify-cro-audit': CRO_CLEAN_PATH,
  '/services/software-cro-audit': CRO_CLEAN_PATH,
  '/services/cro-agency': CRO_CLEAN_PATH,
  '/services/software-cro-agency': CRO_CLEAN_PATH,
  '/services/conversion-rate-optimisation': CRO_CLEAN_PATH,

  /* =====================================================
     DUPLICATE PAGES — consolidated to one URL each (SEO phase 4).
  ===================================================== */
  // Shopify twins of the platform-neutral service pages.
  '/services/shopify-web-design': '/services/software-web-design',
  '/services/shopify-migrations': '/services/software-migrations',
  '/services/shopify-b2b-wholesale': '/services/software-b2b-wholesale',
  '/services/shopify-internationalisation': '/services/software-internationalisation',
  '/services/shopify-consultant': '/services/software-consultant',
  // Same config rendered at a root landing page.
  '/services/seo-agency': ECOMMERCE_SEO_CLEAN_PATH,
  '/services/geo-agency': AI_VISIBILITY_AUDIT_CLEAN_PATH,
  // Generic "experts" overview merged into the main custom software page (SEO batch 6).
  '/services/software-experts': '/services/software-developers',
  // Service-page copies of the resource hubs.
  '/services/podcast': '/podcast',
  '/services/webinars': '/webinars',
  '/services/guides': '/guides',

  /* =====================================================
     RETIRED ARTICLES (replaced 27 Sep 2026) → closest live page.
  ===================================================== */
  '/articles/the-complete-guide-to-software-cro-in-2026': CRO_CLEAN_PATH,
  '/articles/ai-search-and-visibility-optimisation-for-ecommerce':
    AI_VISIBILITY_AUDIT_CLEAN_PATH,
  '/articles/migrating-to-software-plus-enterprise-playbook':
    '/services/software-migrations',
  '/articles/top-software-apps-for-scale':
    '/articles/headless-commerce-vs-traditional-ecommerce',
} as const;

export type LegacyPagePath = keyof typeof OLD_TO_CLEAN_PATHS;
export type CleanPagePath = (typeof OLD_TO_CLEAN_PATHS)[LegacyPagePath];
export type SoftwarePagePath = Extract<LegacyPagePath, `/pages/${string}`>;

export function getArticlePath(articleHandle: string): string {
  return `${ARTICLES_CLEAN_PATH}/${articleHandle}`;
}

/** Blogs whose articles are client case studies, served at `/work/:handle`. */
export const CASE_STUDY_BLOG_HANDLES = [
  'featured',
  'top-case-studies',
  'case-studies',
] as const;

export function getCaseStudyPath(articleHandle: string): string {
  return `/work/${articleHandle}`;
}

/** Public URL of any blog post: case studies live under `/work`. */
export function getPostPath(blogHandle: string, articleHandle: string): string {
  return (CASE_STUDY_BLOG_HANDLES as readonly string[]).includes(blogHandle)
    ? getCaseStudyPath(articleHandle)
    : getArticlePath(articleHandle);
}

export function resolveArticlesPath(pathname: string): string | null {
  const normalizedPath = trimTrailingSlash(pathname);

  // Case studies reached via `/blogs/<case-study-blog>/x` belong at `/work/x`,
  // and the blog index itself is a thin duplicate of the `/work` listing.
  for (const blog of CASE_STUDY_BLOG_HANDLES) {
    if (normalizedPath === `/blogs/${blog}`) return '/work';
  }
  for (const prefix of CASE_STUDY_BLOG_HANDLES.map(
    (blog) => `/blogs/${blog}/`,
  )) {
    const handle = normalizedPath.startsWith(prefix)
      ? normalizedPath.slice(prefix.length)
      : '';
    if (handle && !handle.includes('/')) return getCaseStudyPath(handle);
  }

  if (
    normalizedPath === `/blogs/${ARTICLES_BLOG_HANDLE}` ||
    normalizedPath === `/blogs/${LEGACY_JOURNAL_BLOG_HANDLE}` ||
    normalizedPath === trimTrailingSlash(ARTICLES_CLEAN_PATH)
  ) {
    return ARTICLES_CLEAN_PATH;
  }

  for (const blogHandle of [ARTICLES_BLOG_HANDLE, LEGACY_JOURNAL_BLOG_HANDLE]) {
    const legacyArticlePrefix = `/blogs/${blogHandle}/`;

    if (normalizedPath.startsWith(legacyArticlePrefix)) {
      const articleHandle = normalizedPath.slice(legacyArticlePrefix.length);

      if (articleHandle && !articleHandle.includes('/')) {
        return getArticlePath(articleHandle);
      }
    }
  }

  const articlePrefix = `${trimTrailingSlash(ARTICLES_CLEAN_PATH)}/`;

  if (normalizedPath.startsWith(articlePrefix)) {
    const articleHandle = normalizedPath.slice(articlePrefix.length);

    if (articleHandle && !articleHandle.includes('/')) {
      return getArticlePath(articleHandle);
    }
  }

  return null;
}

/** Software page `cs-{name}` is the case study served at `/work/{name}`. */
export const CASE_STUDY_PAGE_PREFIX = 'cs-';

export function resolveCleanPath(pathname: string): string {
  const csPrefix = `/pages/${CASE_STUDY_PAGE_PREFIX}`;
  const name = pathname.startsWith(csPrefix)
    ? trimTrailingSlash(pathname).slice(csPrefix.length)
    : '';
  if (name && !name.includes('/')) return getCaseStudyPath(name);

  // `/case-studies/{name}` duplicated `/work/{name}`.
  const caseStudy = /^\/case-studies\/([^/]+)\/?$/.exec(pathname);
  if (caseStudy) return getCaseStudyPath(caseStudy[1]);

  return (
    OLD_TO_CLEAN_PATHS[pathname as LegacyPagePath] ??
    OLD_TO_CLEAN_PATHS[trimTrailingSlash(pathname) as LegacyPagePath] ??
    pathname
  );
}

export function resolveServiceConfigHandle(softwareHandle: string): string {
  return (
    SERVICE_CONFIG_HANDLES_BY_SHOPIFY_HANDLE[
      softwareHandle as keyof typeof SERVICE_CONFIG_HANDLES_BY_SHOPIFY_HANDLE
    ] ?? softwareHandle
  );
}

/**
 * Resolve the single canonical public path for any known spelling of a page
 * URL: a legacy `/pages/*` path, a retired clean URL, or the canonical path
 * itself (including its trailing-slash-less spelling).
 */
export function resolveCanonicalPath(pathname: string): string {
  // Explicit entries win over the blog pattern: a renamed post's old
  // `/blogs/news/x` must go to its new handle, not `/articles/x/`.
  const mappedPath = resolveCleanPath(pathname);

  if (mappedPath !== pathname) {
    return mappedPath;
  }

  const articlesPath = resolveArticlesPath(pathname);

  if (articlesPath) {
    return articlesPath;
  }

  const legacyPath = resolveLegacyPath(pathname);

  return legacyPath ? resolveCleanPath(legacyPath) : pathname;
}

const SITE_ORIGIN = /^https?:\/\/(?:www\.)?byteoperator\.com(?=\/)/i;

/**
 * Points every internal link in Software-authored HTML at its canonical path.
 * Article copy still links legacy `/pages/*` and `/blogs/news/*` URLs, which
 * cost a redirect hop and make crawlers see one anchor text aimed at two URLs.
 */
export function withCanonicalLinks(html: string): string {
  return html.replace(
    /(<a\b[^>]*?\bhref=)(["'])(.*?)\2/gi,
    (match, before: string, quote: string, href: string) => {
      const url = href.replace(SITE_ORIGIN, '');
      if (!url.startsWith('/') || url.startsWith('//')) return match;

      const [, path, rest] = /^([^?#]*)(.*)$/s.exec(url)!;
      return `${before}${quote}${resolveCanonicalPath(path)}${rest}${quote}`;
    },
  );
}

/**
 * True when two paths differ by nothing more than a trailing slash.
 *
 * React Router's single fetch drops the trailing slash when it builds the
 * `.data` URL for a client navigation, so `/services/x/` is requested as
 * `/services/x.data` and reaches loaders as `/services/x`. Loaders must treat
 * both spellings as the same path: redirecting on that difference sends the
 * client straight back to the URL it is already navigating to, which loops
 * forever. Trailing-slash canonicalization happens once, for document
 * requests only, in `getCleanUrlRedirect`.
 */
export function isSamePath(a: string, b: string): boolean {
  return trimTrailingSlash(a) === trimTrailingSlash(b);
}

export function resolveLegacyPath(pathname: string): SoftwarePagePath | null {
  const target = trimTrailingSlash(pathname);

  const match = Object.entries(OLD_TO_CLEAN_PATHS).find(
    ([legacyPath, cleanPath]) =>
      legacyPath.startsWith('/pages/') &&
      trimTrailingSlash(cleanPath) === target,
  );

  return (match?.[0] as SoftwarePagePath | undefined) ?? null;
}

function trimTrailingSlash(pathname: string): string {
  return pathname.length > 1 && pathname.endsWith('/')
    ? pathname.slice(0, -1)
    : pathname;
}
