import {useEffect, useMemo, useState} from 'react';
import {Link} from 'react-router';
import {HomeExperts} from '../HomeExperts';
import {ARTICLES_CLEAN_PATH, withCanonicalLinks} from '~/lib/route-mappings';

export type EditorialArticle = {
  title: string;
  excerpt?: string | null;
  contentHtml: string;
  publishedAt: string;
  authorV2?: {name?: string | null} | null;
  articleType?: {value: string} | null;
  lastModified?: {value: string} | null;
};

type Heading = {id: string; text: string; level: number};

const WORDS_PER_MINUTE = 220;

export function ArticleDetail({article}: {article: EditorialArticle}) {
  const {html, headings} = useMemo(
    () => withHeadingAnchors(withCanonicalLinks(article.contentHtml)),
    [article.contentHtml],
  );
  // Only top-level sections go in the index. A long guide carries dozens of
  // h3 subheadings, which would make the rail longer than the viewport.
  const sections = useMemo(
    () => headings.filter((heading) => heading.level === 2),
    [headings],
  );
  const activeId = useActiveHeading(sections);

  const readingMinutes = Math.max(
    1,
    Math.round(countWords(article.contentHtml) / WORDS_PER_MINUTE),
  );
  const eyebrow = article.articleType?.value.trim() || 'Ecommerce insights';
  const author = article.authorV2?.name?.trim();

  return (
    <article className="ft-article">
      <div className="ft-article__glow" aria-hidden="true" />

      <header className="ft-article__hero">
        <Link className="ft-article__back" to={ARTICLES_CLEAN_PATH}>
          <span aria-hidden="true">&larr;</span>
          All articles
        </Link>

        <p className="ft-article__meta">
          <span>{eyebrow}</span>
          <span>{formatDate(article.publishedAt)}</span>
          <span>{readingMinutes} min read</span>
          {author ? <span>{author}</span> : null}
        </p>

        <h1 className="ft-article__title">{article.title}</h1>

        {article.excerpt ? (
          <p className="ft-article__standfirst">{article.excerpt}</p>
        ) : null}
      </header>

      <div className="ft-article__layout">
        {sections.length > 2 ? (
          <nav className="ft-article__index" aria-label="Sections">
            <p className="ft-article__index-label">Jump to a section</p>

            <ul className="ft-article__index-list">
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    className="ft-article__index-link"
                    href={`#${section.id}`}
                    aria-current={section.id === activeId ? 'true' : undefined}
                  >
                    {/* Clamped on the inner span: clamping the padded link
                        itself leaves a sliver of the third line showing. */}
                    <span>{section.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}

        <div
          className="ft-article__body"
          dangerouslySetInnerHTML={{__html: html}}
        />
      </div>

      <HomeExperts />
    </article>
  );
}

/**
 * Marks the section currently being read. The observation band sits just
 * below the fixed header and stops short of the fold, so the active item
 * changes when a heading reaches the top of the reading area rather than
 * when it first enters the viewport.
 */
function useActiveHeading(sections: Heading[]) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (!sections.length || typeof IntersectionObserver === 'undefined') return;

    const elements = sections
      .map(({id}) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const topMost = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          )[0];

        if (topMost) setActiveId(topMost.target.id);
      },
      // rootMargin only accepts px and %, never rem.
      {rootMargin: '-140px 0px -65% 0px'},
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [sections]);

  return activeId;
}

/**
 * Gives every h2/h3 in the Shopify rich text a stable id and returns the
 * headings found, so the index and the deep links share one source of truth.
 * Ids authored in Shopify win, which keeps existing inbound anchors working.
 */
function withHeadingAnchors(contentHtml: string) {
  const headings: Heading[] = [];
  const used = new Set<string>();

  const html = contentHtml.replace(
    /<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi,
    (match, level: string, attributes: string, inner: string) => {
      const text = stripTags(inner);
      if (!text) return match;

      const authored = /\bid=["']([^"']+)["']/i.exec(attributes)?.[1];
      const id = uniqueId(authored || slugify(text), used);
      const rest = attributes.replace(/\s*\bid=["'][^"']*["']/i, '');

      headings.push({id, text, level: Number(level)});

      return `<h${level}${rest} id="${id}">${inner}</h${level}>`;
    },
  );

  return {html, headings};
}

function uniqueId(base: string, used: Set<string>) {
  let id = base;
  let suffix = 2;

  while (used.has(id)) id = `${base}-${suffix++}`;

  used.add(id);
  return id;
}

function slugify(text: string) {
  const slug = text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  // These become shareable anchor URLs, so a long heading is cut back to a
  // whole word rather than left dangling mid-word.
  if (slug.length <= 60) return slug || 'section';

  const clipped = slug.slice(0, 60);
  const lastBreak = clipped.lastIndexOf('-');

  return (lastBreak > 20 ? clipped.slice(0, lastBreak) : clipped) || 'section';
}

function stripTags(html: string) {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&#39;|&rsquo;/gi, '’')
    .replace(/\s+/g, ' ')
    .trim();
}

function countWords(html: string) {
  const text = stripTags(html);
  return text ? text.split(' ').length : 0;
}

function formatDate(value: string) {
  const date = new Date(value);

  return Number.isNaN(date.getTime())
    ? ''
    : new Intl.DateTimeFormat('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(date);
}
