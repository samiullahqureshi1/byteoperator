import {Link} from 'react-router';
import type {ReactNode} from 'react';

type ServiceAboutCta = {
  label: string;
  href: string;
};

export type ServiceAboutSectionData = {
intro: {
  heading: string;
  description?: string;
  descriptionHtml?: string;
  cta?: {
    label: string;
    href: string;
  };
  };
  media: {
    primary: string;
    primaryAlt: string;
    secondary: string;
    secondaryAlt: string;
  };
  process: {
    heading: string;
    leftDescription: string;
    rightDescription: string;
    cta?: ServiceAboutCta;
  };
};

export function ServiceAboutSection({
  data,
  afterMedia,
}: {
  data: ServiceAboutSectionData;
  afterMedia?: ReactNode;
}) {
  return (
    <section className="ft-service-about">
      <div className="ft-service-about__container">
        <div className="ft-service-about__content ft-service-about__content--intro">
          <div className="ft-service-about__left">
            <h2 className="ft-service-about__heading">
              {data.intro.heading}
            </h2>
          </div>

        <div className="ft-service-about__right">
  {data.intro.descriptionHtml ? (
    <div
      className="ft-service-about__description"
      dangerouslySetInnerHTML={{
        __html: data.intro.descriptionHtml,
      }}
    />
  ) : data.intro.description ? (
    <p className="ft-service-about__description">
      {data.intro.description}
    </p>
  ) : null}

  {data.intro.cta ? (
    <ServiceAboutLink cta={data.intro.cta} />
  ) : null}
</div>
        </div>

        <div className="ft-service-about__images">
          <div className="ft-service-about__images-left">
            <img
              src={data.media.primary}
              alt={data.media.primaryAlt}
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="ft-service-about__images-right">
            <img
              src={data.media.secondary}
              alt={data.media.secondaryAlt}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        {afterMedia}

        <div className="ft-service-about__content">
          <div className="ft-service-about__left">
            <h2 className="ft-service-about__heading">
              {data.process.heading}
            </h2>

            <p className="ft-service-about__description">
              {data.process.leftDescription}
            </p>
          </div>

          <div className="ft-service-about__right">
            <p className="ft-service-about__description">
              {data.process.rightDescription}
            </p>

            {data.process.cta ? (
              <ServiceAboutLink cta={data.process.cta} />
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceAboutLink({cta}: {cta: ServiceAboutCta}) {
  return (
   <Link
  to={cta.href}
  className="ft-service-about__cta"
>
  <span>{cta.label}</span>

  <svg
    viewBox="0 0 13 12"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M0 6h12m0 0L6.5.5M12 6l-5.5 5.5"
      stroke="currentColor"
    />
  </svg>
</Link>
  );
}
