import {Suspense, useState, type FormEvent} from 'react';
import {Await, NavLink} from 'react-router';

import type {
  FooterQuery,
  HeaderQuery,
} from 'storefrontapi.generated';

interface FooterProps {
  footer: Promise<FooterQuery | null>;
  header: HeaderQuery;
  publicStoreDomain: string;
}

type FooterGroupKey =
  | 'services'
  | 'solutions'
  | 'company'
  | 'contact';

const FOOTER_GROUPS = {
  services: {
    title: 'Services',
    links: [
      {
        label: 'All Services',
        to: '/pages/services',
      },
      {
        label: 'Shopify Development',
        to: '/pages/shopify-development',
      },
      {
        label: 'Shopify Migrations',
        to: '/pages/shopify-migrations',
      },
      {
        label: 'App Development',
        to: '/pages/shopify-app-development',
      },
      {
        label: 'Shopify SEO',
        to: '/pages/shopify-seo',
      },
      {
        label: 'Email & SMS Marketing',
        to: '/pages/email-sms-marketing',
      },
      {
        label: 'CRO',
        to: '/pages/conversion-rate-optimisation',
      },
      {
        label: 'Support & Maintenance',
        to: '/pages/shopify-maintenance',
      },
    ],
  },

  solutions: {
    title: 'Solutions',
    links: [
      {
        label: 'Internationalisation',
        to: '/pages/internationalisation',
      },
      {
        label: 'Headless Commerce',
        to: '/pages/headless-commerce',
      },
      {
        label: 'Custom Shopify Themes',
        to: '/pages/shopify-development',
      },
      {
        label: 'Shopify App Development',
        to: '/pages/shopify-app-development',
      },
      {
        label: 'Conversion Optimisation',
        to: '/pages/conversion-rate-optimisation',
      },
      {
        label: 'Ecommerce SEO',
        to: '/pages/shopify-seo',
      },
    ],
  },

  company: {
    title: 'Company',
    links: [
      {
        label: 'About Us',
        to: '/pages/about',
      },
      {
        label: 'Our Work',
        to: '/pages/case-studies',
      },
      {
        label: 'Services',
        to: '/pages/services',
      },
      {
        label: 'Contact',
        to: '/pages/contact',
      },
    ],
  },

  contact: {
    title: 'Get In Touch',
    links: [
      {
        label: 'Start a Project',
        to: '/pages/contact',
      },
      {
        label: 'Talk to FoldTech',
        to: '/pages/contact',
      },
    ],
  },
} as const;

export function Footer({
  footer,
  publicStoreDomain,
}: FooterProps) {
  const [openGroup, setOpenGroup] =
    useState<FooterGroupKey | null>(null);

  const [newsletterMessage, setNewsletterMessage] =
    useState('');

  function toggleGroup(group: FooterGroupKey) {
    setOpenGroup((current) =>
      current === group ? null : group,
    );
  }

  function handleNewsletterSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    /*
     * FoldTech does not currently have a newsletter
     * subscription backend connected.
     */
    setNewsletterMessage(
      'Newsletter signup is being connected.',
    );
  }

  return (
    <footer className="ft-footer">
      <div className="ft-footer__background" />

      <div className="ft-footer__container">
        {/* =================================================
            TOP HERO
        ================================================= */}

        <div className="ft-footer__hero">
          <div className="ft-footer__hero-left">
            <h2 className="ft-footer__heading">
              <span>Let&apos;s talk</span>

              <em>ecommerce.</em>
            </h2>

            <NavLink
              className="ft-footer__primary-cta"
              to="/pages/contact"
              prefetch="intent"
            >
              <span>Get in touch</span>

              <DiagonalArrow />
            </NavLink>
           
          </div>

          <div className="ft-footer__hero-right">
            <p className="ft-footer__newsletter-label">
              Get ecommerce insights, tips &amp; trends
              straight to your inbox.
            </p>

            <form
              className="ft-footer__newsletter"
              onSubmit={handleNewsletterSubmit}
            >
              <label
                className="ft-footer__sr-only"
                htmlFor="ft-footer-email"
              >
                Email address
              </label>

              <input
                className="ft-footer__newsletter-input"
                id="ft-footer-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Your email address"
                required
              />

              <button
                className="ft-footer__newsletter-button"
                type="submit"
              >
                Subscribe
              </button>
            </form>

            {newsletterMessage ? (
              <p
                className="ft-footer__newsletter-message"
                role="status"
              >
                {newsletterMessage}
              </p>
            ) : null}
          </div>
        </div>

        {/* =================================================
            FOOTER NAVIGATION
        ================================================= */}

        <nav
          className="ft-footer__nav"
          aria-label="Footer"
        >
          {(
            Object.entries(
              FOOTER_GROUPS,
            ) as Array<
              [
                FooterGroupKey,
                (typeof FOOTER_GROUPS)[FooterGroupKey],
              ]
            >
          ).map(([key, group]) => {
            const isOpen = openGroup === key;

            return (
              <div
                className="ft-footer__nav-group"
                key={key}
                data-open={isOpen ? 'true' : 'false'}
              >
                <button
                  className="ft-footer__nav-title"
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`ft-footer-${key}`}
                  onClick={() => toggleGroup(key)}
                >
                  <span>{group.title}</span>

                  <PlusIcon />
                </button>

                <div
                  className="ft-footer__nav-body"
                  id={`ft-footer-${key}`}
                >
                  <div className="ft-footer__nav-body-inner">
                    <ul className="ft-footer__nav-list">
                      {group.links.map((link) => (
                        <li key={`${key}-${link.label}`}>
                          <NavLink
                            className="ft-footer__nav-link"
                            to={link.to}
                            prefetch="intent"
                          >
                            {link.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="ft-footer__nav-body-inner">
  <ul className="ft-footer__nav-list">
    {group.links.map((link) => (
      <li key={`${key}-${link.label}`}>
        <NavLink
          className="ft-footer__nav-link"
          to={link.to}
          prefetch="intent"
        >
          {link.label}
        </NavLink>
      </li>
    ))}
  </ul>

  {key === 'contact' ? (
    <div className="ft-footer__socials ft-footer__socials--nav">
      <span
        className="ft-footer__social"
        aria-label="Instagram"
        role="img"
      >
        <InstagramIcon />
      </span>

      <span
        className="ft-footer__social"
        aria-label="LinkedIn"
        role="img"
      >
        <LinkedInIcon />
      </span>

      <span
        className="ft-footer__social"
        aria-label="TikTok"
        role="img"
      >
        <TikTokIcon />
      </span>

      <span
        className="ft-footer__social"
        aria-label="YouTube"
        role="img"
      >
        <YouTubeIcon />
      </span>
    </div>
  ) : null}
</div>
                </div>
              </div>
            );
          })}
        </nav>

        {/* =================================================
            BOTTOM BAR
        ================================================= */}

        <div className="ft-footer__bottom">
          <div className="ft-footer__bottom-left">
            <NavLink
              className="ft-footer__logo"
              to="/"
              aria-label="FoldTech home"
            >
              <img
                src="/images/foldtech-logo.svg"
                alt="FoldTech"
                loading="lazy"
                decoding="async"
              />
            </NavLink>

            <p className="ft-footer__copyright">
              © {new Date().getFullYear()} FoldTech.
              All rights reserved.
            </p>
          </div>

          <div className="ft-footer__bottom-right">
            <Suspense
              fallback={
                <DefaultPolicyLinks />
              }
            >
              <Await resolve={footer}>
                {(footerData) => (
                  <PolicyLinks
                    footerData={footerData}
                    publicStoreDomain={
                      publicStoreDomain
                    }
                  />
                )}
              </Await>
            </Suspense>
            <div className="ft-footer__socials ft-footer__socials--bottom">
  <span className="ft-footer__social" aria-label="Instagram" role="img">
    <InstagramIcon />
  </span>

  <span className="ft-footer__social" aria-label="LinkedIn" role="img">
    <LinkedInIcon />
  </span>

  <span className="ft-footer__social" aria-label="TikTok" role="img">
    <TikTokIcon />
  </span>

  <span className="ft-footer__social" aria-label="YouTube" role="img">
    <YouTubeIcon />
  </span>
</div>
          </div>
        </div>
      </div>
    </footer>
  );
}


/* =========================================================
   SHOPIFY POLICY MENU
========================================================= */

function PolicyLinks({
  footerData,
  publicStoreDomain,
}: {
  footerData: FooterQuery | null;
  publicStoreDomain: string;
}) {
  const items =
    footerData?.menu?.items ?? [];

  const privacy = items.find((item) =>
    item.title
      .toLowerCase()
      .includes('privacy'),
  );

  const terms = items.find((item) =>
    item.title
      .toLowerCase()
      .includes('terms'),
  );

  return (
    <>
      {privacy?.url ? (
        <NavLink
          className="ft-footer__bottom-link"
          to={normalizeMenuUrl(
            privacy.url,
            publicStoreDomain,
          )}
        >
          Privacy
        </NavLink>
      ) : (
        <NavLink
          className="ft-footer__bottom-link"
          to="/policies/privacy-policy"
        >
          Privacy
        </NavLink>
      )}

      {terms?.url ? (
        <NavLink
          className="ft-footer__bottom-link"
          to={normalizeMenuUrl(
            terms.url,
            publicStoreDomain,
          )}
        >
          Terms
        </NavLink>
      ) : (
        <NavLink
          className="ft-footer__bottom-link"
          to="/policies/terms-of-service"
        >
          Terms
        </NavLink>
      )}
    </>
  );
}


function DefaultPolicyLinks() {
  return (
    <>
      <NavLink
        className="ft-footer__bottom-link"
        to="/policies/privacy-policy"
      >
        Privacy
      </NavLink>

      <NavLink
        className="ft-footer__bottom-link"
        to="/policies/terms-of-service"
      >
        Terms
      </NavLink>
    </>
  );
}


/* =========================================================
   NORMALISE SHOPIFY MENU URL
========================================================= */

function normalizeMenuUrl(
  url: string,
  publicStoreDomain: string,
) {
  try {
    const parsedUrl = new URL(url);

    const storeDomain =
      publicStoreDomain
        .replace(/^https?:\/\//, '')
        .replace(/\/$/, '');

    if (
      parsedUrl.host === storeDomain ||
      parsedUrl.host.endsWith(
        '.myshopify.com',
      )
    ) {
      return `${parsedUrl.pathname}${parsedUrl.search}${parsedUrl.hash}`;
    }
  } catch {
    return url;
  }

  return url;
}


/* =========================================================
   ICONS
========================================================= */

function DiagonalArrow() {
  return (
    <svg
      className="ft-footer__cta-arrow"
      viewBox="0 0 10 10"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M0.89 9.243L9.373 0.757M9.373 0.757H1.596M9.373 0.757V8.536"
        stroke="currentColor"
      />
    </svg>
  );
}


function PlusIcon() {
  return (
    <svg
      className="ft-footer__plus"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 0V12M12 6H0"
        stroke="currentColor"
      />
    </svg>
  );
}
function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="2"
        y="2"
        width="20"
        height="20"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      <circle
        cx="12"
        cy="12"
        r="5"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      <circle
        cx="17.5"
        cy="6.5"
        r="1"
        fill="currentColor"
      />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <rect
        x="2"
        y="9"
        width="4"
        height="12"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      <circle
        cx="4"
        cy="4"
        r="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="m9.75 15.02 5.75-3.27-5.75-3.27v6.54Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}