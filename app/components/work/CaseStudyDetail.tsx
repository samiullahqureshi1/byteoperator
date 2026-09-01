import {HomeExperts} from '../HomeExperts';

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

const INDUSTRIES = [
  'Fashion & Beauty',
  'Food & Drink',
  'Luxury',
  'Sport',
  'Lifestyle & Home',
] as const;

const FIELD_KEYS = {
  heading: 'case_study_heading',
  urlText: 'case_study_url_text',
  url: 'case_study_url',
  videos: 'videos',
} as const;

interface CaseStudyDetailProps {
  article: CaseStudyArticle;
  fallbackEyebrow?: string;
  fallbackSubtitle?: string | null;
}

export function CaseStudyDetail({
  article,
  fallbackEyebrow,
  fallbackSubtitle,
}: CaseStudyDetailProps) {
  const fields = new Map(
    (article.caseStudyBlogDetails?.reference?.fields ?? []).map((field) => [
      field.key,
      field,
    ]),
  );
  const contentSections = splitArticleContent(article.contentHtml);
  const caseStudySubheading =
    article.caseStudySubheading?.value.trim() || fallbackSubtitle?.trim();
  const briefHtml = contentSections[0] ?? '';
  const remainingContent = contentSections.slice(1);
  const heroImages = Array.from({length: 5}, (_, index) =>
    getFieldImage(fields.get(`hero_image_${index + 1}`)),
  );
  const sectionCount = Math.max(heroImages.length, remainingContent.length);
  const articleTags = (article.tags ?? [])
    .map((tag) => tag.trim())
    .filter(Boolean);
  const industry = INDUSTRIES.find((value) => articleTags.includes(value));
  const technologies = Array.from(
    new Map(
      articleTags
        .filter((tag) => tag !== industry)
        .map((tag) => [tag.toLocaleLowerCase(), tag]),
    ).values(),
  ).join(', ');
  const services = formatMetafieldValue(article.services?.value);
  const platform = formatMetafieldValue(article.platform?.value);
  const websiteText = fields.get(FIELD_KEYS.urlText)?.value?.trim();
  const websiteUrl = fields.get(FIELD_KEYS.url)?.value?.trim();
  const caseStudyTitle =
    article.caseStudyTitle?.value.trim() || fallbackEyebrow?.trim();
  const videos = getVideos(fields.get(FIELD_KEYS.videos));
  const infoRows = [
    industry ? {label: 'Industry', value: industry} : null,
    services ? {label: 'Services', value: services} : null,
    platform ? {label: 'Platform', value: platform} : null,
    technologies ? {label: 'Technologies', value: technologies} : null,
    websiteText && websiteUrl
      ? {label: 'Website', value: websiteText, href: websiteUrl}
      : null,
  ].filter(Boolean) as Array<{label: string; value: string; href?: string}>;

  return (
    <div className="ft-case-detail">
      <header className="ft-case-detail__hero">
        {caseStudyTitle ? (
          <p className="ft-case-detail__eyebrow">{caseStudyTitle}</p>
        ) : null}
        <h1>{article.title}</h1>
        {caseStudySubheading ? (
          <p className="ft-case-detail__intro">{caseStudySubheading}</p>
        ) : null}
      </header>

      {article.image ? (
        <ProjectImage image={article.image} fallbackAlt={article.title} eager />
      ) : null}

      {briefHtml || infoRows.length ? (
        <section className="ft-case-detail__brief" aria-label="The Brief">
          <div className="ft-case-detail__copy">
            {!startsWithBriefHeading(briefHtml) ? (
              <h2>The Brief</h2>
            ) : null}
            {briefHtml ? <RichText html={briefHtml} /> : null}
          </div>
          {infoRows.length ? (
            <dl className="ft-case-detail__info">
              {infoRows.map((row) => (
                <div className="ft-case-detail__info-row" key={row.label}>
                  <dt>{row.label}</dt>
                  <dd>
                    {row.href ? (
                      <a href={row.href} target="_blank" rel="noreferrer">
                        {row.value}
                      </a>
                    ) : (
                      row.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}
        </section>
      ) : null}

      <div className="ft-case-detail__sequence">
        {Array.from({length: sectionCount}, (_, index) => {
          const image = heroImages[index];
          const html = remainingContent[index];
          if (!image && !html) return null;

          return (
            <section className="ft-case-detail__chapter" key={index}>
              {image ? <ProjectImage image={image} fallbackAlt={article.title} /> : null}
              {html ? <RichText html={html} /> : null}
            </section>
          );
        })}
      </div>

      {videos.length ? (
        <section className="ft-case-detail__videos" aria-label="Project videos">
          {videos.map((video) => (
            // Shopify's Videos field has no caption-track field to query.
            // eslint-disable-next-line jsx-a11y/media-has-caption
            <video
              key={video.sources.map((source) => source.url).join('|')}
              className="ft-case-detail__video"
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

      <div className="ft-case-detail__experts">
        <HomeExperts />
      </div>
    </div>
  );
}

function ProjectImage({
  image,
  fallbackAlt,
  eager = false,
}: {
  image: ShopifyImage;
  fallbackAlt: string;
  eager?: boolean;
}) {
  return (
    <figure className="ft-case-detail__visual">
      <img
        src={image.url}
        alt={image.altText || fallbackAlt}
        width={image.width ?? undefined}
        height={image.height ?? undefined}
        loading={eager ? 'eager' : 'lazy'}
        fetchPriority={eager ? 'high' : undefined}
        decoding="async"
      />
    </figure>
  );
}

function RichText({html}: {html: string}) {
  return (
    <div
      className="ft-case-detail__rich-text"
      dangerouslySetInnerHTML={{__html: html}}
    />
  );
}

function splitArticleContent(html: string): string[] {
  const content = html.trim();
  if (!content) return [];

  const sections = content
    .split(/(?=<h[23](?:\s[^>]*)?>)/i)
    .map((section) => section.trim())
    .filter(Boolean);

  return sections.length ? sections : [content];
}

function normalizeText(value?: string | null): string {
  return (value ?? '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

function startsWithBriefHeading(html: string): boolean {
  const match = html.match(/^\s*<h[23](?:\s[^>]*)?>([\s\S]*?)<\/h[23]>/i);
  return normalizeText(match?.[1]).toLocaleLowerCase() === 'the brief';
}

function formatMetafieldValue(value?: string | null): string | null {
  const trimmed = value?.trim();
  if (!trimmed) return null;

  try {
    const parsed: unknown = JSON.parse(trimmed);
    if (Array.isArray(parsed)) {
      const entries = parsed.filter((item): item is string => typeof item === 'string');
      return entries.length ? entries.join(', ') : null;
    }
    return typeof parsed === 'string' ? parsed : trimmed;
  } catch {
    return trimmed;
  }
}

function getFieldImage(field?: MetaobjectField): ShopifyImage | null {
  const references = [field?.reference, ...(field?.references?.nodes ?? [])];
  return references.find((reference) => reference?.image)?.image ?? null;
}

function getVideos(field?: MetaobjectField) {
  const references = [field?.reference, ...(field?.references?.nodes ?? [])];
  const videos = references.flatMap((reference) => {
    if (!reference) return [];
    const poster = reference.previewImage?.url ?? null;
    if (reference.sources?.length) {
      return [{sources: reference.sources, poster}];
    }
    if (reference.url && reference.mimeType?.startsWith('video/')) {
      return [
        {
          sources: [{url: reference.url, mimeType: reference.mimeType}],
          poster,
        },
      ];
    }
    return [];
  });

  if (videos.length || !field?.value) return videos;

  try {
    const parsed: unknown = JSON.parse(field.value);
    const urls = Array.isArray(parsed) ? parsed : [parsed];
    return urls
      .filter((url): url is string => typeof url === 'string' && /^https?:\/\//.test(url))
      .map((url) => ({sources: [{url, mimeType: null}], poster: null}));
  } catch {
    return /^https?:\/\//.test(field.value)
      ? [{sources: [{url: field.value, mimeType: null}], poster: null}]
      : [];
  }
}
