import type {WorkTopCaseStudiesQuery} from 'storefrontapi.generated';
import {CaseStudyCard} from './CaseStudyCard';
import type {WorkCaseStudyArticle} from './WorkCaseStudies';
import {
  IndustryFilters,
  type IndustryFilter,
} from './IndustryFilters';

export type WorkTopCaseStudyArticle = NonNullable<
  WorkTopCaseStudiesQuery['blog']
>['articles']['nodes'][number];

interface WorkTopCaseStudiesProps {
  articles: WorkTopCaseStudyArticle[];
  caseStudyArticles: WorkCaseStudyArticle[];
  selectedIndustry: IndustryFilter;
  onIndustryChange: (industry: IndustryFilter) => void;
}

export function WorkTopCaseStudies({
  articles,
  caseStudyArticles,
  selectedIndustry,
  onIndustryChange,
}: WorkTopCaseStudiesProps) {
  const isAllSelected = selectedIndustry === 'All';
  const normalizedIndustry = selectedIndustry.trim().toLocaleLowerCase();
  const seenHandles = new Set<string>();
  const visibleArticles = isAllSelected
    ? articles
    : [...articles, ...caseStudyArticles].filter((article) => {
        const matchesIndustry = article.tags.some(
          (tag) => tag.trim().toLocaleLowerCase() === normalizedIndustry,
        );

        if (!matchesIndustry || seenHandles.has(article.handle)) return false;

        seenHandles.add(article.handle);
        return true;
      });

  return (
    <section
      className="ft-work-industries"
      aria-labelledby="ft-work-industries-title"
    >
      <div className="ft-work-industries__header">
        <p className="ft-work-industries__eyebrow">Explore by industry</p>

        <h2
          className="ft-work-industries__title"
          id="ft-work-industries-title"
        >
          Diverse experience across industries, bringing the best ideas from
          every sector to your brand.
        </h2>

        <IndustryFilters
          selected={selectedIndustry}
          onChange={onIndustryChange}
        />
      </div>

      <div className="ft-work-industries__projects">
        <div className="ft-work-industries__grid">
          {visibleArticles.map((article) => (
            <CaseStudyCard article={article} key={article.handle} />
          ))}
        </div>

        {!isAllSelected && visibleArticles.length === 0 ? (
          <p className="ft-work-industries__empty">
            No case studies found for this industry.
          </p>
        ) : null}

        {isAllSelected ? (
          <a
            className="ft-work-industries__more"
            href="#case-studies"
            onClick={(event) => {
              const section = document.getElementById('case-studies');

              if (!section) return;

              event.preventDefault();
              window.history.pushState(null, '', '#case-studies');
              section.scrollIntoView({behavior: 'smooth'});
            }}
          >
            <span>See more case studies</span>
            <span aria-hidden="true">&darr;</span>
          </a>
        ) : null}
      </div>
    </section>
  );
}
