export const SHOPIFY_PLUS_PAGE_HANDLE = 'shopify-plus-agency';
export const SHOPIFY_PLUS_CLEAN_PATH = '/shopify-plus-agency';

export const SHOPIFY_SEO_PAGE_HANDLE = 'seo-agency';
export const SHOPIFY_SEO_CLEAN_PATH = '/seo-agency';

export const ECOMMERCE_SEO_MIGRATIONS_PAGE_HANDLE =
  'ecommerce-seo-migrations';
export const ECOMMERCE_SEO_MIGRATIONS_CLEAN_PATH =
  '/ecommerce-seo-migrations/';

export const OLD_TO_CLEAN_PATHS = {
  '/pages/services': '/services',
  '/pages/work': '/work',
  '/pages/our-work': '/work',
  '/pages/about-us': '/about',
  '/pages/about': '/about',
  '/pages/ai': '/ai',
  '/pages/contact': '/contact',
  '/pages/case-studies': '/case-studies',
  '/pages/shopify-development': '/shopify-development',
  '/pages/shopify-developers': '/shopify-developers',
  '/pages/shopify-web-design': '/shopify-web-design',
  [`/pages/${SHOPIFY_PLUS_PAGE_HANDLE}`]: SHOPIFY_PLUS_CLEAN_PATH,
  '/pages/shopify-plus': SHOPIFY_PLUS_CLEAN_PATH,
  '/shopify-plus': SHOPIFY_PLUS_CLEAN_PATH,
  '/pages/shopify-migrations': '/shopify-migrations',
  // This service intentionally lives under `/services`; retain the previous
  // clean URL as an explicit, page-specific permanent redirect.
  '/pages/shopify-app-development':
    '/services/shopify-app-development/',
  '/shopify-app-development':
    '/services/shopify-app-development/',
  '/pages/shopify-integrations': '/services/shopify-integrations/',
  '/shopify-integrations': '/services/shopify-integrations/',
  '/pages/integrations': '/integrations',
  [`/pages/${SHOPIFY_SEO_PAGE_HANDLE}`]: SHOPIFY_SEO_CLEAN_PATH,
  '/pages/shopify-seo': SHOPIFY_SEO_CLEAN_PATH,
  '/shopify-seo': SHOPIFY_SEO_CLEAN_PATH,
  '/pages/ecommerce-seo': '/ecommerce-seo',
  '/pages/ecommerce-ai-seo': '/ecommerce-ai-seo',
  '/pages/ecommerce-geo': '/ecommerce-geo',
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
  '/pages/conversion-rate-optimisation': '/conversion-rate-optimisation',
  '/pages/shopify-maintenance': '/shopify-maintenance',
  '/pages/shopify-support': '/shopify-support',
  '/pages/support-maintenance': '/support-maintenance',
  '/pages/shopify-audits': '/shopify-audits',
  '/pages/internationalisation': '/internationalisation',
  '/pages/email-sms-marketing': '/email-sms-marketing',
  '/pages/email-marketing-services-1': '/email-marketing-services-1',
  '/pages/klaviyo': '/klaviyo',
  '/pages/klaviyo-agency': '/klaviyo-agency',
  '/pages/cro-agency': '/cro-agency',
  '/pages/shopify-b2b': '/shopify-b2b',
  '/pages/b2b': '/b2b',
  '/pages/shopify-subscriptions': '/shopify-subscriptions',
  '/pages/subscriptions': '/subscriptions',
  '/pages/agentic-commerce': '/agentic-commerce',
  '/pages/ab-testing': '/ab-testing',
  '/pages/shopify-consultant': '/shopify-consultant',
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
  // Keep the canonical Shopify page handle before the retired alias so the
  // clean-route resolver loads the service detail config for this page.
  '/pages/shopify-theme-development-builds':
    '/shopify-theme-development-builds/',
  '/pages/theme-development':
    '/shopify-theme-development-builds/',
  '/theme-development': '/shopify-theme-development-builds/',
  '/services/shopify-theme-development-builds':
    '/shopify-theme-development-builds/',
  '/services/shopify-theme-development-builds/':
    '/shopify-theme-development-builds/',
  '/pages/memberships': '/memberships',
  '/pages/search-first': '/search-first',
  '/pages/shopify-experts': '/shopify-experts',
  '/pages/ecommerce-agency': '/ecommerce-agency',
  '/pages/podcast': '/podcast',
  '/pages/webinars': '/webinars',
  '/pages/guides': '/guides',
  '/pages/newsletter': '/newsletter',
  '/pages/events': '/events',
  '/pages/careers': '/careers',
  '/pages/why-shopify': '/why-shopify',
} as const;

export type LegacyPagePath = keyof typeof OLD_TO_CLEAN_PATHS;
export type CleanPagePath = (typeof OLD_TO_CLEAN_PATHS)[LegacyPagePath];
export type ShopifyPagePath = Extract<
  LegacyPagePath,
  `/pages/${string}`
>;

export function resolveCleanPath(pathname: string): string {
  return OLD_TO_CLEAN_PATHS[pathname as LegacyPagePath] ?? pathname;
}

/**
 * Resolve the single canonical public path for any known spelling of a page
 * URL: a legacy `/pages/*` path, a retired clean URL, or the canonical path
 * itself (including its trailing-slash-less spelling).
 */
export function resolveCanonicalPath(pathname: string): string {
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
