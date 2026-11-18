'use client';

import {useState, useEffect, useRef} from 'react';
import {Link} from '~/lib/router-compat';
import {CalendlyButton} from '~/components/shared/CalendlyButton';
import {ServiceFinalCta} from '~/components/shared/ServiceFinalCta';

const CHECKLIST_ITEMS = [
  'Manage inbound patient calls through AI voice agents.',
  'Support routine patient inquiries and administrative communication.',
  'Assist with appointment scheduling workflows.',
  'Organize appointment reminders and patient follow-ups.',
  'Connect voice-agent workflows with supported healthcare systems.',
  'Develop custom solutions around existing business processes.',
];

const CAPABILITIES = [
  {
    title: 'Handle Inbound Patient Calls',
    text: 'Incoming calls are an important part of the patient experience. Patients may contact a practice to ask about services, request appointments or obtain general administrative information. AI voice agents can assist with these interactions by understanding routine requests and responding according to configured practice information and workflows. This provides healthcare organizations with another way to manage incoming communication while helping reduce repetitive work for reception staff.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    title: 'Respond to Routine Patient Inquiries',
    text: 'Healthcare practices regularly receive questions about appointments, office information, available services and administrative procedures. An AI medical receptionist can be configured to handle approved, non-clinical inquiries using information supplied by the practice. This helps create a more organized communication process and gives patients a consistent way to access routine information. Clinical questions and requests that require professional judgment should remain within the appropriate healthcare team\'s responsibility.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
  {
    title: 'Assist With Appointment Requests',
    text: 'Appointment coordination can involve multiple steps, from understanding a patient\'s request to checking the relevant scheduling information and communicating the next step. Byte Operator\'s AI voice solutions can support appointment-related workflows through appropriate scheduling integrations. Depending on the configured system, these workflows can support appointment requests, booking processes, rescheduling and cancellation requests.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    title: 'Support Call Routing and Staff Coordination',
    text: 'Not every patient request should be handled entirely through automation. Some conversations require additional information, staff involvement or attention from the appropriate healthcare team. A well-designed voice-agent workflow should account for these situations. During implementation, Byte Operator can assess the appropriate routing and escalation requirements for the organization\'s communication process.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
      </svg>
    ),
  },
];

const SCHEDULING_PILLARS = [
  {
    title: 'Patient Appointment Booking',
    text: 'AI voice-agent workflows can assist patients with appointment requests and support booking processes through connected scheduling systems. The integration requirements depend on the healthcare organization\'s existing software, scheduling rules and technical environment.',
  },
  {
    title: 'Appointment Rescheduling and Cancellations',
    text: 'Patients may need to change or cancel an existing appointment. Handling these requests manually can create additional work for front-desk teams. Configured AI workflows can help process appointment-change requests and direct them through the appropriate scheduling process.',
  },
  {
    title: 'More Organized Appointment Coordination',
    text: 'Connecting appointment-related communication with existing systems can help practices organize scheduling activities more consistently. Byte Operator evaluates the organization\'s operational requirements before designing the appropriate integration and workflow. The goal is to support a smoother appointment coordination process without introducing unnecessary complexity into existing operations.',
  },
];

const FOLLOWUP_PILLARS = [
  {
    title: 'Appointment Reminders and Confirmations',
    text: 'Appointment reminders help practices communicate important scheduling information to patients. Configured automation workflows can support reminder and confirmation processes according to the organization\'s communication requirements.',
  },
  {
    title: 'Scheduled Patient Follow-Up Workflows',
    text: 'Some practices need to contact patients after an appointment, follow up on an earlier inquiry or communicate information about a scheduled visit. Byte Operator can develop follow-up workflows around the practice\'s requirements, including the appropriate communication process and supporting system integrations.',
  },
  {
    title: 'Streamlined Patient Communication',
    text: 'By organizing routine reminders and follow-up activities, healthcare providers can reduce the amount of repetitive communication managed manually by their teams. The specific communication channels, timing and workflow actions are determined during solution planning.',
  },
];

const INTEGRATION_CONSIDERATIONS = [
  'Existing EHR and EMR systems.',
  'Available API documentation and integration capabilities.',
  'Appointment and scheduling workflows.',
  'Required information exchange.',
  'Existing software and operational processes.',
  'Technical and security requirements.',
];

const STEPS = [
  {
    step: '01',
    title: 'A Patient Calls the Practice',
    text: 'A patient contacts the healthcare organization through its configured phone system. The AI voice agent receives the inbound call and begins the conversation according to the practice’s communication requirements.',
    image:
      'https://cdn.shopify.com/s/files/1/0676/1155/7936/files/How_It_Works_01_Patient_Calls.webp?v=1793823668',
  },
  {
    step: '02',
    title: 'The AI Understands the Request',
    text: 'The voice agent processes the patient’s spoken request and identifies the purpose of the conversation—whether asking about an appointment, requesting general practice information, or looking to change an existing booking.',
    image:
      'https://cdn.shopify.com/s/files/1/0676/1155/7936/files/How_It_Works_02_AI_Understands.webp?v=1793823670',
  },
  {
    step: '03',
    title: 'The Appropriate Workflow Is Initiated',
    text: 'Based on the request and available integrations, the AI system follows the relevant configured workflow: providing approved practice information, assisting with an appointment request, or interacting with a connected scheduling system.',
    image:
      'https://cdn.shopify.com/s/files/1/0676/1155/7936/files/How_It_Works_03_Workflow_Initiated.webp?v=1793823672',
  },
  {
    step: '04',
    title: 'The Appropriate Next Step Is Identified',
    text: 'If a request requires additional attention or falls outside the configured workflow, the system follows the escalation or staff-coordination process established during implementation, ensuring human oversight is always maintained.',
    image:
      'https://cdn.shopify.com/s/files/1/0676/1155/7936/files/How_It_Works_04_Next_Step_Identified.webp?v=1793823674',
  },
];

const SPECIALTIES = [
  {
    title: 'Medical Practices',
    subtitle: 'Primary Care & Specialty Outpatient',
    badge: 'Specialty 01',
    route: '/services/medical-practices',
    text: 'Medical practices manage incoming patient calls, appointment requests and routine administrative inquiries. AI voice-agent workflows can support these communication activities and help organize appointment-related processes.',
  },
  {
    title: 'Dental Practices',
    subtitle: 'Dental Clinics & Orthodontics',
    badge: 'Specialty 02',
    route: '/services/dental-practices',
    text: 'Dental offices regularly coordinate consultations, appointment requests, scheduling changes and patient communication. AI receptionist solutions can be configured around these administrative workflows and the practice\'s scheduling requirements.',
  },
  {
    title: 'Dermatology and Aesthetic Clinics',
    subtitle: 'Aesthetic Medicine & Dermatology',
    badge: 'Specialty 03',
    route: '/services/dermatology-aesthetic-clinics',
    text: 'Dermatology and aesthetic clinics may receive inquiries about consultations, treatments, appointments and general clinic information. Configured AI voice solutions can support routine administrative communication and appointment coordination while directing clinical questions to the appropriate professionals.',
  },
  {
    title: 'Ophthalmology Clinics',
    subtitle: 'Eye Care & Surgical Practices',
    badge: 'Specialty 04',
    route: '/services/ophthalmology-clinics',
    text: 'Ophthalmology practices coordinate patient appointments and respond to routine administrative inquiries. AI voice-agent workflows can help organize incoming communication and support the practice\'s appointment-related processes.',
  },
  {
    title: 'Primary Care',
    subtitle: 'Family Practice & General Healthcare',
    badge: 'Specialty 05',
    route: '/services/primary-care',
    text: 'Primary care providers manage ongoing patient communication and a variety of appointment-related administrative responsibilities. AI voice solutions can be configured to support routine inquiries, appointment requests and planned communication workflows.',
  },
  {
    title: 'Other Healthcare Specialties',
    subtitle: 'Specialized Practices & Enterprise Groups',
    badge: 'Specialty 06',
    route: '/services/other-specialties',
    text: 'Different healthcare organizations may have specialized operational requirements. Byte Operator can assess these requirements and explore custom AI voice-agent workflows suited to the organization\'s services, software environment and communication processes.',
  },
];

const PRIVACY_CONSIDERATIONS = [
  'Identifying the information required for each workflow.',
  'Evaluating how patient information moves between connected systems.',
  'Reviewing access permissions and data-handling requirements.',
  'Assessing applicable healthcare privacy and security obligations.',
  'Defining appropriate staff involvement for sensitive or out-of-scope requests.',
];

const FAQS = [
  {
    number: '01',
    question: 'What is an AI healthcare receptionist?',
    answer:
      'An AI healthcare receptionist is a voice-based AI system designed to assist healthcare organizations with routine patient communication. Depending on its configuration, it can support incoming calls, general inquiries, appointment-related workflows and administrative communication.',
  },
  {
    number: '02',
    question: 'How do AI voice agents help healthcare providers?',
    answer:
      'AI voice agents can help healthcare providers organize routine phone communication, support appointment requests and streamline administrative workflows. They can reduce repetitive manual tasks and give staff more time for responsibilities requiring personal attention.',
  },
  {
    number: '03',
    question: 'Can an AI receptionist assist with patient appointment scheduling?',
    answer:
      'Yes. AI voice-agent workflows can be configured to support appointment requests and scheduling processes through appropriate system integrations. The available actions depend on the scheduling software, integration capabilities and agreed workflow.',
  },
  {
    number: '04',
    question: 'Can AI voice agents integrate with EHR and EMR systems?',
    answer:
      'AI voice solutions can be connected with supported EHR and EMR systems through suitable integration methods, including custom API development. Compatibility must be assessed based on the platform, available APIs and technical requirements.',
  },
  {
    number: '05',
    question: 'Can an AI receptionist handle appointment rescheduling and cancellations?',
    answer:
      'Appointment rescheduling and cancellation workflows can be configured when the necessary scheduling integration and business rules are available. The exact process depends on the connected system and the organization\'s requirements.',
  },
  {
    number: '06',
    question: 'Can healthcare practices customize their AI voice agents?',
    answer:
      'Yes. Byte Operator offers custom-built AI voice-agent development alongside managed solution delivery. Workflows can be planned around the practice\'s communication needs, operational processes and supported software integrations.',
  },
  {
    number: '07',
    question: 'Can an AI healthcare receptionist transfer calls to human staff?',
    answer:
      'Human involvement and escalation should be considered during implementation. The appropriate transfer or staff-coordination functionality depends on the phone system, configuration and agreed requirements.',
  },
  {
    number: '08',
    question: 'What is the difference between an AI receptionist and a traditional answering service?',
    answer:
      'A traditional answering service generally relies on human operators to receive and manage calls. An AI receptionist uses conversational AI to process spoken requests and follow configured workflows. The level of automation depends on the system\'s capabilities and integrations.',
  },
  {
    number: '09',
    question: 'How are AI voice agents implemented in healthcare practices?',
    answer:
      'Implementation typically begins with understanding the practice\'s call-handling requirements, existing phone and software systems, appointment workflows and integration needs. The solution is then configured or developed around the agreed requirements and tested before deployment.',
  },
  {
    number: '10',
    question: 'What should a healthcare practice consider before deploying an AI voice agent?',
    answer:
      'A healthcare practice should evaluate its communication requirements, scheduling systems, integration capabilities, patient privacy obligations, security requirements and the situations that require human involvement. A clearly defined implementation plan helps ensure that the solution fits the organization\'s operations.',
  },
];

function VoiceCapabilitiesSlider() {
  const [activeSlide, setActiveSlide] = useState(0);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % CAPABILITIES.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + CAPABILITIES.length) % CAPABILITIES.length);
  };

  const getCardClass = (idx: number) => {
    const diff = (idx - activeSlide + CAPABILITIES.length) % CAPABILITIES.length;
    if (diff === 0) return 'ft-voice-slider-card ft-voice-slider-card--active';
    if (diff === 1) return 'ft-voice-slider-card ft-voice-slider-card--next';
    if (diff === CAPABILITIES.length - 1) return 'ft-voice-slider-card ft-voice-slider-card--prev';
    return 'ft-voice-slider-card ft-voice-slider-card--hidden';
  };

  return (
    <div className="ft-voice-slider-wrapper">
      <button
        type="button"
        className="ft-voice-slider-nav-btn ft-voice-slider-nav-btn--prev"
        onClick={prevSlide}
        aria-label="Previous capability"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <button
        type="button"
        className="ft-voice-slider-nav-btn ft-voice-slider-nav-btn--next"
        onClick={nextSlide}
        aria-label="Next capability"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      <div className="ft-voice-slider-stage">
        {CAPABILITIES.map((cap, idx) => {
          const isActive = idx === activeSlide;
          return (
            <div
              key={cap.title}
              className={getCardClass(idx)}
              onClick={() => {
                if (!isActive) setActiveSlide(idx);
              }}
            >
              <div className="ft-voice-slider-card__header">
                <div className="ft-voice-slider-card__topline">
                  <div className="ft-voice-slider-card__icon">{cap.icon}</div>
                  <h3 className="ft-voice-slider-card__title">{cap.title}</h3>
                </div>
                <p className="ft-voice-slider-card__desc">{cap.text}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="ft-voice-slider-dots">
        {CAPABILITIES.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`ft-voice-slider-dot ${i === activeSlide ? 'ft-voice-slider-dot--active' : ''}`}
            onClick={() => setActiveSlide(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

const BASE_ROTATES = ['-1.8deg', '1.4deg', '-0.8deg', '1.9deg', '-1.2deg', '1.5deg'];

function SpecialtyDeckSlider() {
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
    const targetScroll = sectionTop + (index / (SPECIALTIES.length - 1)) * scrollDistance;
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
      const activePosition = progress * (SPECIALTIES.length - 1);
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

      setCurrentActiveIndex(clamp(Math.round(activePosition), 0, SPECIALTIES.length - 1));
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
    <section ref={sectionRef} className="ft-voice-experience-section">
      <div className="ft-voice-experience-inner">
        {/* Centered Heading Section */}
        <div className="ft-voice-experience-heading">
          <p className="ft-service-eyebrow">HEALTHCARE SPECIALTIES</p>
          <h2 className="ft-service-heading">
            AI Voice Solutions for Different Healthcare Practices
          </h2>
          <p className="ft-service-subheading">
            Healthcare specialties have different patient communication requirements. A dental practice may have different appointment workflows from a dermatology clinic, while primary care providers may manage a wider range of routine patient inquiries. Byte Operator develops configurable AI voice solutions that can be planned around the operational requirements of different healthcare organizations.
          </p>
        </div>

        {/* Stacked Cards List on Scroll */}
        <div className="ft-voice-experience-list">
          {SPECIALTIES.map((spec, index) => (
            <article
              key={spec.title}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="ft-voice-experience-item"
              style={{
                ['--experience-card-base-rotate' as any]: BASE_ROTATES[index] || '0deg',
              }}
            >
              {/* Circular arrow icon / button on left */}
              <div
                className="ft-voice-experience-arrow"
                onClick={() => scrollToCard((index + 1) % SPECIALTIES.length)}
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
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </div>

              {/* Copy */}
              <div className="ft-voice-experience-copy">
                <div className="ft-voice-experience-copy__header">
                  <h3 className="ft-voice-experience-copy__title">{spec.title}</h3>
                  <span className="ft-voice-experience-copy__subtitle">{spec.subtitle}</span>
                </div>
                <p className="ft-voice-experience-copy__summary">{spec.text}</p>
              </div>

              {/* Side: Badge & Explore link */}
              <div className="ft-voice-experience-side">
                <span className="ft-voice-experience-date">{spec.badge}</span>
                <Link href={spec.route} className="ft-voice-experience-link">
                  <span>Explore Practice</span>
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
        <div className="ft-voice-experience-progress">
          <span className="ft-voice-experience-counter">
            {String(currentActiveIndex + 1).padStart(2, '0')} / {String(SPECIALTIES.length).padStart(2, '0')}
          </span>
          <div className="ft-voice-experience-dots">
            {SPECIALTIES.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                className={`ft-voice-experience-dot ${dotIdx === currentActiveIndex ? 'ft-voice-experience-dot--active' : ''}`}
                onClick={() => scrollToCard(dotIdx)}
                aria-label={`Scroll to specialty ${dotIdx + 1}`}
              />
            ))}
          </div>
          <span className="ft-voice-experience-hint">Scroll down to explore</span>
        </div>
      </div>
    </section>
  );
}

export function AiVoicePageClient() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.defaultMuted = true;
    video.muted = true;

    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window)
    ) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {});
          }
        } else {
          video.pause();
        }
      },
      {threshold: 0.15},
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, []);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex((curr) => (curr === idx ? null : idx));
  };

  return (
    <main>
      {/* =========================================================
          1. HERO SECTION (CENTERED)
      ========================================================= */}
      <section
        className="ft-voice-hero"
        style={{
          textAlign: 'center',
          padding: '7.5rem 0 3.5rem',
          borderBottom: 'none',
        }}
      >
        <div className="ft-service-container">
          <div
            className="ft-voice-hero__content"
            style={{
              maxWidth: '1200px',
              margin: '0 auto',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <p
              className="ft-service-eyebrow"
              style={{ margin: '0 auto 1.25rem', textAlign: 'center' }}
            >
              AI VOICE AGENTS &amp; RECEPTIONISTS FOR HEALTHCARE
            </p>
            <h1 className="ft-voice-hero__title">
              <span className="ft-voice-hero__title-line">
                AI Voice Agents &amp; Receptionists
              </span>{' '}
              <span className="ft-voice-hero__title-line">
                for Healthcare
              </span>
            </h1>
            <div
              className="ft-voice-hero__text-group"
              style={{
                maxWidth: '780px',
                margin: '0 auto 2.5rem',
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
                Byte Operator develops AI voice agents and healthcare receptionist solutions that help medical practices, dental offices, and specialty clinics manage inbound patient calls, automate appointment scheduling, and streamline routine communication workflows through custom EHR/EMR integrations.
              </p>
            </div>
            <div
              className="ft-voice-hero__cta-group"
              style={{ justifyContent: 'center', margin: '0 auto' }}
            >
              <CalendlyButton
                label="Discuss Your AI Voice Agent Project"
                className="ft-voice-hero__btn-primary"
              />
              <Link
                to="/contact"
                prefetch="intent"
                className="ft-voice-hero__btn-secondary"
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
        aria-label="AI Voice Agent Video Showcase"
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
              src="https://cdn.shopify.com/videos/c/o/v/8bdbac54f88a42a98c042da706e7507f.mp4"
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
          2. OVERVIEW: BUILT FOR HEALTHCARE PROVIDERS
      ========================================================= */}
      <section className="ft-voice-section">
        <div className="ft-service-container">
          <div className="ft-voice-overview__grid">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <p className="ft-service-eyebrow">HEALTHCARE COMMUNICATION</p>
                <h2 className="ft-service-heading">
                  AI Voice Agents Built for Healthcare Providers
                </h2>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', color: '#94a3b8', fontSize: '0.96875rem', lineHeight: 1.6 }}>
                <p style={{ margin: 0 }}>
                  Healthcare communication requires more than simply answering a phone call. Patients contact medical practices for appointment requests, general information, scheduling changes and other administrative needs. Each request requires an appropriate response and a clear communication process.
                </p>
                <p style={{ margin: 0 }}>
                  Byte Operator builds AI-powered voice solutions designed to support these healthcare interactions. An AI healthcare receptionist can understand routine patient requests, follow configured communication workflows and assist with administrative tasks that would otherwise require manual attention from reception teams.
                </p>
                <p style={{ margin: 0 }}>
                  Our approach focuses on combining conversational AI, workflow automation and custom software integration to create a solution that fits your practice.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                <p style={{ color: '#e2e8f0', fontSize: '0.96875rem', lineHeight: 1.55, margin: 0 }}>
                  With a focus on healthcare operations, we help organizations explore opportunities to:
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.22rem', marginTop: '0.1rem' }}>
                  {CHECKLIST_ITEMS.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'baseline',
                        gap: '0.5rem',
                        fontSize: '0.9375rem',
                        lineHeight: 1.48,
                        color: '#cbd5e1',
                      }}
                    >
                      <span style={{ color: '#38bdf8', fontWeight: 700, fontSize: '0.875rem', flexShrink: 0 }}>•</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.96875rem', lineHeight: 1.6 }}>
                The objective is to make routine communication more manageable while allowing healthcare staff to concentrate on responsibilities that require their attention.
              </p>
            </div>

            {/* Media Image Column */}
            <div className="ft-voice-overview__media">
              <div className="ft-voice-overview__image-card">
                <img
                  src="https://cdn.shopify.com/s/files/1/0676/1155/7936/files/AI_Voice_Agents_Animated.webp?v=1793823156"
                  alt="AI Voice Agents Built for Healthcare Providers"
                  className="ft-voice-overview__image"
                  width="1200"
                  height="800"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="ft-voice-overview__caption">
                <p className="ft-voice-overview__caption-title">
                  AI Voice Agents &amp; Receptionists
                </p>
                <p className="ft-voice-overview__caption-sub">
                  Intelligent Inbound Call Triage &amp; Clinical Routing
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          3. WHAT CAN OUR AI HEALTHCARE RECEPTIONIST DO? (COVERFLOW SLIDER)
      ========================================================= */}
      <section className="ft-voice-section" style={{ overflow: 'hidden' }}>
        <div className="ft-service-container" style={{ textAlign: 'center' }}>
          <div style={{ maxWidth: '820px', margin: '0 auto 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <p className="ft-service-eyebrow" style={{ margin: '0 auto 0.75rem' }}>
              CAPABILITIES &amp; FEATURES
            </p>
            <h2 className="ft-service-heading" style={{ textAlign: 'center', margin: '0 0 0.85rem' }}>
              What Can Our AI Healthcare Receptionist Do?
            </h2>
            <p className="ft-service-subheading" style={{ textAlign: 'center', margin: '0 auto' }}>
              An AI healthcare receptionist can support several administrative activities throughout the patient communication process. Its specific functions depend on the practice&apos;s requirements, configured workflows and available system integrations.
            </p>
          </div>

          <VoiceCapabilitiesSlider />
        </div>
      </section>

      {/* =========================================================
          4. APPOINTMENT SCHEDULING AUTOMATION
      ========================================================= */}
      <section className="ft-voice-section">
        <div className="ft-service-container">
          <p className="ft-service-eyebrow">APPOINTMENT AUTOMATION</p>
          <h2 className="ft-service-heading">
            Healthcare Appointment Scheduling Automation
          </h2>
          <p className="ft-service-subheading">
            Appointment scheduling is one of the most important administrative processes in healthcare. Practices must coordinate patient requests, provider availability and appointment changes while maintaining clear communication. Healthcare appointment scheduling automation can help organize these activities and reduce repetitive manual work.
          </p>

          <div className="ft-voice-cards-grid ft-voice-cards-grid--3col">
            {SCHEDULING_PILLARS.map((pillar) => (
              <div className="ft-voice-card" key={pillar.title}>
                <div className="ft-voice-card__icon-wrap">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
                <h3 className="ft-voice-card__title">{pillar.title}</h3>
                <p className="ft-voice-card__text">{pillar.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          5. PATIENT FOLLOW-UPS & REMINDERS
      ========================================================= */}
      <section className="ft-voice-section">
        <div className="ft-service-container">
          <p className="ft-service-eyebrow">PATIENT COMMUNICATION WORKFLOWS</p>
          <h2 className="ft-service-heading">
            Automated Patient Follow-Ups and Reminders
          </h2>
          <p className="ft-service-subheading">
            Patient communication does not end when an appointment is requested or scheduled. Healthcare practices may also need to send reminders, confirm appointments and maintain communication through planned follow-up activities. AI-powered communication workflows can help organize these recurring administrative responsibilities.
          </p>

          <div className="ft-voice-cards-grid ft-voice-cards-grid--3col">
            {FOLLOWUP_PILLARS.map((pillar) => (
              <div className="ft-voice-card" key={pillar.title}>
                <div className="ft-voice-card__icon-wrap">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                  </svg>
                </div>
                <h3 className="ft-voice-card__title">{pillar.title}</h3>
                <p className="ft-voice-card__text">{pillar.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          6. EHR & EMR INTEGRATIONS
      ========================================================= */}
      <section className="ft-voice-section">
        <div className="ft-service-container">
          <div className="ft-voice-overview__grid">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <p className="ft-service-eyebrow">EHR &amp; EMR INTEGRATION</p>
                <h2 className="ft-service-heading">
                  Custom EHR and EMR Integrations for Healthcare
                </h2>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', color: '#94a3b8', fontSize: '0.96875rem', lineHeight: 1.6 }}>
                <p style={{ margin: 0 }}>
                  Healthcare organizations often rely on electronic health records (EHR) and electronic medical records (EMR) systems to manage important patient and operational information. An AI voice agent becomes more useful when its workflows can interact appropriately with the software already used by a healthcare organization.
                </p>
                <p style={{ margin: 0 }}>
                  Byte Operator develops custom API integrations to connect AI voice solutions with supported healthcare systems and existing business workflows—ensuring patient data, scheduling calendars, and clinical records stay cleanly synchronized.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                <p style={{ color: '#38bdf8', fontWeight: 600, fontSize: '0.8125rem', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>
                  OUR INTEGRATION APPROACH CONSIDERS:
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.22rem', marginTop: '0.1rem' }}>
                  {INTEGRATION_CONSIDERATIONS.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'baseline',
                        gap: '0.5rem',
                        fontSize: '0.9375rem',
                        lineHeight: 1.48,
                        color: '#cbd5e1',
                      }}
                    >
                      <span style={{ color: '#38bdf8', fontWeight: 700, fontSize: '0.875rem', flexShrink: 0 }}>•</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <p style={{ margin: 0, color: '#f8fafc', fontWeight: 500, fontSize: '0.96875rem', lineHeight: 1.6 }}>
                The result is a reliable integration plan based on the systems, technical environments, and security standards your practice actually supports.
              </p>
            </div>

            {/* Media Image Column */}
            <div className="ft-voice-overview__media">
              <div className="ft-voice-overview__image-card">
                <img
                  src="https://cdn.shopify.com/s/files/1/0676/1155/7936/files/EHR_EMR_Integration_Animated.gif?v=1793823446"
                  alt="Custom EHR and EMR Integrations for Healthcare"
                  className="ft-voice-overview__image"
                  width="1200"
                  height="800"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="ft-voice-overview__caption">
                <p className="ft-voice-overview__caption-title">
                  EHR &amp; EMR Data Synchronization
                </p>
                <p className="ft-voice-overview__caption-sub">
                  Secure API Architecture &amp; Automated Appointment Workflows
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          7. HOW IT WORKS (STEP-BY-STEP)
      ========================================================= */}
      <section className="ft-voice-section">
        <div className="ft-service-container">
          <p className="ft-service-eyebrow">STEP-BY-STEP PROCESS</p>
          <h2 className="ft-service-heading">
            How Our AI Healthcare Voice Agent Works
          </h2>
          <p className="ft-service-subheading">
            An AI healthcare receptionist combines voice interaction with configured workflows to help manage routine patient communication. The implementation process depends on the organization&apos;s requirements, but a typical workflow can be organized into the following stages.
          </p>

          <div className="ft-voice-steps-grid">
            {STEPS.map((step) => (
              <div className="ft-voice-step-card" key={step.step}>
                <div className="ft-voice-step-card__image-wrap">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="ft-voice-step-card__image"
                    width="600"
                    height="375"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="ft-voice-step-card__header">
                  <span className="ft-voice-step-card__number">{step.step}</span>
                  <h3 className="ft-voice-step-card__title">{step.title}</h3>
                </div>
                <p className="ft-voice-step-card__text">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          8. SOLUTIONS BY SPECIALTY (STACKED DECK SLIDER)
      ========================================================= */}
      <SpecialtyDeckSlider />

      {/* =========================================================
          9. MANAGED SOLUTIONS VS CUSTOM DEVELOPMENT
      ========================================================= */}
      <section className="ft-voice-section">
        <div className="ft-service-container">
          <p className="ft-service-eyebrow">IMPLEMENTATION MODELS</p>
          <h2 className="ft-service-heading">
            Managed AI Solutions and Custom Development
          </h2>
          <p className="ft-service-subheading">
            Healthcare organizations have different technical resources, operational requirements and implementation preferences. Byte Operator offers both managed AI solution delivery and custom-built development approaches, allowing organizations to explore an implementation model that aligns with their needs.
          </p>

          <div className="ft-voice-compare-grid">
            <div className="ft-voice-compare-card">
              <span className="ft-voice-compare-card__badge">Managed Delivery</span>
              <h3 className="ft-voice-compare-card__title">
                Managed AI Voice Agent Solutions
              </h3>
              <p className="ft-voice-compare-card__text">
                For organizations seeking a managed implementation, Byte Operator can work with the client to define the required workflows, configure the solution and plan its integration with supported systems. The scope of ongoing management and support is established according to the agreed service arrangement.
              </p>
            </div>

            <div className="ft-voice-compare-card">
              <span className="ft-voice-compare-card__badge">Custom Engineering</span>
              <h3 className="ft-voice-compare-card__title">
                Custom-Built AI Voice Agent Development
              </h3>
              <p className="ft-voice-compare-card__text">
                Some healthcare organizations require a more tailored approach. Custom development allows the voice-agent solution to be planned around specific communication requirements, business processes and available software integrations. This approach is suitable for organizations that need more control over how their AI voice solution fits into their existing technology environment.
              </p>
            </div>
          </div>

          <div style={{ textAlign: 'center', maxWidth: '850px', margin: '2rem auto 0' }}>
            <p style={{ color: '#cbd5e1', fontSize: '0.96875rem', lineHeight: 1.6 }}>
              <strong style={{ color: '#f8fafc' }}>Designed Around Your Healthcare Technology:</strong> Whether the preferred approach is managed delivery or custom development, implementation should begin with a clear understanding of the organization&apos;s existing systems and operational requirements. Byte Operator evaluates these factors to help define a practical development and integration approach.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          10. PATIENT PRIVACY, SECURITY & GOVERNANCE
      ========================================================= */}
      <section className="ft-voice-section">
        <div className="ft-service-container">
          <p className="ft-service-eyebrow">SECURITY, PRIVACY &amp; GOVERNANCE</p>
          <h2 className="ft-service-heading">
            Patient Privacy, Security and Human Oversight
          </h2>
          <div style={{ maxWidth: '850px', color: '#94a3b8', fontSize: '0.96875rem', lineHeight: 1.6, marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            <p style={{ margin: 0 }}>
              Healthcare technology must be planned with appropriate attention to patient privacy, information security and the responsible handling of sensitive information. AI voice-agent implementations should consider what information is collected, how it is processed, which systems receive it and who is authorized to access it.
            </p>
            <p style={{ margin: 0 }}>
              Byte Operator considers these requirements during solution planning and integration design.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', marginTop: '0.5rem' }}>
            {PRIVACY_CONSIDERATIONS.map((c, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '0.65rem',
                  fontSize: '0.96875rem',
                  lineHeight: 1.55,
                  color: '#cbd5e1',
                }}
              >
                <span style={{ color: '#38bdf8', fontSize: '1.1rem', lineHeight: 1 }}>•</span>
                <span>{c}</span>
              </div>
            ))}
          </div>

          <div className="ft-voice-security-box">
            <h4 className="ft-voice-security-box__title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              <span>Regulatory &amp; Clinical Safeguards</span>
            </h4>
            <p className="ft-voice-security-box__text">
              Healthcare organizations should also evaluate applicable regulatory requirements, contractual arrangements and technical safeguards before deploying AI systems that process protected health information. AI voice agents should support administrative communication, not replace medical professionals or independently make clinical decisions.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          11. FAQS ACCORDION (TWO-COLUMN RESPONSIVE)
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
                  AI Voice Agents &amp; Healthcare Receptionist FAQs
                </h2>
                <p className="ft-home-faqs__subtitle">
                  Find clear answers to common questions about implementing AI voice agents, appointment scheduling workflows, EHR/EMR compatibility, and human oversight.
                </p>
              </div>

              {/* Callout box */}
              <div className="ft-home-faqs__callout">
                <h3 className="ft-home-faqs__callout-title">
                  Have questions about your phone system or EHR?
                </h3>
                <p className="ft-home-faqs__callout-text">
                  Our engineering team can evaluate your specific telephony setup, clinic workflows, and API capabilities during a discovery call.
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
                        <span className="ft-home-faqs__number">{faq.number}</span>
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
                        {faq.answer}
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
          12. FINAL CTA SECTION
      ========================================================= */}
      <ServiceFinalCta
        eyebrow="AI VOICE AGENTS FOR HEALTHCARE"
        title="Build a Smarter Healthcare Communication System With Byte Operator"
        description="Healthcare communication can become difficult to manage when patient calls, appointment requests, and routine administrative tasks compete for staff attention. Byte Operator develops AI voice agents and healthcare receptionist solutions designed around your organization's communication workflows."
        tagline="Let's discuss how AI voice agents can support your healthcare organization."
        primaryButtonLabel="Discuss Your AI Voice Agent Project"
        secondaryButtonLabel="Contact Byte Operator →"
        secondaryButtonHref="/contact"
        pillars={[
          {
            title: 'Call Routing & Triage',
            description:
              'Intelligent inquiry classification, custom scheduling integration, and escalation protocols for complex clinical requests.',
          },
          {
            title: 'EHR/EMR Compatibility',
            description:
              'Direct calendar synchronization and structured patient record creation with your existing clinical software.',
          },
          {
            title: 'Privacy & Compliance',
            description:
              'HIPAA-aligned voice architecture, encrypted audio pipelines, and strict administrative consent workflows.',
          },
        ]}
      />
    </main>
  );
}
