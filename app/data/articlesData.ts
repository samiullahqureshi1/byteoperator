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
    excerpt: 'Explore data-backed conversion rate optimization strategies, mobile ergonomic architectures, and sub-second checkout funnels tailored for high-volume enterprise brands in 2026.',
    publishedAt: '2026-03-15T10:00:00Z',
    category: 'cro',
    articleType: 'Guide',
    featured: true,
    mainFeatured: true,
    image: {
      url: '/images/mega-menu-resources.webp',
      altText: 'Conversion Rate Optimization and Mobile UX Architecture',
      width: 1200,
      height: 675,
    },
    seo: {
      title: 'The Complete Guide to Conversion & Performance Optimization | Byte Operator',
      description: 'Explore data-backed conversion rate optimization strategies specifically tailored for high-volume Enterprise brands in 2026.',
    },
    contentHtml: `
      <p>Conversion Rate Optimization (CRO) in 2026 is no longer about arbitrarily tweaking button gradients or running guesswork tests. It is an engineering discipline centered around sub-second rendering, cognitive friction elimination, and personalized user pathways.</p>
      
      <figure>
        <img src="/images/mega-menu-resources.webp" alt="High-Converting E-Commerce Storefront UX Layout" />
        <figcaption>Figure 1: Modular primary viewport information hierarchy engineered for rapid decision-making.</figcaption>
      </figure>

      <h2>01. Primary Viewport Information Hierarchy & Speed</h2>
      <p>High-converting Product Detail Pages (PDPs) eliminate cognitive hesitation by placing key purchase triggers within the natural primary viewport:</p>
      <ul>
        <li><strong>Sub-50ms Interaction to Next Paint (INP):</strong> Zero layout shifts when variant selections or color swatches update.</li>
        <li><strong>Dynamic Delivery Promises:</strong> Real-time countdowns for next-day dispatch based on localized warehouse inventory.</li>
        <li><strong>Frictionless Sticky Add-to-Cart:</strong> Mobile thumb-zone sticky CTA that triggers an instant slideout cart drawer without full page reloads.</li>
      </ul>

      <figure>
        <img src="/images/work/featured/project-01.webp" alt="Real-time Performance and CRO Metrics Dashboard" />
        <figcaption>Figure 2: Real-time analytics tracking conversion lift across mobile and desktop test variants.</figcaption>
      </figure>

      <h2>02. Slideout Drawer Cart Architecture & Tiered Rewards</h2>
      <p>Replacing static cart pages with reactive slideout cart drawers consistently drives a 15–28% increase in Average Order Value (AOV). Key architectural elements include:</p>
      <ul>
        <li>Multi-milestone free shipping and gift reward progress indicators.</li>
        <li>Contextual 1-click add-ons (product warranties, priority handling, gift packaging).</li>
        <li>Embedded express wallet buttons (Shop Pay, Apple Pay, Google Pay) to bypass form fatigue.</li>
      </ul>

      <h2>03. Server-Side Split Testing vs. Client-Side Flicker</h2>
      <p>Traditional client-side A/B testing scripts inject bulky JavaScript that delays First Contentful Paint (FCP) and causes visual jarring. By executing split tests at the Edge or via Server Components, variants render natively with zero performance penalty.</p>
    `,
  },
  {
    id: 'art-2',
    handle: 'ai-search-and-visibility-optimisation-for-ecommerce',
    path: '/articles/ai-search-and-visibility-optimisation-for-ecommerce',
    title: 'Generative Engine Optimization (GEO): Ranking on ChatGPT, Perplexity & Gemini',
    excerpt: 'How conversational AI search engines parse semantic entities and citation graphs, and the technical schema required to capture high-intent AI product discovery.',
    publishedAt: '2026-02-28T09:30:00Z',
    category: 'seo',
    articleType: 'Insights',
    featured: true,
    image: {
      url: '/images/home-services/seo-analytics.jpg',
      altText: 'Generative Engine Optimization and AI Search Graph',
      width: 1200,
      height: 675,
    },
    seo: {
      title: 'Generative Engine Optimization (GEO) for Ecommerce | Byte Operator',
      description: 'Learn how generative AI search platforms index and recommend products in 2026.',
    },
    contentHtml: `
      <p>As millions of consumers transition from Google keyword queries to conversational search engines like ChatGPT Search, Perplexity Pro, and Google Gemini, traditional keyword-based SEO is being superseded by Generative Engine Optimization (GEO).</p>

      <figure>
        <img src="/images/home-services/seo-analytics.jpg" alt="AI Search and Semantic Knowledge Graph Optimization" />
        <figcaption>Figure 1: Entity graph mapping and semantic authority scoring across conversational AI engines.</figcaption>
      </figure>

      <h2>01. How Large Language Models (LLMs) Recommend Products</h2>
      <p>Generative search models synthesize answers using Retrieval-Augmented Generation (RAG). Rather than ranking pages by backlink count alone, LLMs evaluate:</p>
      <ul>
        <li><strong>Semantic Entity Density:</strong> Clear subject-predicate-object relationships in structured product data.</li>
        <li><strong>Verifiable Specifications:</strong> Detailed dimensions, materials, compatibility, and real-time inventory schemas.</li>
        <li><strong>Third-Party Citation Authority:</strong> Brand mentions and factual consensus across verified industry publications.</li>
      </ul>

      <figure>
        <img src="/images/home-features/feature-01/primary.webp" alt="AI Schema Validation and Technical SEO Integration" />
        <figcaption>Figure 2: Nested Schema.org JSON-LD microdata structure for multi-variant catalogs.</figcaption>
      </figure>

      <h2>02. Essential Schema.org Microdata Protocols</h2>
      <p>To ensure AI search bots accurately cite your catalog without hallucination, implement comprehensive nested JSON-LD schema:</p>
      <ul>
        <li><code>ProductGroup</code> and <code>ProductModel</code> definitions for complex variant matrices.</li>
        <li><code>MerchantReturnPolicy</code>, <code>ShippingDetails</code>, and <code>UnitPriceSpecification</code>.</li>
        <li>Factual FAQ and How-To schema structured for direct conversational extraction.</li>
      </ul>
    `,
  },
  {
    id: 'art-3',
    handle: 'migrating-to-software-plus-enterprise-playbook',
    path: '/articles/migrating-to-software-plus-enterprise-playbook',
    title: 'Enterprise Platform Migration Playbook: Zero-Downtime Replatforming from Legacy Monoliths',
    excerpt: 'Step-by-step migration architecture preserving 100% of organic SEO equity, customer records, and complex ERP integrations during large-scale replatforming.',
    publishedAt: '2026-01-20T14:00:00Z',
    category: 'platform',
    articleType: 'Playbook',
    featured: false,
    image: {
      url: '/images/home-services/cloud-migrations.jpg',
      altText: 'Enterprise Cloud Platform Migration and Architecture',
      width: 1200,
      height: 675,
    },
    seo: {
      title: 'Enterprise Platform Migration Playbook | Byte Operator',
      description: 'A comprehensive technical guide to zero-downtime replatforming for enterprise commerce.',
    },
    contentHtml: `
      <p>Replatforming an 8-figure enterprise catalog requires meticulous planning, data normalization ETL scripts, and comprehensive SEO equity safeguards to avoid business disruption.</p>

      <figure>
        <img src="/images/home-services/cloud-migrations.jpg" alt="Cloud Platform Migration Data Pipeline" />
        <figcaption>Figure 1: Multi-phase zero-downtime database cutover and API integration pipeline.</figcaption>
      </figure>

      <h2>01. Automated 301 URL Redirect Mapping</h2>
      <p>Preserving historical search engine rankings requires 1:1 mapping of every legacy URL, canonical tag, and internal link structure before DNS cutover.</p>

      <figure>
        <img src="/images/services/services-wide.webp" alt="Enterprise Architecture and High-Volume Infrastructure" />
        <figcaption>Figure 2: Microservices and edge middleware orchestration for global multi-currency scaling.</figcaption>
      </figure>

      <h2>02. Customer Data & Password Preservation</h2>
      <p>Using secure headless authentication bridges and encrypted ETL pipelines ensures customers experience seamless logins without requiring manual password resets.</p>
    `,
  },
  {
    id: 'art-4',
    handle: 'top-software-apps-for-scale',
    path: '/articles/top-software-apps-for-scale',
    title: 'Curated Tech Stack: Top Enterprise Apps & Composable Microservices for Scale',
    excerpt: 'Our agency-verified app and microservices stack for subscription management, reviews, loyalty, and personalization without performance degradation.',
    publishedAt: '2026-01-10T11:00:00Z',
    category: 'apps',
    articleType: 'Tech Stack',
    featured: false,
    image: {
      url: '/images/home-gallery/project-03.webp',
      altText: 'Composable Enterprise App Stack and Performance Profiling',
      width: 1200,
      height: 675,
    },
    seo: {
      title: 'Top Enterprise Platform Apps for Scale | Byte Operator',
      description: 'Curated tech stack for high-performance digital platforms and headless storefronts.',
    },
    contentHtml: `
      <p>Excessive third-party app scripts are the single largest contributor to slow Time to First Byte (TTFB) and main-thread blocking. Here is how to assemble a lean, high-velocity enterprise stack.</p>

      <figure>
        <img src="/images/home-gallery/project-03.webp" alt="Modern Headless Tech Stack Integrations" />
        <figcaption>Figure 1: Server-side API connectors eliminating client-side JavaScript bloat.</figcaption>
      </figure>

      <h2>01. Server-Side Reviews & Social Proof</h2>
      <p>Direct API integration for customer reviews renders ratings in static HTML, boosting SEO visibility while eliminating heavy client-side widget scripts.</p>

      <figure>
        <img src="/images/services/klaviyo/klaviyo-advisor-silver.webp" alt="Email Marketing and Retention Automation" />
        <figcaption>Figure 2: Advanced retention flows and behavioral trigger synchronization.</figcaption>
      </figure>

      <h2>02. Composable Retention & Lifecycle Automation</h2>
      <p>Integrating customer data platforms (CDPs) directly with email/SMS engines unlocks real-time behavioral segmentation and personalized post-purchase flows.</p>
    `,
  },
];

export function getArticleByHandle(handle: string): ArticleItem | undefined {
  return ARTICLES_DATA.find((a) => a.handle === handle || a.id === handle);
}
