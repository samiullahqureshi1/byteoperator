'use client';

import {Link} from '~/lib/router-compat';

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
                The story of Byte Operator: Built by engineers to replace bloated agency models with pure technical velocity.
              </h2>
            </div>

            <div className="ft-about-story__right">
              <div className="ft-about-story__description">
                <p>
                  <strong>Byte Operator</strong> is an independent AI automation and custom software engineering company founded on a clear premise: modern organizations outgrow generic templates, fragile monolithic codebases, and fragmented vendor stacks. We bridge high-level product strategy, full-stack software engineering, and autonomous AI automation into one cohesive, high-impact delivery team.
                </p>

                <p>
                  As an independent engineering firm founded by Samiullah Qureshi and Uzair Khan, Byte Operator operates with its own proprietary architectures, workflows, and dedicated engineers—completely separate and distinct from any other organizations using the word &ldquo;Byte&rdquo;.
                </p>

                <p>
                  From engineering custom SaaS platforms and full-stack web applications to deploying autonomous multi-agent pipelines with our proprietary Replex Engine and n8n workflows, we eliminate manual operational bottlenecks and accelerate technical velocity.
                </p>

                <p>
                  We partner directly with founders, CTOs, and technical leaders as an embedded engineering force, delivering measurable revenue increases, bulletproof reliability, and enduring competitive advantages.
                </p>
              </div>

              <Link
                to="/services"
                className="ft-about-story__button"
              >
                <span>Explore Our Full Tech Stack</span>

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
            Proven engineering scale backed by verifiable enterprise outcomes.
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