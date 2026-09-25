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
  '/pages/bigcommerce-to-software-migration',  // linked from a live menu
  '/pages/branding-creative-direction',
  '/pages/cart-drawer',
  '/pages/case-studies-1',
  '/pages/conversion-rate-optimization',  // linked from a live menu
  '/pages/custom-store-project',
  '/pages/digital-branding-creative-direction-services',
  '/pages/free-ai-visibility-snapshot',  // linked from a live menu
  '/pages/free-software-audit',
  '/pages/funnel-building-lead-generation',
  '/pages/getting-started',
  '/pages/join-our-newsletter',  // linked from a live menu
  '/pages/launch',
  '/pages/lead-generation-services-and-funnel-building',
  '/pages/learn-more',
  '/pages/magento-to-software-migration',
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
  '/pages/software-app-development-services',
  '/pages/software-conversion-rate-optimization',
  '/pages/software-custom-solutions',
  '/pages/software-design-services',  // linked from a live menu
  '/pages/software-development-services-1',  // linked from a live menu
  '/pages/software-maintenance-services-1',
  '/pages/software-marketing-automation',
  '/pages/software-marketing-seo',
  '/pages/software-marketing-services',  // linked from a live menu
  '/pages/software-migration-services',
  '/pages/software-paid-social',
  '/pages/software-plus-partner-agency',
  '/pages/software-seo-services',
  '/pages/software-speed-optimization',  // linked from a live menu
  '/pages/software-theme-customization',
  '/pages/sitelab-helpdesk',
  '/pages/testimonials',
  '/pages/the-fold-tech-approach-to-cro',
  '/pages/website-audit-service',
  '/pages/website-audit-services',
  '/pages/wix-to-software-migration-1',
  '/pages/woocommerce-to-software',
  '/pages/woocommerce-to-software-migration',
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
 * The 18 `/pages/cs-*` case studies had their copy restored in Software
 * (September 2026) and were removed from the empty list above.
 *
 * `/careers` and `/events` have nothing to recover and nothing pending.
 *
 * `follow` is intentional: the page leaves the index, but any link equity
 * passing through it still flows.
 */
export const NOINDEX_PAGE_PATHS: ReadonlySet<string> = new Set([
  '/careers',
  '/events',
  // A private client proposal (named client + pricing), not marketing copy.
  // Unpublish it in Software; until then keep it out of search and the sitemap.
  '/pages/digital-growth-e-commerce-infrastructure-proposal-10867',
]);

/** True when `pathname` should be served `noindex,follow`. */
export function shouldNoindex(pathname: string): boolean {
  const normalized = pathname.replace(/\/+$/, '') || '/';

  return NOINDEX_PAGE_PATHS.has(normalized);
}
