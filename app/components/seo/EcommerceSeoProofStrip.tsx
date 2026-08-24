export type EcommerceSeoProofItem =
  | {type: 'text'; text: string}
  | {type: 'rating'; text: string}
  | {type: 'shopify-logos'; text: string};

export const ECOMMERCE_SEO_VERIFIED_PROOF_ITEMS = [
  {type: 'rating', text: '4.8/5 on Google'},
  {type: 'shopify-logos', text: 'Shopify Plus Partner'},
  {type: 'text', text: 'Est. 2018'},
  {type: 'text', text: '15,000+ page 1 keywords'},
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

            {item.type === 'shopify-logos' ? (
              <span className="ft-ecommerce-seo-proof__logos">
                <img
                  className="ft-ecommerce-seo-proof__logo"
                  src="/images/home-partners/shopify-plus.svg"
                  alt="Shopify Plus"
                />
                <img
                  className="ft-ecommerce-seo-proof__logo ft-ecommerce-seo-proof__logo--shopify"
                  src="/images/home-partners/shopify.svg"
                  alt="Shopify"
                />
              </span>
            ) : item.text}
          </span>
        </li>
      ))}
    </ul>
  );
}