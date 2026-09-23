import {Link} from 'react-router';

const EXPERT_MEDIA = [
  {
    src: '/images/home-experts/01.webp',
    alt: 'Model holding a blue skincare tube',
    className: 'ft-home-experts__media--one',
    width: 941,
    height: 1672,
  },
  {
    src: '/images/home-experts/02.webp',
    alt: 'Skincare jar on a marble cafe table',
    className: 'ft-home-experts__media--two',
    width: 896,
    height: 1195,
  },
  {
    src: '/images/home-experts/03.webp',
    alt: 'Floral crystal embellishments on fabric',
    className: 'ft-home-experts__media--three',
    width: 1125,
    height: 2000,
  },
  {
    src: '/images/home-experts/04.webp',
    alt: 'Woman at a cafe table with a navy handbag',
    className: 'ft-home-experts__media--four',
    width: 1086,
    height: 1448,
  },
] as const;
export type HomeExpertsProps = {
  eyebrow?: string;
  heading?: string;
  /** A string stays one paragraph; an array renders one <p> per entry. */
  description?: string | readonly string[];
  ctaLabel?: string;
  ctaTo?: string;
  variant?: 'default' | 'ecommerce-seo';
};


export function HomeExperts({
  eyebrow = 'Shopify experts',
  heading = 'Let\'s talk ecommerce, Shopify & Shopify Plus solutions.',
  description = [
    'FoldTech helps ecommerce brands build, improve, and grow Shopify stores. We support new builds, migrations, ongoing development, SEO, and conversion optimisation.',
    'Our team can help plan the right approach based on your store, goals, and current challenges.',
  ],
  ctaLabel = 'Get in touch',
  ctaTo = '/contact/',
  variant = 'default',
}: HomeExpertsProps) {
  return (
    <section
      className={`ft-home-experts${variant === 'ecommerce-seo' ? ' ft-home-experts--ecommerce-seo' : ''}`}
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
            width={media.width}
            height={media.height}
            alt={media.alt}
            loading="lazy"
            decoding="async"
          />
        </div>
      ))}

      <div className="ft-home-experts__container">
        <div className="ft-home-experts__inner">
          <p className="ft-home-experts__subtitle">
            {eyebrow}
          </p>

          <h2
            className="ft-home-experts__title"
            id="ft-home-experts-title"
          >
            {heading}
          </h2>

          {(typeof description === 'string'
            ? [description]
            : description
          ).map((paragraph) => (
            <p className="ft-home-experts__description" key={paragraph}>
              {paragraph}
            </p>
          ))}

          <Link
            className="ft-home-experts__button"
            to={ctaTo}
            prefetch="intent"
          >
            <span>{ctaLabel}</span>

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
