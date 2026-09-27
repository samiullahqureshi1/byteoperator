/*
  PODCAST EPISODES — BYTE OPERATOR
  "Architecting Scale" — The CTO & Commerce Engineering Podcast

  HOW TO ADD A REAL EPISODE:
  1. Upload the real audio file to your CDN or hosting
  2. Replace audioUrl with the real MP3/M4A URL
  3. Replace spotifyUrl with the direct episode URL (not just spotify.com)
  4. Replace applePodcastsUrl with the direct episode URL
  5. Set featured: true for the most recent episode
*/

export interface PodcastEpisode {
  id: string;
  episodeNumber: number;
  title: string;
  slug: string;
  description: string;
  summary: string;
  category: 'Tech & Architecture' | 'AI & Automation' | 'CRO & Performance' | 'Scale & Strategy';
  duration: string;
  publishedAt: string;
  host: {
    name: string;
    role: string;
    avatar: string;
  };
  guest: {
    name: string;
    role: string;
    company: string;
    avatar: string;
  };
  audioUrl: string | null;         // null = not yet published
  spotifyUrl: string | null;       // null = not yet on Spotify
  applePodcastsUrl: string | null; // null = not yet on Apple Podcasts
  youtubeUrl?: string | null;
  featured?: boolean;
  topics: string[];
  takeaways: string[];
  transcriptExcerpt: string;
  comingSoon?: boolean;            // true = show as upcoming episode
}

export const PODCAST_CATEGORIES = [
  'All Episodes',
  'Tech & Architecture',
  'AI & Automation',
  'CRO & Performance',
  'Scale & Strategy',
] as const;

/*
  Episodes below are planned/recorded episodes.
  Set comingSoon: true and audioUrl: null until the real episode is live.
  Replace null values with real URLs when published.
*/
export const PODCAST_EPISODES: PodcastEpisode[] = [
  {
    id: 'ep-12',
    episodeNumber: 12,
    title: 'Migrating 8-Figure Stores to Headless Next.js without Downtime or Organic Ranking Loss',
    slug: 'migrating-8-figure-stores-to-headless-nextjs',
    description:
      'A deep-dive masterclass on architecting modular storefronts, decoupling CMS workflows, and preserving 100% of SEO equity during complex platform migrations.',
    summary:
      'Principal Solutions Architect Hamza Tariq dissects the exact multi-phase blueprint used to migrate enterprise commerce brands from legacy monolithic themes to sub-second headless architectures.',
    category: 'Tech & Architecture',
    duration: '48 min',
    publishedAt: 'Coming Soon',
    comingSoon: true,
    host: {
      name: 'Sami Ullah Qureshi',
      role: 'CTO & Host',
      avatar: '/images/about/team-01.webp',
    },
    guest: {
      name: 'Hamza Tariq',
      role: 'Principal Cloud & Systems Architect',
      company: 'Byte Operator',
      avatar: '/images/about/team-02.webp',
    },
    audioUrl: null,
    spotifyUrl: null,
    applePodcastsUrl: null,
    youtubeUrl: null,
    featured: true,
    topics: [
      'Next.js App Router Commerce',
      'Zero-Downtime Migration Strategies',
      'SEO 301 Redirect Mapping at Scale',
      'Sub-50ms Edge Caching & ISR',
    ],
    takeaways: [
      'Why pre-rendering static routes at build time with On-Demand Revalidation beats pure SSR for enterprise catalogs.',
      'How to establish automated regression tests for structured data and canonical tags during deployment pipelines.',
      'The exact reverse-proxy fallback architecture that guarantees 99.99% uptime during DNS cutover.',
    ],
    transcriptExcerpt:
      '"When you cross $20M in GMV, every 100ms of latency starts burning real conversion dollars. But the biggest fear CTOs have isn\'t performance — it is the catastrophic SEO drop that often plagues bad headless migrations."',
  },
  {
    id: 'ep-11',
    episodeNumber: 11,
    title: 'Generative Engine Optimization (GEO): Dominating AI Search in Perplexity, SearchGPT & Gemini',
    slug: 'generative-engine-optimization-geo-ai-search',
    description:
      'How AI search engines cite, synthesize, and recommend products, and what engineering teams must do to capture high-intent conversational search traffic.',
    summary:
      'Lead AI Systems Engineer Zeeshan Ali unpacks LLM citation graphs, entity extraction schema, and the technical protocols needed for generative search visibility.',
    category: 'AI & Automation',
    duration: '42 min',
    publishedAt: 'Coming Soon',
    comingSoon: true,
    host: {
      name: 'Sami Ullah Qureshi',
      role: 'CTO & Host',
      avatar: '/images/about/team-01.webp',
    },
    guest: {
      name: 'Zeeshan Ali',
      role: 'Lead AI Systems Engineer',
      company: 'Byte Operator',
      avatar: '/images/about/team-03.webp',
    },
    audioUrl: null,
    spotifyUrl: null,
    applePodcastsUrl: null,
    featured: false,
    topics: [
      'Entity Graph Optimization',
      'LLM Synthetic Query Indexing',
      'Schema.org Semantic Markup',
      'Brand Vector Embeddings',
    ],
    takeaways: [
      'LLMs look for unambiguous semantic triples (Subject-Predicate-Object) rather than keyword density.',
      'How structured Product and Organization JSON-LD directly fuels Perplexity knowledge cards and SearchGPT citations.',
      'Benchmarking your AI Visibility Score across 5 major LLM architectures.',
    ],
    transcriptExcerpt:
      '"Traditional Google search indexes keywords; generative models evaluate contextual authority. If your storefront documentation lacks structured entity relationships, AI bots will simply hallucinate a competitor\'s catalog instead."',
  },
  {
    id: 'ep-10',
    episodeNumber: 10,
    title: 'Precision CRO Engineering: 14 High-Impact A/B Test Wins That Lifted Checkout Revenue by 32%',
    slug: 'precision-cro-engineering-high-impact-ab-tests',
    description:
      'Real-world statistical experiments across cart drawers, micro-copy, one-click upsells, and friction-free payment journeys that generated millions in incremental revenue.',
    summary:
      'Head of Commerce Strategy Sarah Jenkins breaks down mathematical experimentation, Bayesian test validation, and the most common UI pitfalls sabotaging mobile conversions.',
    category: 'CRO & Performance',
    duration: '51 min',
    publishedAt: 'Coming Soon',
    comingSoon: true,
    host: {
      name: 'Sami Ullah Qureshi',
      role: 'CTO & Host',
      avatar: '/images/about/team-01.webp',
    },
    guest: {
      name: 'Sarah Jenkins',
      role: 'Head of Commerce Strategy & CRO',
      company: 'Byte Operator',
      avatar: '/images/about/team-04.webp',
    },
    audioUrl: null,
    spotifyUrl: null,
    applePodcastsUrl: null,
    featured: false,
    topics: [
      'Sticky Cart Drawer Architecture',
      'Checkout Extensibility & Dynamic Rules',
      'Bayesian vs Frequentist A/B Testing',
      'Mobile Tap Target Optimization',
    ],
    takeaways: [
      'Why dynamic tiered free-shipping progress bars inside the slideout cart consistently increase AOV by 18-24%.',
      'The engineering mistakes in client-side experimentation tools that cause layout shifts (CLS) and skew analytics.',
      'How server-side split testing eliminates flicker and improves measurement precision.',
    ],
    transcriptExcerpt:
      '"Conversion optimization is not guessing button colors. It is isolating psychological friction in milliseconds and instrumenting clean server-side variations with statistical significance."',
  },
  {
    id: 'ep-09',
    episodeNumber: 9,
    title: 'Autonomous AI Agents in Commerce Operations: Automated Audits, Inventory Sync & Customer Triage',
    slug: 'autonomous-ai-agents-in-commerce-operations',
    description:
      'How multi-agent systems and custom LLM sidecars automate error detection, catalog enrichment, and high-volume support triage.',
    summary:
      'An engineering exploration into building autonomous workflows with LangChain, Claude, and Next.js server actions to cut operational overhead by 70%.',
    category: 'AI & Automation',
    duration: '44 min',
    publishedAt: 'Coming Soon',
    comingSoon: true,
    host: {
      name: 'Sami Ullah Qureshi',
      role: 'CTO & Host',
      avatar: '/images/about/team-01.webp',
    },
    guest: {
      name: 'David Zhao',
      role: 'Senior Next.js & AI Systems Engineer',
      company: 'Byte Operator',
      avatar: '/images/about/team-05.webp',
    },
    audioUrl: null,
    spotifyUrl: null,
    applePodcastsUrl: null,
    featured: false,
    topics: [
      'Multi-Agent System Architecture',
      'Deterministic Safeguards for LLMs',
      'Automated Catalog Ingestion',
      'Real-time Anomaly Detection',
    ],
    takeaways: [
      'How to implement deterministic schemas on LLM tool outputs to prevent hallucinated pricing or inventory data.',
      'Building automated health check workers that crawl your storefront every 15 minutes for 404s or broken checkout paths.',
      'Cost optimization strategies for scaling token usage across millions of customer interactions.',
    ],
    transcriptExcerpt:
      '"The future of commerce engineering is not manual admin panels; it is orchestrating autonomous agent swarms that proactively fix broken links, optimize images, and flag anomalies before customers ever notice."',
  },
  {
    id: 'ep-08',
    episodeNumber: 8,
    title: 'Scaling from $5M to $50M GMV: The Technical Infrastructure Playbook for High-Growth Brands',
    slug: 'scaling-from-5m-to-50m-technical-infrastructure-playbook',
    description:
      'Database concurrency, ERP synchronizations, global multi-currency checkout, and headless CMS governance for high-velocity global brands.',
    summary:
      'A strategic discussion on avoiding technical debt, choosing between unified monoliths versus composable headless tech stacks, and managing global microservices.',
    category: 'Scale & Strategy',
    duration: '55 min',
    publishedAt: 'Coming Soon',
    comingSoon: true,
    host: {
      name: 'Sami Ullah Qureshi',
      role: 'CTO & Host',
      avatar: '/images/about/team-01.webp',
    },
    guest: {
      name: 'Maya Al-Hassan',
      role: 'Head of Product & Scale Systems',
      company: 'Byte Operator',
      avatar: '/images/about/team-06.webp',
    },
    audioUrl: null,
    spotifyUrl: null,
    applePodcastsUrl: null,
    featured: false,
    topics: [
      'Global Multi-Currency Routing',
      'High-Volume Concurrency & Flash Sales',
      'ERP / WMS API Middleware',
      'Composable Commerce Roadmaps',
    ],
    takeaways: [
      'The exact inflection points when a brand should transition from monolithic templates to composable microservices.',
      'Mitigating third-party app bloat that slows down TTFB (Time To First Byte).',
      'Managing localized international stores with unified inventory pools.',
    ],
    transcriptExcerpt:
      '"Brands don\'t fail because their product isn\'t good; they stall because their technical infrastructure crumbles under peak traffic. Engineering stability is your ultimate growth foundation."',
  },
];
