import {Link} from '~/lib/router-compat';
import {HomeExperts} from '../HomeExperts';
import {CalendlyButton} from '~/components/shared/CalendlyButton';
import {softwareImageSrcSet} from '~/lib/software-cdn-image';
import {responsiveImage} from '~/lib/responsive-image';
import {TechIcon} from './TechIcon';
import {parseCaseStudy, type CaseStudyContent} from '~/lib/case-study-page';

type SoftwareImage = {
  url: string;
  altText?: string | null;
  width?: number | null;
  height?: number | null;
};

type MediaReference = {
  image?: SoftwareImage | null;
  alt?: string | null;
  mimeType?: string | null;
  url?: string | null;
  previewImage?: SoftwareImage | null;
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
  image?: SoftwareImage | null;
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

type Detail = {
  label: string;
  value: string;
  /** External URL (opens in a new tab), e.g. the client's website. */
  href?: string;
  /** Internal pages, rendered as same-tab links separated by commas. */
  links?: {label: string; href: string}[];
};

export type RelatedCaseStudy = {
  title: string;
  href: string;
  category?: string;
  summary?: string;
  image?: {url: string; altText?: string; width?: number; height?: number};
};

type CaseStudyLayoutProps = {
  title: string;
  subtitle?: string;
  content: CaseStudyContent;
  /** Short facts shown in the hero bar (the first four). */
  details: Detail[];
  /** Technologies, rendered with icons in their own section. */
  chips: string[];
  /** Services delivered, shown in the "Services" section. */
  services?: string[];
  /** Service pages this project relates to. */
  serviceLinks?: Array<{label: string; href: string}>;
  /** First image leads the page; the rest sit between chapters. */
  images: SoftwareImage[];
  videos?: Video[];
  /** "More case studies" cards at the end of the page. */
  related?: RelatedCaseStudy[];
  /** Live product or client website, shown as a "Visit Website" button. */
  website?: string;
  /** Show the lead image at its own aspect ratio instead of a 16:9 crop. */
  naturalLeadImage?: boolean;
  /** Overrides the closing call-to-action copy. */
  cta?: {
    eyebrow?: string;
    heading: string;
    description: string[];
    /** Hide the decorative photos in the closing section. */
    hideMedia?: boolean;
  };
};

/** Shared layout for `/work/:handle` and `/case-studies/:handle`. */
export function CaseStudyLayout({
  title,
  subtitle,
  content,
  details,
  chips,
  services = [],
  serviceLinks = [],
  images,
  videos = [],
  related = [],
  website,
  naturalLeadImage = false,
  cta,
}: CaseStudyLayoutProps) {
  const [leadImage, ...galleryImages] = images;
  const heroDetails = details.slice(0, 4);

  return (
    <article className="ft-cs">
      <header className="ft-cs__hero">
        <div className="ft-cs__glow" aria-hidden="true" />
        <nav className="ft-cs__crumbs" aria-label="Breadcrumb">
          <Link to="/work">Our Work</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{title} Case Study</span>
        </nav>
        <h1 className="ft-cs__title">{title}</h1>
        {subtitle ? <p className="ft-cs__subtitle">{subtitle}</p> : null}

        {heroDetails.length ? (
          <dl className="ft-cs__facts">
            {heroDetails.map((detail) => (
              <div className="ft-cs__fact" key={detail.label}>
                <dt>{detail.label}</dt>
                <dd>
                  {detail.links?.length ? (
                    detail.links.map((link, index) => (
                      <span key={link.href}>
                        {index > 0 ? ', ' : null}
                        <Link to={link.href}>{link.label}</Link>
                      </span>
                    ))
                  ) : detail.href ? (
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
          {website ? (
            <a
              className="ft-cs__visit"
              href={website}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Website
              <span aria-hidden="true">↗</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ) : null}
          <Link className="ft-cs__more" to="/contact">
            Discuss a similar project
          </Link>
          <Link className="ft-cs__more" to="/work">
            See more work
          </Link>
        </div>
      </header>

      {leadImage ? (
        <ProjectImage
          image={leadImage}
          alt={title}
          eager
          natural={naturalLeadImage}
        />
      ) : null}

      {content.intro ? (
        <section className="ft-cs__brief" aria-labelledby="ft-cs-brief">
          <p className="ft-cs__eyebrow" id="ft-cs-brief">
            The Brief
          </p>
          <p className="ft-cs__intro">{content.intro}</p>
        </section>
      ) : null}

      {chips.length ? (
        <section className="ft-cs__section" aria-labelledby="ft-cs-tech">
          <header className="ft-cs__chapter-head">
            <p className="ft-cs__eyebrow">Tech Stack</p>
            <h2 id="ft-cs-tech">Technologies</h2>
          </header>
          <ul className="ft-cs__tech">
            {chips.map((chip) => (
              <li key={chip}>
                <TechIcon name={chip} />
                <span>{chip}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {services.length || serviceLinks.length || website ? (
        <section className="ft-cs__section" aria-labelledby="ft-cs-services">
          <header className="ft-cs__chapter-head">
            <p className="ft-cs__eyebrow">What We Delivered</p>
            <h2 id="ft-cs-services">Services</h2>
          </header>
          {services.length ? (
            <ul className="ft-cs__services">
              {services.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          ) : null}
          {serviceLinks.length || website ? (
            <ul className="ft-cs__service-links">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link className="ft-cs__service-link" to={link.href}>
                    <span className="ft-cs__service-label">Related service</span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
              {website ? (
                <li>
                  <a
                    className="ft-cs__service-link"
                    href={website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="ft-cs__service-label">Website</span>
                    <span>
                      {website.replace(/^https?:\/\//, '').replace(/\/$/, '')}{' '}
                      <span aria-hidden="true">↗</span>
                    </span>
                  </a>
                </li>
              ) : null}
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
            {chapter.body?.length ? (
              <div className="ft-cs__chapter-body">
                {chapter.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            ) : null}
            {chapter.image ? (
              <ProjectImage image={chapter.image} alt={chapter.title} natural />
            ) : null}
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
            // Software's Videos field has no caption-track field to query.
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

      {related.length ? (
        <section className="ft-cs__related" aria-labelledby="ft-cs-related">
          <header className="ft-cs__chapter-head">
            <p className="ft-cs__eyebrow">More Work</p>
            <h2 id="ft-cs-related">More case studies</h2>
          </header>
          <ul className="ft-cs__related-grid">
            {related.map((item) => (
              <li key={item.href}>
                <Link className="ft-cs__related-card" to={item.href}>
                  {item.image ? (
                    <img
                      className="ft-cs__related-image"
                      {...responsiveImage(
                        item.image.url,
                        '(min-width: 56rem) 30vw, 92vw',
                        1080,
                      )}
                      width={item.image.width ?? 1920}
                      height={item.image.height ?? 1080}
                      alt={item.image.altText || item.title}
                      loading="lazy"
                      decoding="async"
                    />
                  ) : null}
                  <span className="ft-cs__related-body">
                    {item.category ? (
                      <span className="ft-cs__eyebrow">{item.category}</span>
                    ) : null}
                    <span className="ft-cs__related-title">{item.title}</span>
                    {item.summary ? (
                      <span className="ft-cs__related-summary">{item.summary}</span>
                    ) : null}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <HomeExperts
        {...(cta
          ? {
              eyebrow: cta.eyebrow,
              heading: cta.heading,
              description: cta.description,
              hideMedia: cta.hideMedia,
            }
          : {})}
      />
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
  ].filter(Boolean) as Detail[];

  const images = [
    article.image,
    ...Array.from({length: 5}, (_, index) =>
      fieldImage(fields.get(`hero_image_${index + 1}`)),
    ),
  ].filter(Boolean) as SoftwareImage[];

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
  natural = false,
}: {
  image: SoftwareImage;
  alt: string;
  eager?: boolean;
  /** Product screenshots keep their own aspect ratio instead of 16:9. */
  natural?: boolean;
}) {
  return (
    <figure
      className={natural ? 'ft-cs__visual ft-cs__visual--natural' : 'ft-cs__visual'}
    >
      <img
        src={image.url}
        srcSet={softwareImageSrcSet(
          image.url,
          natural ? [640, 1080, 1600] : [800, 1400, 2000],
        )}
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

function fieldImage(field?: MetaobjectField): SoftwareImage | null {
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
