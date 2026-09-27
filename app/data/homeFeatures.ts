import {
  CRO_CLEAN_PATH,
  resolveCanonicalPath,
  SHOPIFY_SEO_CLEAN_PATH,
} from '~/lib/route-mappings';

/* =========================================================
   BYTE OPERATOR - HOME FEATURE DATA
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
  caseStudies: '/work',

  seo: SHOPIFY_SEO_CLEAN_PATH,

  development: '/services/software-theme-development-builds',

  customSoftware: '/services/software-developers',

  migrations: '/services/shopify-migrations',

  cro: CRO_CLEAN_PATH,

  maintenance: '/services/support-and-maintenance',

  emailSms: '/services/email-marketing-agency',

  internationalisation: '/services/shopify-internationalisation',

  appDevelopment: '/services/shopify-app-development',

  headless: '/services/headless-commerce',

  aiAutomations: '/services/ai-ecommerce-agency',

  shopifyPlus: '/services/shopify-plus-agency',

  integrations: '/services/software-integrations',
} as const;


/* =========================================================
   HOME FEATURES
========================================================= */

export const HOME_FEATURES = [
  /* =======================================================
     01 - CUSTOM SOFTWARE & SAAS
  ======================================================= */
  {
    id: 'software-launch',
    layout: 'media-left',
    spacing: 'first',
    theme: 'dark',
    eyebrow: 'Custom Software & SaaS Product Engineering',
    heading: 'Engineering Scalable Platforms & High-Performance SaaS',
    description: [
      'Byte Operator engineers custom web platforms, multi-tenant SaaS products, and mission-critical enterprise systems. From complex workflow automation and real-time collaboration engines to high-throughput cloud architectures, we design and deliver resilient software built for long-term scalability and business impact.',
      'Our engineering team works with modern TypeScript, React, Next.js, Node.js, Python, PostgreSQL, and AWS to build scalable applications that solve core operational challenges.',
    ],
    buttons: [
      {
        label: 'Explore Custom Software',
        href: ROUTES.customSoftware,
      },
    ],
    media: {
      href: ROUTES.caseStudies,
      primary:
        'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/custom_software_case_study.png?v=1790400442',
      primaryAlt:
        'Collabix custom software and SaaS platform architecture',
      primaryWidth: 1920,
      primaryHeight: 1080,
      secondary: '',
      secondaryAlt: '',
      secondaryWidth: 0,
      secondaryHeight: 0,
      captionTitle: 'Collabix SaaS Platform',
      captionText: 'Full-Stack Web Architecture & Project Workflow Engine',
    },
  },

  /* =======================================================
     02 - REPLEX ENGINE & LEAD AUTOMATION
  ======================================================= */
  {
    id: 'software-support-growth',
    layout: 'media-right',
    spacing: 'standard',
    theme: 'dark',
    eyebrow: 'Autonomous AI Lead Capture & Sub-Minute Replies',
    heading: 'Zero-Miss Inbound Lead Capture with Replex Engine',
    description: [
      'Speed to lead directly dictates sales conversion rates. Slow responses cause high-value prospects to seek alternative competitors.',
      'Replex Engine monitors incoming inquiries across web forms, email, WhatsApp, and live chat, generating context-accurate AI responses in under 30 seconds.',
      'The platform qualifies buyer intent, answers technical questions using your verified knowledge base, and books meetings automatically on your calendar.',
    ],
    buttons: [
      {
        label: 'Deploy Replex Engine',
        href: ROUTES.aiAutomations,
      },
      {
        label: 'View Automation Services',
        href: ROUTES.aiAutomations,
      },
    ],
    media: {
      href: ROUTES.caseStudies,
      primary:
        'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/replex.png?v=1790409470',
      primaryAlt:
        'Replex Engine automated AI lead response dashboard',
      primaryWidth: 1920,
      primaryHeight: 1080,
      secondary: '',
      secondaryAlt: '',
      secondaryWidth: 0,
      secondaryHeight: 0,
      captionTitle: 'Replex Engine',
      captionText: 'Autonomous Multi-Channel Lead Response Ecosystem',
    },
  },

  /* =======================================================
     03 - GEO & AI SEARCH
  ======================================================= */
  {
    id: 'software-seo-geo',
    layout: 'media-left',
    spacing: 'deep',
    theme: 'dark',
    eyebrow: 'Generative Engine Optimisation (GEO) & Search Architecture',
    heading: 'Be the Primary Cited Brand in ChatGPT, Perplexity & Google Search',
    description: [
      'Search behavior is undergoing a massive transformation. Consumers and decision-makers increasingly rely on conversational AI answer engines to discover and evaluate products.',
      'We engineer semantic schema knowledge graphs, authoritative entity citations, and AI-optimized content architectures that position your brand as the primary cited source across ChatGPT, Perplexity, and Google AI Overviews.',
    ],
    buttons: [
      {
        label: 'Request AI Search Audit',
        href: '/ai-visibility-audit',
      },
    ],
    media: {
      href: ROUTES.caseStudies,
      primary:
        'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/ai_powered.webp?v=1790408507',
      primaryAlt:
        'AI search visibility and Core Web Vitals telemetry',
      primaryWidth: 1920,
      primaryHeight: 1080,
      secondary: '',
      secondaryAlt: '',
      secondaryWidth: 0,
      secondaryHeight: 0,
      captionTitle: 'Generative Engine Optimisation',
      captionText: 'Conversational Search Visibility & Entity Citations',
    },
  },

  /* =======================================================
     04 - SHOPIFY STORE & THEME DEVELOPMENT
  ======================================================= */
  {
    id: 'software-development',
    layout: 'media-right',
    spacing: 'standard',
    theme: 'dark',
    eyebrow: 'Shopify Store Development & Custom Themes',
    heading: 'High-Velocity Custom Storefronts Built for Conversion & Mobile Speed',
    badges: [
      {
        label: 'Custom Themes',
        href: ROUTES.development,
      },
      {
        label: 'Headless Hydrogen',
        href: ROUTES.headless,
      },
      {
        label: 'Shopify Apps',
        href: ROUTES.appDevelopment,
      },
    ],
    description: [
      'We design and build custom Shopify storefronts with modular Liquid sections, fluid 60fps animations, and friction-free mobile checkout journeys.',
      'Engineered from the ground up for peak Core Web Vitals, accessible UI components, and rapid merchant merchandising flexibility.',
      'Our clean code architectures eliminate third-party app bloat and maintain blazing sub-second page loads across all global markets.',
    ],
    buttons: [
      {
        label: 'Build Your Shopify Store',
        href: ROUTES.development,
      },
    ],
    media: {
      href: ROUTES.caseStudies,
      primary:
        'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/manage_products_of_aydi.png?v=1790403225',
      primaryAlt:
        'Aydi Active high-performance ecommerce storefront and catalog management',
      primaryWidth: 1920,
      primaryHeight: 1080,
      secondary: '',
      secondaryAlt: '',
      secondaryWidth: 0,
      secondaryHeight: 0,
      captionTitle: 'Aydi Active',
      captionText: 'Custom Shopify Theme & Activewear Storefront',
    },
  },

  /* =======================================================
     05 - SPEEDIFY APP & EXTENSIONS
  ======================================================= */
  {
    id: 'software-design',
    layout: 'media-left',
    spacing: 'deep',
    theme: 'dark',
    eyebrow: 'Shopify Apps & AI Optimization Extensions',
    heading: 'Proprietary App Ecosystems & Speedify Performance Optimization',
    description: [
      'Speedify is our proprietary AI-powered Shopify page speed app that automates script hydration, critical asset preloading, and dynamic image compression.',
      'We build public and private Shopify apps with custom Checkout Extensions, Admin Function APIs, and scalable Node.js/Remix cloud backends.',
      'Extend platform capabilities and automate complex operational business logic without compromising storefront load times.',
    ],
    buttons: [
      {
        label: 'Explore Shopify Apps',
        href: ROUTES.appDevelopment,
      },
    ],
    media: {
      href: ROUTES.caseStudies,
      primary:
        'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/speedify_landing.webp?v=1790408507',
      primaryAlt:
        'Speedify AI page speed optimizer app dashboard',
      primaryWidth: 1920,
      primaryHeight: 1080,
      secondary: '',
      secondaryAlt: '',
      secondaryWidth: 0,
      secondaryHeight: 0,
      captionTitle: 'Speedify App',
      captionText: 'AI Page Speed Optimization & Custom Shopify Extensions',
    },
  },

  /* =======================================================
     06 - ENTERPRISE MIGRATIONS
  ======================================================= */
  {
    id: 'software-migrations',
    layout: 'media-right',
    spacing: 'standard',
    theme: 'dark',
    eyebrow: 'Enterprise Platform & Cloud Migrations',
    heading: 'Seamless Migration from Magento, WooCommerce & BigCommerce',
    badges: [
      {
        label: 'Magento Migration',
        href: '/services/magento-software-migrations',
      },
      {
        label: 'WooCommerce Migration',
        href: '/services/woocommerce-software-migrations',
      },
      {
        label: 'BigCommerce Migration',
        href: '/services/bigcommerce-software-migrations',
      },
      {
        label: 'Salesforce Migration',
        href: '/services/salesforce-software-migrations',
      },
    ],
    description: [
      'Replatform your digital store with complete data integrity. We migrate historical customer data, complex order histories, and product variants without data loss.',
      'Rigorous URL redirect mapping and SEO authority safeguards protect your organic rankings, traffic, and revenue during the entire transition.',
      'Launch on a modern, scalable infrastructure with zero downtime and improved checkout performance.',
    ],
    buttons: [
      {
        label: 'Plan Your Migration',
        href: ROUTES.migrations,
      },
      {
        label: 'View Case Studies',
        href: ROUTES.caseStudies,
      },
    ],
    media: {
      href: ROUTES.caseStudies,
      primary:
        'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/shopify_cro_and_migration_store.webp?v=1790407473',
      primaryAlt:
        'Shopify CRO and enterprise platform migration',
      primaryWidth: 1920,
      primaryHeight: 1080,
      secondary: '',
      secondaryAlt: '',
      secondaryWidth: 0,
      secondaryHeight: 0,
      captionTitle: 'OmniRetail Migration',
      captionText: 'Enterprise Platform Migration & SEO Protection',
    },
  },

  /* =======================================================
     07 - SHOPIFY PLUS & LUXURY COMMERCE
  ======================================================= */
  {
    id: 'software-plus',
    layout: 'media-left',
    spacing: 'deep',
    theme: 'dark',
    eyebrow: 'Shopify Plus & High-AOV Luxury Commerce',
    heading: 'Enterprise Storefronts & B2B Wholesale Commerce Architecture',
    badges: [
      {
        label: 'Shopify Plus Agency',
        href: ROUTES.shopifyPlus,
      },
    ],
    description: [
      'We design and build high-AOV Shopify Plus stores with custom pricing tiers, automated customer segmentation, and multi-currency global checkouts.',
      'From luxury furniture and lifestyle goods to high-volume wholesale portals, our architectures support millions in annual GMV.',
      'Full integration with ERP systems, custom freight calculations, and tailored merchandising rules give enterprise merchants complete operational agility.',
    ],
    buttons: [
      {
        label: 'Explore Shopify Plus',
        href: ROUTES.shopifyPlus,
      },
    ],
    media: {
      href: ROUTES.caseStudies,
      primary:
        'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/furniture.webp?v=1790407636',
      primaryAlt:
        'Nordic Haven luxury furniture digital storefront',
      primaryWidth: 1920,
      primaryHeight: 1080,
      secondary: '',
      secondaryAlt: '',
      secondaryWidth: 0,
      secondaryHeight: 0,
      captionTitle: 'Nordic Haven Furniture',
      captionText: 'Shopify Plus & Enterprise Architecture',
    },
  },

  /* =======================================================
     08 - N8N WORKFLOW AUTOMATIONS
  ======================================================= */
  {
    id: 'email-sms-retention',
    layout: 'media-right',
    spacing: 'standard',
    theme: 'dark',
    eyebrow: 'n8n Pipeline Automation & Multi-System Workflows',
    heading: 'Connecting SaaS Tools, Databases & Automated Operations with n8n',
    description: [
      'We build visual, resilient automation pipelines in n8n connecting disparate SaaS tools, payment gateways, databases, and customer support queues.',
      'Automate repetitive data transformation, invoice generation, customer onboarding, and order fulfillment without brittle manual scripts.',
      'Self-hosted and cloud n8n architectures deliver total data privacy, zero per-task cost penalties, and enterprise-grade reliability.',
    ],
    buttons: [
      {
        label: 'Build n8n Workflows',
        href: ROUTES.integrations,
      },
    ],
    media: {
      href: ROUTES.caseStudies,
      primary:
        'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/n8n.webp?v=1790409457',
      primaryAlt:
        'n8n workflow automation and API pipeline orchestration',
      primaryWidth: 1920,
      primaryHeight: 1080,
      secondary: '',
      secondaryAlt: '',
      secondaryWidth: 0,
      secondaryHeight: 0,
      captionTitle: 'n8n Pipelines',
      captionText: 'Multi-System Workflow Orchestration',
    },
  },

  /* =======================================================
     09 - INTERACTIVE CATALOGS & TOY STORES
  ======================================================= */
  {
    id: 'software-internationalisation',
    layout: 'media-left',
    spacing: 'deep',
    theme: 'dark',
    eyebrow: 'Interactive Catalogs & Child-Centric UX Design',
    heading: 'Engaging Toy Stores & Gamified Product Discovery',
    description: [
      'Explore our interactive toy store development featuring dynamic age-group filtering, animated category exploration, and frictionless parent checkout.',
      'Custom UI animations and responsive catalog search make product discovery fun, engaging, and highly converting.',
      'Optimized for fast mobile browsing with rich media compression and instant filter reactivity.',
    ],
    buttons: [
      {
        label: 'Explore Storefront Builds',
        href: ROUTES.development,
      },
    ],
    media: {
      href: ROUTES.caseStudies,
      primary:
        'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/toys.webp?v=1790407473',
      primaryAlt:
        'Kids Wonderland toy store development and interactive shopping experience',
      primaryWidth: 1920,
      primaryHeight: 1080,
      secondary: '',
      secondaryAlt: '',
      secondaryWidth: 0,
      secondaryHeight: 0,
      captionTitle: 'Kids Wonderland',
      captionText: 'Interactive Storefront & Custom Catalog',
    },
  },

  /* =======================================================
     10 - REAL-TIME API & CRM ENDPOINTS
  ======================================================= */
  {
    id: 'software-cro',
    layout: 'media-right',
    spacing: 'standard',
    theme: 'dark',
    eyebrow: 'Real-Time CRM & Webhook API Synchronization',
    heading: 'Bi-Directional Data Synchronization & Instant Team Alerts',
    badges: [
      {
        label: 'API Integrations',
        href: ROUTES.integrations,
      },
      {
        label: 'CRM Synchronization',
        href: ROUTES.integrations,
      },
      {
        label: 'Technical SEO',
        href: ROUTES.seo,
      },
    ],
    description: [
      'We connect your storefront directly to HubSpot, Salesforce, Klaviyo, and internal PostgreSQL databases with real-time webhooks.',
      'Every customer touchpoint, lead score, and order update is synchronized in milliseconds, triggering automated Slack notifications and instant team workflows.',
      'Eliminate data silos and empower your sales and support teams with comprehensive customer context.',
    ],
    buttons: [
      {
        label: 'Connect API Pipelines',
        href: ROUTES.integrations,
      },
    ],
    media: {
      href: ROUTES.caseStudies,
      primary:
        'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/third_party_api_endpoints.png?v=1790403408',
      primaryAlt:
        'Real-time CRM and third-party webhook endpoints',
      primaryWidth: 1920,
      primaryHeight: 1080,
      secondary: '',
      secondaryAlt: '',
      secondaryWidth: 0,
      secondaryHeight: 0,
      captionTitle: 'API & Webhook Endpoints',
      captionText: 'Real-Time CRM & System Integration',
    },
  },
] as const satisfies readonly HomeFeatureData[];
