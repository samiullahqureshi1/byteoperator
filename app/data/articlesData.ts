export type ArticleCategory = 'cro' | 'platform' | 'apps' | 'seo' | 'marketing' | 'email';

export interface ArticleItem {
  id: string;
  handle: string;
  path: string;
  title: string;
  excerpt: string | null;
  contentHtml?: string;
  publishedAt: string;
  image: {
    id?: string;
    altText?: string | null;
    url: string;
    width?: number | null;
    height?: number | null;
  } | null;
  seo: {
    title?: string | null;
    description?: string | null;
  } | null;
  category: ArticleCategory | null;
  articleType: string;
  featured: boolean;
  mainFeatured?: boolean;
}

export const ARTICLES_DATA: ArticleItem[] = [
  {
    id: 'art-1',
    handle: 'the-complete-guide-to-software-cro-in-2026',
    path: '/articles/the-complete-guide-to-software-cro-in-2026',
    title: 'The Complete Guide to Conversion & Performance Optimization: Strategies That Double Conversion',
    excerpt: 'Explore data-backed conversion rate optimization strategies specifically tailored for high-volume Enterprise Platform Solutions brands in 2026.',
    publishedAt: '2026-03-15T10:00:00Z',
    category: 'cro',
    articleType: 'Guide',
    featured: true,
    mainFeatured: true,
    image: {
      url: '/images/home-gallery/hero-video-poster.webp',
      altText: 'Conversion & Performance Optimization Guide',
      width: 1200,
      height: 675,
    },
    seo: {
      title: 'The Complete Guide to Conversion & Performance Optimization | Byte Operator',
      description: 'Explore data-backed conversion rate optimization strategies specifically tailored for high-volume Enterprise Platform Solutions brands in 2026.',
    },
    contentHtml: `
      <p>Conversion Rate Optimization (CRO) for Software brands in 2026 is no longer just about A/B testing button colors. It requires a systematic approach across mobile experience, purchase velocity, checkout micro-copy, and cognitive load reduction.</p>
      <h2>01. Above-the-Fold Product Page Architecture</h2>
      <p>High converting PDPs eliminate hesitation by presenting verified social proof, clear shipping timelines, size selectors with real-time stock indicators, and a persistent 1-tap checkout option.</p>
      <h2>02. Mobile-First Micro-Interactions</h2>
      <p>With over 78% of e-commerce traffic originating on mobile devices, responsive thumb-zone ergonomics and gesture-based media galleries directly impact conversion rates by up to 35%.</p>
      <h2>03. Eliminating Cart & Checkout Friction</h2>
      <p>Using slide-out drawer carts with tiered free shipping bars, 1-click upsells, and express wallets (Shop Pay, Apple Pay) provides the fastest path to completion.</p>
    `,
  },
  {
    id: 'art-2',
    handle: 'ai-search-and-visibility-optimisation-for-ecommerce',
    path: '/articles/ai-search-and-visibility-optimisation-for-ecommerce',
    title: 'Generative Engine Optimization (GEO): Ranking on ChatGPT and Perplexity',
    excerpt: 'How AI search engines cite products and brand recommendations, and how to structure your store data for maximum AI visibility.',
    publishedAt: '2026-02-28T09:30:00Z',
    category: 'seo',
    articleType: 'Insights',
    featured: true,
    image: {
      url: '/images/home-gallery/hero-video-poster.webp',
      altText: 'AI Search and Visibility',
      width: 1200,
      height: 675,
    },
    seo: {
      title: 'Generative Engine Optimization (GEO) for Ecommerce | Byte Operator',
      description: 'Learn how generative AI platforms index and recommend products in 2026.',
    },
    contentHtml: `
      <p>As consumers increasingly use AI assistants like ChatGPT, Perplexity, and Google Gemini to find product recommendations, traditional SEO must evolve into Generative Engine Optimization (GEO).</p>
      <h2>Structured Product Knowledge Graphs</h2>
      <p>LLMs rely on dense semantic context, verified technical specifications, customer reviews, and clear JSON-LD schema markup to synthesize citations and recommendations.</p>
      <h2>Authoritative Brand Signals</h2>
      <p>AI visibility requires third-party validations, press mentions, and deep editorial content that directly answers comparison queries.</p>
    `,
  },
  {
    id: 'art-3',
    handle: 'migrating-to-software-plus-enterprise-playbook',
    path: '/articles/migrating-to-software-plus-enterprise-playbook',
    title: 'Migrating from Magento / Salesforce to Enterprise Platform Solutions: Zero-Downtime Playbook',
    excerpt: 'Step-by-step migration architecture preserving 100% of SEO equity, customer records, and ERP integrations.',
    publishedAt: '2026-01-20T14:00:00Z',
    category: 'platform',
    articleType: 'Playbook',
    featured: false,
    image: {
      url: '/images/home-gallery/hero-video-poster.webp',
      altText: 'Enterprise Migration Playbook',
      width: 1200,
      height: 675,
    },
    seo: {
      title: 'Enterprise Platform Solutions Enterprise Migration Playbook | Byte Operator',
      description: 'A comprehensive technical guide to zero-downtime replatforming to Enterprise Platform Solutions.',
    },
    contentHtml: `
      <p>Replatforming an enterprise store requires precise data mapping, 301 redirect architecture, and seamless staging tests.</p>
      <h2>Preserving Organic Search Equity</h2>
      <p>Audit every legacy URL, generate automated 1:1 redirect maps, and ensure canonical consistency across categories and products.</p>
    `,
  },
  {
    id: 'art-4',
    handle: 'top-software-apps-for-scale',
    path: '/articles/top-software-apps-for-scale',
    title: 'Curated Tech Stack: Top Enterprise Platform Solutions Apps for High-Growth DTC',
    excerpt: 'Our agency-verified app stack for subscription management, reviews, loyalty, and personalization without bloat.',
    publishedAt: '2026-01-10T11:00:00Z',
    category: 'apps',
    articleType: 'Tech Stack',
    featured: false,
    image: {
      url: '/images/home-gallery/hero-video-poster.webp',
      altText: 'Top Custom Applications',
      width: 1200,
      height: 675,
    },
    seo: {
      title: 'Top Enterprise Platform Solutions Apps for Scale | Byte Operator',
      description: 'Curated tech stack for high performance digital platforms & applications.',
    },
    contentHtml: `
      <p>App bloat is the #1 enemy of store performance. We review the cleanest, most performant enterprise apps available.</p>
    `,
  },
];

export function getArticleByHandle(handle: string): ArticleItem | undefined {
  return ARTICLES_DATA.find((a) => a.handle === handle || a.id === handle);
}
