import {Link} from 'react-router';

const EXPERT_MEDIA = [
  {
    src: '/images/home-experts/01.webp',
    alt: 'Shopify ecommerce project',
    className: 'ft-home-experts__media--one',
  },
  {
    src: '/images/home-experts/02.webp',
    alt: 'Shopify ecommerce brand project',
    className: 'ft-home-experts__media--two',
  },
  {
    src: '/images/home-experts/03.webp',
    alt: 'Shopify beauty ecommerce project',
    className: 'ft-home-experts__media--three',
  },
  {
    src: '/images/home-experts/04.webp',
    alt: 'Shopify lifestyle ecommerce project',
    className: 'ft-home-experts__media--four',
  },
] as const;

export function HomeExperts() {
  return (
    <section
      className="ft-home-experts"
      aria-labelledby="ft-home-experts-title"
    >
      {EXPERT_MEDIA.map((media) => (
        <div
          className={[
            'ft-home-experts__media',
            media.className,
          ].join(' ')}
          key={media.src}
          aria-hidden="true"
        >
          <img
            src={media.src}
            alt=""
            loading="lazy"
            decoding="async"
          />
        </div>
      ))}

      <div className="ft-home-experts__container">
        <div className="ft-home-experts__inner">
          <p className="ft-home-experts__subtitle">
            Shopify experts
          </p>

          <h2
            className="ft-home-experts__title"
            id="ft-home-experts-title"
          >
            Let&apos;s talk ecommerce, Shopify &amp;
            Shopify Plus solutions.
          </h2>

          <p className="ft-home-experts__description">
            FoldTech helps ecommerce brands design,
            develop, launch, support and grow Shopify
            stores. From new builds and migrations to
            ongoing development, SEO and conversion
            improvement, our team can help plan the
            right approach for your next Shopify
            project.
          </p>

          <Link
            className="ft-home-experts__button"
            to="/pages/contact"
            prefetch="intent"
          >
            <span>Get in touch</span>

            <svg
              className="ft-home-experts__button-arrow"
              viewBox="0 0 10 10"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M0.89 9.243L9.373 0.757M9.373 0.757H1.596M9.373 0.757V8.536"
                stroke="currentColor"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}