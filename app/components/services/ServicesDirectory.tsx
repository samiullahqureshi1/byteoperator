import {useState} from 'react';
import {Link} from 'react-router';
import {
  resolveCanonicalPath,
  SHOPIFY_SEO_CLEAN_PATH,
} from '~/lib/route-mappings';

type ServiceDirectoryLink = {
  label: string;
  href?: string;
};

type ServiceDirectoryGroup = {
  id: string;
  title: string;
  links: ServiceDirectoryLink[];
};

const SERVICE_GROUPS: ServiceDirectoryGroup[] = [
  {
    id: 'seo',
    title: 'SEO',
    links: [
      {
        label: 'Search Engine Optimisation',
        href: SHOPIFY_SEO_CLEAN_PATH,
      },
      {
        label: 'GEO / AI Search Optimisation',
        href: '/geo-agency/',
      },
    ],
  },
  {
    id: 'cro-audits',
    title: 'CRO & Audits',
    links: [
      {
        label: 'Conversion Rate Optimisation',
        href: '/pages/conversion-rate-optimisation',
      },
      {label: 'Data-Driven Strategies'},
      {
        label: 'Ecommerce Audits',
        href: '/pages/shopify-audits',
      },
      {label: 'Shopify Consultancy'},
    ],
  },
  {
    id: 'design-development',
    title: 'Design & Development',
    links: [
      {
        label: 'New build projects',
        href: '/pages/shopify-development',
      },
      {
        label: 'Support & Growth',
        href: '/pages/shopify-maintenance',
      },
      {
        label: 'Development Services',
        href: '/pages/shopify-development',
      },
      {
        label: 'Design Services',
        href: '/pages/shopify-development',
      },
      {
        label: 'Migrations',
        href: '/pages/shopify-migrations',
      },
      {
        label: 'Internationalisation',
        href: '/pages/internationalisation',
      },
      {
        label: 'System Integrations',
        href: '/shopify-integrations/',
      },
      {label: 'AI Automation & Integration'},
      {
        label: 'App Development',
        href: '/shopify-app-development/',
      },
      {
        label: 'Headless Commerce',
        href: '/pages/headless-commerce',
      },
      {label: 'Shopify Plus Partners'},
    ],
  },
  {
    id: 'email-sms',
    title: 'Email & SMS',
    links: [
      {
        label: 'Email & SMS Marketing',
        href: '/pages/email-sms-marketing',
      },
    ],
  },
];

export function ServicesDirectory() {
  const [openGroups, setOpenGroups] = useState<Set<string>>(
    () => new Set(),
  );

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
          <p>Our Services</p>
        </header>

        <div className="ft-services-directory__content">
          <div className="ft-services-directory__groups">
            {SERVICE_GROUPS.map((group) => {
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
                        {group.links.map((service) => (
                          <li
                            className="ft-services-directory__item"
                            key={service.label}
                          >
                            {service.href ? (
                              <Link
                                className="ft-services-directory__link"
                                to={resolveCanonicalPath(service.href)}
                                prefetch="intent"
                              >
                                <span>{service.label}</span>
                                <ArrowIcon />
                              </Link>
                            ) : (
                              <span className="ft-services-directory__link ft-services-directory__link--unresolved">
                                <span>{service.label}</span>
                              </span>
                            )}
                          </li>
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
