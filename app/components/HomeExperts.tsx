import {Link} from '~/lib/router-compat';
import {responsiveImage} from '~/lib/responsive-image';

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

export type ExpertMediaItem = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

export type ExpertTestimonial = {
  quote: string;
  author: string;
  role: string;
  company?: string;
  avatar?: string;
  rating?: number;
  highlight?: string;
};

export type HomeExpertsProps = {
  eyebrow?: string;
  heading?: string;
  /** A string stays one paragraph; an array renders one <p> per entry. */
  description?: string | readonly string[];
  ctaLabel?: string;
  ctaTo?: string;
  variant?: 'default' | 'ecommerce-seo';
  media?: readonly ExpertMediaItem[];
  testimonials?: readonly ExpertTestimonial[];
  testimonial?: ExpertTestimonial;
  hideMedia?: boolean;
};


export function HomeExperts({
  eyebrow = 'Senior Engineering & AI Architects',
  heading = 'Ready to architect your next software platform, Shopify store, or AI automation?',
  description = [
    'Byte Operator partners directly with ambitious founders and enterprise brands to design, engineer, and deploy high-impact digital solutions.',
    'Speak directly with our senior software engineers and AI automation architects to map your technical roadmap.',
  ],
  ctaLabel = 'Schedule Technical Consultation',
  ctaTo = '/contact',
  variant = 'default',
  media,
  // No default testimonials: the previous defaults (Liam Vance / Apex
  // Digital, Clara Jensen / Kinetics Logistics) could not be verified.
  testimonials = [],
  testimonial,
  hideMedia = false,
}: HomeExpertsProps) {
  const classNames = [
    'ft-home-experts__media--one',
    'ft-home-experts__media--two',
    'ft-home-experts__media--three',
    'ft-home-experts__media--four',
  ] as const;

  const testimonialList: readonly ExpertTestimonial[] =
    testimonials && testimonials.length > 0
      ? testimonials
      : testimonial
        ? [testimonial]
        : [];

  const hasTestimonials = testimonialList.length > 0;
  const shouldShowMedia = !hideMedia && !hasTestimonials && media !== undefined ? media.length > 0 : !hideMedia && !hasTestimonials;

  const mediaList = media?.length
    ? media.map((item, index) => ({
        src: item.src,
        alt: item.alt,
        className: classNames[index % classNames.length],
        width: item.width ?? 1080,
        height: item.height ?? 1080,
      }))
    : shouldShowMedia
      ? EXPERT_MEDIA
      : [];

  return (
    <section
      className={`ft-home-experts${variant === 'ecommerce-seo' ? ' ft-home-experts--ecommerce-seo' : ''}${hasTestimonials ? ' ft-home-experts--has-testimonials' : ''}`}
      aria-labelledby="ft-home-experts-title"
    >
      {shouldShowMedia && mediaList.map((item) => (
        <div
          className={[
            'ft-home-experts__media',
            item.className,
          ].join(' ')}
          key={item.src}
          aria-hidden="true"
        >
          <img
            {...responsiveImage(item.src, '(min-width: 48rem) 20vw, 42vw', 1080)}
            width={item.width}
            height={item.height}
            alt={item.alt}
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

          {hasTestimonials ? (
            <div
              className={`ft-home-experts__testimonials ${
                testimonialList.length > 1
                  ? 'ft-home-experts__testimonials--grid'
                  : 'ft-home-experts__testimonials--single'
              }`}
            >
              {testimonialList.map((item) => (
                <div
                  key={`${item.author}-${item.role}`}
                  className="ft-home-experts__testimonial-card"
                >
                  <div className="ft-home-experts__testimonial-header">
                    <div
                      className="ft-home-experts__testimonial-stars"
                      aria-label={`${item.rating ?? 5} out of 5 stars`}
                    >
                      {/* Star shape lives once in CSS (mask), not as an
                          inline SVG path per star, to keep the HTML lean. */}
                      {[...Array(item.rating ?? 5)].map((_, i) => (
                        <span
                          key={i}
                          className="ft-home-experts__star-icon"
                          aria-hidden="true"
                        />
                      ))}
                    </div>

                    {item.highlight ? (
                      <span className="ft-home-experts__testimonial-highlight">
                        {item.highlight}
                      </span>
                    ) : null}
                  </div>

                  <p className="ft-home-experts__testimonial-quote">
                    &ldquo;{item.quote}&rdquo;
                  </p>

                  <div className="ft-home-experts__testimonial-footer">
                    {item.avatar ? (
                      <img
                        src={item.avatar}
                        alt={item.author}
                        className="ft-home-experts__testimonial-avatar"
                        width={48}
                        height={48}
                        loading="lazy"
                      />
                    ) : (
                      <div
                        className="ft-home-experts__testimonial-avatar-fallback"
                        aria-hidden="true"
                      >
                        {item.author.charAt(0)}
                      </div>
                    )}
                    <div className="ft-home-experts__testimonial-info">
                      <span className="ft-home-experts__testimonial-name">
                        {item.author}
                      </span>
                      <span className="ft-home-experts__testimonial-role">
                        {item.role}
                        {item.company ? ` · ${item.company}` : ''}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : null}

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
