/**
 * Calendly popup widget loader & fallback handler.
 * Connects directly to Samiullah's Byte Operator Discovery Call event.
 */

export const CALENDLY_EVENT_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ||
  'https://calendly.com/samiullah-byteoperator/discovery-call';

const WIDGET_SCRIPT = 'https://assets.calendly.com/assets/external/widget.js';
const WIDGET_STYLES = 'https://assets.calendly.com/assets/external/widget.css';

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: {url: string}) => void;
      closePopupWidget?: () => void;
    };
  }
}

let pending: Promise<void> | undefined;

/**
 * Injects the widget script and stylesheet once.
 */
export function loadCalendly(): Promise<void> {
  if (typeof document === 'undefined') return Promise.resolve();
  if (window.Calendly) return Promise.resolve();

  if (!pending) {
    pending = new Promise<void>((resolve, reject) => {
      // Inject stylesheet
      if (!document.querySelector(`link[href="${WIDGET_STYLES}"]`)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = WIDGET_STYLES;
        document.head.appendChild(link);
      }

      // Inject script
      let script = document.querySelector<HTMLScriptElement>(
        `script[src="${WIDGET_SCRIPT}"]`,
      );

      if (!script) {
        script = document.createElement('script');
        script.src = WIDGET_SCRIPT;
        script.async = true;
        document.head.appendChild(script);
      }

      const timer = setTimeout(() => {
        resolve();
      }, 2000);

      script.addEventListener('load', () => {
        clearTimeout(timer);
        resolve();
      }, {once: true});

      script.addEventListener('error', () => {
        clearTimeout(timer);
        pending = undefined;
        reject(new Error('Calendly widget script failed to load'));
      }, {once: true});

      if (window.Calendly) {
        clearTimeout(timer);
        resolve();
      }
    });
  }

  return pending;
}

/**
 * Opens the booking modal with rock-solid fallback.
 */
export async function openCalendly(targetUrl?: string) {
  const url = targetUrl || CALENDLY_EVENT_URL;

  try {
    await loadCalendly();

    if (window.Calendly && typeof window.Calendly.initPopupWidget === 'function') {
      window.Calendly.initPopupWidget({url});
      return;
    }
  } catch (e) {
    console.warn('[Calendly] Popup widget error, falling back to direct open:', e);
  }

  // Fallback if popup widget is blocked by browser/adblocker or script didn't load
  if (typeof window !== 'undefined') {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}
