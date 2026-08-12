import {Link} from 'react-router';

const WORK_STATS = [
  {
    value: '20K+',
    label: 'Tasks Delivered',
  },
  {
    value: '$3.1B+',
    label: 'Merchant Revenue',
  },
  {
    value: '15K+',
    label: 'Stores Built',
  },
  {
    value: 'XX%',
    label: 'Avg. Conversion Uplift',
  },
];

export function WorkResults() {
  return (
    <section className="ft-work-results">
      <div className="ft-work-results__inner">
        <div className="ft-work-results__stats">
          {WORK_STATS.map((stat) => (
            <div
              className="ft-work-results__stat"
              key={stat.label}
            >
              <p className="ft-work-results__number">
                {stat.value}
              </p>

              <p className="ft-work-results__label">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="ft-work-results__action">
          <Link
            className="ft-work-results__cta"
            to="/pages/services"
          >
            Explore Services

            <svg
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M1 11L11 1M11 1H2M11 1V10"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}