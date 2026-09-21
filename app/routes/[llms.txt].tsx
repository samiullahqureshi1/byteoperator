import type {Route} from './+types/[llms.txt]';
import {getArticlePath, getCaseStudyPath} from '~/lib/route-mappings';
import {SERVICES, SITE_URL} from '~/lib/seo/schema';
import {isKnownEmptyPage} from '~/lib/seo/empty-pages';
import {
  LLMS_COMPANY_SECTION,
  LLMS_FACTS,
  LLMS_INTRO_PARAGRAPHS,
  LLMS_LEGAL_SECTION,
  LLMS_RESOURCES_SECTION,
  LLMS_SUMMARY,
  type LlmsSection,
} from '~/lib/seo/llms-static';

/**
 * `/llms.txt` — a plain-text map of the site for AI retrieval systems.
 *
 * Generated per request from the repo's own service definitions and the live
 * Storefront article list, so it cannot drift from the site the way a
 * hand-uploaded file does. It replaces a Shopify URL redirect that pointed at
 * a static CDN copy listing retired `/blogs/news/*` URLs; that redirect only
 * fires when the app 404s, so this route overrides it simply by existing.
 */

/** Blogs listed here; case-study blogs link to `/work/{handle}`. */
const ARTICLE_BLOG_HANDLES = [
  'news',
  'case-studies',
  'featured',
  'top-case-studies',
] as const;

/** Each blog's articles, newest first. Shopify caps `first` at 250. */
const LLMS_ARTICLES_QUERY = `#graphql
  query LlmsArticles(
    $blogHandle: String!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    blog(handle: $blogHandle) {
      articles(first: 250, sortKey: PUBLISHED_AT, reverse: true) {
        nodes {
          handle
          title
          excerpt
          content
          publishedAt
        }
      }
    }
  }
` as const;

type LlmsArticleNode = {
  handle: string;
  title: string;
  excerpt?: string | null;
  content?: string | null;
  publishedAt: string;
};

type LlmsArticlesQuery = {
  blog: {articles: {nodes: LlmsArticleNode[]}} | null;
};

/** Long enough to be a useful summary, short enough to survive chunking. */
const MAX_DESCRIPTION_LENGTH = 120;

/**
 * Reduces an excerpt or article body to a single clean sentence.
 *
 * Truncation happens at a word boundary and drops any trailing ellipsis, so a
 * description never ends mid-word or implies missing text a retriever might
 * try to go and fetch.
 */
function toOneSentence(raw: string): string {
  const normalized = raw
    .replace(/<[^>]*>/g, ' ')
    .replace(/&(?:nbsp|#160);/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();

  if (!normalized) return '';

  // First sentence, when one ends inside the budget.
  const sentenceEnd = normalized.search(/[.!?](?:\s|$)/);
  const firstSentence =
    sentenceEnd > -1 ? normalized.slice(0, sentenceEnd + 1) : normalized;

  if (firstSentence.length <= MAX_DESCRIPTION_LENGTH) {
    return firstSentence;
  }

  const clipped = normalized.slice(0, MAX_DESCRIPTION_LENGTH);
  const lastSpace = clipped.lastIndexOf(' ');
  const atWordBoundary = lastSpace > 40 ? clipped.slice(0, lastSpace) : clipped;

  return atWordBoundary.replace(/[\s,;:.…-]+$/, '');
}

/** Markdown link lines break if a title contains brackets. */
function escapeLinkText(value: string) {
  return value.replace(/\[/g, '(').replace(/\]/g, ')').replace(/\s+/g, ' ').trim();
}

function absoluteUrl(path: string) {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

/*
 * Runbook 0.5: 74 of the 128 pages in the sitemap render nothing but header
 * and footer. Pointing an AI crawler at a blank page is worse than omitting
 * it — the engine learns the brand has a page on that topic and nothing to
 * say about it. Empty pages are dropped here until they are built.
 */
function renderSection(section: LlmsSection) {
  const lines = section.links
    .filter((link) => !isKnownEmptyPage(link.path))
    .map(
      (link) =>
        `- [${escapeLinkText(link.title)}](${absoluteUrl(link.path)}): ${
          link.description
        }`,
    );

  // A section whose every link was empty should not leave a bare heading.
  if (!lines.length) return '';

  return [`## ${section.heading}`, '', ...lines].join('\n');
}

export async function loader({context}: Route.LoaderArgs) {
  const results = await Promise.all(
    ARTICLE_BLOG_HANDLES.map((blogHandle) =>
      context.storefront
        .query<LlmsArticlesQuery>(LLMS_ARTICLES_QUERY, {
          variables: {blogHandle},
        })
        /*
         * One unreachable blog must not take the whole file down — a partial
         * llms.txt is far more useful to a crawler than a 500.
         */
        .catch(() => ({blog: null}) as LlmsArticlesQuery),
    ),
  );

  const seenHandles = new Set<string>();

  const articleLines = results
    .flatMap((result, i) =>
      (result.blog?.articles.nodes ?? []).map((article) => ({
        ...article,
        blogHandle: ARTICLE_BLOG_HANDLES[i],
      })),
    )
    // An article promoted into a second blog would otherwise appear twice.
    .filter((article) => {
      if (!article.handle || seenHandles.has(article.handle)) return false;
      seenHandles.add(article.handle);
      return true;
    })
    .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt))
    .map((article) => {
      const description =
        toOneSentence(article.excerpt ?? '') ||
        toOneSentence(article.content ?? '');

      // Never emit a link with an empty description.
      if (!description) return null;

      return `- [${escapeLinkText(article.title)}](${absoluteUrl(
        article.blogHandle === 'news'
          ? getArticlePath(article.handle)
          : getCaseStudyPath(article.handle),
      )}): ${description}`;
    })
    .filter((line): line is string => Boolean(line));

  const servicesSection: LlmsSection = {
    heading: 'Services',
    links: SERVICES.filter((service) => service.path !== '/').map(
      (service) => ({
        title: service.name,
        path: service.path,
        description: service.description,
      }),
    ),
  };

  /*
   * Assembled as blocks rather than lines: `renderSection` returns an empty
   * string for a section whose links were all dropped, and filtering here
   * keeps that from leaving a stray blank gap in the output.
   */
  const blocks = [
    '# The Fold Tech',
    `> ${LLMS_SUMMARY}`,
    LLMS_INTRO_PARAGRAPHS.join('\n\n'),
    renderSection(LLMS_COMPANY_SECTION),
    renderSection(servicesSection),
    renderSection(LLMS_RESOURCES_SECTION),
    articleLines.length ? ['## Articles', '', articleLines.join('\n')].join('\n') : '',
    renderSection(LLMS_LEGAL_SECTION),
    ['## Company Facts', '', LLMS_FACTS.map((fact) => `- ${fact}`).join('\n')].join('\n'),
  ].filter(Boolean);

  const body = `${blocks.join('\n\n')}\n`;

  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
