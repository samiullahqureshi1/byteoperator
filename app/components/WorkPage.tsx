'use client';

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
import type {IndustryFilter} from './work/IndustryFilters';
import {
  WORK_HERO_LOGOS,
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
    <div
      className="ft-work-page"
      data-page-handle={page.handle}
    >
      <WorkHero
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
          <HomePeople
            content={{
              eyebrow: 'Engineering, AI & Ecommerce Architecture Specialists',
              headingFirstLine: 'Full-Stack Team for',
              headingSecondLine: 'High-Velocity Brands',
              description:
                'A specialized engineering collective focused on custom SaaS development, autonomous AI workflows, high-converting digital storefronts, and enterprise cloud migrations. We partner with ambitious leaders to engineer digital systems that outperform benchmarks and scale revenue.',
              buttonLabel: 'Our Story',
            }}
          />
        </div>
        {/* The shared WorkTestimonial (quote attributed to "Marcus Vance, Aydi
            Active", with a 68% figure) was removed from this hub: it
            contradicts the About page and has no verified source. */}
        <div className="ft-work-experts">
          <HomeExperts
            eyebrow={'Ready to Build & Scale?'}
            heading={"Let's Engineer Your Next High-Performance Platform"}
            description={'Whether you are deploying custom SaaS architecture, setting up autonomous AI workflow swarms with Replex & n8n, replatforming to Shopify Plus, or optimizing Core Web Vitals with Speedify AI, Byte Operator delivers the technical mastery you need to lead your market.'}
            ctaLabel={'Start a Project'}
          />
        </div>
        </>
      ) : null}
    </div>
  );
}
