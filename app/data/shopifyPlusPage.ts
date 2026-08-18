import {
  HOME_PROJECTS,
  type HomeProjectsProps,
} from '~/components/HomeProjects';
import {HOME_CLIENT_LOGOS} from '~/components/HomeServices';
import type {ServiceHeroProps} from '~/components/services/ServiceHero';
import {
  HOME_FEATURES,
  type HomeFeatureData,
} from '~/data/homeFeatures';
import {
  resolveCleanPath,
  SHOPIFY_SEO_CLEAN_PATH,
} from '~/lib/route-mappings';

const ROUTES = {
  contact: resolveCleanPath('/pages/contact'),
  services: resolveCleanPath('/pages/services'),
  work: resolveCleanPath('/pages/work'),
  development: resolveCleanPath('/pages/shopify-development'),
  integrations: resolveCleanPath('/pages/shopify-integrations'),
  migrations: resolveCleanPath('/pages/shopify-migrations'),
  maintenance: resolveCleanPath('/pages/shopify-maintenance'),
  cro: resolveCleanPath('/pages/conversion-rate-optimisation'),
  seo: SHOPIFY_SEO_CLEAN_PATH,
  emailMarketing: resolveCleanPath('/pages/email-sms-marketing'),
} as const;

function reuseHomeFeatureMedia(
  id: HomeFeatureData['id'],
): HomeFeatureData['media'] {
  const feature = HOME_FEATURES.find(
    (candidate) => candidate.id === id,
  );

  if (!feature) {
    throw new Error(`Missing HomeFeature media for "${id}"`);
  }

  return {
    ...feature.media,
    href: ROUTES.work,
  };
}

const hero = {
  variant: 'shopify-plus',
  eyebrow: 'Shopify Plus Agency UK',
  heading:
    'Shopify Plus strategy, design and development for ambitious ecommerce brands.',
  description:
    'FoldTech helps brands plan, build and improve Shopify Plus storefronts around customer journeys, commercial priorities and operational requirements, connecting design, development, migration and ongoing growth support.',
  primaryCta: {
    label: 'Explore Services',
    href: ROUTES.services,
  },
  showPartnerLogos: true,
  showClientProof: true,
  clientProofLabel: 'our team',
} as const satisfies ServiceHeroProps;

const lightHero = {
  theme: 'light',
  heading:
    'FoldTech is a Shopify Plus agency helping ambitious ecommerce brands launch, improve and grow.',
  chips: [
    '20K+ Tasks Delivered',
    '15K+ Stores Built',
    '$3.1B+ Merchant Revenue',
  ],
  description:
    'We design, build, and optimise high-performance Shopify Plus stores, whether youre launching a new site, migrating platforms, or upgrading from standard Shopify. Our expert team delivers tailored solutions across design, development, SEO, and email marketing to help brands unlock the full potential of Shopify Plus.',
  primaryCta: {
    label: 'Our Services',
    href: ROUTES.services,
  },
  showClientProof: true,
  clientProofLabel: 'our clients',
} as const satisfies ServiceHeroProps;

const trustedBrands = {
  heading: 'Trusted by ambitious Shopify Plus brands.',
  logos: HOME_CLIENT_LOGOS,
} as const;

const projects = {
  heading:
    'We help ecommerce teams shape Shopify Plus storefronts around brand, customer experience and sustainable platform development.',
  projects: HOME_PROJECTS,
  cta: {
    label: 'Explore Case Studies',
    href: ROUTES.work,
  },
} as const satisfies HomeProjectsProps;

const features = [
  {
    id: 'shopify-plus-agency-uk',
    layout: 'media-left',
    spacing: 'first',
    theme: 'dark',
    eyebrow: 'Shopify Plus Agency UK',
    heading: 'Shopify Plus planning, design & development',
    description: [
      'FoldTech works with ecommerce teams to plan Shopify Plus storefronts around the needs of the brand, its customers and the systems behind the store. Projects can bring discovery, UX, visual design and technical architecture together before development begins.',
      'Our development approach considers reusable content, storefront performance, integrations and long-term maintainability. The result is a Shopify Plus foundation that internal teams can manage while retaining room for future campaigns, features and operational change.',
    ],
    badges: [
      {
        label: 'New Store Projects',
        href: ROUTES.development,
      },
      {
        label: 'Shopify Plus Migrations',
        href: ROUTES.migrations,
      },
      {
        label: 'CRO & Support',
        href: ROUTES.maintenance,
      },
      {
        label: 'SEO',
        href: ROUTES.seo,
      },
      {
        label: 'Email & SMS',
        href: ROUTES.emailMarketing,
      },
    ],
    buttons: [
      {
        label: 'Explore Case Studies',
        href: ROUTES.work,
      },
    ],
    media: reuseHomeFeatureMedia('shopify-plus'),
  },
  {
    id: 'shopify-plus-agency-london',
    layout: 'media-right',
    spacing: 'standard',
    theme: 'dark',
    eyebrow: 'Shopify Plus Agency London',
    heading: 'A platform approach built around your operation',
    description: [
      'Shopify Plus can support more involved ecommerce requirements across checkout, international selling, B2B, storefront management and integrations. We help teams identify which platform capabilities are relevant and how they should connect with current processes and technology.',
      'The work is shaped around genuine requirements rather than adding complexity for its own sake. Architecture, user experience and implementation decisions are documented clearly so stakeholders understand how the storefront will operate and how it can develop over time.',
    ],
    buttons: [
      {
        label: 'Get In Touch',
        href: ROUTES.contact,
      },
    ],
    media: reuseHomeFeatureMedia('shopify-development'),
  },
  {
    id: 'shopify-plus-monthly-growth',
    layout: 'media-left',
    spacing: 'deep',
    theme: 'dark',
    eyebrow: 'Shopify Plus Monthly Growth Plans',
    heading: 'Ongoing support guided by a practical roadmap',
    description: [
      'After launch, FoldTech can support Shopify Plus stores through planned development, maintenance and conversion-focused improvements. A shared roadmap helps ecommerce teams balance immediate technical needs with larger enhancements across templates, features and customer journeys.',
      'Support can cover day-to-day fixes, platform changes, landing pages, integrations and ongoing UX work. Priorities can be reviewed as trading plans and business requirements change, keeping development activity connected to the wider ecommerce programme.',
    ],
    buttons: [
      {
        label: 'Explore Retainers',
        href: ROUTES.maintenance,
      },
    ],
    media: reuseHomeFeatureMedia('shopify-support-growth'),
  },
  {
    id: 'shopify-plus-cro-development',
    layout: 'media-right',
    spacing: 'standard',
    theme: 'dark',
    eyebrow: 'Shopify Plus CRO & Development',
    heading: 'Development informed by customer behaviour',
    description: [
      'Conversion work combines storefront experience, analytics and technical delivery to identify where Shopify Plus journeys can be clearer. Reviews can focus on navigation, collection discovery, product information, cart behaviour and other interactions that influence a customer’s path to purchase.',
      'Useful opportunities can then move into design, testing and development. This keeps CRO recommendations grounded in what the platform can support and gives teams a structured way to improve the storefront without relying on isolated changes.',
    ],
    badges: [
      {
        label: 'Conversion Rate Optimisation (CRO)',
        href: ROUTES.cro,
      },
    ],
    buttons: [
      {
        label: 'Explore CRO Services',
        href: ROUTES.cro,
      },
    ],
    media: reuseHomeFeatureMedia('shopify-cro'),
  },
  {
    id: 'shopify-plus-stores-migrations',
    layout: 'media-left',
    spacing: 'deep',
    theme: 'dark',
    eyebrow: 'Shopify Plus Stores & Migrations',
    heading: 'New storefronts, upgrades & platform migrations',
    description: [
      'FoldTech can support new Shopify Plus builds, upgrades from standard Shopify and migrations from other ecommerce platforms. Planning covers the customer-facing storefront alongside products, customers, orders, content, redirects, integrations and operational dependencies.',
      'A migration also provides an opportunity to review information architecture, theme structure and existing functionality. We identify what should be retained, improved or replaced, then organise implementation and quality assurance around a controlled route to launch.',
    ],
    badges: [
      {
        label: 'New Store Projects',
        href: ROUTES.development,
      },
      {
        label: 'Shopify Plus Integrations',
        href: ROUTES.integrations,
      },
    ],
    buttons: [
      {
        label: 'Explore Migration Services',
        href: ROUTES.migrations,
      },
    ],
    media: reuseHomeFeatureMedia('shopify-migrations'),
  },
  {
    id: 'shopify-plus-seo',
    layout: 'media-right',
    spacing: 'standard',
    theme: 'dark',
    eyebrow: 'Shopify Plus SEO',
    heading: 'Technical and content foundations for organic visibility',
    description: [
      'Our Shopify Plus SEO work connects technical review, site structure, content priorities and search demand. Development decisions consider crawlability, semantic structure, structured data, URL handling and performance alongside the experience provided to customers.',
      'SEO activity can also include keyword and competitor research, content planning and ongoing review. Recommendations are organised so marketing, content and development teams can understand their responsibilities and make changes within a shared search strategy.',
    ],
    badges: [
      {
        label: 'Shopify SEO',
        href: ROUTES.seo,
      },
    ],
    buttons: [
      {
        label: 'Explore SEO Services',
        href: ROUTES.seo,
      },
    ],
    media: reuseHomeFeatureMedia('shopify-seo-geo'),
  },
  {
    id: 'shopify-plus-email-marketing',
    layout: 'media-left',
    spacing: 'deep',
    theme: 'dark',
    eyebrow: 'Shopify Plus Email Marketing',
    heading: 'Email, SMS & retention connected to the storefront',
    description: [
      'Retention activity can connect Shopify Plus customer and order data with relevant email and SMS journeys. FoldTech can help plan segmentation, campaigns and lifecycle automations around moments such as welcome, browse, purchase, replenishment and re-engagement.',
      'The wider setup can also consider subscriptions, reviews, loyalty tools and other ecommerce integrations. Connecting these systems carefully helps retention teams manage communication with useful context while keeping storefront and customer data requirements in view.',
    ],
    buttons: [
      {
        label: 'Explore Email Marketing',
        href: ROUTES.emailMarketing,
      },
    ],
    media: reuseHomeFeatureMedia('email-sms-retention'),
  },
] as const satisfies readonly HomeFeatureData[];

export const SHOPIFY_PLUS_PAGE = {
  hero,
  lightHero,
  trustedBrands,
  projects,
  features,
} as const;
