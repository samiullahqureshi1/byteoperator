import {responsiveImage} from '~/lib/responsive-image';

const TESTIMONIAL = {
  quote: 'Byte Operator transformed our entire technical infrastructure. The execution was flawless, delivering lightning-fast load times and an immediate 68% uplift in mobile conversion.',
  author: 'Marcus Vance, VP of Ecommerce at Aydi Active',
  image: '/images/work/testimonial.webp',
  imageWidth: 1530,
  imageHeight: 650,
  alt: 'Byte Operator client testimonial',
};

interface WorkTestimonialProps {
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  alt?: string;
  heading?: string;
  meta?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function WorkTestimonial({
  image = TESTIMONIAL.image,
  imageWidth = TESTIMONIAL.imageWidth,
  imageHeight = TESTIMONIAL.imageHeight,
  alt = TESTIMONIAL.alt,
  heading = TESTIMONIAL.quote,
  meta = TESTIMONIAL.author,
  actionLabel,
  onAction,
}: WorkTestimonialProps = {}) {
  return (
    <section
      className="ft-work-testimonial"
      aria-labelledby="ft-work-testimonial-quote"
    >
      <div className="ft-work-testimonial__container">
        <figure className="ft-work-testimonial__inner">
          <img
            className="ft-work-testimonial__bg"
            {...responsiveImage(image, '100vw', 1920)}
            width={imageWidth}
            height={imageHeight}
            alt={alt}
            loading="lazy"
            decoding="async"
          />

          <div className="ft-work-testimonial__overlay" aria-hidden="true" />

          <figcaption className="ft-work-testimonial__content">
            <h2
              className="ft-work-testimonial__quote"
              id="ft-work-testimonial-quote"
            >
              {heading}
            </h2>

            <p className="ft-work-testimonial__author">{meta}</p>

            {actionLabel && onAction ? (
              <button
                className="ft-work-testimonial__action"
                type="button"
                onClick={onAction}
              >
                <PlayIcon />
                <span>{actionLabel}</span>
              </button>
            ) : null}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="7.5" stroke="currentColor" />
      <path d="M6.5 5.5L10.5 8L6.5 10.5V5.5Z" fill="currentColor" />
    </svg>
  );
}
