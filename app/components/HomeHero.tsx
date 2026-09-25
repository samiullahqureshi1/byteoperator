'use client';

import {NavLink} from '~/lib/router-compat';
import {
  resolveCleanPath,
  SHOPIFY_SEO_CLEAN_PATH,
} from '~/lib/route-mappings';
import {CalendlyButton} from '~/components/shared/CalendlyButton';

const HERO_SERVICES = [
  {
    title: 'Custom Software',
    description:
      'High-performance custom software, web applications & cloud platforms built to scale.',
    url: '/services/software-developers/',
  },
  {
    title: 'Full-Stack Engineering',
    description:
      'Modern frontend architecture, robust APIs, databases & scalable systems.',
    url: '/services/software-theme-development-builds/',
  },
  {
    title: 'Search & AI Discovery',
    description:
      'Technical SEO, performance engineering & AI search visibility that drives growth.',
    url: SHOPIFY_SEO_CLEAN_PATH,
  },
  {
    title: 'Cloud & Integrations',
    description:
      'Enterprise API integrations, data pipelines & intelligent workflow automations.',
    url: '/services/software-integrations/',
  },
] as const;

export function HomeHero() {
  const scrollToGallery = () => {
    const gallery = document.getElementById(
      'ft-home-hero-gallery',
    );
    const header = document.querySelector('.charle-header');

    if (!gallery) return;

    const headerHeight =
      header?.getBoundingClientRect().height ?? 0;

    window.scrollTo({
      top: gallery.getBoundingClientRect().top +
        window.scrollY -
        headerHeight,
      behavior: 'smooth',
    });
  };
  return (
    <section
      className="ft-home-hero"
      aria-labelledby="ft-home-hero-title"
    >
      <div
        className="ft-home-hero__glow"
        aria-hidden="true"
      />

      <div className="ft-home-hero__content">
        <p className="ft-home-hero__eyebrow">
          Trusted Custom Software & Digital Engineering Partner
        </p>

        <h1
          className="ft-home-hero__title"
          id="ft-home-hero-title"
        >
          {/* The {' '} gaps are for crawlers and copy/paste: without them the
              heading's text reads "TheSoftware AgencyThat". Flex drops them. */}
          <span className="ft-home-hero__title-line">
            <span>The</span> <strong>Software Agency</strong>
          </span>{' '}
          <span className="ft-home-hero__title-line">
            That Drives Real Growth
          </span>
        </h1>

        <p className="ft-home-hero__description">
          High-performing digital products, scalable web applications, and AI-driven platforms that deliver measurable business results.
        </p>

        <div className="ft-home-hero__services">
          {HERO_SERVICES.map((service) => (
            <NavLink
              className="ft-home-hero__service"
              key={service.title}
              prefetch="intent"
              to={service.url}
            >
              <strong>{service.title}</strong>
              <span>{service.description}</span>
            </NavLink>
          ))}
        </div>

        <div className="ft-home-hero__actions">
          <CalendlyButton className="ft-home-hero__book-cta" />

          <a
          className="ft-home-hero__work-link"
          href="#ft-home-hero-gallery"
          onClick={(event) => {
            event.preventDefault();
            scrollToGallery();
          }}
        >
          <span>See our work</span>
          <ArrowDownIcon />
          </a>
        </div>
      </div>
    </section>
  );
}



function ArrowDownIcon() {
  return (
    <svg
      aria-hidden="true"
      width="1em"
      height="1em"
      viewBox="0 0 18 18"
      fill="none"
    >
      <path
        d="M9 3V15"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />

      <path
        d="M4.5 10.5L9 15L13.5 10.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
