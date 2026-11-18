'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Link } from '~/lib/router-compat';
import { CalendlyButton } from '~/components/shared/CalendlyButton';

/* =========================================================
   FAQ DATA (ALL 10 QUESTIONS FROM SPECIFICATION)
========================================================= */

const SPECIALTY_FAQS = [
  {
    number: '01',
    question: 'What are healthcare software solutions for specialty practices?',
    answer:
      'Healthcare software solutions for specialty practices are applications, integrations, and technology systems designed to support the operational requirements of different medical specialties. They may include custom applications, administrative dashboards, AI voice agents, workflow automation, patient communication tools, and healthcare system integrations.',
  },
  {
    number: '02',
    question: 'Can custom software be developed for different medical specialties?',
    answer:
      'Yes. Custom healthcare software can be designed around the specific workflows, administrative requirements, and technology environments of different specialties. The functionality and development scope depend on the organization\'s needs and technical requirements.',
  },
  {
    number: '03',
    question: 'What types of specialty clinics can benefit from workflow automation?',
    answer:
      'Specialty clinics such as cardiology, orthopedics, neurology, ENT, gastroenterology, endocrinology, urology, pulmonology, and rehabilitation practices may benefit from suitable administrative workflow automation. Potential applications include appointment coordination, intake administration, communication, and internal task management.',
  },
  {
    number: '04',
    question: 'Can AI voice agents handle calls for specialty medical practices?',
    answer:
      'AI voice agents can be configured to support selected administrative call-handling workflows, including routine inquiries, appointment requests, reminders, and call routing. Requests requiring clinical judgment or staff intervention should be escalated to qualified human personnel.',
  },
  {
    number: '05',
    question: 'Can AI receptionists help manage appointment requests and patient inquiries?',
    answer:
      'Yes. Depending on the configured solution and available integrations, AI receptionists can support administrative appointment requests, answer approved routine questions, collect relevant information, and route inquiries to the appropriate staff members.',
  },
  {
    number: '06',
    question: 'Can custom healthcare software integrate with existing EHR or EMR systems?',
    answer:
      'Integration may be possible when the existing system provides suitable APIs, supported interfaces, documentation, and appropriate access permissions. Each integration project requires a technical assessment of the specific EHR or EMR environment.',
  },
  {
    number: '07',
    question: 'What is the difference between healthcare software development and practice management software?',
    answer:
      'Practice management software generally provides established functionality for administrative activities such as scheduling, billing, and patient management. Custom healthcare software development involves building applications or integrations around specific organizational requirements that existing products may not fully address.',
  },
  {
    number: '08',
    question: 'Can healthcare workflows be automated without replacing existing systems?',
    answer:
      'In some cases, yes. Custom integrations and automation workflows can connect supported existing applications and help coordinate selected administrative processes. The feasibility depends on the systems, available APIs, permissions, and technical architecture.',
  },
  {
    number: '09',
    question: 'Can technology support multi-provider and multi-location specialty practices?',
    answer:
      'Yes. Custom applications, centralized workflows, shared dashboards, and system integrations can support selected operational requirements across multiple providers and locations. The solution should be designed around the organization\'s structure and access requirements.',
  },
  {
    number: '10',
    question: 'How does Byte Operator approach healthcare software development projects?',
    answer:
      'Byte Operator begins by understanding the organization\'s requirements and existing technology environment. We assess technical dependencies, define the solution architecture, develop the agreed software or automation, test the implementation, and support deployment according to the project scope.',
  },
];

/* =========================================================
   OPERATIONAL CHALLENGES DATA
========================================================= */

const OPERATIONAL_CHALLENGES = [
  {
    title: 'Complex Specialty Appointment Coordination',
    desc: 'Specialty practices juggle distinct consultation lengths, equipment-dependent diagnostics, surgical facility blocks, and multi-provider schedules that standard booking tools cannot handle.',
    points: [
      'Provider-specific diagnostic buffer windows',
      'Procedure room and specialized equipment availability',
      'Urgent specialist referral slot allocation',
      'Complex multi-visit care plan scheduling',
    ],
  },
  {
    title: 'High Inbound Call Volumes & Routine Inquiries',
    desc: 'Front-desk teams spend hours answering repetitive questions about clinic directions, procedure preparation protocols, insurance network participation, and appointment confirmations.',
    points: [
      'Repetitive routine scheduling and cancellation calls',
      'Pre-procedure fasting and prep instruction inquiries',
      'Long telephone hold queues frustrating patients',
      'After-hours administrative communication gaps',
    ],
  },
  {
    title: 'Disconnected Software Systems & Data Entry',
    desc: 'Specialty clinics routinely use separate platforms for EHR, practice management, diagnostic devices, PACS imaging archives, and billing, requiring manual double-entry.',
    points: [
      'Manual copy-pasting of referral records across systems',
      'Siloed diagnostic reports and test findings',
      'Fragmented billing and administrative data exchange',
      'Lack of centralized operational visibility for leadership',
    ],
  },
  {
    title: 'End-to-End Referral Coordination Demands',
    desc: 'Managing inbound specialist referrals from primary care providers involves receiving faxes, organizing clinical notes, verifying insurance coverage, and notifying referring doctors.',
    points: [
      'Delayed processing of incoming specialist referrals',
      'Prior authorization document collection bottlenecks',
      'Missing consult reports back to referring physicians',
      'Unorganized administrative handoffs across clinic staff',
    ],
  },
];

/* =========================================================
   CORE CAPABILITIES DATA
========================================================= */

const CORE_CAPABILITIES = [
  {
    badge: 'AI Telephony',
    title: 'AI Voice Agents for Specialty Medical Practices',
    desc: 'Conversational AI receptionists tailored to specialty practice workflows, handling high-volume routine patient inquiries, scheduling requests, and triage 24/7.',
    features: [
      'Inbound patient call handling with natural speech recognition',
      'Appointment requests, rescheduling, and cancellation capture',
      'Approved procedure prep, directions, and hours information',
      'Intelligent call routing with seamless human staff handoff',
      '24/7 after-hours administrative answering coverage',
    ],
  },
  {
    badge: 'Workflow Automation',
    title: 'Healthcare Workflow Automation for Specialty Clinics',
    desc: 'Connected administrative pipelines that eliminate repetitive manual coordination, organize patient intake, and coordinate care workflows across your software stack.',
    features: [
      'Automated multi-channel appointment reminders and confirmations',
      'Digital specialty intake forms with custom clinical questionnaires',
      'Automated referral intake, document extraction, and tracking',
      'Prior authorization tracking and documentation compilation',
      'Multi-provider and multi-location task routing dashboards',
    ],
  },
  {
    badge: 'Custom Engineering',
    title: 'Custom Specialty Healthcare Software Development',
    desc: 'Bespoke web applications, administrative dashboards, and patient portals designed around your practice\'s clinical subspecialties and operational logic.',
    features: [
      'Practice-specific administrative dashboards and operational queues',
      'Modern, mobile-responsive patient self-service portals',
      'Multi-provider schedule coordination and lane management',
      'Internal staff task management and procedure readiness boards',
      'Scalable cloud architecture engineered for multi-location groups',
    ],
  },
  {
    badge: 'System Interoperability',
    title: 'EHR, EMR & Healthcare System Integration',
    desc: 'Robust middleware and custom API integrations connecting your specialty EHR/EMR with billing software, lab portals, patient communication tools, and external systems.',
    features: [
      'Bi-directional synchronization with leading specialty EHRs',
      'HL7 and FHIR healthcare interoperability interface development',
      'Custom REST and GraphQL API development for clinic middleware',
      'Automated referral data exchange and external record routing',
      'Permission-based secure data sharing adhering to access controls',
    ],
  },
];

/* =========================================================
   14 SPECIALTY PRACTICES MATRIX
========================================================= */

const SPECIALTY_MATRIX = [
  {
    title: 'Cardiology Practices',
    desc: 'Coordinate cardiology consultations, diagnostic stress tests, echo schedules, and telemetry data monitoring.',
    points: ['Diagnostic appointment coordination', 'Patient communication automation', 'Administrative follow-up reminders'],
  },
  {
    title: 'Orthopedic Practices',
    desc: 'Manage surgical consultations, physical therapy referral loops, MRI staging, and post-op mobility check-ins.',
    points: ['Consultation scheduling workflows', 'Referral administration', 'Custom administrative dashboards'],
  },
  {
    title: 'Neurology Practices',
    desc: 'Support ongoing neurological care, chronic migraine tracking, EEG/EMG scheduling, and infusion coordination.',
    points: ['Appointment request management', 'Follow-up communication workflows', 'Administrative task automation'],
  },
  {
    title: 'ENT (Otolaryngology)',
    desc: 'Coordinate ENT consultations, audiology testing, sinus procedure prep, and allergy immunotherapy recalls.',
    points: ['Procedure scheduling coordination', 'Routine patient inquiries', 'Diagnostic scope follow-ups'],
  },
  {
    title: 'Gastroenterology Practices',
    desc: 'Streamline colonoscopy and endoscopy scheduling, preparation protocol reminders, and pathology workflows.',
    points: ['Procedure prep instruction workflows', 'Biopsy result administrative tracking', 'Automated cancellation fill-ins'],
  },
  {
    title: 'Endocrinology Practices',
    desc: 'Coordinate recurring metabolic visits, continuous glucose monitor (CGM) sync, and lab interval tracking.',
    points: ['Recurring appointment workflows', 'Lab order administrative reminders', 'Specialty intake questionnaires'],
  },
  {
    title: 'Urology Practices',
    desc: 'Organize specialized consultation scheduling, prostate screenings, cystoscopy coordination, and post-op check-ins.',
    points: ['Appointment request handling', 'Referral coordination workflows', 'Administrative reminder sequences'],
  },
  {
    title: 'Pulmonology Practices',
    desc: 'Coordinate pulmonary function testing (PFT), sleep study workflows, CPAP compliance check-ins, and biologic therapy.',
    points: ['Diagnostic appointment coordination', 'Administrative notifications', 'Supported system integration'],
  },
  {
    title: 'Rheumatology Practices',
    desc: 'Manage recurring arthritis visits, biologics prior authorization documentation, and infusion chair scheduling.',
    points: ['Prior authorization document routing', 'Infusion cadence tracking', 'Follow-up communication automation'],
  },
  {
    title: 'Pain Management Practices',
    desc: 'Coordinate interventional injection appointments, compliance tracking, and multidisciplinary referral flows.',
    points: ['Interventional procedure scheduling', 'Administrative follow-ups', 'Role-based access permissions'],
  },
  {
    title: 'Pediatric Specialty Care',
    desc: 'Engage parents and authorized guardians with digital pediatric intake, milestone reminders, and school clearances.',
    points: ['Guardian inquiry handling', 'Well-child visit reminders', 'Clearance form generation'],
  },
  {
    title: 'Behavioral Health Practices',
    desc: 'Support confidential therapy booking, recurring session cadences, telehealth links, and discreet intake.',
    points: ['Confidential intake administration', 'Recurring therapy session booking', 'Strict access control safeguards'],
  },
  {
    title: 'Physical Therapy & Rehab',
    desc: 'Coordinate multi-week therapy plans, therapist room capacity, cancellation waitlists, and outcome questionnaires.',
    points: ['Recurring session scheduling', 'Therapist availability tracking', 'Automated attendance reminders'],
  },
  {
    title: 'OB-GYN Practices',
    desc: 'Manage prenatal visit milestones, routine ultrasounds, postpartum check-ins, and annual well-woman exams.',
    points: ['Prenatal schedule coordination', 'Ultrasound intake workflows', 'Postpartum administrative check-ins'],
  },
];

/* =========================================================
   OPERATING MODELS
========================================================= */

const OPERATING_MODELS = [
  {
    title: 'Independent Specialty Practices',
    desc: 'Focused solutions for patient communication, appointment coordination, administrative automation, and custom web applications.',
  },
  {
    title: 'Multi-Provider Specialty Groups',
    desc: 'Structured administrative workflows, provider-specific schedule buffers, and shared operational performance dashboards.',
  },
  {
    title: 'Multi-Location Clinic Networks',
    desc: 'Centralized administrative oversight, location-specific scheduling rules, and unified patient communication channels.',
  },
  {
    title: 'Specialty Outpatient Centers',
    desc: 'Comprehensive solutions connecting pre-op registration, procedural scheduling, patient prep instructions, and system integrations.',
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
    category: 'Primary Care',
    title: 'Primary Care Software Solutions',
    desc: 'Technology solutions tailored to primary care, family medicine, and internal medicine operations.',
    href: '/healthcare-solutions/primary-care',
  },
  {
    category: 'Telephony AI',
    title: 'AI Voice Agents for Healthcare',
    desc: 'Deploy HIPAA-aware conversational AI receptionists to handle patient scheduling and inquiries.',
    href: '/services/ai-voice-agents-healthcare',
  },
  {
    category: 'Interoperability',
    title: 'Healthcare Software Integration',
    desc: 'Connect your EHR, EMR, and clinical software through HL7, FHIR, and custom healthcare APIs.',
    href: '/healthcare-software-integration',
  },
];

/* =========================================================
   2. OPERATIONAL CHALLENGES (3D COVERFLOW CAROUSEL)
========================================================= */

function SpecialtyChallengesSlider() {
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
    if (diff === 0) return 'ft-specialty-slider-card ft-specialty-slider-card--active';
    if (diff === 1) return 'ft-specialty-slider-card ft-specialty-slider-card--next';
    if (diff === OPERATIONAL_CHALLENGES.length - 1) return 'ft-specialty-slider-card ft-specialty-slider-card--prev';
    return 'ft-specialty-slider-card ft-specialty-slider-card--hidden';
  };

  return (
    <section className="ft-specialty-challenges" aria-labelledby="challenges-title">
      <div className="ft-specialty-container">
        <div className="ft-specialty-section-header">
          <p className="ft-specialty-section-eyebrow">Operational Bottlenecks</p>
          <h2 id="challenges-title" className="ft-specialty-section-title">
            Technology Challenges Facing Specialty Medical Practices
          </h2>
          <p className="ft-specialty-section-desc">
            Every medical specialty has its own administrative requirements, patient communication patterns, and scheduling complexities. Off-the-shelf software rarely fits the precise reality of specialty clinical operations.
          </p>
        </div>

        {/* 3D Coverflow Carousel */}
        <div
          className="ft-specialty-slider-wrapper"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button
            type="button"
            className="ft-specialty-slider-nav-btn ft-specialty-slider-nav-btn--prev"
            onClick={prevSlide}
            aria-label="Previous challenge"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <button
            type="button"
            className="ft-specialty-slider-nav-btn ft-specialty-slider-nav-btn--next"
            onClick={nextSlide}
            aria-label="Next challenge"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          <div className="ft-specialty-slider-stage">
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
                  <div className="ft-specialty-challenge-card__icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                      <line x1="8" y1="21" x2="16" y2="21" />
                      <line x1="12" y1="17" x2="12" y2="21" />
                    </svg>
                  </div>
                  <h3 className="ft-specialty-challenge-card__title">{item.title}</h3>
                  <p className="ft-specialty-challenge-card__desc">{item.desc}</p>
                  <ul className="ft-specialty-challenge-card__bullets">
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

          <div className="ft-specialty-slider-dots">
            {OPERATIONAL_CHALLENGES.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`ft-specialty-slider-dot ${i === activeSlide ? 'ft-specialty-slider-dot--active' : ''}`}
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
   4. 14 SPECIALTY PRACTICES MATRIX (SCROLL-DRIVEN DECK)
========================================================= */

const SPECIALTY_MATRIX_ROTATES = [
  '-1.8deg',
  '1.4deg',
  '-1.2deg',
  '1.6deg',
  '-1.5deg',
  '1.2deg',
  '-1.6deg',
  '1.5deg',
  '-1.3deg',
  '1.4deg',
  '-1.7deg',
  '1.3deg',
  '-1.4deg',
  '1.5deg',
];

function SpecialtyMatrixScrollSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<(HTMLElement | null)[]>([]);
  const [currentActiveIndex, setCurrentActiveIndex] = useState(0);

  const scrollToCard = (index: number) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const scrollDistance = Math.max(sectionRef.current.offsetHeight - viewportHeight, 1);
    const targetProgress = index / (SPECIALTY_MATRIX.length - 1);
    const targetScrollY = scrollTop + rect.top + targetProgress * scrollDistance;

    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth',
    });
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
      const activePosition = progress * (SPECIALTY_MATRIX.length - 1);
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
            layer = 30 - index;
          }
        } else {
          const past = clamp(-distance, 0, 3);
          const pastOffset = isSmallScreen ? 16 : 22;
          y = -past * pastOffset;
          z = -past * 40;
          rotateZ = direction * past * 1.8;
          scale = 1 - past * 0.035;
          opacity = past > 2.5 ? 0 : clamp(1 - past * 0.25, 0.45, 1);
          layer = 25 - Math.round(past);
        }

        if (Math.abs(distance) < 0.5) {
          layer = 40;
        }

        card.style.setProperty('--experience-card-y', `${y.toFixed(1)}px`);
        card.style.setProperty('--experience-card-z', `${z.toFixed(1)}px`);
        card.style.setProperty('--experience-card-rotate-z', `${rotateZ.toFixed(2)}deg`);
        card.style.setProperty('--experience-card-scale', scale.toFixed(3));
        card.style.setProperty('--experience-card-opacity', opacity.toFixed(3));
        card.style.setProperty('--experience-card-layer', String(layer));
        card.style.pointerEvents = Math.abs(distance) < 0.6 ? 'auto' : 'none';
      });

      setCurrentActiveIndex(clamp(Math.round(activePosition), 0, SPECIALTY_MATRIX.length - 1));
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
    <section ref={sectionRef} className="ft-specialty-matrix-section" aria-labelledby="matrix-title">
      <div className="ft-specialty-matrix-inner">
        {/* Centered Heading */}
        <div className="ft-specialty-matrix-heading">
          <span className="ft-specialty-matrix-eyebrow">Medical Specialty Matrix</span>
          <h2 id="matrix-title" className="ft-specialty-section-title">
            Tailored Across Specialty Healthcare Disciplines
          </h2>
          <p className="ft-specialty-section-desc">
            Different medical specialties have distinct clinical workflows. Explore how our custom software, automation, and integrations adapt to your specialty.
          </p>
        </div>

        {/* Stacked Cards List on Scroll */}
        <div className="ft-specialty-matrix-list">
          {SPECIALTY_MATRIX.map((item, index) => (
            <article
              key={item.title}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="ft-specialty-matrix-item"
              style={{
                ['--experience-card-base-rotate' as any]: SPECIALTY_MATRIX_ROTATES[index] || '0deg',
              }}
            >
              {/* Circular arrow button on left */}
              <div
                className="ft-specialty-matrix-arrow"
                onClick={() => scrollToCard((index + 1) % SPECIALTY_MATRIX.length)}
                role="button"
                tabIndex={0}
                aria-label="Advance to next specialty"
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
              <div className="ft-specialty-matrix-copy">
                <div className="ft-specialty-matrix-copy__header">
                  <h3 className="ft-specialty-matrix-copy__title">{item.title}</h3>
                  <span className="ft-specialty-matrix-copy__subtitle">{item.points.join(' • ')}</span>
                </div>
                <p className="ft-specialty-matrix-copy__summary">{item.desc}</p>
              </div>

              {/* Side meta badge on right */}
              <div className="ft-specialty-matrix-side">
                <span className="ft-specialty-matrix-date">Specialty Practice</span>
                <Link
                  href="/contact"
                  className="ft-specialty-matrix-link"
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
        <div className="ft-specialty-matrix-progress">
          <span className="ft-specialty-matrix-counter">
            {String(currentActiveIndex + 1).padStart(2, '0')} / {String(SPECIALTY_MATRIX.length).padStart(2, '0')}
          </span>
          <div className="ft-specialty-matrix-dots">
            {SPECIALTY_MATRIX.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                className={`ft-specialty-matrix-dot ${
                  dotIdx === currentActiveIndex ? 'ft-specialty-matrix-dot--active' : ''
                }`}
                onClick={() => scrollToCard(dotIdx)}
                aria-label={`Scroll to specialty ${dotIdx + 1}`}
              />
            ))}
          </div>
          <span className="ft-specialty-matrix-hint">Scroll down to explore</span>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   MAIN CLIENT COMPONENT
========================================================= */

export function OtherSpecialtiesPageClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <div className="ft-specialty-page">
      {/* =========================================================
          1. HERO SECTION
      ========================================================= */}
      <section className="ft-specialty-hero" aria-labelledby="specialty-hero-title">
        <div className="ft-specialty-container">
          <div className="ft-specialty-hero__header">
            <div className="ft-specialty-hero__badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="m4.93 4.93 4.24 4.24" />
                <path d="m14.83 9.17 4.24-4.24" />
                <path d="m14.83 14.83 4.24 4.24" />
                <path d="m9.17 14.83-4.24 4.24" />
                <circle cx="12" cy="12" r="4" />
              </svg>
              <span>Specialty Medical Practice Solutions</span>
            </div>

            <h1 id="specialty-hero-title" className="ft-specialty-hero__title">
              Healthcare Software Solutions for <span>Specialty Practices</span>
            </h1>

            <p className="ft-specialty-hero__desc">
              Specialty medical practices need technology that supports their unique administrative workflows, patient communication requirements, and existing healthcare systems. Byte Operator develops custom software, AI voice agents, and healthcare integrations designed around your clinical specialty. Whether you operate an independent specialty clinic, a multi-provider group, or a growing outpatient network, we build technology around the way your specialty practice operates.
            </p>

            <div className="ft-specialty-hero__actions">
              <CalendlyButton className="ft-specialty-btn--primary">
                Discuss Your Healthcare Technology Project
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </CalendlyButton>

              <Link href="/contact" className="ft-specialty-btn--secondary">
                Contact Byte Operator
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          2. OPERATIONAL CHALLENGES (3D COVERFLOW CAROUSEL)
      ========================================================= */}
      <SpecialtyChallengesSlider />

      {/* =========================================================
          3. CORE CAPABILITIES (4 PILLARS)
      ========================================================= */}
      <section className="ft-specialty-capabilities" aria-labelledby="capabilities-title">
        <div className="ft-specialty-container">
          <div className="ft-specialty-section-header">
            <p className="ft-specialty-section-eyebrow">Engineering Solutions</p>
            <h2 id="capabilities-title" className="ft-specialty-section-title">
              Core Technology Solutions for Specialty Clinics
            </h2>
            <p className="ft-specialty-section-desc">
              Byte Operator combines specialty healthcare software architecture, intelligent voice automation, and custom development to solve operational complexity across disciplines.
            </p>
          </div>

          <div className="ft-specialty-capabilities__grid">
            {CORE_CAPABILITIES.map((cap, idx) => (
              <div key={idx} className="ft-specialty-cap-card">
                <span className="ft-specialty-cap-card__badge">{cap.badge}</span>
                <h3 className="ft-specialty-cap-card__title">{cap.title}</h3>
                <p className="ft-specialty-cap-card__desc">{cap.desc}</p>
                <ul className="ft-specialty-cap-card__list">
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
          4. 14 SPECIALTY PRACTICES MATRIX (SCROLL-DRIVEN DECK)
      ========================================================= */}
      <SpecialtyMatrixScrollSection />

      {/* =========================================================
          5. OPERATING MODELS
      ========================================================= */}
      <section className="ft-specialty-models" aria-labelledby="models-title">
        <div className="ft-specialty-container">
          <div className="ft-specialty-section-header">
            <p className="ft-specialty-section-eyebrow">Practice Architecture</p>
            <h2 id="models-title" className="ft-specialty-section-title">
              Supporting Different Specialty Healthcare Environments
            </h2>
            <p className="ft-specialty-section-desc">
              Whether you are an independent practice or a regional outpatient network, our software architecture scales around your organizational model.
            </p>
          </div>

          <div className="ft-specialty-models__grid">
            {OPERATING_MODELS.map((model, idx) => (
              <div key={idx} className="ft-specialty-model-card">
                <h3>{model.title}</h3>
                <p>{model.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          6. CLINICAL OVERSIGHT GUARDRAIL NOTICE
      ========================================================= */}
      <section className="ft-specialty-guardrail" aria-label="Clinical Oversight Notice">
        <div className="ft-specialty-container">
          <div className="ft-specialty-guardrail-box">
            <div className="ft-specialty-guardrail-box__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div className="ft-specialty-guardrail-box__content">
              <h4>Clinical Oversight & Medical Judgment Notice</h4>
              <p>
                Byte Operator technology solutions, AI voice agents, and administrative automations are designed strictly to support practice operations, patient communication, and administrative data workflows. All diagnostic evaluations, clinical triage, medical advice, and treatment plans remain under the exclusive professional judgment and oversight of licensed specialty physicians and healthcare personnel.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          7. SECURITY & HIPAA COMPLIANCE
      ========================================================= */}
      <section className="ft-specialty-security" aria-labelledby="security-title">
        <div className="ft-specialty-container">
          <div className="ft-specialty-section-header">
            <p className="ft-specialty-section-eyebrow">Enterprise Security</p>
            <h2 id="security-title" className="ft-specialty-section-title">
              Secure Healthcare Software & Cloud Infrastructure
            </h2>
            <p className="ft-specialty-section-desc">
              Applications used by specialty healthcare organizations process sensitive protected health information (PHI). We incorporate rigorous security, access control, and privacy safeguards across every tier.
            </p>
          </div>

          <div className="ft-specialty-security__grid">
            {SECURITY_CARDS.map((card, idx) => (
              <div key={idx} className="ft-specialty-security-card">
                <div className="ft-specialty-security-card__icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <h3 className="ft-specialty-security-card__title">{card.title}</h3>
                <p className="ft-specialty-security-card__desc">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          8. INTERACTIVE FAQS SECTION (ALL 10 QUESTIONS)
      ========================================================= */}
      <section className="ft-specialty-faqs" aria-labelledby="faqs-title">
        <div className="ft-specialty-container">
          <div className="ft-specialty-faqs__layout">
            <div className="ft-specialty-faqs__sticky">
              <p className="ft-specialty-section-eyebrow">Got Questions?</p>
              <h2 id="faqs-title" className="ft-specialty-section-title">
                Frequently Asked Questions
              </h2>
              <p className="ft-specialty-section-desc">
                Everything you need to know about specialty healthcare software development, AI voice agents, EHR integrations, and compliance.
              </p>

              <div className="ft-specialty-faqs__card">
                <h4>Have a Specific Specialty Question?</h4>
                <p>
                  Speak directly with our senior healthcare software engineers to discuss your practice management system, intake workflows, or automation ideas.
                </p>
                <CalendlyButton className="ft-specialty-btn--primary">
                  Book a Discovery Call
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </CalendlyButton>
              </div>
            </div>

            <div className="ft-specialty-faq-list">
              {SPECIALTY_FAQS.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className={`ft-specialty-faq-item${isOpen ? ' ft-specialty-faq-item--open' : ''}`}
                  >
                    <button
                      className="ft-specialty-faq-btn"
                      onClick={() => toggleFaq(idx)}
                      aria-expanded={isOpen}
                    >
                      <div className="ft-specialty-faq-btn__content">
                        <span className="ft-specialty-faq-num">{faq.number}</span>
                        <span>{faq.question}</span>
                      </div>
                      <div className="ft-specialty-faq-icon">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                      </div>
                    </button>
                    {isOpen && (
                      <div className="ft-specialty-faq-panel">
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
      <section className="ft-specialty-related" aria-labelledby="related-title">
        <div className="ft-specialty-container">
          <div className="ft-specialty-section-header">
            <p className="ft-specialty-section-eyebrow">Connected Capabilities</p>
            <h2 id="related-title" className="ft-specialty-section-title">
              Explore Related Healthcare Solutions
            </h2>
            <p className="ft-specialty-section-desc">
              Discover how our healthcare technology capabilities work together to modernize clinical operations.
            </p>
          </div>

          <div className="ft-specialty-related__grid">
            {RELATED_SERVICES.map((item, idx) => (
              <Link key={idx} href={item.href} className="ft-specialty-related-card">
                <span className="ft-specialty-related-card__category">{item.category}</span>
                <h3 className="ft-specialty-related-card__title">{item.title}</h3>
                <p className="ft-specialty-related-card__desc">{item.desc}</p>
                <span className="ft-specialty-related-card__arrow">
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
      <section className="ft-specialty-final-cta" aria-labelledby="final-cta-title">
        <div className="ft-specialty-container">
          <div className="ft-specialty-final-cta__box">
            <h2 id="final-cta-title" className="ft-specialty-final-cta__title">
              Build the Right Technology for Your Specialty Practice
            </h2>
            <p className="ft-specialty-final-cta__desc">
              Your specialty practice deserves technology that reflects its actual operational requirements. Whether you are exploring AI voice agents, automating administrative workflows, or developing custom healthcare software, Byte Operator can help assess the technical possibilities.
            </p>
            <div className="ft-specialty-hero__actions">
              <CalendlyButton className="ft-specialty-btn--primary">
                Discuss Your Healthcare Technology Project
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </CalendlyButton>

              <Link href="/contact" className="ft-specialty-btn--secondary">
                Contact Byte Operator
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
