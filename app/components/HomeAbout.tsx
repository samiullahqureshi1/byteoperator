'use client';

import {Link} from '~/lib/router-compat';
import type {HomePageContent} from '~/lib/cms/types';

export type OperationalChallenge = {
  number: string;
  title: string;
  description: string;
};

const DEFAULT_CHALLENGES: readonly OperationalChallenge[] = [
  {
    number: '01',
    title: 'Missed Patient Calls',
    description:
      'Unanswered calls and delayed responses can make it harder for patients to reach your practice and request appointments.',
  },
  {
    number: '02',
    title: 'Repetitive Administrative Tasks',
    description:
      'Manual appointment coordination, patient intake, reminders, and follow-ups can consume valuable staff time.',
  },
  {
    number: '03',
    title: 'Disconnected Systems',
    description:
      'When business applications and healthcare platforms operate separately, teams may need to repeat tasks and transfer information manually.',
  },
  {
    number: '04',
    title: 'Increasing Operational Demands',
    description:
      'As healthcare practices grow, maintaining efficient and consistent workflows becomes increasingly important.',
  },
] as const;

export function HomeAbout({
  content,
}: {
  content?: HomePageContent;
} = {}) {
  if (content?.aboutShowSection === false) {
    return null;
  }

  const eyebrow = content?.aboutEyebrow || 'OPERATIONAL CHALLENGES';
  const ctaLabel = content?.aboutCtaText || 'Explore Our Solutions';
  const ctaHref = content?.aboutCtaLink || '/expertise';

  return (
    <section
      className="ft-home-about"
      aria-labelledby="ft-home-about-title"
      style={{
        padding: '6rem 0',
        backgroundColor: 'var(--ft-dark-deep, #060F24)',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      <div
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '0 2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '3.5rem',
        }}
      >
        {/* Section Header */}
        <div style={{ maxWidth: '1240px' }}>
          <p
            className="ft-home-about__eyebrow"
            style={{
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              fontSize: '0.8125rem',
              color: '#60a5fa',
              marginBottom: '1rem',
              fontWeight: 600,
            }}
          >
            {eyebrow}
          </p>

          <h2
            className="ft-home-about__heading"
            id="ft-home-about-title"
            style={{
              fontWeight: 600,
              color: '#f8fafc',
              marginBottom: '1.5rem',
            }}
          >
            Healthcare Operations Shouldn&apos;t Be
            <br />
            Held Back by Manual Work
          </h2>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              maxWidth: '860px',
            }}
          >
            <p
              style={{
                fontSize: '1.0625rem',
                lineHeight: 1.7,
                color: '#94a3b8',
                margin: 0,
              }}
            >
              Healthcare teams manage patient calls, appointments, administrative tasks, and multiple software systems every day. Disconnected technology and repetitive processes can make these responsibilities more difficult to manage.
            </p>
            <p
              style={{
                fontSize: '1.0625rem',
                lineHeight: 1.7,
                color: '#cbd5e1',
                margin: 0,
                fontWeight: 500,
              }}
            >
              Byte Operator helps healthcare organizations address these challenges through practical software and automation solutions.
            </p>
          </div>
        </div>

        {/* 4-Column Structured Row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.5rem',
            width: '100%',
          }}
        >
          {DEFAULT_CHALLENGES.map((challenge) => (
            <div
              key={challenge.number}
              className="ft-home-about__card"
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <span className="ft-home-about__card-num">
                  {challenge.number}
                </span>
              </div>

              <h3
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: '#f8fafc',
                  lineHeight: 1.3,
                  margin: 0,
                  minHeight: '2.6em',
                }}
              >
                {challenge.title}
              </h3>

              <p
                style={{
                  fontSize: '0.9375rem',
                  lineHeight: 1.6,
                  color: '#94a3b8',
                  margin: 0,
                  flexGrow: 1,
                }}
              >
                {challenge.description}
              </p>
            </div>
          ))}
        </div>

        {/* Action Link */}
        <div>
          <Link
            to={ctaHref}
            prefetch="intent"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.625rem',
              color: '#60a5fa',
              fontSize: '1rem',
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'gap 0.2s ease',
            }}
          >
            <span>{ctaLabel}</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
