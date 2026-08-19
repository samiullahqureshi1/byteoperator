import type {ServiceHeroProps} from '~/components/services/ServiceHero';
import type {ServiceAboutSectionData} from '~/components/services/detail/ServiceAboutSection';
import {
  HOME_FEATURES,
  type HomeFeatureData,
} from '~/data/homeFeatures';
import {
  resolveCleanPath,
  SHOPIFY_SEO_PAGE_HANDLE,
} from '~/lib/route-mappings';

const SERVICE_PAGE_ROUTES = {
  ai: resolveCleanPath('/pages/ai'),
  ecommerceAiSeo: resolveCleanPath('/pages/ecommerce-ai-seo'),
  ecommerceSeo: resolveCleanPath('/pages/ecommerce-seo'),
  seoMigrations: resolveCleanPath('/pages/seo-migrations'),
  shopifyMigrations: resolveCleanPath(
    '/pages/shopify-migrations',
  ),
  services: resolveCleanPath('/pages/services'),
  work: resolveCleanPath('/pages/work'),
  contact: resolveCleanPath('/pages/contact'),
  shopifyDevelopment: resolveCleanPath(
    '/pages/shopify-development',
  ),
  shopifyMaintenance: resolveCleanPath(
    '/pages/shopify-maintenance',
  ),
  shopifySeo: resolveCleanPath(
    `/pages/${SHOPIFY_SEO_PAGE_HANDLE}`,
  ),
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
  clientProofLabel: 'our clients',
} as const satisfies ServiceHeroProps;

export interface ServicePageConfig {
  hero: ServiceHeroProps;
  heroOnly?: boolean;
  showPartners?: boolean;
  about?: ServiceAboutSectionData;
  features?: readonly HomeFeatureData[];
  faqTitle?: string;
}

export const SERVICE_PAGE_CONFIGS = {
  [SHOPIFY_SEO_PAGE_HANDLE]: {
    faqTitle: 'Shopify SEO Agency',
    hero: {
      eyebrow: 'Shopify SEO Agency',
      heading:
        'Shopify SEO services for ecommerce growth and stronger organic visibility.',
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
        src: '/images/home-services/badges/logo-search-white.svg',
        alt: 'Search',
      },
      promoLink: {
        label: 'Looking to improve AI Visibility? Explore AI →',
        href: SERVICE_PAGE_ROUTES.ai,
      },
      description:
        'FoldTech helps Shopify and Shopify Plus stores improve organic visibility through technical SEO, collection and product optimisation, content strategy and search-focused site improvements.',
      primaryCta: {
        label: 'Explore SEO Services',
        href: SERVICE_PAGE_ROUTES.shopifySeo,
      },
    },
    about: {
      intro: {
        heading:
          'Shopify SEO built around how customers search, discover and buy.',
        description:
          'FoldTech combines technical SEO, collection and product optimisation, internal linking and search-focused content to help Shopify stores improve organic visibility. We focus on the parts of a Shopify store that affect how search engines understand pages and how customers discover products through search.',
        cta: {
          label: 'Get In Touch',
          href: SERVICE_PAGE_ROUTES.contact,
        },
      },
      media: {
        primary: '/images/services/services-wide.webp',
        primaryAlt: 'Shopify SEO ecommerce project',
        secondary: '/images/mega-menu-team.webp',
        secondaryAlt: 'Shopify ecommerce optimisation project',
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
        eyebrow: 'Shopify SEO Services',
        heading:
          'SEO support designed around Shopify ecommerce stores.',
        description: [
          'FoldTech approaches Shopify SEO across the full storefront, from technical foundations and site structure to collections, products and supporting content.',
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
        ],
        media: reuseHomeFeatureMedia('shopify-seo-geo'),
      },
      {
        id: 'seo-agency-keyword-research',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Shopify Keyword Research',
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
        ],
        media: reuseHomeFeatureMedia('shopify-launch'),
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
          'Collections and product pages are central to ecommerce search visibility. FoldTech reviews page targeting, headings, copy, metadata, internal links and supporting content around these areas.',
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
        ],
        media: reuseHomeFeatureMedia('shopify-development'),
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
        ],
        media: reuseHomeFeatureMedia('shopify-design'),
      },
      {
        id: 'seo-agency-technical-seo',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'Shopify Technical SEO',
        heading:
          'Find and fix technical issues that can restrict organic visibility.',
        description: [
          'Technical SEO reviews how the Shopify storefront is crawled, indexed and understood by search engines.',
          'FoldTech can review areas such as indexation, redirects, canonical handling, structured data, internal links, page templates and performance-related issues, then prioritise fixes based on their relevance to the store.',
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
        ],
        media: reuseHomeFeatureMedia('shopify-plus'),
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
          'FoldTech can coordinate redirects, metadata, internal linking, technical checks and post-launch review as part of a Shopify migration or major site restructure.',
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
        media: reuseHomeFeatureMedia('shopify-migrations'),
      },
      {
        id: 'seo-agency-ongoing-support',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'Ongoing Shopify SEO',
        heading:
          'Keep improving search visibility as your Shopify store changes.',
        description: [
          'Ecommerce stores continuously add products, collections, campaigns and content. Ongoing SEO support helps review those changes and identify new technical and search opportunities over time.',
          'FoldTech can combine recurring technical reviews, content recommendations, on-page improvements and search analysis with the wider ecommerce roadmap.',
        ],
        badges: [
          {
            label: 'Ongoing SEO',
            href: SERVICE_PAGE_ROUTES.shopifyMaintenance,
          },
        ],
        buttons: [
          {
            label: 'Get In Touch',
            href: SERVICE_PAGE_ROUTES.contact,
          },
        ],
        media: reuseHomeFeatureMedia('shopify-support-growth'),
      },
    ],
    showPartners: true,
  },
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
  'shopify-web-design': {
    faqTitle: 'Shopify Web Design',
    hero: {
      eyebrow: 'Shopify Website Design',
      heading:
        'Shopify web design focused on your brand, customers and ecommerce goals.',
      description:
        'FoldTech designs Shopify storefronts around clear customer journeys, strong brand presentation and practical ecommerce requirements. From new store projects to updates for existing Shopify themes, our design process considers usability, product discovery, mobile experience and the path from landing page to checkout.',
      chips: [
        'Shopify Store Builds',
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
          'Shopify web design built around how customers discover, browse and buy.',
        description:
          'Our Shopify web design work brings brand direction and ecommerce usability into one clear storefront experience. We plan layouts around the products, content and customer journeys that matter to the business, while considering responsive behaviour, navigation, collection discovery and conversion-focused page structure.',
        cta: {
          label: 'Get In Touch',
          href: SERVICE_PAGE_ROUTES.contact,
        },
      },
      media: {
        primary: '/images/services/services-wide.webp',
        primaryAlt: 'FoldTech Shopify storefront project',
        secondary: '/images/mega-menu-team.webp',
        secondaryAlt: 'FoldTech team collaborating around a table',
      },
      process: {
        heading: 'Our Shopify web design process',
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
        id: 'shopify-web-design-brand',
        layout: 'media-left',
        spacing: 'first',
        theme: 'dark',
        eyebrow: 'Bespoke Shopify Web Design',
        heading: 'Design built around your brand',
        description: [
          'A custom Shopify design gives the storefront room to reflect the brand without being restricted by the visual structure of an existing theme. Page hierarchy, navigation, product discovery and content placement can be planned around the specific catalogue and customer journey.',
          'The design process can cover core templates such as the homepage, collection pages, product pages and content-led landing pages, alongside reusable sections that give the internal team practical flexibility after launch.',
        ],
        buttons: [
          {
            label: 'Explore New Store Services',
            href: SERVICE_PAGE_ROUTES.shopifyDevelopment,
          },
        ],
        media: reuseHomeFeatureMedia('shopify-launch'),
      },
      {
        id: 'shopify-web-design-theme-customisation',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Shopify Theme Design',
        heading: 'Theme customisation & ad-hoc design',
        description: [
          'Not every Shopify project requires a complete redesign. Existing themes can be updated with new page layouts, revised navigation, landing pages, UI improvements and additional sections while preserving parts of the storefront that are already working well.',
          'This approach can suit brands that need focused changes to specific customer journeys or want to improve the presentation of collections, products, campaigns and editorial content without replacing the whole storefront.',
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
        id: 'shopify-web-design-discovery',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'Shopify Web Design Discovery',
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
        media: reuseHomeFeatureMedia('shopify-migrations'),
      },
      {
        id: 'shopify-web-design-customer-journeys',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Shopify Customer Journey Design',
        heading: 'Wireframing & customer journeys',
        description: [
          'Wireframes establish the structure of important Shopify pages before visual styling is applied. They help define where products, collection filters, navigation, calls to action, supporting content and merchandising elements should sit across the storefront.',
          'Customer-journey planning also considers how different visitors arrive and move through the site. New customers, returning customers and visitors entering through product, collection or campaign pages may each need different routes to useful information.',
        ],
        buttons: [
          {
            label: 'Get In Touch',
            href: SERVICE_PAGE_ROUTES.contact,
          },
        ],
        media: reuseHomeFeatureMedia('shopify-seo-geo'),
      },
      {
        id: 'shopify-web-design-ui-ux',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'Shopify UI & UX Design',
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
        media: reuseHomeFeatureMedia('shopify-plus'),
      },
      {
        id: 'shopify-web-design-development-support',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Shopify Website Design & Development Services',
        heading: 'Development, Support & Growth',
        description: [
          'Once the design work is approved, the same project can move into Shopify development using custom theme work or targeted updates to an existing theme. Development can cover reusable sections, product and collection experiences, integrations and other storefront functionality required by the project.',
          'After launch, ongoing development and support can be used for new landing pages, theme updates, technical fixes, feature improvements and planned storefront changes as business requirements evolve.',
          'Design and CRO work can also continue after launch by reviewing customer behaviour and identifying areas of the storefront that need clearer navigation, stronger merchandising or improved page structure.',
        ],
        buttons: [
          {
            label: 'Explore Retainers',
            href: SERVICE_PAGE_ROUTES.shopifyMaintenance,
          },
        ],
        media: reuseHomeFeatureMedia('shopify-design'),
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
          label: 'Ecommerce SEO Agency',
          href: SERVICE_PAGE_ROUTES.shopifySeo,
        },
        {
          label: 'Shopify Services',
          href: SERVICE_PAGE_ROUTES.services,
        },
        {
          label: 'Development Services',
          href: SERVICE_PAGE_ROUTES.shopifyDevelopment,
        },
      ],
      bottomLogo: {
        src: '/images/home-services/badges/logo-search-white.svg',
        alt: 'Search',
      },
      description:
        'FoldTech helps ecommerce brands plan and manage SEO during platform migrations, store rebuilds and major site changes. We review URLs, content, redirects, technical setup and search-critical pages before and after launch to reduce avoidable migration risks.',
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
          'A platform move can change URLs, navigation, templates, internal links, metadata and content structure at the same time. FoldTech reviews the existing store and the planned new structure so important SEO elements can be accounted for before development and launch decisions are finalised.',
        cta: {
          label: 'Get In Touch',
          href: SERVICE_PAGE_ROUTES.contact,
        },
      },
      media: {
        primary: '/images/services/services-wide.webp',
        primaryAlt: 'Ecommerce SEO migration project review',
        secondary: '/images/mega-menu-team.webp',
        secondaryAlt:
          'FoldTech team planning an ecommerce migration',
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
          'FoldTech supports migrations where ecommerce URLs, page templates, content or platform architecture are changing.',
          'The migration plan connects SEO requirements with the development process so redirects, content, metadata and technical considerations are addressed at the right stage.',
        ],
        badges: [
          {
            label: 'SEO Migration',
            href: SERVICE_PAGE_ROUTES.seoMigrations,
          },
          {
            label: 'Migration Planning',
            href: SERVICE_PAGE_ROUTES.shopifyMigrations,
          },
        ],
        buttons: [
          {
            label: 'Get In Touch',
            href: SERVICE_PAGE_ROUTES.contact,
          },
        ],
        media: reuseHomeFeatureMedia('shopify-migrations'),
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
            label: 'SEO Audit',
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
        media: reuseHomeFeatureMedia('shopify-seo-geo'),
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
          'URL changes need clear planning during an ecommerce migration. FoldTech can map existing pages to their intended destinations and identify URLs that require redirects.',
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
        media: reuseHomeFeatureMedia('shopify-launch'),
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
          'FoldTech reviews how these elements should transfer into the new storefront and identifies opportunities where content or page targeting should be updated.',
        ],
        badges: [
          {
            label: 'Content Migration',
            href: SERVICE_PAGE_ROUTES.shopifyMigrations,
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
        media: reuseHomeFeatureMedia('shopify-design'),
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
        media: reuseHomeFeatureMedia('shopify-development'),
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
          'FoldTech reviews the relevant technical setup and works alongside development changes where fixes are required.',
        ],
        badges: [
          {
            label: 'Technical SEO',
            href: SERVICE_PAGE_ROUTES.ecommerceSeo,
          },
          {
            label: 'Site Structure',
            href: SERVICE_PAGE_ROUTES.shopifySeo,
          },
        ],
        buttons: [
          {
            label: 'Get In Touch',
            href: SERVICE_PAGE_ROUTES.contact,
          },
        ],
        media: reuseHomeFeatureMedia('shopify-plus'),
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
            href: SERVICE_PAGE_ROUTES.shopifyMaintenance,
          },
        ],
        buttons: [
          {
            label: 'Get In Touch',
            href: SERVICE_PAGE_ROUTES.contact,
          },
        ],
        media: reuseHomeFeatureMedia('shopify-support-growth'),
      },
    ],
    showPartners: true,
  },
} as const satisfies Record<string, ServicePageConfig>;

export type ServicePageHandle = keyof typeof SERVICE_PAGE_CONFIGS;
