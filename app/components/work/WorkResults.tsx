import {
  useEffect,
  useRef,
  useState,
} from 'react';
import {Link} from 'react-router';

const WORK_STATS = [
  {
    target: 20,
    prefix: '',
    suffix: 'K+',
    decimals: 0,
    label: 'Tasks Delivered',
  },
  {
    target: 3.1,
    prefix: '$',
    suffix: 'B+',
    decimals: 1,
    label: 'Merchant Revenue',
  },
  {
    target: 15,
    prefix: '',
    suffix: 'K+',
    decimals: 0,
    label: 'Stores Built',
  },

  // DUMMY VALUE - replace when real data is available
  {
    target: 25,
    prefix: '',
    suffix: '%',
    decimals: 0,
    label: 'Avg. Conversion Uplift',
  },
];

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
                <CountUpNumber
                  target={stat.target}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                />
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
            to="/pages/services"
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
  target: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

function CountUpNumber({
  target,
  prefix = '',
  suffix = '',
  decimals = 0,
}: CountUpNumberProps) {
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);
  const animationFrame = useRef<number | null>(null);

  const [value, setValue] = useState(0);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) return;

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

        const reduceMotion =
          window.matchMedia(
            '(prefers-reduced-motion: reduce)',
          ).matches;

        if (reduceMotion) {
          setValue(target);
          return;
        }

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
            setValue(target);
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
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}