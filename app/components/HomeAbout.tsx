import {Link} from 'react-router';

export type HomeAboutStat = {
  value: string;
  label: string;
};

export type HomeAboutData = {
  eyebrow: string;
  heading: string;
  stats: readonly HomeAboutStat[];
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

export const HOME_ABOUT_STATS = [
  {
    value: '20K+',
    label: 'Tasks Delivered',
  },
  {
    value: '15K+',
    label: 'Stores Built',
  },
  {
    value: '$3.1B+',
    label: 'Merchant Revenue',
  },
  {
    value: 'XX%',
    label: 'Avg. Conversion Uplift',
  },
] as const;

const DEFAULT_HOME_ABOUT_DATA: HomeAboutData = {
  eyebrow: 'Trusted Ecommerce and Shopify Agency.',
  heading:
    'FoldTech helps ambitious ecommerce brands build, optimise and grow high-performing Shopify stores.',
  stats: HOME_ABOUT_STATS,
  rightHeading: {
    prefix: 'The',
    emphasis: 'Growth-First',
    suffix: 'Shopify Agency',
  },
  description:
    'FoldTech is a Shopify and ecommerce growth agency helping ambitious brands design, build, migrate and grow high-performing Shopify and Shopify Plus stores. Our work brings together conversion-focused design, dependable development, SEO, AI visibility, email marketing and ongoing optimisation, supported by structured testing and clear growth strategies to improve performance across the customer journey.',
  cta: {
    label: 'Explore Our Work',
    href: '/pages/case-studies',
  },
};

export function HomeAbout({
  data = DEFAULT_HOME_ABOUT_DATA,
}: {
  data?: HomeAboutData;
} = {}) {
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
            aria-label="FoldTech performance statistics"
          >
            {data.stats.map((stat) => (
              <div
                className="ft-home-about__stat"
                key={stat.label}
              >
                <p className="ft-home-about__stat-value">
                  {stat.value}
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
            <span>{data.rightHeading.prefix}</span>

            <AboutMark />

            <strong>{data.rightHeading.emphasis}</strong>

            <span>{data.rightHeading.suffix}</span>
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

function AboutMark() {
  return (
    <span
      className="ft-home-about__mark"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          width="48"
          height="48"
          rx="10"
          fill="currentColor"
        />

        <path
          d="M24 8.8C24.9 17.2 30.8 23.1 39.2 24C30.8 24.9 24.9 30.8 24 39.2C23.1 30.8 17.2 24.9 8.8 24C17.2 23.1 23.1 17.2 24 8.8Z"
          fill="#ffffff"
        />
      </svg>
    </span>
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
