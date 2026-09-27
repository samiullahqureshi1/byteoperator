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
              Engineered for Impact: High-Velocity SaaS, AI Swarms & Flagship Ecommerce
            </h1>

            <p className="ft-work-hero__description">
              Explore client projects and Byte Operator’s own products: custom SaaS platforms, AI automation, Shopify Plus storefronts and enterprise platform migrations.
            </p>

            {/* <p className='ft-work-hero__description'>
              From emerging brands to established ecommerce businesses, our work
              is focused on delivering measurable results that increase traffic,
              improve conversions, and maximise revenue.
            </p> */}
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
