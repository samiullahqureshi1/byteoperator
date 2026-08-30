// TEMPORARY PLACEHOLDER COPY — replace with real client testimonial.
const TESTIMONIAL = {
  quote: 'Collaborating with The Fold Tech was a fantastic experience. They made us feel prioritised throughout, and the entire project ran smoothly from start to finish.',
  author: '— Sarah, Marketing Manager at Doisy & Dam',
  image: '/images/work/testimonial.webp',
  alt: 'FoldTech client testimonial',
};

interface WorkTestimonialProps {
  image?: string;
  alt?: string;
  heading?: string;
  meta?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function WorkTestimonial({
  image = TESTIMONIAL.image,
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
            src={image}
            alt={alt}
            loading="lazy"
            decoding="async"
          />

          <div className="ft-work-testimonial__overlay" aria-hidden="true" />

          <figcaption className="ft-work-testimonial__content">
            <h3
              className="ft-work-testimonial__quote"
              id="ft-work-testimonial-quote"
            >
              {heading}
            </h3>

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
