export type ClientLogoGridItem = {
  src: string;
  alt: string;
  size?: 'small' | 'large';
  noFilter?: boolean;
};

export type ClientLogoGridProps = {
  heading: string;
  logos: readonly ClientLogoGridItem[];
};

export function ClientLogoGrid({
  heading,
  logos,
}: ClientLogoGridProps) {
  const headingId = useId();

  return (
    <section
      className="ft-client-logo-grid"
      aria-labelledby={headingId}
    >
      <div className="ft-client-logo-grid__atmosphere" aria-hidden="true" />

      <div className="ft-client-logo-grid__container">
        <h2
          className="ft-client-logo-grid__heading"
          id={headingId}
        >
          {heading}
        </h2>

        <div className="ft-client-logo-grid__grid">
          {logos.map((logo) => {
            const sizeClass = logo.size
              ? ` ft-client-logo-grid__item--${logo.size}`
              : '';
            const filterClass = logo.noFilter
              ? ' ft-client-logo-grid__image--no-filter'
              : '';

            return (
              <div
                className={`ft-client-logo-grid__item${sizeClass}`}
                key={logo.alt}
              >
                <img
                  className={`ft-client-logo-grid__image${filterClass}`}
                  src={logo.src}
                  alt={logo.alt}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
import {useId} from 'react';
