import {Link} from '~/lib/router-compat';

export type ServicePlusAgencyCtaData = {
  heading: string;
  descriptionHtml: string;
  cta: {
    label: string;
    href: string;
  };
};

export function ServicePlusAgencyCta({
  data,
}: {
  data: ServicePlusAgencyCtaData;
}) {
  return (
    <section
      className="ft-service-plus-agency-cta"
      aria-labelledby="ft-service-plus-agency-cta-title"
    >
      <div className="ft-service-plus-agency-cta__glow" aria-hidden="true" />

      <div className="ft-service-plus-agency-cta__container">
        <div className="ft-service-plus-agency-cta__partners">
          <img
            src="/images/home-partners/shopify.svg"
            alt="Shopify logo"
            width="179"
            height="76"
            loading="lazy"
            decoding="async"
          />
          <span aria-hidden="true" />
          <img
            src="/images/home-partners/shopify-plus.svg"
            alt="Shopify Plus logo"
            width="234"
            height="103"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="ft-service-plus-agency-cta__content">
          <h2 id="ft-service-plus-agency-cta-title">
            {data.heading}
          </h2>

          <div className="ft-service-plus-agency-cta__details">
            <p
              dangerouslySetInnerHTML={{
                __html: data.descriptionHtml,
              }}
            />

            <Link
              className="ft-service-plus-agency-cta__button"
              to={data.cta.href}
              prefetch="intent"
            >
              <span>{data.cta.label}</span>
              <svg viewBox="0 0 13 12" fill="none" aria-hidden="true">
                <path
                  d="M0 6H12M12 6L6.5 0.5M12 6L6.5 11.5"
                  stroke="currentColor"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
