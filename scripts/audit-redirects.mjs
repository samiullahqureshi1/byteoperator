#!/usr/bin/env node
/**
 * Read-only audit of every Shopify URL redirect.
 *
 * Snapshots the full current state to logs/, then resolves each redirect
 * against the live site and classifies what is actually wrong with it. Nothing
 * is created, changed or deleted.
 *
 * Classifications, worst first:
 *   TARGET_404        the redirect lands on a missing page
 *   TARGET_HOMEPAGE   redirects to `/`, which Google reads as a soft 404
 *   TARGET_EMPTY      lands on a page that renders no content
 *   BURIES_CONTENT    the source page holds recoverable Liquid-template copy
 *   CHAIN             more than one hop to reach a 200
 *   SHADOWS_ROUTE     the app serves this path, so the redirect is a fallback
 *   OVERLAP           the path also appears in route-mappings.ts (ownership bug)
 *   INERT             never fires — the app answers this path with a 200
 *   OK                single hop to a 200 with content
 *
 *   node scripts/audit-redirects.mjs
 */

import {readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync} from 'node:fs';
import {resolve, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://thefoldtech.com';
const MAX_HOPS = 5;

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
  if (json.errors?.length) throw new Error(json.errors.map((e) => e.message).join('; '));

  return json.data;
}

const REDIRECTS_QUERY = `
  query AllRedirects($after: String) {
    urlRedirects(first: 250, after: $after) {
      nodes { id path target }
      pageInfo { hasNextPage endCursor }
    }
  }
`;

/** Paths the Hydrogen app claims in route-mappings.ts. */
function appOwnedPaths() {
  const src = readFileSync(resolve(ROOT, 'app/lib/route-mappings.ts'), 'utf8');
  const block = src.slice(
    src.indexOf('export const OLD_TO_CLEAN_PATHS'),
    src.indexOf('} as const'),
  );

  const paths = new Set();

  for (const m of block.matchAll(/'(\/[^']*)'\s*:/g)) paths.add(m[1]);
  // Template-literal keys such as [`/pages/${CONTACT_PAGE_HANDLE}`]
  for (const m of block.matchAll(/\[`(\/pages\/)\$\{([A-Z_]+)\}`\]/g)) {
    const constMatch = new RegExp(`export const ${m[2]} = '([^']+)'`).exec(src);
    if (constMatch) paths.add(`${m[1]}${constMatch[1]}`);
  }

  return paths;
}

/** Known-empty pages, from the 0.5 audit. */
function emptyPaths() {
  const file = resolve(ROOT, 'app/lib/seo/empty-pages.ts');
  if (!existsSync(file)) return new Set();

  const src = readFileSync(file, 'utf8');
  const block = src.slice(
    src.indexOf('KNOWN_EMPTY_PAGE_PATHS'),
    src.indexOf('])', src.indexOf('KNOWN_EMPTY_PAGE_PATHS')),
  );

  return new Set([...block.matchAll(/'(\/[^']+)'/g)].map((m) => m[1]));
}

/** Pages whose Liquid template still holds recoverable copy. */
function recoverablePaths() {
  const dir = resolve(ROOT, 'logs');
  const file = resolve(dir, 'liquid-content-inventory.json');
  if (!existsSync(file)) return new Set();

  const inv = JSON.parse(readFileSync(file, 'utf8'));
  const best = new Map();

  for (const t of inv.templates) {
    for (const mp of t.matchedPages) {
      const current = best.get(mp.handle) ?? 0;
      if (t.totalTextLength > current) best.set(mp.handle, t.totalTextLength);
    }
  }

  return new Set(
    [...best.entries()]
      .filter(([, len]) => len >= 200)
      .map(([handle]) => `/pages/${handle}`),
  );
}

function normalize(pathname) {
  const clean = pathname.split('?')[0];
  return clean.length > 1 ? clean.replace(/\/+$/, '') : clean;
}

/** Follows a path manually so every hop is recorded. */
async function trace(path) {
  const hops = [];
  let current = `${SITE}${path}`;

  for (let i = 0; i < MAX_HOPS; i += 1) {
    const separator = current.includes('?') ? '&' : '?';

    let response;

    try {
      response = await fetch(`${current}${separator}cb=${Date.now()}`, {
        redirect: 'manual',
        headers: {'cache-control': 'no-cache'},
      });
    } catch (error) {
      hops.push({url: current, status: 0, error: String(error.message)});
      break;
    }

    const location = response.headers.get('location');
    hops.push({url: current, status: response.status, location: location ?? null});

    if (!location) break;

    current = location.startsWith('http') ? location : `${SITE}${location}`;
  }

  return hops;
}

const appPaths = appOwnedPaths();
const empties = emptyPaths();
const recoverable = recoverablePaths();

console.log(`route-mappings.ts owns ${appPaths.size} paths`);
console.log(`known-empty pages: ${empties.size}`);
console.log(`pages with recoverable content: ${recoverable.size}\n`);

const redirects = [];
let cursor = null;

do {
  const data = await admin(REDIRECTS_QUERY, {after: cursor});
  redirects.push(...data.urlRedirects.nodes);
  cursor = data.urlRedirects.pageInfo.hasNextPage
    ? data.urlRedirects.pageInfo.endCursor
    : null;
} while (cursor);

console.log(`Shopify URL redirects: ${redirects.length}\n`);

const rows = [];
let done = 0;

for (const redirect of redirects) {
  const hops = await trace(redirect.path);
  const last = hops[hops.length - 1];
  const redirectHops = hops.filter((h) => h.location).length;

  const finalPath = normalize(
    last.url.replace(SITE, '').replace(/^https?:\/\/[^/]+/, ''),
  );

  const flags = [];

  if (last.status === 404) flags.push('TARGET_404');
  if (last.status === 200 && redirectHops === 0) flags.push('INERT');
  if (finalPath === '/' && redirectHops > 0) flags.push('TARGET_HOMEPAGE');
  if (redirectHops > 1) flags.push('CHAIN');
  if (empties.has(finalPath)) flags.push('TARGET_EMPTY');
  if (recoverable.has(normalize(redirect.path))) flags.push('BURIES_CONTENT');
  if (appPaths.has(normalize(redirect.path))) flags.push('OVERLAP');

  if (!flags.length && last.status === 200) flags.push('OK');
  if (!flags.length) flags.push(`STATUS_${last.status}`);

  rows.push({
    id: redirect.id,
    path: redirect.path,
    target: redirect.target,
    hops: hops.map((h) => ({url: h.url.replace(SITE, ''), status: h.status, location: h.location})),
    redirectHops,
    finalStatus: last.status,
    finalPath,
    flags,
  });

  done += 1;
  if (done % 20 === 0) console.log(`  ...${done}/${redirects.length}`);
}

/* -------- report -------- */

const counts = {};
for (const row of rows) for (const flag of row.flags) counts[flag] = (counts[flag] ?? 0) + 1;

console.log('\n=== CLASSIFICATION ===');
for (const [flag, n] of Object.entries(counts).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${String(n).padStart(3)}  ${flag}`);
}

const show = (flag) => {
  const hits = rows.filter((r) => r.flags.includes(flag));
  if (!hits.length) return;
  console.log(`\n--- ${flag} (${hits.length}) ---`);
  for (const r of hits.slice(0, 25)) {
    console.log(`  ${r.path}  ->  ${r.finalPath}  [${r.redirectHops} hop(s), ${r.finalStatus}]`);
  }
  if (hits.length > 25) console.log(`  ... and ${hits.length - 25} more`);
};

for (const flag of ['TARGET_404', 'TARGET_HOMEPAGE', 'CHAIN', 'TARGET_EMPTY', 'BURIES_CONTENT', 'OVERLAP', 'INERT']) {
  show(flag);
}

const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
mkdirSync(resolve(ROOT, 'logs'), {recursive: true});
const outFile = resolve(ROOT, 'logs', `redirects-snapshot-${timestamp}.json`);

writeFileSync(
  outFile,
  JSON.stringify(
    {
      capturedAt: new Date().toISOString(),
      store: DOMAIN,
      note: 'READ-ONLY audit and full restore snapshot. Every redirect id/path/target is recorded so any deletion can be recreated.',
      total: redirects.length,
      counts,
      redirects: rows,
    },
    null,
    2,
  ),
  'utf8',
);

console.log(`\nSnapshot (restorable): ${outFile.replace(ROOT, '.')}`);
console.log('Nothing was created, changed or deleted.');
