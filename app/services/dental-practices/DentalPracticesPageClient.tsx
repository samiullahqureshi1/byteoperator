'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Link } from '~/lib/router-compat';
import { CalendlyButton } from '~/components/shared/CalendlyButton';
import { ServiceFinalCta } from '~/components/shared/ServiceFinalCta';

/* =========================================================
   FAQ DATA (11 TARGETED DENTAL FAQS)
========================================================= */

const DENTAL_PRACTICES_FAQS = [
  {
    number: '01',
    question: 'What are dental practice technology solutions?',
    answer:
      'Dental practice technology solutions encompass custom software applications, AI-powered administrative tools, workflow automation, and practice management software (PMS) integrations designed to connect clinical and operational processes across dental offices.',
  },
  {
    number: '02',
    question: 'When should a dental practice consider custom software instead of off-the-shelf platforms?',
    answer:
      'Custom development is appropriate when commercial PMS platforms cannot accommodate multi-location reporting, custom lab tracking, unique patient intake workflows, or cross-system data synchronization without manual workarounds.',
  },
  {
    number: '03',
    question: 'How can AI applications support dental practice operations?',
    answer:
      'AI tools assist with operational tasks such as searching internal SOPs, classifying incoming administrative communications, parsing non-clinical records, and guiding staff through routine procedures under mandatory human supervision.',
  },
  {
    number: '04',
    question: 'What administrative dental workflows can be automated?',
    answer:
      'Practices can automate digital intake form routing, appointment confirmation reminders, internal task assignments, lab order status notifications, and routine billing status updates between connected applications.',
  },
  {
    number: '05',
    question: 'How do multi-location dental groups and DSOs benefit from custom software?',
    answer:
      'DSOs and group practices gain centralized operational dashboards, standardized administrative procedures, location-filtered performance reporting, and consolidated provider management across multiple offices.',
  },
  {
    number: '06',
    question: 'Can existing dental practice management software (PMS) be integrated?',
    answer:
      'Yes, when vendors provide supported REST APIs, webhooks, or database interfaces. Byte Operator evaluates interface availability, rate limits, and data formats to build reliable synchronization pipelines.',
  },
  {
    number: '07',
    question: 'Can custom technology connect dental practices with external dental laboratories?',
    answer:
      'Where compatible APIs or secure file transfer protocols exist, custom software can provide centralized digital portals to submit lab prescriptions, track case progress, and receive status updates automatically.',
  },
  {
    number: '08',
    question: 'How does custom software support patient intake and follow-up communication?',
    answer:
      'Custom web portals capture structured intake data, validate required fields, and route information into authorized clinic systems while triggering automated post-treatment follow-up check-ins according to practice protocols.',
  },
  {
    number: '09',
    question: 'Can technology solutions adapt to dental specialties like orthodontics or oral surgery?',
    answer:
      'Yes. Orthodontic, periodontic, endodontic, pediatric, and oral surgery practices often have distinct diagnostic, imaging, and treatment staging workflows that custom software and integrations can support.',
  },
  {
    number: '10',
    question: 'How should dental practices approach healthcare data privacy and HIPAA?',
    answer:
      'Practices must establish encrypted data storage (AES-256), secure transmission (TLS 1.3), role-based permissions, and signed Business Associate Agreements (BAAs) with all technology vendors handling protected health information.',
  },
  {
    number: '11',
    question: 'How can a dental practice or DSO start a project with Byte Operator?',
    answer:
      'Begin by scheduling a technical discovery consultation with our software engineering team to review your operational bottlenecks, software ecosystem, and desired integration goals.',
  },
] as const;

/* =========================================================
   DENTAL BUSINESS MODELS DATA
========================================================= */

const DENTAL_BUSINESS_MODELS = [
  {
    title: 'Independent Dental Practices',
    badge: 'Focused Efficiency',
    desc: 'Targeted operational tools and workflow automation designed to streamline administration for solo and partnership dental offices without replacing core systems.',
    points: [
      'Automated patient intake & check-in routing',
      'Integration between PMS and communication tools',
      'AI-assisted operational policy search',
      'Cost-effective administrative dashboards',
    ],
  },
  {
    title: 'Multi-Location Dental Groups',
    badge: 'Centralized Oversight',
    desc: 'Unified operational platforms bridging multiple clinic branches, standardizing administrative procedures, and providing consolidated performance visibility.',
    points: [
      'Multi-site operational performance dashboards',
      'Standardized administrative operating procedures',
      'Location-aware employee access controls',
      'Centralized patient scheduling coordination',
    ],
  },
  {
    title: 'Dental Service Organizations (DSOs)',
    badge: 'Enterprise Scalability',
    desc: 'Robust software architectures, custom middleware, and enterprise reporting pipelines engineered to scale across dozens or hundreds of affiliated practices.',
    points: [
      'Enterprise-wide data aggregation & reporting',
      'Custom middleware connecting diverse PMS platforms',
      'Automated administrative workflow orchestration',
      'Role-based governance and audit logging',
    ],
  },
  {
    title: 'Specialty Dental Organizations',
    badge: 'Specialized Care',
    desc: 'Purpose-built software layers tailored to the unique clinical and administrative sequences of orthodontics, periodontics, pediatric dentistry, and oral surgery.',
    points: [
      'Multi-stage treatment plan tracking',
      'Specialized referral coordination workflows',
      'Connected digital imaging & lab requests',
      'Tailored consultation follow-up pipelines',
    ],
  },
] as const;

/* =========================================================
   3. CORE CAPABILITIES (4 CARDS 3D COVERFLOW CAROUSEL)
========================================================= */

const DENTAL_CAPABILITIES = [
  {
    badge: 'Custom Applications',
    title: '1. Custom Healthcare Application Development',
    desc: 'Engineered web applications and operational dashboards designed specifically around your practice workflows rather than generic software templates.',
    items: [
      'Centralized multi-location operational dashboards',
      'Custom workflow management interfaces for staff',
      'Role-based user permissions and location access controls',
      'Scalable, cloud-native architecture ready for group expansion',
    ],
  },
  {
    badge: 'Intelligent AI',
    title: '2. AI-Powered Solutions for Dental Practices',
    desc: 'Utilizing artificial intelligence for operational document processing, internal SOP knowledge retrieval, and administrative request classification.',
    items: [
      'Internal policy and clinical protocol search assistants',
      'Administrative document parsing and structured extraction',
      'Automated categorization of routine administrative inquiries',
      'Mandatory clinician oversight with no autonomous clinical advice',
    ],
  },
  {
    badge: 'Automation',
    title: '3. Dental Practice Workflow Automation',
    desc: 'Connecting multi-step administrative tasks so that events in one system trigger notifications, assignments, and record updates automatically.',
    items: [
      'Automated information routing between connected applications',
      'Internal staff notifications triggered by administrative events',
      'Automated lab case tracking and status change alerts',
      'Structured follow-up task assignment for front-desk personnel',
    ],
  },
  {
    badge: 'Integration',
    title: '4. Dental Software API & Integrations',
    desc: 'Connecting practice management systems, imaging archives, communication tools, and accounting software through secure APIs and middleware.',
    items: [
      'Custom API engineering and third-party connector development',
      'Webhook event pipelines for real-time schedule updates',
      'Custom middleware for data transformation between formats',
      'Production-grade error handling, retry queues, and audit trails',
    ],
  },
] as const;

function DentalPracticeCapabilitiesSlider() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % DENTAL_CAPABILITIES.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + DENTAL_CAPABILITIES.length) % DENTAL_CAPABILITIES.length);
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
    const diff = (idx - activeSlide + DENTAL_CAPABILITIES.length) % DENTAL_CAPABILITIES.length;
    if (diff === 0) return 'ft-dental-practice-slider-card ft-dental-practice-slider-card--active';
    if (diff === 1) return 'ft-dental-practice-slider-card ft-dental-practice-slider-card--next';
    if (diff === DENTAL_CAPABILITIES.length - 1) return 'ft-dental-practice-slider-card ft-dental-practice-slider-card--prev';
    return 'ft-dental-practice-slider-card ft-dental-practice-slider-card--hidden';
  };

  return (
    <section className="ft-dental-practice-section ft-dental-practice-section--darker" aria-label="Core Capabilities">
      <div className="ft-dental-practice-container">
        <div className="ft-dental-practice-section__header">
          <span className="ft-dental-practice-eyebrow">CORE CAPABILITIES</span>
          <h2 className="ft-dental-practice-heading">
            Custom Technology Solutions for Dental Practices
          </h2>
          <p className="ft-dental-practice-subheading">
            Byte Operator engineers solutions planned around your practice workflows, existing software platforms, and business objectives across four core disciplines.
          </p>
        </div>

        {/* 3D Coverflow Carousel */}
        <div
          className="ft-dental-practice-slider-wrapper"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button
            type="button"
            className="ft-dental-practice-slider-nav-btn ft-dental-practice-slider-nav-btn--prev"
            onClick={prevSlide}
            aria-label="Previous capability"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <button
            type="button"
            className="ft-dental-practice-slider-nav-btn ft-dental-practice-slider-nav-btn--next"
            onClick={nextSlide}
            aria-label="Next capability"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          <div className="ft-dental-practice-slider-stage">
            {DENTAL_CAPABILITIES.map((cap, idx) => {
              const isActive = idx === activeSlide;
              return (
                <div
                  key={cap.title}
                  className={getCardClass(idx)}
                  onClick={() => {
                    if (!isActive) setActiveSlide(idx);
                  }}
                >
                  <span className="ft-dental-practice-card__badge">{cap.badge}</span>
                  <h3 className="ft-dental-practice-card__title">{cap.title}</h3>
                  <p className="ft-dental-practice-card__desc">{cap.desc}</p>
                  <ul className="ft-dental-practice-card__list">
                    {cap.items.map((item, itemIdx) => (
                      <li className="ft-dental-practice-card__list-item" key={itemIdx}>
                        <span className="ft-dental-practice-card__list-bullet">&bull;</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <div className="ft-dental-practice-slider-dots">
            {DENTAL_CAPABILITIES.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`ft-dental-practice-slider-dot ${i === activeSlide ? 'ft-dental-practice-slider-dot--active' : ''}`}
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
   4. OPERATIONAL IMPACT (5 CARDS SCROLL-DRIVEN DECK)
========================================================= */

const OPERATIONAL_TOUCHPOINTS = [
  {
    title: 'Patient Intake & Information Workflows',
    subtitle: 'Automated Validation & Direct PMS Record Transfer',
    badge: 'Touchpoint 01',
    route: '/contact',
    desc: 'Streamline digital intake through responsive web forms, automatic data validation, and direct record transfer into compatible practice management software, eliminating paper clipboards and manual data entry.',
  },
  {
    title: 'Appointment & Communication Workflows',
    subtitle: 'Pre-Visit Reminders & Task Status Triggers',
    badge: 'Touchpoint 02',
    route: '/contact',
    desc: 'Coordinate automated pre-visit confirmations, intake requirement reminders, and internal staff task assignments based on appointment status changes across connected systems.',
  },
  {
    title: 'Treatment Follow-Up Coordination',
    subtitle: 'Post-Operative Sequences & Hygiene Recall Dashboards',
    badge: 'Touchpoint 03',
    route: '/contact',
    desc: 'Organize structured administrative follow-up sequences, tracking post-operative check-in status, outstanding treatment plan reviews, and hygiene recall cadences in a central dashboard.',
  },
  {
    title: 'Dental Laboratory Connectivity',
    subtitle: 'Prescription Tracking & Fabrication Status Portals',
    badge: 'Touchpoint 04',
    route: '/contact',
    desc: 'Bridge communication with external commercial dental labs through custom tracking portals that monitor prescription submission, fabrication status, and delivery schedules.',
  },
  {
    title: 'Reporting & Operational Visibility',
    subtitle: 'Chair Utilization & Provider Productivity Analytics',
    badge: 'Touchpoint 05',
    route: '/contact',
    desc: 'Consolidate fragmented business metrics into unified executive dashboards, tracking location-level chair utilization, administrative task completion, and provider productivity.',
  },
] as const;

const OPERATIONAL_TOUCHPOINTS_ROTATES = ['-1.6deg', '1.4deg', '-0.9deg', '1.8deg', '-1.3deg'];

function DentalPracticeOperationalDeckSlider() {
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
    const targetScroll = sectionTop + (index / (OPERATIONAL_TOUCHPOINTS.length - 1)) * scrollDistance;
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
      const activePosition = progress * (OPERATIONAL_TOUCHPOINTS.length - 1);
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

      setCurrentActiveIndex(clamp(Math.round(activePosition), 0, OPERATIONAL_TOUCHPOINTS.length - 1));
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
    <section ref={sectionRef} className="ft-dental-practice-experience-section" aria-label="Operational Support">
      <div className="ft-dental-practice-experience-inner">
        {/* Centered Heading Section */}
        <div className="ft-dental-practice-experience-heading">
          <span className="ft-dental-practice-experience-eyebrow">OPERATIONAL IMPACT</span>
          <h2 className="ft-dental-practice-heading">
            Where Custom Technology Supports Dental Operations
          </h2>
          <p className="ft-dental-practice-subheading">
            Targeted digital applications and connected workflows deliver measurable improvements across the core operational touchpoints of dental care.
          </p>
        </div>

        {/* Stacked Cards List on Scroll */}
        <div className="ft-dental-practice-experience-list">
          {OPERATIONAL_TOUCHPOINTS.map((tp, index) => (
            <article
              key={tp.title}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="ft-dental-practice-experience-item"
              style={{
                ['--experience-card-base-rotate' as any]: OPERATIONAL_TOUCHPOINTS_ROTATES[index] || '0deg',
              }}
            >
              {/* Circular arrow button on left */}
              <div
                className="ft-dental-practice-experience-arrow"
                onClick={() => scrollToCard((index + 1) % OPERATIONAL_TOUCHPOINTS.length)}
                role="button"
                tabIndex={0}
                aria-label="Advance to next touchpoint"
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
              <div className="ft-dental-practice-experience-copy">
                <div className="ft-dental-practice-experience-copy__header">
                  <h3 className="ft-dental-practice-experience-copy__title">{tp.title}</h3>
                  <span className="ft-dental-practice-experience-copy__subtitle">{tp.subtitle}</span>
                </div>
                <p className="ft-dental-practice-experience-copy__summary">{tp.desc}</p>
              </div>

              {/* Side meta badge on right */}
              <div className="ft-dental-practice-experience-side">
                <span className="ft-dental-practice-experience-date">{tp.badge}</span>
                <Link
                  to={tp.route}
                  className="ft-dental-practice-experience-link"
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
        <div className="ft-dental-practice-experience-progress">
          <span className="ft-dental-practice-experience-counter">
            {String(currentActiveIndex + 1).padStart(2, '0')} / {String(OPERATIONAL_TOUCHPOINTS.length).padStart(2, '0')}
          </span>
          <div className="ft-dental-practice-experience-dots">
            {OPERATIONAL_TOUCHPOINTS.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                className={`ft-dental-practice-experience-dot ${
                  dotIdx === currentActiveIndex ? 'ft-dental-practice-experience-dot--active' : ''
                }`}
                onClick={() => scrollToCard(dotIdx)}
                aria-label={`Scroll to touchpoint ${dotIdx + 1}`}
              />
            ))}
          </div>
          <span className="ft-dental-practice-experience-hint">Scroll down to explore</span>
        </div>
      </div>
    </section>
  );
}

export function DentalPracticesPageClient() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((current) => (current === index ? null : index));
  };

  return (
    <div className="ft-dental-practice-page">
      {/* =========================================================
          1. HERO SECTION (With Exact Top Padding & Standard Button)
      ========================================================= */}
      <section className="ft-dental-practice-hero">
        <div className="ft-dental-practice-container">
          <div className="ft-dental-practice-hero__header">
            <p className="ft-dental-practice-hero__eyebrow">
              DENTAL PRACTICE TECHNOLOGY SOLUTIONS
            </p>
            <h1 className="ft-dental-practice-hero__title">
              <span className="ft-dental-practice-hero__title-line">
                Technology Solutions for
              </span>
              <span className="ft-dental-practice-hero__title-line">
                Modern Dental Practices
              </span>
            </h1>

            <div className="ft-dental-practice-hero__text-group">
              <p className="ft-dental-practice-hero__lead">
                Dental practices depend on more than clinical expertise to deliver a consistent patient experience and manage daily operations effectively. Behind every successful practice is a network of administrative processes, digital applications, communication channels, and operational workflows that must work together. Byte Operator provides dental practice technology solutions designed around the operational and technical requirements of modern dental organizations. We develop custom healthcare applications, AI-powered tools, workflow automation, and software integrations that connect existing systems and support more efficient digital operations. Build technology around your dental practice—not the other way around.
              </p>
            </div>

            <div className="ft-dental-practice-hero__cta-group">
              <CalendlyButton
                label="Discuss Your Project"
                className="ft-dental-practice-btn-primary"
              />
              <Link
                to="/contact"
                prefetch="intent"
                className="ft-dental-practice-btn-secondary"
              >
                Contact Byte Operator &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          2. CORE CHALLENGES (5 Cards - Trailing Centered)
      ========================================================= */}
      <section className="ft-dental-practice-section" aria-label="Dental Practice Challenges">
        <div className="ft-dental-practice-container">
          <div className="ft-dental-practice-section__header">
            <span className="ft-dental-practice-eyebrow">OPERATIONAL BOTTLENECKS</span>
            <h2 className="ft-dental-practice-heading">
              Technology Challenges Facing Modern Dental Practices
            </h2>
            <p className="ft-dental-practice-subheading">
              Dental practices manage interconnected activities extending beyond clinical procedures. When these activities rely on disconnected software, administrative delays and record discrepancies arise.
            </p>
          </div>

          <div className="ft-dental-practice-grid-3">
            <div className="ft-dental-practice-card">
              <span className="ft-dental-practice-card__badge">System Silos</span>
              <h3 className="ft-dental-practice-card__title">
                Disconnected Dental Software
              </h3>
              <p className="ft-dental-practice-card__desc">
                Many practices use separate platforms for practice management, patient communication, accounting, and imaging. Entering duplicate data across independent systems creates administrative overhead and inconsistent patient charts.
              </p>
            </div>

            <div className="ft-dental-practice-card">
              <span className="ft-dental-practice-card__badge">Manual Overhead</span>
              <h3 className="ft-dental-practice-card__title">
                Repetitive Administrative Workflows
              </h3>
              <p className="ft-dental-practice-card__desc">
                Front-desk teams spend substantial time verifying intake details, chasing lab cases, and sending manual recall reminders—routine tasks that can be orchestrated through structured workflow automation.
              </p>
            </div>

            <div className="ft-dental-practice-card">
              <span className="ft-dental-practice-card__badge">Multi-Site Friction</span>
              <h3 className="ft-dental-practice-card__title">
                Managing Multiple Dental Locations
              </h3>
              <p className="ft-dental-practice-card__desc">
                Growing dental groups struggle to maintain consistent administrative standards, location-filtered reporting, and consolidated operational visibility when each satellite office runs on independent configurations.
              </p>
            </div>

            <div className="ft-dental-practice-card">
              <span className="ft-dental-practice-card__badge">Software Limits</span>
              <h3 className="ft-dental-practice-card__title">
                Limitations of Standard Software
              </h3>
              <p className="ft-dental-practice-card__desc">
                Commercial dental PMS packages rarely support specialty workflows, bespoke approval chains, or custom analytics, forcing teams to rely on cumbersome external spreadsheets.
              </p>
            </div>

            <div className="ft-dental-practice-card">
              <span className="ft-dental-practice-card__badge">Integration Barriers</span>
              <h3 className="ft-dental-practice-card__title">
                Difficulty Connecting Existing Systems
              </h3>
              <p className="ft-dental-practice-card__desc">
                Proprietary database structures and restricted vendor APIs make bi-directional data exchange complex. Dedicated integration architecture is necessary to bridge legacy tools with modern web services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          3. FOUR CORE CAPABILITIES (4 Pillars Carousel)
      ========================================================= */}
      <DentalPracticeCapabilitiesSlider />

      {/* =========================================================
          4. WHERE CUSTOM TECHNOLOGY SUPPORTS OPERATIONS (5 Cards Scroll Deck)
      ========================================================= */}
      <DentalPracticeOperationalDeckSlider />

      {/* =========================================================
          5. BUSINESS MODELS (4 Cards)
      ========================================================= */}
      <section className="ft-dental-practice-section ft-dental-practice-section--darker" aria-label="Dental Business Models">
        <div className="ft-dental-practice-container">
          <div className="ft-dental-practice-section__header">
            <span className="ft-dental-practice-eyebrow">DENTAL BUSINESS MODELS</span>
            <h2 className="ft-dental-practice-heading">
              Solutions for Different Dental Business Models
            </h2>
            <p className="ft-dental-practice-subheading">
              Technology requirements vary according to practice size, organizational structure, and operational complexity. We adapt software architecture to your business model.
            </p>
          </div>

          <div className="ft-dental-practice-grid-3">
            {DENTAL_BUSINESS_MODELS.map((model) => (
              <div key={model.title} className="ft-dental-practice-card">
                <span className="ft-dental-practice-card__badge">{model.badge}</span>
                <h3 className="ft-dental-practice-card__title">{model.title}</h3>
                <p className="ft-dental-practice-card__desc">{model.desc}</p>
                <ul className="ft-dental-practice-card__list">
                  {model.points.map((pt) => (
                    <li key={pt} className="ft-dental-practice-card__list-item">
                      <span className="ft-dental-practice-card__list-bullet">&bull;</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* COMPLIANCE & SECURITY NOTICE BOX */}
          <div className="ft-dental-practice-notice-box">
            <h4 className="ft-dental-practice-notice-title">
              <span>&#9888;</span> Security, Privacy, and Responsible AI Implementation
            </h4>
            <p className="ft-dental-practice-notice-desc">
              Dental organizations handle sensitive patient and financial records. Applicable data protection standards (including HIPAA and Business Associate Agreements) must be evaluated and confirmed for each solution. Furthermore, AI applications are implemented strictly for administrative assistance and knowledge retrieval; clinical diagnosis and treatment decisions remain exclusively the responsibility of licensed dental professionals.
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
                  Dental Practice Technology FAQs
                </h2>
                <p className="ft-home-faqs__subtitle">
                  Find clear answers to common questions about custom dental software, DSO reporting dashboards, workflow automation, and PMS API integrations.
                </p>
              </div>

              <div className="ft-home-faqs__callout">
                <h3 className="ft-home-faqs__callout-title">
                  Planning a dental software initiative?
                </h3>
                <p className="ft-home-faqs__callout-text">
                  Our healthcare software engineers and integration architects can assess your current platforms and outline a practical technical roadmap.
                </p>
                <CalendlyButton
                  label="Speak with our engineering team &rarr;"
                  className="ft-home-faqs__callout-btn"
                />
              </div>
            </div>

            <div className="ft-home-faqs__right">
              {DENTAL_PRACTICES_FAQS.map((faq, index) => {
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
                        style={{ color: isOpen ? '#7dd3fc' : '#94a3b8' }}
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
        eyebrow="DENTAL PRACTICE TECHNOLOGY"
        title="Build Better Technology Around Your Dental Practice"
        description="Your dental practice deserves technology that supports the way your team actually works. From custom healthcare applications and AI-powered software to workflow automation and PMS integrations, Byte Operator can help you explore and develop technology solutions around your defined operational requirements."
        tagline="Let's discuss your dental practice technology requirements with our engineering team."
        primaryButtonLabel="Discuss Your Project"
        secondaryButtonLabel="Contact Byte Operator →"
        secondaryButtonHref="/contact"
        pillars={[
          {
            title: 'PMS & Imaging Integration',
            description:
              'Seamless integration with Dentrix, Eaglesoft, Open Dental, and digital radiography/imaging repositories.',
          },
          {
            title: '24/7 Dental Scheduling AI',
            description:
              'Inbound call handling for emergency toothaches, routine cleanings, and automated recall appointment workflows.',
          },
          {
            title: 'Digital Intake & Consent',
            description:
              'Mobile-first medical history, paperless consent signatures, and automatic synchronization into patient dental charts.',
          },
        ]}
      />
    </div>
  );
}
