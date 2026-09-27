#!/usr/bin/env node
/**
 * Structured-data assertions for every page type the site serves.
 *
 * READ-ONLY. Fetches pages from a running server and checks the JSON-LD they
 * actually render. This is the runbook's "local assertion suite" (Phase 1.1,
 * Appendix B) made runnable.
 *
 * What it guards, in order of how badly each one breaks the graph:
 *
 *   1. Every `<script type="application/ld+json">` parses.
 *   2. No duplicate `@id` on a page — two nodes claiming one identity is the
 *      failure mode that silently merges unrelated entities.
 *   3. Every `@id` REFERENCE resolves to a node defined on the same page.
 *      This is the check that catches the dangling `mainEntityOfPage` class of
 *      bug, where a node points at an `@id` nothing defines.
 *   4. Exactly one WebPage-family node per indexable page, and its `@id` is
 *      `<canonical>#webpage` — the canonical and the graph must agree.
 *   5. Every absolute URL in the graph is on SITE_URL.
 *   6. `@context` appears only at the root of a graph, never on a member node.
 *   7. Every FAQPage question is present in the rendered HTML. FAQ markup whose
 *      Q&A isn't visible is a policy violation, not a shortcut.
 *
 *   node scripts/check-schema.mjs                  # every URL in sitemap.xml
 *   node scripts/check-schema.mjs --sample         # one of each page type
 *   node scripts/check-schema.mjs --origin=https://www.byteoperator.com
 *   node scripts/check-schema.mjs --paths=/,/about,/contact
 */

import {readFileSync} from 'node:fs';

const SCHEMA_TS = 'app/lib/seo/schema.ts';

/** SITE_URL is declared once, in schema.ts. Read it rather than restate it. */
function readSiteUrl() {
  const source = readFileSync(SCHEMA_TS, 'utf8');
  const match = source.match(/export const SITE_URL = '([^']+)'/);
  if (!match) {
    throw new Error(`Could not find SITE_URL in ${SCHEMA_TS}`);
  }
  return match[1];
}

/**
 * The pages that deliberately emit no page graph (runbook 0.5). Read from the
 * source rather than restated, so deleting a line there is enough — this
 * script starts expecting a graph on that page automatically.
 */
function readKnownEmptyPaths() {
  const source = readFileSync('app/lib/seo/empty-pages.ts', 'utf8');
  const block = source
    .split('KNOWN_EMPTY_PAGE_PATHS')[1]
    ?.split(']')[0];
  if (!block) return new Set();
  return new Set([...block.matchAll(/'([^']+)'/g)].map((m) => m[1]));
}

const SITE_URL = readSiteUrl();
const KNOWN_EMPTY = readKnownEmptyPaths();

const normalisePath = (p) => p.replace(/\/+$/, '') || '/';
const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const args = process.argv.slice(2);
const argValue = (name) =>
  args.find((a) => a.startsWith(`--${name}=`))?.split('=').slice(1).join('=');

const ORIGIN = argValue('origin') ?? 'http://localhost:3000';

/** One of each page type. Dynamic ones are discovered below. */
const DEFAULT_PATHS = [
  '/',
  '/about',
  '/contact',
  '/work',
  '/services',
  '/articles',
  '/blogs',
  '/shopify-plus-agency',
  '/geo-agency/',
];

const WEBPAGE_TYPES = new Set([
  'WebPage',
  'AboutPage',
  'ContactPage',
  'CollectionPage',
  'ItemPage',
  'CheckoutPage',
  'SearchResultsPage',
]);

const failures = [];
const notes = [];
const skipped = {noindex: [], empty: []};

const fail = (path, message) => failures.push(`${path} — ${message}`);

/* ---------------------------------------------------------------- */
/* HTML helpers                                                       */
/* ---------------------------------------------------------------- */

function decodeEntities(text) {
  return text
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
}

function jsonLdBlocks(html) {
  const blocks = [];
  const re =
    /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = re.exec(html)) !== null) blocks.push(decodeEntities(match[1]));
  return blocks;
}

function canonicalOf(html) {
  const links = html.match(/<link\b[^>]*>/gi) ?? [];
  for (const tag of links) {
    if (!/rel=["']canonical["']/i.test(tag)) continue;
    const href = tag.match(/href=["']([^"']+)["']/i);
    if (href) return decodeEntities(href[1]);
  }
  return undefined;
}

function isNoindex(html) {
  const metas = html.match(/<meta\b[^>]*>/gi) ?? [];
  return metas.some(
    (tag) =>
      /name=["']robots["']/i.test(tag) && /noindex/i.test(tag),
  );
}

/** Visible text, for checking FAQ answers are actually on the page. */
function visibleText(html) {
  return decodeEntities(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<[^>]+>/g, ' '),
  )
    .replace(/\s+/g, ' ')
    .trim();
}

/* ---------------------------------------------------------------- */
/* Graph walking                                                      */
/* ---------------------------------------------------------------- */

/** Every node in a parsed block, flattening `@graph`. */
function flatten(parsed) {
  const roots = Array.isArray(parsed) ? parsed : [parsed];
  const nodes = [];
  for (const root of roots) {
    if (!root || typeof root !== 'object') continue;
    if (Array.isArray(root['@graph'])) nodes.push(...root['@graph']);
    else nodes.push(root);
  }
  return nodes;
}

/**
 * `@id` references — objects whose ONLY meaningful key is `@id`. A node that
 * carries `@id` alongside `@type` and real fields is a definition, not a
 * reference, so it is not collected here.
 */
function collectReferences(value, found = []) {
  if (Array.isArray(value)) {
    for (const item of value) collectReferences(item, found);
    return found;
  }
  if (!value || typeof value !== 'object') return found;

  const keys = Object.keys(value);
  if (keys.length === 1 && keys[0] === '@id') {
    found.push(value['@id']);
    return found;
  }
  for (const key of keys) {
    if (key === '@id') continue;
    collectReferences(value[key], found);
  }
  return found;
}

function collectUrls(value, found = []) {
  if (Array.isArray(value)) {
    for (const item of value) collectUrls(item, found);
    return found;
  }
  if (!value || typeof value !== 'object') return found;

  for (const [key, val] of Object.entries(value)) {
    if ((key === 'url' || key === '@id') && typeof val === 'string') {
      found.push(val);
    } else {
      collectUrls(val, found);
    }
  }
  return found;
}

/* ---------------------------------------------------------------- */
/* Per-page checks                                                    */
/* ---------------------------------------------------------------- */

function checkPage(path, html) {
  const blocks = jsonLdBlocks(html);

  if (!blocks.length) {
    fail(path, 'renders no JSON-LD at all');
    return;
  }

  const nodes = [];
  for (const [i, raw] of blocks.entries()) {
    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (error) {
      fail(path, `ld+json block ${i + 1} does not parse: ${error.message}`);
      continue;
    }

    /* 6. @context belongs at the graph root, not on member nodes. */
    const roots = Array.isArray(parsed) ? parsed : [parsed];
    for (const root of roots) {
      if (root && typeof root === 'object' && Array.isArray(root['@graph'])) {
        for (const member of root['@graph']) {
          if (member && typeof member === 'object' && member['@context']) {
            fail(
              path,
              `node ${member['@type']} carries its own @context inside a @graph`,
            );
          }
        }
      }
    }

    nodes.push(...flatten(parsed));
  }

  if (!nodes.length) {
    fail(path, 'JSON-LD parsed but contained no nodes');
    return;
  }

  /* 2. No duplicate @id. */
  const defined = new Set();
  for (const node of nodes) {
    const id = node?.['@id'];
    if (!id) continue;
    if (defined.has(id)) fail(path, `duplicate @id: ${id}`);
    defined.add(id);
  }

  /* 3. Every reference resolves. */
  for (const node of nodes) {
    for (const ref of collectReferences(node)) {
      if (defined.has(ref)) continue;
      if (ref === ORG_ID || ref === WEBSITE_ID) continue;
      fail(path, `dangling @id reference: ${ref}`);
    }
  }

  /* 5. Absolute URLs stay on SITE_URL. */
  for (const node of nodes) {
    for (const url of collectUrls(node)) {
      if (!/^https?:\/\//i.test(url)) {
        fail(path, `non-absolute url in graph: ${url}`);
        continue;
      }
      const onSite =
        url.startsWith(SITE_URL) ||
        // Images are legitimately served from Shopify's CDN.
        url.startsWith('https://cdn.shopify.com');
      if (!onSite && !isExternalProfile(url)) {
        fail(path, `url is not on ${SITE_URL}: ${url}`);
      }
    }
  }

  /* 8. No empty values. An empty field asserts "this is blank", not "unknown". */
  for (const node of nodes) {
    for (const [key, value] of Object.entries(node ?? {})) {
      if (value === '' || value === null) {
        fail(path, `${node['@type']}.${key} is empty — omit the key instead`);
      }
    }
  }

  const canonical = canonicalOf(html);
  const noindex = isNoindex(html);

  if (canonical && !/^https?:\/\//i.test(canonical)) {
    fail(path, `canonical is not absolute: ${canonical}`);
  }

  /* 4. Exactly one WebPage-family node, matching the canonical. */
  const pageNodes = nodes.filter((node) => {
    const type = node?.['@type'];
    const types = Array.isArray(type) ? type : [type];
    return types.some((t) => WEBPAGE_TYPES.has(t));
  });

  if (noindex) {
    skipped.noindex.push(path);
  } else if (KNOWN_EMPTY.has(normalisePath(path))) {
    /*
     * Listed in KNOWN_EMPTY_PAGE_PATHS: renders nothing but chrome, so it
     * deliberately emits no page graph. Describing a blank page would assert
     * content that isn't there. Not a failure — but if one of these DOES have
     * a graph now, the page was built and its line should be deleted.
     */
    if (pageNodes.length) {
      notes.push(
        `${path} — has a WebPage node but is still in KNOWN_EMPTY_PAGE_PATHS; ` +
          `delete its line in app/lib/seo/empty-pages.ts`,
      );
    } else {
      skipped.empty.push(path);
    }
  } else if (pageNodes.length !== 1) {
    fail(path, `expected exactly 1 WebPage node, found ${pageNodes.length}`);
  } else if (canonical) {
    const expected = `${canonical}#webpage`;
    const actual = pageNodes[0]['@id'];
    if (actual !== expected) {
      fail(path, `WebPage @id is ${actual}, canonical implies ${expected}`);
    }
  }

  /* 7. FAQ questions must be visible on the page. */
  const text = visibleText(html);
  for (const node of nodes) {
    if (node?.['@type'] !== 'FAQPage') continue;
    for (const entity of node.mainEntity ?? []) {
      const question = entity?.name;
      if (question && !text.includes(question)) {
        fail(
          path,
          `FAQPage question is not in the rendered HTML: "${question}"`,
        );
      }
    }
  }
}

/** `sameAs` legitimately points off-site; those live on the Organization. */
function isExternalProfile(url) {
  return [
    'shopify.com',
    'clutch.co',
    'linkedin.com',
    'instagram.com',
    'facebook.com',
    'techbehemoths.com',
    'techreviewer.co',
    'superbcompanies.com',
    'land-book.com',
  ].some((host) => url.includes(host));
}

/* ---------------------------------------------------------------- */
/* Run                                                                */
/* ---------------------------------------------------------------- */

async function fetchPage(path) {
  const response = await fetch(new URL(path, ORIGIN), {
    headers: {'User-Agent': 'byte operator-check-schema'},
    redirect: 'follow',
  });
  if (!response.ok) {
    fail(path, `HTTP ${response.status}`);
    return undefined;
  }
  return response.text();
}

/**
 * One real article and one real case study, taken from the live listing pages
 * rather than hardcoded — handles change, and a stale handle would fail as a
 * 404 and look like a schema bug.
 */
function discoverLinks(html, pattern, limit = 1) {
  const found = new Set();
  const re = new RegExp(`href=["'](${pattern})["']`, 'gi');
  let match;
  while ((match = re.exec(html)) !== null && found.size < limit) {
    found.add(decodeEntities(match[1]));
  }
  return [...found];
}

/** `<loc>` values from a sitemap or sitemap index, as paths. */
async function sitemapLocs(path) {
  const response = await fetch(new URL(path, ORIGIN), {
    headers: {'User-Agent': 'byte operator-check-schema'},
  });
  if (!response.ok) return [];

  const xml = await response.text();
  return [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) =>
    decodeEntities(m[1]),
  );
}

/**
 * Every URL the site publishes, via `/sitemap.xml` and the child sitemaps it
 * indexes. This is the whole public surface — pages, articles, case studies —
 * not a sample of page types.
 */
async function discoverSitemapUrls() {
  const children = await sitemapLocs('/sitemap.xml');
  if (!children.length) return [];

  const paths = new Set();
  for (const child of children) {
    const childPath = new URL(child, ORIGIN).pathname;
    for (const loc of await sitemapLocs(childPath)) {
      paths.add(new URL(loc, ORIGIN).pathname);
    }
  }
  return [...paths];
}

/** Bounded concurrency — this may be pointed at production. */
async function pool(items, limit, worker) {
  let index = 0;
  let done = 0;
  const runners = Array.from({length: Math.min(limit, items.length)}, async () => {
    while (index < items.length) {
      const item = items[index++];
      await worker(item);
      done += 1;
      if (done % 25 === 0) console.warn(`  ...${done}/${items.length}`);
    }
  });
  await Promise.all(runners);
}

async function main() {
  const override = argValue('paths');
  const sample = args.includes('--sample');

  let paths;
  let source;

  if (override) {
    paths = override.split(',').filter(Boolean);
    source = 'the --paths argument';
  } else if (sample) {
    paths = [...DEFAULT_PATHS];
    source = 'a sample of page types';
    const articlesIndex = await fetchPage('/articles');
    if (articlesIndex) {
      paths.push(...discoverLinks(articlesIndex, '/articles/[^"\'#?]+/'));
    }
    const workIndex = await fetchPage('/work');
    if (workIndex) {
      paths.push(...discoverLinks(workIndex, '/work/[^"\'#?]+'));
    }
  } else {
    paths = await discoverSitemapUrls();
    source = 'sitemap.xml';
    if (!paths.length) {
      console.error(
        `Could not read any URLs from ${ORIGIN}/sitemap.xml. ` +
          `Use --sample for the page-type spot check, or --paths=/a,/b.`,
      );
      process.exit(1);
    }
  }

  console.warn(`Checking ${paths.length} URL(s) from ${source} on ${ORIGIN}`);

  await pool(paths, 6, async (path) => {
    const html = await fetchPage(path);
    if (html) checkPage(path, html);
  });

  const checked = paths.length - skipped.noindex.length - skipped.empty.length;
  console.warn(
    `\n${paths.length} URL(s): ${checked} fully checked, ` +
      `${skipped.empty.length} skipped as known-empty, ` +
      `${skipped.noindex.length} skipped as noindex.`,
  );

  for (const note of notes) console.warn(`  note: ${note}`);

  if (failures.length) {
    console.error(`\nFAIL — ${failures.length} issue(s):`);
    for (const f of failures) console.error(`  ${f}`);
    process.exit(1);
  }

  console.warn('\nOK — every graph parses, resolves and matches its canonical.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
