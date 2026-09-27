#!/usr/bin/env node
/**
 * Step 2 — recovery inventory of the Liquid page templates.
 *
 * STRICTLY READ-ONLY. Reads every `templates/page.*.json` in every theme,
 * published and unpublished, and records what copy each one holds.
 *
 * The 74 empty pages are not missing content: they are orphaned by the
 * Liquid -> Hydrogen migration. Hydrogen renders the Shopify page `body`
 * field, which is empty for these, while the real copy sits in JSON templates
 * that only the Liquid themes ever read. This script finds that copy so a port
 * can be planned against facts rather than guesses.
 *
 * The themes are the archive. Nothing here writes, publishes or edits anything,
 * and no theme file is ever modified.
 *
 *   node scripts/liquid-content-inventory.mjs
 */

import {readFileSync, writeFileSync, mkdirSync} from 'node:fs';
import {resolve, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://www.byteoperator.com';

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

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${text.slice(0, 300)}`);
  }

  const json = JSON.parse(text);

  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join('; '));
  }

  return json.data;
}

/* Shapes verified by introspection against 2026-07, per standing rule 5. */
const THEMES_QUERY = `
  query AllThemes($after: String) {
    themes(first: 50, after: $after) {
      nodes { id name role updatedAt }
      pageInfo { hasNextPage endCursor }
    }
  }
`;

const THEME_PAGE_TEMPLATES_QUERY = `
  query PageTemplates($id: ID!, $after: String) {
    theme(id: $id) {
      files(filenames: ["templates/page.*"], first: 50, after: $after) {
        nodes {
          filename
          size
          updatedAt
          checksumMd5
          body {
            ... on OnlineStoreThemeFileBodyText { content }
            ... on OnlineStoreThemeFileBodyBase64 { contentBase64 }
            ... on OnlineStoreThemeFileBodyUrl { url }
          }
        }
        pageInfo { hasNextPage endCursor }
      }
    }
  }
`;

const PAGES_QUERY = `
  query AllPages($after: String) {
    pages(first: 250, after: $after) {
      nodes { id handle title templateSuffix isPublished }
      pageInfo { hasNextPage endCursor }
    }
  }
`;

/**
 * Shopify prefixes generated JSON templates with a `/* ... *\/` banner, which
 * is not legal JSON. Stripping it is the difference between parsing sections
 * and silently treating the whole file as one opaque string.
 */
function stripCommentBanner(raw) {
  return raw.replace(/\/\*[\s\S]*?\*\//g, '');
}

function stripHtml(value) {
  return value
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

/** Settings keys that name a theme asset rather than carry copy. */
const ASSET_KEY = /(_asset_name|^image$|_image$|image_|_img$|logo|icon|video)/i;

const LIKELY_ASSET_VALUE =
  /\.(png|jpe?g|webp|gif|svg|mp4|webm|pdf)(\?|$)/i;

/**
 * Walks a section's settings (and its nested blocks) collecting two things:
 * every string that reads as copy, and every referenced asset filename.
 *
 * Values are kept verbatim — client-approved copy is never rewritten here.
 */
function walkSettings(value, key, out) {
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!trimmed) return;

    const isAssetKey = key && ASSET_KEY.test(key);
    const isAssetValue =
      LIKELY_ASSET_VALUE.test(trimmed) || /^shopify:\/\//i.test(trimmed);

    if (isAssetKey || isAssetValue) {
      out.assets.push({key: key ?? null, value: trimmed});
      return;
    }

    // Colours, booleans-as-strings and bare identifiers are not copy.
    if (/^#[0-9a-f]{3,8}$/i.test(trimmed)) return;
    if (/^(true|false)$/i.test(trimmed)) return;
    if (/^https?:\/\//i.test(trimmed)) {
      out.links.push({key: key ?? null, value: trimmed});
      return;
    }

    const text = stripHtml(trimmed);
    if (text.length >= 2) out.text.push({key: key ?? null, value: trimmed, text});

    return;
  }

  if (Array.isArray(value)) {
    for (const item of value) walkSettings(item, key, out);
    return;
  }

  if (value && typeof value === 'object') {
    for (const [k, v] of Object.entries(value)) walkSettings(v, k, out);
  }
}

function analyseTemplate(parsed) {
  const sections = [];
  const allAssets = [];
  let totalTextLength = 0;

  const sectionEntries = Object.entries(parsed?.sections ?? {});

  for (const [sectionId, section] of sectionEntries) {
    const out = {text: [], assets: [], links: []};

    walkSettings(section?.settings ?? {}, null, out);

    const blocks = Object.entries(section?.blocks ?? {});
    const blockOut = {text: [], assets: [], links: []};

    for (const [, block] of blocks) {
      walkSettings(block?.settings ?? {}, null, blockOut);
    }

    const textLength =
      out.text.reduce((n, t) => n + t.text.length, 0) +
      blockOut.text.reduce((n, t) => n + t.text.length, 0);

    totalTextLength += textLength;
    allAssets.push(...out.assets, ...blockOut.assets);

    sections.push({
      sectionId,
      type: section?.type ?? null,
      blockCount: blocks.length,
      textLength,
      settingsWithText: out.text,
      blockSettingsWithText: blockOut.text,
      assets: [...out.assets, ...blockOut.assets],
      links: [...out.links, ...blockOut.links],
    });
  }

  return {
    sections,
    sectionOrder: parsed?.order ?? null,
    totalTextLength,
    assets: [...new Set(allAssets.map((a) => a.value))],
  };
}

/* ---------------- fetch ---------------- */

console.log('READ-ONLY inventory. No theme, page or redirect is modified.\n');

const themes = [];
let themeCursor = null;

do {
  const data = await admin(THEMES_QUERY, {after: themeCursor});
  themes.push(...data.themes.nodes);
  themeCursor = data.themes.pageInfo.hasNextPage
    ? data.themes.pageInfo.endCursor
    : null;
} while (themeCursor);

console.log(`Themes: ${themes.length}`);

const pages = [];
let pageCursor = null;

do {
  const data = await admin(PAGES_QUERY, {after: pageCursor});
  pages.push(...data.pages.nodes);
  pageCursor = data.pages.pageInfo.hasNextPage
    ? data.pages.pageInfo.endCursor
    : null;
} while (pageCursor);

console.log(`Pages:  ${pages.length}\n`);

/** Pages keyed by the template suffix they actually use. */
const pagesBySuffix = new Map();

for (const page of pages) {
  const suffix = page.templateSuffix ?? '';
  if (!pagesBySuffix.has(suffix)) pagesBySuffix.set(suffix, []);
  pagesBySuffix.get(suffix).push(page);
}

const pagesByHandle = new Map(pages.map((p) => [p.handle, p]));

const entries = [];

for (const theme of themes) {
  let cursor = null;
  let count = 0;

  do {
    const data = await admin(THEME_PAGE_TEMPLATES_QUERY, {
      id: theme.id,
      after: cursor,
    });

    const files = data.theme?.files;
    if (!files) break;

    for (const file of files.nodes) {
      if (!/^templates\/page\..+\.json$/.test(file.filename)) continue;

      let raw = file.body?.content ?? null;

      if (!raw && file.body?.contentBase64) {
        raw = Buffer.from(file.body.contentBase64, 'base64').toString('utf8');
      }

      if (!raw && file.body?.url) {
        try {
          raw = await (await fetch(file.body.url)).text();
        } catch {
          raw = null;
        }
      }

      const suffix = file.filename
        .replace(/^templates\/page\./, '')
        .replace(/\.json$/, '');

      let parsed = null;
      let parseError = null;

      if (raw) {
        try {
          parsed = JSON.parse(stripCommentBanner(raw));
        } catch (error) {
          parseError = error.message;
        }
      }

      const analysis = parsed
        ? analyseTemplate(parsed)
        : {sections: [], sectionOrder: null, totalTextLength: 0, assets: []};

      /*
       * A template is used by a page whose templateSuffix matches. Most of
       * these also happen to share the handle, but the suffix is the real
       * join — matching on handle alone would mislabel any page whose
       * template was assigned rather than named after it.
       */
      const matchedBySuffix = pagesBySuffix.get(suffix) ?? [];
      const matchedByHandle = pagesByHandle.get(suffix);

      const matchedPages = matchedBySuffix.length
        ? matchedBySuffix
        : matchedByHandle
          ? [matchedByHandle]
          : [];

      entries.push({
        theme: {id: theme.id, name: theme.name, role: theme.role, updatedAt: theme.updatedAt},
        filename: file.filename,
        templateSuffix: suffix,
        size: file.size,
        updatedAt: file.updatedAt,
        checksumMd5: file.checksumMd5,
        parseError,
        matchedPages: matchedPages.map((p) => ({
          handle: p.handle,
          title: p.title,
          templateSuffix: p.templateSuffix,
          isPublished: p.isPublished,
          url: `${SITE}/pages/${p.handle}`,
          matchedBy: matchedBySuffix.length ? 'templateSuffix' : 'handle',
        })),
        sectionCount: analysis.sections.length,
        totalTextLength: analysis.totalTextLength,
        assets: analysis.assets,
        sectionOrder: analysis.sectionOrder,
        sections: analysis.sections,
      });
    }

    count += files.nodes.length;
    cursor = files.pageInfo.hasNextPage ? files.pageInfo.endCursor : null;
  } while (cursor);

  console.log(
    `  ${theme.role.padEnd(11)} ${theme.name.slice(0, 40).padEnd(42)} ${count} page templates`,
  );

  await new Promise((r) => setTimeout(r, 250));
}

/* ---------------- duplicates ---------------- */

const byFilename = new Map();

for (const entry of entries) {
  if (!byFilename.has(entry.filename)) byFilename.set(entry.filename, []);
  byFilename.get(entry.filename).push(entry);
}

for (const [, group] of byFilename) {
  if (group.length < 2) continue;

  /*
   * "Best" copy = most extracted text, tie-broken by most recently updated.
   * Size is a poor proxy: a template can be large because of layout settings
   * while carrying less actual copy than a smaller one.
   */
  const best = [...group].sort(
    (a, b) =>
      b.totalTextLength - a.totalTextLength ||
      Date.parse(b.updatedAt ?? 0) - Date.parse(a.updatedAt ?? 0),
  )[0];

  const checksums = new Set(group.map((g) => g.checksumMd5));

  for (const entry of group) {
    entry.duplicate_of = {
      copies: group.length,
      identicalAcrossThemes: checksums.size === 1,
      bestTheme: {
        id: best.theme.id,
        name: best.theme.name,
        role: best.theme.role,
      },
      bestTextLength: best.totalTextLength,
      isBest: entry === best,
    };
  }
}

for (const entry of entries) {
  if (!entry.duplicate_of) {
    entry.duplicate_of = {copies: 1, identicalAcrossThemes: true, isBest: true};
  }
}

/* ---------------- write ---------------- */

mkdirSync(resolve(ROOT, 'logs'), {recursive: true});
const outFile = resolve(ROOT, 'logs', 'liquid-content-inventory.json');

writeFileSync(
  outFile,
  JSON.stringify(
    {
      capturedAt: new Date().toISOString(),
      store: DOMAIN,
      apiVersion: VERSION,
      note: 'Step 2 recovery inventory. STRICTLY READ-ONLY: no theme, page, redirect or menu was modified. Copy is recorded verbatim.',
      themeCount: themes.length,
      templateCount: entries.length,
      uniqueTemplateNames: byFilename.size,
      themes: themes.map((t) => ({id: t.id, name: t.name, role: t.role, updatedAt: t.updatedAt})),
      templates: entries,
    },
    null,
    2,
  ),
  'utf8',
);

console.log(`\nTemplates found: ${entries.length} across ${themes.length} themes`);
console.log(`Unique template names: ${byFilename.size}`);
console.log(`Log: ${outFile.replace(ROOT, '.')}`);
console.log('\nNothing was modified.');
