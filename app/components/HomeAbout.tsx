'use client';

import {Link} from '~/lib/router-compat';
import {HOME_FACTS, type CompanyFact} from '~/data/companyFacts';
import {useCountUp} from '~/lib/useCountUp';
import type {HomePageContent} from '~/lib/cms/types';

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
    'Independent AI Automation & Custom Software Engineering',
  heading:
    'Byte Operator Architects, Automates & Scales Digital Platforms for Measurable Business Growth',
  stats: HOME_FACTS,
  rightHeading: {
    prefix: 'About',
    emphasis: 'Byte Operator',
    suffix: '— Independent AI & Software Engineering',
  },
  description:
    'Byte Operator is an independent AI automation and custom software engineering company. We engineer high-performance SaaS platforms, modern web applications, and autonomous AI workflow systems. Powered by our proprietary Replex Engine framework, visual n8n pipelines, and full-stack cloud architectures, we eliminate manual operational bottlenecks, capture every qualified inbound lead, and scale digital revenue.',
  cta: {
    label: 'Explore Our Case Studies',
    href: '/work',
  },
};

export function HomeAbout({
  data,
  content,
}: {
  data?: HomeAboutData;
  content?: HomePageContent;
} = {}) {
  if (content?.aboutShowSection === false) {
    return null;
  }

  const eyebrow = content?.aboutEyebrow || data?.eyebrow || DEFAULT_HOME_ABOUT_DATA.eyebrow;
  const heading = content?.aboutHeading || data?.heading || DEFAULT_HOME_ABOUT_DATA.heading;
  const description = content?.aboutDescription || data?.description || DEFAULT_HOME_ABOUT_DATA.description;
  const rightPrefix = content?.aboutRightHeadingPrefix ?? data?.rightHeading?.prefix ?? DEFAULT_HOME_ABOUT_DATA.rightHeading.prefix;
  const rightEmphasis = content?.aboutRightHeadingEmphasis ?? data?.rightHeading?.emphasis ?? DEFAULT_HOME_ABOUT_DATA.rightHeading.emphasis;
  const rightSuffix = content?.aboutRightHeadingSuffix ?? data?.rightHeading?.suffix ?? DEFAULT_HOME_ABOUT_DATA.rightHeading.suffix;
  const ctaLabel = content?.aboutCtaText || data?.cta?.label || DEFAULT_HOME_ABOUT_DATA.cta.label;
  const ctaHref = content?.aboutCtaLink || data?.cta?.href || DEFAULT_HOME_ABOUT_DATA.cta.href;

  const statsList: readonly CompanyFact[] = (data?.stats || HOME_FACTS).map((defaultFact, idx) => {
    if (idx === 0) {
      return {
        ...defaultFact,
        value: content?.aboutStat1Value || defaultFact.value,
        label: content?.aboutStat1Label || defaultFact.label,
      };
    }
    if (idx === 1) {
      return {
        ...defaultFact,
        value: content?.aboutStat2Value || defaultFact.value,
        label: content?.aboutStat2Label || defaultFact.label,
      };
    }
    if (idx === 2) {
      return {
        ...defaultFact,
        value: content?.aboutStat3Value || defaultFact.value,
        label: content?.aboutStat3Label || defaultFact.label,
      };
    }
    if (idx === 3) {
      return {
        ...defaultFact,
        value: content?.aboutStat4Value || defaultFact.value,
        label: content?.aboutStat4Label || defaultFact.label,
      };
    }
    return defaultFact;
  });

  const {ref: statsRef, displayValues} = useCountUp<HTMLDivElement>(statsList);

  return (
    <section
      className="ft-home-about"
      aria-labelledby="ft-home-about-title"
    >
      <div className="ft-home-about__inner">
        <div className="ft-home-about__left">
          <p className="ft-home-about__eyebrow">
            {eyebrow}
          </p>

          <h2
            className="ft-home-about__heading"
            id="ft-home-about-title"
          >
            {heading}
          </h2>

          <div
            className="ft-home-about__stats"
            role="group"
            aria-label="Byte Operator performance statistics"
            ref={statsRef}
          >
            {statsList.map((stat, index) => (
              <div
                className="ft-home-about__stat"
                key={stat.label}
              >
                <p className="ft-home-about__stat-value">
                  {displayValues[index] || stat.value}
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
            <span>{rightPrefix} </span>
            <strong>{rightEmphasis}</strong>
            <span> {rightSuffix}</span>
          </h3>

          <p className="ft-home-about__description">
            {description}
          </p>

          <Link
            className="ft-home-about__cta"
            to={ctaHref}
            prefetch="intent"
          >
            <span>{ctaLabel}</span>
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
