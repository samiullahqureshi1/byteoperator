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
      'High-performing Shopify stores built to scale',

    logos: [
      {
        src: LOGOS.launch,
        alt: 'Launch',
      },
    ],

    heading:
      'Custom Shopify Stores Built for Growth',

    description: [
      'We design and develop custom Shopify stores that combine premium user experience with high-performance code. From complete Shopify migrations to custom app development, integrations, and headless commerce using Shopify Hydrogen, we build ecommerce experiences that scale with your business.',

      'Every project is optimised for performance, SEO, accessibility and future growth.',
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
      'More Than a Shopify Agency. Your Ecommerce Growth Partner.',

    description: [
      'Strategy, technology, search and conversion expertise working together to turn your Shopify store into a growth engine.',

      "Great ecommerce performance doesn't come from design or development alone. It comes from having the right strategy behind every part of the customer journey.",

      'FoldTech brings Shopify development, conversion optimisation, technical SEO, AI search visibility, performance and retention together under one growth-focused approach. That means fewer disconnected agencies, clearer priorities, and a Shopify store built to perform today and scale tomorrow.',
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
      'Rank higher on Google and AI search.',

    logos: [
      {
        src: LOGOS.search,
        alt: 'Search',
      },
    ],

    heading:
      'Shopify SEO That Drives Qualified Organic Revenue',

    description: [
      'Your Shopify store deserves more than basic keyword optimization. We build long-term organic growth through technical Shopify SEO, on-page optimisation, AI search visibility, Generative Engine Optimisation (GEO), content strategy, and SEO migrations.',

      "Whether you're launching a new store or scaling an established ecommerce brand, our team helps increase rankings, attract high-intent shoppers, and generate sustainable revenue without relying solely on paid advertising.",
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
      'Custom Shopify apps, integrations and automation built to streamline operations and unlock new ecommerce capabilities.',

      'Your Shopify store should work seamlessly with the tools and systems your business relies on. FoldTech builds custom Shopify apps and integrations that connect your store with ERP, CRM, inventory, marketing, payment, fulfilment and other third-party platforms.',

      'We also develop custom functionality and automation to reduce manual processes, improve operational efficiency and create better customer experiences. Every solution is built with performance, security, scalability and long-term maintainability in mind.',
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
      'Shopify store design that looks as good as your brand',

    heading:
      'Shopify Store Design That Reflects Your Brand',

    description: [
      "Your Shopify store is often a customer's first impression of your brand and it should look like it. We create distinctive visual identities for Shopify stores: considered typography, color systems, imagery direction and layout choices that make your store instantly recognisable and on-brand across every page.",

      'From homepage to product pages, every design decision is made to reinforce your brand story while keeping the experience clean, premium and easy to shop giving your store a look that stands out from template-based competitors.',
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
      'Everything Your Shopify Store Needs to Scale',

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
      'From strategy and design to SEO, AI visibility, development, CRO and retention we become your long-term ecommerce growth partner.',

      "We don't just build Shopify stores, we create high-performing ecommerce ecosystems that attract more visitors, convert more customers, and generate sustainable growth.",

      "Whether you're launching your first Shopify store or managing an established ecommerce brand, our team delivers measurable results through expert strategy, development, marketing, and ongoing optimisation.",
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
        href: ROUTES.caseStudies,
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

      'Our Shopify Plus development services help growing and enterprise ecommerce brands build faster, more flexible, and scalable online stores. We handle Shopify Plus migrations, custom development, integrations, B2B functionality, automation, internationalisation, and ongoing optimisation to create an ecommerce platform ready for growth.',

      'From initial strategy and store architecture to development and long-term support, we help you get more from Shopify Plus while creating a seamless experience for both your customers and internal teams.',
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
      'Turn First Time Buyers Into Loyal Customers',

    description: [
      'Retention marketing that increases repeat purchases and customer lifetime value.',

      'Acquiring customers is expensive, keeping them is where real growth happens. We create automated email and SMS marketing strategies powered by Klaviyo to nurture customers, recover abandoned carts, promote repeat purchases, and build long-term brand loyalty.',

      'We also help businesses launch subscription models and B2B ecommerce experiences to unlock recurring revenue.',
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
      'Expand Your Shopify Store Worldwide',

    description: [
      'Launch internationally with confidence using localisation and scalable ecommerce strategies.',

      'Ready to reach customers beyond your home market? We help Shopify brands expand internationally with multilingual storefronts, multi-currency experiences, regional SEO strategies, and localisation tailored to global audiences. From market entry planning to international optimization, we help brands grow across borders.',
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
      "Improve every stage of your customer's buying journey with data-driven optimization.",

    logos: [
      {
        src: LOGOS.sitelab,
        alt: 'SiteLab',
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
          'Ecommerce SEO',

        href: ROUTES.seo,
      },
    ],

    description: [
      'Driving traffic is only half the equation. We analyse customer behaviour, optimise landing pages, improve checkout experiences, and increase conversion rates through continuous testing and performance improvements.',

      'Our CRO specialists identify growth opportunities that maximise your existing traffic and increase revenue without increasing advertising spend.',
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
