'use client';

import {Link} from '~/lib/router-compat';

const FEATURED_HEALTHCARE_WORK = [
  {
    handle: 'patient-management-system',
    category: 'Dental Clinic Software',
    title: 'Bright Dental Clinic: Patient Management & Operations System',
    description:
      'Cloud-native clinic operations platform uniting self-serve digital intake, multi-chair scheduling, and real-time bidirectional dental PMS synchronization.',
    technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'Dental PMS APIs', 'AWS'],
    result: 'Unified Dental Patient Management & Clinical Workflow',
    caseStudyUrl: '/work/patient-management-system',
    image: 'https://cdn.shopify.com/s/files/1/0676/1155/7936/files/application_engineering.webp?v=1794782203',
  },
  {
    handle: 'ai-voice-calling-agent',
    category: 'Healthcare AI Voice Agent',
    title: 'MedVoice AI: 24/7 Autonomous Voice Calling Agent',
    description:
      'Complete demo of conversational AI voice receptionist answering inbound clinic calls within two rings, triaging patient inquiries, and booking appointments into EHR calendars.',
    technologies: ['WebRTC', 'Twilio SIP', 'Deepgram Nova-2', 'Whisper', 'FastAPI'],
    result: '24/7 Inbound Call Triage & Automated Patient Scheduling',
    caseStudyUrl: '/work/ai-voice-calling-agent',
    image: 'https://cdn.shopify.com/s/files/1/0676/1155/7936/files/AI_Voice_Agents_Animated.webp?v=1793823156',
  },
  {
    handle: 'whatsapp-receptionist',
    category: 'WhatsApp Automation',
    title: 'CareConnect: 24/7 WhatsApp AI Medical Receptionist',
    description:
      'Always-on digital concierge handling patient inquiries, instant consultation scheduling, digital intake forms, and pre-procedure instructions over WhatsApp.',
    technologies: ['WhatsApp Cloud API', 'Node.js', 'Vector DB', 'EHR Webhooks'],
    result: 'Instant Patient Intake & 24/7 WhatsApp Scheduling',
    caseStudyUrl: '/work/whatsapp-receptionist',
    image: 'https://cdn.shopify.com/s/files/1/0676/1155/7936/files/Workflow_Automation_Story_Image.png?v=1793792357',
  },
] as const;

export function HomeCaseStudies() {
  return (
    <section className="ft-home-case-studies" style={{ padding: '6.5rem 0 7rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)', background: '#060F24' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 2rem', display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '920px' }}>
          <p style={{ textTransform: 'uppercase', letterSpacing: '0.14em', fontSize: '0.8125rem', color: '#38bdf8', margin: 0, fontWeight: 700 }}>
            OUR WORK & HEALTHCARE SOLUTIONS
          </p>
          <h2 style={{ fontSize: 'clamp(2.1rem, 3.8vw, 3.25rem)', fontWeight: 700, lineHeight: 1.15, color: '#f8fafc', margin: 0, letterSpacing: '-0.025em' }}>
            Proven Technology Systems
            <br />
            Engineered for Modern Healthcare
          </h2>
          <p style={{ fontSize: '1.08rem', lineHeight: 1.7, color: '#94a3b8', margin: 0 }}>
            Explore how Byte Operator delivers custom healthcare software, autonomous AI voice calling agents, and WhatsApp receptionists that solve real operational bottlenecks.
          </p>
        </div>

        {/* 3 Featured Healthcare Systems Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {FEATURED_HEALTHCARE_WORK.map((item) => (
            <div
              key={item.handle}
              style={{
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '1.25rem',
                border: '1px solid rgba(255, 255, 255, 0.09)',
                background: 'rgba(15, 23, 42, 0.65)',
                overflow: 'hidden',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              className="ft-home-healthcare-card"
            >
              {/* Media Thumbnail */}
              <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', overflow: 'hidden', background: '#0a1120' }}>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  loading="lazy"
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '0.75rem',
                    left: '0.75rem',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    padding: '0.3rem 0.65rem',
                    borderRadius: '9999px',
                    background: '#2563eb',
                    color: '#ffffff',
                    maxWidth: 'calc(100% - 7rem)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {item.result}
                </span>

                <Link
                  to="/contact"
                  style={{
                    position: 'absolute',
                    top: '0.75rem',
                    right: '0.75rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    padding: '0.35rem 0.75rem',
                    borderRadius: '9999px',
                    background: 'rgba(6, 15, 36, 0.88)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(56, 189, 248, 0.5)',
                    color: '#38bdf8',
                    fontFamily: 'inherit',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    lineHeight: 1,
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <span>Send Query</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>

              {/* Card Body */}
              <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flex: 1, gap: '1rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  {item.category}
                </span>

                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#f8fafc', margin: 0, lineHeight: 1.35 }}>
                  <Link to={item.caseStudyUrl} style={{ color: 'inherit', textDecoration: 'none' }}>
                    {item.title}
                  </Link>
                </h3>

                <p style={{ fontSize: '0.92rem', lineHeight: 1.6, color: '#94a3b8', margin: 0, flex: 1 }}>
                  {item.description}
                </p>

                {/* Tech chips */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginTop: '0.25rem' }}>
                  {item.technologies.map((t) => (
                    <span
                      key={t}
                      style={{
                        fontSize: '0.72rem',
                        padding: '0.2rem 0.55rem',
                        borderRadius: '0.35rem',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        color: '#cbd5e1',
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Card Actions */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.06)', marginTop: '0.5rem' }}>
                  <Link
                    to={item.caseStudyUrl}
                    style={{
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      color: '#ffffff',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                    }}
                  >
                    <span>View Case Study</span>
                    <span aria-hidden="true">→</span>
                  </Link>

                  <Link
                    to="/contact"
                    style={{
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      color: '#38bdf8',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                    }}
                  >
                    <span>Send Query</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA to /work */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem', paddingTop: '1rem' }}>
          <p style={{ fontSize: '0.95rem', color: '#94a3b8', margin: 0 }}>
            Want to see how we architect custom medical software and clinical AI systems?
          </p>
          <Link
            to="/work"
            prefetch="intent"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.875rem 2rem',
              borderRadius: '9999px',
              backgroundColor: '#38bdf8',
              color: '#060F24',
              fontWeight: 700,
              fontSize: '0.95rem',
              textDecoration: 'none',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
          >
            Explore All Case Studies & Work →
          </Link>
        </div>
      </div>
    </section>
  );
}
