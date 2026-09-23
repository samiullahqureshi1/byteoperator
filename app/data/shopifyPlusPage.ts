import {
  HOME_PROJECTS,
  type HomeProjectsProps,
} from '~/components/HomeProjects';
import {HOME_CLIENT_LOGOS} from '~/components/HomeServices';
import {TRACK_RECORD_FACTS} from '~/data/companyFacts';
import type {ServiceHeroProps} from '~/components/services/ServiceHero';
import {
  HOME_FEATURES,
  type HomeFeatureData,
} from '~/data/homeFeatures';
import {
  CRO_CLEAN_PATH,
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
  cro: CRO_CLEAN_PATH,
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
    'FoldTech helps brands plan, build, and improve Shopify Plus stores around customer needs and business goals. We connect design, development, migrations, and ongoing support to create a stronger ecommerce setup.',
  primaryCta: {
    label: 'Explore Services',
    href: ROUTES.services,
  },
  showPartnerLogos: true,
  showClientProof: true,
} as const satisfies ServiceHeroProps;

const lightHero = {
  theme: 'light',
  headingLevel: 'h2',
  heading:
    'FoldTech is a Shopify Plus agency helping ambitious ecommerce brands launch, improve and grow.',
  chips: TRACK_RECORD_FACTS.map(
    ({value, label}) => `${value} ${label}`,
  ),
  /*
   * Two paragraphs, so this uses `descriptionHtml` rather than
   * `description` — ServiceHero renders the latter inside a single <p>.
   */
  descriptionHtml:
    '<p>We design, build, and improve Shopify Plus stores for growing ecommerce brands. We support new builds, platform migrations, and upgrades from standard Shopify.</p>' +
    '<p>Our team works across design, development, SEO, and email marketing to help brands get more from Shopify Plus.</p>',
  primaryCta: {
    label: 'Our Services',
    href: ROUTES.services,
  },
  showClientProof: true,
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
      'FoldTech helps ecommerce teams plan Shopify Plus storefronts around brand goals, customer needs, and existing systems. We bring discovery, UX, visual design, and technical planning together before development starts.',
      'Our development approach focuses on reusable content, performance, integrations, and long-term maintenance. This gives internal teams a Shopify Plus setup they can manage while leaving room for future campaigns, features, and operational changes.',
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
      'Shopify Plus can support more complex ecommerce needs across checkout, international selling, B2B, storefront management, and integrations. We help teams identify which features are actually useful and how they should connect with existing systems and processes.',
      'We avoid adding complexity where it is not needed. Architecture, UX, and implementation decisions are documented clearly so stakeholders understand how the store works and how it can evolve over time.',
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
      'After launch, FoldTech supports Shopify Plus stores with planned development, maintenance, and conversion improvements. A shared roadmap helps teams balance urgent technical work with larger updates across templates, features, and customer journeys.',
      'Support can include day-to-day fixes, platform changes, landing pages, integrations, and ongoing UX work. Priorities can change as trading plans and business needs evolve, so development stays aligned with the wider ecommerce roadmap.',
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
      'FoldTech supports new Shopify Plus builds, upgrades from standard Shopify, and migrations from other ecommerce platforms. We plan the storefront alongside products, customers, orders, content, redirects, integrations, and operational requirements.',
      'A migration is also a good time to review site structure, theme setup, and existing functionality. We identify what should stay, what needs improvement, and what should be replaced before planning development and quality assurance for launch.',
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
      'Our Shopify Plus SEO work covers technical review, site structure, content priorities, and search demand. We also consider crawlability, structured data, URL handling, performance, and the customer experience.',
      'SEO support can include keyword research, competitor analysis, content planning, and ongoing review. Recommendations are organised clearly so marketing, content, and development teams know what needs to be done.',
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
      'Shopify Plus customer and order data can support more relevant email and SMS journeys. FoldTech helps plan segmentation, campaigns, and lifecycle automations around key stages such as welcome, browse, purchase, replenishment, and re-engagement.',
      'We can also connect subscriptions, reviews, loyalty tools, and other ecommerce systems. This gives retention teams better customer context while keeping storefront and data requirements aligned.',
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
