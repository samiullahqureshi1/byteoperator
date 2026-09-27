'use client';

import {useEffect, useRef} from 'react';
import {Link} from '~/lib/router-compat';

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
    title: 'Collabix',
    type: 'Custom SaaS & Enterprise Platform',
    href: '/services/software-developers',
    image:
      'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/custom_software_case_study.png?v=1790400442',
    imageWidth: 1920,
    imageHeight: 1080,
    logo: '',
    logoImageWidth: 0,
    logoImageHeight: 0,
    thumbnail:
      'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/custom_software_case_study.png?v=1790400442',
    thumbnailWidth: 800,
    thumbnailHeight: 800,
    logoWidth: '25%',
    alt: 'Collabix custom software and SaaS platform architecture',
  },

  {
    title: 'Autonomous AI Agents',
    type: 'Multi-Agent Task Orchestration & Automated Workflows',
    href: '/services/ai-automations-agents',
    image:
      'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/second_autmation_imaeg.webp?v=1790409459',
    imageWidth: 1920,
    imageHeight: 1080,
    logo: '',
    logoImageWidth: 0,
    logoImageHeight: 0,
    thumbnail:
      'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/second_autmation_imaeg.webp?v=1790409459',
    thumbnailWidth: 800,
    thumbnailHeight: 800,
    logoWidth: '25%',
    alt: 'Autonomous AI agent orchestration and workflow platform',
  },

  {
    title: 'Replex Engine',
    type: 'Autonomous AI Lead Capture & Sub-Minute Replies',
    href: '/services/ai-automations-agents',
    image:
      'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/replex.png?v=1790409470',
    imageWidth: 1920,
    imageHeight: 1080,
    logo: '',
    logoImageWidth: 0,
    logoImageHeight: 0,
    thumbnail:
      'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/replex.png?v=1790409470',
    thumbnailWidth: 800,
    thumbnailHeight: 800,
    logoWidth: '25%',
    alt: 'Replex Engine AI communication and lead automation platform',
  },

  {
    title: 'Kids Wonderland',
    type: 'Shopify Store Development & Custom Catalog',
    href: '/services/shopify-web-design',
    image:
      'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/toys.webp?v=1790407473',
    imageWidth: 1920,
    imageHeight: 1080,
    logo: '',
    logoImageWidth: 0,
    logoImageHeight: 0,
    thumbnail:
      'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/toys.webp?v=1790407473',
    thumbnailWidth: 800,
    thumbnailHeight: 800,
    logoWidth: '25%',
    alt: 'Kids Wonderland toy store development',
  },

  {
    title: 'Nordic Haven Furniture',
    type: 'Shopify Plus & Luxury Furniture Storefront',
    href: '/shopify-plus-agency',
    image:
      'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/furniture.webp?v=1790407636',
    imageWidth: 1920,
    imageHeight: 1080,
    logo: '',
    logoImageWidth: 0,
    logoImageHeight: 0,
    thumbnail:
      'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/furniture.webp?v=1790407636',
    thumbnailWidth: 800,
    thumbnailHeight: 800,
    logoWidth: '25%',
    alt: 'Nordic Haven luxury furniture digital storefront',
  },

  {
    title: 'OmniRetail CRO & Migration',
    type: 'Conversion Rate Optimisation & Enterprise Migration',
    href: '/services/shopify-migrations',
    image:
      'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/shopify_cro_and_migration_store.webp?v=1790407473',
    imageWidth: 1920,
    imageHeight: 1080,
    logo: '',
    logoImageWidth: 0,
    logoImageHeight: 0,
    thumbnail:
      'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/shopify_cro_and_migration_store.webp?v=1790407473',
    thumbnailWidth: 800,
    thumbnailHeight: 800,
    logoWidth: '25%',
    alt: 'Shopify CRO and enterprise platform migration',
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
    'We partner with growing brands to deliver high-impact ecommerce strategies combining proven Software expertise with a search-first growth mindset.',
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

                    {project.logo ? (
                      <img
                        className="ft-home-projects__project-logo"
                        src={project.logo}
                        width={project.logoImageWidth || 200}
                        height={project.logoImageHeight || 50}
                        alt={`${project.alt} logo`}
                        aria-hidden="true"
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                        style={{
                          '--project-logo-width':
                            project.logoWidth || '25%',
                        } as React.CSSProperties}
                      />
                    ) : null}
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
