import {Suspense, useState, type FormEvent} from 'react';
import {Await, NavLink} from 'react-router';

import type {
  FooterQuery,
  HeaderQuery,
} from 'storefrontapi.generated';
import {normalizeMenuUrl} from '~/lib/normalize-menu-url';

interface FooterProps {
  footer: Promise<FooterQuery | null>;
  header: HeaderQuery;
  publicStoreDomain: string;
}

export function Footer({
  footer,
  header,
  publicStoreDomain,
}: FooterProps) {
  const [openGroup, setOpenGroup] =
    useState<string | null>(null);

  const [newsletterMessage, setNewsletterMessage] =
    useState('');

  function toggleGroup(group: string) {
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
              to="/contact"
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

        <Suspense
          fallback={
            <nav
              className="ft-footer__nav"
              aria-label="Footer"
            />
          }
        >
          <Await resolve={footer}>
            {(footerData) => (
              <FooterNavigation
                footerData={footerData}
                primaryDomainUrl={header.shop.primaryDomain.url}
                publicStoreDomain={publicStoreDomain}
                openGroup={openGroup}
                onToggleGroup={toggleGroup}
              />
            )}
          </Await>
        </Suspense>

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
            <DefaultPolicyLinks />
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
   SHOPIFY FOOTER NAVIGATION
========================================================= */

function FooterNavigation({
  footerData,
  primaryDomainUrl,
  publicStoreDomain,
  openGroup,
  onToggleGroup,
}: {
  footerData: FooterQuery | null;
  primaryDomainUrl: string;
  publicStoreDomain: string;
  openGroup: string | null;
  onToggleGroup: (groupId: string) => void;
}) {
  const groups = (footerData?.menu?.items ?? []).map((group) => ({
    id: group.id,
    title: group.title,
    links: group.items.flatMap((item) =>
      item.url
        ? [
            {
              id: item.id,
              label: item.title,
              href: normalizeMenuUrl(
                item.url,
                primaryDomainUrl,
                publicStoreDomain,
                item.title,
              ),
            },
          ]
        : [],
    ),
  }));

  return (
    <nav className="ft-footer__nav" aria-label="Footer">
      {groups.map((group, index) => {
        const isOpen = openGroup === group.id;
        const panelId = `ft-footer-${group.id.replace(/[^a-zA-Z0-9_-]/g, '-')}`;
        const showSocials = index === groups.length - 1;

        return (
          <div
            className="ft-footer__nav-group"
            key={group.id}
            data-open={isOpen ? 'true' : 'false'}
          >
            <button
              className="ft-footer__nav-title"
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => onToggleGroup(group.id)}
            >
              <span>{group.title}</span>

              <PlusIcon />
            </button>

            <div className="ft-footer__nav-body" id={panelId}>
              <div className="ft-footer__nav-body-inner">
                <ul className="ft-footer__nav-list">
                  {group.links.map((link) => (
                    <li key={link.id}>
                      <NavLink
                        className="ft-footer__nav-link"
                        to={link.href}
                        prefetch={
                          link.href.startsWith('/') ? 'intent' : 'none'
                        }
                      >
                        {link.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>

                {showSocials ? (
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
        className="ft-footer__plus-vertical"
        d="M6 0V12"
        stroke="currentColor"
      />
      <path
        d="M12 6H0"
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
