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
  stats?: Array<{ value: string; label: string }>;
  chapters?: Array<{
    number: string;
    title: string;
    subheading: string;
    points: Array<{ title: string; text: string }>;
  }>;
}

export const CASE_STUDIES: CaseStudyItem[] = [
  {
    id: 'cs-collabix',
    handle: 'collabix',
    title: 'Collabix SaaS Platform',
    subtitle: 'Enterprise SaaS Architecture, Real-Time Data Pipeline & Cloud Engineering',
    category: 'SaaS & Custom Software',
    tags: ['all', 'saas & custom software', 'saas', 'software', 'cloud', 'architecture'],
    result: { value: '+340% Processing Speed & 99.99% Uptime' },
    services: { value: 'Full-Stack Web Architecture / Distributed Cloud Infrastructure / Real-Time Data' },
    metrics: [
      { label: 'Processing Velocity', value: '+340%' },
      { label: 'System Uptime', value: '99.99%' },
      { label: 'Concurrent Users', value: '100k+' },
    ],
    image: {
      url: 'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/custom_software_case_study.png?v=1790400442',
      altText: 'Collabix custom software and SaaS platform architecture',
      width: 1920,
      height: 1080,
    },
    intro: 'How Byte Operator architected and deployed Collabix, an enterprise-grade collaborative SaaS engine engineered for high-throughput teams, real-time collaboration, and bulletproof cloud scalability.',
    details: [
      { label: 'Client', value: 'Collabix Inc.' },
      { label: 'Industry', value: 'Enterprise SaaS & Cloud Software' },
      { label: 'Platform', value: 'Next.js, Node.js, GraphQL & Distributed Microservices' },
      { label: 'Services', value: 'Custom SaaS Engineering, Real-Time WebSockets, Cloud Infrastructure' },
    ],
    stats: [
      { value: '+340%', label: 'Throughput Increase' },
      { value: '99.99%', label: 'Guaranteed Cloud Uptime' },
      { value: '<40ms', label: 'Real-Time Sync Latency' },
    ],
    chapters: [
      {
        number: '01',
        title: 'The Challenge',
        subheading: 'Scaling real-time collaborative state across hundreds of thousands of active users without latency spikes',
        points: [
          {
            title: 'Distributed State Synchronization',
            text: 'Teams required instantaneous multi-user document updates, task state changes, and workspace sync without conflict errors.',
          },
          {
            title: 'Legacy Performance Bottlenecks',
            text: 'Monolithic data structures caused memory spikes and slow response times during peak business hours.',
          },
        ],
      },
      {
        number: '02',
        title: 'The Solution',
        subheading: 'Modern event-driven reactive microservices with edge caching and optimized database partitioning',
        points: [
          {
            title: 'Event-Driven Pipeline',
            text: 'Engineered an asynchronous queue system processing over 10 million daily event messages with sub-40ms propagation.',
          },
          {
            title: 'Tailored UI / UX System',
            text: 'Built an ultra-fast, keyboard-first web interface designed for focused productivity and deep workflows.',
          },
        ],
      },
      {
        number: '03',
        title: 'The Results',
        subheading: 'Unmatched performance benchmarks and frictionless user growth across enterprise clients',
        points: [
          {
            title: '340% Performance Uplift',
            text: 'Workspaces load in under 300ms globally, resulting in a 4.9/5 user satisfaction rating.',
          },
          {
            title: 'Enterprise Reliability',
            text: 'Maintained 99.99% system availability during heavy peak load cycles.',
          },
        ],
      },
    ],
  },

  {
    id: 'cs-replex',
    handle: 'replex-engine',
    title: 'Replex AI Lead Engine',
    subtitle: 'Autonomous AI Communication, Lead Qualification & Zero-Miss Reply Platform',
    category: 'AI & Automation',
    tags: ['all', 'ai & automation', 'ai', 'automation', 'lead-capture', 'replex'],
    result: { value: '0 Missed Inquiries & <15s First Response' },
    services: { value: 'Autonomous AI Reply Agent / Multi-Channel Inbound Router / Automated Pipeline' },
    metrics: [
      { label: 'Missed Leads', value: '0' },
      { label: 'First Response Time', value: '<15s' },
      { label: 'Lead Qualification', value: '+64%' },
    ],
    image: {
      url: 'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/replex.png?v=1790409470',
      altText: 'Replex Engine AI communication and lead reply automation',
      width: 1920,
      height: 1080,
    },
    intro: 'How Byte Operator designed and developed Replex Engine, an autonomous AI lead response and qualification system that ensures sales teams never miss an inbound opportunity by responding instantly 24/7.',
    details: [
      { label: 'Client', value: 'Replex Platform' },
      { label: 'Industry', value: 'AI Sales Automation & CRM' },
      { label: 'Platform', value: 'Autonomous LLM Agents, Multi-Channel Webhooks & REST APIs' },
      { label: 'Services', value: 'Conversational AI, Lead Ingestion Pipeline, Custom Dashboard' },
    ],
    stats: [
      { value: '100%', label: 'Inbound Lead Coverage' },
      { value: '<15s', label: 'Average Response Time' },
      { value: '+64%', label: 'Qualified Sales Opportunities' },
    ],
    chapters: [
      {
        number: '01',
        title: 'The Challenge',
        subheading: 'Eliminating inbound lead decay and slow response cycles that cost businesses thousands in lost pipeline',
        points: [
          {
            title: 'The Speed-to-Lead Problem',
            text: 'Studies show conversion rates plummet by 80% if leads are not answered within the first 5 minutes.',
          },
          {
            title: 'Fragmented Channels',
            text: 'Inbound requests arriving across email, website chat, SMS, and marketplaces created administrative chaos.',
          },
        ],
      },
      {
        number: '02',
        title: 'The Solution',
        subheading: 'Context-aware autonomous agent trained on brand knowledge bases with instant reply orchestration',
        points: [
          {
            title: 'Instant Autonomous Replies',
            text: 'Replex evaluates inbound context, qualifies buyer intent, answers product questions, and schedules meetings instantly.',
          },
          {
            title: 'Unified Lead Dashboard',
            text: 'Live telemetry tracking every conversation stage, sentiment score, and booked appointment.',
          },
        ],
      },
      {
        number: '03',
        title: 'The Results',
        subheading: 'Total transformation of lead conversion metrics and complete elimination of missed inquiries',
        points: [
          {
            title: 'Zero Missed Opportunities',
            text: '100% of all incoming leads receive human-quality responses within 15 seconds around the clock.',
          },
          {
            title: '64% Pipeline Growth',
            text: 'Clients reported a 64% increase in sales pipeline velocity within the first 60 days of deployment.',
          },
        ],
      },
    ],
  },

  {
    id: 'cs-aydi',
    handle: 'aydi-active',
    title: 'Aydi Active Ecommerce',
    subtitle: 'High-Velocity Activewear Storefront, Custom Theme Architecture & Mobile UX',
    category: 'Ecommerce & Storefronts',
    tags: ['all', 'ecommerce & storefronts', 'fashion', 'storefront', 'cro', 'development'],
    result: { value: '+68% Mobile Conversion & 0.7s Load Speed' },
    services: { value: 'Custom Storefront Engineering / High-Velocity Checkout / Mobile UX' },
    metrics: [
      { label: 'Mobile Conversion', value: '+68%' },
      { label: 'Page Load Speed', value: '0.7s' },
      { label: 'Average Order Value', value: '+24%' },
    ],
    image: {
      url: 'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/manage_products_of_aydi.png?v=1790403225',
      altText: 'Aydi Active high-performance ecommerce storefront and catalog management',
      width: 1920,
      height: 1080,
    },
    intro: 'How Byte Operator developed a custom, high-velocity digital storefront for Aydi Active, delivering seamless product discovery, instant variant switching, and industry-leading mobile conversion rates.',
    details: [
      { label: 'Client', value: 'Aydi Active' },
      { label: 'Industry', value: 'Athletic Wear & Active Lifestyle' },
      { label: 'Platform', value: 'Shopify Plus & Custom Modular Theme' },
      { label: 'Services', value: 'Custom Theme Engineering, Mobile CRO, Performance Tuning' },
    ],
    stats: [
      { value: '+68%', label: 'Mobile Conversion Uplift' },
      { value: '0.7s', label: 'First Contentful Paint' },
      { value: '+24%', label: 'Average Order Value' },
    ],
    chapters: [
      {
        number: '01',
        title: 'The Challenge',
        subheading: 'High mobile bounce rates and sluggish catalog filtering on the previous off-the-shelf theme',
        points: [
          {
            title: 'Mobile Friction',
            text: 'Over 82% of shoppers arrived on mobile devices but faced cumbersome product swatch selection and slow page loads.',
          },
          {
            title: 'Brand Elevation',
            text: 'The brand needed an editorial, premium design aesthetic that reflected their high-performance athletic apparel.',
          },
        ],
      },
      {
        number: '02',
        title: 'The Solution',
        subheading: 'Lightweight modular architecture with instant sticky cart, rich swatch previews, and sub-second navigation',
        points: [
          {
            title: 'Custom Modular Components',
            text: 'Built responsive product detail modules with fluid video integration, size recommendation calculators, and quick-buy drawers.',
          },
          {
            title: 'Speed Optimization',
            text: 'Eliminated bloated third-party scripts and implemented asset preloading for instantaneous page transitions.',
          },
        ],
      },
      {
        number: '03',
        title: 'The Results',
        subheading: 'Immediate surge in direct-to-consumer sales and sustained return customer loyalty',
        points: [
          {
            title: '68% Conversion Boost',
            text: 'Mobile purchase completion rates surged 68% in the first quarter post-launch.',
          },
          {
            title: 'Sub-Second Speed',
            text: 'Achieved an average 0.7s load time across worldwide mobile networks.',
          },
        ],
      },
    ],
  },

  {
    id: 'cs-toys',
    handle: 'kids-wonderland',
    title: 'Kids Wonderland Toy Store',
    subtitle: 'Interactive Gamified Retail Storefront & Custom Catalog Discovery Engine',
    category: 'Ecommerce & Storefronts',
    tags: ['all', 'ecommerce & storefronts', 'retail', 'design', 'development'],
    result: { value: '+120% Engagement & +45% Average Basket Value' },
    services: { value: 'Modular Storefront Architecture / Gamified Product Filtering / Custom Cart Drawer' },
    metrics: [
      { label: 'Session Duration', value: '+120%' },
      { label: 'Average Order Value', value: '+45%' },
      { label: 'Cart Abandonment', value: '-35%' },
    ],
    image: {
      url: 'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/toys.webp?v=1790407473',
      altText: 'Kids Wonderland interactive toy store development',
      width: 1920,
      height: 1080,
    },
    intro: 'Transforming an online toy and game destination into an engaging digital wonderland that makes shopping effortless for parents and exciting for kids, driving substantial gains in session duration and average basket value.',
    details: [
      { label: 'Client', value: 'Kids Wonderland' },
      { label: 'Industry', value: 'Toys, Games & Children Retail' },
      { label: 'Platform', value: 'Shopify Custom Architecture' },
      { label: 'Services', value: 'Interactive UI / UX, Age & Interest Filtering, Upsell Engine' },
    ],
    stats: [
      { value: '+120%', label: 'Session Time Increase' },
      { value: '+45%', label: 'Average Order Value' },
      { value: '-35%', label: 'Cart Abandonment Drop' },
    ],
    chapters: [
      {
        number: '01',
        title: 'The Challenge',
        subheading: 'Navigating extensive SKU catalogs with over 5,000 products without confusing gift buyers',
        points: [
          {
            title: 'Complex Categorization',
            text: 'Shoppers needed to quickly find toys by age group, educational stage, interest, and price range.',
          },
          {
            title: 'Checkout Abandonment',
            text: 'Cluttered cart pages caused high drop-offs during holiday peak shopping seasons.',
          },
        ],
      },
      {
        number: '02',
        title: 'The Solution',
        subheading: 'Playful visual filtering, personalized gift finder quizzes, and dynamic bundle builders',
        points: [
          {
            title: 'Interactive Gift Finder',
            text: 'Engineered a 3-step interactive gift quiz that matches recipient age and hobbies to top-rated toy bundles.',
          },
          {
            title: 'Smart Cart Drawer',
            text: 'Equipped the cart drawer with free shipping progress bars, gift wrapping toggles, and relevant add-ons.',
          },
        ],
      },
      {
        number: '03',
        title: 'The Results',
        subheading: 'Record-setting holiday revenue and massive growth in multi-item cart purchases',
        points: [
          {
            title: '45% Higher AOV',
            text: 'Dynamic bundle suggestions increased average units per transaction from 1.6 to 2.8.',
          },
          {
            title: 'Seamless Scalability',
            text: 'Handled over 50,000 simultaneous holiday shoppers with zero downtime or performance degradation.',
          },
        ],
      },
    ],
  },

  {
    id: 'cs-furniture',
    handle: 'nordic-haven',
    title: 'Nordic Haven Furniture Flagship',
    subtitle: 'Luxury Scandinavian Interior Storefront & B2B Wholesale Commerce Engine',
    category: 'Shopify Plus & Migrations',
    tags: ['all', 'shopify plus & migrations', 'furniture', 'enterprise', 'shopify-plus'],
    result: { value: '+92% High-Ticket Sales & B2B Wholesale Portal' },
    services: { value: 'Shopify Plus Enterprise Architecture / Room Staging Visualizer / Custom B2B Checkout' },
    metrics: [
      { label: 'High-Ticket Conversion', value: '+92%' },
      { label: 'Average Basket Value', value: '$1,850' },
      { label: 'B2B Wholesale Onboarding', value: '100% Automated' },
    ],
    image: {
      url: 'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/furniture.webp?v=1790407636',
      altText: 'Nordic Haven luxury furniture digital storefront',
      width: 1920,
      height: 1080,
    },
    intro: 'How Byte Operator created a digital flagship for Nordic Haven, combining high-end Scandinavian aesthetic storytelling, interactive 3D room staging, and an automated B2B wholesale ordering portal on Shopify Plus.',
    details: [
      { label: 'Client', value: 'Nordic Haven Living' },
      { label: 'Industry', value: 'Luxury Furniture & Scandinavian Interior Design' },
      { label: 'Platform', value: 'Shopify Plus Enterprise' },
      { label: 'Services', value: 'Enterprise Storefront, B2B Tier Pricing, 3D Product Modeling' },
    ],
    stats: [
      { value: '+92%', label: 'High-Ticket Conversion' },
      { value: '$1.85k', label: 'Average Basket Value' },
      { value: '100%', label: 'Automated B2B Portals' },
    ],
    chapters: [
      {
        number: '01',
        title: 'The Challenge',
        subheading: 'High purchase hesitation online for high-ticket handcrafted furniture items ($2,000+)',
        points: [
          {
            title: 'Visual Trust & Texture',
            text: 'Customers needed confidence in material quality, fabric swatches, and physical dimensions before purchasing.',
          },
          {
            title: 'Manual Wholesale Processing',
            text: 'B2B interior designers and commercial trade clients had to email purchase orders manually.',
          },
        ],
      },
      {
        number: '02',
        title: 'The Solution',
        subheading: 'High-definition 3D room visualizer with dedicated Shopify Plus B2B wholesale pricing tiers',
        points: [
          {
            title: 'Fabric Swatch & Dimension Viewer',
            text: 'Enabled customers to customize wood finishes and fabrics in real time with precise scale indicators.',
          },
          {
            title: 'B2B Trade Portal',
            text: 'Integrated wholesale account approvals, net-30 terms, tiered quantity discounts, and instant tax exemption handling.',
          },
        ],
      },
      {
        number: '03',
        title: 'The Results',
        subheading: 'Remarkable revenue growth across both consumer DTC and high-volume commercial channels',
        points: [
          {
            title: '92% Increase in Large Orders',
            text: 'High-ticket room set purchases grew by 92% in the first six months.',
          },
          {
            title: 'Automated Trade Operations',
            text: 'Trade client orders are processed entirely digitally, saving over 30 operational hours each week.',
          },
        ],
      },
    ],
  },

  {
    id: 'cs-omniretail',
    handle: 'omniretail-migration',
    title: 'OmniRetail Global Enterprise Migration',
    subtitle: 'Zero-Downtime Magento Replatforming & 100% Organic SEO Preservation',
    category: 'Shopify Plus & Migrations',
    tags: ['all', 'shopify plus & migrations', 'migrations', 'cro', 'seo', 'enterprise'],
    result: { value: '0s Downtime & +54% Organic Search Revenue' },
    services: { value: 'Zero-Downtime Data Replatforming / 301 Redirect Mapping Matrix / High-Converting UI' },
    metrics: [
      { label: 'Launch Downtime', value: '0s' },
      { label: 'SKUs Migrated', value: '500k+' },
      { label: 'Organic Search Revenue', value: '+54%' },
    ],
    image: {
      url: 'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/shopify_cro_and_migration_store.webp?v=1790407473',
      altText: 'Shopify CRO and enterprise platform migration',
      width: 1920,
      height: 1080,
    },
    intro: 'Migrating an international retail enterprise from a legacy on-premise Magento cluster to Shopify Plus with over 500,000 SKUs, zero downtime, and complete preservation of top Google keyword rankings.',
    details: [
      { label: 'Client', value: 'OmniRetail Global' },
      { label: 'Industry', value: 'Multi-Brand Omnichannel Retail' },
      { label: 'Platform', value: 'Magento to Shopify Plus Enterprise' },
      { label: 'Services', value: 'Data Pipeline, 301 SEO Mapping, Custom ERP Connector' },
    ],
    stats: [
      { value: '0s', label: 'Migration Downtime' },
      { value: '500k+', label: 'Products & Customers Migrated' },
      { value: '+54%', label: 'Year-1 Organic Revenue' },
    ],
    chapters: [
      {
        number: '01',
        title: 'The Challenge',
        subheading: 'Transitioning complex enterprise data, ERP connections, and millions of organic search rankings safely',
        points: [
          {
            title: 'High-Risk Data Complexity',
            text: 'Over 500,000 product variants, 10 years of historical customer records, and complex multi-warehouse inventory.',
          },
          {
            title: 'SEO Vulnerability',
            text: 'Legacy URLs ranked on page 1 for thousands of competitive search terms that could not afford any ranking drop.',
          },
        ],
      },
      {
        number: '02',
        title: 'The Solution',
        subheading: 'Automated data transformation scripts, airtight 301 redirect architecture, and real-time ERP sync',
        points: [
          {
            title: 'Precision Data ETL',
            text: 'Engineered custom validation scripts that cleaned, mapped, and imported product data with 100% integrity.',
          },
          {
            title: 'Airtight SEO Matrix',
            text: 'Mapped 100% of legacy URLs to clean canonical structures and enriched JSON-LD structured schema.',
          },
        ],
      },
      {
        number: '03',
        title: 'The Results',
        subheading: 'Zero downtime launch with immediate speed gains and an acceleration in organic revenue',
        points: [
          {
            title: 'Flawless Cutover',
            text: 'The entire replatforming completed seamlessly with zero downtime and uninterrupted order processing.',
          },
          {
            title: '54% Organic Revenue Growth',
            text: 'Faster server response times and cleaner mobile layouts drove a 54% lift in organic search revenue within year one.',
          },
        ],
      },
    ],
  },

  {
    id: 'cs-speedify',
    handle: 'speedify-ai',
    title: 'Speedify AI Performance App',
    subtitle: 'Proprietary Core Web Vitals Optimization App & Edge Asset Compression',
    category: 'Apps & Tools',
    tags: ['all', 'apps & tools', 'apps', 'speed', 'ai', 'development'],
    result: { value: '98/100 Mobile PageSpeed Score' },
    services: { value: 'AI Asset Compression / Script Offloading / Speed Telemetry' },
    metrics: [
      { label: 'Mobile Lighthouse', value: '98/100' },
      { label: 'LCP Duration', value: '0.6s' },
      { label: 'Bounce Rate Reduction', value: '-42%' },
    ],
    image: {
      url: 'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/speedify_landing.webp?v=1790408507',
      altText: 'Speedify AI page speed optimizer app dashboard',
      width: 1920,
      height: 1080,
    },
    intro: 'How Byte Operator engineered Speedify AI, a proprietary performance optimization app that automates critical CSS generation, asset compression, and JavaScript script deferral for ecommerce storefronts.',
    details: [
      { label: 'Product', value: 'Speedify AI' },
      { label: 'Industry', value: 'Web Performance & Developer Tooling' },
      { label: 'Platform', value: 'Shopify App Bridge, Cloudflare Workers & Rust Engine' },
      { label: 'Services', value: 'App Development, Core Web Vitals Engineering, Telemetry UI' },
    ],
    stats: [
      { value: '98/100', label: 'Average Mobile Score' },
      { value: '0.6s', label: 'Largest Contentful Paint' },
      { value: '-42%', label: 'Mobile Bounce Rate' },
    ],
    chapters: [
      {
        number: '01',
        title: 'The Challenge',
        subheading: 'Third-party tracking scripts and heavy assets slowing down mobile storefront load times',
        points: [
          {
            title: 'Core Web Vitals Penalties',
            text: 'Google algorithms penalize slow sites in search rankings and paid ad quality scores.',
          },
          {
            title: 'Technical Complexity',
            text: 'Manual speed optimization requires ongoing developer effort whenever new apps or marketing pixels are added.',
          },
        ],
      },
      {
        number: '02',
        title: 'The Solution',
        subheading: 'Automated AI engine that dynamically analyzes page trees and defers non-critical execution',
        points: [
          {
            title: 'Critical CSS & Asset Offloading',
            text: 'Generates atomic critical stylesheets on the fly and converts all images to modern AVIF/WebP formats.',
          },
          {
            title: 'Live Telemetry Dashboard',
            text: 'Empowers store owners to monitor real-user speed metrics and Core Web Vitals pass rates in real time.',
          },
        ],
      },
      {
        number: '03',
        title: 'The Results',
        subheading: 'Instant speed jumps for hundreds of active stores, driving measurable conversion uplifts',
        points: [
          {
            title: '98/100 Mobile Scores',
            text: 'Stores using Speedify AI consistently score in the green tier on Google PageSpeed Insights.',
          },
          {
            title: 'Conversion Acceleration',
            text: 'Faster render times reduced bounce rates by 42% and lifted average checkout completion by 18%.',
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
    result: { value: '94% Reduction in Operational Hours' },
    services: { value: 'n8n Pipeline Architecture / Multi-Agent LLM Orchestration / ERP Webhook Sync' },
    metrics: [
      { label: 'Manual Hours Saved', value: '94%' },
      { label: 'Automated Operations', value: '24/7' },
      { label: 'Daily Events Processed', value: '50k+' },
    ],
    image: {
      url: 'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/second_autmation_imaeg.webp?v=1790409459',
      altText: 'Autonomous multi-agent task execution and AI workflow swarms',
      width: 1920,
      height: 1080,
    },
    intro: 'How Byte Operator designed and implemented autonomous multi-agent AI swarms and visual n8n workflow pipelines, connecting CRM, ERP, inventory, and customer messaging into self-driving operational systems.',
    details: [
      { label: 'Client', value: 'Enterprise Operations Client' },
      { label: 'Industry', value: 'Supply Chain & Ecommerce Logistics' },
      { label: 'Platform', value: 'n8n, Multi-Agent LLMs, Custom Webhooks' },
      { label: 'Services', value: 'Workflow Engineering, Agent Swarms, API Integration' },
    ],
    stats: [
      { value: '94%', label: 'Manual Hours Saved' },
      { value: '24/7', label: 'Continuous Execution' },
      { value: '50k+', label: 'Daily Actions Automated' },
    ],
    chapters: [
      {
        number: '01',
        title: 'The Challenge',
        subheading: 'Siloed data across ERPs, spreadsheets, and support desks requiring massive manual overhead',
        points: [
          {
            title: 'Operational Bottlenecks',
            text: 'Teams spent hundreds of hours weekly re-keying customer order data and resolving sync errors between warehouses.',
          },
          {
            title: 'Slow Exception Handling',
            text: 'Inventory discrepancies and order fulfillment delays required human intervention that stalled shipping.',
          },
        ],
      },
      {
        number: '02',
        title: 'The Solution',
        subheading: 'Multi-agent AI swarms working synchronously through visual n8n execution pipelines',
        points: [
          {
            title: 'Agent Task Distribution',
            text: 'Specialized autonomous AI agents monitor webhook queues, parse complex supplier invoices, and update inventory counts.',
          },
          {
            title: 'Self-Healing Fallbacks',
            text: 'Built automated validation loops that correct formatting errors and alert engineers only when anomalies occur.',
          },
        ],
      },
      {
        number: '03',
        title: 'The Results',
        subheading: 'Dramatic operational efficiency gains and zero human error in everyday fulfillment flows',
        points: [
          {
            title: '94% Time Reclaimed',
            text: 'Operational teams transitioned from manual data entry to strategic growth initiatives.',
          },
          {
            title: 'Flawless Accuracy',
            text: 'Order processing accuracy improved to 99.98% across 50,000+ daily transactions.',
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
