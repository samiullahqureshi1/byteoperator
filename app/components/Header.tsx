import {useEffect, useState} from 'react';
import {NavLink} from 'react-router';

import type {
  CartApiQueryFragment,
  HeaderQuery,
} from 'storefrontapi.generated';

import {useAside} from '~/components/Aside';

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
  const isSticky = useStickyHeader(STICKY_SCROLL_POSITION);

  const {shop, menu} = header;

  const brandName = shop.name.replace(/\.$/, '');

  return (
    <>
      <div
        className="charle-header-spacer"
        aria-hidden="true"
      />

      <header
        className={`charle-header ${
          isSticky ? 'charle-header--sticky' : ''
        }`}
      >
        <div className="charle-header__inner">
          <NavLink
            className="charle-header__brand"
            end
            prefetch="intent"
            to="/"
            aria-label={`${shop.name} homepage`}
          >
            {brandName}
            <span aria-hidden="true">.</span>
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
            to="/pages/contact"
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
  const {close} = useAside();

  const menuItems =
    menu?.items && menu.items.length > 0
      ? menu.items
      : FALLBACK_HEADER_MENU.items;

  if (viewport === 'mobile') {
    return (
      <nav
        className="charle-mobile-nav"
        aria-label="Mobile navigation"
      >
        <NavLink
          className="charle-mobile-nav__link"
          end
          onClick={close}
          prefetch="intent"
          to="/"
        >
          <span>Home</span>
          <ArrowUpRightIcon />
        </NavLink>

        {menuItems.map((item) => {
          if (!item.url) return null;

          const url = normalizeMenuUrl(
            item.url,
            primaryDomainUrl,
            publicStoreDomain,
          );

          return (
            <NavLink
              className="charle-mobile-nav__link"
              end
              key={item.id}
              onClick={close}
              prefetch={url.startsWith('/') ? 'intent' : 'none'}
              to={url}
            >
              <span>{item.title}</span>
              <ArrowUpRightIcon />
            </NavLink>
          );
        })}

        <NavLink
          className="charle-mobile-nav__cta"
          onClick={close}
          prefetch="intent"
          to="/pages/contact"
        >
          <span>Get in touch</span>
          <ArrowUpRightIcon />
        </NavLink>
      </nav>
    );
  }

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
        );

        const showBadge =
          item.title.trim().toLowerCase() === 'services';

        return (
          <NavLink
            className="charle-header__nav-link"
            end
            key={item.id}
            prefetch={url.startsWith('/') ? 'intent' : 'none'}
            to={url}
          >
            <span>{item.title}</span>

            {showBadge && (
              <span
                className="charle-header__badge"
                aria-label="15 services"
              >
                15
              </span>
            )}
          </NavLink>
        );
      })}
    </nav>
  );
}

function MobileMenuButton() {
  const {open} = useAside();

  return (
    <button
      className="charle-header__mobile-button"
      type="button"
      aria-label="Open navigation menu"
      onClick={() => open('mobile')}
    >
      <span />
      <span />
    </button>
  );
}

function useStickyHeader(threshold: number) {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    let animationFrame: number | null = null;

    const updateHeader = () => {
      const nextStickyState = window.scrollY > threshold;

      setIsSticky((currentState) =>
        currentState === nextStickyState
          ? currentState
          : nextStickyState,
      );

      animationFrame = null;
    };

    const handleScroll = () => {
      if (animationFrame !== null) return;

      animationFrame = window.requestAnimationFrame(
        updateHeader,
      );
    };

    updateHeader();

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);

      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, [threshold]);

  return isSticky;
}

function normalizeMenuUrl(
  url: string,
  primaryDomainUrl: string,
  publicStoreDomain: string,
) {
  if (url.startsWith('/')) {
    return url;
  }

  const internalDomains = [
    primaryDomainUrl,
    publicStoreDomain,
    'myshopify.com',
  ].filter(Boolean);

  const isInternalUrl = internalDomains.some((domain) =>
    url.includes(domain),
  );

  if (!isInternalUrl) {
    return url;
  }

  try {
    const parsedUrl = new URL(url);

    return `${parsedUrl.pathname}${parsedUrl.search}${parsedUrl.hash}`;
  } catch {
    return url;
  }
}

function ArrowUpRightIcon() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height="17"
      viewBox="0 0 17 17"
      width="17"
    >
      <path
        d="M4.5 12.5 12.5 4.5M6.25 4.5h6.25v6.25"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.25"
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