import {useRef} from 'react';
import {Link} from 'react-router';

const CASE_STUDIES_ROUTE = '/pages/case-studies';

const PROJECTS = [
  {
    title: 'Cambridge Satchel',
    type: 'SEO, Ecommerce design & development',
    href: CASE_STUDIES_ROUTE,
    image:
      '/images/home-projects/cambridge/image.webp',
    logo:
      '/images/home-projects/cambridge/logo.svg',
    thumbnail:
      '/images/home-projects/cambridge/thumbnail.webp',
    logoWidth: '41%',
    alt: 'Cambridge Satchel',
  },

  {
    title: 'Billionaire Boys Club',
    type: 'Ecommerce design & development',
    href: CASE_STUDIES_ROUTE,
    image:
      '/images/home-projects/bbc/image.webp',
    logo:
      '/images/home-services/clients/billionaire-boys-club.svg',
    thumbnail:
      '/images/home-projects/bbc/thumbnail.webp',
    logoWidth: '21%',
    alt: 'Billionaire Boys Club',
  },

  {
    title: '111SKIN',
    type: 'Ecommerce design & development',
    href: CASE_STUDIES_ROUTE,
    image:
      '/images/home-projects/111skin/image.webp',
    logo:
      '/images/home-projects/111skin/logo.svg',
    thumbnail:
      '/images/home-projects/111skin/thumbnail.webp',
    logoWidth: '25%',
    alt: '111SKIN',
  },

  {
    title: 'Muc-Off',
    type: 'Ecommerce design & development',
    href: CASE_STUDIES_ROUTE,
    image:
      '/images/home-projects/muc-off/image.webp',
    logo:
      '/images/home-projects/muc-off/logo.webp',
    thumbnail:
      '/images/home-projects/muc-off/thumbnail.webp',
    logoWidth: '28%',
    alt: 'Muc-Off',
  },

  {
    title: 'Candy Kittens',
    type: 'Ecommerce growth retainer',
    href: CASE_STUDIES_ROUTE,
    image:
      '/images/home-projects/candy-kittens/image.webp',
    logo:
      '/images/home-services/clients/candy-kittens.svg',
    thumbnail:
      '/images/home-projects/candy-kittens/thumbnail.webp',
    logoWidth: '17%',
    alt: 'Candy Kittens',
  },

  {
    title: 'Case Furniture',
    type: 'Ecommerce design & development',
    href: CASE_STUDIES_ROUTE,
    image:
      '/images/home-projects/case/image.webp',
    logo:
      '/images/home-projects/case/logo.svg',
    thumbnail:
      '/images/home-projects/case/thumbnail.webp',
    logoWidth: '17%',
    alt: 'Case Furniture',
  },
] as const;

export function HomeProjects() {
  const trackRef =
    useRef<HTMLDivElement>(null);

  const dragState = useRef({
    active: false,
    startX: 0,
    startScrollLeft: 0,
    moved: false,
  });

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

    track.scrollLeft =
      dragState.current.startScrollLeft -
      distance;
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
          We support brands through
          transformative ecommerce strategies
          with Shopify expertise combined with
          search-first values.
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
            {PROJECTS.map((project) => (
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
                      alt={project.alt}
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                    />

                    <img
                      className="ft-home-projects__project-logo"
                      src={project.logo}
                      alt=""
                      aria-hidden="true"
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
                        alt=""
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
            to={CASE_STUDIES_ROUTE}
            prefetch="intent"
          >
            <span>
              Explore Case Studies
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