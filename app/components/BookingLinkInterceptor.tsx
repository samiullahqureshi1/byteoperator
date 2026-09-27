'use client';

import {useEffect} from 'react';
import {loadCalendly, openCalendly} from '~/lib/calendly';

const BOOKING_PATH = '/book-a-call';

function bookingLinkFrom(target: EventTarget | null): HTMLAnchorElement | null {
  const link = (target as Element | null)?.closest?.('a[href]');
  if (!(link instanceof HTMLAnchorElement)) return null;

  const url = new URL(link.href, window.location.href);
  const path = url.pathname.replace(/\/+$/, '');
  return url.origin === window.location.origin && path === BOOKING_PATH
    ? link
    : null;
}

/**
 * Any link to /book-a-call (footer menu, CMS copy, etc.) opens the Calendly
 * booking modal over the current page instead of navigating away. The
 * /book-a-call page stays as the fallback for direct visits, new tabs, and
 * visitors without JavaScript.
 */
export function BookingLinkInterceptor() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      // Let modified clicks (new tab / window) behave like normal links.
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      if (!bookingLinkFrom(event.target)) return;

      event.preventDefault();
      event.stopPropagation();
      void openCalendly();
    };

    // Warm the widget as soon as a booking link is hovered or focused.
    const warm = (event: Event) => {
      if (bookingLinkFrom(event.target)) void loadCalendly().catch(() => {});
    };

    // Capture phase, so it runs before the router's own link handler.
    document.addEventListener('click', onClick, true);
    document.addEventListener('pointerover', warm, true);
    document.addEventListener('focusin', warm, true);

    return () => {
      document.removeEventListener('click', onClick, true);
      document.removeEventListener('pointerover', warm, true);
      document.removeEventListener('focusin', warm, true);
    };
  }, []);

  return null;
}
