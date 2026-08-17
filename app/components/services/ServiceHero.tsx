import {Link} from 'react-router';
import {WORK_HERO_TESTIMONIAL} from '~/data/workHeroProof';
import {ClientProof} from '../shared/ClientProof';

export type ServiceHeroCta = {
  label: string;
  href: string;
};

export interface ServiceHeroProps {
  eyebrow: string;
  heading: string;
  description?: string;
  descriptionHtml?: string;
  chips?: readonly string[];
  primaryCta?: ServiceHeroCta;
  showPartnerLogos?: boolean;
  showClientProof?: boolean;
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
}: ServiceHeroProps) {
  return (
    <section className="ft-services-hero">
      <div className="ft-services-hero__glow" />

      <div className="ft-services-hero__container">
        <p className="ft-services-hero__eyebrow">
          {eyebrow}
        </p>

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
                  triggerLabel={
                    <>
                      Hear from
                      <br />
                      our clients
                    </>
                  }
                />
              </div>
            ) : null}
          </div>

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
                {primaryCta.label}
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
