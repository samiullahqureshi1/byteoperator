import {useEffect,useRef, useState} from 'react';
import {NavLink} from 'react-router';

import type {
  CartApiQueryFragment,
  HeaderQuery,
} from 'storefrontapi.generated';

import {useAside} from '~/components/Aside';
import {normalizeMenuUrl} from '~/lib/normalize-menu-url';
import {resolveCanonicalPath} from '~/lib/route-mappings';

interface HeaderProps {
  header: HeaderQuery;
  cart: Promise<CartApiQueryFragment | null>;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
}

type Viewport = 'desktop' | 'mobile';

const STICKY_SCROLL_POSITION = 45;

export function Header({
  header,
  publicStoreDomain,
}: HeaderProps) {
  const {isSticky, isVisible} = useStickyHeader(
  STICKY_SCROLL_POSITION,
);

  const {shop, menu} = header;

  return (
    <>
      <header
  className={[
    'charle-header',
    isSticky
      ? 'charle-header--sticky'
      : '',
    !isVisible
      ? 'charle-header--scroll-hidden'
      : '',
  ]
    .filter(Boolean)
    .join(' ')}
    data-scroll-hidden={!isVisible ? 'true' : 'false'}
>
        <div className="charle-header__inner">
          <NavLink
  className="charle-header__brand"
  end
  prefetch="intent"
  to="/"
  aria-label="FoldTech homepage"
>
  <img
    className="charle-header__logo"
    src="/images/foldtech-logo.svg"
    alt="FoldTech"
    width="160"
    height="48"
    fetchPriority="high"
  />
</NavLink>

          <HeaderMenu
            menu={menu}
            viewport="desktop"
            primaryDomainUrl={shop.primaryDomain.url}
            publicStoreDomain={publicStoreDomain}
          />

          <NavLink
            className="charle-header__cta"
            prefetch="intent"
            to="/contact"
          >
            <span>Get in touch</span>
            <ArrowUpRightIcon />
          </NavLink>

          <MobileMenuButton />
        </div>
      </header>
    </>
  );
}

const SERVICES_BADGE_COUNT = 15;

export function HeaderMenu({
  menu,
  primaryDomainUrl,
  viewport,
  publicStoreDomain,
}: {
  menu: HeaderProps['header']['menu'];
  primaryDomainUrl: HeaderProps['header']['shop']['primaryDomain']['url'];
  viewport: Viewport;
  publicStoreDomain: HeaderProps['publicStoreDomain'];
}) {
  

  const menuItems =
    menu?.items && menu.items.length > 0
      ? menu.items
      : FALLBACK_HEADER_MENU.items;

  /*
   * ======================================================
   * MOBILE MENU
   * ======================================================
   */

  if (viewport === 'mobile') {
  return (
    <MobileHeaderMenu
      menuItems={menuItems}
      primaryDomainUrl={primaryDomainUrl}
      publicStoreDomain={publicStoreDomain}
    />
  );
}

  /*
   * ======================================================
   * DESKTOP MENU
   * ======================================================
   */

  return (
    <nav
      className="charle-header__navigation"
      aria-label="Main navigation"
    >
      {menuItems.map((item) => {
        if (!item.url) return null;

        const url = normalizeMenuUrl(
          item.url,
          primaryDomainUrl,
          publicStoreDomain,
          item.title,
        );

        const normalizedTitle =
          item.title.trim().toLowerCase();

        const isServices =
          normalizedTitle === 'services';

        const isResources =
          normalizedTitle === 'resources';

        const hasMegaMenu =
          isServices || isResources;

        return (
          <div
            className={`charle-header__nav-item ${
              hasMegaMenu
                ? 'charle-header__nav-item--mega'
                : ''
            }`}
            key={item.id}
          >
            <NavLink
              className="charle-header__nav-link"
              end
              prefetch={
                url.startsWith('/')
                  ? 'intent'
                  : 'none'
              }
              to={url}
            >
              <span>{item.title}</span>

              {isServices ? (
                <span
                  className="charle-header__badge"
                  aria-label={`${SERVICES_BADGE_COUNT} services`}
                >
                  {SERVICES_BADGE_COUNT}
                </span>
              ) : null}
            </NavLink>

            {isServices ? (
              <ServicesMegaMenu />
            ) : null}

            {isResources ? (
              <ResourcesMegaMenu />
            ) : null}
          </div>
        );
      })}
    </nav>
  );
}
type MegaLink = {
  title: string;
  description: string;
  url: string;
};

type ServiceMegaColumn = {
  labels: string[];
  items: MegaLink[];
  secondaryTitle?: string;
  secondaryItems?: MegaLink[];
};


/*
 * ========================================================
 * SERVICES MEGA MENU
 * ========================================================
 */

function ServicesMegaMenu() {
  return (
    <div
      className="ft-mega-menu ft-mega-menu--services"
      aria-label="Services"
    >
      <div className="ft-services-mega__grid">
        {SERVICE_MEGA_COLUMNS.map((column) => (
          <div
            className="ft-services-mega__column"
            key={column.labels.join('-')}
          >
            <div className="ft-services-mega__labels">
              {column.labels.map((label) => (
                <span
                  className="ft-services-mega__label"
                  key={label}
                >
                  {label}
                </span>
              ))}
            </div>

            <div className="ft-services-mega__divider" />

            <div className="ft-services-mega__links">
              {column.items.map((link) => (
                <NavLink
                  className="ft-services-mega__link"
                  key={link.title}
                  prefetch={
                    resolveCanonicalPath(link.url).startsWith('/')
                      ? 'intent'
                      : 'none'
                  }
                  to={resolveCanonicalPath(link.url)}
                >
                  <strong>{link.title}</strong>

                  <span>{link.description}</span>
                </NavLink>
              ))}
            </div>

            {column.secondaryTitle &&
            column.secondaryItems ? (
              <div className="ft-services-mega__secondary">
                <div className="ft-services-mega__secondary-title">
                  {column.secondaryTitle}
                </div>

                <div className="ft-services-mega__divider" />

                <div className="ft-services-mega__links">
                  {column.secondaryItems.map(
                    (link) => (
                      <NavLink
                        className="ft-services-mega__link"
                        key={link.title}
                        prefetch="intent"
                        to={resolveCanonicalPath(link.url)}
                      >
                        <strong>
                          {link.title}
                        </strong>

                        <span>
                          {link.description}
                        </span>
                      </NavLink>
                    ),
                  )}
                </div>
              </div>
            ) : null}
          </div>
        ))}
      </div>

      <div className="ft-services-mega__footer">
        <div className="ft-services-mega__footer-content">
          <p className="ft-services-mega__footer-title">
            Ready to tell us about your project?
          </p>

          <p className="ft-services-mega__footer-text">
            FoldTech designs, develops, supports and
            grows Shopify and Shopify Plus stores.
          </p>

          <NavLink
            className="ft-mega-menu__cta"
            prefetch="intent"
            to="/contact"
          >
            <span>Get in touch</span>
            <ArrowUpRightIcon />
          </NavLink>
        </div>

        <div className="ft-services-mega__footer-image">
          <img
            src="/images/mega-menu-team.webp"
            alt="FoldTech team"
            width="720"
            height="400"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </div>
  );
}


/*
 * ========================================================
 * RESOURCES MEGA MENU
 * ========================================================
 */

function ResourcesMegaMenu() {
  return (
    <div
      className="ft-mega-menu ft-mega-menu--resources"
      aria-label="Resources"
    >
      <div className="ft-resources-mega__links">
        {RESOURCE_MEGA_LINKS.map((link) => (
          <NavLink
            className="ft-resources-mega__link"
            key={link.title}
            prefetch="intent"
            to={resolveCanonicalPath(link.url)}
          >
            <strong>{link.title}</strong>

            <span>{link.description}</span>
          </NavLink>
        ))}
      </div>

      <NavLink
        className="ft-resources-mega__featured"
        prefetch="intent"
        to="/blogs/journal"
      >
        <div className="ft-resources-mega__featured-image">
          <img
            src="/images/mega-menu-resources.jpg"
            alt=""
            width="800"
            height="520"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="ft-resources-mega__featured-content">
          <span className="ft-resources-mega__eyebrow">
            Featured article
          </span>

          <strong>
            Explore the latest Shopify insights
          </strong>

          <span className="ft-resources-mega__read">
            Read article
            <ArrowRightIcon />
          </span>
        </div>
      </NavLink>
    </div>
  );
}


/*
 * ========================================================
 * SERVICES DATA
 *
 * IMPORTANT:
 * Change URLs below to your real Shopify page handles.
 * ========================================================
 */

const SERVICE_MEGA_COLUMNS: ServiceMegaColumn[] = [
  {
    labels: ['Search'],
    items: [
      {
        title: 'Shopify SEO',
        description: 'SEO for Shopify stores',
        url: '/pages/seo-agency',
      },
      {
        title: 'Ecommerce SEO',
        description: 'Grow your organic rankings',
        url: '/pages/ecommerce-seo',
      },
      {
        title: 'Ecommerce AI SEO',
        description: 'AI-powered search optimisation',
        url: '/pages/ecommerce-ai-seo',
      },
      {
        title: 'Ecommerce GEO',
        description: 'Generative engine optimisation',
        url: '/pages/ecommerce-geo',
      },
      {
        title: 'Ecommerce SEO Migration',
        description: 'Migrate your SEO content',
        url: '/pages/ecommerce-seo-migrations',
      },
    ],
  },

  {
    labels: ['Launch'],
    items: [
      {
        title: 'Custom Store Project',
        description: 'Design and launch a Shopify store',
        url: '/pages/shopify-development',
      },
      {
        title: 'Shopify Migrations',
        description: 'Move or replatform to Shopify',
        url: '/pages/shopify-migrations',
      },
      {
        title: 'Shopify App Development',
        description: 'Build custom Shopify apps',
        url: '/shopify-app-development/',
      },
      {
        title: 'Integrations',
        description: 'Connect your store to other services',
        url: '/shopify-integrations/',
      },
      {
        title: 'Headless Commerce',
        description: 'Hydrogen and headless solutions',
        url: '/pages/headless-commerce',
      },
    ],
  },

  {
    labels: ['Optimise', 'Support'],
    items: [
      {
        title: 'Conversion Rate Optimisation',
        description: 'Growth-focused store optimisation',
        url: '/pages/conversion-rate-optimisation',
      },
      {
        title: 'Support & Maintenance',
        description: 'Ongoing Shopify technical support',
        url: '/pages/shopify-maintenance',
      },
      {
        title: 'Audits',
        description: 'Design, technical and SEO audits',
        url: '/pages/shopify-audits',
      },
      {
        title: 'Internationalisation',
        description: 'Expand your Shopify store globally',
        url: '/pages/internationalisation',
      },
    ],
  },

  {
    labels: ['Retain'],
    items: [
      {
        title: 'Email & SMS Marketing',
        description: 'Retain and grow customers',
        url: '/pages/email-marketing-agency',
      },
      {
        title: 'Klaviyo Services',
        description: 'Email automation and retention',
        url: '/pages/klaviyo',
      },
    ],

    secondaryTitle: 'More',

    secondaryItems: [
      {
        title: 'B2B',
        description: 'Sell B2B with Shopify',
        url: '/pages/shopify-b2b',
      },
      {
        title: 'Subscriptions',
        description: 'Grow recurring revenue',
        url: '/pages/shopify-subscriptions',
      },
    ],
  },
];


/*
 * ========================================================
 * RESOURCES DATA
 * ========================================================
 */

const RESOURCE_MEGA_LINKS: MegaLink[] = [
  {
    title: 'Articles',
    description: 'Explore our latest articles',
    url: '/blogs/journal',
  },
  {
    title: 'Podcast',
    description: 'Insights and ecommerce conversations',
    url: '/pages/podcast',
  },
  {
    title: 'Webinars',
    description: 'Watch ecommerce sessions',
    url: '/pages/webinars',
  },
  {
    title: 'Guides',
    description: 'Download useful ecommerce guides',
    url: '/pages/guides',
  },
  {
    title: 'Join Our Newsletter',
    description: 'Get weekly ecommerce insights',
    url: '/pages/newsletter',
  },
];


/*
 * ========================================================
 * EXTRA ICONS
 * ========================================================
 */

function ArrowRightIcon() {
  return (
    <svg
      aria-hidden="true"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
    >
      <path
        d="M2 7H12"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />

      <path
        d="M8.5 3.5L12 7L8.5 10.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
type MobileMenuView =
  | 'main'
  | 'services'
  | 'resources';

type MobileMenuItem = {
  id: string;
  title: string;
  url?: string | null;
};

function MobileHeaderMenu({
  menuItems,
  primaryDomainUrl,
  publicStoreDomain,
}: {
  menuItems: MobileMenuItem[];
  primaryDomainUrl: string;
  publicStoreDomain: string;
}) {
  const {close} = useAside();

  const [view, setView] =
    useState<MobileMenuView>('main');

  const servicesPageItem = menuItems.find(
    (item) =>
      item.url &&
      item.title.trim().toLowerCase() === 'services',
  );

  const servicesPageUrl = servicesPageItem?.url
    ? normalizeMenuUrl(
        servicesPageItem.url,
        primaryDomainUrl,
        publicStoreDomain,
        servicesPageItem.title,
      )
    : '/services';

  const closeMenu = () => {
    setView('main');
    close();
  };

  const openServices = () => {
    setView('services');
  };

  const openResources = () => {
    setView('resources');
  };

  const backToMain = () => {
    setView('main');
  };

  return (
    <nav
       id="foldtech-mobile-menu"
  className="charle-mobile-nav"
  aria-label="Mobile navigation"
    >
      <div
        className="charle-mobile-nav__viewport"
        data-view={view}
      >
        {/* =========================================
            MAIN MOBILE MENU
        ========================================== */}

        <section
          className="
            ft-mobile-panel
            ft-mobile-panel--main
          "
          aria-hidden={view !== 'main'}
        >
          <div className="ft-mobile-panel__inner">
            <div className="ft-mobile-menu__card">
              <MobileMenuTopbar
                onClose={closeMenu}
              />

              <div className="ft-mobile-menu__links">
                {menuItems.map((item) => {
                  if (!item.url) return null;

                  const url = normalizeMenuUrl(
                    item.url,
                    primaryDomainUrl,
                    publicStoreDomain,
                    item.title,
                  );

                  const title =
                    item.title
                      .trim()
                      .toLowerCase();

                  const isServices =
                    title === 'services';

                  const isResources =
                    title === 'resources';

                  if (isServices) {
                    return (
                      <button
                        className="
                          ft-mobile-menu__link
                          ft-mobile-menu__link--button
                        "
                        key={item.id}
                        type="button"
                        onClick={openServices}
                      >
                        <span className="ft-mobile-menu__link-label">
                          {item.title}

                          <span
                            className="ft-mobile-menu__badge"
                            aria-hidden="true"
                          >
                            {SERVICES_BADGE_COUNT}
                          </span>
                        </span>
                      </button>
                    );
                  }

                  if (isResources) {
                    return (
                      <button
                        className="
                          ft-mobile-menu__link
                          ft-mobile-menu__link--button
                        "
                        key={item.id}
                        type="button"
                        onClick={openResources}
                      >
                        <span>
                          {item.title}
                        </span>
                      </button>
                    );
                  }

                  return (
                    <NavLink
                      className="ft-mobile-menu__link"
                      end
                      key={item.id}
                      onClick={closeMenu}
                      prefetch={
                        url.startsWith('/')
                          ? 'intent'
                          : 'none'
                      }
                      to={url}
                    >
                      {item.title}
                    </NavLink>
                  );
                })}
              </div>
            </div>

            <MobileMenuFooter
              onNavigate={closeMenu}
            />
          </div>
        </section>

        {/* =========================================
            SERVICES PANEL
        ========================================== */}

        <section
          className="
            ft-mobile-panel
            ft-mobile-panel--services
          "
          aria-hidden={view !== 'services'}
        >
          <div className="ft-mobile-panel__inner">
            <div className="ft-mobile-menu__card">
              <MobileMenuTopbar
                onClose={closeMenu}
              />

              <div className="ft-mobile-submenu__heading">
                <button
                  className="ft-mobile-submenu__back"
                  type="button"
                  aria-label="Back to main navigation"
                  onClick={backToMain}
                >
                  <BackIcon />
                </button>

                <h2>
                  <NavLink
                    className="ft-mobile-submenu__title-link"
                    to={servicesPageUrl}
                    prefetch={
                      servicesPageUrl.startsWith('/')
                        ? 'intent'
                        : 'none'
                    }
                    onClick={closeMenu}
                  >
                    Services

                    <span
                      className="ft-mobile-submenu__badge"
                      aria-hidden="true"
                    >
                      {SERVICES_BADGE_COUNT}
                    </span>
                  </NavLink>
                </h2>
              </div>

              <div className="ft-mobile-services">
                {SERVICE_MEGA_COLUMNS.map(
                  (column, index) => (
                    <section
                      className="ft-mobile-services__group"
                      key={`${column.labels.join(
                        '-',
                      )}-${index}`}
                    >
                      <div className="ft-mobile-services__labels">
                        {column.labels.map(
                          (label) => (
                            <span
                              className="ft-mobile-services__label"
                              key={label}
                            >
                              {label}
                            </span>
                          ),
                        )}
                      </div>

                      <div className="ft-mobile-services__divider" />

                      <div className="ft-mobile-services__links">
                        {column.items.map(
                          (link) => (
                            <NavLink
                              className="ft-mobile-services__link"
                              key={link.title}
                              to={resolveCanonicalPath(link.url)}
                              prefetch={
                                resolveCanonicalPath(link.url).startsWith('/')
                                  ? 'intent'
                                  : 'none'
                              }
                              onClick={closeMenu}
                            >
                              <strong>
                                {link.title}
                              </strong>

                              <span>
                                {
                                  link.description
                                }
                              </span>
                            </NavLink>
                          ),
                        )}
                      </div>

                      {column.secondaryTitle &&
                      column.secondaryItems ? (
                        <div className="ft-mobile-services__secondary">
                          <h3>
                            {
                              column.secondaryTitle
                            }
                          </h3>

                          <div className="ft-mobile-services__divider" />

                          <div className="ft-mobile-services__links">
                            {column.secondaryItems.map(
                              (link) => (
                                <NavLink
                                  className="ft-mobile-services__link"
                                  key={
                                    link.title
                                  }
                                  to={resolveCanonicalPath(link.url)}
                                  prefetch="intent"
                                  onClick={
                                    closeMenu
                                  }
                                >
                                  <strong>
                                    {
                                      link.title
                                    }
                                  </strong>

                                  <span>
                                    {
                                      link.description
                                    }
                                  </span>
                                </NavLink>
                              ),
                            )}
                          </div>
                        </div>
                      ) : null}
                    </section>
                  ),
                )}
              </div>
            </div>

            <MobileMenuFooter
              onNavigate={closeMenu}
            />
          </div>
        </section>

        {/* =========================================
            RESOURCES PANEL
        ========================================== */}

        <section
          className="
            ft-mobile-panel
            ft-mobile-panel--resources
          "
          aria-hidden={view !== 'resources'}
        >
          <div className="ft-mobile-panel__inner">
            <div className="ft-mobile-menu__card">
              <MobileMenuTopbar
                onClose={closeMenu}
              />

              <div className="ft-mobile-submenu__heading">
                <button
                  className="ft-mobile-submenu__back"
                  type="button"
                  aria-label="Back to main navigation"
                  onClick={backToMain}
                >
                  <BackIcon />
                </button>

                <h2>Resources</h2>
              </div>

              <div className="ft-mobile-resources__links">
                {RESOURCE_MEGA_LINKS.map(
                  (link) => (
                    <NavLink
                      className="ft-mobile-resources__link"
                      key={link.title}
                      to={resolveCanonicalPath(link.url)}
                      prefetch="intent"
                      onClick={closeMenu}
                    >
                      <strong>
                        {link.title}
                      </strong>

                      <span>
                        {link.description}
                      </span>
                    </NavLink>
                  ),
                )}
              </div>

              {/* <NavLink
                className="ft-mobile-resources__featured test"
                to="/blogs/journal"
                prefetch="intent"
                onClick={closeMenu}
              >
                <div className="ft-mobile-resources__image">
                  <img
                    src="/images/mega-menu-resources.webp"
                    alt=""
                    width="720"
                    height="420"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <div className="ft-mobile-resources__featured-content">
                  <span>
                    Featured article
                  </span>

                  <strong>
                    Explore the latest Shopify
                    insights
                  </strong>

                  <small>
                    Read article →
                  </small>
                </div>
              </NavLink> */}
            </div>

            <MobileMenuFooter
              onNavigate={closeMenu}
            />
          </div>
        </section>
      </div>
    </nav>
  );
}


/* =========================================
   MOBILE TOP BAR
========================================= */

function MobileMenuTopbar({
  onClose,
}: {
  onClose: () => void;
}) {
  return (
    <div className="ft-mobile-menu__topbar">
      <NavLink
        className="ft-mobile-menu__logo"
        to="/"
        prefetch="intent"
        onClick={onClose}
        aria-label="FoldTech homepage"
      >
        <img
          src="/images/foldtech-logo.svg"
          alt="FoldTech"
          width="160"
          height="48"
        />
      </NavLink>

      <MobileMenuButton />
    </div>
  );
}


/* =========================================
   MOBILE BOTTOM CTA
========================================= */

function MobileMenuFooter({
  onNavigate,
}: {
  onNavigate: () => void;
}) {
  return (
    <div className="ft-mobile-menu__footer">
      <div className="ft-mobile-menu__footer-copy">
        <p className="ft-mobile-menu__footer-title">
          Ready to tell us about your project?
        </p>

        <p className="ft-mobile-menu__footer-text">
          FoldTech designs, develops,
          supports and grows Shopify and
          Shopify Plus stores.
        </p>

        <NavLink
          className="ft-mobile-menu__footer-cta"
          to="/contact"
          prefetch="intent"
          onClick={onNavigate}
        >
          <span>Get in touch</span>

          <ArrowUpRightIcon />
        </NavLink>
      </div>

      <div className="ft-mobile-menu__footer-image">
        <img
          src="/images/mega-menu-team.webp"
          alt="FoldTech team"
          width="720"
          height="400"
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  );
}


/* =========================================
   BACK ICON
========================================= */

function BackIcon() {
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
    >
      <path
        d="M15 9H3"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />

      <path
        d="M7.5 4.5L3 9L7.5 13.5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function MobileMenuButton() {
  const {open, close, type} = useAside();

  const isMobileMenuOpen = type === 'mobile';

  const handleClick = () => {
    if (isMobileMenuOpen) {
      close();
      return;
    }

    open('mobile');
  };

  return (
    <button
      className={`charle-header__mobile-button ${
        isMobileMenuOpen
          ? 'charle-header__mobile-button--open'
          : ''
      }`}
      type="button"
      aria-label={
        isMobileMenuOpen
          ? 'Close navigation menu'
          : 'Open navigation menu'
      }
      aria-expanded={isMobileMenuOpen}
      aria-controls="foldtech-mobile-menu"
      onClick={handleClick}
    >
      <span aria-hidden="true" />
      <span aria-hidden="true" />
    </button>
  );
}

function useStickyHeader(threshold: number) {
  const [headerState, setHeaderState] = useState({
    isSticky: false,
    isVisible: true,
  });

  const lastScrollY = useRef(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      const directionTolerance =
        window.innerHeight * 0.002;

      const scrollDifference =
        currentScrollY - lastScrollY.current;

      if (
        Math.abs(scrollDifference) <
        directionTolerance
      ) {
        return;
      }

      const isAtTop =
        currentScrollY <= threshold;

      const isScrollingUp =
        scrollDifference < 0;

      setHeaderState((current) => {
        const nextState = {
          isSticky: !isAtTop,
          isVisible:
            isAtTop || isScrollingUp,
        };

        if (
          current.isSticky === nextState.isSticky &&
          current.isVisible === nextState.isVisible
        ) {
          return current;
        }

        return nextState;
      });

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener(
      'scroll',
      handleScroll,
      {passive: true},
    );

    handleScroll();

    return () => {
      window.removeEventListener(
        'scroll',
        handleScroll,
      );
    };
  }, [threshold]);

  return headerState;
}

function ArrowUpRightIcon() {
  return (
    <svg
      aria-hidden="true"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 10L10 4M5 4H10V9"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const FALLBACK_HEADER_MENU = {
  items: [
    {
      id: 'our-work',
      resourceId: null,
      tags: [],
      title: 'Our Work',
      type: 'HTTP',
      url: '/pages/our-work',
      items: [],
    },
    {
      id: 'services',
      resourceId: null,
      tags: [],
      title: 'Services',
      type: 'HTTP',
      url: '/pages/services',
      items: [],
    },
    {
      id: 'ai',
      resourceId: null,
      tags: [],
      title: 'AI',
      type: 'HTTP',
      url: '/pages/ai',
      items: [],
    },
    {
      id: 'about',
      resourceId: null,
      tags: [],
      title: 'About us',
      type: 'HTTP',
      url: '/pages/about',
      items: [],
    },
    {
      id: 'resources',
      resourceId: null,
      tags: [],
      title: 'Resources',
      type: 'HTTP',
      url: '/blogs/journal',
      items: [],
    },
    {
      id: 'contact',
      resourceId: null,
      tags: [],
      title: 'Contact',
      type: 'HTTP',
      url: '/pages/contact',
      items: [],
    },
  ],
};
