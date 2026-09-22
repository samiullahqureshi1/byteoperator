import {useEffect, useRef} from 'react';
import {Link} from 'react-router';
import {
  CRO_CLEAN_PATH,
  resolveCanonicalPath,
  SHOPIFY_SEO_CLEAN_PATH,
} from '~/lib/route-mappings';

/* =========================================================
   TEMPORARY REFERENCE ASSETS

   These client/product logo assets are temporary while the
   FoldTech versions are being prepared.

   Replace the src values later without changing the layout.
========================================================= */

export type ClientLogoMarqueeItem = {
  src: string;
  alt: string;
  width: number;
  height: number;
  size?: 'small' | 'large';
  noFilter?: boolean;
};

export const HOME_CLIENT_LOGOS: readonly ClientLogoMarqueeItem[] = [
  {
    src: '/images/home-services/clients/logo-1.svg',
    width: 438,
    height: 48,
    alt: '',
  },
  {
    src: '/images/home-services/clients/logo-2.svg',
    width: 547,
    height: 120,
    alt: '',
  },
  {
    src: '/images/home-services/clients/logo-3.svg',
    width: 1200,
    height: 200,
    alt: '',
  },
  {
    src: '/images/home-services/clients/logo-4.svg',
    width: 2609,
    height: 480,
    alt: '',
    size: 'small',
  },
  {
    src: '/images/home-services/clients/logo-5.svg',
    width: 1800,
    height: 541,
    alt: '',
    size: 'large',
  },
  {
    src: '/images/home-services/clients/logo-6.svg',
    width: 2789,
    height: 965,
    alt: '',
    size: 'small',
  },
  {
    src: '/images/home-services/clients/logo-7.svg',
    width: 612,
    height: 792,
    alt: '',
  },
  {
    src: '/images/home-services/clients/logo-8.svg',
    width: 165,
    height: 51,
    alt: '',
    size: 'large',
    noFilter: true,
  },
  {
    src: '/images/home-services/clients/logo-9.svg',
    width: 1489,
    height: 380,
    alt: '',
    size: 'large',
  },
  {
    src: '/images/home-services/clients/logo-10.svg',
    width: 1890,
    height: 1417,
    alt: '',
  },
  {
    src: '/images/home-services/clients/logo-11.svg',
    width: 4168,
    height: 3126,
    alt: '',
  },
  {
    src: '/images/home-services/clients/logo-12.svg',
    width: 100,
    height: 100,
    alt: '',
  },
  {
    src: '/images/home-services/clients/logo-13.svg',
    width: 4210,
    height: 1172,
    alt: '',
  },
  {
    src: '/images/home-services/clients/logo-14.svg',
    width: 3163,
    height: 529,
    alt: '',
  },
  {
    src: '/images/home-services/clients/logo-15.svg',
    width: 400,
    height: 194,
    alt: '',
  },
  {
    src: '/images/home-services/clients/logo-16.svg',
    width: 1500,
    height: 388,
    alt: '',
  },
  {
    src: '/images/home-services/clients/logo-17.svg',
    width: 1200,
    height: 200,
    alt: '',
  },
  {
    src: '/images/home-services/clients/logo-18.svg',
    width: 160,
    height: 116,
    alt: '',
  },
  {
    src: '/images/home-services/clients/logo-19.svg',
    width: 68,
    height: 80,
    alt: '',
  },
  {
    src: '/images/home-services/clients/logo-20.svg',
    width: 360,
    height: 159,
    alt: '',
  },
  {
    src: '/images/home-services/clients/logo-21.svg',
    width: 403,
    height: 161,
    alt: '',
  },
  {
    src: '/images/home-services/clients/logo-22.svg',
    width: 1350,
    height: 521,
    alt: '',
  },
  {
    src: '/images/home-services/clients/logo-23.svg',
    width: 1024,
    height: 501,
    alt: '',
  },
  {
    src: '/images/home-services/clients/logo-24.svg',
    width: 280,
    height: 46,
    alt: '',
  },
  {
    src: '/images/home-services/clients/logo-25.svg',
    width: 464,
    height: 158,
    alt: '',
  },
  {
    src: '/images/home-services/clients/logo-26.svg',
    width: 190,
    height: 93,
    alt: '',
  },
  {
    src: '/images/home-services/clients/logo-27.svg',
    width: 565,
    height: 85,
    alt: '',
  },
  {
    src: '/images/home-services/clients/logo-28.svg',
    width: 810,
    height: 316,
    alt: '',
  },
  {
    src: '/images/home-services/clients/logo-29.svg',
    width: 3000,
    height: 1223,
    alt: '',
  },
  {
    src: '/images/home-services/clients/logo-30.svg',
    width: 410,
    height: 46,
    alt: '',
  },
] as const;


/* =========================================================
   SERVICE CARDS

   Routes use the same routes already established in
   FoldTech navigation.
========================================================= */

const SERVICES = [
  {
    title: 'SEO & GEO',
    description:
      'Organic search, AI visibility and local reach to drive long-term traffic growth.',
    href: SHOPIFY_SEO_CLEAN_PATH,
    badge:
      '/images/home-services/badges/logo-search-white.svg',
    badgeAlt: 'Search',
    graphic: 'seo',
  },

  {
    title: 'New Stores',
    description:
      'Bespoke Shopify store design and development, built to convert from day one.',
    href: '/shopify-theme-development-builds/',
    badge:
      '/images/home-services/badges/logo-launch-white.svg',
    badgeAlt: 'Launch',
    graphic: null,
  },

  {
    title: 'Shopify Migrations',
    description:
      'Helping brands migrate from other platforms to Shopify with zero downtime.',
    href: '/shopify-migrations/',
    badge:
      '/images/home-services/badges/logo-launch-white.svg',
    badgeAlt: 'Launch',
    graphic: null,
  },

  {
    title: 'Conversion Rate Optimisation',
    description:
      'Data-driven testing and optimisation to turn more visitors into customers.',
    href: CRO_CLEAN_PATH,
    badge:
      '/images/home-services/badges/logo-sitelab-white.svg',
    badgeAlt: 'Sitelab',
    graphic: 'cro',
  },

  {
    title: 'Theme Development',
    description:
      'Custom Shopify theme builds and ongoing enhancements tailored to your brand.',
    href: '/shopify-theme-development-builds/',
    badge: null,
    badgeAlt: '',
    graphic: null,
  },

  {
    title: 'Support & Maintenance',
    description:
      'Ongoing care, updates and optimisations to keep your store running smoothly.',
    href: '/support-and-maintenance/',
    badge:
      '/images/home-services/badges/logo-helpdesk-white.svg',
    badgeAlt: 'Helpdesk',
    graphic: null,
  },

  {
    title: 'UI / UX Design',
    description:
      'Considered, conversion-focused design that improves usability across your store.',
    href: '/shopify-theme-development-builds/',
    badge: null,
    badgeAlt: '',
    graphic: 'ux',
  },

  {
    title: 'Email Marketing & SMS',
    description:
      'Lifecycle campaigns and automations designed to increase repeat revenue.',
    href: '/email-marketing-agency/',
    badge:
      '/images/home-services/badges/logo-retain-white.svg',
    badgeAlt: 'Retain',
    graphic: 'email',
  },
] as const;


/* =========================================================
   BOTTOM SERVICE PRODUCTS
========================================================= */

const SERVICE_PRODUCTS = [
  {
    label: 'Search',
    href: SHOPIFY_SEO_CLEAN_PATH,
    logo:
      '/images/home-services/badges/logo-search-white.svg',
  },

  {
    label: 'Launch',
    href: '/shopify-theme-development-builds/',
    logo:
      '/images/home-services/badges/logo-launch-white.svg',
  },

  {
    label: 'Sitelab',
    href: CRO_CLEAN_PATH,
    logo:
      '/images/home-services/badges/logo-sitelab-white.svg',
  },

  {
    label: 'Helpdesk',
    href: '/support-and-maintenance/',
    logo:
      '/images/home-services/badges/logo-helpdesk-white.svg',
  },

  {
    label: 'Retain',
    href: '/email-marketing-agency/',
    logo:
      '/images/home-services/badges/logo-retain-white.svg',
  },
] as const;


/* =========================================================
   MAIN COMPONENT
========================================================= */

export function HomeServices() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const cards = Array.from(
      section.querySelectorAll<HTMLElement>(
        '[data-service-animation="true"]',
      ),
    );

    if (!cards.length) return;

    /*
     * Progressive enhancement.
     *
     * If IntersectionObserver is unavailable, immediately
     * reveal the animated graphics.
     */
    if (!('IntersectionObserver' in window)) {
      cards.forEach((card) => {
        card.classList.add(
          'ft-home-services__cell--in-view',
        );
      });

      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add(
            'ft-home-services__cell--in-view',
          );

          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.4,
      },
    );

    cards.forEach((card) => {
      observer.observe(card);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="ft-home-services"
      aria-label="Our Services"
    >
      <div className="ft-home-services__inner">
        <ClientLogoMarquee />

        <div className="ft-home-services__mobile-heading">
          <p className="ft-home-services__mobile-heading-sub">
            Delivering Growth
          </p>

          <h2 className="ft-home-services__mobile-heading-main">
            Our Services
          </h2>
        </div>

        <div className="ft-home-services__grid">
          {SERVICES.map((service, index) => (
            <ServiceCard
              key={service.title}
              service={service}
              index={index}
            />
          ))}
        </div>

        <div className="ft-home-services__products">
          {SERVICE_PRODUCTS.map((product) => (
            <Link
              key={product.label}
              className="ft-home-services__product"
              to={resolveCanonicalPath(product.href)}
              prefetch="intent"
              aria-label={product.label}
            >
              <img
                src={product.logo}
                width={130}
                height={50}
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
              />
            </Link>
          ))}
        </div>

        <div className="ft-home-services__cta-wrap">
          <Link
            className="ft-home-services__cta"
            to="/services"
            prefetch="intent"
          >
            <span>View all services</span>

            <ArrowIcon />
          </Link>
        </div>
      </div>
    </section>
  );
}


/* =========================================================
   CLIENT LOGO MARQUEE
========================================================= */

export function ClientLogoMarquee({
  label = 'Trusted by world-class ecommerce brands',
  logos = HOME_CLIENT_LOGOS,
}: {
  label?: string;
  logos?: readonly ClientLogoMarqueeItem[];
} = {}) {
  return (
    <div className="ft-home-services__logos">
      <p className="ft-home-services__logos-label">
        {label}
      </p>

      <div className="ft-home-services__logos-mask">
        <div className="ft-home-services__logos-track">
          {[0, 1].map((copyIndex) => (
            <div
              key={copyIndex}
              className="ft-home-services__logos-set"
              aria-hidden={copyIndex === 1}
            >
              {logos.map((logo) => {
                const sizeClass = logo.size
                  ? ` ft-home-services__logo-item--${logo.size}`
                  : '';

                const filterClass = logo.noFilter
                  ? ' ft-home-services__logo-image--no-filter'
                  : '';

                return (
                  <div
                    key={`${copyIndex}-${logo.alt}`}
                    className={`ft-home-services__logo-item${sizeClass}`}
                  >
                    <img
                      className={`ft-home-services__logo-image${filterClass}`}
                      src={logo.src}
                      width={logo.width}
                      height={logo.height}
                      alt={
                        copyIndex === 0
                          ? logo.alt
                          : ''
                      }
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


/* =========================================================
   SERVICE CARD
========================================================= */

type Service = (typeof SERVICES)[number];

function ServiceCard({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  const cardNumber = String(index + 1).padStart(
    2,
    '0',
  );

  const className = [
    'ft-home-services__cell',
    `ft-home-services__cell--${index + 1}`,
  ].join(' ');

  const hasAnimation =
    service.graphic !== null;

  /*
   * Email uses the horizontal content + graphic structure
   * seen in the desktop reference.
   */
  if (service.graphic === 'email') {
    return (
      <Link
        className={className}
        to={resolveCanonicalPath(service.href)}
        prefetch="intent"
        data-service-animation="true"
      >
        <div className="ft-home-services__cell-content">
          <span className="ft-home-services__cell-number">
            {cardNumber}
          </span>

          <ServiceBadge service={service} />

          <h3 className="ft-home-services__cell-name">
            {service.title}
          </h3>

          <p className="ft-home-services__cell-description">
            {service.description}
          </p>         
        </div>
        <EmailGraphic />
        <CardArrow />
      </Link>
    );
  }

  return (
    <Link
      className={className}
      to={resolveCanonicalPath(service.href)}
      prefetch="intent"
      data-service-animation={
        hasAnimation ? 'true' : undefined
      }
    >
      <span className="ft-home-services__cell-number">
        {cardNumber}
      </span>

      {service.graphic === 'seo' ? (
        <SeoGraphic />
      ) : null}

      {service.graphic === 'cro' ? (
        <>
          <ServiceBadge service={service} />
          <CroGraphic />
        </>
      ) : (
        <ServiceBadge service={service} />
      )}

      {service.graphic === 'ux' ? (
        <UiUxGraphic />
      ) : null}

      <h3 className="ft-home-services__cell-name">
        {service.title}
      </h3>

      <p className="ft-home-services__cell-description">
        {service.description}
      </p>

      <CardArrow />
    </Link>
  );
}


/* =========================================================
   BADGE
========================================================= */

function ServiceBadge({
  service,
}: {
  service: Service;
}) {
  if (!service.badge) return null;

  return (
    <span className="ft-home-services__cell-badge">
      <img
        src={service.badge}
        width={130}
        height={50}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
      />
    </span>
  );
}


/* =========================================================
   CARD ARROW
========================================================= */

function CardArrow() {
  return (
    <span
      className="ft-home-services__cell-arrow"
      aria-hidden="true"
    >
      <ArrowIcon />
    </span>
  );
}


function ArrowIcon() {
  return (
    <svg
      className="ft-home-services__arrow-icon"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M1 13L13 1M13 1H4M13 1V10"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}


/* =========================================================
   SEO + GEO GRAPHIC
========================================================= */

function SeoGraphic() {
  return (
    <svg
      className="ft-home-services__graphic"
      viewBox="0 0 650 250"
      fill="none"
      aria-hidden="true"
    >
      {/* Google SERP */}

      <g>
        <rect
          width="315"
          height="200"
          rx="10"
          fill="#1a1a1a"
        />

        <rect
          width="315"
          height="200"
          rx="10"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="0.5"
        />

        <rect
          x="16"
          y="14"
          width="283"
          height="22"
          rx="11"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="0.7"
        />

        <circle
          cx="30"
          cy="25"
          r="4.5"
          stroke="#4285f4"
          strokeWidth="0.9"
        />

        <line
          x1="33.5"
          y1="28.5"
          x2="36"
          y2="31"
          stroke="#4285f4"
          strokeWidth="0.9"
          strokeLinecap="round"
        />

        <rect
          x="46"
          y="22"
          width="60"
          height="6"
          rx="3"
          fill="rgba(255,255,255,0.12)"
        />

        <rect
          x="14"
          y="46"
          width="287"
          height="48"
          rx="6"
          fill="rgba(99,102,241,0.08)"
        />

        <SerpLine
          number={2}
          x="24"
          y="54"
          width="120"
          height="7"
          fill="#818cf8"
        />

        <SerpLine
          number={3}
          x="24"
          y="65"
          width="80"
          height="5"
          fill="#34d399"
        />

        <SerpLine
          number={4}
          x="24"
          y="74"
          width="220"
          height="4"
        />

        <SerpLine
          number={5}
          x="24"
          y="81"
          width="180"
          height="4"
        />

        <g>
          <rect
            x="270"
            y="51"
            width="22"
            height="13"
            rx="6.5"
            fill="#34d399"
            opacity="0.2"
          />

          <text
            x="281"
            y="60.5"
            textAnchor="middle"
            fontFamily="sans-serif"
            fontSize="7"
            fontWeight="600"
            fill="#34d399"
          >
            #1
          </text>
        </g>

        <SerpLine
          number={6}
          x="24"
          y="106"
          width="100"
          height="7"
          fill="#818cf8"
          opacity="0.45"
        />

        <SerpLine
          number={7}
          x="24"
          y="117"
          width="65"
          height="5"
          fill="#34d399"
          opacity="0.35"
        />

        <SerpLine
          number={8}
          x="24"
          y="126"
          width="200"
          height="4"
        />

        <SerpLine
          number={9}
          x="24"
          y="133"
          width="160"
          height="4"
        />

        <SerpLine
          number={10}
          x="24"
          y="152"
          width="80"
          height="6"
          fill="#818cf8"
          opacity="0.22"
        />

        <SerpLine
          number={11}
          x="24"
          y="162"
          width="50"
          height="4"
          fill="#34d399"
          opacity="0.18"
        />

        <SerpLine
          number={12}
          x="24"
          y="170"
          width="170"
          height="3.5"
        />

        <SerpLine
          number={13}
          x="24"
          y="184"
          width="70"
          height="6"
          fill="#818cf8"
          opacity="0.12"
        />

        <SerpLine
          number={14}
          x="24"
          y="193"
          width="40"
          height="4"
          fill="#34d399"
          opacity="0.1"
        />
      </g>


      {/* AI / LLM chat */}

      <g transform="translate(335 50)">
        <rect
          width="315"
          height="200"
          rx="10"
          fill="#1a1a1a"
        />

        <rect
          width="315"
          height="200"
          rx="10"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="0.5"
        />

        <g className="ft-home-services__chat-message ft-home-services__chat-message--1">
          <circle
            cx="24"
            cy="24"
            r="8"
            fill="rgba(139,92,246,0.15)"
            stroke="#8b5cf6"
            strokeWidth="0.6"
          />

          <rect
            x="20"
            y="21"
            width="8"
            height="2"
            rx="1"
            fill="#a78bfa"
            opacity="0.7"
          />

          <rect
            x="21"
            y="25"
            width="6"
            height="2"
            rx="1"
            fill="#a78bfa"
            opacity="0.5"
          />

          <rect
            x="40"
            y="14"
            width="260"
            height="76"
            rx="8"
            fill="rgba(139,92,246,0.06)"
            stroke="rgba(139,92,246,0.15)"
            strokeWidth="0.5"
          />

          <rect
            x="52"
            y="24"
            width="200"
            height="4"
            rx="2"
            fill="#a78bfa"
            opacity="0.4"
          />

          <rect
            x="52"
            y="32"
            width="225"
            height="4"
            rx="2"
            fill="rgba(255,255,255,0.12)"
          />

          <rect
            x="52"
            y="40"
            width="180"
            height="4"
            rx="2"
            fill="rgba(255,255,255,0.12)"
          />

          <rect
            x="52"
            y="48"
            width="210"
            height="4"
            rx="2"
            fill="rgba(255,255,255,0.12)"
          />

          <rect
            x="52"
            y="56"
            width="150"
            height="4"
            rx="2"
            fill="rgba(255,255,255,0.12)"
          />

          <rect
            x="52"
            y="67"
            width="70"
            height="14"
            rx="7"
            fill="rgba(139,92,246,0.15)"
          />
        </g>

        <g className="ft-home-services__chat-message ft-home-services__chat-message--2">
          <rect
            x="80"
            y="104"
            width="220"
            height="26"
            rx="8"
            fill="rgba(255,255,255,0.06)"
          />

          <rect
            x="92"
            y="113"
            width="140"
            height="5"
            rx="2.5"
            fill="rgba(255,255,255,0.2)"
          />

          <rect
            x="92"
            y="121"
            width="80"
            height="4"
            rx="2"
            fill="rgba(255,255,255,0.12)"
          />
        </g>

        <g className="ft-home-services__chat-message ft-home-services__chat-message--3">
          <circle
            cx="24"
            cy="152"
            r="8"
            fill="rgba(139,92,246,0.15)"
            stroke="#8b5cf6"
            strokeWidth="0.6"
          />

          <rect
            x="40"
            y="142"
            width="260"
            height="46"
            rx="8"
            fill="rgba(139,92,246,0.06)"
            stroke="rgba(139,92,246,0.15)"
            strokeWidth="0.5"
          />

          <rect
            x="52"
            y="152"
            width="190"
            height="4"
            rx="2"
            fill="#a78bfa"
            opacity="0.4"
          />

          <rect
            x="52"
            y="160"
            width="225"
            height="4"
            rx="2"
            fill="rgba(255,255,255,0.12)"
          />

          <rect
            x="52"
            y="168"
            width="160"
            height="4"
            rx="2"
            fill="rgba(255,255,255,0.12)"
          />

          <rect
            x="52"
            y="176"
            width="200"
            height="4"
            rx="2"
            fill="rgba(255,255,255,0.12)"
          />
        </g>
      </g>
    </svg>
  );
}


function SerpLine({
  number,
  x,
  y,
  width,
  height,
  fill = 'rgba(255,255,255,0.08)',
  opacity,
}: {
  number: number;
  x: string;
  y: string;
  width: string;
  height: string;
  fill?: string;
  opacity?: string;
}) {
  return (
    <rect
      className={`ft-home-services__serp-line ft-home-services__serp-line--${number}`}
      x={x}
      y={y}
      width={width}
      height={height}
      rx="2"
      fill={fill}
      opacity={opacity}
    />
  );
}


/* =========================================================
   CRO GRAPHIC
========================================================= */

function CroGraphic() {
  return (
    <svg
      className="ft-home-services__graphic"
      viewBox="0 0 340 200"
      fill="none"
      aria-hidden="true"
    >
      <CroPanel variant={false} />

      <g transform="translate(180 0)">
        <CroPanel variant />
      </g>
    </svg>
  );
}


function CroPanel({
  variant,
}: {
  variant: boolean;
}) {
  return (
    <>
      <rect
        width="160"
        height="200"
        rx="8"
        fill="#1a1a1a"
      />

      <rect
        width="160"
        height="200"
        rx="8"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="0.5"
      />

      {!variant ? (
        <>
          <CroControlLabel />

          <CroNavigation />

          <CroControlContent />
        </>
      ) : (
        <>
          <g className="ft-home-services__cro-label-control">
            <CroControlLabel />
          </g>

          <g className="ft-home-services__cro-label-variant">
            <rect
              x="10"
              y="8"
              width="42"
              height="12"
              rx="6"
              fill="rgba(99,102,241,0.12)"
            />

            <text
              x="31"
              y="16.5"
              textAnchor="middle"
              fontFamily="sans-serif"
              fontSize="6"
              fontWeight="500"
              fill="#818cf8"
            >
              Variant
            </text>
          </g>

          <CroNavigation />

          <g className="ft-home-services__cro-control-hero">
            <rect
              x="10"
              y="40"
              width="140"
              height="55"
              rx="4"
              fill="rgba(255,255,255,0.06)"
            />
          </g>

          <g className="ft-home-services__cro-control-heading">
            <rect
              x="10"
              y="104"
              width="100"
              height="6"
              rx="3"
              fill="rgba(255,255,255,0.5)"
            />

            <rect
              x="10"
              y="114"
              width="75"
              height="4"
              rx="2"
              fill="rgba(255,255,255,0.12)"
            />
          </g>

          <g className="ft-home-services__cro-control-cta">
            <rect
              x="10"
              y="126"
              width="50"
              height="14"
              rx="7"
              fill="rgba(255,255,255,0.25)"
            />
          </g>

          <g className="ft-home-services__cro-control-lines">
            <rect
              x="10"
              y="150"
              width="140"
              height="3"
              rx="1.5"
              fill="rgba(255,255,255,0.06)"
            />

            <rect
              x="10"
              y="157"
              width="120"
              height="3"
              rx="1.5"
              fill="rgba(255,255,255,0.06)"
            />
          </g>

          <g className="ft-home-services__cro-variant-heading">
            <rect
              x="10"
              y="42"
              width="110"
              height="6"
              rx="3"
              fill="rgba(255,255,255,0.5)"
            />

            <rect
              x="10"
              y="52"
              width="80"
              height="4"
              rx="2"
              fill="rgba(255,255,255,0.12)"
            />
          </g>

          <g className="ft-home-services__cro-variant-cta">
            <rect
              x="10"
              y="64"
              width="55"
              height="14"
              rx="7"
              fill="#34d399"
              opacity="0.7"
            />
          </g>

          <g className="ft-home-services__cro-variant-hero">
            <rect
              x="10"
              y="88"
              width="140"
              height="42"
              rx="4"
              fill="rgba(255,255,255,0.06)"
            />
          </g>

          <g className="ft-home-services__cro-variant-lines">
            <rect
              x="10"
              y="140"
              width="140"
              height="3"
              rx="1.5"
              fill="rgba(255,255,255,0.06)"
            />

            <rect
              x="10"
              y="147"
              width="120"
              height="3"
              rx="1.5"
              fill="rgba(255,255,255,0.06)"
            />
          </g>

          <g className="ft-home-services__cro-variant-badge">
            <rect
              x="95"
              y="166"
              width="55"
              height="16"
              rx="8"
              fill="#34d399"
              opacity="0.15"
            />

            <text
              x="122.5"
              y="177"
              textAnchor="middle"
              fontFamily="sans-serif"
              fontSize="7"
              fontWeight="600"
              fill="#34d399"
            >
              +18.3%
            </text>
          </g>
        </>
      )}
    </>
  );
}


function CroControlLabel() {
  return (
    <>
      <rect
        x="10"
        y="8"
        width="42"
        height="12"
        rx="6"
        fill="rgba(255,255,255,0.06)"
      />

      <text
        x="31"
        y="16.5"
        textAnchor="middle"
        fontFamily="sans-serif"
        fontSize="6"
        fontWeight="500"
        fill="rgba(255,255,255,0.4)"
      >
        Control
      </text>
    </>
  );
}


function CroNavigation() {
  return (
    <>
      <rect
        x="10"
        y="28"
        width="30"
        height="4"
        rx="2"
        fill="rgba(255,255,255,0.12)"
      />

      <rect
        x="110"
        y="28"
        width="16"
        height="4"
        rx="2"
        fill="rgba(255,255,255,0.12)"
      />

      <rect
        x="130"
        y="28"
        width="16"
        height="4"
        rx="2"
        fill="rgba(255,255,255,0.12)"
      />
    </>
  );
}


function CroControlContent() {
  return (
    <>
      <rect
        x="10"
        y="40"
        width="140"
        height="55"
        rx="4"
        fill="rgba(255,255,255,0.06)"
      />

      <rect
        x="55"
        y="60"
        width="50"
        height="4"
        rx="2"
        fill="rgba(255,255,255,0.1)"
      />

      <rect
        x="62"
        y="68"
        width="36"
        height="4"
        rx="2"
        fill="rgba(255,255,255,0.08)"
      />

      <rect
        x="10"
        y="104"
        width="100"
        height="6"
        rx="3"
        fill="rgba(255,255,255,0.5)"
      />

      <rect
        x="10"
        y="114"
        width="75"
        height="4"
        rx="2"
        fill="rgba(255,255,255,0.12)"
      />

      <rect
        x="10"
        y="126"
        width="50"
        height="14"
        rx="7"
        fill="rgba(255,255,255,0.25)"
      />

      <rect
        x="10"
        y="150"
        width="140"
        height="3"
        rx="1.5"
        fill="rgba(255,255,255,0.06)"
      />

      <rect
        x="10"
        y="157"
        width="120"
        height="3"
        rx="1.5"
        fill="rgba(255,255,255,0.06)"
      />

      <rect
        x="10"
        y="164"
        width="130"
        height="3"
        rx="1.5"
        fill="rgba(255,255,255,0.06)"
      />
    </>
  );
}


/* =========================================================
   UI / UX GRAPHIC
========================================================= */

function UiUxGraphic() {
  return (
    <svg
      className="ft-home-services__graphic"
      viewBox="0 0 320 200"
      fill="none"
      aria-hidden="true"
    >
      <rect
        width="320"
        height="200"
        rx="8"
        fill="#1a1a1a"
      />

      <rect
        width="320"
        height="200"
        rx="8"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="0.5"
      />

      <g className="ft-home-services__ux ft-home-services__ux--1">
        <rect
          x="10"
          y="6"
          width="300"
          height="13"
          rx="6.5"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="0.5"
        />

        <circle
          cx="19"
          cy="12.5"
          r="2"
          fill="rgba(255,255,255,0.08)"
        />

        <rect
          x="26"
          y="11"
          width="60"
          height="3"
          rx="1.5"
          fill="rgba(255,255,255,0.08)"
        />
      </g>

      <g className="ft-home-services__ux ft-home-services__ux--2">
        <rect
          x="10"
          y="23"
          width="300"
          height="15"
          fill="rgba(255,255,255,0.03)"
        />

        <rect
          x="15"
          y="26"
          width="36"
          height="8"
          rx="1.5"
          fill="rgba(255,255,255,0.14)"
        />

        <rect
          x="110"
          y="28"
          width="20"
          height="3.5"
          rx="1.75"
          fill="rgba(255,255,255,0.09)"
        />

        <rect
          x="138"
          y="28"
          width="24"
          height="3.5"
          rx="1.75"
          fill="rgba(255,255,255,0.09)"
        />
      </g>

      <g className="ft-home-services__ux ft-home-services__ux--3">
        <rect
          x="10"
          y="42"
          width="300"
          height="50"
          rx="4"
          fill="rgba(59,130,246,0.05)"
          stroke="rgba(59,130,246,0.1)"
          strokeWidth="0.5"
        />

        <rect
          x="165"
          y="46"
          width="138"
          height="42"
          rx="3"
          fill="rgba(59,130,246,0.07)"
        />
      </g>

      <g className="ft-home-services__ux ft-home-services__ux--4">
        <rect
          x="18"
          y="50"
          width="100"
          height="6"
          rx="3"
          fill="rgba(255,255,255,0.14)"
        />

        <rect
          x="18"
          y="60"
          width="80"
          height="4"
          rx="2"
          fill="rgba(255,255,255,0.06)"
        />

        <rect
          x="18"
          y="78"
          width="44"
          height="10"
          rx="5"
          fill="rgba(59,130,246,0.18)"
        />
      </g>

      <g className="ft-home-services__ux ft-home-services__ux--5">
        <rect
          x="10"
          y="100"
          width="50"
          height="5"
          rx="2.5"
          fill="rgba(255,255,255,0.11)"
        />
      </g>

      <ProductWireframe
        className="ft-home-services__ux ft-home-services__ux--6"
        x={10}
      />

      <ProductWireframe
        className="ft-home-services__ux ft-home-services__ux--7"
        x={112}
      />

      <ProductWireframe
        className="ft-home-services__ux ft-home-services__ux--8"
        x={214}
      />

      <g className="ft-home-services__ux ft-home-services__ux--9">
        <line
          x1="10"
          y1="176"
          x2="310"
          y2="176"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="0.5"
        />

        <rect
          x="15"
          y="181"
          width="30"
          height="3.5"
          rx="1.75"
          fill="rgba(255,255,255,0.07)"
        />

        <rect
          x="130"
          y="181"
          width="26"
          height="3.5"
          rx="1.75"
          fill="rgba(255,255,255,0.07)"
        />

        <rect
          x="250"
          y="181"
          width="28"
          height="3.5"
          rx="1.75"
          fill="rgba(255,255,255,0.07)"
        />
      </g>
    </svg>
  );
}


function ProductWireframe({
  x,
  className,
}: {
  x: number;
  className: string;
}) {
  return (
    <g
      className={className}
      transform={`translate(${x} 0)`}
    >
      <rect
        y="110"
        width="96"
        height="56"
        rx="4"
        fill="rgba(255,255,255,0.025)"
        stroke="rgba(255,255,255,0.05)"
        strokeWidth="0.5"
      />

      <rect
        y="110"
        width="96"
        height="32"
        rx="4"
        fill="rgba(255,255,255,0.035)"
      />

      <rect
        x="24"
        y="117"
        width="48"
        height="18"
        rx="2.5"
        fill="rgba(255,255,255,0.05)"
      />

      <rect
        x="6"
        y="148"
        width="44"
        height="3.5"
        rx="1.75"
        fill="rgba(255,255,255,0.1)"
      />

      <rect
        x="6"
        y="155"
        width="28"
        height="3.5"
        rx="1.75"
        fill="rgba(255,255,255,0.06)"
      />
    </g>
  );
}


/* =========================================================
   EMAIL FLOW GRAPHIC
========================================================= */

function EmailGraphic() {
  return (
    <svg
      className="ft-home-services__graphic ft-home-services__graphic--email"
      viewBox="0 0 700 160"
      fill="none"
      aria-hidden="true"
    >
      <EmailCard
        x={0}
        number="1"
        label="Welcome"
        accent="#34d399"
      />

      <EmailArrow
        number="1"
        x1="138"
        x2="170"
      />

      <EmailCard
        x={178}
        number="2"
        label="Browse Abandon"
        accent="#fb923c"
      />

      <EmailArrow
        number="2"
        x1="316"
        x2="348"
      />

      <EmailCard
        x={356}
        number="3"
        label="Cart Abandon"
        accent="#f87171"
      />

      <EmailArrow
        number="3"
        x1="494"
        x2="526"
      />

      <EmailCard
        x={534}
        number="4"
        label="Post-Purchase"
        accent="#60a5fa"
      />
    </svg>
  );
}


function EmailCard({
  x,
  number,
  label,
  accent,
}: {
  x: number;
  number: string;
  label: string;
  accent: string;
}) {
  return (
    <g transform={`translate(${x} 0)`}>
      <rect
        y="10"
        width="130"
        height="140"
        rx="8"
        fill="#1a1a1a"
      />

      <rect
        y="10"
        width="130"
        height="140"
        rx="8"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="0.5"
      />

      <g
        className={`ft-home-services__email-line ft-home-services__email-line--${number}a`}
      >
        <rect
          x="10"
          y="18"
          width={
            number === '2'
              ? '65'
              : number === '4'
                ? '60'
                : '55'
          }
          height="11"
          rx="5.5"
          fill={accent}
          opacity="0.12"
        />

        <text
          x="15"
          y="26"
          fontFamily="sans-serif"
          fontSize="5.5"
          fontWeight="500"
          fill={accent}
        >
          {label}
        </text>
      </g>

      <rect
        className={`ft-home-services__email-line ft-home-services__email-line--${number}b`}
        x="10"
        y="38"
        width="110"
        height="30"
        rx="4"
        fill="rgba(255,255,255,0.06)"
      />

      <rect
        className={`ft-home-services__email-line ft-home-services__email-line--${number}c`}
        x="10"
        y="78"
        width="90"
        height="5"
        rx="2.5"
        fill="rgba(255,255,255,0.35)"
      />

      <g
        className={`ft-home-services__email-line ft-home-services__email-line--${number}d`}
      >
        <rect
          x="10"
          y="90"
          width="110"
          height="3"
          rx="1.5"
          fill="rgba(255,255,255,0.1)"
        />

        <rect
          x="10"
          y="96"
          width="80"
          height="3"
          rx="1.5"
          fill="rgba(255,255,255,0.1)"
        />
      </g>

      <g
        className={`ft-home-services__email-line ft-home-services__email-line--${number}e`}
      >
        <rect
          x="10"
          y="108"
          width="55"
          height="14"
          rx="7"
          fill="rgba(255,255,255,0.25)"
        />
      </g>

      <g
        className={`ft-home-services__email-line ft-home-services__email-line--${number}f`}
      >
        <rect
          x="10"
          y="130"
          width="70"
          height="2.5"
          rx="1.25"
          fill="rgba(255,255,255,0.05)"
        />

        <rect
          x="10"
          y="136"
          width="50"
          height="2.5"
          rx="1.25"
          fill="rgba(255,255,255,0.05)"
        />
      </g>
    </g>
  );
}


function EmailArrow({
  number,
  x1,
  x2,
}: {
  number: string;
  x1: string;
  x2: string;
}) {
  return (
    <g
      className={`ft-home-services__email-line ft-home-services__email-line--arrow-${number}`}
    >
      <line
        x1={x1}
        y1="80"
        x2={x2}
        y2="80"
        stroke="rgba(255,255,255,0.15)"
        strokeWidth="1.2"
      />
    </g>
  );
}
