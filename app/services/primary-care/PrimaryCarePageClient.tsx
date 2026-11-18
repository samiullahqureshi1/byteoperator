'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Link } from '~/lib/router-compat';
import { CalendlyButton } from '~/components/shared/CalendlyButton';
import { ServiceFinalCta } from '~/components/shared/ServiceFinalCta';

/* =========================================================
   FAQ DATA (ALL 12 QUESTIONS FROM SPECIFICATION)
========================================================= */

const PRIMARY_CARE_FAQS = [
  {
    number: '01',
    question: 'What are primary care software solutions?',
    answer:
      'Primary care software solutions are applications and technology services that support the administrative and operational requirements of primary care organizations. They may include practice management applications, appointment scheduling systems, patient communication tools, workflow automation, custom software, and EHR or EMR integrations.',
  },
  {
    number: '02',
    question: 'What software does a primary care practice need?',
    answer:
      'The appropriate software depends on the size, services, workflows, and technical requirements of the practice. Common systems include electronic health records, practice management software, appointment scheduling applications, patient communication platforms, billing tools, and administrative workflow solutions. Some organizations also require custom applications or integrations to connect their existing systems.',
  },
  {
    number: '03',
    question: 'What is primary care practice management software?',
    answer:
      'Primary care practice management software supports the administrative operations of a medical practice. Depending on the platform, it may include scheduling, registration, administrative reporting, billing workflows, and staff coordination.',
  },
  {
    number: '04',
    question: 'Can AI voice agents handle primary care appointment calls?',
    answer:
      'Yes. AI voice agents can be configured to support approved administrative calls, including appointment requests, scheduling inquiries, routine practice information, and message collection. The exact functionality depends on the configured workflow and available system integrations. Clinical concerns and complex requests should be escalated to qualified human staff.',
  },
  {
    number: '05',
    question: 'Can primary care appointment scheduling be automated?',
    answer:
      'Appointment-related workflows can be automated when the required scheduling systems, calendars, and permissions are available. Automation may support appointment requests, confirmations, reminders, cancellations, and rescheduling workflows.',
  },
  {
    number: '06',
    question: 'How can technology support preventive-care reminders?',
    answer:
      'Configured administrative workflows can help practices send clinic-approved reminders for wellness visits, screening appointments, and routine follow-ups. Clinical eligibility, screening recommendations, and patient-specific care decisions must remain under qualified healthcare professionals.',
  },
  {
    number: '07',
    question: 'Can workflow automation support chronic-care administration?',
    answer:
      'Yes. Workflow automation can help organize recurring appointment requests, administrative reminders, task tracking, and follow-up communication for patients receiving ongoing care. These workflows support administrative coordination rather than independently managing treatment or making clinical decisions.',
  },
  {
    number: '08',
    question: 'Can custom software integrate with an existing primary care EHR or EMR?',
    answer:
      'Potentially. Custom integrations may connect an EHR or EMR with other applications when the relevant vendor provides suitable APIs, permissions, and technical access. Integration feasibility must be evaluated for each system individually.',
  },
  {
    number: '09',
    question: 'Can primary care practices automate referral workflows?',
    answer:
      'Yes. Supported automation can help organize referral intake, document collection, task creation, status tracking, and staff notifications. The exact workflow depends on the practice\'s requirements and the systems involved.',
  },
  {
    number: '10',
    question: 'Can AI help manage routine patient inquiries?',
    answer:
      'AI tools can support approved administrative inquiries by providing configured information, collecting requests, and routing conversations to the appropriate staff. Clinical questions and matters requiring professional judgment should be handled by qualified healthcare personnel.',
  },
  {
    number: '11',
    question: 'Is custom primary care software HIPAA compliant?',
    answer:
      'Custom software is not automatically HIPAA compliant simply because it is developed for a healthcare organization. Compliance depends on the complete implementation, including applicable safeguards, access controls, hosting arrangements, vendors, contracts, and operational practices. HIPAA-related requirements and BAA obligations should be evaluated for each project.',
  },
  {
    number: '12',
    question: 'How much does custom primary care software development cost?',
    answer:
      'The cost depends on the application\'s functionality, integrations, complexity, security requirements, infrastructure, and ongoing support needs. A project involving a simple administrative application will have different requirements from a multi-system healthcare platform with custom APIs and AI-powered workflows. Byte Operator can review your requirements and discuss an appropriate development scope.',
  },
];

/* =========================================================
   OPERATIONAL CHALLENGES DATA
========================================================= */

const OPERATIONAL_CHALLENGES = [
  {
    title: 'High Patient Volumes & Appointment Demand',
    desc: 'Primary care clinics handle routine consultations, acute same-day visits, annual wellness exams, and provider-specific block schedules, putting acute pressure on reception desks.',
    points: [
      'Managing same-day triage requests alongside routine checks',
      'Staggered appointment buffers across multiple clinicians',
      'Peak morning call volumes overwhelming front desk staff',
      'Patient no-shows and last-minute cancellation bottlenecks',
    ],
  },
  {
    title: 'Repetitive Administrative Workload',
    desc: 'Patient intake, demographic updates, insurance paperwork, document requests, and routine inquiries require considerable staff time when conducted manually.',
    points: [
      'Manual entry of paper and PDF registration forms',
      'Repetitive telephone calls for routine clinic information',
      'Fragmented staff task assignments across office locations',
      'Time-consuming follow-up tracking for outstanding documents',
    ],
  },
  {
    title: 'Fragmented Healthcare Software Silos',
    desc: 'Primary care practices frequently maintain distinct software platforms for electronic health records, practice management, digital scheduling, billing, and patient messaging.',
    points: [
      'Duplicate data entry across EHR and practice management',
      'Delayed transfer of external specialist consultation notes',
      'Siloed patient communication channels and portal inboxes',
      'Lack of centralized operational visibility for clinic leaders',
    ],
  },
  {
    title: 'Care Coordination & Chronic Disease Follow-Up',
    desc: 'Primary care centers on ongoing patient relationships. Coordinating preventive wellness recalls, chronic disease checks (diabetes, hypertension), and referrals requires structured automation.',
    points: [
      'Complex referral document collection and tracking',
      'Recurring appointment recalls for chronic condition care',
      'Annual wellness visit and preventive screening reminders',
      'Post-visit administrative task handoffs and documentation',
    ],
  },
];

/* =========================================================
   CORE CAPABILITIES DATA
========================================================= */

const CORE_CAPABILITIES = [
  {
    badge: 'AI Telephony',
    title: 'AI Voice Agents for Primary Care Practices',
    desc: 'Intelligent conversational AI receptionists configured to answer incoming patient calls, manage routine administrative inquiries, collect appointment requests, and route calls 24/7.',
    features: [
      'Inbound patient call answering with natural speech recognition',
      'Appointment booking, rescheduling, and cancellation requests',
      'Approved clinic information, hours, directions, and prep notices',
      'Intelligent call routing with urgent clinical human handoff',
      '24/7 after-hours administrative answering and message staging',
    ],
  },
  {
    badge: 'Workflow Automation',
    title: 'Primary Care Workflow Automation',
    desc: 'Connected administrative pipelines that eliminate repetitive manual data entry, streamline patient intake, and coordinate care workflows across your software stack.',
    features: [
      'Automated multi-channel appointment reminders via SMS and email',
      'Digital patient intake forms with structured data capture',
      'Clinic-approved preventive care and annual wellness recalls',
      'Chronic disease administrative coordination and follow-up loops',
      'End-to-end referral management tracking and document routing',
    ],
  },
  {
    badge: 'Custom Engineering',
    title: 'Custom Primary Care Software Development',
    desc: 'Tailored web applications, practice management dashboards, and modern patient portals designed to match your specific multi-provider and multi-location operations.',
    features: [
      'Custom practice management dashboards tracking clinic throughput',
      'Modern, intuitive patient self-service portals and digital forms',
      'Multi-provider schedule coordination and lane management',
      'Internal staff task management boards and operational queues',
      'Scalable cloud architecture engineered for growing clinic groups',
    ],
  },
  {
    badge: 'System Interoperability',
    title: 'EHR, EMR & Healthcare System Integration',
    desc: 'Robust middleware and custom API integrations connecting your primary care EHR/EMR with billing software, lab portals, patient communication tools, and external systems.',
    features: [
      'Bi-directional synchronization with leading primary care EHRs',
      'HL7 and FHIR healthcare interoperability interface development',
      'Custom REST and GraphQL API development for clinic middleware',
      'Automated referral data exchange and external record routing',
      'Permission-based secure data sharing adhering to access controls',
    ],
  },
];

/* =========================================================
   PRIMARY CARE DISCIPLINES
========================================================= */

const DISCIPLINES = [
  {
    title: 'Family Medicine',
    desc: 'Coordinate healthcare across all age groups, supporting whole-family appointment scheduling, multi-patient registration, and recurring wellness visits.',
    points: [
      'Multi-family member appointment coordination',
      'Annual physical exam reminders and intake forms',
      'Immunization record tracking and administrative sync',
    ],
  },
  {
    title: 'General Internal Medicine',
    desc: 'Manage complex adult care workflows, recurring chronic condition monitoring, specialist referral administration, and post-discharge follow-ups.',
    points: [
      'Hypertension & diabetes care cadence coordination',
      'Specialist consultation document organization',
      'Lab order staging and administrative follow-up alerts',
    ],
  },
  {
    title: 'Pediatric Primary Care',
    desc: 'Streamline parent and guardian communication, well-child milestone visit scheduling, immunization tracking, and school clearance forms.',
    points: [
      'Authorized guardian digital intake and consent forms',
      'Well-child check-up age-based recall campaigns',
      'Automated sports and school physical document generation',
    ],
  },
  {
    title: 'Geriatric Primary Care',
    desc: 'Support elder care with caregiver-authorized communications, transportation coordination windows, and chronic care management tracking.',
    points: [
      'Caregiver and family proxy communication permissions',
      'Medicare Annual Wellness Visit (AWV) scheduling flows',
      'Medication reconciliation task tracking assistance',
    ],
  },
  {
    title: 'Preventive & Wellness Care',
    desc: 'Keep patient populations healthy with automated screening reminders, routine lab follow-ups, and pre-visit digital questionnaires.',
    points: [
      'Colonoscopy, mammography, and lipid panel recall loops',
      'Digital lifestyle and risk assessment questionnaires',
      'Routine administrative reminders for preventative visits',
    ],
  },
  {
    title: 'Same-Day & Routine Primary Care',
    desc: 'Balance acute same-day walk-in or urgent slots with scheduled routine appointments using intelligent intake and queue management.',
    points: [
      'Same-day acute appointment request triage',
      'Dynamic provider availability and buffer adjustment',
      'Automated cancellation fill-in waitlist notifications',
    ],
  },
];

/* =========================================================
   PATIENT JOURNEY STEPS
========================================================= */

const PATIENT_JOURNEY_STEPS = [
  {
    num: '01',
    title: 'Initial Inquiry',
    desc: 'Patient reaches clinic via phone, web, or portal; AI voice agent or digital form responds instantly.',
  },
  {
    num: '02',
    title: 'Appointment Request',
    desc: 'Automated scheduling workflows capture preferences and confirm slot availability.',
  },
  {
    num: '03',
    title: 'Digital Intake',
    desc: 'Patient completes mobile-friendly registration, medical history, and consent forms prior to arrival.',
  },
  {
    num: '04',
    title: 'Visit Coordination',
    desc: 'Automated reminders with directions and check-in instructions minimize clinic wait times.',
  },
  {
    num: '05',
    title: 'Admin Follow-Up',
    desc: 'Post-visit instructions, lab request tracking, and referral documentation coordinated automatically.',
  },
  {
    num: '06',
    title: 'Future Care Recall',
    desc: 'Scheduled annual physical reminders and chronic condition check-ins maintain long-term patient health.',
  },
];

/* =========================================================
   SECURITY & COMPLIANCE DATA
========================================================= */

const SECURITY_CARDS = [
  {
    title: 'Role-Based Access Control',
    desc: 'Granular permissions ensuring clinic staff, providers, and administrative personnel access only the data authorized for their roles.',
  },
  {
    title: 'End-to-End Encryption',
    desc: 'Industry-standard AES-256 encryption at rest and TLS 1.3 transit encryption securing all API transmissions, messages, and databases.',
  },
  {
    title: 'HIPAA-Aware Engineering',
    desc: 'Architected with HIPAA administrative, physical, and technical safeguards, supported by Business Associate Agreements (BAAs).',
  },
  {
    title: 'Comprehensive Audit Logs',
    desc: 'Tamper-evident system activity and data access logs giving clinic leadership complete operational traceability.',
  },
];

/* =========================================================
   RELATED SERVICES DATA
========================================================= */

const RELATED_SERVICES = [
  {
    category: 'Pillar Overview',
    title: 'Healthcare Technology Solutions',
    desc: 'Discover our comprehensive software engineering and AI solutions for modern healthcare organizations.',
    href: '/healthcare-solutions',
  },
  {
    category: 'Telephony AI',
    title: 'AI Voice Agents for Healthcare',
    desc: 'Deploy HIPAA-aware conversational AI receptionists to handle patient scheduling and inquiries.',
    href: '/services/ai-voice-agents-healthcare',
  },
  {
    category: 'Automation',
    title: 'AI Healthcare Workflow Automation',
    desc: 'Automate repetitive administrative workflows, document processing, and patient communication.',
    href: '/services/ai-workflow-automation-healthcare',
  },
  {
    category: 'Interoperability',
    title: 'Healthcare Software Integration',
    desc: 'Connect your EHR, EMR, and clinical software through HL7, FHIR, and custom healthcare APIs.',
    href: '/healthcare-software-integration',
  },
];

/* =========================================================
   2. OPERATIONAL CHALLENGES (4 CARDS 3D COVERFLOW CAROUSEL)
========================================================= */

function PrimaryCareChallengesSlider() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % OPERATIONAL_CHALLENGES.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + OPERATIONAL_CHALLENGES.length) % OPERATIONAL_CHALLENGES.length);
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
    const diff = (idx - activeSlide + OPERATIONAL_CHALLENGES.length) % OPERATIONAL_CHALLENGES.length;
    if (diff === 0) return 'ft-primary-care-slider-card ft-primary-care-slider-card--active';
    if (diff === 1) return 'ft-primary-care-slider-card ft-primary-care-slider-card--next';
    if (diff === OPERATIONAL_CHALLENGES.length - 1) return 'ft-primary-care-slider-card ft-primary-care-slider-card--prev';
    return 'ft-primary-care-slider-card ft-primary-care-slider-card--hidden';
  };

  return (
    <section className="ft-primary-care-challenges" aria-labelledby="challenges-title">
      <div className="ft-primary-care-container">
        <div className="ft-primary-care-section-header">
          <p className="ft-primary-care-section-eyebrow">Operational Bottlenecks</p>
          <h2 id="challenges-title" className="ft-primary-care-section-title">
            Technology Challenges Facing Modern Primary Care Practices
          </h2>
          <p className="ft-primary-care-section-desc">
            Primary care organizations handle a continuous flow of patient requests, appointments, administrative responsibilities, and communication across multiple channels. Without cohesive technology, operational friction compounds rapidly.
          </p>
        </div>

        {/* 3D Coverflow Carousel */}
        <div
          className="ft-primary-care-slider-wrapper"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button
            type="button"
            className="ft-primary-care-slider-nav-btn ft-primary-care-slider-nav-btn--prev"
            onClick={prevSlide}
            aria-label="Previous challenge"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <button
            type="button"
            className="ft-primary-care-slider-nav-btn ft-primary-care-slider-nav-btn--next"
            onClick={nextSlide}
            aria-label="Next challenge"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          <div className="ft-primary-care-slider-stage">
            {OPERATIONAL_CHALLENGES.map((item, idx) => {
              const isActive = idx === activeSlide;
              return (
                <div
                  key={item.title}
                  className={getCardClass(idx)}
                  onClick={() => {
                    if (!isActive) setActiveSlide(idx);
                  }}
                >
                  <div className="ft-primary-care-challenge-card__icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                      <line x1="8" y1="21" x2="16" y2="21" />
                      <line x1="12" y1="17" x2="12" y2="21" />
                    </svg>
                  </div>
                  <h3 className="ft-primary-care-challenge-card__title">{item.title}</h3>
                  <p className="ft-primary-care-challenge-card__desc">{item.desc}</p>
                  <ul className="ft-primary-care-challenge-card__bullets">
                    {item.points.map((pt, pIdx) => (
                      <li key={pIdx}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <div className="ft-primary-care-slider-dots">
            {OPERATIONAL_CHALLENGES.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`ft-primary-care-slider-dot ${i === activeSlide ? 'ft-primary-care-slider-dot--active' : ''}`}
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
   7. ENTERPRISE SECURITY (4 CARDS SCROLL-DRIVEN DECK)
========================================================= */

const SECURITY_EXPERIENCE_DATA = [
  {
    title: 'Role-Based Access Control',
    subtitle: 'Granular Staff Permissions & Least-Privilege Safeguards',
    badge: 'Security Tier 01',
    route: '/contact',
    desc: 'Granular permissions ensuring clinic staff, providers, and administrative personnel access only the data authorized for their specific clinical and operational roles.',
  },
  {
    title: 'End-to-End Encryption',
    subtitle: 'AES-256 Storage & TLS 1.3 In-Transit Cryptography',
    badge: 'Security Tier 02',
    route: '/contact',
    desc: 'Industry-standard AES-256 encryption at rest and TLS 1.3 transit encryption securing all API transmissions, messages, clinical documents, and databases.',
  },
  {
    title: 'HIPAA-Aware Engineering',
    subtitle: 'Administrative Safeguards & Formal BAA Alignment',
    badge: 'Security Tier 03',
    route: '/contact',
    desc: 'Architected with HIPAA administrative, physical, and technical safeguards in mind, supported by Business Associate Agreements (BAAs) where applicable.',
  },
  {
    title: 'Comprehensive Audit Logs',
    subtitle: 'Tamper-Evident Access Tracking & Compliance Forensics',
    badge: 'Security Tier 04',
    route: '/contact',
    desc: 'Comprehensive, tamper-evident system activity and data access logs giving clinic leadership complete operational traceability and regulatory accountability.',
  },
] as const;

const SECURITY_EXPERIENCE_ROTATES = ['-1.6deg', '1.4deg', '-0.9deg', '1.8deg'];

function PrimaryCareSecurityDeckSlider() {
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
    const targetScroll = sectionTop + (index / (SECURITY_EXPERIENCE_DATA.length - 1)) * scrollDistance;
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
      const activePosition = progress * (SECURITY_EXPERIENCE_DATA.length - 1);
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

      setCurrentActiveIndex(clamp(Math.round(activePosition), 0, SECURITY_EXPERIENCE_DATA.length - 1));
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
    <section ref={sectionRef} className="ft-primary-care-experience-section" aria-labelledby="security-title">
      <div className="ft-primary-care-experience-inner">
        {/* Centered Heading Section */}
        <div className="ft-primary-care-experience-heading">
          <span className="ft-primary-care-experience-eyebrow">Enterprise Security</span>
          <h2 id="security-title" className="ft-primary-care-section-title">
            Secure Healthcare Technology &amp; Cloud Infrastructure
          </h2>
          <p className="ft-primary-care-section-desc">
            Applications used by primary care practices process sensitive protected health information (PHI). We incorporate rigorous security, access control, and privacy safeguards across every tier.
          </p>
        </div>

        {/* Stacked Cards List on Scroll */}
        <div className="ft-primary-care-experience-list">
          {SECURITY_EXPERIENCE_DATA.map((item, index) => (
            <article
              key={item.title}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="ft-primary-care-experience-item"
              style={{
                ['--experience-card-base-rotate' as any]: SECURITY_EXPERIENCE_ROTATES[index] || '0deg',
              }}
            >
              {/* Circular arrow button on left */}
              <div
                className="ft-primary-care-experience-arrow"
                onClick={() => scrollToCard((index + 1) % SECURITY_EXPERIENCE_DATA.length)}
                role="button"
                tabIndex={0}
                aria-label="Advance to next security tier"
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
              <div className="ft-primary-care-experience-copy">
                <div className="ft-primary-care-experience-copy__header">
                  <h3 className="ft-primary-care-experience-copy__title">{item.title}</h3>
                  <span className="ft-primary-care-experience-copy__subtitle">{item.subtitle}</span>
                </div>
                <p className="ft-primary-care-experience-copy__summary">{item.desc}</p>
              </div>

              {/* Side meta badge on right */}
              <div className="ft-primary-care-experience-side">
                <span className="ft-primary-care-experience-date">{item.badge}</span>
                <Link
                  href={item.route}
                  className="ft-primary-care-experience-link"
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
        <div className="ft-primary-care-experience-progress">
          <span className="ft-primary-care-experience-counter">
            {String(currentActiveIndex + 1).padStart(2, '0')} / {String(SECURITY_EXPERIENCE_DATA.length).padStart(2, '0')}
          </span>
          <div className="ft-primary-care-experience-dots">
            {SECURITY_EXPERIENCE_DATA.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                className={`ft-primary-care-experience-dot ${
                  dotIdx === currentActiveIndex ? 'ft-primary-care-experience-dot--active' : ''
                }`}
                onClick={() => scrollToCard(dotIdx)}
                aria-label={`Scroll to security tier ${dotIdx + 1}`}
              />
            ))}
          </div>
          <span className="ft-primary-care-experience-hint">Scroll down to explore</span>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   MAIN CLIENT COMPONENT
========================================================= */

export function PrimaryCarePageClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <div className="ft-primary-care-page">
      {/* =========================================================
          1. HERO SECTION
      ========================================================= */}
      <section className="ft-primary-care-hero" aria-labelledby="primary-care-hero-title">
        <div className="ft-primary-care-container">
          <div className="ft-primary-care-hero__header">
            <div className="ft-primary-care-hero__badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
              <span>Primary Care Software Solutions</span>
            </div>

            <h1 id="primary-care-hero-title" className="ft-primary-care-hero__title">
              Technology Solutions That Help <span>Primary Care Practices</span> Work Smarter
            </h1>

            <p className="ft-primary-care-hero__desc">
              Connect your clinical systems, automate patient communications, and streamline high-volume primary care workflows. Byte Operator develops custom software, AI voice agents, and EHR integrations built specifically around family medicine and primary care operations. From appointment scheduling and digital intake to preventive-care reminders and referral tracking, we help primary care clinics reduce administrative burden while elevating patient experience.
            </p>

            <div className="ft-primary-care-hero__actions">
              <CalendlyButton className="ft-primary-care-btn--primary">
                Discuss Your Primary Care Technology Needs
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </CalendlyButton>

              <Link href="/contact" className="ft-primary-care-btn--secondary">
                Contact Byte Operator
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          2. OPERATIONAL CHALLENGES (4 Cards 3D Coverflow Carousel)
      ========================================================= */}
      <PrimaryCareChallengesSlider />

      {/* =========================================================
          3. CORE CAPABILITIES (4 PILLARS)
      ========================================================= */}
      <section className="ft-primary-care-capabilities" aria-labelledby="capabilities-title">
        <div className="ft-primary-care-container">
          <div className="ft-primary-care-section-header">
            <p className="ft-primary-care-section-eyebrow">Engineering Solutions</p>
            <h2 id="capabilities-title" className="ft-primary-care-section-title">
              Core Technology Solutions for Primary Care Clinics
            </h2>
            <p className="ft-primary-care-section-desc">
              Byte Operator combines healthcare software architecture, intelligent voice automation, and custom development to solve operational complexity in primary care practices.
            </p>
          </div>

          <div className="ft-primary-care-capabilities__grid">
            {CORE_CAPABILITIES.map((cap, idx) => (
              <div key={idx} className="ft-primary-care-cap-card">
                <span className="ft-primary-care-cap-card__badge">{cap.badge}</span>
                <h3 className="ft-primary-care-cap-card__title">{cap.title}</h3>
                <p className="ft-primary-care-cap-card__desc">{cap.desc}</p>
                <ul className="ft-primary-care-cap-card__list">
                  {cap.features.map((feat, fIdx) => (
                    <li key={fIdx}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          4. PRIMARY CARE DISCIPLINES
      ========================================================= */}
      <section className="ft-primary-care-disciplines" aria-labelledby="disciplines-title">
        <div className="ft-primary-care-container">
          <div className="ft-primary-care-section-header">
            <p className="ft-primary-care-section-eyebrow">Comprehensive Practice Coverage</p>
            <h2 id="disciplines-title" className="ft-primary-care-section-title">
              Technology Across Primary Care Disciplines
            </h2>
            <p className="ft-primary-care-section-desc">
              Primary care includes several medical disciplines and distinct patient populations. We engineer software around the operational needs of each specific practice type.
            </p>
          </div>

          <div className="ft-primary-care-disciplines__grid">
            {DISCIPLINES.map((disc, idx) => (
              <div key={idx} className="ft-primary-care-disc-card">
                <h3 className="ft-primary-care-disc-card__title">{disc.title}</h3>
                <p className="ft-primary-care-disc-card__desc">{disc.desc}</p>
                <ul className="ft-primary-care-disc-card__bullets">
                  {disc.points.map((pt, pIdx) => (
                    <li key={pIdx}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
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
          5. CONNECTED PATIENT JOURNEY
      ========================================================= */}
      <section className="ft-primary-care-journey" aria-labelledby="journey-title">
        <div className="ft-primary-care-container">
          <div className="ft-primary-care-section-header">
            <p className="ft-primary-care-section-eyebrow">Patient Experience</p>
            <h2 id="journey-title" className="ft-primary-care-section-title">
              Connecting the Entire Primary Care Patient Journey
            </h2>
            <p className="ft-primary-care-section-desc">
              Make routine administrative interactions more organized while ensuring patients can reach human staff whenever complex or clinical needs arise.
            </p>
          </div>

          <div className="ft-primary-care-journey__flow">
            {PATIENT_JOURNEY_STEPS.map((step, idx) => (
              <div key={idx} className="ft-primary-care-journey__step">
                <div className="ft-primary-care-journey__step-num">{step.num}</div>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          6. CLINICAL OVERSIGHT GUARDRAIL NOTICE
      ========================================================= */}
      <section className="ft-primary-care-guardrail" aria-label="Clinical Oversight Notice">
        <div className="ft-primary-care-container">
          <div className="ft-primary-care-guardrail-box">
            <div className="ft-primary-care-guardrail-box__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div className="ft-primary-care-guardrail-box__content">
              <h4>Clinical Oversight & Medical Judgment Notice</h4>
              <p>
                Byte Operator technology solutions, AI voice agents, and administrative automations are designed strictly to support practice operations, patient communication, and administrative data workflows. All diagnostic evaluations, clinical triage, medical advice, and treatment plans remain under the exclusive professional judgment and oversight of licensed primary care physicians and healthcare personnel.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          7. SECURITY & HIPAA COMPLIANCE (4 Cards Scroll Deck)
      ========================================================= */}
      <PrimaryCareSecurityDeckSlider />

      {/* =========================================================
          8. INTERACTIVE FAQS SECTION (ALL 12 QUESTIONS)
      ========================================================= */}
      <section className="ft-primary-care-faqs" aria-labelledby="faqs-title">
        <div className="ft-primary-care-container">
          <div className="ft-primary-care-faqs__layout">
            <div className="ft-primary-care-faqs__sticky">
              <p className="ft-primary-care-section-eyebrow">Got Questions?</p>
              <h2 id="faqs-title" className="ft-primary-care-section-title">
                Frequently Asked Questions
              </h2>
              <p className="ft-primary-care-section-desc">
                Everything you need to know about primary care software development, AI voice agents, EHR integrations, and compliance.
              </p>

              <div className="ft-primary-care-faqs__card">
                <h4>Have a Specific Practice Question?</h4>
                <p>
                  Speak directly with our senior healthcare software engineers to discuss your practice management system, patient intake workflows, or automation ideas.
                </p>
                <CalendlyButton className="ft-primary-care-btn--primary">
                  Book a Discovery Call
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </CalendlyButton>
              </div>
            </div>

            <div className="ft-primary-care-faq-list">
              {PRIMARY_CARE_FAQS.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className={`ft-primary-care-faq-item${isOpen ? ' ft-primary-care-faq-item--open' : ''}`}
                  >
                    <button
                      className="ft-primary-care-faq-btn"
                      onClick={() => toggleFaq(idx)}
                      aria-expanded={isOpen}
                    >
                      <div className="ft-primary-care-faq-btn__content">
                        <span className="ft-primary-care-faq-num">{faq.number}</span>
                        <span>{faq.question}</span>
                      </div>
                      <div className="ft-primary-care-faq-icon">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                      </div>
                    </button>
                    {isOpen && (
                      <div className="ft-primary-care-faq-panel">
                        <p>{faq.answer}</p>
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
          9. RELATED HEALTHCARE SOLUTIONS
      ========================================================= */}
      <section className="ft-primary-care-related" aria-labelledby="related-title">
        <div className="ft-primary-care-container">
          <div className="ft-primary-care-section-header">
            <p className="ft-primary-care-section-eyebrow">Connected Capabilities</p>
            <h2 id="related-title" className="ft-primary-care-section-title">
              Explore Related Healthcare Solutions
            </h2>
            <p className="ft-primary-care-section-desc">
              Discover how our healthcare technology capabilities work together to modernize clinical operations.
            </p>
          </div>

          <div className="ft-primary-care-related__grid">
            {RELATED_SERVICES.map((item, idx) => (
              <Link key={idx} href={item.href} className="ft-primary-care-related-card">
                <span className="ft-primary-care-related-card__category">{item.category}</span>
                <h3 className="ft-primary-care-related-card__title">{item.title}</h3>
                <p className="ft-primary-care-related-card__desc">{item.desc}</p>
                <span className="ft-primary-care-related-card__arrow">
                  Learn More
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          10. FINAL CONVERSION CTA
      ========================================================= */}
      <ServiceFinalCta
        eyebrow="PRIMARY CARE SOFTWARE SOLUTIONS"
        title="Build Smarter Technology for Your Primary Care Practice"
        description="Your primary care organization deserves technology that supports its operational requirements and works seamlessly with the systems your team already uses. Let's build a more connected practice together."
        tagline="Let's discuss your primary care technology needs with our engineering team."
        primaryButtonLabel="Discuss Your Primary Care Project"
        secondaryButtonLabel="Contact Byte Operator →"
        secondaryButtonHref="/contact"
        pillars={[
          {
            title: 'High-Volume Call & Intake AI',
            description:
              '24/7 patient answering, intelligent same-day appointment triage, and seamless digital registration workflows.',
          },
          {
            title: 'Preventive Care & Recall Automations',
            description:
              'Automated annual wellness reminders, chronic disease follow-ups, and immunization gap notifications.',
          },
          {
            title: 'EHR & Lab Interoperability',
            description:
              'Bi-directional integration connecting electronic health records, diagnostic lab orders, and pharmacy routing.',
          },
        ]}
      />
    </div>
  );
}
