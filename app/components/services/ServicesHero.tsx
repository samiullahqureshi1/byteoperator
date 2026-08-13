import {ClientProof} from '../shared/ClientProof';
import {WORK_HERO_TESTIMONIAL} from '~/data/workHeroProof';
const SERVICE_LINKS = [
  'Shopify Theme Builds',
  'Ecommerce SEO',
  'Conversion Rate Optimisation',
  'Support & Maintenance',
  'Email Marketing Agency',
  'Shopify Migrations',
  'Shopify Web Design',
  'Shopify Web Development',
  'Shopify App Development',
  'Shopify Integrations',
  'Shopify & Headless',
  'Internationalisation',
  'Subscriptions',
  'B2B & Wholesale',
  'Shopify Audits',
  'Shopify Consultancy',
];

interface ServicesHeroProps {
  descriptionHtml?: string;
}

export function ServicesHero({
  descriptionHtml = '',
}: ServicesHeroProps) {
  return (
    <section className="ft-services-hero">
      <div className="ft-services-hero__glow" />

      <div className="ft-services-hero__inner">
        <div className="ft-services-hero__left">
          <p className="ft-services-hero__eyebrow">
            Our Services
          </p>

          <h1 className="ft-services-hero__title">
            We design, build, support &amp; grow strategic
            ecommerce stores with Shopify &amp; Shopify Plus.
          </h1>

          <div className="ft-services-hero__chips">
            {SERVICE_LINKS.map((service) => (
              <span
                className="ft-services-hero__chip"
                key={service}
              >
                {service}
              </span>
            ))}
          </div>
          <div className="ft-services-hero__client-proof">
            <ClientProof testimonial={WORK_HERO_TESTIMONIAL} />
          </div>
        </div>

        <div className="ft-services-hero__right">
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

          {descriptionHtml ? (
            <div
              className="ft-services-hero__description"
              dangerouslySetInnerHTML={{
                __html: descriptionHtml,
              }}
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}
