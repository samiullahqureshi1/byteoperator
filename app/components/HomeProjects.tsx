import {useEffect, useRef} from 'react';
import {Link} from 'react-router';

export type HomeProjectData = {
  title: string;
  type: string;
  href: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  logo: string;
  logoImageWidth: number;
  logoImageHeight: number;
  thumbnail: string;
  thumbnailWidth: number;
  thumbnailHeight: number;
  logoWidth: string;
  alt: string;
};

export const HOME_PROJECTS: readonly HomeProjectData[] = [
  {
    title: 'SkinbySkin',
    type: 'SEO, Ecommerce design & development',
    href: '/work/sun-chaser',
    image:
      '/images/home-projects/cambridge/image.webp',
    imageWidth: 1086,
    imageHeight: 1448,
    logo:
      '/images/home-projects/cambridge/logo.svg',
    logoImageWidth: 2609,
    logoImageHeight: 480,
    thumbnail:
      '/images/home-projects/cambridge/thumbnail.webp',
    thumbnailWidth: 816,
    thumbnailHeight: 1112,
    logoWidth: '41%',
    alt: 'SkinbySkin',
  },

  {
    title: 'Love Luxury',
    type: 'Ecommerce design & development',
    href: '/work/loony-legs',
    image:
      '/images/home-projects/bbc/image.webp',
    imageWidth: 1160,
    imageHeight: 800,
    logo:
      '/images/home-services/clients/logo-1.svg',
    logoImageWidth: 438,
    logoImageHeight: 48,
    thumbnail:
      '/images/home-projects/bbc/thumbnail.webp',
    thumbnailWidth: 2560,
    thumbnailHeight: 1707,
    logoWidth: '21%',
    alt: 'Love Luxury',
  },

  {
    title: 'Mellome',
    type: 'Ecommerce design & development',
    href: '/work/macdanny-fashion',
    image:
      '/images/home-projects/111skin/image.webp',
    imageWidth: 600,
    imageHeight: 405,
    logo:
      '/images/home-projects/111skin/logo.svg',
    logoImageWidth: 267,
    logoImageHeight: 48,
    thumbnail:
      '/images/home-projects/111skin/thumbnail.webp',
    thumbnailWidth: 1000,
    thumbnailHeight: 800,
    logoWidth: '25%',
    alt: 'Mellome',
  },

  {
    title: 'Mann & Co Bake Shop',
    type: 'Ecommerce design & development',
    href: '/work/brown-girl-jane',
    image:
      '/images/home-projects/muc-off/image.webp',
    imageWidth: 3376,
    imageHeight: 4220,
    logo:
      '/images/home-projects/muc-off/logo.svg',
    logoImageWidth: 2789,
    logoImageHeight: 965,
    thumbnail:
      '/images/home-projects/muc-off/thumbnail.webp',
    thumbnailWidth: 2394,
    thumbnailHeight: 2992,
    logoWidth: '28%',
    alt: 'Mann & Co Bake Shop',
  },

  {
    title: 'LifeProtectors',
    type: 'Ecommerce growth retainer',
    href: '/work/lifeprotectors',
    image:
      '/images/home-projects/candy-kittens/image.webp',
    imageWidth: 400,
    imageHeight: 497,
    logo:
      '/images/home-projects/candy-kittens/logo.svg',
    logoImageWidth: 180,
    logoImageHeight: 180,
    thumbnail:
      '/images/home-projects/candy-kittens/thumbnail.webp',
    thumbnailWidth: 1000,
    thumbnailHeight: 800,
    logoWidth: '17%',
    alt: 'LifeProtectors',
  },

  {
    title: 'Branley Ventures',
    type: 'Ecommerce design & development',
    href: '/work/top-tier-clothing',
    image:
      '/images/home-projects/case/image.webp',
    imageWidth: 600,
    imageHeight: 600,
    logo:
      '/images/home-projects/case/logo.svg',
    logoImageWidth: 120,
    logoImageHeight: 100,
    thumbnail:
      '/images/home-projects/case/thumbnail.webp',
    thumbnailWidth: 1000,
    thumbnailHeight: 800,
    logoWidth: '17%',
    alt: 'Branley Ventures',
  },
] as const;

export type HomeProjectsProps = {
  heading?: string;
  projects?: readonly HomeProjectData[];
  cta?: {
    label: string;
    href: string;
  };
};

export function HomeProjects({
  heading =
    'We partner with growing brands to deliver high-impact ecommerce strategies combining proven Shopify expertise with a search-first growth mindset.',
  projects = HOME_PROJECTS,
  cta = {
    label: 'Explore Case Studies',
    href: '/work',
  },
}: HomeProjectsProps = {}) {
  const trackRef =
    useRef<HTMLDivElement>(null);

  const dragState = useRef({
    active: false,
    startX: 0,
    startScrollLeft: 0,
    moved: false,
  });

  // Pointermove can fire faster than the display refreshes, especially on
  // mobile. Writing scrollLeft on every event forces extra layout/scroll
  // work the browser never gets to paint. Coalescing to one write per
  // animation frame keeps the drag tracking the finger 1:1 (the screen only
  // repaints once per frame either way) while cutting that redundant work.
  const pendingScrollLeft = useRef<number | null>(null);
  const scrollLeftFrame = useRef<number | null>(null);

  const flushScrollLeft = () => {
    scrollLeftFrame.current = null;

    const track = trackRef.current;

    if (track && pendingScrollLeft.current !== null) {
      track.scrollLeft = pendingScrollLeft.current;
    }
  };

  useEffect(() => {
    return () => {
      if (scrollLeftFrame.current !== null) {
        cancelAnimationFrame(scrollLeftFrame.current);
      }
    };
  }, []);

  const getStep = () => {
    const track = trackRef.current;

    if (!track) return 0;

    const firstSlide =
      track.querySelector<HTMLElement>(
        '.ft-home-projects__slide',
      );

    if (!firstSlide) return 0;

    const styles =
      window.getComputedStyle(track);

    const gap =
      Number.parseFloat(
        styles.columnGap ||
          styles.gap ||
          '0',
      ) || 0;

    return (
      firstSlide.getBoundingClientRect()
        .width + gap
    );
  };

  const handlePrevious = () => {
    const track = trackRef.current;

    if (!track) return;

    const step = getStep();

    const nearStart =
      track.scrollLeft <= step * 0.25;

    if (nearStart) {
      track.scrollTo({
        left:
          track.scrollWidth -
          track.clientWidth,
        behavior: 'smooth',
      });

      return;
    }

    track.scrollBy({
      left: -step,
      behavior: 'smooth',
    });
  };

  const handleNext = () => {
    const track = trackRef.current;

    if (!track) return;

    const step = getStep();

    const maxScroll =
      track.scrollWidth -
      track.clientWidth;

    const nearEnd =
      track.scrollLeft >=
      maxScroll - step * 0.25;

    if (nearEnd) {
      track.scrollTo({
        left: 0,
        behavior: 'smooth',
      });

      return;
    }

    track.scrollBy({
      left: step,
      behavior: 'smooth',
    });
  };

  const handlePointerDown = (
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    const track = trackRef.current;

    if (!track) return;

    dragState.current = {
      active: true,
      startX: event.clientX,
      startScrollLeft: track.scrollLeft,
      moved: false,
    };

    if (scrollLeftFrame.current !== null) {
      cancelAnimationFrame(scrollLeftFrame.current);
      scrollLeftFrame.current = null;
    }

    pendingScrollLeft.current = null;

    track.setPointerCapture(
      event.pointerId,
    );

    track.classList.add(
      'ft-home-projects__track--dragging',
    );
  };

  const handlePointerMove = (
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    const track = trackRef.current;

    if (
      !track ||
      !dragState.current.active
    ) {
      return;
    }

    const distance =
      event.clientX -
      dragState.current.startX;

    if (
      Math.abs(distance) >
      window.innerWidth * 0.005
    ) {
      dragState.current.moved = true;
    }

    pendingScrollLeft.current =
      dragState.current.startScrollLeft -
      distance;

    if (scrollLeftFrame.current === null) {
      scrollLeftFrame.current =
        requestAnimationFrame(flushScrollLeft);
    }
  };

  const endDragging = (
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    const track = trackRef.current;

    if (!track) return;

    dragState.current.active = false;

    if (
      track.hasPointerCapture(
        event.pointerId,
      )
    ) {
      track.releasePointerCapture(
        event.pointerId,
      );
    }

    track.classList.remove(
      'ft-home-projects__track--dragging',
    );
  };

  const handleTrackClick = (
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    if (!dragState.current.moved) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    dragState.current.moved = false;
  };

  return (
    <section
      className="ft-home-projects"
      aria-labelledby="ft-home-projects-title"
    >
      <div className="ft-home-projects__inner">
        <h2
          className="ft-home-projects__heading"
          id="ft-home-projects-title"
        >
          {heading}
        </h2>

        <div className="ft-home-projects__carousel">
          <div
            ref={trackRef}
            className="ft-home-projects__track"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={endDragging}
            onPointerCancel={endDragging}
            onClickCapture={handleTrackClick}
          >
            {projects.map((project) => (
              <article
                className="ft-home-projects__slide"
                key={project.title}
              >
                <div className="ft-home-projects__project">
                  <Link
                    className="ft-home-projects__media"
                    to={project.href}
                    prefetch="intent"
                    draggable={false}
                  >
                    <img
                      className="ft-home-projects__media-image"
                      src={project.image}
                      width={project.imageWidth}
                      height={project.imageHeight}
                      alt={project.alt}
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                    />

                    <img
                      className="ft-home-projects__project-logo"
                      src={project.logo}
                      width={project.logoImageWidth}
                      height={project.logoImageHeight}
                      alt={`${project.alt} logo`}
                      aria-hidden="true"
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                      style={{
                        '--project-logo-width':
                          project.logoWidth,
                      } as React.CSSProperties}
                    />
                  </Link>

                  <div className="ft-home-projects__content">
                    <div className="ft-home-projects__thumbnail">
                      <img
                        src={project.thumbnail}
                        width={project.thumbnailWidth}
                        height={project.thumbnailHeight}
                        alt={`${project.alt} project thumbnail`}
                        aria-hidden="true"
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                      />
                    </div>

                    <div className="ft-home-projects__text">
                      <h3 className="ft-home-projects__title">
                        <Link
                          to={project.href}
                          prefetch="intent"
                        >
                          {project.title}
                        </Link>
                      </h3>

                      <p className="ft-home-projects__type">
                        {project.type}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="ft-home-projects__arrows">
            <button
              className="ft-home-projects__arrow ft-home-projects__arrow--previous"
              type="button"
              onClick={handlePrevious}
              aria-label="Previous project"
            >
              <PreviousIcon />
            </button>

            <button
              className="ft-home-projects__arrow ft-home-projects__arrow--next"
              type="button"
              onClick={handleNext}
              aria-label="Next project"
            >
              <NextIcon />
            </button>
          </div>
        </div>

        <div className="ft-home-projects__cta-wrap">
          <Link
            className="ft-home-projects__cta"
            to={cta.href}
            prefetch="intent"
          >
            <span>
              {cta.label}
            </span>

            <LongArrowIcon />
          </Link>
        </div>
      </div>
    </section>
  );
}

function PreviousIcon() {
  return (
    <svg
      viewBox="0 0 11 19"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M10 18L1.5 9.5L10 1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function NextIcon() {
  return (
    <svg
      viewBox="0 0 11 19"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M1 1L9.5 9.5L1 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LongArrowIcon() {
  return (
    <svg
      className="ft-home-projects__cta-arrow"
      viewBox="0 0 13 12"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M0 6H12M12 6L6.5 0.5M12 6L6.5 11.5"
        stroke="currentColor"
      />
    </svg>
  );
}
