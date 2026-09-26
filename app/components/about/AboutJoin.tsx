const VACANCIES = [
  {
    title: 'Senior Full-Stack & Next.js Architect',
    type: 'Full-time / Remote',
    href: '/contact?subject=Careers%20-%20Senior%20Full-Stack%20Architect',
  },
  {
    title: 'Lead AI Systems & LLM Workflow Engineer',
    type: 'Full-time / Remote',
    href: '/contact?subject=Careers%20-%20Lead%20AI%20Engineer',
  },
  {
    title: 'Principal Shopify Plus & Headless Developer',
    type: 'Full-time / Remote',
    href: '/contact?subject=Careers%20-%20Principal%20Shopify%20Developer',
  },
  {
    title: 'Conversion Rate Optimization (CRO) Specialist',
    type: 'Full-time / Remote',
    href: '/contact?subject=Careers%20-%20CRO%20Specialist',
  },
  {
    title: 'Cloud Infrastructure & DevOps Engineer (AWS / Cloudflare)',
    type: 'Full-time / Remote',
    href: '/contact?subject=Careers%20-%20Cloud%20DevOps%20Engineer',
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
              Build the Future of
              <br />
              Commerce &amp; Software With Us
            </h2>
          </div>

          {/* RIGHT */}
          <div className="ft-about-join__right">
            <div className="ft-about-join__header">
              <h3 className="ft-about-join__header-heading">
                Open Positions
                <span
                  className="ft-about-join__status-dot"
                  aria-hidden="true"
                >
                  <span className="ft-about-join__status-dot-inner" />
                </span>
              </h3>

              <a
                href="/contact?subject=Careers"
                className="ft-about-join__all-jobs"
              >
                Apply Directly

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
                href="/contact?subject=Careers"
                className="ft-about-join__footer-button"
              >
                Apply Directly

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