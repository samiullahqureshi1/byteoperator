'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Link } from '~/lib/router-compat';
import { CalendlyButton } from '~/components/shared/CalendlyButton';
import { ServiceFinalCta } from '~/components/shared/ServiceFinalCta';

/* =========================================================
   FAQ DATA (ALL 20 QUESTIONS FROM SPECIFICATION)
========================================================= */

const HEALTHCARE_FAQS = [
  {
    number: '01',
    question: 'What is healthcare software integration?',
    answer:
      'Healthcare software integration is the process of connecting healthcare applications and systems so they can exchange information and support coordinated workflows. It may involve EHR and EMR systems, laboratory applications, patient portals, APIs, HL7 messaging and FHIR interfaces.',
  },
  {
    number: '02',
    question: 'Why is healthcare software integration important?',
    answer:
      'Healthcare integration helps reduce information silos and supports communication between different applications. It can reduce repetitive data entry, improve information exchange and help coordinate clinical and administrative workflows.',
  },
  {
    number: '03',
    question: 'What healthcare systems can be integrated?',
    answer:
      'Depending on system capabilities and technical requirements, healthcare integration can involve EHR and EMR platforms, hospital information systems, laboratory systems, radiology applications, PACS, practice management software, patient portals, telehealth platforms and custom healthcare applications.',
  },
  {
    number: '04',
    question: 'What is EHR and EMR integration?',
    answer:
      'EHR and EMR integration connects electronic health record or medical record systems with other applications. It can support information exchange involving patient demographics, clinical information, appointments and other relevant workflows through supported interfaces.',
  },
  {
    number: '05',
    question: 'What is HL7 integration in healthcare?',
    answer:
      'HL7 integration enables healthcare applications to exchange structured information using Health Level Seven messaging standards. HL7 v2 is commonly used for message-based workflows such as patient admission, discharge, transfer, orders and clinical results.',
  },
  {
    number: '06',
    question: 'What is FHIR integration?',
    answer:
      'FHIR integration uses Fast Healthcare Interoperability Resources to support structured healthcare data exchange through defined resources and APIs. It can help connect modern healthcare applications with systems that support compatible FHIR interfaces.',
  },
  {
    number: '07',
    question: 'What is the difference between HL7 and FHIR?',
    answer:
      'HL7 v2 commonly uses structured messages for exchanging healthcare information, while FHIR uses defined resources and supports API-oriented data exchange. The appropriate approach depends on the connected systems, available interfaces and project requirements.',
  },
  {
    number: '08',
    question: 'What are common HL7 message types?',
    answer:
      'Common HL7 v2 message categories include ADT for admission, discharge and transfer information, ORM for order-related information, and ORU for observation and result information. The actual messages supported depend on the connected applications and their interface specifications.',
  },
  {
    number: '09',
    question: 'What is a FHIR API?',
    answer:
      'A FHIR API allows applications to exchange healthcare information through defined FHIR resources and operations. For example, supported implementations may provide access to resources such as Patient, Practitioner, Encounter and Observation.',
  },
  {
    number: '10',
    question: 'Can different EHR systems exchange healthcare data?',
    answer:
      'Different EHR systems can exchange information when compatible interfaces, APIs or interoperability standards are available. The integration approach depends on vendor capabilities, data structures, supported standards and access permissions.',
  },
  {
    number: '11',
    question: 'Can legacy healthcare software be integrated with modern applications?',
    answer:
      'Legacy healthcare software may be integrated with modern applications when suitable interfaces, data access methods or other technical integration options are available. A feasibility assessment is important because some older systems have limitations that affect integration.',
  },
  {
    number: '12',
    question: 'What is healthcare middleware?',
    answer:
      'Healthcare middleware is an intermediate software layer that helps different healthcare applications communicate. Depending on the implementation, it can support message routing, data transformation, application connectivity and integration monitoring.',
  },
  {
    number: '13',
    question: 'What is the difference between real-time and batch integration?',
    answer:
      'Real-time integration exchanges information as part of an active application workflow, subject to system capabilities. Batch integration transfers information at scheduled intervals or in groups. The appropriate method depends on the workflow and operational requirements.',
  },
  {
    number: '14',
    question: 'How is healthcare data protected during integration?',
    answer:
      'Healthcare data protection can involve encryption, authentication, authorization, access controls, monitoring and appropriate data handling practices. The exact safeguards depend on the systems, information being exchanged and applicable security requirements.',
  },
  {
    number: '15',
    question: 'Does healthcare software integration need to meet HIPAA requirements?',
    answer:
      'Healthcare organizations and technology providers may have HIPAA obligations depending on their roles and activities involving protected health information. Integration projects should assess applicable responsibilities and safeguards before exchanging such information.',
  },
  {
    number: '16',
    question: 'What is a Business Associate Agreement?',
    answer:
      'A Business Associate Agreement is a contract that establishes certain responsibilities when a service provider qualifies as a business associate under HIPAA. Whether a BAA is required depends on the relationship and the nature of the services and information involved.',
  },
  {
    number: '17',
    question: 'How much does healthcare software integration cost?',
    answer:
      'The cost depends on the number of systems, interface availability, integration complexity, data transformation requirements, security considerations and project scope. A technical assessment is the best way to establish a realistic estimate.',
  },
  {
    number: '18',
    question: 'How long does a healthcare integration project take?',
    answer:
      'Project timelines depend on the systems involved, technical documentation, vendor access, integration methods, testing requirements and deployment scope. The timeline should be established after the integration requirements and dependencies have been assessed.',
  },
  {
    number: '19',
    question: 'What information is needed before starting a healthcare integration project?',
    answer:
      'Useful starting information includes the names and versions of the systems involved, available API or interface documentation, required data exchange workflows, security requirements, vendor access arrangements and project objectives.',
  },
  {
    number: '20',
    question: 'Does Byte Operator provide custom HL7 and FHIR integration?',
    answer:
      'Yes. Byte Operator provides HL7 and FHIR integration services as part of its healthcare software integration capabilities. The implementation approach depends on the connected applications, supported specifications, available interfaces and project requirements.',
  },
] as const;

/* =========================================================
   TECHNOLOGY LOGOS DATA (WHITE VECTOR SVGS)
========================================================= */

const HEALTHCARE_TECH_LOGOS = [
  { src: '/images/home-partners/fhir.svg', alt: 'HL7 FHIR', width: 160, height: 40 },
  { src: '/images/home-partners/hl7.svg', alt: 'HL7 v2/v3', width: 160, height: 40 },
  { src: '/images/home-partners/dicom.svg', alt: 'DICOM PACS', width: 160, height: 40 },
  { src: '/images/home-partners/typescript.svg', alt: 'TypeScript', width: 160, height: 40 },
  { src: '/images/home-partners/python.svg', alt: 'Python', width: 160, height: 40 },
  { src: '/images/home-partners/nodejs.svg', alt: 'Node.js', width: 160, height: 40 },
  { src: '/images/home-partners/postgresql.svg', alt: 'PostgreSQL', width: 170, height: 40 },
  { src: '/images/home-partners/redis.svg', alt: 'Redis', width: 160, height: 40 },
  { src: '/images/home-partners/aws.svg', alt: 'AWS Healthcare', width: 160, height: 40 },
  { src: '/images/home-partners/google-cloud.svg', alt: 'Google Cloud Healthcare API', width: 170, height: 40 },
  { src: '/images/home-partners/docker.svg', alt: 'Docker Containers', width: 160, height: 40 },
  { src: '/images/home-partners/kubernetes.svg', alt: 'Kubernetes', width: 170, height: 40 },
] as const;

/* =========================================================
   3. HEALTHCARE INTEGRATION SERVICES (9 CARDS COVERFLOW SLIDER)
========================================================= */

const HEALTHCARE_INTEGRATION_SERVICES = [
  {
    badge: '01. HL7 MESSAGING',
    title: 'HL7 Integration Services',
    desc: 'HL7 is widely used to exchange structured information between clinical and administrative applications. We develop reliable interface connections for hospital workflows.',
    items: [
      'HL7 interface development & socket connectivity',
      'HL7 message processing and transformation',
      'Admission, Discharge & Transfer (ADT) workflows',
      'Clinical orders (ORM) & observation results (ORU)',
      'Data mapping and message validation',
    ],
    footer: 'Determined by source and destination systems, message specifications, and data requirements.',
  },
  {
    badge: '02. MODERN FHIR',
    title: 'FHIR Integration Services',
    desc: 'Fast Healthcare Interoperability Resources (FHIR) provides a modern, resource-based approach to exchanging healthcare information through RESTful web APIs.',
    items: [
      'FHIR REST API integration (R4 / R5)',
      'Resource mapping (Patient, Practitioner, Encounter)',
      'Diagnostic observation and clinical data exchange',
      'SMART on FHIR OAuth2 authentication',
      'Custom FHIR interface & profile development',
    ],
    footer: 'Architected around specific implementation guides, versions, and clinical endpoints.',
  },
  {
    badge: '03. EHR / EMR',
    title: 'EHR and EMR Integration',
    desc: 'Connecting electronic medical records systems with third-party software to support data exchange across clinical and administrative workflows.',
    items: [
      'Patient demographic information exchange',
      'Clinical documentation & encounter sync',
      'Appointment scheduling & calendar workflows',
      'Laboratory & diagnostic test results',
      'Patient portal and custom app connectivity',
    ],
    footer: 'Compatible with Epic, Cerner, Athenahealth, Allscripts, and specialized practice management systems.',
  },
  {
    badge: '04. WEB APIS',
    title: 'Healthcare API Integration',
    desc: 'Healthcare applications require secure communication with cloud services and internal software via structured API contracts.',
    items: [
      'Healthcare REST API integration',
      'Third-party medical service connectivity',
      'Custom API development and tokenized auth',
      'Data mapping, validation & sanitization',
      'Resilient error handling and retry queues',
    ],
    footer: 'Engineered to operate reliably within the security parameters of healthcare infrastructure.',
  },
  {
    badge: '05. APPLICATION APPS',
    title: 'Healthcare Application Integration',
    desc: 'Connecting custom patient-facing applications, telehealth platforms, and clinician portals directly with hospital backend databases.',
    items: [
      'Patient apps connected to clinical records',
      'Custom healthcare platforms and external services',
      'Provider apps exchanging clinical observations',
      'Administrative software connected to operations',
      'Healthcare SaaS multi-tenant integrations',
    ],
    footer: 'We assess architecture and security boundaries prior to engineering application connections.',
  },
  {
    badge: '06. DATA PIPELINES',
    title: 'Healthcare Data Integration',
    desc: 'Healthcare data originates in varied structures. Moving information requires rigorous normalization, validation, and schema synchronization.',
    items: [
      'Data extraction and transformation (ETL)',
      'Schema mapping and data normalization',
      'Validation against clinical business rules',
      'Bidirectional data synchronization',
      'Automated audit logging and error recovery',
    ],
    footer: 'Guarantees consistent, high-integrity information across all operational touchpoints.',
  },
  {
    badge: '07. CLINICAL WORKFLOWS',
    title: 'Healthcare Workflow Integration',
    desc: 'Connecting applications so information moves automatically between consecutive stages of healthcare delivery without staff intervention.',
    items: [
      'Digital patient registration and intake',
      'Appointment scheduling and confirmations',
      'Automated patient notifications and reminders',
      'Cross-departmental task and referral routing',
      'Post-discharge and follow-up sequences',
    ],
    footer: 'Designed around human ergonomics and clinic procedures rather than rigid software templates.',
  },
  {
    badge: '08. THIRD-PARTY ECOSYSTEM',
    title: 'Third-Party Healthcare Software',
    desc: 'Integrating specialized external vendors including labs, diagnostic services, billing clearinghouses, and telehealth tools.',
    items: [
      'Diagnostic and laboratory interfaces',
      'Telehealth & video consultation connectivity',
      'Medical billing and claim submission clearinghouses',
      'Patient messaging platforms (Twilio, SendGrid)',
      'Healthcare analytics and reporting platforms',
    ],
    footer: 'Seamlessly connects third-party APIs while safeguarding patient confidentiality.',
  },
  {
    badge: '09. CUSTOM LOGIC',
    title: 'Custom Integration Solutions',
    desc: 'When standard healthcare connectors fail to meet technical requirements, we design and build custom middleware, APIs, and transformation pipelines.',
    items: [
      'Custom healthcare integration engines',
      'Proprietary data transformation & logic',
      'Multi-database sync across secure enclaves',
      'Custom webhook listeners and dispatchers',
      'Tailored operational workflows and SLAs',
    ],
    footer: 'Engineered around your exact technology environment and clinical objectives.',
  },
] as const;

function HealthcareServicesSlider() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % HEALTHCARE_INTEGRATION_SERVICES.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + HEALTHCARE_INTEGRATION_SERVICES.length) % HEALTHCARE_INTEGRATION_SERVICES.length);
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
    const diff = (idx - activeSlide + HEALTHCARE_INTEGRATION_SERVICES.length) % HEALTHCARE_INTEGRATION_SERVICES.length;
    if (diff === 0) return 'ft-health-int-slider-card ft-health-int-slider-card--active';
    if (diff === 1) return 'ft-health-int-slider-card ft-health-int-slider-card--next';
    if (diff === HEALTHCARE_INTEGRATION_SERVICES.length - 1) return 'ft-health-int-slider-card ft-health-int-slider-card--prev';
    return 'ft-health-int-slider-card ft-health-int-slider-card--hidden';
  };

  return (
    <section className="ft-health-int-section" aria-label="Core Services">
      <div className="ft-health-int-container">
        <div className="ft-health-int-section__header">
          <span className="ft-health-int-eyebrow">INTEGRATION CAPABILITIES</span>
          <h2 className="ft-health-int-heading">Our Healthcare Software Integration Services</h2>
          <p className="ft-health-int-subheading">
            Byte Operator develops healthcare software integration solutions based on the systems, workflows and technical requirements of each project.
          </p>
        </div>

        {/* 3D Coverflow Carousel */}
        <div
          className="ft-health-int-slider-wrapper"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button
            type="button"
            className="ft-health-int-slider-nav-btn ft-health-int-slider-nav-btn--prev"
            onClick={prevSlide}
            aria-label="Previous service"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <button
            type="button"
            className="ft-health-int-slider-nav-btn ft-health-int-slider-nav-btn--next"
            onClick={nextSlide}
            aria-label="Next service"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          <div className="ft-health-int-slider-stage">
            {HEALTHCARE_INTEGRATION_SERVICES.map((service, idx) => {
              const isActive = idx === activeSlide;
              return (
                <div
                  key={service.title}
                  className={getCardClass(idx)}
                  onClick={() => {
                    if (!isActive) setActiveSlide(idx);
                  }}
                >
                  <div className="ft-health-int-card__header">
                    <span className="ft-health-int-card__badge">{service.badge}</span>
                    <h3 className="ft-health-int-card__title">{service.title}</h3>
                  </div>
                  <p className="ft-health-int-card__desc">{service.desc}</p>
                  <ul className="ft-health-int-card__list">
                    {service.items.map((item, itemIdx) => (
                      <li className="ft-health-int-card__list-item" key={itemIdx}>
                        <span className="ft-health-int-card__list-bullet">&bull;</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="ft-health-int-card__footer">
                    <p className="ft-health-int-card__footer-note">{service.footer}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="ft-health-int-slider-dots">
            {HEALTHCARE_INTEGRATION_SERVICES.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`ft-health-int-slider-dot ${i === activeSlide ? 'ft-health-int-slider-dot--active' : ''}`}
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
   11. HEALTHCARE PROCESS (7 STEPS SCROLL-DRIVEN DECK SLIDER)
========================================================= */

const HEALTHCARE_PROCESS_STEPS = [
  {
    step: '01',
    title: 'Discovery & Requirements Assessment',
    subtitle: 'Systems Scope, Clinical Workflows & Compliance',
    badge: 'Step 01',
    route: '/contact',
    desc: 'Identifying source and destination systems, clinical workflows, data exchange scope, and regulatory obligations.',
  },
  {
    step: '02',
    title: 'Feasibility & System Assessment',
    subtitle: 'APIs, HL7/FHIR Capabilities & Network Boundaries',
    badge: 'Step 02',
    route: '/contact',
    desc: 'Reviewing available APIs, HL7/FHIR support, vendor documentation, authentication models, and network boundaries.',
  },
  {
    step: '03',
    title: 'Architecture & Integration Planning',
    subtitle: 'Data Flow, Schemas, Recovery Queues & Security',
    badge: 'Step 03',
    route: '/contact',
    desc: 'Designing data flow diagrams, API specifications, message transformation logic, error recovery queues, and security controls.',
  },
  {
    step: '04',
    title: 'Integration Development',
    subtitle: 'Connectors, HL7 Interfaces & Middleware Logic',
    badge: 'Step 04',
    route: '/contact',
    desc: 'Engineering custom connectors, HL7 interfaces, FHIR endpoints, and middleware logic according to approved specifications.',
  },
  {
    step: '05',
    title: 'Testing & Clinical Validation',
    subtitle: 'Message Processing, Schema Mapping & Simulation',
    badge: 'Step 05',
    route: '/contact',
    desc: 'Testing message processing, schema mapping, edge cases, error simulations, access permissions, and end-to-end sync.',
  },
  {
    step: '06',
    title: 'Deployment & Go-Live',
    subtitle: 'Live Data Validation, Monitoring & Cutover Support',
    badge: 'Step 06',
    route: '/contact',
    desc: 'Executing deployment schedules, validating production connections, monitoring live data flow, and resolving cutover issues.',
  },
  {
    step: '07',
    title: 'Monitoring & Continuous Improvements',
    subtitle: '24/7 Telemetry, Error Triage & API Updates',
    badge: 'Step 07',
    route: '/contact',
    desc: 'Providing 24/7 telemetry monitoring, error triage, API version updates, interface tuning, and ongoing support.',
  },
] as const;

const PROCESS_ROTATES = ['-1.8deg', '1.4deg', '-0.8deg', '1.9deg', '-1.2deg', '1.5deg', '-1.6deg'];

function HealthcareProcessDeckSlider() {
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
    const targetScroll = sectionTop + (index / (HEALTHCARE_PROCESS_STEPS.length - 1)) * scrollDistance;
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
      const activePosition = progress * (HEALTHCARE_PROCESS_STEPS.length - 1);
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

      setCurrentActiveIndex(clamp(Math.round(activePosition), 0, HEALTHCARE_PROCESS_STEPS.length - 1));
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
    <section ref={sectionRef} className="ft-health-int-experience-section" aria-label="Process">
      <div className="ft-health-int-experience-inner">
        {/* Centered Heading Section */}
        <div className="ft-health-int-experience-heading">
          <span className="ft-health-int-experience-eyebrow">SYSTEMATIC DELIVERY</span>
          <h2 className="ft-health-int-heading">Our Healthcare Software Integration Process</h2>
          <p className="ft-health-int-subheading">
            We follow a structured approach to understanding integration requirements, selecting an appropriate architecture, and developing verified system connections.
          </p>
        </div>

        {/* Stacked Cards List on Scroll */}
        <div className="ft-health-int-experience-list">
          {HEALTHCARE_PROCESS_STEPS.map((step, index) => (
            <article
              key={step.title}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="ft-health-int-experience-item"
              style={{
                ['--experience-card-base-rotate' as any]: PROCESS_ROTATES[index] || '0deg',
              }}
            >
              {/* Circular arrow button on left */}
              <div
                className="ft-health-int-experience-arrow"
                onClick={() => scrollToCard((index + 1) % HEALTHCARE_PROCESS_STEPS.length)}
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
              <div className="ft-health-int-experience-copy">
                <div className="ft-health-int-experience-copy__header">
                  <h3 className="ft-health-int-experience-copy__title">{step.title}</h3>
                  <span className="ft-health-int-experience-copy__subtitle">{step.subtitle}</span>
                </div>
                <p className="ft-health-int-experience-copy__summary">{step.desc}</p>
              </div>

              {/* Side: Badge & Link */}
              <div className="ft-health-int-experience-side">
                <span className="ft-health-int-experience-date">{step.badge}</span>
                <Link href={step.route} className="ft-health-int-experience-link">
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
        <div className="ft-health-int-experience-progress">
          <span className="ft-health-int-experience-counter">
            {String(currentActiveIndex + 1).padStart(2, '0')} / {String(HEALTHCARE_PROCESS_STEPS.length).padStart(2, '0')}
          </span>
          <div className="ft-health-int-experience-dots">
            {HEALTHCARE_PROCESS_STEPS.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                className={`ft-health-int-experience-dot ${dotIdx === currentActiveIndex ? 'ft-health-int-experience-dot--active' : ''}`}
                onClick={() => scrollToCard(dotIdx)}
                aria-label={`Scroll to step ${dotIdx + 1}`}
              />
            ))}
          </div>
          <span className="ft-health-int-experience-hint">Scroll down to explore</span>
        </div>
      </div>
    </section>
  );
}

export function HealthcareIntegrationPageClient() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((current) => (current === index ? null : index));
  };

  return (
    <div className="ft-health-int-page">
      {/* =========================================================
          1. HERO SECTION (2-Line Heading with Exact Font Specs)
      ========================================================= */}
      <section className="ft-health-int-hero">
        <div className="ft-health-int-container">
          <div className="ft-health-int-hero__header">
            <p className="ft-health-int-hero__eyebrow">
              HEALTHCARE INTEROPERABILITY &amp; DATA CONNECTIVITY
            </p>
            <h1 className="ft-health-int-hero__title">
              <span className="ft-health-int-hero__title-line">
                Healthcare Software
              </span>
              <span className="ft-health-int-hero__title-line">
                Integration Services
              </span>
            </h1>

            <div className="ft-health-int-hero__text-group">
              <p className="ft-health-int-hero__lead">
                Healthcare organizations depend on multiple software applications to manage patient information, clinical operations, administrative processes and digital healthcare services. However, when these systems operate independently, exchanging information can become complicated, workflows can become fragmented, and teams may spend unnecessary time managing disconnected applications. Byte Operator provides healthcare software integration services that help connect healthcare applications, systems and data through HL7, FHIR, APIs and custom integration solutions. We help healthcare organizations and health technology companies develop connected software environments that support more consistent data exchange, coordinated workflows and scalable digital operations. Connect your healthcare technology. Simplify your workflows. Build a more integrated digital environment.
              </p>
            </div>

            <div className="ft-health-int-hero__cta-group">
              <CalendlyButton
                label="Discuss Your Integration Project"
                className="ft-health-int-hero__btn-primary"
              />
              <Link
                to="/contact"
                prefetch="intent"
                className="ft-health-int-hero__btn-secondary"
              >
                Contact Our Team &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          2. CHALLENGES & BOTTLENECKS (7 Cards - Trailing Centered)
      ========================================================= */}
      <section className="ft-health-int-section" aria-label="Challenges">
        <div className="ft-health-int-container">
          <div className="ft-health-int-section__header">
            <span className="ft-health-int-eyebrow">CLINICAL &amp; ADMINISTRATIVE BOTTLENECKS</span>
            <h2 className="ft-health-int-heading">Solving the Challenges of Disconnected Healthcare Systems</h2>
            <p className="ft-health-int-subheading">
              Healthcare technology environments often include applications developed by different vendors, systems with different data structures and platforms designed for specific operational requirements. Without appropriate integration, information remains isolated across clinical silos.
            </p>
          </div>

          <div className="ft-health-int-grid-3">
            {/* 1 */}
            <div className="ft-health-int-card">
              <h3 className="ft-health-int-card__title" style={{ marginBottom: '0.875rem' }}>
                Fragmented Patient Information
              </h3>
              <p className="ft-health-int-card__desc">
                Patient records are scattered across EHRs, patient management platforms, laboratory systems, and portals. Integration connects supported applications and makes vital clinical data accessible when and where it is needed.
              </p>
            </div>

            {/* 2 */}
            <div className="ft-health-int-card">
              <h3 className="ft-health-int-card__title" style={{ marginBottom: '0.875rem' }}>
                Manual Data Entry &amp; Repetitive Work
              </h3>
              <p className="ft-health-int-card__desc">
                Disconnected systems require administrative staff to enter duplicate data into multiple applications. Connecting systems reduces repetitive entry, human transcription errors, and record discrepancies.
              </p>
            </div>

            {/* 3 */}
            <div className="ft-health-int-card">
              <h3 className="ft-health-int-card__title" style={{ marginBottom: '0.875rem' }}>
                Disconnected Clinical &amp; Administrative Workflows
              </h3>
              <p className="ft-health-int-card__desc">
                Scheduling, patient registration, clinical documentation, and billing operate across separate platforms. Integration coordinates information exchange between these systems for seamless continuity of care.
              </p>
            </div>

            {/* 4 */}
            <div className="ft-health-int-card">
              <h3 className="ft-health-int-card__title" style={{ marginBottom: '0.875rem' }}>
                Limited Protocol Communication
              </h3>
              <p className="ft-health-int-card__desc">
                Different healthcare applications use different data formats, from legacy HL7 v2 pipes to modern FHIR REST APIs and proprietary vendor hooks. An appropriate architecture bridges these technical protocol gaps.
              </p>
            </div>

            {/* 5 */}
            <div className="ft-health-int-card">
              <h3 className="ft-health-int-card__title" style={{ marginBottom: '0.875rem' }}>
                Legacy Healthcare Infrastructure
              </h3>
              <p className="ft-health-int-card__desc">
                Healthcare organizations depend on established applications with limited integration interfaces. We assess constraints and build custom middleware bridging legacy on-premises databases with modern cloud apps.
              </p>
            </div>

            {/* 6 */}
            <div className="ft-health-int-card">
              <h3 className="ft-health-int-card__title" style={{ marginBottom: '0.875rem' }}>
                Data Synchronization &amp; Consistency
              </h3>
              <p className="ft-health-int-card__desc">
                Differences in field formats, schemas, and update intervals create clinical data inconsistencies. Managed data mapping, normalization, and automated validation maintain synchronicity across systems.
              </p>
            </div>

            {/* 7 (Trailing Card Centered) */}
            <div className="ft-health-int-card">
              <h3 className="ft-health-int-card__title" style={{ marginBottom: '0.875rem' }}>
                Growing Healthcare Tech Ecosystems
              </h3>
              <p className="ft-health-int-card__desc">
                As organizations introduce telehealth, AI diagnostic assistants, and patient engagement apps, system complexity multiplies. A structured integration architecture ensures long-term scalability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          3. OUR HEALTHCARE SOFTWARE INTEGRATION SERVICES (9 Cards Carousel)
      ========================================================= */}
      <HealthcareServicesSlider />

      {/* =========================================================
          4. SYSTEMS & APPLICATIONS WE HELP CONNECT (12 Systems)
      ========================================================= */}
      <section className="ft-health-int-section" aria-label="Systems We Connect">
        <div className="ft-health-int-container">
          <div className="ft-health-int-section__header">
            <span className="ft-health-int-eyebrow">SUPPORTED PLATFORMS &amp; ENVIRONMENTS</span>
            <h2 className="ft-health-int-heading">Healthcare Systems and Applications We Help Connect</h2>
            <p className="ft-health-int-subheading">
              Effective integration depends on understanding how healthcare software operates and what information needs to move across clinical boundaries.
            </p>
          </div>

          <div className="ft-health-int-grid-3">
            {/* 1 */}
            <div className="ft-health-int-card">
              <h3 className="ft-health-int-card__title" style={{ marginBottom: '0.875rem' }}>
                Electronic Health Records (EHR)
              </h3>
              <p className="ft-health-int-card__desc">
                Centralized environments managing comprehensive patient health histories and clinical documentation across hospital departments.
              </p>
            </div>

            {/* 2 */}
            <div className="ft-health-int-card">
              <h3 className="ft-health-int-card__title" style={{ marginBottom: '0.875rem' }}>
                Electronic Medical Records (EMR)
              </h3>
              <p className="ft-health-int-card__desc">
                Clinical records maintained within specialized clinics and medical practices, requiring connectivity with diagnostic tools.
              </p>
            </div>

            {/* 3 */}
            <div className="ft-health-int-card">
              <h3 className="ft-health-int-card__title" style={{ marginBottom: '0.875rem' }}>
                Hospital Information Systems (HIS)
              </h3>
              <p className="ft-health-int-card__desc">
                Enterprise systems supporting hospital operations, patient bed management, staff allocation, and multi-facility administration.
              </p>
            </div>

            {/* 4 */}
            <div className="ft-health-int-card">
              <h3 className="ft-health-int-card__title" style={{ marginBottom: '0.875rem' }}>
                Practice Management Systems
              </h3>
              <p className="ft-health-int-card__desc">
                Applications managing clinic schedules, patient billing records, staff coordination, and front-desk operational workflows.
              </p>
            </div>

            {/* 5 */}
            <div className="ft-health-int-card">
              <h3 className="ft-health-int-card__title" style={{ marginBottom: '0.875rem' }}>
                Laboratory Information Systems (LIS)
              </h3>
              <p className="ft-health-int-card__desc">
                Diagnostic platforms managing test orders, specimen tracking, pathology reports, and automated result delivery to clinical charts.
              </p>
            </div>

            {/* 6 */}
            <div className="ft-health-int-card">
              <h3 className="ft-health-int-card__title" style={{ marginBottom: '0.875rem' }}>
                Radiology Information Systems (RIS)
              </h3>
              <p className="ft-health-int-card__desc">
                Dedicated imaging department software coordinating radiology orders, exam scheduling, radiologist reporting, and billing.
              </p>
            </div>

            {/* 7 */}
            <div className="ft-health-int-card">
              <h3 className="ft-health-int-card__title" style={{ marginBottom: '0.875rem' }}>
                Picture Archiving &amp; PACS (DICOM)
              </h3>
              <p className="ft-health-int-card__desc">
                Medical imaging archives handling X-rays, MRIs, and CT scans, integrated with clinical viewers using DICOM standards.
              </p>
            </div>

            {/* 8 */}
            <div className="ft-health-int-card">
              <h3 className="ft-health-int-card__title" style={{ marginBottom: '0.875rem' }}>
                Telehealth &amp; Remote Care Platforms
              </h3>
              <p className="ft-health-int-card__desc">
                Virtual consultation platforms synchronized with patient schedules, video APIs, and direct chart encounter logging.
              </p>
            </div>

            {/* 9 */}
            <div className="ft-health-int-card">
              <h3 className="ft-health-int-card__title" style={{ marginBottom: '0.875rem' }}>
                Patient Portals &amp; Mobile Health
              </h3>
              <p className="ft-health-int-card__desc">
                Mobile applications giving patients direct access to test results, appointment scheduling, and communication with care teams.
              </p>
            </div>

            {/* 10 */}
            <div className="ft-health-int-card">
              <h3 className="ft-health-int-card__title" style={{ marginBottom: '0.875rem' }}>
                Medical Billing &amp; Claims Systems
              </h3>
              <p className="ft-health-int-card__desc">
                Financial applications coordinating insurance eligibility verification, claims processing, billing codes, and payment gateways.
              </p>
            </div>

            {/* 11 */}
            <div className="ft-health-int-card">
              <h3 className="ft-health-int-card__title" style={{ marginBottom: '0.875rem' }}>
                Healthcare CRM &amp; Engagement
              </h3>
              <p className="ft-health-int-card__desc">
                Platforms managing patient relationship outreach, preventative care reminders, follow-up notifications, and service satisfaction.
              </p>
            </div>

            {/* 12 */}
            <div className="ft-health-int-card">
              <h3 className="ft-health-int-card__title" style={{ marginBottom: '0.875rem' }}>
                Medical Devices &amp; Connected IoT
              </h3>
              <p className="ft-health-int-card__desc">
                Biometric monitors and connected health sensors feeding live telemetry into clinical data repositories under strict protocol validation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          5. INTEROPERABILITY STANDARDS & COMPARISON TABLE
      ========================================================= */}
      <section className="ft-health-int-section" aria-label="Interoperability">
        <div className="ft-health-int-container">
          <div className="ft-health-int-section__header">
            <span className="ft-health-int-eyebrow">INTEROPERABILITY STANDARDS</span>
            <h2 className="ft-health-int-heading">Healthcare Interoperability and Connected Data Exchange</h2>
            <p className="ft-health-int-subheading">
              Simply connecting two applications does not create effective interoperability. Systems must exchange information using compatible formats, understand data semantics, and process updates reliably.
            </p>
          </div>

          {/* HL7 v2 vs FHIR Comparison Table */}
          <div className="ft-health-int-table-wrap">
            <table className="ft-health-int-table">
              <thead>
                <tr>
                  <th style={{ width: '22%' }}>Dimension</th>
                  <th style={{ width: '39%' }}>HL7 v2 Standard</th>
                  <th style={{ width: '39%' }}>HL7 FHIR Standard</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ fontWeight: 600, color: '#f8fafc' }}>General approach</td>
                  <td>Message-based exchange (delimited pipe syntax)</td>
                  <td>Resource-based data exchange (JSON / XML)</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600, color: '#f8fafc' }}>Common integration pattern</td>
                  <td>Healthcare socket messaging &amp; MLLP protocol</td>
                  <td>RESTful API-oriented HTTP web services</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600, color: '#f8fafc' }}>Data representation</td>
                  <td>Structured segment messages (e.g. MSH, PID, PV1)</td>
                  <td>Defined healthcare resources (e.g. Patient, Observation)</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600, color: '#f8fafc' }}>Typical use</td>
                  <td>Established inpatient hospital &amp; clinical workflows</td>
                  <td>Modern web applications, mobile apps, and cloud APIs</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600, color: '#f8fafc' }}>Implementation requirements</td>
                  <td>Message specifications, custom segment parsing</td>
                  <td>FHIR versions (R4/R5), implementation guides, OAuth2</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="ft-health-int-grid-3" style={{ marginTop: '3rem' }}>
            <div className="ft-health-int-card">
              <span className="ft-health-int-table-badge" style={{ marginBottom: '1rem' }}>HL7 v2 PIPELINES</span>
              <h3 className="ft-health-int-card__title" style={{ marginBottom: '0.875rem' }}>
                HL7 v2 Messaging
              </h3>
              <p className="ft-health-int-card__desc">
                Widely used for transactional hospital messaging including ADT (admissions, transfers), ORM (orders), and ORU (clinical results) across legacy and modern inpatient systems.
              </p>
            </div>

            <div className="ft-health-int-card">
              <span className="ft-health-int-table-badge" style={{ marginBottom: '1rem' }}>FHIR REST APIS</span>
              <h3 className="ft-health-int-card__title" style={{ marginBottom: '0.875rem' }}>
                FHIR API Integration
              </h3>
              <p className="ft-health-int-card__desc">
                Resource-based interoperability allowing web apps, portals, and AI systems to query granular resources like Patient, Practitioner, Condition, and MedicationStatement.
              </p>
            </div>

            <div className="ft-health-int-card">
              <span className="ft-health-int-table-badge" style={{ marginBottom: '1rem' }}>SPECIALIZED STANDARDS</span>
              <h3 className="ft-health-int-card__title" style={{ marginBottom: '0.875rem' }}>
                CDA &amp; DICOM Protocols
              </h3>
              <p className="ft-health-int-card__desc">
                Clinical Document Architecture (CDA) for structured medical summaries and DICOM for high-resolution radiology imaging transmission and PACS archiving.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          6. ARCHITECTURE PATTERNS (8 Cards - Centered Last 2)
      ========================================================= */}
      <section className="ft-health-int-section" aria-label="Architecture">
        <div className="ft-health-int-container">
          <div className="ft-health-int-section__header">
            <span className="ft-health-int-eyebrow">SYSTEM ARCHITECTURE</span>
            <h2 className="ft-health-int-heading">Designing Scalable Healthcare Integration Architecture</h2>
            <p className="ft-health-int-subheading">
              Healthcare integration architecture determines how applications communicate, how data moves between systems and how integration components are managed over time.
            </p>
          </div>

          <div className="ft-health-int-grid-3">
            {/* 1 */}
            <div className="ft-health-int-card">
              <h3 className="ft-health-int-card__title" style={{ marginBottom: '0.875rem' }}>
                Point-to-Point Integration
              </h3>
              <p className="ft-health-int-card__desc">
                Direct connections between two specific systems. Practical for focused, small-scale deployments without requiring complex middleware infrastructure.
              </p>
            </div>

            {/* 2 */}
            <div className="ft-health-int-card">
              <h3 className="ft-health-int-card__title" style={{ marginBottom: '0.875rem' }}>
                API-Led Integration Architecture
              </h3>
              <p className="ft-health-int-card__desc">
                Structured RESTful endpoints establishing clean contracts between software platforms, fostering reusable components and controlled access.
              </p>
            </div>

            {/* 3 */}
            <div className="ft-health-int-card">
              <h3 className="ft-health-int-card__title" style={{ marginBottom: '0.875rem' }}>
                Middleware-Based Integration
              </h3>
              <p className="ft-health-int-card__desc">
                An intermediary processing layer handling data routing, format transformation, error isolation, and centralized integration governance.
              </p>
            </div>

            {/* 4 */}
            <div className="ft-health-int-card">
              <h3 className="ft-health-int-card__title" style={{ marginBottom: '0.875rem' }}>
                Healthcare Integration Engines
              </h3>
              <p className="ft-health-int-card__desc">
                Specialized interface engines configured for high-throughput message parsing, validation, and queue routing across hospital endpoints.
              </p>
            </div>

            {/* 5 */}
            <div className="ft-health-int-card">
              <h3 className="ft-health-int-card__title" style={{ marginBottom: '0.875rem' }}>
                Centralized vs. Distributed Models
              </h3>
              <p className="ft-health-int-card__desc">
                Architectural design balancing centralized enterprise governance with distributed microservice flexibility based on institutional scale.
              </p>
            </div>

            {/* 6 */}
            <div className="ft-health-int-card">
              <h3 className="ft-health-int-card__title" style={{ marginBottom: '0.875rem' }}>
                Event-Driven Integration
              </h3>
              <p className="ft-health-int-card__desc">
                Real-time triggers and webhooks initiating processing the moment a clinical event occurs, replacing slow and inefficient polling schedules.
              </p>
            </div>

            {/* 7 (Centered on Row 3) */}
            <div className="ft-health-int-card">
              <h3 className="ft-health-int-card__title" style={{ marginBottom: '0.875rem' }}>
                Real-Time vs. Batch Data Pipelines
              </h3>
              <p className="ft-health-int-card__desc">
                Combining instantaneous message delivery for urgent patient events with scheduled bulk batch reconciliation for heavy historical records.
              </p>
            </div>

            {/* 8 (Centered on Row 3) */}
            <div className="ft-health-int-card">
              <h3 className="ft-health-int-card__title" style={{ marginBottom: '0.875rem' }}>
                Hybrid On-Premise &amp; Cloud
              </h3>
              <p className="ft-health-int-card__desc">
                Secure connectivity bridging on-premises legacy hospital servers and cloud platforms (AWS, Google Cloud) via VPN tunnels and private endpoints.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          7. TECHNOLOGIES SPLIT SECTION (2-Col Reference Layout)
      ========================================================= */}
      <section className="ft-health-int-section" aria-label="Technologies We Use">
        <div className="ft-health-int-container">
          <div className="ft-health-int-tech-split">
            {/* Left Column: Heading & Comprehensive Overview */}
            <div className="ft-health-int-tech-split__left">
              <span className="ft-health-int-tech-split__eyebrow">
                Platforms &amp; Technologies
              </span>
              <h2 className="ft-health-int-tech-split__title">
                We Build Across Leading Healthcare Protocols &amp; Cloud Infrastructure
              </h2>
              <div className="ft-health-int-tech-split__desc">
                <p>
                  Healthcare integration requires specialized standards, healthcare-specific cloud infrastructure, and resilient data processing pipelines. We select technologies based on your institution&apos;s existing systems rather than forcing a generic stack.
                </p>
                <p>
                  Our healthcare engineering stack encompasses HL7 v2 (ADT, ORM, ORU), HL7 FHIR (R4/R5), DICOM PACS, Python, TypeScript, Node.js, and PostgreSQL, deployed across secure cloud infrastructure on AWS HealthLake, Google Cloud Healthcare API, Docker, and Kubernetes.
                </p>
              </div>
            </div>

            {/* Right Column: 3-Column Logo Grid */}
            <div className="ft-health-int-tech-split__right">
              {HEALTHCARE_TECH_LOGOS.map((tech) => (
                <div key={tech.alt} className="ft-health-int-tech-logo-item">
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
          8. SECURITY, PRIVACY & HIPAA COMPLIANCE (7 Cards)
      ========================================================= */}
      <section className="ft-health-int-section" aria-label="Security and Privacy">
        <div className="ft-health-int-container">
          <div className="ft-health-int-section__header">
            <span className="ft-health-int-eyebrow">REGULATORY SAFEGUARDS</span>
            <h2 className="ft-health-int-heading">Security and Privacy Considerations in Healthcare Integration</h2>
            <p className="ft-health-int-subheading">
              Healthcare applications handle sensitive protected health information (PHI). Security and privacy are foundational to every stage of our integration architecture.
            </p>
          </div>

          <div className="ft-health-int-grid-3">
            {/* 1 */}
            <div className="ft-health-int-card">
              <h3 className="ft-health-int-card__title" style={{ marginBottom: '0.875rem' }}>
                Secure Data Transmission
              </h3>
              <p className="ft-health-int-card__desc">
                All data in motion is protected with modern TLS 1.3 encryption, mutual TLS (mTLS) certificate verification, and dedicated VPN tunnels.
              </p>
            </div>

            {/* 2 */}
            <div className="ft-health-int-card">
              <h3 className="ft-health-int-card__title" style={{ marginBottom: '0.875rem' }}>
                Authentication &amp; Authorization
              </h3>
              <p className="ft-health-int-card__desc">
                Robust identity verification using OAuth 2.0, SMART on FHIR authorization profiles, cryptographic token rotation, and strict credential scoping.
              </p>
            </div>

            {/* 3 */}
            <div className="ft-health-int-card">
              <h3 className="ft-health-int-card__title" style={{ marginBottom: '0.875rem' }}>
                Role-Based Access Control (RBAC)
              </h3>
              <p className="ft-health-int-card__desc">
                Enforcing the principle of least privilege, ensuring clinical staff, administrative personnel, and automated services access only authorized data.
              </p>
            </div>

            {/* 4 */}
            <div className="ft-health-int-card">
              <h3 className="ft-health-int-card__title" style={{ marginBottom: '0.875rem' }}>
                Healthcare Data Encryption at Rest
              </h3>
              <p className="ft-health-int-card__desc">
                Database records, intermediate integration queues, and file repositories are encrypted with industry-standard AES-256 cryptographic keys.
              </p>
            </div>

            {/* 5 */}
            <div className="ft-health-int-card">
              <h3 className="ft-health-int-card__title" style={{ marginBottom: '0.875rem' }}>
                Immutable Audit Logging
              </h3>
              <p className="ft-health-int-card__desc">
                Detailed telemetry logging every message received, transformed, and dispatched, providing accountability and compliance traceability.
              </p>
            </div>

            {/* 6 */}
            <div className="ft-health-int-card">
              <h3 className="ft-health-int-card__title" style={{ marginBottom: '0.875rem' }}>
                HIPAA &amp; HITECH Compliance
              </h3>
              <p className="ft-health-int-card__desc">
                Architectures built to satisfy HIPAA Security, Privacy, and Breach Notification rules, incorporating safeguards required by covered entities.
              </p>
            </div>

            {/* 7 (Trailing Card Centered) */}
            <div className="ft-health-int-card">
              <h3 className="ft-health-int-card__title" style={{ marginBottom: '0.875rem' }}>
                Business Associate Agreements (BAAs)
              </h3>
              <p className="ft-health-int-card__desc">
                We establish formal BAAs outlining legal responsibilities, administrative safeguards, and technical controls for handling protected health information.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          9. USE CASES (9 Cards)
      ========================================================= */}
      <section className="ft-health-int-section" aria-label="Use Cases">
        <div className="ft-health-int-container">
          <div className="ft-health-int-section__header">
            <span className="ft-health-int-eyebrow">PRACTICAL IMPLEMENTATIONS</span>
            <h2 className="ft-health-int-heading">Healthcare Software Integration Use Cases</h2>
            <p className="ft-health-int-subheading">
              Real-world operational scenarios demonstrating how integrated healthcare applications create connected clinical environments.
            </p>
          </div>

          <div className="ft-health-int-grid-3">
            {/* 1 */}
            <div className="ft-health-int-card">
              <h3 className="ft-health-int-card__title" style={{ marginBottom: '0.875rem' }}>
                EHR Integration With Patient Apps
              </h3>
              <p className="ft-health-int-card__desc">
                Connecting mobile patient applications with backend EHRs for live appointment booking, chart access, and prescription refill tracking.
              </p>
            </div>

            {/* 2 */}
            <div className="ft-health-int-card">
              <h3 className="ft-health-int-card__title" style={{ marginBottom: '0.875rem' }}>
                Hospital System Integration
              </h3>
              <p className="ft-health-int-card__desc">
                Coordinating communications across inpatient wards, emergency rooms, surgery scheduling, and administrative departments.
              </p>
            </div>

            {/* 3 */}
            <div className="ft-health-int-card">
              <h3 className="ft-health-int-card__title" style={{ marginBottom: '0.875rem' }}>
                Laboratory Systems &amp; Clinical Apps
              </h3>
              <p className="ft-health-int-card__desc">
                Exchanging diagnostic test orders (ORM) and returning observation reports (ORU) directly into electronic patient charts automatically.
              </p>
            </div>

            {/* 4 */}
            <div className="ft-health-int-card">
              <h3 className="ft-health-int-card__title" style={{ marginBottom: '0.875rem' }}>
                Telehealth &amp; Clinical Software
              </h3>
              <p className="ft-health-int-card__desc">
                Synchronizing virtual visit calendars, video platform links, and post-consultation encounter notes with existing clinic records.
              </p>
            </div>

            {/* 5 */}
            <div className="ft-health-int-card">
              <h3 className="ft-health-int-card__title" style={{ marginBottom: '0.875rem' }}>
                Patient Portals &amp; Central EHR
              </h3>
              <p className="ft-health-int-card__desc">
                Bridging secure web portals with clinical repositories to allow patients to review laboratory findings and message physicians securely.
              </p>
            </div>

            {/* 6 */}
            <div className="ft-health-int-card">
              <h3 className="ft-health-int-card__title" style={{ marginBottom: '0.875rem' }}>
                Scheduling &amp; Practice Management
              </h3>
              <p className="ft-health-int-card__desc">
                Connecting online booking portals with practice calendars to eliminate double-booking and synchronize provider availability.
              </p>
            </div>

            {/* 7 */}
            <div className="ft-health-int-card">
              <h3 className="ft-health-int-card__title" style={{ marginBottom: '0.875rem' }}>
                Billing &amp; Administrative Systems
              </h3>
              <p className="ft-health-int-card__desc">
                Coordinating clinical encounters with billing clearinghouses, automating ICD-10 / CPT code submission and claims status tracking.
              </p>
            </div>

            {/* 8 */}
            <div className="ft-health-int-card">
              <h3 className="ft-health-int-card__title" style={{ marginBottom: '0.875rem' }}>
                Custom Healthcare Apps &amp; APIs
              </h3>
              <p className="ft-health-int-card__desc">
                Connecting proprietary digital health platforms with third-party clinical services via secure REST and FHIR endpoints.
              </p>
            </div>

            {/* 9 */}
            <div className="ft-health-int-card">
              <h3 className="ft-health-int-card__title" style={{ marginBottom: '0.875rem' }}>
                Connected Data &amp; Workflow Automation
              </h3>
              <p className="ft-health-int-card__desc">
                Enabling event-driven workflows where an update in one clinical system initiates automated follow-ups, triage, and task routing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          10. COMMON CHALLENGES & PRACTICAL APPROACH TABLE
      ========================================================= */}
      <section className="ft-health-int-section" aria-label="Challenges Table">
        <div className="ft-health-int-container">
          <div className="ft-health-int-section__header">
            <span className="ft-health-int-eyebrow">RISK MITIGATION</span>
            <h2 className="ft-health-int-heading">Common Healthcare Integration Challenges and How to Address Them</h2>
            <p className="ft-health-int-subheading">
              Healthcare integration projects involve technical, operational, and vendor-related complexities. Identifying these obstacles early establishes a realistic, dependable roadmap.
            </p>
          </div>

          <div className="ft-health-int-table-wrap">
            <table className="ft-health-int-table">
              <thead>
                <tr>
                  <th style={{ width: '35%' }}>Integration Challenge</th>
                  <th style={{ width: '65%' }}>Byte Operator Practical Approach</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ fontWeight: 600, color: '#f8fafc' }}>Legacy healthcare applications</td>
                  <td>Assess existing database interfaces, file feeds, and socket ports to build modern API adapters.</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600, color: '#f8fafc' }}>Disparate healthcare data formats</td>
                  <td>Implement custom ETL transformation layers, schema normalization, and automated validation rules.</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600, color: '#f8fafc' }}>HL7 and FHIR version incompatibilities</td>
                  <td>Analyze message specs and profile versions (R4/R5) to build bidirectional translation bridges.</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600, color: '#f8fafc' }}>Restricted or proprietary API access</td>
                  <td>Evaluate vendor developer documentation, database triggers, and certified partner integrations.</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600, color: '#f8fafc' }}>Duplicate patient records</td>
                  <td>Incorporate deterministic and probabilistic patient identity matching algorithms to avoid split records.</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600, color: '#f8fafc' }}>Data synchronization failures</td>
                  <td>Deploy idempotent queues, change data capture (CDC), and automated reconciliation routines.</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600, color: '#f8fafc' }}>Strict regulatory compliance (HIPAA)</td>
                  <td>Enforce end-to-end encryption (TLS 1.3 / AES-256), tokenized access, and immutable audit trails.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* =========================================================
          11. DEVELOPMENT PROCESS (7 Steps Scroll-Driven Deck)
      ========================================================= */}
      <HealthcareProcessDeckSlider />

      {/* =========================================================
          12. WHY CHOOSE BYTE OPERATOR (6 Cards)
      ========================================================= */}
      <section className="ft-health-int-section" aria-label="Why Choose Us">
        <div className="ft-health-int-container">
          <div className="ft-health-int-section__header">
            <span className="ft-health-int-eyebrow">THE BYTE OPERATOR ADVANTAGE</span>
            <h2 className="ft-health-int-heading">Why Choose Byte Operator for Healthcare Software Integration?</h2>
            <p className="ft-health-int-subheading">
              Healthcare integration requires understanding how medical systems exchange data, how records are structured, and how software supports patient care.
            </p>
          </div>

          <div className="ft-health-int-grid-3">
            {/* 1 */}
            <div className="ft-health-int-card">
              <h3 className="ft-health-int-card__title" style={{ marginBottom: '0.875rem' }}>
                Healthcare-Focused Solutions
              </h3>
              <p className="ft-health-int-card__desc">
                We engineer integration architectures tailored to clinical procedures, patient privacy, and healthcare operational workflows.
              </p>
            </div>

            {/* 2 */}
            <div className="ft-health-int-card">
              <h3 className="ft-health-int-card__title" style={{ marginBottom: '0.875rem' }}>
                HL7 and FHIR Expertise
              </h3>
              <p className="ft-health-int-card__desc">
                Deep technical proficiency in HL7 v2 messaging, FHIR RESTful resources, and healthcare data transformation standards.
              </p>
            </div>

            {/* 3 */}
            <div className="ft-health-int-card">
              <h3 className="ft-health-int-card__title" style={{ marginBottom: '0.875rem' }}>
                Custom API &amp; App Connectivity
              </h3>
              <p className="ft-health-int-card__desc">
                We develop purpose-built API connectors and middleware when off-the-shelf tools fail to support specialized clinical workflows.
              </p>
            </div>

            {/* 4 */}
            <div className="ft-health-int-card">
              <h3 className="ft-health-int-card__title" style={{ marginBottom: '0.875rem' }}>
                Workflow-Driven Architecture
              </h3>
              <p className="ft-health-int-card__desc">
                We focus on how clinical teams and patients interact with systems, ensuring integration simplifies human work rather than complicating it.
              </p>
            </div>

            {/* 5 */}
            <div className="ft-health-int-card">
              <h3 className="ft-health-int-card__title" style={{ marginBottom: '0.875rem' }}>
                Scalable, Maintainable Infrastructure
              </h3>
              <p className="ft-health-int-card__desc">
                Comprehensive documentation, automated tests, and modular architecture ensure integrations adapt as vendor systems evolve.
              </p>
            </div>

            {/* 6 */}
            <div className="ft-health-int-card">
              <h3 className="ft-health-int-card__title" style={{ marginBottom: '0.875rem' }}>
                A Long-Term Technology Partner
              </h3>
              <p className="ft-health-int-card__desc">
                Beyond individual connections, we support broader digital health initiatives involving custom software, AI workflows, and cloud architecture.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          13. FREQUENTLY ASKED QUESTIONS (Two-Column Sticky Accordion)
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
                  Healthcare Software Integration FAQs
                </h2>
                <p className="ft-home-faqs__subtitle">
                  Find clear answers to common questions about EHR/EMR connectivity, HL7 messaging, FHIR APIs, HIPAA compliance, and integration planning.
                </p>
              </div>

              <div className="ft-home-faqs__callout">
                <h3 className="ft-home-faqs__callout-title">
                  Have questions about your clinical systems?
                </h3>
                <p className="ft-home-faqs__callout-text">
                  Our healthcare integration architects can evaluate your software endpoints, HL7/FHIR interfaces, and interoperability roadmap during a discovery consultation.
                </p>
                <CalendlyButton
                  label="Speak with our engineering team &rarr;"
                  className="ft-home-faqs__callout-btn"
                />
              </div>
            </div>

            {/* Right Column: 20 Interactive Accordion Items */}
            <div className="ft-home-faqs__right">
              {HEALTHCARE_FAQS.map((faq, index) => {
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
                          color: isOpen ? '#38bdf8' : '#94a3b8',
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
          14. FINAL CONVERSION CTA BLOCK
      ========================================================= */}
      <ServiceFinalCta
        eyebrow="HEALTHCARE SYSTEM INTEGRATION"
        title="Let's Connect Your Healthcare Systems"
        description="Your healthcare applications should work together to support the people, processes, and services that depend on them. Byte Operator helps healthcare organizations develop connected software environments through HL7, FHIR, API, and custom integration solutions."
        tagline="Let's discuss your healthcare integration project with our engineering team."
        primaryButtonLabel="Discuss Your Integration Project"
        secondaryButtonLabel="Contact Byte Operator →"
        secondaryButtonHref="/contact"
        pillars={[
          {
            title: 'HL7 & FHIR Standards',
            description:
              'Bi-directional interoperability connecting electronic health records, diagnostic labs, and external medical portals.',
          },
          {
            title: 'EHR / EMR Integrations',
            description:
              'Direct API connectivity with Epic, Cerner, Athenahealth, eClinicalWorks, ModMed, and proprietary systems.',
          },
          {
            title: 'HIPAA & Compliance Scoping',
            description:
              'Cryptographic in-transit encryption, automated schema validation, and complete audit logging for regulatory compliance.',
          },
        ]}
      />
    </div>
  );
}
