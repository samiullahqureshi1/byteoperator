import {useState} from 'react';

export type ArticleFilter =
  | 'all'
  | 'cro'
  | 'platform'
  | 'apps'
  | 'seo'
  | 'marketing'
  | 'email';

type ArticlesIntroProps = {
  activeFilter?: ArticleFilter;
  onFilterChange?: (filter: ArticleFilter) => void;
};

const FILTERS: Array<{
  label: string;
  value: ArticleFilter;
}> = [
  {
    label: 'All',
    value: 'all',
  },
  {
    label: 'CRO & Growth',
    value: 'cro',
  },
  {
    label: 'Platform',
    value: 'platform',
  },
  {
    label: 'Apps & Tools',
    value: 'apps',
  },
  {
    label: 'SEO',
    value: 'seo',
  },
  {
    label: 'Marketing',
    value: 'marketing',
  },
  {
    label: 'Email & SMS',
    value: 'email',
  },
];

export function ArticlesIntro({
  activeFilter: controlledFilter,
  onFilterChange,
}: ArticlesIntroProps) {
  const [internalFilter, setInternalFilter] =
    useState<ArticleFilter>('all');

  const [email, setEmail] = useState('');
  const [newsletterState, setNewsletterState] = useState<
    'idle' | 'success' | 'error'
  >('idle');

  const activeFilter = controlledFilter ?? internalFilter;

  const handleFilter = (filter: ArticleFilter) => {
    if (onFilterChange) {
      onFilterChange(filter);
    } else {
      setInternalFilter(filter);
    }
  };

  const handleNewsletterSubmit = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!email.trim()) {
      setNewsletterState('error');
      return;
    }

    /*
     * Temporary UI behaviour only.
     * Existing newsletter provider/action can be connected later
     * without changing this layout.
     */
    setNewsletterState('success');
  };

  return (
    <section
      className="ft-articles-intro"
      aria-labelledby="ft-articles-title"
    >
      <div className="ft-articles-intro__gradient" />

      <div className="ft-articles-intro__container">
        <div className="ft-articles-intro__header-row">
          <div className="ft-articles-intro__heading-wrap">
            <h1
              id="ft-articles-title"
              className="ft-articles-intro__title"
            >
              Articles
              <span>
                {' '}
                — Ecommerce insights that move the needle
              </span>
            </h1>
          </div>

          <aside
            className="ft-articles-newsletter"
            aria-labelledby="ft-articles-newsletter-title"
          >
            <p
              id="ft-articles-newsletter-title"
              className="ft-articles-newsletter__heading"
            >
              Get Notified
            </p>

            <p className="ft-articles-newsletter__sub">
              Weekly ecommerce insights on Shopify, SEO, CRO and growth.
            </p>

            <form
              className="ft-articles-newsletter__form"
              onSubmit={handleNewsletterSubmit}
            >
              <label
                className="ft-visually-hidden"
                htmlFor="ft-articles-newsletter-email"
              >
                Email address
              </label>

              <input
                id="ft-articles-newsletter-email"
                type="email"
                className="ft-articles-newsletter__input"
                placeholder="Your email address"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);

                  if (newsletterState !== 'idle') {
                    setNewsletterState('idle');
                  }
                }}
              />

              <button
                type="submit"
                className="ft-articles-newsletter__btn"
              >
                Subscribe
              </button>
            </form>

            {newsletterState === 'success' ? (
              <p className="ft-articles-newsletter__msg ft-articles-newsletter__msg--success">
                You&apos;re in — let&apos;s get growing.
              </p>
            ) : null}

            {newsletterState === 'error' ? (
              <p className="ft-articles-newsletter__msg ft-articles-newsletter__msg--error">
                Please enter a valid email address.
              </p>
            ) : null}

            <p className="ft-articles-newsletter__privacy">
              <a href="/policies/privacy-policy">
                Privacy Policy
              </a>{' '}
              applies.
            </p>
          </aside>
        </div>

        <div
          className="ft-articles-controls"
          role="group"
          aria-label="Article categories"
        >
          <ul className="ft-article-filters">
            {FILTERS.map((filter) => {
              const isActive =
                activeFilter === filter.value;

              return (
                <li
                  className="ft-article-filters__item"
                  key={filter.value}
                >
                  <button
                    type="button"
                    className={`ft-article-filters__link${
                      isActive ? ' is-active' : ''
                    }`}
                    aria-pressed={isActive}
                    onClick={() =>
                      handleFilter(filter.value)
                    }
                  >
                    {filter.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}