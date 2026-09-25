'use client';

import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

type AsideType = 'search' | 'cart' | 'mobile' | 'closed';
type AsideContextValue = {
  type: AsideType;
  open: (mode: AsideType) => void;
  close: () => void;
};

/**
 * A side bar component with Overlay
 * @example
 * ```jsx
 * <Aside type="search" heading="SEARCH">
 *  <input type="search" />
 *  ...
 * </Aside>
 * ```
 */
export function Aside({
  children,
  heading,
  type,
}: {
  children?: React.ReactNode;
  type: AsideType;
  heading: React.ReactNode;
}) {
  const {type: activeType, close} = useAside();
  const expanded = type === activeType;

  // The cart, search and mobile-menu asides are hidden overlays that most
  // page views never open. Mounting their contents unconditionally forces
  // React to render and hydrate all of it (cart line items, predictive
  // search, the full mobile nav) on every single page load. Deferring the
  // mount until the aside is opened for the first time removes that work
  // from initial page load without changing how the aside behaves once
  // opened, since it stays mounted afterwards.
  const [hasOpened, setHasOpened] = useState(expanded);

  if (expanded && !hasOpened) {
    setHasOpened(true);
  }

  useEffect(() => {
    const abortController = new AbortController();

    if (expanded) {
      document.addEventListener(
        'keydown',
        function handler(event: KeyboardEvent) {
          if (event.key === 'Escape') {
            close();
          }
        },
        {signal: abortController.signal},
      );
    }
    return () => abortController.abort();
  }, [close, expanded]);

  /*
   * The drawer title is the dialog's accessible name, not part of the page
   * outline. As an <h3> it rendered three headings ahead of every page's
   * <h1> (cart, search, menu), so every document started h3-h3-h3-h1. A <p>
   * plus aria-labelledby keeps the name — the dialog previously had none —
   * and leaves the outline to the page.
   */
  const titleId = `aside-title-${type}`;

  return (
    <div
      aria-labelledby={titleId}
      aria-modal
      className={`overlay ${expanded ? 'expanded' : ''}`}
      role="dialog"
    >
      <button className="close-outside" onClick={close} />
      <aside>
        <header>
          <p id={titleId}>{heading}</p>
          <button className="close reset" onClick={close} aria-label="Close">
            &times;
          </button>
        </header>
        {/* A div, not <main>: the page owns the single main landmark, and
            three empty drawer <main>s ahead of it made content extractors
            and AI crawlers read the page as empty. */}
        <div className="aside-body">{hasOpened ? children : null}</div>
      </aside>
    </div>
  );
}

const AsideContext = createContext<AsideContextValue | null>(null);

Aside.Provider = function AsideProvider({children}: {children: ReactNode}) {
  const [type, setType] = useState<AsideType>('closed');

  return (
    <AsideContext.Provider
      value={{
        type,
        open: setType,
        close: () => setType('closed'),
      }}
    >
      {children}
    </AsideContext.Provider>
  );
};

export function useAside() {
  const aside = useContext(AsideContext);
  if (!aside) {
    throw new Error('useAside must be used within an AsideProvider');
  }
  return aside;
}
