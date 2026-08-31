import {Link} from 'react-router';

const INNER_TOOLS = [
  {
    name: 'Ahrefs',
    className: 'ft-ecommerce-seo-stack__node--inner-one',
  },
  {
    name: 'Screaming\nFrog',
    className: 'ft-ecommerce-seo-stack__node--inner-two',
  },
] as const;

const OUTER_TOOLS = [
  {
    name: 'Search\nConsole',
    className: 'ft-ecommerce-seo-stack__node--outer-one',
  },
  {
    name: 'GA4',
    className: 'ft-ecommerce-seo-stack__node--outer-two',
  },
  {
    name: 'Semrush',
    className: 'ft-ecommerce-seo-stack__node--outer-three',
  },
  {
    name: 'Clarity',
    className: 'ft-ecommerce-seo-stack__node--outer-four',
  },
  {
    name: 'PeecAI',
    className: 'ft-ecommerce-seo-stack__node--outer-five',
  },
] as const;

export function EcommerceSeoTechStack() {
  return (
    <section
      className="ft-ecommerce-seo-stack"
      aria-labelledby="ft-ecommerce-seo-stack-title"
    >
      <div
        className="ft-ecommerce-seo-stack__glow"
        aria-hidden="true"
      />

      <div className="ft-ecommerce-seo-stack__container">
        <div className="ft-ecommerce-seo-stack__layout">
          <div className="ft-ecommerce-seo-stack__orbit-wrap">
            <div className="ft-ecommerce-seo-stack__orbit">
              <span
                className="ft-ecommerce-seo-stack__ring ft-ecommerce-seo-stack__ring--inner"
                aria-hidden="true"
              />

              <span
                className="ft-ecommerce-seo-stack__ring ft-ecommerce-seo-stack__ring--outer"
                aria-hidden="true"
              />

              <div className="ft-ecommerce-seo-stack__hub">
                <img
                  src="/images/home-partners/shopify.svg"
                  alt="Shopify"
                  className="ft-ecommerce-seo-stack__hub-logo"
                />
              </div>

              <div
                className="ft-ecommerce-seo-stack__track ft-ecommerce-seo-stack__track--inner"
                aria-hidden="true"
              >
                {INNER_TOOLS.map((tool) => (
                  <div
                    key={tool.name}
                    className={`ft-ecommerce-seo-stack__orbit-item ${tool.className}`}
                  >
                    <div className="ft-ecommerce-seo-stack__node ft-ecommerce-seo-stack__node--inner">
                      <span>
                        {tool.name.split('\n').map((line, index) => (
                          <span key={line}>
                            {line}
                            {index === 0 &&
                            tool.name.includes('\n') ? (
                              <br />
                            ) : null}
                          </span>
                        ))}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div
                className="ft-ecommerce-seo-stack__track ft-ecommerce-seo-stack__track--outer"
                aria-hidden="true"
              >
                {OUTER_TOOLS.map((tool) => (
                  <div
                    key={tool.name}
                    className={`ft-ecommerce-seo-stack__orbit-item ${tool.className}`}
                  >
                    <div className="ft-ecommerce-seo-stack__node ft-ecommerce-seo-stack__node--outer">
                      <span>
                        {tool.name.split('\n').map((line, index) => (
                          <span key={line}>
                            {line}
                            {index === 0 &&
                            tool.name.includes('\n') ? (
                              <br />
                            ) : null}
                          </span>
                        ))}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="ft-ecommerce-seo-stack__content">
            <p className="ft-ecommerce-seo-stack__eyebrow">
              Our SEO Tech Stack
            </p>

            <h2
              className="ft-ecommerce-seo-stack__title"
              id="ft-ecommerce-seo-stack-title"
            >
              The Tools Behind Every Ecommerce SEO Campaign
            </h2>

            <p className="ft-ecommerce-seo-stack__description">
              Our ecommerce SEO workflow brings together specialist
              crawling, keyword research, analytics and search performance
              tools. Ahrefs and Semrush support keyword and competitor
              research, while Screaming Frog helps uncover technical issues
              across site architecture, internal links and indexation.
              Google Search Console and GA4 provide first-party search and
              performance data, with Microsoft Clarity adding visibility
              into the customer journey. Together, these tools help turn
              SEO data into clear priorities for technical, content and
              ecommerce optimisation.
            </p>

            <Link
              to="/seo-agency"
              className="ft-ecommerce-seo-stack__cta"
              prefetch="intent"
            >
              <span>Read our Shopify SEO guide</span>

              <svg
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5"
                  stroke="currentColor"
                  strokeWidth="1.1"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}