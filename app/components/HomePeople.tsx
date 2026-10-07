import {Link} from '~/lib/router-compat';
import {responsiveImage} from '~/lib/responsive-image';
import type {HomePageContent} from '~/lib/cms/types';

type LegacyHomePeopleContent = {
  eyebrow?: string;
  headingFirstLine: string;
  headingSecondLine: string;
  description: string;
  buttonLabel: string;
  peopleImage?: string;
  peopleButtonLink?: string;
};

const DEFAULT_HOME_PEOPLE_CONTENT: LegacyHomePeopleContent = {
  eyebrow: 'Senior Engineers, AI Architects & Growth Strategists',
  headingFirstLine: 'Engineering-led',
  headingSecondLine: 'software & AI agency',
  description:
    'A specialized engineering team focused on full-stack web platforms, AI workflow automations, and modern ecommerce architecture, helping ambitious brands scale faster and operate smarter.',
  buttonLabel: 'About Byte Operator',
  peopleImage: '/images/home-people/people.webp',
  peopleButtonLink: '/about',
};

export function HomePeople({
  content,
}: {
  content?: HomePageContent | LegacyHomePeopleContent;
} = {}) {
  // Check show/hide toggle
  if ('peopleShowSection' in (content || {}) && (content as HomePageContent)?.peopleShowSection === false) {
    return null;
  }

  const eyebrow =
    ('peopleEyebrow' in (content || {})
      ? (content as HomePageContent)?.peopleEyebrow
      : (content as LegacyHomePeopleContent)?.eyebrow) ||
    DEFAULT_HOME_PEOPLE_CONTENT.eyebrow;

  const firstLine =
    ('peopleHeadingFirstLine' in (content || {})
      ? (content as HomePageContent)?.peopleHeadingFirstLine
      : (content as LegacyHomePeopleContent)?.headingFirstLine) ||
    DEFAULT_HOME_PEOPLE_CONTENT.headingFirstLine;

  const secondLine =
    ('peopleHeadingSecondLine' in (content || {})
      ? (content as HomePageContent)?.peopleHeadingSecondLine
      : (content as LegacyHomePeopleContent)?.headingSecondLine) ||
    DEFAULT_HOME_PEOPLE_CONTENT.headingSecondLine;

  const description =
    ('peopleDescription' in (content || {})
      ? (content as HomePageContent)?.peopleDescription
      : (content as LegacyHomePeopleContent)?.description) ||
    DEFAULT_HOME_PEOPLE_CONTENT.description;

  const buttonLabel =
    ('peopleButtonLabel' in (content || {})
      ? (content as HomePageContent)?.peopleButtonLabel
      : (content as LegacyHomePeopleContent)?.buttonLabel) ||
    DEFAULT_HOME_PEOPLE_CONTENT.buttonLabel;

  const buttonLink =
    ('peopleButtonLink' in (content || {})
      ? (content as HomePageContent)?.peopleButtonLink
      : (content as LegacyHomePeopleContent)?.peopleButtonLink) ||
    DEFAULT_HOME_PEOPLE_CONTENT.peopleButtonLink ||
    '/about';

  const imageSrc =
    ('peopleImage' in (content || {})
      ? (content as HomePageContent)?.peopleImage
      : (content as LegacyHomePeopleContent)?.peopleImage) ||
    DEFAULT_HOME_PEOPLE_CONTENT.peopleImage ||
    '/images/home-people/people.webp';

  return (
    <section
      className="ft-home-people"
      aria-labelledby="ft-home-people-title"
    >
      <div className="ft-home-people__container">
        <div className="ft-home-people__image">
          <img
            {...responsiveImage(imageSrc, '100vw', 1920)}
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
              {eyebrow}
            </p>

            <h2
              className="ft-home-people__title"
              id="ft-home-people-title"
            >
              {firstLine}
              <br />
              {secondLine}
            </h2>
          </div>

          <div className="ft-home-people__right">
            <p className="ft-home-people__description">
              {description}
            </p>

            <Link
              className="ft-home-people__button"
              to={buttonLink}
              prefetch="intent"
            >
              <span>{buttonLabel}</span>

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
