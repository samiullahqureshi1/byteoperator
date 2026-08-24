import {useState} from 'react';

/* =========================================================
   FOLDTECH — HOME PARTNERS
========================================================= */

const PARTNER_LOGOS = [
  {
    src: '/images/home-partners/shopify-plus.svg',
    alt: 'Shopify Plus',
    width: 176,
    height: 36,
  },
  {
    src: '/images/home-partners/shopify.svg',
    alt: 'Shopify',
    width: 127,
    height: 36,
  },
  {
    src: '/images/home-partners/klaviyo.svg',
    alt: 'Klaviyo',
    width: 112,
    height: 32,
  },
  {
    src: '/images/home-partners/yotpo.svg',
    alt: 'Yotpo',
    width: 112,
    height: 32,
  },
  {
    src: '/images/home-partners/gorgias.svg',
    alt: 'Gorgias',
    width: 157,
    height: 34,
  },
  {
    src: '/images/home-partners/skio.svg',
    alt: 'Skio',
    width: 157,
    height: 34,
  },
  {
    src: '/images/home-partners/triple-whale.svg',
    alt: 'Triple Whale',
    width: 205,
    height: 27,
  },
  {
    src: '/images/home-partners/shoplift.svg',
    alt: 'Shoplift',
    width: 150,
    height: 30,
  },
  {
    src: '/images/home-partners/recharge.svg',
    alt: 'Recharge',
    width: 150,
    height: 30,
  },
  {
    src: '/images/home-partners/brightpearl.svg',
    alt: 'Brightpearl',
    width: 144,
    height: 30,
  },
  {
    src: '/images/home-partners/loyalty-lion.svg',
    alt: 'LoyaltyLion',
    width: 150,
    height: 36,
  },
  {
    src: '/images/home-partners/voyado.svg',
    alt: 'Voyado',
    width: 150,
    height: 36,
  },
] as const;

type PartnerLogo = (typeof PARTNER_LOGOS)[number];

export const ECOMMERCE_SEO_PARTNER_LOGOS: readonly PartnerLogo[] =
  PARTNER_LOGOS.filter(({alt}) =>
    [
      'Shopify Plus',
      'Shopify',
      'Klaviyo',
      'Triple Whale',
      'Gorgias',
      'Yotpo',
      'Recharge',
      'Skio',
    ].includes(alt),
  );

interface HomePartnersProps {
  description?: readonly string[];
  heading?: string;
  label?: string;
  logos?: readonly PartnerLogo[];
  showCta?: boolean;
}

export function HomePartners({
  description = [
    'Shopify stores often rely on a wider technology stack to support marketing, customer service, subscriptions, reviews, analytics and day-to-day ecommerce operations. FoldTech works across Shopify and a range of leading ecommerce platforms to help businesses choose solutions that fit their store, team and customer journey.',
    'From retention and customer support to testing, reporting and store integrations, we can connect the right tools with Shopify while keeping the storefront experience consistent, manageable and focused on business needs.',
  ],
  heading = 'We work with Shopify and leading ecommerce technologies.',
  label = 'Partners',
  logos = PARTNER_LOGOS,
  showCta = true,
}: HomePartnersProps) {
  const [isExpanded, setIsExpanded] =
    useState(false);

  return (
    <section
      className="ft-home-partners"
      aria-labelledby="ft-home-partners-title"
    >
      <div className="ft-home-partners__container">
        <h2 className="ft-home-partners__label">
          {label}
        </h2>

        <div className="ft-home-partners__inner">
          <div className="ft-home-partners__left">
            <h3
              className="ft-home-partners__title"
              id="ft-home-partners-title"
            >
              We work with Shopify and leading
              ecommerce technologies.
            </h3>

            <div
              className={[
                'ft-home-partners__description',
                isExpanded
                  ? 'ft-home-partners__description--expanded'
                  : 'ft-home-partners__description--clamped',
              ].join(' ')}
              id="ft-home-partners-description"
            >
              {description.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            {showCta ? (
              <button
                className="ft-home-partners__read-more"
                type="button"
                aria-expanded={isExpanded}
                aria-controls="ft-home-partners-description"
                onClick={() =>
                  setIsExpanded((current) => !current)
                }
              >
                {isExpanded ? 'Read less' : 'Read more'}
              </button>
            ) : null}
          </div>

          <div className="ft-home-partners__right">
            <div
              className="ft-home-partners__logos"
              aria-label="Ecommerce technology logos"
            >
              {logos.map((logo) => (
                <div
                  className="ft-home-partners__logo"
                  key={logo.src}
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    width={logo.width}
                    height={logo.height}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}