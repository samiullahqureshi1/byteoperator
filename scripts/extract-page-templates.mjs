#!/usr/bin/env node
/**
 * Phase A — extract the theme templates behind every empty page.
 *
 * READ-ONLY. The gate before any 301 or unpublish: these pages render nothing
 * through the Hydrogen app, but their copy may still live in the published
 * theme as an Online Store 2.0 JSON template (`templates/page.<handle>.json`),
 * whose section settings hold the actual text.
 *
 * For each handle it reports how much *unique prose* the template carries, so
 * "probably just a shared layout with per-page settings" becomes a measured
 * fact before anything becomes unreachable.
 *
 *   node scripts/extract-page-templates.mjs
 *   node scripts/extract-page-templates.mjs --theme=gid://shopify/OnlineStoreTheme/123
 */

import {readFileSync, writeFileSync, mkdirSync} from 'node:fs';
import {resolve, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const args = process.argv.slice(2);
const themeArg = args.find((a) => a.startsWith('--theme='));

/**
 * Handles to extract: every empty page in scope for the 0.5 decisions.
 *
 * `group` records the decision each one is gated on, so the report lines up
 * with the B1/B2 split rather than having to be cross-referenced by hand.
 */
const TARGETS = [
  // B1 — redirect candidates (clean-URL equivalent exists)
  ['magento-to-shopify-migration', 'B1'],
  ['woocommerce-to-shopify', 'B1'],
  ['woocommerce-to-shopify-migration', 'B1'],
  ['shopify-migration-services', 'B1'],
  ['wix-to-shopify-migration-1', 'B1'],
  ['shopify-seo-services', 'B1'],
  ['search-engine-optimization-seo', 'B1'],
  ['shopify-marketing-seo', 'B1'],
  ['shopify-conversion-rate-optimization', 'B1'],
  ['the-fold-tech-approach-to-cro', 'B1'],
  ['website-audit-service', 'B1'],
  ['website-audit-services', 'B1'],
  ['free-shopify-audit', 'B1'],
  ['shopify-app-development-services', 'B1'],
  ['shopify-maintenance-services-1', 'B1'],
  ['shopify-theme-customization', 'B1'],
  ['shopify-plus-partner-agency', 'B1'],
  ['marketing-automation', 'B1'],
  ['shopify-marketing-automation', 'B1'],
  ['case-studies-1', 'B1'],

  // B2 — unpublish candidates (no clean-URL equivalent)
  ['analytics-tracking', 'B2'],
  ['marketing-analytics-and-tracking', 'B2'],
  ['branding-creative-direction', 'B2'],
  ['digital-branding-creative-direction-services', 'B2'],
  ['funnel-building-lead-generation', 'B2'],
  ['lead-generation-services-and-funnel-building', 'B2'],
  ['paid-social-scaling', 'B2'],
  ['shopify-paid-social', 'B2'],
  ['premium-dropshipping-store', 'B2'],
  ['cart-drawer', 'B2'],
  ['launch', 'B2'],
  ['retain', 'B2'],
  ['marketing-sales', 'B2'],
  ['learn-more', 'B2'],
  ['search', 'B2'],
  ['shopify-custom-solutions', 'B2'],
  ['sitelab-helpdesk', 'B2'],

  // BUILD — extracted for recovery, never retired
  ['custom-store-project', 'BUILD'],
  ['getting-started', 'BUILD'],
  ['testimonials', 'BUILD'],
  ['reviews', 'BUILD'],
  ['ai-visibility', 'BUILD'],
  ['ai-visibility-audit', 'BUILD'],
  ['ai-visibility-implementation', 'BUILD'],
  ['ai-visibility-monitoring', 'BUILD'],
  ['free-ai-visibility-snapshot', 'BUILD'],
  ['shopify-speed-optimization', 'BUILD'],
  ['shopify-marketing-services', 'BUILD'],
];

/** The 18 case studies, whose copy the owner expects to recover. */
const CASE_STUDY_HANDLES = [
  'cs-branley-ventures',
  'cs-chatham-ivy',
  'cs-cloakemf',
  'cs-cork-collective',
  'cs-eleganzaglo',
  'cs-gold-custom-bijoux-sur-mesure',
  'cs-lifeprotectors',
  'cs-loveluxury',
  'cs-mann-co-bake-shop',
  'cs-mellome',
  'cs-naimi',
  'cs-nevuu',
  'cs-nexsphere-treasures',
  'cs-sabe-boutique',
  'cs-shepard-safety-products',
  'cs-skinbyskin',
  'cs-sleeptite-sleeprite',
  'cs-we-love-kids',
];

for (const handle of CASE_STUDY_HANDLES) TARGETS.push([handle, 'CASE_STUDY']);

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

if (!DOMAIN || !TOKEN) {
  console.error('Missing SHOPIFY_STORE_DOMAIN / SHOPIFY_ADMIN_TOKEN in .env');
  process.exit(1);
}

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
  if (!response.ok) throw new Error(`HTTP ${response.status}: ${text.slice(0, 200)}`);

  const json = JSON.parse(text);
  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join('; '));
  }

  return json.data;
}

const MAIN_THEME_QUERY = `
  query MainTheme {
    themes(first: 1, roles: [MAIN]) {
      nodes { id name role }
    }
  }
`;

/*
 * `body` is a union; only OnlineStoreThemeFileBodyText carries inline content.
 * Large files come back as a URL instead, which is fetched separately below.
 */
const THEME_FILES_QUERY = `
  query ThemeFiles($id: ID!, $filenames: [String!], $after: String) {
    theme(id: $id) {
      files(filenames: $filenames, first: 50, after: $after) {
        nodes {
          filename
          size
          contentType
          checksumMd5
          body {
            ... on OnlineStoreThemeFileBodyText { content }
            ... on OnlineStoreThemeFileBodyUrl { url }
          }
        }
        pageInfo { hasNextPage endCursor }
      }
    }
  }
`;

/**
 * Pulls every human-readable string out of an OS 2.0 JSON template.
 *
 * Section settings nest arbitrarily, so this walks the whole tree and keeps
 * values that look like prose rather than identifiers, colours or URLs.
 */
function extractProse(value, out = []) {
  if (typeof value === 'string') {
    const text = value
      .replace(/<[^>]*>/g, ' ')
      .replace(/&nbsp;/gi, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    const looksLikeProse =
      text.length > 25 &&
      / /.test(text) &&
      !/^https?:\/\//i.test(text) &&
      !/^(shopify:\/\/|#[0-9a-f]{3,8}$)/i.test(text) &&
      !/^[a-z0-9_-]+$/i.test(text);

    if (looksLikeProse) out.push(text);

    return out;
  }

  if (Array.isArray(value)) {
    for (const item of value) extractProse(item, out);
    return out;
  }

  if (value && typeof value === 'object') {
    for (const item of Object.values(value)) extractProse(item, out);
  }

  return out;
}

const themeId =
  themeArg?.split('=')[1] ??
  (await admin(MAIN_THEME_QUERY)).themes.nodes[0]?.id;

if (!themeId) {
  console.error('Could not resolve a MAIN theme.');
  process.exit(1);
}

console.log(`Theme: ${themeId}`);

const filenames = TARGETS.map(([handle]) => `templates/page.${handle}.json`);
const groupByHandle = new Map(TARGETS);

/** Shopify caps `filenames`; request in batches. */
const files = [];

for (let i = 0; i < filenames.length; i += 25) {
  const batch = filenames.slice(i, i + 25);
  let after = null;

  do {
    const data = await admin(THEME_FILES_QUERY, {
      id: themeId,
      filenames: batch,
      after,
    });

    const page = data.theme?.files;
    if (!page) break;

    files.push(...page.nodes);
    after = page.pageInfo.hasNextPage ? page.pageInfo.endCursor : null;
  } while (after);

  await new Promise((r) => setTimeout(r, 300));
}

console.log(`Templates found: ${files.length} of ${filenames.length} requested\n`);

const rows = [];

for (const file of files) {
  const handle = file.filename
    .replace(/^templates\/page\./, '')
    .replace(/\.json$/, '');

  let content = file.body?.content ?? null;

  if (!content && file.body?.url) {
    try {
      content = await (await fetch(file.body.url)).text();
    } catch {
      content = null;
    }
  }

  let prose = [];
  let parsed = null;
  let parseNote = null;

  if (content) {
    /*
     * Shopify's OS 2.0 JSON templates permit `/* *\/` comments, which are not
     * legal JSON. Without stripping them every parse fails, the raw file is
     * treated as one long string, and "prose length" silently becomes file
     * size — which reads as though every template is full of copy.
     */
    const withoutComments = content.replace(/\/\*[\s\S]*?\*\//g, '');

    try {
      parsed = JSON.parse(withoutComments);
      prose = extractProse(parsed);
    } catch (error) {
      parseNote = `not valid JSON after comment strip: ${error.message}`;
      prose = extractProse(content);
    }
  }

  const unique = [...new Set(prose)];
  const proseChars = unique.join(' ').length;

  rows.push({
    handle,
    group: groupByHandle.get(handle) ?? '?',
    filename: file.filename,
    size: file.size,
    proseStrings: unique.length,
    proseChars,
    sections: parsed?.sections ? Object.keys(parsed.sections).length : null,
    parseNote,
    prose: unique,
  });
}

rows.sort(
  (a, b) => a.group.localeCompare(b.group) || b.proseChars - a.proseChars,
);

const missing = TARGETS.filter(
  ([handle]) => !rows.some((r) => r.handle === handle),
).map(([handle, group]) => ({handle, group}));

/* -------- report -------- */

console.log('group      prose_chars  strings  size  handle');

for (const r of rows) {
  console.log(
    `${r.group.padEnd(10)} ${String(r.proseChars).padStart(11)}  ${String(
      r.proseStrings,
    ).padStart(7)}  ${String(r.size).padStart(5)}  ${r.handle}`,
  );
}

if (missing.length) {
  console.log(`\nNo template in this theme (${missing.length}):`);
  for (const m of missing) console.log(`  [${m.group}] ${m.handle}`);
}

const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
mkdirSync(resolve(ROOT, 'logs'), {recursive: true});
const outFile = resolve(ROOT, 'logs', `page-templates-${timestamp}.json`);

writeFileSync(
  outFile,
  JSON.stringify(
    {
      capturedAt: new Date().toISOString(),
      themeId,
      note: 'Phase A extraction. READ-ONLY. Nothing was modified. Full prose retained per handle for recovery.',
      found: rows.length,
      requested: filenames.length,
      missing,
      templates: rows,
    },
    null,
    2,
  ),
  'utf8',
);

console.log(`\nLog: ${outFile.replace(ROOT, '.')}`);
console.log('Nothing was changed.');
