export interface NewsletterEdition {
  id: string;
  issueNumber: number;
  title: string;
  slug: string;
  publishedAt: string;
  category: 'Tech Deep-Dive' | 'CRO Experiment' | 'AI Systems' | 'Architecture';
  readTime: string;
  teaser: string;
  highlights: string[];
  fullContentSnippet: string;
}

export interface NewsletterTestimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
}

export const NEWSLETTER_EDITIONS: NewsletterEdition[] = [
  {
    id: 'issue-48',
    issueNumber: 48,
    title: 'Issue #48: Why Client-Side Carousels Destroy Your INP (and the CSS-Only Replacement)',
    slug: 'issue-48-why-client-side-carousels-destroy-inp',
    publishedAt: 'September 24, 2026',
    category: 'Tech Deep-Dive',
    readTime: '4 min read',
    teaser:
      'We profiled 50 Shopify Plus stores and found that third-party JavaScript sliders accounted for over 220ms of main-thread blocking time. Here is the modern CSS Scroll-Snap solution that scores 100 on Lighthouse.',
    highlights: [
      'Deconstructing touch event listeners causing main-thread starvation.',
      'Pure CSS scroll-snap implementation with hardware acceleration.',
      'Benchmark comparisons: 38KB JS eliminated and INP reduced from 280ms to 24ms.',
    ],
    fullContentSnippet:
      'In today’s dispatch, we examine why traditional carousel libraries (Slick, Swiper, Flickity) introduce severe Interaction to Next Paint (INP) degradations on mobile devices. Because these libraries bind passive scroll listeners and manipulate inline transform styles via JavaScript, low-power mobile CPUs choke when users attempt simultaneous scrolling and tap interactions. By replacing these bulky bundles with modern CSS scroll-snap-type: x mandatory and scroll-behavior: smooth, you preserve silky 60fps animations with literally zero JavaScript overhead.',
  },
  {
    id: 'issue-47',
    issueNumber: 47,
    title: 'Issue #47: The $1.2M A/B Test: Dynamic Cart Rewards vs Static Thresholds',
    slug: 'issue-47-1-2m-ab-test-dynamic-cart-rewards',
    publishedAt: 'September 17, 2026',
    category: 'CRO Experiment',
    readTime: '5 min read',
    teaser:
      'How replacing a single "Spend $50 for Free Shipping" banner with a multi-tiered progress bar (Free Gift + Priority Dispatch) lifted Average Order Value by 21.8%.',
    highlights: [
      'Psychological anchoring around tiered unlocks.',
      'Avoiding layout shifts when new gift items auto-inject into cart state.',
      'Statistical confidence analysis across 140,000 unique sessions.',
    ],
    fullContentSnippet:
      'Gamifying cart completion is one of the highest-leverage UX enhancements in high-volume retail. In this 4-week split test involving 140,000 visitors, the variant with a multi-step milestone bar (Tier 1: Free Shipping at $75, Tier 2: Free Mystery Sample at $120, Tier 3: 15% VIP discount at $180) yielded a +21.8% lift in AOV and a +4.2% lift in checkout completion. We break down the React state machine code required to inject free reward line-items cleanly via the Cart API without inducing race conditions.',
  },
  {
    id: 'issue-46',
    issueNumber: 46,
    title: 'Issue #46: Reverse-Engineering Perplexity & SearchGPT Product Cards',
    slug: 'issue-46-reverse-engineering-perplexity-searchgpt-product-cards',
    publishedAt: 'September 10, 2026',
    category: 'AI Systems',
    readTime: '6 min read',
    teaser:
      'An empirical study on which JSON-LD schema properties trigger rich interactive product cards inside conversational search engines.',
    highlights: [
      'The critical role of aggregateRating, returnFees, and itemCondition.',
      'Why unstructured markdown tables outperform long narrative paragraphs in LLM parsing.',
      'Automating schema validation within Next.js build steps.',
    ],
    fullContentSnippet:
      'We spent 3 weeks auditing 200 product category queries inside Perplexity Pro and ChatGPT Search. The findings were startling: generative models do not read page content linearly. Instead, their retrieval engines index structured JSON-LD entities and tabular spec sheets. Stores that included detailed merchantReturnPolicy, priceValidUntil, and multi-currency offer specifications were cited 3.8x more frequently as top recommendations compared to stores relying solely on traditional paragraph descriptions.',
  },
  {
    id: 'issue-45',
    issueNumber: 45,
    title: 'Issue #45: The Composable Commerce Architecture Stack for 2026',
    slug: 'issue-45-composable-commerce-architecture-stack-2026',
    publishedAt: 'September 03, 2026',
    category: 'Architecture',
    readTime: '5 min read',
    teaser:
      'Our vetted blueprint for connecting Next.js App Router, Shopify Storefront API, Sanity CMS, Algolia AI Search, and Klaviyo with zero glue-code fragility.',
    highlights: [
      'Event-driven webhook pipelines for instantaneous edge invalidation.',
      'Managing global session tokens without third-party cookies.',
      'Total cost analysis: Composable vs Enterprise Monolith at $25M GMV.',
    ],
    fullContentSnippet:
      'As brands scale past $20M GMV, monolithic theme architectures begin showing strain under multi-region requirements, complex merchandising, and heavy editorial demands. In this issue, we provide the full reference diagram for a modern composable commerce ecosystem. We show how Next.js App Router serves as the unified frontend orchestration layer, consuming headless commerce APIs while leveraging edge middleware for localized pricing and sub-50ms global response times.',
  },
];

export const NEWSLETTER_TESTIMONIALS: NewsletterTestimonial[] = [
  {
    quote:
      'The Operator Dispatch is the only newsletter I read every single week. The code snippets and architectural teardowns have directly saved our engineering team dozens of hours.',
    author: 'Marcus Vance',
    role: 'VP of Technology',
    company: 'Apex Apparel ($35M GMV)',
    avatar: '/images/about/team-02.webp',
  },
  {
    quote:
      'No fluff, no sponsored junk. Just raw technical data, A/B test experiments with statistical significance, and actionable Next.js architectures.',
    author: 'Elena Rostova',
    role: 'Head of Digital Growth',
    company: 'Veloce Footwear',
    avatar: '/images/about/team-04.webp',
  },
  {
    quote:
      'Their breakdown of Generative Engine Optimization helped us overhaul our product schema in 2 weeks. Our conversational AI traffic doubled within a month.',
    author: 'Liam O’Connor',
    role: 'Ecommerce Director',
    company: 'Nordic Living Direct',
    avatar: '/images/about/team-05.webp',
  },
];
