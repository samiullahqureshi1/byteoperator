import {Link} from '~/lib/router-compat';

type HomePeopleContent = {
  eyebrow?: string;
  headingFirstLine: string;
  headingSecondLine: string;
  description: string;
  buttonLabel: string;
};

const DEFAULT_HOME_PEOPLE_CONTENT: HomePeopleContent = {
  eyebrow: 'Senior Engineers, AI Architects & Growth Strategists',
  headingFirstLine: 'Engineering-led',
  headingSecondLine: 'software & AI agency',
  description:
    'A specialized engineering team focused on full-stack web platforms, AI workflow automations, and modern ecommerce architecture, helping ambitious brands scale faster and operate smarter.',
  buttonLabel: 'About Byte Operator',
};

export function HomePeople({
  content = DEFAULT_HOME_PEOPLE_CONTENT,
}: {
  content?: HomePeopleContent;
} = {}) {
  return (
    <section
      className="ft-home-people"
      aria-labelledby="ft-home-people-title"
    >
      <div className="ft-home-people__container">
        <div className="ft-home-people__image">
          <img
            src="/images/home-people/people.webp"
            alt="Byte Operator team working together"
            width="1668"
            height="700"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="ft-home-people__inner">
          <div className="ft-home-people__left">
            <p className="ft-home-people__subtitle">
              {content.eyebrow ?? DEFAULT_HOME_PEOPLE_CONTENT.eyebrow}
            </p>

            <h2
              className="ft-home-people__title"
              id="ft-home-people-title"
            >
              {content.headingFirstLine}
              <br />
              {content.headingSecondLine}
            </h2>
          </div>

          <div className="ft-home-people__right">
            <p className="ft-home-people__description">
              {content.description}
            </p>

            <Link
              className="ft-home-people__button"
              to="/about"
              prefetch="intent"
            >
              <span>{content.buttonLabel}</span>

              <svg
                className="ft-home-people__button-arrow"
                viewBox="0 0 13 12"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M0 6H12M12 6L6.5 0.5M12 6L6.5 11.5"
                  stroke="currentColor"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
