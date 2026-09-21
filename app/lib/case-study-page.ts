/**
 * Parses a case-study body — a Shopify `cs-*` page or a case-study blog
 * post — into structured data for `CaseStudyLayout`.
 *
 * Both sources are `<h2>` chapters of bold-labelled points:
 * - pages: intro, `<p><b>Label</b></p><p>Value</p>` details and a `<ul>` of
 *   stats before the first `<h2>`; chapters ("01 The Challenge") hold an
 *   `<h3>` subheading and a `<ul>` of points.
 * - blog posts: a "The Brief" chapter, then chapters whose points run
 *   together in one paragraph as `<b>Label:</b> text<b>Label:</b> text`.
 *
 * Some bodies were pasted from a chat tool and carry wrapper divs, spans and
 * empty comments, so markup is normalised first.
 */
export type CaseStudyContent = {
  intro: string;
  details: Array<{label: string; value: string}>;
  stats: Array<{value: string; label: string}>;
  chapters: Array<{
    number: string;
    title: string;
    subheading: string;
    points: Array<{title: string; text: string}>;
  }>;
};

export function parseCaseStudy(
  body: string,
  title: string,
): CaseStudyContent {
  const html = normalise(body)
    // Pages open with an <h1> repeating the title the hero already shows;
    // some posts use <h1> for their section headings instead of <h2>.
    .replace(/<h1>([\s\S]*?)<\/h1>/g, (_heading, inner: string) =>
      text(inner) === title.trim() ? '' : `<h2>${inner}</h2>`,
    );
  const [pre, ...chapterHtml] = html.split(/<h2>/);

  // Detail pairs: a bold-only paragraph followed by a plain one.
  const details: CaseStudyContent['details'] = [];
  const preWithoutDetails = pre.replace(
    /<p><b>([^<]+)<\/b><\/p><p>([^<]+)<\/p>/g,
    (_, label: string, value: string) => {
      details.push({label: text(label), value: text(value)});
      return '';
    },
  );

  const stats = listItems(preWithoutDetails).map((item) => {
    const match = item.match(/^<b>([^<]+)<\/b>([\s\S]*)$/);
    return match
      ? {value: text(match[1]), label: text(match[2])}
      : {value: '', label: text(item)};
  });

  let intro =
    paragraphs(preWithoutDetails.replace(/<ul>[\s\S]*?<\/ul>/g, ''))
      .map(text)
      .find(Boolean) ?? '';

  const chapters = chapterHtml
    .map((chunk) => {
      const [heading = '', rest = ''] = chunk.split('</h2>');
      const headingText = text(heading);
      const numbered = headingText.match(/^(\d+)\s+([\s\S]+)$/);
      const subheading = text(rest.match(/<h3>([\s\S]*?)<\/h3>/)?.[1] ?? '');
      const body = rest.replace(/<h3>[\s\S]*?<\/h3>/, '');
      const items = listItems(body);

      return {
        number: numbered?.[1] ?? '',
        title: numbered?.[2] ?? headingText,
        subheading,
        points: items.length ? items.map(labelledPoint) : boldRuns(body),
        body,
      };
    })
    // A blog post's "The Brief" chapter is the intro.
    .filter((chapter) => {
      if (intro || !/^the brief$/i.test(chapter.title)) return true;
      intro = text(chapter.body);
      return false;
    })
    .map(({body: _body, ...chapter}, index) => ({
      ...chapter,
      number: chapter.number || String(index + 1).padStart(2, '0'),
    }));

  return {intro, details, stats, chapters};
}

function normalise(body: string): string {
  return (
    body
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/<sup[^>]*>[\s\S]*?<\/sup>/gi, '')
      .replace(/<\/?(?:span|br)[^>]*>/gi, '')
      // Chat-tool pastes use <div> where the template uses <p>.
      .replace(/<(\/?)div(?=[\s>])[^>]*>/gi, '<$1p>')
      .replace(/<(\/?)strong(?=[\s>])[^>]*>/gi, '<$1b>')
      .replace(/<([a-z0-9]+)\s[^>]*>/gi, '<$1>')
      .replace(/<b>\s*<\/b>/g, '')
      // `<b>Label</b>:` (colon outside the bold) reads the same as inside.
      .replace(/<\/b>:/g, ':</b>')
      .replace(/>\s+</g, '><')
  );
}

/** "<b>Label:</b> text" → {title, text}. */
function labelledPoint(item: string) {
  const match = item.match(/^<b>([\s\S]*?)<\/b>([\s\S]*)$/);
  return match
    ? {title: text(match[1]).replace(/:$/, ''), text: text(match[2])}
    : {title: '', text: text(item)};
}

/** Splits "<b>A:</b> x<b>B:</b> y" into one point per bold label. */
function boldRuns(html: string) {
  const runs = [...html.matchAll(/<b>([\s\S]*?)<\/b>([\s\S]*?)(?=<b>|$)/g)];
  if (!runs.length) {
    const only = text(html);
    return only ? [{title: '', text: only}] : [];
  }
  return runs.map((run) => ({
    title: text(run[1]).replace(/:$/, ''),
    text: text(run[2]),
  }));
}

function listItems(html: string): string[] {
  return [...html.matchAll(/<li>([\s\S]*?)<\/li>/g)].map((match) =>
    match[1].replace(/<\/?p>/g, '').trim(),
  );
}

function paragraphs(html: string): string[] {
  return [...html.matchAll(/<p>([\s\S]*?)<\/p>/g)].map((match) => match[1]);
}

function text(html: string): string {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#39;|&rsquo;/g, '’')
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
}
