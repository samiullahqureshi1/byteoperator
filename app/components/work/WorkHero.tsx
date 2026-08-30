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
          Our Work
        </p>

        <div className="ft-work-hero__inner">
          <div className="ft-work-hero__left">
            <h1 className="ft-work-hero__title">
              Real Shopify Success Stories That Drive Measurable Growth
            </h1>

            <p className="ft-work-hero__description">
              Every ecommerce brand has unique goals, challenges, and
              opportunities. Explore how FoldTech has helped businesses launch,
              migrate, optimise, and scale their Shopify and Shopify Plus stores
              through custom development, conversion optimisation, technical SEO,
              AI search visibility, and long-term growth strategies.
            </p>

            <p className='ft-work-hero__description'>
              From emerging brands to established ecommerce businesses, our work
              is focused on delivering measurable results that increase traffic,
              improve conversions, and maximise revenue.
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
