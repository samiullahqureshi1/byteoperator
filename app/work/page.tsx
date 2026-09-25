import type {Metadata} from 'next';
import {WorkPage} from '~/components/WorkPage';
import {CASE_STUDIES} from '~/data/caseStudiesData';

export const metadata: Metadata = {
  title: 'Our Work & Case Studies | Byte Operator - Software Results',
  description:
    'Explore our portfolio of high-growth Software and Enterprise Platform Solutions stores, CRO transformations, and international brand replatforms.',
  alternates: {
    canonical: 'https://byteoperator.com/work',
  },
};

export default function Work() {
  const formattedArticles: any[] = CASE_STUDIES.map((cs) => ({
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
    <WorkPage
      page={{handle: 'work'}}
      featuredArticles={formattedArticles}
      topCaseStudyArticles={formattedArticles}
      caseStudyArticles={formattedArticles}
    />
  );
}
