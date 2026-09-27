#!/usr/bin/env node
/**
 * Runbook 1.3, steps 2–5 — consolidate cannibalisation clusters.
 *
 * Creates a 301 from each retiring path to its cluster survivor, then verifies
 * the redirect actually lands where it should.
 *
 * DRY RUN BY DEFAULT. Nothing is written without `--apply`, per the runbook's
 * standing rule 1. Run `scripts/snapshot-retiring-pages.mjs` first — this
 * script refuses to apply unless a snapshot exists, because a 301 makes the
 * original page unreachable and the content is only recoverable from the
 * snapshot.
 *
 *   node scripts/consolidate-cannibalisation.mjs            # dry run
 *   node scripts/consolidate-cannibalisation.mjs --apply    # writes 301s
 *   node scripts/consolidate-cannibalisation.mjs --cluster=CRO --apply
 *
 * Decisions live in DECISIONS below. A cluster with `approved: false` is
 * skipped even with `--apply` — the survivor is the owner's call, not this
 * script's.
 */

import {readFileSync, readdirSync, existsSync} from 'node:fs';
import {resolve, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://www.byteoperator.com';

/**
 * One entry per cluster.
 *
 * `approved` gates the write. Flip it to true only for a cluster whose
 * survivor has actually been decided — the runbook prompt opens with "I will
 * give you the surviving URL and the URLs to retire", so nothing here is
 * approved by default.
 */
const DECISIONS = [
  /*
   * B1 — approved 13 Sep 2026 after the Phase A extraction gate.
   *
   * Every page below renders nothing. Of the twenty, sixteen have no theme
   * template at all; the four that do share one layout whose only per-page
   * content is a heading and a single sentence, preserved verbatim in
   * logs/page-templates-*.json. Nothing unique is buried by these redirects.
   */
  {
    key: 'Migrations',
    survivor: '/shopify-migrations/',
    retiring: ['/pages/shopify-migration-services', '/pages/wix-to-shopify-migration-1'],
    approved: true,
    note: 'Wix has no dedicated page unlike Woo/Magento/BigCommerce/Salesforce — generic target is temporary.',
  },
  {
    key: 'MagentoMigration',
    survivor: '/magento-shopify-migrations/',
    retiring: ['/pages/magento-to-shopify-migration'],
    approved: true,
  },
  {
    key: 'WooMigration',
    survivor: '/woocommerce-shopify-migrations/',
    retiring: ['/pages/woocommerce-to-shopify', '/pages/woocommerce-to-shopify-migration'],
    approved: true,
  },
  {
    key: 'SEO',
    survivor: '/seo-agency',
    retiring: [
      '/pages/shopify-seo-services',
      '/pages/search-engine-optimization-seo',
      '/pages/shopify-marketing-seo',
    ],
    approved: true,
  },
  {
    key: 'CRO',
    survivor: '/shopify-cro-agency/',
    retiring: [
      '/pages/shopify-conversion-rate-optimization',
      '/pages/the-fold-tech-approach-to-cro',
    ],
    approved: true,
    note: '/pages/conversion-rate-optimization is menu-linked and handled by the menu repoint, not here.',
  },
  {
    key: 'Audits',
    survivor: '/services/shopify-audits/',
    retiring: [
      '/pages/website-audit-service',
      '/pages/website-audit-services',
      '/pages/free-shopify-audit',
    ],
    approved: true,
  },
  {
    key: 'AppDevelopment',
    survivor: '/shopify-app-development/',
    retiring: ['/pages/shopify-app-development-services'],
    approved: true,
  },
  {
    key: 'Maintenance',
    survivor: '/support-and-maintenance/',
    retiring: ['/pages/shopify-maintenance-services-1'],
    approved: true,
  },
  {
    key: 'ThemeDevelopment',
    survivor: '/shopify-theme-development-builds/',
    retiring: ['/pages/shopify-theme-customization'],
    approved: true,
  },
  {
    key: 'ShopifyPlus',
    survivor: '/shopify-plus-agency',
    retiring: ['/pages/shopify-plus-partner-agency'],
    approved: true,
  },
  {
    key: 'EmailMarketing',
    survivor: '/email-marketing-agency/',
    retiring: ['/pages/marketing-automation', '/pages/shopify-marketing-automation'],
    approved: true,
  },
  {
    key: 'CaseStudies',
    survivor: '/work',
    retiring: ['/pages/case-studies-1'],
    approved: true,
    note: 'Target is /work, NOT /case-studies — that clean URL 404s (no Shopify page carries the handle).',
  },

  /*
   * Explicitly NOT approved. These are BUILD, not cleanup — a redirect would
   * remove a page the owner intends to populate, and for the AI-visibility
   * set would break a live menu.
   */
  {
    key: 'AIVisibility',
    survivor: '/ai-visibility-audit/',
    retiring: [
      '/pages/ai-visibility',
      '/pages/free-ai-visibility-snapshot',
      '/pages/ai-visibility-implementation',
      '/pages/ai-visibility-monitoring',
    ],
    approved: false,
    note: 'BUILD, not cleanup. Deliberate funnel wired into a live menu; the audit page is already built on the seo/structured-data branch.',
  },
];

const args = process.argv.slice(2);
const APPLY = args.includes('--apply');
const clusterArg = args.find((a) => a.startsWith('--cluster='));
const ONLY = clusterArg ? clusterArg.split('=')[1] : null;

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
const EXISTING_REDIRECTS_QUERY = `
  query ExistingRedirects($after: String) {
    urlRedirects(first: 250, after: $after) {
      nodes { id path target }
      pageInfo { hasNextPage endCursor }
    }
  }
`;

const CREATE_REDIRECT_MUTATION = `
  mutation CreateRedirect($urlRedirect: UrlRedirectInput!) {
    urlRedirectCreate(urlRedirect: $urlRedirect) {
      urlRedirect { id path target }
      userErrors { field message }
    }
  }
`;

async function fetchExistingRedirects() {
  const byPath = new Map();
  let after = null;

  do {
    const data = await admin(EXISTING_REDIRECTS_QUERY, {after});
    for (const node of data.urlRedirects.nodes) byPath.set(node.path, node);
    after = data.urlRedirects.pageInfo.hasNextPage
      ? data.urlRedirects.pageInfo.endCursor
      : null;
  } while (after);

  return byPath;
}

/** Follows nothing — a 301 must land on the survivor directly, not via a chain. */
async function checkRedirect(path, expectedTarget) {
  const response = await fetch(`${SITE}${path}?cb=${Date.now()}`, {
    redirect: 'manual',
  });

  const location = response.headers.get('location') ?? '';
  const landed = location.replace(SITE, '') || location;

  return {
    status: response.status,
    location: landed,
    ok: response.status === 301 && landed.replace(/\?.*$/, '') === expectedTarget,
  };
}

function latestSnapshot() {
  const dir = resolve(ROOT, 'logs');
  if (!existsSync(dir)) return null;

  const files = readdirSync(dir)
    .filter((f) => f.startsWith('retired-pages-') && f.endsWith('.json'))
    .sort();

  return files.length ? resolve(dir, files[files.length - 1]) : null;
}

const snapshot = latestSnapshot();

console.log(`Mode:     ${APPLY ? 'APPLY (writes 301s)' : 'DRY RUN'}`);
console.log(`Store:    ${DOMAIN} (${VERSION})`);
console.log(`Snapshot: ${snapshot ? snapshot.replace(ROOT, '.') : 'NONE'}`);

if (APPLY && !snapshot) {
  console.error(
    '\nRefusing to apply: no ./logs/retired-pages-*.json found.\nRun scripts/snapshot-retiring-pages.mjs first — a 301 makes the original unreachable.',
  );
  process.exit(1);
}

const existing = await fetchExistingRedirects();
console.log(`Existing redirects in store: ${existing.size}\n`);

let planned = 0;
let created = 0;
let skipped = 0;
let failed = 0;

for (const cluster of DECISIONS) {
  if (ONLY && cluster.key !== ONLY) continue;

  const gate = cluster.approved ? 'APPROVED' : 'NOT APPROVED';
  console.log(`[${cluster.key}] survivor ${cluster.survivor} — ${gate}`);
  if (cluster.note) console.log(`  note: ${cluster.note}`);

  for (const path of cluster.retiring) {
    const already = existing.get(path);

    if (already) {
      console.log(`  = ${path} -> already redirects to ${already.target}`);
      skipped += 1;
      continue;
    }

    planned += 1;

    if (!APPLY || !cluster.approved) {
      const why = !cluster.approved ? 'awaiting decision' : 'dry run';
      console.log(`  · ${path} -> ${cluster.survivor}  (${why})`);
      continue;
    }

    try {
      const data = await admin(CREATE_REDIRECT_MUTATION, {
        urlRedirect: {path, target: cluster.survivor},
      });

      const errors = data.urlRedirectCreate?.userErrors ?? [];

      if (errors.length) {
        failed += 1;
        console.error(
          `  ! ${path} -> rejected: ${errors
            .map((e) => `${(e.field ?? []).join('.')}: ${e.message}`)
            .join('; ')}`,
        );
        continue;
      }

      const check = await checkRedirect(path, cluster.survivor);

      if (check.ok) {
        created += 1;
        console.log(`  + ${path} -> ${cluster.survivor}  (301 verified)`);
      } else {
        failed += 1;
        console.error(
          `  ! ${path} -> created but verification failed: HTTP ${check.status} -> "${check.location}"`,
        );
      }
    } catch (error) {
      failed += 1;
      console.error(`  ! ${path} -> ${error.message}`);

      // Standing rule 7: stop on abort rather than pressing on blindly.
      console.error('\nAborting: look at the failure before re-running.');
      process.exit(1);
    }

    await new Promise((r) => setTimeout(r, 600));
  }

  console.log('');
}

console.log(
  `planned ${planned} · created ${created} · already-redirecting ${skipped} · failed ${failed}`,
);

if (!APPLY) {
  console.log(
    '\nDry run only. Set `approved: true` on a decided cluster, then re-run with --apply.',
  );
}

if (created > 0) {
  console.log(
    '\nStep 5: Shopify regenerates sitemap/pages/1.xml on its own schedule —\nre-check that the retired URLs have dropped out before closing 1.3.',
  );
}
