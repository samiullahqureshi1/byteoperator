export const INDUSTRY_FILTERS = [
  'All',
  'Fashion & Beauty',
  'Food & Drink',
  'Luxury',
  'Sport',
  'Lifestyle & Home',
] as const;

export type IndustryFilter = (typeof INDUSTRY_FILTERS)[number];

interface IndustryFiltersProps {
  selected: IndustryFilter;
  onChange: (industry: IndustryFilter) => void;
}

export function IndustryFilters({
  selected,
  onChange,
}: IndustryFiltersProps) {
  return (
    <div
      className="ft-industry-filters"
      role="group"
      aria-label="Filter case studies by industry"
    >
      {INDUSTRY_FILTERS.map((industry) => {
        const isSelected = industry === selected;

        return (
          <button
            className={`ft-industry-filters__button${
              isSelected ? ' ft-industry-filters__button--active' : ''
            }`}
            type="button"
            aria-pressed={isSelected}
            onClick={() => onChange(industry)}
            key={industry}
          >
            {industry}
          </button>
        );
      })}
    </div>
  );
}
