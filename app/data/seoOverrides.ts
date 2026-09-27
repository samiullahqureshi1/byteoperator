/*
  SEO TITLES & DESCRIPTIONS
  Search-result copy for pages whose on-page hero text is too long to reuse.
  Titles: ≤ 44 chars here (" | Byte Operator" is appended → ≤ 60 total).
  Descriptions: ~120–160 chars so Google shows them without truncation.
*/

export type SeoCopy = {title: string; description: string};

/** Keyed by /services/[handle]. Falls back to the hero copy when missing. */
export const SERVICE_SEO: Record<string, SeoCopy> = {
  'software-developers': {
    title: 'Custom Software Development Services',
    description:
      'Byte Operator designs and builds custom software, SaaS platforms, enterprise applications and business systems. Explore our services and case studies.',
  },
  'software-web-design': {
    title: 'Software Website Design',
    description:
      'Storefront design built around clear customer journeys, strong brand presentation and mobile-first usability, from the first landing page to checkout.',
  },
  'software-app-development': {
    title: 'Mobile App Development & Engineering',
    description:
      'Custom native and cross-platform mobile apps in React Native, Flutter, Swift and Kotlin, with offline-first architecture and scalable cloud backends.',
  },
  'software-integrations': {
    title: 'API & Third-Party System Integrations',
    description:
      'Enterprise-grade APIs, custom middleware and two-way sync pipelines that connect your ERP, CRM, marketplaces and third-party platforms into one system.',
  },
  'software-internationalisation': {
    title: 'Software Internationalisation Experts',
    description:
      'Sell into new regions with Software Markets setup, localisation, multi-currency payments and international SEO, handled end to end by Byte Operator.',
  },
  'software-audits': {
    title: 'Digital Platform Audits',
    description:
      "A full audit of your store's UX, conversion, development, SEO and performance, delivered as a prioritised list of practical recommendations.",
  },
  'magento-software-migrations': {
    title: 'Magento & Adobe Commerce Migration Services',
    description:
      'Move from Magento or Adobe Commerce with data migration, storefront development, integrations, SEO migration and launch preparation handled for you.',
  },
  'woocommerce-software-migrations': {
    title: 'WordPress & WooCommerce Migration Services',
    description:
      'Move from WordPress and WooCommerce with migration planning, store data transfer, storefront development, integrations and SEO migration handled for you.',
  },
  'headless-commerce': {
    title: 'Headless & Cloud Architecture',
    description:
      'Decoupled headless systems, serverless edge networks and scalable cloud infrastructure built for low latency, global availability and developer speed.',
  },
  'bigcommerce-software-migrations': {
    title: 'BigCommerce Migration Services',
    description:
      'Replatform from BigCommerce with migration planning, store data transfer, storefront development, integrations and SEO migration handled end to end.',
  },
  'salesforce-software-migrations': {
    title: 'Salesforce Commerce Cloud Migration Services',
    description:
      'Move from Salesforce Commerce Cloud with migration planning, data transfer, storefront development, integrations, SEO migration, testing and launch.',
  },
  'software-migrations': {
    title: 'Platform & Cloud Migration Services',
    description:
      'Ecommerce platform migrations covering planning, storefront development, data migration, integrations and technical SEO, so you launch without losing ranking.',
  },
  'software-theme-development-builds': {
    title: 'Full-Stack Web & Multi-Vendor Engineering',
    description:
      'Custom full-stack web apps, multi-vendor marketplaces and high-throughput API platforms built with React, Node.js and Tailwind CSS for complex commerce.',
  },
  'agentic-commerce': {
    title: 'Agentic Commerce Agency',
    description:
      'Get your products found by AI shopping agents. We structure product data, schema and catalogue content so machine-assisted shopping can understand it.',
  },
  'ecommerce-seo-migrations': {
    title: 'Platform SEO Migrations',
    description:
      'Protect rankings during replatforming and rebuilds. We audit URLs, content, redirects and technical setup before and after launch to reduce migration risk.',
  },
  'email-marketing-agency': {
    title: 'Software Email Marketing Agency',
    description:
      'Email and SMS retention for ecommerce: segmentation, automated lifecycle flows, campaign planning, loyalty and subscriptions that drive repeat purchases.',
  },
  'why-custom-software': {
    title: 'Why Custom Software',
    description:
      'What a modern commerce platform offers growing brands: hosted infrastructure, room for custom development, deep integrations and flexible SEO and CRO.',
  },
  'software-experts': {
    title: 'Software Engineering Experts',
    description:
      'A team of Software experts covering design, development, migrations, integrations, SEO and conversion work for brands building and scaling online.',
  },
  memberships: {
    title: 'Software Retainers & Memberships',
    description:
      'Monthly retainers for continuous support: maintenance, development time, conversion work and technical help from a team that already knows your store.',
  },
  'software-consultant': {
    title: 'Software Engineering Consultancy',
    description:
      'Senior architecture and ecommerce consulting before you commit budget: audits, platform and migration decisions, SEO and CRO priorities, and a roadmap.',
  },
  'software-b2b-wholesale': {
    title: 'B2B & Wholesale Ecommerce Agency',
    description:
      'B2B and wholesale stores with company accounts, customer-specific pricing, bulk ordering and the integrations that keep trade operations in sync.',
  },
  'subscriptions-on-software': {
    title: 'Software Subscription Specialists',
    description:
      'Subscription commerce done right: recurring purchase options, a smooth signup journey, self-serve account tools and the integrations behind them.',
  },
  'support-and-maintenance': {
    title: 'Dedicated Engineering Support',
    description:
      'Ongoing support and maintenance after launch: bug fixes, troubleshooting, theme changes, app and integration support, and performance improvements.',
  },
  'ai-automations-agents': {
    title: 'AI Automations & Autonomous Agents',
    description:
      'Intelligent AI automations, autonomous agent workflows and instant lead response, powered by our Replex Engine and n8n pipelines, running 24/7.',
  },
  'klaviyo-agency': {
    title: 'Klaviyo Email Marketing Agency',
    description:
      'Klaviyo email, SMS, automated flows and segmentation built around how your customers actually buy, using the store data Klaviyo already receives.',
  },
  'shopify-app-development': {
    title: 'Shopify Apps & Custom Extensions',
    description:
      'Public and custom Shopify apps, checkout extensions and backend microservices built with Remix, Node.js and App Bridge to streamline merchant operations.',
  },
  'shopify-audits': {
    title: 'Performance & Speed Audits',
    description:
      'Deep analysis of your Shopify theme, apps, scripts and asset delivery, with code-level fixes that improve Core Web Vitals, page speed and conversion.',
  },
};

/** Keyed by /work/[handle]. */
export const CASE_STUDY_SEO: Record<string, Partial<SeoCopy>> = {
  collabix: {
    description:
      'How Byte Operator built Collabix, a collaborative SaaS platform with real-time sync, an event-driven back end and scalable cloud infrastructure.',
  },
  'replex-engine': {
    description:
      'Replex Engine is Byte Operator’s own AI product: an autonomous system that replies to and qualifies inbound leads around the clock.',
  },
  'aydi-active': {
    description:
      'How Byte Operator built a custom Shopify Plus storefront for Aydi Active, focused on fast mobile product discovery and clear variant selection.',
  },
  'kids-wonderland': {
    description:
      'How Byte Operator redesigned the Kids Wonderland toy store with age and interest filters, an interactive gift finder and a smarter cart drawer.',
  },
  'nordic-haven': {
    description:
      'A Shopify Plus flagship for Nordic Haven: Scandinavian brand storytelling, a room and fabric visualiser and a B2B wholesale trade portal.',
  },
  'omniretail-migration': {
    title: 'OmniRetail Enterprise Migration Case Study',
    description:
      'How Byte Operator migrated OmniRetail Global from on-premise Magento to Shopify Plus, including data, ERP connections and a full 301 redirect plan.',
  },
  'speedify-ai': {
    description:
      'Speedify AI is Byte Operator’s own performance app, automating critical CSS, image compression and script deferral for ecommerce storefronts.',
  },
  'autonomous-agent-swarms': {
    description:
      'Multi-agent AI workflows and n8n pipelines connecting CRM, ERP, inventory and customer messaging for a supply chain and logistics client.',
  },
};
