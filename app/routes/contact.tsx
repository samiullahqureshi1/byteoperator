import type {Route} from './+types/contact';
import {Link, useLoaderData} from 'react-router';

import {
  CONTACT_CLEAN_PATH,
  CONTACT_PAGE_HANDLE,
} from '~/lib/route-mappings';

import {loadPageData} from './pages.$handle';

import {ContactHero} from '~/components/contact/ContactHero';
import {WorkFeaturedProjects} from '~/components/work/WorkFeaturedProjects';

import contactHeroStyles from '~/styles/contact-hero.css?url';
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
];

export const meta: Route.MetaFunction = ({data}) => [
  {
    title: `Hydrogen | ${data?.page.title ?? 'Contact'}`,
  },
  {
    tagName: 'link',
    rel: 'canonical',
    href: CONTACT_CLEAN_PATH,
  },
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
    <main className="ft-contact-page">
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
            to="/work/"
            prefetch="intent"
          >
            View More <span aria-hidden="true">&#8599;</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
