import type {WorkCaseStudiesQuery} from 'storefrontapi.generated';
import {CaseStudyCard} from './CaseStudyCard';

export type WorkCaseStudyArticle = NonNullable<
  WorkCaseStudiesQuery['blog']
>['articles']['nodes'][number];

interface WorkCaseStudiesProps {
  articles: WorkCaseStudyArticle[];
}

export function WorkCaseStudies({articles}: WorkCaseStudiesProps) {
  return (
    <section
      id="case-studies"
      className="ft-work-case-studies"
      aria-label="Case studies"
    >
      <div className="ft-work-case-studies__grid">
        {articles.map((article) => (
          <CaseStudyCard article={article} key={article.handle} />
        ))}
      </div>
    </section>
  );
}
