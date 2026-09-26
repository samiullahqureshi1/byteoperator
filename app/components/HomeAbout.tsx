'use client';

import {Link} from '~/lib/router-compat';

import {HOME_FACTS, type CompanyFact} from '~/data/companyFacts';
import {useCountUp} from '~/lib/useCountUp';

export type HomeAboutData = {
  eyebrow: string;
  heading: string;
  stats: readonly CompanyFact[];
  rightHeading: {
    prefix: string;
    emphasis: string;
    suffix: string;
  };
  description: string;
  cta: {
    label: string;
    href: string;
  };
};

const DEFAULT_HOME_ABOUT_DATA: HomeAboutData = {
  eyebrow:
    'Engineering & AI Automation Partners for High-Growth Brands',
  heading:
    'We Architect, Automate & Scale Digital Platforms for Real Business Impact',
  stats: HOME_FACTS,
  rightHeading: {
    prefix: 'Your',
    emphasis: 'Full-Lifecycle',
    suffix: 'Software & AI Automation Agency',
  },
  description:
    'At Byte Operator, we engineer high-performance SaaS platforms, Shopify storefronts, and autonomous AI automation systems. Powered by our proprietary Replex Engine framework, visual n8n pipelines, and full-stack cloud architectures, we eliminate manual operational bottlenecks, capture every qualified inbound lead, and maximize digital revenue.',
  cta: {
    label: 'Explore Our Case Studies',
    href: '/work',
  },
};

export function HomeAbout({
  data = DEFAULT_HOME_ABOUT_DATA,
}: {
  data?: HomeAboutData;
} = {}) {
  const {ref: statsRef, displayValues} = useCountUp<HTMLDivElement>(
    data.stats,
  );

  return (
    <section
      className="ft-home-about"
      aria-labelledby="ft-home-about-title"
    >
      <div className="ft-home-about__inner">
        <div className="ft-home-about__left">
          <p className="ft-home-about__eyebrow">
            {data.eyebrow}
          </p>

          <h2
            className="ft-home-about__heading"
            id="ft-home-about-title"
          >
            {data.heading}
          </h2>

          <div
            className="ft-home-about__stats"
            role="group"
            aria-label="Byte Operator performance statistics"
            ref={statsRef}
          >
            {data.stats.map((stat, index) => (
              <div
                className="ft-home-about__stat"
                key={stat.label}
              >
                <p className="ft-home-about__stat-value">
                  {displayValues[index]}
                </p>

                <p className="ft-home-about__stat-label">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="ft-home-about__right">
          <h3 className="ft-home-about__right-heading">
            <span>{data.rightHeading.prefix} </span>
            <strong>{data.rightHeading.emphasis}</strong>
            <span> {data.rightHeading.suffix}</span>
          </h3>

          <p className="ft-home-about__description">
            {data.description}
          </p>

          <Link
            className="ft-home-about__cta"
            to={data.cta.href}
            prefetch="intent"
          >
            <span>{data.cta.label}</span>
            <ArrowIcon />
          </Link>
        </div>
      </div>
    </section>
  );
}



function ArrowIcon() {
  return (
    <svg
      className="ft-home-about__cta-arrow"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M1 13L13 1M13 1H4M13 1V10"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
