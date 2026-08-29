import {
  resolveCanonicalPath,
  SHOPIFY_SEO_CLEAN_PATH,
} from '~/lib/route-mappings';

/* =========================================================
   FOLDTECH — HOME FEATURE DATA

   This is the single source of truth for the repeated
   homepage feature sections.

   Later, when real FoldTech content is ready, update:
   - headings
   - descriptions
   - images
   - captions
   - logos
   - badges
   - buttons / routes

   The component and CSS should not need rebuilding.
========================================================= */

export type HomeFeatureLayout =
  | 'media-left'
  | 'media-right';

export type HomeFeatureSpacing =
  | 'first'
  | 'standard'
  | 'deep';

export type HomeFeatureTheme =
  | 'dark'
  | 'light';

export type HomeFeatureLogo = {
  src: string;
  alt: string;
};

export type HomeFeatureBadge = {
  label: string;
  href: string;
};

export type HomeFeatureButton = {
  label: string;
  href: string;
};

export type HomeFeatureMedia = {
  href: string;

  primary: string;
  primaryAlt: string;

  secondary: string;
  secondaryAlt: string;

  captionTitle: string;
  captionText: string;
};

export type HomeFeatureData = {
  id: string;

  layout: HomeFeatureLayout;

  spacing: HomeFeatureSpacing;

  theme: HomeFeatureTheme;

  eyebrow: string;

  heading: string;

  description: readonly string[];

  logos?: readonly HomeFeatureLogo[];

  badges?: readonly HomeFeatureBadge[];

  buttons: readonly HomeFeatureButton[];

  media: HomeFeatureMedia;
};


/* =========================================================
   SHARED ROUTES
========================================================= */

const ROUTES = {
  caseStudies: '/pages/case-studies',

  seo: SHOPIFY_SEO_CLEAN_PATH,

  development: '/pages/shopify-development',

  migrations: '/pages/shopify-migrations',

  cro: '/pages/conversion-rate-optimisation',

  maintenance: '/pages/shopify-maintenance',

  emailSms: '/pages/email-sms-marketing',

  internationalisation:
    '/pages/internationalisation',

  appDevelopment: resolveCanonicalPath(
    '/pages/shopify-app-development',
  ),

  headless:
    '/pages/headless-commerce',
} as const;


/* =========================================================
   SHARED PRODUCT LOGOS
========================================================= */

const LOGOS = {
  launch:
    '/images/home-features/logos/launch.svg',

  helpdesk:
    '/images/home-features/logos/helpdesk.svg',

  search:
    '/images/home-features/logos/search.svg',

  retain:
    '/images/home-features/logos/retain.svg',

  sitelab:
    '/images/home-features/logos/sitelab.svg',
} as const;


/* =========================================================
   HOME FEATURES
========================================================= */

export const HOME_FEATURES = [
  /* =======================================================
     01 — SHOPIFY LAUNCH
  ======================================================= */

  {
    id: 'shopify-launch',

    layout: 'media-left',

    spacing: 'first',

    theme: 'dark',

    eyebrow:
      'Shopify Agency',

    logos: [
      {
        src: LOGOS.launch,
        alt: 'Launch',
      },
    ],

    heading:
      'We partner with brands to design, develop, launch & grow Shopify stores to amplify growth.',

    description: [
      'We help brands plan and launch Shopify and Shopify Plus stores by bringing store design, development and technical implementation together. Projects can include custom storefronts or adapting existing Shopify themes around the needs of the brand and its customers.',

      'Our approach connects user experience, store architecture, performance, SEO foundations and development so each Shopify build has a clear base for future campaigns, integrations and continued ecommerce growth.',
    ],

    buttons: [
      {
        label: 'Explore Case Studies',
        href: '/articles',
      },
    ],

    media: {
      href: ROUTES.caseStudies,

      primary:
        '/images/home-features/feature-01/primary.webp',

      primaryAlt:
        'Cambridge Satchel ecommerce project',

      secondary:
        '/images/home-features/feature-01/secondary.webp',

      secondaryAlt:
        'Cambridge Satchel Shopify project',

      captionTitle:
        'Cambridge Satchel',

      captionText:
        'Shopify Plus Design & Development',
    },
  },


  /* =======================================================
     02 — SUPPORT + CRO
  ======================================================= */

  {
    id: 'shopify-support-growth',

    layout: 'media-right',

    spacing: 'standard',

    theme: 'dark',

    eyebrow:
      'Shopify Monthly Support Agency',

    logos: [
      {
        src: LOGOS.launch,
        alt: 'Launch',
      },
      {
        src: LOGOS.helpdesk,
        alt: 'Helpdesk',
      },
    ],

    heading:
      'Your Shopify agency for support & growth every month.',

    description: [
      'Beyond new Shopify launches, FoldTech can support stores through maintenance, development updates and ongoing conversion improvement. Maintenance covers day-to-day fixes, updates and smaller development requirements, while conversion optimisation focuses on testing, performance analysis and improving the customer journey over time.',
    ],

    buttons: [
      {
        label: 'Explore SiteLab',
        href: ROUTES.cro,
      },
      {
        label: 'Explore HelpDesk',
        href: ROUTES.maintenance,
      },
    ],

    media: {
      href: ROUTES.caseStudies,

      primary:
        '/images/home-features/feature-02/primary.webp',

      primaryAlt:
        'Candy Kittens ecommerce project',

      secondary:
        '/images/home-features/feature-02/secondary.webp',

      secondaryAlt:
        'Candy Kittens Shopify support project',

      captionTitle:
        'Candy Kittens',

      captionText:
        'Shopify Retainer Support & CRO',
    },
  },


  /* =======================================================
     03 — SEO + GEO
  ======================================================= */

  {
    id: 'shopify-seo-geo',

    layout: 'media-left',

    spacing: 'deep',

    theme: 'dark',

    eyebrow:
      'Shopify SEO & GEO Agency',

    logos: [
      {
        src: LOGOS.search,
        alt: 'Search',
      },
    ],

    heading:
      'Maximise Organic Search with Shopify SEO & GEO',

    description: [
      'Our Shopify SEO and GEO work connects technical optimisation, content strategy, site structure and search visibility. We review competitors, organic performance and opportunities across traditional search and AI-driven discovery so improvements support both visibility and the customer experience.',
    ],

    buttons: [
      {
        label: 'Explore SEO Services',
        href: ROUTES.seo,
      },
    ],

    media: {
      href: ROUTES.caseStudies,

      primary:
        '/images/home-features/feature-03/primary.webp',

      primaryAlt:
        'CleanCo ecommerce store project',

      secondary:
        '/images/home-features/feature-03/secondary.webp',

      secondaryAlt:
        'CleanCo ecommerce design project',

      captionTitle:
        'CleanCo',

      captionText:
        'Ecommerce Store Design & Build',
    },
  },


  /* =======================================================
     04 — SHOPIFY DEVELOPMENT
  ======================================================= */

  {
    id: 'shopify-development',

    layout: 'media-right',

    spacing: 'standard',

    theme: 'dark',

    eyebrow:
      'Shopify Development Agency',

    heading:
      'We develop Shopify stores & apps with the very best technology & skill.',

    badges: [
      {
        label: 'Custom Themes',
        href: ROUTES.development,
      },
      {
        label: 'Headless Builds',
        href: ROUTES.headless,
      },
      {
        label: 'Ecommerce Apps',
        href: ROUTES.appDevelopment,
      },
    ],

    description: [
      'FoldTech develops Shopify themes, storefront functionality and apps using platform-native features and modern web tooling. Projects can include custom theme development, integrations, headless commerce and Shopify app experiences.',

      'Development decisions consider performance, technical SEO, maintainability and quality assurance so ecommerce and marketing teams can manage their store while retaining flexibility for future development.',
    ],

    buttons: [
      {
        label:
          'Explore Development Services',

        href: ROUTES.development,
      },
    ],

    media: {
      href: ROUTES.caseStudies,

      primary:
        '/images/home-features/feature-04/primary.webp',

      primaryAlt:
        'RNLI ecommerce project',

      secondary:
        '/images/home-features/feature-04/secondary.webp',

      secondaryAlt:
        'RNLI Shopify project',

      captionTitle:
        'RNLI',

      captionText:
        'Shopify Retainer Support & CRO',
    },
  },


  /* =======================================================
     05 — UI / UX DESIGN
  ======================================================= */

  {
    id: 'shopify-design',

    layout: 'media-left',

    spacing: 'deep',

    theme: 'dark',

    eyebrow:
      'Shopify Web Design Agency',

    heading:
      'We design Shopify stores to engage & convert customers.',

    description: [
      'Our Shopify design process uses research, competitor review and wireframes to define page structure before moving into high-fidelity design. The focus is on product discovery, navigation, buying journeys and making important actions clear across the storefront.',

      'UI and UX decisions are aligned with the visual identity of the brand while considering conversion, usability, mobile behaviour and the capabilities available within Shopify.',
    ],

    buttons: [
      {
        label:
          'Explore Design Services',

        href: ROUTES.development,
      },
    ],

    media: {
      href: ROUTES.caseStudies,

      primary:
        '/images/home-features/feature-05/primary.webp',

      primaryAlt:
        'Harbour Lifestyle ecommerce project',

      secondary:
        '/images/home-features/feature-05/secondary.webp',

      secondaryAlt:
        'Harbour Lifestyle Shopify design project',

      captionTitle:
        'Harbour Lifestyle',

      captionText:
        'Shopify Bespoke Theme',
    },
  },


  /* =======================================================
     06 — SHOPIFY MIGRATION
  ======================================================= */

  {
    id: 'shopify-migrations',

    layout: 'media-right',

    spacing: 'standard',

    theme: 'dark',

    eyebrow:
      'Shopify Migration Agency',

    logos: [
      {
        src: LOGOS.launch,
        alt: 'Launch',
      },
    ],

    heading:
      'Why migrate & grow with Shopify?',

    badges: [
      {
        label: 'Shopify vs Magento',
        href: ROUTES.migrations,
      },
      {
        label: 'Shopify vs WooCommerce',
        href: ROUTES.migrations,
      },
      {
        label: 'Shopify vs BigCommerce',
        href: ROUTES.migrations,
      },
      {
        label: 'Shopify vs Salesforce',
        href: ROUTES.migrations,
      },
    ],

    description: [
      'We help ecommerce brands migrate to Shopify and Shopify Plus while preserving the important parts of their existing store, content and customer experience. Migration planning can cover products, customers, orders, content, integrations, redirects and international requirements.',

      'The move is also an opportunity to review store structure, performance and functionality so the new Shopify setup is easier to manage and better prepared for future development and growth.',
    ],

    buttons: [
      {
        label:
          'Explore Migration Services',

        href: ROUTES.migrations,
      },
    ],

    media: {
      href: ROUTES.caseStudies,

      primary:
        '/images/home-features/feature-06/primary.webp',

      primaryAlt:
        '111SKIN ecommerce project',

      secondary:
        '/images/home-features/feature-06/secondary.webp',

      secondaryAlt:
        '111SKIN Shopify project',

      captionTitle:
        '111SKIN',

      captionText:
        'Shopify CRO Services',
    },
  },


  /* =======================================================
     07 — SHOPIFY PLUS
  ======================================================= */

  {
    id: 'shopify-plus',

    layout: 'media-left',

    spacing: 'deep',

    theme: 'dark',

    eyebrow:
      'Shopify Plus Services',

    heading:
      'Looking for a Shopify Plus Agency?',

    badges: [
      {
        label:
          'Benefits of Shopify Plus',

        /*
         * There is currently no dedicated Shopify Plus
         * route in the FoldTech repository.
         *
         * Development is the closest confirmed route.
         */
        href: ROUTES.development,
      },
    ],

    description: [
      'For brands evaluating Shopify Plus, FoldTech can support platform planning, store architecture, development and migration requirements. The focus is on understanding which Shopify Plus capabilities are relevant to the business and how they connect with existing systems and ecommerce operations.',

      'The same approach can support brands upgrading from standard Shopify or moving from another platform, with development decisions based around scalability, integrations, international requirements and future store management.',
    ],

    buttons: [
      {
        label: 'Explore Retainers',

        /*
         * No dedicated Retainers route currently exists.
         * Maintenance is the closest confirmed ongoing
         * support route.
         */
        href: ROUTES.maintenance,
      },
    ],

    media: {
      href: ROUTES.caseStudies,

      primary:
        '/images/home-features/feature-07/primary.webp',

      primaryAlt:
        'Billionaire Boys Club ecommerce project',

      secondary:
        '/images/home-features/feature-07/secondary.webp',

      secondaryAlt:
        'Billionaire Boys Club Shopify project',

      captionTitle:
        'Billionaire Boys Club',

      captionText:
        'Shopify Retainer Support & CRO',
    },
  },


  /* =======================================================
     08 — EMAIL + SMS
  ======================================================= */

  {
    id: 'email-sms-retention',

    layout: 'media-right',

    spacing: 'standard',

    theme: 'dark',

    eyebrow:
      'Shopify Email Marketing Agency',

    logos: [
      {
        src: LOGOS.retain,
        alt: 'Retain',
      },
    ],

    heading:
      'Keep customers coming back with email, SMS & retention marketing.',

    description: [
      'Our retention work focuses on communicating with customers at relevant points throughout the buying journey. Strategies can include customer segmentation, targeted email campaigns, automated lifecycle flows and SMS communication for both campaigns and triggered journeys.',

      'Email and SMS can also connect with subscriptions, reviews, loyalty programmes and other ecommerce systems so retention activity works alongside the wider Shopify store rather than operating separately.',
    ],

    buttons: [
      {
        label: 'Explore Email & SMS',
        href: ROUTES.emailSms,
      },
    ],

    media: {
      href: ROUTES.caseStudies,

      primary:
        '/images/home-features/feature-08/primary.webp',

      primaryAlt:
        'Vollebak ecommerce project',

      secondary:
        '/images/home-features/feature-08/secondary.webp',

      secondaryAlt:
        'Vollebak Shopify project',

      captionTitle:
        'Vollebak',

      captionText:
        'Ecommerce Store Support & Growth',
    },
  },


  /* =======================================================
     09 — INTERNATIONALISATION
  ======================================================= */

  {
    id: 'shopify-internationalisation',

    layout: 'media-left',

    spacing: 'deep',

    theme: 'dark',

    eyebrow:
      'International Shopify Strategy',

    heading:
      'Shopify International Expansion',

    description: [
      'FoldTech can support international Shopify strategies across single-store and multi-store setups. Planning can include currencies, territories, geolocation, local content, catalogue requirements and how different regional experiences should be managed inside Shopify.',

      'The goal is to choose an international store structure that fits the operational needs of the business while giving ecommerce teams appropriate control over regional customer experiences.',
    ],

    buttons: [
      {
        label:
          'Free Internationalisation Guide',

        /*
         * No separate Guide route currently exists,
         * so this points to the confirmed service page.
         */
        href:
          ROUTES.internationalisation,
      },
    ],

    media: {
      href: ROUTES.caseStudies,

      primary:
        '/images/home-features/feature-09/primary.webp',

      primaryAlt:
        'Sunnamusk ecommerce project',

      secondary:
        '/images/home-features/feature-09/secondary.webp',

      secondaryAlt:
        'Sunnamusk international Shopify project',

      captionTitle:
        'Sunnamusk',

      captionText:
        'Store Design & Build',
    },
  },


  /* =======================================================
     10 — CRO / DATA
  ======================================================= */

  {
    id: 'shopify-cro',

    layout: 'media-right',

    spacing: 'standard',

    theme: 'dark',

    eyebrow:
      'Shopify Growth Strategy',

    logos: [
      {
        src: LOGOS.sitelab,
        alt: 'SiteLab',
      },
    ],

    heading:
      'Data-driven strategies for Shopify & Shopify Plus.',

    badges: [
      {
        label:
        'Conversion Rate Optimisation',
         href:'/shopify-cro-agency/',
      },
      {
        label:
          'Email & SMS Marketing',

        href: ROUTES.emailSms,
      },
      {
        label:
          'Ecommerce SEO',

        href: ROUTES.seo,
      },
    ],

    description: [
      'Our conversion work combines analytics, customer behaviour and ecommerce experience to identify opportunities across the Shopify customer journey. Reviews can include engagement, product performance, purchase behaviour, traffic acquisition, heatmaps and visitor recordings.',

      'These insights can inform testing, page improvements, content changes and wider growth activity across CRO, SEO and retention marketing, with progress measured against commercial metrics that matter to the store.',
    ],

    buttons: [
      {
        label:
          'Explore CRO Services',

         href: '/shopify-cro-agency/',
      },
    ],

    media: {
      href: ROUTES.caseStudies,

      primary:
        '/images/home-features/feature-10/primary.webp',

      primaryAlt:
        'Vollebak ecommerce growth project',

      secondary:
        '/images/home-features/feature-10/secondary.webp',

      secondaryAlt:
        'Vollebak Shopify optimisation project',

      captionTitle:
        'Vollebak',

      captionText:
        'Ecommerce Store Support & Growth',
    },
  },
] as const satisfies readonly HomeFeatureData[];
