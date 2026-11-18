'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Link } from '~/lib/router-compat';
import { CalendlyButton } from '~/components/shared/CalendlyButton';
import { ServiceFinalCta } from '~/components/shared/ServiceFinalCta';

/* =========================================================
   FAQ DATA (ALL 12 QUESTIONS)
========================================================= */

const MEDICAL_PRACTICES_FAQS = [
  {
    number: '01',
    question: 'What are medical practice technology solutions?',
    answer:
      'Medical practice technology solutions are digital applications, integrations, and automated workflows designed to support the operational and administrative requirements of physician practices. They include custom software, AI-powered applications, workflow automation, and connections between compatible third-party systems.',
  },
  {
    number: '02',
    question: 'What software solutions can be developed for medical practices?',
    answer:
      'Depending on requirements, custom development can include internal web applications, operational tools, workflow management features, information dashboards, AI-powered knowledge retrieval, and API-connected software tailored to your specific practice operations.',
  },
  {
    number: '03',
    question: 'Can custom software be developed for an independent medical practice?',
    answer:
      'Yes. A custom application can be designed around a specific requirement within an independent practice. The scope can target a single operational bottleneck or deliver a broader application layer based on your clinical workflows and budget.',
  },
  {
    number: '04',
    question: 'How can AI applications support medical practice operations?',
    answer:
      'AI applications assist with tasks such as searching approved internal knowledge sources, summarizing administrative records, classifying incoming requests, and supporting routine operational communications under mandatory human oversight.',
  },
  {
    number: '05',
    question: 'What medical practice workflows can be automated?',
    answer:
      'Potential workflows include internal task routing, appointment notifications, repetitive data-processing handoffs, and multistep administrative processes between EHR, scheduling, and billing platforms.',
  },
  {
    number: '06',
    question: 'Can different medical practice applications be connected through APIs?',
    answer:
      'Yes, applications can be integrated when software vendors provide supported APIs, webhooks, or database interfaces. Byte Operator evaluates interface availability, authentication, and data transformation rules to engineer reliable connections.',
  },
  {
    number: '07',
    question: 'What is the difference between custom medical practice software and off-the-shelf software?',
    answer:
      'Off-the-shelf software provides generic functionality for broad user bases, often forcing staff into rigid workarounds. Custom software is engineered around your practice\'s exact clinical pathways, administrative rules, and staff roles.',
  },
  {
    number: '08',
    question: 'Can technology solutions support multi-location medical practices?',
    answer:
      'Yes. Custom applications and integrations can coordinate selected workflows across multiple satellite offices, providing centralized administrative visibility alongside location-aware user access controls.',
  },
  {
    number: '09',
    question: 'What should a medical practice consider before integrating existing software?',
    answer:
      'Practices should review API documentation, vendor rate limits, authentication protocols, field mapping, data governance policies, error-handling routines, and ongoing maintenance responsibilities.',
  },
  {
    number: '10',
    question: 'How should medical practices approach healthcare data security and privacy?',
    answer:
      'Practices must define data sensitivity, access permissions, transmission encryption (TLS 1.3), storage safeguards (AES-256), and applicable legal or contractual obligations (such as HIPAA and BAAs) before development begins.',
  },
  {
    number: '11',
    question: 'How long does it take to develop custom software for a medical practice?',
    answer:
      'Timelines vary depending on system complexity, integration readiness, and testing requirements. A focused workflow tool can launch in weeks, while extensive multi-provider platforms are deployed in phased releases.',
  },
  {
    number: '12',
    question: 'How can a medical practice start a custom technology project?',
    answer:
      'Start by identifying your primary operational bottleneck and listing the software tools currently in use. Byte Operator can then assess feasibility and outline a practical technical roadmap during a discovery consultation.',
  },
] as const;

/* =========================================================
   PRACTICE TYPES DATA
========================================================= */

const PRACTICE_TYPES = [
  {
    title: 'Independent & Solo Medical Practices',
    badge: 'Focused Agility',
    desc: 'Targeted digital tools and workflow automation designed to relieve administrative burdens for solo practitioners and lean clinic teams.',
    points: [
      'Focused administrative automation',
      'Direct software & scheduling connectivity',
      'AI-assisted policy & knowledge search',
      'Cost-efficient custom web tools',
    ],
  },
  {
    title: 'Group Medical Practices',
    badge: 'Multi-Provider Coordination',
    desc: 'Shared operational platforms and role-based workflows ensuring consistent administrative standards across multiple doctors and clinical staff.',
    points: [
      'Role-based staff permissions & access',
      'Automated internal task routing & alerts',
      'Centralized practice visibility dashboards',
      'Multi-provider scheduling alignment',
    ],
  },
  {
    title: 'Multispecialty Medical Practices',
    badge: 'Departmental Interoperability',
    desc: 'Unified software architectures bridging disparate specialty requirements, distinct intake workflows, and cross-departmental coordination.',
    points: [
      'Department-specific intake pathways',
      'Inter-specialty referral coordination',
      'Cross-departmental data synchronization',
      'Unified practice reporting layers',
    ],
  },
  {
    title: 'Hospital-Affiliated & Employed Practices',
    badge: 'Enterprise Alignment',
    desc: 'Purpose-built workflow applications engineered within the strict architectural guidelines, security policies, and governance of larger health systems.',
    points: [
      'Strict enterprise network & IAM compliance',
      'Approved third-party software adapters',
      'Audit logging and security monitoring',
      'Streamlined physician communication tools',
    ],
  },
  {
    title: 'Direct Primary Care & Concierge Practices',
    badge: 'High-Touch Care',
    desc: 'High-touch digital communication tools and membership administration platforms tailored to subscription and direct-care operational models.',
    points: [
      'Custom membership & intake workflows',
      'Direct physician-patient message routing',
      'Streamlined recurring administrative tasks',
      'Connected communication interfaces',
    ],
  },
  {
    title: 'Multi-Location Medical Practices',
    badge: 'Scalable Networks',
    desc: 'Centralized operational dashboards and location-aware applications allowing growing clinic networks to maintain operational consistency.',
    points: [
      'Location-aware staff permissions',
      'Consolidated multi-site reporting',
      'Standardized operating workflows',
      'Centralized patient data accessibility',
    ],
  },
] as const;

/* =========================================================
   3. CORE CAPABILITIES (4 CARDS 3D COVERFLOW CAROUSEL)
========================================================= */

const PRACTICE_CAPABILITIES = [
  {
    badge: 'Custom Development',
    title: '1. Custom Healthcare Application Development',
    desc: 'Building web applications around defined clinical and administrative processes rather than forcing your team into generic templates.',
    items: [
      'Custom web applications for internal clinic operations',
      'Centralized staff dashboards and workflow consoles',
      'Role-based access permissions and secure data access',
      'Scalable, cloud-native architecture ready for practice expansion',
    ],
  },
  {
    badge: 'AI Engineering',
    title: '2. AI-Powered Applications for Practices',
    desc: 'Leveraging intelligent AI features to accelerate internal knowledge retrieval, summarize records, and structure administrative data with strict human review.',
    items: [
      'Internal policy and protocol search assistants',
      'Administrative document parsing and data extraction',
      'Natural-language drafting for staff communications',
      'Clear boundary enforcement avoiding unauthorized clinical advice',
    ],
  },
  {
    badge: 'Automation',
    title: '3. Medical Practice Workflow Automation',
    desc: 'Connecting multi-step administrative tasks so that events in one system trigger notifications, assignments, and record updates automatically.',
    items: [
      'Automated information routing between compatible tools',
      'Internal staff notifications triggered by administrative events',
      'Repetitive billing and intake data-processing automation',
      'Automated escalation queues for manual staff intervention',
    ],
  },
  {
    badge: 'Integration',
    title: '4. API & Third-Party Software Integrations',
    desc: 'Connecting your EHR, practice management, billing, and lab portals via custom REST/GraphQL endpoints, webhooks, and secure middleware.',
    items: [
      'Custom API engineering and third-party connector development',
      'Webhook event streaming for real-time status synchronization',
      'Bi-directional data transformation, field mapping, and validation',
      'Production-grade error handling, retry queues, and audit logging',
    ],
  },
] as const;

function MedicalPracticeCapabilitiesSlider() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % PRACTICE_CAPABILITIES.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + PRACTICE_CAPABILITIES.length) % PRACTICE_CAPABILITIES.length);
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
    const diff = (idx - activeSlide + PRACTICE_CAPABILITIES.length) % PRACTICE_CAPABILITIES.length;
    if (diff === 0) return 'ft-medical-practice-slider-card ft-medical-practice-slider-card--active';
    if (diff === 1) return 'ft-medical-practice-slider-card ft-medical-practice-slider-card--next';
    if (diff === PRACTICE_CAPABILITIES.length - 1) return 'ft-medical-practice-slider-card ft-medical-practice-slider-card--prev';
    return 'ft-medical-practice-slider-card ft-medical-practice-slider-card--hidden';
  };

  return (
    <section className="ft-medical-practice-section ft-medical-practice-section--darker" aria-label="Core Capabilities">
      <div className="ft-medical-practice-container">
        <div className="ft-medical-practice-section__header">
          <span className="ft-medical-practice-eyebrow">ENGINEERING CAPABILITIES</span>
          <h2 className="ft-medical-practice-heading">
            Custom Technology Solutions for Medical Practices
          </h2>
          <p className="ft-medical-practice-subheading">
            Every practice has distinct operational needs. We begin with your actual workflow challenge and deliver tailored solutions across four core capabilities.
          </p>
        </div>

        {/* 3D Coverflow Carousel */}
        <div
          className="ft-medical-practice-slider-wrapper"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button
            type="button"
            className="ft-medical-practice-slider-nav-btn ft-medical-practice-slider-nav-btn--prev"
            onClick={prevSlide}
            aria-label="Previous capability"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <button
            type="button"
            className="ft-medical-practice-slider-nav-btn ft-medical-practice-slider-nav-btn--next"
            onClick={nextSlide}
            aria-label="Next capability"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          <div className="ft-medical-practice-slider-stage">
            {PRACTICE_CAPABILITIES.map((cap, idx) => {
              const isActive = idx === activeSlide;
              return (
                <div
                  key={cap.title}
                  className={getCardClass(idx)}
                  onClick={() => {
                    if (!isActive) setActiveSlide(idx);
                  }}
                >
                  <span className="ft-medical-practice-card__badge">{cap.badge}</span>
                  <h3 className="ft-medical-practice-card__title">{cap.title}</h3>
                  <p className="ft-medical-practice-card__desc">{cap.desc}</p>
                  <ul className="ft-medical-practice-card__list">
                    {cap.items.map((item, itemIdx) => (
                      <li className="ft-medical-practice-card__list-item" key={itemIdx}>
                        <span className="ft-medical-practice-card__list-bullet">&bull;</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <div className="ft-medical-practice-slider-dots">
            {PRACTICE_CAPABILITIES.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`ft-medical-practice-slider-dot ${i === activeSlide ? 'ft-medical-practice-slider-dot--active' : ''}`}
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
   5. PRACTICAL USE CASES (5 SCENARIO CARDS SCROLL-DRIVEN DECK)
========================================================= */

const USE_CASES = [
  {
    title: 'Connecting Disconnected Practice Applications',
    subtitle: 'Automated Record Synchronization & Reduced Transcription',
    badge: 'Scenario 01',
    route: '/contact',
    desc: 'A medical practice utilizes separate software for patient intake, scheduling, and billing that do not share updates. We engineer an API integration layer that synchronizes approved patient records automatically, reducing manual transcription and record gaps.',
  },
  {
    title: 'Automating Administrative Intake Workflows',
    subtitle: 'Demographic Validation & Chart Creation Automation',
    badge: 'Scenario 02',
    route: '/contact',
    desc: 'When a new patient registers online, an automated workflow verifies demographic completeness, notifies front-desk staff, creates the chart in the practice management system, and sends secure intake confirmations.',
  },
  {
    title: 'Building a Custom Internal Staff Application',
    subtitle: 'HIPAA-Ready Review Checklists & Dashboards',
    badge: 'Scenario 03',
    route: '/contact',
    desc: 'A practice needs a specialized interface to coordinate multidisciplinary treatment reviews that their primary EHR cannot accommodate. We engineer a HIPAA-ready web application providing staff with customized review checklists and progress dashboards.',
  },
  {
    title: 'Deploying an AI Operational Knowledge Assistant',
    subtitle: 'Retrieval-Augmented Guidance with Source Citations',
    badge: 'Scenario 04',
    route: '/contact',
    desc: 'Practice staff frequently search dense operational manuals, compliance guidelines, and insurance authorization protocols. We implement a retrieval-augmented AI assistant allowing staff to query approved documents instantly with verified source citations.',
  },
  {
    title: 'Coordinating Multi-Location Clinic Operations',
    subtitle: 'Location-Filtered Metrics & Unified Scheduling',
    badge: 'Scenario 05',
    route: '/contact',
    desc: 'A growing medical group with four regional clinics requires standardized scheduling protocols and centralized oversight. A custom cloud portal delivers location-filtered operational metrics while maintaining unified patient scheduling rules.',
  },
] as const;

const USE_CASES_ROTATES = ['-1.6deg', '1.4deg', '-0.9deg', '1.8deg', '-1.3deg'];

function MedicalPracticeUseCasesDeckSlider() {
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
    const targetScroll = sectionTop + (index / (USE_CASES.length - 1)) * scrollDistance;
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
      const activePosition = progress * (USE_CASES.length - 1);
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

      setCurrentActiveIndex(clamp(Math.round(activePosition), 0, USE_CASES.length - 1));
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
    <section ref={sectionRef} className="ft-medical-practice-experience-section" aria-label="Practical Use Cases">
      <div className="ft-medical-practice-experience-inner">
        {/* Centered Heading Section */}
        <div className="ft-medical-practice-experience-heading">
          <span className="ft-medical-practice-experience-eyebrow">REAL-WORLD APPLICATIONS</span>
          <h2 className="ft-medical-practice-heading">
            Practical Technology Use Cases for Medical Practices
          </h2>
          <p className="ft-medical-practice-subheading">
            Illustrative project scenarios demonstrating how custom software engineering, AI, and workflow automation solve tangible clinic challenges.
          </p>
        </div>

        {/* Stacked Cards List on Scroll */}
        <div className="ft-medical-practice-experience-list">
          {USE_CASES.map((uc, index) => (
            <article
              key={uc.title}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="ft-medical-practice-experience-item"
              style={{
                ['--experience-card-base-rotate' as any]: USE_CASES_ROTATES[index] || '0deg',
              }}
            >
              {/* Circular arrow button on left */}
              <div
                className="ft-medical-practice-experience-arrow"
                onClick={() => scrollToCard((index + 1) % USE_CASES.length)}
                role="button"
                tabIndex={0}
                aria-label="Advance to next scenario"
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
              <div className="ft-medical-practice-experience-copy">
                <div className="ft-medical-practice-experience-copy__header">
                  <h3 className="ft-medical-practice-experience-copy__title">{uc.title}</h3>
                  <span className="ft-medical-practice-experience-copy__subtitle">{uc.subtitle}</span>
                </div>
                <p className="ft-medical-practice-experience-copy__summary">{uc.desc}</p>
              </div>

              {/* Side meta badge on right */}
              <div className="ft-medical-practice-experience-side">
                <span className="ft-medical-practice-experience-date">{uc.badge}</span>
                <Link
                  to={uc.route}
                  className="ft-medical-practice-experience-link"
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
        <div className="ft-medical-practice-experience-progress">
          <span className="ft-medical-practice-experience-counter">
            {String(currentActiveIndex + 1).padStart(2, '0')} / {String(USE_CASES.length).padStart(2, '0')}
          </span>
          <div className="ft-medical-practice-experience-dots">
            {USE_CASES.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                className={`ft-medical-practice-experience-dot ${
                  dotIdx === currentActiveIndex ? 'ft-medical-practice-experience-dot--active' : ''
                }`}
                onClick={() => scrollToCard(dotIdx)}
                aria-label={`Scroll to scenario ${dotIdx + 1}`}
              />
            ))}
          </div>
          <span className="ft-medical-practice-experience-hint">Scroll down to explore</span>
        </div>
      </div>
    </section>
  );
}

export function MedicalPracticesPageClient() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((current) => (current === index ? null : index));
  };

  return (
    <div className="ft-medical-practice-page">
      {/* =========================================================
          1. HERO SECTION (With Exact Top Padding & Standard Button)
      ========================================================= */}
      <section className="ft-medical-practice-hero">
        <div className="ft-medical-practice-container">
          <div className="ft-medical-practice-hero__header">
            <p className="ft-medical-practice-hero__eyebrow">
              MEDICAL PRACTICE TECHNOLOGY SOLUTIONS
            </p>
            <h1 className="ft-medical-practice-hero__title">
              <span className="ft-medical-practice-hero__title-line">
                Technology Solutions for
              </span>
              <span className="ft-medical-practice-hero__title-line">
                Modern Medical Practices
              </span>
            </h1>

            <div className="ft-medical-practice-hero__text-group">
              <p className="ft-medical-practice-hero__lead">
                Medical practices rely on multiple digital systems, applications, and administrative processes to keep daily operations running smoothly. When these tools do not work together, information becomes fragmented, routine tasks take longer, and teams struggle to maintain efficient workflows. Byte Operator develops technology solutions for medical practices through custom application development, AI-powered applications, workflow automation, and API integrations. We help practices explore practical ways to improve digital operations, connect existing tools, and build technology around specific requirements. Looking to improve your medical practice&apos;s technology infrastructure? Discuss your requirements with Byte Operator.
              </p>
            </div>

            <div className="ft-medical-practice-hero__cta-group">
              <CalendlyButton
                label="Discuss Your Project"
                className="ft-medical-practice-btn-primary"
              />
              <Link
                to="/contact"
                prefetch="intent"
                className="ft-medical-practice-btn-secondary"
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
      <section className="ft-medical-practice-section" aria-label="Medical Practice Challenges">
        <div className="ft-medical-practice-container">
          <div className="ft-medical-practice-section__header">
            <span className="ft-medical-practice-eyebrow">PRACTICE CHALLENGES</span>
            <h2 className="ft-medical-practice-heading">
              Technology Challenges Facing Modern Medical Practices
            </h2>
            <p className="ft-medical-practice-subheading">
              The issue is rarely a lack of software. In many cases, practices already use multiple digital tools, but those tools operate independently without supporting a connected workflow.
            </p>
          </div>

          <div className="ft-medical-practice-grid-3">
            <div className="ft-medical-practice-card">
              <span className="ft-medical-practice-card__badge">Disconnection</span>
              <h3 className="ft-medical-practice-card__title">
                Disconnected Software &amp; Systems
              </h3>
              <p className="ft-medical-practice-card__desc">
                When administrative, communication, and reporting applications do not exchange data, staff must manually copy records between platforms, creating duplicated work and record discrepancies.
              </p>
            </div>

            <div className="ft-medical-practice-card">
              <span className="ft-medical-practice-card__badge">Administrative Burden</span>
              <h3 className="ft-medical-practice-card__title">
                Repetitive Administrative Work
              </h3>
              <p className="ft-medical-practice-card__desc">
                Repeated data entry, document handling, internal notifications, and manual task coordination consume significant staff hours that could be directed toward patient support.
              </p>
            </div>

            <div className="ft-medical-practice-card">
              <span className="ft-medical-practice-card__badge">Blind Spots</span>
              <h3 className="ft-medical-practice-card__title">
                Limited Operational Visibility
              </h3>
              <p className="ft-medical-practice-card__desc">
                When operational data is scattered across separate tools, practice managers find it difficult to track patient flow, monitor administrative bottlenecks, and generate accurate reports.
              </p>
            </div>

            <div className="ft-medical-practice-card">
              <span className="ft-medical-practice-card__badge">Scaling Friction</span>
              <h3 className="ft-medical-practice-card__title">
                Growing Operational Complexity
              </h3>
              <p className="ft-medical-practice-card__desc">
                Workflows that function for a single physician quickly break down as additional providers, clinical staff, or satellite offices are added without an adaptable architecture.
              </p>
            </div>

            <div className="ft-medical-practice-card">
              <span className="ft-medical-practice-card__badge">Data Hand-offs</span>
              <h3 className="ft-medical-practice-card__title">
                Manual Information Transfer
              </h3>
              <p className="ft-medical-practice-card__desc">
                Relying on staff to copy, re-enter, or email records introduces human transcription errors and delays critical care continuity across providers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          3. FOUR CORE CAPABILITIES (4 Cards 3D Coverflow Carousel)
      ========================================================= */}
      <MedicalPracticeCapabilitiesSlider />

      {/* =========================================================
          4. PRACTICE TYPES SECTION (6 Cards)
      ========================================================= */}
      <section className="ft-medical-practice-section" aria-label="Practice Types">
        <div className="ft-medical-practice-container">
          <div className="ft-medical-practice-section__header">
            <span className="ft-medical-practice-eyebrow">PRACTICE ARCHITECTURES</span>
            <h2 className="ft-medical-practice-heading">
              Technology Solutions for Different Types of Practices
            </h2>
            <p className="ft-medical-practice-subheading">
              A solution designed for a solo practitioner differs substantially from a multispecialty clinic network. We adapt software architecture to your organizational model.
            </p>
          </div>

          <div className="ft-medical-practice-grid-3">
            {PRACTICE_TYPES.map((practice) => (
              <div key={practice.title} className="ft-medical-practice-card">
                <span className="ft-medical-practice-card__badge">{practice.badge}</span>
                <h3 className="ft-medical-practice-card__title">{practice.title}</h3>
                <p className="ft-medical-practice-card__desc">{practice.desc}</p>
                <ul className="ft-medical-practice-card__list">
                  {practice.points.map((pt) => (
                    <li key={pt} className="ft-medical-practice-card__list-item">
                      <span className="ft-medical-practice-card__list-bullet">&bull;</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          5. PRACTICAL USE CASES (5 Scenario Cards Scroll-Driven Deck)
      ========================================================= */}
      <MedicalPracticeUseCasesDeckSlider />

      {/* =========================================================
          6. STRUCTURED DEVELOPMENT APPROACH (6 Steps)
      ========================================================= */}
      <section className="ft-medical-practice-section" aria-label="Development Process">
        <div className="ft-medical-practice-container">
          <div className="ft-medical-practice-section__header">
            <span className="ft-medical-practice-eyebrow">METHODICAL EXECUTION</span>
            <h2 className="ft-medical-practice-heading">
              Our Approach to Developing Technology for Medical Practices
            </h2>
            <p className="ft-medical-practice-subheading">
              A structured engineering approach ensures that technical solutions directly address operational challenges without introducing disruption.
            </p>
          </div>

          <div className="ft-medical-practice-process-grid">
            <div className="ft-medical-practice-process-card">
              <span className="ft-medical-practice-process-step">01</span>
              <h3 className="ft-medical-practice-process-title">Discovery &amp; Requirements</h3>
              <p className="ft-medical-practice-process-desc">
                Assessing practice operational bottlenecks, staff workflows, software environments, and privacy obligations.
              </p>
            </div>

            <div className="ft-medical-practice-process-card">
              <span className="ft-medical-practice-process-step">02</span>
              <h3 className="ft-medical-practice-process-title">Technical Assessment</h3>
              <p className="ft-medical-practice-process-desc">
                Reviewing API documentation, vendor permissions, data formats, and feasibility of third-party connectivity.
              </p>
            </div>

            <div className="ft-medical-practice-process-card">
              <span className="ft-medical-practice-process-step">03</span>
              <h3 className="ft-medical-practice-process-title">Architecture &amp; Design</h3>
              <p className="ft-medical-practice-process-desc">
                Designing database schemas, role-based access models, API endpoints, AI retrieval pipelines, and automation logic.
              </p>
            </div>

            <div className="ft-medical-practice-process-card">
              <span className="ft-medical-practice-process-step">04</span>
              <h3 className="ft-medical-practice-process-title">Development &amp; Integration</h3>
              <p className="ft-medical-practice-process-desc">
                Building application features, configuring API connectors, engineering event-driven pipelines, and embedding AI models.
              </p>
            </div>

            <div className="ft-medical-practice-process-card">
              <span className="ft-medical-practice-process-step">05</span>
              <h3 className="ft-medical-practice-process-title">Testing &amp; Validation</h3>
              <p className="ft-medical-practice-process-desc">
                Conducting functional testing, user role verification, interface validation, error handling, and performance checks.
              </p>
            </div>

            <div className="ft-medical-practice-process-card">
              <span className="ft-medical-practice-process-step">06</span>
              <h3 className="ft-medical-practice-process-title">Deployment &amp; Improvement</h3>
              <p className="ft-medical-practice-process-desc">
                Deploying to secure cloud infrastructure, onboarding staff, and providing ongoing monitoring and system evolution.
              </p>
            </div>
          </div>

          {/* COMPLIANCE & SECURITY NOTICE BOX */}
          <div className="ft-medical-practice-notice-box">
            <h4 className="ft-medical-practice-notice-title">
              <span>&#9888;</span> Security, Privacy, and Compliance Notice
            </h4>
            <p className="ft-medical-practice-notice-desc">
              Healthcare environments involve protected health information. Applicable legal obligations, contractual terms (including Business Associate Agreements), and technical standards (HIPAA, HL7, FHIR) must be confirmed and established for each project. Byte Operator evaluates architecture and vendor agreements to ensure verified alignment with required regulatory standards.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          7. FREQUENTLY ASKED QUESTIONS (Two-Column Sticky Accordion)
      ========================================================= */}
      <section className="ft-home-faqs" aria-label="Frequently Asked Questions">
        <div className="ft-home-faqs__container">
          <div className="ft-home-faqs__grid">
            <div className="ft-home-faqs__left">
              <div className="ft-home-faqs__header">
                <p className="ft-home-faqs__eyebrow">FREQUENTLY ASKED QUESTIONS</p>
                <h2 className="ft-home-faqs__heading">
                  Medical Practice Technology FAQs
                </h2>
                <p className="ft-home-faqs__subtitle">
                  Find clear answers to common questions about custom medical practice software, workflow automation, AI assistants, and system integrations.
                </p>
              </div>

              <div className="ft-home-faqs__callout">
                <h3 className="ft-home-faqs__callout-title">
                  Have questions about your practice technology?
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
              {MEDICAL_PRACTICES_FAQS.map((faq, index) => {
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
          8. FINAL CONVERSION CTA
      ========================================================= */}
      <ServiceFinalCta
        eyebrow="MEDICAL PRACTICE TECHNOLOGY"
        title="Build Better Technology Around Your Medical Practice"
        description="Your medical practice deserves technology that supports the way your organization actually works. From custom healthcare applications and AI-powered software to workflow automation and API integrations, Byte Operator develops technology solutions around your operational requirements."
        tagline="Let's discuss your medical practice technology requirements with our engineering team."
        primaryButtonLabel="Discuss Your Project"
        secondaryButtonLabel="Contact Byte Operator →"
        secondaryButtonHref="/contact"
        pillars={[
          {
            title: 'Patient Communication & Scheduling',
            description:
              'Automated call triage, digital check-in workflows, and real-time scheduling linked with your existing practice software.',
          },
          {
            title: 'Administrative Automation',
            description:
              'Eliminate repetitive data transfer between intake forms, referral tracking, and electronic medical records.',
          },
          {
            title: 'Multi-Provider Coordination',
            description:
              'Custom role permissions, doctor calendars, and unified communication channels across single or multi-location clinics.',
          },
        ]}
      />
    </div>
  );
}
