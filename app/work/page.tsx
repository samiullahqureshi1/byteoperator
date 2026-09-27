import type {Metadata} from 'next';
import {pageMetadata} from '~/lib/seo/metadata';
import {WorkPage} from '~/components/WorkPage';
import {CASE_STUDIES} from '~/data/caseStudiesData';

export const metadata: Metadata = pageMetadata({
  title: 'Case Studies: SaaS, AI & Ecommerce | Byte Operator',
  description:
    'Explore our work: enterprise SaaS platforms, autonomous AI automation, high-growth Shopify Plus storefronts and zero-downtime cloud migrations.',
  path: '/work',
});

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
