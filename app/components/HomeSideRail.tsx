import {useEffect, useRef} from 'react';
import {Link} from 'react-router';

interface HomeSideRailProps {
  heroSelector?: string;
}

export function HomeSideRail({
  heroSelector = '.ft-home-hero',
}: HomeSideRailProps = {}) {
  const horizontalRef = useRef<HTMLAnchorElement>(null);
  const verticalRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const horizontalTab = horizontalRef.current;
    const verticalTab = verticalRef.current;
    const hero = document.querySelector<HTMLElement>(heroSelector);

    if (!horizontalTab || !verticalTab || !hero) return;

    let mode: 'horizontal' | 'vertical' = 'horizontal';
    let busy = false;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let frameId: number | undefined;
    let revealFrameId: number | undefined;

    const transitionDuration = 350;

    const isPastHero = () => {
      /*
       * Reference switches shortly before the hero has
       * completely passed the top of the viewport.
       *
       * Use viewport-relative distance rather than a
       * fixed pixel threshold.
       */
      const triggerOffset = window.innerHeight * 0.08;

      return hero.getBoundingClientRect().bottom <= triggerOffset;
    };

    const switchToVertical = () => {
      if (busy || mode === 'vertical') return;

      busy = true;

      horizontalTab.classList.add(
        'ft-home-side-tab--out',
      );

      timeoutId = setTimeout(() => {
        horizontalTab.classList.add(
          'ft-home-side-tab--hidden',
        );

        horizontalTab.classList.remove(
          'ft-home-side-tab--out',
        );

        verticalTab.classList.add(
          'ft-home-side-tab--mounted',
        );

        /*
         * Wait two animation frames so the browser paints the
         * off-screen "mounted" state before the transition to
         * "visible" starts. This produces the same result as
         * forcing a synchronous reflow (reading
         * getBoundingClientRect() right after the class change)
         * without blocking the main thread with a forced layout.
         */
        revealFrameId = requestAnimationFrame(() => {
          revealFrameId = requestAnimationFrame(() => {
            revealFrameId = undefined;

            verticalTab.classList.add(
              'ft-home-side-tab--visible',
            );

            mode = 'vertical';
            busy = false;
          });
        });
      }, transitionDuration);
    };

    const switchToHorizontal = () => {
      if (busy || mode === 'horizontal') return;

      busy = true;

      verticalTab.classList.remove(
        'ft-home-side-tab--visible',
      );

      timeoutId = setTimeout(() => {
        verticalTab.classList.remove(
          'ft-home-side-tab--mounted',
        );

        horizontalTab.classList.remove(
          'ft-home-side-tab--hidden',
        );

        /*
         * Put horizontal tab off-screen first without animation,
         * then wait two animation frames before removing the
         * "pre" class so the browser paints that off-screen
         * position first. Same outcome as forcing a synchronous
         * reflow, without the forced layout.
         */
        horizontalTab.classList.add(
          'ft-home-side-tab--pre',
        );

        revealFrameId = requestAnimationFrame(() => {
          revealFrameId = requestAnimationFrame(() => {
            revealFrameId = undefined;

            horizontalTab.classList.remove(
              'ft-home-side-tab--pre',
            );

            mode = 'horizontal';
            busy = false;
          });
        });
      }, transitionDuration);
    };

    const updateRail = () => {
      frameId = undefined;

      if (isPastHero()) {
        switchToVertical();
      } else {
        switchToHorizontal();
      }
    };

    const handleScroll = () => {
      if (frameId !== undefined) return;

      frameId = window.requestAnimationFrame(updateRail);
    };

    /*
     * Check initial page position as well.
     */
    updateRail();

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);

      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }

      if (frameId !== undefined) {
        cancelAnimationFrame(frameId);
      }

      if (revealFrameId !== undefined) {
        cancelAnimationFrame(revealFrameId);
      }
    };
  }, [heroSelector]);

  return (
    <>
      <Link
        ref={horizontalRef}
        className="
          ft-home-side-tab
          ft-home-side-tab--horizontal
          ft-home-side-rail--desktop-only
        "
        to="/pages/about"
        prefetch="intent"
        aria-label="Learn about FoldTech"
      >
        <span>Learn About FoldTech</span>

        <HorizontalArrowIcon />
      </Link>

      <Link
        ref={verticalRef}
        className="
          ft-home-side-tab
          ft-home-side-tab--vertical
          ft-home-side-rail--desktop-only
        "
        to="/pages/about"
        prefetch="intent"
        aria-label="Learn about FoldTech"
      >
        <VerticalArrowIcon />

        <span>Learn About FoldTech</span>
      </Link>
    </>
  );
}

function HorizontalArrowIcon() {
  return (
    <svg
      className="ft-home-side-tab__arrow"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M1.5 6H10.5M10.5 6L7 2.5M10.5 6L7 9.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function VerticalArrowIcon() {
  return (
    <svg
      className="ft-home-side-tab__arrow"
      viewBox="0 0 11 11"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5.5 9V2M5.5 2L2.5 5M5.5 2L8.5 5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}