import {Link} from 'react-router';
import type {WorkFeaturedProjectsQuery} from 'storefrontapi.generated';

export type WorkFeaturedArticle = NonNullable<
  WorkFeaturedProjectsQuery['blog']
>['articles']['nodes'][number];

export type WorkFeaturedProject = WorkFeaturedArticle & {
  href?: string;
};

interface WorkFeaturedProjectsProps {
  articles: WorkFeaturedProject[];
  showThumbnail?: boolean;
}

export function WorkFeaturedProjects({
  articles,
  showThumbnail = true,
}: WorkFeaturedProjectsProps) {
  return (
    <section className="ft-work-featured">
      <div className="ft-work-featured__grid">
        {articles.map((article) => {
          const result = article.result?.value.trim();
          const services = article.services?.value.trim();
          const logo = article.logo?.reference?.image;

          return (
            <Link
              className="ft-work-featured__card"
              to={article.href ?? `/work/${article.handle}`}
              key={article.handle}
            >
              {article.image ? (
                <img
                  className="ft-work-featured__image"
                  src={article.image.url}
                  alt={article.image.altText || article.title}
                  width={article.image.width ?? undefined}
                  height={article.image.height ?? undefined}
                  loading="lazy"
                  decoding="async"
                />
              ) : null}

              <div className="ft-work-featured__overlay" />

              {result ? (
                <span className="ft-work-featured__result">
                  {result}
                </span>
              ) : null}

              <div className="ft-work-featured__content">
                {showThumbnail && logo ? (
                  <img
                    className="ft-work-featured__logo"
                    src={logo.url}
                    alt={article.title}
                    width={logo.width ?? undefined}
                    height={logo.height ?? undefined}
                    loading="lazy"
                    decoding="async"
                  />
                ) : null}

                <h2 className="ft-work-featured__title">
                  {article.title}
                </h2>

                {services ? (
                  <p className="ft-work-featured__services">
                    {services}
                  </p>
                ) : null}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
