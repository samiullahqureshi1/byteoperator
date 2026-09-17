#!/usr/bin/env node
/**
 * CI guard for the redirect ownership boundary.
 *
 * Two systems can redirect a URL on this site, and when both claim one nobody
 * can tell which wins:
 *
 *   route-mappings.ts      owns URL SHAPE — canonical rewrites the app knows
 *                          about (`/pages/x` -> `/x`). Reviewed and deployed.
 *   Shopify URL Redirects  own LEGACY INBOUND only — URLs that predate the app
 *                          and that the app has no knowledge of.
 *
 * INVARIANT: no path may appear in both.
 *
 * It also checks the failure that has actually bitten this site repeatedly: a
 * clean target in route-mappings whose Shopify page does not exist, so the app
 * 301s straight into its own 404. `/case-studies` was one; six more were found
 * the same day. A static list cannot catch that, so it is checked live.
 *
 *   node scripts/check-redirect-ownership.mjs          # static + live
 *   node scripts/check-redirect-ownership.mjs --static # no network
 *
 * Exits non-zero on any violation, so it can gate a build.
 */

import {readFileSync, existsSync} from 'node:fs';
import {resolve, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const STATIC_ONLY = process.argv.includes('--static');

function loadEnv() {
  const env = {};
  const file = resolve(ROOT, '.env');
  if (!existsSync(file)) return env;

  for (const line of readFileSync(file, 'utf8').split('\n')) {
    const match = /^([A-Z0-9_]+)=(.*)$/.exec(line.trim());
    if (!match) continue;
    env[match[1]] = match[2].replace(/^["']|["']$/g, '');
  }

  return env;
}

function normalize(pathname) {
  const clean = pathname.split('?')[0];
  return clean.length > 1 ? clean.replace(/\/+$/, '') : clean;
}

/** Parses OLD_TO_CLEAN_PATHS into [legacyPath, cleanPath] pairs. */
function parseRouteMappings() {
  const src = readFileSync(resolve(ROOT, 'app/lib/route-mappings.ts'), 'utf8');

  const consts = Object.fromEntries(
    [...src.matchAll(/export const ([A-Z0-9_]+) = '([^']+)';/g)].map((m) => [
      m[1],
      m[2],
    ]),
  );

  /*
   * An earlier `} as const` (SERVICE_CONFIG_HANDLES_BY_SHOPIFY_HANDLE) sits
   * above this table, so the end index must be searched FROM the start of the
   * table. Searching from zero yields an empty slice — and a guard that parses
   * nothing passes everything, which is worse than having no guard at all.
   */
  const start = src.indexOf('export const OLD_TO_CLEAN_PATHS');
  const block = src.slice(start, src.indexOf('} as const', start));

  const pairs = [];

  // '/pages/x': '/y'   |   '/pages/x': CONST   |   [`/pages/${CONST}`]: ...
  const entry =
    /(?:'([^']+)'|\[`([^`$]*)\$\{([A-Z0-9_]+)\}`\])\s*:\s*(?:'([^']+)'|([A-Z0-9_]+))\s*,/g;

  for (const m of block.matchAll(entry)) {
    const legacy = m[1] ?? `${m[2]}${consts[m[3]] ?? ''}`;
    const clean = m[4] ?? consts[m[5]];
    if (!legacy || !clean) continue;
    pairs.push([normalize(legacy), normalize(clean)]);
  }

  return pairs;
}

const failures = [];
const warnings = [];

const mappings = parseRouteMappings();
const appPaths = new Set(mappings.map(([legacy]) => legacy));

console.log(`route-mappings.ts: ${mappings.length} entries, ${appPaths.size} owned paths`);

// A zero parse means the file shape changed and this guard has gone blind.
if (!mappings.length) {
  console.log(
    'FAIL — parsed 0 mappings from route-mappings.ts. The guard cannot see the table; fix the parser before trusting a PASS.',
  );
  process.exit(1);
}

/* ---- static check 1: a clean target must not also be a mapping source ---- */

for (const [legacy, clean] of mappings) {
  if (!appPaths.has(clean) || clean === legacy) continue;

  const onward = mappings.find(([l]) => l === clean);
  if (!onward) continue;

  /*
   * A clean path that maps to itself is trailing-slash canonicalisation
   * ('/x' -> '/x/'), not a chain. Paths are compared normalised, so those
   * entries look self-referential here and must not be reported.
   */
  if (onward[1] === clean) continue;

  failures.push(
    `CHAIN IN MAPPINGS: ${legacy} -> ${clean} -> ${onward[1]} (should point at the final target directly)`,
  );
}

/* ---- live checks ---- */

if (!STATIC_ONLY) {
  const env = loadEnv();
  const DOMAIN = env.SHOPIFY_STORE_DOMAIN;
  const TOKEN = env.SHOPIFY_ADMIN_TOKEN;
  const VERSION = env.SHOPIFY_API_VERSION || '2026-07';

  /*
   * Live check 3 needs nothing but the list of published page handles, which
   * the Storefront API serves — so it runs on the Storefront token alone,
   * outside the Admin block below.
   *
   * It used to sit inside that block, which meant it silently did not run
   * whenever Admin credentials were absent. That is how six DEAD CLEAN TARGETs
   * (`/integrations`, `/b2b`, `/subscriptions`, `/support-maintenance`,
   * `/shopify-support`, `/shopify-consultant`) survived in the mappings while
   * this script reported PASS.
   *
   * Storefront is also the better source here than Admin: it lists only
   * PUBLISHED pages, and an unpublished page 404s for visitors exactly like a
   * missing one. An Admin-based check would pass on a page the public cannot
   * reach.
   */
  await checkDeadCleanTargets(env);

  if (!DOMAIN || !TOKEN) {
    console.log('\nNo Admin credentials — skipping Admin-only live checks.');
  } else {
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

      const json = JSON.parse(await response.text());
      if (json.errors?.length) {
        throw new Error(json.errors.map((e) => e.message).join('; '));
      }

      return json.data;
    }

    /* ---- live check 2: ownership overlap ---- */

    const redirects = [];
    let cursor = null;

    do {
      const data = await admin(
        `query R($after: String) {
           urlRedirects(first: 250, after: $after) {
             nodes { id path target }
             pageInfo { hasNextPage endCursor }
           }
         }`,
        {after: cursor},
      );

      redirects.push(...data.urlRedirects.nodes);
      cursor = data.urlRedirects.pageInfo.hasNextPage
        ? data.urlRedirects.pageInfo.endCursor
        : null;
    } while (cursor);

    console.log(`Shopify URL redirects: ${redirects.length}`);

    for (const redirect of redirects) {
      if (appPaths.has(normalize(redirect.path))) {
        failures.push(
          `OWNERSHIP OVERLAP: ${redirect.path} is claimed by BOTH route-mappings.ts and a Shopify redirect (-> ${redirect.target})`,
        );
      }
    }

  }
}

/**
 * Every clean target must resolve to a Shopify page that actually exists.
 *
 * A clean path is served by resolving it back to the FIRST `/pages/*` entry
 * that points at it, then loading that Shopify page. If no such page exists
 * the app 301s into its own 404 — invisible until someone follows an old link.
 *
 * Uses the Storefront API, so it runs without Admin credentials.
 */
async function checkDeadCleanTargets(env) {
  const domain = env.PUBLIC_STORE_DOMAIN;
  const token = env.PUBLIC_STOREFRONT_API_TOKEN;

  if (!domain || !token) {
    warnings.push(
      'No Storefront credentials — cannot check for dead clean targets.',
    );
    return;
  }

  const response = await fetch(`https://${domain}/api/2025-01/graphql.json`, {
    method: 'POST',
    headers: {
      'X-Shopify-Storefront-Access-Token': token,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      query: '{ pages(first: 250) { nodes { handle } } }',
    }),
  });

  if (!response.ok) {
    warnings.push(`Storefront API returned ${response.status} — page check skipped.`);
    return;
  }

  const body = await response.json();
  const nodes = body?.data?.pages?.nodes;

  if (!Array.isArray(nodes)) {
    warnings.push('Storefront API returned no pages — page check skipped.');
    return;
  }

  const handles = new Set(nodes.map((page) => page.handle));
  const cleanTargets = [...new Set(mappings.map(([, clean]) => clean))];
  let checked = 0;

  for (const clean of cleanTargets) {
    if (clean.startsWith('/pages/')) continue;

    const resolver = mappings.find(
      ([legacy, target]) => legacy.startsWith('/pages/') && target === clean,
    );

    // Served by a dedicated route (e.g. /articles/), not the page resolver.
    if (!resolver) continue;

    const handle = resolver[0].slice('/pages/'.length);
    checked++;

    if (!handles.has(handle)) {
      failures.push(
        `DEAD CLEAN TARGET: ${clean} resolves to Shopify page "${handle}", ` +
          `which does not exist — the app 301s into a 404`,
      );
    }
  }

  console.log(
    `
Checked ${checked} clean target(s) against ${handles.size} published Shopify pages.`,
  );
}

/* ---- report ---- */

console.log('');

if (warnings.length) {
  console.log(`Warnings (${warnings.length}):`);
  for (const w of warnings) console.log(`  ! ${w}`);
  console.log('');
}

/*
 * `process.exitCode`, not `process.exit()`. An abrupt exit while undici still
 * holds a keep-alive socket from the Storefront fetch trips a libuv assertion
 * on Windows and corrupts the exit code — a PASS was reporting 127, which
 * would fail a build on success. Setting the code and letting Node drain its
 * handles exits cleanly with the right status.
 */
if (!failures.length) {
  console.log('PASS — redirect ownership boundary is intact.');
  process.exitCode = 0;
} else {
  console.log(`FAIL — ${failures.length} violation(s):`);
  for (const f of failures) console.log(`  x ${f}`);
  process.exitCode = 1;
}
