'use client';

import React, { useState } from 'react';
import { Link } from '~/lib/router-compat';
import { CalendlyButton } from '~/components/shared/CalendlyButton';
import { ServiceFinalCta } from '~/components/shared/ServiceFinalCta';

/* =========================================================
   FAQ DATA
========================================================= */

const HEALTHCARE_SOLUTIONS_FAQS = [
  {
    number: '01',
    question: 'What are healthcare technology solutions?',
    answer:
      'Healthcare technology solutions encompass custom software applications, digital platforms, AI automation systems, and API integrations engineered to streamline clinical and administrative operations across healthcare organizations.',
  },
  {
    number: '02',
    question: 'What types of healthcare organizations benefit from custom software?',
    answer:
      'Medical practices, dental clinics, dermatology and aesthetic centers, ophthalmology clinics, and primary care groups benefit when off-the-shelf software fails to match their specialized clinical pathways or integration needs.',
  },
  {
    number: '03',
    question: 'What does custom healthcare application development include?',
    answer:
      'Engagements include requirements analysis, intuitive UI/UX design, front-end and back-end engineering, secure database architecture, role-based access controls, API connectivity, testing, and deployment.',
  },
  {
    number: '04',
    question: 'How can AI be applied within healthcare workflows?',
    answer:
      'AI supports operational use cases including intelligent document processing, patient intake routing, communication assistance, and administrative workflow orchestration, always implemented with clear human-in-the-loop oversight.',
  },
  {
    number: '05',
    question: 'What is healthcare workflow automation?',
    answer:
      'Workflow automation connects disparate applications to automate routine administrative tasks like appointment reminders, record synchronization, internal notifications, and multi-system data handoffs.',
  },
  {
    number: '06',
    question: 'Why are API integrations critical for healthcare providers?',
    answer:
      'APIs allow EHRs, billing platforms, laboratory systems, and custom applications to exchange data securely, eliminating repetitive manual data entry and preventing fragmented record keeping.',
  },
  {
    number: '07',
    question: 'Can healthcare software be customized for different medical specialties?',
    answer:
      'Yes. Each medical specialty operates with distinct clinical procedures and patient touchpoints. Byte Operator tailors software architectures to the specific workflows of each clinical practice.',
  },
  {
    number: '08',
    question: 'How does custom healthcare software differ from off-the-shelf software?',
    answer:
      'Off-the-shelf software imposes rigid, one-size-fits-all workflows. Custom software is designed specifically around your operational processes, data models, staff roles, and long-term scalability.',
  },
  {
    number: '09',
    question: 'How do healthcare application integrations function?',
    answer:
      'Integrations utilize REST/GraphQL APIs, HL7/FHIR messaging standards, webhooks, or middleware queues to authenticate, validate, transform, and synchronize data across platforms securely.',
  },
  {
    number: '10',
    question: 'What should organizations assess before custom development?',
    answer:
      'Key considerations include operational objectives, user permissions, existing software integrations, data privacy mandates, technical constraints, budget, and future maintenance expectations.',
  },
  {
    number: '11',
    question: 'How long does a custom healthcare development project take?',
    answer:
      'Timelines vary with technical complexity, third-party interface readiness, and regulatory scope. Focused workflow tools can deploy in weeks, while multi-system clinical platforms are delivered in structured milestones.',
  },
  {
    number: '12',
    question: 'How can an organization start a project with Byte Operator?',
    answer:
      'Begin by booking a technical discovery consultation with our engineering team to review your operational challenges, system architecture, and project goals.',
  },
] as const;

/* =========================================================
   SPECIALTIES DATA
========================================================= */

const SPECIALTIES = [
  {
    id: 'medical-practices',
    title: 'Medical Practices',
    badge: 'Clinical Operations',
    desc: 'Custom practice applications, administrative task coordination, appointment routing, and third-party software connectivity.',
    features: [
      'Intelligent patient intake workflows',
      'Unified practice management dashboards',
      'Automated administrative routing',
      'Third-party application integration',
    ],
  },
  {
    id: 'dental-practices',
    title: 'Dental Practices',
    badge: 'Practice Management',
    desc: 'Purpose-built digital tools addressing dental appointment coordination, treatment follow-ups, and patient communication.',
    features: [
      'Treatment plan tracking interfaces',
      'Automated appointment recall pipelines',
      'Digital patient registration portals',
      'Connected imaging & billing workflows',
    ],
  },
  {
    id: 'dermatology-clinics',
    title: 'Dermatology & Aesthetic Clinics',
    badge: 'Consultation & Follow-Up',
    desc: 'Connected digital workflows organizing patient consultations, photo documentation tracking, and follow-up communications.',
    features: [
      'Consultation intake & history tracking',
      'Automated post-treatment follow-ups',
      'Self-service appointment request portals',
      'Integrated payment & scheduling tools',
    ],
  },
  {
    id: 'ophthalmology-clinics',
    title: 'Ophthalmology Clinics',
    badge: 'Diagnostic Connectivity',
    desc: 'Integrated digital workflows connecting diagnostic imaging devices, administrative scheduling, and patient coordination.',
    features: [
      'Specialized diagnostic data management',
      'Multi-provider scheduling coordination',
      'Automated patient reminder sequences',
      'Secure clinical record bridges',
    ],
  },
  {
    id: 'primary-care',
    title: 'Primary Care Practices',
    badge: 'Patient Access',
    desc: 'Digital platforms streamlining patient intake, recurring visit coordination, and cross-application administrative automation.',
    features: [
      'Patient registration & demographic intake',
      'Routine inquiry & triage automation',
      'Chronic care follow-up workflows',
      'EHR & laboratory system connectivity',
    ],
  },
  {
    id: 'other-specialties',
    title: 'Specialty & Surgical Centers',
    badge: 'Tailored Solutions',
    desc: 'Custom software architectures engineered for ENT, Cardiology, Orthopedics, and multi-specialty ambulatory surgical centers.',
    features: [
      'Pre-operative checklist automation',
      'Inter-departmental communications',
      'Customized clinical documentation modules',
      'Scalable healthcare cloud architecture',
    ],
  },
] as const;

/* =========================================================
   CORE CAPABILITIES DATA
========================================================= */

const CAPABILITIES = [
  {
    title: 'Custom Healthcare Application Development',
    badge: 'Web & Cloud Platforms',
    desc: 'Engineered from the ground up around your operational workflows, user roles, and security requirements rather than generic software templates.',
    items: [
      'Web-based clinical & operational tools',
      'Staff dashboards & administrative consoles',
      'Patient-facing communication portals',
      'Scalable, cloud-native backend architecture',
    ],
  },
  {
    title: 'AI-Powered Healthcare Applications',
    badge: 'Intelligent Systems',
    desc: 'Infusing custom software with automated document comprehension, smart request routing, and context-aware assistance under human supervision.',
    items: [
      'Automated administrative document parsing',
      'Intelligent intake triage & routing',
      'Natural-language communication drafting',
      'Strict data privacy & human-in-the-loop controls',
    ],
  },
  {
    title: 'Healthcare Workflow Automation',
    badge: 'Process Automation',
    desc: 'Automating multi-step operational tasks across disconnected applications using event-driven logic and robust error recovery routines.',
    items: [
      'Automated patient reminder sequences',
      'Cross-system record synchronization',
      'Internal task assignment & notifications',
      'n8n & custom event-driven pipelines',
    ],
  },
  {
    title: 'Healthcare API & System Integrations',
    badge: 'Interoperability',
    desc: 'Connecting third-party healthcare systems, EHR/EMR platforms, and databases through robust REST APIs, webhooks, and HL7/FHIR interfaces.',
    items: [
      'Custom REST & GraphQL API engineering',
      'HL7 v2 & FHIR data exchange adapters',
      'Bi-directional synchronization pipelines',
      'High-reliability error handling & audit trails',
    ],
  },
] as const;

/* =========================================================
   TECHNOLOGY LOGOS
========================================================= */

const HEALTH_TECH_LOGOS = [
  { src: '/images/home-partners/fhir.svg', alt: 'HL7 FHIR', width: 160, height: 40 },
  { src: '/images/home-partners/hl7.svg', alt: 'HL7 Standards', width: 160, height: 40 },
  { src: '/images/home-partners/dicom.svg', alt: 'DICOM Imaging', width: 160, height: 40 },
  { src: '/images/home-partners/python.svg', alt: 'Python', width: 160, height: 40 },
  { src: '/images/home-partners/typescript.svg', alt: 'TypeScript', width: 160, height: 40 },
  { src: '/images/home-partners/nodejs.svg', alt: 'Node.js', width: 160, height: 40 },
  { src: '/images/home-partners/postgresql.svg', alt: 'PostgreSQL', width: 170, height: 40 },
  { src: '/images/home-partners/redis.svg', alt: 'Redis Cache', width: 160, height: 40 },
  { src: '/images/home-partners/aws.svg', alt: 'AWS Cloud', width: 160, height: 40 },
  { src: '/images/home-partners/google-cloud.svg', alt: 'Google Cloud Platform', width: 170, height: 40 },
  { src: '/images/home-partners/docker.svg', alt: 'Docker Containers', width: 160, height: 40 },
  { src: '/images/home-partners/kubernetes.svg', alt: 'Kubernetes', width: 170, height: 40 },
] as const;

export function HealthcareSolutionsPageClient() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((current) => (current === index ? null : index));
  };

  return (
    <div className="ft-health-sol-page">
      {/* 1. HERO SECTION */}
      <section className="ft-health-sol-hero">
        <div className="ft-health-sol-container">
          <div className="ft-health-sol-hero__header">
            <p className="ft-health-sol-hero__eyebrow">
              HEALTHCARE TECHNOLOGY SOLUTIONS
            </p>
            <h1 className="ft-health-sol-hero__title">
              <span className="ft-health-sol-hero__title-line">
                Healthcare Technology Solutions
              </span>
              <span className="ft-health-sol-hero__title-line">
                for Modern Healthcare Organizations
              </span>
            </h1>

            <div className="ft-health-sol-hero__text-group">
              <p className="ft-health-sol-hero__lead">
                Healthcare organizations require software systems designed around their operational workflows. Byte Operator develops custom applications, AI-assisted workflows, and API integrations to build connected, reliable digital operations.
              </p>
              <p className="ft-health-sol-hero__sublead">
                Whether you manage a medical practice, dental center, dermatology clinic, ophthalmology group, or primary care network, our engineering team constructs technology tailored to your providers, staff, and patients.
              </p>
              <p className="ft-health-sol-hero__tagline">
                Build healthcare technology that adapts to the way your teams work.
              </p>
            </div>

            <div className="ft-health-sol-hero__cta-group">
              <CalendlyButton
                label="Discuss Your Healthcare Technology Project"
                className="ft-health-sol-hero__btn-primary"
              />
              <Link
                to="/contact"
                prefetch="intent"
                className="ft-health-sol-hero__btn-secondary"
              >
                Contact Our Engineering Team &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CORE CHALLENGES (5 Cards - Trailing Centered) */}
      <section className="ft-health-sol-section" aria-label="Healthcare Challenges">
        <div className="ft-health-sol-container">
          <div className="ft-health-sol-section__header">
            <span className="ft-health-sol-eyebrow">OPERATIONAL BOTTLENECKS</span>
            <h2 className="ft-health-sol-heading">
              Technology Challenges Facing Modern Healthcare Providers
            </h2>
            <p className="ft-health-sol-subheading">
              When clinical platforms, administrative software, and communication tools operate in isolation, teams face duplicate data entry and administrative friction.
            </p>
          </div>

          <div className="ft-health-sol-grid-3">
            <div className="ft-health-sol-card">
              <span className="ft-health-sol-card__badge">Fragmentation</span>
              <h3 className="ft-health-sol-card__title">
                Disconnected Healthcare Systems
              </h3>
              <p className="ft-health-sol-card__desc">
                Managing patient records, appointments, and billing across disparate platforms leads to manual transcription, delayed handoffs, and data discrepancies.
              </p>
            </div>

            <div className="ft-health-sol-card">
              <span className="ft-health-sol-card__badge">Overhead</span>
              <h3 className="ft-health-sol-card__title">
                Manual Administrative Burdens
              </h3>
              <p className="ft-health-sol-card__desc">
                Routine tasks like confirmation calls, data intake, and status notifications consume hours that clinic staff could otherwise devote to direct patient support.
              </p>
            </div>

            <div className="ft-health-sol-card">
              <span className="ft-health-sol-card__badge">Rigidity</span>
              <h3 className="ft-health-sol-card__title">
                Limitations of Generic Software
              </h3>
              <p className="ft-health-sol-card__desc">
                Commercial off-the-shelf software rarely fits specialized clinical requirements, forcing teams to adopt cumbersome workarounds and external spreadsheets.
              </p>
            </div>

            <div className="ft-health-sol-card">
              <span className="ft-health-sol-card__badge">Complexity</span>
              <h3 className="ft-health-sol-card__title">
                Unstructured AI Adoption
              </h3>
              <p className="ft-health-sol-card__desc">
                Deploying AI without strict operational boundaries, reliable data governance, or clinician oversight risks compliance issues and unpredictable outcomes.
              </p>
            </div>

            <div className="ft-health-sol-card">
              <span className="ft-health-sol-card__badge">Silos</span>
              <h3 className="ft-health-sol-card__title">
                Integration &amp; API Barriers
              </h3>
              <p className="ft-health-sol-card__desc">
                Incompatible data models and proprietary system silos prevent clinical applications from sharing real-time records and coordinated care updates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE CAPABILITIES (4 Pillars) */}
      <section className="ft-health-sol-section ft-health-sol-section--darker" aria-label="Core Capabilities">
        <div className="ft-health-sol-container">
          <div className="ft-health-sol-section__header">
            <span className="ft-health-sol-eyebrow">CORE CAPABILITIES</span>
            <h2 className="ft-health-sol-heading">
              Comprehensive Healthcare Technology Services
            </h2>
            <p className="ft-health-sol-subheading">
              Byte Operator combines software engineering, intelligent automation, and interoperability engineering to solve real-world healthcare operational challenges.
            </p>
          </div>

          <div className="ft-health-sol-grid-3">
            {CAPABILITIES.map((cap) => (
              <div key={cap.title} className="ft-health-sol-card">
                <span className="ft-health-sol-card__badge">{cap.badge}</span>
                <h3 className="ft-health-sol-card__title">{cap.title}</h3>
                <p className="ft-health-sol-card__desc">{cap.desc}</p>
                <ul className="ft-health-sol-card__list">
                  {cap.items.map((item) => (
                    <li key={item} className="ft-health-sol-card__list-item">
                      <span className="ft-health-sol-card__list-bullet">&bull;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SOLUTIONS BY MEDICAL SPECIALTY (6 Cards) */}
      <section className="ft-health-sol-section" id="solutions-by-specialty" aria-label="Solutions by Specialty">
        <div className="ft-health-sol-container">
          <div className="ft-health-sol-section__header">
            <span className="ft-health-sol-eyebrow">SPECIALTY WORKFLOWS</span>
            <h2 className="ft-health-sol-heading">
              Healthcare Technology for Medical Specialties
            </h2>
            <p className="ft-health-sol-subheading">
              Different medical domains have unique clinical pathways, patient touchpoints, and regulatory demands. We engineer software tailored to your specific discipline.
            </p>
          </div>

          <div className="ft-health-sol-grid-3">
            {SPECIALTIES.map((spec) => (
              <div key={spec.id} id={spec.id} className="ft-health-sol-specialty-card">
                <div className="ft-health-sol-specialty-header">
                  <div className="ft-health-sol-specialty-icon-box">
                    <span>&#10003;</span>
                  </div>
                  <div>
                    <h3 className="ft-health-sol-specialty-title">{spec.title}</h3>
                    <span style={{ fontSize: '0.75rem', color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      {spec.badge}
                    </span>
                  </div>
                </div>
                <p className="ft-health-sol-card__desc">{spec.desc}</p>
                <ul className="ft-health-sol-card__list">
                  {spec.features.map((feature) => (
                    <li key={feature} className="ft-health-sol-card__list-item">
                      <span className="ft-health-sol-card__list-bullet">&bull;</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TECHNOLOGIES SPLIT (2-Column Reference Layout) */}
      <section className="ft-health-sol-section ft-health-sol-section--darker" aria-label="Technologies">
        <div className="ft-health-sol-container">
          <div className="ft-health-sol-tech-split">
            <div className="ft-health-sol-tech-split__left">
              <p className="ft-health-sol-tech-split__eyebrow">MODERN HEALTHCARE STACK</p>
              <h2 className="ft-health-sol-tech-split__title">
                Secure Technologies Built for Healthcare Reliability
              </h2>
              <p className="ft-health-sol-tech-split__desc">
                We engineer scalable healthcare solutions using industry-standard interoperability frameworks, battle-tested programming languages, and compliant cloud architectures.
              </p>
              <div style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(56, 189, 248, 0.25)', borderRadius: '12px', padding: '1.5rem', marginTop: '1rem' }}>
                <h4 style={{ margin: '0 0 0.5rem', color: '#38bdf8', fontSize: '1.1rem' }}>
                  Interoperability &amp; Standards
                </h4>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.6 }}>
                  Built around modern HL7 FHIR RESTful resources, HL7 v2 messaging parsers, DICOM image handling, and containerized microservice deployments.
                </p>
              </div>
            </div>

            <div className="ft-health-sol-tech-split__right">
              {HEALTH_TECH_LOGOS.map((tech) => (
                <div key={tech.alt} className="ft-health-sol-tech-logo-item">
                  <img
                    src={tech.src}
                    alt={tech.alt}
                    width={tech.width}
                    height={tech.height}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. SYSTEMATIC DELIVERY PROCESS (6 Steps) */}
      <section className="ft-health-sol-section" aria-label="Development Process">
        <div className="ft-health-sol-container">
          <div className="ft-health-sol-section__header">
            <span className="ft-health-sol-eyebrow">STRUCTURED EXECUTION</span>
            <h2 className="ft-health-sol-heading">
              Our Healthcare Technology Development Process
            </h2>
            <p className="ft-health-sol-subheading">
              A systematic engineering methodology ensures that software is delivered on time, complies with technical requirements, and achieves your operational objectives.
            </p>
          </div>

          <div className="ft-health-sol-process-grid">
            <div className="ft-health-sol-process-card">
              <span className="ft-health-sol-process-step">01</span>
              <h3 className="ft-health-sol-process-title">Discovery &amp; Requirements</h3>
              <p className="ft-health-sol-process-desc">
                Evaluating clinical workflows, user personas, existing system dependencies, and technical objectives.
              </p>
            </div>

            <div className="ft-health-sol-process-card">
              <span className="ft-health-sol-process-step">02</span>
              <h3 className="ft-health-sol-process-title">Architecture &amp; Planning</h3>
              <p className="ft-health-sol-process-desc">
                Designing database schemas, interface specifications, access control models, and cloud infrastructure maps.
              </p>
            </div>

            <div className="ft-health-sol-process-card">
              <span className="ft-health-sol-process-step">03</span>
              <h3 className="ft-health-sol-process-title">Design &amp; Development</h3>
              <p className="ft-health-sol-process-desc">
                Building intuitive user interfaces, secure back-end services, AI logic, and automated workflow pipelines.
              </p>
            </div>

            <div className="ft-health-sol-process-card">
              <span className="ft-health-sol-process-step">04</span>
              <h3 className="ft-health-sol-process-title">Integration &amp; Testing</h3>
              <p className="ft-health-sol-process-desc">
                Executing comprehensive unit tests, security audits, interface validation, and user role permission testing.
              </p>
            </div>

            <div className="ft-health-sol-process-card">
              <span className="ft-health-sol-process-step">05</span>
              <h3 className="ft-health-sol-process-title">Deployment &amp; Onboarding</h3>
              <p className="ft-health-sol-process-desc">
                Managing cloud environment provisioning, cutover execution, and staff operational onboarding.
              </p>
            </div>

            <div className="ft-health-sol-process-card">
              <span className="ft-health-sol-process-step">06</span>
              <h3 className="ft-health-sol-process-title">Continuous Improvement</h3>
              <p className="ft-health-sol-process-desc">
                Monitoring system metrics, providing operational maintenance, and evolving application features over time.
              </p>
            </div>
          </div>

          {/* COMPLIANCE NOTE */}
          <div className="ft-health-sol-notice-box">
            <h4 className="ft-health-sol-notice-title">
              <span>&#9888;</span> Compliance &amp; Regulatory Standard Verification
            </h4>
            <p className="ft-health-sol-notice-desc">
              Regulatory compliance, certifications, contractual arrangements, and healthcare interoperability standards (such as HIPAA, Business Associate Agreements, HL7, and FHIR) must be confirmed and evaluated for each specific solution. Byte Operator assesses technical capabilities and vendor agreements for verified alignment.
            </p>
          </div>
        </div>
      </section>

      {/* 7. FREQUENTLY ASKED QUESTIONS (Two-Column Sticky Accordion) */}
      <section className="ft-home-faqs" aria-label="Frequently Asked Questions">
        <div className="ft-home-faqs__container">
          <div className="ft-home-faqs__grid">
            <div className="ft-home-faqs__left">
              <div className="ft-home-faqs__header">
                <p className="ft-home-faqs__eyebrow">FREQUENTLY ASKED QUESTIONS</p>
                <h2 className="ft-home-faqs__heading">
                  Healthcare Technology Solutions FAQs
                </h2>
                <p className="ft-home-faqs__subtitle">
                  Find clear answers to common questions about custom healthcare applications, AI automation, system integrations, and development timelines.
                </p>
              </div>

              <div className="ft-home-faqs__callout">
                <h3 className="ft-home-faqs__callout-title">
                  Planning a healthcare software initiative?
                </h3>
                <p className="ft-home-faqs__callout-text">
                  Our healthcare software engineers and automation architects can review your current operational challenges during an introductory call.
                </p>
                <CalendlyButton
                  label="Speak with our engineering team &rarr;"
                  className="ft-home-faqs__callout-btn"
                />
              </div>
            </div>

            <div className="ft-home-faqs__right">
              {HEALTHCARE_SOLUTIONS_FAQS.map((faq, index) => {
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

      {/* 8. FINAL CONVERSION CTA */}
      <ServiceFinalCta
        eyebrow="HEALTHCARE TECHNOLOGY SOLUTIONS"
        title="Build Better Digital Experiences with Healthcare Technology Solutions"
        description="Healthcare organizations need technology that fits their operational requirements and supports their evolving digital needs. Byte Operator unites software engineering, AI automation, and system integration to help providers build connected solutions."
        tagline="Let's discuss your healthcare technology project with senior software engineers."
        primaryButtonLabel="Book an Architecture Call"
        secondaryButtonLabel="Contact Byte Operator →"
        secondaryButtonHref="/contact"
        pillars={[
          {
            title: 'Unified Clinic Operations',
            description:
              'Integrated digital front-door, automated scheduling, and connected clinical workflows tailored to your practice.',
          },
          {
            title: 'HIPAA & System Security',
            description:
              'Rigorous data privacy, encrypted health record transfer, least-privilege scoping, and strict audit logs.',
          },
          {
            title: 'Custom Engineering & APIs',
            description:
              'Proprietary software and integrations designed around your current EHR, billing software, and communication tools.',
          },
        ]}
      />
    </div>
  );
}
