import {Link} from '~/lib/router-compat';
import {resolveCanonicalPath} from '~/lib/route-mappings';

import type {HomeFeatureData} from '~/data/homeFeatures';
import {CalendlyButton} from '~/components/shared/CalendlyButton';
import {responsiveImage} from '~/lib/responsive-image';

/* =========================================================
   BYTE OPERATOR - REUSABLE HOME FEATURE
========================================================= */

type HomeFeatureProps = {
  feature: HomeFeatureData;
};

function renderTwoLineHeading(id: string, heading: string) {
  const customBreaks: Record<string, [string, string]> = {
    'ai-voice-agents-healthcare': [
      'AI Voice Agents for Healthcare',
      'Patient Communication',
    ],
    'ai-workflow-automation-healthcare': [
      'Healthcare Workflow Automation',
      'That Reduces Repetitive Work',
    ],
    'healthcare-system-integration': [
      'Connect Your Healthcare Systems',
      'and Applications',
    ],
    'software-integrations': [
      'Connect Your Healthcare Systems',
      'and Applications',
    ],
    'solutions-by-specialty': [
      'Healthcare Technology Tailored',
      'to Your Medical Specialty',
    ],
    'custom-healthcare-software': [
      'Custom Healthcare Software',
      'Development',
    ],
    'custom-healthcare-software-development': [
      'Custom Healthcare Software',
      'Development',
    ],
    'saas-web-application-development': [
      'SaaS and Web Applications',
      'Designed to Scale',
    ],
    'cloud-infrastructure-engineering': [
      'Cloud and Infrastructure Engineering',
      'for Modern Healthcare Applications',
    ],
    'connected-healthcare-operations': [
      'From Patient Communication',
      'to Connected Healthcare Operations',
    ],
    'why-choose-byte-operator': [
      'More Than a Software Vendor.',
      'Your Healthcare Technology Partner.',
    ],
    'development-process': [
      'A Clear Process From',
      'Discovery to Deployment',
    ],
    'security-privacy': [
      'Security and Privacy Considerations',
      'From the Start',
    ],
  };

  const pair = customBreaks[id];
  if (pair) {
    return (
      <>
        {pair[0]}
        <br className="ft-home-feature__heading-br" />
        {pair[1]}
      </>
    );
  }

  const words = heading.split(' ');
  if (words.length > 2) {
    const mid = Math.ceil(words.length / 2);
    return (
      <>
        {words.slice(0, mid).join(' ')}
        <br className="ft-home-feature__heading-br" />
        {words.slice(mid).join(' ')}
      </>
    );
  }

  return heading;
}

function renderDescriptions(paragraphs: readonly string[]) {
  const elements: React.ReactNode[] = [];
  let currentBullets: Array<{label: string; rest: string}> = [];

  const flushBullets = () => {
    if (currentBullets.length > 0) {
      const bulletsToRender = [...currentBullets];
      elements.push(
        <div
          key={`bullet-group-${elements.length}`}
          className="ft-home-feature__bullet-list"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.22rem',
            marginTop: '0.1rem',
          }}
        >
          {bulletsToRender.map((b, bIdx) => (
            <div
              key={`b-${bIdx}`}
              className="ft-home-feature__description ft-home-feature__description--bullet"
              style={{
                margin: 0,
                lineHeight: 1.48,
                fontSize: '0.9375rem',
                color: '#94a3b8',
                display: 'flex',
                alignItems: 'baseline',
              }}
            >
              <span
                style={{
                  color: '#38bdf8',
                  marginRight: '0.5rem',
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                •
              </span>
              <span>
                <h3
                  className="ft-home-feature__bullet-title"
                  style={{
                    display: 'inline',
                    fontSize: '0.9375rem',
                    fontWeight: 600,
                    color: '#f8fafc',
                    margin: 0,
                    padding: 0,
                    fontFamily: 'inherit',
                    lineHeight: 'inherit',
                  }}
                >
                  {b.label}
                </h3>
                {b.rest}
              </span>
            </div>
          ))}
        </div>,
      );
      currentBullets = [];
    }
  };

  paragraphs.forEach((paragraph, idx) => {
    if (paragraph.startsWith('• ') && paragraph.includes(':')) {
      const colonIdx = paragraph.indexOf(':');
      currentBullets.push({
        label: paragraph.slice(2, colonIdx + 1),
        rest: paragraph.slice(colonIdx + 1),
      });
    } else {
      flushBullets();
      elements.push(
        <p
          key={`p-${idx}`}
          className="ft-home-feature__description"
          style={{ margin: 0 }}
        >
          {paragraph}
        </p>,
      );
    }
  });

  flushBullets();
  return elements;
}

export function HomeFeature({
  feature,
}: HomeFeatureProps) {
  const headingId =
    `ft-home-feature-${feature.id}-heading`;

  const sectionClasses = [
    'ft-home-feature',

    feature.layout === 'media-right'
      ? 'ft-home-feature--media-right'
      : 'ft-home-feature--media-left',

    `ft-home-feature--spacing-${feature.spacing}`,

    feature.theme === 'light'
      ? 'ft-home-feature--light'
      : 'ft-home-feature--dark',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section
      className={sectionClasses}
      aria-labelledby={headingId}
    >
      <div className="ft-home-feature__container">
        <div className="ft-home-feature__inner">
          <FeatureMedia feature={feature} />

          <div className="ft-home-feature__content">
            <p className="ft-home-feature__eyebrow">
              {feature.eyebrow}
            </p>

            {feature.logos?.length ? (
              <div className="ft-home-feature__logos">
                {feature.logos.map((logo) => (
                  <div
                    className="ft-home-feature__logo-item"
                    key={`${feature.id}-${logo.src}`}
                  >
                    <img
                      className="ft-home-feature__logo"
                      src={logo.src}
                      width={logo.width}
                      height={logo.height}
                      alt={logo.alt}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ))}
              </div>
            ) : null}

            <h2
              className="ft-home-feature__heading"
              id={headingId}
            >
              {renderTwoLineHeading(feature.id, feature.heading)}
            </h2>

            {feature.badges?.length ? (
              <div className="ft-home-feature__badges">
                {feature.badges.map((badge) => (
                  <Link
                    className="ft-home-feature__badge"
                    key={`${feature.id}-${badge.label}`}
                    to={resolveCanonicalPath(badge.href)}
                    prefetch="intent"
                  >
                    {badge.label}
                  </Link>
                ))}
              </div>
            ) : null}

            <div className="ft-home-feature__descriptions">
              {renderDescriptions(feature.description)}
            </div>

            {feature.buttons.length ? (
              <div className="ft-home-feature__buttons">
                {feature.buttons.map((button) =>
                  button.calendly ? (
                    <CalendlyButton
                      className="ft-home-feature__button"
                      key={`${feature.id}-${button.label}`}
                    >
                      <span>{button.label}</span>

                      <ButtonArrow />
                    </CalendlyButton>
                  ) : (
                    <Link
                      className="ft-home-feature__button"
                      key={`${feature.id}-${button.label}`}
                      to={resolveCanonicalPath(button.href ?? '/contact/')}
                      prefetch="intent"
                    >
                      <span>{button.label}</span>

                      <ButtonArrow />
                    </Link>
                  ),
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}


/* =========================================================
   FEATURE MEDIA
========================================================= */

function FeatureMedia({
  feature,
}: {
  feature: HomeFeatureData;
}) {
  const hasSecondary = Boolean(
    feature.media.secondary && feature.media.secondary.trim() !== '',
  );

  return (
    <Link
      className={`ft-home-feature__media ${
        !hasSecondary ? 'ft-home-feature__media--single' : ''
      }`}
      to={resolveCanonicalPath(feature.media.href)}
      prefetch="intent"
      aria-label={`View ${feature.media.captionTitle} case study`}
    >
      <div className="ft-home-feature__image ft-home-feature__image--primary">
        <img
          {...responsiveImage(feature.media.primary, '(max-width: 48rem) 100vw, 45vw', 1200)}
          width={feature.media.primaryWidth}
          height={feature.media.primaryHeight}
          alt={feature.media.primaryAlt}
          loading="lazy"
          decoding="async"
        />
      </div>

      {hasSecondary ? (
        <div className="ft-home-feature__overlap">
          <div className="ft-home-feature__image ft-home-feature__image--secondary">
            <img
              {...responsiveImage(feature.media.secondary, '(max-width: 48rem) 100vw, 45vw', 1200)}
              width={feature.media.secondaryWidth}
              height={feature.media.secondaryHeight}
              alt={feature.media.secondaryAlt}
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="ft-home-feature__caption">
            <p className="ft-home-feature__caption-title">
              {feature.media.captionTitle}
            </p>

            <p className="ft-home-feature__caption-text">
              {feature.media.captionText}
            </p>
          </div>
        </div>
      ) : feature.media.captionTitle ? (
        <div className="ft-home-feature__caption ft-home-feature__caption--single">
          <p className="ft-home-feature__caption-title">
            {feature.media.captionTitle}
          </p>

          {feature.media.captionText ? (
            <p className="ft-home-feature__caption-text">
              {feature.media.captionText}
            </p>
          ) : null}
        </div>
      ) : null}
    </Link>
  );
}


/* =========================================================
   BUTTON ARROW
========================================================= */

function ButtonArrow() {
  return (
    <svg
      className="ft-home-feature__button-arrow"
      viewBox="0 0 13 12"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M0 6H12M12 6L6.5 0.5M12 6L6.5 11.5"
        stroke="currentColor"
      />
    </svg>
  );
}
