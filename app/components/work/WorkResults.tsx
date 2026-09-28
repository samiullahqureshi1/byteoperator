'use client';

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {Link} from '~/lib/router-compat';

import {WORK_FACTS, type CompanyFact} from '~/data/companyFacts';
import {formatStatValue} from '~/lib/useCountUp';

const WORK_STATS = WORK_FACTS;

export function WorkResults() {
  return (
    <section className="ft-work-results">
      <div className="ft-work-results__inner">
        <div className="ft-work-results__stats">
          {WORK_STATS.map((stat) => (
            <div
              className="ft-work-results__stat"
              key={stat.label}
            >
              <p className="ft-work-results__number">
                <CountUpNumber fact={stat} />
              </p>

              <p className="ft-work-results__label">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="ft-work-results__action">
          <Link
            className="ft-work-results__cta"
            to="/services"
          >
            Explore Services

            <svg
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M1 11L11 1M11 1H2M11 1V10"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

interface CountUpNumberProps {
  fact: CompanyFact;
}

// useLayoutEffect warns during server rendering; it only matters in the browser.
const useIsomorphicLayoutEffect =
  typeof window === 'undefined' ? useEffect : useLayoutEffect;

/**
 * The server renders the final value (`value` is null), so crawlers and no-JS
 * visitors see the real figure. In the browser it resets to zero before the
 * first paint and counts up once in view, unless reduced motion is preferred.
 */
export function CountUpNumber({fact}: CountUpNumberProps) {
  const {target} = fact;

  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);
  const animationFrame = useRef<number | null>(null);

  const [value, setValue] = useState<number | null>(null);

  useIsomorphicLayoutEffect(() => {
    const element = elementRef.current;

    if (
      !element ||
      hasAnimated.current ||
      !('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    setValue(0);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (
          !entry.isIntersecting ||
          hasAnimated.current
        ) {
          return;
        }

        hasAnimated.current = true;
        observer.disconnect();

        const duration = 1800;
        const startTime = performance.now();

        const animate = (currentTime: number) => {
          const elapsed = currentTime - startTime;

          const progress = Math.min(
            elapsed / duration,
            1,
          );

          const eased =
            1 - Math.pow(1 - progress, 3);

          setValue(target * eased);

          if (progress < 1) {
            animationFrame.current =
              requestAnimationFrame(animate);
          } else {
            setValue(null);
          }
        };

        animationFrame.current =
          requestAnimationFrame(animate);
      },
      {
        threshold: 0.35,
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();

      if (animationFrame.current !== null) {
        cancelAnimationFrame(
          animationFrame.current,
        );
      }
    };
  }, [target]);

  return (
    <span ref={elementRef}>
      {value === null ? fact.value : formatStatValue(fact, value)}
    </span>
  );
}
