#!/usr/bin/env node
/**
 * Runbook 0.5, steps 1–3 — find every empty page in the pages sitemap.
 *
 * READ-ONLY. This script changes nothing, on the site or in the store. It
 * fetches each URL in sitemap/pages/1.xml, measures how much visible text the
 * page actually renders, and cross-references the Shopify menus so a page that
 * is reachable from live navigation is never mistaken for abandoned.
 *
 * A page is EMPTY at under 3000 visible characters: that threshold is header
 * and footer chrome only, established by the pages that render `<main></main>`.
 *
 * Measured against the LIVE site on purpose — that is the HTML Google and the
 * AI crawlers actually have, and the point of the audit is what is in the
 * index, not what a local branch would serve.
 *
 *   node scripts/audit-empty-pages.mjs
 *   node scripts/audit-empty-pages.mjs --origin=http://localhost:3000
 */

import {readFileSync, writeFileSync, mkdirSync} from 'node:fs';
import {resolve, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const args = process.argv.slice(2);
const originArg = args.find((a) => a.startsWith('--origin='));
const ORIGIN = originArg ? originArg.split('=')[1] : 'https://byteoperator.com';
const SITEMAP = `${ORIGIN}/sitemap/pages/1.xml`;

/** Header + footer chrome alone lands well under this. */
const EMPTY_THRESHOLD = 3000;

/** Polite concurrency — this is someone's production site. */
const CONCURRENCY = 6;

function loadEnv() {
  const env = {};

  for (const line of readFileSync(resolve(ROOT, '.env'), 'utf8').split('\n')) {
    const match = /^([A-Z0-9_]+)=(.*)$/.exec(line.trim());
    if (!match) continue;
    env[match[1]] = match[2].replace(/^["']|["']$/g, '');
  }

  return env;
}

const env = loadEnv();
const DOMAIN = env.SHOPIFY_STORE_DOMAIN;
const TOKEN = env.SHOPIFY_ADMIN_TOKEN;
const VERSION = env.SHOPIFY_API_VERSION || '2026-07';

async function admin(query, variables) {
  const response = await fetch(
    `https://${DOMAIN}/admin/api/${VERSION}/graphql.json`,
    {
      method: 'POST',
      headers: {
        'X-Shopify-Access-Token': TOKEN,
        'content-type': 'application/json',
      },
      body: JSON.stringify({query, variables}),
    },
  );

  const text = await response.text();
  if (!response.ok) throw new Error(`HTTP ${response.status}`);

  const json = JSON.parse(text);
  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join('; '));
  }

  return json.data;
}

const MENUS_QUERY = `
  query AuditMenus {
    menus(first: 50) {
      nodes {
        handle
        title
        items {
          title
          url
          items { title url items { title url } }
        }
      }
    }
  }
`;

/** Menu item URLs are absolute; reduce them to a comparable site path. */
function toPath(url) {
  if (!url) return null;

  try {
    const parsed = new URL(url, ORIGIN);
    return parsed.pathname.replace(/\/+$/, '') || '/';
  } catch {
    return null;
  }
}

async function fetchMenuLinks() {
  if (!DOMAIN || !TOKEN) return new Map();

  const data = await admin(MENUS_QUERY);
  const byPath = new Map();

  const walk = (items, menu) => {
    for (const item of items ?? []) {
      const path = toPath(item.url);

      if (path) {
        if (!byPath.has(path)) byPath.set(path, []);
        byPath.get(path).push({menu, title: item.title});
      }

      walk(item.items, menu);
    }
  };

  for (const menu of data.menus.nodes) walk(menu.items, menu.handle);

  return byPath;
}

function stripToVisibleText(html) {
  return html
    // Anything that never renders as prose.
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript>/gi, ' ')
    .replace(/<svg\b[^>]*>[\s\S]*?<\/svg>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractMain(html) {
  const match = /<main\b[^>]*>([\s\S]*?)<\/main>/i.exec(html);
  return match ? match[1] : null;
}

function extractTitle(html) {
  const match = /<title[^>]*>([\s\S]*?)<\/title>/i.exec(html);
  return match ? match[1].replace(/\s+/g, ' ').trim() : null;
}

function extractMetaDescription(html) {
  const match =
    /<meta[^>]+name=["']description["'][^>]*content=["']([^"']*)["']/i.exec(
      html,
    ) ||
    /<meta[^>]+content=["']([^"']*)["'][^>]*name=["']description["']/i.exec(
      html,
    );

  return match ? match[1].replace(/\s+/g, ' ').trim() : null;
}

/** Groups a path for the summary table. */
function groupOf(path) {
  if (/^\/pages\/cs-/.test(path)) return 'Case studies /pages/cs-*';
  if (/^\/pages\//.test(path)) return 'Legacy /pages/*';
  return 'Clean URLs';
}

async function auditUrl(url, menuLinks) {
  const path = new URL(url).pathname.replace(/\/+$/, '') || '/';
  const separator = url.includes('?') ? '&' : '?';

  let html = '';
  let status = 0;

  try {
    const response = await fetch(`${url}${separator}cb=${Date.now()}`, {
      redirect: 'manual',
      headers: {'cache-control': 'no-cache'},
    });

    status = response.status;
    html = response.status === 200 ? await response.text() : '';
  } catch (error) {
    return {
      url,
      path,
      status: 0,
      error: String(error.message),
      classification: 'ERROR',
    };
  }

  if (status !== 200) {
    return {url, path, status, classification: 'NON_200'};
  }

  const mainInner = extractMain(html);
  const visibleText = stripToVisibleText(html);
  const mainText = mainInner ? stripToVisibleText(mainInner) : '';

  return {
    url,
    path,
    status,
    title: extractTitle(html),
    metaDescription: extractMetaDescription(html),
    visibleTextLength: visibleText.length,
    mainInnerLength: mainInner === null ? null : mainInner.length,
    mainTextLength: mainInner === null ? null : mainText.length,
    hasMainTag: mainInner !== null,
    menuLinks: menuLinks.get(path) ?? [],
    classification:
      visibleText.length < EMPTY_THRESHOLD ? 'EMPTY' : 'CONTENT',
  };
}

/** Simple bounded-concurrency map. */
async function mapLimit(items, limit, fn) {
  const results = new Array(items.length);
  let cursor = 0;

  async function worker() {
    while (cursor < items.length) {
      const index = cursor++;
      results[index] = await fn(items[index], index);
    }
  }

  await Promise.all(
    Array.from({length: Math.min(limit, items.length)}, worker),
  );

  return results;
}

console.log(`Origin:  ${ORIGIN}`);
console.log(`Sitemap: ${SITEMAP}`);

const sitemapXml = await (await fetch(`${SITEMAP}?cb=${Date.now()}`)).text();
/*
 * Sitemap <loc> values are absolute production URLs. When auditing another
 * origin (a local branch or a preview deploy) they must be rewritten, or the
 * run silently measures production again and the result looks identical.
 */
const urls = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => {
  const loc = m[1].trim();
  if (ORIGIN === 'https://byteoperator.com') return loc;
  return loc.replace(/^https?:\/\/[^/]+/, ORIGIN);
});

console.log(`URLs in pages sitemap: ${urls.length}`);

let menuLinks = new Map();

try {
  menuLinks = await fetchMenuLinks();
  console.log(`Menu-linked paths: ${menuLinks.size}\n`);
} catch (error) {
  console.error(`! Menu lookup failed (${error.message}) — continuing\n`);
}

let done = 0;

const results = await mapLimit(urls, CONCURRENCY, async (url) => {
  const row = await auditUrl(url, menuLinks);
  done += 1;

  if (done % 20 === 0 || done === urls.length) {
    console.log(`  ...${done}/${urls.length}`);
  }

  return row;
});

const empty = results.filter((r) => r.classification === 'EMPTY');
const content = results.filter((r) => r.classification === 'CONTENT');
const other = results.filter(
  (r) => r.classification !== 'EMPTY' && r.classification !== 'CONTENT',
);

/* -------- grouped summary -------- */

const groups = new Map();

for (const row of results) {
  const key = groupOf(row.path);
  if (!groups.has(key)) groups.set(key, {empty: 0, content: 0, other: 0});
  const bucket = groups.get(key);

  if (row.classification === 'EMPTY') bucket.empty += 1;
  else if (row.classification === 'CONTENT') bucket.content += 1;
  else bucket.other += 1;
}

console.log('\n=== GROUPED SUMMARY ===');
console.log('Group                          Empty  Content  Other  Total');

for (const [name, b] of groups) {
  const total = b.empty + b.content + b.other;
  console.log(
    `${name.padEnd(30)} ${String(b.empty).padStart(5)}  ${String(
      b.content,
    ).padStart(7)}  ${String(b.other).padStart(5)}  ${String(total).padStart(5)}`,
  );
}

console.log(
  `${'TOTAL'.padEnd(30)} ${String(empty.length).padStart(5)}  ${String(
    content.length,
  ).padStart(7)}  ${String(other.length).padStart(5)}  ${String(
    results.length,
  ).padStart(5)}`,
);

/* -------- menus pointing at empty pages -------- */

const menuHits = empty.filter((r) => r.menuLinks.length > 0);

console.log('\n=== MENUS LINKING TO EMPTY PAGES ===');

if (!menuHits.length) {
  console.log('  none');
} else {
  for (const row of menuHits) {
    for (const link of row.menuLinks) {
      const title = link.title.replace(/[^\x20-\x7E]/g, '').trim();
      console.log(`  [${link.menu}] ${title} -> ${row.path}`);
    }
  }
}

/* -------- write the log -------- */

const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
mkdirSync(resolve(ROOT, 'logs'), {recursive: true});
const outFile = resolve(ROOT, 'logs', `empty-pages-${timestamp}.json`);

writeFileSync(
  outFile,
  JSON.stringify(
    {
      capturedAt: new Date().toISOString(),
      origin: ORIGIN,
      sitemap: SITEMAP,
      emptyThreshold: EMPTY_THRESHOLD,
      note: 'Runbook 0.5 steps 1-3. READ-ONLY audit. Nothing was modified.',
      totals: {
        urls: results.length,
        empty: empty.length,
        content: content.length,
        other: other.length,
      },
      groups: Object.fromEntries(groups),
      menusLinkingToEmptyPages: menuHits.flatMap((r) =>
        r.menuLinks.map((l) => ({menu: l.menu, title: l.title, path: r.path})),
      ),
      pages: results.sort((a, b) => a.path.localeCompare(b.path)),
    },
    null,
    2,
  ),
  'utf8',
);

console.log(`\nLog: ${outFile.replace(ROOT, '.')}`);
console.log('Nothing was changed. Awaiting a decision per group.');
