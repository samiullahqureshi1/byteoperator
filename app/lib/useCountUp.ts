'use client';

import {useEffect, useLayoutEffect, useRef, useState} from 'react';

import type {CompanyFact} from '~/data/companyFacts';

const COUNT_DURATION = 1350;

// useLayoutEffect warns during server rendering; it only matters in the browser.
const useIsomorphicLayoutEffect =
  typeof window === 'undefined' ? useEffect : useLayoutEffect;

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
 * The server renders the final values, so crawlers and no-JS visitors see the
 * real figures. In the browser the values reset to zero before the first
 * paint and then count up. Respects prefers-reduced-motion, and keeps the
 * final values where IntersectionObserver is missing.
 */
export function useCountUp<T extends HTMLElement>(
  facts: readonly CompanyFact[],
) {
  const ref = useRef<T>(null);
  const factsRef = useRef(facts);
  factsRef.current = facts;
  const hasAnimatedRef = useRef(false);
  const isIntersectingRef = useRef(false);

  const [displayValues, setDisplayValues] = useState<string[]>(() =>
    facts.map((fact) => fact.value),
  );

  useIsomorphicLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window)
    ) {
      hasAnimatedRef.current = true;
      setDisplayValues(factsRef.current.map((fact) => fact.value));
      return;
    }

    if (!hasAnimatedRef.current && !isIntersectingRef.current) {
      setDisplayValues(factsRef.current.map((fact) => formatStatValue(fact, 0)));
    }

    let animationFrameId: number | undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || hasAnimatedRef.current) return;

        isIntersectingRef.current = true;
        hasAnimatedRef.current = true;
        observer.disconnect();

        const currentFacts = factsRef.current;
        const startTime = performance.now();

        const animate = (currentTime: number) => {
          const progress = Math.min(
            (currentTime - startTime) / COUNT_DURATION,
            1,
          );
          const easedProgress = 1 - Math.pow(1 - progress, 3);

          setDisplayValues(
            currentFacts.map((fact) =>
              formatStatValue(fact, fact.target * easedProgress),
            ),
          );

          if (progress < 1) {
            animationFrameId = requestAnimationFrame(animate);
          } else {
            setDisplayValues(currentFacts.map((fact) => fact.value));
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
  }, []);

  return {ref, displayValues};
}
