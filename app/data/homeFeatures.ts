import {
  CRO_CLEAN_PATH,
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
  width: number;
  height: number;
};

export type HomeFeatureBadge = {
  label: string;
  href: string;
};

export type HomeFeatureButton = {
  label: string;
  /** Omitted on a booking button, which opens the Calendly popup instead. */
  href?: string;
  calendly?: boolean;
};

export type HomeFeatureMedia = {
  href: string;

  primary: string;
  primaryAlt: string;
  primaryWidth: number;
  primaryHeight: number;

  secondary: string;
  secondaryAlt: string;
  secondaryWidth: number;
  secondaryHeight: number;

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

  cro: CRO_CLEAN_PATH,

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
      'High-performing Shopify stores built to scale',

    logos: [
      {
        src: LOGOS.launch,
        alt: 'Launch',
        width: 257,
        height: 93,
      },
    ],

    heading:
      'Custom Shopify Stores Built for Growth',

    description: [
      'We design and develop custom Shopify stores with a clear user experience and high-performance code. Our work includes Shopify migrations, custom app development, integrations, and headless builds using Shopify Hydrogen.',

      'Every project is planned for performance, SEO, accessibility, and future growth',
    ],

    buttons: [
      {
        label: 'Start Your Shopify Project',
        href: '/articles',
      },
    ],

    media: {
      href: ROUTES.caseStudies,

      primary:
        '/images/home-features/feature-01/primary.webp',

      primaryAlt:
        'Cambridge Satchel ecommerce project',

      primaryWidth: 1086,
      primaryHeight: 1448,

      secondary:
        '/images/home-features/feature-01/secondary.webp',

      secondaryAlt:
        'Cambridge Satchel Shopify project',

      secondaryWidth: 1086,
      secondaryHeight: 1448,

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
        width: 257,
        height: 93,
      },
      {
        src: LOGOS.helpdesk,
        alt: 'Helpdesk',
        width: 257,
        height: 93,
      },
    ],

    heading:
      'More Than a Shopify Agency. Your Ecommerce Growth Partner.',

    description: [
      'Strategy, technology, search and conversion expertise working together to turn your Shopify store into a growth engine.',

      'Strong ecommerce performance takes more than design or development. It requires the right strategy across the full customer journey.',

      'FoldTech brings Shopify development, CRO, technical SEO, AI search visibility, performance, and retention together in one approach. This gives brands clearer priorities, fewer disconnected workflows, and a store built to support long-term growth.',
    ],

    buttons: [
      {
        label: 'Explore SiteLab',
        href: '/pages/shopify-cro-agency',
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

      primaryWidth: 1086,
      primaryHeight: 1448,

      secondary:
        '/images/home-features/feature-02/secondary.webp',

      secondaryAlt:
        'Candy Kittens Shopify support project',

      secondaryWidth: 1122,
      secondaryHeight: 1402,

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
      'Rank higher on Google and AI search.',

    logos: [
      {
        src: LOGOS.search,
        alt: 'Search',
        width: 257,
        height: 93,
      },
    ],

    heading:
      'Shopify SEO That Drives Qualified Organic Revenue',

    description: [
      'Shopify SEO goes beyond keywords. We improve technical SEO, on-page optimisation, content strategy, AI search visibility, GEO, and SEO migrations to support long-term organic growth.',

      "Whether you're launching a new store or growing an established brand, we help improve search visibility and attract high-intent shoppers. The goal is to generate more qualified organic traffic and reduce dependence on paid advertising.",
    ],

    buttons: [
      {
        label: 'Grow Your Organic Traffic',
        href: ROUTES.seo,
      },
    ],

    media: {
      href: ROUTES.caseStudies,

      primary:
        '/images/home-features/feature-03/primary.webp',

      primaryAlt:
        'CleanCo ecommerce store project',

      primaryWidth: 896,
      primaryHeight: 1195,

      secondary:
        '/images/home-features/feature-03/secondary.webp',

      secondaryAlt:
        'CleanCo ecommerce design project',

      secondaryWidth: 896,
      secondaryHeight: 1195,

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
      'Shopify Apps & Integrations',

    heading:
      'Connect, Automate & Extend Your Shopify Store',

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
      'Custom Shopify apps, integrations, and automation can help reduce manual work and extend what your store can do.',

      'FoldTech connects Shopify with ERP, CRM, inventory, marketing, payment, fulfilment, and other third-party systems. We also build custom functionality around specific operational needs.',

      'The goal is to improve efficiency without adding unnecessary complexity. Each solution is planned around performance, security, scalability, and long-term maintenance.',
    ],

    buttons: [
      {
        label:
          'Build Your Shopify Solution',

        href: ROUTES.development,
      },
    ],

    media: {
      href: ROUTES.caseStudies,

      primary:
        '/images/home-features/feature-04/primary.webp',

      primaryAlt:
        'RNLI ecommerce project',

      primaryWidth: 1000,
      primaryHeight: 1000,

      secondary:
        '/images/home-features/feature-04/secondary.webp',

      secondaryAlt:
        'RNLI Shopify project',

      secondaryWidth: 1200,
      secondaryHeight: 800,

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
      'Shopify store design that looks as good as your brand',

    heading:
      'Shopify Store Design That Reflects Your Brand',

    description: [
      "Your Shopify store is often a customer's first impression of your brand. We create visual systems around typography, colour, imagery, and layout so the store feels consistent across every page.",

      'From the homepage to product pages, each design choice should support the brand while keeping the shopping experience clear and easy to use. The result is a store that feels distinct without adding unnecessary complexity.',
    ],

    buttons: [
      {
        label:
          'See Our Design Work',

        href: ROUTES.development,
      },
    ],

    media: {
      href: ROUTES.caseStudies,

      primary:
        '/images/home-features/feature-05/primary.webp',

      primaryAlt:
        'Harbour Lifestyle ecommerce project',

      primaryWidth: 896,
      primaryHeight: 1195,

      secondary:
        '/images/home-features/feature-05/secondary.webp',

      secondaryAlt:
        'Harbour Lifestyle Shopify design project',

      secondaryWidth: 1024,
      secondaryHeight: 768,

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
        width: 257,
        height: 93,
      },
    ],

    heading:
      'Everything Your Shopify Store Needs to Scale',

    badges: [
      {
        label: 'Shopify vs Magento',
        href: '/magento-shopify-migrations/',
      },
      {
        label: 'Shopify vs WooCommerce',
        href: '/woocommerce-shopify-migrations/',
      },
      {
        label: 'Shopify vs BigCommerce',
        href: '/bigcommerce-shopify-migrations/',
      },
      {
        label: 'Shopify vs Salesforce',
        href: '/salesforce-shopify-migrations/',
      },
    ],

    description: [
      'We support Shopify brands across strategy, design, development, SEO, AI visibility, CRO, and retention.',

      'Our work goes beyond launching a store. We help improve traffic, conversion, customer retention, and overall ecommerce performance.',

      "Whether you're launching a new Shopify store or growing an established brand, our team provides strategy, development, marketing, and ongoing optimisation focused on measurable growth.",
    ],

    buttons: [
      {
        label:
          'Book a Growth Strategy Call',

        href: ROUTES.migrations,
      },
      {
        label:
          'View Our Shopify Work',

        /*
         * Case studies is already the route wired to this
         * section (see media.href below), so the secondary
         * CTA reuses it rather than introducing a new one.
         */
         href: '/work',
      },
    ],

    media: {
      href: ROUTES.caseStudies,

      primary:
        '/images/home-features/feature-06/primary.webp',

      primaryAlt:
        '111SKIN ecommerce project',

      primaryWidth: 941,
      primaryHeight: 1672,

      secondary:
        '/images/home-features/feature-06/secondary.webp',

      secondaryAlt:
        '111SKIN Shopify project',

      secondaryWidth: 1086,
      secondaryHeight: 1448,

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
      'Shopify Plus Development & Services',

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
      'Build a Scalable Ecommerce Store with Shopify Plus',

      'Our Shopify Plus development services help growing and enterprise brands build flexible, scalable ecommerce stores. We handle Shopify Plus migrations, custom development, integrations, B2B features, automation, internationalisation, and ongoing optimisation.',

      'From strategy and store architecture to development and long-term support, we help brands get more from Shopify Plus. The focus is on better performance, easier management, and a clear experience for customers and internal teams.',
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

      primaryWidth: 1086,
      primaryHeight: 1448,

      secondary:
        '/images/home-features/feature-07/secondary.webp',

      secondaryAlt:
        'Billionaire Boys Club Shopify project',

      secondaryWidth: 896,
      secondaryHeight: 1195,

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
        width: 257,
        height: 93,
      },
    ],

    heading:
      'Turn First Time Buyers Into Loyal Customers',

    description: [
      'Retention marketing that increases repeat purchases and customer lifetime value.',

      'Acquiring new customers is expensive, so retention matters. We build Klaviyo email and SMS strategies that help recover abandoned carts, encourage repeat purchases, and keep customers engaged.',

      'We also help brands set up subscription models and B2B ecommerce experiences to create more recurring revenue.',
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

      primaryWidth: 1086,
      primaryHeight: 1448,

      secondary:
        '/images/home-features/feature-08/secondary.webp',

      secondaryAlt:
        'Vollebak Shopify project',

      secondaryWidth: 848,
      secondaryHeight: 1261,

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
      'Expand Your Shopify Store Worldwide',

    description: [
      'Launch internationally with confidence using localisation and scalable ecommerce strategies.',

      'Ready to reach customers in new markets? We help Shopify brands expand internationally with multilingual storefronts, multi-currency experiences, regional SEO, and localisation for different audiences.',

      'From market entry planning to international optimisation, we help brands build a clearer and more scalable approach to selling across borders.',
    ],

    buttons: [
      {
        label:
          'Scale Internationally',

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

      primaryWidth: 1122,
      primaryHeight: 1402,

      secondary:
        '/images/home-features/feature-09/secondary.webp',

      secondaryAlt:
        'Sunnamusk international Shopify project',

      secondaryWidth: 780,
      secondaryHeight: 1040,

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
      "Improve every stage of your customer's buying journey with data-driven optimization.",

    logos: [
      {
        src: LOGOS.sitelab,
        alt: 'SiteLab',
        width: 257,
        height: 93,
      },
    ],

    heading:
      'Turn More Visitors Into Paying Customers',

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
          'Shopify SEO',

        href: ROUTES.seo,
      },
    ],

    description: [
      'Driving traffic is only part of the job. We analyse customer behaviour, improve landing pages and checkout experiences, and use ongoing testing to increase conversion rates.',

      'Our CRO team identifies where visitors drop off and where the buying journey can improve. This helps you generate more revenue from existing traffic without relying on higher advertising spend.',
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

      primaryWidth: 941,
      primaryHeight: 1672,

      secondary:
        '/images/home-features/feature-10/secondary.webp',

      secondaryAlt:
        'Vollebak Shopify optimisation project',

      secondaryWidth: 816,
      secondaryHeight: 1456,

      captionTitle:
        'Vollebak',

      captionText:
        'Ecommerce Store Support & Growth',
    },
  },
] as const satisfies readonly HomeFeatureData[];
