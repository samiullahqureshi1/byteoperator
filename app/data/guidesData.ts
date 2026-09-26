export interface TechnicalGuide {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  category: 'Architecture & Next.js' | 'CRO & UX Frameworks' | 'SEO & AI Optimization' | 'Migration & Scale';
  featured?: boolean;
  pagesCount: number;
  readTime: string;
  downloadFormat: 'PDF' | 'ZIP Pack' | 'Interactive Kit';
  fileSize: string;
  publishedAt: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  overview: string;
  targetAudience: string[];
  tableOfContents: string[];
  includedAssets: {
    name: string;
    type: string;
  }[];
  executiveSummary: string;
  badgeText: string;
}

export const GUIDE_CATEGORIES = [
  'All Guides',
  'Architecture & Next.js',
  'CRO & UX Frameworks',
  'SEO & AI Optimization',
  'Migration & Scale',
] as const;

export const GUIDES_DATA: TechnicalGuide[] = [
  {
    id: 'guide-01',
    title: 'The 2026 Enterprise Headless Commerce & Next.js Architecture Blueprint',
    slug: 'enterprise-headless-commerce-nextjs-architecture-blueprint',
    subtitle: 'The definitive 120-page engineering guide to building sub-second composable storefronts with Next.js App Router, GraphQL Storefront API, and Edge Middleware.',
    category: 'Architecture & Next.js',
    featured: true,
    pagesCount: 124,
    readTime: '45 min read',
    downloadFormat: 'PDF',
    fileSize: '8.4 MB',
    publishedAt: 'September 2026',
    author: {
      name: 'Sami Ullah Qureshi',
      role: 'Chief Technology Officer',
      avatar: '/images/about/team-01.webp',
    },
    badgeText: 'Flagship Blueprint',
    overview:
      'A comprehensive reference manual written for CTOs, Lead Engineers, and VP of E-Commerce scaling past $10M+ GMV. Contains production-tested architectures, state management patterns, caching strategies, and CI/CD pipelines.',
    targetAudience: [
      'Chief Technology Officers & VP of Engineering',
      'Lead Full-Stack & Frontend Engineers',
      'Ecommerce Solutions Architects',
      'Technical Product Managers',
    ],
    tableOfContents: [
      'Chapter 1: Composable vs Monolithic Commerce: Total Cost of Ownership (TCO) & ROI Modeling',
      'Chapter 2: Next.js App Router Fundamentals: React Server Components (RSC) vs Client Islands',
      'Chapter 3: GraphQL Storefront API Optimization & Sub-50ms Edge Caching',
      'Chapter 4: Incremental Static Regeneration (ISR) & Webhook-Driven Revalidation',
      'Chapter 5: Cart State Persistence, Optimistic UI Updates, and Checkout Extensibility',
      'Chapter 6: International Multi-Currency, Localization, and Geo-Routing at the Edge',
      'Chapter 7: Zero-Downtime Migration Playbook & 301 Redirect Preservation',
      'Chapter 8: Automated Visual Regression, Performance Profiling & Lighthouse CI',
    ],
    includedAssets: [
      { name: 'Production Next.js Commerce Starter Boilerplate (GitHub)', type: 'Source Code' },
      { name: 'Full Architecture Diagram & Data Flow (Figma)', type: 'Figma Vector' },
      { name: 'Cost Estimator & TCO Spreadsheet', type: 'Excel / Sheets' },
    ],
    executiveSummary:
      'Decoupling your storefront from monolithic constraints delivers near-instant page transitions (sub-50ms TTFB), limitless design freedom, and higher conversion rates. This blueprint eliminates common pitfalls like SEO degradation, excessive operational complexity, and inventory synchronization lags.',
  },
  {
    id: 'guide-02',
    title: 'Generative Engine Optimization (GEO): The Technical Guide to LLM & AI Search Dominance',
    slug: 'generative-engine-optimization-geo-technical-guide',
    subtitle: 'How to structure semantic entity graphs, Schema.org microdata, and vector-friendly content to be cited by Perplexity, SearchGPT, and Gemini.',
    category: 'SEO & AI Optimization',
    featured: false,
    pagesCount: 68,
    readTime: '28 min read',
    downloadFormat: 'PDF',
    fileSize: '5.2 MB',
    publishedAt: 'September 2026',
    author: {
      name: 'Zeeshan Ali',
      role: 'Lead AI Systems Engineer',
      avatar: '/images/about/team-03.webp',
    },
    badgeText: 'AI Search Protocol',
    overview:
      'As search transitions from keyword-based blue links to synthesized AI answers, brands that fail to adapt their technical schema will become invisible. Learn the exact engineering protocols to secure authoritative citations.',
    targetAudience: [
      'Technical SEO Directors & Growth Engineers',
      'AI & Data Strategy Leads',
      'Ecommerce Marketing Executives',
    ],
    tableOfContents: [
      'Chapter 1: The Mechanics of Retrieval-Augmented Generation (RAG) in AI Search Engines',
      'Chapter 2: Semantic Triples & Entity Graph Construction for Product Catalogs',
      'Chapter 3: Nested Schema.org Architecture: Product, Offer, MerchantReturnPolicy, and Organization',
      'Chapter 4: Optimizing for LLM Token Windows and High-Density Factual Answering',
      'Chapter 5: Benchmarking Your Brand’s AI Visibility Score Across Top Foundation Models',
    ],
    includedAssets: [
      { name: 'Master JSON-LD Schema Snippets (Copy & Paste)', type: 'Code Snippets' },
      { name: 'AI Search Query Testing Prompt Library', type: 'Markdown File' },
    ],
    executiveSummary:
      'Generative models synthesize answers by ranking factual density and verifiable entity connections. By deploying nested semantic schema and eliminating ambiguous product descriptions, storefronts achieve up to 4x higher recommendation rates in conversational AI queries.',
  },
  {
    id: 'guide-03',
    title: 'The 150-Point Scientific Conversion Rate Optimization (CRO) Audit Checklist',
    slug: '150-point-scientific-cro-audit-checklist',
    subtitle: 'A rigorous, data-backed audit framework spanning mobile UX, slideout cart psychology, checkout frictionless paths, and micro-interactions.',
    category: 'CRO & UX Frameworks',
    featured: false,
    pagesCount: 54,
    readTime: '22 min read',
    downloadFormat: 'Interactive Kit',
    fileSize: '6.1 MB',
    publishedAt: 'August 2026',
    author: {
      name: 'Sarah Jenkins',
      role: 'Head of CRO & Commerce Strategy',
      avatar: '/images/about/team-04.webp',
    },
    badgeText: 'High-Impact Checklist',
    overview:
      'Used internally by Byte Operator during 7-figure brand optimization sprints. Covers every stage of the customer funnel from landing page value proposition down to post-purchase confirmation.',
    targetAudience: [
      'CRO Specialists & Growth Product Managers',
      'UI/UX Designers & Frontend Developers',
      'Ecommerce Directors & Brand Founders',
    ],
    tableOfContents: [
      'Section 1: Homepage & First 5-Second Value Proposition Clarity',
      'Section 2: Collection Filtering, Search Bar Intelligence & Faceted Navigation',
      'Section 3: Product Detail Page (PDP) Sticky CTAs, Variant Selectors & Social Proof',
      'Section 4: Slideout Cart Drawer: Tiered Rewards, Urgency & Free Shipping Motivators',
      'Section 5: Friction-Free One-Page Checkout & Express Payment Badges',
      'Section 6: Mobile Ergonomics: Thumb-Zone Tap Targets & Keyboard Input Types',
    ],
    includedAssets: [
      { name: 'Interactive Notion Audit Tracker', type: 'Notion Database' },
      { name: 'Prioritized ICE Score Testing Matrix (Excel)', type: 'Spreadsheet' },
      { name: 'Figma Mobile Checkout UX Components', type: 'Figma Library' },
    ],
    executiveSummary:
      'Increasing revenue per visitor (RPV) is the fastest lever to scale paid acquisition profitability. This checklist systematically uncovers hidden friction points that drain conversion rates and provides concrete UI/UX code solutions.',
  },
  {
    id: 'guide-04',
    title: 'The Zero-Downtime Platform Migration Runbook: From Magento, WooCommerce & Salesforce',
    slug: 'zero-downtime-platform-migration-runbook',
    subtitle: 'Step-by-step risk mitigation protocols, database ETL scripts, customer password preservation, and SEO redirect mapping for large-scale replatforming.',
    category: 'Migration & Scale',
    featured: false,
    pagesCount: 82,
    readTime: '34 min read',
    downloadFormat: 'PDF',
    fileSize: '7.0 MB',
    publishedAt: 'August 2026',
    author: {
      name: 'Hamza Tariq',
      role: 'Principal Cloud & Systems Architect',
      avatar: '/images/about/team-02.webp',
    },
    badgeText: 'Technical Runbook',
    overview:
      'Replatforming is one of the highest-risk projects an enterprise IT team can undertake. This runbook gives you the exact chronological timeline, rollback safeguards, and validation scripts to guarantee a seamless transition.',
    targetAudience: [
      'Lead Database Engineers & DevOps Architects',
      'Systems Integrators & Technical Project Managers',
      'CIOs & IT Operations Leads',
    ],
    tableOfContents: [
      'Phase 1: Discovery, Catalog Modeling & Entity Mapping Tables',
      'Phase 2: Customer Data Extraction, B2B Accounts & Multi-Currency Passports',
      'Phase 3: Order History & Inventory Synchronization Middleware',
      'Phase 4: Automated 301 URL Redirect Mapping & SEO Equity Protection',
      'Phase 5: Staging Verification, Load Testing & Penetration Testing',
      'Phase 6: Cutover Day Protocol (Hour-by-Hour DNS Switchover Guide)',
    ],
    includedAssets: [
      { name: 'Automated 301 Redirect Generator Script (Python/Node)', type: 'CLI Script' },
      { name: 'Cutover Day Emergency Rollback Protocol Document', type: 'PDF' },
    ],
    executiveSummary:
      'Preserve decades of SEO domain authority and millions in historical order history without dropping a single active customer session. This runbook turns risky platform migrations into predictable, engineering-driven milestones.',
  },
];
