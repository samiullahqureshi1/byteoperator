import {useRef} from 'react';

const SPACE_IMAGES = [
  {
    src: '/images/about/space-01.jpg',
    alt: 'FoldTech team and workspace',
  },
  {
    src: '/images/about/space-02.jpg',
    alt: 'FoldTech team collaborating',
  },
  {
    src: '/images/about/space-03.jpg',
    alt: 'FoldTech workspace and culture',
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

    // Reference uses rewind behaviour.
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
            aria-label="FoldTech workspace gallery"
          >
            {SPACE_IMAGES.map((image) => (
              <div className="ft-about-space__slide" key={image.src}>
                <div className="ft-about-space__item">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="ft-about-space__item-image"
                    loading="lazy"
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
          Our Space, Our Culture
        </h2>
      </div>
    </section>
  );
}