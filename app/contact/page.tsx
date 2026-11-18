import type {Metadata} from 'next';
import {pageMetadata} from '~/lib/seo/metadata';
import {ContactHero} from '~/components/contact/ContactHero';
import {ContactInfo} from '~/components/contact/ContactInfo';
import {ContactPartners} from '~/components/contact/ContactPartners';
import {WorkFeaturedProjects} from '~/components/work/WorkFeaturedProjects';
import {CASE_STUDIES} from '~/data/caseStudiesData';
import {Link} from '~/lib/router-compat';
import {getSiteContent} from '~/lib/cms/db';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  let contact = null;
  try {
    const cmsContent = getSiteContent();
    contact = cmsContent?.contact;
  } catch (err) {
    console.error('Failed to load contact metadata from CMS:', err);
  }

  return pageMetadata({
    title: contact?.seoTitle || 'Contact Our Healthcare AI & Engineering Team | Byte Operator',
    description:
      contact?.seoDescription ||
      'Get in touch with Byte Operator leadership for healthcare AI automation, clinic PMS integration, and custom software engineering projects.',
    path: '/contact',
  });
}

interface ContactPageProps {
  searchParams?: {
    service?: string;
    subject?: string;
    enquirySource?: string;
  };
}

export default function Contact({ searchParams }: ContactPageProps) {
  const defaultService = searchParams?.service;
  const defaultMessage = searchParams?.subject ? `Inquiry regarding: ${searchParams.subject}` : undefined;
  const enquirySource = searchParams?.enquirySource;

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
      <ContactHero
        defaultService={defaultService}
        defaultMessage={defaultMessage}
        enquirySource={enquirySource}
      />

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
