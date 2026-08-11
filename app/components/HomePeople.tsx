import {Link} from 'react-router';

export function HomePeople() {
  return (
    <section
      className="ft-home-people"
      aria-labelledby="ft-home-people-title"
    >
      <div className="ft-home-people__container">
        <div className="ft-home-people__image">
          <img
            src="/images/home-people/people.jpeg"
            alt="FoldTech team working together"
            width="1668"
            height="700"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="ft-home-people__inner">
          <div className="ft-home-people__left">
            <p className="ft-home-people__subtitle">
              Creative, Technical &amp; Strategic
            </p>

            <h2
              className="ft-home-people__title"
              id="ft-home-people-title"
            >
              People-first
              <br />
              Shopify agency
            </h2>
          </div>

          <div className="ft-home-people__right">
            <p className="ft-home-people__description">
              A Shopify team focused on design,
              development, SEO and growth, helping
              ecommerce brands plan, build and improve
              better online stores.
            </p>

            <Link
              className="ft-home-people__button"
              to="/pages/about"
              prefetch="intent"
            >
              <span>Our Story</span>

              <svg
                className="ft-home-people__button-arrow"
                viewBox="0 0 13 12"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M0 6H12M12 6L6.5 0.5M12 6L6.5 11.5"
                  stroke="currentColor"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}