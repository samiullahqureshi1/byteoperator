import {NavLink} from 'react-router';
import {
  resolveCleanPath,
  SHOPIFY_SEO_CLEAN_PATH,
} from '~/lib/route-mappings';

const HERO_SERVICES = [
  {
    title: 'Store Creation',
    description:
      'Custom Shopify design & development that converts from day one.',
    url: '/pages/shopify-development',
  },
  {
    title: 'Revenue Acceleration',
    description:
      'Continuous CRO, performance optimization & growth support.',
    url: '/pages/shopify-cro-agency',
  },
  {
    title: 'Search & Discovery',
    description:
      'Technical SEO + AI search visibility that drives qualified traffic.',
    url: SHOPIFY_SEO_CLEAN_PATH,
  },
  {
    title: 'Customer Retention',
    description:
      'Email, SMS & lifecycle systems that increase repeat purchases.',
    url: resolveCleanPath('/pages/email-marketing-agency'),
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
          Trusted Shopify Development & Growth Partner
        </p>

        <h1
          className="ft-home-hero__title"
          id="ft-home-hero-title"
        >
          <span className="ft-home-hero__title-line">
            <span>The</span>

            <HeroMark />

            <strong>Shopify Agency</strong>
          </span>

          <span className="ft-home-hero__title-line">
            That Drives Real Growth
          </span>
        </h1>

        <p className="ft-home-hero__description">
          High-performing Shopify stores, backed by proven
          CRO, SEO, and AI visibility strategies that
          deliver measurable results.
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
    </section>
  );
}

function HeroMark() {
  return (
    <span
      className="ft-home-hero__mark"
      aria-hidden="true"
    >
      <img
        src="/images/foldtech-mark.svg"
        width={500}
        height={500}
        alt=""
      />
    </span>
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
