import {useEffect, useRef, useState} from 'react';

type PillarKey =
  | 'technical'
  | 'collections'
  | 'product'
  | 'content'
  | 'pr'
  | 'international';

type SeoPillar = {
  key: PillarKey;
  number: string;
  title: string;
  accordionDescription: string;
  previewDescription: string;
  checks: readonly string[];
};

const SEO_PILLARS: readonly SeoPillar[] = [
  {
    key: 'technical',
    number: '01',
    title: 'Technical SEO',
    accordionDescription:
      'We review site architecture, crawl efficiency, indexation, Core Web Vitals, structured data and schema markup to strengthen the technical foundation search engines rely on.',
    previewDescription:
      'Technical SEO creates the foundation for stronger organic visibility. We identify and resolve issues that can make it harder for search engines to crawl, understand and index an ecommerce store.',
    checks: [
      'Core Web Vitals and page speed optimisation',
      'Schema markup and structured data',
      'Crawl efficiency and indexation management',
      'Site architecture and URL structure',
      'XML sitemaps and robots.txt configuration',
    ],
  },
  {
    key: 'collections',
    number: '02',
    title: 'Collection & Category Pages',
    accordionDescription:
      'We optimise collection and category pages around commercial search intent, heading structure, useful content, internal linking, filters and clean URL architecture.',
    previewDescription:
      'Collection pages can capture high-intent category searches. We optimise their structure, content and internal relationships so users and search engines can understand the products they contain.',
    checks: [
      'Keyword-targeted heading hierarchy',
      'SEO-focused collection descriptions',
      'Internal linking between related collections',
      'Faceted navigation and filter handling',
      'URL and canonical structure',
    ],
  },
  {
    key: 'product',
    number: '03',
    title: 'Product Page SEO',
    accordionDescription:
      'Product titles, metadata, images, structured data, descriptions and internal links are reviewed so each product page clearly communicates relevance and purchase intent.',
    previewDescription:
      'Every product page is another search opportunity. We strengthen the signals around what the product is, who it is relevant for and how search engines should understand the page.',
    checks: [
      'Unique product descriptions',
      'Product structured data',
      'Image alt text and file optimisation',
      'Internal links to relevant products',
      'Meta title and description optimisation',
    ],
  },
  {
    key: 'content',
    number: '04',
    title: 'Content Strategy',
    accordionDescription:
      'Keyword research, topic planning and search-led content help ecommerce stores answer customer questions while building topical relevance around important product categories.',
    previewDescription:
      'We plan content around real search demand and the wider customer journey, connecting informational topics with the commercial pages that matter to the store.',
    checks: [
      'Keyword research and topic clustering',
      'Editorial content planning',
      'SEO articles and buying guides',
      'Landing pages for relevant search intent',
      'Content gap and competitor analysis',
    ],
  },
  {
    key: 'pr',
    number: '05',
    title: 'Digital PR & Link Building',
    accordionDescription:
      'Relevant editorial coverage and authoritative backlinks can strengthen the wider organic profile of an ecommerce store when they are earned through useful, credible campaigns.',
    previewDescription:
      'Our link-building approach focuses on relevant opportunities, useful stories and credible outreach rather than chasing backlink volume without context.',
    checks: [
      'Data-led digital PR opportunities',
      'Reactive commentary opportunities',
      'Relevant publication outreach',
      'Competitor backlink gap analysis',
      'Backlink quality monitoring',
    ],
  },
  {
    key: 'international',
    number: '06',
    title: 'International & Multi-Market SEO',
    accordionDescription:
      'For stores operating across multiple countries, we review hreflang, localisation, market-specific keyword demand and international storefront structure.',
    previewDescription:
      'International ecommerce SEO requires both technical and market-level planning. We help organise the signals search engines need to serve the right storefront and content in each target market.',
    checks: [
      'Hreflang implementation and auditing',
      'Market-specific keyword research',
      'Localised content planning',
      'Multi-market storefront considerations',
      'Country-specific search optimisation',
    ],
  },
] as const;

export function EcommerceSeoServices() {
  const [activeKey, setActiveKey] = useState<PillarKey>('technical');
  const [previewKey, setPreviewKey] =
    useState<PillarKey>('technical');
  const [previewVisible, setPreviewVisible] = useState(true);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  const preview =
    SEO_PILLARS.find((pillar) => pillar.key === previewKey) ??
    SEO_PILLARS[0];

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  function selectPillar(key: PillarKey) {
    if (key === activeKey) return;

    setActiveKey(key);
    setPreviewVisible(false);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setPreviewKey(key);

      requestAnimationFrame(() => {
        setPreviewVisible(true);
      });
    }, 250);
  }

  return (
    <section
      className="ft-ecommerce-seo-services"
      aria-labelledby="ft-ecommerce-seo-services-title"
    >
      <div className="ft-ecommerce-seo-services__container">
        <div className="ft-ecommerce-seo-services__layout">
          <div className="ft-ecommerce-seo-services__left">
            <p className="ft-ecommerce-seo-services__label">
              Our Ecommerce SEO Services
            </p>

            <h2
              className="ft-ecommerce-seo-services__title"
              id="ft-ecommerce-seo-services-title"
            >
              Every Layer of Ecommerce SEO. Covered.
            </h2>

            <ul className="ft-ecommerce-seo-services__list">
              {SEO_PILLARS.map((pillar) => {
                const active = activeKey === pillar.key;

                return (
                  <li
                    key={pillar.key}
                    className={`ft-ecommerce-seo-services__item${
                      active ? ' is-active' : ''
                    }`}
                    data-number={pillar.number}
                  >
                    <button
                      type="button"
                      className="ft-ecommerce-seo-services__item-button"
                      aria-expanded={active}
                      onClick={() => selectPillar(pillar.key)}
                    >
                      <span className="ft-ecommerce-seo-services__item-name">
                        {pillar.title}
                      </span>
                    </button>

                    <div className="ft-ecommerce-seo-services__item-description">
                      <div className="ft-ecommerce-seo-services__item-description-inner">
                        <p>{pillar.accordionDescription}</p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="ft-ecommerce-seo-services__preview">
            <div
              className={`ft-ecommerce-seo-services__preview-card${
                previewVisible ? ' is-visible' : ''
              }`}
            >
              <div className="ft-ecommerce-seo-services__preview-icon">
                <PillarIcon type={preview.key} />
              </div>

              <h3 className="ft-ecommerce-seo-services__preview-title">
                {preview.title}
              </h3>

              <p className="ft-ecommerce-seo-services__preview-description">
                {preview.previewDescription}
              </p>

              <ul className="ft-ecommerce-seo-services__checklist">
                {preview.checks.map((check) => (
                  <li key={check}>
                    <CheckIcon />
                    <span>{check}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

function PillarIcon({type}: {type: PillarKey}) {
  const sharedProps = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  };

  if (type === 'technical') {
    return (
      <svg {...sharedProps}>
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
      </svg>
    );
  }

  if (type === 'collections') {
    return (
      <svg {...sharedProps}>
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
      </svg>
    );
  }

  if (type === 'product') {
    return (
      <svg {...sharedProps}>
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
        <line x1="7" y1="7" x2="7.01" y2="7" />
      </svg>
    );
  }

  if (type === 'content') {
    return (
      <svg {...sharedProps}>
        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    );
  }

  if (type === 'pr') {
    return (
      <svg {...sharedProps}>
        <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
      </svg>
    );
  }

  return (
    <svg {...sharedProps}>
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
    </svg>
  );
}