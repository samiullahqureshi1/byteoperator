import {useState, type ButtonHTMLAttributes, type ReactNode} from 'react';

import {CALENDLY_EVENT_URL, loadCalendly, openCalendly} from '~/lib/calendly';

type CalendlyButtonProps = {
  /**
   * The FoldTech CTA class for the surrounding section, e.g.
   * "charle-header__cta" or "ft-footer__primary-cta". The button inherits that
   * styling rather than introducing a look of its own.
   */
  className?: string;
  label?: string;
  /** Pass the section's own markup (span + arrow icon) to match its siblings. */
  children?: ReactNode;
  url?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className'>;

/**
 * Opens the Calendly booking modal over the current page.
 *
 * Renders a real <button> because the popup is a script call, not navigation —
 * an <a href> would be a broken promise to anyone middle-clicking it. The
 * widget is warmed on hover/focus so the click itself feels instant, and a
 * click that lands before the script is ready simply awaits it.
 */
export function CalendlyButton({
  className = '',
  label = 'Book a Call',
  children,
  url = CALENDLY_EVENT_URL,
  onClick,
  ...rest
}: CalendlyButtonProps) {
  const [opening, setOpening] = useState(false);

  const warm = () => {
    // A failed preload is not worth surfacing; the click retries and reports.
    void loadCalendly().catch(() => {});
  };

  return (
    <button
      {...rest}
      type="button"
      className={`ft-calendly-button ${className}`.trim()}
      aria-busy={opening || undefined}
      aria-haspopup="dialog"
      onPointerEnter={warm}
      onFocus={warm}
      onClick={(event) => {
        // Callers use this to close a menu or drawer before the modal opens.
        onClick?.(event);

        setOpening(true);

        // Never navigates. If the widget is unreachable the loader clears its
        // cached promise, so the button stays live and the next click retries.
        void openCalendly(url)
          .catch(() => {})
          .finally(() => setOpening(false));
      }}
    >
      {children ?? <span>{label}</span>}
    </button>
  );
}
