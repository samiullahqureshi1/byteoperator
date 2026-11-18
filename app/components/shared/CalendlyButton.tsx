'use client';

import {type ButtonHTMLAttributes, type ReactNode} from 'react';
import {useRouter, usePathname} from 'next/navigation';

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
  targetPath?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className'>;

/**
 * Directs visitors to the contact page to start their project consultation.
 */
export function CalendlyButton({
  className = '',
  label = 'Book a Call',
  children,
  url,
  targetPath = '/contact',
  onClick,
  ...rest
}: CalendlyButtonProps) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <button
      {...rest}
      type="button"
      className={`ft-calendly-button ${className}`.trim()}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;

        if (pathname === '/contact') {
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

        router.push(targetPath);
      }}
    >
      {children ?? <span>{label}</span>}
    </button>
  );
}
