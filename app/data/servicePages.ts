import type {ServiceHeroProps} from '~/components/services/ServiceHero';
import type {ServiceAboutSectionData} from '~/components/services/detail/ServiceAboutSection';
import {
  HOME_FEATURES,
  type HomeFeatureData,
} from '~/data/homeFeatures';
import {resolveCleanPath} from '~/lib/route-mappings';

const SERVICE_PAGE_ROUTES = {
  work: resolveCleanPath('/pages/work'),
  contact: resolveCleanPath('/pages/contact'),
  shopifySeo: resolveCleanPath('/pages/shopify-seo'),
  shopifyAppDevelopment: resolveCleanPath(
    '/pages/shopify-app-development',
  ),
  shopifyWebDesign: resolveCleanPath(
    '/pages/shopify-web-design',
  ),
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
    href: SERVICE_PAGE_ROUTES.work,
  };
}

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
  features?: readonly HomeFeatureData[];
  faqTitle?: string;
}

export const SERVICE_PAGE_CONFIGS = {
  'shopify-developers': {
    faqTitle: 'Shopify Developers',
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
    features: [
      {
        id: 'shopify-developers-theme-architecture',
        layout: 'media-left',
        spacing: 'first',
        theme: 'dark',
        eyebrow: 'Shopify Development Agency',
        heading: 'Shopify Theme Development & Architecture',
        description: [
          'FoldTech develops custom Shopify themes and new storefronts around the needs of each brand, its catalogue and its customers. We translate approved designs into responsive Shopify sections and templates, giving ecommerce teams practical control over content without losing consistency across the store.',
          'For existing stores, we can customise the current theme, improve UI and UX, and extend key journeys with relevant custom functionality. That may include changes to navigation, collection and product templates, merchandising components or account experiences, planned within the capabilities of the Shopify platform.',
          'Our implementation is performance-conscious from the outset. We organise theme architecture for maintainability, keep reusable components clear, and consider responsive behaviour, technical SEO and future development so the storefront can continue to evolve after launch.',
        ],
        buttons: [
          {
            label: 'Explore Case Studies',
            href: SERVICE_PAGE_ROUTES.work,
          },
        ],
        media: reuseHomeFeatureMedia('shopify-launch'),
      },
      {
        id: 'shopify-developers-checkout-cart',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Shopify Developer Services',
        heading: 'Checkout & Cart Development',
        description: [
          'We develop Shopify cart functionality around the way a store sells, from cart-drawer interactions and product messaging to business-specific rules and integration requirements. The work starts with the buying journey, so added logic supports customers and remains manageable for the ecommerce team.',
          'Checkout development is shaped by the capabilities available to the store. For Shopify Plus projects where appropriate, that can include checkout extensions, additional content and supported upsell experiences; for every project, we work within Shopify’s current checkout framework rather than relying on fragile changes.',
          'We can also connect cart and checkout journeys with relevant APIs, apps and operational systems. Requirements are planned across the frontend and the services behind it, with focused testing of discounts, validation, customer states and other paths that affect placing an order.',
        ],
        buttons: [
          {
            label: 'Get In Touch',
            href: SERVICE_PAGE_ROUTES.contact,
          },
        ],
        media: reuseHomeFeatureMedia('shopify-development'),
      },
      {
        id: 'shopify-developers-quality-assurance',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'Shopify Development Company',
        heading: 'Quality Assurance & Testing',
        description: [
          'Quality assurance runs throughout development and becomes more focused ahead of launch. We check responsive layouts, core functionality and customer journeys across relevant browsers and device sizes, including navigation, product discovery, cart behaviour, forms and integrations. Accessibility considerations are reviewed alongside the design and interaction details.',
          'Technical checks cover semantic markup, heading structure, crawlable content and other SEO foundations, as well as performance and Core Web Vitals considerations. We then support a clear client review process, record feedback and retest agreed changes so the final release has been examined by both the delivery team and the people who will manage the store.',
        ],
        buttons: [
          {
            label: 'Explore Case Studies',
            href: SERVICE_PAGE_ROUTES.work,
          },
        ],
        media: reuseHomeFeatureMedia('shopify-migrations'),
      },
      {
        id: 'shopify-developers-technical-seo',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Shopify Search Engine Optimisation',
        heading: 'Technical SEO',
        description: [
          'Shopify development decisions influence how search engines understand and navigate a store. We consider semantic structure, heading hierarchy, internal linking and crawlability while building templates, and implement structured data where it is relevant to the content and supported by the storefront.',
          'We also review technical details such as canonical URLs, redirects, indexation and the way collection filtering can create additional URL paths. Image delivery, script behaviour and page rendering are considered alongside Core Web Vitals, helping SEO requirements remain part of implementation rather than a separate check at the end.',
        ],
        buttons: [
          {
            label: 'Explore SEO Services',
            href: SERVICE_PAGE_ROUTES.shopifySeo,
          },
        ],
        media: reuseHomeFeatureMedia('shopify-seo-geo'),
      },
      {
        id: 'shopify-developers-app-architecture',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'Shopify App Development',
        heading: 'Custom Shopify App Architecture',
        description: [
          'FoldTech develops custom Shopify apps when a business requirement cannot be met appropriately through the theme or an existing app. We define the merchant and customer experience, then plan the frontend, backend, data and authentication requirements needed to extend Shopify functionality in a dependable way.',
          'App architecture can connect Shopify APIs with operational platforms and other integrations, supporting business-specific workflows without placing unnecessary complexity in the storefront. We structure the application for maintainability, with clear boundaries between services and room for requirements to develop over time.',
        ],
        buttons: [
          {
            label: 'Explore App Services',
            href: SERVICE_PAGE_ROUTES.shopifyAppDevelopment,
          },
        ],
        media: reuseHomeFeatureMedia('shopify-plus'),
      },
      {
        id: 'shopify-developers-design-support-growth',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Shopify Website Design & Support Services',
        heading: 'Design, Support & Growth',
        description: [
          'FoldTech designs Shopify storefronts around product discovery, buying journeys and the visual identity of the brand. We can create a new custom theme or improve an existing one, refining page structure, navigation and responsive behaviour while adding landing pages and features for campaigns or changing customer needs.',
          'After launch, ongoing support can cover maintenance, technical troubleshooting and planned development updates. We help ecommerce teams prioritise a practical roadmap, from day-to-day fixes and platform changes to larger iterations that improve how content is managed and how customers move through the store.',
          'Conversion-focused improvements can be developed alongside that support, using available store data and customer behaviour to identify useful changes to templates, content and interactions. This creates an ongoing ecommerce development process in which design, technical support and measured iteration work together as the store grows.',
        ],
        buttons: [
          {
            label: 'Explore Design Services',
            href: SERVICE_PAGE_ROUTES.shopifyWebDesign,
          },
        ],
        media: reuseHomeFeatureMedia('shopify-design'),
      },
    ],
  },
} as const satisfies Record<string, ServicePageConfig>;

export type ServicePageHandle = keyof typeof SERVICE_PAGE_CONFIGS;
