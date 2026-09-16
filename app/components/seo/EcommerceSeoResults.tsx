import {TRACK_RECORD_FACTS} from '~/data/companyFacts';

const RESULTS = TRACK_RECORD_FACTS.map(({value, label, description}) => ({
  stat: value,
  title: label,
  description,
}));

type EcommerceSeoResult = {
  stat: string;
  title: string;
  description: string;
};

type EcommerceSeoResultsProps = {
  eyebrow?: string;
  results?: readonly EcommerceSeoResult[];
  title?: string;
  variant?: 'ai';
};

export function EcommerceSeoResults({
  eyebrow = 'Our Track Record',
  results: resultItems = RESULTS,
  title = 'Ecommerce Experience Built at Scale',
  variant,
}: EcommerceSeoResultsProps) {
  return (
    <section
      className={`ft-ecommerce-seo-results${variant === 'ai' ? ' ft-ecommerce-seo-results--ai' : ''}`}
      aria-labelledby="ft-ecommerce-seo-results-title"
    >
      <div className="ft-ecommerce-seo-results__container">
        <div className="ft-ecommerce-seo-results__header">
          <p className="ft-ecommerce-seo-results__eyebrow">
            {eyebrow}
          </p>

          <h2
            className="ft-ecommerce-seo-results__title"
            id="ft-ecommerce-seo-results-title"
          >
            {title}
          </h2>
        </div>

        <div className="ft-ecommerce-seo-results__cards">
          {resultItems.map((result) => (
            <article
              className="ft-ecommerce-seo-results__card"
              key={result.title}
            >
              <span className="ft-ecommerce-seo-results__stat">
                {result.stat}
              </span>

              <div className="ft-ecommerce-seo-results__card-content">
                <h3 className="ft-ecommerce-seo-results__card-title">
                  {result.title}
                </h3>

                <p className="ft-ecommerce-seo-results__description">
                  {result.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}