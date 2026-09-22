import {Link} from 'react-router';

import {ABOUT_FACTS} from '~/data/companyFacts';
import {useCountUp} from '~/lib/useCountUp';

export function AboutStoryStats() {
  const {ref: statsRef, displayValues} = useCountUp<HTMLElement>(ABOUT_FACTS);


  return (
    <section className="ft-about-story-stats">
      {/* About Story */}
      <section className="ft-about-story">
        <div
          className="ft-about-story__gradient"
          aria-hidden="true"
        />

        <div className="ft-about-story__container">
          <div className="ft-about-story__inner">
            <div className="ft-about-story__left">
              <h2 className="ft-about-story__heading">
                The story of FoldTech, an ecommerce agency built around
                Shopify growth.
              </h2>
            </div>

            <div className="ft-about-story__right">
              <div className="ft-about-story__description">
                <p>
                  FoldTech brings ecommerce strategy, creative design, development,
                  search visibility and optimisation together, helping brands
                  build stronger Shopify experiences. Our approach focuses on
                  creating stores that are clear, scalable and built around
                  commercial priorities from the start.
                </p>

                <p>
                  Today, we support ecommerce businesses across strategy,
                  storefront development, SEO, experimentation and ongoing
                  optimisation. By connecting technical execution with customer
                  experience and measurable growth priorities, we help brands
                  improve how their stores perform and evolve over time.
                </p>
              </div>

              <Link
                to="/services"
                className="ft-about-story__button"
              >
                <span>Explore Our Services</span>

                <svg
                  width="13"
                  height="12"
                  viewBox="0 0 13 12"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M0 6h12m0 0L6.5.5M12 6l-5.5 5.5"
                    stroke="currentColor"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Stats */}
      <section className="ft-about-stats" ref={statsRef}>
        <div className="ft-about-stats__container">
          <h2 className="ft-about-stats__heading">
            Our ecommerce experience supports brands through ambitious,
            long-term growth.
          </h2>

          <div className="ft-about-stats__inner">
            {ABOUT_FACTS.map((fact, index) => (
              <article
                className="ft-about-stats__item"
                key={fact.value}
              >
                <p className="ft-about-stats__item-title">
                  {fact.label}
                </p>

                <span className="ft-about-stats__item-value">
                  <span
                    className="ft-about-stats__item-value-reserve"
                    aria-hidden="true"
                  >
                    {fact.value}
                  </span>
                  <span
                    className="ft-about-stats__item-value-counter"
                    aria-hidden="true"
                  >
                    {displayValues[index]}
                  </span>

                  {/* The figure counts up, so the finished one is read out
                      instead of whichever frame the animation is on. */}
                  <span className="sr-only">
                    {`${fact.value} ${fact.label}`}
                  </span>
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
}