const COMPARISONS = [
  {
    title: 'Shopify vs Magento & Adobe Commerce',
    description:
      'Magento and Adobe Commerce can support complex ecommerce requirements, but they often involve more infrastructure and development management. Shopify provides a managed platform that lets our team focus more directly on storefront performance, search architecture and ongoing optimisation.',
  },
  {
    title: 'Shopify vs WooCommerce & WordPress',
    description:
      'WooCommerce offers extensive flexibility through WordPress and its plugin ecosystem. Shopify takes a more managed approach to hosting, security and platform maintenance, giving ecommerce teams a different foundation for technical SEO, development and store operations.',
  },
  {
    title: 'Shopify vs BigCommerce & Wix',
    description:
      'Every ecommerce platform approaches themes, apps, URLs and technical SEO differently. Our Shopify specialism means recommendations are built around the platform we work with most closely rather than applying generic ecommerce advice across multiple systems.',
  },
] as const;

export function EcommerceSeoShopifySpecialism() {
  return (
    <section
      className="ft-ecommerce-seo-specialism"
      aria-labelledby="ft-ecommerce-seo-specialism-title"
    >
      <div className="ft-ecommerce-seo-specialism__container">
        <div className="ft-ecommerce-seo-specialism__intro">
          <p className="ft-ecommerce-seo-specialism__eyebrow">
            Ecommerce Platform Specialism
          </p>

          <h2
            className="ft-ecommerce-seo-specialism__title"
            id="ft-ecommerce-seo-specialism-title"
          >
            Why We Specialise in Shopify
          </h2>

          <div className="ft-ecommerce-seo-specialism__copy">
            <p>
              Ecommerce SEO changes significantly from one platform to
              another. URL structures, canonical behaviour, templating,
              filtering, apps and storefront architecture all affect how a
              store can be crawled, understood and optimised. A strategy that
              works well on one ecommerce platform cannot always be applied
              directly to another.
            </p>

            <p>
              FoldTech focuses deeply on Shopify so our SEO recommendations
              can account for the platform&apos;s real technical structure.
              From collections and product templates to structured data,
              internal linking, site performance and app-related
              considerations, our approach connects search strategy with how
              Shopify stores are actually built and managed.
            </p>
          </div>
        </div>

        <div className="ft-ecommerce-seo-specialism__cards">
          {COMPARISONS.map((item) => (
            <article
              className="ft-ecommerce-seo-specialism__card"
              key={item.title}
            >
              <h3 className="ft-ecommerce-seo-specialism__card-title">
                {item.title}
              </h3>

              <p className="ft-ecommerce-seo-specialism__card-description">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}