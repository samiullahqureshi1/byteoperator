'use client';

import {useEffect} from 'react';
import {useRouter} from 'next/navigation';

const BOOKING_PATH = '/book-a-call';

function bookingLinkFrom(target: EventTarget | null): HTMLAnchorElement | null {
  const link = (target as Element | null)?.closest?.('a[href]');
  if (!(link instanceof HTMLAnchorElement)) return null;

  try {
    const url = new URL(link.href, window.location.href);
    const path = url.pathname.replace(/\/+$/, '');
    return url.origin === window.location.origin && path === BOOKING_PATH
      ? link
      : null;
  } catch {
    return null;
  }
}

/**
 * Any link to /book-a-call navigates seamlessly to /contact.
 */
export function BookingLinkInterceptor() {
  const router = useRouter();

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
      router.push('/contact');
    };

    // Capture phase, so it runs before the router's own link handler.
    document.addEventListener('click', onClick, true);

    return () => {
      document.removeEventListener('click', onClick, true);
    };
  }, [router]);

  return null;
}
