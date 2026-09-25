import type {ServiceHeroProps} from '~/components/services/ServiceHero';
import type {ServiceAboutSectionData} from '~/components/services/detail/ServiceAboutSection';
import type {MigrationPlatformsData} from '~/components/services/detail/MigrationPlatformsAccordion';
import type {ServicePlusAgencyCtaData} from '~/components/services/detail/ServicePlusAgencyCta';
import type {HomeExpertsProps} from '~/components/HomeExperts';
import {
  HOME_FEATURES,
  type HomeFeatureData,
} from '~/data/homeFeatures';
import {
  CRO_CLEAN_PATH,
  resolveCleanPath,
  SHOPIFY_SEO_PAGE_HANDLE,
} from '~/lib/route-mappings';

const SERVICE_PAGE_ROUTES = {
  ai: resolveCleanPath('/pages/ai'),
  ecommerceAiSeo: resolveCleanPath('/pages/ai-seo-agency'),
  ecommerceGeo: resolveCleanPath('/pages/geo-agency'),
  ecommerceSeo: resolveCleanPath('/pages/ecommerce-seo'),
  seoMigrations: resolveCleanPath('/pages/seo-migrations'),
  softwareMigrations: resolveCleanPath(
    '/pages/software-migrations',
  ),
  services: resolveCleanPath('/pages/services'),
  work: resolveCleanPath('/pages/work'),
  contact: resolveCleanPath('/pages/contact'),
  softwareDevelopment: resolveCleanPath(
    '/pages/software-development',
  ),
  softwareMaintenance: resolveCleanPath(
    '/pages/software-maintenance',
  ),
  softwareSeo: resolveCleanPath(
    `/pages/${SHOPIFY_SEO_PAGE_HANDLE}`,
  ),
  softwareAppDevelopment: resolveCleanPath(
    '/pages/software-app-development',
  ),
  softwarePlus: resolveCleanPath('/pages/software-plus'),
  internationalisation: resolveCleanPath('/pages/internationalisation'),
  softwareConsultant: resolveCleanPath('/pages/software-consultant'),
  softwareWebDesign: resolveCleanPath(
    '/pages/software-web-design',
  ),
  softwareDevelopers: resolveCleanPath(
    '/pages/software-developers',
  ),
  softwareAudits: resolveCleanPath('/pages/software-audits'),
  ecommerceCro: CRO_CLEAN_PATH,
  klaviyoAgency: resolveCleanPath('/pages/klaviyo-agency'),
  emailMarketingAgency: resolveCleanPath(
    '/pages/email-marketing-agency',
  ),
  softwareIntegrations: resolveCleanPath(
    '/pages/software-integrations',
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
    'Strategic Software & Enterprise Platform Solutions Services That Drive Ecommerce Growth',
  chips: [
    'Custom Frontend & Web Development',
    'Ecommerce SEO Services',
    'Conversion Rate Optimisation (CRO)',
    'Software Support & Maintenance',
    'Email Marketing for Ecommerce',
    'Digital Platform Migrations',
    'Software Website Design',
    'Software Web Development',
    'Custom Custom Software & App Development',
    'Custom Application & System Integrations',
    'Headless Software Development',
    'Software Internationalisation',
    'Software Subscription Solutions',
    'Software B2B & Wholesale Solutions',
    'Digital Platform Audits',
    'Software Engineering Consultancy & Strategy',
  ],
  showPartnerLogos: true,
  showClientProof: true,
} as const satisfies ServiceHeroProps;

export interface ServicePageConfig {
  hero: ServiceHeroProps;
  heroOnly?: boolean;
  showPartners?: boolean;
  about?: ServiceAboutSectionData;
  platforms?: MigrationPlatformsData;
  features?: readonly HomeFeatureData[];
  faqTitle?: string;
  plusAgencyCta?: ServicePlusAgencyCtaData;
  experts?: HomeExpertsProps;
}

export const SERVICE_PAGE_CONFIGS = {
  [SHOPIFY_SEO_PAGE_HANDLE]: {
    faqTitle: 'Technical SEO & Search Architecture Agency',
    hero: {
      eyebrow: 'Technical SEO & Search Architecture Agency',
      heading:
        'Technical SEO & Search Architecture services for ecommerce growth and stronger organic visibility.',
      chips: [
        {
          label: 'AI SEO',
          href: SERVICE_PAGE_ROUTES.ecommerceAiSeo,
        },
        {
          label: 'Ecommerce SEO',
          href: SERVICE_PAGE_ROUTES.ecommerceSeo,
        },
        {
          label: 'SEO Migrations',
          href: SERVICE_PAGE_ROUTES.seoMigrations,
        },
      ],
      bottomLogo: {
        src: '/images/home-services/badges/logo-search-white.svg', width: 130, height: 50,
        alt: 'Search',
        text: 'Byte Operator',
      },
      promoLink: {
        label: 'Looking to improve AI Visibility? Explore AI →',
        href: SERVICE_PAGE_ROUTES.ai,
      },
      description:
        'Byte Operator helps Software and Enterprise Platform Solutions stores improve organic visibility through technical SEO, collection and product optimisation, content strategy and search-focused site improvements.',
      primaryCta: {
        label: 'Explore SEO Services',
        href: SERVICE_PAGE_ROUTES.softwareSeo,
      },
    },
    about: {
      intro: {
        heading:
          'Technical SEO & Search Architecture built around how customers search, discover and buy.',
        description:
          'Byte Operator combines technical SEO, collection and product optimisation, internal linking and search-focused content to help digital platforms & applications improve organic visibility. We focus on the parts of a digital platform that affect how search engines understand pages and how customers discover products through search.',
        cta: {
          label: 'Get In Touch',
          href: SERVICE_PAGE_ROUTES.contact,
        },
      },
      media: {
        primary: '/images/services/services-wide.webp', primaryWidth: 1672, primaryHeight: 941,
        primaryAlt: 'Technical SEO & Search Architecture ecommerce project',
        secondary: '/images/mega-menu-team.webp', secondaryWidth: 1970, secondaryHeight: 1306,
        secondaryAlt: 'Software ecommerce optimisation project',
      },
      process: {
        heading:
          'SEO planning that connects technical health, content and ecommerce structure.',
        leftDescription:
          'We review collections, products, navigation, internal linking and site structure alongside keyword opportunities. This helps identify pages that need stronger search targeting and technical issues that may affect crawling, indexation or organic visibility.',
        rightDescription:
          'The resulting SEO work can include collection and product improvements, technical fixes, content planning, structured data, internal linking and ongoing optimisation as the store and catalogue develop.',
        cta: {
          label: 'Get In Touch',
          href: SERVICE_PAGE_ROUTES.contact,
        },
      },
    },
    features: [
      {
        id: 'seo-agency-services',
        layout: 'media-left',
        spacing: 'first',
        theme: 'dark',
        eyebrow: 'Technical SEO & Search Architecture Services',
        heading:
          'SEO support designed around Software ecommerce stores.',
        description: [
          'Byte Operator approaches Technical SEO & Search Architecture across the full storefront, from technical foundations and site structure to collections, products and supporting content.',
          'We look at how search demand connects with the catalogue and customer journey, then prioritise improvements that make important pages easier to discover, understand and navigate.',
        ],
        badges: [
          {
            label: 'Technical SEO',
            href: SERVICE_PAGE_ROUTES.ecommerceSeo,
          },
          {
            label: 'Collection SEO',
            href: SERVICE_PAGE_ROUTES.ecommerceSeo,
          },
          {
            label: 'Product SEO',
            href: SERVICE_PAGE_ROUTES.ecommerceSeo,
          },
        ],
        buttons: [
          {
            label: 'Get In Touch',
            href: SERVICE_PAGE_ROUTES.contact,
          },
          {
            label: 'Book a Call',
            calendly: true,
          },
        ],
        media: reuseHomeFeatureMedia('software-seo-geo'),
      },
      {
        id: 'seo-agency-keyword-research',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Software Keyword Research',
        heading:
          'Search research shaped around what customers are looking for.',
        description: [
          'Keyword research helps identify the searches connected with products, collections and customer needs.',
          'We organise those opportunities around commercial relevance, page purpose and the existing store structure so target terms can be assigned to the right pages instead of competing across the site.',
        ],
        badges: [
          {
            label: 'Keyword Research',
            href: SERVICE_PAGE_ROUTES.ecommerceSeo,
          },
          {
            label: 'Search Intent',
            href: SERVICE_PAGE_ROUTES.ecommerceSeo,
          },
        ],
        buttons: [
          {
            label: 'Get In Touch',
            href: SERVICE_PAGE_ROUTES.contact,
          },
          {
            label: 'Book a Call',
            calendly: true,
          },
        ],
        media: reuseHomeFeatureMedia('software-launch'),
      },
      {
        id: 'seo-agency-collection-product-seo',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'Collection & Product SEO',
        heading:
          'Improve how key ecommerce pages appear and perform in organic search.',
        description: [
          'Collections and product pages are central to ecommerce search visibility. Byte Operator reviews page targeting, headings, copy, metadata, internal links and supporting content around these areas.',
          'The work should improve page relevance while keeping product discovery and the shopping experience clear for customers.',
        ],
        badges: [
          {
            label: 'Collection SEO',
            href: SERVICE_PAGE_ROUTES.ecommerceSeo,
          },
          {
            label: 'Product SEO',
            href: SERVICE_PAGE_ROUTES.ecommerceSeo,
          },
        ],
        buttons: [
          {
            label: 'Get In Touch',
            href: SERVICE_PAGE_ROUTES.contact,
          },
          {
            label: 'Book a Call',
            calendly: true,
          },
        ],
        media: reuseHomeFeatureMedia('software-development'),
      },
      {
        id: 'seo-agency-content-internal-linking',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'SEO Content & Internal Linking',
        heading:
          'Connect useful content with the pages that matter across your store.',
        description: [
          'Search content should support the wider ecommerce site instead of sitting in isolation. We plan content around useful customer searches and connect it with relevant products, collections and services.',
          'Internal linking is reviewed alongside content so search engines and customers can move through related areas of the site more clearly.',
        ],
        badges: [
          {
            label: 'SEO Content',
            href: SERVICE_PAGE_ROUTES.ecommerceSeo,
          },
          {
            label: 'Internal Linking',
            href: SERVICE_PAGE_ROUTES.ecommerceSeo,
          },
        ],
        buttons: [
          {
            label: 'Get In Touch',
            href: SERVICE_PAGE_ROUTES.contact,
          },
          {
            label: 'Book a Call',
            calendly: true,
          },
        ],
        media: reuseHomeFeatureMedia('software-design'),
      },
      {
        id: 'seo-agency-technical-seo',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'Software Technical SEO',
        heading:
          'Find and fix technical issues that can restrict organic visibility.',
        description: [
          'Technical SEO reviews how the digital platformfront is crawled, indexed and understood by search engines.',
          'Byte Operator can review areas such as indexation, redirects, canonical handling, structured data, internal links, page templates and performance-related issues, then prioritise fixes based on their relevance to the store.',
        ],
        badges: [
          {
            label: 'Technical SEO',
            href: SERVICE_PAGE_ROUTES.ecommerceSeo,
          },
        ],
        buttons: [
          {
            label: 'Get In Touch',
            href: SERVICE_PAGE_ROUTES.contact,
          },
          {
            label: 'Book a Call',
            calendly: true,
          },
        ],
        media: reuseHomeFeatureMedia('software-plus'),
      },
      {
        id: 'seo-agency-migrations',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Ecommerce SEO Migrations',
        heading:
          'Protect search visibility when moving or restructuring an ecommerce store.',
        description: [
          'SEO needs to be considered before URLs, navigation or page structures change. Migration planning helps identify important existing URLs and how they should map into the new storefront.',
          'Byte Operator can coordinate redirects, metadata, internal linking, technical checks and post-launch review as part of a platform & cloud migration or major site restructure.',
        ],
        badges: [
          {
            label: 'SEO Migrations',
            href: SERVICE_PAGE_ROUTES.seoMigrations,
          },
          {
            label: 'Redirect Planning',
            href: SERVICE_PAGE_ROUTES.seoMigrations,
          },
        ],
        buttons: [
          {
            label: 'Get In Touch',
            href: SERVICE_PAGE_ROUTES.contact,
          },
        ],
        media: reuseHomeFeatureMedia('software-migrations'),
      },
      {
        id: 'seo-agency-ongoing-support',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'Ongoing Technical SEO & Search Architecture',
        heading:
          'Keep improving search visibility as your digital platform changes.',
        description: [
          'Ecommerce stores continuously add products, collections, campaigns and content. Ongoing SEO support helps review those changes and identify new technical and search opportunities over time.',
          'Byte Operator can combine recurring technical reviews, content recommendations, on-page improvements and search analysis with the wider ecommerce roadmap.',
        ],
        badges: [
          {
            label: 'Ongoing SEO',
            href: SERVICE_PAGE_ROUTES.softwareMaintenance,
          },
        ],
        buttons: [
          {
            label: 'Get In Touch',
            href: SERVICE_PAGE_ROUTES.contact,
          },
          {
            label: 'Book a Call',
            calendly: true,
          },
        ],
        media: reuseHomeFeatureMedia('software-support-growth'),
      },
    ],
    showPartners: true,
  },
  'software-developers': {
    faqTitle: 'Software Developers',
    hero: {
      eyebrow: 'Software Developers UK',
      heading:
        'software developers you can trust. Explore development services.',
      description:
        'We are an experienced and Software accredited team of software developers you can trust, partnering with brands to develop engaging and frictionless online shopping experiences.',
      chips: [
        'Software Theme Store Builds',
        'Headless Stores',
        'Ecommerce SEO Agency',
        'Design Services',
        'Ecommerce CRO',
      ],
      primaryCta: {
        label: 'Get In Touch',
        href: '/contact/',
      },
      showPartnerLogos: false,
      showClientProof: false,
    },
    about: {
      intro: {
        heading:
          'Our development team have a wealth of experience in delivering best-in-class feature-rich Software & Enterprise Platform Solutions stores.',
        description:
          'Byte Operator builds responsive digital platformfronts with custom functionality and integrations that support how your business operates. We consider performance and technical SEO throughout implementation, creating maintainable storefronts that are straightforward to develop and improve over time.',
        cta: {
          label: 'Get In Touch',
          href: '/contact/',
        },
      },
      media: {
        primary: '/images/services/services-wide.webp', primaryWidth: 1672, primaryHeight: 941,
        primaryAlt: 'Byte Operator digital platformfront project',
        secondary: '/images/mega-menu-team.webp', secondaryWidth: 1970, secondaryHeight: 1306,
        secondaryAlt: 'Byte Operator team collaborating around a table',
      },
      process: {
        heading:
          'A practical development process, from discovery to launch.',
        leftDescription:
          'We begin by understanding the storefront, customer journeys and technical requirements before translating the agreed direction into reusable, maintainable Software code. Integrations and custom features are planned alongside the core build so every part works together.',
        rightDescription:
          'Throughout development we review responsive behaviour, storefront performance and technical SEO. Before launch, key templates, customer flows and integrations go through focused QA and testing, leaving a stable foundation that can continue to evolve.',
        cta: {
          label: 'Get In Touch',
          href: '/contact/',
        },
      },
    },
    features: [
      {
        id: 'software-developers-theme-architecture',
        layout: 'media-left',
        spacing: 'first',
        theme: 'dark',
        eyebrow: 'Software Development Agency',
        heading: 'Custom Frontend & Web Development & Architecture',
        description: [
          'Byte Operator develops custom Software themes and new storefronts around the needs of each brand, its catalogue and its customers. We translate approved designs into responsive Software sections and templates, giving ecommerce teams practical control over content without losing consistency across the store.',
          'For existing stores, we can customise the current theme, improve UI and UX, and extend key journeys with relevant custom functionality. That may include changes to navigation, collection and product templates, merchandising components or account experiences, planned within the capabilities of the software platform.',
          'Our implementation is performance-conscious from the outset. We organise theme architecture for maintainability, keep reusable components clear, and consider responsive behaviour, technical SEO and future development so the storefront can continue to evolve after launch.',
        ],
        buttons: [
          {
            label: 'Explore Case Studies',
            href: SERVICE_PAGE_ROUTES.work,
          },
        ],
        media: reuseHomeFeatureMedia('software-launch'),
      },
      {
        id: 'software-developers-checkout-cart',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Software Developer Services',
        heading: 'Checkout & Cart Development',
        description: [
          'We develop Software cart functionality around the way a store sells, from cart-drawer interactions and product messaging to business-specific rules and integration requirements. The work starts with the buying journey, so added logic supports customers and remains manageable for the ecommerce team.',
          'Checkout development is shaped by the capabilities available to the store. For Enterprise Platform Solutions projects where appropriate, that can include checkout extensions, additional content and supported upsell experiences; for every project, we work within Software’s current checkout framework rather than relying on fragile changes.',
          'We can also connect cart and checkout journeys with relevant APIs, apps and operational systems. Requirements are planned across the frontend and the services behind it, with focused testing of discounts, validation, customer states and other paths that affect placing an order.',
        ],
        buttons: [
          {
            label: 'Get In Touch',
            href: SERVICE_PAGE_ROUTES.contact,
          },
        ],
        media: reuseHomeFeatureMedia('software-development'),
      },
      {
        id: 'software-developers-quality-assurance',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'Software Development Company',
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
        media: reuseHomeFeatureMedia('software-migrations'),
      },
      {
        id: 'software-developers-technical-seo',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Software Search Engine Optimisation',
        heading: 'Technical SEO',
        description: [
          'software development decisions influence how search engines understand and navigate a store. We consider semantic structure, heading hierarchy, internal linking and crawlability while building templates, and implement structured data where it is relevant to the content and supported by the storefront.',
          'We also review technical details such as canonical URLs, redirects, indexation and the way collection filtering can create additional URL paths. Image delivery, script behaviour and page rendering are considered alongside Core Web Vitals, helping SEO requirements remain part of implementation rather than a separate check at the end.',
        ],
        buttons: [
          {
            label: 'Explore SEO Services',
            href: SERVICE_PAGE_ROUTES.softwareSeo,
          },
        ],
        media: reuseHomeFeatureMedia('software-seo-geo'),
      },
      {
        id: 'software-developers-app-architecture',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'Custom Software & App Development',
        heading: 'Custom Custom Application Architecture',
        description: [
          'Byte Operator develops custom custom applications when a business requirement cannot be met appropriately through the theme or an existing app. We define the merchant and customer experience, then plan the frontend, backend, data and authentication requirements needed to extend Software functionality in a dependable way.',
          'App architecture can connect Software APIs with operational platforms and other integrations, supporting business-specific workflows without placing unnecessary complexity in the storefront. We structure the application for maintainability, with clear boundaries between services and room for requirements to develop over time.',
        ],
        buttons: [
          {
            label: 'Explore App Services',
            href: SERVICE_PAGE_ROUTES.softwareAppDevelopment,
          },
        ],
        media: reuseHomeFeatureMedia('software-plus'),
      },
      {
        id: 'software-developers-design-support-growth',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Software Website Design & Support Services',
        heading: 'Design, Support & Growth',
        description: [
          'Byte Operator designs digital platformfronts around product discovery, buying journeys and the visual identity of the brand. We can create a new custom theme or improve an existing one, refining page structure, navigation and responsive behaviour while adding landing pages and features for campaigns or changing customer needs.',
          'After launch, ongoing support can cover maintenance, technical troubleshooting and planned development updates. We help ecommerce teams prioritise a practical roadmap, from day-to-day fixes and platform changes to larger iterations that improve how content is managed and how customers move through the store.',
          'Conversion-focused improvements can be developed alongside that support, using available store data and customer behaviour to identify useful changes to templates, content and interactions. This creates an ongoing ecommerce development process in which design, technical support and measured iteration work together as the store grows.',
        ],
        buttons: [
          {
            label: 'Explore Design Services',
            href: SERVICE_PAGE_ROUTES.softwareWebDesign,
          },
        ],
        media: reuseHomeFeatureMedia('software-design'),
      },
    ],
  },
  'software-web-design': {
    faqTitle: 'UI/UX & Product Design',
    hero: {
      eyebrow: 'Software Website Design',
      heading:
        'UI/UX & product design focused on your brand, customers and ecommerce goals.',
      description:
        'Byte Operator designs digital platformfronts around clear customer journeys, strong brand presentation and practical ecommerce requirements. From new store projects to updates for existing Software themes, our design process considers usability, product discovery, mobile experience and the path from landing page to checkout.',
      chips: [
        'Digital Platform Builds',
        'Ecommerce SEO',
        'Development Services',
        'Ecommerce CRO',
      ],
      primaryCta: {
        label: 'Get In Touch',
        href: SERVICE_PAGE_ROUTES.contact,
      },
      showPartnerLogos: false,
      showClientProof: false,
    },
    about: {
      intro: {
        heading:
          'UI/UX & product design built around how customers discover, browse and buy.',
        description:
          'Our UI/UX & product design work brings brand direction and ecommerce usability into one clear storefront experience. We plan layouts around the products, content and customer journeys that matter to the business, while considering responsive behaviour, navigation, collection discovery and conversion-focused page structure.',
        cta: {
          label: 'Get In Touch',
          href: SERVICE_PAGE_ROUTES.contact,
        },
      },
      media: {
        primary: '/images/services/services-wide.webp', primaryWidth: 1672, primaryHeight: 941,
        primaryAlt: 'Byte Operator digital platformfront project',
        secondary: '/images/mega-menu-team.webp', secondaryWidth: 1970, secondaryHeight: 1306,
        secondaryAlt: 'Byte Operator team collaborating around a table',
      },
      process: {
        heading: 'Our UI/UX & product design process',
        leftDescription:
          'We begin by understanding the brand, product catalogue, existing storefront and the goals behind the project. From there, the design process can move through research, page planning, wireframes and customer-journey mapping before detailed visual designs are prepared. This gives each major page a clear purpose before development begins.',
        rightDescription:
          'Detailed designs establish typography, imagery, hierarchy, navigation and interactive states across desktop and mobile. Where useful, prototypes can also help review important flows before development, allowing the team to resolve usability questions earlier and give developers a clearer implementation target.',
        cta: {
          label: 'Get In Touch',
          href: SERVICE_PAGE_ROUTES.contact,
        },
      },
    },
    features: [
      {
        id: 'software-web-design-brand',
        layout: 'media-left',
        spacing: 'first',
        theme: 'dark',
        eyebrow: 'Bespoke UI/UX & Product Design',
        heading: 'Design built around your brand',
        description: [
          'A custom Software design gives the storefront room to reflect the brand without being restricted by the visual structure of an existing theme. Page hierarchy, navigation, product discovery and content placement can be planned around the specific catalogue and customer journey.',
          'The design process can cover core templates such as the homepage, collection pages, product pages and content-led landing pages, alongside reusable sections that give the internal team practical flexibility after launch.',
        ],
        buttons: [
          {
            label: 'Explore New Store Services',
            href: SERVICE_PAGE_ROUTES.softwareDevelopment,
          },
        ],
        media: reuseHomeFeatureMedia('software-launch'),
      },
      {
        id: 'software-web-design-theme-customisation',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Software Theme Design',
        heading: 'Theme customisation & ad-hoc design',
        description: [
          'Not every Software project requires a complete redesign. Existing themes can be updated with new page layouts, revised navigation, landing pages, UI improvements and additional sections while preserving parts of the storefront that are already working well.',
          'This approach can suit brands that need focused changes to specific customer journeys or want to improve the presentation of collections, products, campaigns and editorial content without replacing the whole storefront.',
        ],
        buttons: [
          {
            label: 'Get In Touch',
            href: SERVICE_PAGE_ROUTES.contact,
          },
        ],
        media: reuseHomeFeatureMedia('software-development'),
      },
      {
        id: 'software-web-design-discovery',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'UI/UX & Product Design Discovery',
        heading: 'Discovery & research',
        description: [
          'Design decisions start with understanding the business, product range, customer needs and existing storefront. Reviewing analytics, navigation patterns, content, brand direction and competing stores can reveal where users need clearer paths and where the new design needs stronger hierarchy.',
          'The findings provide direction for page structure, content priorities and the customer journeys that should receive the most attention during wireframing and visual design.',
        ],
        buttons: [
          {
            label: 'Explore Case Studies',
            href: SERVICE_PAGE_ROUTES.work,
          },
        ],
        media: reuseHomeFeatureMedia('software-migrations'),
      },
      {
        id: 'software-web-design-customer-journeys',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Software Customer Journey Design',
        heading: 'Wireframing & customer journeys',
        description: [
          'Wireframes establish the structure of important Software pages before visual styling is applied. They help define where products, collection filters, navigation, calls to action, supporting content and merchandising elements should sit across the storefront.',
          'Customer-journey planning also considers how different visitors arrive and move through the site. New customers, returning customers and visitors entering through product, collection or campaign pages may each need different routes to useful information.',
        ],
        buttons: [
          {
            label: 'Get In Touch',
            href: SERVICE_PAGE_ROUTES.contact,
          },
        ],
        media: reuseHomeFeatureMedia('software-seo-geo'),
      },
      {
        id: 'software-web-design-ui-ux',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'Software UI & UX Design',
        heading: 'High-fidelity design & prototyping',
        description: [
          'Once page structures are agreed, high-fidelity designs bring the storefront into its final visual direction using the approved typography, imagery, interface elements and brand system. Desktop and mobile layouts can be reviewed together so responsive behaviour is considered before development.',
          'Interactive prototypes can be used for important flows where reviewing navigation, buttons, forms and page transitions before development helps the team validate the experience and clarify implementation details.',
        ],
        buttons: [
          {
            label: 'Get In Touch',
            href: SERVICE_PAGE_ROUTES.contact,
          },
        ],
        media: reuseHomeFeatureMedia('software-plus'),
      },
      {
        id: 'software-web-design-development-support',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Software Website Design & Development Services',
        heading: 'Development, Support & Growth',
        description: [
          'Once the design work is approved, the same project can move into software development using custom theme work or targeted updates to an existing theme. Development can cover reusable sections, product and collection experiences, integrations and other storefront functionality required by the project.',
          'After launch, ongoing development and support can be used for new landing pages, theme updates, technical fixes, feature improvements and planned storefront changes as business requirements evolve.',
          'Design and CRO work can also continue after launch by reviewing customer behaviour and identifying areas of the storefront that need clearer navigation, stronger merchandising or improved page structure.',
        ],
        buttons: [
          {
            label: 'Explore Retainers',
            href: SERVICE_PAGE_ROUTES.softwareMaintenance,
          },
        ],
        media: reuseHomeFeatureMedia('software-design'),
      },
    ],
  },
  'software-app-development': {
    faqTitle: 'Custom Software & App Development',
    hero: {
      eyebrow: 'Custom Software & App Development Services',
      heading:
        'Custom custom applications and advanced functionality, built around your business.',
      chips: [
        {
          label: 'Software Retainer / Support',
          href: SERVICE_PAGE_ROUTES.softwareMaintenance,
        },
        {
          label: 'Software Design',
          href: SERVICE_PAGE_ROUTES.softwareWebDesign,
        },
        {
          label: 'Development Services',
          href: SERVICE_PAGE_ROUTES.softwareDevelopment,
        },
        {
          label: 'Ecommerce CRO',
          href: SERVICE_PAGE_ROUTES.ecommerceCro,
        },
      ],
      description:
        'Byte Operator develops custom custom applications and advanced functionality for requirements that standard themes and off-the-shelf apps do not fully cover, from customer-facing experiences to connected operational workflows.',
      primaryCta: {
        label: 'Get In Touch',
        href: SERVICE_PAGE_ROUTES.contact,
      },
    },
    about: {
      intro: {
        heading:
          'We design and develop custom custom applications around specific ecommerce requirements.',
        description:
          'Byte Operator creates custom custom application functionality across the storefront and the systems behind it. That can include Software APIs, third-party integrations, customer experiences, data handling and workflows designed around how your team manages the store.',
        cta: {
          label: 'Get In Touch',
          href: SERVICE_PAGE_ROUTES.contact,
        },
      },
      media: {
        primary: '/images/services/services-wide.webp', primaryWidth: 1672, primaryHeight: 941,
        primaryAlt: 'Byte Operator custom software & app development planning',
        secondary: '/images/mega-menu-team.webp', secondaryWidth: 1970, secondaryHeight: 1306,
        secondaryAlt: 'Byte Operator team collaborating on an ecommerce project',
      },
      process: {
        heading: 'App development planned around the whole ecommerce operation.',
        leftDescription:
          'We start by understanding the customer journey, operational process and systems the app needs to support. This helps separate essential requirements from useful future improvements and establishes the right Software architecture before development begins.',
        rightDescription:
          'Frontend functionality, backend workflows, data flows and integrations are considered together. The result is a practical implementation plan that works with the existing store, gives the team clear ownership and can evolve as business requirements change.',
        cta: {
          label: 'Get In Touch',
          href: SERVICE_PAGE_ROUTES.contact,
        },
      },
    },
    features: [
      {
        id: 'software-app-development-services',
        layout: 'media-left',
        spacing: 'first',
        theme: 'dark',
        eyebrow: 'Custom Custom Software & App Development Services',
        heading: 'Apps Built Around Your Business Requirements',
        description: [
          'Custom app development is suited to functionality that is not available through the current theme or is only partly addressed by an existing custom application. We scope the customer-facing experience alongside the operational work needed behind the scenes.',
          'Projects can include tailored frontend interactions, backend workflows, data handling, Software APIs and third-party integrations, with the solution planned around the way the store actually operates.',
        ],
        buttons: [
          {label: 'Get In Touch', href: SERVICE_PAGE_ROUTES.contact},
        ],
        media: reuseHomeFeatureMedia('software-development'),
      },
      {
        id: 'software-app-development-architecture',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Custom Software & App Development Agency',
        heading: 'Custom Application Architecture That Keeps Your Team in Control',
        description: [
          'A useful app should give ecommerce teams configurable functionality without making everyday administration harder. We plan the right balance between customer account experiences, store administration and the rules that support shipping, fulfilment and other workflows.',
          'Data management, operational functionality and integrations are designed with the people using them in mind, so the store can remain manageable as requirements develop.',
        ],
        buttons: [
          {
            label: 'Discuss Your App Project',
            href: SERVICE_PAGE_ROUTES.contact,
          },
        ],
        media: reuseHomeFeatureMedia('software-design'),
      },
      {
        id: 'software-app-product-registration',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'Custom Application Use Case',
        heading: 'Product Registration & Customer Account Workflows',
        description: [
          'Product registration is one example of functionality a custom custom application can support. Registration and form data can be connected to customer records and store administration where the business process requires it.',
          'The experience can be shaped around the information customers need to provide, how internal teams review it and which systems need access to the resulting data.',
        ],
        buttons: [
          {label: 'Get In Touch', href: SERVICE_PAGE_ROUTES.contact},
        ],
        media: reuseHomeFeatureMedia('software-migrations'),
      },
      {
        id: 'software-app-product-builder',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Custom Application Use Case',
        heading: 'Product Builder & Build-a-Box Experiences',
        description: [
          'A custom custom application can support product selection, bundling and configuration when a standard product page does not reflect how the business sells. The customer experience can guide suitable choices while keeping the underlying product and order data clear.',
          'Where relevant, this functionality can also connect with subscription services, inventory rules or other integrations that need to work alongside the bundle or configured order.',
        ],
        buttons: [
          {label: 'Get In Touch', href: SERVICE_PAGE_ROUTES.contact},
        ],
        media: reuseHomeFeatureMedia('software-launch'),
      },
      {
        id: 'software-app-custom-development',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'Custom Custom Software & App Development',
        heading: 'Bespoke Functionality for Software and Enterprise Platform Solutions',
        description: [
          'Custom development can connect storefront functionality with backend workflows, APIs, customer accounts and fulfilment or operational requirements. It can also support subscription, bundle and integration needs where they are relevant to the store.',
          'Byte Operator scopes the solution around the capabilities of Software or Enterprise Platform Solutions, creating functionality that fits the platform as well as the requirements of the business.',
        ],
        buttons: [
          {label: 'Get In Touch', href: SERVICE_PAGE_ROUTES.contact},
        ],
        media: reuseHomeFeatureMedia('software-plus'),
      },
    ],
    showPartners: true,
    plusAgencyCta: {
      heading: 'Looking for a Enterprise Software Agency?',
      descriptionHtml:
        `Upgrade or migrate to <a href="${SERVICE_PAGE_ROUTES.softwarePlus}">Enterprise Platform Solutions</a> with Byte Operator. Our team can support Enterprise Platform Solutions projects including store builds, migrations, development and ongoing ecommerce requirements.`,
      cta: {
        label: 'Upgrade to Enterprise Platform Solutions with Byte Operator',
        href: SERVICE_PAGE_ROUTES.softwarePlus,
      },
    },
  },
  'software-integrations': {
    faqTitle: 'API & System Integrations',
    hero: {
      eyebrow: 'Software Integration Experts',
      heading: 'Software Integration Services',
      chips: [
        {
          label: 'Consultation Services',
          href: SERVICE_PAGE_ROUTES.softwareConsultant,
        },
        {label: 'Ecommerce CRO', href: SERVICE_PAGE_ROUTES.ecommerceCro},
        {
          label: 'Digital Platform Builds',
          href: SERVICE_PAGE_ROUTES.softwareDevelopment,
        },
        {
          label: 'Ecommerce SEO Agency',
          href: SERVICE_PAGE_ROUTES.ecommerceSeo,
        },
        {
          label: 'Design Services',
          href: SERVICE_PAGE_ROUTES.softwareWebDesign,
        },
        {
          label: 'Development Services',
          href: SERVICE_PAGE_ROUTES.softwareDevelopment,
        },
      ],
      description:
        'Byte Operator connects Software and Enterprise Platform Solutions with the third-party systems that support ecommerce operations, including ERP, inventory, CRM, accounting, logistics, reporting, custom applications and custom business platforms.',
      primaryCta: {
        label: 'Get In Touch',
        href: SERVICE_PAGE_ROUTES.contact,
      },
    },
    about: {
      intro: {
        heading:
          'We connect Software and Enterprise Platform Solutions with the systems that support your wider ecommerce operation.',
        description:
          'Byte Operator plans and develops integrations between Software and third-party platforms such as ERP, inventory, CRM, accounting, logistics and custom business systems. We map the APIs and data flow between platforms so important product, order, customer and operational information can move through the right processes.',
        cta: {
          label: 'Get In Touch',
          href: SERVICE_PAGE_ROUTES.contact,
        },
      },
      media: {
        primary: '/images/services/services-wide.webp', primaryWidth: 1672, primaryHeight: 941,
        primaryAlt: 'Byte Operator ecommerce integration planning',
        secondary: '/images/mega-menu-team.webp', secondaryWidth: 1970, secondaryHeight: 1306,
        secondaryAlt: 'Byte Operator team collaborating on a Software integration',
      },
      process: {
        heading: 'Our Software Integration Process',
        leftDescription:
          'We begin by reviewing the current technology stack and the business workflows each system needs to support. This lets us map products, inventory, orders, customers and other data, identify the relevant APIs or middleware, and define the integration requirements before implementation begins.',
        rightDescription:
          'Implementation is followed by focused testing, data validation and launch preparation. We review how information behaves across the connected platforms, then provide practical support for monitoring, troubleshooting and future changes as business systems evolve.',
        cta: {
          label: 'Get In Touch',
          href: SERVICE_PAGE_ROUTES.contact,
        },
      },
    },
    features: [
      {
        id: 'software-integrations-erp',
        layout: 'media-left',
        spacing: 'first',
        theme: 'dark',
        eyebrow: 'Software ERP Integrations',
        heading: 'Integrating ERPs with Enterprise Platform Solutions',
        description: [
          'ERP integrations can connect Software with the systems used to manage products, inventory, orders, customers, fulfilment and finance. The right setup depends on which system owns each part of the data and when information needs to be synchronised.',
          'We scope the data flows and operational rules around the existing ERP and digital platform, helping create an integration that reflects the needs of the wider ecommerce operation.',
        ],
        buttons: [{label: 'Get In Touch', href: SERVICE_PAGE_ROUTES.contact}],
        media: reuseHomeFeatureMedia('software-development'),
      },
      {
        id: 'software-integrations-inventory-finance',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Software Inventory, Payment & Accounting Integrations',
        heading: 'Connecting Inventory, Finance and Payment Systems',
        description: [
          'Inventory management, stock synchronisation, accounting systems and payment providers all affect how orders move from the storefront into day-to-day operations. Integrations can keep relevant order and financial data available to the systems that need it.',
          'Platforms such as Xero, QuickBooks and specialist inventory tools may be considered where appropriate, alongside the workflow and data requirements of the business.',
        ],
        buttons: [{label: 'Get In Touch', href: SERVICE_PAGE_ROUTES.contact}],
        media: reuseHomeFeatureMedia('software-design'),
      },
      {
        id: 'software-integrations-crm',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'Software CRM Integrations',
        heading: 'Connecting CRM & Marketing Tools with Software',
        description: [
          'CRM, email marketing and customer-service integrations can connect Software customer and order information with the tools teams use to communicate, support and segment audiences.',
          'The integration can be planned around customer data, consent, order history and the events each platform needs, including suitable ecommerce technologies already used by the store.',
        ],
        buttons: [{label: 'Get In Touch', href: SERVICE_PAGE_ROUTES.contact}],
        media: reuseHomeFeatureMedia('software-launch'),
      },
      {
        id: 'software-integrations-analytics',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Software Analytics & Reporting Integrations',
        heading: 'Connecting Analytics and Reporting with Software',
        description: [
          'Analytics and reporting integrations can connect Software data with GA4, Google Tag Manager, business-intelligence platforms and internal reporting workflows. The goal is to make important storefront and operational events available in the places teams use to review them.',
          'We consider the events, data sources and reporting requirements together so tracking and data handoffs are clear across the wider stack.',
        ],
        buttons: [{label: 'Get In Touch', href: SERVICE_PAGE_ROUTES.contact}],
        media: reuseHomeFeatureMedia('software-seo-geo'),
      },
      {
        id: 'software-integrations-apps',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'Custom Application Integrations',
        heading: 'Custom Custom Application Integrations',
        description: [
          'Third-party custom applications and custom functionality often need to work alongside the store’s customer experience and operational workflows. Integrations can cover loyalty, reviews, subscriptions and other customer-facing tools, as well as the APIs behind them.',
          'Byte Operator can assess how app functionality, custom logic and backend processes should connect so the experience remains practical for customers and the ecommerce team.',
        ],
        buttons: [
          {
            label: 'Explore App Development',
            href: SERVICE_PAGE_ROUTES.softwareAppDevelopment,
          },
        ],
        media: reuseHomeFeatureMedia('software-plus'),
      },
      {
        id: 'software-integrations-logistics',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Software 3PL, Shipping & Logistics Integrations',
        heading: 'Connecting Software with Fulfilment and Logistics',
        description: [
          '3PL, shipping and logistics integrations can connect Software orders with fulfilment systems, warehouses, tracking services and returns processes. The integration can help define how orders are passed on and how inventory or fulfilment updates return to the storefront.',
          'We plan the appropriate APIs or middleware around the operational flow, including multiple locations and the information customers and internal teams need to see.',
        ],
        buttons: [{label: 'Get In Touch', href: SERVICE_PAGE_ROUTES.contact}],
        media: reuseHomeFeatureMedia('software-migrations'),
      },
      {
        id: 'software-integrations-marketplace',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'Multi-vendor Marketplace Integrations',
        heading: 'Marketplace and Multi-vendor API & System Integrations',
        description: [
          'Marketplace and multi-vendor integrations need to account for vendor onboarding, catalogues, stock, order routing and multiple fulfilment locations. The scope can also include commission or payout workflows where the marketplace model requires them.',
          'We help map the platform responsibilities and the connections needed between Software, vendors and the systems that support the marketplace operation.',
        ],
        buttons: [{label: 'Get In Touch', href: SERVICE_PAGE_ROUTES.contact}],
        media: reuseHomeFeatureMedia('software-support-growth'),
      },
      {
        id: 'software-integrations-international',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Software Internationalisation Integrations',
        heading: 'Integrations for Global Software Operations',
        description: [
          'International Software operations can require integrations around Software Markets, currencies, localisation, tax and duties, regional payments, international stock and fulfilment. Reporting also needs to account for how data is viewed across markets.',
          'We consider the systems supporting each market alongside the storefront requirements, helping establish a connected approach that reflects how the business operates internationally.',
        ],
        buttons: [
          {
            label: 'Explore Internationalisation',
            href: SERVICE_PAGE_ROUTES.internationalisation,
          },
        ],
        media: reuseHomeFeatureMedia('software-design'),
      },
      {
        id: 'software-integrations-support',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'Software Integration Ongoing Support',
        heading: 'Integration Support & Maintenance',
        description: [
          'Integrations require ongoing attention as APIs, apps and business systems change. Support can cover troubleshooting, data-flow monitoring, maintenance, new connections and development work as the technology stack evolves.',
          'A practical support plan helps keep integration requirements visible alongside the wider Software roadmap and day-to-day ecommerce priorities.',
        ],
        buttons: [
          {
            label: 'Explore Support Options',
            href: SERVICE_PAGE_ROUTES.softwareMaintenance,
          },
        ],
        media: reuseHomeFeatureMedia('software-launch'),
      },
      {
        id: 'software-integrations-middleware',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Software Integration Platforms & Middleware',
        heading: 'Connecting Complex Ecommerce Systems',
        description: [
          'Integration platforms and middleware can provide a structured way to connect systems such as ERP, CRM, fulfilment, finance and inventory when direct connections are not the right fit. Tools such as Patchworks may be considered as one example, depending on the project requirements.',
          'We assess the systems, workflows and data transformations involved before selecting an approach that fits the operational complexity of the store.',
        ],
        buttons: [{label: 'Get In Touch', href: SERVICE_PAGE_ROUTES.contact}],
        media: reuseHomeFeatureMedia('software-development'),
      },
    ],
  },
  'software-internationalisation': {
    faqTitle: 'Software Internationalisation',
    hero: {
      eyebrow: 'Software Internationalisation Experts',
      heading: 'Software Internationalisation Services',
      chips: [
        {
          label: 'Consultation Services',
          href: SERVICE_PAGE_ROUTES.softwareConsultant,
        },
        {
          label: 'Digital Platform Builds',
          href: SERVICE_PAGE_ROUTES.softwareDevelopment,
        },
        {
          label: 'Ecommerce SEO Agency',
          href: SERVICE_PAGE_ROUTES.ecommerceSeo,
        },
        {
          label: 'Design Services',
          href: SERVICE_PAGE_ROUTES.softwareWebDesign,
        },
        {label: 'Ecommerce CRO', href: SERVICE_PAGE_ROUTES.ecommerceCro},
        {
          label: 'Platform & Cloud Migrations',
          href: SERVICE_PAGE_ROUTES.softwareMigrations,
        },
      ],
      description:
        'Byte Operator helps Software and Enterprise Platform Solutions merchants sell into new regions, covering Software Markets, localisation, currencies and payments, international SEO, and the operational detail behind serving customers in more than one market.',
      primaryCta: {
        label: 'Get In Touch',
        href: SERVICE_PAGE_ROUTES.contact,
      },
    },
    about: {
      intro: {
        heading:
          'We help Software and Enterprise Platform Solutions stores expand into new markets with a setup that reflects how each region actually buys.',
        description:
          'Byte Operator plans and builds international digital platformfronts around Software Markets, translation and localisation, regional pricing and payment methods, tax and duties messaging, and the URL and hreflang structure behind each market. We look at the commercial goals for every region alongside the technical setup so the store presents a relevant experience wherever a customer lands.',
        cta: {
          label: 'Get In Touch',
          href: SERVICE_PAGE_ROUTES.contact,
        },
      },
      media: {
        primary: '/images/services/services-wide.webp', primaryWidth: 1672, primaryHeight: 941,
        primaryAlt: 'Byte Operator Software internationalisation planning',
        secondary: '/images/mega-menu-team.webp', secondaryWidth: 1970, secondaryHeight: 1306,
        secondaryAlt:
          'Byte Operator team reviewing a multi-market Software setup',
      },
      process: {
        heading: 'Our Software Internationalisation Process',
        leftDescription:
          'We start by reviewing the markets the business wants to serve and what each one requires: languages, currencies, payment methods, delivery expectations, tax and duties handling, and any regional legal or content differences. That review shapes the market structure, domain approach and Software Markets configuration before build work begins.',
        rightDescription:
          'Implementation is followed by testing across markets, checking pricing, checkout, translated content, search visibility and fulfilment behaviour region by region. From there we support the rollout of further markets and the ongoing changes that come with trading internationally.',
        cta: {
          label: 'Get In Touch',
          href: SERVICE_PAGE_ROUTES.contact,
        },
      },
    },
    features: [
      {
        id: 'software-internationalisation-expansion',
        layout: 'media-left',
        spacing: 'first',
        theme: 'dark',
        eyebrow: 'Software International Ecommerce',
        heading: 'Selling Internationally with Software',
        description: [
          'International expansion asks a commercial question before a technical one: which markets are worth serving, and what does each of them need from the storefront. Demand, delivery, pricing, competition and local expectations all affect how a market should be approached.',
          'Byte Operator helps assess the opportunity for each region and translate it into a Software setup, so expansion happens in a considered order rather than all at once.',
        ],
        buttons: [{label: 'Get In Touch', href: SERVICE_PAGE_ROUTES.contact}],
        media: reuseHomeFeatureMedia('software-internationalisation'),
      },
      {
        id: 'software-internationalisation-markets',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Software Markets',
        heading: 'Setting Up and Structuring Software Markets',
        description: [
          'Software Markets defines how regions, catalogues, pricing, domains and settings are grouped within a single store. The structure chosen early on affects how easily further markets can be added and how much of the setup can be managed centrally.',
          'We plan market groupings, domain or subfolder structure and catalogue availability around the regions in scope, including the Enterprise Platform Solutions capabilities where a store has them.',
        ],
        buttons: [{label: 'Get In Touch', href: SERVICE_PAGE_ROUTES.contact}],
        media: reuseHomeFeatureMedia('software-plus'),
      },
      {
        id: 'software-internationalisation-localisation',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'Software Localisation & Translation',
        heading: 'Regional Customer Experience & Content',
        description: [
          'Localisation covers more than translated product copy. Navigation, size and measurement conventions, imagery, delivery and returns messaging, support information and legal content all contribute to whether a storefront feels relevant in a given region.',
          'We plan how translated and market-specific content is managed in Software, including which elements stay global and which are adapted per market, so the experience stays consistent as regions are added.',
        ],
        buttons: [
          {
            label: 'Explore Design Services',
            href: SERVICE_PAGE_ROUTES.softwareWebDesign,
          },
        ],
        media: reuseHomeFeatureMedia('software-design'),
      },
      {
        id: 'software-internationalisation-currencies',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Currencies, Pricing & Payments',
        heading: 'Multi-currency Pricing and Regional Checkout',
        description: [
          'Multi-currency pricing, price rounding, market-specific price lists, local payment methods, and tax and duties presentation all shape how customers read cost and how confident they feel at checkout.',
          'We work through currency handling, pricing rules, regional payment providers and duties messaging together, so the storefront and checkout stay clear about what a customer pays in their market.',
        ],
        buttons: [{label: 'Get In Touch', href: SERVICE_PAGE_ROUTES.contact}],
        media: reuseHomeFeatureMedia('software-cro'),
      },
      {
        id: 'software-internationalisation-seo',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'International Technical SEO & Search Architecture',
        heading: 'Market Structure, Domains and Hreflang',
        description: [
          'International SEO depends on how markets are structured in the first place: country domains or subfolders, hreflang and canonical handling, indexation of translated content, and how each market is presented to search engines.',
          'We review the URL structure, hreflang implementation and regional content alongside the wider SEO approach, so new markets are discoverable without competing against the existing storefront.',
        ],
        buttons: [
          {
            label: 'Explore Ecommerce SEO',
            href: SERVICE_PAGE_ROUTES.ecommerceSeo,
          },
        ],
        media: reuseHomeFeatureMedia('software-seo-geo'),
      },
      {
        id: 'software-internationalisation-operations',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Global Operations & Fulfilment',
        heading: 'Fulfilment, Stock and Delivery Across Markets',
        description: [
          'Trading in several regions raises operational questions around inventory locations, shipping rates and carriers, customs and duties handling, returns routes, and the delivery expectations customers are shown before they buy.',
          'We consider the systems supporting each market, including fulfilment, stock and reporting, so international orders can be handled with the same clarity as domestic ones.',
        ],
        buttons: [{label: 'Get In Touch', href: SERVICE_PAGE_ROUTES.contact}],
        media: reuseHomeFeatureMedia('software-migrations'),
      },
      {
        id: 'software-internationalisation-support',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'Internationalisation Support',
        heading: 'Ongoing Support for Multi-market Stores',
        description: [
          'Multi-market stores keep changing: new regions launch, catalogues and pricing shift, translated content needs updating, and tax, duties or payment requirements move on. Support can cover monitoring, troubleshooting and the development work behind those changes.',
          'A practical support plan keeps international requirements visible alongside the wider Software roadmap, rather than treating each new market as a separate project.',
        ],
        buttons: [
          {
            label: 'Explore Support Options',
            href: SERVICE_PAGE_ROUTES.softwareMaintenance,
          },
        ],
        media: reuseHomeFeatureMedia('software-support-growth'),
      },
    ],
  },
  'software-audits': {
    faqTitle: 'Digital Platform Audits',
    hero: {
      eyebrow: 'Digital Platform Audits',
      heading: 'Digital Platform Audit Services',
      chips: [
        {
          label: 'Consultation Services',
          href: SERVICE_PAGE_ROUTES.softwareConsultant,
        },
        {label: 'Ecommerce CRO', href: SERVICE_PAGE_ROUTES.ecommerceCro},
        {
          label: 'Digital Platform Builds',
          href: SERVICE_PAGE_ROUTES.softwareDevelopment,
        },
        {label: 'AI Ecommerce', href: SERVICE_PAGE_ROUTES.ai},
      ],
      description:
        'Byte Operator audits Software and Enterprise Platform Solutions stores across user experience, conversion, development, SEO and performance, then sets out the findings as a prioritised list of practical recommendations.',
      primaryCta: {
        label: 'Get In Touch',
        href: SERVICE_PAGE_ROUTES.contact,
      },
    },
    about: {
      intro: {
        heading: 'Software & Enterprise Platform Solutions Auditing Services',
        description:
          'A Software audit reviews how a store actually works for the people using it and the team running it. Byte Operator looks at UI and UX, site speed and performance, technical development, SEO and conversion together, because issues in one area usually show up in another.',
        cta: {
          label: 'Get In Touch',
          href: SERVICE_PAGE_ROUTES.contact,
        },
      },
      media: {
        primary: '/images/services/services-wide.webp', primaryWidth: 1672, primaryHeight: 941,
        primaryAlt: 'Byte Operator reviewing a digital platformfront during an audit',
        secondary: '/images/mega-menu-team.webp', secondaryWidth: 1970, secondaryHeight: 1306,
        secondaryAlt: 'Byte Operator team working through Software audit findings',
      },
      process: {
        heading: 'Our Software Audit Process',
        leftDescription:
          'We start with the commercial context: what the store sells, who buys it and what the team is trying to improve. From there we review the storefront and theme code, the customer journey, analytics and search data, and the technical setup behind the store.',
        rightDescription:
          'Findings are written up as clear, prioritised recommendations rather than a raw list of issues, so each item can be weighed against effort and likely impact. We can then walk the team through the audit and support the work that follows.',
        cta: {
          label: 'Get In Touch',
          href: SERVICE_PAGE_ROUTES.contact,
        },
      },
    },
    features: [
      {
        id: 'software-audits-expertise',
        layout: 'media-left',
        spacing: 'first',
        theme: 'dark',
        eyebrow: 'Our Software Auditing Expertise',
        heading: 'Auditing Software and Enterprise Platform Solutions Stores',
        description: [
          'Byte Operator works across design, development, SEO and conversion, so an audit can look at a store from each of those angles instead of one in isolation. That matters because a slow template, a confusing checkout step and a thin category page often contribute to the same problem.',
          'Audits can be scoped to a single area or run across the whole storefront, depending on what the team already knows and what needs verifying.',
        ],
        buttons: [{label: 'Get In Touch', href: SERVICE_PAGE_ROUTES.contact}],
        media: reuseHomeFeatureMedia('software-development'),
      },
      {
        id: 'software-audits-cro',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Conversion & Performance Optimization Audits',
        heading: 'Conversion Rate Optimisation Audits',
        description: [
          'A CRO audit reviews the journey from landing page to completed order: product pages, collection filtering, search, cart, checkout and the messaging around delivery, returns and payment. We look at analytics alongside the storefront itself so observations are grounded in how customers actually move through the site.',
          'The output is a set of prioritised opportunities, including which ones are worth testing properly and which are straightforward fixes.',
        ],
        buttons: [
          {
            label: 'Explore Ecommerce CRO',
            href: SERVICE_PAGE_ROUTES.ecommerceCro,
          },
        ],
        media: reuseHomeFeatureMedia('software-cro'),
      },
      {
        id: 'software-audits-technical',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'Software Technical Audits',
        heading: 'Development & Technical Architecture & Code Audits',
        description: [
          'A technical audit reviews theme code, app usage, custom functionality, integrations and the way the store has been extended over time. Accumulated app scripts, unused code and workarounds tend to make later changes slower and riskier than they need to be.',
          'We report on code quality, maintainability and technical debt, and identify the areas that should be addressed before further development work is planned.',
        ],
        buttons: [
          {
            label: 'Explore Development Services',
            href: SERVICE_PAGE_ROUTES.softwareDevelopment,
          },
        ],
        media: reuseHomeFeatureMedia('software-plus'),
      },
      {
        id: 'software-audits-design',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Software Design Audits',
        heading: 'UI UX Architecture & Code Audits',
        description: [
          'A design audit reviews the interface and the experience around it: navigation and information architecture, page hierarchy, content clarity, mobile behaviour, accessibility considerations and consistency across templates.',
          'We set out where the current design is making decisions harder for customers, and what could be improved through refinement of the existing theme versus a larger design project.',
        ],
        buttons: [
          {
            label: 'Explore Design Services',
            href: SERVICE_PAGE_ROUTES.softwareWebDesign,
          },
        ],
        media: reuseHomeFeatureMedia('software-design'),
      },
      {
        id: 'software-audits-seo',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'Technical SEO & Search Architecture Audits',
        heading: 'SEO & Ecommerce Organic Search Audits',
        description: [
          'An SEO audit covers technical foundations such as indexation, crawlability, site structure, internal linking, structured data, redirects and duplicate content, alongside on-page factors across collection, product and content pages.',
          'We review the store against the search terms that matter commercially, then set out the technical and content work most likely to support organic visibility.',
        ],
        buttons: [
          {
            label: 'Explore Ecommerce SEO',
            href: SERVICE_PAGE_ROUTES.ecommerceSeo,
          },
        ],
        media: reuseHomeFeatureMedia('software-seo-geo'),
      },
      {
        id: 'software-audits-internationalisation',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Software Internationalisation Audits',
        heading: 'Global Expansion Audits',
        description: [
          'An internationalisation audit reviews how a store handles multiple markets: Software Markets configuration, currencies, languages and translation, regional payment and delivery options, tax and duties messaging, and the hreflang and URL structure behind it.',
          'We also look at how international stock, fulfilment and reporting are handled, so expansion plans account for operations as well as the storefront.',
        ],
        buttons: [
          {
            label: 'Explore Internationalisation',
            href: SERVICE_PAGE_ROUTES.internationalisation,
          },
        ],
        media: reuseHomeFeatureMedia('software-internationalisation'),
      },
      {
        id: 'software-audits-site-speed',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'Software Site Speed Audits',
        heading: 'Speed & Performance Audits',
        description: [
          'A site speed audit reviews what the browser is actually being asked to load: theme assets, images and media, third-party scripts, app injections, fonts and render-blocking resources, measured against Core Web Vitals on both mobile and desktop.',
          'We separate the changes that are quick to make from the ones that need theme or template work, so performance improvements can be sequenced sensibly.',
        ],
        buttons: [{label: 'Get In Touch', href: SERVICE_PAGE_ROUTES.contact}],
        media: reuseHomeFeatureMedia('software-support-growth'),
      },
    ],
  },
  'magento-software-migrations': {
    faqTitle: 'Magento to Platform & Cloud Migration',
    hero: {
      eyebrow: 'Migrate from Magento to Software',
      heading: 'Magento to Platform & Cloud Migration Services',
      chips: [
        {
          label: 'Migration Services',
          href: SERVICE_PAGE_ROUTES.softwareMigrations,
        },
        {
          label: 'Digital Platform Builds',
          href: SERVICE_PAGE_ROUTES.softwareDevelopment,
        },
        {
          label: 'Development Services',
          href: SERVICE_PAGE_ROUTES.softwareDevelopment,
        },
        {
          label: 'Ecommerce CRO',
          href: SERVICE_PAGE_ROUTES.ecommerceCro,
        },
        {
          label: 'Ecommerce SEO',
          href: SERVICE_PAGE_ROUTES.ecommerceSeo,
        },
      ],
      description:
        'Byte Operator supports Magento and Adobe Commerce stores moving to Software or Enterprise Platform Solutions, coordinating data migration, storefront development, integrations, SEO migration and launch preparation.',
      primaryCta: {
        label: 'Get In Touch',
        href: SERVICE_PAGE_ROUTES.contact,
      },
    },
    about: {
      intro: {
        heading:
          'We are a Magento to platform & cloud migration agency for growing ecommerce brands.',
        description:
          'Byte Operator helps ecommerce teams move from Magento or Adobe Commerce to Software and Enterprise Platform Solutions with a clear plan for products, customers, orders, storefront requirements, SEO redirects and integrations. The project can continue beyond launch with practical development and support as the new store evolves.',
        cta: {
          label: 'Explore Migration Services',
          href: SERVICE_PAGE_ROUTES.softwareMigrations,
        },
      },
      media: {
        primary: '/images/services/services-wide.webp', primaryWidth: 1672, primaryHeight: 941,
        primaryAlt: 'Magento to platform & cloud migration planning',
        secondary: '/images/mega-menu-team.webp', secondaryWidth: 1970, secondaryHeight: 1306,
        secondaryAlt: 'Byte Operator team planning an ecommerce migration',
      },
      process: {
        heading: 'Our Magento to Platform & Cloud Migration Process',
        leftDescription:
          'We begin with discovery and scoping, reviewing the Magento store, catalogue, integrations, customer journeys and migration risks. This provides a practical plan for data transfer, the Software architecture and the work required before launch.',
        rightDescription:
          'The build moves through catalogue mapping, theme design and development, rehearsal and quality assurance before launch and stabilisation. Each stage is reviewed against the live-store requirements so the team has a clear route through migration.',
        cta: {
          label: 'Get In Touch',
          href: SERVICE_PAGE_ROUTES.contact,
        },
      },
    },
    features: [
      {
        id: 'magento-software-migrations-reasons',
        layout: 'media-left',
        spacing: 'first',
        theme: 'dark',
        eyebrow: 'Reasons to Migrate from Magento to Software',
        heading: 'Why Brands Move Away from Magento',
        description: [
          'Magento stores can require ongoing attention across hosting, updates, maintenance and store administration. A migration is an opportunity to review how the storefront and ecommerce operations can be managed more simply.',
          'Software provides a hosted platform and a broad ecommerce ecosystem, while Enterprise Platform Solutions can support brands with more complex operational, international or integration requirements.',
        ],
        buttons: [
          {label: 'Get In Touch', href: SERVICE_PAGE_ROUTES.contact},
        ],
        media: reuseHomeFeatureMedia('software-migrations'),
      },
      {
        id: 'magento-software-migrations-process',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Our Magento to Platform & Cloud Migration Process',
        heading: 'A Clear Path from Audit to Launch',
        description: [
          'Discovery and scoping establish the project objectives, required functionality and migration risks. Catalogue mapping and data-transfer planning then define how products, customers, orders, content and URLs should move into Software.',
          'Theme design and build are followed by rehearsal and quality assurance, then a controlled launch and stabilisation phase to review the new store in use.',
        ],
        buttons: [
          {
            label: 'Explore Migration Services',
            href: SERVICE_PAGE_ROUTES.softwareMigrations,
          },
        ],
        media: reuseHomeFeatureMedia('software-launch'),
      },
      {
        id: 'magento-software-migrations-data',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'How We Manage Magento to Software Data Migration',
        heading: 'Products, Customers and Orders',
        description: [
          'Data planning can cover products, collections and categories, variants, options, SKUs, images, customers, addresses and order history. CMS content, URL information and SEO-related data are also reviewed where relevant to the source store.',
          'Each transfer is validated after import. The scope is agreed against the Magento data model rather than assuming every field can move unchanged into Software.',
        ],
        buttons: [
          {label: 'Discuss Data Migration', href: SERVICE_PAGE_ROUTES.contact},
        ],
        media: reuseHomeFeatureMedia('software-development'),
      },
      {
        id: 'magento-software-migrations-seo',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Technical SEO & Search Architecture Migration',
        heading:
          'Protecting Search Visibility During a Magento to Platform & Cloud Migration',
        description: [
          'SEO migration work reviews Magento URL structures alongside Software architecture, redirect mapping, metadata, internal links and crawlability. Structured data and image alt text can be reviewed where they are available and relevant.',
          'Technical SEO QA and launch checks help identify redirects, missing pages and other search-critical issues as the new digital platform goes live.',
        ],
        buttons: [
          {
            label: 'Explore Ecommerce SEO Services',
            href: SERVICE_PAGE_ROUTES.ecommerceSeo,
          },
        ],
        media: reuseHomeFeatureMedia('software-seo-geo'),
      },
      {
        id: 'magento-software-migrations-support',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'Post-Migration Support and Maintenance',
        heading: 'Support After Launch',
        description: [
          'Post-launch support can cover quality assurance, migration fixes, performance review, SEO and redirect checks, integrations and apps as the new store settles into day-to-day use.',
          'Ongoing development and support can then help prioritise store improvements and future updates around the wider ecommerce roadmap.',
        ],
        buttons: [
          {label: 'Request a Quote', href: SERVICE_PAGE_ROUTES.contact},
        ],
        media: reuseHomeFeatureMedia('software-support-growth'),
      },
    ],
    showPartners: true,
  },
  'woocommerce-software-migrations': {
    faqTitle: 'WooCommerce to Platform & Cloud Migration',
    hero: {
      eyebrow: 'Migrate from WooCommerce to Software',
      heading: 'WooCommerce to Platform & Cloud Migration Services',
      chips: [
        {
          label: 'Migration Services',
          href: SERVICE_PAGE_ROUTES.softwareMigrations,
        },
        {
          label: 'Digital Platform Builds',
          href: SERVICE_PAGE_ROUTES.softwareDevelopment,
        },
        {
          label: 'Development Services',
          href: SERVICE_PAGE_ROUTES.softwareDevelopment,
        },
        {
          label: 'Ecommerce CRO',
          href: SERVICE_PAGE_ROUTES.ecommerceCro,
        },
        {
          label: 'Ecommerce SEO',
          href: SERVICE_PAGE_ROUTES.ecommerceSeo,
        },
      ],
      description:
        'Byte Operator supports businesses moving from WordPress and WooCommerce to Software or Enterprise Platform Solutions, coordinating migration planning, store data, storefront development, integrations, SEO migration and launch preparation.',
      primaryCta: {
        label: 'Get In Touch',
        href: SERVICE_PAGE_ROUTES.contact,
      },
    },
    about: {
      intro: {
        heading:
          'We are a WooCommerce to platform & cloud migration agency for growing ecommerce brands.',
        description:
          'Byte Operator helps teams move WooCommerce and WordPress stores to Software or Enterprise Platform Solutions with a practical plan for products, customers, orders, storefront requirements, integrations, SEO redirects and launch. We can continue with post-launch support as the new store develops.',
        cta: {
          label: 'Explore Migration Services',
          href: SERVICE_PAGE_ROUTES.softwareMigrations,
        },
      },
      media: {
        primary: '/images/services/services-wide.webp', primaryWidth: 1672, primaryHeight: 941,
        primaryAlt: 'WooCommerce to platform & cloud migration planning',
        secondary: '/images/mega-menu-team.webp', secondaryWidth: 1970, secondaryHeight: 1306,
        secondaryAlt: 'Byte Operator team planning a WooCommerce migration',
      },
      process: {
        heading: 'Our WooCommerce to Platform & Cloud Migration Process',
        leftDescription:
          'Preparation and planning establish the WooCommerce data, store requirements, integrations and customer journeys that need to be accounted for. This creates a clear migration scope before design, development and data work begin.',
        rightDescription:
          'The work then moves through data migration, theme design and development, testing and quality assurance, followed by launch and SEO checks. Each stage helps prepare the new digital platform for a controlled transition.',
        cta: {
          label: 'Start Your Migration',
          href: SERVICE_PAGE_ROUTES.contact,
        },
      },
    },
    features: [
      {
        id: 'woocommerce-software-migrations-comparison',
        layout: 'media-left',
        spacing: 'first',
        theme: 'dark',
        eyebrow: 'WooCommerce vs Software',
        heading: 'WooCommerce vs Software: Choosing the Right Ecommerce Platform',
        description: [
          'WooCommerce is built on WordPress and can offer flexibility through plugins and extensions, while hosting, updates and maintenance remain part of the store team’s technical responsibilities.',
          'Software provides a hosted ecommerce platform with central store administration, an app ecosystem and storefront and checkout tools. Enterprise Platform Solutions can be considered where larger operational requirements are involved.',
        ],
        buttons: [
          {
            label: 'WooCommerce vs Software',
            href: '/articles/woocommerce-vs-software-full-comparison/',
          },
        ],
        media: reuseHomeFeatureMedia('software-migrations'),
      },
      {
        id: 'woocommerce-software-migrations-reasons',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Reasons to Migrate from WooCommerce to Software',
        heading: 'Business Outcomes that Justify the Switch',
        description: [
          'A WooCommerce migration can reduce the ongoing responsibility for hosting, server management and WordPress or plugin maintenance. It is also an opportunity to simplify how ecommerce teams manage the store day to day.',
          'Software’s hosted platform, app ecosystem, checkout tools and store administration can support a more focused operating model, with Enterprise Platform Solutions available for relevant larger requirements.',
        ],
        buttons: [
          {label: 'Get In Touch', href: SERVICE_PAGE_ROUTES.contact},
        ],
        media: reuseHomeFeatureMedia('software-launch'),
      },
      {
        id: 'woocommerce-software-migrations-process',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'Our WooCommerce to Platform & Cloud Migration Process',
        heading: 'Step by Step Approach to Your Migration',
        description: [
          'The project begins with preparation and planning, then moves into data migration, theme design and development. The delivery team works from the agreed scope so platform requirements, content and integrations progress together.',
          'Testing and quality assurance are followed by launch and SEO checks, helping ensure key customer journeys, data and store signals have been reviewed before the new site goes live.',
        ],
        buttons: [
          {label: 'Start Your Migration', href: SERVICE_PAGE_ROUTES.contact},
        ],
        media: reuseHomeFeatureMedia('software-development'),
      },
      {
        id: 'woocommerce-software-migrations-data',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Data Migration: Products, Customers and Orders',
        heading: 'Transferring Your WooCommerce Store Data',
        description: [
          'Migration planning can cover products, titles and descriptions, variants, options, SKUs, prices, images, categories and collections, customers, addresses, orders and order history. Content, pages, blog posts, URLs, metadata and redirects can also be reviewed where appropriate.',
          'The exact scope depends on the source WooCommerce store and the agreed requirements; data is validated after transfer rather than assuming every field or data type will move unchanged.',
        ],
        buttons: [
          {label: 'Discuss Data Migration', href: SERVICE_PAGE_ROUTES.contact},
        ],
        media: reuseHomeFeatureMedia('software-seo-geo'),
      },
      {
        id: 'woocommerce-software-migrations-agency',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'Why Choose Byte Operator for a WooCommerce to Platform & Cloud Migration',
        heading: 'Planning, Development and Launch Support',
        description: [
          'Byte Operator connects migration planning, data requirements, software development and customer journeys so the new storefront reflects both the existing business and the direction it needs to take next.',
          'Integrations, SEO migration, quality assurance and post-launch support are considered as connected parts of the delivery process rather than separate handovers.',
        ],
        buttons: [
          {label: 'Work With Our Team', href: SERVICE_PAGE_ROUTES.contact},
        ],
        media: reuseHomeFeatureMedia('software-design'),
      },
      {
        id: 'woocommerce-software-migrations-seo',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Technical SEO & Search Architecture Migration',
        heading: 'SEO Migration',
        description: [
          'SEO migration reviews WooCommerce URLs alongside Software URL architecture, 301 redirects, metadata, internal links and crawlability. The work is planned with technical SEO QA and launch checks in mind.',
          'Reviewing these areas during delivery helps identify search-critical changes that need to be addressed as the new digital platform is prepared for launch.',
        ],
        buttons: [
          {
            label: 'Explore Ecommerce SEO Services',
            href: SERVICE_PAGE_ROUTES.ecommerceSeo,
          },
        ],
        media: reuseHomeFeatureMedia('software-plus'),
      },
      {
        id: 'woocommerce-software-migrations-support',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'Post-Migration Support and Maintenance',
        heading: 'Support Beyond Launch',
        description: [
          'After launch, Byte Operator can support quality assurance, development fixes, integrations and apps, redirect and technical SEO checks, and performance review as the new store settles into use.',
          'Ongoing software development and support can then help prioritise improvements and planned changes around the ecommerce roadmap.',
        ],
        buttons: [
          {
            label: 'Explore Support Options',
            href: SERVICE_PAGE_ROUTES.softwareMaintenance,
          },
        ],
        media: reuseHomeFeatureMedia('software-support-growth'),
      },
    ],
    showPartners: true,
  },
  'headless-commerce': {
    faqTitle: 'Headless Commerce Development',
    hero: {
      eyebrow: 'Headless Commerce Agency',
      heading:
        'Headless Commerce Development for High-Growth Ecommerce Brands',
      chips: [
        {
          label: 'Headless Software Development',
          href: SERVICE_PAGE_ROUTES.softwareDevelopment,
        },
        {
          label: 'Enterprise Platform Solutions',
          href: SERVICE_PAGE_ROUTES.softwarePlus,
        },
        {
          label: 'Hydrogen Storefronts',
          href: SERVICE_PAGE_ROUTES.softwareDevelopment,
        },
        {
          label: 'API Integrations',
          href: SERVICE_PAGE_ROUTES.softwareIntegrations,
        },
        {
          label: 'Conversion Optimisation',
          href: SERVICE_PAGE_ROUTES.ecommerceCro,
        },
      ],
      description:
        'Byte Operator plans and builds custom headless storefronts for Software and Enterprise Platform Solutions. Using Hydrogen, React and the Digital Platformfront API, we create flexible buying experiences around complex content, integration and international requirements without losing sight of day-to-day ecommerce operations.',
      primaryCta: {
        label: 'Discuss Your Headless Project',
        href: SERVICE_PAGE_ROUTES.contact,
      },
    },
    about: {
      intro: {
        heading:
          'Headless commerce makes sense when a standard theme no longer supports the experience your business needs.',
        description:
          'A headless architecture separates the customer-facing storefront from Software’s commerce platform. This can give established ecommerce teams greater control over content, interfaces and integrations, but it also introduces additional technical ownership. Byte Operator helps brands assess the commercial case, define the right architecture and build a storefront that remains practical to operate.',
        cta: {
          label: 'Explore Software Development',
          href: SERVICE_PAGE_ROUTES.softwareDevelopment,
        },
      },
      media: {
        primary: '/images/services/services-wide.webp', primaryWidth: 1672, primaryHeight: 941,
        primaryAlt: 'Planning a headless digital platformfront architecture',
        secondary: '/images/mega-menu-team.webp', secondaryWidth: 1970, secondaryHeight: 1306,
        secondaryAlt: 'Byte Operator team planning a Hydrogen development project',
      },
      process: {
        heading: 'Our Headless Commerce Development Process',
        leftDescription:
          'Discovery and architecture establish the business case, customer journeys, markets, content model and integration requirements. UX and technical planning then turn those priorities into a delivery roadmap before Hydrogen development begins.',
        rightDescription:
          'We connect the storefront to Software and required APIs, then complete quality assurance, accessibility and performance testing. Launch planning is followed by monitoring and ongoing optimisation so the new platform can continue to develop after release.',
        cta: {
          label: 'Plan Your Headless Build',
          href: SERVICE_PAGE_ROUTES.contact,
        },
      },
    },
    features: [
      {
        id: 'headless-commerce-comparison',
        layout: 'media-left',
        spacing: 'first',
        theme: 'dark',
        eyebrow: 'Traditional Software vs Headless Commerce',
        heading: 'Choosing the Right Storefront Architecture',
        description: [
          'A well-built Software theme is often the most efficient choice for stores with straightforward content, merchandising and integration needs. It keeps hosting, theme management and platform updates within a familiar operating model.',
          'Headless Software becomes useful when the storefront needs a highly tailored frontend, complex content experiences, multiple commerce touchpoints or deeper control over APIs and integrations. We help teams weigh that flexibility against the added development and maintenance responsibility.',
        ],
        buttons: [
          {
            label: 'Explore Software Development',
            href: SERVICE_PAGE_ROUTES.softwareDevelopment,
          },
        ],
        media: reuseHomeFeatureMedia('software-migrations'),
      },
      {
        id: 'headless-commerce-benefits',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'When Headless Commerce Makes Sense',
        heading: 'More Frontend Control for Complex Ecommerce Requirements',
        description: [
          'Headless ecommerce can support brands that need distinctive content and product journeys, custom account experiences, multi-market storefronts or connections to systems that do not fit neatly into a conventional theme.',
          'The value comes from shaping the frontend around real customer and operational needs. Architecture decisions are prioritised around maintainability, team workflows and measurable commercial goals rather than adopting headless technology for its own sake.',
        ],
        buttons: [
          {label: 'Talk to Our Team', href: SERVICE_PAGE_ROUTES.contact},
        ],
        media: reuseHomeFeatureMedia('software-launch'),
      },
      {
        id: 'headless-commerce-process',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'Headless Development Process',
        heading: 'From Architecture and UX to Launch and Optimisation',
        description: [
          'Our delivery process moves through discovery and architecture, UX and technical planning, Hydrogen development, Software and API integration, quality assurance and performance testing, then launch and ongoing optimisation.',
          'Each stage has a defined purpose and review point. This keeps business owners, designers and developers aligned while complex storefront, data and integration requirements are developed together.',
        ],
        buttons: [
          {label: 'Start Your Project', href: SERVICE_PAGE_ROUTES.contact},
        ],
        media: reuseHomeFeatureMedia('software-development'),
      },
      {
        id: 'headless-commerce-technology',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Hydrogen Storefront Technology',
        heading: 'A Software-Native Headless Technology Stack',
        description: [
          'Hydrogen provides a React-based framework for custom digital platformfronts, with Software’s Storefront API supplying commerce data and Oxygen providing a deployment option designed for Hydrogen applications.',
          'We structure frontend components, content delivery and API integrations so the storefront is fast to use and clear to maintain. Software or Enterprise Platform Solutions continues to manage core commerce operations while the headless frontend controls the customer experience.',
        ],
        buttons: [
          {
            label: 'Explore API & System Integrations',
            href: SERVICE_PAGE_ROUTES.softwareIntegrations,
          },
        ],
        media: reuseHomeFeatureMedia('software-seo-geo'),
      },
      {
        id: 'headless-commerce-agency',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'Why Work With Byte Operator',
        heading: 'Commerce, Frontend and Integration Thinking in One Team',
        description: [
          'A successful headless build needs more than frontend development. Byte Operator connects Software architecture, UX, conversion journeys, technical SEO and integration planning so decisions are considered across the whole ecommerce experience.',
          'We work with internal teams and technology partners to clarify ownership, document important decisions and create a delivery plan that supports both launch requirements and the longer-term storefront roadmap.',
        ],
        buttons: [
          {label: 'Work With Our Team', href: SERVICE_PAGE_ROUTES.contact},
        ],
        media: reuseHomeFeatureMedia('software-design'),
      },
      {
        id: 'headless-commerce-performance',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Performance and Conversion',
        heading: 'Fast, Conversion-Focused Headless Experiences',
        description: [
          'Headless architecture creates opportunities to control how storefront code, content and commerce data are delivered. We plan loading behaviour, responsive interfaces and customer journeys together to support strong ecommerce performance across devices.',
          'Performance is treated as an ongoing discipline rather than a launch claim. Measurement, technical SEO, analytics and conversion insights help identify where the storefront should be refined after real customers begin using it.',
        ],
        buttons: [
          {
            label: 'Explore Conversion Optimisation',
            href: SERVICE_PAGE_ROUTES.ecommerceCro,
          },
        ],
        media: reuseHomeFeatureMedia('software-plus'),
      },
      {
        id: 'headless-commerce-support',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'Headless Commerce Support',
        heading: 'Ongoing Development After Your Headless Launch',
        description: [
          'A custom storefront needs planned support across the frontend, software platform and connected services. Byte Operator can help with monitoring, maintenance, technical fixes and prioritised enhancements after launch.',
          'Ongoing support can also cover new market requirements, API changes, performance improvements and conversion work, giving ecommerce teams a practical route for evolving the Hydrogen storefront over time.',
        ],
        buttons: [
          {
            label: 'Explore Support Options',
            href: SERVICE_PAGE_ROUTES.softwareMaintenance,
          },
        ],
        media: reuseHomeFeatureMedia('software-support-growth'),
      },
    ],
    showPartners: true,
    experts: {
      eyebrow: 'Headless Software Engineering Experts',
      heading: 'Plan a Headless Storefront Around Your Growth Strategy',
      description:
        'Byte Operator helps ecommerce teams evaluate, design, build and support headless digital platformfronts. Talk to us about Hydrogen development, complex integrations or moving an existing store to a headless architecture.',
      ctaLabel: 'Get In Touch',
    },
  },
  'bigcommerce-software-migrations': {
    faqTitle: 'BigCommerce to Platform & Cloud Migration',
    hero: {
      eyebrow: 'Migrate from BigCommerce to Software',
      heading: 'BigCommerce to Platform & Cloud Migration Services',
      chips: [
        {
          label: 'Migration Services',
          href: SERVICE_PAGE_ROUTES.softwareMigrations,
        },
        {
          label: 'Digital Platform Builds',
          href: SERVICE_PAGE_ROUTES.softwareDevelopment,
        },
        {
          label: 'Development Services',
          href: SERVICE_PAGE_ROUTES.softwareDevelopment,
        },
        {
          label: 'Ecommerce CRO',
          href: SERVICE_PAGE_ROUTES.ecommerceCro,
        },
        {
          label: 'Ecommerce SEO',
          href: SERVICE_PAGE_ROUTES.ecommerceSeo,
        },
      ],
      description:
        'Byte Operator supports businesses moving or replatforming from BigCommerce to Software or Enterprise Platform Solutions, coordinating migration planning, store data, storefront development, integrations, SEO migration and launch preparation.',
      primaryCta: {
        label: 'Get In Touch',
        href: SERVICE_PAGE_ROUTES.contact,
      },
    },
    about: {
      intro: {
        heading:
          'We are a BigCommerce to platform & cloud migration agency for growing ecommerce brands.',
        description:
          'Byte Operator helps teams move BigCommerce stores to Software or Enterprise Platform Solutions with a practical plan for products, customers, orders, storefront and theme requirements, integrations, SEO redirects and launch. We can continue with post-launch support as the new store develops.',
        cta: {
          label: 'Explore Migration Services',
          href: SERVICE_PAGE_ROUTES.softwareMigrations,
        },
      },
      media: {
        primary: '/images/services/services-wide.webp', primaryWidth: 1672, primaryHeight: 941,
        primaryAlt: 'BigCommerce to platform & cloud migration planning',
        secondary: '/images/mega-menu-team.webp', secondaryWidth: 1970, secondaryHeight: 1306,
        secondaryAlt: 'Byte Operator team planning a BigCommerce migration',
      },
      process: {
        heading: 'Our Proven BigCommerce to Platform & Cloud Migration Process',
        leftDescription:
          'Preparation and planning establish the BigCommerce catalogue, store data, integrations and customer journeys that need to be accounted for. This creates a clear migration scope before design, development and data work begin.',
        rightDescription:
          'The work then moves through data migration, theme design and development, testing and quality assurance, followed by launch and SEO checks. Each stage helps prepare the new digital platform for a controlled transition.',
        cta: {
          label: 'Start Your Migration',
          href: SERVICE_PAGE_ROUTES.contact,
        },
      },
    },
    features: [
      {
        id: 'bigcommerce-software-migrations-comparison',
        layout: 'media-left',
        spacing: 'first',
        theme: 'dark',
        eyebrow: 'BigCommerce vs Software',
        heading:
          'BigCommerce vs Software: Choosing the Right Ecommerce Platform',
        description: [
          'BigCommerce is an ecommerce platform with built-in functionality for catalogue management and integrations, and store teams work within its administration and configuration model to run the storefront day to day.',
          'Software provides a hosted ecommerce platform with central store administration, a theme and storefront ecosystem, and an app and integration ecosystem. Enterprise Platform Solutions can be considered where more complex operational requirements are involved.',
        ],
        buttons: [
          {
            label: 'BigCommerce vs Software',
            href: '/articles/software-vs-bigcommerce-head-to-head-comparison/',
          },
        ],
        media: reuseHomeFeatureMedia('software-migrations'),
      },
      {
        id: 'bigcommerce-software-migrations-reasons',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Reasons to Migrate from BigCommerce to Software',
        heading: 'Business Outcomes that Justify the Switch',
        description: [
          'A BigCommerce migration is often driven by a need to simplify how the store is managed day to day, and to gain more flexibility in how the storefront is designed, developed and extended over time.',
          'Software’s hosted platform, app and integration ecosystem, checkout and store tools can support a more focused operating model, with Enterprise Platform Solutions available where future development needs and larger requirements are relevant.',
        ],
        buttons: [
          {label: 'Get In Touch', href: SERVICE_PAGE_ROUTES.contact},
        ],
        media: reuseHomeFeatureMedia('software-launch'),
      },
      {
        id: 'bigcommerce-software-migrations-process',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'Our Proven BigCommerce to Platform & Cloud Migration Process',
        heading: 'Step by Step Approach to Your Migration',
        description: [
          'The project begins with preparation and planning, then moves into data migration, theme design and development. The delivery team works from the agreed scope so platform requirements, content and integrations progress together.',
          'Testing and quality assurance are followed by launch and SEO checks, helping ensure key customer journeys, store data and search signals have been reviewed before the new site goes live.',
        ],
        buttons: [
          {label: 'Start Your Migration', href: SERVICE_PAGE_ROUTES.contact},
        ],
        media: reuseHomeFeatureMedia('software-development'),
      },
      {
        id: 'bigcommerce-software-migrations-data',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'How We Manage BigCommerce to Software Data Migration',
        heading: 'Protecting Products, Customers and Orders',
        description: [
          'Migration planning can cover products, descriptions, SKUs, prices, variants and options, images, categories and collections, customers, customer addresses, and historical orders. CMS content, URLs, metadata and redirects can also be reviewed where appropriate.',
          'The exact scope depends on the source BigCommerce implementation and the agreed requirements; migrated data is validated after transfer rather than assuming every field will move across automatically.',
        ],
        buttons: [
          {label: 'Discuss Data Migration', href: SERVICE_PAGE_ROUTES.contact},
        ],
        media: reuseHomeFeatureMedia('software-seo-geo'),
      },
      {
        id: 'bigcommerce-software-migrations-agency',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'Why Choose Byte Operator for a BigCommerce to Platform & Cloud Migration',
        heading: 'Planning, Development and Launch Support',
        description: [
          'Byte Operator connects migration planning, data requirements, software development and storefront customer journeys so the new store reflects both the existing business and the direction it needs to take next.',
          'Integrations, SEO migration, quality assurance and post-launch support are considered as connected parts of the delivery process rather than separate handovers.',
        ],
        buttons: [
          {label: 'Work With Our Team', href: SERVICE_PAGE_ROUTES.contact},
        ],
        media: reuseHomeFeatureMedia('software-design'),
      },
      {
        id: 'bigcommerce-software-migrations-seo',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Technical SEO & Search Architecture Migration',
        heading: 'SEO Migration',
        description: [
          'SEO migration reviews BigCommerce URLs alongside Software URL structure, redirect mapping, 301 redirects, metadata, internal links and crawlability. The work is planned with technical SEO QA and launch checks in mind.',
          'Reviewing these areas during delivery helps identify search-critical changes that need to be addressed as the new digital platform is prepared for launch.',
        ],
        buttons: [
          {
            label: 'Explore Ecommerce SEO Services',
            href: SERVICE_PAGE_ROUTES.ecommerceSeo,
          },
        ],
        media: reuseHomeFeatureMedia('software-plus'),
      },
      {
        id: 'bigcommerce-software-migrations-support',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'Post-Migration Support and Maintenance',
        heading: 'Keeping Your Digital Platform Supported After Launch',
        description: [
          'After launch, Byte Operator can support quality assurance, development fixes, redirect and SEO checks, apps and integrations, and performance review as the new store settles into use.',
          'Ongoing software development and support can then help prioritise store updates and planned improvements around the ecommerce roadmap.',
        ],
        buttons: [
          {
            label: 'Explore Support Options',
            href: SERVICE_PAGE_ROUTES.softwareMaintenance,
          },
        ],
        media: reuseHomeFeatureMedia('software-support-growth'),
      },
    ],
    showPartners: true,
  },
  'salesforce-software-migrations': {
    faqTitle: 'Salesforce Commerce Cloud to Platform & Cloud Migration',
    hero: {
      eyebrow: 'Migrate from Salesforce Commerce Cloud to Software',
      heading: 'Salesforce to Platform & Cloud Migration Services',
      chips: [
        {
          label: 'Migration Services',
          href: SERVICE_PAGE_ROUTES.softwareMigrations,
        },
        {
          label: 'Digital Platform Builds',
          href: SERVICE_PAGE_ROUTES.softwareDevelopment,
        },
        {
          label: 'Development Services',
          href: SERVICE_PAGE_ROUTES.softwareDevelopment,
        },
        {
          label: 'Ecommerce CRO',
          href: SERVICE_PAGE_ROUTES.ecommerceCro,
        },
        {
          label: 'Ecommerce SEO',
          href: SERVICE_PAGE_ROUTES.ecommerceSeo,
        },
      ],
      description:
        'Byte Operator supports businesses moving from Salesforce Commerce Cloud to Software or Enterprise Platform Solutions, coordinating migration planning, ecommerce data, storefront development, integrations, SEO migration, testing and launch preparation.',
      primaryCta: {
        label: 'Get In Touch',
        href: SERVICE_PAGE_ROUTES.contact,
      },
    },
    about: {
      intro: {
        heading:
          'We are a Salesforce to platform & cloud migration agency for scaling ecommerce brands.',
        description:
          'Byte Operator helps teams move Salesforce Commerce Cloud stores to Software or Enterprise Platform Solutions with a practical plan for catalogue and product data, customers, order history, storefront requirements, integrations, SEO redirects, testing and launch. We can continue with post-launch support as the new store develops.',
        cta: {
          label: 'Explore Migration Services',
          href: SERVICE_PAGE_ROUTES.softwareMigrations,
        },
      },
      media: {
        primary: '/images/services/services-wide.webp', primaryWidth: 1672, primaryHeight: 941,
        primaryAlt: 'Salesforce Commerce Cloud to platform & cloud migration planning',
        secondary: '/images/mega-menu-team.webp', secondaryWidth: 1970, secondaryHeight: 1306,
        secondaryAlt: 'Byte Operator team planning a Salesforce Commerce Cloud migration',
      },
      process: {
        heading: 'Our Salesforce Commerce Cloud to Platform & Cloud Migration Process',
        leftDescription:
          'Discovery and planning establish the Salesforce Commerce Cloud catalogue, ecommerce data, custom integrations and customer journeys that need to be accounted for. This creates a clear migration scope before design, development and data work begin.',
        rightDescription:
          'The work then moves through data preparation and transfer, theme design and development, QA, testing and validation, followed by launch and post-launch support. Each stage helps prepare the new digital platform for a controlled transition.',
        cta: {
          label: 'Start Your Migration',
          href: SERVICE_PAGE_ROUTES.contact,
        },
      },
    },
    features: [
      {
        id: 'salesforce-software-migrations-comparison',
        layout: 'media-left',
        spacing: 'first',
        theme: 'dark',
        eyebrow: 'Salesforce vs Software',
        heading:
          'Salesforce Commerce Cloud vs Software: Choosing the Right Ecommerce Platform',
        description: [
          'Salesforce Commerce Cloud is aimed at enterprise ecommerce requirements, and stores built on it often involve catalogue and workflow complexity, custom integrations, specialist development resource and ongoing technical administration.',
          'Software provides a hosted ecommerce platform with central store administration, a storefront and theme ecosystem, an app and integration ecosystem, and APIs for custom development where required. Enterprise Platform Solutions can be considered where more complex ecommerce requirements are involved.',
        ],
        // No Salesforce comparison article exists yet; add the button with it.
        buttons: [],
        media: reuseHomeFeatureMedia('software-migrations'),
      },
      {
        id: 'salesforce-software-migrations-reasons',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Reasons to Migrate from Salesforce Commerce Cloud to Software',
        heading: 'Why Ecommerce Teams Consider Software',
        description: [
          'A Salesforce Commerce Cloud migration is often considered to reduce platform complexity and, where appropriate, the dependency on specialist development resource for routine storefront and merchandising changes.',
          'Software’s hosted operations, store administration, storefront development model and app and integration ecosystem can support easier day-to-day management, with Enterprise Platform Solutions available where larger requirements and future store development are relevant.',
        ],
        buttons: [
          {label: 'Get In Touch', href: SERVICE_PAGE_ROUTES.contact},
        ],
        media: reuseHomeFeatureMedia('software-launch'),
      },
      {
        id: 'salesforce-software-migrations-process',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'Our Salesforce Commerce Cloud to Platform & Cloud Migration Process',
        heading: 'Step by Step Approach to Your Migration',
        description: [
          'The project begins with discovery and planning, then moves into data preparation and transfer alongside theme design and development. The delivery team works from the agreed scope so platform requirements, content and integrations progress together.',
          'QA, testing and validation are followed by launch and post-launch support, helping ensure key customer journeys, ecommerce data and search signals have been reviewed before and after the new site goes live.',
        ],
        buttons: [
          {label: 'Start Your Migration', href: SERVICE_PAGE_ROUTES.contact},
        ],
        media: reuseHomeFeatureMedia('software-development'),
      },
      {
        id: 'salesforce-software-migrations-data',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Salesforce to Software Data Migration',
        heading: 'Products, Customers and Orders',
        description: [
          'Migration planning can cover products, variants, attributes and options, SKUs, pricing, images, categories and Software collections, customer records, addresses and order history. Content and pages, URLs, metadata and redirect requirements can also be reviewed where appropriate.',
          'Not every Salesforce Commerce Cloud field can be migrated automatically, and the exact scope depends on the existing store architecture and the agreed requirements. Migrated data is validated and tested after transfer rather than assumed to be complete.',
        ],
        buttons: [
          {label: 'Discuss Data Migration', href: SERVICE_PAGE_ROUTES.contact},
        ],
        media: reuseHomeFeatureMedia('software-seo-geo'),
      },
      {
        id: 'salesforce-software-migrations-agency',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'Why Choose Byte Operator for a Salesforce to Platform & Cloud Migration',
        heading: 'Planning, Development and Launch Support',
        description: [
          'Byte Operator connects migration planning, data architecture, software development and storefront customer journeys so the new store reflects both the existing business and the direction it needs to take next.',
          'Integrations, technical SEO, QA and testing, launch support and post-launch development are treated as connected parts of the delivery process rather than separate handovers.',
        ],
        buttons: [
          {label: 'Work With Our Team', href: SERVICE_PAGE_ROUTES.contact},
        ],
        media: reuseHomeFeatureMedia('software-design'),
      },
      {
        id: 'salesforce-software-migrations-seo',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Salesforce to Technical SEO & Search Architecture Migration',
        heading: 'Protecting Search Visibility During Replatforming',
        description: [
          'SEO migration reviews existing Salesforce Commerce Cloud URLs alongside Software URL structure, 301 redirect mapping, metadata, internal links, crawlability and structured data where applicable.',
          'Technical SEO QA and launch checks are planned into delivery, helping identify search-critical changes that need to be addressed as the new digital platform is prepared for launch.',
        ],
        buttons: [
          {
            label: 'Explore Ecommerce SEO Services',
            href: SERVICE_PAGE_ROUTES.ecommerceSeo,
          },
        ],
        media: reuseHomeFeatureMedia('software-plus'),
      },
      {
        id: 'salesforce-software-migrations-support',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'Post-Migration Support and Maintenance',
        heading: 'Supporting Your Digital Platform After Launch',
        description: [
          'After launch, Byte Operator can support quality assurance, migration fixes, integrations and apps, redirect and SEO checks, storefront development and performance review as the new store settles into use.',
          'Ongoing software development and support can then help prioritise future improvements and planned changes around the ecommerce roadmap.',
        ],
        buttons: [
          {
            label: 'Explore Support Options',
            href: SERVICE_PAGE_ROUTES.softwareMaintenance,
          },
        ],
        media: reuseHomeFeatureMedia('software-support-growth'),
      },
    ],
    showPartners: true,
  },
  'software-migrations': {
    faqTitle: 'Platform & Cloud Migration Agency',
    hero: {
      eyebrow: 'Platform & Cloud Migration Agency Services',
      heading:
        'platform & cloud migration services for ecommerce stores moving to Software and Enterprise Platform Solutions.',
      chips: [
        {
          label: 'Software Development',
          href: SERVICE_PAGE_ROUTES.softwareDevelopment,
        },
        {
          label: 'Ecommerce SEO Migrations',
          href: SERVICE_PAGE_ROUTES.seoMigrations,
        },
        {
          label: 'UI/UX & Product Design',
          href: SERVICE_PAGE_ROUTES.softwareWebDesign,
        },
        {
          label: 'Support & Maintenance',
          href: SERVICE_PAGE_ROUTES.softwareMaintenance,
        },
      ],
      bottomLogo: {
        text: 'Byte Operator',
        src: '/images/home-services/badges/logo-launch-white.svg', width: 130, height: 50,
        alt: 'Launch',
      },
      description:
        'Byte Operator supports ecommerce migrations to Software and Enterprise Platform Solutions, bringing together planning, storefront development, data migration, integrations, technical SEO considerations and launch preparation.',
      primaryCta: {
        label: 'Get In Touch',
        href: SERVICE_PAGE_ROUTES.contact,
      },
    },
    about: {
      intro: {
        heading:
          'platform & cloud migrations planned around the store, data and customer experience you need to carry forward.',
        descriptionHtml: `Byte Operator supports ecommerce brands moving or replatforming from <a href="/magento-software-migrations/">Magento</a>, <a href="/woocommerce-software-migrations/">WooCommerce</a>, <a href="/bigcommerce-software-migrations/">BigCommerce</a>, <a href="/salesforce-software-migrations/">Salesforce</a> and other ecommerce platforms to Software or Enterprise Platform Solutions.`,
        cta: {
          label: 'Get In Touch',
          href: SERVICE_PAGE_ROUTES.contact,
        },
      },
      media: {
        primary: '/images/services/services-wide.webp', primaryWidth: 1672, primaryHeight: 941,
        primaryAlt: 'platform & cloud migration planning session',
        secondary: '/images/mega-menu-team.webp', secondaryWidth: 1970, secondaryHeight: 1306,
        secondaryAlt: 'Byte Operator team planning an ecommerce migration',
      },
      // A future MigrationPlatformsAccordion belongs after this section and
      // before the feature sequence in ServiceDetailPage.
      process: {
        heading: 'Our platform & cloud migration process',
        leftDescription:
          'We begin with discovery to understand the current platform, business objectives, functionality, data and risks. This creates a practical migration plan that connects architecture, storefront requirements and launch preparation.',
        rightDescription:
          'The work then moves through data analysis, design and development, imports, integrations and SEO planning. Each stage is reviewed against the next so the new digital platform is prepared for testing, launch and continued improvement.',
        cta: {
          label: 'Get In Touch',
          href: SERVICE_PAGE_ROUTES.contact,
        },
      },
    },
    platforms: {
  heading: 'Platforms we migrate from',
  eyebrow: 'Platforms',
  items: [
    {
      title: 'Magento',
      descriptionHtml: `
        <p>
          Byte Operator supports ecommerce teams moving from Magento to Software or Enterprise Platform Solutions, including storefront requirements, product and customer data, integrations and launch planning. Learn more about our <a href="/magento-software-migrations/">Magento to platform & cloud migrations</a>.
        </p>
      `,
      cta: {
        label: 'Magento to Platform & Cloud Migration',
        href: '/magento-software-migrations/',
      },
    },
    {
      title: 'WooCommerce',
      descriptionHtml: `
        <p>
          We support businesses moving from WordPress and WooCommerce to Software, with migration planning covering store data, storefront functionality, integrations and the customer experience. Learn more about our <a href="/woocommerce-software-migrations/">WooCommerce migration services</a>.
        </p>
      `,
      cta: {
        label: 'WooCommerce to Platform & Cloud Migration',
        href: '/woocommerce-software-migrations/',
      },
    },
    {
      title: 'BigCommerce',
      descriptionHtml: `
        <p>
          Byte Operator can support a move from BigCommerce to Software or Enterprise Platform Solutions, including data requirements, theme development, integrations and launch preparation. Learn more about our <a href="/bigcommerce-software-migrations/">BigCommerce to platform & cloud migration services</a>.
        </p>
      `,
      cta: {
        label: 'BigCommerce to Platform & Cloud Migration',
        href: '/bigcommerce-software-migrations/',
      },
    },
    {
      title: 'Custom Platforms',
      descriptionHtml: `
        <p>
          Businesses using custom ecommerce platforms can move to Software with a migration plan built around their existing data, storefront requirements, integrations and operational needs.
        </p>
      `,
      cta: {
        label: 'Get In Touch',
        href: SERVICE_PAGE_ROUTES.contact,
      },
    },
    {
      title: 'Salesforce',
      descriptionHtml: `
        <p>
          Byte Operator can support businesses moving from Salesforce Commerce Cloud to Enterprise Platform Solutions, including storefront development, ecommerce data, integrations and migration planning. Learn more about our <a href="/salesforce-software-migrations/">Salesforce to platform & cloud migrations</a>.
        </p>
      `,
      cta: {
        label: 'Salesforce vs Software',
        href: '/salesforce-software-migrations/',
      },
    },
    {
      title: 'More',
      descriptionHtml: `
        <p>
          Migration requirements are not limited to the platforms listed above. Byte Operator can review moves from other ecommerce systems, including Visualsoft, as well as custom or less common platforms.
        </p>
      `,
      cta: {
        label: 'Get In Touch',
        href: SERVICE_PAGE_ROUTES.contact,
      },
    },
  ],
},
    features: [
      {
        id: 'software-migrations-discovery',
        layout: 'media-left',
        spacing: 'first',
        theme: 'dark',
        eyebrow: 'Platform & Cloud Migration Discovery',
        heading: 'Discovery',
        description: [
          'Migration discovery reviews the current platform, business goals, customer journeys and the functionality the new digital platform needs to support.',
          'We identify dependencies, migration risks and project priorities early so the delivery plan is grounded in the way the business operates.',
        ],
        buttons: [
          {label: 'Get In Touch', href: SERVICE_PAGE_ROUTES.contact},
        ],
        media: reuseHomeFeatureMedia('software-launch'),
      },
      {
        id: 'software-migrations-data-architecture',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Migration Data Planning',
        heading: 'Data Analysis & Architecture',
        description: [
          'We analyse products, customers, orders, collections, content and URLs to understand what needs to move and how it should be structured in Software.',
          'This work helps establish practical data requirements, content ownership and a store architecture that supports the new catalogue and customer experience.',
        ],
        buttons: [
          {label: 'Explore Case Studies', href: SERVICE_PAGE_ROUTES.work},
        ],
        media: reuseHomeFeatureMedia('software-migrations'),
      },
      {
        id: 'software-migrations-theme-development',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'Digital Platformfront Build',
        heading: 'Theme Design & Development',
        description: [
          'The new digital platformfront is designed and developed around the agreed customer journeys, content and merchandising needs. Key templates and reusable sections are built for a responsive experience across devices.',
          'Required storefront functionality is planned alongside the theme so the implementation supports both launch requirements and future development.',
        ],
        buttons: [
          {
            label: 'Explore Development Services',
            href: SERVICE_PAGE_ROUTES.softwareDevelopment,
          },
        ],
        media: reuseHomeFeatureMedia('software-design'),
      },
      {
        id: 'software-migrations-data-integrations',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Data Import & Integrations',
        heading: 'Data Import & System Integrations',
        description: [
          'Data transfer is coordinated with the required ecommerce tools and operational systems, including the services that support fulfilment, customer service, marketing and reporting.',
          'We plan imports and integrations around the agreed data structure, then test relevant flows before launch.',
        ],
        buttons: [
          {label: 'Get In Touch', href: SERVICE_PAGE_ROUTES.contact},
        ],
        media: reuseHomeFeatureMedia('software-development'),
      },
      {
        id: 'software-migrations-seo',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'Ecommerce SEO Migration',
        heading: 'SEO Migration',
        description: [
          'SEO migration planning considers URLs, redirects, metadata, crawlability and internal linking as the new digital platform takes shape.',
          'Technical SEO checks are coordinated with content and development changes so important search signals are reviewed before and after launch.',
        ],
        buttons: [
          {
            label: 'Explore SEO Migrations',
            href: SERVICE_PAGE_ROUTES.seoMigrations,
          },
          {
            label: 'Book a Call',
            calendly: true,
          },
        ],
        media: reuseHomeFeatureMedia('software-seo-geo'),
      },
      {
        id: 'software-migrations-support-growth',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Post-Migration Support',
        heading: 'Post-Migration Support & Growth',
        description: [
          'After launch, Byte Operator can support post-migration checks, fixes and planned improvements as the team begins using the new digital platform.',
          'Ongoing development support can help prioritise future updates, performance work and storefront changes as requirements evolve.',
        ],
        buttons: [
          {
            label: 'Explore Retainers',
            href: SERVICE_PAGE_ROUTES.softwareMaintenance,
          },
        ],
        media: reuseHomeFeatureMedia('software-support-growth'),
      },
    ],
    showPartners: true,
  },
  'software-theme-development-builds': {
    faqTitle: 'Custom Frontend & Web Development',
    hero: {
      eyebrow: 'Software Theme Design and Build Projects',
      heading:
        'Custom Custom frontend & web development for Software and Enterprise Platform Solutions projects',
      chips: [
        {label: 'AI-enabled', href: SERVICE_PAGE_ROUTES.ai},
        {
          label: 'Technical SEO & Search Architecture Agency',
          href: SERVICE_PAGE_ROUTES.softwareSeo,
        },
        {
          label: 'Digital Platform Builds',
          href: SERVICE_PAGE_ROUTES.softwareDevelopment,
        },
        {
          label: 'Development Services',
          href: SERVICE_PAGE_ROUTES.softwareDevelopment,
        },
        {
          label: 'Ecommerce CRO',
          href: SERVICE_PAGE_ROUTES.ecommerceCro,
        },
      ],
      bottomLogo: {
        text: 'Byte Operator',
        src: '/images/home-services/badges/logo-launch-white.svg', width: 130, height: 50,
        alt: 'Launch',
      },
      description:
        'Byte Operator plans and delivers Software and Enterprise Platform Solutions theme projects, from bespoke builds to tailored existing-theme work, with performance, usability and sustainable growth in mind.',
      primaryCta: {
        label: 'Tell Us About Your Project',
        href: SERVICE_PAGE_ROUTES.contact,
      },
    },
    about: {
      intro: {
        heading:
          'We launch digital platforms & applications with experience, quality, performance & growth in mind for both template and bespoke Software themes.',
        description:
          'Byte Operator helps brands choose the right approach for their Software theme project, whether that means a bespoke build or focused work within an existing theme. We turn project goals, content and customer needs into a clear plan for a useful, maintainable storefront.',
        cta: {
          label: 'Get In Touch',
          href: SERVICE_PAGE_ROUTES.contact,
        },
      },
      media: {
        primary: '/images/services/services-wide.webp', primaryWidth: 1672, primaryHeight: 941,
        primaryAlt: 'Custom frontend & web development project',
        secondary: '/images/mega-menu-team.webp', secondaryWidth: 1970, secondaryHeight: 1306,
        secondaryAlt: 'Byte Operator team planning a Software project',
      },
      process: {
        heading: 'Our proven process',
        leftDescription:
          'We start with discovery, design direction and technical planning, agreeing the customer journeys, theme approach and requirements before development begins. Responsive implementation, performance and technical SEO are considered throughout the build rather than left until launch.',
        rightDescription:
          'Development moves through focused QA across templates, devices and key store journeys before launch. Once live, we can support performance reviews, technical SEO improvements and planned updates as the storefront, catalogue and business continue to grow.',
        cta: {
          label: 'Get In Touch',
          href: SERVICE_PAGE_ROUTES.contact,
        },
      },
    },
    features: [
      {
        id: 'theme-development-store-projects',
        layout: 'media-left',
        spacing: 'first',
        theme: 'dark',
        eyebrow: 'Bespoke & Template Themes',
        heading: 'Digital Platform Theme Projects',
        description: [
          'Byte Operator delivers Software theme projects that fit the needs of the brand, catalogue and ecommerce team. This can include a bespoke storefront built around a defined design system or carefully customised work within an established Software theme.',
          'The chosen route is planned around customer experience, operational needs and the flexibility required after launch.',
        ],
        buttons: [
          {label: 'Explore Case Studies', href: SERVICE_PAGE_ROUTES.work},
        ],
        media: reuseHomeFeatureMedia('software-launch'),
      },
      {
        id: 'theme-development-discovery',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Discovery, Strategy & Planning',
        heading: 'Software Theme Projects',
        description: [
          'Every project begins by understanding the business, content, products, customer journeys and technical requirements. This gives the team a practical brief for the theme, integrations and the templates that matter most.',
          'Planning early helps align design and development decisions before work moves into detailed delivery.',
        ],
        buttons: [
          {label: 'Get In Touch', href: SERVICE_PAGE_ROUTES.contact},
        ],
        media: reuseHomeFeatureMedia('software-seo-geo'),
      },
      {
        id: 'theme-development-design',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'Store design and customer journeys',
        heading: 'Software Theme Design',
        description: [
          'Software theme design brings brand direction, product discovery and customer journeys together across key templates. We consider navigation, merchandising, content hierarchy and the actions that help customers move confidently through the store.',
          'Desktop and mobile experiences are designed as part of the same system, so responsive behaviour is clear before development starts.',
        ],
        buttons: [
          {label: 'Explore Case Studies', href: SERVICE_PAGE_ROUTES.work},
        ],
        media: reuseHomeFeatureMedia('software-design'),
      },
      {
        id: 'theme-development-architecture',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Development & architecture',
        heading: 'Custom Custom Frontend & Web Development',
        description: [
          'We translate approved designs into reusable Software sections, templates and components that give ecommerce teams useful control over content without losing consistency across the storefront.',
          'Theme architecture is organised for maintainability, performance and future development, with technical SEO and relevant integrations considered alongside the customer-facing experience.',
        ],
        buttons: [
          {label: 'Get In Touch', href: SERVICE_PAGE_ROUTES.contact},
        ],
        media: reuseHomeFeatureMedia('software-development'),
      },
      {
        id: 'theme-development-qa-launch',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'Quality Assurance & Launch',
        heading: 'Custom Custom Frontend & Web Development',
        description: [
          'Before launch, we review key templates, responsive layouts, customer journeys and relevant integrations through focused quality assurance. This includes practical checks of navigation, product discovery, cart behaviour, forms and content management.',
          'Performance and technical SEO are reviewed alongside the final release so the new theme has a stable, considered foundation when it goes live.',
        ],
        buttons: [
          {label: 'Tell Us About Your Project', href: SERVICE_PAGE_ROUTES.contact},
        ],
        media: reuseHomeFeatureMedia('software-migrations'),
      },
      {
        id: 'theme-development-support-growth',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Post-Launch Growth Strategy',
        heading: 'Software Support & Growth',
        description: [
          'After launch, Byte Operator can support ongoing theme updates, performance improvements and technical changes as new products, campaigns and customer needs emerge.',
          'A planned roadmap helps prioritise practical development work alongside conversion, SEO and storefront improvements over time.',
        ],
        buttons: [
          {
            label: 'Explore Retainers',
            href: SERVICE_PAGE_ROUTES.softwareMaintenance,
          },
        ],
        media: reuseHomeFeatureMedia('software-support-growth'),
      },
    ],
    showPartners: true,
  },
  'agentic-commerce': {
    faqTitle: 'Agentic Commerce Agency',
    hero: {
      eyebrow: 'Agentic Commerce Agency',
      heading:
        'Prepare Your Brand for Agentic Commerce, the Future of AI-Powered Shopping',
      chips: [
        {label: 'GEO Services', href: SERVICE_PAGE_ROUTES.ecommerceGeo},
        {
          label: 'Development Services',
          href: SERVICE_PAGE_ROUTES.softwareDevelopment,
        },
        {
          label: 'Ecommerce SEO',
          href: SERVICE_PAGE_ROUTES.ecommerceSeo,
        },
        {
          label: 'AI Ecommerce Agency',
          href: SERVICE_PAGE_ROUTES.ecommerceAiSeo,
        },
      ],
      bottomLogo: {
        src: '/images/byte-operator-logo.svg', width: 842, height: 298,
        alt: 'Byte Operator',
      },
      description:
        'AI shopping agents can discover, compare and evaluate ecommerce products. Byte Operator helps prepare your Software brand with clear product information, structured data and catalogue content that is easier for machine-assisted shopping experiences to understand.',
      primaryCta: {
        label: 'Get In Touch',
        href: SERVICE_PAGE_ROUTES.contact,
      },
    },
    about: {
      intro: {
        heading:
          'We Help Ecommerce Brands Prepare for AI-Powered Shopping',
        description:
          'AI shopping agents are changing how products can be discovered and evaluated across platforms such as ChatGPT, Google Gemini and Microsoft Copilot. Byte Operator helps Software and Enterprise Platform Solutions brands review the structured ecommerce data, product attributes, catalogue quality and machine-readable information that support AI-search visibility and future readiness.',
        cta: {
          label: 'Get In Touch',
          href: SERVICE_PAGE_ROUTES.contact,
        },
      },
      media: {
        primary: '/images/services/services-wide.webp', primaryWidth: 1672, primaryHeight: 941,
        primaryAlt: 'Byte Operator ecommerce strategy planning',
        secondary: '/images/mega-menu-team.webp', secondaryWidth: 1970, secondaryHeight: 1306,
        secondaryAlt: 'Byte Operator team discussing ecommerce data',
      },
      process: {
        heading: 'A practical foundation for changing shopping journeys.',
        leftDescription:
          'We begin by reviewing how products, variants, attributes and content are organised across the store. This identifies where catalogue structure, schema, product information and supporting content may need more clarity for people and machine-assisted discovery alike.',
        rightDescription:
          'The resulting work can combine technical Software improvements, structured product data, ecommerce SEO and content planning. Priorities are shaped around the current catalogue and the areas of the store that need the strongest, most consistent information.',
        cta: {
          label: 'Get In Touch',
          href: SERVICE_PAGE_ROUTES.contact,
        },
      },
    },
    features: [
      {
        id: 'agentic-commerce-storefront-readiness',
        layout: 'media-left',
        spacing: 'first',
        theme: 'dark',
        eyebrow: 'Agentic Commerce Readiness',
        heading: 'Agentic Storefronts Are Coming. Will Your Store Be Ready?',
        description: [
          'AI-assisted commerce depends on digital platformfront and product data being clear, current and consistently structured. Product availability, structured attributes and accurate information all help establish a more useful foundation for emerging shopping experiences.',
          'Preparing the underlying ecommerce data now can make it easier to adapt as shoppers use more AI-assisted tools to research, compare and evaluate products.',
        ],
        buttons: [{label: 'Get In Touch', href: SERVICE_PAGE_ROUTES.contact}],
        media: reuseHomeFeatureMedia('software-development'),
      },
      {
        id: 'agentic-commerce-readiness-audits',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Readiness Audits',
        heading: 'Agentic Readiness Audits',
        description: [
          'A readiness audit reviews catalogue structure, product-data quality, attributes, taxonomy consistency and content completeness. It can also assess GTIN availability where applicable and the existing schema implementation across important product and collection pages.',
          'The review identifies data and content gaps, then provides prioritised recommendations that fit the current digital platform and catalogue.',
        ],
        buttons: [
          {label: 'Book a Readiness Audit', href: SERVICE_PAGE_ROUTES.contact},
        ],
        media: reuseHomeFeatureMedia('software-seo-geo'),
      },
      {
        id: 'agentic-commerce-structured-data',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'Data Foundation',
        heading: 'Structured Data & Feed Optimisation',
        description: [
          'Structured product data, feeds and schema.org markup help make product identifiers, variants, taxonomy and attributes more consistent across an ecommerce catalogue. This improves the clarity of the information available to the systems that use it.',
          'Byte Operator can review how Software product data and machine-readable ecommerce content are organised, then plan practical improvements around the catalogue and its ongoing management.',
        ],
        buttons: [{label: 'Get In Touch', href: SERVICE_PAGE_ROUTES.contact}],
        media: reuseHomeFeatureMedia('software-launch'),
      },
      {
        id: 'agentic-commerce-geo-discovery',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'GEO & AI Discovery',
        heading: 'Help AI Systems Understand Your Products',
        description: [
          'Generative Engine Optimisation considers how product information can answer natural-language shopper questions. Clear descriptions, useful FAQs, semantic product information and relevant category context help create stronger signals for AI-search visibility.',
          'The work complements technical SEO and catalogue improvements by focusing on the information shoppers and AI systems need to understand a product in context.',
        ],
        buttons: [
          {
            label: 'Explore GEO Services',
            href: SERVICE_PAGE_ROUTES.ecommerceGeo,
          },
        ],
        media: reuseHomeFeatureMedia('software-design'),
      },
      {
        id: 'agentic-commerce-catalogue-content',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'Catalogue & Content Optimisation',
        heading: 'Answer the Questions Shopping Agents Need',
        description: [
          'Complete product specifications, materials, sizing, compatibility, availability and category context make a catalogue more useful to customers and easier to interpret consistently. Shipping, returns and FAQs can also add useful context where that information is available.',
          'Byte Operator helps structure product descriptions and attributes around the questions customers need answered before they can confidently choose a product.',
        ],
        buttons: [{label: 'Get In Touch', href: SERVICE_PAGE_ROUTES.contact}],
        media: reuseHomeFeatureMedia('software-plus'),
      },
      {
        id: 'agentic-commerce-ongoing-readiness',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Ongoing Readiness & Monitoring',
        heading: 'Stay Current as Agentic Commerce Evolves',
        description: [
          'AI shopping channels, schema requirements and catalogue needs will continue to change. Ongoing technical and content support can help keep product data, structured information and important store content up to date as the ecommerce operation evolves.',
          'Regular reviews can identify product-data gaps, content updates and technical improvements that belong in the wider Software roadmap.',
        ],
        buttons: [
          {
            label: 'Explore Support Options',
            href: SERVICE_PAGE_ROUTES.softwareMaintenance,
          },
        ],
        media: reuseHomeFeatureMedia('software-support-growth'),
      },
      {
        id: 'agentic-commerce-why-byte-operator',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'Why Byte Operator',
        heading: 'Search, Data and Ecommerce Working Together',
        description: [
          'Agentic commerce readiness sits across software development, ecommerce SEO, AI and GEO work, structured product data and ecommerce architecture. Byte Operator brings those connected areas into one practical view of the storefront and catalogue.',
          'This helps teams prioritise changes that support clearer product information today while preparing the store for the ways shopping journeys may continue to develop.',
        ],
        buttons: [{label: 'Get In Touch', href: SERVICE_PAGE_ROUTES.contact}],
        media: reuseHomeFeatureMedia('software-migrations'),
      },
    ],
  },
  'ecommerce-seo-migrations': {
    faqTitle: 'Ecommerce SEO Migrations',
    hero: {
      eyebrow: 'Ecommerce SEO Migration Services',
      heading:
        'SEO migration support for ecommerce platform moves and site changes.',
      chips: [
        {
          label: 'AI SEO',
          href: SERVICE_PAGE_ROUTES.ecommerceAiSeo,
        },
        {
          label: 'Technical SEO & Search Architecture Agency',
          href: SERVICE_PAGE_ROUTES.softwareSeo,
        },
        {
          label: 'Software Services',
          href: SERVICE_PAGE_ROUTES.services,
        },
        {
          label: 'Development Services',
          href: SERVICE_PAGE_ROUTES.softwareDevelopment,
        },
      ],
      bottomLogo: {
   text: 'Byte Operator',
   src: '/images/home-services/badges/logo-search-white.svg', width: 130, height: 50,     
   alt: 'Search',
},
      description:
        'Byte Operator helps ecommerce brands plan and manage SEO during platform migrations, store rebuilds and major site changes. We review URLs, content, redirects, technical setup and search-critical pages before and after launch to reduce avoidable migration risks.',
      primaryCta: {
        label: 'Get In Touch',
        href: SERVICE_PAGE_ROUTES.contact,
      },
    },
    about: {
      intro: {
        heading:
          'Ecommerce SEO migration planning built around your existing search footprint.',
        description:
          'A platform move can change URLs, navigation, templates, internal links, metadata and content structure at the same time. Byte Operator reviews the existing store and the planned new structure so important SEO elements can be accounted for before development and launch decisions are finalised.',
        cta: {
          label: 'Get In Touch',
          href: SERVICE_PAGE_ROUTES.contact,
        },
      },
      media: {
        primary: '/images/services/services-wide.webp', primaryWidth: 1672, primaryHeight: 941,
        primaryAlt: 'Ecommerce SEO migration project review',
        secondary: '/images/mega-menu-team.webp', secondaryWidth: 1970, secondaryHeight: 1306,
        secondaryAlt:
          'Byte Operator team planning an ecommerce migration',
      },
      process: {
        heading:
          'Plan the migration before URLs, content and technical signals change.',
        leftDescription:
          'We review existing pages, search visibility, site structure and URL patterns, then map how important areas should move into the new storefront. This provides a clearer framework for redirects, metadata, internal linking and content migration.',
        rightDescription:
          'After launch, technical checks and search data can be reviewed to identify redirect problems, indexation issues, missing pages or other migration-related changes that require attention.',
        cta: {
          label: 'Get In Touch',
          href: SERVICE_PAGE_ROUTES.contact,
        },
      },
    },
    features: [
      {
        id: 'ecommerce-seo-migrations-services',
        layout: 'media-left',
        spacing: 'first',
        theme: 'dark',
        eyebrow: 'Ecommerce SEO Migration Services',
        heading:
          'SEO planning for ecommerce migrations and major storefront changes.',
        description: [
          'Byte Operator supports migrations where ecommerce URLs, page templates, content or platform architecture are changing.',
          'The migration plan connects SEO requirements with the development process so redirects, content, metadata and technical considerations are addressed at the right stage.',
        ],
        badges: [
          {
            label: 'SEO Migration',
            href: SERVICE_PAGE_ROUTES.seoMigrations,
          },
          {
            label: 'Migration Planning',
            href: SERVICE_PAGE_ROUTES.softwareMigrations,
          },
        ],
        buttons: [
          {
            label: 'Get In Touch',
            href: SERVICE_PAGE_ROUTES.contact,
          },
        ],
        media: reuseHomeFeatureMedia('software-migrations'),
      },
      {
        id: 'ecommerce-seo-migrations-pre-migration',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Pre-Migration SEO Planning',
        heading:
          'Review the current store before the migration begins.',
        description: [
          'Before major changes are made, we review important URLs, collections, products, content, internal links and existing search signals.',
          'This creates a baseline for planning the new structure and helps identify areas that need to be retained, redirected, improved or reviewed during migration.',
        ],
        badges: [
          {
            label: 'Ecommerce SEO Audit',
            href: SERVICE_PAGE_ROUTES.ecommerceSeo,
          },
          {
            label: 'URL Planning',
            href: SERVICE_PAGE_ROUTES.seoMigrations,
          },
        ],
        buttons: [
          {
            label: 'Get In Touch',
            href: SERVICE_PAGE_ROUTES.contact,
          },
        ],
        media: reuseHomeFeatureMedia('software-seo-geo'),
      },
      {
        id: 'ecommerce-seo-migrations-url-redirects',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'URL & Redirect Strategy',
        heading:
          'Map old and new URLs before the new ecommerce store goes live.',
        description: [
          'URL changes need clear planning during an ecommerce migration. Byte Operator can map existing pages to their intended destinations and identify URLs that require redirects.',
          'Redirect implementation can then be checked alongside navigation and internal links so customers and search engines reach the intended pages after launch.',
        ],
        badges: [
          {
            label: 'Redirect Strategy',
            href: SERVICE_PAGE_ROUTES.seoMigrations,
          },
          {
            label: 'URL Mapping',
            href: SERVICE_PAGE_ROUTES.seoMigrations,
          },
        ],
        buttons: [
          {
            label: 'Get In Touch',
            href: SERVICE_PAGE_ROUTES.contact,
          },
        ],
        media: reuseHomeFeatureMedia('software-launch'),
      },
      {
        id: 'ecommerce-seo-migrations-content-on-page',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Content & On-Page Migration',
        heading:
          'Move important ecommerce content and on-page SEO into the new store.',
        description: [
          'Collections, products and supporting content often carry headings, metadata, copy and internal links that need to be considered during migration.',
          'Byte Operator reviews how these elements should transfer into the new storefront and identifies opportunities where content or page targeting should be updated.',
        ],
        badges: [
          {
            label: 'Content Migration',
            href: SERVICE_PAGE_ROUTES.softwareMigrations,
          },
          {
            label: 'On-Page SEO',
            href: SERVICE_PAGE_ROUTES.ecommerceSeo,
          },
        ],
        buttons: [
          {
            label: 'Get In Touch',
            href: SERVICE_PAGE_ROUTES.contact,
          },
        ],
        media: reuseHomeFeatureMedia('software-design'),
      },
      {
        id: 'ecommerce-seo-migrations-post-migration-review',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'Post-Migration SEO Review',
        heading:
          'Check the new storefront after launch for migration-related SEO issues.',
        description: [
          'After launch, the new site can be reviewed for redirect behaviour, indexation, crawl issues, missing pages, metadata changes and internal-link problems.',
          'Search and analytics data can then help identify areas that need further review as search engines process the new store structure.',
        ],
        badges: [
          {
            label: 'Post-Launch Review',
            href: SERVICE_PAGE_ROUTES.seoMigrations,
          },
          {
            label: 'Technical SEO',
            href: SERVICE_PAGE_ROUTES.ecommerceSeo,
          },
        ],
        buttons: [
          {
            label: 'Get In Touch',
            href: SERVICE_PAGE_ROUTES.contact,
          },
        ],
        media: reuseHomeFeatureMedia('software-development'),
      },
      {
        id: 'ecommerce-seo-migrations-technical-checks',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Technical Migration Checks',
        heading:
          'Review technical SEO across the new ecommerce structure.',
        description: [
          'Platform migrations can affect canonical handling, structured data, crawl paths, page templates, internal links and other technical elements.',
          'Byte Operator reviews the relevant technical setup and works alongside development changes where fixes are required.',
        ],
        badges: [
          {
            label: 'Technical SEO',
            href: SERVICE_PAGE_ROUTES.ecommerceSeo,
          },
          {
            label: 'Site Structure',
            href: SERVICE_PAGE_ROUTES.softwareSeo,
          },
        ],
        buttons: [
          {
            label: 'Get In Touch',
            href: SERVICE_PAGE_ROUTES.contact,
          },
        ],
        media: reuseHomeFeatureMedia('software-plus'),
      },
      {
        id: 'ecommerce-seo-migrations-ongoing-seo',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'Ongoing SEO After Migration',
        heading:
          'Continue improving the store once the migration is complete.',
        description: [
          'Migration work does not necessarily stop at launch. New pages, content changes and technical findings may appear as the new storefront is crawled and used by customers.',
          'Ongoing SEO support can combine technical reviews, on-page improvements, internal linking and search analysis with the wider ecommerce roadmap.',
        ],
        badges: [
          {
            label: 'Ongoing SEO',
            href: SERVICE_PAGE_ROUTES.softwareMaintenance,
          },
        ],
        buttons: [
          {
            label: 'Get In Touch',
            href: SERVICE_PAGE_ROUTES.contact,
          },
        ],
        media: reuseHomeFeatureMedia('software-support-growth'),
      },
    ],
    showPartners: true,
  },
  'email-marketing-agency': {
    faqTitle: 'Software Email Marketing',
    hero: {
      eyebrow: 'Software Email Marketing Agency',
      heading:
        'Software Email Marketing Agency for Ecommerce Brands',
      chips: [
        {
          label: 'Klaviyo Agency',
          href: SERVICE_PAGE_ROUTES.klaviyoAgency,
        },
        {
          label: 'Ecommerce CRO',
          href: SERVICE_PAGE_ROUTES.ecommerceCro,
        },
        {
          label: 'Development Services',
          href: SERVICE_PAGE_ROUTES.softwareDevelopment,
        },
        {
          label: 'Ecommerce SEO',
          href: SERVICE_PAGE_ROUTES.ecommerceSeo,
        },
      ],
      bottomLogo: {
        text: 'Byte Operator',
        src: '/images/home-services/badges/logo-retain-white.svg', width: 130, height: 50,
        alt: 'Retain',
      },
      description:
        'Byte Operator works on retention for Software and Enterprise Platform Solutions stores through email and SMS, covering segmentation, automated lifecycle flows, campaign planning, and the loyalty and subscription experiences that sit behind repeat purchases.',
      primaryCta: {
        label: 'Get In Touch',
        href: SERVICE_PAGE_ROUTES.contact,
      },
    },
    about: {
      intro: {
        heading:
          'Email Marketing & Retention for Software Brands',
        description:
          'Retention work brings together email strategy, SMS, customer segmentation and automation so returning customers hear from a store at points that make sense to them. Byte Operator plans campaigns and automated flows around the buying journey, connects them to loyalty programmes and subscription products where a store runs them, and keeps the customer data behind segmentation in step with the digital platformfront.',
        cta: {
          label: 'Get In Touch',
          href: SERVICE_PAGE_ROUTES.contact,
        },
      },
      media: {
        primary: '/images/services/services-wide.webp', primaryWidth: 1672, primaryHeight: 941,
        primaryAlt:
          'Byte Operator Software email marketing and retention planning',
        secondary: '/images/mega-menu-team.webp', secondaryWidth: 1970, secondaryHeight: 1306,
        secondaryAlt:
          'Byte Operator team reviewing Software email and SMS campaigns',
      },
      process: {
        heading: 'Our Software Email Marketing Process',
        leftDescription:
          'We start with the customer data a store already holds: how people first buy, what they buy again, how long the gap between orders tends to be, and which lists, flows and campaigns are running today. That picture shapes the segmentation model, the flows worth building first and the messages each audience should receive.',
        rightDescription:
          'From there we plan the campaign calendar and automation alongside design and build work, then review performance in the platform reporting to refine timing, segments and content. Loyalty, reviews and subscription tools are connected to the same programme so retention activity develops with the store rather than separately from it.',
        cta: {
          label: 'Get In Touch',
          href: SERVICE_PAGE_ROUTES.contact,
        },
      },
    },
    features: [
      {
        id: 'email-marketing-agency-strategy',
        layout: 'media-left',
        spacing: 'first',
        theme: 'dark',
        eyebrow: 'Software Email Marketing Agency',
        heading:
          'Email Marketing Built Around the Customer Journey',
        description: [
          'Email works best when it follows how customers actually move through a store: browsing, first purchase, the weeks that follow, and the point where a repeat order becomes likely. Mapping those stages first makes it clear which messages are missing and which are simply repeated too often.',
          'Byte Operator plans an email programme around that journey, setting out the campaigns, automated flows and audiences for each stage, so retention activity is planned alongside acquisition rather than added afterwards.',
        ],
        buttons: [
          {
            label: 'Get In Touch',
            href: SERVICE_PAGE_ROUTES.contact,
          },
        ],
        media: reuseHomeFeatureMedia('email-sms-retention'),
      },
      {
        id: 'email-marketing-agency-segmentation',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Software Email Segmentation',
        heading: 'Create More Relevant Customer Segments',
        description: [
          'Segmentation decides who receives a message and what it should say. Purchase history, product category, order frequency, average order value, engagement and time since the last order can all be used to group customers in ways that reflect how they buy.',
          'We work through the customer data available in Software and the email platform, define the segments worth maintaining, and keep them updated as behaviour changes, so campaigns are sent to a considered audience instead of the whole list.',
        ],
        buttons: [
          {
            label: 'Explore Klaviyo Services',
            href: SERVICE_PAGE_ROUTES.klaviyoAgency,
          },
        ],
        media: reuseHomeFeatureMedia('software-cro'),
      },
      {
        id: 'email-marketing-agency-automation',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'Software Email Automation',
        heading: 'Automated Email Flows for Software',
        description: [
          'Automated flows respond to what a customer does. Welcome sequences introduce a brand, browse and abandoned cart flows follow up on unfinished sessions, post-purchase messages cover delivery and product care, and re-engagement flows reach customers who have gone quiet.',
          'Byte Operator builds and maintains these lifecycle flows in the store’s email platform, covering the trigger, timing, branching and content of each step, and reviews them as products, audiences and the storefront change.',
        ],
        buttons: [
          {
            label: 'Get In Touch',
            href: SERVICE_PAGE_ROUTES.contact,
          },
        ],
        media: reuseHomeFeatureMedia('software-support-growth'),
      },
      {
        id: 'email-marketing-agency-design',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Email Marketing Design Services',
        heading: 'Email Design That Fits Your Brand',
        description: [
          'Emails are read across a wide mix of devices, inbox clients and display settings, so templates need to hold up in each of them while still looking like the rest of the brand. Layout, typography, imagery, accessibility and clear calls to action all affect how an email reads.',
          'We design and build reusable email templates that follow the storefront design, making campaigns quicker to produce and keeping the experience consistent from inbox to product page.',
        ],
        buttons: [
          {
            label: 'Explore Design Services',
            href: SERVICE_PAGE_ROUTES.softwareWebDesign,
          },
        ],
        media: reuseHomeFeatureMedia('software-design'),
      },
      {
        id: 'email-marketing-agency-sms',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'Software SMS Marketing',
        heading: 'Connect SMS with Your Retention Strategy',
        description: [
          'SMS suits short, timely messages: a launch, a restock, a delivery update or a reminder that sits alongside an email rather than repeating it. It also carries different consent, frequency and regional requirements to email, which shape how it can be used.',
          'We plan SMS as part of the same retention programme, deciding which moments belong in SMS, which stay in email, and how sign-up, consent and sending frequency are handled across both channels.',
        ],
        buttons: [
          {
            label: 'Get In Touch',
            href: SERVICE_PAGE_ROUTES.contact,
          },
        ],
        media: reuseHomeFeatureMedia('software-launch'),
      },
      {
        id: 'email-marketing-agency-loyalty-subscriptions',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Software Loyalty & Subscriptions',
        heading:
          'Connect Email, Loyalty and Subscription Experiences',
        description: [
          'Loyalty programmes, reviews and subscriptions generate their own customer moments: points earned, rewards available, a renewal approaching, a delivery about to ship or a subscription at risk of being cancelled. Each of them can be communicated through email and SMS.',
          'Byte Operator connects these tools to the retention programme so their data feeds segmentation and their events trigger the right messages, giving repeat customers a joined-up experience across the storefront, their account and their inbox.',
        ],
        buttons: [
          {
            label: 'Explore Ecommerce CRO',
            href: SERVICE_PAGE_ROUTES.ecommerceCro,
          },
        ],
        media: reuseHomeFeatureMedia('software-plus'),
      },
    ],
  },
  'why-custom-software': {
    faqTitle: 'Why Custom Software',
    hero: {
      eyebrow: 'Why Custom Software',
      heading:
        'Why Ecommerce Brands Choose Software & Enterprise Platform Solutions',
      chips: [
        {
          label: 'Enterprise Platform Solutions',
          href: SERVICE_PAGE_ROUTES.softwarePlus,
        },
        {
          label: 'Platform & Cloud Migrations',
          href: SERVICE_PAGE_ROUTES.softwareMigrations,
        },
        {
          label: 'Development Services',
          href: SERVICE_PAGE_ROUTES.softwareDevelopment,
        },
        {
          label: 'Ecommerce SEO',
          href: SERVICE_PAGE_ROUTES.ecommerceSeo,
        },
        {
          label: 'Ecommerce CRO',
          href: SERVICE_PAGE_ROUTES.ecommerceCro,
        },
      ],
      description:
        'A practical look at what Software and Enterprise Platform Solutions offer ecommerce brands: hosted infrastructure, room for custom development, integrations with the systems a business already runs on, and the flexibility SEO and conversion work depend on.',
      primaryCta: {
        label: 'Get In Touch',
        href: SERVICE_PAGE_ROUTES.contact,
      },
    },
    about: {
      intro: {
        heading:
          'Why Choose Software as Your Ecommerce Platform',
        description:
          'Choosing an ecommerce platform is mostly a question of where you want to spend your effort. Every platform demands attention somewhere: hosting and security, custom development, integrations, or working around constraints the business has outgrown. Software takes on the infrastructure — hosting, PCI compliance, platform updates and checkout — so teams can spend more of their time on merchandising, customer experience and growth. That trade-off suits most ecommerce brands well, and it is worth understanding properly rather than assuming.',
        cta: {
          label: 'Get In Touch',
          href: SERVICE_PAGE_ROUTES.contact,
        },
      },
      media: {
        primary: '/images/services/services-wide.webp', primaryWidth: 1672, primaryHeight: 941,
        primaryAlt:
          'Byte Operator Software ecommerce platform project work',
        secondary: '/images/mega-menu-team.webp', secondaryWidth: 1970, secondaryHeight: 1306,
        secondaryAlt:
          'Byte Operator team reviewing Software ecommerce platform requirements',
      },
      process: {
        heading: 'How We Help You Evaluate Software',
        leftDescription:
          'We start with the requirements that actually constrain the decision: catalogue size and structure, the systems that hold pricing, stock and customer records, international and B2B needs, and the internal workflows a platform has to support. Those details decide whether Software fits, and whether standard Software or Enterprise Platform Solutions is the right level.',
        rightDescription:
          'From there we set out what the platform handles natively, what needs custom development or integration work, and what a migration would realistically involve. If Software is not the right fit for a particular requirement, we would rather say so at this stage than discover it mid-build.',
        cta: {
          label: 'Get In Touch',
          href: SERVICE_PAGE_ROUTES.contact,
        },
      },
    },
    features: [
      {
        id: 'why-custom-software-platform-reliability',
        layout: 'media-left',
        spacing: 'first',
        theme: 'dark',
        eyebrow: 'Platform, Security & Reliability',
        heading:
          'Infrastructure You Do Not Have to Maintain',
        description: [
          'Software is a hosted platform, so hosting, security patching, PCI compliance for checkout and platform updates are handled for you. For most ecommerce teams that removes a category of work — and a category of risk — that would otherwise need in-house attention or an ongoing retainer just to stand still.',
          'It also means peak trading periods are the platform’s problem rather than yours. Capacity for traffic spikes is part of what you are buying, which changes how a team plans for launches, campaigns and seasonal demand.',
        ],
        buttons: [
          {
            label: 'Get In Touch',
            href: SERVICE_PAGE_ROUTES.contact,
          },
        ],
        media: reuseHomeFeatureMedia('software-plus'),
      },
      {
        id: 'why-custom-software-scalability-plus',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Scalability & Enterprise Platform Solutions',
        heading:
          'Room to Grow Without Changing Platform Again',
        description: [
          'Standard Software covers a great deal, and most brands do not need more from day one. Enterprise Platform Solutions becomes relevant when specific requirements appear: more control over checkout, higher API limits, multiple storefronts, B2B alongside DTC, or automation across the systems around the store.',
          'Because both sit on the same platform, moving up is a change of capability rather than a replatform. That matters when you are choosing where to start: the decision does not have to carry the weight of predicting the next five years.',
        ],
        buttons: [
          {
            label: 'Explore Enterprise Platform Solutions',
            href: SERVICE_PAGE_ROUTES.softwarePlus,
          },
        ],
        media: reuseHomeFeatureMedia('software-migrations'),
      },
      {
        id: 'why-custom-software-custom-integrations',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'Custom Development & Integrations',
        heading:
          'Flexible Where It Needs to Be',
        description: [
          'A hosted platform is only useful if it still bends to how your business works. Software supports custom theme development, private and custom apps, and a well-documented API surface, so functionality that does not exist off the shelf can be built rather than worked around.',
          'The wider ecosystem covers most common requirements through apps, and the API handles the rest: connecting ERP, CRM, inventory, fulfilment and marketing systems so the storefront reflects what the business already holds elsewhere.',
        ],
        buttons: [
          {
            label: 'Explore Development Services',
            href: SERVICE_PAGE_ROUTES.softwareDevelopment,
          },
        ],
        media: reuseHomeFeatureMedia('software-development'),
      },
      {
        id: 'why-custom-software-performance-seo-cro',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Performance, SEO & CRO Flexibility',
        heading:
          'Enough Control for Search and Conversion Work',
        description: [
          'Ecommerce performance depends on being able to change the things that matter. Software gives control over templates, page structure, metadata, redirects and site speed work, which is what technical SEO and conversion optimisation actually need access to.',
          'There are platform conventions to work within — URL structures and checkout among them — and it is better to understand those upfront. In practice they rarely limit the SEO and CRO work that moves commercial numbers.',
        ],
        buttons: [
          {
            label: 'Explore Ecommerce SEO',
            href: SERVICE_PAGE_ROUTES.ecommerceSeo,
          },
        ],
        media: reuseHomeFeatureMedia('software-cro'),
      },
      {
        id: 'why-custom-software-international-growth',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'International Commerce & Ongoing Growth',
        heading:
          'A Platform That Supports the Next Stage',
        description: [
          'International selling brings currencies, languages, regional catalogues and market-specific pricing. Software supports multi-currency and multi-language storefronts, with different structural options depending on how much regional independence a business needs.',
          'Beyond launch, what matters is how easily a store keeps improving. Merchandising changes, new landing pages, integrations and optimisation work should not each require a development project, and the platform decision has a lot to do with whether they do.',
        ],
        buttons: [
          {
            label: 'Explore Platform & Cloud Migrations',
            href: SERVICE_PAGE_ROUTES.softwareMigrations,
          },
        ],
        media: reuseHomeFeatureMedia('software-design'),
      },
    ],
  },
  'software-experts': {
    faqTitle: 'Software Engineering Experts & Development',
    hero: {
      eyebrow: 'Software Engineering Experts',
      heading:
        'Software Engineering Experts for Design, Development & Growth',
      chips: [
        {
          label: 'Development Services',
          href: SERVICE_PAGE_ROUTES.softwareDevelopment,
        },
        {
          label: 'Design Services',
          href: SERVICE_PAGE_ROUTES.softwareWebDesign,
        },
        {
          label: 'Ecommerce SEO',
          href: SERVICE_PAGE_ROUTES.ecommerceSeo,
        },
        {
          label: 'Ecommerce CRO',
          href: SERVICE_PAGE_ROUTES.ecommerceCro,
        },
        {
          label: 'Enterprise Platform Solutions',
          href: SERVICE_PAGE_ROUTES.softwarePlus,
        },
      ],
      description:
        'Byte Operator is a team of Software experts covering design, development, migrations, integrations, SEO and conversion work for brands building and growing on Software and Enterprise Platform Solutions.',
      primaryCta: {
        label: 'Get In Touch',
        href: SERVICE_PAGE_ROUTES.contact,
      },
    },
    about: {
      intro: {
        heading:
          'Software Engineering Experts for Every Stage of Your Store',
        description:
          '"Software expert" covers a wide range of work, and most stores need more than one kind of it. A build needs design and development. A migration needs data, redirects and integration planning. Growth needs SEO, conversion work and someone maintaining the store while it happens. Byte Operator brings those disciplines together so decisions in one area account for their effect on the others, rather than being handed between separate suppliers who each see a different part of the store.',
        cta: {
          label: 'Get In Touch',
          href: SERVICE_PAGE_ROUTES.contact,
        },
      },
      media: {
        primary: '/images/services/services-wide.webp', primaryWidth: 1672, primaryHeight: 941,
        primaryAlt:
          'Byte Operator Software experts working on ecommerce store projects',
        secondary: '/images/mega-menu-team.webp', secondaryWidth: 1970, secondaryHeight: 1306,
        secondaryAlt:
          'Byte Operator software development and design team',
      },
      process: {
        heading: 'How We Work as Your Software Engineering Experts',
        leftDescription:
          'We start by understanding the store, the team around it and the commercial goal. That covers how the theme is built, which apps and integrations it depends on, where the current setup is holding things back, and what the business needs the store to do over the next period rather than in the abstract.',
        rightDescription:
          'From there we agree the work and the order it should happen in, then deliver it — design, development, migration, SEO, conversion or a combination. Where a requirement is better solved by a change to process or configuration than by custom development, we will say so rather than building something that adds maintenance for no gain.',
        cta: {
          label: 'Get In Touch',
          href: SERVICE_PAGE_ROUTES.contact,
        },
      },
    },
    features: [
      {
        id: 'software-experts-design-development',
        layout: 'media-left',
        spacing: 'first',
        theme: 'dark',
        eyebrow: 'Software Design & Development',
        heading:
          'Stores Designed and Built by the Same Team',
        description: [
          'Design and development work best when they are not separated by a handover. Decisions about layout, merchandising and interaction affect how a theme is built, and the constraints of the platform affect what is worth designing in the first place.',
          'Byte Operator designs and develops Software and Enterprise Platform Solutions storefronts together: custom themes, bespoke sections merchandising teams can use without a developer, and frontend built with performance, accessibility and long-term maintainability in mind.',
        ],
        buttons: [
          {
            label: 'Explore Development Services',
            href: SERVICE_PAGE_ROUTES.softwareDevelopment,
          },
        ],
        media: reuseHomeFeatureMedia('software-plus'),
      },
      {
        id: 'software-experts-migrations-integrations',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Migrations & Integrations',
        heading:
          'Moving to Software and Connecting What Surrounds It',
        description: [
          'Migrations are where detail matters most. Products, variants, customers, orders, content and URL structures all have to arrive intact, with redirects mapped so existing search visibility is carried across rather than rebuilt from scratch.',
          'Integration work continues past launch. We connect Software with the ERP, CRM, inventory, fulfilment and marketing systems a business already runs on, and build custom functionality where an app does not fit the requirement.',
        ],
        buttons: [
          {
            label: 'Explore Platform & Cloud Migrations',
            href: SERVICE_PAGE_ROUTES.softwareMigrations,
          },
        ],
        media: reuseHomeFeatureMedia('software-migrations'),
      },
      {
        id: 'software-experts-seo-cro',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'SEO & Conversion Expertise',
        heading:
          'Helping Customers Find You and Buy From You',
        description: [
          'Search visibility and conversion act on the same templates. Collection structure, product information, internal linking and page performance decide how a store is found, and the same pages decide whether visitors go on to buy.',
          'Our SEO and CRO specialists work alongside the developers building the store, so technical foundations, content structure and conversion improvements are planned together instead of arriving as competing change requests.',
        ],
        buttons: [
          {
            label: 'Explore Ecommerce SEO',
            href: SERVICE_PAGE_ROUTES.ecommerceSeo,
          },
        ],
        media: reuseHomeFeatureMedia('software-development'),
      },
      {
        id: 'software-experts-software-plus',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Enterprise Platform Solutions Experts',
        heading:
          'Expertise for More Complex Ecommerce Requirements',
        description: [
          'Enterprise Platform Solutions stores tend to carry more moving parts: additional integrations, international and multi-currency requirements, B2B alongside DTC, and internal teams who need their own workflows supported.',
          'As Enterprise Platform Solutions experts we advise on platform decisions and store architecture, build the customisations those requirements need, and keep the setup practical for the people managing it day to day.',
        ],
        buttons: [
          {
            label: 'Explore Enterprise Platform Solutions',
            href: SERVICE_PAGE_ROUTES.softwarePlus,
          },
        ],
        media: reuseHomeFeatureMedia('software-cro'),
      },
      {
        id: 'software-experts-ongoing-support',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'Ongoing Support & Ecommerce Growth',
        heading:
          'Experts Who Stay With the Store After Launch',
        description: [
          'Launch is the start of the work, not the end of it. Ranges change, campaigns need new pages, apps update, and the improvements identified during a build need someone to pick them up.',
          'Byte Operator continues as a long-term partner through maintenance, development time, conversion work and technical support, so the store keeps improving instead of slowly drifting between projects.',
        ],
        buttons: [
          {
            label: 'Explore Support & Growth',
            href: SERVICE_PAGE_ROUTES.softwareMaintenance,
          },
        ],
        media: reuseHomeFeatureMedia('software-design'),
      },
    ],
  },
  memberships: {
    faqTitle: 'Software Retainers & Memberships',
    hero: {
      eyebrow: 'Software Retainers & Memberships',
      heading:
        'Software Retainers for Ongoing Support & Growth',
      chips: [
        {
          label: 'Support & Maintenance',
          href: SERVICE_PAGE_ROUTES.softwareMaintenance,
        },
        {
          label: 'Ecommerce CRO',
          href: SERVICE_PAGE_ROUTES.ecommerceCro,
        },
        {
          label: 'Development Services',
          href: SERVICE_PAGE_ROUTES.softwareDevelopment,
        },
        {
          label: 'Ecommerce SEO',
          href: SERVICE_PAGE_ROUTES.ecommerceSeo,
        },
        {
          label: 'Enterprise Platform Solutions',
          href: SERVICE_PAGE_ROUTES.softwarePlus,
        },
      ],
      description:
        'Byte Operator memberships are monthly Software retainers for brands that need continuous support rather than one-off projects: maintenance, development time, conversion work and technical help from a team that already knows the store.',
      primaryCta: {
        label: 'Get In Touch',
        href: SERVICE_PAGE_ROUTES.contact,
      },
    },
    about: {
      intro: {
        heading:
          'Monthly Software Support & Optimisation Retainers',
        description:
          'A store is rarely finished at launch. Product ranges change, campaigns need landing pages, apps update, browsers move on, and the improvements identified during a build often sit waiting for someone to pick them up. A Byte Operator membership gives ecommerce teams a predictable amount of Software time each month for exactly that work, covering maintenance, development, conversion and technical support without opening a new project every time something needs doing.',
        cta: {
          label: 'Get In Touch',
          href: SERVICE_PAGE_ROUTES.contact,
        },
      },
      media: {
        primary: '/images/services/services-wide.webp', primaryWidth: 1672, primaryHeight: 941,
        primaryAlt:
          'Byte Operator Software retainer and ongoing ecommerce support work',
        secondary: '/images/mega-menu-team.webp', secondaryWidth: 1970, secondaryHeight: 1306,
        secondaryAlt:
          'Byte Operator team planning ongoing digital platform improvements',
      },
      process: {
        heading: 'How Our Software Retainers Work',
        leftDescription:
          'We start by understanding the store and the team around it: how it is built, which apps and integrations it depends on, what is already on the backlog, and where the business wants to get to. That gives us a working list of priorities rather than a queue of unrelated tickets.',
        rightDescription:
          'Each month we agree what the time goes towards, deliver it, and review what changed and what should come next. Priorities can move as commercial needs shift, and where a request is better handled as a separate project we will say so rather than absorbing it into the retainer and delivering it slowly.',
        cta: {
          label: 'Get In Touch',
          href: SERVICE_PAGE_ROUTES.contact,
        },
      },
    },
    features: [
      {
        id: 'memberships-support-maintenance',
        layout: 'media-left',
        spacing: 'first',
        theme: 'dark',
        eyebrow: 'Software Support & Maintenance',
        heading:
          'Keep the Store Healthy Month to Month',
        description: [
          'Software maintenance is the work that keeps a store dependable: fixing issues as they appear, keeping themes and apps in good order, checking that key journeys still behave after platform or third-party updates, and resolving the small faults that quietly cost orders.',
          'A membership gives that work a home. Instead of issues waiting for a free window, they go into an agreed monthly rhythm with a team that already understands how the store is built.',
        ],
        buttons: [
          {
            label: 'Explore Support & Maintenance',
            href: SERVICE_PAGE_ROUTES.softwareMaintenance,
          },
        ],
        media: reuseHomeFeatureMedia('software-plus'),
      },
      {
        id: 'memberships-development-support',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Ongoing Development Support',
        heading:
          'Development Time Without a New Project',
        description: [
          'Most stores accumulate a backlog of changes that are too small to scope as projects but too involved for a marketing team to build alone: new sections and templates, campaign landing pages, product page adjustments, app configuration and integration tweaks.',
          'Retained development time covers that work. Requests are prioritised together, built and tested against the existing theme, and released without the overhead of starting a separate engagement each time.',
        ],
        buttons: [
          {
            label: 'Explore Development Services',
            href: SERVICE_PAGE_ROUTES.softwareDevelopment,
          },
        ],
        media: reuseHomeFeatureMedia('software-development'),
      },
      {
        id: 'memberships-cro-optimisation',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'CRO & Ecommerce Optimisation',
        heading:
          'Continuous Improvement, Not One-Off Fixes',
        description: [
          'Conversion work rewards consistency. Reviewing customer behaviour, improving key journeys, refining product and collection pages and testing changes produces more over several months than any single round of amends does on its own.',
          'A CRO retainer keeps that cycle running: research, prioritised changes, measurement and the next set of improvements, with each month building on what the previous one established about your customers.',
        ],
        buttons: [
          {
            label: 'Explore Ecommerce CRO',
            href: SERVICE_PAGE_ROUTES.ecommerceCro,
          },
        ],
        media: reuseHomeFeatureMedia('software-cro'),
      },
      {
        id: 'memberships-technical-performance',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Technical Support & Performance',
        heading:
          'Technical Help When the Store Needs It',
        description: [
          'Stores develop technical debt as they grow. Apps are added and never removed, scripts accumulate, page performance drifts, and SEO foundations laid at launch stop matching how the store is now merchandised.',
          'Retained technical support covers page speed and Core Web Vitals work, app and script review, integration troubleshooting, and the technical SEO housekeeping that keeps a store crawlable and understandable as its catalogue and content change.',
        ],
        buttons: [
          {
            label: 'Explore Ecommerce SEO',
            href: SERVICE_PAGE_ROUTES.ecommerceSeo,
          },
        ],
        media: reuseHomeFeatureMedia('software-migrations'),
      },
      {
        id: 'memberships-software-plus-partnership',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'Enterprise Platform Solutions Support & Partnership',
        heading:
          'A Long-Term Partner as the Store Scales',
        description: [
          'Enterprise Platform Solutions stores tend to carry more moving parts: additional integrations, international requirements, B2B alongside DTC, and internal teams who need decisions supported rather than made for them. Ongoing support suits that better than isolated projects.',
          'Byte Operator works as a retained partner across those requirements, advising on priorities, supporting internal teams and developers, and delivering the improvements the store needs as the business grows.',
        ],
        buttons: [
          {
            label: 'Explore Enterprise Platform Solutions',
            href: SERVICE_PAGE_ROUTES.softwarePlus,
          },
        ],
        media: reuseHomeFeatureMedia('software-design'),
      },
    ],
  },
  'software-consultant': {
    faqTitle: 'Software Consulting Services',
    hero: {
      eyebrow: 'Software Engineering Consultancy',
      heading:
        'Software Architect & Consultant & Ecommerce Strategy Support',
      chips: [
        {
          label: 'Ecommerce Audits',
          href: SERVICE_PAGE_ROUTES.softwareAudits,
        },
        {
          label: 'Ecommerce SEO',
          href: SERVICE_PAGE_ROUTES.ecommerceSeo,
        },
        {
          label: 'Ecommerce CRO',
          href: SERVICE_PAGE_ROUTES.ecommerceCro,
        },
        {
          label: 'Platform & Cloud Migrations',
          href: SERVICE_PAGE_ROUTES.softwareMigrations,
        },
        {
          label: 'Enterprise Platform Solutions',
          href: SERVICE_PAGE_ROUTES.softwarePlus,
        },
      ],
      description:
        'Byte Operator works as a Software Architect & Consultant for ecommerce teams that need a clear plan before they commit budget: store audits, platform and migration decisions, SEO and CRO priorities, integration planning and a roadmap that sequences the work in a sensible order.',
      primaryCta: {
        label: 'Get In Touch',
        href: SERVICE_PAGE_ROUTES.contact,
      },
    },
    about: {
      intro: {
        heading:
          'Software Consulting Services for Ecommerce Teams',
        description:
          'Most ecommerce teams do not lack ideas. They have a backlog of competing ones, limited development time, and no shared view of which will move the numbers that matter. Software consulting is the work of turning that into a decision: understanding how the store performs today, where the real constraints sit, and what should happen first. Byte Operator advises on Software and Enterprise Platform Solutions as a consultant, and can also deliver the work once the direction is agreed.',
        cta: {
          label: 'Get In Touch',
          href: SERVICE_PAGE_ROUTES.contact,
        },
      },
      media: {
        primary: '/images/services/services-wide.webp', primaryWidth: 1672, primaryHeight: 941,
        primaryAlt:
          'Byte Operator Software consulting and ecommerce strategy work',
        secondary: '/images/mega-menu-team.webp', secondaryWidth: 1970, secondaryHeight: 1306,
        secondaryAlt:
          'Byte Operator team planning a Software ecommerce roadmap',
      },
      process: {
        heading: 'How Our Software Engineering Consultancy Works',
        leftDescription:
          'We start by understanding the commercial picture: what the business is trying to achieve over the next period, how the store performs against that today, and which constraints are technical, operational or resourcing. That means reviewing analytics, customer journeys, the theme and app stack, and how the store connects to the systems behind it.',
        rightDescription:
          'From there we set out a prioritised roadmap: what to fix, what to build, what to test and what to leave alone for now, with the reasoning behind each call. Teams can take that plan and run it internally, or ask us to deliver against it. Where we think a piece of work is not worth the investment yet, we will say so.',
        cta: {
          label: 'Get In Touch',
          href: SERVICE_PAGE_ROUTES.contact,
        },
      },
    },
    features: [
      {
        id: 'software-consultant-audits',
        layout: 'media-left',
        spacing: 'first',
        theme: 'dark',
        eyebrow: 'Digital Platform Audits',
        heading:
          'Understand the Store Before Changing It',
        description: [
          'A Software audit establishes where a store actually stands: how it performs technically, how customers move through key journeys, how products are found and compared, and where the theme, apps or integrations are creating friction that shows up in the numbers.',
          'We review the storefront alongside analytics and search data so findings are grounded in evidence rather than opinion, then separate what is genuinely costing revenue from what is simply on someone’s wish list.',
        ],
        buttons: [
          {
            label: 'Explore Ecommerce Audits',
            href: SERVICE_PAGE_ROUTES.softwareAudits,
          },
        ],
        media: reuseHomeFeatureMedia('software-plus'),
      },
      {
        id: 'software-consultant-strategy',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Ecommerce & Software Growth Strategy',
        heading:
          'A Roadmap That Sequences the Work',
        description: [
          'Ecommerce strategy is mostly sequencing. Rebuilding navigation before fixing indexation, or running conversion tests before there is enough traffic to read them, wastes effort that could have gone somewhere useful. A roadmap makes those dependencies visible.',
          'Byte Operator sets out a prioritised plan across storefront, acquisition, conversion and retention, with the commercial reasoning for the order. It is written to be used by the people doing the work, whether that is your team, ours, or both.',
        ],
        buttons: [
          {
            label: 'Explore Our Services',
            href: SERVICE_PAGE_ROUTES.services,
          },
        ],
        media: reuseHomeFeatureMedia('software-development'),
      },
      {
        id: 'software-consultant-platform',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'Enterprise Platform Solutions Consultant & Platform Planning',
        heading:
          'Platform, Migration & Integration Decisions',
        description: [
          'Platform questions carry long consequences. Whether to move to Enterprise Platform Solutions, whether a replatform is justified yet, whether a requirement is better served by an app, a custom build or a change to process — these decisions are easier with someone who has seen how each option behaves after launch.',
          'As a Enterprise Platform Solutions consultant, Byte Operator advises on migration planning, store architecture, and the ERP, CRM, inventory and fulfilment integrations a store depends on, including what to keep as-is and what genuinely needs rebuilding.',
        ],
        buttons: [
          {
            label: 'Explore Platform & Cloud Migrations',
            href: SERVICE_PAGE_ROUTES.softwareMigrations,
          },
        ],
        media: reuseHomeFeatureMedia('software-migrations'),
      },
      {
        id: 'software-consultant-seo-cro',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'SEO & Conversion Priorities',
        heading:
          'Connecting Discovery and Conversion',
        description: [
          'Search visibility and conversion are usually treated as separate projects, but they act on the same pages. Collection structure, product information, page performance and internal linking affect how a store is found and whether visitors go on to buy.',
          'Our consulting work identifies the technical SEO foundations worth fixing first, the conversion opportunities worth testing, and the changes that serve both — so effort is not spent twice on the same templates.',
        ],
        buttons: [
          {
            label: 'Explore Ecommerce CRO',
            href: SERVICE_PAGE_ROUTES.ecommerceCro,
          },
        ],
        media: reuseHomeFeatureMedia('software-cro'),
      },
      {
        id: 'software-consultant-ongoing-support',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'Ongoing Ecommerce Support',
        heading:
          'Consultancy That Continues Past the Recommendation',
        description: [
          'A roadmap written once tends to drift. Priorities change, results come in, and new requirements arrive from elsewhere in the business. Ongoing consultancy keeps the plan current as those things happen.',
          'Byte Operator can stay involved as a technical and strategic partner: reviewing performance, advising on new requirements, supporting internal teams and developers, and adjusting priorities as the store and the business evolve.',
        ],
        buttons: [
          {
            label: 'Explore Support & Growth',
            href: SERVICE_PAGE_ROUTES.softwareMaintenance,
          },
        ],
        media: reuseHomeFeatureMedia('software-design'),
      },
    ],
  },
  'software-b2b-wholesale': {
    faqTitle: 'Software B2B & Wholesale',
    hero: {
      eyebrow: 'B2B Ecommerce Agency',
      heading:
        'Software B2B & Wholesale Ecommerce Solutions',
      chips: [
        {
          label: 'Digital Platform Builds',
          href: SERVICE_PAGE_ROUTES.softwareDevelopment,
        },
        {
          label: 'Ecommerce SEO',
          href: SERVICE_PAGE_ROUTES.ecommerceSeo,
        },
        {
          label: 'Design Services',
          href: SERVICE_PAGE_ROUTES.softwareWebDesign,
        },
        {
          label: 'Development Services',
          href: SERVICE_PAGE_ROUTES.softwareDevelopment,
        },
        {
          label: 'Ecommerce CRO',
          href: SERVICE_PAGE_ROUTES.ecommerceCro,
        },
      ],
      description:
        'Byte Operator designs and builds Software and Enterprise Platform Solutions stores for businesses selling to trade and business customers, covering wholesale ordering, company accounts, customer-specific pricing and the integrations that keep B2B operations in step with the storefront.',
      primaryCta: {
        label: 'Get In Touch',
        href: SERVICE_PAGE_ROUTES.contact,
      },
    },
    about: {
      intro: {
        heading:
          'Software B2B & Wholesale Ecommerce Services',
        description:
          'Selling to business customers on Software means account-based experiences: buyers sign in to a company account, see the pricing agreed with them, order in the quantities their business works to, and expect the storefront to reflect how the trading relationship already runs. Byte Operator builds those experiences on Software and Enterprise Platform Solutions, including stores that serve DTC and B2B audiences from the same catalogue, and connects them to the systems that hold pricing, stock and customer records.',
        cta: {
          label: 'Get In Touch',
          href: SERVICE_PAGE_ROUTES.contact,
        },
      },
      media: {
        primary: '/images/services/services-wide.webp', primaryWidth: 1672, primaryHeight: 941,
        primaryAlt:
          'Byte Operator Software B2B and wholesale ecommerce project work',
        secondary: '/images/mega-menu-team.webp', secondaryWidth: 1970, secondaryHeight: 1306,
        secondaryAlt:
          'Byte Operator team planning a Software wholesale storefront',
      },
      process: {
        heading: 'Our Software B2B Project Process',
        leftDescription:
          'We begin with how the wholesale side of the business currently operates: who the customer accounts are, how prices are agreed, how orders arrive today, what the minimum order requirements are, and where the ordering process still depends on spreadsheets, email or phone. That picture decides what belongs in the storefront and what stays in the systems behind it.',
        rightDescription:
          'From there we design the logged-in buying experience, build it on Software or Enterprise Platform Solutions alongside the required integrations, and test the pricing, ordering and account journeys with real customer scenarios before launch. Where a store serves both DTC and B2B audiences, both experiences are planned together rather than bolted on separately.',
        cta: {
          label: 'Get In Touch',
          href: SERVICE_PAGE_ROUTES.contact,
        },
      },
    },
    features: [
      {
        id: 'software-b2b-wholesale-solutions',
        layout: 'media-left',
        spacing: 'first',
        theme: 'dark',
        eyebrow: 'B2B Ecommerce Agency Solutions',
        heading:
          'Software B2B Solutions Built Around Your Business',
        description: [
          'Business customers buy differently to consumers. They return to reorder known products, work to account terms that were agreed before they reached the storefront, and often need approval or purchase order details recorded against an order. Mapping that journey first shows which parts of the experience need to sit behind a login and which can stay public.',
          'Byte Operator plans Software B2B builds around those journeys: what a trade customer sees before signing in, what unlocks once their company account is recognised, how access to catalogues and pricing is controlled, and which frontend and backend requirements each of those decisions creates.',
        ],
        buttons: [
          {
            label: 'Get In Touch',
            href: SERVICE_PAGE_ROUTES.contact,
          },
        ],
        media: reuseHomeFeatureMedia('software-plus'),
      },
      {
        id: 'software-b2b-wholesale-process',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Our Software B2B Project Process',
        heading:
          'Planning, Designing & Building Software B2B',
        description: [
          'Discovery covers the operational detail: account structures, price lists and discount rules, order minimums, payment arrangements, delivery expectations and the systems that already hold this information. It also covers the manual steps a team would like the storefront to take over.',
          'Design then turns that into the UI a logged-in wholesale buyer works with, and development builds it out on Software or Enterprise Platform Solutions with the integrations it depends on. QA works through pricing, account and checkout scenarios across devices before launch, and we stay involved afterwards as catalogues, accounts and requirements change.',
        ],
        buttons: [
          {
            label: 'Get In Touch',
            href: SERVICE_PAGE_ROUTES.contact,
          },
        ],
        media: reuseHomeFeatureMedia('software-development'),
      },
      {
        id: 'software-b2b-wholesale-technology',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'B2B Technology & Integrations',
        heading: 'Software B2B Technology & Integrations',
        description: [
          'Software includes native B2B capabilities on Plus, covering company profiles, buyer accounts, price lists and B2B-specific catalogues. Wholesale apps such as SparkLayer extend those foundations, and some requirements are better met with a custom build. Which route fits depends on the pricing rules, catalogue structure and ordering behaviour a business needs to support.',
          'Most wholesale operations also depend on systems outside Software: ERP, inventory, CRM, accounting and fulfilment platforms that hold the authoritative record of stock, customers and orders. Byte Operator connects those systems to the storefront through their APIs, whether by configuring an existing app or building a custom integration, so account data, pricing and order flow stay consistent on both sides.',
        ],
        buttons: [
          {
            label: 'Explore API & System Integrations',
            href: SERVICE_PAGE_ROUTES.softwareIntegrations,
          },
        ],
        media: reuseHomeFeatureMedia('software-migrations'),
      },
      {
        id: 'software-b2b-wholesale-pricing-payments',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Software B2B Pricing, Payments & Features',
        heading: 'Pricing, Ordering & Payment Experiences',
        description: [
          'Wholesale pricing rarely fits a single public price. Customer-specific price lists, volume breaks that reward larger quantities, minimum and maximum order requirements, case sizes and account-level discounts all need to be reflected accurately on the product page, in the cart and at checkout.',
          'Payment works differently too. Company accounts can carry agreed terms, orders may be placed for approval or invoicing rather than immediate card payment, and some businesses keep an offline or manual payment step in the process. We configure and build these pricing, ordering and payment rules so the checkout matches the terms a customer already trades on.',
        ],
        buttons: [
          {
            label: 'Get In Touch',
            href: SERVICE_PAGE_ROUTES.contact,
          },
        ],
        media: reuseHomeFeatureMedia('software-cro'),
      },
      {
        id: 'software-b2b-wholesale-design',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'Software B2B Design & Customer Experience',
        heading:
          'Designing Better Wholesale Buying Experiences',
        description: [
          'A B2B storefront has two states to design for. Logged out, it needs to explain the trade offer and lead to an account application. Logged in, it needs to show the right pricing, the right catalogue and the tools a buyer uses regularly: order history, reordering, quantity-led product interfaces and a clear view of volume price breaks.',
          'Byte Operator designs those interfaces alongside the account areas, B2B-specific content and responsive layouts trade buyers use on desktop in the office and on mobile on site. The result is a customer-specific experience that reflects each account rather than a consumer storefront with wholesale prices applied to it.',
        ],
        buttons: [
          {
            label: 'Explore Design Services',
            href: SERVICE_PAGE_ROUTES.softwareWebDesign,
          },
        ],
        media: reuseHomeFeatureMedia('software-design'),
      },
    ],
  },
  podcast: {
    faqTitle: 'Byte Operator Software Ecommerce Podcast',
    hero: {
      eyebrow: 'Byte Operator Ecommerce Podcast',
      heading: 'Software Ecommerce Podcast for Growth-Focused Teams',
      chips: [
        {label: 'Software Growth', href: SERVICE_PAGE_ROUTES.softwareDevelopment},
        {label: 'Ecommerce SEO', href: SERVICE_PAGE_ROUTES.ecommerceSeo},
        {label: 'Ecommerce CRO', href: SERVICE_PAGE_ROUTES.ecommerceCro},
        {label: 'Enterprise Platform Solutions', href: SERVICE_PAGE_ROUTES.softwarePlus},
        {label: 'Retention Strategy', href: SERVICE_PAGE_ROUTES.emailMarketingAgency},
      ],
      description: 'The Byte Operator Software Ecommerce Podcast shares practical conversations and perspectives for ecommerce teams navigating Software growth, SEO, CRO, development, retention and ecommerce strategy.',
      primaryCta: {label: 'Get In Touch', href: SERVICE_PAGE_ROUTES.contact},
    },
    about: {
      intro: {
        heading: 'The Byte Operator Software Ecommerce Podcast',
        description: 'Insights and ecommerce conversations for teams building, improving and growing on Software. The Byte Operator podcast explores the connected decisions behind sustainable ecommerce performance: development, product discovery, conversion and retention.',
        cta: {label: 'Get In Touch', href: SERVICE_PAGE_ROUTES.contact},
      },
      media: {primary: '/images/services/services-wide.webp', primaryWidth: 1672, primaryHeight: 941, primaryAlt: 'Byte Operator ecommerce podcast and Software strategy discussion', secondary: '/images/mega-menu-team.webp', secondaryWidth: 1970, secondaryHeight: 1306, secondaryAlt: 'Byte Operator team discussing ecommerce strategy'},
      process: {
        heading: 'Ecommerce Topics We Explore',
        leftDescription: 'The conversation starts with Software and Enterprise Platform Solutions development, technical and content SEO, conversion rate optimisation, customer retention and the commercial priorities that connect them.',
        rightDescription: 'The podcast focuses on how development, acquisition, conversion and retention support a clearer customer journey and a stronger long-term ecommerce growth strategy.',
        cta: {label: 'Get In Touch', href: SERVICE_PAGE_ROUTES.contact},
      },
    },
    features: [
      {id: 'podcast-software-growth', layout: 'media-left', spacing: 'first', theme: 'dark', eyebrow: 'Software Ecommerce Growth', heading: 'Software Growth Starts With the Store Experience', description: ['Growth on Software is shaped by more than traffic. The storefront needs to make products easy to find, understand and buy, while the technology behind it supports the customer experience a brand needs as it expands.', 'The Byte Operator podcast examines store structure, merchandising and development priorities, connecting ecommerce strategy to an experience customers can use with confidence.'], buttons: [{label: 'Explore Software Development', href: SERVICE_PAGE_ROUTES.softwareDevelopment}], media: reuseHomeFeatureMedia('software-plus')},
      {id: 'podcast-seo-cro', layout: 'media-right', spacing: 'standard', theme: 'dark', eyebrow: 'Ecommerce SEO & CRO', heading: 'Helping Customers Discover and Convert', description: ['SEO and CRO are closely connected in ecommerce. Search visibility can bring the right people to a store, but product pages, collections, navigation, value messaging and checkout journeys all affect what happens next.', 'Our ecommerce conversations look at technical SEO, useful content, product discovery, customer research and the iterative improvements that make a digital platform clearer and easier to buy from.'], buttons: [{label: 'Explore Ecommerce SEO', href: SERVICE_PAGE_ROUTES.ecommerceSeo}], media: reuseHomeFeatureMedia('software-development')},
      {id: 'podcast-software-plus-development', layout: 'media-left', spacing: 'deep', theme: 'dark', eyebrow: 'Enterprise Platform Solutions & Development', heading: 'Building a Software Platform That Can Evolve', description: ['Enterprise Platform Solutions and custom development give ecommerce teams room to address more complex requirements, but the right solution depends on the business model, customer journeys and systems a store needs to support.', 'The podcast covers platform decisions, integrations, performance and flexibility, balancing the need to move quickly now with a dependable foundation for future growth.'], buttons: [{label: 'Explore Enterprise Platform Solutions', href: SERVICE_PAGE_ROUTES.softwarePlus}], media: reuseHomeFeatureMedia('software-migrations')},
      {id: 'podcast-retention', layout: 'media-right', spacing: 'standard', theme: 'dark', eyebrow: 'Customer Retention', heading: 'Retention Is Part of the Ecommerce Journey', description: ['Retention begins with the promise a customer sees before placing an order and continues through every useful interaction after it. Product information, onsite experience and post-purchase communication all contribute to whether a customer returns.', 'We explore how ecommerce teams can connect retention strategy to the rest of their Software activity, using customer understanding and relevant communication to build relationships beyond a single transaction.'], buttons: [{label: 'Explore Email Marketing', href: SERVICE_PAGE_ROUTES.emailMarketingAgency}], media: reuseHomeFeatureMedia('software-cro')},
      {id: 'podcast-ecommerce-strategy', layout: 'media-left', spacing: 'deep', theme: 'dark', eyebrow: 'Ecommerce Strategy', heading: 'A More Connected Ecommerce Strategy', description: ['The strongest ecommerce strategy connects the decisions customers can see with the systems and processes they cannot. It gives teams a shared view of improvements across the storefront, acquisition, conversion, retention and operations.', 'The Byte Operator Software Ecommerce Podcast helps teams focus on practical priorities that make a store more useful to customers and more effective for the business behind it.'], buttons: [{label: 'Get In Touch', href: SERVICE_PAGE_ROUTES.contact}], media: reuseHomeFeatureMedia('software-design')},
    ],
  },
  webinars: {
    faqTitle: 'Byte Operator Software Ecommerce Webinars',
    hero: {
      eyebrow: 'Byte Operator Ecommerce Webinars',
      heading: 'Software Ecommerce Webinars for Growth-Focused Teams',
      chips: [
        {label: 'Software Growth', href: SERVICE_PAGE_ROUTES.softwareDevelopment},
        {label: 'Ecommerce SEO', href: SERVICE_PAGE_ROUTES.ecommerceSeo},
        {label: 'Ecommerce CRO', href: SERVICE_PAGE_ROUTES.ecommerceCro},
        {label: 'Enterprise Platform Solutions', href: SERVICE_PAGE_ROUTES.softwarePlus},
        {label: 'Retention Strategy', href: SERVICE_PAGE_ROUTES.emailMarketingAgency},
      ],
      description: 'Byte Operator ecommerce webinars explore practical Software strategy across growth, SEO, CRO, development, Enterprise Platform Solutions, retention and the customer journey.',
      primaryCta: {label: 'Get In Touch', href: SERVICE_PAGE_ROUTES.contact},
    },
    about: {
      intro: {
        heading: 'Byte Operator Software Ecommerce Webinars',
        description: 'Watch ecommerce sessions for teams building, improving and growing on Software. Byte Operator webinars bring together the connected decisions behind sustainable ecommerce performance: development, product discovery, conversion and retention.',
        cta: {label: 'Get In Touch', href: SERVICE_PAGE_ROUTES.contact},
      },
      media: {primary: '/images/services/services-wide.webp', primaryWidth: 1672, primaryHeight: 941, primaryAlt: 'Byte Operator Software ecommerce webinar session', secondary: '/images/mega-menu-team.webp', secondaryWidth: 1970, secondaryHeight: 1306, secondaryAlt: 'Byte Operator team planning ecommerce strategy'},
      process: {
        heading: 'Ecommerce Topics We Cover',
        leftDescription: 'Our sessions cover the work that shapes a digital platform: Software and Enterprise Platform Solutions development, technical and content SEO, conversion rate optimisation, retention and the commercial priorities that connect them.',
        rightDescription: 'Each webinar takes a connected view of the customer journey, helping ecommerce teams consider how development, acquisition, conversion and retention contribute to a stronger long-term growth strategy.',
        cta: {label: 'Get In Touch', href: SERVICE_PAGE_ROUTES.contact},
      },
    },
    features: [
      {id: 'webinars-software-growth', layout: 'media-left', spacing: 'first', theme: 'dark', eyebrow: 'Software Ecommerce Growth', heading: 'Software Growth Starts With the Store Experience', description: ['A digital platformfront should make products easy to find, understand and buy while supporting the customer experience a brand needs as it expands.', 'Our webinars explore the practical decisions behind store structure, merchandising and development priorities, connecting ecommerce strategy to better customer experiences.'], buttons: [{label: 'Explore Software Development', href: SERVICE_PAGE_ROUTES.softwareDevelopment}], media: reuseHomeFeatureMedia('software-plus')},
      {id: 'webinars-seo-cro', layout: 'media-right', spacing: 'standard', theme: 'dark', eyebrow: 'Ecommerce SEO & CRO', heading: 'Helping Customers Discover and Convert', description: ['SEO and CRO are connected in ecommerce. Search visibility can bring the right people to a store, but product pages, collections, navigation and checkout journeys shape what happens next.', 'We cover technical SEO, useful content, product discovery, customer research and the iterative improvements that make digital platforms & applications clearer and easier to buy from.'], buttons: [{label: 'Explore Ecommerce SEO', href: SERVICE_PAGE_ROUTES.ecommerceSeo}], media: reuseHomeFeatureMedia('software-development')},
      {id: 'webinars-software-plus-development', layout: 'media-left', spacing: 'deep', theme: 'dark', eyebrow: 'Enterprise Platform Solutions & Development', heading: 'Building a Software Platform That Can Evolve', description: ['Enterprise Platform Solutions and custom development create room to address more complex requirements, but the right solution depends on the business model, customer journeys and systems a store needs to support.', 'Our sessions consider platform decisions, integrations, performance and flexibility, balancing immediate priorities with a dependable foundation for future growth.'], buttons: [{label: 'Explore Enterprise Platform Solutions', href: SERVICE_PAGE_ROUTES.softwarePlus}], media: reuseHomeFeatureMedia('software-migrations')},
      {id: 'webinars-retention', layout: 'media-right', spacing: 'standard', theme: 'dark', eyebrow: 'Customer Retention', heading: 'Retention Is Part of the Ecommerce Journey', description: ['Retention begins with the promise a customer sees before placing an order and continues through every useful interaction after it.', 'We explore how ecommerce teams can connect retention strategy to the rest of their Software activity and build relationships beyond a single transaction.'], buttons: [{label: 'Explore Email Marketing', href: SERVICE_PAGE_ROUTES.emailMarketingAgency}], media: reuseHomeFeatureMedia('software-cro')},
      {id: 'webinars-ecommerce-strategy', layout: 'media-left', spacing: 'deep', theme: 'dark', eyebrow: 'Ecommerce Strategy', heading: 'A More Connected Ecommerce Strategy', description: ['The strongest ecommerce strategy connects the decisions customers can see with the systems and processes they cannot, across storefront, acquisition, conversion, retention and operations.', 'Byte Operator webinars help teams focus on practical priorities that make a store more useful to customers and more effective for the business behind it.'], buttons: [{label: 'Get In Touch', href: SERVICE_PAGE_ROUTES.contact}], media: reuseHomeFeatureMedia('software-design')},
    ],
  },
  guides: {
    faqTitle: 'Byte Operator Software & Ecommerce Guides',
    hero: {
      eyebrow: 'Byte Operator Ecommerce Guides',
      heading: 'Software & Ecommerce Guides for Growth-Focused Teams',
      chips: [
        {label: 'Software Guides', href: SERVICE_PAGE_ROUTES.softwareDevelopment},
        {label: 'Ecommerce SEO', href: SERVICE_PAGE_ROUTES.ecommerceSeo},
        {label: 'Ecommerce CRO', href: SERVICE_PAGE_ROUTES.ecommerceCro},
        {label: 'Enterprise Platform Solutions', href: SERVICE_PAGE_ROUTES.softwarePlus},
        {label: 'Platform & Cloud Migrations', href: SERVICE_PAGE_ROUTES.softwareMigrations},
      ],
      description: 'Byte Operator Software and ecommerce guides help teams navigate growth strategy, SEO, CRO, development, migrations, Enterprise Platform Solutions and customer retention.',
      primaryCta: {label: 'Get In Touch', href: SERVICE_PAGE_ROUTES.contact},
    },
    about: {
      intro: {
        heading: 'Byte Operator Software & Ecommerce Guides',
        description: 'Practical ecommerce guidance for teams building, improving and growing on Software. Byte Operator guides explore the connected decisions behind sustainable ecommerce performance: development, product discovery, conversion, migration planning and retention.',
        cta: {label: 'Get In Touch', href: SERVICE_PAGE_ROUTES.contact},
      },
      media: {primary: '/images/services/services-wide.webp', primaryWidth: 1672, primaryHeight: 941, primaryAlt: 'Byte Operator Software ecommerce guide and strategy planning', secondary: '/images/mega-menu-team.webp', secondaryWidth: 1970, secondaryHeight: 1306, secondaryAlt: 'Byte Operator team discussing ecommerce growth strategy'},
      process: {
        heading: 'Ecommerce Topics We Explore',
        leftDescription: 'Our guides cover the work that shapes a digital platform: Software and Enterprise Platform Solutions development, technical and content SEO, conversion rate optimisation, migrations, customer retention and the commercial priorities that connect them.',
        rightDescription: 'Each guide takes a connected view of ecommerce strategy, helping teams consider how development, acquisition, conversion, retention and platform decisions contribute to long-term growth.',
        cta: {label: 'Get In Touch', href: SERVICE_PAGE_ROUTES.contact},
      },
    },
    features: [
      {id: 'guides-software-growth', layout: 'media-left', spacing: 'first', theme: 'dark', eyebrow: 'Software Ecommerce Growth', heading: 'Software Growth Starts With the Store Experience', description: ['A digital platformfront should make products easy to find, understand and buy while supporting the customer experience a brand needs as it expands.', 'Our guides explore the practical decisions behind store structure, merchandising and development priorities, connecting ecommerce strategy to better customer experiences.'], buttons: [{label: 'Explore Software Development', href: SERVICE_PAGE_ROUTES.softwareDevelopment}], media: reuseHomeFeatureMedia('software-plus')},
      {id: 'guides-seo-cro', layout: 'media-right', spacing: 'standard', theme: 'dark', eyebrow: 'Ecommerce SEO & CRO', heading: 'Helping Customers Discover and Convert', description: ['SEO and CRO are connected in ecommerce. Search visibility can bring the right people to a store, but product pages, collections, navigation and checkout journeys shape what happens next.', 'Our guides cover technical SEO, useful content, product discovery, customer research and the iterative improvements that make digital platforms & applications clearer and easier to buy from.'], buttons: [{label: 'Explore Ecommerce SEO', href: SERVICE_PAGE_ROUTES.ecommerceSeo}], media: reuseHomeFeatureMedia('software-development')},
      {id: 'guides-software-plus-development', layout: 'media-left', spacing: 'deep', theme: 'dark', eyebrow: 'Enterprise Platform Solutions & Development', heading: 'Building a Software Platform That Can Evolve', description: ['Enterprise Platform Solutions and custom development create room to address more complex requirements, but the right solution depends on the business model, customer journeys and systems a store needs to support.', 'Our guides consider platform decisions, integrations, performance and flexibility, balancing immediate priorities with a dependable foundation for future growth.'], buttons: [{label: 'Explore Enterprise Platform Solutions', href: SERVICE_PAGE_ROUTES.softwarePlus}], media: reuseHomeFeatureMedia('software-migrations')},
      {id: 'guides-migrations-retention', layout: 'media-right', spacing: 'standard', theme: 'dark', eyebrow: 'Migrations & Retention', heading: 'Supporting Change and Customer Relationships', description: ['A successful platform & cloud migration protects the customer experience while giving the business a stronger platform to build on. Retention depends on the useful interactions that follow every order.', 'We explore how ecommerce teams can plan store migrations and connect retention strategy to the rest of their Software activity.'], buttons: [{label: 'Explore Platform & Cloud Migrations', href: SERVICE_PAGE_ROUTES.softwareMigrations}], media: reuseHomeFeatureMedia('software-cro')},
      {id: 'guides-ecommerce-strategy', layout: 'media-left', spacing: 'deep', theme: 'dark', eyebrow: 'Ecommerce Strategy', heading: 'A More Connected Ecommerce Strategy', description: ['The strongest ecommerce strategy connects the decisions customers can see with the systems and processes they cannot, across storefront, acquisition, conversion, retention and operations.', 'Byte Operator guides help teams focus on practical priorities that make a store more useful to customers and more effective for the business behind it.'], buttons: [{label: 'Get In Touch', href: SERVICE_PAGE_ROUTES.contact}], media: reuseHomeFeatureMedia('software-design')},
    ],
  },
  'subscriptions-on-software': {
    faqTitle: 'Software Subscriptions',
    hero: {
      eyebrow: 'Software Subscription Specialists',
      heading:
        'Software Subscription Services for Ecommerce Brands',
      chips: [
        {
          label: 'Digital Platform Builds',
          href: SERVICE_PAGE_ROUTES.softwareDevelopment,
        },
        {
          label: 'Ecommerce SEO',
          href: SERVICE_PAGE_ROUTES.ecommerceSeo,
        },
        {
          label: 'Development Services',
          href: SERVICE_PAGE_ROUTES.softwareDevelopment,
        },
        {
          label: 'Ecommerce CRO',
          href: SERVICE_PAGE_ROUTES.ecommerceCro,
        },
      ],
      description:
        'Byte Operator implements and improves subscription experiences on Software and Enterprise Platform Solutions, covering recurring purchase options, the signup journey, the customer account tools behind managing a subscription, and the integrations each of those depends on.',
      primaryCta: {
        label: 'Get In Touch',
        href: SERVICE_PAGE_ROUTES.contact,
      },
    },
    about: {
      intro: {
        heading: 'Software Subscription Solutions',
        description:
          'Subscriptions change how a store works. Products need a recurring option alongside the one-off purchase, customers need somewhere to pause, skip, swap or reschedule an order, and the store needs to keep billing, inventory and fulfilment in step with every renewal. Byte Operator plans and builds those experiences on Software and Enterprise Platform Solutions, choosing a subscription model that suits the products being sold and connecting the subscription platform to the storefront, customer accounts and the systems behind them.',
        cta: {
          label: 'Get In Touch',
          href: SERVICE_PAGE_ROUTES.contact,
        },
      },
      media: {
        primary: '/images/services/services-wide.webp', primaryWidth: 1672, primaryHeight: 941,
        primaryAlt:
          'Byte Operator Software subscription ecommerce project work',
        secondary: '/images/mega-menu-team.webp', secondaryWidth: 1970, secondaryHeight: 1306,
        secondaryAlt:
          'Byte Operator team planning a Software subscription experience',
      },
      process: {
        heading: 'Our Subscription Process',
        leftDescription:
          'We start with the subscription model itself: which products suit a recurring order, how often customers would realistically want them, whether the offer is a straight replenishment, a curated selection or a build-your-own box, and what discount or commitment sits behind it. That decides which platform and which storefront changes the store actually needs.',
        rightDescription:
          'From there we design the signup and management experience, build it out on Software or Enterprise Platform Solutions with the chosen subscription technology, and connect it to customer accounts, fulfilment and the reporting a team relies on. Renewal, payment, and pause and cancel journeys are tested before launch, and we keep refining them once real subscribers are using the store.',
        cta: {
          label: 'Get In Touch',
          href: SERVICE_PAGE_ROUTES.contact,
        },
      },
    },
    features: [
      {
        id: 'subscriptions-on-software-experts',
        layout: 'media-left',
        spacing: 'first',
        theme: 'dark',
        eyebrow: 'Software Subscription Experts',
        heading:
          'Subscription Experiences Built Around Your Customers',
        description: [
          'A subscription is a long relationship rather than a single transaction, so the experience has to hold up well beyond signup. Customers need to understand what they are committing to before they subscribe, and they need straightforward control over frequency, products, delivery dates and payment details afterwards.',
          'Byte Operator covers both sides of that: the setup and signup journey on the storefront, and the ongoing management experience in the customer account. Behind them sits the technical implementation, including how the subscription platform, Software and any connected systems exchange data as orders renew.',
        ],
        buttons: [
          {
            label: 'Get In Touch',
            href: SERVICE_PAGE_ROUTES.contact,
          },
        ],
        media: reuseHomeFeatureMedia('email-sms-retention'),
      },
      {
        id: 'subscriptions-on-software-process',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Software Subscription Agency',
        heading: 'Our Subscription Process',
        description: [
          'Discovery sets the requirements and the subscription model: the products involved, delivery frequencies, pricing and discount rules, commitment or minimum terms, and how fulfilment and customer service will handle recurring orders. It also covers any existing subscribers who would need migrating.',
          'Design then turns that into the signup and management UI, and development builds it on Software or Enterprise Platform Solutions with the subscription platform and integrations it depends on. QA works through the full lifecycle, including renewals, failed payments, pauses and cancellations, before launch.',
        ],
        buttons: [
          {
            label: 'Get In Touch',
            href: SERVICE_PAGE_ROUTES.contact,
          },
        ],
        media: reuseHomeFeatureMedia('software-development'),
      },
      {
        id: 'subscriptions-on-software-technology',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'Software Subscription Technology',
        heading: 'Subscription Technology & Integrations',
        description: [
          'Software provides the subscription foundations, including selling plans and the contracts that recurring orders are billed against. Third-party platforms such as Recharge and Skio build on top of those foundations with their own management tools, portals and APIs, and each takes a different approach to how much of the experience can be customised.',
          'We help choose the technology that fits the subscription model rather than the other way round, then build the integrations around it: connecting the subscription platform to Software customer accounts, to fulfilment, inventory and CRM systems, and to the reporting a team uses, working through each platform’s APIs where a standard app configuration is not enough.',
        ],
        buttons: [
          {
            label: 'Explore API & System Integrations',
            href: SERVICE_PAGE_ROUTES.softwareIntegrations,
          },
        ],
        media: reuseHomeFeatureMedia('software-migrations'),
      },
      {
        id: 'subscriptions-on-software-design',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Software Subscription Design',
        heading: 'Custom Subscription Design & Experiences',
        description: [
          'Default subscription widgets rarely match the rest of a storefront. We design branded subscription UI instead: the one-off and recurring options on the product page, the way frequency and quantity are chosen, and the pricing and terms a customer sees before committing.',
          'The same applies after signup. Customer portals and account areas need clear routes to pause, skip, swap products, change a delivery date or cancel, and build-a-box formats need an interface that makes selecting and editing a box straightforward. Where a platform’s hosted portal cannot support that, we build API-led custom implementations inside the store’s own account experience.',
        ],
        buttons: [
          {
            label: 'Explore Design Services',
            href: SERVICE_PAGE_ROUTES.softwareWebDesign,
          },
        ],
        media: reuseHomeFeatureMedia('software-design'),
      },
      {
        id: 'subscriptions-on-software-benefits',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'Software Subscription Benefits',
        heading: 'Support Retention & Repeat Purchasing',
        description: [
          'Subscriptions suit products people buy again on a reasonably predictable cycle. For the customer, the convenience is that reordering happens without them having to think about it. For the store, recurring orders make repeat purchasing part of the normal rhythm of the business rather than something that has to be prompted each time.',
          'That relationship only holds if the experience stays flexible. Customers who can easily pause, delay or adjust an order are far more likely to stay subscribed than customers whose only visible option is to cancel, so we treat those journeys as central to retention rather than as edge cases.',
        ],
        buttons: [
          {
            label: 'Explore Ecommerce CRO',
            href: SERVICE_PAGE_ROUTES.ecommerceCro,
          },
        ],
        media: reuseHomeFeatureMedia('software-support-growth'),
      },
    ],
  },
  'support-and-maintenance': {
    faqTitle: 'Software Support and Maintenance',
    hero: {
      eyebrow: 'Software Support and Maintenance Services',
      heading:
        'Software Support and Maintenance Services for Growing Ecommerce Stores',
      chips: [
        {
          label: 'Digital Platform Builds',
          href: SERVICE_PAGE_ROUTES.softwareDevelopment,
        },
        {
          label: 'Ecommerce CRO',
          href: SERVICE_PAGE_ROUTES.ecommerceCro,
        },
        {
          label: 'Custom Software & App Development',
          href: SERVICE_PAGE_ROUTES.softwareAppDevelopment,
        },
        {
          label: 'API & System Integrations',
          href: SERVICE_PAGE_ROUTES.softwareIntegrations,
        },
      ],
      bottomLogo: {
        text: 'Byte Operator',
        src: '/images/home-services/badges/logo-helpdesk-white.svg', width: 130, height: 50,
        alt: 'HelpDesk',
      },
      description:
        'Byte Operator provides ongoing Software support and maintenance for stores that keep changing after launch: bug fixes, troubleshooting, theme changes, app and integration support, and performance improvements, across both Software and Enterprise Platform Solutions.',
      primaryCta: {
        label: 'Talk to Our Software Support Team',
        href: SERVICE_PAGE_ROUTES.contact,
      },
    },
    // The About section on this page deliberately ends after the image pair,
    // so the optional lower `process` block is omitted here only. Every other
    // service page still supplies it.
    about: {
      intro: {
        heading:
          'What’s Included in Our Software Support & Maintenance Services',
        description:
          'Support and maintenance covers the everyday work of keeping a digital platform running well and moving forward. That includes general store maintenance, fixing bugs and troubleshooting reported issues, theme updates and UX changes, configuring apps and the integrations connected to them, working on performance, and providing ongoing technical support to the team managing the store.',
        cta: {
          label: 'Get In Touch',
          href: SERVICE_PAGE_ROUTES.contact,
        },
      },
      media: {
        primary: '/images/services/services-wide.webp', primaryWidth: 1672, primaryHeight: 941,
        primaryAlt:
          'Byte Operator Software support and maintenance project work',
        secondary: '/images/mega-menu-team.webp', secondaryWidth: 1970, secondaryHeight: 1306,
        secondaryAlt:
          'Byte Operator team working on ongoing digital platform support',
      },
    },
    features: [
      {
        id: 'support-and-maintenance-what-is-it',
        layout: 'media-left',
        spacing: 'first',
        theme: 'dark',
        eyebrow: 'What Are Software Support and Maintenance Services?',
        heading:
          'Ongoing Store Support for a Stable and Improving Digital Platform',
        description: [
          'Software support and maintenance is the ongoing work that happens after a store is live. Themes get edited, apps get added and removed, products and campaigns change, and Software itself keeps developing. Each of those is a point where something can break or drift away from how it was built.',
          'Byte Operator works across Software and Enterprise Platform Solutions on that ongoing layer: fixing issues as they are reported, making the theme and UX changes a team needs, keeping apps and integrations behaving as expected, and improving performance where the store would benefit from it.',
        ],
        buttons: [
          {
            label: 'Talk to Our Software Support Team',
            href: SERVICE_PAGE_ROUTES.contact,
          },
        ],
        media: reuseHomeFeatureMedia('software-support-growth'),
      },
      {
        id: 'support-and-maintenance-partner',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Why Work With a Software Support & Maintenance Partner?',
        heading: 'Consistent Support for Your Digital Platform',
        description: [
          'Store issues rarely arrive at a convenient moment, and they are harder to resolve when nobody has context on how the store was built. Working with a support partner means the people making changes already understand the theme, the apps in use and the integrations behind them.',
          'That continuity also makes it easier to decide what is worth doing. Small fixes get handled as they come up, while larger changes can be scoped properly rather than being rushed into the theme, so the store stays maintainable as the business keeps growing.',
        ],
        buttons: [
          {
            label: 'Get In Touch',
            href: SERVICE_PAGE_ROUTES.contact,
          },
        ],
        media: reuseHomeFeatureMedia('software-development'),
      },
      {
        id: 'support-and-maintenance-common-problems',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'Common Software Problems We Solve',
        heading: 'Fixing Store Issues and Protecting Performance',
        description: [
          'Typical support work includes cart and checkout issues, functionality that has stopped working as expected, responsive and layout problems across devices, and bugs introduced by theme edits. App conflicts are another regular cause, particularly where several apps inject scripts into the same templates.',
          'Alongside those, we work on tracking and analytics that has stopped reporting correctly, site speed that has degraded over time, and custom code that no longer fits the rest of the theme. Each is investigated to find the underlying cause rather than patched at the surface.',
        ],
        buttons: [
          {
            label: 'Report a Store Issue',
            href: SERVICE_PAGE_ROUTES.contact,
          },
        ],
        media: reuseHomeFeatureMedia('software-migrations'),
      },
      {
        id: 'support-and-maintenance-how-it-works',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'How Our Software Support & Maintenance Works',
        heading: 'A Structured Approach to Ongoing Software Support',
        description: [
          'Requests are reviewed first, so the actual problem or requirement is understood before any work starts. From there they are prioritised alongside everything else in progress, balancing issues that affect the storefront now against improvements that can be planned into a wider piece of work.',
          'Development and design support then delivers the change, it is tested, and it is implemented on the live store. Recurring issues and things worth improving feed back into the ongoing work rather than being closed and forgotten.',
        ],
        buttons: [
          {
            label: 'Get In Touch',
            href: SERVICE_PAGE_ROUTES.contact,
          },
        ],
        media: reuseHomeFeatureMedia('software-launch'),
      },
      {
        id: 'support-and-maintenance-monitor-improve',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'What We Monitor and Improve',
        heading: 'Keeping Your Digital Platform Stable and Performing',
        description: [
          'Ongoing maintenance means paying attention to the store between requests: site speed, theme stability after edits, how installed apps are behaving, and whether backend functionality is still doing what it was built to do.',
          'Bugs that surface are worked through, and performance data is used to decide where effort is best spent. Treating store health as continuous work keeps small problems from turning into ones that need a much larger fix.',
        ],
        buttons: [
          {
            label: 'Get In Touch',
            href: SERVICE_PAGE_ROUTES.contact,
          },
        ],
        media: reuseHomeFeatureMedia('software-cro'),
      },
      {
        id: 'support-and-maintenance-themes-apps',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Theme Updates and App Management',
        heading: 'Keeping Themes, Apps and Integrations Updated',
        description: [
          'Theme updates and app changes are where most stores pick up problems. We handle theme updates, app installations and removals, and the integrations connected to them, including the leftover code an uninstalled app often leaves behind.',
          'Compatibility is checked against existing custom code so conflicts are found before they reach customers, and changes are tested before going live rather than after a problem is reported.',
        ],
        buttons: [
          {
            label: 'Explore API & System Integrations',
            href: SERVICE_PAGE_ROUTES.softwareIntegrations,
          },
        ],
        media: reuseHomeFeatureMedia('software-design'),
      },
      {
        id: 'support-and-maintenance-store-health',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'Performance and Store Health',
        heading: 'Supporting Speed, Stability and Reliability',
        description: [
          'Performance work looks at what the storefront is actually loading: scripts stacked up by successive app installs, code conflicts between customisations, and features that have quietly broken along the way.',
          'Integrations are checked as part of the same picture, since a slow or failing connection to another system affects the store as much as the theme does. Technical maintenance keeps all of that in a reliable state as the store keeps changing.',
        ],
        buttons: [
          {
            label: 'Get In Touch',
            href: SERVICE_PAGE_ROUTES.contact,
          },
        ],
        media: reuseHomeFeatureMedia('software-plus'),
      },
      {
        id: 'support-and-maintenance-vs-cro',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Support & Maintenance vs CRO',
        heading: 'Choosing the Right Type of Software Support',
        description: [
          'Support and maintenance is about stability. It covers fixes, theme and app updates, and the ongoing technical support that keeps a store working as intended for the people using it and the team running it.',
          'CRO is a different kind of work. It is experimentation and UX improvement aimed at conversion, using research and testing to change how the store performs commercially. Most stores need both, but they are separate engagements with separate goals.',
        ],
        buttons: [
          {
            label: 'Explore Ecommerce CRO',
            href: SERVICE_PAGE_ROUTES.ecommerceCro,
          },
        ],
        media: reuseHomeFeatureMedia('software-seo-geo'),
      },
    ],
    showPartners: true,
    plusAgencyCta: {
      heading: 'Looking for a Enterprise Software Agency?',
      descriptionHtml: `Move up to <a href="${SERVICE_PAGE_ROUTES.softwarePlus}">Enterprise Platform Solutions</a> with Byte Operator. Alongside ongoing support and maintenance, our team works on Enterprise Platform Solutions builds, migrations and development for stores that have outgrown their current setup.`,
      cta: {
        label: 'Upgrade to Enterprise Platform Solutions with Byte Operator',
        href: SERVICE_PAGE_ROUTES.softwarePlus,
      },
    },
  },
  'ai-ecommerce-agency': {
    faqTitle: 'AI Ecommerce Agency',
    hero: {
      eyebrow: 'AI Ecommerce & Software Agency',
      heading:
        'AI Ecommerce Agency Combining Human Expertise with AI',
      chips: [
        {
          label: 'Design / Creative Services',
          href: SERVICE_PAGE_ROUTES.softwareWebDesign,
        },
        {
          label: 'Hire Software Developers',
          href: SERVICE_PAGE_ROUTES.softwareDevelopers,
        },
        {
          label: 'Theme Development',
          href: SERVICE_PAGE_ROUTES.softwareDevelopment,
        },
        {
          label: 'Ecommerce CRO',
          href: SERVICE_PAGE_ROUTES.ecommerceCro,
        },
      ],
      description:
        'Byte Operator uses AI as part of how we work across ecommerce strategy, design, development, analysis, automation, SEO and AI-search discovery. It supports the people doing the work rather than replacing them, and everything it contributes is reviewed by the team before it reaches a store.',
      primaryCta: {
        label: 'Get In Touch',
        href: SERVICE_PAGE_ROUTES.contact,
      },
    },
    about: {
      intro: {
        heading:
          'AI Embedded Across Ecommerce Strategy, Design and Development',
        description:
          'AI is part of our day-to-day workflow rather than a separate service. It helps with research, drafting and analysis, surfaces patterns in data that would otherwise take longer to find, and assists with design exploration, development tasks, search and content work. Every output is reviewed by the strategists, designers and developers responsible for the work, because judgement about what suits a particular store still comes from the team.',
        cta: {
          label: 'Get In Touch',
          href: SERVICE_PAGE_ROUTES.contact,
        },
      },
      media: {
        primary: '/images/services/services-wide.webp', primaryWidth: 1672, primaryHeight: 941,
        primaryAlt:
          'Byte Operator AI-assisted ecommerce project work',
        secondary: '/images/mega-menu-team.webp', secondaryWidth: 1970, secondaryHeight: 1306,
        secondaryAlt:
          'Byte Operator team reviewing AI-assisted ecommerce work',
      },
      process: {
        heading:
          'AI-assisted workflows with human expertise at every decision point.',
        leftDescription:
          'We use AI where it genuinely helps: gathering and summarising research, working through analytics and behavioural data, exploring design directions, assisting with code and documentation, and handling repetitive steps in ecommerce operations and content workflows.',
        rightDescription:
          'What it produces is treated as input, not output. Strategy, design decisions, code that ships and anything customer-facing goes through the same human review as work produced any other way, so the store reflects deliberate choices about the brand and its customers.',
        cta: {
          label: 'Get In Touch',
          href: SERVICE_PAGE_ROUTES.contact,
        },
      },
    },
    features: [
      {
        id: 'ai-ecommerce-agency-delivery',
        layout: 'media-left',
        spacing: 'first',
        theme: 'dark',
        eyebrow: 'AI for Ecommerce Delivery',
        heading: 'Using AI to Create More Value Across Ecommerce',
        description: [
          'AI touches most stages of an ecommerce project. It supports strategy work by making research and analysis easier to get through, assists design and development during delivery, and helps with the optimisation and analysis that continues once a store is live.',
          'Automation covers the parts of the process that are repetitive by nature. Applying AI selectively across those areas leaves the team more time for the decisions that need ecommerce experience, rather than changing what the team is responsible for.',
        ],
        buttons: [
          {
            label: 'Get In Touch',
            href: SERVICE_PAGE_ROUTES.contact,
          },
        ],
        media: reuseHomeFeatureMedia('software-launch'),
      },
      {
        id: 'ai-ecommerce-agency-creative',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'AI in Creative Strategy and Execution',
        heading: 'AI-Assisted Ideation, Design and Content Workflows',
        description: [
          'In creative work AI is useful early: generating ideas to react to, exploring layout and campaign concepts, and drafting content that gives the team something concrete to shape. It widens the range of directions considered before a decision is made.',
          'Design exploration still resolves through the designers. Brand consistency, hierarchy, accessibility and how a layout actually behaves in a Software theme are judgements AI cannot make on its own, so every concept goes through human review before it becomes part of a store.',
        ],
        buttons: [
          {
            label: 'Explore Design Services',
            href: SERVICE_PAGE_ROUTES.softwareWebDesign,
          },
        ],
        media: reuseHomeFeatureMedia('software-design'),
      },
      {
        id: 'ai-ecommerce-agency-development',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'AI in Development',
        heading: 'AI-Assisted Software Development',
        description: [
          'During development, AI assists with scoping and documenting requirements, writing and reviewing code, working through debugging, and handling repetitive development tasks. It also supports QA by helping cover cases that are easy to overlook when working through a build.',
          'Developers remain responsible for what ships. Suggested code is read, tested and adjusted to fit the theme and the store it belongs to, in the same way any other contribution to a codebase would be.',
        ],
        buttons: [
          {
            label: 'Explore Development Services',
            href: SERVICE_PAGE_ROUTES.softwareDevelopment,
          },
        ],
        media: reuseHomeFeatureMedia('software-development'),
      },
      {
        id: 'ai-ecommerce-agency-analysis',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'AI in Strategy and Analysis',
        heading: 'Using AI to Support Ecommerce Analysis',
        description: [
          'Ecommerce generates more data than most teams have time to read. AI helps work through analytics, behavioural data, heatmaps and session recordings, and commercial trends, pulling out patterns in customer behaviour that are worth a closer look.',
          'That feeds into prioritisation. Audit insights and analysis become a clearer picture of where attention is best spent, which the team then weighs against what is realistic for the store and the business behind it.',
        ],
        buttons: [
          {
            label: 'Explore Architecture & Code Audits',
            href: SERVICE_PAGE_ROUTES.softwareAudits,
          },
        ],
        media: reuseHomeFeatureMedia('software-cro'),
      },
      {
        id: 'ai-ecommerce-agency-automation',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'AI Automation and Integration',
        heading: 'AI Automation for Ecommerce Operations',
        description: [
          'Plenty of ecommerce work is process rather than decision: moving data between systems, preparing information for a team to act on, or repeating the same steps each time a campaign or product launch comes round. Those are the parts worth automating.',
          'We build that automation into internal processes and connect it to the third-party tools and APIs a store already relies on, so marketing and development workflows fit together instead of being maintained by hand.',
        ],
        buttons: [
          {
            label: 'Explore API & System Integrations',
            href: SERVICE_PAGE_ROUTES.softwareIntegrations,
          },
        ],
        media: reuseHomeFeatureMedia('software-migrations'),
      },
      {
        id: 'ai-ecommerce-agency-seo-geo',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'AI SEO and GEO Optimisation',
        heading: 'Preparing Ecommerce Content for AI-Driven Discovery',
        description: [
          'People increasingly reach products through AI search and conversational tools such as ChatGPT and Gemini, alongside traditional search engines. Those systems read content differently, which changes what makes a product or collection page easy to surface.',
          'Ecommerce AI SEO and GEO work focuses on semantic relevance and structured content: describing products and categories in ways that are clear in context, and organising information so it holds together when a system is summarising rather than ranking. The aim is discoverability across both kinds of search.',
        ],
        buttons: [
          {
            label: 'Explore Ecommerce AI SEO',
            href: SERVICE_PAGE_ROUTES.ecommerceAiSeo,
          },
          {
            label: 'Explore Ecommerce GEO',
            href: SERVICE_PAGE_ROUTES.ecommerceGeo,
          },
        ],
        media: reuseHomeFeatureMedia('software-seo-geo'),
      },
      {
        id: 'ai-ecommerce-agency-why-byte-operator',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'Why Byte Operator',
        heading: 'Human Ecommerce Expertise Supported by AI',
        description: [
          'AI is only useful in ecommerce when the people using it understand the context around it. Byte Operator brings together software development, ecommerce strategy, design, SEO and GEO, automation and data analysis, so AI-assisted work is grounded in how stores are actually built and run.',
          'Combining the two is the point. The tooling helps us cover more ground and look at more data, while decisions about a store still come from a team that works on ecommerce every day.',
        ],
        buttons: [
          {
            label: 'Get In Touch',
            href: SERVICE_PAGE_ROUTES.contact,
          },
        ],
        media: reuseHomeFeatureMedia('software-support-growth'),
      },
    ],
  },
  'klaviyo-agency': {
    faqTitle: 'Klaviyo Agency',
    hero: {
      eyebrow:
        'Klaviyo Email Marketing Agency for Software and Enterprise Platform Solutions',
      heading:
        'Klaviyo Expertise for Software Email, SMS and Retention',
      chips: [
        {
          label: 'Email Marketing Agency',
          href: SERVICE_PAGE_ROUTES.emailMarketingAgency,
        },
        {
          label: 'Technical SEO & Search Architecture Agency',
          href: SERVICE_PAGE_ROUTES.softwareSeo,
        },
        {
          label: 'Development Services',
          href: SERVICE_PAGE_ROUTES.softwareDevelopment,
        },
        {
          label: 'Ecommerce CRO',
          href: SERVICE_PAGE_ROUTES.ecommerceCro,
        },
      ],
      bottomLogo: {
        text: 'Byte Operator',
        src: '/images/home-services/badges/logo-retain-white.svg', width: 130, height: 50,
        alt: 'Retain',
      },
      bottomBadge: {
        src: '/images/services/klaviyo/klaviyo-advisor-silver.webp', width: 380, height: 160,
        alt: 'Klaviyo Advisor badge',
      },
      description:
        'Byte Operator brings Klaviyo expertise to Software and Enterprise Platform Solutions stores, covering email marketing, SMS, automated flows and the segmentation behind them. The aim is lifecycle communication that reflects how customers actually buy, using the store data Klaviyo already receives from Software.',
      primaryCta: {
        label: 'Get In Touch',
        href: SERVICE_PAGE_ROUTES.contact,
      },
    },
    about: {
      intro: {
        heading:
          'One Klaviyo Strategy for Email, SMS, Flows and Segmentation',
        description:
          'Email marketing, SMS and automated flows work better when they are planned as one programme rather than separate channels. We set up the segmentation that decides who hears what, connect it to the Software data Klaviyo syncs about products, orders and browsing, and build lifecycle communication around it. Retention comes from the whole sequence being coherent, from the first welcome message through to a win-back long after a customer last ordered.',
        cta: {
          label: 'Get In Touch',
          href: SERVICE_PAGE_ROUTES.contact,
        },
      },
      media: {
        primary: '/images/services/services-wide.webp', primaryWidth: 1672, primaryHeight: 941,
        primaryAlt:
          'Byte Operator Klaviyo email marketing project work',
        secondary: '/images/mega-menu-team.webp', secondaryWidth: 1970, secondaryHeight: 1306,
        secondaryAlt:
          'Byte Operator team planning a Klaviyo retention programme',
      },
      process: {
        heading:
          'Klaviyo work planned around the store, its data and its customers.',
        leftDescription:
          'We start with the account itself: how Klaviyo is connected to Software, what data is flowing through, which flows already exist and how the list is segmented. That review usually explains why current messaging is or is not landing, and shows where the gaps in the customer journey are.',
        rightDescription:
          'From there we plan the flows, campaigns and segments worth building, design the templates they use, and add SMS where it fits alongside email rather than duplicating it. Once live, performance is reviewed and the programme keeps being adjusted as the catalogue and customer base change.',
        cta: {
          label: 'Get In Touch',
          href: SERVICE_PAGE_ROUTES.contact,
        },
      },
    },
    features: [
      {
        id: 'klaviyo-agency-strategy',
        layout: 'media-left',
        spacing: 'first',
        theme: 'dark',
        eyebrow: 'Klaviyo Agency',
        heading: 'Klaviyo Strategy for Software Brands',
        description: [
          'Klaviyo does a lot, and most accounts use a fraction of it. We look at what the store is actually trying to achieve — first orders, repeat purchases, reactivating lapsed customers — and build the Klaviyo setup around those objectives instead of switching on every available feature.',
          'That covers the account structure, how email and SMS work together, which flows earn their place, and how campaigns fit alongside the automation. On Software and Enterprise Platform Solutions it also means making sure Klaviyo is receiving the store data the strategy depends on.',
        ],
        buttons: [
          {
            label: 'Get In Touch',
            href: SERVICE_PAGE_ROUTES.contact,
          },
        ],
        media: reuseHomeFeatureMedia('email-sms-retention'),
      },
      {
        id: 'klaviyo-agency-flows',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Klaviyo Flows & Automation',
        heading: 'Automated Klaviyo Flows for Customer Journeys',
        description: [
          'Flows carry most of the work in a retention programme because they respond to what a customer has just done. We build welcome flows for new subscribers, abandoned cart and browse abandonment flows for sessions that did not convert, post-purchase sequences after an order, and win-back flows for customers who have gone quiet.',
          'Back-in-stock notifications are added where the catalogue makes them relevant. Each flow is set up with its own timing, entry conditions and exit rules, so customers are not pulled into several sequences at once or messaged about something they have already done.',
        ],
        buttons: [
          {
            label: 'Explore Email Marketing',
            href: SERVICE_PAGE_ROUTES.emailMarketingAgency,
          },
        ],
        media: reuseHomeFeatureMedia('software-launch'),
      },
      {
        id: 'klaviyo-agency-segmentation',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'Klaviyo Segmentation',
        heading: 'More Relevant Customer Segmentation',
        description: [
          'Segmentation is what stops a Klaviyo account from sending the same message to everyone. Klaviyo holds purchase history, browsing behaviour, engagement and profile data from Software, which is enough to separate first-time buyers from regulars, recent customers from lapsed ones, and engaged subscribers from those who have stopped opening.',
          'We build segments that a team can actually use week to week, then apply them to both campaigns and flows. Keeping messaging relevant also protects list health, since subscribers are far less likely to disengage when what arrives reflects their relationship with the store.',
        ],
        buttons: [
          {
            label: 'Get In Touch',
            href: SERVICE_PAGE_ROUTES.contact,
          },
        ],
        media: reuseHomeFeatureMedia('software-cro'),
      },
      {
        id: 'klaviyo-agency-email-design',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Klaviyo Email Design',
        heading: 'Email Design That Fits Your Brand',
        description: [
          'Emails are part of the brand experience, so they should look like the store rather than a default template. We design Klaviyo templates around the existing brand: typography, colour, imagery and the way products are presented, with a clear hierarchy that works on a phone as well as a desktop inbox.',
          'Templates are built to be reusable, so the team can put a campaign together without rebuilding a layout each time. Accessibility, readable type and sensible fallbacks are handled as part of the build rather than afterwards.',
        ],
        buttons: [
          {
            label: 'Explore Design Services',
            href: SERVICE_PAGE_ROUTES.softwareWebDesign,
          },
        ],
        media: reuseHomeFeatureMedia('software-design'),
      },
      {
        id: 'klaviyo-agency-sms',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'Klaviyo SMS',
        heading: 'Connect SMS with Your Retention Strategy',
        description: [
          'SMS is a more immediate channel than email and a more intrusive one, so it works best when it is used sparingly and for messages that suit it: an order update, a short-window promotion, a back-in-stock alert. Running it inside Klaviyo means it shares the same profiles and segments as email.',
          'We plan where SMS adds something rather than repeating an email, set up consent collection correctly, and build flows that use both channels in sequence. The result is a single retention programme rather than two that happen to run in parallel.',
        ],
        buttons: [
          {
            label: 'Explore Ecommerce CRO',
            href: SERVICE_PAGE_ROUTES.ecommerceCro,
          },
        ],
        media: reuseHomeFeatureMedia('software-support-growth'),
      },
      {
        id: 'klaviyo-agency-integration',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Klaviyo Integration',
        heading: 'Connect Klaviyo with Your Software Technology Stack',
        description: [
          'Klaviyo is only as useful as the data reaching it. The Software connection is the foundation, covering customers, orders, products and on-site behaviour, and it needs to be set up properly before anything built on top of it will behave as expected.',
          'Beyond that, stores commonly connect loyalty, subscription, reviews and CRM or customer data platforms so that points balances, renewal dates, review requests and wider customer records can be used in segments and flows. Those are examples rather than a fixed list — we work through the integrations a particular store relies on and connect the ones the retention programme actually needs.',
        ],
        buttons: [
          {
            label: 'Explore API & System Integrations',
            href: SERVICE_PAGE_ROUTES.softwareIntegrations,
          },
        ],
        media: reuseHomeFeatureMedia('software-migrations'),
      },
    ],
  },
} as const satisfies Record<string, ServicePageConfig>;

export type ServicePageHandle = keyof typeof SERVICE_PAGE_CONFIGS;
