import {useEffect, useRef, useState} from 'react';

import type {CompanyFact} from '~/data/companyFacts';

const COUNT_DURATION = 1350;

/**
 * Renders a fact part-way through its count-up.
 *
 * A comma in the declared value (53,797) means the counter groups too, so the
 * digits stop jumping width as they climb. Every fact lands exactly on its
 * declared `value` at the end.
 */
export function formatStatValue(fact: CompanyFact, amount: number) {
  const rounded = Math.round(amount);

  const number =
    fact.decimals === 1
      ? amount.toFixed(1)
      : fact.value.includes(',')
        ? rounded.toLocaleString('en-US')
        : rounded.toString();

  return `${fact.prefix}${number}${fact.suffix}`;
}

/**
 * Counts a row of stats up from zero the first time it scrolls into view.
 * Shared by the homepage and the About page so the two animate identically.
 *
 * Respects prefers-reduced-motion, and falls back to the final values where
 * IntersectionObserver is missing.
 */
export function useCountUp<T extends HTMLElement>(
  facts: readonly CompanyFact[],
) {
  const ref = useRef<T>(null);
  const hasAnimatedRef = useRef(false);
  const [displayValues, setDisplayValues] = useState<string[]>(() =>
    facts.map((fact) => formatStatValue(fact, 0)),
  );

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const showFinalValues = () => {
      hasAnimatedRef.current = true;
      setDisplayValues(facts.map((fact) => fact.value));
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
            facts.map((fact) =>
              formatStatValue(fact, fact.target * easedProgress),
            ),
          );

          if (progress < 1) {
            animationFrameId = requestAnimationFrame(animate);
          } else {
            setDisplayValues(facts.map((fact) => fact.value));
          }
        };

        animationFrameId = requestAnimationFrame(animate);
      },
      {threshold: 0.15},
    );

    observer.observe(element);

    return () => {
      observer.disconnect();

      if (animationFrameId !== undefined) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [facts]);

  return {ref, displayValues};
}
