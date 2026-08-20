import {Link} from 'react-router';
import {resolveCanonicalPath} from '~/lib/route-mappings';

import type {HomeFeatureData} from '~/data/homeFeatures';

/* =========================================================
   FOLDTECH — REUSABLE HOME FEATURE
========================================================= */

type HomeFeatureProps = {
  feature: HomeFeatureData;
};

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
              <div
                className="ft-home-feature__logos"
                aria-label="Service categories"
              >
                {feature.logos.map((logo) => (
                  <div
                    className="ft-home-feature__logo-item"
                    key={`${feature.id}-${logo.src}`}
                  >
                    <img
                      className="ft-home-feature__logo"
                      src={logo.src}
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
              {feature.heading}
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
              {feature.description.map(
                (paragraph, index) => (
                  <p
                    className="ft-home-feature__description"
                    key={`${feature.id}-paragraph-${index}`}
                  >
                    {paragraph}
                  </p>
                ),
              )}
            </div>

            <div className="ft-home-feature__buttons">
              {feature.buttons.map((button) => (
                <Link
                  className="ft-home-feature__button"
                  key={`${feature.id}-${button.label}`}
                  to={resolveCanonicalPath(button.href)}
                  prefetch="intent"
                >
                  <span>{button.label}</span>

                  <ButtonArrow />
                </Link>
              ))}
            </div>
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
  return (
    <Link
      className="ft-home-feature__media"
      to={resolveCanonicalPath(feature.media.href)}
      prefetch="intent"
      aria-label={`View ${feature.media.captionTitle} case study`}
    >
      <div className="ft-home-feature__image ft-home-feature__image--primary">
        <img
          src={feature.media.primary}
          alt={feature.media.primaryAlt}
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="ft-home-feature__overlap">
        <div className="ft-home-feature__image ft-home-feature__image--secondary">
          <img
            src={feature.media.secondary}
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
