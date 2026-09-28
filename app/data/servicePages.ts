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
  showClientProof: false,
} as const satisfies ServiceHeroProps;

export interface ServicePageConfig {
  hero: ServiceHeroProps;
  heroOnly?: boolean;
  showPartners?: boolean;
  about?: ServiceAboutSectionData;
  platforms?: MigrationPlatformsData;
  features?: readonly HomeFeatureData[];
  faqTitle?: string;
  faqs?: readonly {question: string; answer: string}[];
  plusAgencyCta?: ServicePlusAgencyCtaData;
  experts?: HomeExpertsProps;
  /**
   * The shared client testimonial block. Defaults to shown; pages without a
   * verified testimonial set this to false.
   */
  showTestimonial?: boolean;
}

export const SERVICE_PAGE_CONFIGS = {
  [SHOPIFY_SEO_PAGE_HANDLE]: {
    faqTitle: 'Technical SEO & Architecture',
    hero: {
      eyebrow: 'Technical SEO & Search Architecture',
      heading: 'Enterprise Technical SEO, Indexation Architecture & Organic Growth',
      chips: [
        {
          label: 'Crawl Budget & Indexing',
          href: SERVICE_PAGE_ROUTES.ecommerceSeo,
        },
        {
          label: 'Structured JSON-LD Schema',
          href: SERVICE_PAGE_ROUTES.softwareDevelopment,
        },
        {
          label: 'Core Web Vitals & INP',
          href: SERVICE_PAGE_ROUTES.softwareAudits,
        },
        {
          label: 'Faceted Navigation SEO',
          href: SERVICE_PAGE_ROUTES.softwareWebDesign,
        },
        {
          label: 'International Hreflang',
          href: SERVICE_PAGE_ROUTES.internationalisation,
        },
        {
          label: 'SEO Platform Migrations',
          href: SERVICE_PAGE_ROUTES.seoMigrations,
        },
      ],
      description:
        'Byte Operator engineers advanced Technical SEO and enterprise search architectures for high-growth ecommerce brands. From eliminating crawl budget waste and mastering faceted navigation indexation to rich JSON-LD schema deployment and Core Web Vitals optimization, we build technical search foundations that drive sustainable organic revenue.',
      primaryCta: {
        label: 'Request Technical SEO Audit',
        href: SERVICE_PAGE_ROUTES.contact,
      },
    },
    about: {
      intro: {
        heading:
          'Featured SEO Case Study: Deep Technical Architecture, Crawl Optimization & 180% Organic Revenue Lift',
        description:
          'Organic search visibility requires deep technical alignment between server response headers, crawl efficiency, structured entity data, and sub-second rendering speeds. Byte Operator eliminates technical bottlenecks across complex multi-thousand SKU catalogs to unlock massive Google ranking gains.',
        cta: {
          label: 'View Technical SEO Case Studies',
          href: SERVICE_PAGE_ROUTES.work,
        },
      },
      media: {
        primary:
          'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/third_party_api_endpoints.png?v=1790403408',
        primaryWidth: 1920,
        primaryHeight: 1080,
        primaryAlt:
          'Technical SEO schema endpoints and search indexation architecture case study',
        secondary: '',
        secondaryWidth: 0,
        secondaryHeight: 0,
        secondaryAlt: '',
      },
      process: {
        heading: 'Our 6-Stage Enterprise Technical SEO Methodology',
        leftDescription:
          '01: Full-Site Crawl & Log File Analysis\nWe analyze server access logs and crawl depth to discover orphan pages, index bloat, redirect loops, and crawl budget bottlenecks.\n\n02: Faceted Navigation & Canonical Governance\nWe engineer strict canonicalization rules and dynamic noindex parameters for complex filter variants without duplicate content dilution.\n\n03: Rich JSON-LD Entity Schema Deployment\nWe build comprehensive product, offer, aggregate rating, organization, and merchant return schemas for automated Google rich snippets.',
        rightDescription:
          '04: Core Web Vitals & Page Speed Engineering\nWe optimize Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and Cumulative Layout Shift (CLS) for peak mobile ranking.\n\n05: International Hreflang & Multi-Region Setup\nWe configure multi-language hreflang XML sitemaps and regional canonical paths to eliminate global cannibalization.\n\n06: Continuous Rank Tracking & Algorithmic Monitoring\nWe monitor Google Search Console API trends, keyword position shifts, and index health with automated regression detection.',
        cta: {
          label: 'Start Technical SEO Review',
          href: SERVICE_PAGE_ROUTES.contact,
        },
      },
    },
    features: [
      {
        id: 'technical-seo-crawl-budget',
        layout: 'media-left',
        spacing: 'first',
        theme: 'dark',
        eyebrow: 'Crawl Budget & Server Efficiency',
        heading: 'Eliminate Crawl Waste & Maximize Search Engine Efficiency',
        description: [
          'Search engine crawlers allocate finite resources when indexing large ecommerce storefronts. Wasteful parameter URLs, redirect chains, and 404 loops dilute organic authority.',
          'We analyze server log files to uncover how Googlebot crawls your store, restructuring robots.txt, XML sitemaps, and server response codes to ensure high-priority commercial collections are indexed daily.',
          'Stores see immediate increases in crawl frequency and rapid indexation for newly launched seasonal catalogs.',
        ],
        buttons: [
          {label: 'Audit Crawl Efficiency', href: SERVICE_PAGE_ROUTES.contact},
        ],
        media: {
          primary:
            'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/third.webp?v=1790408507',
          primaryWidth: 1920,
          primaryHeight: 1080,
          primaryAlt: 'Crawl budget optimization and diagnostic log monitoring',
          secondary: '',
          secondaryWidth: 0,
          secondaryHeight: 0,
          secondaryAlt: '',
          captionTitle: 'Crawl Budget & Server Efficiency',
          captionText: 'Log file diagnostics, crawl bloat reduction, and high-frequency Googlebot indexation',
          href: SERVICE_PAGE_ROUTES.work,
        },
      },
      {
        id: 'technical-seo-faceted-navigation',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Catalog Taxonomy & Indexation',
        heading: 'Faceted Navigation SEO for Massive SKU Catalogs',
        description: [
          'Multi-attribute product filters often generate millions of duplicate URLs that harm search equity if misconfigured.',
          'We engineer advanced canonical logic and selective indexation rules that transform high-intent filter combinations into revenue-generating landing pages while preventing crawl traps.',
          'Our optimized category hierarchies improve internal page authority distribution across deep catalog categories.',
        ],
        buttons: [
          {label: 'Optimize Faceted Search', href: SERVICE_PAGE_ROUTES.contact},
        ],
        media: {
          primary:
            'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/toys.webp?v=1790407473',
          primaryWidth: 1920,
          primaryHeight: 1080,
          primaryAlt: 'Faceted navigation SEO and category taxonomy optimization',
          secondary: '',
          secondaryWidth: 0,
          secondaryHeight: 0,
          secondaryAlt: '',
          captionTitle: 'Faceted Navigation Architecture',
          captionText: 'Clean canonical logic, dynamic noindex rules, and high-ranking filter page indexation',
          href: SERVICE_PAGE_ROUTES.work,
        },
      },
      {
        id: 'technical-seo-schema-structured-data',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'Semantic Markup & Rich Results',
        heading: 'Advanced JSON-LD Schema & Google Merchant Listings',
        description: [
          'Standard theme markup is often incomplete, missing essential variant identifiers, merchant return policies, and stock availability signals.',
          'We deploy advanced JSON-LD structured schemas covering Product, Offer, AggregateRating, BreadcrumbList, Organization, and ItemList entities.',
          'Your listings stand out with star ratings, pricing badges, delivery estimates, and in-stock badges directly in Google organic search results.',
        ],
        buttons: [
          {label: 'Deploy Rich Schema Markup', href: SERVICE_PAGE_ROUTES.contact},
        ],
        media: {
          primary:
            'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/create_product.png?v=1790403314',
          primaryWidth: 1920,
          primaryHeight: 1080,
          primaryAlt: 'Structured JSON-LD schema and product entity markup',
          secondary: '',
          secondaryWidth: 0,
          secondaryHeight: 0,
          secondaryAlt: '',
          captionTitle: 'Rich JSON-LD Schema Markup',
          captionText: 'Automated product attributes, aggregate review stars, and enhanced Google rich snippets',
          href: SERVICE_PAGE_ROUTES.work,
        },
      },
      {
        id: 'technical-seo-core-web-vitals',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Page Experience & Mobile Performance',
        heading: 'Core Web Vitals Optimization for Maximum Google Rank',
        description: [
          'Google prioritizes lightning-fast mobile experiences in search rankings. We eliminate slow Largest Contentful Paint (LCP) and unstable Cumulative Layout Shifts (CLS).',
          'We optimize Interaction to Next Paint (INP) by deferring non-essential third-party scripts and unblocking the main browser thread.',
          'Passing Core Web Vitals across all product templates improves Google rank distribution and lowers bounce rates across mobile visitors.',
        ],
        buttons: [
          {label: 'Explore Speed Audits', href: SERVICE_PAGE_ROUTES.softwareAudits},
        ],
        media: {
          primary:
            'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/speedify_landing.webp?v=1790408507',
          primaryWidth: 1920,
          primaryHeight: 1080,
          primaryAlt: 'Core Web Vitals optimization and mobile speed acceleration',
          secondary: '',
          secondaryWidth: 0,
          secondaryHeight: 0,
          secondaryAlt: '',
          captionTitle: 'Core Web Vitals & Search Ranking',
          captionText: 'Sub-second mobile rendering, unblocked main threads, and Google page experience boost',
          href: SERVICE_PAGE_ROUTES.work,
        },
      },
      {
        id: 'technical-seo-international-hreflang',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'International Technical SEO',
        heading: 'Multi-Region Hreflang Infrastructure & Global Search',
        description: [
          'Selling internationally requires error-free regional search targeting to avoid internal cannibalization between regional storefronts.',
          'We architect automated hreflang XML sitemaps, country-specific canonical paths, and localized URL structures across global markets.',
          'International customers are directed seamlessly to their localized currency and language pages in Google search.',
        ],
        buttons: [
          {label: 'Scale International SEO', href: SERVICE_PAGE_ROUTES.internationalisation},
        ],
        media: {
          primary:
            'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/shopify_cro_and_migration_store.webp?v=1790407473',
          primaryWidth: 1920,
          primaryHeight: 1080,
          primaryAlt: 'International hreflang technical architecture and multi-region search',
          secondary: '',
          secondaryWidth: 0,
          secondaryHeight: 0,
          secondaryAlt: '',
          captionTitle: 'Multi-Region Hreflang Architecture',
          captionText: 'Automated regional sitemaps, language-specific canonical tags, and zero global cannibalization',
          href: SERVICE_PAGE_ROUTES.work,
        },
      },
    ],
    faqs: [
      {
        question: 'How do you identify crawl budget waste and index bloat on large ecommerce stores?',
        answer:
          'We analyze raw web server log files using Python and specialized log analyzers to track exact Googlebot crawl behaviors. We identify duplicate parameterized URLs, infinite filter loops, broken internal links, and low-value thin pages, restructuring your robots.txt and canonical tags to focus crawler resources purely on high-converting product and category URLs.',
      },
      {
        question: 'How does structured JSON-LD schema help ecommerce click-through rates?',
        answer:
          'Comprehensive JSON-LD schema feeds Google with explicit data about product pricing, live stock availability, customer review ratings, and shipping policies. This qualifies your listings for Google Rich Results, displaying eye-catching gold star ratings and pricing badges directly in search snippets, which typically boosts organic click-through rates by 20% to 35%.',
      },
      {
        question: 'How do you handle SEO for faceted navigation without creating duplicate content?',
        answer:
          'We implement a dynamic canonical and parameter governance framework. Multi-select filters and non-commercial combinations are served with canonical tags pointing back to the parent collection, while high-demand search combinations (e.g. "men leather boots") are indexed with dedicated, search-optimized URLs.',
      },
      {
        question: 'Do Core Web Vitals scores directly impact Google search rankings?',
        answer:
          'Yes. Google includes Core Web Vitals (LCP, INP, CLS) as official page experience ranking signals. Stores that pass Core Web Vitals on mobile devices benefit from improved ranking distribution over slower competitors and maintain lower paid ad bounce rates.',
      },
      {
        question: 'How do you protect organic traffic during large catalog updates or site rebuilds?',
        answer:
          'We execute a comprehensive pre-launch audit that maps every historical URL 1:1 with permanent 301 redirects, migrates meta schemas and internal linking structures, and conducts real-time Search Console indexation monitoring immediately following launch.',
      },
    ],
    experts: {
      eyebrow: 'Technical SEO & Search Architecture',
      heading: 'Ready to Dominate Organic Search with Enterprise Technical SEO?',
      description:
        'Byte Operator engineers advanced Technical SEO architectures that unlock sustained organic search growth. Partner directly with senior technical search architects to audit and scale your store.',
      ctaLabel: 'Schedule Technical SEO Consultation',
      ctaTo: SERVICE_PAGE_ROUTES.contact,
      testimonials: [],
    },
    showPartners: false,
  },
  'software-developers': {
    faqTitle: 'Custom Software Development Services',
    hero: {
      eyebrow: 'Custom Software & SaaS Product Engineering',
      heading: 'Engineering Scalable Platforms & High-Performance SaaS',
      description:
        'Byte Operator engineers custom web platforms, multi-tenant SaaS products, and mission-critical enterprise systems. From complex workflow automation and real-time collaboration engines to high-throughput cloud architectures, we design and deliver resilient software built for long-term scalability and business impact.',
      chips: [
        'SaaS Platform Architecture',
        'Project & Workload Management',
        'Real-Time Data Engines',
        'Enterprise RBAC & Security',
        'Automated Time Tracking',
        'API & Middleware Pipelines',
      ],
      primaryCta: {
        label: 'Discuss Your Software Project',
        href: SERVICE_PAGE_ROUTES.contact,
      },
      showPartnerLogos: false,
      showClientProof: false,
    },
    about: {
      intro: {
        heading:
          'Featured Product Case Study: Collabix: Engineering an All-in-One Operations & Workload Platform',
        description:
          'Collabix is a full-scale enterprise operations platform engineered from scratch by Byte Operator. Built to replace fragmented toolsets, Collabix unifies task execution, live capacity planning, team collaboration, milestone tracking, and synchronized time tracking into a unified, high-speed workspace powered by real-time reactive architecture.',
        cta: {
          label: 'Explore Collabix Case Study',
          href: SERVICE_PAGE_ROUTES.work,
        },
      },
      media: {
        primary:
          'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/custom_software_case_study.png?v=1790400442',
        primaryWidth: 1920,
        primaryHeight: 1080,
        primaryAlt:
          'Collabix enterprise operations and workload platform overview',
        secondary: '',
        secondaryWidth: 0,
        secondaryHeight: 0,
        secondaryAlt: '',
      },
      process: {
        heading: 'How We Engineered Collabix: Product Lifecycle & Architecture',
        leftDescription:
          '01: Systems Discovery & Requirements Modeling\nWe analyzed organizational bottlenecks across cross-functional teams, mapping end-to-end user journeys, workload models, permission structures, and synchronization requirements.\n\n02: High-Concurrency Architecture & UX Design\nWe architected a type-safe modular architecture, designed low-latency database schemas, and created an intuitive, distraction-free interface engineered for heavy daily operations.\n\n03: Full-Stack Platform Engineering\nEngineered with modern reactive frontends, stateless backend services, event-driven WebSocket pipelines, and automated real-time state synchronization across active users.',
        rightDescription:
          '04: Security, RBAC & Rigorous Quality Assurance\nImplemented enterprise-grade Role-Based Access Controls (RBAC), end-to-end data encryption, automated test suites, and load testing under high concurrent traffic.\n\n05: Automated CI/CD & Multi-Cloud Deployment\nContainerized with Docker and deployed through zero-downtime CI/CD deployment pipelines with automated health monitoring and failover redundancy.\n\n06: Continuous Product Evolution & Optimization\nOngoing engineering iterations delivering advanced analytics, automated capacity intelligence, third-party integrations, and performance optimizations.',
        cta: {
          label: 'Discuss Your Software Project',
          href: SERVICE_PAGE_ROUTES.contact,
        },
      },
    },
    features: [
      {
        id: 'collabix-platform-architecture',
        layout: 'media-left',
        spacing: 'first',
        theme: 'dark',
        eyebrow: 'Product Architecture & Modern UX',
        heading: 'Unified Project & Team Management Engine',
        description: [
          'Collabix eliminates fragmented software silos by consolidating projects, sprints, deliverables, and team discussions into one cohesive operating environment. We engineered the platform with an ultra-responsive interface that ensures instantaneous transitions and zero input lag during heavy multi-project navigation.',
          'The system features dynamic project dashboards, interactive timeline roadmaps, and instant communication channels that keep executive leadership, project managers, and individual contributors aligned on milestones in real time.',
          'Built on a robust TypeScript stack with component-driven state architecture, the frontend delivers enterprise-grade responsiveness while maintaining lightweight asset delivery across all desktop and mobile viewports.',
        ],
        buttons: [
          {
            label: 'Discuss Your Product Build',
            href: SERVICE_PAGE_ROUTES.contact,
          },
          {label: 'Explore SaaS & MVP Development', href: '/services/saas-mvp-development'},
        ],
        media: {
          primary:
            'https://cdn.shopify.com/s/files/1/0928/7421/1691/files/8.png?v=1789644057',
          primaryWidth: 1920,
          primaryHeight: 1080,
          primaryAlt: 'Collabix Web Platform Dashboard',
          secondary: '',
          secondaryWidth: 0,
          secondaryHeight: 0,
          secondaryAlt: '',
          captionTitle: 'Interactive Project Launch Dashboard',
          captionText: 'Real-time project tracking, milestone timelines and team collaboration',
          href: SERVICE_PAGE_ROUTES.work,
        },
      },
      {
        id: 'collabix-capacity-utilization',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Resource Intelligence & Planning',
        heading: 'Live Capacity Planning & Workload Heatmaps',
        description: [
          'A cornerstone capability engineered into Collabix is the intelligent workload and capacity engine. It gives managers transparent, real-time visibility into team member utilization, allocated hours, and delivery risk thresholds across concurrent projects.',
          'By computing scheduled deliverables against tracked availability in real time, the platform identifies capacity bottlenecks before deadlines slip, dynamically highlighting overloaded resources and available bandwidth across departments.',
          'The utilization engine handles dynamic recalculation across hundreds of simultaneous users and schedules without server degradation, powered by optimized backend query caching and asynchronous state updates.',
        ],
        buttons: [
          {
            label: 'Explore Custom Platforms',
            href: SERVICE_PAGE_ROUTES.contact,
          },
        ],
        media: {
          primary:
            'https://cdn.shopify.com/s/files/1/0928/7421/1691/files/6.png?v=1789643508',
          primaryWidth: 1920,
          primaryHeight: 1080,
          primaryAlt: 'Collabix Workload and Capacity Dashboard',
          secondary: '',
          secondaryWidth: 0,
          secondaryHeight: 0,
          secondaryAlt: '',
          captionTitle: 'Real-Time Capacity & Utilization Engine',
          captionText: 'Live team capacity heatmaps, risk detection and workload balancing',
          href: SERVICE_PAGE_ROUTES.work,
        },
      },
      {
        id: 'collabix-deliverables-kanban',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'Workflow Execution & Kanban',
        heading: 'Dynamic Milestone & Deliverables Pipeline',
        description: [
          'To support diverse team methodologies, Collabix features fully customizable Kanban boards, sprint trackers, and milestone pipelines that adapt seamlessly to agile, waterfall, or hybrid operational workflows.',
          'Users can manipulate task hierarchies, assign multi-tier dependencies, attach rich documentation, and update delivery statuses with real-time drag-and-drop mechanics backed by optimistic UI updates for zero perceptible latency.',
          'Automated triggers and notification workflows ensure every stakeholder receives immediate updates when task blockers arise or milestone phases are reached, dramatically accelerating time-to-delivery.',
        ],
        buttons: [
          {
            label: 'Start Your Software Build',
            href: SERVICE_PAGE_ROUTES.contact,
          },
        ],
        media: {
          primary:
            'https://cdn.shopify.com/s/files/1/0928/7421/1691/files/8.png?v=1789644057',
          primaryWidth: 1920,
          primaryHeight: 1080,
          primaryAlt: 'Deliverables and Kanban Management',
          secondary: '',
          secondaryWidth: 0,
          secondaryHeight: 0,
          secondaryAlt: '',
          captionTitle: 'Sprint & Kanban Pipeline Management',
          captionText: 'Optimistic UI drag-and-drop workflows with custom status stages',
          href: SERVICE_PAGE_ROUTES.work,
        },
      },
      {
        id: 'collabix-live-time-tracking',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Time Intelligence & Billing Sync',
        heading: 'Synchronized Time Tracking & Analytics',
        description: [
          'Collabix integrates precision time tracking directly into project workflows, enabling team members to log active hours with one-click timers or manual entries mapped automatically to specific deliverables and client accounts.',
          'The system converts raw time data into actionable analytics, generating breakdown charts for project profitability, department efficiency, billable utilization rates, and client invoices without requiring third-party spreadsheets.',
          'By tying tracked time directly to capacity heatmaps and project budgets, Collabix ensures accurate financial forecasting and eliminates discrepancy between tracked labor and client billing.',
        ],
        buttons: [
          {
            label: 'Discuss Your Custom System',
            href: SERVICE_PAGE_ROUTES.contact,
          },
        ],
        media: {
          primary:
            'https://cdn.shopify.com/s/files/1/0928/7421/1691/files/11.png?v=1789646420',
          primaryWidth: 1920,
          primaryHeight: 1080,
          primaryAlt: 'Collabix Synchronized Time Tracking Dashboard',
          secondary: '',
          secondaryWidth: 0,
          secondaryHeight: 0,
          secondaryAlt: '',
          captionTitle: 'Integrated Time & Performance Analytics',
          captionText: 'One-click live timers, budget tracking and automated reporting',
          href: SERVICE_PAGE_ROUTES.work,
        },
      },
      {
        id: 'collabix-cloud-infrastructure',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'Infrastructure, Security & Performance',
        heading: 'Built for High Availability, Security & Multi-Tenant Scale',
        description: [
          'Under the hood, Collabix is engineered for high concurrency and strict corporate governance. We deployed a multi-tenant cloud architecture incorporating PostgreSQL with row-level security, Redis for sub-millisecond in-memory caching, and automated database sharding.',
          'Security is enforced at every layer with Single Sign-On (SSO / SAML), granular Role-Based Access Controls (RBAC), end-to-end data encryption at rest and in transit, and immutable audit logs that comply with global data protection standards.',
          'Backed by containerized microservices and automated CI/CD deployment pipelines on AWS/GCP, the platform scales dynamically with user traffic while staying reliable and performant.',
        ],
        buttons: [
          {
            label: 'Engineer Your Software Platform',
            href: SERVICE_PAGE_ROUTES.contact,
          },
        ],
        media: {
          primary:
            'https://cdn.shopify.com/s/files/1/0928/7421/1691/files/COLLABIX_SECOND.png?v=1789642386',
          primaryWidth: 1920,
          primaryHeight: 1080,
          primaryAlt: 'High-Performance Cloud Architecture',
          secondary: '',
          secondaryWidth: 0,
          secondaryHeight: 0,
          secondaryAlt: '',
          captionTitle: 'Enterprise Cloud Architecture & RBAC',
          captionText: 'PostgreSQL row-level security, Redis caching, SSO and high-availability hosting',
          href: SERVICE_PAGE_ROUTES.work,
        },
      },
    ],
    faqs: [
      {
        question: 'What custom software and platform development services does Byte Operator provide?',
        answer:
          'Byte Operator designs and engineers custom web applications, SaaS products, enterprise business platforms, workflow automation software, custom REST/GraphQL APIs, and legacy software modernization. We lead the entire product engineering lifecycle: from initial architecture and UX design to full-stack development, QA, deployment, and ongoing scaling.',
      },
      {
        question: 'Who owns the intellectual property (IP) and custom source code?',
        answer:
          'You retain 100% ownership of all custom source code, application architecture, database schemas, intellectual property, design assets, and deployment configurations created during the project upon settlement. We provide full repository handover, deployment scripts, and comprehensive architectural documentation.',
      },
      {
        question: 'What technology stack is used to build custom platforms like Collabix?',
        answer:
          'We leverage modern, battle-tested technologies selected specifically for speed, reliability, and long-term maintainability. Our core stack comprises React, Next.js, and TypeScript for responsive frontends; Node.js, Python, or Go for backend microservices; PostgreSQL, Redis, and MongoDB for data layers; and Docker, Kubernetes, AWS, and GCP for cloud infrastructure.',
      },
      {
        question: 'Can you integrate our custom software platform with existing ERP, CRM, and accounting systems?',
        answer:
          'Yes. We build custom API connectors, webhooks, and enterprise middleware to synchronize real-time data across Salesforce, HubSpot, SAP, NetSuite, payment gateways, and proprietary internal databases with automated retry policies and schema validation.',
      },
      {
        question: 'How do you ensure platform security, data privacy, and high scalability?',
        answer:
          'We implement enterprise security standards from the foundation, including Role-Based Access Controls (RBAC), Single Sign-On (SSO / SAML), end-to-end data encryption, and automated vulnerability scanning. Scalability is achieved through stateless backend services, optimized database indexing, Redis caching, and automated cloud scaling.',
      },
    ],
    experts: {
      eyebrow: 'Custom Software & SaaS Engineering',
      heading: 'Ready to Build Your Custom Software Platform?',
      description:
        'Byte Operator partners with ambitious businesses, startups, and enterprise teams to design, engineer, and scale high-impact software products. Talk directly with our senior software engineers to discuss your architecture and roadmap.',
      ctaLabel: 'Discuss Your Software Project',
      ctaTo: SERVICE_PAGE_ROUTES.contact,
      testimonials: [],
    },
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
        eyebrow: 'Custom UI/UX & Product Design',
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
          {label: 'Read the Kids Wonderland Case Study', href: '/work/kids-wonderland'},
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
    faqTitle: 'Mobile App Development',
    hero: {
      eyebrow: 'Mobile Application Development & Engineering',
      heading: 'Engineering High-Performance iOS, Android & Cross-Platform Mobile Apps',
      chips: [
        {
          label: 'iOS (Swift & SwiftUI)',
          href: SERVICE_PAGE_ROUTES.softwareDevelopment,
        },
        {
          label: 'Android (Kotlin & Compose)',
          href: SERVICE_PAGE_ROUTES.softwareDevelopment,
        },
        {
          label: 'React Native & Flutter',
          href: SERVICE_PAGE_ROUTES.softwareDevelopment,
        },
        {
          label: 'Offline-First Data Architecture',
          href: SERVICE_PAGE_ROUTES.softwareIntegrations,
        },
        {
          label: 'Biometric Auth & Security',
          href: SERVICE_PAGE_ROUTES.contact,
        },
        {
          label: 'App Store & Play Store CI/CD',
          href: SERVICE_PAGE_ROUTES.contact,
        },
      ],
      description:
        'Byte Operator designs and engineers custom native and cross-platform mobile applications built for scale. From React Native and Flutter to native Swift and Kotlin, we deliver fluid 120Hz gesture-driven interfaces, offline-first architectures, and enterprise cloud backend integrations.',
      primaryCta: {
        label: 'Discuss Your Mobile Project',
        href: SERVICE_PAGE_ROUTES.contact,
      },
    },
    about: {
      intro: {
        heading:
          'Featured Mobile Case Study: Engineering High-Converting, Intuitive Mobile Experiences',
        description:
          'Byte Operator engineers consumer-grade and enterprise mobile applications built to maximize retention and transactional velocity. Built with modern reactive frameworks, fluid touch interactions, biometric authentication, and synchronized cloud APIs, our mobile platforms drive high daily active engagement.',
        cta: {
          label: 'Explore Mobile Architecture',
          href: SERVICE_PAGE_ROUTES.work,
        },
      },
      media: {
        primary:
          'https://cdn.dribbble.com/userupload/7091669/file/original-722803fa84ca15a8d230517b036a836e.png?resize=2048x1536&vertical=center',
        primaryWidth: 2048,
        primaryHeight: 1536,
        primaryAlt:
          'Byte Operator custom mobile application engineering and UI/UX design showcase',
        secondary: '',
        secondaryWidth: 0,
        secondaryHeight: 0,
        secondaryAlt: '',
      },
      process: {
        heading: 'Our Complete Mobile Application Engineering Lifecycle',
        leftDescription:
          '01: Mobile Strategy & Architecture Modeling\nWe map mobile user flows, screen hierarchies, offline data requirements, and device hardware capabilities before selecting the optimal framework.\n\n02: Touch Ergonomics & Interactive Prototyping\nWe design thumb-friendly navigation patterns, fluid gesture transitions, dark mode palettes, and validate interactive prototypes across physical device form factors.\n\n03: Cross-Platform & Native Client Engineering\nWe build modular, type-safe mobile frontends in React Native, Flutter, Swift, or Kotlin with robust state management and 120Hz animation support.',
        rightDescription:
          '04: Offline-First Caching & Real-Time Sync\nWe deploy local SQLite or WatermelonDB caching with automated background sync queues and WebSocket feeds for seamless offline operation.\n\n05: Automated Fastlane CI/CD & Store Review\nWe configure automated build pipelines, code signing, TestFlight beta distribution, security audits, and App Store / Google Play review approval.\n\n06: Production Telemetry & Continuous Scaling\nContinuous crash reporting (Crashlytics, Sentry), performance telemetry, push notification campaigns, and proactive OS version compatibility updates.',
        cta: {
          label: 'Discuss Your Mobile Project',
          href: SERVICE_PAGE_ROUTES.contact,
        },
      },
    },
    features: [
      {
        id: 'mobile-app-native-cross-platform',
        layout: 'media-left',
        spacing: 'first',
        theme: 'dark',
        eyebrow: 'Cross-Platform & Native Excellence',
        heading: 'React Native, Flutter & Native Mobile Architecture',
        description: [
          'Accelerate time-to-market without compromising native responsiveness. We develop unified mobile applications using React Native and Flutter that compile directly to native machine code.',
          'By sharing up to 90% of business logic across iOS and Android, your team benefits from unified feature releases, lower maintenance overhead, and consistent brand presentation.',
          'Where specific platform capabilities demand it, we write custom native bridges in Swift and Kotlin for direct access to device cameras, Bluetooth LE, and hardware sensors.',
        ],
        buttons: [
          {label: 'Discuss App Architecture', href: SERVICE_PAGE_ROUTES.contact},
          {label: 'Explore Shopify App Development', href: '/services/shopify-app-development'},
        ],
        media: {
          primary:
            'https://cdn.dribbble.com/userupload/7091669/file/original-722803fa84ca15a8d230517b036a836e.png?resize=2048x1536&vertical=center',
          primaryWidth: 2048,
          primaryHeight: 1536,
          primaryAlt: 'React Native, Flutter and Native Mobile Engineering',
          secondary: '',
          secondaryWidth: 0,
          secondaryHeight: 0,
          secondaryAlt: '',
          captionTitle: 'Unified Cross-Platform & Native Builds',
          captionText: 'React Native, Flutter, Swift and Kotlin engineered for 120Hz performance',
          href: SERVICE_PAGE_ROUTES.work,
        },
      },
      {
        id: 'mobile-app-touch-ergonomics',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Mobile Ergonomics & Micro-Interactions',
        heading: 'Thumb-Zone Ergonomics & Intuitive Touch Experiences',
        description: [
          'Mobile conversion hinges on tactile fluidity. Our mobile design system prioritizes natural thumb-zone ergonomics, bottom-sheet navigations, and instant haptic feedback.',
          'We engineer custom gesture recognizers, swipeable carousels, and optimistic UI transitions that mask network latency for a zero-lag experience.',
          'Full compliance with Apple Human Interface Guidelines (HIG) and Google Material Design 3 guarantees an intuitive, platform-native feel.',
        ],
        buttons: [
          {label: 'Explore Mobile UI/UX', href: SERVICE_PAGE_ROUTES.contact},
        ],
        media: {
          primary:
            'https://cdn.dribbble.com/userupload/7091669/file/original-722803fa84ca15a8d230517b036a836e.png?resize=2048x1536&vertical=center',
          primaryWidth: 2048,
          primaryHeight: 1536,
          primaryAlt: 'Thumb-Zone Ergonomics and Fluid Touch UI/UX Design',
          secondary: '',
          secondaryWidth: 0,
          secondaryHeight: 0,
          secondaryAlt: '',
          captionTitle: 'Mobile Ergonomics & Micro-Interactions',
          captionText: 'Thumb-friendly navigation, optimistic UI updates and haptic feedback',
          href: SERVICE_PAGE_ROUTES.work,
        },
      },
      {
        id: 'mobile-app-offline-cloud-sync',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'Resilience & Data Persistence',
        heading: 'Offline-First Architecture & Real-Time Cloud Synchronization',
        description: [
          'Unstable network connections should never disrupt user workflows. We engineer offline-first architectures utilizing encrypted local SQLite, Realm, or WatermelonDB caching.',
          'User actions, checkout drafts, and form submissions are saved locally and synchronized automatically via background queue workers once network connectivity is restored.',
          'Event-driven WebSocket feeds and server-sent events ensure live inventories, chat streams, and push notifications update in real time.',
        ],
        buttons: [
          {label: 'Start Offline Architecture Build', href: SERVICE_PAGE_ROUTES.contact},
        ],
        media: {
          primary:
            'https://cdn.dribbble.com/userupload/7091669/file/original-722803fa84ca15a8d230517b036a836e.png?resize=2048x1536&vertical=center',
          primaryWidth: 2048,
          primaryHeight: 1536,
          primaryAlt: 'Offline-First Mobile Caching and Real-Time Synchronization',
          secondary: '',
          secondaryWidth: 0,
          secondaryHeight: 0,
          secondaryAlt: '',
          captionTitle: 'Offline-First Caching & Data Sync',
          captionText: 'Local database persistence, automated background sync and real-time feeds',
          href: SERVICE_PAGE_ROUTES.work,
        },
      },
      {
        id: 'mobile-app-biometrics-push',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Security, Biometrics & Engagement',
        heading: 'Biometric Authentication, Push Notifications & Deep Linking',
        description: [
          'Protect sensitive user data while streamlining login workflows with Apple Face ID, Touch ID, and Android BiometricPrompt integrations.',
          'We integrate Apple Push Notification service (APNs) and Firebase Cloud Messaging (FCM) to trigger rich, personalized notifications based on user behavior and transactional milestones.',
          'Universal Links and Android App Links provide deep linking directly into in-app products, promotion campaigns, and checkout screens.',
        ],
        buttons: [
          {label: 'Discuss App Security', href: SERVICE_PAGE_ROUTES.contact},
        ],
        media: {
          primary:
            'https://cdn.dribbble.com/userupload/7091669/file/original-722803fa84ca15a8d230517b036a836e.png?resize=2048x1536&vertical=center',
          primaryWidth: 2048,
          primaryHeight: 1536,
          primaryAlt: 'Biometric Security, Push Notifications and Universal Deep Linking',
          secondary: '',
          secondaryWidth: 0,
          secondaryHeight: 0,
          secondaryAlt: '',
          captionTitle: 'Biometric Security & Deep Linking',
          captionText: 'Face ID / Touch ID authentication, APNs push notifications and universal linking',
          href: SERVICE_PAGE_ROUTES.work,
        },
      },
      {
        id: 'mobile-app-store-cicd-telemetry',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'Store Deployment & Governance',
        heading: 'Automated App Store CI/CD, Compliance & 24/7 Monitoring',
        description: [
          'Launching on the App Store and Google Play requires strict adherence to security, privacy declarations, and sandbox guidelines. We lead the complete submission and review process.',
          'Automated build and delivery pipelines powered by Fastlane and GitHub Actions automate testing, code signing, and beta builds to TestFlight and Google Play Internal Testing.',
          'Real-time crash reporting (Firebase Crashlytics, Sentry) and telemetry track app health, memory usage, and frame rate stability in production.',
        ],
        buttons: [
          {label: 'Explore Store Operations', href: SERVICE_PAGE_ROUTES.contact},
        ],
        media: {
          primary:
            'https://cdn.dribbble.com/userupload/7091669/file/original-722803fa84ca15a8d230517b036a836e.png?resize=2048x1536&vertical=center',
          primaryWidth: 2048,
          primaryHeight: 1536,
          primaryAlt: 'Automated App Store CI/CD and Production Telemetry',
          secondary: '',
          secondaryWidth: 0,
          secondaryHeight: 0,
          secondaryAlt: '',
          captionTitle: 'Automated CI/CD & App Store Delivery',
          captionText: 'Fastlane automation, TestFlight distribution, Crashlytics telemetry and compliance',
          href: SERVICE_PAGE_ROUTES.work,
        },
      },
    ],
    faqs: [
      {
        question: 'Should we build a native app (Swift/Kotlin) or a cross-platform app (React Native/Flutter)?',
        answer:
          'For most consumer and enterprise platforms, cross-platform frameworks like React Native or Flutter provide near-identical 60–120Hz native performance while reducing development costs and keeping iOS and Android feature sets synchronized. For apps requiring intense 3D graphics, low-level Bluetooth protocols, or specialized hardware access, we engineer fully native Swift (iOS) and Kotlin (Android) applications.',
      },
      {
        question: 'How do you handle App Store and Google Play Store submissions and approvals?',
        answer:
          'We manage the entire submission lifecycle: configuring Apple Developer and Google Play Console accounts, provisioning profiles, privacy nutrition labels, in-app purchases, and guideline compliance. Our automated Fastlane pipelines streamline beta distribution via TestFlight and Google Play Internal Testing.',
      },
      {
        question: 'Can our mobile application integrate with our existing backend, ERP, CRM, and Shopify store?',
        answer:
          'Yes. We build custom API connectors and middleware connecting your mobile app with Shopify (Storefront & Admin GraphQL APIs), custom Node.js/Python backends, Salesforce, HubSpot, Stripe payment sheets, and internal databases with secure OAuth2 authentication.',
      },
      {
        question: 'How is offline data synchronization managed when users lose mobile reception?',
        answer:
          'We engineer offline-first architectures using local encrypted SQLite, Realm, or WatermelonDB caching. Actions performed offline are queued locally and automatically reconciled with your backend servers using conflict resolution algorithms when the connection returns.',
      },
      {
        question: 'Who owns the source code and App Store developer accounts?',
        answer:
          'You retain 100% ownership of all mobile source code, design assets, database schemas, and CI/CD deployment pipelines upon completion. Applications are published under your company’s official Apple and Google developer accounts.',
      },
    ],
    experts: {
      eyebrow: 'Mobile Application Engineering',
      heading: 'Ready to Build Your High-Performance Mobile Application?',
      description:
        'Byte Operator designs, engineers, and scales custom iOS, Android, and cross-platform mobile apps. Talk directly with our senior mobile architects to discuss your roadmap and launch strategy.',
      ctaLabel: 'Discuss Your Mobile Project',
      ctaTo: SERVICE_PAGE_ROUTES.contact,
      testimonials: [],
    },
    showPartners: false,
  },
  'software-integrations': {
    faqTitle: 'API & System Integrations',
    hero: {
      eyebrow: 'API & Third-Party System Integrations',
      heading: 'Connect ERP, CRM & Third-Party Architectures with Zero Friction',
      chips: [
        {
          label: 'Third-Party API Platforms',
          href: SERVICE_PAGE_ROUTES.softwareIntegrations,
        },
        {
          label: 'ERP & CRM Synchronization',
          href: SERVICE_PAGE_ROUTES.softwareIntegrations,
        },
        {
          label: 'RESTful & GraphQL Endpoints',
          href: SERVICE_PAGE_ROUTES.softwareDevelopment,
        },
        {
          label: 'Event-Driven Webhooks',
          href: SERVICE_PAGE_ROUTES.softwareIntegrations,
        },
        {
          label: 'Rate Limiting & OAuth2 Security',
          href: SERVICE_PAGE_ROUTES.contact,
        },
        {
          label: 'Automated Failover Queues',
          href: SERVICE_PAGE_ROUTES.contact,
        },
      ],
      description:
        'Byte Operator engineers enterprise-grade RESTful APIs, custom middleware, and automated bi-directional synchronization pipelines connecting ERPs, CRMs, multi-vendor marketplaces, and third-party platforms into a unified, resilient ecosystem.',
      primaryCta: {
        label: 'Discuss Your Integration Project',
        href: SERVICE_PAGE_ROUTES.contact,
      },
    },
    about: {
      intro: {
        heading:
          'Featured Integration Case Study: Aydi Active: Engineering an Open Third-Party API & Multi-Vendor Integration Platform',
        description:
          'Aydi Active is a multi-vendor commerce platform engineered by Byte Operator featuring an extensible third-party API layer. Connected to Shopify and external business systems, the platform provides public REST API endpoints and webhooks allowing external merchants, ERPs, and 3PL logistics partners to manage products, sync inventory, and orchestrate orders programmatically with zero friction.',
        cta: {
          label: 'Explore Integration Architecture',
          href: SERVICE_PAGE_ROUTES.work,
        },
      },
      media: {
        primary:
          'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/third_party_api_endpoints.png?v=1790403408',
        primaryWidth: 1920,
        primaryHeight: 1080,
        primaryAlt:
          'Aydi Active third-party API endpoints and developer documentation',
        secondary: '',
        secondaryWidth: 0,
        secondaryHeight: 0,
        secondaryAlt: '',
      },
      process: {
        heading: 'Our Structured API & System Integration Lifecycle',
        leftDescription:
          '01: API Architecture & Schema Governance\nWe audit your platform landscape, defining OpenAPI schemas, payload contracts, rate limits, OAuth2 token scopes, and bi-directional data pipelines.\n\n02: High-Performance Endpoint Engineering\nWe develop stateless Node.js REST and GraphQL endpoints backed by strict TypeScript validation schemas for sub-millisecond execution.\n\n03: Real-Time Webhook & Event Streaming\nEvent-driven background queues dispatch instantaneous webhook payloads to external systems upon catalog changes, inventory updates, and order placements.',
        rightDescription:
          '04: ERP & CRM Middleware Connectors\nWe build custom synchronization connectors for Salesforce, NetSuite, SAP, HubSpot, and proprietary internal microservices.\n\n05: Idempotency & Automated Failover Queues\nRedis-backed retry queues and dead-letter queues (DLQ) guarantee that zero messages or financial transactions are lost during upstream network disruptions.\n\n06: Developer Documentation & 24/7 SLA Telemetry\nInteractive Swagger/OpenAPI documentation, Postman collections, and continuous endpoint health monitoring ensure reliable long-term operations.',
        cta: {
          label: 'Discuss Your Integration Project',
          href: SERVICE_PAGE_ROUTES.contact,
        },
      },
    },
    features: [
      {
        id: 'aydi-integrations-third-party-apis',
        layout: 'media-left',
        spacing: 'first',
        theme: 'dark',
        eyebrow: 'Developer-First Ecosystem',
        heading: 'Third-Party RESTful API Endpoints & Developer Documentation',
        description: [
          'Using Aydi Active as a benchmark architecture, we engineer public and private RESTful API layers with comprehensive, interactive endpoint documentation.',
          'External merchants, software partners, and logistics providers can authenticate securely via scoped API keys and OAuth2 to query live catalogs, update stock, and retrieve transactional data.',
          'Strict rate limiting, schema validation, standardized JSON error responses, and automated CORS policies ensure enterprise stability under high traffic spikes.',
        ],
        buttons: [
          {label: 'Explore API Architecture', href: SERVICE_PAGE_ROUTES.contact},
        ],
        media: {
          primary:
            'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/third_party_api_endpoints.png?v=1790403408',
          primaryWidth: 1920,
          primaryHeight: 1080,
          primaryAlt: 'Aydi Active Public API and Third-Party Integration Layer',
          secondary: '',
          secondaryWidth: 0,
          secondaryHeight: 0,
          secondaryAlt: '',
          captionTitle: 'Public REST API & Developer Documentation',
          captionText: 'Comprehensive REST endpoints, webhook subscriptions and token authentication',
          href: SERVICE_PAGE_ROUTES.work,
        },
      },
      {
        id: 'aydi-integrations-order-routing',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Order & Logistics Orchestration',
        heading: 'Automated Multi-Channel Order Routing & Webhook Ingestion',
        description: [
          'We engineer real-time webhook listeners and queue workers that ingest incoming orders from ecommerce storefronts, marketplaces, and ERP systems within milliseconds.',
          'In multi-tenant environments like Aydi Active, our integration logic automatically splits orders by vendor, generates dedicated fulfillment payloads, and dispatches tracking updates to all connected endpoints.',
          'Bidirectional webhooks keep customer notifications, 3PL warehouse management systems, and financial ledgers synchronized with zero manual data entry.',
        ],
        buttons: [
          {label: 'Discuss Order Pipelines', href: SERVICE_PAGE_ROUTES.contact},
        ],
        media: {
          primary:
            'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/manage_orders.png?v=1790403409',
          primaryWidth: 1920,
          primaryHeight: 1080,
          primaryAlt: 'Automated Multi-Vendor Order Routing & Webhook Sync',
          secondary: '',
          secondaryWidth: 0,
          secondaryHeight: 0,
          secondaryAlt: '',
          captionTitle: 'Real-Time Order & Webhook Orchestration',
          captionText: 'Instantaneous payload ingestion, order splitting and multi-system fulfillment sync',
          href: SERVICE_PAGE_ROUTES.work,
        },
      },
      {
        id: 'aydi-integrations-product-sync',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'Bi-Directional Synchronization',
        heading: 'Automated Catalog, Pricing & Multi-Tier Inventory Sync',
        description: [
          'Disconnected product databases cause overselling and data discrepancies. Our integration pipelines maintain continuous synchronization across central catalogs, third-party channels, and ERP warehouses.',
          'As showcased in Aydi Active, product attributes, tiered pricing rules, barcode metadata, and stock quantities update across all connected endpoints simultaneously.',
          'Built-in conflict resolution and change data capture (CDC) algorithms prevent race conditions when multiple vendors or systems modify stock concurrently.',
        ],
        buttons: [
          {label: 'Explore Catalog Sync', href: SERVICE_PAGE_ROUTES.contact},
        ],
        media: {
          primary:
            'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/manage_products_of_aydi.png?v=1790403225',
          primaryWidth: 1920,
          primaryHeight: 1080,
          primaryAlt: 'Multi-Channel Catalog and Inventory Synchronization',
          secondary: '',
          secondaryWidth: 0,
          secondaryHeight: 0,
          secondaryAlt: '',
          captionTitle: 'Multi-Channel Catalog & Inventory Sync',
          captionText: 'Bi-directional SKU syncing, delta updates and automated conflict resolution',
          href: SERVICE_PAGE_ROUTES.work,
        },
      },
      {
        id: 'aydi-integrations-schema-creation',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Payload Transformation & Validation',
        heading: 'Dynamic Data Schemas & API Submission Workflows',
        description: [
          'Integrating legacy enterprise systems with modern cloud APIs requires robust data translation. We build custom ETL and payload transformation layers that map disparate data structures cleanly.',
          'Our API submission pipelines validate payload schemas in real time with TypeScript and JSON Schema, sanitizing inputs, validating variant matrices, and preventing malformed records from reaching production databases.',
          'Asynchronous queue workers handle bulk batch uploads smoothly, ensuring high-volume catalog migrations and updates execute without server timeouts.',
        ],
        buttons: [
          {label: 'Start Integration Build', href: SERVICE_PAGE_ROUTES.contact},
        ],
        media: {
          primary:
            'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/create_product.png?v=1790403314',
          primaryWidth: 1920,
          primaryHeight: 1080,
          primaryAlt: 'Automated Payload Transformation and API Validation',
          secondary: '',
          secondaryWidth: 0,
          secondaryHeight: 0,
          secondaryAlt: '',
          captionTitle: 'Automated Payload Transformation & Validation',
          captionText: 'TypeScript schema validation, dynamic JSON transformation and bulk batch queues',
          href: SERVICE_PAGE_ROUTES.work,
        },
      },
      {
        id: 'aydi-integrations-central-telemetry',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'API Governance & Real-Time Telemetry',
        heading: 'Central API Dashboard, Health Telemetry & Uptime Governance',
        description: [
          'Complete operational visibility is vital for mission-critical integrations. We build custom monitoring dashboards and telemetry pipelines tracking API throughput, latency, error rates, and payload volumes in real time.',
          'Like the central command dashboard in Aydi Active, administrators can inspect active API keys, review transaction logs, revoke compromised credentials, and monitor webhook delivery success rates.',
          'Automated alert triggers notify engineering teams immediately of upstream vendor outages or schema changes before end users are impacted.',
        ],
        buttons: [
          {label: 'Discuss Telemetry Systems', href: SERVICE_PAGE_ROUTES.contact},
        ],
        media: {
          primary:
            'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/manage_products_of_aydi.png?v=1790403225',
          primaryWidth: 1920,
          primaryHeight: 1080,
          primaryAlt: 'Central API Dashboard and Health Telemetry',
          secondary: '',
          secondaryWidth: 0,
          secondaryHeight: 0,
          secondaryAlt: '',
          captionTitle: 'Central API Dashboard & Telemetry',
          captionText: 'Live request monitoring, rate-limit tracking and automated failure alerting',
          href: SERVICE_PAGE_ROUTES.work,
        },
      },
    ],
    faqs: [
      {
        question: 'How does Byte Operator engineer third-party API platforms like Aydi Active?',
        answer:
          'We engineer custom API platforms by designing clear RESTful and GraphQL architectures, comprehensive interactive endpoint documentation, scoped API key authentication, and robust event-driven webhooks. External merchants, partners, and applications can programmatically connect to sync products, inventory, and order fulfillment in real time.',
      },
      {
        question: 'Can you connect our custom web application or store with ERPs like NetSuite, SAP, and Salesforce?',
        answer:
          'Yes. We build custom middleware connectors and data synchronization pipelines connecting enterprise ERPs, CRMs (Salesforce, HubSpot), warehouse management systems (WMS), and accounting software with your web platforms, ensuring automated bi-directional data flow with zero manual intervention.',
      },
      {
        question: 'How do you prevent data loss during third-party API outages and rate limits?',
        answer:
          'We architect resilient integration pipelines incorporating Redis-backed message queues, exponential backoff retry policies, and Dead Letter Queues (DLQ). If an external API experiences downtime or rate limits, requests are safely queued and retried automatically without dropping transactions.',
      },
      {
        question: 'What security and authentication protocols are implemented for custom API endpoints?',
        answer:
          'Our API architectures incorporate industry-standard security including OAuth2 token authentication, granular RBAC permissions, encrypted API keys, TLS 1.3 encryption in transit, strict rate limiting, CORS configuration, and comprehensive audit logs.',
      },
      {
        question: 'Do we get complete API documentation, SDKs, and ownership of the integration codebase?',
        answer:
          'Yes. You receive 100% ownership of all integration source code, middleware services, database schemas, and configuration scripts. We also provide interactive OpenAPI / Swagger documentation and Postman collections for your internal and third-party developer teams.',
      },
    ],
    experts: {
      eyebrow: 'API & System Integration Engineering',
      heading: 'Ready to Build Your API & Third-Party Integration Architecture?',
      description:
        'Byte Operator designs, engineers, and monitors custom API platforms, ERP/CRM middleware, and third-party integration pipelines. Talk directly with our senior integration engineers to discuss your technical architecture.',
      ctaLabel: 'Discuss Your Integration Project',
      ctaTo: SERVICE_PAGE_ROUTES.contact,
      testimonials: [],
    },
    showPartners: false,
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
        buttons: [
          {label: 'Get In Touch', href: SERVICE_PAGE_ROUTES.contact},
          {label: 'Explore Speed & Performance Audits', href: '/services/shopify-audits'},
        ],
        media: reuseHomeFeatureMedia('software-support-growth'),
      },
    ],
  },
  'magento-software-migrations': {
    faqTitle: 'Magento to Platform & Cloud Migration',
    hero: {
      eyebrow: 'Migrate from Magento to Software',
      heading: 'Magento & Adobe Commerce Migration Services',
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
          {label: 'Read the OmniRetail Migration Case Study', href: '/work/omniretail-migration'},
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
      heading: 'WordPress & WooCommerce Migration Services',
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
        buttons: [],
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
    faqTitle: 'Headless & Cloud Architecture',
    hero: {
      eyebrow: 'Headless & Cloud Architecture',
      heading: 'Decoupled, High-Performance Edge Solutions & Cloud Infrastructure',
      chips: [
        {
          label: 'Decoupled Next.js Architecture',
          href: SERVICE_PAGE_ROUTES.softwareDevelopment,
        },
        {
          label: 'Global Edge CDN & Caching',
          href: SERVICE_PAGE_ROUTES.softwareIntegrations,
        },
        {
          label: 'Serverless Microservices',
          href: SERVICE_PAGE_ROUTES.softwareDevelopment,
        },
        {
          label: 'Multi-Cloud (AWS & GCP)',
          href: SERVICE_PAGE_ROUTES.contact,
        },
        {
          label: 'Headless CMS & Content Hubs',
          href: SERVICE_PAGE_ROUTES.softwareIntegrations,
        },
        {
          label: 'Automated CI/CD & Terraform',
          href: SERVICE_PAGE_ROUTES.contact,
        },
      ],
      description:
        'Byte Operator architects decoupled headless systems, serverless edge networks, and scalable cloud infrastructure built for ultra-low latency, global availability, and modern developer agility.',
      primaryCta: {
        label: 'Discuss Cloud Architecture',
        href: SERVICE_PAGE_ROUTES.contact,
      },
    },
    about: {
      intro: {
        heading:
          'Featured Cloud Case Study: Engineering Scalable Decoupled Architecture & Edge Infrastructure',
        description:
          'Byte Operator engineers modern headless platforms that decouple frontend user experiences from core backend engines. By deploying Next.js frontends on global edge runtimes and connecting them with resilient microservices, we achieve sub-50ms TTFB and instantaneous global deployments with zero operational downtime.',
        cta: {
          label: 'Explore Cloud Architecture',
          href: SERVICE_PAGE_ROUTES.work,
        },
      },
      media: {
        primary:
          'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/custom_software_case_study.png?v=1790400442',
        primaryWidth: 1920,
        primaryHeight: 1080,
        primaryAlt:
          'Decoupled cloud architecture and headless infrastructure overview',
        secondary: '',
        secondaryWidth: 0,
        secondaryHeight: 0,
        secondaryAlt: '',
      },
      process: {
        heading: 'Our Complete Cloud & Headless Engineering Lifecycle',
        leftDescription:
          '01: Systems Discovery & Edge Modeling\nWe audit your application workloads, latency requirements, content models, and microservice boundaries, creating complete topology maps and edge routing strategies.\n\n02: Composable Frontend & Next.js Architecture\nWe build lightweight, highly reactive frontends utilizing Next.js, React, and TypeScript with static generation (SSG) and incremental static regeneration (ISR).\n\n03: Serverless API Gateways & Microservices\nWe develop stateless microservices and API gateways on AWS Lambda, Cloudflare Workers, and Google Cloud Run for rapid, on-demand execution.',
        rightDescription:
          '04: Headless CMS & Dynamic Content Schemas\nWe configure structured headless content models across Sanity, Strapi, or Contentful with real-time editorial previews and automated webhook build triggers.\n\n05: Infrastructure as Code & Multi-Region Cloud\nWe automate cloud provisioning using Terraform and Docker containers, configuring multi-region redundancy, SSL termination, and auto-scaling policies.\n\n06: 24/7 Observability & Cloud Cost Optimization\nReal-time distributed tracing (OpenTelemetry, Datadog), Prometheus metrics, and cloud cost rightsizing ensure reliable peak performance at optimized spend.',
        cta: {
          label: 'Discuss Cloud Architecture',
          href: SERVICE_PAGE_ROUTES.contact,
        },
      },
    },
    features: [
      {
        id: 'headless-cloud-decoupled-frontends',
        layout: 'media-left',
        spacing: 'first',
        theme: 'dark',
        eyebrow: 'Composable Frontends',
        heading: 'Decoupled Next.js Frontends & Composable UI Architecture',
        description: [
          'Decoupled architectures free your frontend engineering team from legacy monolithic backend constraints. We build lightweight, composable frontends using Next.js and React that communicate with APIs via high-speed GraphQL and REST.',
          'This separation allows frontend developers to iterate on user experiences and deploy UI updates in seconds without redeploying backend servers or risking operational downtime.',
          'A single decoupled API layer can effortlessly power web applications, mobile apps, customer portals, and IoT devices simultaneously.',
        ],
        buttons: [
          {
            label: 'Explore Full-Stack Builds',
            href: SERVICE_PAGE_ROUTES.softwareDevelopment,
          },
        ],
        media: {
          primary:
            'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/manage_products_of_aydi.png?v=1790403225',
          primaryWidth: 1920,
          primaryHeight: 1080,
          primaryAlt: 'Composable Next.js and React Decoupled Frontend Architecture',
          secondary: '',
          secondaryWidth: 0,
          secondaryHeight: 0,
          secondaryAlt: '',
          captionTitle: 'Composable Frontend & Next.js Architecture',
          captionText: 'Decoupled presentation layer with instantaneous static regeneration and live data feeds',
          href: SERVICE_PAGE_ROUTES.work,
        },
      },
      {
        id: 'headless-cloud-edge-cdn',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Edge Computing & Low Latency',
        heading: 'Ultra-Low Latency Global Edge CDNs & Smart Routing',
        description: [
          'Deliver content and compute logic right at the user’s doorstep. We configure global edge compute networks using Cloudflare Workers, Vercel Edge Runtime, and AWS Lambda@Edge.',
          'Edge rendering, dynamic geolocation routing, automated image transformation, and instant cache invalidation reduce time-to-first-byte (TTFB) to sub-50ms globally.',
          'Edge security rules filter malicious traffic, bot attacks, and DDoS threats before requests ever reach your origin cloud infrastructure.',
        ],
        buttons: [
          {label: 'Discuss Edge Networks', href: SERVICE_PAGE_ROUTES.contact},
        ],
        media: {
          primary:
            'https://cdn.shopify.com/s/files/1/0928/7421/1691/files/6.png?v=1789643508',
          primaryWidth: 1920,
          primaryHeight: 1080,
          primaryAlt: 'Global Edge Network Routing and CDN Acceleration',
          secondary: '',
          secondaryWidth: 0,
          secondaryHeight: 0,
          secondaryAlt: '',
          captionTitle: 'Global Edge Network & Sub-50ms TTFB',
          captionText: 'Cloudflare Workers and Vercel Edge Runtime for instantaneous worldwide delivery',
          href: SERVICE_PAGE_ROUTES.work,
        },
      },
      {
        id: 'headless-cloud-serverless-microservices',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'Serverless & Microservices',
        heading: 'Serverless Functions & Scalable Cloud Microservices',
        description: [
          'Break down monolithic applications into modular, autonomous microservices that scale up automatically during peak traffic spikes and scale to zero when idle.',
          'We architect serverless backends using AWS Lambda, Google Cloud Run, and Azure Functions, drastically slashing cloud hosting costs while eliminating manual server provisioning.',
          'Each microservice encapsulates a distinct domain capability, enabling independent scaling, zero-downtime deployments, and isolated failure domains.',
        ],
        buttons: [
          {label: 'Plan Microservices', href: SERVICE_PAGE_ROUTES.contact},
        ],
        media: {
          primary:
            'https://cdn.shopify.com/s/files/1/0928/7421/1691/files/COLLABIX_SECOND.png?v=1789642386',
          primaryWidth: 1920,
          primaryHeight: 1080,
          primaryAlt: 'Scalable Cloud Microservices and Serverless Architecture',
          secondary: '',
          secondaryWidth: 0,
          secondaryHeight: 0,
          secondaryAlt: '',
          captionTitle: 'Serverless Functions & Microservices',
          captionText: 'Autonomous domain microservices, automated scaling and zero-downtime deployments',
          href: SERVICE_PAGE_ROUTES.work,
        },
      },
      {
        id: 'headless-cloud-headless-cms-gateways',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Headless CMS & Content Hubs',
        heading: 'API-First Headless CMS & Structured Content Models',
        description: [
          'Empower your marketing and editorial teams with intuitive headless CMS platforms including Sanity, Strapi, Contentful, and Payload CMS.',
          'We design structured, modular content schemas with real-time editorial preview environments, granular role permissions, and instant webhook triggers for static site rebuilds.',
          'Content creators gain total autonomy to publish rich multimedia stories without relying on developers to hardcode new page templates.',
        ],
        buttons: [
          {
            label: 'Explore CMS Integrations',
            href: SERVICE_PAGE_ROUTES.softwareIntegrations,
          },
        ],
        media: {
          primary:
            'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/third_party_api_endpoints.png?v=1790403408',
          primaryWidth: 1920,
          primaryHeight: 1080,
          primaryAlt: 'Headless CMS Architecture and GraphQL Content Hubs',
          secondary: '',
          secondaryWidth: 0,
          secondaryHeight: 0,
          secondaryAlt: '',
          captionTitle: 'API-First Headless CMS Architecture',
          captionText: 'Structured Sanity/Contentful schemas, live editorial previews and automated webhook triggers',
          href: SERVICE_PAGE_ROUTES.work,
        },
      },
      {
        id: 'headless-cloud-observability-devops',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'Observability & DevOps',
        heading: 'Infrastructure as Code, CI/CD & 24/7 Cloud Observability',
        description: [
          'We automate cloud provisioning across AWS, GCP, and Azure using Infrastructure as Code (IaC) with Terraform and AWS CDK, ensuring reproducible, version-controlled environments.',
          'Docker containerization and Kubernetes orchestration guarantee complete environment parity across development, staging, and production clusters.',
          'Maintain complete visibility into distributed cloud systems with centralized OpenTelemetry tracing, Datadog metric dashboards, and proactive cost optimization.',
        ],
        buttons: [
          {label: 'Discuss DevOps Operations', href: SERVICE_PAGE_ROUTES.contact},
        ],
        media: {
          primary:
            'https://cdn.shopify.com/s/files/1/0928/7421/1691/files/11.png?v=1789646420',
          primaryWidth: 1920,
          primaryHeight: 1080,
          primaryAlt: 'Infrastructure as Code, CI/CD and Cloud Observability',
          secondary: '',
          secondaryWidth: 0,
          secondaryHeight: 0,
          secondaryAlt: '',
          captionTitle: 'Infrastructure as Code & Cloud Telemetry',
          captionText: 'Terraform automation, container orchestration and real-time distributed tracing',
          href: SERVICE_PAGE_ROUTES.work,
        },
      },
    ],
    faqs: [
      {
        question: 'What are the core benefits of migrating to a headless decoupled architecture?',
        answer:
          'A headless architecture separates your frontend presentation layer from your backend database and business logic. This allows frontend teams to build ultra-fast, custom user experiences in Next.js without backend limitations, enables omnichannel publishing across web and mobile from a single API, and drastically increases page load speeds with global edge caching.',
      },
      {
        question: 'How does edge computing reduce time-to-first-byte (TTFB) and improve global performance?',
        answer:
          'Edge computing deploys your application logic and caching across hundreds of global server locations worldwide (such as Cloudflare Workers or Vercel Edge). Instead of routing every request to a single centralized origin server, user requests are processed at the nearest local edge node, reducing TTFB to under 50ms.',
      },
      {
        question: 'Which headless CMS and frontend frameworks do you recommend?',
        answer:
          'We primarily recommend Next.js and React for frontend presentation layers due to their exceptional performance, SSR/SSG capabilities, and rich ecosystem. For headless CMS, we work extensively with Sanity.io, Strapi, Contentful, and Payload CMS, selecting the optimal tool based on your team’s editorial workflow and content complexity.',
      },
      {
        question: 'How do you manage cloud infrastructure costs and auto-scaling on AWS and GCP?',
        answer:
          'We engineer serverless and containerized microservice architectures that scale up automatically during high-traffic events and scale down during quiet hours. We implement aggressive CDN caching, optimize database queries with Redis, and rightsize cloud resource allocations to keep monthly infrastructure costs predictable and lean.',
      },
      {
        question: 'How are security, DDoS mitigation, and API authentication enforced across headless endpoints?',
        answer:
          'We implement enterprise security from the edge layer inward: Cloudflare DDoS protection, Web Application Firewalls (WAF), rate limiting, TLS 1.3 encryption, and scoped OAuth2 / JWT token authentication for API gateways. Origin servers are shielded behind private VPC networks accessible only by verified edge runners.',
      },
    ],
    experts: {
      eyebrow: 'Headless & Cloud Architecture Engineering',
      heading: 'Ready to Modernize Your Cloud & Headless Architecture?',
      description:
        'Byte Operator designs, provisions, and scales decoupled web platforms, edge networks, and multi-cloud backends. Talk directly with our senior cloud architects to discuss your infrastructure.',
      ctaLabel: 'Discuss Cloud Architecture',
      ctaTo: SERVICE_PAGE_ROUTES.contact,
      testimonials: [],
    },
    showPartners: false,
  },
  'bigcommerce-software-migrations': {
    faqTitle: 'BigCommerce to Platform & Cloud Migration',
    hero: {
      eyebrow: 'Migrate from BigCommerce to Software',
      heading: 'BigCommerce Migration Services',
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
        buttons: [],
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
      heading: 'Salesforce Commerce Cloud Migration Services',
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
      heading: 'Platform & Cloud Migration Services for Ecommerce',
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
        descriptionHtml: `Byte Operator supports ecommerce brands moving or replatforming from <a href="/services/magento-software-migrations">Magento</a>, <a href="/services/woocommerce-software-migrations">WooCommerce</a>, <a href="/services/bigcommerce-software-migrations">BigCommerce</a>, <a href="/services/salesforce-software-migrations">Salesforce</a> and other ecommerce platforms to Software or Enterprise Platform Solutions.`,
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
          Byte Operator supports ecommerce teams moving from Magento to Software or Enterprise Platform Solutions, including storefront requirements, product and customer data, integrations and launch planning. Learn more about our <a href="/services/magento-software-migrations">Magento to platform & cloud migrations</a>.
        </p>
      `,
      cta: {
        label: 'Magento to Platform & Cloud Migration',
        href: '/services/magento-software-migrations',
      },
    },
    {
      title: 'WooCommerce',
      descriptionHtml: `
        <p>
          We support businesses moving from WordPress and WooCommerce to Software, with migration planning covering store data, storefront functionality, integrations and the customer experience. Learn more about our <a href="/services/woocommerce-software-migrations">WooCommerce migration services</a>.
        </p>
      `,
      cta: {
        label: 'WooCommerce to Platform & Cloud Migration',
        href: '/services/woocommerce-software-migrations',
      },
    },
    {
      title: 'BigCommerce',
      descriptionHtml: `
        <p>
          Byte Operator can support a move from BigCommerce to Software or Enterprise Platform Solutions, including data requirements, theme development, integrations and launch preparation. Learn more about our <a href="/services/bigcommerce-software-migrations">BigCommerce to platform & cloud migration services</a>.
        </p>
      `,
      cta: {
        label: 'BigCommerce to Platform & Cloud Migration',
        href: '/services/bigcommerce-software-migrations',
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
          Byte Operator can support businesses moving from Salesforce Commerce Cloud to Enterprise Platform Solutions, including storefront development, ecommerce data, integrations and migration planning. Learn more about our <a href="/services/salesforce-software-migrations">Salesforce to platform & cloud migrations</a>.
        </p>
      `,
      cta: {
        label: 'Salesforce vs Software',
        href: '/services/salesforce-software-migrations',
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
          {label: 'Read the OmniRetail Migration Case Study', href: '/work/omniretail-migration'},
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
    faqTitle: 'Full-Stack Web Development',
    hero: {
      eyebrow: 'Full-Stack Web & Multi-Vendor Engineering',
      heading: 'Full-Stack Web Development & Custom Multi-Vendor Marketplace Systems',
      chips: [
        {label: 'React.js & Tailwind CSS', href: SERVICE_PAGE_ROUTES.softwareDevelopment},
        {
          label: 'Node.js & TypeScript',
          href: SERVICE_PAGE_ROUTES.softwareDevelopment,
        },
        {
          label: 'Multi-Vendor Marketplaces',
          href: SERVICE_PAGE_ROUTES.softwareDevelopment,
        },
        {
          label: 'Shopify Real-Time Sync',
          href: SERVICE_PAGE_ROUTES.softwareIntegrations,
        },
        {
          label: 'Third-Party API Endpoints',
          href: SERVICE_PAGE_ROUTES.softwareIntegrations,
        },
        {
          label: 'High Performance Web',
          href: SERVICE_PAGE_ROUTES.contact,
        },
      ],
      description:
        'Byte Operator engineers custom full-stack web applications, scalable multi-vendor marketplaces, and high-throughput API platforms. Built with React.js, Tailwind CSS, Node.js, and enterprise Shopify integrations, our systems power complex multi-tenant commerce, automated vendor management, and seamless third-party connectivity.',
      primaryCta: {
        label: 'Discuss Your Web Project',
        href: SERVICE_PAGE_ROUTES.contact,
      },
    },
    about: {
      intro: {
        heading:
          'Featured Full-Stack Case Study: Aydi Active: Engineering a Multi-Vendor Marketplace Integrated with Shopify',
        description:
          'Aydi Active is a custom-engineered multi-vendor marketplace platform built by Byte Operator using React.js, Tailwind CSS, and Node.js. Connected directly to a Shopify storefront, the platform empowers independent vendors to manage their products, inventory, and orders through dedicated portals while providing comprehensive third-party API endpoints for automated external integrations.',
        cta: {
          label: 'Explore Aydi Active Case Study',
          href: SERVICE_PAGE_ROUTES.work,
        },
      },
      media: {
        primary:
          'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/manage_products_of_aydi.png?v=1790403225',
        primaryWidth: 1920,
        primaryHeight: 1080,
        primaryAlt: 'Aydi Active Multi-Vendor Marketplace Dashboard',
        secondary: '',
        secondaryWidth: 0,
        secondaryHeight: 0,
        secondaryAlt: '',
      },
      process: {
        heading: 'How We Engineered Aydi Active: Architecture & Integration Lifecycle',
        leftDescription:
          '01: Marketplace Architecture & Schema Modeling\nWe structured a multi-tenant relational data model separating vendor spaces, product catalogs, permissions, commission tiers, and bi-directional Shopify sync pipelines.\n\n02: High-Performance React & Tailwind UI\nWe built a responsive, intuitive vendor dashboard using React.js and Tailwind CSS, giving merchants instantaneous product creation tools and live sales analytics.\n\n03: Node.js Backend & Real-Time Sync\nOur engineers built a resilient Node.js API layer with event-driven background queues that synchronize vendor products, pricing, and stock levels with the Shopify storefront in real time.',
        rightDescription:
          '04: Automated Order Routing & Splitting\nWhen orders are placed on Shopify, our webhook architecture splits line items by vendor, dispatches automated fulfillment notifications, and calculates commission splits.\n\n05: Third-Party API Endpoints & Developer Docs\nWe architected a secure external API layer with token authentication and comprehensive documentation, allowing external platforms to integrate seamlessly with Aydi Active.\n\n06: Cloud Deployment & Continuous Scaling\nDeployed on containerized cloud infrastructure with Redis caching, PostgreSQL database indexing, and automated CI/CD deployment pipelines.',
        cta: {
          label: 'Discuss Your Web Project',
          href: SERVICE_PAGE_ROUTES.contact,
        },
      },
    },
    features: [
      {
        id: 'aydi-active-marketplace-dashboard',
        layout: 'media-left',
        spacing: 'first',
        theme: 'dark',
        eyebrow: 'Central Operations & Analytics',
        heading: 'Multi-Vendor Marketplace Dashboard & Command Center',
        description: [
          'The Aydi Active central dashboard provides marketplace operators and vendors with real-time operational visibility into sales velocity, total orders, active vendors, revenue metrics, and inventory health.',
          'Engineered with React.js and Tailwind CSS, the interface delivers lightning-fast data visualization with responsive filtering, customizable metric cards, and live event streams powered by WebSockets.',
          'Marketplace administrators can oversee vendor approvals, set global commission rates, track store performance across all channels, and audit platform activity in real time.',
        ],
        buttons: [
          {label: 'Discuss Your Marketplace', href: SERVICE_PAGE_ROUTES.contact},
        ],
        media: {
          primary:
            'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/manage_products_of_aydi.png?v=1790403225',
          primaryWidth: 1920,
          primaryHeight: 1080,
          primaryAlt: 'Aydi Active Central Command Dashboard',
          secondary: '',
          secondaryWidth: 0,
          secondaryHeight: 0,
          secondaryAlt: '',
          captionTitle: 'Aydi Active Central Command Dashboard',
          captionText: 'Real-time sales tracking, vendor analytics and multi-channel metrics',
          href: SERVICE_PAGE_ROUTES.work,
        },
      },
      {
        id: 'aydi-manage-products',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Catalog Management & Inventory Control',
        heading: 'Automated Multi-Vendor Product Management',
        description: [
          'Managing extensive multi-vendor catalogs requires robust state management and automated synchronization. The Aydi Active product management interface allows vendors to search, filter, batch-edit, and monitor active listings with zero latency.',
          'Every product record maintains synchronized stock quantities, variant attributes, pricing rules, and publishing statuses directly tied to the primary Shopify storefront catalog.',
          'Automated conflict resolution prevents duplicate SKU entries and out-of-stock listings across multiple selling channels simultaneously.',
        ],
        buttons: [
          {label: 'Explore Catalog Systems', href: SERVICE_PAGE_ROUTES.contact},
        ],
        media: {
          primary:
            'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/manage_products_of_aydi.png?v=1790403225',
          primaryWidth: 1920,
          primaryHeight: 1080,
          primaryAlt: 'Multi-Vendor Product Catalog System',
          secondary: '',
          secondaryWidth: 0,
          secondaryHeight: 0,
          secondaryAlt: '',
          captionTitle: 'Multi-Vendor Product Catalog System',
          captionText: 'Instant inventory filtering, status management and Shopify catalog sync',
          href: SERVICE_PAGE_ROUTES.work,
        },
      },
      {
        id: 'aydi-create-product-workflow',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'Vendor Product Publishing',
        heading: 'Dynamic Product Creation & Variant Workflow',
        description: [
          'We engineered a streamlined, multi-step product creation suite that enables vendors to rapidly upload new items, specify multi-option variants (sizes, colors, materials), configure tiered pricing, and upload high-resolution media assets.',
          'Form validation is executed in real time on both client and server layers using TypeScript schemas, ensuring clean metadata, SEO-friendly descriptions, and barcode validation before catalog submission.',
          'Once published or approved by administrators, products are programmatically pushed into Shopify collections via the Shopify Admin GraphQL API with automated webhook notifications.',
        ],
        buttons: [
          {label: 'Start Your Platform Build', href: SERVICE_PAGE_ROUTES.contact},
        ],
        media: {
          primary:
            'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/create_product.png?v=1790403314',
          primaryWidth: 1920,
          primaryHeight: 1080,
          primaryAlt: 'Streamlined Product Creation Engine',
          secondary: '',
          secondaryWidth: 0,
          secondaryHeight: 0,
          secondaryAlt: '',
          captionTitle: 'Streamlined Product Creation Engine',
          captionText: 'Multi-variant configuration, media uploads and instant Shopify submission',
          href: SERVICE_PAGE_ROUTES.work,
        },
      },
      {
        id: 'aydi-manage-orders-routing',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Order Orchestration & Fulfillment',
        heading: 'Intelligent Order Management & Multi-Vendor Routing',
        description: [
          'When a customer places a multi-item checkout order on the Shopify storefront, the Aydi Active backend automatically ingests the order payload, splits items by respective vendor, and generates isolated fulfillment tickets.',
          'Vendors receive immediate dashboard notifications and can generate packing slips, assign tracking numbers, update shipment statuses, and communicate order notes directly through their dedicated management portal.',
          'Fulfillment statuses and tracking numbers are automatically synchronized back to the customer’s Shopify order record and notification emails in real time.',
        ],
        buttons: [
          {label: 'Discuss Custom Fulfillment', href: SERVICE_PAGE_ROUTES.contact},
        ],
        media: {
          primary:
            'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/manage_orders.png?v=1790403409',
          primaryWidth: 1920,
          primaryHeight: 1080,
          primaryAlt: 'Automated Multi-Vendor Order Routing',
          secondary: '',
          secondaryWidth: 0,
          secondaryHeight: 0,
          secondaryAlt: '',
          captionTitle: 'Automated Multi-Vendor Order Routing',
          captionText: 'Order splitting, vendor fulfillment tracking and synchronized customer updates',
          href: SERVICE_PAGE_ROUTES.work,
        },
      },
      {
        id: 'aydi-third-party-api-developer-docs',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'Open API & Ecosystem Connectivity',
        heading: 'Third-Party API Endpoints & Developer Documentation',
        description: [
          'To transform Aydi Active into an extensible ecosystem, we engineered a developer-first RESTful API layer accompanied by comprehensive, interactive API endpoint documentation.',
          'Third-party merchants, ERP systems, 3PL logistics providers, and external software applications can securely connect using API keys and OAuth2 authentication to manage products, sync stock levels, query orders, and listen to platform webhooks.',
          'Every endpoint features strict rate limiting, schema validation, standardized JSON responses, and automated error recovery to support enterprise-grade integrations at scale.',
        ],
        buttons: [
          {label: 'Explore API Architecture', href: SERVICE_PAGE_ROUTES.softwareIntegrations},
        ],
        media: {
          primary:
            'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/third_party_api_endpoints.png?v=1790403408',
          primaryWidth: 1920,
          primaryHeight: 1080,
          primaryAlt: 'Public API and Third-Party Integration Layer',
          secondary: '',
          secondaryWidth: 0,
          secondaryHeight: 0,
          secondaryAlt: '',
          captionTitle: 'Public API & Third-Party Integration Layer',
          captionText: 'Comprehensive REST endpoints, webhook subscriptions and developer documentation',
          href: SERVICE_PAGE_ROUTES.work,
        },
      },
    ],
    faqs: [
      {
        question: 'How does the Aydi Active multi-vendor platform integrate with Shopify?',
        answer:
          'Aydi Active functions as a standalone full-stack multi-vendor portal built with React.js, Tailwind CSS, and Node.js that connects to Shopify via the Shopify Admin GraphQL & REST APIs. When vendors create and approve products in Aydi Active, they automatically sync into Shopify. When customers purchase from the Shopify storefront, orders are automatically ingested, split by vendor, and routed to vendor dashboards for fulfillment.',
      },
      {
        question: 'Can third-party merchants and external platforms integrate with Aydi Active via API?',
        answer:
          'Yes. Aydi Active is engineered as an open third-party platform featuring complete RESTful API endpoints and webhook subscriptions. External merchants, inventory management tools, ERPs, and logistics providers can programmatically sync catalogs, update inventory levels, and fetch order details with secure API key authentication.',
      },
      {
        question: 'What technology stack is used to engineer full-stack web platforms like Aydi Active?',
        answer:
          'We build with React.js and Tailwind CSS on the frontend for high-speed, responsive user interfaces; Node.js, Express, and TypeScript on the backend for microservices and API routes; PostgreSQL for relational data storage; Redis for in-memory caching and real-time queues; and Docker for cloud containerization.',
      },
      {
        question: 'How are multi-vendor orders, payouts, and shipping handled?',
        answer:
          'Our backend architecture automatically parses Shopify multi-item orders, calculates vendor-specific commission rates, generates isolated fulfillment tickets, and triggers webhook notifications. Vendors upload tracking numbers directly in their portal, which instantly syncs back to the customer’s Shopify order status.',
      },
      {
        question: 'Do we own the full source code and intellectual property upon project completion?',
        answer:
          'Yes. You retain 100% ownership of all custom React.js frontend code, Node.js backend services, database schemas, API documentation, and deployment configurations. We provide complete repository handover and continuous engineering support.',
      },
    ],
    experts: {
      eyebrow: 'Full-Stack Web & Marketplace Engineering',
      heading: 'Ready to Build Your Full-Stack Web Platform or Marketplace?',
      description:
        'Byte Operator designs, engineers, and scales custom full-stack web applications, multi-vendor marketplaces, and third-party API platforms. Talk directly with our senior full-stack engineers to discuss your architecture and roadmap.',
      ctaLabel: 'Discuss Your Web Project',
      ctaTo: SERVICE_PAGE_ROUTES.contact,
      testimonials: [],
    },
    showPartners: false,
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
    faqTitle: 'Platform SEO Migrations',
    hero: {
      eyebrow: 'Platform SEO Migrations',
      heading: 'Protect rankings, indexation & organic revenue during rebuilds.',
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
          {label: 'Read the OmniRetail Migration Case Study', href: '/work/omniretail-migration'},
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
      eyebrow: 'Email & SMS Retention Marketing',
      heading:
        'Email & SMS Retention Marketing for Ecommerce Brands',
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
          {label: 'Explore Subscription Services', href: '/services/subscriptions-on-software'},
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
          'Choosing an ecommerce platform is mostly a question of where you want to spend your effort. Every platform demands attention somewhere: hosting and security, custom development, integrations, or working around constraints the business has outgrown. Software takes on the infrastructure (hosting, PCI compliance, platform updates and checkout) so teams can spend more of their time on merchandising, customer experience and growth. That trade-off suits most ecommerce brands well, and it is worth understanding properly rather than assuming.',
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
          'Software is a hosted platform, so hosting, security patching, PCI compliance for checkout and platform updates are handled for you. For most ecommerce teams that removes a category of work and a category of risk that would otherwise need in-house attention or an ongoing retainer just to stand still.',
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
          'There are platform conventions to work within (URL structures and checkout among them) and it is better to understand those upfront. In practice they rarely limit the SEO and CRO work that moves commercial numbers.',
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
  // 'software-experts' was merged into 'software-developers' (301 in route-mappings).
  memberships: {
    faqTitle: 'Dedicated Development Retainers',
    hero: {
      eyebrow: 'Dedicated Development Retainers',
      heading:
        'Dedicated Development Capacity on a Monthly Retainer',
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
        'Byte Operator memberships give you dedicated development capacity on a monthly retainer instead of one-off projects: development time, conversion work, technical help and maintenance from a team that already knows the store.',
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
          {label: 'Explore Support & Maintenance', href: '/services/support-and-maintenance'},
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
        'Software Architecture & Ecommerce Strategy Consulting',
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
          {label: 'Explore Custom Software Development', href: '/services/software-developers'},
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
          'Platform questions carry long consequences. Whether to move to Enterprise Platform Solutions, whether a replatform is justified yet, whether a requirement is better served by an app, a custom build or a change to process: these decisions are easier with someone who has seen how each option behaves after launch.',
          'As a Enterprise Platform Solutions consultant, Byte Operator advises on migration planning, store architecture, and the ERP, CRM, inventory and fulfilment integrations a store depends on, including what to keep as-is and what genuinely needs rebuilding.',
        ],
        buttons: [
          {
            label: 'Explore Platform & Cloud Migrations',
            href: SERVICE_PAGE_ROUTES.softwareMigrations,
          },
          {label: 'Choosing an Enterprise Ecommerce Platform', href: '/services/why-custom-software'},
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
          'Our consulting work identifies the technical SEO foundations worth fixing first, the conversion opportunities worth testing, and the changes that serve both, so effort is not spent twice on the same templates.',
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
          {label: 'Read the Nordic Haven Case Study', href: '/work/nordic-haven'},
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
          {label: 'Explore Klaviyo Services', href: '/services/klaviyo-agency'},
        ],
        media: reuseHomeFeatureMedia('software-support-growth'),
      },
    ],
  },
  'support-and-maintenance': {
    faqTitle: 'Support & Maintenance',
    hero: {
      eyebrow: 'Support & Maintenance',
      heading: 'Support & Maintenance Services',
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
          {label: 'Meet the Team Behind Byte Operator', href: '/about'},
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
          {label: 'Explore Monthly Retainers', href: '/services/memberships'},
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
  'geo-agency': {
    faqTitle: 'Generative Engine Optimisation (GEO)',
    hero: {
      eyebrow: 'Generative Engine Optimisation (GEO) & AI Search',
      heading: 'Generative Engine Optimization (GEO) & AI Brand Citation Architecture',
      chips: [
        {
          label: 'ChatGPT & Perplexity Citations',
          href: SERVICE_PAGE_ROUTES.ecommerceAiSeo,
        },
        {
          label: 'Google AI Overviews (SGE)',
          href: SERVICE_PAGE_ROUTES.ecommerceSeo,
        },
        {
          label: 'Semantic Knowledge Graphs',
          href: SERVICE_PAGE_ROUTES.softwareDevelopment,
        },
        {
          label: 'AI Visibility Audits',
          href: SERVICE_PAGE_ROUTES.ai,
        },
        {
          label: 'Entity Authority Building',
          href: SERVICE_PAGE_ROUTES.contact,
        },
        {
          label: 'Conversational Commerce UX',
          href: SERVICE_PAGE_ROUTES.softwareWebDesign,
        },
      ],
      description:
        'Byte Operator engineers Generative Engine Optimization (GEO) architectures to ensure your ecommerce brand is recommended and cited in ChatGPT, Perplexity, Gemini, and Google AI Overviews. We build semantic entity networks and structured data frameworks that capture high-intent conversational buyers.',
      primaryCta: {
        label: 'Request AI Visibility Audit',
        href: SERVICE_PAGE_ROUTES.contact,
      },
    },
    about: {
      intro: {
        heading:
          'Featured GEO Case Study: 340% Lift in AI Search Citations & Conversational Revenue',
        description:
          'Modern consumers increasingly discover and compare products through generative AI assistants. Byte Operator structures brand entities, factual attributes, and authoritative citations so conversational search engines surface your store as the authoritative recommendation.',
        cta: {
          label: 'Explore AI Search Case Studies',
          href: SERVICE_PAGE_ROUTES.work,
        },
      },
      media: {
        primary:
          'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/fourth.webp?v=1790408507',
        primaryWidth: 1920,
        primaryHeight: 1080,
        primaryAlt:
          'Generative Engine Optimization analytics and AI citation dashboard case study',
        secondary: '',
        secondaryWidth: 0,
        secondaryHeight: 0,
        secondaryAlt: '',
      },
      process: {
        heading: 'Our 6-Stage Generative Engine Optimization Lifecycle',
        leftDescription:
          '01: AI Share of Voice & Prompt Benchmarking\nWe test thousands of industry purchase prompts across ChatGPT, Perplexity, and Gemini to identify citation gaps.\n\n02: Semantic Knowledge Graph & Entity Modeling\nWe structure your brand, products, and founder credentials into machine-readable knowledge graph entities.\n\n03: Factual Attribute & Schema Optimization\nWe deploy dense structured data, product specification tables, and verified review schemas for direct AI ingestion.',
        rightDescription:
          '04: Authoritative Digital PR & Vector Citations\nWe secure high-authority contextual citations and expert mentions in authoritative knowledge sources that feed AI training sets.\n\n05: Conversational Intent Landing Architecture\nWe create comprehensive comparison frameworks, buyer guides, and FAQ matrices structured for generative summarization.\n\n06: Real-Time AI Visibility Tracking & Optimization\nWe monitor ongoing citation frequency, sentiment scores, and conversational referral conversions with proactive prompt iteration.',
        cta: {
          label: 'Schedule GEO Strategy Call',
          href: SERVICE_PAGE_ROUTES.contact,
        },
      },
    },
    features: [
      {
        id: 'geo-ai-brand-citations',
        layout: 'media-left',
        spacing: 'first',
        theme: 'dark',
        eyebrow: 'Conversational AI Search',
        heading: 'Be the Recommended Brand in ChatGPT, Perplexity & Gemini',
        description: [
          'Generative AI models synthesize information from authoritative web sources to answer commercial buying queries.',
          'We structure your product data, brand narrative, and technical specifications so large language models cite your store as the primary solution for category searches.',
          'Capture high-intent buyers asking complex, multi-variable purchasing questions across conversational AI tools.',
        ],
        buttons: [
          {label: 'Optimize AI Citations', href: SERVICE_PAGE_ROUTES.contact},
        ],
        media: {
          primary:
            'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/ai_powered.webp?v=1790408507',
          primaryWidth: 1920,
          primaryHeight: 1080,
          primaryAlt: 'AI brand citations and conversational search recommendations',
          secondary: '',
          secondaryWidth: 0,
          secondaryHeight: 0,
          secondaryAlt: '',
          captionTitle: 'Conversational AI Citations',
          captionText: 'Semantic entity extraction, ChatGPT & Perplexity recommendation, and prompt optimization',
          href: SERVICE_PAGE_ROUTES.work,
        },
      },
      {
        id: 'geo-semantic-knowledge-graph',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Entity Authority & Knowledge Graphs',
        heading: 'Build Unshakeable Semantic Entity Authority',
        description: [
          'AI models do not rely solely on keyword density; they understand entities, relationships, and verified factual consistency.',
          'We build linked semantic entity networks connecting your brand to Wikidata, industry knowledge bases, and verified certification registries.',
          'This semantic clarity ensures AI algorithms recognize your store as a trusted market leader in your niche.',
        ],
        buttons: [
          {label: 'Build Entity Architecture', href: SERVICE_PAGE_ROUTES.contact},
        ],
        media: {
          primary:
            'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/third_party_api_endpoints.png?v=1790403408',
          primaryWidth: 1920,
          primaryHeight: 1080,
          primaryAlt: 'Semantic entity knowledge graph and structured machine feeds',
          secondary: '',
          secondaryWidth: 0,
          secondaryHeight: 0,
          secondaryAlt: '',
          captionTitle: 'Semantic Entity Knowledge Graph',
          captionText: 'Machine-readable entity linking, Wikidata alignment, and brand authority graphs',
          href: SERVICE_PAGE_ROUTES.work,
        },
      },
      {
        id: 'geo-google-ai-overviews',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'Google AI Search',
        heading: 'Dominate Google AI Overviews & Generative Snapshots',
        description: [
          'Google AI Overviews occupy prime screen real estate above traditional organic rankings for millions of commercial queries.',
          'We format product copy, comparative tables, and expert author summaries to align with Google generative snapshot extraction algorithms.',
          'Earn featured carousel placements and direct click-through traffic from Google AI-synthesized answer boxes.',
        ],
        buttons: [
          {label: 'Explore Google AI Optimization', href: SERVICE_PAGE_ROUTES.contact},
        ],
        media: {
          primary:
            'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/speedify_landing.webp?v=1790408507',
          primaryWidth: 1920,
          primaryHeight: 1080,
          primaryAlt: 'Google AI Overviews and generative search snapshot extraction',
          secondary: '',
          secondaryWidth: 0,
          secondaryHeight: 0,
          secondaryAlt: '',
          captionTitle: 'Google AI Overviews Optimization',
          captionText: 'Generative snapshot extraction formatting, comparative tables, and top-of-SERP placement',
          href: SERVICE_PAGE_ROUTES.work,
        },
      },
      {
        id: 'geo-conversational-comparison',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'High-AOV Buying Journeys',
        heading: 'Capturing High-Value Buyers Through AI Recommendations',
        description: [
          'Shoppers researching premium, high-consideration purchases rely heavily on AI to compare features, materials, and warranties.',
          'We construct detailed product specification matrices, transparent comparison guides, and third-party verified review feeds optimized for AI retrieval.',
          'Convert discerning customers when AI assistants highlight your superior build quality, customer satisfaction ratings, and warranty terms.',
        ],
        buttons: [
          {label: 'Scale Conversational Traffic', href: SERVICE_PAGE_ROUTES.contact},
          {label: 'Explore Agentic Commerce', href: '/services/agentic-commerce'},
        ],
        media: {
          primary:
            'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/furniture.webp?v=1790407636',
          primaryWidth: 1920,
          primaryHeight: 1080,
          primaryAlt: 'High-AOV product comparison matrices and conversational AI recommendations',
          secondary: '',
          secondaryWidth: 0,
          secondaryHeight: 0,
          secondaryAlt: '',
          captionTitle: 'High-AOV Conversational Funnels',
          captionText: 'Comparative product matrices, verified sentiment feeds, and high-ticket conversion triggers',
          href: SERVICE_PAGE_ROUTES.work,
        },
      },
      {
        id: 'geo-ai-visibility-tracking',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'AI Share of Voice Monitoring',
        heading: 'Real-Time AI Citation Tracking & Competitive Share of Model',
        description: [
          'Track how frequently your brand appears in response to buyer prompts compared to your primary competitors across all leading LLMs.',
          'Our automated tracking monitors prompt variations, citation sentiment, and hallucination risks, providing actionable data to continuously expand your AI footprint.',
          'Stay ahead of shifting AI algorithms with continuous prompt testing and semantic refinement.',
        ],
        buttons: [
          {label: 'Request Free AI Audit', href: SERVICE_PAGE_ROUTES.contact},
        ],
        media: {
          primary:
            'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/manage_products_of_aydi.png?v=1790403225',
          primaryWidth: 1920,
          primaryHeight: 1080,
          primaryAlt: 'AI share of voice tracking and competitive LLM benchmarking',
          secondary: '',
          secondaryWidth: 0,
          secondaryHeight: 0,
          secondaryAlt: '',
          captionTitle: 'Real-Time AI Share of Voice',
          captionText: 'Continuous LLM prompt benchmarking, citation sentiment scoring, and competitive tracking',
          href: SERVICE_PAGE_ROUTES.work,
        },
      },
    ],
    faqs: [
      {
        question: 'What is Generative Engine Optimization (GEO) and how does it differ from traditional SEO?',
        answer:
          'While traditional SEO focuses on ranking links on search engine results pages, Generative Engine Optimization (GEO) optimizes your brand content, structured data, and digital PR footprint so that AI engines like ChatGPT, Perplexity, Gemini, and Google AI Overviews cite and recommend your products directly in conversational responses.',
      },
      {
        question: 'How do LLMs like ChatGPT and Perplexity select which brands to recommend?',
        answer:
          'LLMs evaluate entity authority, consensus across authoritative web sources, dense factual product specifications, verified customer reviews, and clear semantic schema markup. By establishing robust entity relationships, we make it easy for AI models to retrieve and cite your brand with high confidence.',
      },
      {
        question: 'How do you track our brand share of voice in AI search engines?',
        answer:
          'We utilize automated prompt testing pipelines that simulate thousands of commercial buying queries across ChatGPT, Perplexity, Claude, and Gemini. We measure citation frequency, recommendation rankings, source link inclusions, and sentiment to deliver a comprehensive AI Share of Model report.',
      },
      {
        question: 'Can GEO directly increase revenue and ecommerce sales?',
        answer:
          'Yes. Shoppers querying AI engines are typically in high-intent research and decision-making stages. When an AI assistant explicitly names and links your brand as the top recommendation, conversion rates from AI referrals are significantly higher than broad generic organic search traffic.',
      },
      {
        question: 'How quickly can an ecommerce brand see results from a GEO strategy?',
        answer:
          'Real-time search models like Perplexity and Google AI Overviews index and cite updated structured content within weeks. For closed-weight models like ChatGPT, ongoing entity building and authoritative PR citations ensure consistent presence across model updates and search-augmented browsing.',
      },
    ],
    experts: {
      eyebrow: 'Generative Engine Optimisation (GEO)',
      heading: 'Ready to Become the Most Recommended Brand in AI Search?',
      description:
        'Byte Operator engineers cutting-edge Generative Engine Optimization strategies that capture conversational search demand. Partner directly with our AI search architects to audit and scale your AI visibility.',
      ctaLabel: 'Schedule GEO Consultation',
      ctaTo: SERVICE_PAGE_ROUTES.contact,
      testimonials: [],
    },
    showPartners: false,
  },
  'ai-automations-agents': {
    faqTitle: 'AI Automations & Agents',
    hero: {
      eyebrow: 'AI Automations & Autonomous Agents',
      heading: 'Autonomous AI Workflow Automation, Intelligent Lead Capture & Agentic Systems',
      chips: [
        {
          label: 'Replex Engine Lead Automation',
          href: SERVICE_PAGE_ROUTES.softwareDevelopment,
        },
        {
          label: 'n8n Workflow Pipelines',
          href: SERVICE_PAGE_ROUTES.softwareIntegrations,
        },
        {
          label: 'Autonomous AI Support Agents',
          href: SERVICE_PAGE_ROUTES.softwareAppDevelopment,
        },
        {
          label: 'Multi-Agent Task Orchestration',
          href: SERVICE_PAGE_ROUTES.contact,
        },
        {
          label: 'Real-Time CRM & Webhook Sync',
          href: SERVICE_PAGE_ROUTES.softwareIntegrations,
        },
        {
          label: 'Zero-Miss Lead Qualification',
          href: SERVICE_PAGE_ROUTES.ecommerceCro,
        },
      ],
      description:
        'Byte Operator designs, builds, and deploys intelligent AI automations, autonomous agent workflows, and lead response platforms. Powered by our Replex Engine framework and n8n orchestration pipelines, we eliminate manual bottlenecks, capture every inbound sales lead instantly, and automate operations 24/7.',
      primaryCta: {
        label: 'Deploy AI Automations',
        href: SERVICE_PAGE_ROUTES.contact,
      },
    },
    about: {
      intro: {
        heading:
          'Featured Automation Platform: Replex Engine - Autonomous AI Lead Capture & Instant Reply Ecosystem',
        description:
          'Replex Engine is our proprietary AI-powered communication and lead automation platform engineered to guarantee that no sales inquiry goes unanswered. By connecting instant multi-channel webhook listeners with context-aware LLMs and automated qualification funnels, Replex Engine converts incoming leads in seconds while synchronizing data directly with your CRM and team channels.',
        cta: {
          label: 'Explore Automation Case Studies',
          href: SERVICE_PAGE_ROUTES.work,
        },
      },
      media: {
        primary:
          'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/replex.png?v=1790409470',
        primaryWidth: 1920,
        primaryHeight: 1080,
        primaryAlt:
          'Replex Engine AI lead reply and automated communication platform case study',
        secondary: '',
        secondaryWidth: 0,
        secondaryHeight: 0,
        secondaryAlt: '',
      },
      process: {
        heading: 'Our 6-Stage AI Automation & Agent Engineering Lifecycle',
        leftDescription:
          '01: Workflow & Operational Bottleneck Audit\nWe map your existing manual touchpoints, lead response times, repetitive data tasks, and API integration endpoints.\n\n02: Context-Aware Agent & Prompt Engineering\nWe fine-tune domain-specific AI prompts with your brand knowledge base, product catalogs, and objection-handling guidelines.\n\n03: Replex Engine & Lead Router Setup\nWe configure real-time omnichannel lead listeners across WhatsApp, email, web forms, and live chat with instant AI responses.',
        rightDescription:
          '04: n8n Workflow & Pipeline Orchestration\nWe build visual, resilient automation pipelines in n8n connecting CRMs, databases, messaging queues, and payment gateways.\n\n05: Human-in-the-Loop & Fallback Safeguards\nWe engineer intelligent escalation triggers that hand off high-priority enterprise deals or complex edge cases to human specialists.\n\n06: End-to-End Stress Testing & 24/7 Monitoring\nWe simulate concurrent multi-channel lead spikes, monitor API rate limits, and maintain self-healing workflow health.',
        cta: {
          label: 'Plan Your AI Automation Build',
          href: SERVICE_PAGE_ROUTES.contact,
        },
      },
    },
    features: [
      {
        id: 'ai-replex-engine-replies',
        layout: 'media-left',
        spacing: 'first',
        theme: 'dark',
        eyebrow: 'Autonomous Lead Capture',
        heading: 'Replex Engine: Zero-Miss Lead Capture & Sub-Minute AI Responses',
        description: [
          'Speed to lead directly dictates sales conversion rates. Slow email or chat responses cause high-value prospects to seek competitors.',
          'Replex Engine monitors incoming inquiries across web forms, email inboxes, SMS, and messaging platforms, generating intelligent, context-accurate responses in under 30 seconds.',
          'The platform qualifies buyer intent, answers detailed technical questions using your verified documentation, and books meetings automatically on your calendar.',
        ],
        buttons: [
          {label: 'Deploy Replex Engine', href: SERVICE_PAGE_ROUTES.contact},
        ],
        media: {
          primary:
            'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/replex.png?v=1790409470',
          primaryWidth: 1920,
          primaryHeight: 1080,
          primaryAlt: 'Replex Engine automated AI lead response dashboard',
          secondary: '',
          secondaryWidth: 0,
          secondaryHeight: 0,
          secondaryAlt: '',
          captionTitle: 'Replex Engine Lead Automation',
          captionText: 'Instant multi-channel lead response, automated buyer qualification, and automated calendar scheduling',
          href: SERVICE_PAGE_ROUTES.work,
        },
      },
      {
        id: 'ai-n8n-workflow-orchestration',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'n8n Pipeline Engineering',
        heading: 'Complex Multi-System Automation Pipelines with n8n',
        description: [
          'We architect custom workflow automations using n8n to connect disparate SaaS tools, databases, and internal APIs into unified operational engines.',
          'Our custom nodes and visual logic trees automate repetitive data transformation, invoice generation, customer onboarding, and order fulfillment updates without brittle manual scripts.',
          'Self-hosted and cloud n8n setups give your business full data privacy, zero vendor lock-in, and unlimited execution scale.',
        ],
        buttons: [
          {label: 'Build n8n Workflows', href: SERVICE_PAGE_ROUTES.softwareIntegrations},
          {label: 'Read the Agent Swarms Case Study', href: '/work/autonomous-agent-swarms'},
        ],
        media: {
          primary:
            'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/n8n.webp?v=1790409457',
          primaryWidth: 1920,
          primaryHeight: 1080,
          primaryAlt: 'n8n workflow automation and API pipeline orchestration',
          secondary: '',
          secondaryWidth: 0,
          secondaryHeight: 0,
          secondaryAlt: '',
          captionTitle: 'n8n Workflow Automation',
          captionText: 'Visual multi-system pipeline orchestration, automated data sync, and enterprise webhook triggers',
          href: SERVICE_PAGE_ROUTES.work,
        },
      },
      {
        id: 'ai-multi-agent-orchestration',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'Multi-Agent Systems',
        heading: 'Autonomous AI Agents for Complex Operational Execution',
        description: [
          'Move beyond basic chatbots to multi-agent ecosystems where specialized AI workers collaborate to solve complex operational challenges.',
          'We deploy researcher agents, data extraction bots, code validation workers, and customer service agents that communicate, verify facts, and execute multi-step business logic autonomously.',
          'Each agent operates with strict guardrails, role-based tool access, and comprehensive activity audit logging.',
        ],
        buttons: [
          {label: 'Explore Multi-Agent Systems', href: SERVICE_PAGE_ROUTES.contact},
          {label: 'Explore Agentic Commerce', href: '/services/agentic-commerce'},
        ],
        media: {
          primary:
            'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/second_autmation_imaeg.webp?v=1790409459',
          primaryWidth: 1920,
          primaryHeight: 1080,
          primaryAlt: 'Autonomous AI multi-agent orchestration platform',
          secondary: '',
          secondaryWidth: 0,
          secondaryHeight: 0,
          secondaryAlt: '',
          captionTitle: 'Autonomous Multi-Agent Architecture',
          captionText: 'Collaborative AI agent swarms, automated task execution, and verified human-in-the-loop controls',
          href: SERVICE_PAGE_ROUTES.work,
        },
      },
      {
        id: 'ai-crm-webhook-synchronization',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'CRM & Data Pipelines',
        heading: 'Real-Time Bidirectional CRM & Webhook Data Synchronization',
        description: [
          'AI responses are only as valuable as the context backing them. We link our automation engines directly to HubSpot, Salesforce, Klaviyo, and custom PostgreSQL databases.',
          'Every AI interaction, lead qualification score, and customer preference is logged into your CRM in real time, keeping your sales team fully equipped with actionable context.',
          'Automated lead scoring ensures hot prospects are routed immediately to the right sales executive via Slack and SMS alerts.',
        ],
        buttons: [
          {label: 'Connect CRM Pipelines', href: SERVICE_PAGE_ROUTES.softwareIntegrations},
        ],
        media: {
          primary:
            'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/third_party_api_endpoints.png?v=1790403408',
          primaryWidth: 1920,
          primaryHeight: 1080,
          primaryAlt: 'Real-time CRM and webhook API synchronization endpoints',
          secondary: '',
          secondaryWidth: 0,
          secondaryHeight: 0,
          secondaryAlt: '',
          captionTitle: 'CRM & Webhook Integration',
          captionText: 'Real-time contact enrichment, automated lead scoring, and instant Slack notifications',
          href: SERVICE_PAGE_ROUTES.work,
        },
      },
      {
        id: 'ai-support-order-resolution',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'Customer Support Automation',
        heading: 'Instant Customer Support & Order Status Resolution',
        description: [
          'Over 60% of ecommerce customer service inquiries revolve around order tracking, returns, and inventory availability.',
          'We build support agents connected to your Shopify and ERP systems that look up order tracking numbers, initiate return labels, and resolve customer queries in real time.',
          'Drastically lower support ticket volumes and resolution times while maintaining a 95%+ customer satisfaction score.',
        ],
        buttons: [
          {label: 'Automate Customer Support', href: SERVICE_PAGE_ROUTES.contact},
          {label: 'Explore AI Application Development', href: '/services/ai-application-development'},
        ],
        media: {
          primary:
            'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/manage_orders.png?v=1790403409',
          primaryWidth: 1920,
          primaryHeight: 1080,
          primaryAlt: 'AI automated customer support and order resolution dashboard',
          secondary: '',
          secondaryWidth: 0,
          secondaryHeight: 0,
          secondaryAlt: '',
          captionTitle: 'Support & Order Resolution',
          captionText: 'Automated order tracking lookups, return label generation, and 24/7 ticket resolution',
          href: SERVICE_PAGE_ROUTES.work,
        },
      },
    ],
    faqs: [
      {
        question: 'How does Replex Engine ensure no inbound sales lead is missed?',
        answer:
          'Replex Engine deploys persistent webhook listeners across all your contact forms, email addresses, WhatsApp, and live chat channels. The moment a new lead arrives, Replex Engine validates contact info, analyzes intent with our context-aware AI models, generates a personalized reply in under 30 seconds, and alerts your team via Slack.',
      },
      {
        question: 'Why choose n8n over Zapier or Make for enterprise automations?',
        answer:
          'n8n provides enterprise-grade data security, self-hosting options, custom JavaScript/Python execution nodes, and unlimited workflow executions without tiered per-task price penalties. It allows for complex branching logic, local data privacy compliance (GDPR/HIPAA), and direct integration with internal APIs.',
      },
      {
        question: 'Can AI agents safely handle customer support without giving incorrect information?',
        answer:
          'Yes. Our AI agents are built using Retrieval-Augmented Generation (RAG) restricted strictly to your verified company documentation, return policies, and real-time database feeds. If a customer inquiry falls outside defined parameters, the agent gracefully escalates the conversation to a human team member.',
      },
      {
        question: 'How do automated AI agents integrate with our existing CRM and ERP tools?',
        answer:
          'We build direct bi-directional API connectors for systems like HubSpot, Salesforce, Shopify, NetSuite, and custom databases. The AI agent automatically updates contact properties, logs full conversation transcripts, creates deals, and updates inventory records in real time.',
      },
      {
        question: 'What is the typical setup timeline for an AI automation system?',
        answer:
          'Standard Replex Engine lead automation and n8n pipeline setups typically take between 2 to 4 weeks. This includes system audit, prompt engineering with your brand knowledge base, API connector configuration, testing, and team training.',
      },
    ],
    experts: {
      eyebrow: 'AI Automations & Autonomous Agents',
      heading: 'Ready to Automate Your Operations with Intelligent AI Agents?',
      description:
        'Byte Operator designs, engineers, and deploys high-impact AI automations, lead reply engines, and n8n pipelines. Speak directly with our senior AI automation engineers to map your automation architecture.',
      ctaLabel: 'Schedule Automation Consultation',
      ctaTo: SERVICE_PAGE_ROUTES.contact,
      testimonials: [],
    },
    showPartners: false,
  },
  'klaviyo-agency': {
    faqTitle: 'Klaviyo Agency',
    hero: {
      eyebrow:
        'Klaviyo Email Marketing Agency for Software and Enterprise Platform Solutions',
      heading:
        'Klaviyo Setup, Flows, Segmentation & Integrations',
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
          'Klaviyo does a lot, and most accounts use a fraction of it. We look at what the store is actually trying to achieve (first orders, repeat purchases, reactivating lapsed customers) and build the Klaviyo setup around those objectives instead of switching on every available feature.',
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
          {label: 'Explore Subscription Services', href: '/services/subscriptions-on-software'},
        ],
        media: reuseHomeFeatureMedia('software-launch'),
      },
      {
        id: 'klaviyo-agency-segmentation',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'Klaviyo Segmentation',
        heading: 'Klaviyo Segments Your Team Can Use',
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
        heading: 'Klaviyo Templates Built Around Your Brand',
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
        heading: 'Running SMS Inside Klaviyo',
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
          'Beyond that, stores commonly connect loyalty, subscription, reviews and CRM or customer data platforms so that points balances, renewal dates, review requests and wider customer records can be used in segments and flows. Those are examples rather than a fixed list: we work through the integrations a particular store relies on and connect the ones the retention programme actually needs.',
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
  'shopify-web-design': {
    faqTitle: 'Shopify Store Development',
    hero: {
      eyebrow: 'Shopify & Shopify Plus Engineering',
      heading: 'Custom Shopify Storefront Architecture & Revenue-Driven Commerce Solutions',
      chips: [
        {
          label: 'Custom Shopify Themes',
          href: SERVICE_PAGE_ROUTES.softwareWebDesign,
        },
        {
          label: 'Shopify Plus Architecture',
          href: SERVICE_PAGE_ROUTES.softwarePlus,
        },
        {
          label: 'Conversion Rate Optimization',
          href: SERVICE_PAGE_ROUTES.ecommerceCro,
        },
        {
          label: 'Merchandising & Catalog UX',
          href: SERVICE_PAGE_ROUTES.softwareDevelopment,
        },
        {
          label: 'Core Web Vitals & Speed',
          href: SERVICE_PAGE_ROUTES.contact,
        },
        {
          label: 'Seamless Platform Migrations',
          href: SERVICE_PAGE_ROUTES.softwareMigrations,
        },
      ],
      description:
        'Byte Operator designs, engineers, and scales high-performance Shopify and Shopify Plus storefronts. From custom Liquid 2.0 component libraries and frictionless checkout pathways to catalog migrations and conversion optimization, we create lightning-fast ecommerce experiences engineered to accelerate revenue.',
      primaryCta: {
        label: 'Start Your Shopify Project',
        href: SERVICE_PAGE_ROUTES.contact,
      },
    },
    about: {
      intro: {
        heading:
          'Featured Case Study: High-Converting Store Architecture, CRO & Platform Migration',
        description:
          'Byte Operator develops tailored Shopify storefronts designed to turn high-intent traffic into loyal customers. By combining precision Liquid architecture with data-backed user journeys, automated platform migrations, and sub-second rendering speeds, we enable direct-to-consumer and enterprise commerce leaders to achieve sustainable growth.',
        cta: {
          label: 'View Ecommerce Case Studies',
          href: SERVICE_PAGE_ROUTES.work,
        },
      },
      media: {
        primary:
          'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/shopify_cro_and_migration_store.webp?v=1790407473',
        primaryWidth: 1920,
        primaryHeight: 1080,
        primaryAlt:
          'High-converting Shopify CRO and migration storefront showcase',
        secondary: '',
        secondaryWidth: 0,
        secondaryHeight: 0,
        secondaryAlt: '',
      },
      process: {
        heading: 'Our End-to-End Shopify Engineering & Launch Lifecycle',
        leftDescription:
          '01: Strategy & Commercial Blueprinting\nWe map your target consumer personas, catalog architecture, average order value targets, and merchandising goals before writing a single line of code.\n\n02: High-Performance UI/UX Design\nWe craft sleek, conversion-tested storefront layouts in Figma with intuitive mobile navigation, tactile tap targets, and streamlined product discovery pathways.\n\n03: Custom Liquid 2.0 Theme Architecture\nWe build lightweight, modular section blocks with clean semantic markup, ensuring complete drag-and-drop freedom for your marketing team without runtime code bloat.',
        rightDescription:
          '04: Conversion Funnels & Smart Checkout\nWe integrate slide-out cart drawers, dynamic threshold shipping bars, intelligent upsells, and friction-free payment flows.\n\n05: Core Web Vitals & Technical SEO\nWe optimize Google Core Web Vitals, implement automated WebP/AVIF asset pipelines, and structure rich JSON-LD schemas for maximum organic visibility.\n\n06: End-to-End QA & Zero-Downtime Cutover\nExhaustive cross-browser testing across mobile and desktop devices, payment gateway validation, and flawless DNS cutover.',
        cta: {
          label: 'Discuss Your Shopify Build',
          href: SERVICE_PAGE_ROUTES.contact,
        },
      },
    },
    features: [
      {
        id: 'shopify-cro-and-migration-store',
        layout: 'media-left',
        spacing: 'first',
        theme: 'dark',
        eyebrow: 'Conversion Engineering & Replatforming',
        heading: 'Data-Backed Shopify CRO & Zero-Loss Store Migrations',
        description: [
          'Moving from legacy ecommerce platforms like Magento, WooCommerce, or BigCommerce to Shopify requires meticulous execution to protect historical revenue and search visibility. We migrate product catalogs, customer records, order archives, and URL redirects with complete data integrity.',
          'Every page layout is designed using conversion-first principles: persistent add-to-cart CTAs, real-time inventory indicators, verified reviews, and rapid one-page checkout experiences.',
          'Stores migrated and optimized by Byte Operator consistently experience lower bounce rates, higher average order value, and measurable increases in visitor conversion rates.',
        ],
        buttons: [
          {label: 'Explore CRO Strategies', href: SERVICE_PAGE_ROUTES.ecommerceCro},
        ],
        media: {
          primary:
            'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/shopify_cro_and_migration_store.webp?v=1790407473',
          primaryWidth: 1920,
          primaryHeight: 1080,
          primaryAlt: 'Shopify CRO and Migration Store Showcase',
          secondary: '',
          secondaryWidth: 0,
          secondaryHeight: 0,
          secondaryAlt: '',
          captionTitle: 'Conversion-Optimized Store Rebuild',
          captionText: 'Engineered for sub-second mobile page loads, streamlined cart funnels, and frictionless checkout',
          href: SERVICE_PAGE_ROUTES.work,
        },
      },
      {
        id: 'shopify-toys-store-merchandising',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Visual Discovery & High-Volume Catalogs',
        heading: 'High-Capacity Merchandising for Complex Toy & Lifestyle Catalogs',
        description: [
          'Navigating massive product catalogs should be effortless for customers. We construct intuitive collection hierarchies, faceted age and category filters, interactive gift guides, and dynamic product badges that guide buyers directly to what they need.',
          'Our modular theme framework effortlessly handles tens of thousands of SKUs, high-definition video galleries, and variant matrices without compromising loading speed or responsiveness.',
          'We incorporate bundle configurators, tiered volume discounts, and loyalty incentives directly into the shopping flow to maximize basket size and repeat purchases.',
        ],
        buttons: [
          {label: 'Build High-SKU Architecture', href: SERVICE_PAGE_ROUTES.contact},
        ],
        media: {
          primary:
            'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/toys.webp?v=1790407473',
          primaryWidth: 1920,
          primaryHeight: 1080,
          primaryAlt: 'High-SKU Toys and Lifestyle Storefront Showcase',
          secondary: '',
          secondaryWidth: 0,
          secondaryHeight: 0,
          secondaryAlt: '',
          captionTitle: 'High-Capacity Toy & Lifestyle Storefront',
          captionText: 'Multi-attribute filtering, interactive bundle builders, and rapid collection rendering',
          href: SERVICE_PAGE_ROUTES.work,
        },
      },
      {
        id: 'shopify-furniture-home-store',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'Luxury Aesthetics & Immersive Product Storytelling',
        heading: 'Premium Furniture & Home Decor Storefront Engineering',
        description: [
          'High-consideration purchases demand rich product presentation and seamless confidence builders. We craft editorial lookbooks, curated room collections, and interactive 3D model viewers that bring home furnishings to life.',
          'Product detail pages include dimension diagrams, material and color swatches with instant image updates, estimated delivery timelines, and specialized freight shipping calculations.',
          'Integrated flexible payment options like Shop Pay Installments, Klarna, and Affirm provide transparent checkout financing that turns hesitant browsers into confirmed buyers.',
        ],
        buttons: [
          {label: 'Plan Premium Store Build', href: SERVICE_PAGE_ROUTES.contact},
        ],
        media: {
          primary:
            'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/furniture.webp?v=1790407636',
          primaryWidth: 1920,
          primaryHeight: 1080,
          primaryAlt: 'Premium Furniture and Home Goods Storefront Showcase',
          secondary: '',
          secondaryWidth: 0,
          secondaryHeight: 0,
          secondaryAlt: '',
          captionTitle: 'Luxury Furniture & Home Storefront',
          captionText: 'Interactive material swatch selectors, dimension visualizers, and white-glove shipping integrations',
          href: SERVICE_PAGE_ROUTES.work,
        },
      },
      {
        id: 'shopify-modular-liquid-architecture',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Modular Liquid 2.0 Architecture',
        heading: 'Reusable Drag-and-Drop Sections with Zero Theme Bloat',
        description: [
          'We engineer modular Shopify Online Store 2.0 section systems that empower your internal team to build, adjust, and launch promotional landing pages in minutes directly inside the theme editor.',
          'Unlike generic marketplace themes that ship with bloated external libraries and excess JavaScript scripts, our themes are coded lean, loading only the necessary assets required for the active viewport.',
          'Consistent component design systems ensure that your brand typography, color palettes, spacing standards, and UI behaviors remain unified across every page template.',
        ],
        buttons: [
          {label: 'Start Custom Theme Build', href: SERVICE_PAGE_ROUTES.contact},
        ],
        media: {
          primary:
            'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/shopify_cro_and_migration_store.webp?v=1790407473',
          primaryWidth: 1920,
          primaryHeight: 1080,
          primaryAlt: 'Modular Liquid Theme Architecture Showcase',
          secondary: '',
          secondaryWidth: 0,
          secondaryHeight: 0,
          secondaryAlt: '',
          captionTitle: 'Modular Shopify 2.0 Architecture',
          captionText: 'Custom drag-and-drop section blocks with native customizer flexibility and clean code',
          href: SERVICE_PAGE_ROUTES.work,
        },
      },
      {
        id: 'shopify-core-web-vitals-performance',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'Mobile Performance & Technical Speed',
        heading: 'Sub-Second Page Loads & Google Core Web Vitals Optimization',
        description: [
          'Every millisecond of load latency impacts customer retention and ad spend return on investment. We build stores optimized from the ground up for peak mobile performance.',
          'Our technical optimizations tackle Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and Cumulative Layout Shift (CLS) through critical CSS inlining, intelligent script deferral, and responsive next-gen image serving.',
          'Your storefront delivers lightning-quick performance across 4G and 5G cellular networks, maintaining stability and speed even during high-traffic flash sales and peak seasonal campaigns.',
        ],
        buttons: [
          {label: 'Schedule Performance Audit', href: SERVICE_PAGE_ROUTES.softwareAudits},
        ],
        media: {
          primary:
            'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/furniture.webp?v=1790407636',
          primaryWidth: 1920,
          primaryHeight: 1080,
          primaryAlt: 'Sub-Second Speed and Core Web Vitals Performance',
          secondary: '',
          secondaryWidth: 0,
          secondaryHeight: 0,
          secondaryAlt: '',
          captionTitle: 'Core Web Vitals & Speed Optimization',
          captionText: 'Sub-second mobile rendering, optimized asset delivery pipelines, and zero render blocking',
          href: SERVICE_PAGE_ROUTES.work,
        },
      },
    ],
    faqs: [
      {
        question: 'Why choose a custom Shopify theme over a pre-built marketplace template?',
        answer:
          'Pre-made marketplace templates are loaded with generic scripts, bloated styles, and unnecessary features that slow down page loads and limit customization. A custom Shopify theme is developed specifically around your catalog requirements, branding, and customer buying journey. The result is instant page rendering, superior mobile ergonomics, flexible Online Store 2.0 drag-and-drop sections, and an optimized checkout funnel designed to maximize conversions.',
      },
      {
        question: 'How do you safeguard our SEO rankings and historical customer data during a platform migration?',
        answer:
          'We follow a rigorous replatforming protocol that includes complete 1:1 URL redirect mapping, migration of all meta tags, canonical structures, and structured schema data to preserve your organic search rankings. Product catalogs, customer credentials, and historic orders are securely transferred and validated through staging environments before executing zero-downtime DNS cutover.',
      },
      {
        question: 'Can you create custom product configurators, swatch selectors, and freight shipping calculators?',
        answer:
          'Yes. We engineer native theme components and Shopify Functions for custom bundling rules, tiered volume discounts, dynamic color and texture swatches, dimensional visualizers, and carrier freight calculations without relying on third-party apps that slow down your store.',
      },
      {
        question: 'How do you guarantee our store passes Google Core Web Vitals?',
        answer:
          'We optimize the critical rendering path by inlining essential CSS, deferring non-critical scripts, implementing modern responsive WebP and AVIF image compression, and auditing third-party marketing pixels to achieve green Core Web Vitals (LCP, INP, CLS) metrics on both mobile and desktop.',
      },
      {
        question: 'Do we retain full code ownership and receive team training after launch?',
        answer:
          'Yes. You have 100% ownership of your theme codebase and repository with no recurring agency lock-in fees. Following deployment, we deliver comprehensive video walkthroughs and personalized training sessions to ensure your team can confidently manage sections, merchandise products, and launch new campaigns.',
      },
    ],
    experts: {
      eyebrow: 'Shopify & Shopify Plus Engineering',
      heading: 'Ready to Elevate Your Shopify Storefront?',
      description:
        'Byte Operator designs, builds, and optimizes custom Shopify and Shopify Plus stores that convert. Partner directly with senior ecommerce engineers to plan your store build or redesign.',
      ctaLabel: 'Schedule Your Shopify Consultation',
      ctaTo: SERVICE_PAGE_ROUTES.contact,
      testimonials: [],
    },
    showPartners: false,
  },
  'shopify-plus-agency': {
    faqTitle: 'Shopify Plus & Enterprise',
    hero: {
      eyebrow: 'Shopify Plus & Enterprise Solutions',
      heading: 'Enterprise Shopify Plus Architecture & High-Volume Commerce Solutions',
      chips: [
        {
          label: 'Shopify Plus Architecture',
          href: SERVICE_PAGE_ROUTES.softwarePlus,
        },
        {
          label: 'B2B & Wholesale Systems',
          href: SERVICE_PAGE_ROUTES.softwareDevelopment,
        },
        {
          label: 'Checkout Extensibility',
          href: SERVICE_PAGE_ROUTES.softwareWebDesign,
        },
        {
          label: 'Shopify Markets & Multi-Currency',
          href: SERVICE_PAGE_ROUTES.internationalisation,
        },
        {
          label: 'ERP & Middleware Integrations',
          href: SERVICE_PAGE_ROUTES.softwareIntegrations,
        },
        {
          label: 'High-Concurrency Flash Sales',
          href: SERVICE_PAGE_ROUTES.contact,
        },
      ],
      description:
        'Byte Operator designs, engineers, and scales enterprise Shopify Plus ecosystems for high-growth brands. From custom checkout extensibility and B2B wholesale portals to global multi-currency expansion and real-time ERP integrations, we deliver resilient commerce systems engineered for massive transaction volume.',
      primaryCta: {
        label: 'Discuss Your Enterprise Build',
        href: SERVICE_PAGE_ROUTES.contact,
      },
    },
    about: {
      intro: {
        heading:
          'Featured Enterprise Case Study: Multivendor Architecture & Scalable Platform Ecosystem',
        description:
          'Byte Operator builds scalable Shopify Plus architectures capable of supporting millions of monthly visits, high-concurrency flash sales, and complex multi-channel operations. By uniting modular Liquid 2.0 with decoupled middleware and automated data synchronization, we provide enterprise brands with the speed, stability, and control required to scale globally.',
        cta: {
          label: 'View Enterprise Case Studies',
          href: SERVICE_PAGE_ROUTES.work,
        },
      },
      media: {
        primary:
          'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/manage_products_of_aydi.png?v=1790403225',
        primaryWidth: 1920,
        primaryHeight: 1080,
        primaryAlt:
          'Enterprise Shopify Plus and multivendor platform ecosystem case study',
        secondary: '',
        secondaryWidth: 0,
        secondaryHeight: 0,
        secondaryAlt: '',
      },
      process: {
        heading: 'Our Enterprise Shopify Plus Engineering Lifecycle',
        leftDescription:
          '01: Enterprise Architecture & Systems Audit\nWe assess existing ERP, CRM, WMS, and checkout dependencies to map out a high-throughput, low-latency technical blueprint.\n\n02: High-Performance UI/UX & Conversion Design\nWe craft sleek, mobile-first enterprise storefront layouts in Figma with intuitive product discovery and streamlined purchasing pathways.\n\n03: Modular Liquid 2.0 & Custom Component Engineering\nWe code lightweight section blocks and frontend components that render instantaneously on mobile devices with zero runtime bloat.',
        rightDescription:
          '04: Checkout Extensibility & Shopify Functions\nWe build custom discount engines, delivery validation logic, and post-purchase upsell flows using native Shopify Functions.\n\n05: B2B Wholesale & Multi-Currency Expansion\nWe configure dedicated B2B company accounts, negotiated price lists, Net payment terms, and localized international storefronts.\n\n06: High-Load Stress Testing & Zero-Downtime Launch\nWe execute simulated flash sale traffic spikes, automated regression testing, and manage a seamless DNS cutover with zero downtime.',
        cta: {
          label: 'Plan Your Shopify Plus Build',
          href: SERVICE_PAGE_ROUTES.contact,
        },
      },
    },
    features: [
      {
        id: 'shopify-plus-flash-sales-scalability',
        layout: 'media-left',
        spacing: 'first',
        theme: 'dark',
        eyebrow: 'High-Concurrency Infrastructure',
        heading: 'Engineered for Massive Flash Sales & Peak Concurrency',
        description: [
          'Enterprise direct-to-consumer brands cannot afford storefront downtime or checkout bottlenecks during major product drops, Black Friday Cyber Monday, or viral campaigns.',
          'We engineer lightweight, caching-optimized theme architectures and serverless edge functions capable of handling tens of thousands of simultaneous checkout attempts with zero latency spikes.',
          'Our proactive load-balancing strategies, asset preloading pipelines, and database optimization ensure uninterrupted shopping experiences when traffic surges.',
        ],
        buttons: [
          {label: 'Explore Scalability Architecture', href: SERVICE_PAGE_ROUTES.contact},
        ],
        media: {
          primary:
            'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/shopify_cro_and_migration_store.webp?v=1790407473',
          primaryWidth: 1920,
          primaryHeight: 1080,
          primaryAlt: 'High-concurrency enterprise Shopify Plus storefront showcase',
          secondary: '',
          secondaryWidth: 0,
          secondaryHeight: 0,
          secondaryAlt: '',
          captionTitle: 'High-Concurrency Storefront Engineering',
          captionText: 'Resilient theme architecture engineered for peak traffic drops, instant checkout, and zero downtime',
          href: SERVICE_PAGE_ROUTES.work,
        },
      },
      {
        id: 'shopify-plus-b2b-wholesale-portals',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'B2B Wholesale & Omnichannel Commerce',
        heading: 'Unified B2B & Direct-to-Consumer Wholesale Systems',
        description: [
          'Managing separate systems for retail customers and wholesale buyers adds unnecessary operational overhead. We build unified Shopify Plus environments that support both channels from a single admin.',
          'Wholesale buyers receive dedicated corporate account logins, tiered price lists, custom payment terms (Net 30/60), volume-based discount matrices, and quick order forms.',
          'Automated draft order workflows and ERP-linked credit limits streamline fulfillment and eliminate manual invoice processing.',
        ],
        buttons: [
          {label: 'Discuss B2B Wholesale Architecture', href: SERVICE_PAGE_ROUTES.contact},
          {label: 'Read the Nordic Haven Case Study', href: '/work/nordic-haven'},
        ],
        media: {
          primary:
            'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/manage_orders.png?v=1790403409',
          primaryWidth: 1920,
          primaryHeight: 1080,
          primaryAlt: 'B2B wholesale order management and corporate purchasing portal',
          secondary: '',
          secondaryWidth: 0,
          secondaryHeight: 0,
          secondaryAlt: '',
          captionTitle: 'Unified B2B Wholesale Management',
          captionText: 'Corporate buyer portals, negotiated price lists, automated invoicing, and multi-tier volume discounts',
          href: SERVICE_PAGE_ROUTES.work,
        },
      },
      {
        id: 'shopify-plus-checkout-extensibility-functions',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'Checkout Extensibility & Custom Functions',
        heading: 'Tailored Checkout Extensibility & Custom Backend Logic',
        description: [
          'We transform standard checkout funnels into high-converting conversion engines using Shopify Checkout UI Extensions, web pixels, and custom Shopify Functions.',
          'Our engineers implement dynamic custom delivery rules, localized address validation, tiered cart threshold promotions, and personalized post-purchase upsell offers directly within the native one-page checkout.',
          'By replacing deprecated scripts with lightweight WebAssembly Functions, we deliver lightning-fast checkout processing and future-proof platform compatibility.',
        ],
        buttons: [
          {label: 'Plan Custom Checkout Extensions', href: SERVICE_PAGE_ROUTES.contact},
        ],
        media: {
          primary:
            'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/furniture.webp?v=1790407636',
          primaryWidth: 1920,
          primaryHeight: 1080,
          primaryAlt: 'Custom checkout extensibility and high-AOV product configuration',
          secondary: '',
          secondaryWidth: 0,
          secondaryHeight: 0,
          secondaryAlt: '',
          captionTitle: 'High-Converting Checkout Extensibility',
          captionText: 'Native Shopify Functions for custom bundling, tiered shipping rules, and frictionless one-page checkout',
          href: SERVICE_PAGE_ROUTES.work,
        },
      },
      {
        id: 'shopify-plus-global-markets-international',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Global Commerce & Localization',
        heading: 'Seamless Global Expansion with Shopify Markets',
        description: [
          'Selling internationally requires localized shopping experiences tailored to regional currencies, languages, tax compliance, and local payment preferences.',
          'We architect multi-region setups using Shopify Markets and multi-store expansion architecture, giving international shoppers localized catalog pricing, automatic currency conversion, and regional fulfillment routing.',
          'Integrated duty and tax calculation at checkout eliminates unexpected customs fees, fostering buyer trust and boosting global conversion rates.',
        ],
        buttons: [
          {label: 'Scale Globally with Shopify Markets', href: SERVICE_PAGE_ROUTES.internationalisation},
        ],
        media: {
          primary:
            'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/toys.webp?v=1790407473',
          primaryWidth: 1920,
          primaryHeight: 1080,
          primaryAlt: 'Global multi-region catalog and Shopify Markets expansion',
          secondary: '',
          secondaryWidth: 0,
          secondaryHeight: 0,
          secondaryAlt: '',
          captionTitle: 'Multi-Region Global Expansion',
          captionText: 'Localized international storefronts, automatic currency switching, and automated customs duty calculation',
          href: SERVICE_PAGE_ROUTES.work,
        },
      },
      {
        id: 'shopify-plus-enterprise-api-integrations',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'Enterprise Middleware & Systems Integration',
        heading: 'Real-Time ERP, CRM & Warehouse Management Synchronization',
        description: [
          'Enterprise commerce requires seamless bidirectional data flow between your storefront and mission-critical back-office systems.',
          'We engineer custom webhook event listeners, GraphQL middleware, and API connectors that sync product inventories, order fulfillment statuses, customer records, and return logistics in real time.',
          'We connect platforms like NetSuite, SAP, Microsoft Dynamics 365, Salesforce, Klaviyo, and 3PL fulfillment networks with fault-tolerant retry logic to ensure zero data discrepancy.',
        ],
        buttons: [
          {label: 'Explore Enterprise Integrations', href: SERVICE_PAGE_ROUTES.softwareIntegrations},
        ],
        media: {
          primary:
            'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/third_party_api_endpoints.png?v=1790403408',
          primaryWidth: 1920,
          primaryHeight: 1080,
          primaryAlt: 'Enterprise API endpoint integrations and ERP data synchronization',
          secondary: '',
          secondaryWidth: 0,
          secondaryHeight: 0,
          secondaryAlt: '',
          captionTitle: 'Enterprise API & ERP Middleware',
          captionText: 'Real-time inventory synchronization, automated order routing, and enterprise webhook pipelines',
          href: SERVICE_PAGE_ROUTES.work,
        },
      },
    ],
    faqs: [
      {
        question: 'When should a growing brand upgrade from standard Shopify to Shopify Plus?',
        answer:
          'Upgrading to Shopify Plus makes commercial sense when your brand exceeds high annual revenue thresholds, requires custom checkout extensibility and Shopify Functions, operates dedicated B2B wholesale channels, or sells across multiple international regions with separate localized pricing and inventory.',
      },
      {
        question: 'How do Shopify Functions and Checkout Extensibility improve conversion rates?',
        answer:
          'Shopify Functions execute server-side WebAssembly code with sub-millisecond latency directly inside the Shopify backend. This allows custom discount combinations, automated shipping tier rules, and address validation without relying on slow client-side scripts, resulting in faster checkouts and higher conversion rates.',
      },
      {
        question: 'Can we manage both retail D2C and wholesale B2B from a single Shopify Plus store?',
        answer:
          'Yes. Shopify Plus native B2B allows you to run direct-to-consumer and wholesale operations from a single unified admin. You can configure dedicated company profiles, assign price lists, set minimum order quantities, enable Net payment terms, and provide custom product catalogs to wholesale clients.',
      },
      {
        question: 'How do you handle real-time data sync with enterprise ERPs like NetSuite or SAP?',
        answer:
          'We architect scalable middleware and event-driven webhook pipelines using Node.js and Shopify GraphQL APIs. We implement rate-limit management, automatic retry queues, and automated data validation to ensure orders, inventory counts, and customer records stay synchronized in real time with zero data drift.',
      },
      {
        question: 'How do you ensure zero downtime during major flash sales and product launches?',
        answer:
          'We optimize theme assets, eliminate heavy third-party app scripts, implement server-side caching, and utilize edge-rendered static components. Combined with Shopify Plus infrastructure capable of processing over 10,000 transactions per minute, your store handles high-concurrency traffic without slowdowns.',
      },
    ],
    experts: {
      eyebrow: 'Shopify Plus & Enterprise Solutions',
      heading: 'Ready to Scale Your Enterprise Commerce Platform?',
      description:
        'Byte Operator designs, builds, and scales high-performance Shopify Plus ecosystems. Speak directly with our senior enterprise solutions architects to plan your build or migration.',
      ctaLabel: 'Schedule Enterprise Consultation',
      ctaTo: SERVICE_PAGE_ROUTES.contact,
      testimonials: [],
    },
    showPartners: false,
  },
  'shopify-app-development': {
    faqTitle: 'Shopify Apps & Extensions',
    hero: {
      eyebrow: 'Shopify Apps & Custom Extensions',
      heading: 'Custom Shopify App Development & AI-Powered Performance Architecture',
      chips: [
        {
          label: 'Speedify AI Speed Optimizer',
          href: SERVICE_PAGE_ROUTES.softwareAppDevelopment,
        },
        {
          label: 'Embedded Shopify Polaris Apps',
          href: SERVICE_PAGE_ROUTES.softwareDevelopment,
        },
        {
          label: 'Shopify Functions & Rust Wasm',
          href: SERVICE_PAGE_ROUTES.softwareWebDesign,
        },
        {
          label: 'Checkout UI Extensions',
          href: SERVICE_PAGE_ROUTES.softwarePlus,
        },
        {
          label: 'Real-Time Webhook Pipelines',
          href: SERVICE_PAGE_ROUTES.softwareIntegrations,
        },
        {
          label: 'Core Web Vitals Automation',
          href: SERVICE_PAGE_ROUTES.softwareAudits,
        },
      ],
      description:
        'Byte Operator engineers scalable public and custom Shopify applications, checkout extensions, and backend microservices. Powered by our proprietary Speedify AI Page Speed Optimizer framework, we build high-performance Shopify apps with Remix, Node.js, and Shopify App Bridge that streamline operations and accelerate merchant growth.',
      primaryCta: {
        label: 'Start Your Custom Shopify App',
        href: SERVICE_PAGE_ROUTES.contact,
      },
    },
    about: {
      intro: {
        heading:
          'Featured App Case Study: Speedify AI Page Speed Optimizer & Core Web Vitals Platform',
        description:
          'Speedify is our flagship AI-driven Shopify application engineered to automate page speed optimization, compress high-resolution media in real time, and eliminate render-blocking JavaScript. Built with Remix, Node.js, and Shopify Polaris, Speedify demonstrates how custom application architecture turns complex technical optimizations into seamless one-click merchant workflows.',
        cta: {
          label: 'Explore Custom App Case Studies',
          href: SERVICE_PAGE_ROUTES.work,
        },
      },
      media: {
        primary:
          'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/speedify_landing.webp?v=1790408507',
        primaryWidth: 1920,
        primaryHeight: 1080,
        primaryAlt:
          'Speedify AI Page Speed Optimizer application dashboard showcase',
        secondary: '',
        secondaryWidth: 0,
        secondaryHeight: 0,
        secondaryAlt: '',
      },
      process: {
        heading: 'Our End-to-End Shopify App Engineering Lifecycle',
        leftDescription:
          '01: Architecture & API Scope Blueprinting\nWe define Shopify API permissions, webhook events, database schemas, and microservice topology before writing code.\n\n02: Native Polaris UI/UX Design\nWe design clean, intuitive admin interfaces in Figma following Shopify Polaris design guidelines for a seamless merchant experience.\n\n03: High-Performance Backend & App Bridge\nWe build scalable backends using Remix, Node.js, TypeScript, PostgreSQL, and Shopify App Bridge with automated session token authentication.',
        rightDescription:
          '04: AI Automation & Worker Queue Infrastructure\nWe implement distributed background job queues (Redis/BullMQ) to process heavy workloads like asset compression asynchronously.\n\n05: Edge Functions & Checkout UI Extensions\nWe engineer Rust-powered Shopify Functions and native Checkout UI Extensions that execute with sub-millisecond latency.\n\n06: Shopify App Store Compliance & Production Launch\nWe execute comprehensive automated security testing, OAuth audit verification, and guide your app through Shopify App Store certification.',
        cta: {
          label: 'Discuss Your Shopify App Project',
          href: SERVICE_PAGE_ROUTES.contact,
        },
      },
    },
    features: [
      {
        id: 'speedify-ai-powered-optimization',
        layout: 'media-left',
        spacing: 'first',
        theme: 'dark',
        eyebrow: 'AI-Driven Performance Engine',
        heading: 'Autonomous Image Compression & Next-Gen Media Delivery',
        description: [
          'Speedify utilizes machine learning algorithms to analyze storefront image assets and determine optimal compression ratios without perceptual loss in visual fidelity.',
          'The app automatically converts legacy PNG and JPEG formats into modern WebP and AVIF formats, generates dynamic srcset attributes, and serves localized media directly from edge CDN nodes.',
          'Merchants achieve immediate reductions in total page payload size, slashing mobile Largest Contentful Paint (LCP) and accelerating product page interactions.',
        ],
        buttons: [
          {label: 'Explore Speedify Capabilities', href: SERVICE_PAGE_ROUTES.contact},
          {label: 'Read the Speedify AI Case Study', href: '/work/speedify-ai'},
        ],
        media: {
          primary:
            'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/ai_powered.webp?v=1790408507',
          primaryWidth: 1920,
          primaryHeight: 1080,
          primaryAlt: 'Speedify AI-powered media optimization and compression engine',
          secondary: '',
          secondaryWidth: 0,
          secondaryHeight: 0,
          secondaryAlt: '',
          captionTitle: 'Speedify AI Optimization Engine',
          captionText: 'Intelligent lossless asset compression, automated next-gen format conversion, and edge CDN delivery',
          href: SERVICE_PAGE_ROUTES.work,
        },
      },
      {
        id: 'speedify-embedded-polaris-admin',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Native Polaris UI & Merchant Usability',
        heading: 'Frictionless Embedded Workflows Inside Shopify Admin',
        description: [
          'Merchants should never struggle with disjointed third-party interfaces. Speedify is fully embedded within the Shopify Admin using Shopify App Bridge and the Polaris design framework.',
          'Intuitive toggle controls, one-click optimization triggers, and automated status alerts allow non-technical store owners to manage complex speed enhancements effortlessly.',
          'Real-time toast notifications and background worker status bars keep merchants informed as large catalog asset optimizations process securely in the background.',
        ],
        buttons: [
          {label: 'Build Embedded Shopify Apps', href: SERVICE_PAGE_ROUTES.contact},
        ],
        media: {
          primary:
            'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/speedify_landing.webp?v=1790408507',
          primaryWidth: 1920,
          primaryHeight: 1080,
          primaryAlt: 'Speedify embedded Shopify Polaris admin dashboard',
          secondary: '',
          secondaryWidth: 0,
          secondaryHeight: 0,
          secondaryAlt: '',
          captionTitle: 'Native Shopify Polaris Interface',
          captionText: 'Seamless embedded admin experience with one-click toggles and real-time background task monitoring',
          href: SERVICE_PAGE_ROUTES.work,
        },
      },
      {
        id: 'speedify-script-deferral-diagnostics',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'Script Governance & Diagnostics',
        heading: 'Smart Third-Party Script Optimization & INP Acceleration',
        description: [
          'Bloated analytics trackers, review widgets, and live chat scripts frequently hijack the main JavaScript thread, degrading mobile responsiveness and causing high Interaction to Next Paint (INP) scores.',
          'Speedify intelligently classifies and delays non-critical third-party tracking scripts until after initial user interaction, unblocking the browser render tree for instantaneous first paint.',
          'Comprehensive script diagnostic graphs show merchants exactly which third-party apps are causing performance bottlenecks and provide automated mitigation controls.',
        ],
        buttons: [
          {label: 'Schedule Script Audit', href: SERVICE_PAGE_ROUTES.softwareAudits},
        ],
        media: {
          primary:
            'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/third.webp?v=1790408507',
          primaryWidth: 1920,
          primaryHeight: 1080,
          primaryAlt: 'Speedify script governance and Core Web Vitals diagnostics',
          secondary: '',
          secondaryWidth: 0,
          secondaryHeight: 0,
          secondaryAlt: '',
          captionTitle: 'Smart Script Governance & Diagnostics',
          captionText: 'Automated JavaScript deferral, main-thread unblocking, and Core Web Vitals diagnostic analytics',
          href: SERVICE_PAGE_ROUTES.work,
        },
      },
      {
        id: 'speedify-realtime-analytics-dashboard',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Real-Time Analytics & ROI Tracking',
        heading: 'Automated Core Web Vitals Tracking & Revenue Correlation',
        description: [
          'Speedify provides real-time performance monitoring directly inside the merchant dashboard, tracking mobile and desktop Core Web Vitals (LCP, INP, CLS) alongside historical speed trends.',
          'The app correlates speed improvements with conversion rate lifts, average session durations, and mobile checkout completion rates, demonstrating clear commercial return on optimization.',
          'Automated performance regression alerts notify merchants instantly if a new theme release or third-party app introduces performance degradation.',
        ],
        buttons: [
          {label: 'View Performance Analytics', href: SERVICE_PAGE_ROUTES.contact},
        ],
        media: {
          primary:
            'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/fourth.webp?v=1790408507',
          primaryWidth: 1920,
          primaryHeight: 1080,
          primaryAlt: 'Speedify real-time Core Web Vitals analytics and revenue impact dashboard',
          secondary: '',
          secondaryWidth: 0,
          secondaryHeight: 0,
          secondaryAlt: '',
          captionTitle: 'Real-Time Performance Analytics',
          captionText: 'Automated Core Web Vitals tracking, speed trend reporting, and conversion rate correlation graphs',
          href: SERVICE_PAGE_ROUTES.work,
        },
      },
      {
        id: 'speedify-custom-shopify-functions',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'Shopify Functions & Extensions',
        heading: 'Sub-Millisecond Edge Logic with WebAssembly & Rust',
        description: [
          'Beyond speed optimization tools, we engineer custom public and private Shopify apps tailored to your unique operational requirements.',
          'We build custom Shopify Functions for dynamic discount combinations, custom delivery routing, payment gateway gating, and cart validation running natively on Shopify edge infrastructure.',
          'Our Checkout UI Extensions introduce dynamic upsells, delivery schedule selectors, and address validation directly into the native Shopify Plus one-page checkout.',
        ],
        buttons: [
          {label: 'Build Custom Shopify Functions', href: SERVICE_PAGE_ROUTES.contact},
        ],
        media: {
          primary:
            'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/ai_powered.webp?v=1790408507',
          primaryWidth: 1920,
          primaryHeight: 1080,
          primaryAlt: 'Custom Shopify Functions and edge application logic showcase',
          secondary: '',
          secondaryWidth: 0,
          secondaryHeight: 0,
          secondaryAlt: '',
          captionTitle: 'Native Shopify Functions & Edge Logic',
          captionText: 'Rust-powered WebAssembly logic, Checkout UI Extensions, and fault-tolerant webhook microservices',
          href: SERVICE_PAGE_ROUTES.work,
        },
      },
    ],
    faqs: [
      {
        question: 'What tech stack do you use to build custom Shopify applications?',
        answer:
          'We build modern Shopify apps using Remix, Node.js, TypeScript, and GraphQL APIs, backed by scalable PostgreSQL databases and Redis worker queues. Frontend user interfaces are built with Shopify Polaris and App Bridge for seamless embedding into the Shopify Admin.',
      },
      {
        question: 'How does Speedify optimize Shopify store speed without breaking theme functionality?',
        answer:
          'Speedify operates through intelligent asset pipelines and script governance. It compresses images losslessly, serves next-gen WebP/AVIF formats at the edge, and safely defers non-critical third-party tracking scripts until after user interaction, preserving all theme interactive elements while passing Google Core Web Vitals.',
      },
      {
        question: 'What is the difference between a public Shopify App and a custom private app?',
        answer:
          'A public app is distributed through the Shopify App Store for multiple merchants to install with automated recurring billing. A custom private app is tailored exclusively for your store to solve unique business processes, connect internal ERP/WMS systems, or implement custom checkout rules.',
      },
      {
        question: 'Can you build custom Shopify Functions to replace deprecated checkout.liquid scripts?',
        answer:
          'Yes. We engineer native Shopify Functions using Rust compiled to WebAssembly. These functions run directly on Shopify server infrastructure in under 5 milliseconds to handle custom discount logic, payment methods customization, and shipping tier rules with zero server latency.',
      },
      {
        question: 'Do you assist with Shopify App Store submission and security review?',
        answer:
          'Yes. We handle the entire Shopify App Store certification process, including OAuth compliance, automated billing API integration, webhook verification, GDPR data request endpoints, and performance testing to ensure fast approval.',
      },
    ],
    experts: {
      eyebrow: 'Shopify Apps & Custom Extensions',
      heading: 'Ready to Build a High-Performance Shopify App?',
      description:
        'Byte Operator designs, engineers, and scales custom Shopify applications, Checkout UI Extensions, and automated speed optimization tools. Speak directly with our senior app developers to bring your app vision to life.',
      ctaLabel: 'Schedule App Consultation',
      ctaTo: SERVICE_PAGE_ROUTES.contact,
      testimonials: [],
    },
    showPartners: false,
  },
  'shopify-migrations': {
    faqTitle: 'Platform Migrations',
    hero: {
      eyebrow: 'Shopify Platform & Store Migrations',
      heading: 'Enterprise Platform Replatforming & Zero-Loss Data Migrations',
      chips: [
        {
          label: 'Magento to Shopify',
          href: SERVICE_PAGE_ROUTES.softwareMigrations,
        },
        {
          label: 'WooCommerce to Shopify',
          href: SERVICE_PAGE_ROUTES.softwareMigrations,
        },
        {
          label: 'BigCommerce to Shopify',
          href: SERVICE_PAGE_ROUTES.softwareMigrations,
        },
        {
          label: 'Salesforce to Shopify Plus',
          href: SERVICE_PAGE_ROUTES.softwarePlus,
        },
        {
          label: '1:1 SEO Redirect Mapping',
          href: SERVICE_PAGE_ROUTES.seoMigrations,
        },
        {
          label: 'Zero-Downtime DNS Cutover',
          href: SERVICE_PAGE_ROUTES.contact,
        },
      ],
      description:
        'Byte Operator plans, executes, and scales frictionless ecommerce replatforming to Shopify and Shopify Plus. We migrate complex product catalogs, multi-year customer order histories, and backend ERP connections while strictly safeguarding your Google SEO rankings and traffic.',
      primaryCta: {
        label: 'Plan Your Platform Migration',
        href: SERVICE_PAGE_ROUTES.contact,
      },
    },
    about: {
      intro: {
        heading:
          'Featured Migration Case Study: Zero-Downtime Replatforming, CRO Lift & SEO Preservation',
        description:
          'Replatforming to Shopify Plus unlocks superior reliability, sub-second speed, and higher merchant agility. Byte Operator handles every phase of technical migration: automated ETL data transformation, variant schema mapping, custom theme design, ERP/WMS reconnects, and comprehensive 1:1 301 URL redirect protection.',
        cta: {
          label: 'Explore Migration Case Studies',
          href: SERVICE_PAGE_ROUTES.work,
        },
      },
      media: {
        primary:
          'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/shopify_cro_and_migration_store.webp?v=1790407473',
        primaryWidth: 1920,
        primaryHeight: 1080,
        primaryAlt:
          'Shopify platform migration and store replatforming case study',
        secondary: '',
        secondaryWidth: 0,
        secondaryHeight: 0,
        secondaryAlt: '',
      },
      process: {
        heading: 'Our Risk-Free 6-Stage Platform Migration Lifecycle',
        leftDescription:
          '01: Catalog & Data Architecture Audit\nWe crawl your legacy store database to map product variants, customer metadata, review histories, and legacy URL patterns.\n\n02: Automated ETL Data Pipeline Engineering\nWe build custom transformation scripts to sanitize, format, and stage product catalogs, customer accounts, and historic orders.\n\n03: High-Converting Custom Storefront Design\nWe design and develop a lightning-fast Liquid 2.0 storefront tailored to your brand with conversion-optimized page templates.',
        rightDescription:
          '04: 1:1 SEO Redirect Mapping & Meta Preservation\nWe map 100% of historical URLs to new Shopify paths, preserving canonical structures, structured schema, and organic ranking equity.\n\n05: ERP, CRM & Logistics System Reconnection\nWe test and validate bi-directional webhook and API synchronization with your ERP, 3PL warehouse, and marketing automations.\n\n06: Rehearsed Dry Run & Zero-Downtime Cutover\nWe execute staged test cutovers and delta syncs during low-traffic windows to guarantee zero data loss and uninterrupted trading.',
        cta: {
          label: 'Start Your Migration Roadmap',
          href: SERVICE_PAGE_ROUTES.contact,
        },
      },
    },
    features: [
      {
        id: 'shopify-migrations-full-data',
        layout: 'media-left',
        spacing: 'first',
        theme: 'dark',
        eyebrow: 'Data Integrity & Validation',
        heading: 'Complete Catalog, Customer & Order History Migration',
        description: [
          'Migrating from platforms like Magento, WooCommerce, BigCommerce, or Salesforce requires flawless data extraction and transformation.',
          'We transfer complex multi-variant matrices, custom metafields, customer password activation flows, and historical order records without losing historical context or customer data.',
          'Our automated validation scripts verify data integrity line by line before staging on Shopify Plus.',
        ],
        buttons: [
          {label: 'Discuss Data Migration', href: SERVICE_PAGE_ROUTES.contact},
        ],
        media: {
          primary:
            'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/manage_orders.png?v=1790403409',
          primaryWidth: 1920,
          primaryHeight: 1080,
          primaryAlt: 'Automated order history and customer data migration showcase',
          secondary: '',
          secondaryWidth: 0,
          secondaryHeight: 0,
          secondaryAlt: '',
          captionTitle: 'Comprehensive Data Migration',
          captionText: 'Automated extraction of historical orders, customer accounts, and variant matrices with zero data loss',
          href: SERVICE_PAGE_ROUTES.work,
        },
      },
      {
        id: 'shopify-migrations-seo-protection',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Organic Ranking & Traffic Safety',
        heading: '1:1 301 Redirect Mapping & SEO Equity Preservation',
        description: [
          'Replatforming should accelerate organic search traffic, not cause painful ranking drops. We crawl every existing URL and create verified 301 redirect mappings to corresponding Shopify pages.',
          'We migrate meta tags, structured JSON-LD data, image alt attributes, and canonical hierarchies to maintain search engine visibility from day one.',
          'Post-launch monitoring tracks Google Search Console indexation in real time to catch and resolve any 404 crawl errors immediately.',
        ],
        buttons: [
          {label: 'Explore SEO Migration Support', href: SERVICE_PAGE_ROUTES.seoMigrations},
        ],
        media: {
          primary:
            'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/third_party_api_endpoints.png?v=1790403408',
          primaryWidth: 1920,
          primaryHeight: 1080,
          primaryAlt: 'SEO redirect mapping and technical search preservation',
          secondary: '',
          secondaryWidth: 0,
          secondaryHeight: 0,
          secondaryAlt: '',
          captionTitle: 'SEO Equity & Traffic Preservation',
          captionText: 'Complete 1:1 301 redirect mapping, structured schema migration, and zero organic ranking drop',
          href: SERVICE_PAGE_ROUTES.work,
        },
      },
      {
        id: 'shopify-migrations-catalog-restructure',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'High-Volume Catalog Optimization',
        heading: 'Clean Catalog Restructuring for Tens of Thousands of SKUs',
        description: [
          'Legacy stores often suffer from bloated product taxonomies, duplicate attributes, and inconsistent variant structures.',
          'During migration, we clean, reorganize, and optimize your collection hierarchy, product tags, and custom metafields for high-speed faceted search.',
          'Our lightweight theme framework ensures rapid rendering across large product catalogs without client-side lag.',
        ],
        buttons: [
          {label: 'Optimize High-SKU Catalogs', href: SERVICE_PAGE_ROUTES.contact},
        ],
        media: {
          primary:
            'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/toys.webp?v=1790407473',
          primaryWidth: 1920,
          primaryHeight: 1080,
          primaryAlt: 'High-SKU catalog migration and taxonomy restructuring',
          secondary: '',
          secondaryWidth: 0,
          secondaryHeight: 0,
          secondaryAlt: '',
          captionTitle: 'High-Capacity Catalog Optimization',
          captionText: 'Streamlined product taxonomy, faceted collection filtering, and instant search indexing',
          href: SERVICE_PAGE_ROUTES.work,
        },
      },
      {
        id: 'shopify-migrations-cro-redesign',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Modern Commerce UX & Design',
        heading: 'Conversion-Focused Storefront Redesign & Speed Uplift',
        description: [
          'A platform migration is the ideal opportunity to overhaul dated UX and elevate brand perception with a modern, high-converting storefront design.',
          'We design responsive, mobile-first templates in Figma with dynamic cart drawers, threshold shipping bars, and friction-free one-page checkout.',
          'Migrated stores consistently see significant reductions in bounce rates and double-digit lifts in mobile conversion rates.',
        ],
        buttons: [
          {label: 'Explore CRO Replatforming', href: SERVICE_PAGE_ROUTES.ecommerceCro},
        ],
        media: {
          primary:
            'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/furniture.webp?v=1790407636',
          primaryWidth: 1920,
          primaryHeight: 1080,
          primaryAlt: 'Modern storefront redesign and conversion rate optimization',
          secondary: '',
          secondaryWidth: 0,
          secondaryHeight: 0,
          secondaryAlt: '',
          captionTitle: 'Conversion-Led Storefront Redesign',
          captionText: 'Mobile-first UI/UX engineering, sub-second page rendering, and streamlined checkout pathways',
          href: SERVICE_PAGE_ROUTES.work,
        },
      },
      {
        id: 'shopify-migrations-erp-cutover',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'System Reconnection & Cutover',
        heading: 'Seamless ERP Integration Reconnect & Low-Traffic Cutover',
        description: [
          'Replatforming requires strict synchronization of mission-critical systems like ERPs (NetSuite, SAP), CRMs (Klaviyo), and 3PL warehouses.',
          'We conduct comprehensive staging rehearsals to ensure automated order routing, inventory updates, and tracking numbers sync seamlessly.',
          'Our team conducts the live cutover during low-traffic windows with delta syncs that catch all last-minute transactions with zero operational disruption.',
        ],
        buttons: [
          {label: 'Schedule Migration Consultation', href: SERVICE_PAGE_ROUTES.contact},
        ],
        media: {
          primary:
            'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/manage_products_of_aydi.png?v=1790403225',
          primaryWidth: 1920,
          primaryHeight: 1080,
          primaryAlt: 'ERP synchronization and zero-downtime cutover management',
          secondary: '',
          secondaryWidth: 0,
          secondaryHeight: 0,
          secondaryAlt: '',
          captionTitle: 'Zero-Downtime Replatforming Cutover',
          captionText: 'Flawless ERP data reconciliation, webhook reconnects, and rehearsed DNS transition',
          href: SERVICE_PAGE_ROUTES.work,
        },
      },
    ],
    faqs: [
      {
        question: 'How do you prevent loss of Google search rankings during a platform migration?',
        answer:
          'We crawl every URL on your legacy store to produce a 1:1 301 redirect map matching every old path to its new Shopify equivalent. We also migrate page titles, meta descriptions, canonical structures, and JSON-LD schema so search engines seamlessly transfer page authority without ranking loss.',
      },
      {
        question: 'Can you migrate customer accounts and order histories from our legacy platform?',
        answer:
          'Yes. We extract, clean, and transfer complete customer records, shipping addresses, order histories, and product taxonomies using automated ETL pipelines. For password security, we set up seamless automated account activation workflows for existing customers upon launch.',
      },
      {
        question: 'How do you handle integrations with our existing ERP, CRM, and 3PL systems?',
        answer:
          'We review your existing API workflows and build custom GraphQL connectors or native middleware for platforms like NetSuite, SAP, Brightpearl, Klaviyo, and regional 3PLs. We validate bi-directional inventory and order synchronization on staging before launching.',
      },
      {
        question: 'How long does an enterprise Shopify migration typically take?',
        answer:
          'A typical enterprise platform migration takes between 6 to 12 weeks depending on catalog size, data complexity, custom backend integrations, and custom storefront design requirements. We provide a detailed sprint roadmap and progress milestones throughout.',
      },
      {
        question: 'How do you ensure zero downtime when switching over our domain to Shopify?',
        answer:
          'We perform a delta data synchronization immediately prior to launch to capture any orders placed during testing. Cutover is executed during your lowest traffic window with coordinated TTL and DNS record updates, ensuring zero disruption to live shoppers.',
      },
    ],
    experts: {
      eyebrow: 'Shopify Platform & Store Migrations',
      heading: 'Ready to Migrate Your Store to Shopify with Zero Traffic Loss?',
      description:
        'Byte Operator engineers safe, risk-free migrations to Shopify and Shopify Plus. Speak directly with our senior migration architects to plan your replatforming roadmap.',
      ctaLabel: 'Schedule Migration Consultation',
      ctaTo: SERVICE_PAGE_ROUTES.contact,
      testimonials: [],
    },
    showPartners: false,
  },
  'shopify-b2b-wholesale': {
    faqTitle: 'B2B & Wholesale Systems',
    hero: {
      eyebrow: 'B2B & Wholesale Commerce Systems',
      heading: 'Enterprise Shopify Plus B2B Portals & Wholesale Purchasing Systems',
      chips: [
        {
          label: 'Shopify Plus B2B',
          href: SERVICE_PAGE_ROUTES.softwarePlus,
        },
        {
          label: 'Negotiated Price Lists',
          href: SERVICE_PAGE_ROUTES.softwareDevelopment,
        },
        {
          label: 'Company Account Portals',
          href: SERVICE_PAGE_ROUTES.softwareWebDesign,
        },
        {
          label: 'Net Payment Invoicing',
          href: SERVICE_PAGE_ROUTES.contact,
        },
        {
          label: 'Quick Order Grids & CSVs',
          href: SERVICE_PAGE_ROUTES.softwareAppDevelopment,
        },
        {
          label: 'ERP & WMS Integration',
          href: SERVICE_PAGE_ROUTES.softwareIntegrations,
        },
      ],
      description:
        'Byte Operator builds enterprise-grade B2B wholesale portals and unified omnichannel commerce systems on Shopify Plus. From custom negotiated pricing rules and tiered volume discounts to corporate purchasing permissions and real-time ERP synchronization, we create frictionless wholesale buying experiences that scale.',
      primaryCta: {
        label: 'Discuss Your B2B Architecture',
        href: SERVICE_PAGE_ROUTES.contact,
      },
    },
    about: {
      intro: {
        heading:
          'Featured B2B Case Study: High-Volume Wholesale Order Management & Multivendor Logistics',
        description:
          'Eliminate disconnected wholesale software and unite retail D2C and wholesale B2B operations within a single scalable Shopify Plus admin. Byte Operator engineers custom buyer workflows, automated Net payment terms, matrix quantity selectors, and real-time ERP inventory synchronization to streamline high-volume procurement.',
        cta: {
          label: 'View Wholesale Case Studies',
          href: SERVICE_PAGE_ROUTES.work,
        },
      },
      media: {
        primary:
          'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/manage_orders.png?v=1790403409',
        primaryWidth: 1920,
        primaryHeight: 1080,
        primaryAlt:
          'B2B wholesale order management and purchasing case study',
        secondary: '',
        secondaryWidth: 0,
        secondaryHeight: 0,
        secondaryAlt: '',
      },
      process: {
        heading: 'Our Enterprise B2B Wholesale Implementation Lifecycle',
        leftDescription:
          '01: Commercial Rules & Buyer Journey Mapping\nWe analyze wholesale client tiers, minimum order quantities (MOQs), credit limits, and negotiated discount structures.\n\n02: Corporate Portal UI/UX Design\nWe design streamlined wholesale interfaces in Figma featuring rapid bulk ordering grids, draft order creation, and quote request modals.\n\n03: Custom Price Lists & Quantity Break Engineering\nWe configure fixed and percentage-based price lists assigned to specific company profiles with tiered volume discount logic.',
        rightDescription:
          '04: Payment Terms & Automated Invoicing\nWe enable Net 15/30/60/90 payment terms with automated draft order generation, deposit payments, and automated invoice delivery.\n\n05: Enterprise ERP & Inventory Sync\nWe build bi-directional GraphQL connectors syncing wholesale inventory reservations, customer credit lines, and fulfillment tracking.\n\n06: Client Onboarding & Staff Training\nWe test corporate buying workflows across multi-location buyer accounts and deliver comprehensive operational training to your sales team.',
        cta: {
          label: 'Plan Your B2B Wholesale Portal',
          href: SERVICE_PAGE_ROUTES.contact,
        },
      },
    },
    features: [
      {
        id: 'shopify-b2b-unified-architecture',
        layout: 'media-left',
        spacing: 'first',
        theme: 'dark',
        eyebrow: 'Unified Omnichannel Commerce',
        heading: 'One Unified Platform for Retail & Wholesale Commerce',
        description: [
          'Operating separate platforms for retail consumers and wholesale buyers causes redundant software costs and inventory synchronization headaches.',
          'We configure Shopify Plus native B2B architecture so your team manages product catalogs, stock levels, and customer records from one central dashboard.',
          'Wholesale clients log in to instantly view their custom price lists, assigned payment terms, and personalized product catalogs without leaving your primary domain.',
        ],
        buttons: [
          {label: 'Explore Unified B2B Setups', href: SERVICE_PAGE_ROUTES.contact},
        ],
        media: {
          primary:
            'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/manage_products_of_aydi.png?v=1790403225',
          primaryWidth: 1920,
          primaryHeight: 1080,
          primaryAlt: 'Unified D2C and B2B wholesale platform ecosystem',
          secondary: '',
          secondaryWidth: 0,
          secondaryHeight: 0,
          secondaryAlt: '',
          captionTitle: 'Unified Wholesale Commerce',
          captionText: 'Single Shopify Plus dashboard managing both consumer retail and high-volume wholesale channels',
          href: SERVICE_PAGE_ROUTES.work,
        },
      },
      {
        id: 'shopify-b2b-pricing-matrices',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Granular Pricing Logic',
        heading: 'Automated Price Lists, Tiered Discounts & MOQs',
        description: [
          'Deliver flexible pricing models tailored to specific corporate accounts, distributors, or purchasing groups.',
          'We configure fixed SKU price lists, percentage-based margin discounts, tiered volume breaks, and mandatory minimum order quantities (MOQs).',
          'Dynamic price calculation updates instantly as wholesale buyers adjust order volumes in real time.',
        ],
        buttons: [
          {label: 'Configure Custom Price Lists', href: SERVICE_PAGE_ROUTES.contact},
        ],
        media: {
          primary:
            'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/create_product.png?v=1790403314',
          primaryWidth: 1920,
          primaryHeight: 1080,
          primaryAlt: 'Wholesale pricing rules and custom product configuration',
          secondary: '',
          secondaryWidth: 0,
          secondaryHeight: 0,
          secondaryAlt: '',
          captionTitle: 'Custom Wholesale Price Rules',
          captionText: 'Granular price list assignment, volume discount tiers, and automated minimum order constraints',
          href: SERVICE_PAGE_ROUTES.work,
        },
      },
      {
        id: 'shopify-b2b-quick-order-grids',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'High-Velocity Purchasing',
        heading: 'Quick Order Grids, Matrix Selectors & CSV Uploads',
        description: [
          'Wholesale buyers need fast, efficient tools to order hundreds of SKUs without clicking through individual product pages.',
          'We build matrix-style variant order grids, quick SKU search tables, and instant CSV spreadsheet uploaders that add thousands of units to the cart in seconds.',
          'Re-order tools enable corporate buyers to duplicate historical orders with a single click, drastically accelerating procurement velocity.',
        ],
        buttons: [
          {label: 'Build Quick Order Portals', href: SERVICE_PAGE_ROUTES.contact},
        ],
        media: {
          primary:
            'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/toys.webp?v=1790407473',
          primaryWidth: 1920,
          primaryHeight: 1080,
          primaryAlt: 'High-volume quick order grid and bulk CSV ordering portal',
          secondary: '',
          secondaryWidth: 0,
          secondaryHeight: 0,
          secondaryAlt: '',
          captionTitle: 'High-Speed Bulk Ordering',
          captionText: 'Variant matrix selectors, instant CSV file uploaders, and one-click historical re-ordering',
          href: SERVICE_PAGE_ROUTES.work,
        },
      },
      {
        id: 'shopify-b2b-net-terms-erp',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Payment Terms & Financial Automation',
        heading: 'Automated Net Payment Terms & ERP Financial Synchronization',
        description: [
          'Streamline credit control and eliminate manual invoice chasing with automated payment terms on checkout.',
          'We enable Net 15, 30, 60, or 90 payment options based on customer credit limits, generating automated draft orders and PDF invoices instantly.',
          'Direct integration with ERP and accounting systems (NetSuite, QuickBooks, Xero, SAP) ensures ledger balances and invoice statuses remain perfectly synchronized.',
        ],
        buttons: [
          {label: 'Integrate B2B ERP Systems', href: SERVICE_PAGE_ROUTES.softwareIntegrations},
        ],
        media: {
          primary:
            'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/third_party_api_endpoints.png?v=1790403408',
          primaryWidth: 1920,
          primaryHeight: 1080,
          primaryAlt: 'Automated Net payment terms and ERP accounting sync',
          secondary: '',
          secondaryWidth: 0,
          secondaryHeight: 0,
          secondaryAlt: '',
          captionTitle: 'Automated Net Payment Terms',
          captionText: 'Net 30/60 invoicing, customer credit limits, and real-time ERP accounting synchronization',
          href: SERVICE_PAGE_ROUTES.work,
        },
      },
      {
        id: 'shopify-b2b-company-profiles',
        layout: 'media-left',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'Account Management & Roles',
        heading: 'Multi-User Corporate Accounts & Location-Based Ordering',
        description: [
          'Enterprise clients require complex purchasing hierarchies across multiple branch locations and buying agents.',
          'We configure company accounts that allow client administrators to invite purchasing staff, set spending thresholds, and designate separate billing and delivery addresses per branch.',
          'Order approval workflows ensure high-value wholesale purchases are reviewed by authorized company managers before final processing.',
        ],
        buttons: [
          {label: 'Discuss Corporate Account Features', href: SERVICE_PAGE_ROUTES.contact},
        ],
        media: {
          primary:
            'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/manage_products_of_aydi.png?v=1790403225',
          primaryWidth: 1920,
          primaryHeight: 1080,
          primaryAlt: 'Corporate company profiles and multi-location product management',
          secondary: '',
          secondaryWidth: 0,
          secondaryHeight: 0,
          secondaryAlt: '',
          captionTitle: 'Multi-Location Corporate Accounts',
          captionText: 'Granular buyer seat permissions, location-based shipping routing, and internal order approvals',
          href: SERVICE_PAGE_ROUTES.work,
        },
      },
    ],
    faqs: [
      {
        question: 'Can we run retail D2C and wholesale B2B on the same Shopify Plus store?',
        answer:
          'Yes. Shopify Plus native B2B functionality allows you to run both direct-to-consumer and wholesale operations on a single unified storefront. Wholesale buyers log in to access their unique price lists, payment terms, and custom products, while retail customers browse the public catalog.',
      },
      {
        question: 'How do custom price lists and volume quantity breaks work in Shopify Plus B2B?',
        answer:
          'You can set fixed currency prices or percentage discounts per SKU, assign price lists to specific companies or customer groups, and establish tiered quantity breaks with automated volume discounts and minimum order quantities (MOQs).',
      },
      {
        question: 'How do you automate Net payment terms (Net 30, Net 60) for wholesale clients?',
        answer:
          'We configure native Shopify Plus payment terms on company profiles. When an approved buyer checks out, they can select their pre-approved payment term (e.g. Net 30), generating an automated draft order and invoice with zero immediate credit card charge.',
      },
      {
        question: 'Can corporate clients manage multiple buyer accounts and branch locations?',
        answer:
          'Yes. Company hierarchy settings allow your clients to assign multiple locations, set designated billing and shipping addresses, and invite individual purchasing agents with customized ordering permissions and spending limits.',
      },
      {
        question: 'How does Shopify B2B integrate with back-office ERP and inventory systems?',
        answer:
          'We connect your Shopify Plus B2B store directly to ERPs like NetSuite, SAP, Microsoft Dynamics 365, and Brightpearl via robust GraphQL APIs and webhooks, ensuring real-time inventory allocation, order synchronization, and credit limit tracking.',
      },
    ],
    experts: {
      eyebrow: 'B2B & Wholesale Commerce Systems',
      heading: 'Ready to Scale Your Wholesale Commerce Operations?',
      description:
        'Byte Operator designs, engineers, and scales custom B2B wholesale portals on Shopify Plus. Speak directly with our senior enterprise commerce engineers to plan your B2B architecture.',
      ctaLabel: 'Schedule B2B Consultation',
      ctaTo: SERVICE_PAGE_ROUTES.contact,
      testimonials: [],
    },
    showPartners: false,
  },
  "shopify-internationalisation": {
    faqTitle: "International SEO & Markets",
    hero: {
      eyebrow: "International SEO & Markets",
      heading: "Global search visibility, multi-market setup & localized commerce.",
      description: "Expand internationally with Shopify Markets, localized subfolders, multi-currency checkout, local payment methods, and international technical SEO hreflang infrastructure.",
      chips: [
        "Shopify Markets",
        "Multi-Currency",
        "Localized Storefronts",
        "Hreflang Architecture",
        "Duties & Taxes (DDP)",
      ],
      primaryCta: {
        label: "Get In Touch",
        href: "/contact",
      },
      showPartnerLogos: false,
      showClientProof: false,
    },
    about: {
      intro: {
        heading: "Unlock global ecommerce growth with localized shopping experiences and international search visibility.",
        description: "Selling internationally requires more than basic translation. We help brands configure Shopify Markets, manage regional catalog availability, localize currency and tax calculation, and implement bulletproof international SEO.",
        cta: {
          label: "Get In Touch",
          href: "/contact",
        },
      },
      media: {
        primary: "/images/services/services-wide.webp",
        primaryWidth: 1672,
        primaryHeight: 941,
        primaryAlt: "International SEO and Shopify Markets strategy",
        secondary: "/images/mega-menu-team.webp",
        secondaryWidth: 1970,
        secondaryHeight: 1306,
        secondaryAlt: "Byte Operator global ecommerce team",
      },
      process: {
        heading: "Our international expansion roadmap for scaling ecommerce.",
        leftDescription: "We evaluate regional market opportunity, localized currency requirements, shipping carriers, and tax compliance to establish the optimal Shopify Markets setup.",
        rightDescription: "We configure domain structures (ccTLD vs subfolders), automated IP geolocation redirects, accurate hreflang markup, and market-specific merchandising.",
        cta: {
          label: "Get In Touch",
          href: "/contact",
        },
      },
    },
    features: [
      {
        id: "shopify-intl-markets",
        layout: "media-left",
        spacing: "first",
        theme: "dark",
        eyebrow: "Shopify Markets",
        heading: "Multi-Region Catalogs & Dynamic Currency Conversion",
        description: [
          "Configure distinct international markets with tailored product availability, pricing rules, and localized promotional banners.",
          "Present automatic local currency formatting and price rounding across 130+ global currencies.",
        ],
        buttons: [{label: "Get In Touch", href: SERVICE_PAGE_ROUTES.contact}],
        media: reuseHomeFeatureMedia("software-internationalisation"),
      },
      {
        id: "shopify-intl-seo",
        layout: "media-right",
        spacing: "standard",
        theme: "dark",
        eyebrow: "International Technical SEO",
        heading: "Multi-Language Hreflang Architecture & Global Indexation",
        description: [
          "Ensure search engines serve the right regional URL to international users without duplicate content penalties.",
          "We implement complete hreflang tags, localized XML sitemaps, country-specific canonical URLs, and localized schema structured data.",
        ],
        buttons: [{label: "Explore SEO Services", href: "/ecommerce-seo-agency"}],
        media: reuseHomeFeatureMedia("software-seo-geo"),
      },
      {
        id: "shopify-intl-checkout",
        layout: "media-left",
        spacing: "deep",
        theme: "dark",
        eyebrow: "Local Payments & Duties",
        heading: "Regional Payment Gateways & Transparent Duties at Checkout",
        description: [
          "Boost global conversion rates by offering preferred local payment methods (iDEAL, Klarna, Bancontact, Boleto, WeChat Pay).",
          "Calculate and collect international customs, duties, and import taxes upfront (DDP) so customers experience zero unexpected delivery fees.",
        ],
        buttons: [{label: "Get In Touch", href: SERVICE_PAGE_ROUTES.contact}],
        media: reuseHomeFeatureMedia("software-cro"),
      },
      {
        id: "shopify-intl-logistics",
        layout: "media-right",
        spacing: "standard",
        theme: "dark",
        eyebrow: "Global Fulfillment & 3PL",
        heading: "Multi-Warehouse Inventory Routing & Carrier Integration",
        description: [
          "Connect multiple regional 3PL fulfillment centers to route orders to the closest warehouse automatically.",
          "Display accurate localized shipping times and real-time carrier rates based on customer geolocation.",
        ],
        buttons: [{label: "Get In Touch", href: SERVICE_PAGE_ROUTES.contact}],
        media: reuseHomeFeatureMedia("software-migrations"),
      },
    ],
    showPartners: true,
  },
  "shopify-audits": {
    faqTitle: "Performance & Speed Audits",
    hero: {
      eyebrow: "Performance & Speed Audits",
      heading: "Shopify Speed & Core Web Vitals Audits",
      description: "Deep technical analysis of your Shopify theme, apps, third-party scripts, and asset delivery. We identify bottlenecks and deliver actionable code-level fixes to maximize page speed and conversion rates.",
      chips: [
        "Core Web Vitals (LCP, INP, CLS)",
        "Theme Code Optimization",
        "App Impact Review",
        "Script Minimization",
        "Asset Compression",
      ],
      primaryCta: {
        label: "Request an Audit",
        href: "/contact",
      },
      showPartnerLogos: false,
      showClientProof: false,
    },
    about: {
      intro: {
        heading: "Turn slow load times into high-velocity ecommerce performance.",
        description: "Every 100ms delay in page speed harms conversion rates and search rankings. Byte Operator conducts comprehensive technical audits to uncover unoptimized JavaScript, render-blocking resources, and bloated Liquid code.",
        cta: {
          label: "Get In Touch",
          href: "/contact",
        },
      },
      media: {
        primary: "/images/services/services-wide.webp",
        primaryWidth: 1672,
        primaryHeight: 941,
        primaryAlt: "Performance and speed audit analysis",
        secondary: "/images/mega-menu-team.webp",
        secondaryWidth: 1970,
        secondaryHeight: 1306,
        secondaryAlt: "Engineering team reviewing performance audit",
      },
      process: {
        heading: "Our granular performance audit and remediation workflow.",
        leftDescription: "We conduct real-world user monitoring (RUM) and lab testing across mobile and desktop devices. We analyze theme liquid rendering, third-party app payload, and asset pipeline efficiency.",
        rightDescription: "You receive a detailed technical report with prioritized code fixes, estimated performance gains, and an actionable roadmap for achieving green Core Web Vitals.",
        cta: {
          label: "Get In Touch",
          href: "/contact",
        },
      },
    },
    features: [
      {
        id: "shopify-audits-vitals",
        layout: "media-left",
        spacing: "first",
        theme: "dark",
        eyebrow: "Core Web Vitals",
        heading: "Deep Analysis of LCP, INP & CLS Metrics",
        description: [
          "We analyze real user field data and lab Lighthouse diagnostics to identify the exact elements dragging down your Largest Contentful Paint (LCP) and Interaction to Next Paint (INP).",
          "We provide concrete code refactoring steps to eliminate layout shifts (CLS) and ensure sub-second interaction responsiveness.",
        ],
        buttons: [{label: "Get In Touch", href: SERVICE_PAGE_ROUTES.contact}],
        media: reuseHomeFeatureMedia("software-development"),
      },
      {
        id: "shopify-audits-apps",
        layout: "media-right",
        spacing: "standard",
        theme: "dark",
        eyebrow: "Third-Party Script Audit",
        heading: "Eliminate Ghost Code & Heavy Tracking Payloads",
        description: [
          "Old uninstalled Shopify apps often leave behind orphaned scripts that execute on every page load, draining mobile CPU performance.",
          "We audit all third-party tracking tags, marketing pixels, and app embeds, removing redundant code and deferring non-critical scripts.",
        ],
        buttons: [
          {label: "Get In Touch", href: SERVICE_PAGE_ROUTES.contact},
          {label: "See Speedify AI, Our Performance App", href: "/work/speedify-ai"},
        ],
        media: reuseHomeFeatureMedia("software-seo-geo"),
      },
      {
        id: "shopify-audits-liquid",
        layout: "media-left",
        spacing: "deep",
        theme: "dark",
        eyebrow: "Liquid & Asset Optimization",
        heading: "Server-Side Rendering Speed & Media Compression",
        description: [
          "Inefficient Liquid code loops and nested render tags can add hundreds of milliseconds to Time to First Byte (TTFB).",
          "We refactor backend Liquid logic, convert product imagery to WebP/AVIF formats, and optimize responsive srcset breakpoints for mobile shoppers.",
        ],
        buttons: [{label: "Get In Touch", href: SERVICE_PAGE_ROUTES.contact}],
        media: reuseHomeFeatureMedia("software-design"),
      },
    ],
    showPartners: true,
  },
  "shopify-consultant": {
    faqTitle: "Architecture & Tech Consulting",
    hero: {
      eyebrow: "Architecture & Tech Consulting",
      heading: "Senior guidance on platform architecture, tech stack & growth strategy.",
      description: "Work alongside senior ecommerce architects and engineering leads to plan your technical roadmap, evaluate third-party software, architect high-volume systems, and optimize developer workflows.",
      chips: [
        "Architecture Strategy",
        "Shopify Plus Consulting",
        "Integration Planning",
        "Tech Stack Audits",
        "CTO Advisory",
      ],
      primaryCta: {
        label: "Book Advisory Session",
        href: "/contact",
      },
      showPartnerLogos: false,
      showClientProof: false,
    },
    about: {
      intro: {
        heading: "Strategic engineering guidance for enterprise ecommerce leaders.",
        description: "Making the right technology choices saves hundreds of thousands in development rework. Byte Operator provides independent, senior-level technical advisory to help ambitious brands scale with confidence.",
        cta: {
          label: "Get In Touch",
          href: "/contact",
        },
      },
      media: {
        primary: "/images/services/services-wide.webp",
        primaryWidth: 1672,
        primaryHeight: 941,
        primaryAlt: "Ecommerce technical consulting session",
        secondary: "/images/mega-menu-team.webp",
        secondaryWidth: 1970,
        secondaryHeight: 1306,
        secondaryAlt: "Senior technical consultant advising team",
      },
      process: {
        heading: "Pragmatic consulting grounded in real-world engineering execution.",
        leftDescription: "We audit your existing tech stack, developer workflows, operational bottlenecks, and business goals. We provide clear technical recommendations without vendor bias.",
        rightDescription: "We deliver comprehensive architecture blueprints, RFP specifications, integration schematics, and ongoing sprint advisory for your leadership team.",
        cta: {
          label: "Get In Touch",
          href: "/contact",
        },
      },
    },
    features: [
      {
        id: "shopify-consultant-architecture",
        layout: "media-left",
        spacing: "first",
        theme: "dark",
        eyebrow: "Platform & Tech Architecture",
        heading: "Headless vs Monolith & Microservices Strategy",
        description: [
          "Choosing between Shopify Liquid, Hydrogen headless, or hybrid composable setups requires evaluating developer overhead against commercial upside.",
          "We provide clear, pragmatic architecture recommendations tailored to your internal team capacity, budget, and 3-year growth plans.",
        ],
        buttons: [{label: "Get In Touch", href: SERVICE_PAGE_ROUTES.contact}],
        media: reuseHomeFeatureMedia("software-plus"),
      },
      {
        id: "shopify-consultant-integrations",
        layout: "media-right",
        spacing: "standard",
        theme: "dark",
        eyebrow: "Ecosystem & Tool Evaluation",
        heading: "Selecting the Right ERP, PIM, WMS & Marketing Stack",
        description: [
          "Avoid costly software subscription traps. We help you evaluate, benchmark, and select third-party enterprise tools that integrate seamlessly with your platform.",
          "We draft technical RFP specifications, review vendor contracts, and validate integration capabilities before you commit.",
        ],
        buttons: [{label: "Get In Touch", href: SERVICE_PAGE_ROUTES.contact}],
        media: reuseHomeFeatureMedia("software-development"),
      },
      {
        id: "shopify-consultant-scaling",
        layout: "media-left",
        spacing: "deep",
        theme: "dark",
        eyebrow: "High-Volume Scaling",
        heading: "Flash Sale Readiness & Concurrency Architecture",
        description: [
          "Architect your store to handle tens of thousands of concurrent checkout requests during BFCM and flash product drops without downtime.",
          "We optimize inventory locking, edge caching, database query indexing, and checkout throttling for maximum reliability.",
        ],
        buttons: [{label: "Get In Touch", href: SERVICE_PAGE_ROUTES.contact}],
        media: reuseHomeFeatureMedia("software-support-growth"),
      },
    ],
    showPartners: true,
  },

  /*
   * SaaS & MVP development. Early-stage product focus; enterprise and
   * bespoke platforms stay on /services/software-developers. Built only from
   * capabilities stated elsewhere on the site (Collabix build process, stack,
   * IP terms). No timelines, prices or results.
   */
  'saas-mvp-development': {
    faqTitle: 'SaaS & MVP Development FAQs',
    showTestimonial: false,
    hero: {
      eyebrow: 'SaaS & MVP Development',
      heading: 'SaaS & MVP Development Services',
      description:
        'Byte Operator plans, designs and builds SaaS products and MVPs, from scoping the first release to the architecture, integrations and cloud infrastructure a product needs to grow.',
      chips: ['MVP Scoping', 'Product UX', 'SaaS Architecture', 'Integrations', 'Cloud Deployment'],
      primaryCta: {label: 'Discuss Your Product', href: '/contact'},
      showPartnerLogos: false,
      showClientProof: false,
    },
    about: {
      intro: {
        heading: 'From First Release to Scalable Product',
        description:
          'An MVP should prove the core idea with real users, without painting the product into a corner. We help you decide what belongs in the first release and what can wait, then build it on an architecture that can carry the product as it grows, so version two does not start with a rewrite.',
        cta: {label: 'Discuss Your Product', href: '/contact'},
      },
      media: {
        primary: 'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/custom_software_case_study.png?v=1790400442',
        primaryWidth: 1920,
        primaryHeight: 1080,
        primaryAlt: 'SaaS platform architecture and product dashboard',
        secondary: '',
        secondaryWidth: 0,
        secondaryHeight: 0,
        secondaryAlt: '',
      },
      process: {
        heading: 'How We Build SaaS Products & MVPs',
        leftDescription:
          '01: Discovery & Scoping\nWe map the users, the core workflows and the problem the product solves, then separate must-have features from later ones.\n\n02: Product UX\nUser journeys, wireframes and interface design for the workflows that matter most.\n\n03: Architecture\nData model, multi-tenancy, roles and permissions, and integrations are planned before build starts.',
        rightDescription:
          '04: Build & Test\nFront end, back end and APIs, with automated tests from the start.\n\n05: Deploy\nCI/CD pipelines and cloud infrastructure so releases are repeatable.\n\n06: Learn & Extend\nShip, see how people use the product, and plan the next release from real usage.',
        cta: {label: 'Start Your Product Build', href: '/contact'},
      },
    },
    features: [
      {
        id: 'saas-mvp-scoping',
        layout: 'media-left',
        spacing: 'first',
        theme: 'dark',
        eyebrow: 'MVP Planning',
        heading: 'Scoping an MVP That Tests the Idea',
        description: [
          'The fastest route to a useful product is a first release focused on the one job users need done. We work through the workflows, users and edge cases with you and agree what the MVP includes before any code is written.',
          'Clear scope also makes the estimate reliable: a better use of budget than building features nobody has asked for yet.',
        ],
        buttons: [
          {label: 'Discuss Your Product', href: SERVICE_PAGE_ROUTES.contact},
          {label: 'Custom Software Cost Guide', href: '/articles/custom-software-development-cost'},
        ],
        media: {
          primary: 'https://cdn.shopify.com/s/files/1/0928/7421/1691/files/8.png?v=1789644057',
          primaryWidth: 1920,
          primaryHeight: 1080,
          primaryAlt: 'SaaS product dashboard designed during MVP planning',
          secondary: '',
          secondaryWidth: 0,
          secondaryHeight: 0,
          secondaryAlt: '',
          captionTitle: 'Product Planning',
          captionText: 'Core workflows, users and first-release scope agreed up front',
          href: SERVICE_PAGE_ROUTES.work,
        },
      },
      {
        id: 'saas-mvp-architecture',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'SaaS Architecture',
        heading: 'Architecture Built for Growth',
        description: [
          'SaaS products need decisions made early: how tenants are separated, how roles and permissions work, and how data is secured. We design these in from the first release.',
          'Our core stack is React, Next.js and TypeScript on the front end, Node.js, Python or Go on the back end, PostgreSQL, Redis or MongoDB for data, and Docker, Kubernetes, AWS or GCP for infrastructure.',
        ],
        buttons: [{label: 'Explore Headless & Cloud Architecture', href: '/services/headless-commerce'}],
        media: {
          primary: 'https://cdn.shopify.com/s/files/1/0928/7421/1691/files/COLLABIX_SECOND.png?v=1789642386',
          primaryWidth: 1920,
          primaryHeight: 1080,
          primaryAlt: 'Multi-tenant SaaS cloud architecture',
          secondary: '',
          secondaryWidth: 0,
          secondaryHeight: 0,
          secondaryAlt: '',
          captionTitle: 'Multi-Tenant Architecture',
          captionText: 'Role-based access control, secure data layers and cloud infrastructure',
          href: SERVICE_PAGE_ROUTES.work,
        },
      },
      {
        id: 'saas-mvp-integrations',
        layout: 'media-left',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'Integrations',
        heading: 'Connected to the Tools Your Users Rely On',
        description: [
          'Most products need to talk to other systems: payments, CRMs, ERPs, email and analytics. We build those connections through APIs and webhooks as part of the product, not as an afterthought.',
        ],
        buttons: [{label: 'Explore API & System Integrations', href: '/services/software-integrations'}],
        media: {
          primary: 'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/n8n.webp?v=1790409457',
          primaryWidth: 1920,
          primaryHeight: 1080,
          primaryAlt: 'API and system integrations for a SaaS product',
          secondary: '',
          secondaryWidth: 0,
          secondaryHeight: 0,
          secondaryAlt: '',
          captionTitle: 'API Integrations',
          captionText: 'Payments, CRM, ERP and analytics connected through APIs and webhooks',
          href: SERVICE_PAGE_ROUTES.work,
        },
      },
      {
        id: 'saas-mvp-collabix',
        layout: 'media-right',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'Related Work',
        heading: 'Case Study: Collabix SaaS Platform',
        description: [
          'For Collabix, Byte Operator designed and built a collaborative SaaS platform covering real-time collaboration, an event-driven back end and the cloud infrastructure it runs on.',
        ],
        buttons: [{label: 'Read the Collabix Case Study', href: '/work/collabix'}],
        media: {
          primary: 'https://cdn.shopify.com/s/files/1/0928/7421/1691/files/6.png?v=1789643508',
          primaryWidth: 1920,
          primaryHeight: 1080,
          primaryAlt: 'Collabix SaaS platform workload dashboard',
          secondary: '',
          secondaryWidth: 0,
          secondaryHeight: 0,
          secondaryAlt: '',
          captionTitle: 'Collabix',
          captionText: 'Collaborative SaaS platform built by Byte Operator',
          href: '/work/collabix',
        },
      },
    ],
    faqs: [
      {
        question: 'What is the difference between an MVP and a full SaaS product?',
        answer:
          'An MVP is the smallest version of the product that lets real users complete the core job, so you can learn before investing further. A full SaaS product adds the wider feature set, administration, billing and scale work once the core is proven.',
      },
      {
        question: 'Do you work with early-stage founders?',
        answer:
          'Yes. We work with founders and product teams to scope, design and build first releases, as well as with established businesses building new products.',
      },
      {
        question: 'Who owns the source code?',
        answer:
          'You own the custom source code, architecture, database schemas and design assets created for the project upon settlement, with a full repository handover and documentation.',
      },
      {
        question: 'How long does an MVP take and what does it cost?',
        answer:
          'It depends on the scope agreed during discovery: the number of workflows, user types and integrations. We give you an estimate once the scope is clear, and our custom software cost guide explains the factors involved.',
      },
      {
        question: 'Can you add AI features to our product?',
        answer:
          'Yes. We integrate large language models and AI assistants into products; see our AI application development service.',
      },
    ],
    experts: {
      eyebrow: 'SaaS & MVP Development',
      heading: 'Planning a new SaaS product or MVP?',
      description: 'Book a call to talk through your product, your users and what the first release needs to include.',
      ctaLabel: 'Book a Product Call',
      testimonials: [],
    },
  },

  /*
   * AI application development: AI features inside software products.
   * Distinct from /services/ai-automations-agents (operational workflows).
   * Built from the AI stack stated on the site (OpenAI, Anthropic, LangChain,
   * LlamaIndex, RAG & vector knowledge bases) and Replex Engine (in-house).
   * Byte Operator integrates existing models; it does not train its own.
   */
  'ai-application-development': {
    faqTitle: 'AI Application Development FAQs',
    showTestimonial: false,
    hero: {
      eyebrow: 'AI Application Development',
      heading: 'AI Application Development & LLM Integration',
      description:
        'Byte Operator builds AI features into software products: large language model integrations, AI assistants and chat interfaces, and retrieval-augmented generation (RAG) that answers from your own data.',
      chips: ['LLM Integration', 'AI Assistants & Chat', 'RAG & Knowledge Bases', 'OpenAI & Anthropic APIs', 'Human-in-the-Loop Controls'],
      primaryCta: {label: 'Discuss Your AI Feature', href: '/contact'},
      showPartnerLogos: false,
      showClientProof: false,
    },
    about: {
      intro: {
        heading: 'AI Inside Your Product',
        description:
          'This service is about the AI your users interact with: an assistant inside your app, search that understands questions, or a feature that drafts, summarises or classifies. If you want AI to run internal operations and workflows behind the scenes instead, see our AI automations and autonomous agents service.',
        cta: {label: 'Explore AI Automations & Agents', href: '/services/ai-automations-agents'},
      },
      media: {
        primary: 'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/ai_powered.webp?v=1790408507',
        primaryWidth: 1920,
        primaryHeight: 1080,
        primaryAlt: 'AI features integrated into a software product',
        secondary: '',
        secondaryWidth: 0,
        secondaryHeight: 0,
        secondaryAlt: '',
      },
      process: {
        heading: 'How We Build AI Features',
        leftDescription:
          '01: Use Case\nWe define what the AI feature should do, for whom, and how you will know it is working.\n\n02: Data & Knowledge\nWe identify the documents, product data or records the feature should draw on, and who is allowed to see what.\n\n03: Architecture\nWe choose the model provider and design the retrieval pipeline and prompts around your use case.',
        rightDescription:
          '04: Build & Integrate\nAPI integration, the user interface and the connections to your existing application.\n\n05: Controls\nHuman review where decisions matter, logging, and access controls on the data the feature can use.\n\n06: Launch & Monitor\nWe release, monitor quality and usage costs, and refine the feature from real use.',
        cta: {label: 'Discuss Your AI Feature', href: '/contact'},
      },
    },
    features: [
      {
        id: 'ai-app-llm-integration',
        layout: 'media-left',
        spacing: 'first',
        theme: 'dark',
        eyebrow: 'LLM Integration',
        heading: 'Large Language Models, Integrated Properly',
        description: [
          'We integrate models from providers such as OpenAI and Anthropic into your application through their APIs, with the prompts, structured outputs and error handling a production feature needs.',
          'We do not train proprietary foundation models; we build on proven ones and focus on making them useful and reliable inside your product.',
        ],
        buttons: [{label: 'Discuss Your AI Feature', href: SERVICE_PAGE_ROUTES.contact}],
        media: {
          primary: 'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/ai_powered.webp?v=1790408507',
          primaryWidth: 1920,
          primaryHeight: 1080,
          primaryAlt: 'Large language model integration in an application',
          secondary: '',
          secondaryWidth: 0,
          secondaryHeight: 0,
          secondaryAlt: '',
          captionTitle: 'LLM Integration',
          captionText: 'OpenAI and Anthropic models integrated through their APIs',
          href: SERVICE_PAGE_ROUTES.work,
        },
      },
      {
        id: 'ai-app-assistants',
        layout: 'media-right',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'AI Assistants & Chat',
        heading: 'AI Assistants and Chat Interfaces',
        description: [
          'Assistants that answer questions, guide users through tasks or help your team work faster, built into your product with a chat interface that fits your design.',
        ],
        buttons: [{label: 'Discuss Your AI Feature', href: SERVICE_PAGE_ROUTES.contact}],
        media: {
          primary: 'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/manage_orders.png?v=1790403409',
          primaryWidth: 1920,
          primaryHeight: 1080,
          primaryAlt: 'AI assistant answering customer questions',
          secondary: '',
          secondaryWidth: 0,
          secondaryHeight: 0,
          secondaryAlt: '',
          captionTitle: 'AI Assistants',
          captionText: 'Conversational assistants built into your application',
          href: SERVICE_PAGE_ROUTES.work,
        },
      },
      {
        id: 'ai-app-rag',
        layout: 'media-left',
        spacing: 'standard',
        theme: 'dark',
        eyebrow: 'RAG & Knowledge Bases',
        heading: 'Answers Grounded in Your Own Data',
        description: [
          'Retrieval-augmented generation (RAG) lets an AI feature look up your documents, product data or records before it answers, so responses are based on your information rather than the model’s general knowledge.',
          'We build these pipelines with tools such as LangChain and LlamaIndex and vector knowledge bases, with access controls on what each user can retrieve.',
        ],
        buttons: [{label: 'Discuss Your AI Feature', href: SERVICE_PAGE_ROUTES.contact}],
        media: {
          primary: 'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/n8n.webp?v=1790409457',
          primaryWidth: 1920,
          primaryHeight: 1080,
          primaryAlt: 'Retrieval pipeline connecting an AI feature to company data',
          secondary: '',
          secondaryWidth: 0,
          secondaryHeight: 0,
          secondaryAlt: '',
          captionTitle: 'Retrieval Pipelines',
          captionText: 'Documents and records indexed in a vector knowledge base',
          href: SERVICE_PAGE_ROUTES.work,
        },
      },
      {
        id: 'ai-app-replex',
        layout: 'media-right',
        spacing: 'deep',
        theme: 'dark',
        eyebrow: 'Related Work',
        heading: 'Built on What We Use Ourselves',
        description: [
          'Replex Engine, Byte Operator’s own AI product, is an autonomous lead response system trained on brand knowledge that replies to and qualifies inbound enquiries.',
        ],
        buttons: [{label: 'Read About Replex Engine', href: '/work/replex-engine'}],
        media: {
          primary: 'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/replex.png?v=1790409470',
          primaryWidth: 1920,
          primaryHeight: 1080,
          primaryAlt: 'Replex Engine AI lead response dashboard',
          secondary: '',
          secondaryWidth: 0,
          secondaryHeight: 0,
          secondaryAlt: '',
          captionTitle: 'Replex Engine',
          captionText: 'In-house AI product built by Byte Operator',
          href: '/work/replex-engine',
        },
      },
    ],
    faqs: [
      {
        question: 'How is this different from AI automation?',
        answer:
          'AI application development adds AI features that your users interact with inside a product. AI automation uses agents and workflows to run business operations behind the scenes. Many projects combine both.',
      },
      {
        question: 'Which AI models do you work with?',
        answer:
          'We integrate models from providers such as OpenAI and Anthropic through their APIs, and choose the model for each feature based on the task.',
      },
      {
        question: 'Do you build your own AI models?',
        answer:
          'No. We build on existing foundation models and focus on integrating them into your product with the right data, prompts and controls.',
      },
      {
        question: 'Can AI answer questions from our own documents?',
        answer:
          'Yes. Retrieval-augmented generation (RAG) lets the feature look up your documents or records before answering, with access controls on what each user can see.',
      },
      {
        question: 'Can you add AI to an existing application?',
        answer:
          'Yes. Most AI features are added to existing applications through APIs, alongside the product you already have.',
      },
    ],
    experts: {
      eyebrow: 'AI Application Development',
      heading: 'Planning an AI feature for your product?',
      description: 'Book a call to talk through the use case, the data it needs and how it fits into your application.',
      ctaLabel: 'Book an AI Product Call',
      testimonials: [],
    },
  },
} as const satisfies Record<string, ServicePageConfig>;

export type ServicePageHandle = keyof typeof SERVICE_PAGE_CONFIGS;
