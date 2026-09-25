export const SHOPIFY_PLUS_PAGE_HANDLE = 'software-plus-agency';
export const SHOPIFY_PLUS_CLEAN_PATH = '/software-plus-agency';

export const ARTICLES_BLOG_HANDLE = 'news';
export const LEGACY_JOURNAL_BLOG_HANDLE = 'journal';
export const ARTICLES_CLEAN_PATH = '/articles/';

export const CONTACT_PAGE_HANDLE = 'contact';
export const CONTACT_CLEAN_PATH = '/contact/';

export const SHOPIFY_SEO_PAGE_HANDLE = 'seo-agency';
export const SHOPIFY_SEO_CLEAN_PATH = '/seo-agency';

export const ECOMMERCE_SEO_PAGE_HANDLE = 'ecommerce-seo-agency';
export const ECOMMERCE_SEO_CLEAN_PATH = '/ecommerce-seo-agency/';

export const AI_SEO_PAGE_HANDLE = 'ai-seo-agency';
export const AI_SEO_CLEAN_PATH = '/ai-seo-agency/';

export const GEO_PAGE_HANDLE = 'geo-agency';
export const GEO_CLEAN_PATH = '/geo-agency/';

export const AI_VISIBILITY_AUDIT_PAGE_HANDLE = 'ai-visibility-audit';
export const AI_VISIBILITY_AUDIT_CLEAN_PATH = '/ai-visibility-audit/';

export const CRO_PAGE_HANDLE = 'software-cro-agency';
export const CRO_CLEAN_PATH = '/software-cro-agency/';

export const AB_TESTING_PAGE_HANDLE = 'ab-testing';
export const AB_TESTING_CLEAN_PATH = '/ab-testing';

export const ECOMMERCE_SEO_MIGRATIONS_PAGE_HANDLE = 'ecommerce-seo-migrations';
export const ECOMMERCE_SEO_MIGRATIONS_CLEAN_PATH = '/ecommerce-seo-migrations/';

const SERVICE_CONFIG_HANDLES_BY_SHOPIFY_HANDLE = {
  'software-development': 'software-theme-development-builds',
} as const;

export const OLD_TO_CLEAN_PATHS = {
  '/pages/services': '/services',
  '/pages/work': '/work',
  '/pages/our-work': '/work',
  '/pages/about-us': '/about',
  '/pages/about': '/about',
  // Root-level canonical URL for the AI ecommerce agency page. The Software
  // source handle stays first so `resolveLegacyPath` keeps querying
  // `ai-ecommerce-agency`; the retired `/ai` spellings are one-way aliases
  // below it and resolve to the canonical path in a single hop.
  '/pages/ai-ecommerce-agency': '/ai-ecommerce-agency/',
  '/pages/ai': '/ai-ecommerce-agency/',
  '/ai': '/ai-ecommerce-agency/',
  '/ai/': '/ai-ecommerce-agency/',
  // Sits under AI in the Software main menu.
  '/pages/ai-visibility-audit': '/ai-visibility-audit/',
  [`/pages/${CONTACT_PAGE_HANDLE}`]: CONTACT_CLEAN_PATH,
  '/pages/contact-us': CONTACT_CLEAN_PATH,
  '/pages/contact-us/': CONTACT_CLEAN_PATH,
  // Keep these backend pages pointed to the main contact flow instead of
  // rendering the Software-managed content.
  '/pages/discovery-meeting-with-the-software-experts': CONTACT_CLEAN_PATH,
  '/pages/discovery-meeting-with-the-software-experts/': CONTACT_CLEAN_PATH,
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
  '/pages/software-experts/': CONTACT_CLEAN_PATH,
  /*
   * The clean spellings too. Without these, `/software-experts` 404s — nothing
   * links to it, but it is a URL people and crawlers have, and a 301 to the
   * contact flow is a better answer than a dead end.
   */
  '/software-experts': CONTACT_CLEAN_PATH,
  '/software-experts/': CONTACT_CLEAN_PATH,
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
    '/software-theme-development-builds/',
  '/pages/software-development': '/software-theme-development-builds/',
  '/software-development': '/software-theme-development-builds/',
  '/pages/software-developers': '/software-developers',
  '/pages/software-web-design': '/software-web-design',
  [`/pages/${SHOPIFY_PLUS_PAGE_HANDLE}`]: SHOPIFY_PLUS_CLEAN_PATH,
  '/pages/software-plus': SHOPIFY_PLUS_CLEAN_PATH,
  '/software-plus': SHOPIFY_PLUS_CLEAN_PATH,
  '/pages/software-migrations': '/software-migrations/',
  '/software-migrations': '/software-migrations/',
  // Globally unique services use root-level canonical URLs. Every retired
  // spelling is listed explicitly so the resolver never strips prefixes
  // generically.
  '/pages/software-app-development': '/software-app-development/',
  '/services/software-app-development': '/software-app-development/',
  '/services/software-app-development/': '/software-app-development/',
  '/software-app-development': '/software-app-development/',
  '/pages/software-integrations': '/software-integrations/',
  '/services/software-integrations': '/software-integrations/',
  '/services/software-integrations/': '/software-integrations/',
  '/software-integrations': '/software-integrations/',
  /*
   * Short alias -> the real page's clean URL.
   *
   * These aliases used to point at `/pages/{alias}` handles that do not
   * exist in Software, so each one 301'd to a clean URL that then 404'd.
   * The actual pages were live the whole time under their own handles.
   */
  '/pages/integrations': '/software-integrations/',
  '/integrations': '/software-integrations/',
  [`/pages/${SHOPIFY_SEO_PAGE_HANDLE}`]: SHOPIFY_SEO_CLEAN_PATH,
  '/pages/software-seo': SHOPIFY_SEO_CLEAN_PATH,
  '/software-seo': SHOPIFY_SEO_CLEAN_PATH,
  // The Software source handle is the canonical public route. Retired
  // Software and clean spellings below remain one-way aliases.
  [`/pages/${ECOMMERCE_SEO_PAGE_HANDLE}`]: ECOMMERCE_SEO_CLEAN_PATH,
  '/pages/ecommerce-seo': ECOMMERCE_SEO_CLEAN_PATH,
  '/ecommerce-seo': ECOMMERCE_SEO_CLEAN_PATH,
  '/ecommerce-seo/': ECOMMERCE_SEO_CLEAN_PATH,
  // The Software source handle is canonical; the retired ecommerce-ai-seo
  // spellings remain one-way aliases so redirects complete in one hop.
  [`/pages/${AI_SEO_PAGE_HANDLE}`]: AI_SEO_CLEAN_PATH,
  '/pages/ecommerce-ai-seo': AI_SEO_CLEAN_PATH,
  '/ecommerce-ai-seo': AI_SEO_CLEAN_PATH,
  '/ecommerce-ai-seo/': AI_SEO_CLEAN_PATH,
  '/ai-seo-agency': AI_SEO_CLEAN_PATH,
  '/pages/geo-agency': GEO_CLEAN_PATH,
  '/pages/ecommerce-geo': GEO_CLEAN_PATH,
  '/ecommerce-geo': GEO_CLEAN_PATH,
  '/ecommerce-geo/': GEO_CLEAN_PATH,
  '/geo-agency': GEO_CLEAN_PATH,
  /* `/pages/ab-testing` is already mapped further down this table. */
  '/ab-testing/': AB_TESTING_CLEAN_PATH,
  // Canonical Software handle first: `resolveLegacyPath` returns the first
  // `/pages/*` entry that points at a clean path, so the retired
  // `/pages/seo-migrations` alias must stay below this line.
  [`/pages/${ECOMMERCE_SEO_MIGRATIONS_PAGE_HANDLE}`]:
    ECOMMERCE_SEO_MIGRATIONS_CLEAN_PATH,
  '/pages/seo-migrations': ECOMMERCE_SEO_MIGRATIONS_CLEAN_PATH,
  '/seo-migrations': ECOMMERCE_SEO_MIGRATIONS_CLEAN_PATH,
  '/ecommerce-seo-migrations': ECOMMERCE_SEO_MIGRATIONS_CLEAN_PATH,
  '/services/ecommerce-seo-migrations': ECOMMERCE_SEO_MIGRATIONS_CLEAN_PATH,
  '/services/ecommerce-seo-migrations/': ECOMMERCE_SEO_MIGRATIONS_CLEAN_PATH,
  '/pages/headless-commerce': '/headless-commerce',
  '/conversion-rate-optimisation': CRO_CLEAN_PATH,
  '/conversion-rate-optimisation/': CRO_CLEAN_PATH,
  // Root-level canonical URL for support & maintenance. The Software source
  // handle stays first so `resolveLegacyPath` keeps querying
  // `support-and-maintenance`; every retired spelling below is a one-way
  // alias that resolves to the canonical path in a single hop.
  '/pages/support-and-maintenance': '/support-and-maintenance/',
  '/pages/software-maintenance': '/support-and-maintenance/',
  '/software-maintenance': '/support-and-maintenance/',
  '/services/support-and-maintenance': '/support-and-maintenance/',
  '/services/support-and-maintenance/': '/support-and-maintenance/',
  '/pages/software-support': '/support-and-maintenance/',
  '/software-support': '/support-and-maintenance/',
  '/pages/support-maintenance': '/support-and-maintenance/',
  '/support-maintenance': '/support-and-maintenance/',
  // architecture & code audits keeps its canonical URL under `/services/*`, so the
  // retired root-level spelling is the alias here, not the target.
  '/pages/software-audits': '/services/software-audits/',
  '/services/software-audits': '/services/software-audits/',
  '/software-audits': '/services/software-audits/',
  // The public URL is root-level while Software keeps its explicit source
  // handle. Keep the source mapping first for reverse route resolution.
  '/pages/software-internationalisation': '/software-internationalisation/',
  '/pages/internationalisation': '/software-internationalisation/',
  '/software-internationalisation': '/software-internationalisation/',
  '/internationalisation': '/software-internationalisation/',
  '/internationalisation/': '/software-internationalisation/',
  '/services/software-internationalisation': '/software-internationalisation/',
  '/services/software-internationalisation/': '/software-internationalisation/',
  // Root-level canonical URL for the email marketing service. The Software
  // source handle stays first so `resolveLegacyPath` keeps querying
  // `email-marketing-agency`; the retired `email-sms-marketing` spellings are
  // one-way aliases below it and resolve to the canonical path in one hop.
  '/pages/email-marketing-agency': '/email-marketing-agency/',
  '/email-marketing-agency': '/email-marketing-agency/',
  '/services/email-marketing-agency': '/email-marketing-agency/',
  '/services/email-marketing-agency/': '/email-marketing-agency/',
  '/pages/email-sms-marketing': '/email-marketing-agency/',
  '/email-sms-marketing': '/email-marketing-agency/',
  // The retired clean URL was linked with a trailing slash, and
  // `resolveLegacyPath` can no longer recover that spelling now the alias
  // points elsewhere, so it is listed explicitly.
  '/email-sms-marketing/': '/email-marketing-agency/',
  '/pages/email-marketing-services-1': '/email-marketing-agency/',
  '/email-marketing-services-1': '/email-marketing-agency/',
  '/email-marketing-services-1/': '/email-marketing-agency/',
  '/pages/klaviyo-agency': '/klaviyo-agency/',
  '/pages/klaviyo': '/klaviyo-agency/',
  '/klaviyo': '/klaviyo-agency/',
  // Keep the canonical Conversion & Performance Optimization handle before retired aliases so reverse
  // resolution loads the existing custom CRO page implementation.
  [`/pages/${CRO_PAGE_HANDLE}`]: CRO_CLEAN_PATH,
  '/pages/conversion-rate-optimisation': CRO_CLEAN_PATH,
  '/pages/cro-agency': CRO_CLEAN_PATH,
  '/cro-agency': CRO_CLEAN_PATH,
  '/cro-agency/': CRO_CLEAN_PATH,
  '/software-cro-agency': CRO_CLEAN_PATH,
  '/pages/software-b2b-wholesale': '/software-b2b-wholesale/',
  '/pages/software-b2b': '/software-b2b-wholesale/',
  '/software-b2b': '/software-b2b-wholesale/',
  '/pages/b2b': '/software-b2b-wholesale/',
  '/b2b': '/software-b2b-wholesale/',
  '/pages/subscriptions-on-software': '/subscriptions-on-software/',
  '/pages/software-subscriptions': '/subscriptions-on-software/',
  '/software-subscriptions': '/subscriptions-on-software/',
  // The retired clean URL was linked with a trailing slash, which
  // `resolveLegacyPath` cannot recover now the alias points elsewhere, so it is
  // listed explicitly and redirects to the canonical path in one hop.
  '/software-subscriptions/': '/subscriptions-on-software/',
  '/pages/subscriptions': '/subscriptions-on-software/',
  '/subscriptions': '/subscriptions-on-software/',
  // Canonical root-level service URL. `/services/agentic-commerce` was the
  // previous, incorrect canonical spelling; both of its forms stay here as
  // one-way aliases so they resolve to the root path in a single hop.
  '/pages/agentic-commerce': '/agentic-commerce/',
  '/services/agentic-commerce': '/agentic-commerce/',
  '/services/agentic-commerce/': '/agentic-commerce/',
  '/pages/ab-testing': '/ab-testing',
  /* No Software page exists for this one, so it joins the booking pages. */
  '/pages/software-consultant': CONTACT_CLEAN_PATH,
  '/software-consultant': CONTACT_CLEAN_PATH,
  '/pages/magento-software-migrations': '/magento-software-migrations/',
  '/services/magento-software-migrations': '/magento-software-migrations/',
  '/services/magento-software-migrations/': '/magento-software-migrations/',
  '/pages/woocommerce-software-migrations': '/woocommerce-software-migrations/',
  '/services/woocommerce-software-migrations':
    '/woocommerce-software-migrations/',
  '/services/woocommerce-software-migrations/':
    '/woocommerce-software-migrations/',
  '/pages/bigcommerce-software-migrations': '/bigcommerce-software-migrations/',
  '/services/bigcommerce-software-migrations':
    '/bigcommerce-software-migrations/',
  '/services/bigcommerce-software-migrations/':
    '/bigcommerce-software-migrations/',
  '/pages/salesforce-software-migrations': '/salesforce-software-migrations/',
  '/services/salesforce-software-migrations': '/salesforce-software-migrations/',
  '/services/salesforce-software-migrations/': '/salesforce-software-migrations/',
  // Retired spellings remain aliases below the canonical source handle above,
  // so reverse resolution keeps querying `software-theme-development-builds`.
  '/pages/theme-development': '/software-theme-development-builds/',
  '/theme-development': '/software-theme-development-builds/',
  '/services/software-theme-development-builds':
    '/software-theme-development-builds/',
  '/services/software-theme-development-builds/':
    '/software-theme-development-builds/',
  '/pages/memberships': '/memberships',
  '/pages/search-first': '/search-first',
  /*
   * `/pages/software-experts` is NOT mapped here. It used to be, which made
   * `/pages/software-experts` resolve to `/software-experts` — a URL that 404s,
   * because no Software page carries that handle. It is mapped to /contact with
   * the other booking pages near the top of this object; see the note there
   * for how to publish the real page.
   */
  '/pages/ecommerce-agency': ECOMMERCE_SEO_CLEAN_PATH,
  '/ecommerce-agency': ECOMMERCE_SEO_CLEAN_PATH,
  '/ecommerce-agency/': ECOMMERCE_SEO_CLEAN_PATH,
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
  '/pages/events': '/events',
  '/pages/careers': '/careers',
  '/pages/why-custom-software': '/why-custom-software',

  /* =====================================================
     DEAD LINKS — site crawl, 21 Sep 2026

     Old-theme URLs still linked from blog post bodies, and
     Software admin URL Redirects that ended on a 404 or took
     2–3 hops. This map runs before the app, so each lands
     on a live page in one hop.
  ===================================================== */

  // Retired service pages.
  '/pages/software-migration': '/software-migrations/',
  '/pages/magento-to-software-plus-migration': '/magento-software-migrations/',
  '/pages/bigcommerce-to-software-plus-migration':
    '/bigcommerce-software-migrations/',
  '/pages/bigcommerce-to-software-plus': '/bigcommerce-software-migrations/',
  '/pages/woocommerce-to-software-plus-migration':
    '/woocommerce-software-migrations/',
  '/pages/wix-to-software-migration': '/software-migrations/',
  '/pages/wix-to-software': '/software-migrations/',
  '/pages/software-plus-maintenance': '/support-and-maintenance/',
  '/pages/software-development-services': '/software-theme-development-builds/',
  '/pages/email-marketing-services': '/email-marketing-agency/',
  '/pages/software-audit': '/services/software-audits/',
  '/pages/free-software-audit-software-store-seo-cro-and-speed-review':
    '/services/software-audits/',
  '/pages/software-plus-custom-solutions': SHOPIFY_PLUS_CLEAN_PATH,
  '/pages/software-website-design': '/software-web-design',
  '/pages/store-speed': '/software-developers',
  '/pages/about-us-1': '/about',

  // Booking spellings — straight to contact instead of via two redirects.
  '/pages/book-a-call': CONTACT_CLEAN_PATH,
  '/pages/schedule-a-call': CONTACT_CLEAN_PATH,
  '/bookacall': CONTACT_CLEAN_PATH,

  // Old theme's service products and collections.
  '/products/software-experts-the-fold-tech-software-logo-and-visual-branding-services':
    '/software-web-design',
  '/products/software-experts-the-fold-tech-software-store-build-or-redesign-services':
    '/software-web-design',
  '/products/software-experts-the-fold-tech-software-seo-search-engine-optimization-services':
    SHOPIFY_SEO_CLEAN_PATH,
  '/products/software-experts-the-fold-tech-software-analytics-and-tracking-services':
    '/services',
  '/products/premium-package': '/software-web-design',
  '/products/premium-theme-license': '/software-theme-development-builds/',
  '/products/edit-credits': '/products/buy-bulk-hours',
  '/products/dedicated-hourly-service': '/products/buy-bulk-hours',
  '/products/monthly-dedicated-resource': '/products/buy-bulk-hours',
  '/products/service-invoice-0001844': '/services',
  '/collections/store-setup': '/software-web-design',
  '/collections/visual-content-and-branding': '/software-web-design',
  '/collections/turnkey-dropshipping-websites-for-sale': '/software-web-design',
  '/collections/development-and-troubleshooting': '/support-and-maintenance/',
  '/collections/marketing-and-sales': '/services',
  '/collections/frontpage': '/services',

  // Blog URLs whose post was renamed, unpublished or never existed.
  '/blogs/news/10-best-omnichannel-platforms-in-2025-pricing-pros-amp-cons':
    '/articles/best-omnichannel-platforms/',
  '/articles/10-best-omnichannel-platforms-in-2025-pricing-pros-amp-cons/':
    '/articles/best-omnichannel-platforms/',
  '/blogs/news/tagged/css-z-index-what-it-is':
    '/articles/the-css-z-index-what-it-is-and-how-to-use-it/',
  '/blogs/news/byteoperator.com': ARTICLES_CLEAN_PATH,
  '/blogs/news/the-pros-and-cons-of-law-firm-seo-services':
    SHOPIFY_SEO_CLEAN_PATH,
  '/blogs/news/tagged/law-firm-seo-services': SHOPIFY_SEO_CLEAN_PATH,
  '/blogs/the-pros-and-cons-of-law-firm-seo-services': SHOPIFY_SEO_CLEAN_PATH,

  /* =====================================================
     EMPTY PAGES — see docs/empty-pages-redirect-plan.md

     52 URLs that rendered header and footer and nothing
     else, measured against the live site on 13 Sep 2026.
     Each is a duplicate or predecessor of a page that is
     actually built, so it redirects there rather than
     serving a blank page.

     NOT here, deliberately:
       - /careers and /events, which are noindex
       - /pages/premium-dropshipping-store, which must be
         deleted in Software rather than redirected
  ===================================================== */

  // Reachable from a live menu — a visitor can click into these.
  '/pages/ai-visibility': '/ai-visibility-audit/',
  '/pages/ai-visibility-implementation': '/ai-visibility-audit/',
  '/pages/ai-visibility-monitoring': '/ai-visibility-audit/',
  '/pages/bigcommerce-to-software-migration': '/bigcommerce-software-migrations/',
  '/pages/conversion-rate-optimization': '/software-cro-agency/',
  '/pages/free-ai-visibility-snapshot': '/ai-visibility-audit/',
  /* `/pages/join-our-newsletter` moved up with the canonical source handles. */
  '/pages/resources': '/guides',
  '/pages/reviews': '/work',
  '/pages/software-design-services': '/software-web-design',
  '/pages/software-development-services-1': '/software-developers',
  '/pages/software-marketing-services': '/services',
  '/pages/software-speed-optimization': '/software-developers',

  // Not linked from a menu; reachable by search or old links.
  '/pages/analytics-tracking': '/services',
  '/pages/branding-creative-direction': '/services',
  '/pages/cart-drawer': '/software-developers',
  '/pages/case-studies-1': '/work',
  '/pages/custom-store-project': '/software-web-design',
  '/pages/digital-branding-creative-direction-services': '/services',
  '/pages/free-software-audit': '/services/software-audits/',
  '/pages/funnel-building-lead-generation': '/services',
  '/pages/getting-started': '/contact/',
  '/pages/launch': '/services',
  '/pages/lead-generation-services-and-funnel-building': '/services',
  '/pages/learn-more': '/about',
  '/pages/magento-to-software-migration': '/magento-software-migrations/',
  '/pages/marketing-analytics-and-tracking': '/services',
  '/pages/marketing-automation': '/email-marketing-agency/',
  '/pages/marketing-sales': '/services',
  '/pages/paid-social-scaling': '/services',
  '/pages/retain': '/support-and-maintenance/',
  '/pages/search': '/search-first',
  '/pages/search-engine-optimization-seo': '/seo-agency',
  '/pages/software-app-development-services': '/software-app-development/',
  '/pages/software-conversion-rate-optimization': '/software-cro-agency/',
  '/pages/software-custom-solutions': '/services',
  '/pages/software-maintenance-services-1': '/support-and-maintenance/',
  '/pages/software-marketing-automation': '/email-marketing-agency/',
  '/pages/software-marketing-seo': '/seo-agency',
  '/pages/software-migration-services': '/software-migrations/',
  '/pages/software-paid-social': '/services',
  '/pages/software-plus-partner-agency': '/software-plus-agency',
  '/pages/software-seo-services': '/seo-agency',
  '/pages/software-theme-customization': '/software-theme-development-builds/',
  '/pages/sitelab-helpdesk': '/support-and-maintenance/',
  '/pages/testimonials': '/work',
  '/pages/the-fold-tech-approach-to-cro': '/software-cro-agency/',
  '/pages/website-audit-service': '/services/software-audits/',
  '/pages/website-audit-services': '/services/software-audits/',
  '/pages/wix-to-software-migration-1': '/software-migrations/',
  '/pages/woocommerce-to-software': '/woocommerce-software-migrations/',
  '/pages/woocommerce-to-software-migration': '/woocommerce-software-migrations/',
} as const;

export type LegacyPagePath = keyof typeof OLD_TO_CLEAN_PATHS;
export type CleanPagePath = (typeof OLD_TO_CLEAN_PATHS)[LegacyPagePath];
export type SoftwarePagePath = Extract<LegacyPagePath, `/pages/${string}`>;

export function getArticlePath(articleHandle: string): string {
  return `${ARTICLES_CLEAN_PATH}${articleHandle}/`;
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

/** Software page `cs-{name}` is the case study served at `/case-studies/{name}`. */
export const CASE_STUDY_PAGE_PREFIX = 'cs-';

export function resolveCleanPath(pathname: string): string {
  const csPrefix = `/pages/${CASE_STUDY_PAGE_PREFIX}`;
  const name = pathname.startsWith(csPrefix)
    ? trimTrailingSlash(pathname).slice(csPrefix.length)
    : '';
  if (name && !name.includes('/')) return `/case-studies/${name}`;

  return OLD_TO_CLEAN_PATHS[pathname as LegacyPagePath] ?? pathname;
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
