import {COMPANY_FACTS} from '~/data/companyFacts';

export type EcommerceSeoProofItem =
  | {type: 'text'; text: string}
  | {type: 'rating'; text: string}
  | {type: 'software-logos'; text: string};

export const ECOMMERCE_SEO_VERIFIED_PROOF_ITEMS = [
  {
    type: 'rating',
    text: `${COMPANY_FACTS.reviews.value} from ${COMPANY_FACTS.reviews.label}`,
  },
  {type: 'software-logos', text: 'Enterprise Software Partner'},
  {type: 'text', text: `Est. ${COMPANY_FACTS.founded.value}`},
  {
    type: 'text',
    text: `${COMPANY_FACTS.jobSuccess.value} ${COMPANY_FACTS.jobSuccess.label}`,
  },
] as const satisfies readonly EcommerceSeoProofItem[];

interface EcommerceSeoProofStripProps {
  items: readonly EcommerceSeoProofItem[];
}

export function EcommerceSeoProofStrip({
  items,
}: EcommerceSeoProofStripProps) {
  if (!items.length) return null;

  return (
    <ul className="ft-ecommerce-seo-proof">
      {items.map((item, index) => (
        <li className="ft-ecommerce-seo-proof__entry" key={item.text}>
          {index > 0 ? (
            <span
              className="ft-ecommerce-seo-proof__divider"
              aria-hidden="true"
            />
          ) : null}

          <span className="ft-ecommerce-seo-proof__item">
            {item.type === 'rating' ? (
              <span className="ft-ecommerce-seo-proof__stars" aria-hidden="true">
                {Array.from({length: 5}).map((_, starIndex) => (
                  <svg key={starIndex} viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.32L10 13.27l-4.77 2.51.91-5.32L2.27 6.62l5.34-.78z" />
                  </svg>
                ))}
              </span>
            ) : null}

            {item.type === 'software-logos' ? (
              <span className="ft-ecommerce-seo-proof__logos">
                <img
                  className="ft-ecommerce-seo-proof__logo"
                  src="/images/home-partners/shopify-plus.svg"
                  alt="Shopify Plus logo"
                  width="234"
                  height="103"
                  loading="lazy"
                />
                <img
                  className="ft-ecommerce-seo-proof__logo ft-ecommerce-seo-proof__logo--software"
                  src="/images/home-partners/shopify.svg"
                  alt="Shopify logo"
                  width="179"
                  height="76"
                  loading="lazy"
                />
              </span>
            ) : item.text}
          </span>
        </li>
      ))}
    </ul>
  );
}