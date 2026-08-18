import {Link} from 'react-router';
import {WORK_HERO_TESTIMONIAL} from '~/data/workHeroProof';
import {ClientProof} from '../shared/ClientProof';

export type ServiceHeroCta = {
  label: string;
  href: string;
};

export type ServiceHeroVariant =
  | 'standard'
  | 'shopify-plus';

export type ServiceHeroTheme = 'dark' | 'light';

export interface ServiceHeroProps {
  eyebrow?: string;
  heading: string;
  description?: string;
  descriptionHtml?: string;
  chips?: readonly string[];
  primaryCta?: ServiceHeroCta;
  showPartnerLogos?: boolean;
  showClientProof?: boolean;
  clientProofLabel?: string;
  variant?: ServiceHeroVariant;
  theme?: ServiceHeroTheme;
}

export function ServiceHero({
  eyebrow,
  heading,
  description,
  descriptionHtml,
  chips = [],
  primaryCta,
  showPartnerLogos = false,
  showClientProof = false,
  clientProofLabel,
  variant = 'standard',
  theme = 'dark',
}: ServiceHeroProps) {
  const hasRightContent = Boolean(
    showPartnerLogos ||
      descriptionHtml ||
      description ||
      primaryCta,
  );

  const sectionClasses = [
    'ft-services-hero',
    `ft-services-hero--${variant}`,
    `ft-services-hero--theme-${theme}`,
    hasRightContent
      ? 'ft-services-hero--with-right'
      : 'ft-services-hero--without-right',
  ].join(' ');

  return (
    <section className={sectionClasses}>
      <div className="ft-services-hero__glow" aria-hidden="true" />

      <div className="ft-services-hero__container">
        {eyebrow ? (
          <p className="ft-services-hero__eyebrow">
            {eyebrow}
          </p>
        ) : null}

        <div className="ft-services-hero__inner">
          <div className="ft-services-hero__left">
            <h1 className="ft-services-hero__title">
              {heading}
            </h1>

            {chips.length ? (
              <div className="ft-services-hero__chips">
                {chips.map((chip) => (
                  <span
                    className="ft-services-hero__chip"
                    key={chip}
                  >
                    {chip}
                  </span>
                ))}
              </div>
            ) : null}

            {showClientProof ? (
              <div className="ft-services-hero__client-proof">
                <ClientProof
                  testimonial={WORK_HERO_TESTIMONIAL}
                  triggerLabelLines={
                    clientProofLabel
                      ? ['Hear from', clientProofLabel]
                      : undefined
                  }
                />
              </div>
            ) : null}
          </div>

          {hasRightContent ? (
            <div className="ft-services-hero__right">
              {showPartnerLogos ? (
                <div className="ft-services-hero__partners">
                  <img
                    src="/images/home-partners/shopify.svg"
                    alt="Shopify"
                    loading="lazy"
                    decoding="async"
                  />

                  <span className="ft-services-hero__partner-divider" />

                  <img
                    src="/images/home-partners/shopify-plus.svg"
                    alt="Shopify Plus"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ) : null}

              {descriptionHtml ? (
                <div
                  className="ft-services-hero__description"
                  dangerouslySetInnerHTML={{
                    __html: descriptionHtml,
                  }}
                />
              ) : description ? (
                <div className="ft-services-hero__description">
                  <p>{description}</p>
                </div>
              ) : null}

              {primaryCta ? (
                <Link
                  className="ft-services-hero__cta"
                  to={primaryCta.href}
                  prefetch="intent"
                >
                  <span>{primaryCta.label}</span>
                  <ServiceHeroCtaArrow />
                </Link>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function ServiceHeroCtaArrow() {
  return (
    <svg
      className="ft-services-hero__cta-arrow"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 10L10 4M5 4H10V9"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
