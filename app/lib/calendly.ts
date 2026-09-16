/**
 * Calendly popup widget loader.
 *
 * The script is fetched on first intent (hover, focus or click) rather than on
 * page load, so it costs nothing until someone actually reaches for the button.
 * One module-level promise means any number of Book a Call buttons on a page
 * share a single script and stylesheet.
 *
 * Everything here is guarded on `document`, so importing this module during
 * server rendering is inert.
 */

/** The event lives in Calendly. Never append month/date params to this. */
export const CALENDLY_EVENT_URL =
  'https://calendly.com/theshopifyexperts/30min';

const WIDGET_SCRIPT = 'https://assets.calendly.com/assets/external/widget.js';
const WIDGET_STYLES = 'https://assets.calendly.com/assets/external/widget.css';

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: {url: string}) => void;
    };
  }
}

let pending: Promise<void> | undefined;

/**
 * Injects the widget script and stylesheet once. Safe to call repeatedly and
 * from several buttons at once — later callers await the same promise.
 */
export function loadCalendly(): Promise<void> {
  // Server render, or a non-DOM environment.
  if (typeof document === 'undefined') return Promise.resolve();

  if (window.Calendly) return Promise.resolve();

  if (!pending) {
    pending = new Promise<void>((resolve, reject) => {
      if (!document.querySelector(`link[href="${WIDGET_STYLES}"]`)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = WIDGET_STYLES;
        document.head.appendChild(link);
      }

      let script = document.querySelector<HTMLScriptElement>(
        `script[src="${WIDGET_SCRIPT}"]`,
      );

      if (!script) {
        script = document.createElement('script');
        script.src = WIDGET_SCRIPT;
        script.async = true;
        document.head.appendChild(script);
      }

      script.addEventListener('load', () => resolve(), {once: true});

      script.addEventListener(
        'error',
        () => {
          // Let the next click try again rather than failing for the session.
          pending = undefined;
          reject(new Error('Calendly widget failed to load'));
        },
        {once: true},
      );

      // The script tag was already on the page and finished loading.
      if (window.Calendly) resolve();
    });
  }

  return pending;
}

/**
 * Opens the booking modal, loading the widget first if it is not ready yet.
 * The visitor stays on the FoldTech site throughout.
 */
export async function openCalendly(url: string = CALENDLY_EVENT_URL) {
  await loadCalendly();
  window.Calendly?.initPopupWidget({url});
}
