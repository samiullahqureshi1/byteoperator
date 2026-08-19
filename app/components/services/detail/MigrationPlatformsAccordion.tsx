import {useState} from 'react';
import {Link} from 'react-router';

export type MigrationPlatformItem = {
  title: string;
  descriptionHtml: string;
  cta?: {
    label: string;
    href: string;
  };
};

export type MigrationPlatformsData = {
  heading: string;
  eyebrow: string;
  items: readonly MigrationPlatformItem[];
};

type MigrationPlatformsAccordionProps = {
  data: MigrationPlatformsData;
};

export function MigrationPlatformsAccordion({
  data,
}: MigrationPlatformsAccordionProps) {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    setOpenItems((current) => {
      const next = new Set(current);

      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }

      return next;
    });
  };

  return (
    <section
      className="ft-migration-platforms"
      aria-labelledby="ft-migration-platforms-heading"
    >
      <div className="ft-migration-platforms__container">
        <header className="ft-migration-platforms__header">
          <h2
            className="ft-migration-platforms__heading"
            id="ft-migration-platforms-heading"
          >
            {data.heading}
          </h2>
        </header>

        <div className="ft-migration-platforms__inner">
          <div className="ft-migration-platforms__left">
            <p className="ft-migration-platforms__eyebrow">
              {data.eyebrow}
            </p>
          </div>

          <div className="ft-migration-platforms__content">
            <div className="ft-migration-platforms__accordion">
              {data.items.map((item, index) => {
                const isOpen = openItems.has(index);
                const contentId = `ft-migration-platform-${index}`;

                return (
                  <article
                    className={[
                      'ft-migration-platform',
                      isOpen
                        ? 'ft-migration-platform--open'
                        : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    key={item.title}
                  >
                    <button
                      className="ft-migration-platform__trigger"
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={contentId}
                      onClick={() => toggleItem(index)}
                    >
                      <span>{item.title}</span>

                      <svg
                        className="ft-migration-platform__plus"
                        viewBox="0 0 25 25"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M12.5 1.25v22.5M23.75 12.5H1.25"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    <div
                      className="ft-migration-platform__panel"
                      id={contentId}
                    >
                      <div className="ft-migration-platform__panel-inner">
                        <div
                          className="ft-migration-platform__description"
                          dangerouslySetInnerHTML={{
                            __html: item.descriptionHtml,
                          }}
                        />

                        {item.cta ? (
                          <Link
                            className="ft-migration-platform__cta"
                            to={item.cta.href}
                          >
                            <span>{item.cta.label}</span>

                            <svg
                              viewBox="0 0 13 12"
                              fill="none"
                              aria-hidden="true"
                            >
                              <path
                                d="M0 6h12m0 0L6.5.5M12 6l-5.5 5.5"
                                stroke="currentColor"
                              />
                            </svg>
                          </Link>
                        ) : null}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}