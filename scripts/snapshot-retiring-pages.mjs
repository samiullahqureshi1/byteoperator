#!/usr/bin/env node
/**
 * Runbook 1.3, step 1 — preserve every retiring page before anything redirects.
 *
 * Read-only. Writes the full Shopify page record (title, handle, body HTML,
 * SEO fields, timestamps) for each retiring URL to ./logs/retired-pages-<ts>.json.
 *
 * Some of these pages carry copy worth merging into the survivor. That call is
 * the owner's, not this script's — the job here is only to make sure nothing
 * is lost before a 301 makes the original unreachable.
 *
 * Usage: node scripts/snapshot-retiring-pages.mjs
 */

import {readFileSync, writeFileSync, mkdirSync} from 'node:fs';
import {resolve, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/**
 * Clusters from runbook 1.3, plus the AI-visibility cluster found while
 * verifying llms.txt. `survivor` is the runbook default (the clean-URL page);
 * `undecided` marks clusters where the owner still has to choose.
 */
const CLUSTERS = [
  {
    intent: 'SEO',
    survivor: '/seo-agency',
    retiring: ['/pages/shopify-seo-services'],
    undecided:
      '/seo-agency and /ecommerce-seo-agency/ are both live and arguably distinct intents (Shopify SEO vs ecommerce SEO). Only /pages/shopify-seo-services is unambiguously retiring.',
  },
  {
    intent: 'CRO',
    survivor: '/shopify-cro-agency/',
    retiring: [
      '/pages/conversion-rate-optimization',
      '/pages/shopify-conversion-rate-optimization',
    ],
  },
  {
    intent: 'Audits',
    survivor: '/services/shopify-audits/',
    retiring: ['/pages/website-audit-service', '/pages/website-audit-services'],
  },
  {
    intent: 'WooCommerce migration',
    survivor: '/woocommerce-shopify-migrations/',
    retiring: [
      '/pages/woocommerce-to-shopify',
      '/pages/woocommerce-to-shopify-migration',
    ],
  },
  {
    intent: 'AI visibility (not in runbook — found during 0.4)',
    survivor: '/ai-visibility-audit/',
    retiring: [
      '/pages/ai-visibility',
      '/pages/free-ai-visibility-snapshot',
      '/pages/ai-visibility-implementation',
      '/pages/ai-visibility-monitoring',
    ],
    undecided:
      'Not triaged by the runbook. These may be distinct funnel steps rather than duplicates — confirm before retiring any of them.',
  },
];

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

/** Shopify page handles are the path segment after `/pages/`. */
function handleFromPath(path) {
  return path.replace(/^\/pages\//, '').replace(/\/$/, '');
}

/*
 * Admin API 2026-07 has no `pageByHandle`, and `Page` exposes no `seo` field —
 * both verified by introspection, not assumed. Every page is fetched once and
 * matched by handle locally, which also avoids depending on the search query
 * syntax for a one-off capture.
 */
const PAGES_QUERY = `
  query SnapshotPages($after: String) {
    pages(first: 250, after: $after) {
      nodes {
        id
        handle
        title
        body
        bodySummary
        createdAt
        updatedAt
        publishedAt
        isPublished
        templateSuffix
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

/** Every page in the store, keyed by handle. */
async function fetchAllPages() {
  const byHandle = new Map();
  let after = null;

  do {
    const data = await admin(PAGES_QUERY, {after});
    for (const node of data.pages.nodes) byHandle.set(node.handle, node);
    after = data.pages.pageInfo.hasNextPage
      ? data.pages.pageInfo.endCursor
      : null;
  } while (after);

  return byHandle;
}

const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const outDir = resolve(ROOT, 'logs');
mkdirSync(outDir, {recursive: true});

const snapshot = {
  capturedAt: new Date().toISOString(),
  store: DOMAIN,
  apiVersion: VERSION,
  note: 'Runbook 1.3 step 1. Read-only capture taken BEFORE any redirect is created. No page was modified.',
  clusters: [],
};

let captured = 0;
let missing = 0;

const allPages = await fetchAllPages();
console.log(`Fetched ${allPages.size} pages from ${DOMAIN}.
`);

for (const cluster of CLUSTERS) {
  const entry = {
    intent: cluster.intent,
    survivor: cluster.survivor,
    undecided: cluster.undecided ?? null,
    retiring: [],
  };

  for (const path of cluster.retiring) {
    const handle = handleFromPath(path);

    const page = allPages.get(handle) ?? null;

    if (!page) {
      entry.retiring.push({path, handle, found: false});
      missing += 1;
      console.error(`  ! ${path} — no Shopify page with handle "${handle}"`);
      continue;
    }

    entry.retiring.push({
      path,
      handle,
      found: true,
      bodyLength: page.body?.length ?? 0,
      page,
    });

    captured += 1;
    console.log(
      `  ✓ ${path} — "${page.title}" (${page.body?.length ?? 0} chars of body)`,
    );
  }

  snapshot.clusters.push(entry);
}

const outFile = resolve(outDir, `retired-pages-${timestamp}.json`);
writeFileSync(outFile, JSON.stringify(snapshot, null, 2), 'utf8');

console.log(`\nCaptured ${captured} page(s), ${missing} missing.`);
console.log(`Snapshot: ${outFile.replace(ROOT, '.')}`);
