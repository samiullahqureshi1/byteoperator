import {Link} from 'react-router';

const TEAM_IMAGES = [
  {src: '/images/work/team/01.webp', alt: 'FoldTech team member at work'},
  {src: '/images/work/team/02.webp', alt: 'FoldTech team collaborating'},
  {src: '/images/work/team/03.webp', alt: 'FoldTech team in the studio'},
  {src: '/images/work/team/04.webp', alt: 'FoldTech team reviewing a project'},
];

function CtaArrow() {
  return (
    <svg
      className="ft-work-team__arrow"
      viewBox="0 0 10 10"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M0.89 9.243L9.373 0.757M9.373 0.757H1.596M9.373 0.757V8.536"
        stroke="currentColor"
      />
    </svg>
  );
}

export function WorkTeamCta() {
  const [first, second, third, fourth] = TEAM_IMAGES;

  return (
    <section className="ft-work-team" aria-labelledby="ft-work-team-title">
      <div className="ft-work-team__inner">
        <div className="ft-work-team__content">
          <p className="ft-work-team__eyebrow">
            Meet the Team Behind High Growth Ecommerce Brands
          </p>

          <h2 className="ft-work-team__title" id="ft-work-team-title">
            Senior specialists in Shopify development, conversion rate
            optimisation (CRO), SEO, design, support and retention marketing
            focused on turning your store into a scalable revenue engine.
          </h2>

          <p className="ft-work-team__description">
            From custom Shopify builds and ongoing technical support to
            data-driven conversion optimisation, organic search growth and
            retention marketing, our team delivers specialised expertise at every
            stage of the ecommerce journey. We help brands increase traffic, raise
            average order value, improve customer lifetime value and build systems
            that keep growing long after launch.
          </p>

          <div className="ft-work-team__actions">
            <Link
              className="ft-work-team__button ft-work-team__button--primary"
              to="/pages/contact"
              prefetch="intent"
            >
              <span>Tell us about your project</span>
              <CtaArrow />
            </Link>

            <Link
              className="ft-work-team__button ft-work-team__button--secondary"
              to="/pages/about"
              prefetch="intent"
            >
              <span>About us</span>
              <CtaArrow />
            </Link>
          </div>
        </div>

        <div className="ft-work-team__mosaic">
          <div className="ft-work-team__column">
            <div className="ft-work-team__media ft-work-team__media--tall">
              <img
                className="ft-work-team__image"
                src={first.src}
                alt={first.alt}
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className="ft-work-team__media ft-work-team__media--short">
              <img
                className="ft-work-team__image"
                src={second.src}
                alt={second.alt}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

          <div className="ft-work-team__column ft-work-team__column--offset">
            <div className="ft-work-team__media ft-work-team__media--short">
              <img
                className="ft-work-team__image"
                src={third.src}
                alt={third.alt}
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className="ft-work-team__media ft-work-team__media--tall">
              <img
                className="ft-work-team__image"
                src={fourth.src}
                alt={fourth.alt}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
