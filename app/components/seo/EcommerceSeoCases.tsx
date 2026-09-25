'use client';

import {getCaseStudiesForPage} from '~/data/ecommerceSeoCaseStudies';
import type {WorkCaseStudyArticle} from '~/components/work/WorkCaseStudies';
import {
  WorkFeaturedProjects,
  type WorkFeaturedProject,
} from '~/components/work/WorkFeaturedProjects';
import {CASE_STUDIES} from '~/data/caseStudiesData';

interface EcommerceSeoCasesProps {
  pageTag?: string;
  articles?: WorkCaseStudyArticle[];
  featuredArticles?: WorkFeaturedProject[];
}

export function EcommerceSeoCases({
  pageTag = 'seo',
  articles = CASE_STUDIES as any,
  featuredArticles = CASE_STUDIES as any,
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
    </section>
  );
}