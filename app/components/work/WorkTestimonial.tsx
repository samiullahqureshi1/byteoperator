// TEMPORARY PLACEHOLDER COPY — replace with real client testimonial.
const TESTIMONIAL = {
  quote: 'Working with Charle Agency was an absolute dream, we really felt they had the time for us and the whole project was seamless start to finish',
  author: 'Alexa - Marketing Manager | Doisy & Dam',
  image: '/images/work/testimonial.webp',
  alt: 'FoldTech client testimonial',
};

export function WorkTestimonial() {
  return (
    <section
      className="ft-work-testimonial"
      aria-labelledby="ft-work-testimonial-quote"
    >
      <div className="ft-work-testimonial__container">
        <figure className="ft-work-testimonial__inner">
          <img
            className="ft-work-testimonial__bg"
            src={TESTIMONIAL.image}
            alt={TESTIMONIAL.alt}
            loading="lazy"
            decoding="async"
          />

          <div className="ft-work-testimonial__overlay" aria-hidden="true" />

          <figcaption className="ft-work-testimonial__content">
            <h3
              className="ft-work-testimonial__quote"
              id="ft-work-testimonial-quote"
            >
              {TESTIMONIAL.quote}
            </h3>

            <p className="ft-work-testimonial__author">{TESTIMONIAL.author}</p>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
