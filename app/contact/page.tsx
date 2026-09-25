import type {Metadata} from 'next';
import {ContactHero} from '~/components/contact/ContactHero';
import {ContactInfo} from '~/components/contact/ContactInfo';
import {ContactPartners} from '~/components/contact/ContactPartners';
import {WorkFeaturedProjects} from '~/components/work/WorkFeaturedProjects';
import {CASE_STUDIES} from '~/data/caseStudiesData';
import {Link} from '~/lib/router-compat';

export const metadata: Metadata = {
  title: 'Contact Us | Byte Operator - Get In Touch',
  description:
    'Start your Software project with Byte Operator. Reach out for new store builds, CRO audits, SEO optimization, and migrations.',
  alternates: {
    canonical: 'https://byteoperator.com/contact',
  },
};

export default function Contact() {
  const featuredArticles: any[] = CASE_STUDIES.slice(0, 3).map((cs) => ({
    id: cs.id,
    handle: cs.handle,
    title: cs.title,
    href: `/work/${cs.handle}`,
    image: cs.image,
    result: cs.result,
    services: cs.services,
    tags: cs.tags,
    logo: cs.logo,
  }));

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
          articles={featuredArticles}
          showThumbnail={false}
        />

        <div className="ft-contact-results__action">
          <Link
            className="ft-contact-results__link"
            href="/work"
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
