/**
 * JSON-LD wiring for route `meta()` exports.
 *
 * `app/lib/seo/schema.ts` is the single source of truth for schema values and
 * is never modified here — this file only decides which of its nodes a given
 * route emits, and adapts loader data into the shapes its builders expect.
 *
 * Emission goes through React Router's `script:ld+json` meta descriptor, which
 * renders into <head> in the server HTML (via <Meta /> in root.tsx) and
 * HTML-escapes the serialised JSON, so Shopify-authored titles and summaries
 * cannot break out of the <script> block.
 */

import {
  SERVICES,
  articleSchema,
  breadcrumbSchema,
  caseStudySchema,
  serviceSchema,
  type ServiceDefinition,
} from './schema';

type JsonLd = Record<string, unknown>;

/** A `script:ld+json` meta descriptor. */
type JsonLdDescriptor = {'script:ld+json': JsonLd};

/**
 * Wraps nodes as meta descriptors, dropping anything null — `serviceSchema()`
 * returns null for an unknown path and a null must never reach the output.
 */
export function jsonLdMeta(
  nodes: Array<JsonLd | null | undefined>,
): JsonLdDescriptor[] {
  return nodes
    .filter((node): node is JsonLd => Boolean(node))
    .map((node) => ({'script:ld+json': node}));
}

const trimSlash = (p: string) =>
  p.length > 1 && p.endsWith('/') ? p.slice(0, -1) : p;

/**
 * SERVICES paths are written exactly as they resolve live, and some carry a
 * trailing slash while others don't (`/geo-agency/` vs `/shopify-plus-agency`).
 * Matching ignores that difference so a request either spelling still finds its
 * definition, but the value returned is always the canonical spelling from
 * SERVICES — so the emitted `url` and `@id` are the ones the module defines,
 * never the request's.
 */
export function findService(pathname: string): ServiceDefinition | null {
  const target = trimSlash(pathname);
  return SERVICES.find((s) => trimSlash(s.path) === target) ?? null;
}

/** Service + breadcrumb nodes for a service page. Empty for any other path. */
export function serviceJsonLd(pathname: string): JsonLdDescriptor[] {
  const def = findService(pathname);
  if (!def) return [];

  return jsonLdMeta([
    serviceSchema(def.path),
    breadcrumbSchema([
      {name: 'Services', path: '/services'},
      {name: def.name, path: def.path},
    ]),
  ]);
}

/**
 * Plain text from article/page HTML, for deriving a description when the
 * Shopify summary is empty. Returns undefined rather than an empty string so
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
  return text.length <= max ? text : `${text.slice(0, max).trimEnd()}…`;
}

export interface ArticleJsonLdInput {
  path: string;
  title: string | null | undefined;
  /** Shopify `seo.description`, then `excerpt`, then body text. */
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
    authorName: input.authorName ?? 'The Fold Tech',
  } as Parameters<typeof articleSchema>[0]);

  // Never emit empty strings or an undefined dateModified.
  for (const key of ['description', 'image', 'dateModified'] as const) {
    const value = (node as JsonLd)[key];
    if (value === '' || value === undefined || value === null) {
      delete (node as JsonLd)[key];
    }
  }

  return jsonLdMeta([
    node,
    breadcrumbSchema([
      {name: 'Articles', path: '/articles/'},
      {name: input.title, path: input.path},
    ]),
  ]);
}

/** Case study + breadcrumb nodes for a `/pages/cs-*` page. */
export function caseStudyJsonLd(opts: {
  path: string;
  clientName: string;
  headline: string;
  description?: string;
  imageUrl?: string;
}): JsonLdDescriptor[] {
  if (!opts.headline) return [];

  return jsonLdMeta([
    caseStudySchema({
      path: opts.path,
      clientName: opts.clientName,
      headline: opts.headline,
      description: opts.description ?? '',
      ...(opts.imageUrl ? {imageUrl: opts.imageUrl} : {}),
    }),
    breadcrumbSchema([
      {name: 'Our Work', path: '/work'},
      {name: opts.headline, path: opts.path},
    ]),
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
