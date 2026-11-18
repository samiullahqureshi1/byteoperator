/**
 * Contact navigation handler.
 * Replaces external Calendly widget to route users directly to the internal /contact page.
 */

export const CALENDLY_EVENT_URL = '/contact';

export function loadCalendly(): Promise<void> {
  return Promise.resolve();
}

/**
 * Navigates directly to the /contact page.
 */
export async function openCalendly(_targetUrl?: string): Promise<void> {
  if (typeof window !== 'undefined') {
    if (window.location.pathname === '/contact') {
      const target =
        document.querySelector('.ft-contact-hero__form-card') ||
        document.getElementById('ft-contact-firstName') ||
        document.querySelector('.ft-contact-form');
      if (target) {
        target.scrollIntoView({behavior: 'smooth', block: 'center'});
        const input = document.getElementById('ft-contact-firstName');
        input?.focus();
        return;
      }
    }
    window.location.href = '/contact';
  }
}
