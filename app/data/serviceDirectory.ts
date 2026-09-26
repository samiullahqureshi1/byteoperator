import {
  CRO_CLEAN_PATH,
  SHOPIFY_SEO_CLEAN_PATH,
} from '~/lib/route-mappings';

/**
 * Copy for the services directory on /services.
 *
 * Why this is not the `SERVICES` list in `lib/seo/schema.ts`: that module's
 * `description` is the JSON-LD `Service.description`, and structured data
 * wants one concise, factual sentence. The directory panel is on-page
 * marketing copy — longer, scannable, written for a reader deciding whether
 * to book hours. Different jobs, so different fields.
 *
 * `name` is what the customer clicked, and it is the value written to the
 * cart line attribute — so the Software order says "New build projects"
 * rather than the schema's broader page name. Keep them human-readable.
 *
 * `href` is optional: four services have no page of their own yet. They
 * still get a description and a booking button, just no "read more".
 */
export type ServiceDirectoryEntry = {
  /** Row label, the heading of the open panel, and the booked service name. */
  name: string;
  /** Two or three sentences: what the work is and what it produces. */
  summary: string;
  /** Scannable specifics — what is actually included. */
  highlights: readonly string[];
  /** Full service page, where one exists. */
  href?: string;
};

export type ServiceDirectoryGroup = {
  id: string;
  title: string;
  services: readonly ServiceDirectoryEntry[];
};

export const SERVICE_DIRECTORY: readonly ServiceDirectoryGroup[] = [
  {
    id: 'seo',
    title: 'SEO',
    services: [
      {
        name: 'Search Engine Optimisation',
        href: SHOPIFY_SEO_CLEAN_PATH,
        summary:
          'Technical and content SEO built around how Software actually works (its URL structure, collection logic and faceted navigation). We fix what stops pages being crawled and indexed, then build the topical depth that earns rankings for the terms your buyers search.',
        highlights: [
          'Technical audit, crawl budget and indexation control',
          'Collection and site architecture built for search',
          'Content strategy mapped to buying intent',
          'Reporting tied to revenue, not vanity rankings',
        ],
      },
      {
        name: 'GEO / AI Search Optimisation',
        href: '/geo-agency/',
        summary:
          'Shoppers increasingly ask ChatGPT, Perplexity, Gemini and Google AI Overviews before they ever reach a search results page. Generative engine optimisation makes your brand the one those systems retrieve and cite, measured as citation share on the prompts that carry buying intent.',
        highlights: [
          'Citation tracking across the major AI assistants',
          'Entity and structured data modelling',
          'Content written to be retrieved, quoted and attributed',
          'Competitor share-of-answer benchmarking',
        ],
      },
    ],
  },
  {
    id: 'cro-audits',
    title: 'CRO & Audits',
    services: [
      {
        name: 'Conversion Rate Optimisation',
        href: CRO_CLEAN_PATH,
        summary:
          'Research-led CRO for digital platforms & applications. We combine analytics, session replay and qualitative research to find where revenue leaks out of the funnel, then prove each fix with a structured experiment rather than shipping on opinion.',
        highlights: [
          'Funnel and checkout drop-off analysis',
          'User research, session replay and heuristic review',
          'Prioritised test roadmap with clear hypotheses',
          'Statistically sound result calls',
        ],
      },
      {
        name: 'Data-Driven Strategies',
        summary:
          'Most digital platforms & applications collect far more data than they use. We get your analytics telling the truth (clean GA4 and Software tracking, server-side events that survive ad blockers) then turn it into dashboards and a decision framework your team can actually run on.',
        highlights: [
          'GA4, Software Analytics and server-side tracking setup',
          'Attribution and channel profitability modelling',
          'Cohort, LTV and repeat-purchase analysis',
          'Dashboards and reporting your team will use',
        ],
      },
      {
        name: 'Ecommerce Audits',
        href: '/services/software-audits/',
        summary:
          'A full read on an existing digital platform across design, front-end code, performance, SEO and conversion. You get a prioritised remediation plan that says what to fix, in what order, and what each fix is worth: not a PDF of screenshots.',
        highlights: [
          'Technical, performance and Core Web Vitals review',
          'SEO and indexation health check',
          'UX and conversion heuristic analysis',
          'Findings ranked by effort against impact',
        ],
      },
      {
        name: 'Software Engineering Consultancy',
        summary:
          'Senior Software advice for teams making decisions they only get to make once: replatform or rebuild, Plus or standard, which apps to commit to, how to structure a multi-store or multi-market setup. Independent guidance, with the implementation detail behind it.',
        highlights: [
          'Platform and Enterprise Platform Solutions fit assessment',
          'Architecture, app stack and build-versus-buy reviews',
          'Technical due diligence and roadmap planning',
          'Workshops and ongoing advisory retainers',
        ],
      },
    ],
  },
  {
    id: 'design-development',
    title: 'Design & Development',
    services: [
      {
        name: 'New build projects',
        href: '/software-theme-development-builds/',
        summary:
          'End-to-end custom software builds, from discovery and information architecture through to launch. We plan the storefront around how your customers actually buy, then build it to be fast, accessible and straightforward for your team to merchandise without a developer.',
        highlights: [
          'Discovery, IA and conversion-focused UX',
          'Custom theme built for Core Web Vitals',
          'Flexible sections your team controls',
          'Launch, QA and handover documentation',
        ],
      },
      {
        name: 'Support & Growth',
        href: '/support-and-maintenance/',
        summary:
          'A retained Software team for stores past launch. Bugs get fixed, releases get managed, performance gets monitored: and the hours left over go into the improvements that keep the store moving instead of sitting still.',
        highlights: [
          'Guaranteed response times and release management',
          'Performance and uptime monitoring',
          'Ongoing development capacity each month',
          'Roadmap planning with your team',
        ],
      },
      {
        name: 'Development Services',
        href: '/software-theme-development-builds/',
        summary:
          'software development for teams that already know what they need: custom theme work in Liquid, Software Functions, checkout extensibility, metaobject-driven content and the custom features a stock theme cannot reach.',
        highlights: [
          'Custom Liquid theme and section development',
          'Software Functions and checkout extensibility',
          'Metafield and metaobject content modelling',
          'Code review, refactors and performance work',
        ],
      },
      {
        name: 'Design Services',
        href: '/software-web-design',
        summary:
          'Ecommerce design that holds up commercially. Art direction and a design system that make the brand look like itself on every template, with the buying journey designed around conversion rather than decorated after the fact.',
        highlights: [
          'Art direction and ecommerce design systems',
          'Template and component design across the store',
          'Conversion-focused product and collection pages',
          'Accessible, responsive layouts as standard',
        ],
      },
      {
        name: 'Migrations',
        href: '/software-migrations/',
        summary:
          'Replatforming to Software or Enterprise Platform Solutions from WooCommerce, Magento, BigCommerce or Salesforce Commerce Cloud. Products, customers and order history move across intact, and a complete redirect map protects the organic traffic you already earned.',
        highlights: [
          'Full product, customer and order data migration',
          'Complete URL redirect mapping',
          'SEO parity auditing before and after cutover',
          'Phased cutover with rollback planning',
        ],
      },
      {
        name: 'Internationalisation',
        href: '/software-internationalisation/',
        summary:
          'Cross-border selling built on Software Markets: multi-currency pricing, translated storefronts, domain strategy and the hreflang and duty handling that stop international expansion turning into a support problem.',
        highlights: [
          'Software Markets and multi-currency setup',
          'Multi-language storefronts and translation workflow',
          'Domain, subfolder and hreflang strategy',
          'International SEO and local search visibility',
        ],
      },
      {
        name: 'System Integrations',
        href: '/software-integrations/',
        summary:
          'Connecting Software to the systems that run the business: ERP, PIM, CRM, 3PL, accounting and marketing platforms. Where no connector exists, we build the middleware, with error handling and monitoring so a failed sync surfaces before a customer finds it.',
        highlights: [
          'ERP, PIM, CRM, 3PL and accounting integrations',
          'Custom middleware and API development',
          'Inventory and order sync with conflict handling',
          'Monitoring, retries and failure alerting',
        ],
      },
      {
        name: 'AI Automation & Integration',
        summary:
          'Putting AI to work on the operational load rather than the marketing deck. Product description generation at catalogue scale, support deflection, merchandising and enrichment workflows, integrated into Software with a human review step where accuracy matters.',
        highlights: [
          'Catalogue content generation and enrichment',
          'Support automation and ticket deflection',
          'Internal workflow and back-office automation',
          'AI features built into the storefront experience',
        ],
      },
      {
        name: 'App Development',
        href: '/software-app-development/',
        summary:
          'Custom custom applications, public or private: embedded admin apps, theme app extensions and checkout UI extensions. Built to Custom Application Store standards, whether you are shipping to the store or solving something only your business has.',
        highlights: [
          'Embedded admin apps built with Polaris',
          'Theme app and checkout UI extensions',
          'App Store submission and review readiness',
          'Private apps for internal operations',
        ],
      },
      {
        name: 'Headless Commerce',
        href: '/headless-commerce',
        summary:
          'Headless digital platformfronts built with Hydrogen and deployed on Oxygen, for brands that need full control of the front end. Worth doing when performance, custom UX or a content platform genuinely demands it: we will tell you when it does not.',
        highlights: [
          'Hydrogen and React Router storefronts',
          'Oxygen deployment and edge caching',
          'Storefront API and custom data layers',
          'Headless CMS integration',
        ],
      },
      {
        name: 'Enterprise Software Partners',
        summary:
          'We work as a Enterprise Platform Solutions partner agency for high-volume and enterprise merchants: the accounts where checkout extensibility, B2B company accounts, multi-store architecture and Software Functions do the heavy lifting, and where launches need proper planning.',
        highlights: [
          'Enterprise Platform Solutions architecture and multi-store setup',
          'Checkout extensibility and Software Functions',
          'B2B company accounts and wholesale channels',
          'Enterprise migration and launch planning',
        ],
      },
    ],
  },
  {
    id: 'email-sms',
    title: 'Email & SMS',
    services: [
      {
        name: 'Email & SMS Marketing',
        href: '/email-marketing-agency/',
        summary:
          'Retention programmes that earn their place in the P&L. Lifecycle flows, segmentation and a campaign calendar built on what your customer data actually says: with deliverability treated as a first-class concern, not an afterthought.',
        highlights: [
          'Welcome, abandonment and post-purchase flows',
          'Klaviyo implementation and data integration',
          'Segmentation, RFM and lifecycle strategy',
          'Deliverability, list health and sending reputation',
        ],
      },
    ],
  },
];
