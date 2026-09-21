import {Link} from 'react-router';
import {HomeExperts} from '../HomeExperts';
import {CalendlyButton} from '~/components/shared/CalendlyButton';
import {shopifyImageSrcSet} from '~/lib/shopify-cdn-image';
import {parseCaseStudy, type CaseStudyContent} from '~/lib/case-study-page';

type ShopifyImage = {
  url: string;
  altText?: string | null;
  width?: number | null;
  height?: number | null;
};

type MediaReference = {
  image?: ShopifyImage | null;
  alt?: string | null;
  mimeType?: string | null;
  url?: string | null;
  previewImage?: ShopifyImage | null;
  sources?: Array<{url: string; mimeType: string}> | null;
};

type MetaobjectField = {
  key: string;
  type: string;
  value?: string | null;
  reference?: MediaReference | null;
  references?: {nodes: MediaReference[]} | null;
};

type Video = {
  sources: Array<{url: string; mimeType: string | null}>;
  poster: string | null;
};

export type CaseStudyArticle = {
  id: string;
  title: string;
  handle: string;
  tags?: string[];
  image?: ShopifyImage | null;
  excerpt?: string | null;
  excerptHtml?: string | null;
  contentHtml: string;
  publishedAt: string;
  seo?: {title?: string | null; description?: string | null} | null;
  services?: {value: string} | null;
  platform?: {value: string} | null;
  caseStudyTitle?: {value: string} | null;
  caseStudySubheading?: {value: string} | null;
  caseStudyBlogDetails?: {
    reference?: {fields: MetaobjectField[]} | null;
  } | null;
};

type Detail = {label: string; value: string; href?: string};

type CaseStudyLayoutProps = {
  title: string;
  subtitle?: string;
  content: CaseStudyContent;
  /** Short facts shown in the hero bar. */
  details: Detail[];
  /** Technologies, rendered as chips under the brief. */
  chips: string[];
  /** First image leads the page; the rest sit between chapters. */
  images: ShopifyImage[];
  videos?: Video[];
};

/** Shared layout for `/work/:handle` and `/case-studies/:handle`. */
export function CaseStudyLayout({
  title,
  subtitle,
  content,
  details,
  chips,
  images,
  videos = [],
}: CaseStudyLayoutProps) {
  const [leadImage, ...galleryImages] = images;

  return (
    <article className="ft-cs">
      <header className="ft-cs__hero">
        <div className="ft-cs__glow" aria-hidden="true" />
        <nav className="ft-cs__crumbs" aria-label="Breadcrumb">
          <Link to="/work">Our Work</Link>
          <span aria-hidden="true">/</span>
          <span>Case Study</span>
        </nav>
        <h1 className="ft-cs__title">{title}</h1>
        {subtitle ? <p className="ft-cs__subtitle">{subtitle}</p> : null}

        {details.length ? (
          <dl className="ft-cs__facts">
            {details.map((detail) => (
              <div className="ft-cs__fact" key={detail.label}>
                <dt>{detail.label}</dt>
                <dd>
                  {detail.href ? (
                    <a href={detail.href} target="_blank" rel="noreferrer">
                      {detail.value}
                    </a>
                  ) : (
                    detail.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        ) : null}

        <div className="ft-cs__actions">
          <CalendlyButton className="ft-cs__book" />
          <Link className="ft-cs__more" to="/work">
            See more work
          </Link>
        </div>
      </header>

      {leadImage ? <ProjectImage image={leadImage} alt={title} eager /> : null}

      {content.intro || chips.length ? (
        <section className="ft-cs__brief" aria-labelledby="ft-cs-brief">
          <p className="ft-cs__eyebrow" id="ft-cs-brief">
            The Brief
          </p>
          {content.intro ? (
            <p className="ft-cs__intro">{content.intro}</p>
          ) : null}
          {chips.length ? (
            <ul className="ft-cs__chips" aria-label="Technologies">
              {chips.map((chip) => (
                <li key={chip}>{chip}</li>
              ))}
            </ul>
          ) : null}
        </section>
      ) : null}

      {content.stats.length ? (
        <section className="ft-cs__stats" aria-label="Results at a glance">
          {content.stats.map((stat) => (
            <div className="ft-cs__stat" key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </section>
      ) : null}

      {content.chapters.map((chapter, index) => (
        <div key={chapter.title}>
          <section className="ft-cs__chapter">
            <header className="ft-cs__chapter-head">
              <p className="ft-cs__eyebrow">{chapter.number}</p>
              <h2>{chapter.title}</h2>
              {chapter.subheading ? <p>{chapter.subheading}</p> : null}
            </header>
            <ul className="ft-cs__points">
              {chapter.points.map((point) => (
                <li key={point.title || point.text}>
                  {point.title ? <h3>{point.title}</h3> : null}
                  <p>{point.text}</p>
                </li>
              ))}
            </ul>
          </section>
          {galleryImages[index] ? (
            <ProjectImage image={galleryImages[index]} alt={title} />
          ) : null}
        </div>
      ))}

      {galleryImages.slice(content.chapters.length).map((image) => (
        <ProjectImage key={image.url} image={image} alt={title} />
      ))}

      {videos.length ? (
        <section className="ft-cs__videos" aria-label="Project videos">
          {videos.map((video) => (
            // Shopify's Videos field has no caption-track field to query.
            // eslint-disable-next-line jsx-a11y/media-has-caption
            <video
              key={video.sources.map((source) => source.url).join('|')}
              controls
              playsInline
              preload="metadata"
              poster={video.poster ?? undefined}
            >
              {video.sources.map((source) => (
                <source
                  key={source.url}
                  src={source.url}
                  type={source.mimeType ?? undefined}
                />
              ))}
            </video>
          ))}
        </section>
      ) : null}


      <HomeExperts />
    </article>
  );
}

const INDUSTRIES = [
  'Fashion & Beauty',
  'Food & Drink',
  'Luxury',
  'Sport',
  'Lifestyle & Home',
] as const;

/** A case-study blog post (`/work/:handle`) in the shared layout. */
export function CaseStudyDetail({article}: {article: CaseStudyArticle}) {
  const fields = new Map(
    (article.caseStudyBlogDetails?.reference?.fields ?? []).map((field) => [
      field.key,
      field,
    ]),
  );
  const tags = (article.tags ?? []).map((tag) => tag.trim()).filter(Boolean);
  const industry = INDUSTRIES.find((value) => tags.includes(value));
  const chips = Array.from(
    new Map(
      tags
        .filter((tag) => tag !== industry)
        .map((tag) => [tag.toLocaleLowerCase(), tag]),
    ).values(),
  );
  const websiteText = fields.get('case_study_url_text')?.value?.trim();
  const websiteUrl = fields.get('case_study_url')?.value?.trim();

  const details = [
    industry ? {label: 'Industry', value: industry} : null,
    metafieldText(article.services?.value)
      ? {label: 'Services', value: metafieldText(article.services?.value)!}
      : null,
    metafieldText(article.platform?.value)
      ? {label: 'Platform', value: metafieldText(article.platform?.value)!}
      : null,
    websiteText && websiteUrl
      ? {label: 'Website', value: websiteText, href: websiteUrl}
      : null,
  ].filter((detail): detail is Detail => Boolean(detail));

  const images = [
    article.image,
    ...Array.from({length: 5}, (_, index) =>
      fieldImage(fields.get(`hero_image_${index + 1}`)),
    ),
  ].filter((image): image is ShopifyImage => Boolean(image));

  return (
    <CaseStudyLayout
      title={article.title}
      subtitle={article.caseStudySubheading?.value.trim()}
      content={parseCaseStudy(article.contentHtml, article.title)}
      details={details}
      chips={chips}
      images={images}
      videos={fieldVideos(fields.get('videos'))}
    />
  );
}

function ProjectImage({
  image,
  alt,
  eager = false,
}: {
  image: ShopifyImage;
  alt: string;
  eager?: boolean;
}) {
  return (
    <figure className="ft-cs__visual">
      <img
        src={image.url}
        srcSet={shopifyImageSrcSet(image.url, [800, 1400, 2000])}
        sizes="(min-width: 80rem) 80rem, 92vw"
        alt={image.altText || alt}
        width={image.width ?? undefined}
        height={image.height ?? undefined}
        loading={eager ? 'eager' : 'lazy'}
        fetchPriority={eager ? 'high' : undefined}
        decoding="async"
      />
    </figure>
  );
}

function metafieldText(value?: string | null): string | null {
  const trimmed = value?.trim();
  if (!trimmed) return null;

  try {
    const parsed: unknown = JSON.parse(trimmed);
    if (Array.isArray(parsed)) {
      const entries = parsed.filter(
        (item): item is string => typeof item === 'string',
      );
      return entries.length ? entries.join(', ') : null;
    }
    return typeof parsed === 'string' ? parsed : trimmed;
  } catch {
    return trimmed;
  }
}

function fieldImage(field?: MetaobjectField): ShopifyImage | null {
  const references = [field?.reference, ...(field?.references?.nodes ?? [])];
  return references.find((reference) => reference?.image)?.image ?? null;
}

function fieldVideos(field?: MetaobjectField): Video[] {
  const references = [field?.reference, ...(field?.references?.nodes ?? [])];
  const videos = references.flatMap((reference): Video[] => {
    if (!reference) return [];
    const poster = reference.previewImage?.url ?? null;
    if (reference.sources?.length) {
      return [{sources: reference.sources, poster}];
    }
    if (reference.url && reference.mimeType?.startsWith('video/')) {
      return [
        {sources: [{url: reference.url, mimeType: reference.mimeType}], poster},
      ];
    }
    return [];
  });

  if (videos.length || !field?.value) return videos;

  try {
    const parsed: unknown = JSON.parse(field.value);
    const urls = Array.isArray(parsed) ? parsed : [parsed];
    return urls
      .filter(
        (url): url is string =>
          typeof url === 'string' && /^https?:\/\//.test(url),
      )
      .map((url) => ({sources: [{url, mimeType: null}], poster: null}));
  } catch {
    return /^https?:\/\//.test(field.value)
      ? [{sources: [{url: field.value, mimeType: null}], poster: null}]
      : [];
  }
}
