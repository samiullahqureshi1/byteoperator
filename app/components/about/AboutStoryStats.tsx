import {useEffect, useRef, useState} from 'react';
import {Link} from 'react-router';

const ABOUT_STATS = [
  {
    label: (
      <>
        Tasks
        <br />
        Delivered
      </>
    ),
    value: '20K+',
  },
  {
    label: (
      <>
        Stores
        <br />
        Built
      </>
    ),
    value: '15K+',
  },
  {
    label: (
      <>
        Merchant
        <br />
        Revenue
      </>
    ),
    value: '$3.1B+',
  },
  {
    label: (
      <>
        Established
        <br />
        Since
      </>
    ),
    value: '2018',
  },
] as const;

const COUNT_CONFIG = {
  '20K+': {target: 20, prefix: '', suffix: 'K+', decimals: 0},
  '15K+': {target: 15, prefix: '', suffix: 'K+', decimals: 0},
  '$3.1B+': {target: 3.1, prefix: '$', suffix: 'B+', decimals: 1},
  '2018': {target: 2018, prefix: '', suffix: '', decimals: 0},
} as const;

const COUNT_DURATION = 1350;

function formatStatValue(
  value: keyof typeof COUNT_CONFIG,
  amount: number,
) {
  const config = COUNT_CONFIG[value];
  const number =
    config.decimals === 1
      ? amount.toFixed(1)
      : Math.round(amount).toString();

  return `${config.prefix}${number}${config.suffix}`;
}

export function AboutStoryStats() {
  const statsRef = useRef<HTMLElement>(null);
  const hasAnimatedRef = useRef(false);
  const [displayValues, setDisplayValues] = useState<string[]>(() =>
    ABOUT_STATS.map((stat) => formatStatValue(stat.value, 0)),
  );

  useEffect(() => {
    const stats = statsRef.current;

    if (!stats) return;

    const showFinalValues = () => {
      hasAnimatedRef.current = true;
      setDisplayValues(ABOUT_STATS.map((stat) => stat.value));
    };

    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window)
    ) {
      showFinalValues();
      return;
    }

    let animationFrameId: number | undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || hasAnimatedRef.current) return;

        hasAnimatedRef.current = true;
        observer.disconnect();

        const startTime = performance.now();

        const animate = (currentTime: number) => {
          const progress = Math.min(
            (currentTime - startTime) / COUNT_DURATION,
            1,
          );
          const easedProgress = 1 - Math.pow(1 - progress, 3);

          setDisplayValues(
            ABOUT_STATS.map((stat) =>
              formatStatValue(
                stat.value,
                COUNT_CONFIG[stat.value].target * easedProgress,
              ),
            ),
          );

          if (progress < 1) {
            animationFrameId = requestAnimationFrame(animate);
          } else {
            setDisplayValues(ABOUT_STATS.map((stat) => stat.value));
          }
        };

        animationFrameId = requestAnimationFrame(animate);
      },
      {threshold: 0.15},
    );

    observer.observe(stats);

    return () => {
      observer.disconnect();

      if (animationFrameId !== undefined) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);
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
                  FoldTech brings ecommerce strategy, design, development,
                  search visibility and optimisation together to help brands
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
                to="/services/"
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
            {ABOUT_STATS.map((stat, index) => (
              <article
                className="ft-about-stats__item"
                key={stat.value}
              >
                <p className="ft-about-stats__item-title">
                  {stat.label}
                </p>

                <span
                  className="ft-about-stats__item-value"
                  aria-label={stat.value}
                >
                  <span
                    className="ft-about-stats__item-value-reserve"
                    aria-hidden="true"
                  >
                    {stat.value}
                  </span>
                  <span
                    className="ft-about-stats__item-value-counter"
                    aria-hidden="true"
                  >
                    {displayValues[index]}
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