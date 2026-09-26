'use client';

import {useState, type ButtonHTMLAttributes, type ReactNode} from 'react';

import {CALENDLY_EVENT_URL, loadCalendly, openCalendly} from '~/lib/calendly';

type CalendlyButtonProps = {
  /**
   * The Byte Operator CTA class for the surrounding section, e.g.
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
 * Renders a real <button> because the popup is a script call, not navigation.
 * The widget is warmed on hover/focus so the click itself feels instant.
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
        onClick?.(event);
        setOpening(true);

        void openCalendly(url)
          .catch(() => {})
          .finally(() => setOpening(false));
      }}
    >
      {children ?? <span>{label}</span>}
    </button>
  );
}
