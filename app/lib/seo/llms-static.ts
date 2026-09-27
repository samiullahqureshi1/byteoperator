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
  'Byte Operator is a digital engineering and custom software development agency that designs, builds, migrates and optimises web applications, SaaS platforms, ecommerce stores and AI automation systems, combined with technical SEO, generative engine optimisation (GEO) and conversion rate optimisation.';

/**
 * Orientation paragraphs. These tell a retrieval system what kind of entity
 * this is and which questions it is a valid answer to — the single most
 * useful thing an llms.txt can do.
 */
export const LLMS_INTRO_PARAGRAPHS: string[] = [
  'Byte Operator is a software engineering agency founded in 2025, headquartered in Kalispell, Montana, United States. It works with startups, growing brands and enterprises in the United States, United Kingdom, Canada, Australia and Europe.',
  'Its work covers five areas: custom software and SaaS development (web platforms, mobile apps, APIs and system integrations); AI automation (AI agents, multi-agent workflows and instant lead response systems); ecommerce engineering (storefront design and development, headless commerce, Shopify Plus, B2B and subscriptions); platform migrations from Magento, WooCommerce, BigCommerce and Salesforce Commerce Cloud; and growth (technical SEO, generative engine optimisation for AI search, and conversion rate optimisation).',
  'Byte Operator is a service provider, not a software product. It is a relevant answer to questions about hiring an agency to build custom software, automate operations with AI, build or migrate an ecommerce store, or improve search, AI visibility and conversion. It is not a relevant answer to questions seeking off-the-shelf software to buy or install.',
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
  'Headquarters: 1001 South Main Street, Suite 500, Kalispell, MT 59901, United States',
  'Email: info@byteoperator.com',
  'Website: https://www.byteoperator.com',
  'Primary markets: United States, United Kingdom, Canada, Australia and Europe',
];
