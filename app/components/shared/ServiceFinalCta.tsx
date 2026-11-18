'use client';

import React from 'react';
import {Link} from '~/lib/router-compat';
import {CalendlyButton} from '~/components/shared/CalendlyButton';

export type ServiceCtaPillar = {
  icon?: React.ReactNode;
  title: string;
  description: string;
};

export type ServiceFinalCtaProps = {
  eyebrow?: string;
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
  tagline?: string | React.ReactNode;
  pillars?: ServiceCtaPillar[];
  primaryButtonLabel?: string;
  secondaryButtonLabel?: string;
  secondaryButtonHref?: string;
  trustNotes?: string[];
  className?: string;
};

const DEFAULT_PILLARS: ServiceCtaPillar[] = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
    title: 'Workflow & System Assessment',
    description:
      'We review your existing clinical operations, digital tools, and data exchange requirements to identify high-impact technical solutions.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    title: 'Security & Privacy by Design',
    description:
      'Healthcare-grade encryption, role-based access scoping, secure API endpoints, and structured audit logs built in from day one.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    title: 'Senior Engineering Partnership',
    description:
      'Direct collaboration with senior engineers who understand healthcare workflows, with clean architecture and complete code ownership.',
  },
];

export function ServiceFinalCta({
  eyebrow = 'DISCUSS YOUR HEALTHCARE TECHNOLOGY NEEDS',
  title,
  description,
  tagline,
  pillars = DEFAULT_PILLARS,
  primaryButtonLabel = 'Book a Discovery Call',
  secondaryButtonLabel = 'Tell Us About Your Project →',
  secondaryButtonHref = '/contact',
  trustNotes = [
    'No-obligation technical discovery',
    'HIPAA & privacy-aligned practices',
    'Clear scoping & roadmap',
  ],
  className = '',
}: ServiceFinalCtaProps) {
  return (
    <section
      className={`ft-service-final-cta-section ${className}`}
      style={{
        padding: '6rem 1.5rem 7rem',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--ft-dark-deep, #060F24)',
      }}
    >
      {/* Background ambient lighting */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '800px',
          height: '500px',
          background:
            'radial-gradient(circle, rgba(56, 189, 248, 0.12) 0%, rgba(48, 108, 231, 0.06) 45%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      <div
        style={{
          maxWidth: '1180px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Main CTA Card */}
        <div
          style={{
            position: 'relative',
            borderRadius: '24px',
            border: '1px solid rgba(56, 189, 248, 0.22)',
            background:
              'linear-gradient(180deg, rgba(14, 25, 52, 0.85) 0%, rgba(6, 15, 36, 0.98) 100%)',
            boxShadow:
              '0 25px 65px -15px rgba(0, 0, 0, 0.7), 0 0 50px rgba(48, 108, 231, 0.14)',
            padding: 'clamp(2.5rem, 5vw, 4.5rem) clamp(1.5rem, 4vw, 3.5rem)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '2rem',
            overflow: 'hidden',
          }}
        >
          {/* Subtle inner top glow highlight */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '70%',
              height: '1px',
              background:
                'linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.8), transparent)',
            }}
          />

          {/* Eyebrow badge with exact user styling */}
          {eyebrow && (
            <p
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '0.35rem 0.85rem',
                borderRadius: '9999px',
                background: 'rgba(56, 189, 248, 0.08)',
                border: '1px solid rgba(56, 189, 248, 0.25)',
                color: '#38bdf8',
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.8125rem',
                fontWeight: 600,
                letterSpacing: '0.02em',
                margin: 0,
              }}
            >
              {eyebrow}
            </p>
          )}

          {/* Headline */}
          <h2
            style={{
              fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
              fontSize: 'clamp(2.15rem, 4.2vw, 3.45rem)',
              fontWeight: 500,
              lineHeight: 1.18,
              letterSpacing: '-0.025em',
              color: '#f8fafc',
              margin: 0,
              maxWidth: '860px',
            }}
          >
            {title}
          </h2>

          {/* Primary Lead Description */}
          {description && (
            <div
              style={{
                fontSize: 'clamp(1rem, 1.4vw, 1.125rem)',
                lineHeight: 1.7,
                color: '#94a3b8',
                margin: 0,
                maxWidth: '820px',
              }}
            >
              {typeof description === 'string' ? (
                <p style={{ margin: 0 }}>{description}</p>
              ) : (
                description
              )}
            </div>
          )}

          {/* Structured Value Props / Process Pillars Grid */}
          {pillars && pillars.length > 0 && (
            <div className="ft-service-cta-pillars-grid">
              {pillars.map((p, idx) => (
                <div key={idx} className="ft-service-cta-pillar-card">
                  <div className="ft-service-cta-pillar-icon">
                    {p.icon || DEFAULT_PILLARS[0].icon}
                  </div>
                  <h3 className="ft-service-cta-pillar-title">
                    {p.title}
                  </h3>
                  <p className="ft-service-cta-pillar-desc">
                    {p.description}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Closing Tagline / Invitation */}
          {tagline && (
            <div
              style={{
                fontSize: '1.0625rem',
                lineHeight: 1.65,
                color: '#e2e8f0',
                margin: 0,
                maxWidth: '780px',
                fontWeight: 500,
              }}
            >
              {typeof tagline === 'string' ? (
                <p style={{ margin: 0 }}>{tagline}</p>
              ) : (
                tagline
              )}
            </div>
          )}

          {/* CTA Buttons */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              justifyContent: 'center',
              marginTop: '0.5rem',
            }}
          >
            <CalendlyButton
              label={primaryButtonLabel}
              style={{
                padding: '0.9375rem 2.25rem',
                borderRadius: '9999px',
                backgroundColor: '#306CE7',
                color: '#ffffff',
                fontWeight: 600,
                fontSize: '0.9375rem',
                border: 'none',
                cursor: 'pointer',
                transition:
                  'background-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease',
                boxShadow: '0 4px 18px rgba(48, 108, 231, 0.45)',
              }}
            />
            <Link
              to={secondaryButtonHref}
              prefetch="intent"
              style={{
                padding: '0.9375rem 2rem',
                borderRadius: '9999px',
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.16)',
                color: '#f8fafc',
                fontWeight: 600,
                fontSize: '0.9375rem',
                textDecoration: 'none',
                transition:
                  'background-color 0.2s ease, border-color 0.2s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              {secondaryButtonLabel}
            </Link>
          </div>

          {/* Trust badges footer */}
          {trustNotes && trustNotes.length > 0 && (
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1.5rem',
                justifyContent: 'center',
                color: '#64748b',
                fontSize: '0.8125rem',
                marginTop: '0.5rem',
              }}
            >
              {trustNotes.map((note, i) => (
                <span key={i}>✓ {note}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
