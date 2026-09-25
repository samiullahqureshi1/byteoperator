import {getCaseStudyPath} from '~/lib/route-mappings';
import {Link} from '~/lib/router-compat';
import type {WorkFeaturedProjectsQuery} from '~/lib/types';
import {softwareImageSrcSet} from '~/lib/software-cdn-image';

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
              to={article.href ?? getCaseStudyPath(article.handle)}
              key={article.handle}
            >
              {article.image ? (
                <img
                  className="ft-work-featured__image"
                  src={article.image.url}
                  srcSet={softwareImageSrcSet(article.image.url, [
                    500, 900,
                  ])}
                  sizes="(min-width: 48rem) 33vw, 80vw"
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
                    srcSet={softwareImageSrcSet(logo.url, [
                      120, 240,
                    ])}
                    sizes="120px"
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
