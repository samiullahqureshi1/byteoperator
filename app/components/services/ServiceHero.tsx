import {Link} from 'react-router';
import {WORK_HERO_TESTIMONIAL} from '~/data/workHeroProof';
import {ClientProof} from '../shared/ClientProof';

export type ServiceHeroCta = {
  label: string;
  href: string;
};

export type ServiceHeroChip =
  | string
  | {
      label: string;
      href?: string;
    };

export type ServiceHeroLogo = {
  src: string;
  alt: string;
  text?: string;
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
  chips?: readonly ServiceHeroChip[];
  primaryCta?: ServiceHeroCta;
  promoLink?: ServiceHeroCta;
  bottomLogo?: ServiceHeroLogo;
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
  promoLink,
  bottomLogo,
  showPartnerLogos = false,
  showClientProof = false,
  clientProofLabel,
  variant = 'standard',
  theme = 'dark',
}: ServiceHeroProps) {
  const hasRightContent = Boolean(
    showPartnerLogos ||
      promoLink ||
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
      <div
        className="ft-services-hero__glow"
        aria-hidden="true"
      />

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
                {chips.map((chip) => {
                  const label =
                    typeof chip === 'string'
                      ? chip
                      : chip.label;

                  const href =
                    typeof chip === 'string'
                      ? undefined
                      : chip.href;

                  return href ? (
                    <Link
                      className="ft-services-hero__chip"
                      key={label}
                      to={href}
                      prefetch="intent"
                    >
                      {label}
                    </Link>
                  ) : (
                    <span
                      className="ft-services-hero__chip"
                      key={label}
                    >
                      {label}
                    </span>
                  );
                })}
              </div>
            ) : null}

           {bottomLogo ? (
  bottomLogo.text ? (
    <div className="ft-services-hero__bottom-brand">
      <span className="ft-services-hero__bottom-brand-text">
        {bottomLogo.text}
      </span>

      <img
        className="ft-services-hero__bottom-brand-logo"
        src={bottomLogo.src}
        alt={bottomLogo.alt}
        loading="lazy"
        decoding="async"
      />
    </div>
  ) : (
    <img
      className="ft-services-hero__bottom-logo"
      src={bottomLogo.src}
      alt={bottomLogo.alt}
      loading="lazy"
      decoding="async"
    />
  )
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
              {promoLink ? (
                <Link
                  className="ft-services-hero__promo-link"
                  to={promoLink.href}
                  prefetch="intent"
                >
                  {promoLink.label}
                </Link>
              ) : null}

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