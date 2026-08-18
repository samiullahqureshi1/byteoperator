export const SHOPIFY_PLUS_PAGE_HANDLE = 'shopify-plus-agency';
export const SHOPIFY_PLUS_CLEAN_PATH = '/shopify-plus-agency';

export const SHOPIFY_SEO_PAGE_HANDLE = 'seo-agency';
export const SHOPIFY_SEO_CLEAN_PATH = '/seo-agency';

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
  '/pages/shopify-app-development': '/shopify-app-development',
  '/pages/shopify-integrations': '/shopify-integrations',
  '/pages/integrations': '/integrations',
  [`/pages/${SHOPIFY_SEO_PAGE_HANDLE}`]: SHOPIFY_SEO_CLEAN_PATH,
  '/pages/shopify-seo': SHOPIFY_SEO_CLEAN_PATH,
  '/shopify-seo': SHOPIFY_SEO_CLEAN_PATH,
  '/pages/ecommerce-seo': '/ecommerce-seo',
  '/pages/ecommerce-ai-seo': '/ecommerce-ai-seo',
  '/pages/ecommerce-geo': '/ecommerce-geo',
  '/pages/seo-migrations': '/seo-migrations',
  '/pages/ecommerce-seo-migrations': '/ecommerce-seo-migrations',
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
  '/pages/theme-development': '/theme-development',
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

export function resolveLegacyPath(pathname: string): ShopifyPagePath | null {
  const match = Object.entries(OLD_TO_CLEAN_PATHS).find(
    ([legacyPath, cleanPath]) =>
      legacyPath.startsWith('/pages/') && cleanPath === pathname,
  );

  return (match?.[0] as ShopifyPagePath | undefined) ?? null;
}
