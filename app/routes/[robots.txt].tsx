import type {Route} from './+types/[robots.txt]';
import {parseGid} from '@shopify/hydrogen';
import {SITE_URL} from '~/lib/seo/schema';

export async function loader({request, context}: Route.LoaderArgs) {
  const url = new URL(request.url);

  /*
   * Oxygen serves every deploy on its own preview hostname, and this file is
   * generated from the request origin — so a preview used to publish a fully
   * crawlable robots.txt advertising its own sitemap. Anything but the
   * production origin is disallowed outright, which keeps preview builds and
   * the *.myshopify.com domain out of the index.
   */
  if (url.origin !== SITE_URL) {
    return new Response('User-agent: *\nDisallow: /\n', {
      status: 200,
      headers: {'Content-Type': 'text/plain', 'Cache-Control': 'no-store'},
    });
  }

  const {shop} = await context.storefront.query(ROBOTS_QUERY);

  const shopId = parseGid(shop.id).id;
  const body = robotsTxtData({url: url.origin, shopId});

  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',

      'Cache-Control': `max-age=${60 * 60 * 24}`,
    },
  });
}

function robotsTxtData({url, shopId}: {shopId?: string; url?: string}) {
  const sitemapUrl = url ? `${url}/sitemap.xml` : undefined;

  return `
User-agent: *
${generalDisallowRules({sitemapUrl, shopId})}

# Google adsbot ignores robots.txt unless specifically named!
User-agent: adsbot-google
Disallow: /checkouts/
Disallow: /checkout
Disallow: /carts
Disallow: /orders
${shopId ? `Disallow: /${shopId}/checkouts` : ''}
${shopId ? `Disallow: /${shopId}/orders` : ''}
Disallow: /*?*oseid=*
Disallow: /*preview_theme_id*
Disallow: /*preview_script_id*

${aiCrawlerRules({shopId})}

User-agent: Nutch
Disallow: /

User-agent: AhrefsBot
Crawl-delay: 10
${generalDisallowRules({sitemapUrl, shopId})}

User-agent: AhrefsSiteAudit
Crawl-delay: 10
${generalDisallowRules({sitemapUrl, shopId})}

User-agent: MJ12bot
Crawl-Delay: 10

User-agent: Pinterest
Crawl-delay: 1

# Plain-text map of this site for AI retrieval systems, generated per request
# from the same service definitions the structured data uses.
${url ? `# LLMs: ${url}/llms.txt` : ''}
`.trim();
}

/**
 * Named rules for the AI crawlers and answer engines.
 *
 * These are allowed deliberately, not by omission: the site publishes
 * `/llms.txt` specifically so retrieval systems can read it, and being cited
 * in AI answers is the point of the structured data this site carries. Each
 * agent still gets the same disallow list as everyone else, so checkout,
 * account and search stay out.
 *
 * To refuse one of them later, replace its rules with `Disallow: /`.
 */
function aiCrawlerRules({shopId}: {shopId?: string}) {
  const agents = [
    // OpenAI: training, live retrieval, and the search index respectively.
    'GPTBot',
    'ChatGPT-User',
    'OAI-SearchBot',
    // Anthropic.
    'ClaudeBot',
    'Claude-User',
    // Perplexity, Google's AI products, Microsoft, Meta, Common Crawl.
    'PerplexityBot',
    'Google-Extended',
    'Applebot-Extended',
    'meta-externalagent',
    'CCBot',
  ];

  return agents
    .map(
      (agent) =>
        `User-agent: ${agent}\n${generalDisallowRules({shopId})}`,
    )
    .join('\n\n');
}

/**
 * This function generates disallow rules that generally follow what Shopify's
 * Online Store has as defaults for their robots.txt
 *
 * One deliberate difference: Shopify's `Disallow: /search` is a prefix match,
 * so it also blocked the /search-first landing page. The search results page
 * is matched exactly instead (`$` end anchor, plus its query-string form);
 * search.tsx also sends `noindex` for crawlers that ignore `$`.
 */
function generalDisallowRules({
  shopId,
  sitemapUrl,
}: {
  shopId?: string;
  sitemapUrl?: string;
}) {
  return `Disallow: /admin
Disallow: /cart
Disallow: /orders
Disallow: /checkouts/
Disallow: /checkout
${shopId ? `Disallow: /${shopId}/checkouts` : ''}
${shopId ? `Disallow: /${shopId}/orders` : ''}
Disallow: /carts
Disallow: /account
Disallow: /collections/*sort_by*
Disallow: /*/collections/*sort_by*
Disallow: /collections/*+*
Disallow: /collections/*%2B*
Disallow: /collections/*%2b*
Disallow: /*/collections/*+*
Disallow: /*/collections/*%2B*
Disallow: /*/collections/*%2b*
Disallow: */collections/*filter*&*filter*
Disallow: /blogs/*+*
Disallow: /blogs/*%2B*
Disallow: /blogs/*%2b*
Disallow: /*/blogs/*+*
Disallow: /*/blogs/*%2B*
Disallow: /*/blogs/*%2b*
Disallow: /*?*oseid=*
Disallow: /*preview_theme_id*
Disallow: /*preview_script_id*
Disallow: /policies/
Disallow: /*/*?*ls=*&ls=*
Disallow: /*/*?*ls%3D*%3Fls%3D*
Disallow: /*/*?*ls%3d*%3fls%3d*
Disallow: /search$
Disallow: /search?
Allow: /search/
Disallow: /search/?*
Disallow: /apple-app-site-association
Disallow: /.well-known/shopify/monorail
${sitemapUrl ? `Sitemap: ${sitemapUrl}` : ''}`;
}

const ROBOTS_QUERY = `#graphql
  query StoreRobots($country: CountryCode, $language: LanguageCode)
   @inContext(country: $country, language: $language) {
    shop {
      id
    }
  }
` as const;
