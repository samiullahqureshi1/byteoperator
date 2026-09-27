import {Link} from '~/lib/router-compat';
import {responsiveImage} from '~/lib/responsive-image';

const TEAM_IMAGES = [
  {
    src: 'https://cdn.shopify.com/s/files/1/0676/1155/7936/files/ryan-waring-164_6wVEHfI-unsplash.jpg?v=1790430992',
    alt: 'High-performance athletic running footwear',
    width: 1200,
    height: 1500,
  },
  {
    src: 'https://cdn.shopify.com/s/files/1/0676/1155/7936/files/nataliya-melnychuk-51sGDpm5S78-unsplash.jpg?v=1790430987',
    alt: 'Luxury botanical skincare and lotion product',
    width: 1200,
    height: 1200,
  },
  {
    src: 'https://cdn.shopify.com/s/files/1/0676/1155/7936/files/joan-tran-reEySFadyJQ-unsplash.jpg?v=1790430977',
    alt: 'Minimalist designer glass beverage bottle',
    width: 1200,
    height: 1200,
  },
  {
    src: 'https://cdn.shopify.com/s/files/1/0676/1155/7936/files/kiran-ck-LSNJ-pltdu8-unsplash.jpg?v=1790430955',
    alt: 'Premium wireless headphones and handsfree audio',
    width: 1200,
    height: 1500,
  },
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
            Engineering & Strategy Specialists
          </p>

          <h2 className="ft-work-team__title" id="ft-work-team-title">
            Architecting Scalable SaaS, AI Systems & High-Conversion Storefronts
          </h2>

          <p className="ft-work-team__description">
            From custom full-stack web platforms and autonomous AI agent workflows to Shopify Plus enterprise migrations and technical SEO, our team delivers deep technical mastery at every phase. We partner with ambitious founders to engineer systems that scale smoothly, maximize conversion, and compound revenue growth.
          </p>

          <div className="ft-work-team__actions">
            <Link
              className="ft-work-team__button ft-work-team__button--primary"
              to="/contact"
              prefetch="intent"
            >
              <span>Tell us about your project</span>
              <CtaArrow />
            </Link>

            <Link
              className="ft-work-team__button ft-work-team__button--secondary"
              to="/about"
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
                {...responsiveImage(first.src, '(max-width: 48rem) 50vw, 25vw', 1080)}
                width={first.width}
                height={first.height}
                alt={first.alt}
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className="ft-work-team__media ft-work-team__media--short">
              <img
                className="ft-work-team__image"
                {...responsiveImage(second.src, '(max-width: 48rem) 50vw, 25vw', 1080)}
                width={second.width}
                height={second.height}
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
                {...responsiveImage(third.src, '(max-width: 48rem) 50vw, 25vw', 1080)}
                width={third.width}
                height={third.height}
                alt={third.alt}
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className="ft-work-team__media ft-work-team__media--tall">
              <img
                className="ft-work-team__image"
                {...responsiveImage(fourth.src, '(max-width: 48rem) 50vw, 25vw', 1080)}
                width={fourth.width}
                height={fourth.height}
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
