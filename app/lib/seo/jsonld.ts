/**
 * JSON-LD wiring for route `meta()` exports.
 *
 * `app/lib/seo/schema.ts` is the single source of truth for schema values and
 * is never modified here — this file only decides which of its nodes a given
 * route emits, and adapts loader data into the shapes its builders expect.
 *
 * Emission goes through React Router's `script:ld+json` meta descriptor, which
 * renders into <head> in the server HTML (via <Meta /> in root.tsx) and
 * HTML-escapes the serialised JSON, so Software-authored titles and summaries
 * cannot break out of the <script> block.
 */

import {
  SERVICES,
  absoluteUrl,
  articleSchema,
  breadcrumbSchema,
  caseStudySchema,
  faqSchema,
  itemListSchema,
  serviceSchema,
  webPageSchema,
  type FaqItem,
  type ServiceDefinition,
  type WebPageType,
} from './schema';

type JsonLd = Record<string, unknown>;

/** A `script:ld+json` meta descriptor. */
type JsonLdDescriptor = {'script:ld+json': JsonLd};

/**
 * Wraps a page's nodes in ONE `@graph` under ONE `@context`, dropping anything
 * null — `serviceSchema()` returns null for an unknown path and a null must
 * never reach the output.
 *
 * Every route emits at most one of these. Together with the sitewide
 * Organization + WebSite graph that `root.tsx` renders, a page carries two
 * script blocks that reference each other by `@id`, rather than the three or
 * four unrelated documents the per-builder `@context` used to produce.
 */
export function pageGraph(
  nodes: Array<JsonLd | null | undefined>,
): JsonLdDescriptor[] {
  const graph = nodes.filter((node): node is JsonLd => Boolean(node));
  if (!graph.length) return [];

  return [
    {'script:ld+json': {'@context': 'https://schema.org', '@graph': graph}},
  ];
}

const trimSlash = (p: string) =>
  p.length > 1 && p.endsWith('/') ? p.slice(0, -1) : p;

/**
 * SERVICES paths are written exactly as they resolve live, and some carry a
 * trailing slash while others don't (`/geo-agency/` vs `/software-plus-agency`).
 * Matching ignores that difference so a request either spelling still finds its
 * definition, but the value returned is always the canonical spelling from
 * SERVICES — so the emitted `url` and `@id` are the ones the module defines,
 * never the request's.
 */
export function findService(pathname: string): ServiceDefinition | null {
  const target = trimSlash(pathname);
  return SERVICES.find((s) => trimSlash(s.path) === target) ?? null;
}

/**
 * Full graph for a service page: WebPage + BreadcrumbList + Service, plus
 * FAQPage when the page renders FAQs. Empty for any other path.
 *
 * `faqs` must be the same items the page renders visibly — see `faqSchema`.
 */
export function serviceJsonLd(
  pathname: string,
  opts: {description?: string | null; faqs?: readonly FaqItem[]} = {},
): JsonLdDescriptor[] {
  const def = findService(pathname);
  if (!def) return [];

  return pageGraph([
    webPageSchema({
      path: def.path,
      name: def.name,
      description: opts.description?.trim() || def.description,
      mainEntityId: `${absoluteUrl(def.path)}#service`,
      hasBreadcrumb: true,
    }),
    breadcrumbSchema([
      {name: 'Services', path: '/services'},
      {name: def.name, path: def.path},
    ]),
    serviceSchema(def.path),
    opts.faqs?.length ? faqSchema(def.path, [...opts.faqs]) : null,
  ]);
}

/**
 * Full graph for a page that is not a service, an article or a case study —
 * `/about`, `/contact`, the listing pages, and the remaining CMS pages.
 *
 * `items` turns the page into a `CollectionPage` + `ItemList`; pass it for
 * index pages and leave it off for ordinary content pages.
 */
export function contentPageJsonLd(input: {
  path: string;
  name: string | null | undefined;
  description?: string | null;
  type?: WebPageType;
  imageUrl?: string | null;
  breadcrumbs?: Array<{name: string; path: string}>;
  faqs?: readonly FaqItem[];
  items?: Array<{name: string; path: string}>;
}): JsonLdDescriptor[] {
  if (!input.name) return [];

  const list = input.items?.length
    ? itemListSchema(input.path, input.items)
    : null;

  return pageGraph([
    webPageSchema({
      path: input.path,
      name: input.name,
      description: input.description?.trim() || undefined,
      type: input.type,
      imageUrl: input.imageUrl ?? undefined,
      mainEntityId: list ? `${absoluteUrl(input.path)}#itemlist` : undefined,
      hasBreadcrumb: Boolean(input.breadcrumbs?.length),
    }),
    input.breadcrumbs?.length ? breadcrumbSchema(input.breadcrumbs) : null,
    list,
    input.faqs?.length ? faqSchema(input.path, [...input.faqs]) : null,
  ]);
}

/**
 * Plain text from article/page HTML, for deriving a description when the
 * Software summary is empty. Returns undefined rather than an empty string so
 * callers can omit the field instead of emitting `description: ""`.
 */
export function textFromHtml(
  html: string | null | undefined,
  max = 200,
): string | undefined {
  if (!html) return undefined;

  const text = html
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#0?39;|&apos;/gi, "'")
    .replace(/\s+/g, ' ')
    .trim();

  if (!text) return undefined;
  return text.length <= max
    ? text
    : `${text.slice(0, max + 1).replace(/\s+\S*$/, '')}…`;
}

/**
 * Meta description when Software has none: the excerpt, else the body's first
 * paragraph, since case studies open with a "The Brief" heading. 145
 * characters keeps it inside the ~1000px search results display.
 */
export function descriptionFromContent(
  excerpt: string | null | undefined,
  contentHtml: string | null | undefined,
): string | undefined {
  const firstParagraph = contentHtml
    ? /<p\b[^>]*>([\s\S]*?)<\/p>/i.exec(contentHtml)?.[1]
    : undefined;

  return (
    textFromHtml(excerpt, 145) ||
    textFromHtml(firstParagraph, 145) ||
    textFromHtml(contentHtml, 145)
  );
}

export interface ArticleJsonLdInput {
  path: string;
  title: string | null | undefined;
  /** Software `seo.description`, then `excerpt`, then body text. */
  seoDescription?: string | null;
  excerpt?: string | null;
  contentHtml?: string | null;
  imageUrl?: string | null;
  publishedAt?: string | null;
  /**
   * Storefront API Articles expose no `updatedAt`, so this is usually
   * undefined and the field is then omitted rather than back-filled with
   * publishedAt, which would assert a modification date that isn't true.
   */
  updatedAt?: string | null;
  authorName?: string | null;
}

/** Article + breadcrumb nodes for a blog article. */
export function articleJsonLd(
  input: ArticleJsonLdInput,
): JsonLdDescriptor[] {
  if (!input.title || !input.publishedAt) return [];

  const description =
    input.seoDescription?.trim() ||
    input.excerpt?.trim() ||
    textFromHtml(input.contentHtml);

  const node = articleSchema({
    path: input.path,
    headline: input.title,
    // `description` is typed as required, so pass '' and strip the key below
    // rather than emitting an empty string into the output.
    description: description ?? '',
    imageUrl: input.imageUrl ?? '',
    datePublished: input.publishedAt,
    dateModified: input.updatedAt ?? undefined,
    authorName: input.authorName ?? 'Byte Operator',
  } as Parameters<typeof articleSchema>[0]);

  // Never emit empty strings or an undefined dateModified.
  for (const key of ['description', 'image', 'dateModified'] as const) {
    const value = (node as JsonLd)[key];
    if (value === '' || value === undefined || value === null) {
      delete (node as JsonLd)[key];
    }
  }

  return pageGraph([
    webPageSchema({
      path: input.path,
      name: input.title,
      description,
      imageUrl: input.imageUrl ?? undefined,
      mainEntityId: `${absoluteUrl(input.path)}#article`,
      hasBreadcrumb: true,
      datePublished: input.publishedAt,
      dateModified: input.updatedAt ?? undefined,
    }),
    breadcrumbSchema([
      {name: 'Articles', path: '/articles'},
      {name: input.title, path: input.path},
    ]),
    node,
  ]);
}

/**
 * Full graph for a case study: WebPage + BreadcrumbList + CreativeWork.
 *
 * Serves both `/work/:handle` (the real, populated case studies) and the
 * `/pages/cs-*` pages, which stay suppressed by `isKnownEmptyPage()` until
 * they have content.
 */
export function caseStudyJsonLd(opts: {
  path: string;
  /** Omitted rather than guessed — see `caseStudySchema`. */
  clientName?: string;
  headline: string;
  description?: string;
  imageUrl?: string;
  datePublished?: string;
}): JsonLdDescriptor[] {
  if (!opts.headline) return [];

  return pageGraph([
    webPageSchema({
      path: opts.path,
      name: opts.headline,
      description: opts.description,
      imageUrl: opts.imageUrl,
      mainEntityId: `${absoluteUrl(opts.path)}#casestudy`,
      hasBreadcrumb: true,
      datePublished: opts.datePublished,
    }),
    breadcrumbSchema([
      {name: 'Our Work', path: '/work'},
      {name: opts.headline, path: opts.path},
    ]),
    caseStudySchema({
      path: opts.path,
      clientName: opts.clientName,
      headline: opts.headline,
      description: opts.description ?? '',
      ...(opts.imageUrl ? {imageUrl: opts.imageUrl} : {}),
      ...(opts.datePublished ? {datePublished: opts.datePublished} : {}),
    }),
  ]);
}

/**
 * `/pages/cs-nevuu` -> `Nevuu`. Used only as a fallback when the page has no
 * explicit client name; never invents anything beyond reformatting the handle.
 */
export function clientNameFromHandle(handle: string): string {
  return handle
    .replace(/^cs-/, '')
    .split('-')
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}
