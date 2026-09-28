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

/**
 * Three other case studies: same category first, then the projects that
 * follow this one in hub order (wrapping round), so links spread evenly.
 */
function relatedCaseStudies(current: CaseStudyItem) {
  const index = CASE_STUDIES.findIndex((cs) => cs.handle === current.handle);
  const others = [
    ...CASE_STUDIES.slice(index + 1),
    ...CASE_STUDIES.slice(0, index),
  ];
  const sameCategory = others.filter((cs) => cs.category === current.category);
  const rest = others.filter((cs) => cs.category !== current.category);

  return [...sameCategory, ...rest].slice(0, 3).map((cs) => ({
    title: cs.title,
    href: `/work/${cs.handle}`,
    category: cs.category,
    summary: cs.result?.value,
    image: cs.image,
  }));
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
  // `tags` are /work filter keys ("all", "shopify-plus"...), not technologies.
  const chips = caseStudy.technologies || [];
  const related = relatedCaseStudies(caseStudy);

  // The hero keeps short facts; services, website and technologies have
  // their own sections further down the page.
  const SECTION_LABELS = ['Services', 'Website', 'Technologies'];
  const heroDetails = (caseStudy.details || []).filter(
    (detail) => !SECTION_LABELS.includes(detail.label),
  );
  const services = (
    caseStudy.details?.find((detail) => detail.label === 'Services')?.value || ''
  )
    .split(',')
    .map((service) => service.trim())
    .filter(Boolean);

  // CreativeWork + WebPage + BreadcrumbList. No client name or dates: the
  // data does not reliably carry them, so nothing is guessed.
  const imageUrl = caseStudy.image?.url;
  const graph = caseStudyJsonLd({
    path: `/work/${caseStudy.handle}`,
    clientName: caseStudy.client,
    product: caseStudy.product,
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
        details={heroDetails}
        chips={chips}
        services={services}
        serviceLinks={(caseStudy.relatedServices || []).map((service) => ({
          label: service.label,
          href: service.path,
        }))}
        images={images as any}
        related={related}
        website={caseStudy.website}
        naturalLeadImage={caseStudy.naturalImage}
        cta={caseStudy.cta}
      />
    </>
  );
}
