const VACANCIES = [
  {
    title: 'Example Vacancy',
    type: 'Hybrid / Remote',
    href: '/careers/',
  },
] as const;

export function AboutJoin() {
  return (
    <section
      className="ft-about-join"
      aria-labelledby="ft-about-join-title"
    >
      <div className="ft-about-join__container">
        <div className="ft-about-join__inner">
          {/* LEFT */}
          <div className="ft-about-join__left">
            <h2
              id="ft-about-join-title"
              className="ft-about-join__heading"
            >
              Fancy joining the
              <br />
              FoldTech Team?
            </h2>
          </div>

          {/* RIGHT */}
          <div className="ft-about-join__right">
            <div className="ft-about-join__header">
              <h3 className="ft-about-join__header-heading">
                Current vacancies

                <span
                  className="ft-about-join__status-dot"
                  aria-label="Vacancies available"
                >
                  <span className="ft-about-join__status-dot-inner" />
                </span>
              </h3>

              <a
                href="/careers/"
                className="ft-about-join__all-jobs"
              >
                See all our jobs

                <svg
                  viewBox="0 0 13 12"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M0 6h12m0 0L6.5.5M12 6l-5.5 5.5"
                    stroke="currentColor"
                  />
                </svg>
              </a>
            </div>

            <ul className="ft-about-join__list">
              {VACANCIES.map((vacancy) => (
                <li
                  className="ft-about-join__item"
                  key={vacancy.title}
                >
                  <a
                    href={vacancy.href}
                    className="ft-about-join__link"
                  >
                    <span className="ft-about-join__link-title">
                      {vacancy.title}
                    </span>

                    <span className="ft-about-join__link-type">
                      {vacancy.type}
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="ft-about-join__footer">
              <a
                href="/careers/"
                className="ft-about-join__footer-button"
              >
                See all our jobs

                <svg
                  viewBox="0 0 13 12"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M0 6h12m0 0L6.5.5M12 6l-5.5 5.5"
                    stroke="currentColor"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}