'use client';

import {useEffect, useRef, useState} from 'react';
import {Link} from '~/lib/router-compat';
import {CalendlyButton} from '~/components/shared/CalendlyButton';
import {ServiceFinalCta} from '~/components/shared/ServiceFinalCta';

/* =========================================================
   DATA DEFINITIONS
========================================================= */

const CORE_SERVICES = [
  {
    badge: 'Application Engineering',
    title: 'Custom Healthcare Application Development',
    desc: 'Every healthcare organization has different operational requirements. A clinic may need a purpose-built internal application, while a larger healthcare business may require software that connects multiple teams, processes or existing systems. Byte Operator develops custom healthcare applications designed around your workflows, business requirements and intended users.',
    checklist: [
      'Patient-facing digital experiences and secure self-service portals.',
      'Internal administrative and operational process tools.',
      'Staff, clinician and facility resource management.',
      'Specialized healthcare business and clinical workflows.',
      'Custom operational dashboards, analytics and compliance reporting.',
      'Bi-directional connections between your existing software systems.',
    ],
    image: 'https://cdn.shopify.com/s/files/1/0676/1155/7936/files/application_engineering.webp?v=1794782203',
    imageAlt: 'Custom Healthcare Application Development - Application Engineering',
    reversed: false,
  },
  {
    badge: 'AI Capabilities',
    title: 'AI-Powered Healthcare Application Development',
    desc: 'Artificial intelligence introduces transformative capabilities into healthcare software when properly applied to real operational use cases. Byte Operator integrates intelligent models and context-aware agents into custom applications to support administrative efficiency, information processing, and data understanding.',
    checklist: [
      'AI-powered assistants and conversational intake interfaces.',
      'Clinical document and administrative record summarization.',
      'Intelligent information retrieval from approved medical knowledge bases.',
      'Automated data classification and structured field extraction.',
      'AI-assisted administrative support and task prioritization.',
      'Retrieval-augmented generation (RAG) connected to organizational records.',
    ],
    note: 'Where an AI-generated output affects an important decision, our software incorporates suitable human review checkpoints. AI features are built to support qualified healthcare professionals, not replace clinical judgment.',
    image: 'https://cdn.shopify.com/s/files/1/0676/1155/7936/files/ai_capabilities.webp?v=1794782418',
    imageAlt: 'AI-Powered Healthcare Application Development - AI Capabilities',
    reversed: true,
  },
  {
    badge: 'Workflow Automation',
    title: 'Healthcare Workflow Automation',
    desc: 'Manual administrative tasks consume valuable clinical time. Repetitive information processing, patient notifications, internal handoffs and disconnected applications create operational drag. We develop custom workflow automation to connect supported platforms and coordinate defined healthcare processes.',
    checklist: [
      'Administrative task routing and inter-departmental alerts.',
      'Automated data synchronization between connected clinical systems.',
      'Scheduled patient notifications, reminders and status updates.',
      'Intelligent document intake and validation workflows.',
      'Internal approval chains and multi-stage request processing.',
      'Error handling, automated retries and exception logging.',
    ],
    linkText: 'Explore our AI Automations & Agents service →',
    linkHref: '/services/ai-workflow-automation-healthcare',
    image: 'https://cdn.shopify.com/s/files/1/0676/1155/7936/files/workflow_automation.webp?v=1794782677',
    imageAlt: 'Healthcare Workflow Automation - Operational Task Orchestration',
    reversed: false,
  },
  {
    badge: 'API Connectivity',
    title: 'Healthcare API and Third-Party Integrations',
    desc: 'Healthcare organizations rely on diverse software platforms for their daily activities. Connecting supported systems breaks down information silos and improves data liquidity across clinics, labs, billing providers and telehealth environments.',
    checklist: [
      'Custom RESTful API and GraphQL service development.',
      'Third-party practice management and clinical platform connectivity.',
      'Secure database synchronization (PostgreSQL, SQL Server, MySQL).',
      'Event-driven webhook pipelines for real-time automation.',
      'Automated bi-directional data flow between legacy and modern tools.',
      'Technical assessment of third-party interfaces, permissions and limitations.',
    ],
    note: 'Integration feasibility depends on the APIs, access permissions and documentation provided by each third-party platform. We thoroughly evaluate all interfaces during technical discovery.',
    image: 'https://cdn.shopify.com/s/files/1/0676/1155/7936/files/api_integrations.webp?v=1794782862',
    imageAlt: 'Healthcare API and Third-Party Integrations - Connected Data Liquidity',
    reversed: true,
  },
] as const;

const SOFTWARE_TYPES = [
  {
    title: 'Patient-Facing Applications',
    desc: 'Digital web and mobile experiences designed to provide patients with convenient access to services, appointment bookings, secure messaging, medical records, and digital intake forms.',
  },
  {
    title: 'Clinic & Practice Management Applications',
    desc: 'Purpose-built software designed to streamline administrative operations, staff scheduling, clinical workflow coordination, patient tracking, and operational dashboards for private medical clinics.',
  },
  {
    title: 'Hospital Administrative Applications',
    desc: 'Scalable multi-departmental platforms engineered for complex hospital operations, multi-tier user role permissions, department coordination, patient transfer workflows, and high-volume data reporting.',
  },
  {
    title: 'Healthcare Staff & Internal Management Tools',
    desc: 'Internal tooling that centralizes clinical knowledge, organizes departmental requests, tracks task handoffs, and eliminates manual paperwork for clinical and administrative teams.',
  },
  {
    title: 'AI-Enabled Healthcare Business Applications',
    desc: 'Modern healthcare applications embedding natural language processing, intelligent document parsing, context-aware assistants, and automated data pipelines into everyday business workflows.',
  },
] as const;

const INTEGRATION_PILLARS = [
  {
    title: 'Custom API Development',
    desc: 'We architect robust, documented APIs that enable supported healthcare software systems to securely exchange structured data and trigger critical business services.',
  },
  {
    title: 'Third-Party Software Connectivity',
    desc: 'We connect your applications with external platforms, lab services, billing systems, and communication gateways when approved APIs and credentials are available.',
  },
  {
    title: 'Database Integration',
    desc: 'We design reliable data pipelines between applications and supported SQL or NoSQL databases, maintaining data integrity, referential consistency, and audit trails.',
  },
  {
    title: 'Webhook-Based Workflows',
    desc: 'We configure event-driven webhook architectures that trigger instantaneous actions between applications whenever a patient event, form submission, or status change occurs.',
  },
  {
    title: 'Existing System Assessment',
    desc: 'We evaluate the technical environment, legacy codebases, database schemas, and interface limitations of your existing software before recommending an integration roadmap.',
  },
  {
    title: 'EHR and EMR Integration Feasibility',
    desc: 'If your project requires an electronic health record (EHR) connection, we assess vendor APIs, HL7/FHIR interfaces, authentication requirements, and permitted read/write scopes during discovery.',
  },
] as const;

const ORGANIZATIONS_SUPPORTED = [
  {
    title: 'Hospitals and Healthcare Networks',
    desc: 'Support departmental operations through enterprise custom web applications, multi-role clinical dashboards, and complex workflow automation.',
  },
  {
    title: 'Medical Clinics and Private Practices',
    desc: 'Develop software built around clinic-specific workflows, staff coordination, internal practice management, and modern digital patient touchpoints.',
  },
  {
    title: 'Specialty Healthcare Organizations',
    desc: 'Engineer applications tailored to specialized operational procedures for dental practices, dermatology centers, physical therapy, and ophthalmology clinics.',
  },
  {
    title: 'Digital Health Businesses',
    desc: 'Build scalable software products, telehealth platforms, custom portals, and AI-powered digital healthcare tools from technical architecture to launch.',
  },
  {
    title: 'Healthcare Technology Startups',
    desc: 'Translate ambitious healthcare product concepts into production-ready software with modern engineering, AI integrations, and resilient architecture.',
  },
] as const;

const DEVELOPMENT_PROCESS = [
  {
    step: '01',
    title: 'Discovery & Requirements Analysis',
    text: 'We analyze your organization, clinical workflows, user personas, existing software tools, and project goals to define functional and integration scope.',
  },
  {
    step: '02',
    title: 'Software Architecture & Planning',
    text: 'We plan the technical structure of the application—database schemas, API contracts, security boundaries, AI components, and cloud infrastructure.',
  },
  {
    step: '03',
    title: 'UI/UX Design & Prototyping',
    text: 'We design intuitive, accessible user interfaces tailored to healthcare professionals and patients, validating flows with wireframes and interactive prototypes.',
  },
  {
    step: '04',
    title: 'Custom Development & Integration',
    text: 'Our engineering team writes clean, modular, maintainable code, integrating agreed third-party APIs, AI models, and workflow automation logic.',
  },
  {
    step: '05',
    title: 'Testing & Quality Assurance',
    text: 'We execute comprehensive functionality, performance, integration, and security tests to ensure all user workflows perform reliably under real-world loads.',
  },
  {
    step: '06',
    title: 'Deployment & Ongoing Improvements',
    text: 'We deploy the application to your secure cloud environment, establish monitoring telemetry, and provide continuous technical support and feature evolution.',
  },
] as const;

const SECURITY_CONSIDERATIONS = [
  {
    title: 'User Authentication & Access Controls',
    desc: 'Implement multi-factor authentication (MFA), OAuth 2.0 / SAML single sign-on, and session management to verify user identity securely.',
  },
  {
    title: 'Role-Based Access Control (RBAC)',
    desc: 'Enforce granular permissions ensuring clinicians, administrators, and staff access only the specific data required for their authorized role.',
  },
  {
    title: 'Secure System Communication',
    desc: 'Encrypt all data in transit using TLS 1.3 encryption across APIs, database connections, and external service integrations.',
  },
  {
    title: 'Hardened Data Storage & Handling',
    desc: 'Employ AES-256 encryption at rest, secure credential management, encrypted database backups, and sanitized data handling pipelines.',
  },
  {
    title: 'Testing & Vulnerability Assessment',
    desc: 'Conduct automated code scanning, dependency audits, and penetration testing to identify and remediate potential security vulnerabilities.',
  },
  {
    title: 'Audit Logging & Monitoring',
    desc: 'Maintain immutable audit logs tracking user authentications, record access, system modifications, and error events for accountability.',
  },
  {
    title: 'AI Data Access Scoping',
    desc: 'Strictly isolate AI model queries so that third-party language models only receive authorized, scoped context and do not train on sensitive records.',
  },
  {
    title: 'Human Review for Critical Workflows',
    desc: 'Architect manual confirmation gates before any consequential clinical, administrative, or financial change is permanently committed.',
  },
] as const;

const ADVANTAGES = [
  {
    title: 'Custom-Built Solutions',
    subtitle: 'Tailored Clinical Processes & User Experiences',
    badge: 'Advantage 01',
    route: '/contact',
    desc: 'Every application is designed from scratch around your specific clinical processes, team workflows, and user requirements.',
  },
  {
    title: 'AI Application Capabilities',
    subtitle: 'Context-Aware Agents & Integrated RAG Pipelines',
    badge: 'Advantage 02',
    route: '/contact',
    desc: 'We integrate established AI models, context-aware agents, and RAG pipelines where they deliver genuine operational utility.',
  },
  {
    title: 'Workflow Automation Expertise',
    subtitle: 'Automated Multi-System Background Orchestration',
    badge: 'Advantage 03',
    route: '/contact',
    desc: 'We engineer automated background workflows that synchronize data between systems and eliminate repetitive operational tasks.',
  },
  {
    title: 'API & Third-Party Integrations',
    subtitle: 'Secure Bidirectional EHR & Database Connectivity',
    badge: 'Advantage 04',
    route: '/contact',
    desc: 'We build secure connections that enable your custom application to communicate fluidly with existing software and databases.',
  },
  {
    title: 'Structured Engineering Process',
    subtitle: 'Architectural Rigor, QA & Enterprise Deployment',
    badge: 'Advantage 05',
    route: '/contact',
    desc: 'From architectural planning through QA and deployment, we adhere to rigorous software engineering best practices.',
  },
  {
    title: 'Solutions Designed to Evolve',
    subtitle: 'Modular Architectures Engineered for Scale',
    badge: 'Advantage 06',
    route: '/contact',
    desc: 'We build modular, maintainable software architectures that scale effortlessly as your organization expands its operations.',
  },
] as const;

const FAQS = [
  {
    number: '01',
    question: 'What is custom healthcare software development?',
    answer:
      'Custom healthcare software development is the process of designing and building applications around the specific requirements of healthcare organizations. These applications may support administrative operations, digital services, internal workflows, information management and connections with other software systems.',
  },
  {
    number: '02',
    question: 'What types of healthcare applications can Byte Operator develop?',
    answer:
      'Byte Operator develops custom healthcare applications based on project requirements. Potential solutions include patient-facing applications, clinic and practice management tools, hospital administrative applications, internal management systems and AI-enabled business applications. The exact functionality is determined during project discovery.',
  },
  {
    number: '03',
    question: 'Can you build AI-powered healthcare applications?',
    answer:
      'Yes. We can integrate AI capabilities into custom applications using established AI model providers and APIs. Depending on the use case, features may include AI assistants, document summarization, information retrieval and administrative support. Appropriate access controls and human oversight should be considered for sensitive workflows.',
  },
  {
    number: '04',
    question: 'Can custom healthcare software integrate with existing systems?',
    answer:
      'Yes, where the relevant systems provide suitable technical interfaces and access permissions. We develop custom APIs, database connections, webhook workflows and third-party integrations. Existing system requirements are assessed before integration work is included in the project scope.',
  },
  {
    number: '05',
    question: 'Can you automate healthcare administrative workflows?',
    answer:
      'We can develop custom automation workflows for defined administrative and operational processes. Examples may include information routing, notifications, document processing and data synchronization between supported applications.',
  },
  {
    number: '06',
    question: 'How long does healthcare software development take?',
    answer:
      'Project timelines depend on application complexity, required functionality, integrations, design requirements and testing. A focused application may require a different development schedule from a larger platform involving multiple systems and user roles. We establish a proposed timeline after reviewing the project requirements.',
  },
  {
    number: '07',
    question: 'How much does custom healthcare software development cost?',
    answer:
      'The cost depends on the application\'s scope, functionality, technical architecture, integrations, design requirements and ongoing support needs. After understanding your objectives, we can assess the project and prepare a proposal based on the agreed requirements.',
  },
  {
    number: '08',
    question: 'Does Byte Operator develop healthcare software for both clinics and hospitals?',
    answer:
      'We target both medical clinics and private practices as well as hospitals and larger healthcare organizations. Each project is assessed individually to determine its technical requirements, application scope and integration needs.',
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
    <section ref={sectionRef} className="ft-software-experience-section">
      <div className="ft-software-experience-inner">
        {/* Centered Heading Section */}
        <div className="ft-software-experience-heading">
          <p className="ft-software-experience-eyebrow">THE BYTE OPERATOR ADVANTAGE</p>
          <h2 className="ft-software-heading">
            Why Choose Byte Operator for Healthcare Software Development?
          </h2>
          <p className="ft-software-subheading">
            Healthcare organizations need software that addresses real operational requirements, not simply another disconnected application. Byte Operator combines custom software engineering, AI application development, workflow automation and API integration capabilities to develop connected digital solutions.
          </p>
        </div>

        {/* Stacked Cards List on Scroll */}
        <div className="ft-software-experience-list">
          {ADVANTAGES.map((adv, index) => (
            <article
              key={adv.title}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="ft-software-experience-item"
              style={{
                ['--experience-card-base-rotate' as any]: ADVANTAGE_ROTATES[index] || '0deg',
              }}
            >
              {/* Circular arrow button on left */}
              <div
                className="ft-software-experience-arrow"
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
              <div className="ft-software-experience-copy">
                <div className="ft-software-experience-copy__header">
                  <h3 className="ft-software-experience-copy__title">{adv.title}</h3>
                  <span className="ft-software-experience-copy__subtitle">{adv.subtitle}</span>
                </div>
                <p className="ft-software-experience-copy__summary">{adv.desc}</p>
              </div>

              {/* Side: Badge & Explore link */}
              <div className="ft-software-experience-side">
                <span className="ft-software-experience-date">{adv.badge}</span>
                <Link href={adv.route} className="ft-software-experience-link">
                  <span>Explore Software</span>
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
        <div className="ft-software-experience-progress">
          <span className="ft-software-experience-counter">
            {String(currentActiveIndex + 1).padStart(2, '0')} / {String(ADVANTAGES.length).padStart(2, '0')}
          </span>
          <div className="ft-software-experience-dots">
            {ADVANTAGES.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                className={`ft-software-experience-dot ${dotIdx === currentActiveIndex ? 'ft-software-experience-dot--active' : ''}`}
                onClick={() => scrollToCard(dotIdx)}
                aria-label={`Scroll to advantage ${dotIdx + 1}`}
              />
            ))}
          </div>
          <span className="ft-software-experience-hint">Scroll down to explore</span>
        </div>
      </div>
    </section>
  );
}

export function CustomSoftwarePageClient() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((current) => (current === index ? null : index));
  };

  return (
    <div className="ft-software-page">
      {/* =========================================================
          1. HERO SECTION
      ========================================================= */}
      <section className="ft-software-hero">
        <div className="ft-software-container">
          <div className="ft-software-hero__header">
            <p className="ft-software-hero__eyebrow">
              HEALTHCARE SOFTWARE ENGINEERING
            </p>
            <h1 className="ft-software-hero__title">
              <span className="ft-software-hero__title-line">
                Custom Healthcare
              </span>
              <span className="ft-software-hero__title-line">
                Software Development
              </span>
            </h1>

            <div
              className="ft-software-hero__text-group"
              style={{
                maxWidth: '780px',
                margin: '0 auto 2.25rem',
                textAlign: 'center',
              }}
            >
              <p
                style={{
                  fontSize: '1.15rem',
                  lineHeight: 1.7,
                  color: '#94a3b8',
                  margin: 0,
                }}
              >
                Build custom healthcare applications designed around your organization&apos;s needs. Byte Operator develops healthcare software solutions with AI-powered capabilities, workflow automation and third-party integrations to help medical clinics, private practices, hospitals and digital health businesses improve digital operations and connect their technology.
              </p>
              <p
                style={{
                  fontSize: '1.05rem',
                  fontWeight: 600,
                  color: '#cbd5e1',
                  margin: 0,
                }}
              >
                Build software around the way your healthcare organization works.
              </p>
            </div>

            <div className="ft-software-hero__cta-group">
              <CalendlyButton
                label="Discuss Your Healthcare Software Project"
                className="ft-software-hero__btn-primary"
              />
              <Link
                to="/contact"
                prefetch="intent"
                className="ft-software-hero__btn-secondary"
              >
                Contact Byte Operator →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          2. OVERVIEW: SOLUTIONS FOR MODERN HEALTHCARE (2-COLUMN)
      ========================================================= */}
      <section className="ft-software-section">
        <div className="ft-software-container">
          <div className="ft-software-split-grid">
            <div>
              <p className="ft-software-eyebrow">TAILORED DIGITAL SOLUTIONS</p>
              <h2 className="ft-software-heading">
                Custom Healthcare Software Solutions for Modern Healthcare Organizations
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', color: '#94a3b8', fontSize: '0.96875rem', lineHeight: 1.6 }}>
                <p style={{ margin: 0 }}>
                  Healthcare organizations often depend on multiple applications, databases and administrative systems to manage their daily operations. When these systems do not communicate effectively, teams may face disconnected information, repetitive tasks and inefficient processes.
                </p>
                <p style={{ margin: 0 }}>
                  Off-the-shelf software may not always provide the flexibility required by a particular organization. Custom healthcare software development offers another approach: building applications around specific business requirements, operational workflows and user needs.
                </p>
                <p style={{ margin: 0 }}>
                  Byte Operator develops custom software solutions that bring together application development, AI capabilities, workflow automation and system integrations.
                </p>
                <p style={{ margin: 0, color: '#f8fafc', fontWeight: 600 }}>
                  Our approach focuses on understanding your existing processes, identifying the right technical solution and building software that can evolve with your organization.
                </p>
              </div>
            </div>

            {/* Media Image Column */}
            <div className="ft-software-media">
              <div className="ft-software-media__card">
                <img
                  src="https://cdn.shopify.com/s/files/1/0676/1155/7936/files/Custom_Software_Section_Image.png?v=1793802627"
                  alt="Custom Healthcare Software Solutions for Modern Healthcare Organizations"
                  className="ft-software-media__image"
                  width="1920"
                  height="1080"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="ft-software-media__caption">
                <p className="ft-software-media__caption-title">
                  Custom Healthcare Software Solutions
                </p>
                <p className="ft-software-media__caption-sub">
                  Modern Healthcare Applications, Portals &amp; Connected Systems
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          3. OUR SERVICES (4 CORE SERVICE ALTERNATING SPLIT ROWS)
      ========================================================= */}
      <section className="ft-software-section">
        <div className="ft-software-container">
          <p className="ft-software-eyebrow">SERVICES &amp; CAPABILITIES</p>
          <h2 className="ft-software-heading">
            Our Healthcare Software Development Services
          </h2>
          <p className="ft-software-subheading">
            We develop custom healthcare applications and connected software solutions based on your organization&apos;s requirements.
          </p>

          <div className="ft-software-showcase">
            {CORE_SERVICES.map((srv) => (
              <div
                className={`ft-software-row ${srv.reversed ? 'ft-software-row--reversed' : ''}`}
                key={srv.title}
              >
                {/* Content Side */}
                <div className="ft-software-row__content">
                  <span className="ft-software-row__badge">{srv.badge}</span>
                  <h3 className="ft-software-row__title">{srv.title}</h3>
                  <p className="ft-software-row__desc">{srv.desc}</p>

                  <div className="ft-software-row__checklist">
                    <p className="ft-software-row__checklist-heading">
                      Key Capabilities Include:
                    </p>
                    {srv.checklist.map((item, cIdx) => (
                      <div className="ft-software-row__check-item" key={cIdx}>
                        <span className="ft-software-row__check-icon">✓</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {'note' in srv && srv.note ? (
                    <div className="ft-software-row__note">
                      {srv.note}
                    </div>
                  ) : null}

                  {'linkHref' in srv && srv.linkHref ? (
                    <div style={{ marginTop: '0.75rem' }}>
                      <Link
                        to={srv.linkHref}
                        prefetch="intent"
                        className="ft-software-row__link"
                      >
                        {srv.linkText}
                      </Link>
                    </div>
                  ) : null}
                </div>

                {/* Media Side */}
                <div className="ft-software-row__media">
                  <div className="ft-software-row__media-inner">
                    <img
                      src={srv.image}
                      alt={srv.imageAlt}
                      loading="lazy"
                      className="ft-software-row__img"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          4. TYPES OF SOFTWARE WE CAN BUILD (5 TYPES)
      ========================================================= */}
      <section className="ft-software-section">
        <div className="ft-software-container">
          <p className="ft-software-eyebrow">APPLICATION PORTFOLIO</p>
          <h2 className="ft-software-heading">
            Types of Healthcare Software We Can Build
          </h2>
          <p className="ft-software-subheading">
            Healthcare software requirements vary according to the organization&apos;s size, services, users and operational processes. We approach each project individually rather than forcing every organization into the same application structure.
          </p>

          <div className="ft-software-cards-grid--3col">
            {SOFTWARE_TYPES.map((type) => (
              <div className="ft-software-card" key={type.title}>
                <h3 className="ft-software-card__title" style={{ fontSize: '1.25rem' }}>
                  {type.title}
                </h3>
                <p className="ft-software-card__desc">{type.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          5. INTEGRATION & CONNECTIVITY (6 PILLARS)
      ========================================================= */}
      <section className="ft-software-section">
        <div className="ft-software-container">
          <p className="ft-software-eyebrow">SYSTEM INTEROPERABILITY</p>
          <h2 className="ft-software-heading">
            Healthcare Software Integration and Connectivity
          </h2>
          <p className="ft-software-subheading">
            A custom application should fit into the wider technology environment of your organization. Building a new application is only part of the solution when it also needs to communicate with existing platforms, databases or third-party services.
          </p>

          <div className="ft-software-cards-grid--3col">
            {INTEGRATION_PILLARS.map((item) => (
              <div className="ft-software-card" key={item.title}>
                <h3 className="ft-software-card__title" style={{ fontSize: '1.25rem' }}>
                  {item.title}
                </h3>
                <p className="ft-software-card__desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          6. ORGANIZATIONS WE SUPPORT (5 TYPES)
      ========================================================= */}
      <section className="ft-software-section">
        <div className="ft-software-container">
          <p className="ft-software-eyebrow">WHO WE WORK WITH</p>
          <h2 className="ft-software-heading">
            Healthcare Organizations We Support
          </h2>
          <p className="ft-software-subheading">
            We work with different types of healthcare organizations that need custom digital applications, AI-powered capabilities or connected software solutions.
          </p>

          <div className="ft-software-cards-grid--3col">
            {ORGANIZATIONS_SUPPORTED.map((org) => (
              <div className="ft-software-card" key={org.title}>
                <h3 className="ft-software-card__title" style={{ fontSize: '1.25rem' }}>
                  {org.title}
                </h3>
                <p className="ft-software-card__desc">{org.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          7. DEVELOPMENT PROCESS (6 STEPS)
      ========================================================= */}
      <section className="ft-software-section">
        <div className="ft-software-container">
          <p className="ft-software-eyebrow">ENGINEERING ROADMAP</p>
          <h2 className="ft-software-heading">
            Our Healthcare Software Development Process
          </h2>
          <p className="ft-software-subheading">
            A successful software project starts with a clear understanding of the problem it needs to solve. Our development process is structured to define requirements, select an appropriate technical approach and build software around the agreed objectives.
          </p>

          <div className="ft-software-process-grid">
            {DEVELOPMENT_PROCESS.map((step) => (
              <div className="ft-software-process-card" key={step.step}>
                <span className="ft-software-process-card__number">{step.step}</span>
                <h3 className="ft-software-process-card__title">{step.title}</h3>
                <p className="ft-software-process-card__text">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          8. SECURITY, DATA PRIVACY & RESPONSIBLE AI
      ========================================================= */}
      <section className="ft-software-section">
        <div className="ft-software-container">
          <p className="ft-software-eyebrow">SECURITY, PRIVACY &amp; GOVERNANCE</p>
          <h2 className="ft-software-heading">
            Security, Data Privacy and Responsible Healthcare Software Development
          </h2>
          <p className="ft-software-subheading">
            Healthcare software projects require careful consideration of information security, data privacy, user permissions and the handling of sensitive information from the beginning of the project rather than as a final development step.
          </p>

          <div className="ft-software-security-grid">
            {SECURITY_CONSIDERATIONS.map((sec) => (
              <div className="ft-software-security-card" key={sec.title}>
                <h3 className="ft-software-security-card__title">{sec.title}</h3>
                <p className="ft-software-security-card__desc">{sec.desc}</p>
              </div>
            ))}
          </div>

          <div className="ft-software-compliance-callout">
            <h3 className="ft-software-compliance-callout__title">
              Regulatory Compliance &amp; Business Associate Agreement (BAA) Notice
            </h3>
            <p className="ft-software-compliance-callout__text">
              Healthcare organizations must assess the regulations, contractual obligations and technical safeguards applicable to their specific project. Compliance requirements are project-specific. HIPAA compliance, Business Associate Agreement (BAA) availability and specific healthcare interoperability standards must be confirmed with the technical and compliance teams before they can be offered or represented as established capabilities.
            </p>
            <p className="ft-software-compliance-callout__text">
              We discuss these requirements thoroughly during project discovery so that the proposed solution, hosting architecture, and security protocols are properly tailored to your organization&apos;s compliance standards.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          9. WHY CHOOSE BYTE OPERATOR (SCROLL-DRIVEN DECK SLIDER)
      ========================================================= */}
      <AdvantageDeckSlider />

      {/* =========================================================
          10. FAQS ACCORDION (TWO-COLUMN RESPONSIVE)
      ========================================================= */}
      <section className="ft-home-faqs">
        <div className="ft-home-faqs__container">
          <div className="ft-home-faqs__grid">
            {/* Left Column */}
            <div className="ft-home-faqs__left">
              <div className="ft-home-faqs__header">
                <p className="ft-home-faqs__eyebrow">
                  FREQUENTLY ASKED QUESTIONS
                </p>
                <h2 className="ft-home-faqs__heading">
                  Custom Healthcare Software Development FAQs
                </h2>
                <p className="ft-home-faqs__subtitle">
                  Find clear answers to common questions about our healthcare software development services, AI integrations, timeline estimates, and engineering approach.
                </p>
              </div>

              {/* Callout box */}
              <div className="ft-home-faqs__callout">
                <h3 className="ft-home-faqs__callout-title">
                  Have a specific software project in mind?
                </h3>
                <p className="ft-home-faqs__callout-text">
                  Our engineering team can evaluate your technical requirements, architectural options, and project roadmap during an initial discovery consultation.
                </p>
                <CalendlyButton
                  label="Speak with our engineering team →"
                  className="ft-home-faqs__callout-btn"
                />
              </div>
            </div>

            {/* Right Column: Accordion */}
            <div className="ft-home-faqs__right">
              {FAQS.map((faq, index) => {
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
                        {isOpen ? '—' : '+'}
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
          11. FINAL CONVERSION CTA BLOCK
      ========================================================= */}
      <ServiceFinalCta
        eyebrow="CUSTOM HEALTHCARE SOFTWARE"
        title="Let's Build Your Custom Healthcare Software Solution"
        description="Your healthcare organization may need a new application, AI-powered functionality, automated workflows, or better connections between existing systems. Byte Operator can help assess your requirements and define a custom software development approach around your objectives."
        tagline="From discovery and scoping to full production deployment, we engineer reliable digital platforms."
        primaryButtonLabel="Start Your Healthcare Software Project"
        secondaryButtonLabel="Contact Our Engineering Team →"
        secondaryButtonHref="/contact"
        pillars={[
          {
            title: 'Full-Stack Architecture',
            description:
              'High-velocity Next.js, Node.js, Python, and PostgreSQL stacks engineered for responsive clinical portals.',
          },
          {
            title: 'Custom Workflow Schema',
            description:
              'Applications built to mirror your exact clinic operational needs without rigid SaaS limitations.',
          },
          {
            title: 'Complete IP Ownership',
            description:
              'You own 100% of the code, data schemas, and infrastructure deployments with zero vendor lock-in.',
          },
        ]}
      />
    </div>
  );
}
