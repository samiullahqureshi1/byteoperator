import {useState} from 'react';

/* =========================================================
   FOLDTECH — HOME PARTNERS
========================================================= */

const PARTNER_LOGOS = [
  {
    src: '/images/home-partners/shopify.svg',
    alt: 'Shopify',
    width: 160,
    height: 36,
  },
  {
    src: '/images/home-partners/shopify-plus.svg',
    alt: 'Shopify Plus',
    width: 176,
    height: 36,
  },
  {
    src: '/images/home-partners/bigcommerce.svg',
    alt: 'BigCommerce',
    width: 160,
    height: 36,
  },
  {
    src: '/images/home-partners/woocommerce.svg',
    alt: 'WooCommerce',
    width: 160,
    height: 36,
  },
  {
    src: '/images/home-partners/magento.svg',
    alt: 'Magento',
    width: 160,
    height: 36,
  },
  {
    src: '/images/home-partners/salesforce-commerce-cloud.svg',
    alt: 'Salesforce Commerce Cloud',
    width: 160,
    height: 36,
  },
  {
    src: '/images/home-partners/shopware.svg',
    alt: 'Shopware',
    width: 160,
    height: 36,
  },
  {
    src: '/images/home-partners/prestashop.svg',
    alt: 'PrestaShop',
    width: 160,
    height: 36,
  },
  {
    src: '/images/home-partners/opencart.svg',
    alt: 'OpenCart',
    width: 160,
    height: 36,
  },
  {
    src: '/images/home-partners/squarespace.svg',
    alt: 'Squarespace',
    width: 160,
    height: 36,
  },
  {
    src: '/images/home-partners/wix.svg',
    alt: 'Wix',
    width: 160,
    height: 36,
  },
] as const;

type PartnerLogo = (typeof PARTNER_LOGOS)[number];

export const CONTACT_PARTNER_LOGOS: readonly PartnerLogo[] =
  PARTNER_LOGOS;

export const ECOMMERCE_SEO_PARTNER_LOGOS: readonly PartnerLogo[] =
  PARTNER_LOGOS;

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
