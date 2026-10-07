import fs from 'fs';
import path from 'path';
import {
  CmsDatabaseStore,
  CmsUser,
  CmsSiteContent,
  CmsArticle,
} from './types';
import { hashPassword } from './crypto';
import { ARTICLES_DATA } from '~/data/articlesData';

const DB_FILE_PATH = path.join(process.cwd(), 'app', 'data', 'cms-store.json');

export const DEFAULT_SITE_CONTENT: CmsSiteContent = {
  home: {
    // Section 1: Hero
    heroEyebrow: 'Byte Operator — AI Automation & Custom Software Engineering',
    heroTitlePrefix: 'Byte Operator',
    heroTitleHighlight: 'AI Automation & Custom Software Engineering',
    heroTitleSuffix: '',
    heroSubtitle:
      'Byte Operator is an independent software engineering and AI automation company. We design, engineer, and deploy high-velocity web platforms, custom SaaS architectures, and autonomous AI systems built for extreme performance.',
    primaryCtaText: 'Explore our platforms',
    primaryCtaLink: '#ft-home-hero-gallery',
    secondaryCtaText: 'Book Technical Call',
    secondaryCtaLink: '/book-a-call',
    heroImage: 'https://cdn.shopify.com/s/files/1/0676/1155/7936/files/ryan-waring-164_6wVEHfI-unsplash.jpg?v=1790430992',
    heroShowSection: true,

    // Section 2: Media / Gallery (Checkbox modes: gallery, image, video)
    galleryMediaType: 'gallery',
    gallerySingleImageUrl: 'https://cdn.shopify.com/s/files/1/0676/1155/7936/files/ryan-waring-164_6wVEHfI-unsplash.jpg?v=1790430992',
    gallerySingleImageAlt: 'Byte Operator engineering platforms and modern architecture',
    galleryVideoUrl: '/videos/home-hero-1600.mp4',
    galleryVideoPoster: '/images/home-gallery/home-hero-video-poster.jpg',
    galleryVideoMobileUrl: '/videos/home-hero-960.mp4',
    galleryItems: [
      {
        title: 'Athletic Running Footwear (Concept)',
        image: 'https://cdn.shopify.com/s/files/1/0676/1155/7936/files/ryan-waring-164_6wVEHfI-unsplash.jpg?v=1790430992',
        alt: 'High-performance athletic running footwear',
        url: '/work',
      },
      {
        title: 'Botanical Lotion & Care (Concept)',
        image: 'https://cdn.shopify.com/s/files/1/0676/1155/7936/files/nataliya-melnychuk-51sGDpm5S78-unsplash.jpg?v=1790430987',
        alt: 'Luxury botanical skincare and lotion product',
        url: '/work',
      },
      {
        title: 'Minimalist Glass Beverage (Concept)',
        image: 'https://cdn.shopify.com/s/files/1/0676/1155/7936/files/joan-tran-reEySFadyJQ-unsplash.jpg?v=1790430977',
        alt: 'Minimalist designer glass beverage bottle',
        url: '/work',
      },
      {
        title: 'Wireless Audio Headphones (Concept)',
        image: 'https://cdn.shopify.com/s/files/1/0676/1155/7936/files/kiran-ck-LSNJ-pltdu8-unsplash.jpg?v=1790430955',
        alt: 'Premium wireless headphones and handsfree audio',
        url: '/work',
      },
      {
        title: 'Active Lifestyle Running (Concept)',
        image: 'https://cdn.shopify.com/s/files/1/0676/1155/7936/files/reuben-mansell-nwOip8AOZz0-unsplash.jpg?v=1790431668',
        alt: 'Active runner lifestyle and performance gear',
        url: '/work',
      },
      {
        title: 'Organic Skincare (Concept)',
        image: 'https://cdn.shopify.com/s/files/1/0676/1155/7936/files/mitzie-organics-dnstpPqCBbw-unsplash.jpg?v=1790431660',
        alt: 'Natural organic cosmetic skincare range',
        url: '/work',
      },
      {
        title: 'Organic Facial Essence (Concept)',
        image: 'https://cdn.shopify.com/s/files/1/0676/1155/7936/files/nataliya-melnychuk-51sGDpm5S78-unsplash_837aa5a5-44fa-461d-b117-da92ca95bf85.jpg?v=1790431658',
        alt: 'Luxury organic facial essence and hydration serum',
        url: '/work',
      },
      {
        title: 'Fine Jewelry & Diamonds',
        image: '/images/home-gallery/project-04.webp',
        alt: 'Gold diamond engagement ring and fine jewelry on black silk',
        url: '/work',
      },
      {
        title: 'Nordic Interior Living',
        image: '/images/home-gallery/project-08.webp',
        alt: 'Architectural living room with tufted sofa and marble table',
        url: '/work',
      },
      {
        title: 'Ready-to-Wear Fashion',
        image: '/images/home-gallery/project-05.webp',
        alt: 'Fashion model in cream lace blouse and ensemble',
        url: '/work',
      },
      {
        title: 'Designer Apparel',
        image: '/images/home-gallery/project-11.webp',
        alt: 'Artisan embroidered designer dress presentation',
        url: '/work',
      },
      {
        title: 'Modern Living & Furniture',
        image: '/images/home-gallery/project-01.webp',
        alt: 'Wooden lattice chair and contemporary home decor',
        url: '/work',
      },
      {
        title: 'Handcrafted Headwear',
        image: '/images/home-gallery/project-13.webp',
        alt: 'Straw fedora hat on custom wooden stand',
        url: '/work',
      },
      {
        title: 'Active Streetwear & Boarding',
        image: '/images/home-gallery/project-10.webp',
        alt: 'Urban skateboarder in athletic streetwear',
        url: '/work',
      },
    ],
    galleryShowSection: true,

    // Section 3: About
    aboutShowSection: true,
    aboutEyebrow: 'Independent AI Automation & Custom Software Engineering',
    aboutHeading: 'Byte Operator Architects, Automates & Scales Digital Platforms for Measurable Business Growth',
    aboutDescription:
      'Byte Operator is an independent AI automation and custom software engineering company. We engineer high-performance SaaS platforms, modern web applications, and autonomous AI workflow systems. Powered by our proprietary Replex Engine framework, visual n8n pipelines, and full-stack cloud architectures, we eliminate manual operational bottlenecks, capture every qualified inbound lead, and scale digital revenue.',
    aboutImage: '/images/home-gallery/project-08.webp',
    aboutRightHeadingPrefix: 'About',
    aboutRightHeadingEmphasis: 'Byte Operator',
    aboutRightHeadingSuffix: '— Independent AI & Software Engineering',
    aboutCtaText: 'Explore Our Case Studies',
    aboutCtaLink: '/work',
    aboutStat1Value: '20+',
    aboutStat1Label: 'Projects Delivered',
    aboutStat2Value: '4.9/5.0',
    aboutStat2Label: 'Client Satisfaction',
    aboutStat3Value: '100%',
    aboutStat3Label: 'Job Success Rate',
    aboutStat4Value: '2025',
    aboutStat4Label: 'Established Since',

    // Section 4: Services
    servicesShowSection: true,
    servicesHeading: 'Engineering Capabilities Built for Scale',
    servicesSubtitle:
      'From custom web applications to automated AI systems, our senior engineering teams build for mission-critical reliability.',
    servicesCtaText: 'View all services',
    servicesCtaLink: '/services',
    servicesList: [
      {
        title: 'AI Automations & Autonomous Agents',
        description:
          'Deploy Replex Engine zero-miss lead capture, n8n workflow pipelines, and autonomous support agents.',
        href: '/services/ai-automations-agents',
        badge: '/images/home-services/badges/logo-search-white.svg',
        badgeAlt: 'AI',
      },
      {
        title: 'Custom SaaS & Platform Engineering',
        description:
          'Full-stack web architectures, real-time data engines, and resilient cloud software built to scale.',
        href: '/services/software-developers',
        badge: '/images/home-services/badges/logo-launch-white.svg',
        badgeAlt: 'Software',
      },
      {
        title: 'Shopify Store & Theme Development',
        description:
          'High-velocity custom storefronts, modular custom sections, and mobile-optimized buying funnels.',
        href: '/services/software-web-design',
        badge: '/images/home-services/badges/logo-launch-white.svg',
        badgeAlt: 'Shopify',
      },
      {
        title: 'n8n Workflow & API Pipelines',
        description:
          'Multi-system visual workflow pipelines connecting ERPs, CRMs, webhooks, and messaging queues.',
        href: '/services/software-integrations',
        badge: '',
        badgeAlt: '',
      },
      {
        title: 'Shopify Apps & Custom Extensions',
        description:
          'Proprietary tools like Speedify AI page speed optimizer, custom checkout extensions, and admin apps.',
        href: '/services/shopify-app-development',
        badge: '/images/home-services/badges/logo-sitelab-white.svg',
        badgeAlt: 'Apps',
      },
      {
        title: 'Platform & Cloud Migrations',
        description:
          'Zero-downtime replatforming from Magento, WooCommerce, or BigCommerce with 100% SEO preserved.',
        href: '/services/software-migrations',
        badge: '/images/home-services/badges/logo-helpdesk-white.svg',
        badgeAlt: 'Migrations',
      },
      {
        title: 'Technical SEO & AI Search (GEO)',
        description:
          'Architect your storefront for LLM citation algorithms, sub-second Core Web Vitals, and dominant organic search rankings.',
        href: '/ecommerce-seo-agency',
        badge: '/images/home-services/badges/logo-search-white.svg',
        badgeAlt: 'SEO',
      },
      {
        title: 'Shopify Plus & Enterprise Systems',
        description:
          'Enterprise B2B wholesale portals, multi-store architecture, and high-AOV custom storefronts.',
        href: '/shopify-plus-agency',
        badge: '',
        badgeAlt: '',
      },
    ],

    // Section 5: Projects / Case Studies
    projectsShowSection: true,
    projectsHeading:
      'We partner with growing brands to deliver high-impact ecommerce strategies combining proven Software expertise with a search-first growth mindset.',
    projectsSubtitle: 'Explore how we engineered 2x+ conversion lifts and scalable platform architectures.',
    projectsImage: '/images/home-gallery/project-04.webp',
    projectsList: [
      {
        title: 'Collabix',
        type: 'Custom SaaS & Enterprise Platform',
        href: '/services/software-developers',
        image:
          'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/custom_software_case_study.png?v=1790400442',
        alt: 'Collabix custom software and SaaS platform architecture',
      },
      {
        title: 'Autonomous AI Agents',
        type: 'Multi-Agent Task Orchestration & Automated Workflows',
        href: '/services/ai-automations-agents',
        image:
          'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/second_autmation_imaeg.webp?v=1790409459',
        alt: 'Autonomous AI agent orchestration and workflow platform',
      },
      {
        title: 'Replex Engine',
        type: 'Autonomous AI Lead Capture & Sub-Minute Replies',
        href: '/services/ai-automations-agents',
        image:
          'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/replex.png?v=1790409470',
        alt: 'Replex Engine AI communication and lead automation platform',
      },
      {
        title: 'Kids Wonderland',
        type: 'Shopify Store Development & Custom Catalog',
        href: '/services/software-web-design',
        image:
          'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/toys.webp?v=1790407473',
        alt: 'Kids Wonderland toy store development',
      },
      {
        title: 'Nordic Haven Furniture',
        type: 'Shopify Plus & Luxury Furniture Storefront',
        href: '/shopify-plus-agency',
        image:
          'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/furniture.webp?v=1790407636',
        alt: 'Nordic Haven luxury furniture digital storefront',
      },
      {
        title: 'OmniRetail CRO & Migration',
        type: 'Conversion Rate Optimisation & Enterprise Migration',
        href: '/services/software-migrations',
        image:
          'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/shopify_cro_and_migration_store.webp?v=1790407473',
        alt: 'Shopify CRO and enterprise platform migration',
      },
    ],

    // Section 6: Features
    featuresShowSection: true,
    featureImage: '/images/mega-menu-resources.webp',

    // Section 7: People / Team
    peopleShowSection: true,
    peopleEyebrow: 'Senior Engineers, AI Architects & Growth Strategists',
    peopleHeadingFirstLine: 'Engineering-led',
    peopleHeadingSecondLine: 'software & AI agency',
    peopleDescription:
      'A specialized engineering team focused on full-stack web platforms, AI workflow automations, and modern ecommerce architecture, helping ambitious brands scale faster and operate smarter.',
    peopleImage: '/images/home-people/people.webp',
    peopleButtonLabel: 'About Byte Operator',
    peopleButtonLink: '/about',

    // Section 8: Partners & Experts
    partnersShowSection: true,
    expertsShowSection: true,
    expertsEyebrow: 'Senior Engineering Team',
    expertsTitle: 'Dedicated Software Engineers & AI Specialists',
    expertsDescription: 'Work directly with senior developers and solution architects.',

    // Section 9: Observatory / Final Callout
    observatoryShowSection: true,
    observatoryEyebrow: 'Senior Engineering & AI Architects',
    observatoryHeading: 'Ready to architect your next software platform, Shopify store, or AI automation?',
    observatorySubtitle:
      'Byte Operator partners directly with ambitious founders and enterprise brands to design, engineer, and deploy high-impact digital solutions.',
    observatoryDescriptionSecondary:
      'Speak directly with our senior software engineers and AI automation architects to map your technical roadmap.',
    observatoryImage: 'https://cdn.shopify.com/s/files/1/0676/1155/7936/files/joan-tran-reEySFadyJQ-unsplash.jpg?v=1790430977',
    observatoryShowImage: true,
    observatoryCtaText: 'Book Architecture Call',
    observatoryCtaLink: '/book-a-call',

    // SEO
    seoTitle: 'Byte Operator — AI Automation & Custom Software Engineering',
    seoDescription:
      'Byte Operator is an independent software engineering and AI automation company. We design, engineer, and deploy high-velocity web platforms, custom SaaS architectures, and autonomous AI systems.',
  },
  about: {
    heroEyebrow: 'Engineering & Innovation',
    heroTitle: 'We Build Scalable Software That Powers High-Growth Brands',
    heroDescription:
      'Byte Operator is an elite team of full-stack engineers, cloud architects, and conversion specialists dedicated to building resilient digital infrastructure.',
    storyHeading: 'Our Mission & Architectural Philosophy',
    storyParagraph1:
      'We believe technology should be an unfair competitive advantage, not an operational bottleneck. We replace fragile monoliths with modular, sub-second composable architectures.',
    storyParagraph2:
      'Every line of code we write is optimized for Core Web Vitals, organic search equity, and conversion psychology.',
    statTeamCount: '45+',
    statRetentionRate: '98.4%',
    statClientRating: '4.9/5',
    statProjectsDelivered: '250+',
    valuesHeading: 'Core Engineering Principles',
    valuesSubtitle: 'The architectural standards and performance metrics that guide every project we deliver.',
    heroImage: 'https://cdn.shopify.com/s/files/1/0676/1155/7936/files/nataliya-melnychuk-51sGDpm5S78-unsplash.jpg?v=1790430987',
    storyImage: 'https://cdn.shopify.com/s/files/1/0676/1155/7936/files/reuben-mansell-nwOip8AOZz0-unsplash.jpg?v=1790431668',
    spaceImage: 'https://cdn.shopify.com/s/files/1/0676/1155/7936/files/mitzie-organics-dnstpPqCBbw-unsplash.jpg?v=1790431660',
    seoTitle: 'About Us | Byte Operator Software & AI Agency',
    seoDescription: 'Elite team of full-stack engineers, cloud architects, and conversion specialists building resilient digital infrastructure.',
  },
  services: {
    heroEyebrow: 'Comprehensive Engineering Services',
    heroTitle: 'Full-Stack Web Development, Headless Commerce & AI Systems',
    heroSubtitle:
      'End-to-end technical execution from architecture design to post-launch optimization, backed by senior specialists.',
    ctaHeading: 'Looking for a Tailored Technical Architecture?',
    ctaSubtitle: 'Discuss your technical requirements with our engineering team.',
    ctaButtonText: 'Schedule Technical Discovery',
    heroImage: 'https://cdn.shopify.com/s/files/1/0676/1155/7936/files/joan-tran-reEySFadyJQ-unsplash.jpg?v=1790430977',
    featureImage: '/images/home-gallery/project-05.webp',
    seoTitle: 'Engineering Services | Byte Operator',
    seoDescription: 'Full-stack web development, headless commerce architectures, and autonomous AI automation pipelines.',
  },
  work: {
    heroEyebrow: 'Case Studies & Production Platforms',
    heroTitle: 'Proven Engineering Outcomes and Scalable Architectures',
    heroSubtitle:
      'Explore real-world case studies demonstrating conversion lifts, headless replatforming, and AI pipeline automations.',
    ctaHeading: 'Ready to Scale Your Infrastructure?',
    ctaSubtitle: 'Our senior architects are available to review your codebase and roadmap.',
    heroImage: 'https://cdn.shopify.com/s/files/1/0676/1155/7936/files/kiran-ck-LSNJ-pltdu8-unsplash.jpg?v=1790430955',
    showcaseImage: '/images/home-gallery/project-11.webp',
    seoTitle: 'Case Studies & Client Work | Byte Operator',
    seoDescription: 'Explore our recent custom software, SaaS platform, and high-conversion ecommerce replatforming case studies.',
  },
  contact: {
    heroEyebrow: 'Get In Touch',
    heroTitle: 'Let’s Architect Something Exceptional Together',
    heroSubtitle:
      'Have an enterprise project or replatforming roadmap? Reach out directly to our engineering leadership.',
    directPhone: '+1-512-387-6926',
    salesEmail: 'sales@byteoperator.com',
    supportEmail: 'support@byteoperator.com',
    officeAddress: '1001 South Main Street, Suite 500, Kalispell, MT 59901',
    heroImage: '/images/home-gallery/project-01.webp',
    seoTitle: 'Contact Our Engineering Team | Byte Operator',
    seoDescription: 'Get in touch with Byte Operator leadership for enterprise software development and AI engineering projects.',
  },
  bookACall: {
    heroEyebrow: 'Schedule Strategy Call',
    heroTitle: 'Book a 30-Minute Architecture & Engineering Discovery',
    heroSubtitle:
      'Meet directly with our senior software engineers to discuss your architecture, tech stack, and scalability requirements.',
    calendlyNotice: 'Select a time on the interactive calendar below.',
    ctaButtonText: 'Confirm Session',
    heroImage: 'https://cdn.shopify.com/s/files/1/0676/1155/7936/files/ryan-waring-164_6wVEHfI-unsplash.jpg?v=1790430992',
    seoTitle: 'Book Technical Discovery Call | Byte Operator',
    seoDescription: 'Schedule a 30-minute technical architecture call with Byte Operator senior software engineers.',
  },
  shopifyPlus: {
    heroEyebrow: 'Shopify Plus Enterprise Agency',
    heroTitle: 'Enterprise Shopify Plus Engineering, Apps & Replatforming',
    heroSubtitle:
      'Custom theme architecture, bespoke checkout extensibility, and ERP/CRM integrations built for 8-figure brands.',
    ctaHeading: 'Scale Your Shopify Plus Infrastructure',
    ctaSubtitle: 'Get in touch for a comprehensive technical architecture review.',
    ctaButtonText: 'Book Technical Consultation',
    heroImage: '/images/home-gallery/project-04.webp',
    featureImage: '/images/home-gallery/project-05.webp',
  },
  ecommerceSeo: {
    heroEyebrow: 'Organic Search & Technical SEO',
    heroTitle: 'Technical Ecommerce SEO & Generative AI Search Visibility',
    heroSubtitle:
      'Architect your store for sub-second Core Web Vitals, programmatic content scaling, and LLM answer engine visibility.',
    ctaHeading: 'Dominate Organic Search Rankings',
    ctaSubtitle: 'Request an in-depth technical SEO and architecture audit.',
    ctaButtonText: 'Request Technical Audit',
    heroImage: '/images/home-gallery/project-08.webp',
    featureImage: '/images/home-gallery/project-11.webp',
  },
  shopifyCro: {
    heroEyebrow: 'Conversion Rate Engineering',
    heroTitle: 'Full-Funnel Conversion Optimization & UX Audits',
    heroSubtitle:
      'Eliminate checkout friction, accelerate page velocity, and engineer data-backed user journeys that multiply revenue.',
    ctaHeading: 'Unlock Latent Conversion Potential',
    ctaSubtitle: 'Get a senior CRO specialist to analyze your storefront.',
    ctaButtonText: 'Order CRO Audit',
    heroImage: 'https://cdn.shopify.com/s/files/1/0676/1155/7936/files/nataliya-melnychuk-51sGDpm5S78-unsplash.jpg?v=1790430987',
    featureImage: '/images/mega-menu-resources.webp',
  },
  aiAudit: {
    heroEyebrow: 'AI Search Visibility Audit',
    heroTitle: 'Prepare Your Brand for ChatGPT, Claude & Perplexity Search',
    heroSubtitle:
      'Comprehensive analysis of your brand’s presence across LLMs, generative search engines, and structured data schemas.',
    ctaHeading: 'Claim Your AI Search Footprint',
    ctaSubtitle: 'Receive a full diagnostic report with clear implementation steps.',
    ctaButtonText: 'Request AI Audit',
    heroImage: 'https://cdn.shopify.com/s/files/1/0676/1155/7936/files/joan-tran-reEySFadyJQ-unsplash.jpg?v=1790430977',
    featureImage: '/images/home-gallery/project-01.webp',
  },
  guides: {
    heroEyebrow: 'Technical Guides & Frameworks',
    heroTitle: 'In-Depth Engineering Roadmaps & Architecture Guides',
    heroSubtitle:
      'Actionable walkthroughs covering Next.js App Router, Headless Shopify, AI pipelines, and Core Web Vitals optimization.',
    ctaText: 'Explore Guides',
    heroImage: '/images/mega-menu-resources.webp',
    coverImage: '/images/home-gallery/project-04.webp',
  },
  podcasts: {
    heroEyebrow: 'Engineering Leadership Audio',
    heroTitle: 'The Byte Operator Podcast & Architecture Breakdowns',
    heroSubtitle:
      'Conversations with technical founders, VP of Engineering leaders, and cloud architects on building scalable software.',
    ctaText: 'Listen on Apple & Spotify',
    heroImage: '/images/home-gallery/project-05.webp',
    coverImage: '/images/home-gallery/project-08.webp',
  },
  webinars: {
    heroEyebrow: 'Live Technical Masterclasses',
    heroTitle: 'Interactive Workshops on Modern Software & AI Engineering',
    heroSubtitle:
      'Watch past recordings and register for upcoming interactive architectural masterclasses.',
    ctaText: 'Register for Next Workshop',
    heroImage: '/images/home-gallery/project-11.webp',
    coverImage: '/images/home-gallery/project-01.webp',
  },
  newsletter: {
    heroEyebrow: 'Weekly Architecture Dispatch',
    heroTitle: 'Senior Software & AI Insights Delivered to Your Inbox',
    heroSubtitle:
      'No fluff. Just architectural breakdowns, benchmark analyses, and production code patterns every Thursday.',
    ctaText: 'Subscribe for Free',
    heroImage: '/images/mega-menu-resources.webp',
    coverImage: 'https://cdn.shopify.com/s/files/1/0676/1155/7936/files/kiran-ck-LSNJ-pltdu8-unsplash.jpg?v=1790430955',
  },
  privacyPolicy: {
    title: 'Privacy Policy',
    lastUpdated: 'September 2026',
    summary: 'How Byte Operator collects, protects, and handles your data.',
    contentHtml: '<p>Byte Operator LLC is committed to protecting your privacy. We strictly follow GDPR, CCPA, and global data privacy standards.</p>',
  },
  termsOfService: {
    title: 'Terms of Service',
    lastUpdated: 'September 2026',
    summary: 'The contractual terms governing the use of Byte Operator services and website.',
    contentHtml: '<p>By accessing or contracting services with Byte Operator LLC, you agree to these terms of service.</p>',
  },
  refundPolicy: {
    title: 'Refund Policy',
    lastUpdated: 'September 2026',
    summary: 'Information regarding our milestone billing, deposits, and satisfaction guarantees.',
    contentHtml: '<p>All consulting and engineering retainers are billed based on agreed milestone deliverables and sprint estimates.</p>',
  },
  subscriptionPolicy: {
    title: 'Subscription & Retainer Policy',
    lastUpdated: 'September 2026',
    summary: 'Terms regarding continuous engineering sprints and recurring technical retainers.',
    contentHtml: '<p>Monthly dedicated engineering retainers can be paused or cancelled with a standard 30-day written notice period.</p>',
  },
  servicePages: {
    'software-developers': {
      eyebrow: 'Custom Software Engineering',
      heading: 'Custom Web Applications, SaaS Platforms & Cloud Infrastructure',
      description: 'We architect and build bespoke full-stack applications, resilient multi-tenant SaaS platforms, and enterprise cloud solutions designed for high concurrency.',
      ctaButtonText: 'Book Technical Call',
      heroImage: 'https://cdn.shopify.com/s/files/1/0676/1155/7936/files/ryan-waring-164_6wVEHfI-unsplash.jpg?v=1790430992',
      seoTitle: 'Custom Software & Platforms | Byte Operator',
      seoDescription: 'We architect and build bespoke full-stack applications, resilient multi-tenant SaaS platforms, and enterprise cloud solutions.',
    },
    'software-web-design': {
      eyebrow: 'Web Engineering & Architecture',
      heading: 'High-Performance Web Platforms Engineered for Scale',
      description: 'Sub-second page speeds, modern Next.js App Router frontends, and modular backend APIs built for Core Web Vitals excellence.',
      ctaButtonText: 'Book Technical Call',
      heroImage: 'https://cdn.shopify.com/s/files/1/0676/1155/7936/files/nataliya-melnychuk-51sGDpm5S78-unsplash.jpg?v=1790430987',
      seoTitle: 'Full-Stack Web Development | Byte Operator',
      seoDescription: 'Sub-second page speeds, modern Next.js App Router frontends, and modular backend APIs built for Core Web Vitals excellence.',
    },
    'ai-automations-agents': {
      eyebrow: 'Autonomous AI Automations',
      heading: 'Autonomous AI Agents, n8n Pipelines & Lead Engines',
      description: 'Automate customer replies, document synthesis, and multi-agent business operations with custom-engineered LLM workflows.',
      ctaButtonText: 'Book Technical Call',
      heroImage: 'https://cdn.shopify.com/s/files/1/0676/1155/7936/files/joan-tran-reEySFadyJQ-unsplash.jpg?v=1790430977',
      seoTitle: 'AI Automations & Agents | Byte Operator',
      seoDescription: 'Automate customer replies, document synthesis, and multi-agent business operations with custom-engineered LLM workflows.',
    },
    'shopify-web-design': {
      eyebrow: 'Shopify Store Engineering',
      heading: 'High-Converting Custom Shopify & Hydrogen Storefronts',
      description: 'Custom liquid themes, headless Hydrogen apps, and bespoke checkout extensions optimized for conversion and revenue.',
      ctaButtonText: 'Book Technical Call',
      heroImage: 'https://cdn.shopify.com/s/files/1/0676/1155/7936/files/kiran-ck-LSNJ-pltdu8-unsplash.jpg?v=1790430955',
      seoTitle: 'Shopify Store Development | Byte Operator',
      seoDescription: 'Custom liquid themes, headless Hydrogen apps, and bespoke checkout extensions optimized for conversion and revenue.',
    },
    'software-integrations': {
      eyebrow: 'System & API Integration',
      heading: 'Mission-Critical ERP, CRM & Webhook Data Pipelines',
      description: 'Connect fragmented software systems with automated, bidirectional, real-time data sync and failure-recovery webhooks.',
      ctaButtonText: 'Book Technical Call',
      heroImage: 'https://cdn.shopify.com/s/files/1/0676/1155/7936/files/reuben-mansell-nwOip8AOZz0-unsplash.jpg?v=1790431668',
      seoTitle: 'API & System Integrations | Byte Operator',
      seoDescription: 'Connect fragmented software systems with automated, bidirectional, real-time data sync and failure-recovery webhooks.',
    },
    'ecommerce-seo': {
      eyebrow: 'Technical Ecommerce SEO',
      heading: 'Deep Technical Audits, Programmatic Scaling & Search Equity',
      description: 'Fix crawl budget bottlenecks, schema markup, faceted navigation equity, and indexation architectures for organic dominance.',
      ctaButtonText: 'Book Technical Call',
      heroImage: 'https://cdn.shopify.com/s/files/1/0676/1155/7936/files/mitzie-organics-dnstpPqCBbw-unsplash.jpg?v=1790431660',
      seoTitle: 'Technical SEO & Architecture | Byte Operator',
      seoDescription: 'Fix crawl budget bottlenecks, schema markup, faceted navigation equity, and indexation architectures for organic dominance.',
    },
  },
};

export function deepMergeSiteContent(defaultContent: CmsSiteContent, savedContent: Partial<CmsSiteContent> = {}): CmsSiteContent {
  const mergedServicePages: Record<string, any> = {
    ...(defaultContent.servicePages || {}),
  };

  if (savedContent.servicePages) {
    for (const [key, val] of Object.entries(savedContent.servicePages)) {
      mergedServicePages[key] = {
        ...(mergedServicePages[key] || {}),
        ...val,
      };
    }
  }

  return {
    home: { ...defaultContent.home, ...(savedContent.home || {}) },
    about: { ...defaultContent.about, ...(savedContent.about || {}) },
    services: { ...defaultContent.services, ...(savedContent.services || {}) },
    work: { ...defaultContent.work, ...(savedContent.work || {}) },
    contact: { ...defaultContent.contact, ...(savedContent.contact || {}) },
    bookACall: { ...defaultContent.bookACall, ...(savedContent.bookACall || {}) },
    shopifyPlus: { ...defaultContent.shopifyPlus, ...(savedContent.shopifyPlus || {}) },
    ecommerceSeo: { ...defaultContent.ecommerceSeo, ...(savedContent.ecommerceSeo || {}) },
    shopifyCro: { ...defaultContent.shopifyCro, ...(savedContent.shopifyCro || {}) },
    aiAudit: { ...defaultContent.aiAudit, ...(savedContent.aiAudit || {}) },
    guides: { ...defaultContent.guides, ...(savedContent.guides || {}) },
    podcasts: { ...defaultContent.podcasts, ...(savedContent.podcasts || {}) },
    webinars: { ...defaultContent.webinars, ...(savedContent.webinars || {}) },
    newsletter: { ...defaultContent.newsletter, ...(savedContent.newsletter || {}) },
    privacyPolicy: { ...defaultContent.privacyPolicy, ...(savedContent.privacyPolicy || {}) },
    termsOfService: { ...defaultContent.termsOfService, ...(savedContent.termsOfService || {}) },
    refundPolicy: { ...defaultContent.refundPolicy, ...(savedContent.refundPolicy || {}) },
    subscriptionPolicy: { ...defaultContent.subscriptionPolicy, ...(savedContent.subscriptionPolicy || {}) },
    servicePages: mergedServicePages,
  };
}

function seedInitialArticles(): CmsArticle[] {
  return ARTICLES_DATA.map((art) => ({
    id: art.id,
    handle: art.handle,
    title: art.title,
    excerpt: art.excerpt || '',
    contentHtml: art.contentHtml || '',
    publishedAt: art.publishedAt,
    category: art.category || 'cro',
    articleType: art.articleType || 'Article',
    featured: Boolean(art.featured),
    mainFeatured: Boolean(art.mainFeatured),
    status: 'published',
    image: {
      url: art.image?.url || '/images/mega-menu-resources.webp',
      altText: art.image?.altText || art.title,
      width: art.image?.width || 1200,
      height: art.image?.height || 675,
    },
    seo: {
      title: art.seo?.title || art.title,
      description: art.seo?.description || art.excerpt || '',
    },
  }));
}

function initializeDefaultDatabase(): CmsDatabaseStore {
  const { hash, salt } = hashPassword('sami@1234');
  const defaultUser: CmsUser = {
    id: 'usr_admin_default',
    email: 'samiullahqureshi@gmail.com',
    passwordHash: hash,
    salt: salt,
    twoFactorEnabled: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return {
    users: [defaultUser],
    siteContent: DEFAULT_SITE_CONTENT,
    articles: seedInitialArticles(),
  };
}

export function getCmsDb(): CmsDatabaseStore {
  try {
    if (!fs.existsSync(DB_FILE_PATH)) {
      const initial = initializeDefaultDatabase();
      saveCmsDb(initial);
      return initial;
    }

    const content = fs.readFileSync(DB_FILE_PATH, 'utf-8');
    const db: CmsDatabaseStore = JSON.parse(content);

    // Verify default user exists
    if (!db.users || db.users.length === 0) {
      const initial = initializeDefaultDatabase();
      db.users = initial.users;
      saveCmsDb(db);
    } else {
      const hasAdmin = db.users.some(
        (u) => u.email.toLowerCase() === 'samiullahqureshi@gmail.com'
      );
      if (!hasAdmin) {
        const { hash, salt } = hashPassword('sami@1234');
        db.users.push({
          id: 'usr_admin_' + Date.now(),
          email: 'samiullahqureshi@gmail.com',
          passwordHash: hash,
          salt: salt,
          twoFactorEnabled: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
        saveCmsDb(db);
      }
    }

    // Merge missing site content keys with default
    db.siteContent = deepMergeSiteContent(DEFAULT_SITE_CONTENT, db.siteContent || {});

    if (!db.articles || db.articles.length === 0) {
      db.articles = seedInitialArticles();
      saveCmsDb(db);
    }

    return db;
  } catch (err) {
    console.error('Error reading CMS database, fallback to initialized state:', err);
    const initial = initializeDefaultDatabase();
    return initial;
  }
}

export function saveCmsDb(data: CmsDatabaseStore): void {
  try {
    const dir = path.dirname(DB_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to save CMS database to file:', err);
  }
}

export function getUserByEmail(email: string): CmsUser | undefined {
  const db = getCmsDb();
  return db.users.find((u) => u.email.toLowerCase() === email.toLowerCase().trim());
}

export function getUserById(id: string): CmsUser | undefined {
  const db = getCmsDb();
  return db.users.find((u) => u.id === id);
}

export function updateUser(updatedUser: CmsUser): void {
  const db = getCmsDb();
  const index = db.users.findIndex((u) => u.id === updatedUser.id);
  if (index !== -1) {
    db.users[index] = { ...updatedUser, updatedAt: new Date().toISOString() };
    saveCmsDb(db);
  }
}

export function getSiteContent(): CmsSiteContent {
  const db = getCmsDb();
  return deepMergeSiteContent(DEFAULT_SITE_CONTENT, db.siteContent || {});
}

export function updateSiteContent(updates: Partial<CmsSiteContent>): CmsSiteContent {
  const db = getCmsDb();
  db.siteContent = deepMergeSiteContent(DEFAULT_SITE_CONTENT, {
    ...(db.siteContent || {}),
    ...updates,
  });
  saveCmsDb(db);
  return db.siteContent;
}

export function getCmsArticles(includeDrafts = false): CmsArticle[] {
  const db = getCmsDb();
  if (includeDrafts) {
    return db.articles || [];
  }
  return (db.articles || []).filter((a) => a.status === 'published');
}

export function getCmsArticleByHandle(handle: string): CmsArticle | undefined {
  const db = getCmsDb();
  return (db.articles || []).find((a) => a.handle === handle || a.id === handle);
}

export function createCmsArticle(
  articleData: Omit<CmsArticle, 'id' | 'publishedAt'>
): CmsArticle {
  const db = getCmsDb();
  const id = `art_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const newArticle: CmsArticle = {
    ...articleData,
    id,
    publishedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  db.articles.unshift(newArticle);
  saveCmsDb(db);
  return newArticle;
}

export function updateCmsArticle(
  id: string,
  updates: Partial<CmsArticle>
): CmsArticle | undefined {
  const db = getCmsDb();
  const index = db.articles.findIndex((a) => a.id === id || a.handle === id);
  if (index === -1) return undefined;

  db.articles[index] = {
    ...db.articles[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  saveCmsDb(db);
  return db.articles[index];
}

export function deleteCmsArticle(id: string): boolean {
  const db = getCmsDb();
  const initialLength = db.articles.length;
  db.articles = db.articles.filter((a) => a.id !== id && a.handle !== id);
  if (db.articles.length !== initialLength) {
    saveCmsDb(db);
    return true;
  }
  return false;
}
