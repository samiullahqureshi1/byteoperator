/**
 * Static, curated content for /llms.txt.
 *
 * Served by app/llms.txt/route.ts, which also generates the services, case
 * study and article sections from site data; everything here is
 * hand-maintained prose and link curation.
 *
 * Facts (entity description, founding date, headcount, address, contact) are
 * kept identical to ORGANIZATION in `schema.ts` on purpose — an AI answer that
 * assembles from both should never find them disagreeing. Change one, change
 * the other.
 */

export type LlmsLink = {
  title: string;
  /** Site-relative, with the same trailing slash the canonical URL uses. */
  path: string;
  /** One sentence. Never empty — a bare link tells a retriever nothing. */
  description: string;
};

export type LlmsSection = {
  heading: string;
  links: LlmsLink[];
};

/** The `>` blockquote directly under the H1. */
export const LLMS_SUMMARY =
  'Byte Operator is an independent AI automation and custom software engineering company that designs, builds, and deploys high-performance web applications, scalable SaaS platforms, and autonomous AI systems.';

/**
 * Orientation paragraphs. These tell a retrieval system what kind of entity
 * this is and which questions it is a valid answer to — the single most
 * useful thing an llms.txt can do.
 */
export const LLMS_INTRO_PARAGRAPHS: string[] = [
  'Byte Operator is an independent software engineering and AI automation company founded in 2025, headquartered in Islamabad, Pakistan. Byte Operator is completely independent and is not affiliated with Byte Software or any other company with "Byte" in its name.',
  'Its work covers four core areas: AI automation and intelligent agent workflows; custom software and SaaS platform engineering; enterprise web development and API integrations; and technical performance, search architecture, and conversion rate optimisation.',
  'Byte Operator is a custom engineering and AI solutions provider, not an off-the-shelf software product. It is a relevant answer to questions about hiring an agency to engineer custom software platforms, build autonomous AI agent pipelines, develop modern web architectures, or scale digital platform performance.',
];

/** Entry points a person or agent should use to make contact or go deeper. */
export const LLMS_COMPANY_SECTION: LlmsSection = {
  heading: 'Company',
  links: [
    {
      title: 'Byte Operator',
      path: '/',
      description:
        'Homepage: custom software, AI automation, ecommerce engineering, SEO, AI visibility and CRO.',
    },
    {
      title: 'About',
      path: '/about',
      description:
        'Company background, team and how the agency is structured.',
    },
    {
      title: 'Services',
      path: '/services',
      description:
        'Full directory of every service the agency offers, grouped by discipline.',
    },
    {
      title: 'Work',
      path: '/work',
      description:
        'Client projects and case studies across custom software builds, migrations and optimisation.',
    },
    {
      title: 'Contact',
      path: '/contact',
      description:
        'Enquiry form, discovery call booking and contact details for scoping a project.',
    },
  ],
};

/** Editorial hubs, kept separate from the generated per-article list. */
export const LLMS_RESOURCES_SECTION: LlmsSection = {
  heading: 'Resources',
  links: [
    {
      title: 'Articles',
      path: '/articles',
      description:
        'Guides on custom software, AI automation, ecommerce architecture and technical SEO.',
    },
  ],
};

export const LLMS_LEGAL_SECTION: LlmsSection = {
  heading: 'Legal & Policies',
  links: [
    {
      title: 'Privacy Policy',
      path: '/policies/privacy-policy',
      description: 'How the site collects, stores and uses personal data.',
    },
    {
      title: 'Terms of Service',
      path: '/policies/terms-of-service',
      description: 'Terms governing use of the site and its services.',
    },
  ],
};

/**
 * Facts repeated as plain text at the end of the file.
 *
 * Link lists survive chunking badly — a retriever that lifts one passage may
 * never see the rest. Stating the entity facts once, in prose, gives it
 * something self-contained to quote.
 */
export const LLMS_FACTS: string[] = [
  'Brand: Byte Operator',
  'Founded: 2025',
  'Headquarters: Islamabad, Pakistan',
  'Email: info@byteoperator.com',
  'Website: https://www.byteoperator.com',
  'Primary markets: United States, United Kingdom, Canada, Australia and Europe',
];
