'use client';

import {useState} from 'react';
import {
  ECOMMERCE_PLATFORM_LOGOS,
  TECH_STACK_LOGOS,
  PARTNER_LOGOS,
  CONTACT_PARTNER_LOGOS,
  ECOMMERCE_SEO_PARTNER_LOGOS,
  type PartnerLogo,
} from '~/data/partnerLogos';

export {
  ECOMMERCE_PLATFORM_LOGOS,
  TECH_STACK_LOGOS,
  PARTNER_LOGOS,
  CONTACT_PARTNER_LOGOS,
  ECOMMERCE_SEO_PARTNER_LOGOS,
};

export interface TechCategory {
  category: string;
  items: readonly string[];
}

export const ALL_TECHNOLOGY_CATEGORIES: readonly TechCategory[] = [
  {
    category: 'Ecommerce & Headless Platforms',
    items: [
      'Shopify & Shopify Plus',
      'Shopify Hydrogen & Oxygen',
      'BigCommerce',
      'WooCommerce & WordPress',
      'Adobe Commerce (Magento)',
      'Salesforce Commerce Cloud',
      'Shopware',
      'PrestaShop',
      'OpenCart',
      'Squarespace',
      'Wix Studio',
    ],
  },
  {
    category: 'Frontend & Web Development',
    items: [
      'Next.js (App Router & SSR)',
      'React 18 & React 19',
      'TypeScript',
      'JavaScript (ESNext)',
      'Remix & Vue.js',
      'Tailwind CSS',
      'Framer Motion',
      'GraphQL & Storefront APIs',
      'Core Web Vitals (INP, LCP, CLS)',
    ],
  },
  {
    category: 'Backend, APIs & Cloud Architecture',
    items: [
      'Node.js & Express',
      'Python & FastAPI',
      'Golang',
      'PostgreSQL & Supabase',
      'Redis & In-Memory Caching',
      'MySQL & MongoDB',
      'Amazon Web Services (AWS)',
      'Google Cloud Platform (GCP)',
      'Cloudflare (Workers, KV, Pages)',
      'Vercel & Docker',
    ],
  },
  {
    category: 'AI Automations & Autonomous Agents',
    items: [
      'Replex Engine (Zero-Miss Lead Capture)',
      'n8n Workflow Pipelines',
      'OpenAI GPT-4o & Assistants API',
      'Anthropic Claude 3.5 Sonnet',
      'LangChain & LlamaIndex',
      'RAG & Vector Knowledge Bases',
      'Autonomous Support Agents',
      'Real-Time Webhook Bots',
    ],
  },
  {
    category: 'Mobile App Engineering',
    items: [
      'React Native',
      'Flutter & Dart',
      'Swift & SwiftUI (iOS)',
      'Kotlin & Jetpack Compose (Android)',
      'Expo Mobile Ecosystem',
      'Fastlane CI/CD',
    ],
  },
  {
    category: 'Integrations, ERP & Retention',
    items: [
      'Klaviyo (Email & SMS)',
      'HubSpot CRM',
      'Salesforce CRM',
      'NetSuite ERP',
      'SAP Business One',
      'Recharge Subscriptions',
      'Gorgias & Zendesk',
      'Stripe & Adyen Payments',
    ],
  },
  {
    category: 'Search & Generative Optimisation (GEO)',
    items: [
      'Generative Engine Optimisation (GEO)',
      'ChatGPT Search & Perplexity Indexing',
      'Google AI Overviews Optimisation',
      'Technical SEO & Crawl Architecture',
      'Schema.org JSON-LD Structured Data',
    ],
  },
];

import type {HomePageContent} from '~/lib/cms/types';

interface HomePartnersProps {
  description?: readonly string[];
  ecommerceLogos?: readonly PartnerLogo[];
  heading?: string;
  label?: string;
  logos?: readonly PartnerLogo[];
  showCta?: boolean;
  techLogos?: readonly PartnerLogo[];
  content?: HomePageContent;
}

export function HomePartners({
  description = [
    'Byte Operator designs, engineers, and scales digital commerce platforms, cloud software architectures, and automated agent systems across the industry leading technologies.',
    'Our core ecommerce platform expertise spans Shopify, Shopify Plus, Hydrogen headless storefronts, BigCommerce, WooCommerce, Adobe Commerce (Magento), Salesforce Commerce Cloud, Shopware, PrestaShop, OpenCart, Squarespace, and Wix. We guide high-growth brands through replatforming, scalable theme engineering, custom checkout extensions, and omnichannel inventory management.',
    'For modern web and cloud applications, we build with Next.js, React, TypeScript, Node.js, Python, Go, Tailwind CSS, and GraphQL, powered by resilient database and infrastructure layers including PostgreSQL, Redis, Supabase, AWS, Google Cloud Platform, Cloudflare Workers, and Vercel.',
    'In mobile and automation engineering, we deliver high-performance native and cross-platform apps using React Native, Flutter, Swift, and Kotlin, alongside autonomous operational pipelines powered by our proprietary Replex Engine lead automation platform, n8n orchestration, OpenAI GPT-4o, Anthropic Claude, and custom AI agent workflows.',
    'We unify your entire operational ecosystem through deep API integrations connecting Klaviyo, HubSpot, Salesforce CRM, NetSuite, SAP, Recharge, Gorgias, Zendesk, Stripe, and Adyen with real-time bidirectional data pipelines.',
  ],
  ecommerceLogos = ECOMMERCE_PLATFORM_LOGOS,
  heading = 'We Work Across Leading Platforms and Technologies',
  label = 'Platforms & Technologies',
  showCta = true,
  techLogos = TECH_STACK_LOGOS,
  content,
}: HomePartnersProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (content?.partnersShowSection === false) {
    return null;
  }

  return (
    <section
      className="ft-home-partners"
      aria-labelledby="ft-home-partners-title"
    >
      <div className="ft-home-partners__container">
        <p className="ft-home-partners__label">
          {label}
        </p>

        <div className="ft-home-partners__inner">
          <div className="ft-home-partners__left">
            <h2
              className="ft-home-partners__title"
              id="ft-home-partners-title"
            >
              {heading}
            </h2>

            <div
              className={[
                'ft-home-partners__description',
                isExpanded
                  ? 'ft-home-partners__description--expanded'
                  : 'ft-home-partners__description--clamped',
              ].join(' ')}
              id="ft-home-partners-description"
            >
              {description.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}

              {isExpanded ? (
                <div className="ft-home-partners__tech-stack">
                  {ALL_TECHNOLOGY_CATEGORIES.map((category) => (
                    <div className="ft-home-partners__tech-group" key={category.category}>
                      <h3 className="ft-home-partners__tech-category-title">
                        {category.category}
                      </h3>
                      <div className="ft-home-partners__tech-pills">
                        {category.items.map((item) => (
                          <span className="ft-home-partners__tech-pill" key={item}>
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>

            {showCta ? (
              <button
                className="ft-home-partners__read-more"
                type="button"
                aria-expanded={isExpanded}
                aria-controls="ft-home-partners-description"
                onClick={() =>
                  setIsExpanded((current) => !current)
                }
              >
                {isExpanded ? 'Read less' : 'Read more'}
              </button>
            ) : null}
          </div>

          <div className="ft-home-partners__right">
            {/* Group 1: Ecommerce Platforms (2 rows) */}
            <div className="ft-home-partners__group">
              <div className="ft-home-partners__group-header">
                <span className="ft-home-partners__group-label">Ecommerce Platforms</span>
                <span className="ft-home-partners__group-count">11 Platforms</span>
              </div>
              <div className="ft-home-partners__logos ft-home-partners__logos--ecommerce">
                {ecommerceLogos.map((logo) => (
                  <div
                    className="ft-home-partners__logo"
                    key={logo.src}
                  >
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      width={logo.width}
                      height={logo.height}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Group 2: Modern Web, Cloud & AI Stack (2 rows) */}
            <div className="ft-home-partners__group ft-home-partners__group--tech">
              <div className="ft-home-partners__group-header">
                <span className="ft-home-partners__group-label">Modern Engineering &amp; AI Stack</span>
                <span className="ft-home-partners__group-count">12 Technologies</span>
              </div>
              <div className="ft-home-partners__logos ft-home-partners__logos--tech">
                {techLogos.map((logo) => (
                  <div
                    className="ft-home-partners__logo"
                    key={logo.src}
                  >
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      width={logo.width}
                      height={logo.height}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
