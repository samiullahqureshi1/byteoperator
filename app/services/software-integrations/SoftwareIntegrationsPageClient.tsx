'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Link } from '~/lib/router-compat';
import { CalendlyButton } from '~/components/shared/CalendlyButton';
import { ServiceFinalCta } from '~/components/shared/ServiceFinalCta';

/* =========================================================
   FAQ DATA (11 QUESTIONS FROM SPECIFICATION)
========================================================= */

const INTEGRATION_FAQS = [
  {
    number: '01',
    question: 'What are API integration services?',
    answer:
      'API integration services connect different software applications through application programming interfaces (APIs). They allow systems to exchange information, share functionality, and support connected business workflows without manual data re-entry.',
  },
  {
    number: '02',
    question: 'What is the difference between API development and API integration?',
    answer:
      'API development involves designing, building, and deploying interfaces that allow applications to communicate. API integration connects existing APIs and applications together so they can synchronize data and execute unified workflows.',
  },
  {
    number: '03',
    question: 'Can you integrate different business systems and applications?',
    answer:
      'Yes. Integration requirements can involve CRM platforms, ERP systems, eCommerce applications, internal business software, and third-party services. Feasibility depends on available APIs, platform permissions, and technical requirements.',
  },
  {
    number: '04',
    question: 'Do you provide custom REST API development?',
    answer:
      'Yes. Custom REST API development includes endpoint design, backend implementation, request and response handling, schema validation, rate limiting, and application connectivity tailored to your project scope.',
  },
  {
    number: '05',
    question: 'What is the difference between REST and GraphQL APIs?',
    answer:
      'REST generally organizes communication around fixed HTTP resources and endpoints. GraphQL allows client applications to request specific data fields through a schema-based query system. The appropriate approach depends on your application\'s data requirements and architecture.',
  },
  {
    number: '06',
    question: 'Can you integrate ERP and CRM platforms?',
    answer:
      'Yes. ERP and CRM integrations connect business applications to support bidirectional information exchange involving customers, orders, financial records, inventory, and operational data across platforms like Salesforce, HubSpot, SAP, and NetSuite.',
  },
  {
    number: '07',
    question: 'Can you build webhook and event-driven integrations?',
    answer:
      'Yes. Webhook-based integrations allow applications to send instantaneous event notifications to connected systems. Implementation covers event processing, signature validation, retry mechanisms, deduplication, and error handling.',
  },
  {
    number: '08',
    question: 'How do you handle API errors and failed requests?',
    answer:
      'Error handling depends on the integration architecture. We implement robust input validation, centralized logging, asynchronous queue retries with exponential backoff, circuit breakers, and alert telemetry to ensure high reliability.',
  },
  {
    number: '09',
    question: 'How do you secure custom API integrations?',
    answer:
      'API security involves scoped API keys, OAuth 2.0 authorization, TLS 1.3 encryption, input sanitization, rate limiting, IP whitelisting, and permission-based role controls selected according to the systems and regulatory obligations involved.',
  },
  {
    number: '10',
    question: 'How long does an API integration project take?',
    answer:
      'Project timelines depend on the number of systems, API documentation quality, data complexity, authentication requirements, testing needs, and custom middleware scope. A realistic timeline is established during discovery.',
  },
  {
    number: '11',
    question: 'Do you provide ongoing API maintenance and support?',
    answer:
      'Yes. Ongoing support can include integration troubleshooting, third-party API deprecation updates, testing, documentation maintenance, and performance tuning according to an agreed SLA.',
  },
] as const;

/* =========================================================
   TECHNOLOGY LOGOS DATA (WHITE VECTOR SVGS)
========================================================= */

const TECH_LOGOS = [
  { src: '/images/home-partners/typescript.svg', alt: 'TypeScript', width: 160, height: 40 },
  { src: '/images/home-partners/nodejs.svg', alt: 'Node.js', width: 160, height: 40 },
  { src: '/images/home-partners/graphql.svg', alt: 'GraphQL', width: 160, height: 40 },
  { src: '/images/home-partners/postgresql.svg', alt: 'PostgreSQL', width: 170, height: 40 },
  { src: '/images/home-partners/redis.svg', alt: 'Redis', width: 160, height: 40 },
  { src: '/images/home-partners/python.svg', alt: 'Python', width: 160, height: 40 },
  { src: '/images/home-partners/aws.svg', alt: 'AWS', width: 160, height: 40 },
  { src: '/images/home-partners/google-cloud.svg', alt: 'Google Cloud', width: 170, height: 40 },
  { src: '/images/home-partners/docker.svg', alt: 'Docker', width: 160, height: 40 },
  { src: '/images/home-partners/kubernetes.svg', alt: 'Kubernetes', width: 170, height: 40 },
  { src: '/images/home-partners/cloudflare.svg', alt: 'Cloudflare', width: 160, height: 40 },
  { src: '/images/home-partners/react.svg', alt: 'React', width: 160, height: 40 },
] as const;

/* =========================================================
   3. INTEGRATION SERVICES (8 CARDS DATA & COVERFLOW SLIDER)
========================================================= */

const INTEGRATION_SERVICES = [
  {
    badge: '01. CUSTOM APIS',
    title: 'Custom API Development',
    desc: 'When standard connectors do not support your requirements, custom API development connects applications through purpose-built interfaces.',
    items: [
      'API architecture and endpoint design',
      'Backend API development',
      'Request and response handling',
      'Data validation and structured responses',
      'Application-to-application communication',
      'Integration with existing software systems',
    ],
    footer: 'We build API functionality to support applications, internal platforms, and digital products.',
  },
  {
    badge: '02. 3RD-PARTY',
    title: 'Third-Party API Integration',
    desc: 'Third-party API integration allows your application to exchange information and use functionality provided by external platforms and services.',
    items: [
      'Connecting external software services',
      'API authentication and authorization',
      'Data retrieval and submission',
      'Request and response processing',
      'External service communication',
      'Integration testing and troubleshooting',
    ],
    footer: 'Planned around API documentation, available functionality, and security standards.',
  },
  {
    badge: '03. ENTERPRISE',
    title: 'ERP & CRM Integration',
    desc: 'Connect customer records, operational data, sales activities, orders, and financial data across multiple applications.',
    items: [
      'Connecting CRM platforms with business applications',
      'Synchronizing customer and account information',
      'Connecting ERP systems with eCommerce platforms',
      'Transferring order and operational data',
      'Mapping information between different systems',
      'Supporting bidirectional data exchange',
    ],
    footer: 'We assess existing systems and define an integration approach that fits your workflows and data structure.',
  },
  {
    badge: '04. REST PROTOCOL',
    title: 'REST API Development',
    desc: 'REST APIs provide a structured way for applications to communicate through standard HTTP-based requests and responses.',
    items: [
      'RESTful endpoint design & naming',
      'Resource and request structure',
      'HTTP methods & standard response codes',
      'JSON data exchange formats',
      'Authentication and access controls',
      'Input validation and OpenAPI/Swagger documentation',
    ],
    footer: 'Building understandable API interfaces that support the applications consuming them.',
  },
  {
    badge: '05. GRAPHQL',
    title: 'GraphQL API Development',
    desc: 'GraphQL provides a flexible approach to retrieving and managing application data through a strongly-typed schema.',
    items: [
      'GraphQL schema design & types',
      'Queries and mutations engineering',
      'Resolver development & caching',
      'Multi-database source connectivity',
      'Client application integration',
      'Request validation and error handling',
    ],
    footer: 'We determine whether REST, GraphQL, or a hybrid model is appropriate for your application.',
  },
  {
    badge: '06. EVENT-DRIVEN',
    title: 'Webhooks & Event-Driven Integrations',
    desc: 'Webhooks allow applications to notify other systems when specific events occur without continuous, inefficient polling.',
    items: [
      'Order status and checkout updates',
      'Customer account & subscription events',
      'Real-time inventory changes',
      'Payment confirmations and refunds',
      'Request verification & HMAC validation',
      'Retry queues, deduplication & error logging',
    ],
    footer: 'Architected around event delivery behavior, payload integrity, and high-volume receiver infrastructure.',
  },
  {
    badge: '07. MIDDLEWARE',
    title: 'Middleware & Data Synchronization',
    desc: 'When multiple applications exchange information, middleware provides a structured layer for processing and transferring data.',
    items: [
      'Data mapping and transformation',
      'Request and response processing',
      'Connecting multiple heterogeneous apps',
      'Synchronizing records across platforms',
      'Handling disparate data structures',
      'Centralizing core integration logic',
    ],
    footer: 'Managing information exchange without unnecessarily duplicating application functionality.',
  },
  {
    badge: '08. SUPPORT & SLA',
    title: 'API Maintenance & Integration Support',
    desc: 'APIs and connected systems require ongoing attention as third-party APIs deprecate versions and business requirements evolve.',
    items: [
      'Active API troubleshooting',
      'Integration error investigation & triage',
      'Endpoint updates and version migrations',
      'Regression and integration workflow testing',
      'Documentation and schema updates',
      'Performance, throughput & reliability improvements',
    ],
    footer: 'Arrangements defined according to project technical requirements and agreed engagement scope.',
  },
] as const;

function IntegrationServicesSlider() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % INTEGRATION_SERVICES.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + INTEGRATION_SERVICES.length) % INTEGRATION_SERVICES.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX;
    if (deltaX > 45) {
      prevSlide();
    } else if (deltaX < -45) {
      nextSlide();
    }
    setTouchStartX(null);
  };

  const getCardClass = (idx: number) => {
    const diff = (idx - activeSlide + INTEGRATION_SERVICES.length) % INTEGRATION_SERVICES.length;
    if (diff === 0) return 'ft-integrations-slider-card ft-integrations-slider-card--active';
    if (diff === 1) return 'ft-integrations-slider-card ft-integrations-slider-card--next';
    if (diff === INTEGRATION_SERVICES.length - 1) return 'ft-integrations-slider-card ft-integrations-slider-card--prev';
    return 'ft-integrations-slider-card ft-integrations-slider-card--hidden';
  };

  return (
    <section className="ft-integrations-section" aria-label="Core Services">
      <div className="ft-integrations-container">
        <div className="ft-integrations-section__header">
          <span className="ft-integrations-eyebrow">COMPREHENSIVE CAPABILITIES</span>
          <h2 className="ft-integrations-heading">Our API Development &amp; Integration Services</h2>
          <p className="ft-integrations-subheading">
            We provide API development and integration services for businesses that need reliable communication between applications, platforms, and software systems.
          </p>
        </div>

        {/* 3D Coverflow Carousel */}
        <div
          className="ft-integrations-slider-wrapper"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button
            type="button"
            className="ft-integrations-slider-nav-btn ft-integrations-slider-nav-btn--prev"
            onClick={prevSlide}
            aria-label="Previous service"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <button
            type="button"
            className="ft-integrations-slider-nav-btn ft-integrations-slider-nav-btn--next"
            onClick={nextSlide}
            aria-label="Next service"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          <div className="ft-integrations-slider-stage">
            {INTEGRATION_SERVICES.map((service, idx) => {
              const isActive = idx === activeSlide;
              return (
                <div
                  key={service.title}
                  className={getCardClass(idx)}
                  onClick={() => {
                    if (!isActive) setActiveSlide(idx);
                  }}
                >
                  <div className="ft-integrations-card__header">
                    <span className="ft-integrations-card__badge">{service.badge}</span>
                    <h3 className="ft-integrations-card__title">{service.title}</h3>
                  </div>
                  <p className="ft-integrations-card__desc">{service.desc}</p>
                  <ul className="ft-integrations-card__list">
                    {service.items.map((item, itemIdx) => (
                      <li className="ft-integrations-card__list-item" key={itemIdx}>
                        <span className="ft-integrations-card__list-bullet">&bull;</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="ft-integrations-card__footer">
                    <p className="ft-integrations-card__footer-note">{service.footer}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="ft-integrations-slider-dots">
            {INTEGRATION_SERVICES.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`ft-integrations-slider-dot ${i === activeSlide ? 'ft-integrations-slider-dot--active' : ''}`}
                onClick={() => setActiveSlide(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   9. WHY CHOOSE BYTE OPERATOR (6 CARDS SCROLL-DRIVEN DECK SLIDER)
========================================================= */

const ADVANTAGES = [
  {
    title: 'Business-Focused Planning',
    subtitle: 'Operational Alignment, Scoping & Architecture',
    badge: 'Advantage 01',
    route: '/contact',
    desc: 'We start by understanding what your business needs to connect and why, defining an integration architecture around actual operational requirements.',
  },
  {
    title: 'Custom Development Capabilities',
    subtitle: 'Application-Level Middleware & Custom Connectors',
    badge: 'Advantage 02',
    route: '/contact',
    desc: 'When existing pre-built connectors fall short, custom API development and application-level middleware provide complete architectural flexibility.',
  },
  {
    title: 'Full-Stack Software Engineering',
    subtitle: 'End-to-End Backend APIs & Client Applications',
    badge: 'Advantage 03',
    route: '/contact',
    desc: 'Our engineering background ensures we understand both backend API requirements and the frontend applications depending on connected data.',
  },
  {
    title: 'Structured Development & Testing',
    subtitle: 'Automated CI/CD, QA Validation & Error Handling',
    badge: 'Advantage 04',
    route: '/contact',
    desc: 'We plan API architecture, implement integration workflows, and validate functionality against rigorous testing suites before production rollout.',
  },
  {
    title: 'Solutions Built Around Existing Systems',
    subtitle: 'Current Stack Preservation & Zero Disruption',
    badge: 'Advantage 05',
    route: '/contact',
    desc: 'We design integrations around your current technology stack, avoiding unnecessary and disruptive modifications to established software.',
  },
  {
    title: 'Support Beyond Initial Development',
    subtitle: 'Maintenance, Monitoring & Version Migrations',
    badge: 'Advantage 06',
    route: '/contact',
    desc: 'Integration requirements evolve over time. We provide ongoing maintenance, troubleshooting, and endpoint enhancements as your business expands.',
  },
] as const;

const ADVANTAGE_ROTATES = ['-1.8deg', '1.4deg', '-0.8deg', '1.9deg', '-1.2deg', '1.5deg'];

function AdvantageDeckSlider() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLElement | null)[]>([]);
  const [currentActiveIndex, setCurrentActiveIndex] = useState(0);

  const scrollToCard = (index: number) => {
    if (!sectionRef.current) return;
    const section = sectionRef.current;
    const rect = section.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const sectionTop = rect.top + scrollTop;
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const scrollDistance = Math.max(section.offsetHeight - viewportHeight, 1);
    const targetScroll = sectionTop + (index / (ADVANTAGES.length - 1)) * scrollDistance;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let ticking = false;
    const clamp = (val: number, min: number, max: number) => Math.min(Math.max(val, min), max);

    const updateExperienceCards = () => {
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const scrollDistance = Math.max(section.offsetHeight - viewportHeight, 1);
      const rawProgress = -rect.top / scrollDistance;
      const progress = clamp(rawProgress, 0, 1);
      const activePosition = progress * (ADVANTAGES.length - 1);
      const isSmallScreen = window.innerWidth <= 768;

      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        const distance = index - activePosition;
        const direction = index % 2 === 0 ? -1 : 1;

        let y = 0;
        let z = 0;
        let rotateZ = 0;
        let scale = 1;
        let opacity = 0;
        let layer = 1;

        if (distance > 0) {
          // Upcoming cards rising from below
          if (distance > 1.2) {
            y = 260;
            opacity = 0;
            scale = 0.95;
            layer = 1;
          } else {
            y = distance * 220;
            opacity = clamp(1 - (distance - 0.25) * 2, 0, 1);
            scale = 1 - distance * 0.035;
            rotateZ = direction * distance * 1.6;
            layer = 25 - index;
          }
        } else {
          // Past cards stacked neatly on top
          const past = clamp(-distance, 0, 3);
          const pastOffset = isSmallScreen ? 16 : 22;
          y = -past * pastOffset;
          z = -past * 40;
          rotateZ = direction * past * 1.8;
          scale = 1 - past * 0.035;
          opacity = past > 2.5 ? 0 : clamp(1 - past * 0.25, 0.45, 1);
          layer = 20 - Math.round(past);
        }

        // Active front card gets top priority
        if (Math.abs(distance) < 0.5) {
          layer = 35;
        }

        card.style.setProperty('--experience-card-y', `${y.toFixed(1)}px`);
        card.style.setProperty('--experience-card-z', `${z.toFixed(1)}px`);
        card.style.setProperty('--experience-card-rotate-z', `${rotateZ.toFixed(2)}deg`);
        card.style.setProperty('--experience-card-scale', scale.toFixed(3));
        card.style.setProperty('--experience-card-opacity', opacity.toFixed(3));
        card.style.setProperty('--experience-card-layer', String(layer));
        card.style.pointerEvents = Math.abs(distance) < 0.6 ? 'auto' : 'none';
      });

      setCurrentActiveIndex(clamp(Math.round(activePosition), 0, ADVANTAGES.length - 1));
    };

    const handleScrollOrResize = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(() => {
          updateExperienceCards();
          ticking = false;
        });
      }
    };

    updateExperienceCards();
    window.addEventListener('scroll', handleScrollOrResize, { passive: true });
    window.addEventListener('resize', handleScrollOrResize);

    return () => {
      window.removeEventListener('scroll', handleScrollOrResize);
      window.removeEventListener('resize', handleScrollOrResize);
    };
  }, []);

  return (
    <section ref={sectionRef} className="ft-integrations-experience-section" aria-label="Why Choose Byte Operator">
      <div className="ft-integrations-experience-inner">
        {/* Centered Heading Section */}
        <div className="ft-integrations-experience-heading">
          <span className="ft-integrations-experience-eyebrow">THE BYTE OPERATOR ADVANTAGE</span>
          <h2 className="ft-integrations-heading">Why Choose Byte Operator for API Development &amp; Integration?</h2>
          <p className="ft-integrations-subheading">
            Your integration requirements should determine the technical solution—not the limitations of a generic template. We approach API development as a specialized engineering challenge.
          </p>
        </div>

        {/* Stacked Cards List on Scroll */}
        <div className="ft-integrations-experience-list">
          {ADVANTAGES.map((adv, index) => (
            <article
              key={adv.title}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="ft-integrations-experience-item"
              style={{
                ['--experience-card-base-rotate' as any]: ADVANTAGE_ROTATES[index] || '0deg',
              }}
            >
              {/* Circular arrow button on left */}
              <div
                className="ft-integrations-experience-arrow"
                onClick={() => scrollToCard((index + 1) % ADVANTAGES.length)}
                role="button"
                tabIndex={0}
                aria-label="Advance to next advantage"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </div>

              {/* Copy */}
              <div className="ft-integrations-experience-copy">
                <div className="ft-integrations-experience-copy__header">
                  <h3 className="ft-integrations-experience-copy__title">{adv.title}</h3>
                  <span className="ft-integrations-experience-copy__subtitle">{adv.subtitle}</span>
                </div>
                <p className="ft-integrations-experience-copy__summary">{adv.desc}</p>
              </div>

              {/* Side: Badge & Link */}
              <div className="ft-integrations-experience-side">
                <span className="ft-integrations-experience-date">{adv.badge}</span>
                <Link href={adv.route} className="ft-integrations-experience-link">
                  <span>Discuss Project</span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Progress & Indicators below */}
        <div className="ft-integrations-experience-progress">
          <span className="ft-integrations-experience-counter">
            {String(currentActiveIndex + 1).padStart(2, '0')} / {String(ADVANTAGES.length).padStart(2, '0')}
          </span>
          <div className="ft-integrations-experience-dots">
            {ADVANTAGES.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                className={`ft-integrations-experience-dot ${dotIdx === currentActiveIndex ? 'ft-integrations-experience-dot--active' : ''}`}
                onClick={() => scrollToCard(dotIdx)}
                aria-label={`Scroll to advantage ${dotIdx + 1}`}
              />
            ))}
          </div>
          <span className="ft-integrations-experience-hint">Scroll down to explore</span>
        </div>
      </div>
    </section>
  );
}

export function SoftwareIntegrationsPageClient() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((current) => (current === index ? null : index));
  };

  return (
    <div className="ft-integrations-page">
      {/* =========================================================
          1. HERO SECTION (2-Line Heading with Exact Font Specs)
      ========================================================= */}
      <section className="ft-integrations-hero">
        <div className="ft-integrations-container">
          <div className="ft-integrations-hero__header">
            <p className="ft-integrations-hero__eyebrow">
              CUSTOM API &amp; SYSTEM ARCHITECTURE
            </p>
            <h1 className="ft-integrations-hero__title">
              <span className="ft-integrations-hero__title-line">
                API Development &amp; System
              </span>
              <span className="ft-integrations-hero__title-line">
                Integration Services
              </span>
            </h1>

            <div className="ft-integrations-hero__text-group">
              <p className="ft-integrations-hero__lead">
                Connect your business applications, automate data exchange, and build more connected digital operations with custom API development and system integration services from Byte Operator. We design and develop API-driven solutions that help businesses connect software platforms, synchronize information, and extend the capabilities of their existing systems. From custom REST APIs and GraphQL development to third-party integrations, webhooks, and middleware, we create integration solutions around your business requirements.
              </p>
            </div>

            <div className="ft-integrations-hero__cta-group">
              <CalendlyButton
                label="Discuss Your Integration Project"
                className="ft-integrations-hero__btn-primary"
              />
              <Link
                to="/work"
                prefetch="intent"
                className="ft-integrations-hero__btn-secondary"
              >
                Explore Our Work &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          2. OVERVIEW / SPLIT SECTION (2-COL + 3-COL GRID BELOW)
      ========================================================= */}
      <section className="ft-integrations-section" aria-label="Overview">
        <div className="ft-integrations-container">
          <div className="ft-integrations-overview-split">
            <div className="ft-integrations-overview__content">
              <span className="ft-integrations-eyebrow">CONNECTED OPERATIONS</span>
              <h3>Connect Your Business Systems Through Custom API Integration</h3>
              <p>
                Modern businesses rely on multiple applications to manage customers, operations, sales, inventory, payments, and internal processes. When these systems operate separately, information can become fragmented and teams may need to move data manually between platforms.
              </p>
              <p>
                API integration helps applications communicate and exchange information through defined interfaces. It allows businesses to connect existing software, introduce new functionality, and build workflows across different technology environments.
              </p>
              <p>
                Byte Operator develops custom API and system integration solutions based on your software architecture, operational requirements, and existing platforms.
              </p>
            </div>

            {/* Media Image Column */}
            <div className="ft-integrations-overview__media">
              <div className="ft-integrations-overview__media-card">
                <img
                  src="https://cdn.shopify.com/s/files/1/0676/1155/7936/files/custom_api_integration.webp?v=1794825222"
                  alt="Connect Your Business Systems Through Custom API Integration"
                  className="ft-integrations-overview__media-image"
                  width="1920"
                  height="1080"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="ft-integrations-overview__media-caption">
                <p className="ft-integrations-overview__media-caption-title">
                  Custom API &amp; System Integration
                </p>
                <p className="ft-integrations-overview__media-caption-sub">
                  Secure Data Flow, Webhooks &amp; Unified Ecosystem Architecture
                </p>
              </div>
            </div>
          </div>

          {/* 6 Approach Points in a 3-Column Grid Below */}
          <div className="ft-integrations-overview__priorities">
            <div className="ft-integrations-priority-card">
              <h4>Independent Systems Connectivity</h4>
              <p>
                Connecting independent applications and business systems into one synchronized operating environment.
              </p>
            </div>
            <div className="ft-integrations-priority-card">
              <h4>Eliminate Repetitive Workflows</h4>
              <p>
                Reducing repetitive manual data exchange and copy-pasting across departments and operational tools.
              </p>
            </div>
            <div className="ft-integrations-priority-card">
              <h4>Real-Time Data Sync</h4>
              <p>
                Synchronizing records, customer statuses, and inventory counts between connected platforms automatically.
              </p>
            </div>
            <div className="ft-integrations-priority-card">
              <h4>Custom Endpoint Architecture</h4>
              <p>
                Building custom APIs for web applications, client portals, and software products built to scale.
              </p>
            </div>
            <div className="ft-integrations-priority-card">
              <h4>External Ecosystem Integration</h4>
              <p>
                Integrating third-party services and enterprise SaaS platforms directly into existing business workflows.
              </p>
            </div>
            <div className="ft-integrations-priority-card">
              <h4>Structured Data Governance</h4>
              <p>
                Supporting structured data exchange, validation, and schema compliance across all connected endpoints.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          3. OUR API DEVELOPMENT & INTEGRATION SERVICES (8 Cards Carousel)
      ========================================================= */}
      <IntegrationServicesSlider />

      {/* =========================================================
          4. SYSTEMS & PLATFORMS WE INTEGRATE (6 Cards)
      ========================================================= */}
      <section className="ft-integrations-section" aria-label="Platforms We Integrate">
        <div className="ft-integrations-container">
          <div className="ft-integrations-section__header">
            <span className="ft-integrations-eyebrow">ECOSYSTEM COMPATIBILITY</span>
            <h2 className="ft-integrations-heading">Systems &amp; Platforms We Integrate</h2>
            <p className="ft-integrations-subheading">
              Every business has a different technology environment. Some need to connect established enterprise platforms, while others need integrations between custom applications and external services.
            </p>
          </div>

          <div className="ft-integrations-grid-3">
            {/* 1 */}
            <div className="ft-integrations-card">
              <h3 className="ft-integrations-card__title" style={{ marginBottom: '0.875rem' }}>
                CRM &amp; Customer Management
              </h3>
              <p className="ft-integrations-card__desc">
                Connect customer-facing platforms with internal applications, lead management pipelines, and operational workflows. Examples include Salesforce and HubSpot.
              </p>
            </div>

            {/* 2 */}
            <div className="ft-integrations-card">
              <h3 className="ft-integrations-card__title" style={{ marginBottom: '0.875rem' }}>
                ERP &amp; Business Management
              </h3>
              <p className="ft-integrations-card__desc">
                Support data exchange between enterprise resource planning platforms and other business applications. Examples include SAP and NetSuite.
              </p>
            </div>

            {/* 3 */}
            <div className="ft-integrations-card">
              <h3 className="ft-integrations-card__title" style={{ marginBottom: '0.875rem' }}>
                eCommerce Platforms
              </h3>
              <p className="ft-integrations-card__desc">
                Connect online stores with inventory systems, order management applications, shipping logistics, and catalog management. Examples include Shopify and WooCommerce.
              </p>
            </div>

            {/* 4 */}
            <div className="ft-integrations-card">
              <h3 className="ft-integrations-card__title" style={{ marginBottom: '0.875rem' }}>
                Payment &amp; Transaction Services
              </h3>
              <p className="ft-integrations-card__desc">
                Integrate supported payment services into applications, automated invoicing, and subscription billing workflows. Examples include Stripe and Adyen.
              </p>
            </div>

            {/* 5 */}
            <div className="ft-integrations-card">
              <h3 className="ft-integrations-card__title" style={{ marginBottom: '0.875rem' }}>
                Communication &amp; Notifications
              </h3>
              <p className="ft-integrations-card__desc">
                Connect applications with external communication, transactional email, and SMS notification services. Examples include Twilio, SendGrid, and Klaviyo.
              </p>
            </div>

            {/* 6 */}
            <div className="ft-integrations-card">
              <h3 className="ft-integrations-card__title" style={{ marginBottom: '0.875rem' }}>
                Custom Apps &amp; Internal Platforms
              </h3>
              <p className="ft-integrations-card__desc">
                Integrate proprietary software, internal business applications, custom databases, and legacy systems that expose suitable integration interfaces.
              </p>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <p style={{ fontSize: '0.875rem', color: '#94a3b8', fontStyle: 'italic', margin: 0 }}>
              Note: Platform names are examples of potential integration environments. Actual feasibility depends on available APIs, permissions, documentation, and project scope.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          5. API ARCHITECTURE, SECURITY & RELIABILITY (6 Pillars)
      ========================================================= */}
      <section className="ft-integrations-section" aria-label="Architecture and Security">
        <div className="ft-integrations-container">
          <div className="ft-integrations-section__header">
            <span className="ft-integrations-eyebrow">ENGINEERING INTEGRITY</span>
            <h2 className="ft-integrations-heading">API Architecture, Security &amp; Integration Reliability</h2>
            <p className="ft-integrations-subheading">
              A successful integration requires more than making two applications exchange data. It requires clear architecture, strict access controls, structured data handling, and automated error recovery.
            </p>
          </div>

          <div className="ft-integrations-grid-3">
            {/* 1 */}
            <div className="ft-integrations-card">
              <h3 className="ft-integrations-card__title" style={{ marginBottom: '0.875rem' }}>
                API Architecture &amp; Endpoint Design
              </h3>
              <p className="ft-integrations-card__desc">
                We define how applications communicate, how endpoints are structured, and how data is exchanged between connected systems with minimal latency.
              </p>
            </div>

            {/* 2 */}
            <div className="ft-integrations-card">
              <h3 className="ft-integrations-card__title" style={{ marginBottom: '0.875rem' }}>
                Authentication &amp; Access Control
              </h3>
              <p className="ft-integrations-card__desc">
                API authentication and authorization control access to application resources. Implementation covers API keys, OAuth 2.0, token rotation, and RBAC.
              </p>
            </div>

            {/* 3 */}
            <div className="ft-integrations-card">
              <h3 className="ft-integrations-card__title" style={{ marginBottom: '0.875rem' }}>
                Data Validation &amp; Transformation
              </h3>
              <p className="ft-integrations-card__desc">
                Different systems use different data structures. Strict validation and transformation ensure information is sanitized and formatted correctly.
              </p>
            </div>

            {/* 4 */}
            <div className="ft-integrations-card">
              <h3 className="ft-integrations-card__title" style={{ marginBottom: '0.875rem' }}>
                Error Handling &amp; Recovery
              </h3>
              <p className="ft-integrations-card__desc">
                Integration workflows account for unsuccessful requests, unavailable services, and invalid data through retry queues and fallback procedures.
              </p>
            </div>

            {/* 5 */}
            <div className="ft-integrations-card">
              <h3 className="ft-integrations-card__title" style={{ marginBottom: '0.875rem' }}>
                Rate Limiting &amp; Request Management
              </h3>
              <p className="ft-integrations-card__desc">
                External APIs enforce request limits. Our integration architecture accounts for thresholds using token-bucket rate limiters and background queue workers.
              </p>
            </div>

            {/* 6 */}
            <div className="ft-integrations-card">
              <h3 className="ft-integrations-card__title" style={{ marginBottom: '0.875rem' }}>
                Logging, Telemetry &amp; Monitoring
              </h3>
              <p className="ft-integrations-card__desc">
                Application logs and health monitoring help development teams investigate errors, understand system behavior, and maintain uptime across all pipelines.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          6. DEVELOPMENT PROCESS (6 Steps)
      ========================================================= */}
      <section className="ft-integrations-section" aria-label="Integration Process">
        <div className="ft-integrations-container">
          <div className="ft-integrations-section__header">
            <span className="ft-integrations-eyebrow">SYSTEMATIC DELIVERY</span>
            <h2 className="ft-integrations-heading">Our API Integration Development Process</h2>
            <p className="ft-integrations-subheading">
              We follow a structured development process to understand your systems, plan integration architecture, and implement required functionality with verified reliability.
            </p>
          </div>

          <div className="ft-integrations-process-grid">
            {/* Step 01 */}
            <div className="ft-integrations-process-card">
              <span className="ft-integrations-process-step">01</span>
              <h3 className="ft-integrations-process-title">Discovery &amp; Requirements Analysis</h3>
              <p className="ft-integrations-process-desc">
                We understand your business objectives, existing applications, data structures, API documentation, and workflow priorities.
              </p>
            </div>

            {/* Step 02 */}
            <div className="ft-integrations-process-card">
              <span className="ft-integrations-process-step">02</span>
              <h3 className="ft-integrations-process-title">Integration Architecture &amp; Planning</h3>
              <p className="ft-integrations-process-desc">
                We plan the technical approach: API protocols, data mapping matrices, authentication mechanisms, and responsibilities for each system.
              </p>
            </div>

            {/* Step 03 */}
            <div className="ft-integrations-process-card">
              <span className="ft-integrations-process-step">03</span>
              <h3 className="ft-integrations-process-title">API Development &amp; Integration</h3>
              <p className="ft-integrations-process-desc">
                Our developers implement the required APIs, connectors, middleware, and event triggers according to the agreed architectural scope.
              </p>
            </div>

            {/* Step 04 */}
            <div className="ft-integrations-process-card">
              <span className="ft-integrations-process-step">04</span>
              <h3 className="ft-integrations-process-title">Testing &amp; Validation</h3>
              <p className="ft-integrations-process-desc">
                Rigorous testing covering request/response validation, authentication, synchronization checks, error handling, and webhook delivery.
              </p>
            </div>

            {/* Step 05 */}
            <div className="ft-integrations-process-card">
              <span className="ft-integrations-process-step">05</span>
              <h3 className="ft-integrations-process-title">Deployment &amp; Launch</h3>
              <p className="ft-integrations-process-desc">
                The integration is deployed into production. We verify live connections, monitor payload delivery, and review real-time behavior.
              </p>
            </div>

            {/* Step 06 */}
            <div className="ft-integrations-process-card">
              <span className="ft-integrations-process-step">06</span>
              <h3 className="ft-integrations-process-title">Maintenance &amp; Improvements</h3>
              <p className="ft-integrations-process-desc">
                As your systems evolve, we support updates, API version upgrades, troubleshooting, and new endpoints under defined maintenance terms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          7. TECHNOLOGIES SPLIT SECTION (2-Col Reference Layout)
      ========================================================= */}
      <section className="ft-integrations-section" aria-label="Technologies We Use">
        <div className="ft-integrations-container">
          <div className="ft-integrations-tech-split">
            {/* Left Column: Heading & Comprehensive Overview */}
            <div className="ft-integrations-tech-split__left">
              <span className="ft-integrations-tech-split__eyebrow">
                Platforms &amp; Technologies
              </span>
              <h2 className="ft-integrations-tech-split__title">
                We Build Across Leading API Protocols &amp; Cloud Infrastructure
              </h2>
              <div className="ft-integrations-tech-split__desc">
                <p>
                  The technologies used for an API integration depend on the application&apos;s architecture, data requirements, external platforms, and deployment environment. We select technologies based on project requirements rather than forcing every integration into a rigid template.
                </p>
                <p>
                  Our integration and development stack includes REST APIs, GraphQL, Node.js, and TypeScript for backend logic; PostgreSQL, Redis, and JSON data pipelines for processing; OpenAPI and Swagger for documentation; and webhooks, event-driven patterns, and cloud infrastructure on AWS and Google Cloud.
                </p>
              </div>
            </div>

            {/* Right Column: 3-Column Logo Grid */}
            <div className="ft-integrations-tech-split__right">
              {TECH_LOGOS.map((tech) => (
                <div key={tech.alt} className="ft-integrations-tech-logo-item">
                  <img
                    src={tech.src}
                    alt={tech.alt}
                    width={tech.width}
                    height={tech.height}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          8. WHO NEEDS API & SYSTEM INTEGRATION SERVICES? (6 Audiences)
      ========================================================= */}
      <section className="ft-integrations-section" aria-label="Who Needs Integration">
        <div className="ft-integrations-container">
          <div className="ft-integrations-section__header">
            <span className="ft-integrations-eyebrow">INDUSTRY APPLICATIONS</span>
            <h2 className="ft-integrations-heading">Who Needs API &amp; System Integration Services?</h2>
            <p className="ft-integrations-subheading">
              API integration benefits businesses that rely on multiple software applications and need those systems to exchange information reliably.
            </p>
          </div>

          <div className="ft-integrations-grid-3">
            {/* 1 */}
            <div className="ft-integrations-card">
              <h3 className="ft-integrations-card__title" style={{ marginBottom: '0.875rem' }}>
                SaaS Companies
              </h3>
              <p className="ft-integrations-card__desc">
                Connect customer-facing applications with external services, business platforms, and internal microservice components.
              </p>
            </div>

            {/* 2 */}
            <div className="ft-integrations-card">
              <h3 className="ft-integrations-card__title" style={{ marginBottom: '0.875rem' }}>
                eCommerce Businesses
              </h3>
              <p className="ft-integrations-card__desc">
                Integrate online stores with inventory management, order processing, shipping providers, and ERP accounting systems.
              </p>
            </div>

            {/* 3 */}
            <div className="ft-integrations-card">
              <h3 className="ft-integrations-card__title" style={{ marginBottom: '0.875rem' }}>
                Enterprises
              </h3>
              <p className="ft-integrations-card__desc">
                Connect CRM, ERP, legacy applications, and internal software to support seamless information exchange across departments.
              </p>
            </div>

            {/* 4 */}
            <div className="ft-integrations-card">
              <h3 className="ft-integrations-card__title" style={{ marginBottom: '0.875rem' }}>
                Startups &amp; Growing Teams
              </h3>
              <p className="ft-integrations-card__desc">
                Build API functionality into new digital products and connect third-party APIs rapidly as product requirements evolve.
              </p>
            </div>

            {/* 5 */}
            <div className="ft-integrations-card">
              <h3 className="ft-integrations-card__title" style={{ marginBottom: '0.875rem' }}>
                Technology Companies
              </h3>
              <p className="ft-integrations-card__desc">
                Develop custom APIs, developer portals, and integration layers that allow different software products to communicate.
              </p>
            </div>

            {/* 6 */}
            <div className="ft-integrations-card">
              <h3 className="ft-integrations-card__title" style={{ marginBottom: '0.875rem' }}>
                Businesses with Manual Workflows
              </h3>
              <p className="ft-integrations-card__desc">
                Eliminate repetitive manual data transfer between applications by connecting systems through automated integration pipelines.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          9. WHY CHOOSE BYTE OPERATOR (6 Cards Scroll-Driven Deck)
      ========================================================= */}
      <AdvantageDeckSlider />

      {/* =========================================================
          10. CASE STUDY: AYDI ACTIVE (3 Project Screenshots Showcase)
      ========================================================= */}
      <section className="ft-integrations-section" aria-label="Case Study">
        <div className="ft-integrations-container">
          <div className="ft-integrations-case-study">
            <div className="ft-integrations-case-study__header">
              <span className="ft-integrations-case-study__badge">
                API INTEGRATION CASE STUDY: AYDI ACTIVE
              </span>
              <h2 className="ft-integrations-case-study__title">
                Connecting a Multi-Vendor Commerce Platform Through API Integrations
              </h2>
              <p className="ft-integrations-case-study__desc">
                Aydi Active is a multi-vendor commerce platform engineered by Byte Operator. The project involved building a technical environment that supports seamless communication between the commerce platform and external business systems.
              </p>
              <p className="ft-integrations-case-study__desc">
                The integration architecture supports API-based connectivity for merchant operations, catalog synchronization, order routing, and third-party logistics endpoints.
              </p>

              <div className="ft-integrations-case-study__features">
                <div className="ft-integrations-case-study__feature-item">
                  <span className="ft-integrations-case-study__feature-dot" />
                  <span>Shopify &amp; external system connectivity</span>
                </div>
                <div className="ft-integrations-case-study__feature-item">
                  <span className="ft-integrations-case-study__feature-dot" />
                  <span>Public &amp; private REST API endpoints</span>
                </div>
                <div className="ft-integrations-case-study__feature-item">
                  <span className="ft-integrations-case-study__feature-dot" />
                  <span>Webhook event ingestion &amp; routing</span>
                </div>
                <div className="ft-integrations-case-study__feature-item">
                  <span className="ft-integrations-case-study__feature-dot" />
                  <span>Product &amp; inventory synchronization</span>
                </div>
                <div className="ft-integrations-case-study__feature-item">
                  <span className="ft-integrations-case-study__feature-dot" />
                  <span>Automated multi-vendor order routing</span>
                </div>
                <div className="ft-integrations-case-study__feature-item">
                  <span className="ft-integrations-case-study__feature-dot" />
                  <span>Merchant &amp; 3PL logistics integration</span>
                </div>
              </div>
            </div>

            {/* 3 Project Screenshots Grid */}
            <div className="ft-integrations-screenshots-grid">
              {/* Screenshot 1 */}
              <div className="ft-integrations-screenshot-card">
                <div className="ft-integrations-screenshot-image-wrap">
                  <img
                    src="https://cdn.shopify.com/s/files/1/0673/9610/8363/files/third_party_api_endpoints.png?v=1790403408"
                    alt="Aydi Active API endpoint implementation"
                    className="ft-integrations-screenshot-img"
                    width="1920"
                    height="1080"
                    loading="lazy"
                  />
                </div>
                <div className="ft-integrations-screenshot-caption">
                  <p className="ft-integrations-screenshot-caption-title">
                    API Endpoint Implementation
                  </p>
                  <p className="ft-integrations-screenshot-caption-sub">
                    Public REST endpoints, token auth &amp; webhook subscriptions
                  </p>
                </div>
              </div>

              {/* Screenshot 2 */}
              <div className="ft-integrations-screenshot-card">
                <div className="ft-integrations-screenshot-image-wrap">
                  <img
                    src="https://cdn.shopify.com/s/files/1/0673/9610/8363/files/manage_orders.png?v=1790403409"
                    alt="Aydi Active order management interface"
                    className="ft-integrations-screenshot-img"
                    width="1920"
                    height="1080"
                    loading="lazy"
                  />
                </div>
                <div className="ft-integrations-screenshot-caption">
                  <p className="ft-integrations-screenshot-caption-title">
                    Order Management Interface
                  </p>
                  <p className="ft-integrations-screenshot-caption-sub">
                    Multi-channel order splitting &amp; automated webhook ingestion
                  </p>
                </div>
              </div>

              {/* Screenshot 3 */}
              <div className="ft-integrations-screenshot-card">
                <div className="ft-integrations-screenshot-image-wrap">
                  <img
                    src="https://cdn.shopify.com/s/files/1/0673/9610/8363/files/manage_products_of_aydi.png?v=1790403225"
                    alt="Aydi Active product synchronization interface"
                    className="ft-integrations-screenshot-img"
                    width="1920"
                    height="1080"
                    loading="lazy"
                  />
                </div>
                <div className="ft-integrations-screenshot-caption">
                  <p className="ft-integrations-screenshot-caption-title">
                    Product Synchronization Interface
                  </p>
                  <p className="ft-integrations-screenshot-caption-sub">
                    Bi-directional catalog syncing &amp; multi-tier inventory feeds
                  </p>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '2.5rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
              <Link
                to="/work/aydi-active"
                prefetch="intent"
                className="ft-integrations-hero__btn-primary"
                style={{ textDecoration: 'none' }}
              >
                Explore the Aydi Active Case Study &rarr;
              </Link>
              <CalendlyButton
                label="Discuss Your API Integration Project"
                className="ft-integrations-hero__btn-secondary"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          11. FREQUENTLY ASKED QUESTIONS (Two-Column Sticky Layout)
      ========================================================= */}
      <section className="ft-home-faqs" aria-label="Frequently Asked Questions">
        <div className="ft-home-faqs__container">
          <div className="ft-home-faqs__grid">
            {/* Left Column: Sticky Title + Discovery Call Box */}
            <div className="ft-home-faqs__left">
              <div className="ft-home-faqs__header">
                <p className="ft-home-faqs__eyebrow">
                  FREQUENTLY ASKED QUESTIONS
                </p>
                <h2 className="ft-home-faqs__heading">
                  API &amp; System Integration FAQs
                </h2>
                <p className="ft-home-faqs__subtitle">
                  Find clear answers to common questions about custom API development, ERP/CRM connectivity, REST/GraphQL protocols, and webhook pipelines.
                </p>
              </div>

              <div className="ft-home-faqs__callout">
                <h3 className="ft-home-faqs__callout-title">
                  Have questions about your integration architecture?
                </h3>
                <p className="ft-home-faqs__callout-text">
                  Our software engineers can review your API documentation, system endpoints, and synchronization needs during an exploratory discovery call.
                </p>
                <CalendlyButton
                  label="Speak with our engineering team &rarr;"
                  className="ft-home-faqs__callout-btn"
                />
              </div>
            </div>

            {/* Right Column: 11 Interactive Accordion Items */}
            <div className="ft-home-faqs__right">
              {INTEGRATION_FAQS.map((faq, index) => {
                const isOpen = openFaqIndex === index;

                return (
                  <div
                    key={faq.number}
                    className={`ft-home-faqs__item ${isOpen ? 'ft-home-faqs__item--open' : ''}`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(index)}
                      className="ft-home-faqs__trigger"
                      aria-expanded={isOpen}
                    >
                      <div className="ft-home-faqs__trigger-content">
                        <span className="ft-home-faqs__number">
                          {faq.number}
                        </span>
                        <span
                          className="ft-home-faqs__question"
                          style={{
                            color: isOpen ? '#ffffff' : '#f1f5f9',
                          }}
                        >
                          {faq.question}
                        </span>
                      </div>
                      <span
                        className="ft-home-faqs__icon"
                        style={{
                          color: isOpen ? '#60a5fa' : '#94a3b8',
                        }}
                      >
                        {isOpen ? '\u2014' : '+'}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="ft-home-faqs__answer">
                        <p style={{ margin: 0 }}>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          12. FINAL CONVERSION CTA BLOCK
      ========================================================= */}
      <ServiceFinalCta
        eyebrow="API & SYSTEM INTEGRATION"
        title="Let's Build a More Connected Business"
        description="Disconnected applications can create unnecessary complexity across business operations. The right API architecture can help your systems exchange information, support connected workflows, and adapt as your business grows."
        tagline="Tell us which systems you need to connect and what you want your integration to achieve."
        primaryButtonLabel="Discuss Your API Integration Project"
        secondaryButtonLabel="Contact Byte Operator →"
        secondaryButtonHref="/contact"
        pillars={[
          {
            title: 'Resilient Webhook Pipelines',
            description:
              'Automated retry mechanisms, dead-letter queues, and real-time payload transformation between platforms.',
          },
          {
            title: 'Custom API Architecture',
            description:
              'Tailored REST and GraphQL endpoints connecting legacy backends with modern cloud apps and EHR systems.',
          },
          {
            title: 'Security & Access Scoping',
            description:
              'OAuth2 authentication, token rotation, SSL/TLS encryption, and strict rate-limiting policies.',
          },
        ]}
      />
    </div>
  );
}
