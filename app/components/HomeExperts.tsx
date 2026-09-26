import {Link} from '~/lib/router-compat';

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
  testimonials = [
    {
      quote:
        'Replex Engine transformed our inbound sales conversion. Our average response time dropped from 4 hours to 20 seconds, and we closed 38% more inbound leads in the first month alone.',
      author: 'Liam Vance',
      role: 'VP of Sales & Growth',
      company: 'Apex Digital',
      rating: 5,
      highlight: 'Replex Engine & 38% Sales Lift',
    },
    {
      quote:
        'Byte Operator built our entire n8n operational workflow connecting Shopify, NetSuite, and customer support. It saves our operations team over 25 hours every single week.',
      author: 'Clara Jensen',
      role: 'Chief Operating Officer',
      company: 'Kinetics Logistics',
      rating: 5,
      highlight: 'n8n Pipeline Automation & 25hrs/wk Saved',
    },
  ],
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
            src={item.src}
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
                      {[...Array(item.rating ?? 5)].map((_, i) => (
                        <svg
                          key={i}
                          className="ft-home-experts__star-icon"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
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
