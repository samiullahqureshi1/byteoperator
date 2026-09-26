'use client';

import {useRef} from 'react';

const SPACE_IMAGE_SIZES =
  '(min-width: 64rem) calc((100vw - 7.5rem) / 1.75), (min-width: 48rem) calc((100vw - 4rem) / 1.75), calc(100vw - 2.25rem)';

const SPACE_IMAGES = [
  {
    src: '/images/about/space-01-1400.webp',
    srcSet:
      '/images/about/space-01-700.webp 700w, /images/about/space-01-1400.webp 1400w',
    alt: 'Byte Operator engineering lab and architecture pod',
    width: 1400,
    height: 935,
  },
  {
    src: '/images/about/space-02-1400.webp',
    srcSet:
      '/images/about/space-02-700.webp 700w, /images/about/space-02-1400.webp 1400w',
    alt: 'Byte Operator software engineers and AI developers in deep collaboration',
    width: 1400,
    height: 788,
  },
  {
    src: '/images/about/space-03-1400.webp',
    srcSet:
      '/images/about/space-03-700.webp 700w, /images/about/space-03-1400.webp 1400w',
    alt: 'Byte Operator collaborative workspaces and design sprint sessions',
    width: 1400,
    height: 933,
  },
] as const;

export function AboutSpace() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const moveSlider = (direction: 'prev' | 'next') => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const slides = Array.from(
      scroller.querySelectorAll<HTMLElement>('.ft-about-space__slide'),
    );

    if (!slides.length) return;

    const currentScroll = scroller.scrollLeft;
    const maxScroll = scroller.scrollWidth - scroller.clientWidth;
    const edgeThreshold = 2;

    const currentIndex =
      currentScroll <= edgeThreshold
        ? 0
        : currentScroll >= maxScroll - edgeThreshold
          ? slides.length - 1
          : slides.reduce((closestIndex, slide, index) => {
              const slidePosition = Math.min(
                maxScroll,
                slide.offsetLeft - scroller.offsetLeft,
              );
              const closestPosition = Math.min(
                maxScroll,
                slides[closestIndex].offsetLeft - scroller.offsetLeft,
              );

              return Math.abs(slidePosition - currentScroll) <
                Math.abs(closestPosition - currentScroll)
                ? index
                : closestIndex;
            }, 0);

    let targetIndex =
      direction === 'next' ? currentIndex + 1 : currentIndex - 1;

    if (targetIndex >= slides.length) {
      targetIndex = 0;
    }

    if (targetIndex < 0) {
      targetIndex = slides.length - 1;
    }

    scroller.scrollTo({
      left: Math.min(
        maxScroll,
        slides[targetIndex].offsetLeft - scroller.offsetLeft,
      ),
      behavior: 'smooth',
    });
  };

  return (
    <section
      className="ft-about-space"
      aria-labelledby="ft-about-space-title"
    >
      <div className="ft-about-space__inner">
        <div className="ft-about-space__carousel">
          <div
            ref={scrollerRef}
            className="ft-about-space__scroller"
            role="group"
            aria-label="Byte Operator workspace and engineering culture gallery"
            tabIndex={0}
          >
            {SPACE_IMAGES.map((image) => (
              <div className="ft-about-space__slide" key={image.src}>
                <div className="ft-about-space__item">
                  <img
                    src={image.src}
                    srcSet={image.srcSet}
                    sizes={SPACE_IMAGE_SIZES}
                    width={image.width}
                    height={image.height}
                    alt={image.alt}
                    className="ft-about-space__item-image"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="ft-about-space__arrow ft-about-space__arrow--prev"
            aria-label="Previous image"
            onClick={() => moveSlider('prev')}
          >
            <svg
              viewBox="0 0 11 19"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M10 18L1.5 9.5 10 1"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            type="button"
            className="ft-about-space__arrow ft-about-space__arrow--next"
            aria-label="Next image"
            onClick={() => moveSlider('next')}
          >
            <svg
              viewBox="0 0 11 19"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M1 1l8.5 8.5L1 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <h2
          id="ft-about-space-title"
          className="ft-about-space__heading"
        >
          Engineering Labs, Continuous R&amp;D &amp; High-Velocity Culture
        </h2>
      </div>
    </section>
  );
}