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
  <HomePeople
    content={{
      eyebrow: 'Creative, Technical & Strategic Shopify Experts',
      headingFirstLine: 'People First Shopify Agency',
      headingSecondLine: 'Helping Brands Scale',
      description:
        'A dedicated Shopify team specialising in design, development, SEO and growth marketing. We partner with ecommerce brands to plan, build and optimise high-converting online stores delivering better user experience, stronger organic visibility and measurable revenue growth.',
      buttonLabel: 'Our Story',
    }}
  />
</div>
          <WorkTestimonial />
          <div className="ft-work-experts">
  <HomeExperts
    eyebrow={'Shopify & Shopify Plus Experts'}
    heading={"Let's Build, Optimise & Scale Your Shopify Store"}
    description={'The Fold Tech partners with ecommerce brands to design, develop, launch and grow Shopify and Shopify Plus stores. Whether you need a new build, seamless migration, ongoing development, technical SEO or conversion rate optimisation we help you plan and deliver results that drive real revenue growth.'}
    ctaLabel={'Get in Touch'}
  />
</div>
        </>
      ) : null}
    </main>
  );
}
