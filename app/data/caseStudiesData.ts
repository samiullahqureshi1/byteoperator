export interface CaseStudyItem {
  id: string;
  handle: string;
  title: string;
  subtitle?: string;
  category?: string;
  tags: string[];
  href?: string;
  result?: { value: string };
  services?: { value: string };
  /** Deprecated: unverified figures were removed. Add only with evidence. */
  metrics?: Array<{ label: string; value: string }>;
  client?: string;
  industry?: string;
  image?: {
    url: string;
    altText?: string;
    width?: number;
    height?: number;
  };
  logo?: {
    reference?: {
      image?: {
        url: string;
        altText?: string;
        width?: number;
        height?: number;
      };
    };
  };
  intro?: string;
  details?: Array<{ label: string; value: string }>;
  /** Service pages this project demonstrates (based on its stated services/platform). */
  relatedServices?: Array<{ label: string; path: string }>;
  stats?: Array<{ value: string; label: string }>;
  chapters?: Array<{
    number: string;
    title: string;
    subheading: string;
    points: Array<{ title: string; text: string }>;
  }>;
}

/*
  CASE STUDIES — BYTE OPERATOR
  Proof pages: publish only verifiable information.
  - Numbers (conversion, speed, revenue, uptime, SKUs, users, hours…) were
    removed on 2026-09-27 because none had recorded evidence. Add a figure back
    only with its source, e.g. an analytics export or client sign-off, noted in
    a comment next to it.
  - Replex Engine and Speedify AI are Byte Operator's own products, not client
    engagements; keep them labelled as such.
  - Client names below were confirmed as real Byte Operator clients.
*/
export const CASE_STUDIES: CaseStudyItem[] = [
  {
    id: 'cs-collabix',
    handle: 'collabix',
    title: 'Collabix SaaS Platform',
    subtitle: 'Enterprise SaaS Architecture, Real-Time Collaboration & Cloud Engineering',
    category: 'SaaS & Custom Software',
    tags: ['all', 'saas & custom software', 'saas', 'software', 'cloud', 'architecture'],
    result: { value: 'Custom SaaS Platform Build' },
    services: { value: 'Full-Stack Web Architecture / Distributed Cloud Infrastructure / Real-Time Data' },
    image: {
      url: 'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/custom_software_case_study.png?v=1790400442',
      altText: 'Collabix custom software and SaaS platform architecture',
      width: 1920,
      height: 1080,
    },
    intro: 'Byte Operator designed and built Collabix, a collaborative SaaS platform for teams, covering real-time collaboration, the event-driven back end and the cloud infrastructure it runs on.',
    relatedServices: [
      { label: 'Custom Software Development', path: '/services/software-developers' },
    ],
    details: [
      { label: 'Client', value: 'Collabix Inc.' },
      { label: 'Industry', value: 'Enterprise SaaS & Cloud Software' },
      { label: 'Platform', value: 'Next.js, Node.js, GraphQL & Distributed Microservices' },
      { label: 'Services', value: 'Custom SaaS Engineering, Real-Time WebSockets, Cloud Infrastructure' },
    ],
    chapters: [
      {
        number: '01',
        title: 'The Challenge',
        subheading: 'Keeping shared team data in sync in real time as usage grows',
        points: [
          {
            title: 'Distributed State Synchronization',
            text: 'Teams required instant multi-user document updates, task state changes and workspace sync without conflict errors.',
          },
          {
            title: 'Legacy Performance Bottlenecks',
            text: 'Monolithic data structures caused memory spikes and slow response times during busy periods.',
          },
        ],
      },
      {
        number: '02',
        title: 'What Byte Operator Did',
        subheading: 'Event-driven microservices with edge caching and partitioned data',
        points: [
          {
            title: 'Event-Driven Pipeline',
            text: 'Engineered an asynchronous queue system that propagates collaboration events between services and connected users.',
          },
          {
            title: 'Tailored UI / UX System',
            text: 'Built a keyboard-first web interface designed for focused, uninterrupted work.',
          },
        ],
      },
      {
        number: '03',
        title: 'The Outcome',
        subheading: 'A custom platform built for real-time team collaboration',
        points: [
          {
            title: 'Real-Time Collaboration',
            text: 'Document, task and workspace changes are shared between users through the event-driven pipeline rather than the previous monolithic data layer.',
          },
          {
            title: 'Scalable Architecture',
            text: 'Microservices, edge caching and partitioned data give the platform room to grow without a rebuild.',
          },
        ],
      },
    ],
  },

  {
    id: 'cs-replex',
    handle: 'replex-engine',
    title: 'Replex AI Lead Engine',
    subtitle: 'In-House Product: Autonomous AI Lead Response & Qualification',
    category: 'AI & Automation',
    tags: ['all', 'ai & automation', 'ai', 'automation', 'lead-capture', 'replex'],
    result: { value: 'In-House Byte Operator Product' },
    services: { value: 'Autonomous AI Reply Agent / Multi-Channel Inbound Router / Automated Pipeline' },
    image: {
      url: 'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/replex.png?v=1790409470',
      altText: 'Replex Engine AI communication and lead reply automation',
      width: 1920,
      height: 1080,
    },
    intro: 'Replex Engine is Byte Operator’s own AI product: an autonomous lead response and qualification system that replies to inbound enquiries around the clock. We designed and built it in-house, and it powers the lead-capture automations we deliver.',
    relatedServices: [
      { label: 'AI Automations & Autonomous Agents', path: '/services/ai-automations-agents' },
    ],
    details: [
      { label: 'Type', value: 'In-house product built by Byte Operator' },
      { label: 'Industry', value: 'AI Sales Automation & CRM' },
      { label: 'Platform', value: 'Autonomous LLM Agents, Multi-Channel Webhooks & REST APIs' },
      { label: 'Services', value: 'Conversational AI, Lead Ingestion Pipeline, Custom Dashboard' },
    ],
    chapters: [
      {
        number: '01',
        title: 'The Problem',
        subheading: 'Slow or missed replies to inbound leads',
        points: [
          {
            title: 'The Speed-to-Lead Problem',
            text: 'Leads that wait for a reply go cold, and sales teams cannot answer every enquiry immediately, especially outside working hours.',
          },
          {
            title: 'Fragmented Channels',
            text: 'Inbound requests arriving across email, website chat, SMS and marketplaces are hard to track in one place.',
          },
        ],
      },
      {
        number: '02',
        title: 'What We Built',
        subheading: 'A context-aware agent trained on brand knowledge, with instant reply orchestration',
        points: [
          {
            title: 'Instant Autonomous Replies',
            text: 'Replex evaluates inbound context, qualifies buyer intent, answers product questions and schedules meetings.',
          },
          {
            title: 'Unified Lead Dashboard',
            text: 'Live telemetry tracks every conversation stage, sentiment score and booked appointment.',
          },
        ],
      },
      {
        number: '03',
        title: 'What It Does',
        subheading: 'Automated first response and qualification for every inbound channel',
        points: [
          {
            title: 'Always-On Responses',
            text: 'Inbound enquiries from connected channels receive a reply without waiting for a team member to be available.',
          },
          {
            title: 'One View of the Pipeline',
            text: 'Conversations, qualification status and booked meetings are visible in a single dashboard.',
          },
        ],
      },
    ],
  },

  {
    id: 'cs-aydi',
    handle: 'aydi-active',
    title: 'Aydi Active Ecommerce',
    subtitle: 'Activewear Storefront, Custom Theme Architecture & Mobile UX',
    category: 'Ecommerce & Storefronts',
    tags: ['all', 'ecommerce & storefronts', 'fashion', 'storefront', 'cro', 'development'],
    result: { value: 'Custom Shopify Plus Storefront' },
    services: { value: 'Custom Storefront Engineering / High-Velocity Checkout / Mobile UX' },
    image: {
      url: 'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/manage_products_of_aydi.png?v=1790403225',
      altText: 'Aydi Active high-performance ecommerce storefront and catalog management',
      width: 1920,
      height: 1080,
    },
    intro: 'Byte Operator developed a custom Shopify Plus storefront for Aydi Active, focused on fast mobile product discovery, clear variant selection and a premium brand presentation.',
    relatedServices: [
      { label: 'Shopify Plus & Enterprise', path: '/shopify-plus-agency' },
      { label: 'CRO Audit & Conversion Optimization', path: '/shopify-cro-audit' },
    ],
    details: [
      { label: 'Client', value: 'Aydi Active' },
      { label: 'Industry', value: 'Athletic Wear & Active Lifestyle' },
      { label: 'Platform', value: 'Shopify Plus & Custom Modular Theme' },
      { label: 'Services', value: 'Custom Theme Engineering, Mobile CRO, Performance Tuning' },
    ],
    chapters: [
      {
        number: '01',
        title: 'The Challenge',
        subheading: 'Mobile friction and slow catalogue filtering on an off-the-shelf theme',
        points: [
          {
            title: 'Mobile Friction',
            text: 'Most shoppers arrived on mobile, where swatch selection was cumbersome and pages loaded slowly.',
          },
          {
            title: 'Brand Elevation',
            text: 'The brand needed an editorial, premium design that reflected its performance apparel.',
          },
        ],
      },
      {
        number: '02',
        title: 'What Byte Operator Did',
        subheading: 'A lightweight modular theme with a sticky cart, rich swatch previews and fast navigation',
        points: [
          {
            title: 'Custom Modular Components',
            text: 'Built responsive product detail modules with video, a size recommendation calculator and quick-buy drawers.',
          },
          {
            title: 'Speed Optimization',
            text: 'Removed heavy third-party scripts and added asset preloading for quicker page transitions.',
          },
        ],
      },
      {
        number: '03',
        title: 'The Outcome',
        subheading: 'A faster, mobile-first storefront that reflects the brand',
        points: [
          {
            title: 'Easier Mobile Buying',
            text: 'Swatch previews, the size calculator, quick-buy drawers and a sticky cart replaced the old theme’s multi-step mobile flow.',
          },
          {
            title: 'Leaner Pages',
            text: 'The custom theme ships without the third-party scripts that previously slowed the storefront down.',
          },
        ],
      },
    ],
  },

  {
    id: 'cs-toys',
    handle: 'kids-wonderland',
    title: 'Kids Wonderland Toy Store',
    subtitle: 'Interactive Retail Storefront & Custom Catalogue Discovery',
    category: 'Ecommerce & Storefronts',
    tags: ['all', 'ecommerce & storefronts', 'retail', 'design', 'development'],
    result: { value: 'Gift Finder & Custom Cart Experience' },
    services: { value: 'Modular Storefront Architecture / Gamified Product Filtering / Custom Cart Drawer' },
    image: {
      url: 'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/toys.webp?v=1790407473',
      altText: 'Kids Wonderland interactive toy store development',
      width: 1920,
      height: 1080,
    },
    intro: 'Byte Operator redesigned the Kids Wonderland online toy store around easier discovery for gift buyers, with age- and interest-based filtering, an interactive gift finder and a smarter cart.',
    relatedServices: [
      { label: 'Software Website Design', path: '/services/software-web-design' },
    ],
    details: [
      { label: 'Client', value: 'Kids Wonderland' },
      { label: 'Industry', value: 'Toys, Games & Children Retail' },
      { label: 'Platform', value: 'Shopify Custom Architecture' },
      { label: 'Services', value: 'Interactive UI / UX, Age & Interest Filtering, Upsell Engine' },
    ],
    chapters: [
      {
        number: '01',
        title: 'The Challenge',
        subheading: 'Helping gift buyers find the right toy in a large catalogue',
        points: [
          {
            title: 'Complex Categorization',
            text: 'Shoppers needed to find toys quickly by age group, educational stage, interest and price range.',
          },
          {
            title: 'Checkout Abandonment',
            text: 'Cluttered cart pages caused drop-offs during busy holiday shopping periods.',
          },
        ],
      },
      {
        number: '02',
        title: 'What Byte Operator Did',
        subheading: 'Visual filtering, a personalised gift finder and bundle suggestions',
        points: [
          {
            title: 'Interactive Gift Finder',
            text: 'Built a three-step gift quiz that matches the recipient’s age and hobbies to toy bundles.',
          },
          {
            title: 'Smart Cart Drawer',
            text: 'Added a free-shipping progress bar, gift-wrapping options and relevant add-ons to the cart drawer.',
          },
        ],
      },
      {
        number: '03',
        title: 'The Outcome',
        subheading: 'A simpler path from browsing to checkout for gift buyers',
        points: [
          {
            title: 'Guided Discovery',
            text: 'Age and interest filters and the gift finder give shoppers a clear starting point instead of browsing the whole catalogue.',
          },
          {
            title: 'A Cleaner Cart',
            text: 'The cart drawer replaced the cluttered cart page, keeping shipping progress and add-ons in one place.',
          },
        ],
      },
    ],
  },

  {
    id: 'cs-furniture',
    handle: 'nordic-haven',
    title: 'Nordic Haven Furniture Flagship',
    subtitle: 'Scandinavian Interior Storefront & B2B Wholesale Commerce',
    category: 'Shopify Plus & Migrations',
    tags: ['all', 'shopify plus & migrations', 'furniture', 'enterprise', 'shopify-plus'],
    result: { value: 'Shopify Plus Storefront & B2B Trade Portal' },
    services: { value: 'Shopify Plus Enterprise Architecture / Room Staging Visualizer / Custom B2B Checkout' },
    image: {
      url: 'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/furniture.webp?v=1790407636',
      altText: 'Nordic Haven luxury furniture digital storefront',
      width: 1920,
      height: 1080,
    },
    intro: 'Byte Operator built a Shopify Plus flagship for Nordic Haven, combining Scandinavian brand storytelling, an interactive room and fabric visualiser, and a B2B wholesale ordering portal for trade clients.',
    relatedServices: [
      { label: 'Shopify Plus & Enterprise', path: '/shopify-plus-agency' },
      { label: 'B2B & Wholesale Ecommerce', path: '/services/software-b2b-wholesale' },
    ],
    details: [
      { label: 'Client', value: 'Nordic Haven Living' },
      { label: 'Industry', value: 'Luxury Furniture & Scandinavian Interior Design' },
      { label: 'Platform', value: 'Shopify Plus Enterprise' },
      { label: 'Services', value: 'Enterprise Storefront, B2B Tier Pricing, 3D Product Modeling' },
    ],
    chapters: [
      {
        number: '01',
        title: 'The Challenge',
        subheading: 'Buyer hesitation on high-ticket furniture, and manual trade ordering',
        points: [
          {
            title: 'Visual Trust & Texture',
            text: 'Customers needed confidence in materials, fabric swatches and dimensions before buying high-ticket pieces online.',
          },
          {
            title: 'Manual Wholesale Processing',
            text: 'Interior designers and commercial trade clients had to email purchase orders manually.',
          },
        ],
      },
      {
        number: '02',
        title: 'What Byte Operator Did',
        subheading: 'A room and fabric visualiser plus Shopify Plus B2B wholesale pricing',
        points: [
          {
            title: 'Fabric Swatch & Dimension Viewer',
            text: 'Customers can customise wood finishes and fabrics in real time, with scale indicators for each piece.',
          },
          {
            title: 'B2B Trade Portal',
            text: 'Integrated wholesale account approvals, net-30 terms, tiered quantity discounts and tax exemption handling.',
          },
        ],
      },
      {
        number: '03',
        title: 'The Outcome',
        subheading: 'One platform for both retail customers and trade buyers',
        points: [
          {
            title: 'More Confident Buying',
            text: 'Shoppers can see finishes, fabrics and dimensions before committing to a high-ticket purchase.',
          },
          {
            title: 'Digital Trade Ordering',
            text: 'Trade clients now order through the B2B portal with their own pricing and terms, instead of emailing purchase orders.',
          },
        ],
      },
    ],
  },

  {
    id: 'cs-omniretail',
    handle: 'omniretail-migration',
    title: 'OmniRetail Global Enterprise Migration',
    subtitle: 'Magento to Shopify Plus Replatforming & SEO Migration',
    category: 'Shopify Plus & Migrations',
    tags: ['all', 'shopify plus & migrations', 'migrations', 'cro', 'seo', 'enterprise'],
    result: { value: 'Magento to Shopify Plus Migration' },
    services: { value: 'Data Replatforming / 301 Redirect Mapping / High-Converting UI' },
    image: {
      url: 'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/shopify_cro_and_migration_store.webp?v=1790407473',
      altText: 'Shopify CRO and enterprise platform migration',
      width: 1920,
      height: 1080,
    },
    intro: 'Byte Operator migrated OmniRetail Global, a multi-brand retailer, from a legacy on-premise Magento setup to Shopify Plus, including product and customer data, ERP connections and a full SEO redirect plan.',
    relatedServices: [
      { label: 'Magento & Adobe Commerce Migration', path: '/services/magento-software-migrations' },
      { label: 'Platform SEO Migrations', path: '/services/ecommerce-seo-migrations' },
    ],
    details: [
      { label: 'Client', value: 'OmniRetail Global' },
      { label: 'Industry', value: 'Multi-Brand Omnichannel Retail' },
      { label: 'Platform', value: 'Magento to Shopify Plus Enterprise' },
      { label: 'Services', value: 'Data Pipeline, 301 SEO Mapping, Custom ERP Connector' },
    ],
    chapters: [
      {
        number: '01',
        title: 'The Challenge',
        subheading: 'Moving complex enterprise data, ERP connections and search rankings safely',
        points: [
          {
            title: 'High-Risk Data Complexity',
            text: 'A large product catalogue with many variants, years of customer history and multi-warehouse inventory had to move intact.',
          },
          {
            title: 'SEO Vulnerability',
            text: 'Legacy URLs held valuable search rankings that could be lost if the migration broke them.',
          },
        ],
      },
      {
        number: '02',
        title: 'What Byte Operator Did',
        subheading: 'Automated data transformation, a complete 301 redirect map and real-time ERP sync',
        points: [
          {
            title: 'Data Transformation & Validation',
            text: 'Built custom scripts that cleaned, mapped, validated and imported the product and customer data.',
          },
          {
            title: 'SEO Redirect Matrix',
            text: 'Mapped legacy URLs to clean canonical structures and added JSON-LD structured data on the new platform.',
          },
        ],
      },
      {
        number: '03',
        title: 'The Outcome',
        subheading: 'The business moved from on-premise Magento to Shopify Plus',
        points: [
          {
            title: 'Replatformed with SEO Safeguards',
            text: 'Legacy URLs redirect to their new equivalents, so existing rankings and links point to live pages.',
          },
          {
            title: 'Connected Operations',
            text: 'A custom ERP connector keeps inventory and order data in sync between Shopify Plus and the back office.',
          },
        ],
      },
    ],
  },

  {
    id: 'cs-speedify',
    handle: 'speedify-ai',
    title: 'Speedify AI Performance App',
    subtitle: 'In-House Product: Core Web Vitals Optimisation App & Asset Compression',
    category: 'Apps & Tools',
    tags: ['all', 'apps & tools', 'apps', 'speed', 'ai', 'development'],
    result: { value: 'In-House Byte Operator Product' },
    services: { value: 'AI Asset Compression / Script Offloading / Speed Telemetry' },
    image: {
      url: 'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/speedify_landing.webp?v=1790408507',
      altText: 'Speedify AI page speed optimizer app dashboard',
      width: 1920,
      height: 1080,
    },
    intro: 'Speedify AI is Byte Operator’s own performance app. We built it in-house to automate critical CSS generation, image compression and JavaScript deferral for ecommerce storefronts.',
    relatedServices: [
      { label: 'Shopify App Development', path: '/services/shopify-app-development' },
      { label: 'Performance & Speed Audits', path: '/services/shopify-audits' },
    ],
    details: [
      { label: 'Type', value: 'In-house product built by Byte Operator' },
      { label: 'Product', value: 'Speedify AI' },
      { label: 'Industry', value: 'Web Performance & Developer Tooling' },
      { label: 'Platform', value: 'Shopify App Bridge, Cloudflare Workers & Rust Engine' },
      { label: 'Services', value: 'App Development, Core Web Vitals Engineering, Telemetry UI' },
    ],
    chapters: [
      {
        number: '01',
        title: 'The Problem',
        subheading: 'Third-party scripts and heavy assets slowing down mobile storefronts',
        points: [
          {
            title: 'Core Web Vitals',
            text: 'Core Web Vitals are part of Google’s page experience signals, and slow pages lose shoppers before they buy.',
          },
          {
            title: 'Technical Complexity',
            text: 'Manual speed work needs ongoing developer effort every time a new app or marketing pixel is added.',
          },
        ],
      },
      {
        number: '02',
        title: 'What We Built',
        subheading: 'An automated engine that analyses pages and defers non-critical work',
        points: [
          {
            title: 'Critical CSS & Asset Offloading',
            text: 'Generates critical stylesheets on the fly and converts images to modern AVIF and WebP formats.',
          },
          {
            title: 'Live Telemetry Dashboard',
            text: 'Lets store owners monitor real-user speed metrics and Core Web Vitals in real time.',
          },
        ],
      },
      {
        number: '03',
        title: 'What It Does',
        subheading: 'Automates the performance work that usually needs a developer',
        points: [
          {
            title: 'Automated Optimisation',
            text: 'Critical CSS, image conversion and script deferral run automatically instead of being hand-tuned for each change.',
          },
          {
            title: 'Visible Performance',
            text: 'The telemetry dashboard shows how real visitors experience the store, so problems surface early.',
          },
        ],
      },
    ],
  },

  {
    id: 'cs-swarms',
    handle: 'autonomous-agent-swarms',
    title: 'Autonomous Multi-Agent AI Swarms',
    subtitle: 'Visual Workflow Orchestration, n8n Pipelines & Multi-System Automation',
    category: 'AI & Automation',
    tags: ['all', 'ai & automation', 'ai', 'automation', 'n8n', 'integrations'],
    result: { value: 'Multi-Agent Operations Automation' },
    services: { value: 'n8n Pipeline Architecture / Multi-Agent LLM Orchestration / ERP Webhook Sync' },
    image: {
      url: 'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/second_autmation_imaeg.webp?v=1790409459',
      altText: 'Autonomous multi-agent task execution and AI workflow swarms',
      width: 1920,
      height: 1080,
    },
    intro: 'Byte Operator designed and implemented multi-agent AI workflows and n8n pipelines for a supply chain and ecommerce logistics client, connecting CRM, ERP, inventory and customer messaging.',
    relatedServices: [
      { label: 'AI Automations & Autonomous Agents', path: '/services/ai-automations-agents' },
      { label: 'API & System Integrations', path: '/services/software-integrations' },
    ],
    details: [
      { label: 'Client', value: 'Enterprise Operations Client' },
      { label: 'Industry', value: 'Supply Chain & Ecommerce Logistics' },
      { label: 'Platform', value: 'n8n, Multi-Agent LLMs, Custom Webhooks' },
      { label: 'Services', value: 'Workflow Engineering, Agent Swarms, API Integration' },
    ],
    chapters: [
      {
        number: '01',
        title: 'The Challenge',
        subheading: 'Siloed data across ERPs, spreadsheets and support desks, maintained by hand',
        points: [
          {
            title: 'Operational Bottlenecks',
            text: 'Teams spent significant time re-keying order data and resolving sync errors between warehouses.',
          },
          {
            title: 'Slow Exception Handling',
            text: 'Inventory discrepancies and fulfilment delays needed human intervention, which held up shipping.',
          },
        ],
      },
      {
        number: '02',
        title: 'What Byte Operator Did',
        subheading: 'Specialised AI agents working through visual n8n execution pipelines',
        points: [
          {
            title: 'Agent Task Distribution',
            text: 'Specialised AI agents monitor webhook queues, parse supplier invoices and update inventory counts.',
          },
          {
            title: 'Self-Healing Fallbacks',
            text: 'Automated validation loops correct formatting errors and alert engineers only when anomalies occur.',
          },
        ],
      },
      {
        number: '03',
        title: 'The Outcome',
        subheading: 'Routine data work handled by automated workflows',
        points: [
          {
            title: 'Less Manual Re-Keying',
            text: 'Order, invoice and inventory updates move between systems through the pipelines instead of being entered by hand.',
          },
          {
            title: 'Exceptions Surface Early',
            text: 'Validation loops fix routine formatting issues and escalate genuine anomalies to the team.',
          },
        ],
      },
    ],
  },
];

export function getCaseStudyByHandle(handle: string): CaseStudyItem | undefined {
  const normalized = handle.toLowerCase();
  
  // Direct match or ID match
  const direct = CASE_STUDIES.find((cs) => cs.handle === normalized || cs.id === normalized);
  if (direct) return direct;

  // Legacy aliases for backward compatibility
  if (normalized === 'triangl') return CASE_STUDIES[0];
  if (normalized === 'chimi-eyewear') return CASE_STUDIES[1];
  if (normalized === 'castore') return CASE_STUDIES[2];

  return undefined;
}
