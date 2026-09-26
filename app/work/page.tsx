import type {Metadata} from 'next';
import {WorkPage} from '~/components/WorkPage';
import {CASE_STUDIES} from '~/data/caseStudiesData';

export const metadata: Metadata = {
  title: 'Our Work & Case Studies | Byte Operator - Custom SaaS, AI & Ecommerce',
  description:
    'Explore our portfolio of enterprise SaaS architectures, autonomous AI automation platforms, high-velocity Shopify Plus storefronts, and zero-downtime cloud migrations.',
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
      featuredArticles={formattedArticles.slice(0, 3)}
      topCaseStudyArticles={formattedArticles}
      caseStudyArticles={formattedArticles}
    />
  );
}
