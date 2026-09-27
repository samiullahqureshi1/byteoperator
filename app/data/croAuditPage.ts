import type {ServicePageConfig} from '~/data/servicePages';

/*
  /shopify-cro-audit — Shopify CRO audit landing page.
  Built only from what Byte Operator already offers elsewhere on the site
  (the CRO audit description on /services/software-audits, the conversion
  areas in SoftwareCroOptimise, CRO retainers on /services/memberships).
  No results, percentages or client outcomes: add them only with evidence.
*/

const CRO_IMAGE = {
  primary: 'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/shopify_cro_and_migration_store.webp?v=1790407473',
  primaryWidth: 1920,
  primaryHeight: 1080,
};

export const CRO_AUDIT_TITLE = 'Shopify CRO Audit & Conversion Optimization';

export const CRO_AUDIT_PAGE: ServicePageConfig = {
  faqTitle: 'Shopify CRO Audit FAQs',
  showTestimonial: false,
  hero: {
    eyebrow: 'Shopify CRO Audit',
    heading: CRO_AUDIT_TITLE,
    description:
      'A structured review of how shoppers move through your Shopify store, from landing page to completed order, with a prioritised list of conversion fixes and ideas worth testing.',
    chips: [
      'Product & Collection Pages',
      'Cart & Checkout',
      'Mobile Experience',
      'Navigation & Search',
      'Analytics Review',
    ],
    primaryCta: {label: 'Book a CRO Audit Call', href: '/book-a-call'},
    showPartnerLogos: false,
    showClientProof: false,
  },
  about: {
    intro: {
      heading: 'What the Shopify CRO Audit Is',
      description:
        'A CRO audit reviews the journey from landing page to completed order: product pages, collection filtering, search, cart, checkout, and the messaging around delivery, returns and payment. We look at your analytics alongside the storefront itself, so each observation is grounded in how customers actually move through the site rather than in opinion.',
      cta: {label: 'Book a CRO Audit Call', href: '/book-a-call'},
    },
    media: {
      ...CRO_IMAGE,
      primaryAlt: 'Shopify storefront reviewed during a conversion rate optimization audit',
      secondary: '',
      secondaryWidth: 0,
      secondaryHeight: 0,
      secondaryAlt: '',
    },
    process: {
      heading: 'How the CRO Audit Works',
      leftDescription:
        '01: Goals & Context\nWe start with what the store sells, who buys, and which journeys matter most to revenue.\n\n02: Analytics Review\nWe review the analytics you already have to see where visitors drop out between product view, cart, checkout and purchase.\n\n03: Storefront Review\nWe walk the key journeys on mobile and desktop: homepage, navigation, collections, product pages, cart and checkout.',
      rightDescription:
        '04: Prioritisation\nFindings are grouped by page type and ranked, so the changes most likely to matter come first.\n\n05: Fix or Test\nEach opportunity is marked as a straightforward fix or as a change worth testing properly before it is rolled out.\n\n06: Next Steps\nYou can implement the recommendations with your own team, or with ours.',
      cta: {label: 'Discuss Your Store', href: '/contact'},
    },
  },
  features: [
    {
      id: 'cro-audit-deliverables',
      layout: 'media-left',
      spacing: 'first',
      theme: 'dark',
      eyebrow: 'Deliverables',
      heading: 'What You Receive',
      description: [
        'Findings for each area reviewed, grouped by page type, so it is clear where each issue sits in the customer journey.',
        'A prioritised list of opportunities, separated into straightforward fixes and changes that are worth A/B testing before they go live.',
        'If you want help implementing the changes, our team can take them on as a project or as part of a monthly retainer.',
      ],
      buttons: [
        {label: 'Book a CRO Audit Call', href: '/book-a-call'},
        {label: 'Explore Monthly Retainers', href: '/services/memberships'},
      ],
      media: {
        ...CRO_IMAGE,
        primaryAlt: 'Prioritised CRO audit findings for a Shopify store',
        secondary: '',
        secondaryWidth: 0,
        secondaryHeight: 0,
        secondaryAlt: '',
        captionTitle: 'Prioritised Findings',
        captionText: 'Fixes and test ideas grouped by page type and ranked by priority',
        href: '/contact',
      },
    },
    {
      id: 'cro-audit-who-for',
      layout: 'media-right',
      spacing: 'standard',
      theme: 'dark',
      eyebrow: 'Who It Is For',
      heading: 'Who This Audit Is For',
      description: [
        'Shopify and Shopify Plus stores that already get traffic but feel the store should be converting more of it.',
        'Brands planning a redesign that want to know what to fix and keep before they start.',
        'Teams that want a prioritised conversion roadmap instead of a long list of unranked ideas.',
      ],
      buttons: [{label: 'Book a CRO Audit Call', href: '/book-a-call'}],
      media: {
        primary: 'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/manage_products_of_aydi.png?v=1790403225',
        primaryWidth: 1920,
        primaryHeight: 1080,
        primaryAlt: 'Shopify store product management for conversion improvements',
        secondary: '',
        secondaryWidth: 0,
        secondaryHeight: 0,
        secondaryAlt: '',
        captionTitle: 'Shopify & Shopify Plus Stores',
        captionText: 'For stores with traffic that want a clear, prioritised conversion plan',
        href: '/contact',
      },
    },
    {
      id: 'cro-audit-other-audits',
      layout: 'media-left',
      spacing: 'standard',
      theme: 'dark',
      eyebrow: 'Choosing an Audit',
      heading: 'How This Differs From Our Other Audits',
      description: [
        'The CRO audit focuses on conversion: how easily shoppers find products, decide and complete an order.',
        'If page speed and Core Web Vitals are the main concern, a Shopify speed audit goes deeper into theme code, apps and scripts. For a wider review of UX, development, SEO and performance together, choose a full digital platform audit.',
      ],
      buttons: [
        {label: 'Explore Speed & Core Web Vitals Audits', href: '/services/shopify-audits'},
        {label: 'Explore Digital Platform Audits', href: '/services/software-audits'},
      ],
      media: {
        primary: '/images/services/services-wide.webp',
        primaryWidth: 1672,
        primaryHeight: 941,
        primaryAlt: 'Comparing CRO, speed and platform audits',
        secondary: '',
        secondaryWidth: 0,
        secondaryHeight: 0,
        secondaryAlt: '',
        captionTitle: 'CRO, Speed or Full Audit',
        captionText: 'Pick the audit that matches the problem you need to solve',
        href: '/services',
      },
    },
    {
      id: 'cro-audit-proof',
      layout: 'media-right',
      spacing: 'deep',
      theme: 'dark',
      eyebrow: 'Related Work',
      heading: 'Conversion-Focused Shopify Work',
      description: [
        'For Aydi Active, Byte Operator built a custom Shopify Plus storefront with mobile CRO in scope: easier swatch selection, a size calculator, quick-buy drawers and a sticky cart.',
        'For Kids Wonderland, we reworked product discovery and the cart: age and interest filters, an interactive gift finder and a cart drawer with shipping progress and add-ons.',
      ],
      buttons: [
        {label: 'Read the Aydi Active Case Study', href: '/work/aydi-active'},
        {label: 'Read the Kids Wonderland Case Study', href: '/work/kids-wonderland'},
      ],
      media: {
        primary: 'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/manage_products_of_aydi.png?v=1790403225',
        primaryWidth: 1920,
        primaryHeight: 1080,
        primaryAlt: 'Aydi Active Shopify Plus storefront',
        secondary: '',
        secondaryWidth: 0,
        secondaryHeight: 0,
        secondaryAlt: '',
        captionTitle: 'Aydi Active',
        captionText: 'Custom Shopify Plus storefront with mobile CRO',
        href: '/work/aydi-active',
      },
    },
  ],
  faqs: [
    {
      question: 'What is a Shopify CRO audit?',
      answer:
        'A Shopify CRO (conversion rate optimization) audit reviews how shoppers move through your store, from landing page to completed order, and identifies what makes it harder for them to buy. The result is a prioritised list of fixes and ideas worth testing.',
    },
    {
      question: 'What does the audit cover?',
      answer:
        'Product and collection pages, homepage and landing pages, navigation and site search, cart and checkout, pricing and promotions, and the mobile experience, reviewed alongside your analytics.',
    },
    {
      question: 'What do we receive at the end?',
      answer:
        'Findings grouped by page type and a prioritised list of opportunities, each marked as a straightforward fix or a change worth A/B testing first.',
    },
    {
      question: 'Do you implement the recommendations?',
      answer:
        'You can implement them with your own team, or Byte Operator can take them on as a project or as part of a monthly retainer.',
    },
    {
      question: 'How is this different from a speed audit?',
      answer:
        'A CRO audit focuses on the customer journey and conversion. A Shopify speed audit focuses on Core Web Vitals, theme code, apps and scripts. Many stores benefit from both, and they can be run together.',
    },
  ],
  experts: {
    eyebrow: 'Shopify CRO Audit',
    heading: 'Find out what is holding back your store’s conversions',
    description:
      'Book a call to talk through your store, your goals and what a CRO audit would cover.',
    ctaLabel: 'Book a CRO Audit Call',
    testimonials: [],
  },
};
