import type {Route} from './+types/contact';
import {Link, useLoaderData} from 'react-router';

import {
  CONTACT_CLEAN_PATH,
  CONTACT_PAGE_HANDLE,
} from '~/lib/route-mappings';

import {buildPageMeta, loadPageData} from './pages.$handle';
import {contentPageJsonLd} from '~/lib/seo/jsonld';

import {ContactHero} from '~/components/contact/ContactHero';
import {ContactInfo} from '~/components/contact/ContactInfo';
import {ContactPartners} from '~/components/contact/ContactPartners';
import {WorkFeaturedProjects} from '~/components/work/WorkFeaturedProjects';

import contactHeroStyles from '~/styles/contact-hero.css?url';
import contactInfoStyles from '~/styles/contact-info.css?url';
import contactPartnersStyles from '~/styles/contact-partners.css?url';
import workFeaturedProjectsStyles from '~/styles/work-featured-projects.css?url';
import workHeroStyles from '~/styles/work-hero.css?url';

export const links = () => [
  {
    rel: 'stylesheet',
    href: workHeroStyles,
  },
  {
    rel: 'stylesheet',
    href: workFeaturedProjectsStyles,
  },
  {
    rel: 'stylesheet',
    href: contactHeroStyles,
  },
  {
    rel: 'stylesheet',
    href: contactPartnersStyles,
  },
  {
    rel: 'stylesheet',
    href: contactInfoStyles,
  },
];

export const meta: Route.MetaFunction = ({data}) => [
  ...buildPageMeta(data?.page, CONTACT_CLEAN_PATH),

  /*
   * ContactPage. The reachable contact methods are already modelled as
   * `ORGANIZATION.contactPoint`, so this node links to that entity rather than
   * restating phone and email in a second place that could drift.
   */
  ...contentPageJsonLd({
    path: CONTACT_CLEAN_PATH,
    name: data?.page?.seo?.title || data?.page?.title || 'Contact FoldTech',
    description: data?.page?.seo?.description,
    type: 'ContactPage',
    breadcrumbs: [{name: 'Contact', path: CONTACT_CLEAN_PATH}],
  }),
];

export async function loader({
  context,
  request,
}: Route.LoaderArgs) {
  return loadPageData({
    context,
    request,
    handle: CONTACT_PAGE_HANDLE,
  });
}

export default function ContactPage() {
  const {featuredArticles} = useLoaderData<typeof loader>();

  return (
    <div className="ft-contact-page">
      <ContactHero />

      <section
        className="ft-contact-results"
        aria-labelledby="ft-contact-results-title"
      >
        <header className="ft-contact-results__header">
          <p className="ft-contact-results__eyebrow">
            Recent results from our clients
          </p>
          <h2
            className="ft-contact-results__title"
            id="ft-contact-results-title"
          >
            Our Results
          </h2>
        </header>

        <WorkFeaturedProjects
          articles={featuredArticles.slice(0, 3)}
          showThumbnail={false}
        />

        <div className="ft-contact-results__action">
          <Link
            className="ft-contact-results__link"
            to="/work"
            prefetch="intent"
          >
            View More <span aria-hidden="true">&#8599;</span>
          </Link>
        </div>
      </section>

      <ContactPartners />
      <ContactInfo />
    </div>
  );
}
