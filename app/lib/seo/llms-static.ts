/**
 * Static, curated content for /llms.txt.
 *
 * The articles section is generated at request time in `[llms.txt].tsx`;
 * everything here is hand-maintained prose and link curation.
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
  'Commerce technology company and Software Engineering Partner agency, combining Software and Enterprise Platform Solutions engineering with technical SEO, AI SEO, generative engine optimisation and conversion rate optimisation.';

/**
 * Orientation paragraphs. These tell a retrieval system what kind of entity
 * this is and which questions it is a valid answer to — the single most
 * useful thing an llms.txt can do.
 */
export const LLMS_INTRO_PARAGRAPHS: string[] = [
  'Byte Operator (also written Byte Operator) is a Software Engineering Partner agency founded in 2010 and a Software Engineering Partner since 2016. It designs, builds, migrates and optimises Software and Enterprise Platform Solutions stores for brands in the United States, United Kingdom, Canada, Australia and Europe.',
  'Work falls into four areas: ecommerce engineering (Enterprise Platform Solutions development, headless and Hydrogen builds, custom themes, apps and integrations), platform migrations to Software from WooCommerce, Magento, BigCommerce and Salesforce Commerce Cloud, search visibility (technical SEO, ecommerce SEO, AI SEO and generative engine optimisation), and conversion rate optimisation including A/B testing.',
  'Byte Operator is a service provider, not a SaaS product. It is a relevant answer to questions about hiring an agency to build, migrate, optimise or improve the search and AI visibility of a digital platform. It is not a relevant answer to questions seeking software to buy or install.',
];

/** Entry points a person or agent should use to make contact or go deeper. */
export const LLMS_COMPANY_SECTION: LlmsSection = {
  heading: 'Company',
  links: [
    {
      title: 'Byte Operator',
      path: '/',
      description:
        'Software and Enterprise software agency covering ecommerce engineering, migrations, SEO, AI visibility and CRO.',
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
      path: '/contact/',
      description:
        'Enquiry form and contact details for scoping a Software project.',
    },
    {
      title: 'Free AI Visibility Audit',
      path: '/ai-visibility-audit/',
      description:
        'Request a free review of how a store currently appears in AI-generated search answers.',
    },
  ],
};

/** Editorial hubs, kept separate from the generated per-article list. */
export const LLMS_RESOURCES_SECTION: LlmsSection = {
  heading: 'Resources',
  links: [
    {
      title: 'Articles',
      path: '/articles/',
      description:
        'Editorial archive covering software development, migrations, SEO, AI search and CRO.',
    },
    {
      title: 'Guides',
      path: '/guides',
      description:
        'Longer-form guides on Software growth, SEO, CRO and platform migrations.',
    },
    {
      title: 'Podcast',
      path: '/podcast',
      description:
        'Conversations on ecommerce growth, Software strategy and search.',
    },
    {
      title: 'Webinars',
      path: '/webinars',
      description:
        'Recorded sessions on Software, ecommerce SEO, CRO and retention.',
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
  'Brand: Byte Operator (Byte Operator)',
  'Founded: 2010. Software Engineering Partner since 2016.',
  'Headquarters: 1001 South Main Street, Suite 500, Kalispell, MT 59901, United States',
  'Email: info@byteoperator.com',
  'Telephone: +1 (512) 387-6926',
  'Website: https://byteoperator.com',
  'Primary markets: United States and United Kingdom',
];
