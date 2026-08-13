import {
  ClientProof,
  type ClientProofLogo,
  type ClientProofTestimonial,
} from '../shared/ClientProof';

interface WorkHeroProps {
  testimonial?: ClientProofTestimonial;
  logos?: ClientProofLogo[];
}

export function WorkHero({
  testimonial,
  logos = [],
}: WorkHeroProps) {
  const hasSideContent = Boolean(
    testimonial || logos.length,
  );

  return (
    <section
      className={`ft-work-hero ${
        hasSideContent
          ? 'ft-work-hero--has-side'
          : ''
      }`}
    >
      <div className="ft-work-hero__gradient" />

      <div className="ft-work-hero__container">
        <p className="ft-work-hero__eyebrow">
          Our work
        </p>

        <div className="ft-work-hero__inner">
          <div className="ft-work-hero__left">
            <h1 className="ft-work-hero__title">
              Real results for ambitious ecommerce brands.
            </h1>

            <p className="ft-work-hero__description">
              We combine Shopify design and development
              with SEO, retention and ongoing optimisation
              to help ecommerce brands grow with
              measurable results.
            </p>
          </div>

          {hasSideContent ? (
            <ClientProof
              testimonial={testimonial}
              logos={logos}
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}