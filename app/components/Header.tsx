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
import {responsiveImage} from '~/lib/responsive-image';

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
              {...responsiveImage('https://cdn.shopify.com/s/files/1/0928/7421/1691/files/final.png?v=1790264655', '260px', 640)}
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

        const isExpertise =
          normalizedTitle === 'expertise' || normalizedTitle === 'services';

        const isResources =
          normalizedTitle === 'resources';

        /*
         * Expertise and Resources have custom mega menus whose contents are
         * authored in this file. Every other item renders whatever children
         * the Software menu supplies, so a submenu added in the admin appears
         * without a code change.
         */
        const submenuItems =
          isExpertise || isResources
            ? []
            : (item.items ?? []).filter(
                (child) => child.url,
              );

        const hasSubmenu = submenuItems.length > 0;

        const hasMegaMenu =
          isExpertise || isResources || hasSubmenu;

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
              </NavLink>
            )}

            {isExpertise ? (
              <ExpertiseMegaMenu />
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
  /** Shown with a "Coming soon" badge and not linked until the page launches. */
  comingSoon?: boolean;
};

type ServiceMegaColumn = {
  labels: string[];
  items: MegaLink[];
  secondaryTitle?: string;
  secondaryItems?: MegaLink[];
};


/*
 * ========================================================
 * EXPERTISE MEGA MENU ICONS & DATA
 * ========================================================
 */

function MicIcon({color = '#38bdf8'}: {color?: string}) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" x2="12" y1="19" y2="22" />
    </svg>
  );
}

function WorkflowIcon({color = '#22d3ee'}: {color?: string}) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="12" r="3" />
      <line x1="9" y1="6" x2="15" y2="12" />
      <line x1="9" y1="18" x2="15" y2="12" />
    </svg>
  );
}

function CodeIcon({color = '#f472b6'}: {color?: string}) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function WindowAppIcon({color = '#38bdf8'}: {color?: string}) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="M2 9h20" />
      <path d="M9 9v11" />
    </svg>
  );
}

function ApiBranchIcon({color = '#4ade80'}: {color?: string}) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="6" y1="3" x2="6" y2="15" />
      <circle cx="18" cy="6" r="2.5" />
      <circle cx="6" cy="18" r="2.5" />
      <circle cx="6" cy="6" r="2.5" />
      <path d="M18 9a7 7 0 0 1-7 7H6" />
    </svg>
  );
}

function PulseIcon({color = '#38bdf8'}: {color?: string}) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}

function CloudIcon({color = '#facc15'}: {color?: string}) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    </svg>
  );
}

function StethoscopeIcon({color = '#38bdf8'}: {color?: string}) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 3v5a6 6 0 0 0 12 0V3" />
      <path d="M10.5 14v4a4 4 0 0 0 8 0v-2" />
      <circle cx="18.5" cy="16" r="2" />
    </svg>
  );
}

function ToothIcon({color = '#7dd3fc'}: {color?: string}) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 3C4.5 3 3 5 3 8c0 3.5 1.5 6 2 9.5.5 3 2.5 3.5 3.5 1.5 1-2 1.5-4 3.5-4s2.5 2 3.5 4c1 2 3 1.5 3.5-1.5.5-3.5 2-6 2-9.5 0-3-1.5-5-4-5-2 0-3 1.5-4.5 1.5S9 3 7 3Z" />
    </svg>
  );
}

function SparkleIcon({color = '#f472b6'}: {color?: string}) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 2-2.2 7.2L2 12l7.8 2.8L12 22l2.2-7.2L22 12l-7.8-2.8Z" />
    </svg>
  );
}

function EyeIcon({color = '#38bdf8'}: {color?: string}) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function HeartIcon({color = '#4ade80'}: {color?: string}) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

function PlusCircleIcon({color = '#fbbf24'}: {color?: string}) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <line x1="12" y1="8" x2="12" y2="16" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </svg>
  );
}

function LightningIcon({color = '#38bdf8'}: {color?: string}) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m13 2-8 12h6l-1 8 8-12h-6l1-8Z" />
    </svg>
  );
}

function ReactIcon({color = '#7dd3fc'}: {color?: string}) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
      <ellipse cx="12" cy="12" rx="10" ry="4" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
      <circle cx="12" cy="12" r="1.5" fill={color} />
    </svg>
  );
}

function PayloadIcon({color = '#e2e8f0'}: {color?: string}) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m21 16-9 5-9-5V8l9-5 9 5v8Z" />
      <path d="m12 3v18" />
    </svg>
  );
}

function LaravelIcon({color = '#f87171'}: {color?: string}) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2 2 7l10 5 10-5-10-5Z" />
      <path d="m2 17 10 5 10-5" />
      <path d="m2 12 10 5 10-5" />
    </svg>
  );
}

function AiAutomationIcon({color = '#38bdf8'}: {color?: string}) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v18" />
      <path d="M3 12h18" />
      <path d="m5.5 5.5 13 13" />
      <path d="m5.5 18.5 13-13" />
    </svg>
  );
}

const EXPERTISE_MENU_COLUMNS = [
  {
    title: 'What We Do',
    items: [
      {
        title: 'AI Voice Agents & Receptionists',
        url: '/services/ai-voice-agents-healthcare',
        color: '#38bdf8',
        icon: MicIcon,
      },
      {
        title: 'AI Workflow Automation',
        url: '/services/ai-workflow-automation-healthcare',
        color: '#22d3ee',
        icon: WorkflowIcon,
      },
      {
        title: 'Custom Software Development',
        url: '/services/custom-healthcare-software-development',
        color: '#f472b6',
        icon: CodeIcon,
      },
      {
        title: 'SaaS & Web Application Development',
        url: '/services/saas-web-application-development',
        color: '#38bdf8',
        icon: WindowAppIcon,
      },
      {
        title: 'API & System Integration',
        url: '/services/software-integrations',
        color: '#4ade80',
        icon: ApiBranchIcon,
      },
      {
        title: 'Healthcare Software Integration',
        url: '/services/healthcare-software-integration',
        color: '#38bdf8',
        icon: PulseIcon,
      },
      {
        title: 'Cloud & Infrastructure Engineering',
        url: '/services/cloud-infrastructure-engineering',
        color: '#facc15',
        icon: CloudIcon,
      },
    ],
  },
  {
    title: 'Healthcare Solutions',
    items: [
      {
        title: 'Medical Practices',
        url: '/healthcare-solutions/medical-practices',
        color: '#38bdf8',
        icon: StethoscopeIcon,
      },
      {
        title: 'Dental Practices',
        url: '/healthcare-solutions/dental-practices',
        color: '#38bdf8',
        icon: ToothIcon,
      },
      {
        title: 'Dermatology & Aesthetic Clinics',
        url: '/healthcare-solutions/dermatology-aesthetic-clinics',
        color: '#38bdf8',
        icon: SparkleIcon,
      },
      {
        title: 'Ophthalmology Clinics',
        url: '/healthcare-solutions/ophthalmology-clinics',
        color: '#38bdf8',
        icon: EyeIcon,
      },
      {
        title: 'Primary Care',
        url: '/healthcare-solutions/primary-care',
        color: '#38bdf8',
        icon: HeartIcon,
      },
      {
        title: 'Other Specialties',
        url: '/healthcare-solutions/other-specialties',
        color: '#38bdf8',
        icon: PlusCircleIcon,
      },
    ],
  },
];

function ExpertiseMegaMenu() {
  return (
    <div
      className="ft-mega-menu ft-mega-menu--expertise"
      role="group"
      aria-label="Expertise"
    >
      <div className="ft-expertise-mega__grid">
        {EXPERTISE_MENU_COLUMNS.map((col) => (
          <div className="ft-expertise-mega__column" key={col.title}>
            <h3 className="ft-expertise-mega__title">{col.title}</h3>
            <div className="ft-expertise-mega__links">
              {col.items.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    className="ft-expertise-mega__link"
                    key={item.title}
                    to={item.url}
                    prefetch="intent"
                  >
                    <span className="ft-expertise-mega__icon">
                      <Icon color={item.color} />
                    </span>
                    <span className="ft-expertise-mega__text">{item.title}</span>
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

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
      to="/contact"
      onClick={onNavigate}
    >
      <span className="ft-bulk-promo__image">
        <img
          {...responsiveImage('/images/mega-menu-team.webp', '320px', 640)}
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
        {RESOURCE_MEGA_LINKS.map((link) =>
          link.comingSoon ? (
            <div
              className="ft-resources-mega__link ft-resources-mega__link--soon"
              key={link.title}
              aria-disabled="true"
            >
              <strong>
                {link.title}
                <em className="ft-coming-soon-badge">Coming soon</em>
              </strong>

              <span>{link.description}</span>
            </div>
          ) : (
            <NavLink
              className="ft-resources-mega__link"
              key={link.title}
              prefetch="intent"
              to={resolveCanonicalPath(link.url)}
            >
              <strong>{link.title}</strong>

              <span>{link.description}</span>
            </NavLink>
          ),
        )}
      </div>

      <NavLink
        className="ft-resources-mega__featured"
        prefetch="intent"
        to="/articles"
      >
        <div className="ft-resources-mega__featured-image">
          <img
            {...responsiveImage('/images/mega-menu-resources.webp', '340px', 828)}
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
        description: 'Collabix all-in-one project, team & workload platform',
        url: '/services/software-developers',
      },
      {
        title: 'Full-Stack Web Development',
        description: 'Aydi Active multi-vendor marketplace & custom web platforms',
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
        description: 'High-converting custom Shopify storefronts',
        url: '/services/software-web-design',
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
        url: '/services/software-migrations',
      },
      {
        title: 'B2B & Wholesale Systems',
        description: 'Dedicated wholesale pricing & global channels',
        url: '/services/software-b2b-wholesale',
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
        url: '/services/ai-automations-agents',
      },
      {
        title: 'Platform SEO Migrations',
        description: 'Protect rankings & revenue during rebuilds',
        url: '/services/ecommerce-seo-migrations',
      },
      {
        title: 'International SEO & Markets',
        description: 'Global search visibility & multi-market setup',
        url: '/services/software-internationalisation',
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
        url: '/services/software-consultant',
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
    description: 'Explore our latest technical & CRO articles',
    url: '/articles',
  },
  {
    title: 'Podcast',
    description: 'Engineering, AI & ecommerce conversations',
    url: '/podcast',
    comingSoon: true,
  },
  {
    title: 'Webinars',
    description: 'Live teardowns & architecture masterclasses',
    url: '/webinars',
    comingSoon: true,
  },
  {
    title: 'Guides',
    description: 'Download actionable engineering blueprints',
    url: '/guides',
    comingSoon: true,
  },
  {
    title: 'Join Our Newsletter',
    description: 'Get weekly engineering & scale insights',
    url: '/newsletter',
    comingSoon: true,
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

                  const isExpertise =
                    title === 'expertise' || title === 'services';

                  const isResources =
                    title === 'resources';

                  if (isExpertise) {
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
                    to="/expertise"
                    prefetch="intent"
                    onClick={closeMenu}
                  >
                    Expertise
                  </NavLink>
                </h2>
              </div>

              <div className="ft-mobile-expertise">
                {EXPERTISE_MENU_COLUMNS.map((col) => (
                  <section
                    className="ft-mobile-expertise__group"
                    key={col.title}
                  >
                    <h3 className="ft-mobile-expertise__title">
                      {col.title}
                    </h3>

                    <div className="ft-mobile-expertise__links">
                      {col.items.map((link) => {
                        const Icon = link.icon;
                        return (
                          <NavLink
                            className="ft-mobile-expertise__link"
                            key={link.title}
                            to={link.url}
                            prefetch="intent"
                            onClick={closeMenu}
                          >
                            <span className="ft-mobile-expertise__icon">
                              <Icon color={link.color} />
                            </span>
                            <span>{link.title}</span>
                          </NavLink>
                        );
                      })}
                    </div>
                  </section>
                ))}
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
                  (link) => link.comingSoon ? (
                    <div
                      className="ft-mobile-resources__link ft-mobile-resources__link--soon"
                      key={link.title}
                      aria-disabled="true"
                    >
                      <strong>
                        {link.title}
                        <em className="ft-coming-soon-badge">Coming soon</em>
                      </strong>

                      <span>
                        {link.description}
                      </span>
                    </div>
                  ) : (
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
                to="/articles"
                prefetch="intent"
                onClick={closeMenu}
              >
                <div className="ft-mobile-resources__image">
                  <img
                    {...responsiveImage('/images/mega-menu-resources.webp', '100vw', 1080)}
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
          {...responsiveImage('https://cdn.shopify.com/s/files/1/0928/7421/1691/files/final.png?v=1790264655', '200px', 640)}
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
          {...responsiveImage('/images/mega-menu-team.webp', '100vw', 1080)}
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
      url: '/work',
      items: [],
    },
    {
      id: 'services',
      resourceId: null,
      tags: [],
      title: 'Services',
      type: 'HTTP',
      url: '/services',
      items: [],
    },
    {
      id: 'ai',
      resourceId: null,
      tags: [],
      title: 'AI',
      type: 'HTTP',
      url: '/services/ai-automations-agents',
      items: [],
    },
    {
      id: 'about',
      resourceId: null,
      tags: [],
      title: 'About us',
      type: 'HTTP',
      url: '/about',
      items: [],
    },
    {
      id: 'resources',
      resourceId: null,
      tags: [],
      title: 'Resources',
      type: 'HTTP',
      url: '/articles',
      items: [],
    },
    {
      id: 'contact',
      resourceId: null,
      tags: [],
      title: 'Contact',
      type: 'HTTP',
      url: '/contact',
      items: [],
    },
  ],
};
