/**
 * Pages that render no content — header and footer chrome only.
 *
 * Captured by `scripts/audit-empty-pages.mjs` against the live site on
 * 13 September 2026 (runbook 0.5): 74 of 128 URLs in the pages
 * sitemap rendered under 3000 visible characters. The classification is
 * unambiguous — the largest empty page measured 2277 characters and the
 * smallest real one 3010.
 *
 * This list exists so the site never *asserts* something about a blank
 * page: no JSON-LD describing it as a CreativeWork or Service, and no entry
 * in llms.txt pointing an AI crawler at it.
 *
 * It is an explicit list on purpose, never a runtime check on content
 * length — a heuristic would silently change what the site claims as copy
 * is edited. **When a page is genuinely built, delete its line here.**
 *
 * Paths are normalised: no trailing slash, no origin.
 */
export const KNOWN_EMPTY_PAGE_PATHS: ReadonlySet<string> = new Set([
  '/careers',
  '/events',
  '/pages/ai-visibility',  // linked from a live menu
  '/pages/ai-visibility-implementation',  // linked from a live menu
  '/pages/ai-visibility-monitoring',  // linked from a live menu
  '/pages/analytics-tracking',
  '/pages/bigcommerce-to-shopify-migration',  // linked from a live menu
  '/pages/branding-creative-direction',
  '/pages/cart-drawer',
  '/pages/case-studies-1',
  '/pages/conversion-rate-optimization',  // linked from a live menu
  '/pages/cs-branley-ventures',
  '/pages/cs-chatham-ivy',
  '/pages/cs-cloakemf',
  '/pages/cs-cork-collective',
  '/pages/cs-eleganzaglo',
  '/pages/cs-gold-custom-bijoux-sur-mesure',
  '/pages/cs-lifeprotectors',
  '/pages/cs-loveluxury',
  '/pages/cs-mann-co-bake-shop',
  '/pages/cs-mellome',
  '/pages/cs-naimi',
  '/pages/cs-nevuu',
  '/pages/cs-nexsphere-treasures',
  '/pages/cs-sabe-boutique',
  '/pages/cs-shepard-safety-products',
  '/pages/cs-skinbyskin',
  '/pages/cs-sleeptite-sleeprite',
  '/pages/cs-we-love-kids',
  '/pages/custom-store-project',
  '/pages/digital-branding-creative-direction-services',
  '/pages/free-ai-visibility-snapshot',  // linked from a live menu
  '/pages/free-shopify-audit',
  '/pages/funnel-building-lead-generation',
  '/pages/getting-started',
  '/pages/join-our-newsletter',  // linked from a live menu
  '/pages/launch',
  '/pages/lead-generation-services-and-funnel-building',
  '/pages/learn-more',
  '/pages/magento-to-shopify-migration',
  '/pages/marketing-analytics-and-tracking',
  '/pages/marketing-automation',
  '/pages/marketing-sales',
  '/pages/paid-social-scaling',
  '/pages/premium-dropshipping-store',
  '/pages/resources',  // linked from a live menu
  '/pages/retain',
  '/pages/reviews',  // linked from a live menu
  '/pages/search',
  '/pages/search-engine-optimization-seo',
  '/pages/shopify-app-development-services',
  '/pages/shopify-conversion-rate-optimization',
  '/pages/shopify-custom-solutions',
  '/pages/shopify-design-services',  // linked from a live menu
  '/pages/shopify-development-services-1',  // linked from a live menu
  '/pages/shopify-maintenance-services-1',
  '/pages/shopify-marketing-automation',
  '/pages/shopify-marketing-seo',
  '/pages/shopify-marketing-services',  // linked from a live menu
  '/pages/shopify-migration-services',
  '/pages/shopify-paid-social',
  '/pages/shopify-plus-partner-agency',
  '/pages/shopify-seo-services',
  '/pages/shopify-speed-optimization',  // linked from a live menu
  '/pages/shopify-theme-customization',
  '/pages/sitelab-helpdesk',
  '/pages/testimonials',
  '/pages/the-fold-tech-approach-to-cro',
  '/pages/website-audit-service',
  '/pages/website-audit-services',
  '/pages/wix-to-shopify-migration-1',
  '/pages/woocommerce-to-shopify',
  '/pages/woocommerce-to-shopify-migration',
]);

/**
 * True when `pathname` is a known-empty page.
 *
 * Tolerates a trailing slash so callers can pass a canonical path or a raw
 * `location.pathname` without normalising first.
 */
export function isKnownEmptyPage(pathname: string): boolean {
  const normalized = pathname.replace(/\/+$/, '') || '/';

  return KNOWN_EMPTY_PAGE_PATHS.has(normalized);
}

/**
 * Pages served with `noindex,follow`.
 *
 * Deliberately much shorter than the empty list above, and a separate constant
 * rather than a filter over it — the two answer different questions. A page is
 * in the empty list because it renders nothing *today*; it belongs here only
 * when there is also nothing coming.
 *
 * The 18 `/pages/cs-*` case studies are empty but are NOT listed: their copy is
 * recoverable from the theme templates and is days from being restored.
 * Noindexing them would make Google process a noindex and then a removal, on
 * URLs that nothing links to and no one visits — churn for no gain.
 *
 * `/careers` and `/events` have nothing to recover and nothing pending.
 *
 * `follow` is intentional: the page leaves the index, but any link equity
 * passing through it still flows.
 */
export const NOINDEX_PAGE_PATHS: ReadonlySet<string> = new Set([
  '/careers',
  '/events',
]);

/** True when `pathname` should be served `noindex,follow`. */
export function shouldNoindex(pathname: string): boolean {
  const normalized = pathname.replace(/\/+$/, '') || '/';

  return NOINDEX_PAGE_PATHS.has(normalized);
}
