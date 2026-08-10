import {NavLink} from 'react-router';

const HERO_SERVICES = [
  {
    title: 'New Projects',
    description: 'Shopify design & development',
    url: '/pages/shopify-development',
  },
  {
    title: 'Growth & Support',
    description: 'CRO, optimisation & support',
    url: '/pages/shopify-support',
  },
  {
    title: 'SEO & AI Visibility',
    description: 'Organic search & AI visibility',
    url: '/pages/shopify-seo',
  },
  {
    title: 'Email & SMS',
    description: 'Retention & lifecycle growth',
    url: '/pages/email-sms-marketing',
  },
] as const;

export function HomeHero() {
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
 Leading Shopify & Ecommerce Agency
</p>

        <h1
          className="ft-home-hero__title"
          id="ft-home-hero-title"
        >
          <span className="ft-home-hero__title-line">
            <span>The</span>

            <HeroMark />

            <strong>Growth-First</strong>
          </span>

          <span className="ft-home-hero__title-line">
            Shopify Agency
          </span>
        </h1>

        <p className="ft-home-hero__description">
          Driving ecommerce growth through high-performing
          Shopify stores, conversion strategy, SEO and AI
          visibility.
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

        <NavLink
          className="ft-home-hero__work-link"
          prefetch="intent"
          to="/pages/case-studies"
        >
          <span>See our work</span>
          <ArrowDownIcon />
        </NavLink>
      </div>

      <NavLink
        className="ft-home-hero__side-link"
        prefetch="intent"
        to="/pages/about"
      >
        <span>Learn about FoldTech</span>
        <ArrowRightIcon />
      </NavLink>
    </section>
  );
}

function HeroMark() {
  return (
    <span
      className="ft-home-hero__mark"
      aria-hidden="true"
    >
      <svg
        width="52"
        height="52"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          width="48"
          height="48"
          rx="10"
          fill="currentColor"
        />

        <path
          d="M24 8.8C24.9 17.2 30.8 23.1 39.2 24C30.8 24.9 24.9 30.8 24 39.2C23.1 30.8 17.2 24.9 8.8 24C17.2 23.1 23.1 17.2 24 8.8Z"
          fill="#01151B"
        />
      </svg>
    </span>
  );
}

function ArrowDownIcon() {
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="18"
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

function ArrowRightIcon() {
  return (
    <svg
      aria-hidden="true"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
    >
      <path
        d="M2 7H12"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />

      <path
        d="M8.5 3.5L12 7L8.5 10.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}