import {useState} from 'react';
import {WorkHero} from './work/WorkHero';
import {WorkResults} from './work/WorkResults';
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

interface WorkPageProps {
  page: {
    handle: string;
  };
  featuredArticles: WorkFeaturedArticle[];
  topCaseStudyArticles: WorkTopCaseStudyArticle[];
  caseStudyArticles: WorkCaseStudyArticle[];
}
const WORK_HERO_TESTIMONIAL = {
  quote:
    'FoldTech helped us create a stronger ecommerce experience built around growth and performance.',
  person: 'Client Name',
  company: 'Company Name',
  image: '/images/home-people/people.jpeg',
  video: '/videos/foldtech-hero-video.mp4',
};
const WORK_HERO_LOGOS = [
  {
    src: '/images/home-projects/cambridge/logo.svg',
    alt: 'Cambridge Satchel',
  },
  {
    src: '/images/home-services/clients/billionaire-boys-club.svg',
    alt: 'Billionaire Boys Club',
  },
  {
    src: '/images/home-projects/111skin/logo.svg',
    alt: '111SKIN',
  },
  {
    src: '/images/home-services/clients/candy-kittens.svg',
    alt: 'Candy Kittens',
  },
  {
    src: '/images/home-services/clients/muc-off.svg',
    alt: 'Muc-Off',
  },
  {
    src: '/images/home-projects/case/logo.svg',
    alt: 'Case Furniture',
  },
];

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
        </>
      ) : null}
    </main>
  );
}
