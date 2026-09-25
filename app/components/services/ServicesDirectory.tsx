'use client';

import {useState} from 'react';
import {Link} from '~/lib/router-compat';
import {resolveCanonicalPath} from '~/lib/route-mappings';
import {BULK_HOURS_PATH} from '~/components/BulkHours';
import {
  SERVICE_DIRECTORY,
  type ServiceDirectoryEntry,
} from '~/data/serviceDirectory';

export function ServicesDirectory() {
  const [openGroups, setOpenGroups] = useState<Set<string>>(
    () => new Set(),
  );

  // Which service's detail panel is open. Only one at a time — the list is
  // long and two open panels push the rest off-screen.
  const [openService, setOpenService] = useState<string | null>(null);

  function toggleGroup(groupId: string) {
    setOpenGroups((current) => {
      const next = new Set(current);

      if (next.has(groupId)) {
        next.delete(groupId);
      } else {
        next.add(groupId);
      }

      return next;
    });
  }

  return (
    <section className="ft-services-directory">
      <div className="ft-services-directory__glow" />

      <div className="ft-services-directory__container">
        <header className="ft-services-directory__header">
          <h2>Our Services</h2>
        </header>

        <div className="ft-services-directory__content">
          <div className="ft-services-directory__groups">
            {SERVICE_DIRECTORY.map((group) => {
              const isOpen = openGroups.has(group.id);
              const panelId = `ft-services-directory-${group.id}`;

              return (
                <div
                  className="ft-services-directory__group"
                  data-open={isOpen ? 'true' : 'false'}
                  key={group.id}
                >
                  <button
                    className="ft-services-directory__trigger"
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleGroup(group.id)}
                  >
                    <span>{group.title}</span>
                    <PlusIcon />
                  </button>

                  <div
                    className="ft-services-directory__panel"
                    id={panelId}
                  >
                    <div className="ft-services-directory__panel-inner">
                      <ul className="ft-services-directory__list">
                        {group.services.map((service) => (
                          <ServiceRow
                            groupId={group.id}
                            isOpen={openService === service.name}
                            key={service.name}
                            onToggle={() =>
                              setOpenService(
                                openService === service.name
                                  ? null
                                  : service.name,
                              )
                            }
                            service={service}
                          />
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * One service row: the trigger, and the detail panel it opens. Every service
 * has a description and a booking button; only those with a page of their own
 * also get a "read more" link.
 */
function ServiceRow({
  groupId,
  isOpen,
  onToggle,
  service,
}: {
  groupId: string;
  isOpen: boolean;
  onToggle: () => void;
  service: ServiceDirectoryEntry;
}) {
  const slug = service.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const detailId = `ft-service-detail-${groupId}-${slug}`;

  return (
    <li
      className="ft-services-directory__item"
      data-open={isOpen ? 'true' : 'false'}
    >
      <button
        className="ft-services-directory__link"
        type="button"
        aria-expanded={isOpen}
        aria-controls={detailId}
        onClick={onToggle}
      >
        <span>{service.name}</span>
        <ArrowIcon />
      </button>

      <div className="ft-services-directory__detail" id={detailId}>
        <div className="ft-services-directory__detail-inner">
          <p className="ft-services-directory__detail-text">
            {service.summary}
          </p>

          <ul className="ft-services-directory__detail-list">
            {service.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>

          <div className="ft-services-directory__detail-actions">
            <Link
              className="ft-services-directory__book"
              to={`${BULK_HOURS_PATH}?service=${encodeURIComponent(
                service.name,
              )}`}
              prefetch="intent"
            >
              <span>Book your hours</span>
              <ArrowIcon />
            </Link>

            {/*
              The full service page stays linked where one exists: it is
              indexed, and dropping the link would strip the only internal
              link to it.
            */}
            {service.href ? (
              <Link
                className="ft-services-directory__more"
                to={resolveCanonicalPath(service.href)}
                prefetch="intent"
              >
                Read more about {service.name}
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </li>
  );
}

function PlusIcon() {
  return (
    <svg
      className="ft-services-directory__plus"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path d="M12 2V22M2 12H22" stroke="currentColor" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      className="ft-services-directory__arrow"
      viewBox="0 0 24 12"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M0 6H22M17 1L22 6L17 11"
        stroke="currentColor"
      />
    </svg>
  );
}
