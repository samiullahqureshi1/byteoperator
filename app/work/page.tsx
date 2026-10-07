import type {Metadata} from 'next';
import {pageMetadata} from '~/lib/seo/metadata';
import {contentPageJsonLd} from '~/lib/seo/jsonld';
import {JsonLd} from '~/components/shared/JsonLd';
import {WorkPage} from '~/components/WorkPage';
import {CASE_STUDIES} from '~/data/caseStudiesData';
import {getSiteContent} from '~/lib/cms/db';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const cmsContent = getSiteContent();
  const work = cmsContent.work;
  return pageMetadata({
    title: work?.seoTitle || 'Case Studies: SaaS, AI & Ecommerce | Byte Operator',
    description:
      work?.seoDescription ||
      'Explore our work: client projects and in-house products spanning SaaS platforms, AI automation, Shopify Plus storefronts and platform migrations.',
    path: '/work',
  });
}

export default function Work() {
  const cmsContent = getSiteContent();
  const work = cmsContent.work;
  const title = work?.seoTitle?.replace(/ \| Byte Operator$/, '') || 'Case Studies: SaaS, AI & Ecommerce';
  const description = work?.seoDescription || 'Explore our work: client projects and in-house products spanning SaaS platforms, AI automation, and platform migrations.';

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

  // CollectionPage + ItemList of the case studies this page lists.
  const graph = contentPageJsonLd({
    path: '/work',
    name: title,
    description: description,
    type: 'CollectionPage',
    breadcrumbs: [{name: 'Our Work', path: '/work'}],
    items: CASE_STUDIES.map((cs) => ({name: cs.title, path: `/work/${cs.handle}`})),
  });

  return (
    <>
      <JsonLd graph={graph} />
      <WorkPage
        page={{handle: 'work'}}
        featuredArticles={formattedArticles.slice(0, 3)}
        topCaseStudyArticles={formattedArticles}
        caseStudyArticles={formattedArticles}
      />
    </>
  );
}
