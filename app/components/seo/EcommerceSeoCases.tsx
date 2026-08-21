import {EcommerceSeoAboutStatement} from '~/components/seo/EcommerceSeoAboutStatement';
import {getCaseStudiesForPage} from '~/data/ecommerceSeoCaseStudies';
import type {WorkCaseStudyArticle} from '~/components/work/WorkCaseStudies';
import {
  WorkFeaturedProjects,
  type WorkFeaturedProject,
} from '~/components/work/WorkFeaturedProjects';

interface EcommerceSeoCasesProps {
  pageTag: string;
  articles: WorkCaseStudyArticle[];
  featuredArticles: WorkFeaturedProject[];
}

export function EcommerceSeoCases({
  pageTag,
  articles,
  featuredArticles,
}: EcommerceSeoCasesProps) {
  return (
    <section
      className="ft-ecommerce-seo-cases"
      aria-label="Ecommerce SEO case studies"
    >
      <WorkFeaturedProjects
        showThumbnail={false}
        articles={getCaseStudiesForPage({
          pageTag,
          articles,
          featuredArticles,
        })}
      />
      <EcommerceSeoAboutStatement />
    </section>
  );
}