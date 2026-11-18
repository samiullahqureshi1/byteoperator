'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Link } from '~/lib/router-compat';
import { CalendlyButton } from '~/components/shared/CalendlyButton';
import { ServiceFinalCta } from '~/components/shared/ServiceFinalCta';

/* =========================================================
   FAQ DATA (ALL 14 QUESTIONS FROM SPECIFICATION)
========================================================= */

const DERMATOLOGY_CLINICS_FAQS = [
  {
    number: '01',
    question: 'What technology solutions can be developed for dermatology clinics?',
    answer:
      'Technology projects for dermatology clinics may include custom healthcare applications, AI-powered internal assistants, administrative workflow automation, operational dashboards and integrations between compatible software systems.',
  },
  {
    number: '02',
    question: 'Does Byte Operator develop custom software for aesthetic clinics?',
    answer:
      'Byte Operator provides custom application development capabilities that can be applied to aesthetic clinic requirements, including internal operational applications, reporting tools, administrative workflows and integrations with existing business systems.',
  },
  {
    number: '03',
    question: 'Can you build custom applications for medical spas and laser clinics?',
    answer:
      'Custom applications can be considered for medical spas and laser clinics that need functionality beyond what their existing software provides, such as administrative coordination, operational dashboards, document organization and integration with compatible third-party applications.',
  },
  {
    number: '04',
    question: 'How can AI support dermatology clinic operations?',
    answer:
      'AI supports internal information retrieval, administrative assistance, document processing and knowledge management. For example, an internal assistant could help employees find information in approved organizational documentation. AI should not independently diagnose medical conditions or replace professional clinical judgment.',
  },
  {
    number: '05',
    question: 'Can administrative workflows in aesthetic clinics be automated?',
    answer:
      'Yes. Where workflows follow defined rules and relevant systems support automation, activities such as task creation, internal notifications, inquiry routing and workflow status updates can be automated while preserving human oversight.',
  },
  {
    number: '06',
    question: 'Can you integrate existing dermatology or clinic management software?',
    answer:
      'Integration is possible when software provides suitable APIs, webhooks or other supported interfaces. We assess technical capabilities, permissions, documentation and data requirements before development.',
  },
  {
    number: '07',
    question: 'Can you build custom dashboards for multi-location aesthetic clinics?',
    answer:
      'Custom dashboards can present selected information from compatible systems in a structured interface, supporting branch-level reporting, administrative activity monitoring and workflow visibility across locations.',
  },
  {
    number: '08',
    question: 'Can clinic software connect with imaging or laser devices?',
    answer:
      'Some devices and related applications support external connectivity, but this depends on manufacturer technical documentation, available interfaces, protocols and permissions. A technical assessment is necessary to confirm feasibility.',
  },
  {
    number: '09',
    question: 'Do clinics need to replace their existing management software?',
    answer:
      'Not necessarily. If an existing platform supports essential operations, it is often more practical to extend it through custom applications, integrations or automation rather than undergoing a disruptive system replacement.',
  },
  {
    number: '10',
    question: 'How do you approach patient data privacy and application security?',
    answer:
      'Security and privacy requirements are assessed based on information types, users, hosting environment, integrations and applicable jurisdictions (such as HIPAA or Saudi PDPL). Considerations include encryption, role-based access, and activity logging.',
  },
  {
    number: '11',
    question: 'Can custom applications support multiple clinic branches?',
    answer:
      'Yes. Multi-location functionality can provide branch-level views, centralized reporting, role-based access and coordinated administrative workflows across an entire clinic group.',
  },
  {
    number: '12',
    question: 'How long does custom clinic software development take?',
    answer:
      'Timelines depend on project complexity, feature scope, integrations and external system dependencies. A focused workflow tool can launch in weeks, while extensive multi-system platforms are deployed in phased releases.',
  },
  {
    number: '13',
    question: 'How much does dermatology or aesthetic clinic software development cost?',
    answer:
      'Costs depend on the scope of the project, application complexity, integrations, user requirements, hosting and ongoing maintenance needs. Scoping begins with identifying the operational problem and required functionality.',
  },
  {
    number: '14',
    question: 'How can a clinic start a technology development project with Byte Operator?',
    answer:
      'Start by discussing your current technology environment, operational challenges and desired improvements during an introductory consultation to determine the appropriate technical direction.',
  },
] as const;

/* =========================================================
   CLINIC TYPES DATA
========================================================= */

const CLINIC_TYPES = [
  {
    title: 'Medical Dermatology Clinics',
    badge: 'Clinical Administration',
    desc: 'Custom applications supporting consultation administration, medical document organization, patient communication and internal clinic coordination.',
    points: [
      'Consultation-related administrative workflows',
      'Secure medical document & photo organization',
      'Role-based staff coordination tools',
      'Compatibility with clinic management systems',
    ],
  },
  {
    title: 'Cosmetic Dermatology Practices',
    badge: 'Patient Experience',
    desc: 'Connecting aesthetic consultation inquiries, treatment-related documentation, administrative communication and structured post-procedure follow-ups.',
    points: [
      'Multi-channel inquiry routing & triage',
      'Consultation intake & digital consent flows',
      'Automated aesthetic follow-up sequences',
      'Connected patient communication portals',
    ],
  },
  {
    title: 'Aesthetic & Medical Spa Clinics',
    badge: 'High-Touch Service',
    desc: 'Coordinating multi-service bookings, practitioner schedules, customer inquiries, and administrative task tracking across diverse aesthetic offerings.',
    points: [
      'Centralized appointment request coordination',
      'Internal staff task management dashboards',
      'Integration with point-of-sale & billing tools',
      'Automated client treatment check-in workflows',
    ],
  },
  {
    title: 'Laser & Skin Treatment Clinics',
    badge: 'Device Connectivity',
    desc: 'Structured administrative workflows, secure image documentation, and operational coordination tailored to laser equipment and protocol tracking.',
    points: [
      'Treatment patch-test record tracking',
      'Secure clinical photo categorization',
      'Operational device utilization logging',
      'Structured post-laser follow-up reminders',
    ],
  },
  {
    title: 'Multi-Location Dermatology Groups',
    badge: 'Centralized Oversight',
    desc: 'Centralized operational dashboards providing management with location-filtered reporting, task visibility, and consistent administrative procedures.',
    points: [
      'Branch-level performance reporting',
      'Standardized administrative workflows',
      'Centralized operational dashboards',
      'Location-aware employee access permissions',
    ],
  },
  {
    title: 'Growing Clinic Networks',
    badge: 'Scalable Infrastructure',
    desc: 'Scalable cloud architectures and integration layers designed to support rapid clinic acquisitions, new service launches, and cross-brand governance.',
    points: [
      'Scalable cloud application foundations',
      'Enterprise-wide data aggregation',
      'Custom middleware for legacy PMS platforms',
      'Standardized onboarding for new clinic sites',
    ],
  },
] as const;

/* =========================================================
   3. CORE CAPABILITIES (4 CARDS 3D COVERFLOW CAROUSEL)
========================================================= */

const DERMATOLOGY_CAPABILITIES = [
  {
    badge: 'Custom Applications',
    title: '1. Custom Healthcare Application Development',
    desc: 'Building bespoke web applications and operational dashboards designed around your specific consultation, intake, and multi-branch management workflows.',
    items: [
      'Operational dashboards for managers and authorized staff',
      'Custom inquiry and consultation coordination interfaces',
      'Role-based access permissions and branch-filtered views',
      'Scalable cloud architecture ready for group expansion',
    ],
  },
  {
    badge: 'AI Solutions',
    title: '2. AI-Powered Solutions for Clinics',
    desc: 'Implementing intelligent assistants that retrieve operational procedures, classify incoming requests, and structure administrative information.',
    items: [
      'Internal AI assistants querying approved clinic SOP manuals',
      'Administrative document parsing and intake data extraction',
      'Categorization of routine patient administrative inquiries',
      'Strict boundaries ensuring no autonomous medical diagnosis',
    ],
  },
  {
    badge: 'Workflow Automation',
    title: '3. Workflow Automation for Clinics',
    desc: 'Connecting multi-step administrative tasks so events trigger assignments, notifications, and record updates without unnecessary manual coordination.',
    items: [
      'Automated task creation upon new consultation inquiries',
      'Internal notifications when administrative review is needed',
      'Post-treatment administrative check-in workflows',
      'Cross-application task escalation and exception tracking',
    ],
  },
  {
    badge: 'Integration',
    title: '4. Clinic Software & API Integration',
    desc: 'Connecting practice management systems, booking portals, messaging channels, and accounting tools via custom APIs and middleware.',
    items: [
      'Custom REST/GraphQL APIs and third-party connectors',
      'Webhook event streaming for appointment status updates',
      'Custom middleware for data normalization and transformation',
      'Robust error handling, retry queues, and audit logging',
    ],
  },
] as const;

function DermatologyClinicCapabilitiesSlider() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % DERMATOLOGY_CAPABILITIES.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + DERMATOLOGY_CAPABILITIES.length) % DERMATOLOGY_CAPABILITIES.length);
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
    const diff = (idx - activeSlide + DERMATOLOGY_CAPABILITIES.length) % DERMATOLOGY_CAPABILITIES.length;
    if (diff === 0) return 'ft-derma-clinic-slider-card ft-derma-clinic-slider-card--active';
    if (diff === 1) return 'ft-derma-clinic-slider-card ft-derma-clinic-slider-card--next';
    if (diff === DERMATOLOGY_CAPABILITIES.length - 1) return 'ft-derma-clinic-slider-card ft-derma-clinic-slider-card--prev';
    return 'ft-derma-clinic-slider-card ft-derma-clinic-slider-card--hidden';
  };

  return (
    <section className="ft-derma-clinic-section ft-derma-clinic-section--darker" aria-label="Core Capabilities">
      <div className="ft-derma-clinic-container">
        <div className="ft-derma-clinic-section__header">
          <span className="ft-derma-clinic-eyebrow">CORE CAPABILITIES</span>
          <h2 className="ft-derma-clinic-heading">
            Technology Solutions for Dermatology &amp; Aesthetic Clinics
          </h2>
          <p className="ft-derma-clinic-subheading">
            Byte Operator approaches clinic technology through four core capabilities that can be delivered individually or combined into a comprehensive operational architecture.
          </p>
        </div>

        {/* 3D Coverflow Carousel */}
        <div
          className="ft-derma-clinic-slider-wrapper"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button
            type="button"
            className="ft-derma-clinic-slider-nav-btn ft-derma-clinic-slider-nav-btn--prev"
            onClick={prevSlide}
            aria-label="Previous capability"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <button
            type="button"
            className="ft-derma-clinic-slider-nav-btn ft-derma-clinic-slider-nav-btn--next"
            onClick={nextSlide}
            aria-label="Next capability"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          <div className="ft-derma-clinic-slider-stage">
            {DERMATOLOGY_CAPABILITIES.map((cap, idx) => {
              const isActive = idx === activeSlide;
              return (
                <div
                  key={cap.title}
                  className={getCardClass(idx)}
                  onClick={() => {
                    if (!isActive) setActiveSlide(idx);
                  }}
                >
                  <span className="ft-derma-clinic-card__badge">{cap.badge}</span>
                  <h3 className="ft-derma-clinic-card__title">{cap.title}</h3>
                  <p className="ft-derma-clinic-card__desc">{cap.desc}</p>
                  <ul className="ft-derma-clinic-card__list">
                    {cap.items.map((item, itemIdx) => (
                      <li className="ft-derma-clinic-card__list-item" key={itemIdx}>
                        <span className="ft-derma-clinic-card__list-bullet">&bull;</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <div className="ft-derma-clinic-slider-dots">
            {DERMATOLOGY_CAPABILITIES.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`ft-derma-clinic-slider-dot ${i === activeSlide ? 'ft-derma-clinic-slider-dot--active' : ''}`}
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
   4. WHERE CUSTOM TECHNOLOGY IMPROVES OPERATIONS (8 CARDS SCROLL-DRIVEN DECK)
========================================================= */

const CLINIC_OPERATIONS_DOMAINS = [
  {
    title: 'Inquiry & Consultation Coordination',
    subtitle: 'Multi-Channel Intake & Automated Queue Assignment',
    badge: 'Domain 01',
    route: '/contact',
    desc: 'Consolidate incoming requests across web forms, messaging platforms, and phone calls into a structured queue with automated assignment and status tracking.',
  },
  {
    title: 'Appointment Coordination & Reminders',
    subtitle: 'Automated Confirmations & Schedule Syncing',
    badge: 'Domain 02',
    route: '/contact',
    desc: 'Connect appointment request workflows with existing scheduling platforms, triggering automated intake confirmations and internal staff notifications.',
  },
  {
    title: 'Treatment Follow-Up Management',
    subtitle: 'Post-Care Cadences & Photo Documentation Tracking',
    badge: 'Domain 03',
    route: '/contact',
    desc: 'Track administrative follow-up tasks, photo documentation requirements, and client check-in cadences in a central interface following aesthetic procedures.',
  },
  {
    title: 'Patient Information & Documents',
    subtitle: 'Secure Consent Forms & Role-Based Access',
    badge: 'Domain 04',
    route: '/contact',
    desc: 'Organize treatment consent forms, medical history submissions, and administrative records with strict role-based access permissions.',
  },
  {
    title: 'Clinical Photography Workflows',
    subtitle: 'Before-and-After Privacy & Record Association',
    badge: 'Domain 05',
    route: '/contact',
    desc: 'Manage, categorize, and associate clinical before-and-after photographs with internal patient records securely, respecting consent and privacy rules.',
  },
  {
    title: 'Laser & Aesthetic Device Integration',
    subtitle: 'Treatment Parameter Logging & Diagnostic Maintenance',
    badge: 'Domain 06',
    route: '/contact',
    desc: 'Explore connectivity with supported laser and diagnostic systems to log treatment parameters and operational maintenance records where APIs permit.',
  },
  {
    title: 'Clinic Reporting & Dashboards',
    subtitle: 'Chair Utilization & Cross-Location Business Analytics',
    badge: 'Domain 07',
    route: '/contact',
    desc: 'Consolidate fragmented business metrics into unified executive dashboards, tracking location-level chair utilization, task completion, and inquiry trends.',
  },
  {
    title: 'Internal Staff Coordination & Tasks',
    subtitle: 'Practitioner-Front Desk Escalation Procedures',
    badge: 'Domain 08',
    route: '/contact',
    desc: 'Streamline internal task assignment, escalation procedures, and cross-team communication between aesthetic practitioners and administrative reception.',
  },
] as const;

const CLINIC_OPERATIONS_ROTATES = ['-1.6deg', '1.4deg', '-0.9deg', '1.8deg', '-1.3deg', '1.5deg', '-1.1deg', '1.2deg'];

function DermatologyClinicOperationsDeckSlider() {
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
    const targetScroll = sectionTop + (index / (CLINIC_OPERATIONS_DOMAINS.length - 1)) * scrollDistance;
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
      const activePosition = progress * (CLINIC_OPERATIONS_DOMAINS.length - 1);
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
          const past = clamp(-distance, 0, 3);
          const pastOffset = isSmallScreen ? 16 : 22;
          y = -past * pastOffset;
          z = -past * 40;
          rotateZ = direction * past * 1.8;
          scale = 1 - past * 0.035;
          opacity = past > 2.5 ? 0 : clamp(1 - past * 0.25, 0.45, 1);
          layer = 20 - Math.round(past);
        }

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

      setCurrentActiveIndex(clamp(Math.round(activePosition), 0, CLINIC_OPERATIONS_DOMAINS.length - 1));
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
    <section ref={sectionRef} className="ft-derma-clinic-experience-section" aria-label="Operational Impact">
      <div className="ft-derma-clinic-experience-inner">
        {/* Centered Heading Section */}
        <div className="ft-derma-clinic-experience-heading">
          <span className="ft-derma-clinic-experience-eyebrow">PRACTICAL IMPACT</span>
          <h2 className="ft-derma-clinic-heading">
            Where Custom Technology Improves Clinic Operations
          </h2>
          <p className="ft-derma-clinic-subheading">
            Targeted digital applications and connected workflows deliver structured, measurable improvements across key operational domains.
          </p>
        </div>

        {/* Stacked Cards List on Scroll */}
        <div className="ft-derma-clinic-experience-list">
          {CLINIC_OPERATIONS_DOMAINS.map((domain, index) => (
            <article
              key={domain.title}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="ft-derma-clinic-experience-item"
              style={{
                ['--experience-card-base-rotate' as any]: CLINIC_OPERATIONS_ROTATES[index] || '0deg',
              }}
            >
              {/* Circular arrow button on left */}
              <div
                className="ft-derma-clinic-experience-arrow"
                onClick={() => scrollToCard((index + 1) % CLINIC_OPERATIONS_DOMAINS.length)}
                role="button"
                tabIndex={0}
                aria-label="Advance to next domain"
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
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </div>

              {/* Main content in middle */}
              <div className="ft-derma-clinic-experience-copy">
                <div className="ft-derma-clinic-experience-copy__header">
                  <h3 className="ft-derma-clinic-experience-copy__title">{domain.title}</h3>
                  <span className="ft-derma-clinic-experience-copy__subtitle">{domain.subtitle}</span>
                </div>
                <p className="ft-derma-clinic-experience-copy__summary">{domain.desc}</p>
              </div>

              {/* Side meta badge on right */}
              <div className="ft-derma-clinic-experience-side">
                <span className="ft-derma-clinic-experience-date">{domain.badge}</span>
                <Link
                  to={domain.route}
                  className="ft-derma-clinic-experience-link"
                >
                  <span>Discuss Need</span>
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
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom Pagination & Progress Controls */}
        <div className="ft-derma-clinic-experience-progress">
          <span className="ft-derma-clinic-experience-counter">
            {String(currentActiveIndex + 1).padStart(2, '0')} / {String(CLINIC_OPERATIONS_DOMAINS.length).padStart(2, '0')}
          </span>
          <div className="ft-derma-clinic-experience-dots">
            {CLINIC_OPERATIONS_DOMAINS.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                className={`ft-derma-clinic-experience-dot ${
                  dotIdx === currentActiveIndex ? 'ft-derma-clinic-experience-dot--active' : ''
                }`}
                onClick={() => scrollToCard(dotIdx)}
                aria-label={`Scroll to domain ${dotIdx + 1}`}
              />
            ))}
          </div>
          <span className="ft-derma-clinic-experience-hint">Scroll down to explore</span>
        </div>
      </div>
    </section>
  );
}

export function DermatologyClinicsPageClient() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((current) => (current === index ? null : index));
  };

  return (
    <div className="ft-derma-clinic-page">
      {/* =========================================================
          1. HERO SECTION (With Exact Top Padding & Standard Button)
      ========================================================= */}
      <section className="ft-derma-clinic-hero">
        <div className="ft-derma-clinic-container">
          <div className="ft-derma-clinic-hero__header">
            <p className="ft-derma-clinic-hero__eyebrow">
              DERMATOLOGY &amp; AESTHETIC CLINIC TECHNOLOGY SOLUTIONS
            </p>
            <h1 className="ft-derma-clinic-hero__title">
              <span className="ft-derma-clinic-hero__title-line">
                Technology Solutions for
              </span>
              <span className="ft-derma-clinic-hero__title-line">
                Dermatology &amp; Aesthetic Clinics
              </span>
            </h1>

            <div className="ft-derma-clinic-hero__text-group">
              <p className="ft-derma-clinic-hero__lead">
                Dermatology and aesthetic clinics rely on a growing range of digital systems to coordinate patient inquiries, consultations, appointments, administrative activities, treatment-related information and daily operations. As clinics expand their services, keeping these systems connected and efficient becomes increasingly important. Byte Operator provides dermatology and aesthetic clinic technology solutions through custom healthcare application development, AI-powered applications, workflow automation and API integrations. We work with healthcare organizations to understand operational requirements and develop technology around existing systems, processes and business objectives. Whether you need a custom application, more efficient administrative workflows, an AI-powered assistant or better connectivity between existing software, we build technology around your clinic.
              </p>
            </div>

            <div className="ft-derma-clinic-hero__cta-group">
              <CalendlyButton
                label="Discuss Your Project"
                className="ft-derma-clinic-btn-primary"
              />
              <Link
                to="/contact"
                prefetch="intent"
                className="ft-derma-clinic-btn-secondary"
              >
                Contact Byte Operator &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          2. CORE CHALLENGES (6 Cards - Trailing Centered)
      ========================================================= */}
      <section className="ft-derma-clinic-section" aria-label="Clinic Challenges">
        <div className="ft-derma-clinic-container">
          <div className="ft-derma-clinic-section__header">
            <span className="ft-derma-clinic-eyebrow">CLINICAL &amp; ADMINISTRATIVE BOTTLENECKS</span>
            <h2 className="ft-derma-clinic-heading">
              Technology Challenges Facing Modern Dermatology &amp; Aesthetic Clinics
            </h2>
            <p className="ft-derma-clinic-subheading">
              Medical dermatology, cosmetic procedures, laser services and aesthetic treatments involve distinct consultation processes, documentation requirements and communication workflows.
            </p>
          </div>

          <div className="ft-derma-clinic-grid-3">
            <div className="ft-derma-clinic-card">
              <span className="ft-derma-clinic-card__badge">Disconnected Systems</span>
              <h3 className="ft-derma-clinic-card__title">
                Disconnected Clinic Management Applications
              </h3>
              <p className="ft-derma-clinic-card__desc">
                Separate applications for scheduling, patient messaging, medical records, accounting, and marketing force staff to re-enter the same information across multiple platforms, increasing administrative fatigue.
              </p>
            </div>

            <div className="ft-derma-clinic-card">
              <span className="ft-derma-clinic-card__badge">Inquiry Tracking</span>
              <h3 className="ft-derma-clinic-card__title">
                Managing Patient Inquiries &amp; Consultations
              </h3>
              <p className="ft-derma-clinic-card__desc">
                Clinics receive inquiries across websites, telephone calls, social messaging, and email. Without a structured workflow, requests risk delays or inconsistent administrative follow-up.
              </p>
            </div>

            <div className="ft-derma-clinic-card">
              <span className="ft-derma-clinic-card__badge">Repetitive Tasks</span>
              <h3 className="ft-derma-clinic-card__title">
                Repetitive Front-Desk &amp; Admin Processes
              </h3>
              <p className="ft-derma-clinic-card__desc">
                Routine data entry, intake verifications, internal notifications, and follow-up reminders consume valuable staff time when executed manually rather than through automated workflows.
              </p>
            </div>

            <div className="ft-derma-clinic-card">
              <span className="ft-derma-clinic-card__badge">Care Coordination</span>
              <h3 className="ft-derma-clinic-card__title">
                Treatment Information &amp; Post-Care Follow-Up
              </h3>
              <p className="ft-derma-clinic-card__desc">
                Coordinating administrative documents and structured follow-up check-ins after procedures becomes difficult when notes, photos, and task assignments are spread across isolated tools.
              </p>
            </div>

            <div className="ft-derma-clinic-card">
              <span className="ft-derma-clinic-card__badge">Multi-Location Oversight</span>
              <h3 className="ft-derma-clinic-card__title">
                Managing Multiple Clinic Locations
              </h3>
              <p className="ft-derma-clinic-card__desc">
                Clinic groups operating across several branches struggle to maintain consistent procedures, centralized reporting, and real-time operational visibility without unified dashboards.
              </p>
            </div>

            <div className="ft-derma-clinic-card">
              <span className="ft-derma-clinic-card__badge">Device Barriers</span>
              <h3 className="ft-derma-clinic-card__title">
                Specialized Device &amp; Imaging Connectivity
              </h3>
              <p className="ft-derma-clinic-card__desc">
                Connecting clinical photography systems and laser platforms with business software requires evaluating specialized vendor interfaces, protocols, and data formats.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          3. FOUR CORE CAPABILITIES (4 Pillars Carousel)
      ========================================================= */}
      <DermatologyClinicCapabilitiesSlider />

      {/* =========================================================
          4. WHERE CUSTOM TECHNOLOGY IMPROVES OPERATIONS (8 Cards Scroll Deck)
      ========================================================= */}
      <DermatologyClinicOperationsDeckSlider />

      {/* =========================================================
          5. CLINIC TYPES (6 Cards)
      ========================================================= */}
      <section className="ft-derma-clinic-section ft-derma-clinic-section--darker" aria-label="Clinic Types">
        <div className="ft-derma-clinic-container">
          <div className="ft-derma-clinic-section__header">
            <span className="ft-derma-clinic-eyebrow">CLINICAL ENVIRONMENTS</span>
            <h2 className="ft-derma-clinic-heading">
              Solutions for Different Types of Clinics
            </h2>
            <p className="ft-derma-clinic-subheading">
              Although dermatology and aesthetic organizations share some administrative needs, workflows differ significantly between medical dermatology and cosmetic medspas.
            </p>
          </div>

          <div className="ft-derma-clinic-grid-3">
            {CLINIC_TYPES.map((type) => (
              <div key={type.title} className="ft-derma-clinic-card">
                <span className="ft-derma-clinic-card__badge">{type.badge}</span>
                <h3 className="ft-derma-clinic-card__title">{type.title}</h3>
                <p className="ft-derma-clinic-card__desc">{type.desc}</p>
                <ul className="ft-derma-clinic-card__list">
                  {type.points.map((pt) => (
                    <li key={pt} className="ft-derma-clinic-card__list-item">
                      <span className="ft-derma-clinic-card__list-bullet">&bull;</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* COMPLIANCE & SECURITY NOTICE BOX */}
          <div className="ft-derma-clinic-notice-box">
            <h4 className="ft-derma-clinic-notice-title">
              <span>&#9888;</span> Security, Patient Privacy, and Responsible AI Notice
            </h4>
            <p className="ft-derma-clinic-notice-desc">
              Dermatology and aesthetic applications process sensitive personal records, clinical documentation, and clinical imagery. Applicable privacy regulations (including HIPAA in the US and Saudi Arabia&apos;s PDPL where applicable) must be confirmed and established for each project. Byte Operator implements AI exclusively for administrative assistance and knowledge retrieval; clinical diagnosis, laser parameter selection, and treatment recommendations remain exclusively under the oversight of licensed medical professionals.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          6. FREQUENTLY ASKED QUESTIONS (Two-Column Sticky Accordion)
      ========================================================= */}
      <section className="ft-home-faqs" aria-label="Frequently Asked Questions">
        <div className="ft-home-faqs__container">
          <div className="ft-home-faqs__grid">
            <div className="ft-home-faqs__left">
              <div className="ft-home-faqs__header">
                <p className="ft-home-faqs__eyebrow">FREQUENTLY ASKED QUESTIONS</p>
                <h2 className="ft-home-faqs__heading">
                  Dermatology &amp; Aesthetic Clinic Technology FAQs
                </h2>
                <p className="ft-home-faqs__subtitle">
                  Find clear answers to common questions about custom clinic software, multi-location dashboards, workflow automation, and practice management integrations.
                </p>
              </div>

              <div className="ft-home-faqs__callout">
                <h3 className="ft-home-faqs__callout-title">
                  Planning a clinic technology project?
                </h3>
                <p className="ft-home-faqs__callout-text">
                  Our healthcare software engineers and integration architects can evaluate your existing systems and outline practical technical improvements.
                </p>
                <CalendlyButton
                  label="Speak with our engineering team &rarr;"
                  className="ft-home-faqs__callout-btn"
                />
              </div>
            </div>

            <div className="ft-home-faqs__right">
              {DERMATOLOGY_CLINICS_FAQS.map((faq, index) => {
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
                        <span className="ft-home-faqs__number">{faq.number}</span>
                        <span
                          className="ft-home-faqs__question"
                          style={{ color: isOpen ? '#ffffff' : '#f1f5f9' }}
                        >
                          {faq.question}
                        </span>
                      </div>
                      <span
                        className="ft-home-faqs__icon"
                        style={{ color: isOpen ? '#38bdf8' : '#94a3b8' }}
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
          7. FINAL CONVERSION CTA
      ========================================================= */}
      <ServiceFinalCta
        eyebrow="DERMATOLOGY & AESTHETIC CLINIC SOLUTIONS"
        title="Build Smarter Technology for Your Dermatology or Aesthetic Clinic"
        description="Your clinic's technology should support the way your organization operates. Disconnected applications, repetitive administration, and limited operational visibility can create challenges as your services and branches grow. Byte Operator helps healthcare organizations develop practical technology solutions."
        tagline="Let's discuss how the right technology can support your dermatology or aesthetic clinic."
        primaryButtonLabel="Discuss Your Project"
        secondaryButtonLabel="Contact Byte Operator →"
        secondaryButtonHref="/contact"
        pillars={[
          {
            title: 'Consultation & Inquiry AI',
            description:
              '24/7 intelligent patient answering, treatment inquiry triage, and deposit-backed aesthetic booking workflows.',
          },
          {
            title: 'EMR & Multi-Location Sync',
            description:
              'Seamless integration with ModMed, Nextech, Symplast, and Zenoti across multiple clinic branches.',
          },
          {
            title: 'HIPAA & Photo Security',
            description:
              'Secure clinical before-and-after photo pipelines, encrypted chart storage, and role-based staff permissions.',
          },
        ]}
      />
    </div>
  );
}
