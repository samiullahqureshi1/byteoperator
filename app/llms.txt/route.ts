import {ARTICLES_DATA} from '~/data/articlesData';
import {CASE_STUDIES} from '~/data/caseStudiesData';
import {CASE_STUDY_SEO, SERVICE_SEO} from '~/data/seoOverrides';
import {SERVICE_PAGE_CONFIGS} from '~/data/servicePages';
import {resolveCanonicalPath} from '~/lib/route-mappings';
import {
  LLMS_COMPANY_SECTION,
  LLMS_FACTS,
  LLMS_INTRO_PARAGRAPHS,
  LLMS_LEGAL_SECTION,
  LLMS_RESOURCES_SECTION,
  LLMS_SUMMARY,
  type LlmsLink,
  type LlmsSection,
} from '~/lib/seo/llms-static';
import {SITE_URL} from '~/lib/seo/metadata';

/**
 * /llms.txt (https://llmstxt.org): a Markdown map of the site for AI tools.
 * Prose and curated links live in `app/lib/seo/llms-static.ts`; services,
 * case studies and articles are generated from site data so the file never
 * drifts from what is actually published.
 */
export const dynamic = 'force-static';

/** Service landing pages that live outside /services/[handle]. */
const LANDING_SERVICES: LlmsLink[] = [
  {
    title: 'Generative Engine Optimisation (GEO) & AI Search Visibility',
    path: '/ai-visibility-audit',
    description:
      'Getting brands and products cited in ChatGPT, Perplexity, Gemini and Google AI Overviews.',
  },
  {
    title: 'Technical SEO & Search Architecture',
    path: '/ecommerce-seo-agency',
    description:
      'Technical SEO audits, crawl and indexing fixes, structured data and search architecture.',
  },
  {
    title: 'Conversion Rate Optimisation (CRO) Audit',
    path: '/shopify-cro-audit',
    description:
      'Data-driven conversion audits, UX improvements and A/B testing for ecommerce stores.',
  },
  {
    title: 'Shopify Plus & Enterprise Agency',
    path: '/shopify-plus-agency',
    description:
      'Enterprise Shopify Plus design, development, integrations and growth.',
  },
];

function serviceLinks(): LlmsLink[] {
  const pages = Object.keys(SERVICE_PAGE_CONFIGS)
    .filter((handle) => {
      const path = `/services/${handle}`;
      return resolveCanonicalPath(path) === path && SERVICE_SEO[handle];
    })
    .map((handle) => ({
      title: SERVICE_SEO[handle].title,
      path: `/services/${handle}`,
      description: SERVICE_SEO[handle].description,
    }));

  return [...LANDING_SERVICES, ...pages];
}

function caseStudyLinks(): LlmsLink[] {
  return CASE_STUDIES.map((cs) => ({
    title: CASE_STUDY_SEO[cs.handle]?.title || `${cs.title} Case Study`,
    path: `/work/${cs.handle}`,
    description:
      CASE_STUDY_SEO[cs.handle]?.description ||
      cs.intro ||
      `${cs.title} project by Byte Operator.`,
  }));
}

function articleLinks(): LlmsLink[] {
  return ARTICLES_DATA.map((article) => ({
    title: article.title,
    path: article.path,
    description: article.seo?.description || article.excerpt || article.title,
  }));
}

const url = (path: string) => (path === '/' ? SITE_URL : `${SITE_URL}${path}`);

function section({heading, links}: LlmsSection): string {
  return [
    `## ${heading}`,
    '',
    ...links.map((link) => `- [${link.title}](${url(link.path)}): ${link.description}`),
  ].join('\n');
}

export function GET() {
  const body = [
    '# Byte Operator',
    '',
    `> ${LLMS_SUMMARY}`,
    '',
    ...LLMS_INTRO_PARAGRAPHS.flatMap((paragraph) => [paragraph, '']),
    section(LLMS_COMPANY_SECTION),
    '',
    section({heading: 'Services', links: serviceLinks()}),
    '',
    section({heading: 'Case Studies', links: caseStudyLinks()}),
    '',
    section({heading: 'Articles', links: articleLinks()}),
    '',
    section(LLMS_RESOURCES_SECTION),
    '',
    '## Optional',
    '',
    ...LLMS_LEGAL_SECTION.links.map(
      (link) => `- [${link.title}](${url(link.path)}): ${link.description}`,
    ),
    '',
    '## Key facts',
    '',
    ...LLMS_FACTS.map((fact) => `- ${fact}`),
    '',
  ].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
