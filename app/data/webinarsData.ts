export interface WebinarItem {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  category: 'Headless Commerce' | 'AI & GEO Optimization' | 'Core Web Vitals & Speed' | 'Checkout & CRO' | 'B2B & Enterprise';
  status: 'upcoming' | 'on-demand';
  date: string;
  time?: string;
  duration: string;
  attendeesCount: number;
  featured?: boolean;
  thumbnail: string;
  videoEmbedUrl?: string;
  speakers: {
    name: string;
    role: string;
    company: string;
    avatar: string;
  }[];
  overview: string;
  keyTakeaways: string[];
  agenda: {
    timestamp: string;
    title: string;
    description: string;
  }[];
  slidesDownloadUrl?: string;
  resources: {
    title: string;
    type: 'PDF' | 'Figma' | 'Notion' | 'Code Template';
    size: string;
  }[];
}

export const WEBINAR_CATEGORIES = [
  'All Sessions',
  'Headless Commerce',
  'AI & GEO Optimization',
  'Core Web Vitals & Speed',
  'Checkout & CRO',
  'B2B & Enterprise',
] as const;

export const WEBINARS_DATA: WebinarItem[] = [
  {
    id: 'webinar-live-01',
    title: 'Live Technical Teardown: Diagnosing 10 Multi-Million Dollar Storefronts for Core Web Vitals & Conversion Leaks',
    slug: 'live-technical-teardown-web-vitals-conversion-leaks',
    tagline: 'Watch our engineering team live-audit real high-volume stores and write instant code patches to boost speed and AOV.',
    category: 'Core Web Vitals & Speed',
    status: 'upcoming',
    date: 'Thursday, October 15, 2026',
    time: '2:00 PM EST / 7:00 PM GMT',
    duration: '75 min',
    attendeesCount: 842,
    featured: true,
    thumbnail: '/images/home/projects-01.webp',
    speakers: [
      {
        name: 'Sami Ullah Qureshi',
        role: 'Chief Technology Officer',
        company: 'Byte Operator',
        avatar: '/images/about/team-01.webp',
      },
      {
        name: 'Sarah Jenkins',
        role: 'Head of CRO & User Psychology',
        company: 'Byte Operator',
        avatar: '/images/about/team-04.webp',
      },
    ],
    overview:
      'In this interactive 75-minute live masterclass, our lead systems engineers will pull up 10 live ecommerce storefronts, run real-time Chrome DevTools performance traces, diagnose render-blocking scripts, and refactor checkout friction on screen.',
    keyTakeaways: [
      'How third-party tracking scripts silently destroy INP (Interaction to Next Paint) and how to defer them with Web Workers.',
      'Refactoring heavy DOM trees and image carousels into sub-millisecond CSS-only layouts.',
      'Live Q&A session where attendees can submit their own store URL for instant diagnosis.',
    ],
    agenda: [
      {
        timestamp: '00:00 - 15:00',
        title: 'Core Web Vitals in 2026: INP, LCP & CLS Benchmarks',
        description: 'Why Google algorithms penalize interaction latency and how conversion correlates with sub-second speeds.',
      },
      {
        timestamp: '15:00 - 45:00',
        title: 'Live Storefront Profiling & Network Waterfall Audits',
        description: 'Analyzing real production stores, isolating JavaScript bloat, and demonstrating instant refactoring.',
      },
      {
        timestamp: '45:00 - 65:00',
        title: 'Checkout & Cart Drawer Friction Elimination',
        description: 'Eliminating layout shifts, optimizing mobile tap targets, and streamlining payment flows.',
      },
      {
        timestamp: '65:00 - 75:00',
        title: 'Open Q&A & Live Audience Submissions',
        description: 'Direct architectural answers from our engineering leadership.',
      },
    ],
    resources: [
      {
        title: '2026 Core Web Vitals Audit Checklist',
        type: 'PDF',
        size: '2.4 MB',
      },
      {
        title: 'Web Worker Script Optimization Template',
        type: 'Code Template',
        size: '18 KB',
      },
    ],
  },
  {
    id: 'webinar-ondemand-01',
    title: 'The AI Search Playbook: How to Rank in Perplexity, ChatGPT Search, and Google Gemini',
    slug: 'ai-search-playbook-ranking-in-perplexity-chatgpt-gemini',
    tagline: 'Master Generative Engine Optimization (GEO) and engineer your store for conversational AI discovery.',
    category: 'AI & GEO Optimization',
    status: 'on-demand',
    date: 'Recorded September 2026',
    duration: '58 min',
    attendeesCount: 1420,
    featured: false,
    thumbnail: '/images/home/projects-02.webp',
    videoEmbedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    speakers: [
      {
        name: 'Zeeshan Ali',
        role: 'Lead AI Systems Engineer',
        company: 'Byte Operator AI Labs',
        avatar: '/images/about/team-03.webp',
      },
      {
        name: 'Hamza Tariq',
        role: 'Principal Solutions Architect',
        company: 'Byte Operator',
        avatar: '/images/about/team-02.webp',
      },
    ],
    overview:
      'Generative search engines don’t scrape text like legacy crawlers; they parse semantic entities, structured schema, and verifiable citations. Learn how to transform your product catalog into an authoritative source cited by top LLMs.',
    keyTakeaways: [
      'Comprehensive breakdown of the GEO (Generative Engine Optimization) technical stack.',
      'Injecting nested JSON-LD schema with complete entity definitions for multi-variant products.',
      'Structuring technical documentation and FAQs to maximize LLM retrieval-augmented generation (RAG) citations.',
    ],
    agenda: [
      {
        timestamp: '00:00 - 12:00',
        title: 'The Shift from Keyword SERPs to LLM Answer Synthesis',
        description: 'Understanding citation mechanisms across Perplexity, ChatGPT Search, and Gemini.',
      },
      {
        timestamp: '12:00 - 32:00',
        title: 'Technical Schema & Entity Graph Engineering',
        description: 'Implementing advanced Schema.org microdata that AI parsers prioritize.',
      },
      {
        timestamp: '32:00 - 48:00',
        title: 'Content Semantic Clarity & Vector Indexing',
        description: 'Writing product metadata that matches high-intent conversational queries.',
      },
      {
        timestamp: '48:00 - 58:00',
        title: 'Case Study: 340% Lift in AI-Referred Orders',
        description: 'Real production metrics and implementation timeline.',
      },
    ],
    slidesDownloadUrl: '#',
    resources: [
      {
        title: 'GEO Master Schema Starter Pack',
        type: 'Code Template',
        size: '42 KB',
      },
      {
        title: 'AI Search Visibility Scorecard',
        type: 'Notion',
        size: 'Cloud Link',
      },
    ],
  },
  {
    id: 'webinar-ondemand-02',
    title: 'Architecting Enterprise Headless Next.js Commerce with Sub-50ms Edge Performance',
    slug: 'architecting-enterprise-headless-nextjs-commerce',
    tagline: 'Decoupling monolithic platforms with Next.js App Router, Incremental Static Regeneration (ISR), and Edge Caching.',
    category: 'Headless Commerce',
    status: 'on-demand',
    date: 'Recorded August 2026',
    duration: '64 min',
    attendeesCount: 2150,
    featured: false,
    thumbnail: '/images/home/projects-03.webp',
    videoEmbedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    speakers: [
      {
        name: 'Sami Ullah Qureshi',
        role: 'Chief Technology Officer',
        company: 'Byte Operator',
        avatar: '/images/about/team-01.webp',
      },
      {
        name: 'David Zhao',
        role: 'Senior Next.js Specialist',
        company: 'Byte Operator',
        avatar: '/images/about/team-05.webp',
      },
    ],
    overview:
      'Explore the architectural blueprint of composable commerce. Learn how to connect headless Shopify Storefront APIs with Next.js App Router, implement instant client-side cart updates, and cache static pages globally on the edge.',
    keyTakeaways: [
      'Complete repository walkthrough of an enterprise headless Next.js commerce boilerplate.',
      'Solving complex multi-market routing, currencies, and localization without code duplication.',
      'Optimizing edge caching with automatic webhook revalidation for real-time inventory updates.',
    ],
    agenda: [
      {
        timestamp: '00:00 - 18:00',
        title: 'Monolith vs. Headless: The Total Cost of Ownership (TCO)',
        description: 'When does headless make financial and operational sense?',
      },
      {
        timestamp: '18:00 - 40:00',
        title: 'Next.js App Router Architecture & GraphQL Storefront APIs',
        description: 'Server Components, Suspense boundaries, and zero-bundle-size rendering.',
      },
      {
        timestamp: '40:00 - 54:00',
        title: 'Cart State Synchronization & Checkout Extensibility',
        description: 'Seamless handover to native checkout without session drops.',
      },
      {
        timestamp: '54:00 - 64:00',
        title: 'CI/CD Pipelines, Testing, & Global CDN Deployment',
        description: 'Automating visual regression tests and edge middleware.',
      },
    ],
    slidesDownloadUrl: '#',
    resources: [
      {
        title: 'Next.js Commerce Architecture Whitepaper',
        type: 'PDF',
        size: '4.8 MB',
      },
      {
        title: 'Headless Migration Checklist & Timeline',
        type: 'Figma',
        size: '12 MB',
      },
    ],
  },
  {
    id: 'webinar-ondemand-03',
    title: 'Checkout & Cart Drawer Optimization: Engineering 25%+ Conversion Lifts',
    slug: 'checkout-cart-drawer-optimization-engineering-conversion-lifts',
    tagline: 'Scientific UX experiments, micro-interaction engineering, and psychology-backed conversion triggers.',
    category: 'Checkout & CRO',
    status: 'on-demand',
    date: 'Recorded July 2026',
    duration: '52 min',
    attendeesCount: 1890,
    featured: false,
    thumbnail: '/images/home/projects-04.webp',
    videoEmbedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    speakers: [
      {
        name: 'Sarah Jenkins',
        role: 'Head of CRO & Commerce Strategy',
        company: 'Byte Operator',
        avatar: '/images/about/team-04.webp',
      },
      {
        name: 'Maya Al-Hassan',
        role: 'Head of Product Design',
        company: 'Byte Operator',
        avatar: '/images/about/team-06.webp',
      },
    ],
    overview:
      'Learn how small micro-interactions, intelligent in-cart upsells, and friction-free payment badges compound into 7-figure revenue increases. We share exact Figma component libraries and code implementations.',
    keyTakeaways: [
      'The anatomy of a high-converting sticky slideout cart drawer.',
      'Dynamic threshold progress bars that trigger higher average order values (AOV).',
      'One-click express checkout integrations (Apple Pay, Shop Pay, Google Pay) with zero layout shifts.',
    ],
    agenda: [
      {
        timestamp: '00:00 - 15:00',
        title: 'Cart Abandonment Psychology: Why Customers Drop Off',
        description: 'Mapping hesitation points, hidden costs, and UX friction.',
      },
      {
        timestamp: '15:00 - 35:00',
        title: 'Cart Drawer UX Component Deep-Dive',
        description: 'Tiered rewards, subscription toggles, and contextual cross-sells.',
      },
      {
        timestamp: '35:00 - 45:00',
        title: 'Checkout Extensibility Apps & Native Rules',
        description: 'Custom banners, delivery date pickers, and post-purchase upsells.',
      },
      {
        timestamp: '45:00 - 52:00',
        title: 'Statistical A/B Testing Validation Framework',
        description: 'Sample sizes, Bayesian probability, and statistical confidence.',
      },
    ],
    slidesDownloadUrl: '#',
    resources: [
      {
        title: 'Figma High-Converting Cart Drawer UI Kit',
        type: 'Figma',
        size: '18.5 MB',
      },
      {
        title: 'CRO Experiment Prioritization Matrix (ICE/PIE)',
        type: 'Notion',
        size: 'Cloud Link',
      },
    ],
  },
];
