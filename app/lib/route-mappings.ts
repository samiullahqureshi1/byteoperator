export const SHOPIFY_PLUS_PAGE_HANDLE = 'shopify-plus-agency';
export const SHOPIFY_PLUS_CLEAN_PATH = '/shopify-plus-agency';

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

export const CRO_PAGE_HANDLE = 'shopify-cro-agency';
export const CRO_CLEAN_PATH = '/shopify-cro-agency/';

export const AB_TESTING_PAGE_HANDLE = 'ab-testing';
export const AB_TESTING_CLEAN_PATH = '/ab-testing';

export const ECOMMERCE_SEO_MIGRATIONS_PAGE_HANDLE =
  'ecommerce-seo-migrations';
export const ECOMMERCE_SEO_MIGRATIONS_CLEAN_PATH =
  '/ecommerce-seo-migrations/';

const SERVICE_CONFIG_HANDLES_BY_SHOPIFY_HANDLE = {
  'shopify-development': 'shopify-theme-development-builds',
} as const;

export const OLD_TO_CLEAN_PATHS = {
  '/pages/services': '/services',
  '/pages/work': '/work',
  '/pages/our-work': '/work',
  '/pages/about-us': '/about',
  '/pages/about': '/about',
  // Root-level canonical URL for the AI ecommerce agency page. The Shopify
  // source handle stays first so `resolveLegacyPath` keeps querying
  // `ai-ecommerce-agency`; the retired `/ai` spellings are one-way aliases
  // below it and resolve to the canonical path in a single hop.
  '/pages/ai-ecommerce-agency': '/ai-ecommerce-agency/',
  '/pages/ai': '/ai-ecommerce-agency/',
  '/ai': '/ai-ecommerce-agency/',
  '/ai/': '/ai-ecommerce-agency/',
  // Sits under AI in the Shopify main menu.
  '/pages/ai-visibility-audit': '/ai-visibility-audit/',
  [`/pages/${CONTACT_PAGE_HANDLE}`]: CONTACT_CLEAN_PATH,
  '/pages/contact-us': CONTACT_CLEAN_PATH,
  '/pages/contact-us/': CONTACT_CLEAN_PATH,
  // Keep these backend pages pointed to the main contact flow instead of
  // rendering the Shopify-managed content.
  '/pages/discovery-meeting-with-the-shopify-experts': CONTACT_CLEAN_PATH,
  '/pages/discovery-meeting-with-the-shopify-experts/': CONTACT_CLEAN_PATH,
  /*
   * Both spellings go to /contact, which matches the explicit rule in
   * `pages.$handle.tsx`'s loader that treats `shopify-experts` as a booking
   * page rather than a content page.
   *
   * This entry used to be duplicated further down, pointing at
   * `/shopify-experts` instead. A duplicate key in an object literal takes its
   * LAST value, so that one silently won for the no-slash spelling — and
   * `/shopify-experts` 404s, because no Shopify page carries that handle. The
   * duplicate was removed rather than honoured.
   *
   * TO PUBLISH THE REAL PAGE: create a Shopify page with handle
   * `shopify-experts`. Its layout already exists as
   * SERVICE_PAGE_CONFIGS['shopify-experts'] in `app/data/servicePages.ts`, and
   * `$pageHandle.tsx` already has its title, description and canonical. Then
   * point both spellings here at '/shopify-experts' and delete the handle from
   * the redirect check in `pages.$handle.tsx`.
   */
  '/pages/shopify-experts': CONTACT_CLEAN_PATH,
  '/pages/shopify-experts/': CONTACT_CLEAN_PATH,
  /*
   * The clean spellings too. Without these, `/shopify-experts` 404s — nothing
   * links to it, but it is a URL people and crawlers have, and a 301 to the
   * contact flow is a better answer than a dead end.
   */
  '/shopify-experts': CONTACT_CLEAN_PATH,
  '/shopify-experts/': CONTACT_CLEAN_PATH,
  /*
   * `/case-studies` was never a real page — no Shopify page carries that
   * handle, so the clean URL 404'd while `/pages/case-studies` happily 301'd
   * into it. The homepage feature grid links here ten times via
   * `ROUTES.caseStudies`, so every one of those was a dead end.
   *
   * `/work` is the live case-study index. Kept below `/pages/work` so
   * `resolveLegacyPath('/work')` still resolves to the `work` page handle.
   */
  '/pages/case-studies': '/work',
  // Canonical Shopify source handle first: `resolveLegacyPath` returns the
  // first `/pages/*` entry that points at a clean path, so the retired
  // `shopify-development` / `theme-development` spellings must stay below it.
  '/pages/shopify-theme-development-builds':
    '/shopify-theme-development-builds/',
  '/pages/shopify-development': '/shopify-theme-development-builds/',
  '/shopify-development': '/shopify-theme-development-builds/',
  '/pages/shopify-developers': '/shopify-developers',
  '/pages/shopify-web-design': '/shopify-web-design',
  [`/pages/${SHOPIFY_PLUS_PAGE_HANDLE}`]: SHOPIFY_PLUS_CLEAN_PATH,
  '/pages/shopify-plus': SHOPIFY_PLUS_CLEAN_PATH,
  '/shopify-plus': SHOPIFY_PLUS_CLEAN_PATH,
  '/pages/shopify-migrations': '/shopify-migrations/',
  '/shopify-migrations': '/shopify-migrations/',
  // Globally unique services use root-level canonical URLs. Every retired
  // spelling is listed explicitly so the resolver never strips prefixes
  // generically.
  '/pages/shopify-app-development': '/shopify-app-development/',
  '/services/shopify-app-development': '/shopify-app-development/',
  '/services/shopify-app-development/': '/shopify-app-development/',
  '/shopify-app-development': '/shopify-app-development/',
  '/pages/shopify-integrations': '/shopify-integrations/',
  '/services/shopify-integrations': '/shopify-integrations/',
  '/services/shopify-integrations/': '/shopify-integrations/',
  '/shopify-integrations': '/shopify-integrations/',
  /*
   * Short alias -> the real page's clean URL.
   *
   * These aliases used to point at `/pages/{alias}` handles that do not
   * exist in Shopify, so each one 301'd to a clean URL that then 404'd.
   * The actual pages were live the whole time under their own handles.
   */
  '/pages/integrations': '/shopify-integrations/',
  '/integrations': '/shopify-integrations/',
  [`/pages/${SHOPIFY_SEO_PAGE_HANDLE}`]: SHOPIFY_SEO_CLEAN_PATH,
  '/pages/shopify-seo': SHOPIFY_SEO_CLEAN_PATH,
  '/shopify-seo': SHOPIFY_SEO_CLEAN_PATH,
  // The Shopify source handle is the canonical public route. Retired
  // Shopify and clean spellings below remain one-way aliases.
  [`/pages/${ECOMMERCE_SEO_PAGE_HANDLE}`]: ECOMMERCE_SEO_CLEAN_PATH,
  '/pages/ecommerce-seo': ECOMMERCE_SEO_CLEAN_PATH,
  '/ecommerce-seo': ECOMMERCE_SEO_CLEAN_PATH,
  '/ecommerce-seo/': ECOMMERCE_SEO_CLEAN_PATH,
  // The Shopify source handle is canonical; the retired ecommerce-ai-seo
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
  // Canonical Shopify handle first: `resolveLegacyPath` returns the first
  // `/pages/*` entry that points at a clean path, so the retired
  // `/pages/seo-migrations` alias must stay below this line.
  [`/pages/${ECOMMERCE_SEO_MIGRATIONS_PAGE_HANDLE}`]:
    ECOMMERCE_SEO_MIGRATIONS_CLEAN_PATH,
  '/pages/seo-migrations': ECOMMERCE_SEO_MIGRATIONS_CLEAN_PATH,
  '/seo-migrations': ECOMMERCE_SEO_MIGRATIONS_CLEAN_PATH,
  '/ecommerce-seo-migrations': ECOMMERCE_SEO_MIGRATIONS_CLEAN_PATH,
  '/services/ecommerce-seo-migrations':
    ECOMMERCE_SEO_MIGRATIONS_CLEAN_PATH,
  '/services/ecommerce-seo-migrations/':
    ECOMMERCE_SEO_MIGRATIONS_CLEAN_PATH,
  '/pages/headless-commerce': '/headless-commerce',
  '/conversion-rate-optimisation': CRO_CLEAN_PATH,
  '/conversion-rate-optimisation/': CRO_CLEAN_PATH,
  // Root-level canonical URL for support & maintenance. The Shopify source
  // handle stays first so `resolveLegacyPath` keeps querying
  // `support-and-maintenance`; every retired spelling below is a one-way
  // alias that resolves to the canonical path in a single hop.
  '/pages/support-and-maintenance': '/support-and-maintenance/',
  '/pages/shopify-maintenance': '/support-and-maintenance/',
  '/shopify-maintenance': '/support-and-maintenance/',
  '/services/support-and-maintenance': '/support-and-maintenance/',
  '/services/support-and-maintenance/': '/support-and-maintenance/',
  '/pages/shopify-support': '/support-and-maintenance/',
  '/shopify-support': '/support-and-maintenance/',
  '/pages/support-maintenance': '/support-and-maintenance/',
  '/support-maintenance': '/support-and-maintenance/',
  // Shopify audits keeps its canonical URL under `/services/*`, so the
  // retired root-level spelling is the alias here, not the target.
  '/pages/shopify-audits': '/services/shopify-audits/',
  '/services/shopify-audits': '/services/shopify-audits/',
  '/shopify-audits': '/services/shopify-audits/',
  // The public URL is root-level while Shopify keeps its explicit source
  // handle. Keep the source mapping first for reverse route resolution.
  '/pages/shopify-internationalisation':
    '/shopify-internationalisation/',
  '/pages/internationalisation': '/shopify-internationalisation/',
  '/shopify-internationalisation': '/shopify-internationalisation/',
  '/internationalisation': '/shopify-internationalisation/',
  '/internationalisation/': '/shopify-internationalisation/',
  '/services/shopify-internationalisation':
    '/shopify-internationalisation/',
  '/services/shopify-internationalisation/':
    '/shopify-internationalisation/',
  // Root-level canonical URL for the email marketing service. The Shopify
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
  // Keep the canonical Shopify CRO handle before retired aliases so reverse
  // resolution loads the existing custom CRO page implementation.
  [`/pages/${CRO_PAGE_HANDLE}`]: CRO_CLEAN_PATH,
  '/pages/conversion-rate-optimisation': CRO_CLEAN_PATH,
  '/pages/cro-agency': CRO_CLEAN_PATH,
  '/cro-agency': CRO_CLEAN_PATH,
  '/cro-agency/': CRO_CLEAN_PATH,
  '/shopify-cro-agency': CRO_CLEAN_PATH,
  '/pages/shopify-b2b-wholesale': '/shopify-b2b-wholesale/',
  '/pages/shopify-b2b': '/shopify-b2b-wholesale/',
  '/shopify-b2b': '/shopify-b2b-wholesale/',
  '/pages/b2b': '/shopify-b2b-wholesale/',
  '/b2b': '/shopify-b2b-wholesale/',
  '/pages/subscriptions-on-shopify': '/subscriptions-on-shopify/',
  '/pages/shopify-subscriptions': '/subscriptions-on-shopify/',
  '/shopify-subscriptions': '/subscriptions-on-shopify/',
  // The retired clean URL was linked with a trailing slash, which
  // `resolveLegacyPath` cannot recover now the alias points elsewhere, so it is
  // listed explicitly and redirects to the canonical path in one hop.
  '/shopify-subscriptions/': '/subscriptions-on-shopify/',
  '/pages/subscriptions': '/subscriptions-on-shopify/',
  '/subscriptions': '/subscriptions-on-shopify/',
  // Canonical root-level service URL. `/services/agentic-commerce` was the
  // previous, incorrect canonical spelling; both of its forms stay here as
  // one-way aliases so they resolve to the root path in a single hop.
  '/pages/agentic-commerce': '/agentic-commerce/',
  '/services/agentic-commerce': '/agentic-commerce/',
  '/services/agentic-commerce/': '/agentic-commerce/',
  '/pages/ab-testing': '/ab-testing',
  /* No Shopify page exists for this one, so it joins the booking pages. */
  '/pages/shopify-consultant': CONTACT_CLEAN_PATH,
  '/shopify-consultant': CONTACT_CLEAN_PATH,
  '/pages/magento-shopify-migrations':
    '/magento-shopify-migrations/',
  '/services/magento-shopify-migrations':
    '/magento-shopify-migrations/',
  '/services/magento-shopify-migrations/':
    '/magento-shopify-migrations/',
  '/pages/woocommerce-shopify-migrations':
    '/woocommerce-shopify-migrations/',
  '/services/woocommerce-shopify-migrations':
    '/woocommerce-shopify-migrations/',
  '/services/woocommerce-shopify-migrations/':
    '/woocommerce-shopify-migrations/',
  '/pages/bigcommerce-shopify-migrations':
    '/bigcommerce-shopify-migrations/',
  '/services/bigcommerce-shopify-migrations':
    '/bigcommerce-shopify-migrations/',
  '/services/bigcommerce-shopify-migrations/':
    '/bigcommerce-shopify-migrations/',
  '/pages/salesforce-shopify-migrations':
    '/salesforce-shopify-migrations/',
  '/services/salesforce-shopify-migrations':
    '/salesforce-shopify-migrations/',
  '/services/salesforce-shopify-migrations/':
    '/salesforce-shopify-migrations/',
  // Retired spellings remain aliases below the canonical source handle above,
  // so reverse resolution keeps querying `shopify-theme-development-builds`.
  '/pages/theme-development':
    '/shopify-theme-development-builds/',
  '/theme-development': '/shopify-theme-development-builds/',
  '/services/shopify-theme-development-builds':
    '/shopify-theme-development-builds/',
  '/services/shopify-theme-development-builds/':
    '/shopify-theme-development-builds/',
  '/pages/memberships': '/memberships',
  '/pages/search-first': '/search-first',
  /*
   * `/pages/shopify-experts` is NOT mapped here. It used to be, which made
   * `/pages/shopify-experts` resolve to `/shopify-experts` — a URL that 404s,
   * because no Shopify page carries that handle. It is mapped to /contact with
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
   * Canonical Shopify source handle first, per the rule above: the page that
   * actually exists is `join-our-newsletter`. There is no Shopify page with
   * the handle `newsletter`, so listing `/pages/newsletter` first made
   * `resolveLegacyPath('/newsletter')` return a handle the Storefront API has
   * no record of, and `/newsletter` 404'd while still being published in
   * sitemap/pages/1.xml. The retired spelling stays below as a one-way alias.
   */
  '/pages/join-our-newsletter': '/newsletter',
  '/pages/newsletter': '/newsletter',
  '/pages/events': '/events',
  '/pages/careers': '/careers',
  '/pages/why-shopify': '/why-shopify',


  /* =====================================================
     EMPTY PAGES — see docs/empty-pages-redirect-plan.md

     52 URLs that rendered header and footer and nothing
     else, measured against the live site on 13 Sep 2026.
     Each is a duplicate or predecessor of a page that is
     actually built, so it redirects there rather than
     serving a blank page.

     NOT here, deliberately:
       - the 18 /pages/cs-* case studies, whose copy is
         recoverable and being restored
       - /careers and /events, which are noindex
       - /pages/premium-dropshipping-store, which must be
         deleted in Shopify rather than redirected
  ===================================================== */

  // Reachable from a live menu — a visitor can click into these.
  '/pages/ai-visibility': '/ai-visibility-audit/',
  '/pages/ai-visibility-implementation': '/ai-visibility-audit/',
  '/pages/ai-visibility-monitoring': '/ai-visibility-audit/',
  '/pages/bigcommerce-to-shopify-migration': '/bigcommerce-shopify-migrations/',
  '/pages/conversion-rate-optimization': '/shopify-cro-agency/',
  '/pages/free-ai-visibility-snapshot': '/ai-visibility-audit/',
  /* `/pages/join-our-newsletter` moved up with the canonical source handles. */
  '/pages/resources': '/guides',
  '/pages/reviews': '/work',
  '/pages/shopify-design-services': '/shopify-web-design',
  '/pages/shopify-development-services-1': '/shopify-developers',
  '/pages/shopify-marketing-services': '/services',
  '/pages/shopify-speed-optimization': '/shopify-developers',

  // Not linked from a menu; reachable by search or old links.
  '/pages/analytics-tracking': '/services',
  '/pages/branding-creative-direction': '/services',
  '/pages/cart-drawer': '/shopify-developers',
  '/pages/case-studies-1': '/work',
  '/pages/custom-store-project': '/shopify-web-design',
  '/pages/digital-branding-creative-direction-services': '/services',
  '/pages/free-shopify-audit': '/services/shopify-audits/',
  '/pages/funnel-building-lead-generation': '/services',
  '/pages/getting-started': '/contact/',
  '/pages/launch': '/services',
  '/pages/lead-generation-services-and-funnel-building': '/services',
  '/pages/learn-more': '/about',
  '/pages/magento-to-shopify-migration': '/magento-shopify-migrations/',
  '/pages/marketing-analytics-and-tracking': '/services',
  '/pages/marketing-automation': '/email-marketing-agency/',
  '/pages/marketing-sales': '/services',
  '/pages/paid-social-scaling': '/services',
  '/pages/retain': '/support-and-maintenance/',
  '/pages/search': '/search-first',
  '/pages/search-engine-optimization-seo': '/seo-agency',
  '/pages/shopify-app-development-services': '/shopify-app-development/',
  '/pages/shopify-conversion-rate-optimization': '/shopify-cro-agency/',
  '/pages/shopify-custom-solutions': '/services',
  '/pages/shopify-maintenance-services-1': '/support-and-maintenance/',
  '/pages/shopify-marketing-automation': '/email-marketing-agency/',
  '/pages/shopify-marketing-seo': '/seo-agency',
  '/pages/shopify-migration-services': '/shopify-migrations/',
  '/pages/shopify-paid-social': '/services',
  '/pages/shopify-plus-partner-agency': '/shopify-plus-agency',
  '/pages/shopify-seo-services': '/seo-agency',
  '/pages/shopify-theme-customization': '/shopify-theme-development-builds/',
  '/pages/sitelab-helpdesk': '/support-and-maintenance/',
  '/pages/testimonials': '/work',
  '/pages/the-fold-tech-approach-to-cro': '/shopify-cro-agency/',
  '/pages/website-audit-service': '/services/shopify-audits/',
  '/pages/website-audit-services': '/services/shopify-audits/',
  '/pages/wix-to-shopify-migration-1': '/shopify-migrations/',
  '/pages/woocommerce-to-shopify': '/woocommerce-shopify-migrations/',
  '/pages/woocommerce-to-shopify-migration': '/woocommerce-shopify-migrations/',
} as const;

export type LegacyPagePath = keyof typeof OLD_TO_CLEAN_PATHS;
export type CleanPagePath = (typeof OLD_TO_CLEAN_PATHS)[LegacyPagePath];
export type ShopifyPagePath = Extract<
  LegacyPagePath,
  `/pages/${string}`
>;

export function getArticlePath(articleHandle: string): string {
  return `${ARTICLES_CLEAN_PATH}${articleHandle}/`;
}

export function resolveArticlesPath(pathname: string): string | null {
  const normalizedPath = trimTrailingSlash(pathname);

  if (
    normalizedPath === `/blogs/${ARTICLES_BLOG_HANDLE}` ||
    normalizedPath === `/blogs/${LEGACY_JOURNAL_BLOG_HANDLE}` ||
    normalizedPath === trimTrailingSlash(ARTICLES_CLEAN_PATH)
  ) {
    return ARTICLES_CLEAN_PATH;
  }

  for (const blogHandle of [
    ARTICLES_BLOG_HANDLE,
    LEGACY_JOURNAL_BLOG_HANDLE,
  ]) {
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

export function resolveCleanPath(pathname: string): string {
  return OLD_TO_CLEAN_PATHS[pathname as LegacyPagePath] ?? pathname;
}

export function resolveServiceConfigHandle(shopifyHandle: string): string {
  return (
    SERVICE_CONFIG_HANDLES_BY_SHOPIFY_HANDLE[
      shopifyHandle as keyof typeof SERVICE_CONFIG_HANDLES_BY_SHOPIFY_HANDLE
    ] ?? shopifyHandle
  );
}

/**
 * Resolve the single canonical public path for any known spelling of a page
 * URL: a legacy `/pages/*` path, a retired clean URL, or the canonical path
 * itself (including its trailing-slash-less spelling).
 */
export function resolveCanonicalPath(pathname: string): string {
  const articlesPath = resolveArticlesPath(pathname);

  if (articlesPath) {
    return articlesPath;
  }

  const mappedPath = resolveCleanPath(pathname);

  if (mappedPath !== pathname) {
    return mappedPath;
  }

  const legacyPath = resolveLegacyPath(pathname);

  return legacyPath ? resolveCleanPath(legacyPath) : pathname;
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

export function resolveLegacyPath(pathname: string): ShopifyPagePath | null {
  const target = trimTrailingSlash(pathname);

  const match = Object.entries(OLD_TO_CLEAN_PATHS).find(
    ([legacyPath, cleanPath]) =>
      legacyPath.startsWith('/pages/') &&
      trimTrailingSlash(cleanPath) === target,
  );

  return (match?.[0] as ShopifyPagePath | undefined) ?? null;
}

function trimTrailingSlash(pathname: string): string {
  return pathname.length > 1 && pathname.endsWith('/')
    ? pathname.slice(0, -1)
    : pathname;
}
