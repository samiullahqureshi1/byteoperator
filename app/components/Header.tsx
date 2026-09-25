'use client';

import {useEffect, useRef, useState} from 'react';
import {NavLink, useLocation} from '~/lib/router-compat';

import type {
  CartApiQueryFragment,
  HeaderQuery,
} from '~/lib/types';

import {useAside} from '~/components/Aside';
import {BULK_HOURS_IMAGE, BULK_HOURS_PATH} from '~/components/BulkHours';
import {normalizeMenuUrl} from '~/lib/normalize-menu-url';
import {resolveCanonicalPath} from '~/lib/route-mappings';

interface HeaderProps {
  header: HeaderQuery;
  cart: Promise<CartApiQueryFragment | null>;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
  variant?: 'default' | 'light';
}

type Viewport = 'desktop' | 'mobile';

const STICKY_SCROLL_POSITION = 45;

export function Header({
  header,
  publicStoreDomain,
  variant = 'default',
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
    variant === 'light'
      ? 'charle-header--light'
      : '',
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
            aria-label="Byte Operator homepage"
          >
            <img
              className="charle-header__logo"
              src="https://cdn.shopify.com/s/files/1/0928/7421/1691/files/final.png?v=1790264655"
              alt="Byte Operator"
              width="240"
              height="60"
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
            to="/contact/"
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

const SERVICES_BADGE_COUNT = 19;

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
  const navRef = useRef<HTMLElement>(null);
  const {pathname} = useLocation();

  /*
   * Client-side navigation keeps focus on the link that was used. If that
   * link is inside a mega menu, keyboard focus would hold the menu open over
   * the new page, so focus is released once the route changes.
   */
  useEffect(() => {
    const active = document.activeElement;

    if (active instanceof HTMLElement && navRef.current?.contains(active)) {
      active.blur();
    }
  }, [pathname]);

  // Escape closes a keyboard-opened menu, as users expect of any popup.
  useEffect(() => {
    const nav = navRef.current;

    if (!nav) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (
        event.key === 'Escape' &&
        document.activeElement instanceof HTMLElement
      ) {
        document.activeElement.blur();
      }
    }

    /*
     * Menus open on hover, so after a link is clicked the pointer is still
     * over the menu and it would stay open on the new page. Mark the item
     * closed until the pointer leaves it (see `data-menu-closed` in
     * header-menus.css).
     */
    function handleClick(event: MouseEvent) {
      const item =
        event.target instanceof Element
          ? event.target
              .closest('a')
              ?.closest<HTMLElement>('.charle-header__nav-item--mega')
          : null;

      if (!item) return;

      item.dataset.menuClosed = '';
      item.addEventListener(
        'mouseleave',
        () => delete item.dataset.menuClosed,
        {once: true},
      );
    }

    nav.addEventListener('keydown', handleKeyDown);
    nav.addEventListener('click', handleClick);

    return () => {
      nav.removeEventListener('keydown', handleKeyDown);
      nav.removeEventListener('click', handleClick);
    };
  }, [viewport]);

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
      ref={navRef}
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

        /*
         * Services and Resources have bespoke mega menus whose contents are
         * authored in this file. Every other item renders whatever children
         * the Software menu supplies, so a submenu added in the admin appears
         * without a code change.
         */
        const submenuItems =
          isServices || isResources
            ? []
            : (item.items ?? []).filter(
                (child) => child.url,
              );

        const hasSubmenu = submenuItems.length > 0;

        const hasMegaMenu =
          isServices || isResources || hasSubmenu;

        return (
          <div
            className={`charle-header__nav-item ${
              hasMegaMenu
                ? 'charle-header__nav-item--mega'
                : ''
            }`}
            key={item.id}
          >
            {isResources ? (
              /*
               * Resources is a menu trigger, not a destination. It keeps
               * the nav-link class so its appearance is unchanged, and
               * stays focusable so the mega menu still opens on keyboard
               * focus via the `:has(:focus-visible)` rule.
               */
              <button
                className="charle-header__nav-link charle-header__nav-link--trigger"
                type="button"
              >
                <span>{item.title}</span>
              </button>
            ) : (
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
                  <span className="charle-header__badge">
                    {SERVICES_BADGE_COUNT}
                  </span>
                ) : null}
              </NavLink>
            )}

            {isServices ? (
              <ServicesMegaMenu />
            ) : null}

            {isResources ? (
              <ResourcesMegaMenu />
            ) : null}

            {hasSubmenu ? (
              <SubMenu
                items={submenuItems}
                primaryDomainUrl={primaryDomainUrl}
                publicStoreDomain={publicStoreDomain}
              />
            ) : null}
          </div>
        );
      })}
    </nav>
  );
}

/**
 * Dropdown for a top-level nav item whose children come straight from the
 * Software menu. It reuses the shared `.ft-mega-menu` element so it inherits
 * the existing hover/focus reveal, pointer bridge and hidden-by-default
 * critical styles; only its internal layout is its own.
 */
function SubMenu({
  items,
  primaryDomainUrl,
  publicStoreDomain,
}: {
  items: MenuChildItem[];
  primaryDomainUrl: string;
  publicStoreDomain: string;
}) {
  return (
    <div className="ft-mega-menu ft-mega-menu--sub">
      <ul className="ft-submenu__list">
        {items.map((child) => {
          if (!child.url) return null;

          const childUrl = normalizeMenuUrl(
            child.url,
            primaryDomainUrl,
            publicStoreDomain,
            child.title,
          );

          return (
            <li key={child.id}>
              <NavLink
                className="ft-submenu__link"
                prefetch={
                  childUrl.startsWith('/')
                    ? 'intent'
                    : 'none'
                }
                to={childUrl}
              >
                {child.title}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
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
      role="group"
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

      <BulkHoursPromo />
    </div>
  );
}


/*
 * ========================================================
 * BULK HOURS PROMO
 * Featured column of the Services menu (desktop), and the
 * card at the bottom of the mobile Services panel.
 * ========================================================
 */

function BulkHoursPromo({onNavigate}: {onNavigate?: () => void}) {
  return (
    <NavLink
      className="ft-bulk-promo"
      prefetch="intent"
      to="/contact/"
      onClick={onNavigate}
    >
      <span className="ft-bulk-promo__image">
        <img
          src="/images/mega-menu-team.webp"
          alt="Byte Operator team"
          aria-hidden="true"
          width={1400}
          height={900}
          loading="lazy"
          decoding="async"
        />
      </span>

      <span className="ft-bulk-promo__content">
        <strong className="ft-bulk-promo__title">Work With Us</strong>
        <span className="ft-bulk-promo__text">
          Ready to scale your software or ecommerce platform? Let's discuss your engineering and growth requirements.
        </span>
        <span className="ft-mega-menu__cta ft-bulk-promo__cta">
          <span>Get in touch</span>
          <ArrowUpRightIcon />
        </span>
      </span>
    </NavLink>
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
      role="group"
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
        to="/articles/"
      >
        <div className="ft-resources-mega__featured-image">
          <img
            src="/images/mega-menu-resources.webp"
            alt="digital platformfront design with annotated page sections"
            aria-hidden="true"
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
            Explore the latest Software insights
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
 * Change URLs below to your real Software page handles.
 * ========================================================
 */

const SERVICE_MEGA_COLUMNS: ServiceMegaColumn[] = [
  {
    labels: ['Software', 'Engineering'],
    items: [
      {
        title: 'Custom Software & Platforms',
        description: 'Bespoke software platforms & scalable web systems',
        url: '/services/software-developers',
      },
      {
        title: 'Full-Stack Web Development',
        description: 'Modern frontend, robust backend APIs & databases',
        url: '/services/software-theme-development-builds',
      },
      {
        title: 'Mobile App Development',
        description: 'Custom iOS, Android & cross-platform apps',
        url: '/services/software-app-development',
      },
      {
        title: 'API & System Integrations',
        description: 'Connect ERP, CRM & third-party architectures',
        url: '/services/software-integrations',
      },
      {
        title: 'Headless & Cloud Architecture',
        description: 'Decoupled, high-performance edge solutions',
        url: '/services/headless-commerce',
      },
    ],
  },

  {
    labels: ['Shopify', 'Ecommerce'],
    items: [
      {
        title: 'Shopify Store Development',
        description: 'High-converting bespoke Shopify storefronts',
        url: '/services/shopify-web-design',
      },
      {
        title: 'Shopify Plus & Enterprise',
        description: 'Scalable architecture for high-volume brands',
        url: '/shopify-plus-agency',
      },
      {
        title: 'Shopify Apps & Extensions',
        description: 'Custom apps, checkout extensions & functions',
        url: '/services/shopify-app-development',
      },
      {
        title: 'Platform Migrations',
        description: 'Seamless replatforming with zero traffic loss',
        url: '/services/shopify-migrations',
      },
      {
        title: 'B2B & Wholesale Systems',
        description: 'Dedicated wholesale pricing & global channels',
        url: '/services/shopify-b2b-wholesale',
      },
    ],
  },

  {
    labels: ['Search', 'AI'],
    items: [
      {
        title: 'Technical SEO & Architecture',
        description: 'Deep technical audits, crawling & indexation',
        url: '/ecommerce-seo-agency',
      },
      {
        title: 'Generative Engine Optimisation (GEO)',
        description: 'Be the cited brand in ChatGPT & Perplexity',
        url: '/ai-visibility-audit',
      },
      {
        title: 'AI Automations & Agents',
        description: 'Intelligent workflow & support automations',
        url: '/services/ai-ecommerce-agency',
      },
      {
        title: 'Platform SEO Migrations',
        description: 'Protect rankings & revenue during rebuilds',
        url: '/services/ecommerce-seo-migrations',
      },
      {
        title: 'International SEO & Markets',
        description: 'Global search visibility & multi-market setup',
        url: '/services/shopify-internationalisation',
      },
    ],
  },

  {
    labels: ['Optimise', 'Support'],
    items: [
      {
        title: 'Conversion Rate Optimisation',
        description: 'Growth-focused UX testing & experiments',
        url: '/shopify-cro-audit',
      },
      {
        title: 'Performance & Speed Audits',
        description: 'Core Web Vitals & code efficiency audits',
        url: '/services/shopify-audits',
      },
      {
        title: 'Dedicated Engineering Support',
        description: 'Ongoing technical maintenance & sprint capacity',
        url: '/services/support-and-maintenance',
      },
      {
        title: 'Architecture & Tech Consulting',
        description: 'Senior guidance on platform & tech strategy',
        url: '/services/shopify-consultant',
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
    url: '/articles/',
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
    url: '/contact/',
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

type MenuChildItem = {
  id: string;
  title: string;
  url?: string | null;
};

type MobileMenuItem = MenuChildItem & {
  /** Children supplied by the Software menu, if any. */
  items?: MenuChildItem[];
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
       id="byte-operator-mobile-menu"
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

                  /*
                   * Children supplied by the Software menu render beneath
                   * their parent, so a submenu added in the admin shows up
                   * on mobile too.
                   */
                  const children = (
                    item.items ?? []
                  ).filter((child) => child.url);

                  return (
                    <div
                      className="ft-mobile-menu__group"
                      key={item.id}
                    >
                      <NavLink
                        className="ft-mobile-menu__link"
                        end
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

                      {children.map((child) => {
                        if (!child.url) return null;

                        const childUrl =
                          normalizeMenuUrl(
                            child.url,
                            primaryDomainUrl,
                            publicStoreDomain,
                            child.title,
                          );

                        return (
                          <NavLink
                            className="
                              ft-mobile-menu__link
                              ft-mobile-menu__link--child
                            "
                            end
                            key={child.id}
                            onClick={closeMenu}
                            prefetch={
                              childUrl.startsWith('/')
                                ? 'intent'
                                : 'none'
                            }
                            to={childUrl}
                          >
                            {child.title}
                          </NavLink>
                        );
                      })}
                    </div>
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

            <div className="ft-mobile-menu__footer">
              <BulkHoursPromo onNavigate={closeMenu} />
            </div>
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
                to="/articles/"
                prefetch="intent"
                onClick={closeMenu}
              >
                <div className="ft-mobile-resources__image">
                  <img
                    src="/images/mega-menu-resources.webp"
                    alt="digital platformfront design with annotated page sections"
                    aria-hidden="true"
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
                    Explore the latest Software
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
        aria-label="Byte Operator homepage"
      >
        <img
          src="https://cdn.shopify.com/s/files/1/0928/7421/1691/files/final.png?v=1790264655"
          alt="Byte Operator"
          width="200"
          height="50"
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
          Byte Operator designs, develops,
          supports and grows Software and
          Enterprise Platform Solutions stores.
        </p>

        <NavLink
          className="ft-mobile-menu__footer-cta"
          to="/contact/"
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
          alt="Byte Operator team"
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
      aria-controls="byte-operator-mobile-menu"
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

    let frameId: number | undefined;

    const updateHeaderState = () => {
      frameId = undefined;

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

    const handleScroll = () => {
      if (frameId !== undefined) return;

      frameId = window.requestAnimationFrame(updateHeaderState);
    };

    window.addEventListener(
      'scroll',
      handleScroll,
      {passive: true},
    );

    updateHeaderState();

    return () => {
      window.removeEventListener(
        'scroll',
        handleScroll,
      );

      if (frameId !== undefined) {
        cancelAnimationFrame(frameId);
      }
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
      url: '/articles/',
      items: [],
    },
    {
      id: 'contact',
      resourceId: null,
      tags: [],
      title: 'Contact',
      type: 'HTTP',
      url: '/contact/',
      items: [],
    },
  ],
};
