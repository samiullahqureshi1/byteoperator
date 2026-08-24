const REPORTING_CARDS = [
  {
    title: 'SEO Performance Reporting',
    description:
      'Track organic traffic, keyword visibility, rankings and other search performance signals to understand how optimisation work is affecting discoverability over time.',
  },
  {
    title: 'KPIs Aligned With Business Goals',
    description:
      'Measure SEO alongside ecommerce outcomes such as organic revenue, conversion performance and the visibility of commercially important product and collection pages.',
  },
  {
    title: 'Clear Progress & Priorities',
    description:
      'Turn SEO data into clear actions by documenting what has changed, what is being worked on and which technical, content or on-page opportunities should come next.',
  },
  {
    title: 'SEO Audits & Competitor Analysis',
    description:
      'Use ongoing technical checks, search data and competitor research to identify issues, content gaps and opportunities that can strengthen organic visibility.',
  },
] as const;

export function EcommerceSeoReporting() {
  return (
    <section
      className="ft-ecommerce-seo-reporting"
      aria-labelledby="ft-ecommerce-seo-reporting-title"
    >
      <div className="ft-ecommerce-seo-reporting__container">
        <p className="ft-ecommerce-seo-reporting__eyebrow">
          Transparency &amp; Reporting
        </p>

        <h2
          className="ft-ecommerce-seo-reporting__title"
          id="ft-ecommerce-seo-reporting-title"
        >
          How We Measure
          <br />
          Ecommerce SEO Success
        </h2>

        <p className="ft-ecommerce-seo-reporting__intro">
          Effective ecommerce SEO should be measured against meaningful search
          and commercial performance, not isolated vanity metrics. We combine
          search visibility, organic traffic, rankings and ecommerce
          performance data to understand what is improving, where opportunities
          remain and what should be prioritised next.
        </p>

        <div className="ft-ecommerce-seo-reporting__cards">
          {REPORTING_CARDS.map((card) => (
            <article
              className="ft-ecommerce-seo-reporting__card"
              key={card.title}
            >
              <h3 className="ft-ecommerce-seo-reporting__card-title">
                {card.title}
              </h3>

              <p className="ft-ecommerce-seo-reporting__card-description">
                {card.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}