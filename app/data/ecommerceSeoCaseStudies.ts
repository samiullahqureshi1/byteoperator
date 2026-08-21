import type {WorkCaseStudyArticle} from '~/components/work/WorkCaseStudies';
import type {WorkFeaturedProject} from '~/components/work/WorkFeaturedProjects';

interface ServiceCaseStudySelection {
  pageTag: string;
  articles: WorkCaseStudyArticle[];
  featuredArticles: WorkFeaturedProject[];
}

export function getCaseStudiesForPage({
  pageTag,
  articles,
  featuredArticles,
}: ServiceCaseStudySelection): WorkFeaturedProject[] {
  const tagged = articles.filter((article) => article.tags.includes(pageTag));
  const selectedArticles = tagged.length > 0 ? tagged : featuredArticles;

  return selectedArticles.slice(0, 3);
}