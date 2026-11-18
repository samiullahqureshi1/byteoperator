'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Link } from '~/lib/router-compat';
import { CalendlyButton } from '~/components/shared/CalendlyButton';
import { ServiceFinalCta } from '~/components/shared/ServiceFinalCta';

/* =========================================================
   FAQ DATA (ALL 11 QUESTIONS FROM SPECIFICATION)
========================================================= */

const OPHTHALMOLOGY_FAQS = [
  {
    number: '01',
    question: 'What are ophthalmology clinic software solutions?',
    answer:
      'Ophthalmology clinic software solutions are applications and technology systems that support the administrative and operational requirements of eye care practices. They may include practice management tools, appointment scheduling, patient communication, EHR and EMR integrations, diagnostic imaging workflows, automation, and custom software applications.',
  },
  {
    number: '02',
    question: 'What software does an ophthalmology clinic need?',
    answer:
      'The software requirements depend on the size, services, and operational structure of the practice. Common systems include electronic health records, practice management software, appointment scheduling, patient communication tools, diagnostic imaging platforms, and billing applications. Some practices also benefit from custom integrations and automation.',
  },
  {
    number: '03',
    question: 'Can AI automate patient calls for ophthalmology clinics?',
    answer:
      'AI voice agents can support routine administrative calls, collect appointment requests, provide approved clinic information, assist with scheduling workflows, and route calls to staff. Clinical questions, urgent concerns, and situations requiring professional judgment should be escalated to qualified healthcare personnel.',
  },
  {
    number: '04',
    question: 'How can ophthalmology practices automate appointment scheduling?',
    answer:
      'Appointment workflows can be automated through connected scheduling applications, digital request forms, AI voice agents, calendar integrations, and notification systems. The available functionality depends on the scheduling platform and its integration capabilities.',
  },
  {
    number: '05',
    question: 'Can custom software integrate with an existing ophthalmology EHR or EMR?',
    answer:
      'Potentially, yes. Custom software can connect with supported EHR and EMR platforms through available APIs, vendor interfaces, or other approved integration methods. The feasibility depends on the specific system, technical documentation, access permissions, and integration requirements.',
  },
  {
    number: '06',
    question: 'Can ophthalmic imaging systems integrate with EHR software?',
    answer:
      'Some ophthalmic imaging environments can exchange information with compatible healthcare applications. Systems may involve OCT, fundus photography, retinal imaging, visual field testing, and other diagnostic technologies. Integration options depend on vendor support, available interfaces, and relevant standards such as DICOM or other supported exchange methods.',
  },
  {
    number: '07',
    question: 'What is the difference between ophthalmology EHR software and practice management software?',
    answer:
      'Ophthalmology EHR software primarily supports the management of electronic clinical records and related patient information. Practice management software generally focuses on administrative operations such as scheduling, registration, billing, and practice workflows. Some platforms combine both functions.',
  },
  {
    number: '08',
    question: 'Can Byte Operator develop custom software for an ophthalmology practice?',
    answer:
      'Yes. Byte Operator develops custom software and web applications based on project requirements. Potential solutions include administrative dashboards, workflow applications, patient-facing digital experiences, automation tools, and integrations with supported third-party systems.',
  },
  {
    number: '09',
    question: 'How can AI improve the patient experience in an ophthalmology clinic?',
    answer:
      'AI can support routine communication through voice agents, appointment-related inquiries, reminders, and administrative follow-up workflows. These tools can provide additional communication options while allowing clinic staff to manage complex and clinical matters.',
  },
  {
    number: '10',
    question: 'Is custom ophthalmology clinic software HIPAA compliant?',
    answer:
      'HIPAA compliance depends on the complete solution and its operating environment, not simply on whether software is custom-built. Relevant considerations include data handling, access controls, security safeguards, vendor responsibilities, organizational policies, and BAAs where applicable. Compliance must be evaluated and verified for the specific implementation.',
  },
  {
    number: '11',
    question: 'How much does custom ophthalmology software development cost?',
    answer:
      'The cost depends on the project\'s scope, required features, integrations, user roles, security requirements, infrastructure, and ongoing support needs. A focused automation project will generally have different requirements from a custom healthcare application or multi-system integration. Byte Operator can discuss the requirements and define a project scope before providing a proposal.',
  },
];

/* =========================================================
   OPERATIONAL CHALLENGES DATA
========================================================= */

const OPERATIONAL_CHALLENGES = [
  {
    title: 'Managing High-Volume & Specialized Appointments',
    desc: 'Ophthalmology clinics juggle general vision screenings, diagnostic appointments (OCT, visual fields), surgical evaluations, and laser consultations—each demanding distinct technician prep, dilation lead times, and room allocation.',
    points: [
      'Staggered appointment buffers for dilation delays',
      'Specialized equipment & lane availability scheduling',
      'Surgeon operative block vs. clinic day coordination',
      'Urgent add-on triage for acute visual symptoms',
    ],
  },
  {
    title: 'Connecting Disconnected Imaging & Patient Records',
    desc: 'Clinicians routinely switch between EHR platforms, imaging workstations (PACS), optical biometry tools, and billing software, resulting in manual data re-entry and administrative fragmentation.',
    points: [
      'Siloed diagnostic reports (OCT, topography, visual fields)',
      'Dual data entry across EHR and practice management',
      'Delayed transfer of external specialist referrals',
      'Disconnected surgery center and clinic record sync',
    ],
  },
  {
    title: 'Handling High-Volume Patient Calls & Inquiries',
    desc: 'Reception desks are inundated with inbound phone calls regarding pre-visit dilation instructions, post-op drop schedules, appointment confirmation, and insurance authorization questions.',
    points: [
      'Repetitive routine scheduling and cancellation calls',
      'Peak morning hold times stressing front desk staff',
      'Patient confusion regarding drivers for dilated visits',
      'Missed follow-up calls leading to clinic no-shows',
    ],
  },
  {
    title: 'Coordinating Complex Diagnostic & Follow-Up Workflows',
    desc: 'Chronic ophthalmic conditions like glaucoma, macular degeneration, and diabetic retinopathy require meticulous, long-term monitoring intervals that fall through the cracks without automated recalls.',
    points: [
      'Glaucoma IOP check and visual field re-test tracking',
      'Anti-VEGF intravitreal injection recurring cadence',
      'Cataract post-operative milestone check-ins (Day 1, Wk 1, Wk 4)',
      'Prior authorization tracking for specialty medications',
    ],
  },
];

/* =========================================================
   CORE CAPABILITIES DATA
========================================================= */

const CORE_CAPABILITIES = [
  {
    badge: 'AI Communication',
    title: 'AI Voice Agents for Ophthalmology Practices',
    desc: 'Custom-configured conversational AI receptionists that handle routine patient phone calls 24/7, triage administrative inquiries, collect intake details, and free your front-desk staff.',
    features: [
      'Answer routine incoming calls with natural voice recognition',
      'Collect appointment, rescheduling, and cancellation requests',
      'Provide approved clinic information and dilation driver notices',
      'Intelligently route urgent clinical calls to on-duty staff',
      'Provide 24/7 after-hours administrative answering coverage',
    ],
  },
  {
    badge: 'Practice Operations',
    title: 'Workflow Automation & Practice Operations',
    desc: 'End-to-end automation pipelines that coordinate digital patient intake, appointment confirmations, referral paperwork, and insurance verification workflows.',
    features: [
      'Multi-channel appointment reminders via SMS, email, and voice',
      'Digital patient intake forms with automatic record staging',
      'Automated administrative recall campaigns for chronic monitoring',
      'Prior authorization document compilation and status tracking',
      'Automated post-procedure administrative check-in workflows',
    ],
  },
  {
    badge: 'Bespoke Engineering',
    title: 'Custom Ophthalmology Software Development',
    desc: 'Tailored web applications, administrative dashboards, and patient-facing portals designed specifically around your practice\'s clinical subspecialties and operational logic.',
    features: [
      'Multi-provider and multi-location schedule coordination',
      'Custom administrative dashboards tracking clinic throughput',
      'Modern, mobile-responsive patient self-service portals',
      'Staff task management boards for surgical clearance tracking',
      'Custom reporting tools revealing administrative bottlenecks',
    ],
  },
  {
    badge: 'System Interoperability',
    title: 'EHR, EMR & Diagnostic Imaging Integration',
    desc: 'Robust middleware and API engineering connecting your core EHR/EMR platforms with ophthalmic imaging archives (PACS/DICOM), billing software, and third-party tools.',
    features: [
      'Bi-directional sync with major ophthalmology EHR/EMR systems',
      'DICOM and HL7/FHIR healthcare interoperability interfaces',
      'Integration with OCT, fundus photography, and visual field archives',
      'Custom REST and GraphQL API development for clinic middleware',
      'Automated data exchange preventing redundant manual entry',
    ],
  },
];

/* =========================================================
   OPHTHALMOLOGY SUBSPECIALTIES
========================================================= */

const SUBSPECIALTIES = [
  {
    title: 'Cataract & Refractive Surgery',
    desc: 'Streamline premium IOL selection workflows, pre-operative testing coordination, surgical facility paperwork, and milestone post-op check-ins.',
    points: [
      'Surgical consultation intake & consent staging',
      'Automated pre-op drop and fasting instructions',
      'Day 1, Week 1, and Month 1 post-op check-in triggers',
    ],
  },
  {
    title: 'Retina & Vitreous Practices',
    desc: 'Coordinate high-cadence intravitreal injection schedules, diabetic eye screening recalls, and urgent retinal tear referral processing.',
    points: [
      'Anti-VEGF injection series recall automation',
      'Fluorescein angiography & OCT review tracking',
      'Urgent flash/floater triage routing protocols',
    ],
  },
  {
    title: 'Glaucoma Care & Management',
    desc: 'Maintain tight recall intervals for IOP checks, visual field progressions, pachymetry, and nerve fiber layer OCT assessments.',
    points: [
      'Automated testing interval recall notifications',
      'Medication compliance & prescription refill reminders',
      'Progressive field loss test result flagging',
    ],
  },
  {
    title: 'Cornea & External Disease',
    desc: 'Manage specialized topography tracking, corneal cross-linking schedules, keratoconus follow-ups, and specialty lens fitting workflows.',
    points: [
      'Corneal donor tissue tracking coordination',
      'Cross-linking protocol documentation workflows',
      'Rigid gas permeable (RGP) fitting log organization',
    ],
  },
  {
    title: 'Pediatric Ophthalmology & Strabismus',
    desc: 'Engage parents and guardians with intuitive digital registration, automated amblyopia patching follow-ups, and clear pediatric dilation advice.',
    points: [
      'Guardian-focused SMS and digital intake forms',
      'Vision therapy & patching adherence follow-ups',
      'School clearance and vision report generation',
    ],
  },
  {
    title: 'Neuro-Ophthalmology & Oculoplastics',
    desc: 'Coordinate complex multi-disciplinary referrals, visual field defect reviews, cosmetic vs. functional blepharoplasty clearances, and photography.',
    points: [
      'Multi-specialty neurology & MRI referral sync',
      'Pre- and post-operative surgical photographic archives',
      'Insurance pre-authorization document staging',
    ],
  },
];

/* =========================================================
   SECURITY & COMPLIANCE DATA
========================================================= */

const SECURITY_CARDS = [
  {
    title: 'Role-Based Access Control',
    desc: 'Granular permissions safeguarding sensitive patient health records, diagnostic scans, and clinical notes based on verified staff roles.',
  },
  {
    title: 'End-to-End Encryption',
    desc: 'Industry-standard AES-256 encryption at rest and TLS 1.3 transit encryption securing all API transmissions, messages, and stored data.',
  },
  {
    title: 'HIPAA & BAA Compliance',
    desc: 'Architected with HIPAA administrative, physical, and technical safeguards in mind, supported by Business Associate Agreements where applicable.',
  },
  {
    title: 'Detailed Audit Logging',
    desc: 'Comprehensive, tamper-evident audit logs recording user access, system events, automated workflows, and data modifications.',
  },
];

/* =========================================================
   RELATED SERVICES DATA
========================================================= */

const RELATED_SERVICES = [
  {
    category: 'Interoperability',
    title: 'Healthcare Software Integration',
    desc: 'Connect your EHR, EMR, and clinical software through HL7, FHIR, and custom healthcare APIs.',
    href: '/healthcare-software-integration',
  },
  {
    category: 'AI Telephony',
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
    category: 'Infrastructure',
    title: 'Cloud Infrastructure Engineering',
    desc: 'High-availability, secure cloud infrastructure engineered for modern healthcare workloads.',
    href: '/cloud-infrastructure-engineering',
  },
];

/* =========================================================
   2. OPERATIONAL CHALLENGES (4 CARDS 3D COVERFLOW CAROUSEL)
========================================================= */

function OphthalmologyChallengesSlider() {
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
    if (diff === 0) return 'ft-ophtha-clinic-slider-card ft-ophtha-clinic-slider-card--active';
    if (diff === 1) return 'ft-ophtha-clinic-slider-card ft-ophtha-clinic-slider-card--next';
    if (diff === OPERATIONAL_CHALLENGES.length - 1) return 'ft-ophtha-clinic-slider-card ft-ophtha-clinic-slider-card--prev';
    return 'ft-ophtha-clinic-slider-card ft-ophtha-clinic-slider-card--hidden';
  };

  return (
    <section className="ft-ophtha-clinic-challenges" aria-labelledby="challenges-title">
      <div className="ft-ophtha-clinic-container">
        <div className="ft-ophtha-clinic-section-header">
          <p className="ft-ophtha-clinic-section-eyebrow">Operational Bottlenecks</p>
          <h2 id="challenges-title" className="ft-ophtha-clinic-section-title">
            Common Technology Challenges in Modern Eye Care
          </h2>
          <p className="ft-ophtha-clinic-section-desc">
            Ophthalmology is one of the most technology-intensive medical specialties. When diagnostic instruments, scheduling systems, and patient records don't talk to each other, administrative friction mounts quickly.
          </p>
        </div>

        {/* 3D Coverflow Carousel */}
        <div
          className="ft-ophtha-clinic-slider-wrapper"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button
            type="button"
            className="ft-ophtha-clinic-slider-nav-btn ft-ophtha-clinic-slider-nav-btn--prev"
            onClick={prevSlide}
            aria-label="Previous challenge"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <button
            type="button"
            className="ft-ophtha-clinic-slider-nav-btn ft-ophtha-clinic-slider-nav-btn--next"
            onClick={nextSlide}
            aria-label="Next challenge"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          <div className="ft-ophtha-clinic-slider-stage">
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
                  <div className="ft-ophtha-clinic-challenge-card__icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                      <line x1="8" y1="21" x2="16" y2="21" />
                      <line x1="12" y1="17" x2="12" y2="21" />
                    </svg>
                  </div>
                  <h3 className="ft-ophtha-clinic-challenge-card__title">{item.title}</h3>
                  <p className="ft-ophtha-clinic-challenge-card__desc">{item.desc}</p>
                  <ul className="ft-ophtha-clinic-challenge-card__bullets">
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

          <div className="ft-ophtha-clinic-slider-dots">
            {OPERATIONAL_CHALLENGES.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`ft-ophtha-clinic-slider-dot ${i === activeSlide ? 'ft-ophtha-clinic-slider-dot--active' : ''}`}
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
   4. SUBSPECIALTIES (6 CARDS SCROLL-DRIVEN DECK)
========================================================= */

const SUBSPECIALTIES_DATA = [
  {
    title: 'Cataract & Refractive Surgery',
    subtitle: 'Surgical Consultation Intake & Post-Op Milestones',
    badge: 'Subspecialty 01',
    route: '/contact',
    desc: 'Streamline premium IOL selection workflows, pre-operative testing coordination, surgical facility paperwork, and milestone post-op check-ins.',
  },
  {
    title: 'Retina & Vitreous Practices',
    subtitle: 'Intravitreal Injections & Urgent Retinal Triage',
    badge: 'Subspecialty 02',
    route: '/contact',
    desc: 'Coordinate high-cadence intravitreal injection schedules, diabetic eye screening recalls, and urgent retinal tear referral processing.',
  },
  {
    title: 'Glaucoma Care & Management',
    subtitle: 'Tight Recall Intervals & Visual Field Tracking',
    badge: 'Subspecialty 03',
    route: '/contact',
    desc: 'Maintain tight recall intervals for IOP checks, visual field progressions, pachymetry, and nerve fiber layer OCT assessments.',
  },
  {
    title: 'Cornea & External Disease',
    subtitle: 'Topography Tracking & Cross-Linking Schedules',
    badge: 'Subspecialty 04',
    route: '/contact',
    desc: 'Manage specialized topography tracking, corneal cross-linking schedules, keratoconus follow-ups, and specialty lens fitting workflows.',
  },
  {
    title: 'Pediatric Ophthalmology & Strabismus',
    subtitle: 'Guardian Intake & Amblyopia Therapy Adherence',
    badge: 'Subspecialty 05',
    route: '/contact',
    desc: 'Engage parents and guardians with intuitive digital registration, automated amblyopia patching follow-ups, and clear pediatric dilation advice.',
  },
  {
    title: 'Neuro-Ophthalmology & Oculoplastics',
    subtitle: 'Multi-Disciplinary MRI Referrals & Photography',
    badge: 'Subspecialty 06',
    route: '/contact',
    desc: 'Coordinate complex multi-disciplinary referrals, visual field defect reviews, cosmetic vs. functional blepharoplasty clearances, and photography.',
  },
] as const;

const SUBSPECIALTIES_ROTATES = ['-1.6deg', '1.4deg', '-0.9deg', '1.8deg', '-1.3deg', '1.5deg'];

function OphthalmologySubspecialtiesDeckSlider() {
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
    const targetScroll = sectionTop + (index / (SUBSPECIALTIES_DATA.length - 1)) * scrollDistance;
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
      const activePosition = progress * (SUBSPECIALTIES_DATA.length - 1);
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

      setCurrentActiveIndex(clamp(Math.round(activePosition), 0, SUBSPECIALTIES_DATA.length - 1));
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
    <section ref={sectionRef} className="ft-ophtha-clinic-experience-section" aria-labelledby="subspecialties-title">
      <div className="ft-ophtha-clinic-experience-inner">
        {/* Centered Heading Section */}
        <div className="ft-ophtha-clinic-experience-heading">
          <span className="ft-ophtha-clinic-experience-eyebrow">Specialized Practice Support</span>
          <h2 id="subspecialties-title" className="ft-ophtha-clinic-section-title">
            Tailored Across Ophthalmology Subspecialties
          </h2>
          <p className="ft-ophtha-clinic-section-desc">
            Every ophthalmic specialty operates with unique clinical testing rhythms, diagnostic hardware, and patient communications. We engineer software tailored to your specific clinical focus.
          </p>
        </div>

        {/* Stacked Cards List on Scroll */}
        <div className="ft-ophtha-clinic-experience-list">
          {SUBSPECIALTIES_DATA.map((sub, index) => (
            <article
              key={sub.title}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="ft-ophtha-clinic-experience-item"
              style={{
                ['--experience-card-base-rotate' as any]: SUBSPECIALTIES_ROTATES[index] || '0deg',
              }}
            >
              {/* Circular arrow button on left */}
              <div
                className="ft-ophtha-clinic-experience-arrow"
                onClick={() => scrollToCard((index + 1) % SUBSPECIALTIES_DATA.length)}
                role="button"
                tabIndex={0}
                aria-label="Advance to next subspecialty"
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
              <div className="ft-ophtha-clinic-experience-copy">
                <div className="ft-ophtha-clinic-experience-copy__header">
                  <h3 className="ft-ophtha-clinic-experience-copy__title">{sub.title}</h3>
                  <span className="ft-ophtha-clinic-experience-copy__subtitle">{sub.subtitle}</span>
                </div>
                <p className="ft-ophtha-clinic-experience-copy__summary">{sub.desc}</p>
              </div>

              {/* Side meta badge on right */}
              <div className="ft-ophtha-clinic-experience-side">
                <span className="ft-ophtha-clinic-experience-date">{sub.badge}</span>
                <Link
                  href={sub.route}
                  className="ft-ophtha-clinic-experience-link"
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
        <div className="ft-ophtha-clinic-experience-progress">
          <span className="ft-ophtha-clinic-experience-counter">
            {String(currentActiveIndex + 1).padStart(2, '0')} / {String(SUBSPECIALTIES_DATA.length).padStart(2, '0')}
          </span>
          <div className="ft-ophtha-clinic-experience-dots">
            {SUBSPECIALTIES_DATA.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                className={`ft-ophtha-clinic-experience-dot ${
                  dotIdx === currentActiveIndex ? 'ft-ophtha-clinic-experience-dot--active' : ''
                }`}
                onClick={() => scrollToCard(dotIdx)}
                aria-label={`Scroll to subspecialty ${dotIdx + 1}`}
              />
            ))}
          </div>
          <span className="ft-ophtha-clinic-experience-hint">Scroll down to explore</span>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   MAIN CLIENT COMPONENT
========================================================= */

export function OphthalmologyClinicsPageClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <div className="ft-ophtha-clinic-page">
      {/* =========================================================
          1. HERO SECTION
      ========================================================= */}
      <section className="ft-ophtha-clinic-hero" aria-labelledby="ophtha-hero-title">
        <div className="ft-ophtha-clinic-container">
          <div className="ft-ophtha-clinic-hero__header">
            <div className="ft-ophtha-clinic-hero__badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              <span>Ophthalmology Clinic Software Solutions</span>
            </div>

            <h1 id="ophtha-hero-title" className="ft-ophtha-clinic-hero__title">
              Technology Solutions That Help <span>Ophthalmology Practices</span> Work Smarter
            </h1>

            <p className="ft-ophtha-clinic-hero__desc">
              Connect your clinical systems, automate patient communications, and streamline high-volume ophthalmic workflows. Byte Operator develops custom software, AI voice agents, and EHR integrations built specifically around modern eye care operations. From appointment scheduling and diagnostic imaging coordination to post-op follow-up automation, we help eye care clinics reduce administrative burden while elevating patient experience.
            </p>

            <div className="ft-ophtha-clinic-hero__actions">
              <CalendlyButton className="ft-ophtha-clinic-btn--primary">
                Discuss Your Ophthalmology Technology Needs
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </CalendlyButton>

              <Link href="/contact" className="ft-ophtha-clinic-btn--secondary">
                Contact Byte Operator
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          2. OPERATIONAL CHALLENGES (4 Cards 3D Coverflow Carousel)
      ========================================================= */}
      <OphthalmologyChallengesSlider />

      {/* =========================================================
          3. CORE CAPABILITIES (4 PILLARS)
      ========================================================= */}
      <section className="ft-ophtha-clinic-capabilities" aria-labelledby="capabilities-title">
        <div className="ft-ophtha-clinic-container">
          <div className="ft-ophtha-clinic-section-header">
            <p className="ft-ophtha-clinic-section-eyebrow">Engineering Solutions</p>
            <h2 id="capabilities-title" className="ft-ophtha-clinic-section-title">
              Core Technology Solutions for Ophthalmology Clinics
            </h2>
            <p className="ft-ophtha-clinic-section-desc">
              Byte Operator combines healthcare software architecture, intelligent voice automation, and custom software development to solve operational complexity in eye care practices.
            </p>
          </div>

          <div className="ft-ophtha-clinic-capabilities__grid">
            {CORE_CAPABILITIES.map((cap, idx) => (
              <div key={idx} className="ft-ophtha-clinic-cap-card">
                <span className="ft-ophtha-clinic-cap-card__badge">{cap.badge}</span>
                <h3 className="ft-ophtha-clinic-cap-card__title">{cap.title}</h3>
                <p className="ft-ophtha-clinic-cap-card__desc">{cap.desc}</p>
                <ul className="ft-ophtha-clinic-cap-card__list">
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
          4. SUBSPECIALTIES (6 Cards Scroll Deck)
      ========================================================= */}
      <OphthalmologySubspecialtiesDeckSlider />

      {/* =========================================================
          5. DIAGNOSTIC IMAGING & INTEROPERABILITY
      ========================================================= */}
      <section className="ft-ophtha-clinic-interop" aria-labelledby="interop-title">
        <div className="ft-ophtha-clinic-container">
          <div className="ft-ophtha-clinic-interop__content">
            <div className="ft-ophtha-clinic-interop__text">
              <p className="ft-ophtha-clinic-section-eyebrow">Hardware & Data Interoperability</p>
              <h2 id="interop-title" style={{ fontSize: 'clamp(1.85rem, 3.2vw, 2.75rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: '1.25rem' }}>
                Connecting Ophthalmic Diagnostic Imaging & EHRs
              </h2>
              <p>
                Ophthalmology clinics depend heavily on specialized diagnostic modalities—from optical coherence tomography (OCT) and visual field analyzers to fundus cameras and corneal topographers. Connecting these devices to central EHRs and cloud repositories reduces manual indexing and speeds clinical decision-making.
              </p>
              <p>
                Byte Operator engineers custom healthcare middleware, DICOM archive connectors, and HL7/FHIR interfaces to establish seamless, bidirectional data flows between your diagnostic testing suites, practice management software, and patient communication tools.
              </p>

              <div className="ft-ophtha-clinic-interop__badges">
                <span className="ft-ophtha-interop-badge">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" /></svg>
                  DICOM 3.0 Standard
                </span>
                <span className="ft-ophtha-interop-badge">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" /></svg>
                  HL7 v2 & FHIR APIs
                </span>
                <span className="ft-ophtha-interop-badge">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" /></svg>
                  OCT & Fundus PACS Sync
                </span>
                <span className="ft-ophtha-interop-badge">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" /></svg>
                  Automated Order & Result Workflows
                </span>
              </div>
            </div>

            <div className="ft-ophtha-clinic-interop__card-grid">
              <div className="ft-ophtha-interop-mini-card">
                <h4>OCT Scans & Tomography</h4>
                <p>Facilitate automated staging and association of high-resolution macular and optic nerve OCT scans with patient clinical encounters.</p>
              </div>
              <div className="ft-ophtha-interop-mini-card">
                <h4>Visual Field Analyzers</h4>
                <p>Connect perimetry data feeds with electronic records to track glaucomatous progression indicators seamlessly over time.</p>
              </div>
              <div className="ft-ophtha-interop-mini-card">
                <h4>Fundus & Retinal Cameras</h4>
                <p>Bridge digital fundus photography systems with clinic storage for instant clinical review during in-person patient consultations.</p>
              </div>
              <div className="ft-ophtha-interop-mini-card">
                <h4>EHR & Billing Middleware</h4>
                <p>Eliminate dual-entry bottlenecks by synchronizing patient demographics, visit charges, and scheduling across clinic platforms.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          6. CLINICAL OVERSIGHT GUARDRAIL NOTICE
      ========================================================= */}
      <section className="ft-ophtha-clinic-guardrail" aria-label="Clinical Oversight Notice">
        <div className="ft-ophtha-clinic-container">
          <div className="ft-ophtha-guardrail-box">
            <div className="ft-ophtha-guardrail-box__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div className="ft-ophtha-guardrail-box__content">
              <h4>Clinical Oversight & Patient Safety Notice</h4>
              <p>
                Byte Operator technology solutions, AI voice agents, and administrative automations are designed strictly to support practice operations, patient communication, and administrative data workflows. All diagnostic evaluations, clinical interpretations, triage decisions, and surgical care plans remain under the exclusive professional judgment and oversight of licensed ophthalmologists and healthcare practitioners.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          7. SECURITY & HIPAA COMPLIANCE
      ========================================================= */}
      <section className="ft-ophtha-clinic-security" aria-labelledby="security-title">
        <div className="ft-ophtha-clinic-container">
          <div className="ft-ophtha-clinic-section-header">
            <p className="ft-ophtha-clinic-section-eyebrow">Enterprise Security</p>
            <h2 id="security-title" className="ft-ophtha-clinic-section-title">
              HIPAA-Aware Security & Protected Health Information
            </h2>
            <p className="ft-ophtha-clinic-section-desc">
              Eye care practices handle highly sensitive medical history, visual field reports, and surgical documentation. We build every component adhering to strict healthcare cybersecurity standards.
            </p>
          </div>

          <div className="ft-ophtha-clinic-security__grid">
            {SECURITY_CARDS.map((card, idx) => (
              <div key={idx} className="ft-ophtha-security-card">
                <div className="ft-ophtha-security-card__icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <h3 className="ft-ophtha-security-card__title">{card.title}</h3>
                <p className="ft-ophtha-security-card__desc">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          8. INTERACTIVE FAQS SECTION (ALL 11 QUESTIONS)
      ========================================================= */}
      <section className="ft-ophtha-clinic-faqs" aria-labelledby="faqs-title">
        <div className="ft-ophtha-clinic-container">
          <div className="ft-ophtha-clinic-faqs__layout">
            <div className="ft-ophtha-clinic-faqs__sticky">
              <p className="ft-ophtha-clinic-section-eyebrow">Got Questions?</p>
              <h2 id="faqs-title" className="ft-ophtha-clinic-section-title">
                Frequently Asked Questions
              </h2>
              <p className="ft-ophtha-clinic-section-desc">
                Everything you need to know about our ophthalmology software development, AI voice receptionists, system integrations, and compliance.
              </p>

              <div className="ft-ophtha-clinic-faqs__card">
                <h4>Have a Specific Practice Question?</h4>
                <p>
                  Speak directly with our senior healthcare software engineers to discuss your practice management system, imaging interfaces, or automation ideas.
                </p>
                <CalendlyButton className="ft-ophtha-clinic-btn--primary">
                  Book a Discovery Call
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </CalendlyButton>
              </div>
            </div>

            <div className="ft-ophtha-faq-list">
              {OPHTHALMOLOGY_FAQS.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className={`ft-ophtha-faq-item${isOpen ? ' ft-ophtha-faq-item--open' : ''}`}
                  >
                    <button
                      className="ft-ophtha-faq-btn"
                      onClick={() => toggleFaq(idx)}
                      aria-expanded={isOpen}
                    >
                      <div className="ft-ophtha-faq-btn__content">
                        <span className="ft-ophtha-faq-num">{faq.number}</span>
                        <span>{faq.question}</span>
                      </div>
                      <div className="ft-ophtha-faq-icon">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                      </div>
                    </button>
                    {isOpen && (
                      <div className="ft-ophtha-faq-panel">
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
      <section className="ft-ophtha-clinic-related" aria-labelledby="related-title">
        <div className="ft-ophtha-clinic-container">
          <div className="ft-ophtha-clinic-section-header">
            <p className="ft-ophtha-clinic-section-eyebrow">Connected Capabilities</p>
            <h2 id="related-title" className="ft-ophtha-clinic-section-title">
              Explore More Healthcare Technology Solutions
            </h2>
            <p className="ft-ophtha-clinic-section-desc">
              Discover how our healthcare technology capabilities work together to modernize clinical operations.
            </p>
          </div>

          <div className="ft-ophtha-clinic-related__grid">
            {RELATED_SERVICES.map((item, idx) => (
              <Link key={idx} href={item.href} className="ft-ophtha-related-card">
                <span className="ft-ophtha-related-card__category">{item.category}</span>
                <h3 className="ft-ophtha-related-card__title">{item.title}</h3>
                <p className="ft-ophtha-related-card__desc">{item.desc}</p>
                <span className="ft-ophtha-related-card__arrow">
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
        eyebrow="OPHTHALMOLOGY CLINIC SOLUTIONS"
        title="Build Smarter Technology for Your Ophthalmology Practice"
        description="Your ophthalmology clinic deserves software that reflects the precision of your clinical work. From AI voice receptionists and automated patient recall to custom EHR integrations, Byte Operator engineers practical, reliable technology solutions."
        tagline="Let's discuss how the right technology can support your eye care practice."
        primaryButtonLabel="Discuss Your Ophthalmology Project"
        secondaryButtonLabel="Contact Byte Operator →"
        secondaryButtonHref="/contact"
        pillars={[
          {
            title: 'Subspecialty Scheduling & Recall',
            description:
              'Smart triage routing cataract evaluations, glaucoma checks, retina emergencies, and routine refractions.',
          },
          {
            title: 'Diagnostic Imaging & EHR Sync',
            description:
              'Direct DICOM and PACS connectivity integrated with Nextech, ModMed EMA, Compulink, and EyeMD EMR.',
          },
          {
            title: 'Pre-Op & Post-Op Automation',
            description:
              'Automated surgical preparation instructions, eye drop regimens, and scheduled post-op follow-ups.',
          },
        ]}
      />
    </div>
  );
}
