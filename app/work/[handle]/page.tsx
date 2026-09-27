import type {Metadata} from 'next';
import {pageMetadata} from '~/lib/seo/metadata';
import {notFound} from 'next/navigation';
import {CaseStudyLayout} from '~/components/work/CaseStudyDetail';
import {CASE_STUDIES, getCaseStudyByHandle} from '~/data/caseStudiesData';
import {CASE_STUDY_SEO} from '~/data/seoOverrides';

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
    description:
      seo?.description ||
      caseStudy.intro ||
      `${caseStudy.title} project results and transformation with Byte Operator.`,
    path: `/work/${caseStudy.handle}`,
  });
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

  return (
    <CaseStudyLayout
      title={caseStudy.title}
      subtitle={caseStudy.subtitle}
      content={content}
      details={caseStudy.details || []}
      chips={chips}
      images={images as any}
    />
  );
}
