'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Link } from '~/lib/router-compat';
import { CalendlyButton } from '~/components/shared/CalendlyButton';
import { ServiceFinalCta } from '~/components/shared/ServiceFinalCta';

/* =========================================================
   FAQ DATA (12 QUESTIONS FROM SPECIFICATION)
========================================================= */

const SAAS_FAQS = [
  {
    number: '01',
    question: 'What is SaaS application development?',
    answer:
      'SaaS application development is the process of designing, building, deploying, and maintaining software that users access through the internet. SaaS products commonly provide centralized application functionality, user accounts, data management, and subscription-based access, depending on the business model.',
  },
  {
    number: '02',
    question: 'What is the difference between SaaS development and web application development?',
    answer:
      'SaaS development focuses on creating software delivered as an online service, often serving multiple customers or organizations through a centralized platform. Web application development is a broader category that includes interactive browser-based applications, whether they are SaaS products, internal business tools, customer portals, or other custom systems.',
  },
  {
    number: '03',
    question: 'Can you build a custom SaaS application from scratch?',
    answer:
      'Yes. Byte Operator provides custom SaaS application development, including application planning, frontend and backend engineering, database design, APIs, integrations, and cloud deployment.',
  },
  {
    number: '04',
    question: 'Can you develop a web application for our existing business?',
    answer:
      'Yes. We can develop custom web applications around your business workflows, user requirements, and existing systems. The scope depends on the functionality, integrations, and technical requirements of the project.',
  },
  {
    number: '05',
    question: 'Can you build a multi-tenant SaaS platform?',
    answer:
      'Yes. We can design and develop multi-tenant SaaS architecture where it is appropriate for the product. This includes planning tenant structures, user roles, permissions, and customer data separation according to the application\'s requirements.',
  },
  {
    number: '06',
    question: 'Can you integrate our application with third-party platforms?',
    answer:
      'Yes. We develop API and webhook integrations to connect applications with external services such as payment providers, CRMs, ERPs, analytics tools, and other business systems. The available integration approach depends on the APIs and access provided by the third-party platform.',
  },
  {
    number: '07',
    question: 'Which technologies do you use for SaaS development?',
    answer:
      'Our technology stack can include React, Next.js, and TypeScript for frontend development; Node.js, Python, and Go for backend services; PostgreSQL, Redis, and MongoDB for data infrastructure; and AWS, Google Cloud, Docker, and Kubernetes for deployment and infrastructure. The final stack is selected according to project requirements.',
  },
  {
    number: '08',
    question: 'Can you add new features to an existing SaaS application?',
    answer:
      'Yes. We can work on existing applications to add functionality, improve interfaces, develop APIs, connect external systems, and address technical or performance requirements.',
  },
  {
    number: '09',
    question: 'Do you provide cloud deployment?',
    answer:
      'Yes. Our services include cloud deployment and infrastructure configuration using platforms such as AWS and Google Cloud Platform, with Docker, Kubernetes, and CI/CD workflows where appropriate.',
  },
  {
    number: '10',
    question: 'Do you provide ongoing SaaS maintenance?',
    answer:
      'Yes. We provide ongoing engineering support that can include bug fixes, application updates, feature enhancements, performance improvements, integration updates, and technical maintenance.',
  },
  {
    number: '11',
    question: 'How much does it cost to build a SaaS application?',
    answer:
      'The cost depends on the application\'s scope, number of user roles, required features, architecture, integrations, data requirements, and deployment needs. A focused application with a limited feature set will have different requirements from a complex multi-tenant SaaS platform. The best starting point is to discuss your requirements so the project can be scoped accurately.',
  },
  {
    number: '12',
    question: 'How long does it take to develop a SaaS platform?',
    answer:
      'The development timeline depends on the product\'s complexity, design requirements, integrations, and testing needs. A smaller application can require a different delivery plan from a large platform with multiple user types and complex workflows. We establish a realistic timeline after reviewing the project scope.',
  },
] as const;

const SAAS_TECH_LOGOS = [
  { src: '/images/home-partners/react.svg', alt: 'React', width: 160, height: 40 },
  { src: '/images/home-partners/nextjs.svg', alt: 'Next.js', width: 160, height: 40 },
  { src: '/images/home-partners/typescript.svg', alt: 'TypeScript', width: 160, height: 40 },
  { src: '/images/home-partners/nodejs.svg', alt: 'Node.js', width: 160, height: 40 },
  { src: '/images/home-partners/python.svg', alt: 'Python', width: 160, height: 40 },
  { src: '/images/home-partners/golang.svg', alt: 'Golang', width: 160, height: 40 },
  { src: '/images/home-partners/postgresql.svg', alt: 'PostgreSQL', width: 170, height: 40 },
  { src: '/images/home-partners/redis.svg', alt: 'Redis', width: 160, height: 40 },
  { src: '/images/home-partners/mongodb.svg', alt: 'MongoDB', width: 160, height: 40 },
  { src: '/images/home-partners/aws.svg', alt: 'AWS', width: 160, height: 40 },
  { src: '/images/home-partners/google-cloud.svg', alt: 'Google Cloud', width: 170, height: 40 },
  { src: '/images/home-partners/docker.svg', alt: 'Docker', width: 160, height: 40 },
  { src: '/images/home-partners/kubernetes.svg', alt: 'Kubernetes', width: 170, height: 40 },
  { src: '/images/home-partners/graphql.svg', alt: 'GraphQL', width: 160, height: 40 },
  { src: '/images/home-partners/cloudflare.svg', alt: 'Cloudflare', width: 160, height: 40 },
] as const;

/* =========================================================
   3. SAAS SERVICES (9 CARDS DATA)
========================================================= */

const SAAS_SERVICES = [
  {
    badge: '01. CORE SAAS',
    title: 'Custom SaaS Application Development',
    desc: 'We build custom Software-as-a-Service applications that allow businesses to deliver digital products and services through a centralized online platform.',
    items: [
      'Custom user registration and authentication',
      'User dashboards and account management',
      'Role-based access and permissions',
      'Centralized data and application management',
      'Multi-tenant architecture where required',
      'API and third-party service integrations',
      'Administrative interfaces and reporting',
      'Cloud deployment and application monitoring',
    ],
    footer: 'Whether developing a B2B platform, subscription product, or internal SaaS solution, we translate requirements into a working application.',
  },
  {
    badge: '02. PLATFORMS',
    title: 'SaaS Platform Development',
    desc: 'A SaaS platform needs more than a collection of screens. Its architecture must support the relationship between users, organizations, data, permissions, and application services.',
    items: [
      'Organization and tenant management',
      'User roles and permission structures',
      'Centralized administration',
      'Subscription and billing integrations',
      'Data management and reporting',
      'Workflow and process management',
      'API-based connectivity',
      'Application performance and scalability planning',
    ],
    footer: 'For multi-tenant products, we plan how customer environments and data access should be securely separated.',
  },
  {
    badge: '03. WEB APPS',
    title: 'Custom Web Application Development',
    desc: 'We develop custom web applications that help businesses manage operations, serve customers, connect systems, and deliver digital services through a browser experience.',
    items: [
      'Business and operational applications',
      'Customer and partner portals',
      'Internal management systems',
      'Admin dashboards',
      'Data management applications',
      'Workflow and approval systems',
      'Reporting and analytics interfaces',
      'Custom interfaces for existing business systems',
    ],
    footer: 'Each application is developed around its intended users and workflows, with attention to usability and maintainable code.',
  },
  {
    badge: '04. FRONTEND',
    title: 'Frontend Application Development',
    desc: 'The frontend is where users interact with your application. It should make complex functionality understandable and everyday tasks straightforward.',
    items: [
      'Responsive web application interfaces',
      'Interactive dashboards and data views',
      'User registration and account interfaces',
      'Forms, tables, filters, and navigation',
      'Reusable UI component design systems',
      'API-connected application features',
      'Cross-device interface optimization',
    ],
    footer: 'We use technologies such as React, Next.js, and TypeScript to develop structured, component-based frontend applications.',
  },
  {
    badge: '05. BACKEND & APIS',
    title: 'Backend Development & API Engineering',
    desc: 'The backend powers business logic, data processing, authentication, application workflows, and communication between systems.',
    items: [
      'Application business logic engineering',
      'Database design and data processing',
      'Authentication and authorization protocols',
      'REST and GraphQL API development',
      'Backend service architecture',
      'Application integrations',
      'Data validation and robust error handling',
      'Background processing and automated tasks',
    ],
    footer: 'Depending on application requirements, our backend engineering stack includes Node.js, Python, and Go.',
  },
  {
    badge: '06. ARCHITECTURE',
    title: 'SaaS Architecture & Database Design',
    desc: 'Decisions made during application architecture have a direct impact on how easily a product can be extended, maintained, and operated.',
    items: [
      'Application architecture and service boundaries',
      'Database schema and relationship design',
      'Tenant, user, and permission models',
      'Data access and validation controls',
      'API architecture and rate limiting',
      'Caching and performance considerations',
      'Application security controls',
      'Future feature and scaling requirements',
    ],
    footer: 'Database technologies include PostgreSQL, Redis, and MongoDB, selected according to project needs.',
  },
  {
    badge: '07. DEPLOYMENT',
    title: 'Cloud Deployment & Infrastructure',
    desc: 'A completed application needs a dependable environment in which it can run, be monitored, and be updated with confidence.',
    items: [
      'Cloud environment configuration',
      'Application deployment on AWS & GCP',
      'Docker-based containerization',
      'Kubernetes where appropriate',
      'CI/CD pipeline automated setup',
      'Environment and secret configuration management',
      'Application monitoring and health checks',
      'Deployment and release workflows',
    ],
    footer: 'We work with AWS and Google Cloud Platform, selecting infrastructure based on technical requirements.',
  },
  {
    badge: '08. CONNECTIVITY',
    title: 'Third-Party Integrations & Connectivity',
    desc: 'Modern applications rarely operate in isolation. They communicate with payment providers, CRMs, ERPs, analytics, and messaging platforms.',
    items: [
      'Payment gateway integrations (Stripe, etc.)',
      'CRM and ERP system connectivity',
      'Authentication services (OAuth, Auth0, Supabase)',
      'Email and communication platforms',
      'Analytics and reporting tools',
      'External data services',
      'Custom REST and GraphQL APIs',
      'Webhook-based event handling',
    ],
    footer: 'We plan integrations around data flow, authentication, error handling, and dependent business workflows.',
  },
  {
    badge: '09. EVOLUTION',
    title: 'SaaS Maintenance, Improvements & Scaling',
    desc: 'Launching an application is not the end of product development. As users interact and business requirements change, ongoing engineering keeps your software reliable.',
    items: [
      'Feature enhancements and new functionality',
      'Bug investigation and rapid resolution',
      'Performance improvements and latency reduction',
      'Application updates and technical maintenance',
      'Database and backend optimization',
      'API and integration updates',
      'Deployment improvements',
      'Architecture reviews and modernization',
    ],
    footer: 'The objective is to keep your application aligned with changing business needs while maintaining a clear path for future development.',
  },
] as const;

function SaasServicesSlider() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % SAAS_SERVICES.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + SAAS_SERVICES.length) % SAAS_SERVICES.length);
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
    const diff = (idx - activeSlide + SAAS_SERVICES.length) % SAAS_SERVICES.length;
    if (diff === 0) return 'ft-saas-slider-card ft-saas-slider-card--active';
    if (diff === 1) return 'ft-saas-slider-card ft-saas-slider-card--next';
    if (diff === SAAS_SERVICES.length - 1) return 'ft-saas-slider-card ft-saas-slider-card--prev';
    return 'ft-saas-slider-card ft-saas-slider-card--hidden';
  };

  return (
    <section className="ft-saas-section" aria-label="Core Services">
      <div className="ft-saas-container">
        <div className="ft-saas-section__header">
          <span className="ft-saas-eyebrow">END-TO-END DEVELOPMENT CAPABILITIES</span>
          <h2 className="ft-saas-heading">Our SaaS &amp; Web Application Development Services</h2>
          <p className="ft-saas-subheading">
            We provide end-to-end development services for businesses that need custom digital products, business applications, and cloud-based software platforms.
          </p>
        </div>

        {/* 3D Coverflow Carousel */}
        <div
          className="ft-saas-slider-wrapper"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button
            type="button"
            className="ft-saas-slider-nav-btn ft-saas-slider-nav-btn--prev"
            onClick={prevSlide}
            aria-label="Previous service"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <button
            type="button"
            className="ft-saas-slider-nav-btn ft-saas-slider-nav-btn--next"
            onClick={nextSlide}
            aria-label="Next service"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          <div className="ft-saas-slider-stage">
            {SAAS_SERVICES.map((service, idx) => {
              const isActive = idx === activeSlide;
              return (
                <div
                  key={service.title}
                  className={getCardClass(idx)}
                  onClick={() => {
                    if (!isActive) setActiveSlide(idx);
                  }}
                >
                  <div className="ft-saas-card__header">
                    <span className="ft-saas-card__badge">{service.badge}</span>
                    <h3 className="ft-saas-card__title">{service.title}</h3>
                  </div>
                  <p className="ft-saas-card__desc">{service.desc}</p>
                  <ul className="ft-saas-card__list">
                    {service.items.map((item, itemIdx) => (
                      <li className="ft-saas-card__list-item" key={itemIdx}>
                        <span className="ft-saas-card__list-bullet">&bull;</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="ft-saas-card__footer">
                    <p className="ft-saas-card__footer-note">{service.footer}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="ft-saas-slider-dots">
            {SAAS_SERVICES.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`ft-saas-slider-dot ${i === activeSlide ? 'ft-saas-slider-dot--active' : ''}`}
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
   6. DEVELOPMENT PROCESS (7 STEPS SCROLL-DRIVEN DECK SLIDER)
========================================================= */

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Discovery & Requirements Analysis',
    subtitle: 'Scoping, Objectives & Key Workflows',
    desc: 'We begin by understanding your product idea, business objectives, intended users, and application requirements.',
    items: [
      'Defining the problem the application will solve',
      'Identifying user types and key workflows',
      'Reviewing required features and integrations',
      'Understanding technical constraints and scope',
    ],
  },
  {
    step: '02',
    title: 'Planning & Application Architecture',
    subtitle: 'System Structure, Schemas & Infrastructure',
    desc: 'Once the requirements are understood, we plan the application’s structure, database design, user permissions, and cloud infrastructure.',
    items: [
      'Frontend and backend architecture',
      'Database schema & relationship models',
      'User permissions & tenant isolation',
      'Pragmatic decisions without unnecessary complexity',
    ],
  },
  {
    step: '03',
    title: 'UI/UX & Frontend Development',
    subtitle: 'Interface Usability, Speed & Clear Interactions',
    desc: 'We translate planned user journeys into clean, responsive application interfaces designed around usability, speed, and clear interactions.',
    items: [
      'Interactive Figma wireframes to code',
      'Responsive desktop, tablet, and mobile layouts',
      'Consistent design systems & reusable UI components',
      'Practical ergonomics for intended users',
    ],
  },
  {
    step: '04',
    title: 'Backend & Database Development',
    subtitle: 'Business Logic, Data Structures & Secure APIs',
    desc: 'We build the application logic, backend services, database structures, authentication, and APIs that power the product.',
    items: [
      'Robust business logic & data validation',
      'PostgreSQL / Redis database migrations',
      'Secure session management and RBAC',
      'Synchronous & asynchronous task processing',
    ],
  },
  {
    step: '05',
    title: 'Integrations & Quality Assurance',
    subtitle: 'External Services, Edge Cases & Verification',
    desc: 'We connect the required external services and rigorously test application workflows across edge cases and high workloads.',
    items: [
      'Payment gateway & third-party API wiring',
      'End-to-end functionality & permission testing',
      'Cross-browser & mobile responsiveness testing',
      'Vulnerability scanning & error validation',
    ],
  },
  {
    step: '06',
    title: 'Cloud Deployment & Launch',
    subtitle: 'Infrastructure Setup, Automated CI/CD & Health Monitoring',
    desc: 'Once the application is ready for release, we configure the deployment environment and prepare the application for production.',
    items: [
      'AWS / GCP cloud infrastructure provisioning',
      'Docker containerization & automated CI/CD',
      'Live telemetry, logging, and health monitoring',
      'Zero-downtime release workflows',
    ],
  },
  {
    step: '07',
    title: 'Ongoing Improvements & Maintenance',
    subtitle: 'Feature Enhancements, Optimization & Dedicated SLAs',
    desc: 'After launch, we can continue developing the application through feature enhancements, technical updates, performance improvements, and maintenance.',
    items: [
      'Iterative feature development based on user feedback',
      'Database query optimization and performance tuning',
      'Framework & security patch updates',
      'Dedicated engineering SLA support',
    ],
  },
] as const;

const PROCESS_ROTATES = ['-1.8deg', '1.4deg', '-0.8deg', '1.9deg', '-1.2deg', '1.5deg', '-1.6deg'];

function ProcessDeckSlider() {
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
    const targetScroll = sectionTop + (index / (PROCESS_STEPS.length - 1)) * scrollDistance;
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
      const activePosition = progress * (PROCESS_STEPS.length - 1);
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

      setCurrentActiveIndex(clamp(Math.round(activePosition), 0, PROCESS_STEPS.length - 1));
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
    <section ref={sectionRef} className="ft-saas-experience-section" aria-label="Development Process">
      <div className="ft-saas-experience-inner">
        {/* Centered Heading Section */}
        <div className="ft-saas-experience-heading">
          <span className="ft-saas-experience-eyebrow">SYSTEMATIC DELIVERY</span>
          <h2 className="ft-saas-heading">Our SaaS &amp; Web Application Development Process</h2>
          <p className="ft-saas-subheading">
            A well-defined development process helps reduce uncertainty, align technical decisions with business objectives, and create a clear path from requirements to deployment.
          </p>
        </div>

        {/* Stacked Cards List on Scroll */}
        <div className="ft-saas-experience-list">
          {PROCESS_STEPS.map((step, index) => (
            <article
              key={step.title}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="ft-saas-experience-item"
              style={{
                ['--experience-card-base-rotate' as any]: PROCESS_ROTATES[index] || '0deg',
              }}
            >
              {/* Circular arrow button on left */}
              <div
                className="ft-saas-experience-arrow"
                onClick={() => scrollToCard((index + 1) % PROCESS_STEPS.length)}
                role="button"
                tabIndex={0}
                aria-label="Advance to next step"
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
              <div className="ft-saas-experience-copy">
                <div className="ft-saas-experience-copy__header">
                  <h3 className="ft-saas-experience-copy__title">{step.title}</h3>
                  <span className="ft-saas-experience-copy__subtitle">{step.subtitle}</span>
                </div>
                <p className="ft-saas-experience-copy__summary">{step.desc}</p>
                <div className="ft-saas-experience-bullets">
                  {step.items.map((item, idx) => (
                    <div key={idx} className="ft-saas-experience-bullet">
                      <span style={{ color: '#38bdf8', fontWeight: 700 }}>•</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Side: Badge & Link */}
              <div className="ft-saas-experience-side">
                <span className="ft-saas-experience-date">{`Step ${step.step}`}</span>
                <Link href="/contact" className="ft-saas-experience-link">
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
        <div className="ft-saas-experience-progress">
          <span className="ft-saas-experience-counter">
            {String(currentActiveIndex + 1).padStart(2, '0')} / {String(PROCESS_STEPS.length).padStart(2, '0')}
          </span>
          <div className="ft-saas-experience-dots">
            {PROCESS_STEPS.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                className={`ft-saas-experience-dot ${dotIdx === currentActiveIndex ? 'ft-saas-experience-dot--active' : ''}`}
                onClick={() => scrollToCard(dotIdx)}
                aria-label={`Scroll to step ${dotIdx + 1}`}
              />
            ))}
          </div>
          <span className="ft-saas-experience-hint">Scroll down to explore</span>
        </div>
      </div>
    </section>
  );
}

export function SaasWebPageClient() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((current) => (current === index ? null : index));
  };

  return (
    <div className="ft-saas-page">
      {/* =========================================================
          1. HERO SECTION (2-Line Heading with Exact Font Specs)
      ========================================================= */}
      <section className="ft-saas-hero">
        <div className="ft-saas-container">
          <div className="ft-saas-hero__header">
            <p className="ft-saas-hero__eyebrow">
              FULL-STACK APPLICATION ENGINEERING
            </p>
            <h1 className="ft-saas-hero__title">
              <span className="ft-saas-hero__title-line">
                SaaS &amp; Web Application
              </span>
              <span className="ft-saas-hero__title-line">
                Development Services
              </span>
            </h1>

            <div className="ft-saas-hero__text-group">
              <p className="ft-saas-hero__lead">
                Build powerful SaaS platforms and custom web applications designed around the way your business works. Byte Operator delivers full-stack application development, scalable software architecture, cloud deployment, system integrations, and ongoing engineering support to help businesses turn ideas and operational requirements into reliable digital products. Whether you are launching a new SaaS product, developing a business-critical web application, or expanding an existing platform, we bring frontend and backend engineering together to create software that is practical to use, maintainable, and ready to evolve.
              </p>
            </div>

            <div className="ft-saas-hero__cta-group">
              <CalendlyButton
                label="Discuss Your Project"
                className="ft-saas-hero__btn-primary"
              />
              <Link
                to="/contact"
                prefetch="intent"
                className="ft-saas-hero__btn-secondary"
              >
                Contact Byte Operator &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          2. OVERVIEW / SPLIT SECTION (2-COL)
      ========================================================= */}
      <section className="ft-saas-section" aria-label="Overview">
        <div className="ft-saas-container">
          <div className="ft-saas-overview-grid">
            <div className="ft-saas-overview__content">
              <span className="ft-saas-eyebrow">TAILORED DIGITAL ARCHITECTURE</span>
              <h3>Custom SaaS and Web Applications Built Around Your Business</h3>
              <p>
                Off-the-shelf software can be useful, but it does not always fit the way a business operates. As workflows become more complex, teams may find themselves relying on disconnected tools, manual processes, spreadsheets, or applications that cannot support their changing requirements.
              </p>
              <p>
                Custom SaaS and web application development gives your business greater control over its digital infrastructure. Instead of adapting every process to a fixed product, you can develop an application around your users, workflows, business rules, and long-term objectives.
              </p>
              <p>
                At Byte Operator, we design and develop custom software products that bring essential functionality into one connected application. From the user interface to backend services, databases, APIs, and cloud infrastructure, each part is planned to work as a unified system.
              </p>
            </div>

            {/* Media Image Column */}
            <div className="ft-saas-overview__media">
              <div className="ft-saas-overview__media-card">
                <img
                  src="https://cdn.shopify.com/s/files/1/0676/1155/7936/files/SaaS_Web_Apps_Section_Image.webp?v=1793802744"
                  alt="Custom SaaS and Web Applications Built Around Your Business"
                  className="ft-saas-overview__media-image"
                  width="1920"
                  height="1080"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="ft-saas-overview__media-caption">
                <p className="ft-saas-overview__media-caption-title">
                  Custom SaaS &amp; Web Applications
                </p>
                <p className="ft-saas-overview__media-caption-sub">
                  Full-Stack Architecture, Cloud Deployment &amp; Business Systems
                </p>
              </div>
            </div>
          </div>

          {/* Three Priority Cards in a 3-Column Grid Below */}
          <div className="ft-saas-overview__priorities">
            <div className="ft-saas-priority-card">
              <h4>Business-focused functionality</h4>
              <p>
                Build features around real user needs, operational workflows, and product objectives.
              </p>
            </div>
            <div className="ft-saas-priority-card">
              <h4>Scalable application architecture</h4>
              <p>
                Establish a technical foundation that can support new features, users, integrations, and changing requirements.
              </p>
            </div>
            <div className="ft-saas-priority-card">
              <h4>Maintainable engineering</h4>
              <p>
                Structure the application so it can be tested, improved, monitored, and extended over time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          3. OUR SAAS & WEB APPLICATION DEVELOPMENT SERVICES (9 Cards Coverflow Carousel)
      ========================================================= */}
      <SaasServicesSlider />

      {/* =========================================================
          4. TYPES OF SAAS PLATFORMS WE DEVELOP (7 Cards - Trailing Centered)
      ========================================================= */}
      <section className="ft-saas-section" aria-label="Types of Platforms">
        <div className="ft-saas-container">
          <div className="ft-saas-section__header">
            <span className="ft-saas-eyebrow">CUSTOM APPLICATION ARCHITECTURES</span>
            <h2 className="ft-saas-heading">Types of SaaS Platforms &amp; Web Applications We Develop</h2>
            <p className="ft-saas-subheading">
              Every product has different users, workflows, and technical requirements. We shape the application around the problem it needs to solve rather than forcing every project into the same template.
            </p>
          </div>

          <div className="ft-saas-grid-3">
            {/* 1 */}
            <div className="ft-saas-card">
              <h3 className="ft-saas-card__title" style={{ marginBottom: '0.875rem' }}>
                B2B SaaS Applications
              </h3>
              <p className="ft-saas-card__desc">
                Cloud-based software that helps businesses provide services, manage customers, coordinate teams, or deliver specialized functionality through an online platform.
              </p>
            </div>

            {/* 2 */}
            <div className="ft-saas-card">
              <h3 className="ft-saas-card__title" style={{ marginBottom: '0.875rem' }}>
                Business Management Applications
              </h3>
              <p className="ft-saas-card__desc">
                Custom applications for managing internal operations, projects, resources, tasks, and business information in a centralized environment.
              </p>
            </div>

            {/* 3 */}
            <div className="ft-saas-card">
              <h3 className="ft-saas-card__title" style={{ marginBottom: '0.875rem' }}>
                Customer &amp; Partner Portals
              </h3>
              <p className="ft-saas-card__desc">
                Secure web applications that give customers, partners, or suppliers access to relevant information, account features, documents, and services.
              </p>
            </div>

            {/* 4 */}
            <div className="ft-saas-card">
              <h3 className="ft-saas-card__title" style={{ marginBottom: '0.875rem' }}>
                Admin Dashboards &amp; Reporting Systems
              </h3>
              <p className="ft-saas-card__desc">
                Centralized interfaces for managing users, application data, business activities, reports, and operational information.
              </p>
            </div>

            {/* 5 */}
            <div className="ft-saas-card">
              <h3 className="ft-saas-card__title" style={{ marginBottom: '0.875rem' }}>
                Workflow &amp; Process Management Applications
              </h3>
              <p className="ft-saas-card__desc">
                Applications that organize business processes, task assignments, approvals, notifications, and operational workflows.
              </p>
            </div>

            {/* 6 */}
            <div className="ft-saas-card">
              <h3 className="ft-saas-card__title" style={{ marginBottom: '0.875rem' }}>
                Data Management Applications
              </h3>
              <p className="ft-saas-card__desc">
                Custom software for collecting, organizing, processing, viewing, and managing structured business information.
              </p>
            </div>

            {/* 7 (Trailing Card Centered on Row 3) */}
            <div className="ft-saas-card">
              <h3 className="ft-saas-card__title" style={{ marginBottom: '0.875rem' }}>
                Subscription-Based Software Products
              </h3>
              <p className="ft-saas-card__desc">
                Applications that support subscription-oriented business models, including account management and integrations with suitable billing providers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          5. ESSENTIAL CAPABILITIES OF A SCALABLE SAAS (8 Cards - Trailing Centered)
      ========================================================= */}
      <section className="ft-saas-section" aria-label="Essential Capabilities">
        <div className="ft-saas-container">
          <div className="ft-saas-section__header">
            <span className="ft-saas-eyebrow">PLATFORM FOUNDATIONS</span>
            <h2 className="ft-saas-heading">Essential Capabilities of a Scalable SaaS Application</h2>
            <p className="ft-saas-subheading">
              A scalable SaaS application needs a foundation that supports both its current functionality and its future development. We identify the capabilities relevant to your application and plan architecture accordingly.
            </p>
          </div>

          <div className="ft-saas-grid-3">
            {/* 1 */}
            <div className="ft-saas-card">
              <h3 className="ft-saas-card__title" style={{ marginBottom: '0.875rem' }}>
                User Authentication &amp; Account Management
              </h3>
              <p className="ft-saas-card__desc">
                Give users a structured way to register, sign in, manage their accounts, and access the application with secure credentials and session controls.
              </p>
            </div>

            {/* 2 */}
            <div className="ft-saas-card">
              <h3 className="ft-saas-card__title" style={{ marginBottom: '0.875rem' }}>
                Role-Based Access Control
              </h3>
              <p className="ft-saas-card__desc">
                Define what different users can view and do within the application. Roles and permissions help organize access across teams, departments, and customer accounts.
              </p>
            </div>

            {/* 3 */}
            <div className="ft-saas-card">
              <h3 className="ft-saas-card__title" style={{ marginBottom: '0.875rem' }}>
                Multi-Tenant Architecture
              </h3>
              <p className="ft-saas-card__desc">
                For SaaS products serving multiple organizations, multi-tenant architecture supports a shared application environment with appropriate separation of customer data.
              </p>
            </div>

            {/* 4 */}
            <div className="ft-saas-card">
              <h3 className="ft-saas-card__title" style={{ marginBottom: '0.875rem' }}>
                Application Dashboards
              </h3>
              <p className="ft-saas-card__desc">
                Present relevant information, activities, and application features through interfaces designed around user roles and real-world workflows.
              </p>
            </div>

            {/* 5 */}
            <div className="ft-saas-card">
              <h3 className="ft-saas-card__title" style={{ marginBottom: '0.875rem' }}>
                Database &amp; Data Management
              </h3>
              <p className="ft-saas-card__desc">
                Structure application data to support reliable storage, retrieval, validation, and processing as product requirements and user counts evolve.
              </p>
            </div>

            {/* 6 */}
            <div className="ft-saas-card">
              <h3 className="ft-saas-card__title" style={{ marginBottom: '0.875rem' }}>
                API &amp; Third-Party Connectivity
              </h3>
              <p className="ft-saas-card__desc">
                Connect your application with external platforms and services through well-documented APIs, webhook triggers, and event streams.
              </p>
            </div>

            {/* 7 */}
            <div className="ft-saas-card">
              <h3 className="ft-saas-card__title" style={{ marginBottom: '0.875rem' }}>
                Security &amp; Application Monitoring
              </h3>
              <p className="ft-saas-card__desc">
                Plan access controls, data protection, application logging, telemetry, monitoring, and operational safeguards according to the product&apos;s requirements.
              </p>
            </div>

            {/* 8 */}
            <div className="ft-saas-card">
              <h3 className="ft-saas-card__title" style={{ marginBottom: '0.875rem' }}>
                Subscription &amp; Billing Integrations
              </h3>
              <p className="ft-saas-card__desc">
                Where the business model requires recurring payments, integrate suitable billing services and connect subscription status with application access.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          6. DEVELOPMENT PROCESS ROADMAP (7 Steps Scroll-Driven Deck)
      ========================================================= */}
      <ProcessDeckSlider />

      {/* =========================================================
          7. TECHNOLOGIES WE USE SECTION (2-Col Split Layout)
      ========================================================= */}
      <section className="ft-saas-section" aria-label="Technologies We Use">
        <div className="ft-saas-container">
          <div className="ft-saas-tech-split">
            {/* Left Column: Heading & Comprehensive Overview */}
            <div className="ft-saas-tech-split__left">
              <span className="ft-saas-tech-split__eyebrow">
                Platforms &amp; Technologies
              </span>
              <h2 className="ft-saas-tech-split__title">
                We Build Across Leading Technologies and Cloud Architecture
              </h2>
              <div className="ft-saas-tech-split__desc">
                <p>
                  Byte Operator works across modern development stacks, distributed cloud infrastructure, and intelligent automation frameworks. We help businesses build, scale, and modernize custom SaaS platforms and web applications based on their specific operational requirements.
                </p>
                <p>
                  Our engineering experience includes React, Next.js, TypeScript, Node.js, Python, Go, PostgreSQL, Redis, MongoDB, AWS, Google Cloud Platform, Docker, and Kubernetes. We help businesses choose and connect the technology foundation that best supports their application performance, user experience, and long-term scale.
                </p>
              </div>
            </div>

            {/* Right Column: 3-Column Logo Grid */}
            <div className="ft-saas-tech-split__right">
              {SAAS_TECH_LOGOS.map((tech) => (
                <div key={tech.alt} className="ft-saas-tech-logo-item">
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
          8. WHO WE BUILD SAAS & WEB APPLICATIONS FOR (4 Audiences)
      ========================================================= */}
      <section className="ft-saas-section" aria-label="Who We Build For">
        <div className="ft-saas-container">
          <div className="ft-saas-section__header">
            <span className="ft-saas-eyebrow">CLIENT PARTNERSHIPS</span>
            <h2 className="ft-saas-heading">Who We Build SaaS &amp; Web Applications For</h2>
            <p className="ft-saas-subheading">
              We work with businesses and product teams that need custom software to support a new product, improve an existing service, or connect important business operations.
            </p>
          </div>

          <div className="ft-saas-grid-4">
            {/* 1 */}
            <div className="ft-saas-card">
              <h3 className="ft-saas-card__title" style={{ marginBottom: '0.875rem' }}>
                Startups &amp; Founders
              </h3>
              <p className="ft-saas-card__desc">
                Build a new software product around a clear business idea, with a technical foundation that can support future development and rapid user validation.
              </p>
            </div>

            {/* 2 */}
            <div className="ft-saas-card">
              <h3 className="ft-saas-card__title" style={{ marginBottom: '0.875rem' }}>
                SaaS Companies
              </h3>
              <p className="ft-saas-card__desc">
                Develop new features, improve application architecture, connect external services, or extend an existing SaaS platform to serve enterprise tiers.
              </p>
            </div>

            {/* 3 */}
            <div className="ft-saas-card">
              <h3 className="ft-saas-card__title" style={{ marginBottom: '0.875rem' }}>
                Small &amp; Medium Businesses
              </h3>
              <p className="ft-saas-card__desc">
                Replace disconnected tools and manual spreadsheet processes with custom web applications that support the exact way your business operates.
              </p>
            </div>

            {/* 4 */}
            <div className="ft-saas-card">
              <h3 className="ft-saas-card__title" style={{ marginBottom: '0.875rem' }}>
                Established Enterprises
              </h3>
              <p className="ft-saas-card__desc">
                Develop internal platforms, customer-facing applications, partner portals, and custom API integrations that seamlessly fit existing systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          9. WHY CHOOSE BYTE OPERATOR (6 Cards in 3 Columns)
      ========================================================= */}
      <section className="ft-saas-section" aria-label="Why Choose Byte Operator">
        <div className="ft-saas-container">
          <div className="ft-saas-section__header">
            <span className="ft-saas-eyebrow">THE BYTE OPERATOR ADVANTAGE</span>
            <h2 className="ft-saas-heading">Why Choose Byte Operator for SaaS &amp; Web Applications?</h2>
            <p className="ft-saas-subheading">
              Choosing a development partner is about more than selecting a technology stack. You need a team that can understand the product, make sound engineering decisions, and connect the different parts into one working system.
            </p>
          </div>

          <div className="ft-saas-grid-3">
            {/* 1 */}
            <div className="ft-saas-card">
              <h3 className="ft-saas-card__title" style={{ marginBottom: '0.875rem' }}>
                Full-Stack Development
              </h3>
              <p className="ft-saas-card__desc">
                We handle frontend and backend development as connected parts of the same application, maintaining consistency between the user experience, business logic, APIs, and data layer.
              </p>
            </div>

            {/* 2 */}
            <div className="ft-saas-card">
              <h3 className="ft-saas-card__title" style={{ marginBottom: '0.875rem' }}>
                Tailored Architecture
              </h3>
              <p className="ft-saas-card__desc">
                We plan application architecture around your users, workflows, data, and technical needs rather than applying an identical template to every project.
              </p>
            </div>

            {/* 3 */}
            <div className="ft-saas-card">
              <h3 className="ft-saas-card__title" style={{ marginBottom: '0.875rem' }}>
                SaaS, Cloud &amp; Integration Capabilities
              </h3>
              <p className="ft-saas-card__desc">
                Our development services cover SaaS application engineering, cloud deployment, database design, REST/GraphQL APIs, and complex third-party integrations.
              </p>
            </div>

            {/* 4 */}
            <div className="ft-saas-card">
              <h3 className="ft-saas-card__title" style={{ marginBottom: '0.875rem' }}>
                AI-Ready Application Development
              </h3>
              <p className="ft-saas-card__desc">
                When AI functionality is relevant to your product, we integrate AI features, intelligent assistants, and data pipelines through established model providers and APIs.
              </p>
            </div>

            {/* 5 */}
            <div className="ft-saas-card">
              <h3 className="ft-saas-card__title" style={{ marginBottom: '0.875rem' }}>
                Development Beyond Launch
              </h3>
              <p className="ft-saas-card__desc">
                We continue working on your application after deployment through dedicated maintenance, feature enhancements, security patching, and technical improvements.
              </p>
            </div>

            {/* 6 */}
            <div className="ft-saas-card">
              <h3 className="ft-saas-card__title" style={{ marginBottom: '0.875rem' }}>
                Practical, Business-Focused Engineering
              </h3>
              <p className="ft-saas-card__desc">
                We focus on building software that serves a defined business purpose, supports real workflows, and can be maintained as requirements change.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          10. FEATURED WORK: COLLABIX SHOWCASE
      ========================================================= */}
      <section className="ft-saas-section" aria-label="Featured Work">
        <div className="ft-saas-container">
          <div className="ft-saas-collabix">
            <div className="ft-saas-collabix__grid">
              <div className="ft-saas-collabix__content">
                <span className="ft-saas-collabix__badge">FEATURED WORK: COLLABIX</span>
                <h2 className="ft-saas-collabix__title">
                  Engineering a Connected Operations &amp; Workload Management Platform
                </h2>
                <p className="ft-saas-collabix__desc">
                  Collabix is an operations and workload management platform engineered by Byte Operator. It brings project execution, team collaboration, workload planning, milestone tracking, and time management into a unified application environment.
                </p>
                <p className="ft-saas-collabix__desc">
                  The platform demonstrates how custom application engineering can bring multiple business workflows together through a connected interface and backend architecture.
                </p>

                <div className="ft-saas-collabix__features">
                  <div className="ft-saas-collabix__feature-item">
                    <span className="ft-saas-collabix__feature-dot" />
                    <span>Project and task management</span>
                  </div>
                  <div className="ft-saas-collabix__feature-item">
                    <span className="ft-saas-collabix__feature-dot" />
                    <span>Team collaboration &amp; milestones</span>
                  </div>
                  <div className="ft-saas-collabix__feature-item">
                    <span className="ft-saas-collabix__feature-dot" />
                    <span>Workload and capacity planning</span>
                  </div>
                  <div className="ft-saas-collabix__feature-item">
                    <span className="ft-saas-collabix__feature-dot" />
                    <span>Time tracking and reporting</span>
                  </div>
                  <div className="ft-saas-collabix__feature-item">
                    <span className="ft-saas-collabix__feature-dot" />
                    <span>Role-based access &amp; administration</span>
                  </div>
                  <div className="ft-saas-collabix__feature-item">
                    <span className="ft-saas-collabix__feature-dot" />
                    <span>Real-time application updates</span>
                  </div>
                </div>

                <div style={{ marginTop: '2rem' }}>
                  <Link
                    to="/work/collabix"
                    prefetch="intent"
                    className="ft-saas-hero__btn-primary"
                    style={{ textDecoration: 'none' }}
                  >
                    Explore the Collabix Case Study &rarr;
                  </Link>
                </div>
              </div>

              <div className="ft-saas-collabix__image-wrap">
                <img
                  src="https://cdn.shopify.com/s/files/1/0673/9610/8363/files/custom_software_case_study.png?v=1790400442&width=1200"
                  alt="Collabix project management and team collaboration SaaS platform interface"
                  className="ft-saas-collabix__img"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          11. FREQUENTLY ASKED QUESTIONS (Two-Column Sticky Accordion)
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
                  SaaS &amp; Web Application Development FAQs
                </h2>
                <p className="ft-home-faqs__subtitle">
                  Find clear answers to common questions about SaaS platforms, custom web application engineering, architecture, and technology.
                </p>
              </div>

              <div className="ft-home-faqs__callout">
                <h3 className="ft-home-faqs__callout-title">
                  Have questions about your software project?
                </h3>
                <p className="ft-home-faqs__callout-text">
                  Our engineering team can evaluate your product requirements, user workflows, integrations, and deployment options during a discovery call.
                </p>
                <CalendlyButton
                  label="Speak with our engineering team &rarr;"
                  className="ft-home-faqs__callout-btn"
                />
              </div>
            </div>

            {/* Right Column: 12 Interactive Accordion Items */}
            <div className="ft-home-faqs__right">
              {SAAS_FAQS.map((faq, index) => {
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
        eyebrow="SAAS & WEB APPLICATION ENGINEERING"
        title="Let's Build Your SaaS Platform or Web Application"
        description="Have a SaaS product idea, an existing application that needs improvement, or a business process that requires custom software? Byte Operator can help you plan, develop, integrate, and deploy a web application around your business requirements."
        tagline="Start your SaaS & web application project with senior software engineers."
        primaryButtonLabel="Discuss Your Project"
        secondaryButtonLabel="Contact Byte Operator →"
        secondaryButtonHref="/contact"
        pillars={[
          {
            title: 'Multi-Tenant Architecture',
            description:
              'Scalable multi-tenant databases, isolated tenant workspaces, and resilient role-based permissions.',
          },
          {
            title: 'Modern API Pipelines',
            description:
              'High-speed GraphQL and REST APIs with asynchronous background task processing and real-time syncing.',
          },
          {
            title: 'Cloud Infrastructure',
            description:
              'Containerized deployments, automated CI/CD pipelines, and global edge CDN caching for optimal uptime.',
          },
        ]}
      />
    </div>
  );
}
