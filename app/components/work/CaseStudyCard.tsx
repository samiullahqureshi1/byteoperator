import {getCaseStudyPath} from '~/lib/route-mappings';
import {Link} from '~/lib/router-compat';
import {softwareImageSrcSet} from '~/lib/software-cdn-image';

type CaseStudyImage = {
  url: string;
  altText?: string | null;
  width?: number | null;
  height?: number | null;
};

export type CaseStudyArticle = {
  title: string;
  handle: string;
  image?: CaseStudyImage | null;
  excerpt?: string | null;
  content: string;
  result?: {value: string} | null;
  services?: {value: string} | null;
  logo?: {
    reference?: {
      image?: CaseStudyImage | null;
    } | null;
  } | null;
};

interface CaseStudyCardProps {
  article: CaseStudyArticle;
}

export function CaseStudyCard({article}: CaseStudyCardProps) {
  const result = article.result?.value.trim();
  const services = article.services?.value.trim();
  const logo = article.logo?.reference?.image;

  return (
    <Link className="ft-case-study-card" to={getCaseStudyPath(article.handle)}>
      <div className="ft-case-study-card__media">
        {article.image ? (
          <img
            className="ft-case-study-card__image"
            src={article.image.url}
            srcSet={softwareImageSrcSet(article.image.url, [
              400, 800,
            ])}
            sizes="(min-width: 48rem) 33vw, 50vw"
            alt={article.image.altText || article.title}
            width={article.image.width ?? undefined}
            height={article.image.height ?? undefined}
            loading="lazy"
            decoding="async"
          />
        ) : null}

        {result ? (
          <span className="ft-case-study-card__result">{result}</span>
        ) : null}
      </div>

      <div className="ft-case-study-card__content">
        {logo ? (
          <span className="ft-case-study-card__logo-box">
            <img
              className="ft-case-study-card__logo"
              src={logo.url}
              srcSet={softwareImageSrcSet(logo.url, [80, 160])}
              sizes="80px"
              /*
               * Hidden from screen readers: the brand name is already
               * announced by the card title below.
               */
              alt={`${article.title} logo`}
              aria-hidden="true"
              width={logo.width ?? undefined}
              height={logo.height ?? undefined}
              loading="lazy"
              decoding="async"
            />
          </span>
        ) : null}

        <div className="ft-case-study-card__text">
          <h3 className="ft-case-study-card__title">{article.title}</h3>

          {services ? (
            <p className="ft-case-study-card__services">{services}</p>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
