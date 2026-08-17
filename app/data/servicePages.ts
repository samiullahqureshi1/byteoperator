import type {ServiceHeroProps} from '~/components/services/ServiceHero';
import type {ServiceAboutSectionData} from '~/components/services/detail/ServiceAboutSection';

export const SERVICES_LANDING_HERO = {
  eyebrow: 'Our Services',
  heading:
    'We design, build, support & grow strategic ecommerce stores with Shopify & Shopify Plus.',
  chips: [
    'Shopify Theme Builds',
    'Ecommerce SEO',
    'Conversion Rate Optimisation',
    'Support & Maintenance',
    'Email Marketing Agency',
    'Shopify Migrations',
    'Shopify Web Design',
    'Shopify Web Development',
    'Shopify App Development',
    'Shopify Integrations',
    'Shopify & Headless',
    'Internationalisation',
    'Subscriptions',
    'B2B & Wholesale',
    'Shopify Audits',
    'Shopify Consultancy',
  ],
  showPartnerLogos: true,
  showClientProof: true,
} as const satisfies ServiceHeroProps;

export interface ServicePageConfig {
  hero: ServiceHeroProps;
  about?: ServiceAboutSectionData;
}

export const SERVICE_PAGE_CONFIGS = {
  'shopify-developers': {
    hero: {
      eyebrow: 'Shopify Developers UK',
      heading:
        'Shopify developers you can trust. Explore development services.',
      description:
        'We are an experienced and Shopify accredited team of Shopify developers who partner with brands to develop engaging and frictionless online shopping experiences.',
      chips: [
        'Shopify Theme Store Builds',
        'Headless Stores',
        'Ecommerce SEO Agency',
        'Design Services',
        'Ecommerce CRO',
      ],
      primaryCta: {
        label: 'Get In Touch',
        href: '/pages/contact',
      },
      showPartnerLogos: false,
      showClientProof: false,
    },
    about: {
      intro: {
        heading:
          'Our development team have a wealth of experience in delivering best-in-class feature-rich Shopify & Shopify Plus stores.',
        description:
          'FoldTech builds responsive Shopify storefronts with custom functionality and integrations that support how your business operates. We consider performance and technical SEO throughout implementation, creating maintainable storefronts that are straightforward to develop and improve over time.',
        cta: {
          label: 'Get In Touch',
          href: '/contact',
        },
      },
      media: {
        primary: '/images/services/services-wide.webp',
        primaryAlt: 'FoldTech Shopify storefront project',
        secondary: '/images/mega-menu-team.webp',
        secondaryAlt: 'FoldTech team collaborating around a table',
      },
      process: {
        heading:
          'A practical development process, from discovery to launch.',
        leftDescription:
          'We begin by understanding the storefront, customer journeys and technical requirements before translating the agreed direction into reusable, maintainable Shopify code. Integrations and custom features are planned alongside the core build so every part works together.',
        rightDescription:
          'Throughout development we review responsive behaviour, storefront performance and technical SEO. Before launch, key templates, customer flows and integrations go through focused QA and testing, leaving a stable foundation that can continue to evolve.',
        cta: {
          label: 'Get In Touch',
          href: '/contact',
        },
      },
    },
  },
} as const satisfies Record<string, ServicePageConfig>;

export type ServicePageHandle = keyof typeof SERVICE_PAGE_CONFIGS;
