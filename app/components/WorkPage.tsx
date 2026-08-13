import {useState} from 'react';
import {WorkHero} from './work/WorkHero';
import {WorkResults} from './work/WorkResults';
import {HomePeople} from './HomePeople';
import {HomeExperts} from './HomeExperts';
import {
  WorkFeaturedProjects,
  type WorkFeaturedArticle,
} from './work/WorkFeaturedProjects';
import {
  WorkTopCaseStudies,
  type WorkTopCaseStudyArticle,
} from './work/WorkTopCaseStudies';
import {WorkTeamCta} from './work/WorkTeamCta';
import {
  WorkCaseStudies,
  type WorkCaseStudyArticle,
} from './work/WorkCaseStudies';
import {WorkTestimonial} from './work/WorkTestimonial';
import type {IndustryFilter} from './work/IndustryFilters';
import {
  WORK_HERO_LOGOS,
  WORK_HERO_TESTIMONIAL,
} from '~/data/workHeroProof';

interface WorkPageProps {
  page: {
    handle: string;
  };
  featuredArticles: WorkFeaturedArticle[];
  topCaseStudyArticles: WorkTopCaseStudyArticle[];
  caseStudyArticles: WorkCaseStudyArticle[];
}
export function WorkPage({
  page,
  featuredArticles,
  topCaseStudyArticles,
  caseStudyArticles,
}: WorkPageProps) {
  const [selectedIndustry, setSelectedIndustry] =
    useState<IndustryFilter>('All');
  const showNormalCaseStudies = selectedIndustry === 'All';

  return (
    <main
      className="ft-work-page"
      data-page-handle={page.handle}
    >
   <WorkHero
  testimonial={WORK_HERO_TESTIMONIAL}
  logos={WORK_HERO_LOGOS}
/>
      <WorkResults />
      <WorkFeaturedProjects articles={featuredArticles} />
      <WorkTopCaseStudies
        articles={topCaseStudyArticles}
        caseStudyArticles={caseStudyArticles}
        selectedIndustry={selectedIndustry}
        onIndustryChange={setSelectedIndustry}
      />
      {showNormalCaseStudies ? (
        <>
          <WorkTeamCta />
          <WorkCaseStudies articles={caseStudyArticles} />
       <div className="ft-work-people">
  <HomePeople />
</div>
          <WorkTestimonial />
          <div className="ft-work-experts">
  <HomeExperts />
</div>
        </>
      ) : null}
    </main>
  );
}
