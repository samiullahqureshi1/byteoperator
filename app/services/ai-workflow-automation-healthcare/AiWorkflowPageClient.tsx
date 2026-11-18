'use client';

import {useEffect, useRef, useState} from 'react';
import {Link} from '~/lib/router-compat';
import {CalendlyButton} from '~/components/shared/CalendlyButton';
import {ServiceFinalCta} from '~/components/shared/ServiceFinalCta';

/* =========================================================
   DATA DEFINITIONS
========================================================= */

const PAIN_POINTS = [
  'Repetitive patient data entry across disconnected software applications.',
  'Delays in processing intake forms, referrals, and administrative documents.',
  'Time-consuming manual appointment confirmations and follow-ups.',
  'Fragmented communication between departments and clinical staff.',
  'Lack of centralized visibility into outstanding operational tasks.',
] as const;

const SOLUTIONS = [
  {
    badge: 'Intake Automation',
    title: 'Patient Intake and Registration Automation',
    desc: 'Patient intake often involves collecting information from online forms, registration documents, emails and other communication channels. Staff may then need to review the information and enter it into the appropriate systems. AI-powered patient intake automation organizes this process into structured, verifiable workflows.',
    checklist: [
      'Collecting patient information through configured digital forms.',
      'Extracting relevant fields from submitted documents.',
      'Identifying missing or incomplete information.',
      'Validating information against predefined business rules.',
      'Routing incomplete submissions to administrative staff.',
      'Generating internal notifications and follow-up tasks.',
      'Preparing approved information for synchronization with connected systems.',
    ],
    example:
      'Example: When a patient submits an intake form, an automated workflow collects the information, checks required fields, identifies missing details and routes the submission for staff review before any approved system update takes place.',
  },
  {
    badge: 'Scheduling & Reminders',
    title: 'Appointment Scheduling and Reminder Automation',
    desc: 'Appointment management involves several repetitive activities, including handling requests, checking availability, confirming bookings and communicating schedule changes. Custom scheduling automation connects your calendar software and communication channels while respecting clinic rules.',
    checklist: [
      'Receiving appointment requests from configured channels.',
      'Checking availability through supported calendar or scheduling integrations.',
      'Routing requests to the appropriate administrative team.',
      'Sending appointment confirmations and reminders.',
      'Managing cancellation and rescheduling requests.',
      'Notifying staff when a request needs manual attention.',
      'Updating connected scheduling systems where authorized integrations are available.',
    ],
    example:
      'Example: Automation rules manage waitlists, follow-up reminders and appointment communications, while unusual requests or exceptions are routed directly to staff rather than making unsupported decisions.',
  },
  {
    badge: 'Referral Management',
    title: 'Healthcare Referral Management Automation',
    desc: 'Referral management can involve multiple documents, communication channels and administrative handoffs. A referral may arrive through email, a digital form or another supported document channel before being reviewed and processed by clinical staff.',
    checklist: [
      'Capturing incoming referral documents.',
      'Extracting relevant information using AI and document processing.',
      'Identifying missing fields or supporting documents.',
      'Classifying referrals according to predefined categories.',
      'Routing documents to the appropriate department or staff member.',
      'Tracking administrative referral status.',
      'Sending notifications for pending actions.',
      'Updating connected systems after authorized review.',
    ],
    example:
      'Example: An incoming referral document triggers an AI extraction sequence, verifies required fields are present, creates an administrative review task and alerts the triage team.',
  },
  {
    badge: 'Document Processing',
    title: 'Healthcare Document Processing Automation',
    desc: 'Healthcare organizations handle diverse documents—registration forms, referral letters, insurance cards, clinical records and correspondence. Manual processing creates administrative bottlenecks that AI structured extraction eliminates.',
    checklist: [
      'Document classification and categorization.',
      'Information extraction from supported file formats.',
      'Structured data generation.',
      'Missing information identification.',
      'Document routing based on predefined rules.',
      'Administrative approval workflows.',
      'Secure synchronization with authorized applications.',
      'Exception reporting and processing logs.',
    ],
    example:
      'Example: Using LLMs and structured extraction, incoming PDFs and scanned records are converted into validated data fields before updating records or triggering actions.',
  },
  {
    badge: 'Patient Communication',
    title: 'Patient Communication and Follow-Up Automation',
    desc: 'Healthcare administrative teams frequently manage routine appointment inquiries, confirmations, reminders and administrative notifications. Custom AI communication workflows coordinate these touchpoints reliably.',
    checklist: [
      'Automated responses to routine administrative inquiries.',
      'Appointment confirmation messages.',
      'Configured reminder sequences.',
      'Follow-up communication after administrative events.',
      'Message classification and routing.',
      'Staff notifications for unresolved requests.',
      'Human handover when a conversation requires individual attention.',
    ],
    example:
      'Example: AI agents utilize approved practice guidelines to handle administrative FAQs, while clinically relevant or ambiguous inquiries immediately escalate to qualified medical staff.',
  },
  {
    badge: 'Revenue Cycle & Admin',
    title: 'Administrative and Revenue Cycle Workflow Automation',
    desc: 'Administrative and revenue cycle operations involve multiple steps, documents and external payer portals. Automation organizes the documentation and handoffs to keep billing and approvals on track.',
    checklist: [
      'Insurance information collection and document organization.',
      'Administrative eligibility verification workflows.',
      'Prior authorization document preparation and tracking.',
      'Billing-related document processing.',
      'Missing information notifications.',
      'Administrative claim workflow routing.',
      'Denial-related document organization.',
      'Status updates and internal reporting.',
    ],
    example:
      'Example: For prior authorizations, automation compiles supporting clinical documents, formats required information and queues the packet for authorized staff review.',
  },
] as const;

const ARCHITECTURE_STAGES = [
  {
    number: '01',
    title: 'Workflow Discovery & Process Mapping',
    desc: 'We map how your clinic or hospital currently handles administrative processes to determine whether AI, rules-based automation, or a hybrid architecture is appropriate.',
    items: [
      'Existing manual tasks and repetitive activities.',
      'Information sources and destination systems.',
      'Staff responsibilities and approval requirements.',
      'Current software and integration options.',
      'Common errors, delays and workflow exceptions.',
    ],
  },
  {
    number: '02',
    title: 'AI-Powered Information Processing',
    desc: 'Where unstructured information is involved, AI interprets documents, messages and patient inputs into clean, machine-readable data.',
    items: [
      'Large Language Models (LLMs) & Natural Language Processing (NLP).',
      'Retrieval-Augmented Generation (RAG) for practice knowledge.',
      'Intelligent document and field extraction.',
      'Structured data generation for backend APIs.',
      'Context-aware AI agents for complex multi-step reasoning.',
    ],
  },
  {
    number: '03',
    title: 'Validation and Business Rules',
    desc: 'AI outputs are never treated as verified facts without deterministic validation. We enforce strict guardrails before any system state changes.',
    items: [
      'Required-field checks and format validation.',
      'Duplicate detection and identity matching.',
      'Deterministic business-rule verification.',
      'Confidence score thresholds for automated routing.',
      'Automated flagging of uncertain data for human review.',
    ],
  },
  {
    number: '04',
    title: 'Workflow Orchestration',
    desc: 'After validation, orchestration pipelines coordinate multi-step actions across your software tools using n8n, custom APIs, webhooks and secure queues.',
    items: [
      'End-to-end orchestration across business tools.',
      'Conditional branching based on patient status or department.',
      'Webhook listeners for instantaneous event triggers.',
      'Error handling and automatic retry routines.',
    ],
    pipeline:
      'Incoming referral → Document extraction → Information validation → Administrative routing → Human review → Authorized system update → Status notification',
  },
  {
    number: '05',
    title: 'Human-in-the-Loop Review & Approval',
    desc: 'Not every task should be fully automated. Critical operational, financial and clinical decisions always maintain human oversight.',
    items: [
      'Manual approval gates before important record updates.',
      'Escalation queues for incomplete or ambiguous records.',
      'Staff alerts when exception thresholds are reached.',
      'Clean handover interfaces for clinical coordinators.',
      'Comprehensive logging of every approval and action.',
    ],
  },
  {
    number: '06',
    title: 'Monitoring and Continuous Optimization',
    desc: 'Automations are actively monitored after deployment to ensure high reliability, fast response times and zero silent failures.',
    items: [
      'Real-time workflow execution and API status.',
      'Failure alerts and error trace diagnostics.',
      'Integration health and throughput telemetry.',
      'Performance metrics and ongoing pipeline tuning.',
    ],
  },
] as const;

const INTEGRATION_PILLARS = [
  {
    title: 'Custom API Integrations',
    desc: 'We engineer custom API integrations based on available documentation, authentication requirements, permissions and technical compatibility—allowing your software to communicate seamlessly.',
  },
  {
    title: 'Webhooks & Real-Time Workflow Triggers',
    desc: 'Webhooks initiate workflows instantly when events occur—such as a new digital intake submission, document upload, or schedule update—without manual staff intervention.',
  },
  {
    title: 'Database and CRM Connectivity',
    desc: 'Custom pipelines synchronize supported PostgreSQL, SQL Server, HubSpot, Salesforce or specialized practice CRMs, eliminating repeated manual data entry across teams.',
  },
  {
    title: 'EHR and EMR Integration Assessment',
    desc: 'During technical discovery, we evaluate API documentation, HL7/FHIR support, authentication protocols, and permitted read/write scopes to engineer secure, compliant data exchanges.',
  },
  {
    title: 'n8n Visual Workflow Orchestration',
    desc: 'We utilize n8n to build transparent, auditable automation pipelines connecting application triggers, API requests, AI models, custom logic, and human approval queues.',
  },
] as const;

const SECURITY_CONTROLS = [
  {
    title: 'Access Management',
    desc: 'Enforce strict role-based access control (RBAC), least-privilege scoping, and token encryption for every user, application and automated process.',
  },
  {
    title: 'Data Protection',
    desc: 'End-to-end encryption in transit (TLS 1.3) and at rest (AES-256), secure transmission protocols, and hardened infrastructure architecture.',
  },
  {
    title: 'Audit Logging',
    desc: 'Immutable, traceable logs of workflow execution, system actions, human approvals, API payloads, and error events for complete accountability.',
  },
  {
    title: 'Human Review & Escalation',
    desc: 'Built-in circuit breakers that halt workflows, flag uncertain data, and route exceptions to designated clinic staff whenever confidence thresholds are not met.',
  },
  {
    title: 'Data Retention & Handling',
    desc: 'Strict retention schedules defining how patient records are stored, accessed, anonymized, returned, or securely deleted per agreed operational standards.',
  },
] as const;

const ORGANIZATIONS_SUPPORTED = [
  {
    title: 'Medical Clinics and Private Practices',
    desc: 'Streamline administrative processes including patient intake, appointment requests, referral processing, and routine administrative communications.',
  },
  {
    title: 'Hospitals and Healthcare Networks',
    desc: 'Coordinate multi-step workflow automation across departmental silos, administrative teams, and complex enterprise software environments.',
  },
  {
    title: 'Specialty Healthcare Groups',
    desc: 'Organize specialty-specific referral intake, procedure preparation reminders, document processing, and follow-up sequences for dental, dermatology, and surgical practices.',
  },
  {
    title: 'Telehealth and Digital Health Providers',
    desc: 'Connect digital intake forms, patient communication channels, calendar booking systems, and internal clinician queues into unified automated pipelines.',
  },
  {
    title: 'Healthcare Operations & Admin Teams',
    desc: 'Eliminate repetitive data entry and manual cross-system copy-pasting so administrative teams can focus on direct patient care and coordination.',
  },
] as const;

const IMPLEMENTATION_STEPS = [
  {
    step: '01',
    title: 'Discovery & Workflow Assessment',
    text: 'Understand the current operational bottlenecks, software environment, data sources, and automation goals.',
  },
  {
    step: '02',
    title: 'Technical Planning & Architecture',
    text: 'Define workflow sequences, API integration requirements, AI processing models, validation rules, and human approval gates.',
  },
  {
    step: '03',
    title: 'Custom Workflow Development',
    text: 'Build the automation using n8n orchestration pipelines, AI agent logic, webhooks, and custom middleware.',
  },
  {
    step: '04',
    title: 'System Integration',
    text: 'Connect supported EHRs, practice management platforms, communication tools, and databases with verified permissions.',
  },
  {
    step: '05',
    title: 'Testing & Validation',
    text: 'Simulate high-volume workflows, stress-test exception handling, verify validation rules, and run end-to-end data checks.',
  },
  {
    step: '06',
    title: 'Deployment & Continuous Optimization',
    text: 'Launch the approved workflows with live telemetry, monitor execution health, and continuously refine performance.',
  },
] as const;

const ADVANTAGES = [
  {
    title: 'Custom Automation Engineering',
    subtitle: 'Tailored Operational & Clinical Workflows',
    badge: 'Advantage 01',
    route: '/contact',
    desc: 'Workflows designed around your operational processes and clinical procedures rather than rigid generic templates.',
  },
  {
    title: 'AI Agents & LLM Integration',
    subtitle: 'Intelligent Parsing & Context-Aware Logic',
    badge: 'Advantage 02',
    route: '/contact',
    desc: 'State-of-the-art language models and context-aware agents for intelligent document parsing and unstructured data handling.',
  },
  {
    title: 'n8n Workflow Orchestration',
    subtitle: 'Visual, Maintainable & Scalable Pipelines',
    badge: 'Advantage 03',
    route: '/contact',
    desc: 'Visual, maintainable pipelines connecting applications, APIs, conditional branches, and custom business logic.',
  },
  {
    title: 'API & Webhook Integrations',
    subtitle: 'EHR / EMR, Practice Platforms & CRMs',
    badge: 'Advantage 04',
    route: '/contact',
    desc: 'Robust custom connections between your practice management software, EHR/EMR platforms, CRMs, and messaging tools.',
  },
  {
    title: 'Human-in-the-Loop Controls',
    subtitle: 'Fail-Safe Review & Staff Escalation Gates',
    badge: 'Advantage 05',
    route: '/contact',
    desc: 'Fail-safe review checkpoints, exception queues, and escalation gates that keep staff in full control of critical actions.',
  },
  {
    title: 'Flexible Architecture',
    subtitle: 'Modular Software Engineered to Scale',
    badge: 'Advantage 06',
    route: '/contact',
    desc: 'Modular software engineering designed for your current needs with the flexibility to scale as your organization expands.',
  },
  {
    title: 'Monitoring & Optimization',
    subtitle: 'Execution Telemetry & Zero Downtime',
    badge: 'Advantage 07',
    route: '/contact',
    desc: 'Continuous execution telemetry, error tracking, and proactive engineering support to ensure zero operational downtime.',
  },
] as const;

const FAQS = [
  {
    number: '01',
    question: 'What is AI workflow automation in healthcare?',
    answer:
      'AI workflow automation in healthcare uses artificial intelligence, workflow engines and software integrations to coordinate repetitive administrative processes. Examples include patient intake, appointment communication, referral document processing and administrative task routing.',
  },
  {
    number: '02',
    question: 'Which healthcare workflows can be automated using AI?',
    answer:
      'Potential use cases include patient registration, appointment scheduling, reminders, referral coordination, document extraction, administrative communication, insurance information processing and prior authorization document workflows. The appropriate level of automation depends on the organization\'s requirements and available integrations.',
  },
  {
    number: '03',
    question: 'Can AI workflow automation integrate with existing EHR and EMR systems?',
    answer:
      'Potentially, yes. Integration feasibility depends on the specific EHR or EMR platform, its APIs, available HL7 or FHIR interfaces, access permissions and technical documentation. Each integration must be assessed before implementation.',
  },
  {
    number: '04',
    question: 'Is AI workflow automation suitable for small medical clinics?',
    answer:
      'Yes. Small clinics and private practices may benefit from automating repetitive administrative tasks such as intake processing, appointment reminders, document handling and staff notifications. The solution can be scoped around the clinic\'s size, existing software and operational priorities.',
  },
  {
    number: '05',
    question: 'Can AI automate patient scheduling and appointment reminders?',
    answer:
      'Custom automation can support appointment requests, availability checks, confirmations, reminders, cancellations and rescheduling workflows when the required scheduling system integrations are available. Requests outside predefined rules can be routed to staff.',
  },
  {
    number: '06',
    question: 'Can AI automate healthcare referral management?',
    answer:
      'AI can assist with receiving and classifying referral documents, extracting configured information, identifying missing fields, creating administrative tasks and tracking workflow status. Staff review should remain in place where information is incomplete or an action requires human judgment.',
  },
  {
    number: '07',
    question: 'Does healthcare workflow automation require human oversight?',
    answer:
      'Human oversight is an important part of responsible healthcare automation. Approval gates, exception handling and staff escalation can be included so that uncertain information and consequential actions are reviewed by authorized personnel.',
  },
  {
    number: '08',
    question: 'Is AI workflow automation HIPAA compliant?',
    answer:
      'HIPAA compliance cannot be assumed simply because a workflow uses encryption, an AI model or a cloud platform. The organizations, infrastructure providers, data flows, contracts and safeguards must be evaluated. Where applicable, Business Associate Agreements and HIPAA requirements must be addressed before processing ePHI.',
  },
  {
    number: '09',
    question: 'Can Byte Operator build custom healthcare automation solutions?',
    answer:
      'Byte Operator develops custom AI automation, AI agent workflows, n8n pipelines, API integrations and connected software solutions. Healthcare projects are assessed individually to determine technical feasibility, data requirements, integration options and applicable security obligations.',
  },
  {
    number: '10',
    question: 'How long does healthcare workflow automation implementation take?',
    answer:
      'Implementation time depends on workflow complexity, integration availability, data requirements, approval processes and testing needs. A focused administrative workflow may require less development than a multi-system integration. A realistic timeline can be established after technical discovery.',
  },
  {
    number: '11',
    question: 'How much does AI workflow automation cost for healthcare organizations?',
    answer:
      'Pricing depends on the number of workflows, integrations, AI processing requirements, infrastructure, security considerations and ongoing support. A project assessment helps define the scope and identify the most practical implementation approach.',
  },
] as const;

function WorkflowSolutionsSlider() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % SOLUTIONS.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + SOLUTIONS.length) % SOLUTIONS.length);
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
    const diff = (idx - activeSlide + SOLUTIONS.length) % SOLUTIONS.length;
    if (diff === 0) return 'ft-workflow-slider-card ft-workflow-slider-card--active';
    if (diff === 1) return 'ft-workflow-slider-card ft-workflow-slider-card--next';
    if (diff === SOLUTIONS.length - 1) return 'ft-workflow-slider-card ft-workflow-slider-card--prev';
    return 'ft-workflow-slider-card ft-workflow-slider-card--hidden';
  };

  return (
    <section className="ft-workflow-section">
      <div className="ft-workflow-container">
        {/* Centered Heading */}
        <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto 2.5rem' }}>
          <p className="ft-workflow-eyebrow">CORE AUTOMATION CAPABILITIES</p>
          <h2 className="ft-workflow-heading">
            Custom AI Workflow Automation Solutions for Healthcare
          </h2>
          <p className="ft-workflow-subheading" style={{ margin: '0 auto' }}>
            Every healthcare organization has different operational requirements, software environments and administrative procedures. Byte Operator develops custom healthcare automation workflows based on the processes an organization wants to improve.
          </p>
        </div>

        {/* 3D Coverflow Carousel */}
        <div
          className="ft-workflow-slider-wrapper"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button
            type="button"
            className="ft-workflow-slider-nav-btn ft-workflow-slider-nav-btn--prev"
            onClick={prevSlide}
            aria-label="Previous solution"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <button
            type="button"
            className="ft-workflow-slider-nav-btn ft-workflow-slider-nav-btn--next"
            onClick={nextSlide}
            aria-label="Next solution"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          <div className="ft-workflow-slider-stage">
            {SOLUTIONS.map((sol, idx) => {
              const isActive = idx === activeSlide;
              return (
                <div
                  key={sol.title}
                  className={getCardClass(idx)}
                  onClick={() => {
                    if (!isActive) setActiveSlide(idx);
                  }}
                >
                  <span className="ft-workflow-solution-card__badge">{sol.badge}</span>
                  <h3 className="ft-workflow-solution-card__title">{sol.title}</h3>
                  <p className="ft-workflow-solution-card__desc">{sol.desc}</p>

                  <div className="ft-workflow-solution-card__checklist">
                    <p style={{ color: '#60a5fa', fontWeight: 600, fontSize: '0.8125rem', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 0.5rem 0' }}>
                      Workflow Capabilities Include:
                    </p>
                    {sol.checklist.map((item, cIdx) => (
                      <div className="ft-workflow-solution-card__check-item" key={cIdx}>
                        <span className="ft-workflow-solution-card__check-icon">✓</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="ft-workflow-solution-card__example">
                    {sol.example}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="ft-workflow-slider-dots">
            {SOLUTIONS.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`ft-workflow-slider-dot ${i === activeSlide ? 'ft-workflow-slider-dot--active' : ''}`}
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

const ADVANTAGE_ROTATES = ['-1.8deg', '1.4deg', '-0.8deg', '1.9deg', '-1.2deg', '1.5deg', '-1.6deg'];

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
    <section ref={sectionRef} className="ft-workflow-experience-section">
      <div className="ft-workflow-experience-inner">
        {/* Centered Heading Section */}
        <div className="ft-workflow-experience-heading">
          <p className="ft-workflow-experience-eyebrow">THE BYTE OPERATOR ADVANTAGE</p>
          <h2 className="ft-workflow-heading">
            Why Choose Byte Operator for Healthcare Workflow Automation?
          </h2>
          <p className="ft-workflow-subheading">
            Healthcare organizations need automation that fits their existing processes and technical environments. Byte Operator combines AI development, workflow orchestration and custom software integration to build solutions around specific business requirements.
          </p>
        </div>

        {/* Stacked Cards List on Scroll */}
        <div className="ft-workflow-experience-list">
          {ADVANTAGES.map((adv, index) => (
            <article
              key={adv.title}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="ft-workflow-experience-item"
              style={{
                ['--experience-card-base-rotate' as any]: ADVANTAGE_ROTATES[index] || '0deg',
              }}
            >
              {/* Circular arrow button on left */}
              <div
                className="ft-workflow-experience-arrow"
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
              <div className="ft-workflow-experience-copy">
                <div className="ft-workflow-experience-copy__header">
                  <h3 className="ft-workflow-experience-copy__title">{adv.title}</h3>
                  <span className="ft-workflow-experience-copy__subtitle">{adv.subtitle}</span>
                </div>
                <p className="ft-workflow-experience-copy__summary">{adv.desc}</p>
              </div>

              {/* Side: Badge & Explore link */}
              <div className="ft-workflow-experience-side">
                <span className="ft-workflow-experience-date">{adv.badge}</span>
                <Link href={adv.route} className="ft-workflow-experience-link">
                  <span>Explore Workflow</span>
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
        <div className="ft-workflow-experience-progress">
          <span className="ft-workflow-experience-counter">
            {String(currentActiveIndex + 1).padStart(2, '0')} / {String(ADVANTAGES.length).padStart(2, '0')}
          </span>
          <div className="ft-workflow-experience-dots">
            {ADVANTAGES.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                className={`ft-workflow-experience-dot ${dotIdx === currentActiveIndex ? 'ft-workflow-experience-dot--active' : ''}`}
                onClick={() => scrollToCard(dotIdx)}
                aria-label={`Scroll to advantage ${dotIdx + 1}`}
              />
            ))}
          </div>
          <span className="ft-workflow-experience-hint">Scroll down to explore</span>
        </div>
      </div>
    </section>
  );
}

export function AiWorkflowPageClient() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback
      });
    }
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((current) => (current === index ? null : index));
  };

  return (
    <div className="ft-workflow-page">
      {/* =========================================================
          1. HERO SECTION
      ========================================================= */}
      <section className="ft-workflow-hero">
        <div className="ft-workflow-container">
          <div className="ft-workflow-hero__header">
            <p className="ft-workflow-hero__eyebrow">
              HEALTHCARE OPERATIONS AUTOMATION
            </p>
            <h1 className="ft-workflow-hero__title">
              <span className="ft-workflow-hero__title-line">
                AI Workflow Automation
              </span>
              <span className="ft-workflow-hero__title-line">
                for Healthcare
              </span>
            </h1>

            <div
              className="ft-workflow-hero__text-group"
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
                Byte Operator builds custom AI workflow automation solutions for healthcare organizations—combining AI agents, LLMs, workflow orchestration, and custom API integrations to streamline patient intake, referral coordination, document processing, and administrative operations while keeping human teams in control.
              </p>
            </div>

            <div className="ft-workflow-hero__cta-group">
              <CalendlyButton
                label="Book a Healthcare Automation Consultation"
                className="ft-workflow-hero__btn-primary"
              />
              <Link
                to="/contact"
                prefetch="intent"
                className="ft-workflow-hero__btn-secondary"
              >
                Contact Byte Operator →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          HERO VIDEO SHOWCASE
      ========================================================= */}
      <section
        className="ft-hero-video-showcase"
        aria-label="AI Workflow Automation Video Showcase"
        style={{
          position: 'relative',
          width: '100%',
          padding: '0 2rem 5.5rem',
          background: 'var(--ft-dark-deep, #060F24)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          <div
            style={{
              position: 'relative',
              borderRadius: '20px',
              overflow: 'hidden',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow:
                '0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 40px rgba(59, 130, 246, 0.15)',
              backgroundColor: '#060F24',
            }}
          >
            <video
              ref={videoRef}
              src="https://cdn.shopify.com/videos/c/o/v/4d4e7a0aa052413fbf8dafbebdd13081.mp4"
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '780px',
                objectFit: 'cover',
                display: 'block',
              }}
              autoPlay
              muted
              loop
              playsInline
              controls
              preload="metadata"
            />
          </div>
        </div>
      </section>

      {/* =========================================================
          2. WHY HEALTHCARE NEEDS WORKFLOW AUTOMATION (2-COLUMN)
      ========================================================= */}
      <section className="ft-workflow-section">
        <div className="ft-workflow-container">
          <div className="ft-workflow-split-grid">
            <div>
              <p className="ft-workflow-eyebrow">CHALLENGES &amp; BOTTLENECKS</p>
              <h2 className="ft-workflow-heading">
                Why Healthcare Organizations Need Workflow Automation
              </h2>
              <p style={{ color: '#94a3b8', fontSize: '0.96875rem', lineHeight: 1.6, margin: '0 0 0.85rem 0' }}>
                Healthcare operations involve multiple interconnected administrative tasks. When handled manually across disconnected systems, organizations encounter common operational friction points:
              </p>
              <div className="ft-workflow-bullet-list">
                {PAIN_POINTS.map((point, idx) => (
                  <div className="ft-workflow-bullet-item" key={idx}>
                    <span className="ft-workflow-bullet-dot">•</span>
                    <span>{point}</span>
                  </div>
                ))}
              </div>
              <p style={{ color: '#cbd5e1', fontSize: '0.96875rem', lineHeight: 1.6, margin: '0.85rem 0 0 0' }}>
                Healthcare workflow automation connects your existing software through defined business rules, AI processing, and custom integrations—moving routine tasks forward automatically while routing complex exceptions to your team for human review.
              </p>
            </div>

            {/* Media Image Column */}
            <div className="ft-workflow-media">
              <div className="ft-workflow-media__card">
                <img
                  src="https://cdn.shopify.com/s/files/1/0676/1155/7936/files/Workflow_Automation_Story_Image.png?v=1793792357"
                  alt="Why Healthcare Organizations Need Workflow Automation"
                  className="ft-workflow-media__image"
                  width="1200"
                  height="800"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="ft-workflow-media__caption">
                <p className="ft-workflow-media__caption-title">
                  Healthcare Workflow Automation
                </p>
                <p className="ft-workflow-media__caption-sub">
                  Administrative Task Orchestration &amp; Automated Alerts
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          3. CUSTOM SOLUTIONS (6 CORE CAPABILITY CARDS CAROUSEL)
      ========================================================= */}
      <WorkflowSolutionsSlider />

      {/* =========================================================
          4. HOW OUR SYSTEMS WORK (6 ARCHITECTURE STAGES)
      ========================================================= */}
      <section className="ft-workflow-section">
        <div className="ft-workflow-container">
          <p className="ft-workflow-eyebrow">STRUCTURED ARCHITECTURE &amp; METHODOLOGY</p>
          <h2 className="ft-workflow-heading">
            How Our AI Healthcare Workflow Automation Systems Work
          </h2>
          <p className="ft-workflow-subheading">
            Effective automation requires more than connecting an AI model to an application. Each workflow needs a defined process, reliable data handling, validation rules, integration logic and a clear way to manage exceptions. Byte Operator approaches automation through a structured workflow architecture.
          </p>

          <div className="ft-workflow-steps-grid">
            {ARCHITECTURE_STAGES.map((stage) => (
              <div className="ft-workflow-step-card" key={stage.number}>
                <div className="ft-workflow-step-card__header">
                  <span className="ft-workflow-step-card__number">{stage.number}</span>
                  <h3 className="ft-workflow-step-card__title">{stage.title}</h3>
                </div>
                <p className="ft-workflow-step-card__desc">{stage.desc}</p>
                <div className="ft-workflow-step-card__items">
                  {stage.items.map((item, iIdx) => (
                    <div className="ft-workflow-step-card__item" key={iIdx}>
                      <span style={{ color: '#38bdf8', fontWeight: 700 }}>•</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                {'pipeline' in stage && stage.pipeline ? (
                  <div className="ft-workflow-step-card__pipeline">
                    <strong>Illustrative Pipeline:</strong> {stage.pipeline}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          5. CONNECT WITH EXISTING SYSTEMS (INTEGRATIONS)
      ========================================================= */}
      <section className="ft-workflow-section">
        <div className="ft-workflow-container">
          <p className="ft-workflow-eyebrow">SYSTEM INTEROPERABILITY</p>
          <h2 className="ft-workflow-heading">
            Connect AI Automation With Your Existing Healthcare Systems
          </h2>
          <p className="ft-workflow-subheading">
            Healthcare organizations often rely on several applications to manage appointments, patient information, documents, communication and administrative operations. Our approach focuses on connecting supported systems through custom integrations rather than requiring organizations to replace their existing software.
          </p>

          <div className="ft-workflow-cards-grid ft-workflow-cards-grid--3col">
            {INTEGRATION_PILLARS.map((item) => (
              <div className="ft-workflow-solution-card" key={item.title}>
                <h3 className="ft-workflow-solution-card__title" style={{ fontSize: '1.25rem' }}>
                  {item.title}
                </h3>
                <p className="ft-workflow-solution-card__desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          6. SECURITY, OVERSIGHT & HIPAA CONSIDERATIONS
      ========================================================= */}
      <section className="ft-workflow-section">
        <div className="ft-workflow-container">
          <p className="ft-workflow-eyebrow">SECURITY, HUMAN OVERSIGHT &amp; GOVERNANCE</p>
          <h2 className="ft-workflow-heading">
            Security, Human Oversight and Responsible AI Automation
          </h2>
          <p className="ft-workflow-subheading">
            Healthcare automation requires careful attention to how information is collected, processed, accessed, stored and transferred. Systems that handle Protected Health Information (PHI) or electronic Protected Health Information (ePHI) must be designed around applicable legal, contractual and security requirements.
          </p>

          <div className="ft-workflow-security-grid">
            {SECURITY_CONTROLS.map((control) => (
              <div className="ft-workflow-security-card" key={control.title}>
                <h3 className="ft-workflow-security-card__title">{control.title}</h3>
                <p className="ft-workflow-security-card__desc">{control.desc}</p>
              </div>
            ))}
          </div>

          <div className="ft-workflow-hipaa-callout">
            <h3 className="ft-workflow-hipaa-callout__title">
              HIPAA and Business Associate Agreement Considerations
            </h3>
            <p className="ft-workflow-hipaa-callout__text">
              HIPAA obligations depend on the organizations involved, the services being provided and whether PHI or ePHI is created, received, maintained or transmitted. Where a service provider qualifies as a business associate, the appropriate Business Associate Agreement (BAA) and applicable administrative, physical, and technical safeguards must be addressed before handling ePHI.
            </p>
            <p className="ft-workflow-hipaa-callout__text">
              Byte Operator does not claim HIPAA certification, blanket compliance, or BAA availability through this service page. These requirements must be formally evaluated for the proposed solution, its hosting infrastructure, and every third-party service provider before any electronic protected health information is processed.
            </p>
            <div>
              <a
                href="https://www.hhs.gov/hipaa/for-professionals/special-topics/health-information-technology/cloud-computing/index.html"
                target="_blank"
                rel="noopener noreferrer"
                className="ft-workflow-hipaa-callout__link"
              >
                View official U.S. Department of Health and Human Services (HHS) guidance on HIPAA &amp; cloud computing ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          7. HEALTHCARE ORGANIZATIONS WE SUPPORT
      ========================================================= */}
      <section className="ft-workflow-section">
        <div className="ft-workflow-container">
          <p className="ft-workflow-eyebrow">PRACTICES &amp; ORGANIZATIONS WE SUPPORT</p>
          <h2 className="ft-workflow-heading">
            Healthcare Organizations We Support
          </h2>
          <p className="ft-workflow-subheading">
            Our custom automation approach can be assessed for different healthcare environments, depending on their operational needs and technical requirements.
          </p>

          <div className="ft-workflow-cards-grid ft-workflow-cards-grid--3col">
            {ORGANIZATIONS_SUPPORTED.map((org) => (
              <div className="ft-workflow-solution-card" key={org.title}>
                <h3 className="ft-workflow-solution-card__title" style={{ fontSize: '1.25rem' }}>
                  {org.title}
                </h3>
                <p className="ft-workflow-solution-card__desc">{org.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          8. IMPLEMENTATION PROCESS (6 STEPS)
      ========================================================= */}
      <section className="ft-workflow-section">
        <div className="ft-workflow-container">
          <p className="ft-workflow-eyebrow">DEVELOPMENT ROADMAP</p>
          <h2 className="ft-workflow-heading">
            Our AI Workflow Automation Implementation Process
          </h2>
          <p className="ft-workflow-subheading">
            We follow a structured development process to ensure that automation is aligned with the organization&apos;s actual requirements.
          </p>

          <div className="ft-workflow-process-grid">
            {IMPLEMENTATION_STEPS.map((step) => (
              <div className="ft-workflow-process-card" key={step.step}>
                <span className="ft-workflow-process-card__number">{step.step}</span>
                <h3 className="ft-workflow-process-card__title">{step.title}</h3>
                <p className="ft-workflow-process-card__text">{step.text}</p>
              </div>
            ))}
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
                  AI Workflow Automation for Healthcare FAQs
                </h2>
                <p className="ft-home-faqs__subtitle">
                  Find clear answers to common questions about implementing AI workflow automation, n8n orchestration, EHR/EMR compatibility, and human oversight.
                </p>
              </div>

              {/* Callout box */}
              <div className="ft-home-faqs__callout">
                <h3 className="ft-home-faqs__callout-title">
                  Have questions about your specific software?
                </h3>
                <p className="ft-home-faqs__callout-text">
                  Our engineering team can evaluate your clinic processes, API documentation, and automation feasibility during a discovery call.
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
        eyebrow="HEALTHCARE WORKFLOW AUTOMATION"
        title="Automate Your Healthcare Workflows With Byte Operator"
        description="Manual administrative processes and disconnected applications can make healthcare operations more difficult to manage. With custom AI workflow automation, healthcare organizations can explore more structured ways to process information, coordinate administrative tasks, and connect existing software."
        tagline="Start with one operational challenge. Build a workflow that solves it. Expand when your organization is ready."
        primaryButtonLabel="Discuss Your Healthcare Automation Project"
        secondaryButtonLabel="Contact Our Engineering Team →"
        secondaryButtonHref="/contact"
        pillars={[
          {
            title: 'Intelligent Data Routing',
            description:
              'Parse inbound clinical documents, sync intake forms automatically, and eliminate duplicate data entry.',
          },
          {
            title: 'Connected Systems',
            description:
              'Link practice management platforms, CRM systems, and messaging queues with event-driven webhooks.',
          },
          {
            title: 'Audit Trails & Privacy',
            description:
              'End-to-end logging, role-based execution rights, and HIPAA-compliant data transmission standards.',
          },
        ]}
      />
    </div>
  );
}
