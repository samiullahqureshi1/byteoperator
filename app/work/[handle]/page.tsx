import type {Metadata} from 'next';
import {pageMetadata} from '~/lib/seo/metadata';
import {notFound} from 'next/navigation';
import {CaseStudyLayout} from '~/components/work/CaseStudyDetail';
import {
  CASE_STUDIES,
  getCaseStudyByHandle,
  type CaseStudyItem,
} from '~/data/caseStudiesData';
import {CASE_STUDY_SEO} from '~/data/seoOverrides';
import {caseStudyJsonLd} from '~/lib/seo/jsonld';
import {absoluteUrl} from '~/lib/seo/schema';
import {JsonLd} from '~/components/shared/JsonLd';

interface Props {
  params: {
    handle: string;
  };
}

export function generateStaticParams() {
  return CASE_STUDIES.map((cs) => ({
    handle: cs.handle,
  }));
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const caseStudy = getCaseStudyByHandle(params.handle);
  if (!caseStudy) {
    return {title: 'Case Study | Byte Operator'};
  }
  const seo = CASE_STUDY_SEO[caseStudy.handle];
  return pageMetadata({
    title: `${seo?.title || `${caseStudy.title} Case Study`} | Byte Operator`,
    description: caseStudyDescription(caseStudy),
    path: `/work/${caseStudy.handle}`,
  });
}

function caseStudyDescription(caseStudy: CaseStudyItem): string {
  return (
    CASE_STUDY_SEO[caseStudy.handle]?.description ||
    caseStudy.intro ||
    `${caseStudy.title} project results and transformation with Byte Operator.`
  );
}

export default function CaseStudyPage({params}: Props) {
  const caseStudy = getCaseStudyByHandle(params.handle);

  if (!caseStudy) {
    notFound();
  }

  const content = {
    intro: caseStudy.intro || '',
    details: caseStudy.details || [],
    stats: caseStudy.stats || [],
    chapters: caseStudy.chapters || [],
  };

  const images = caseStudy.image ? [caseStudy.image] : [];
  const chips = caseStudy.tags || [];

  // CreativeWork + WebPage + BreadcrumbList. No client name or dates: the
  // data does not reliably carry them, so nothing is guessed.
  const imageUrl = caseStudy.image?.url;
  const graph = caseStudyJsonLd({
    path: `/work/${caseStudy.handle}`,
    headline: caseStudy.title,
    description: caseStudyDescription(caseStudy),
    ...(imageUrl
      ? {imageUrl: imageUrl.startsWith('/') ? absoluteUrl(imageUrl) : imageUrl}
      : {}),
  });

  return (
    <>
      <JsonLd graph={graph} />
      <CaseStudyLayout
        title={caseStudy.title}
        subtitle={caseStudy.subtitle}
        content={content}
        details={[
          ...(caseStudy.details || []),
          ...(caseStudy.relatedServices?.length
            ? [
                {
                  label: 'Related services',
                  value: caseStudy.relatedServices.map((service) => service.label).join(', '),
                  links: caseStudy.relatedServices.map((service) => ({
                    label: service.label,
                    href: service.path,
                  })),
                },
              ]
            : []),
        ]}
        chips={chips}
        images={images as any}
      />
    </>
  );
}
