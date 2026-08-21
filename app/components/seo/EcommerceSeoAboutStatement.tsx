import {Link} from 'react-router';

const SEO_PILLS = [
  {
    label: 'Ecommerce SEO',
    href: '/ecommerce-seo-agency/',
  },
  {
    label: 'Shopify SEO',
    href: '/shopify-seo/',
  },
  {
    label: 'CRO Services',
    href: '/shopify-cro-agency/',
  },
  {
    label: 'Shopify Support',
    href: '/support-and-maintenance/',
  },
] as const;

export function EcommerceSeoAboutStatement() {
  return (
    <div className="ft-ecommerce-seo-about">
      <div className="ft-ecommerce-seo-about__left">
        <h2 className="ft-ecommerce-seo-about__heading">
          Ecommerce SEO services that drive organic revenue, not just rankings
        </h2>

        <div
          className="ft-ecommerce-seo-about__pills"
          aria-label="Related services"
        >
          {SEO_PILLS.map((pill) => (
            <Link
              key={pill.label}
              className="ft-ecommerce-seo-about__pill"
              to={pill.href}
              prefetch="intent"
            >
              {pill.label}
            </Link>
          ))}
        </div>

        <Link
          className="ft-ecommerce-seo-about__guide"
          to="/articles/shopify-seo-guide/"
          prefetch="intent"
        >
          <span
            className="ft-ecommerce-seo-about__guide-icon"
            aria-hidden="true"
          >
            <ArrowUpRight />
          </span>

          <span className="ft-ecommerce-seo-about__guide-content">
            <strong>Free Shopify SEO Guide</strong>
            <span>The complete guide to ecommerce SEO on Shopify</span>
          </span>

          <span
            className="ft-ecommerce-seo-about__guide-arrow"
            aria-hidden="true"
          >
            <ArrowRight />
          </span>
        </Link>
      </div>

      <div className="ft-ecommerce-seo-about__right">
        <h3 className="ft-ecommerce-seo-about__subheading">
          A Search-First Approach to Ecommerce Growth, From Technical
          Foundations to Content That Ranks
        </h3>

        <p className="ft-ecommerce-seo-about__body">
          Ecommerce SEO requires more than improving rankings in isolation.
          FoldTech approaches search around the structure of the store, the
          customer journey and the commercial value behind each page. We work
          across technical SEO, site architecture, on-page optimisation and
          content strategy to help ecommerce stores build stronger organic
          visibility.
        </p>

        <p className="ft-ecommerce-seo-about__body">
          Our approach connects search strategy with the wider ecommerce
          experience. Technical recommendations, collection and product
          optimisation, internal linking and content opportunities are
          considered alongside usability, development requirements and business
          priorities so improvements can support sustainable organic growth.
        </p>

        <Link
          className="ft-ecommerce-seo-about__cta"
          to="/contact"
          prefetch="intent"
        >
          <span>Enquire about ecommerce SEO</span>
          <ArrowRight />
        </Link>
      </div>
    </div>
  );
}

function ArrowUpRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <path
        d="M7 17L17 7M17 7H10M17 7V14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg viewBox="0 0 14 14" fill="none">
      <path
        d="M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5"
        stroke="currentColor"
        strokeWidth="1.1"
      />
    </svg>
  );
}