# Agent Prompts — Byte Operator search programme

Every prompt issued to the Claude Code agent, in order, with outcome.
**This file is appended to, never duplicated.** New prompts go at the bottom with a status line.

| # | Prompt | Status |
|---|---|---|
| 1 | Refresh lastmod across all articles | Superseded by #4 |
| 2 | Harden, snapshot, canary, apply | Complete — canary passed clean |
| 3 | Structured data deploy | Complete — code on branch seo/structured-data |
| 4 | Full apply + last_modified metafield + dateModified | Complete — 79/79 verified |
| 5 | Content recovery (MAIN theme only) | Superseded by #6 — read the wrong theme |
| 6 | Scopes, live 404 fix, all-theme recovery | Complete — inventory delivered |


---


# Prompt 1 — Refresh lastmod across all articles

**Status:** Superseded by #4

# Agent Prompt — Refresh `lastmod` on all Byte Operator blog articles

Paste everything between the rules into Claude Code, Cursor, or your VS Code agent, running inside a scratch repo (this does not touch the Hydrogen storefront codebase).

---

## TASK

Write and run a Node.js script that forces Software to update the `updated_at` timestamp on every blog article in the `byteoperator.com` store, so that the `<lastmod>` values in `https://byteoperator.com/sitemap/articles/1.xml` move to today's date.

## WHY (do not skip — it constrains the implementation)

A Software metafield controlling article visibility was set to `false`, which made all blog articles return 404 for several weeks. Google crawled them, got 404s, and dropped them from the index. The metafield is now `true` and all 79 articles return 200 again.

However, flipping the metafield did not change each article's `updated_at`. Software derives sitemap `<lastmod>` from `updated_at`, so the sitemap still reports these URLs as last modified between November 2025 and March 2026. Google therefore has no signal that anything changed and will not prioritise a recrawl.

The goal is a genuine, minimal, invisible write to each article that causes `updated_at` to advance. A write that Software treats as a no-op will not advance the timestamp — this is the main failure mode to design around.

## ENVIRONMENT

- Store: the digital platform behind `byteoperator.com` (storefront is Hydrogen on Oxygen; this task uses the **Admin** API, not the Storefront API)
- Auth: custom app Admin API access token, scopes `read_content` and `write_content`
- Credentials come from environment variables, never hardcoded, never committed:
  - `SHOPIFY_STORE_DOMAIN` (the `*.mysoftware.com` domain, not byteoperator.com)
  - `SHOPIFY_ADMIN_TOKEN`
  - `SHOPIFY_API_VERSION`
- Node 20+, no framework, `fetch` is built in

## REQUIREMENTS

1. **Verify the API surface before writing code.** Use the **GraphQL Admin API**. The `articleUpdate` mutation is confirmed to exist and requires any of `write_content` or `write_online_store_pages`. Note the field name difference that catches people out:

   - GraphQL `ArticleUpdateInput` uses **`body`** for the article HTML
   - REST uses **`body_html`**

   Confirm the exact input shape against the docs for the API version you are running before writing the mutation, and state which version and field names you used. Only fall back to REST (`PUT /admin/api/{version}/articles/{id}.json`) if GraphQL is unavailable in that version.

2. **Enumerate every article across all four blogs.** The store has four blogs, confirmed: `news`, `case-studies`, `featured`, `top-case-studies`. Walk all four. Paginate properly — do not assume a single page of results per blog.

   **Reconciling against the sitemap:** `https://byteoperator.com/sitemap/articles/1.xml` lists exactly 79 URLs. The Admin API may return more than 79 articles, because unpublished or hidden articles do not appear in a sitemap. That is expected, not an error.

   - Fetch the sitemap and parse its 79 URLs into a set
   - Build each article's public URL as `https://byteoperator.com/articles/{handle}/`
   - **Only update articles whose URL is in the sitemap set.** Leave everything else untouched.
   - Report three counts: articles found via API, articles matched to the sitemap, sitemap URLs with no matching article
   - If the matched count is not 79, stop and report the mismatch with the unmatched entries listed, rather than proceeding

3. **The write must be a real change, and invisible.** Append a single HTML comment to the end of `body` (GraphQL) / `body_html` (REST):

   ```
   <!-- lastmod-refresh:YYYY-MM-DD -->
   ```

   Rules for this:
   - Renders as nothing for users. Ignored by crawlers as page content.
   - **Idempotent:** if a `lastmod-refresh` comment already exists, replace it rather than appending a second one. Use a regex on `<!-- lastmod-refresh:[^>]* -->`.
   - Never alter any other part of the article HTML. Preserve the existing markup byte-for-byte apart from that comment.

4. **Never modify these fields:** `published_at`, `title`, `handle`, `author`, `tags`, `summary_html`, `image`, or any metafield. Changing `published_at` would reorder the blog and destroy the age signal on posts dating back to 2024. Changing `handle` would break URLs. If the API requires sending these fields back, send the exact values that were read.

5. **Rate limiting.** Software enforces API rate limits (REST leaky bucket, GraphQL cost-based). Process serially with a delay between writes, honour `Retry-After` on 429, and retry with exponential backoff up to three attempts. Do not parallelise — 79 records is small and speed does not matter here.

6. **Dry-run by default.** The script runs in dry-run mode unless invoked with `--apply`. Dry run must print, for each article: id, handle, current `updated_at`, and whether a refresh comment already exists. Nothing is written in dry run.

7. **Logging and audit trail.** Write a JSON log to `./logs/lastmod-refresh-<timestamp>.json` containing, per article: id, handle, `updated_at` before, `updated_at` after, HTTP status, and any error. Print a summary line: attempted / succeeded / failed.

8. **Self-verification.** After a successful `--apply` run, fetch `https://byteoperator.com/sitemap/articles/1.xml`, parse every `<loc>`/`<lastmod>` pair, and assert that every `lastmod` is dated today. Print any URL that is not, as a list. Software may take a few minutes to regenerate the sitemap — retry the check up to five times with 60 seconds between attempts before reporting failure.

9. **Failure handling.** If any single article fails, continue with the rest and report the failures at the end. Never leave a partially-written `body` (GraphQL) / `body_html` (REST). Never swallow an error silently.

## DELIVERABLES

- `refresh-lastmod.mjs` — the script
- `README.md` — how to set the env vars, run the dry run, run the apply, and read the log
- The dry-run output, pasted back to me
- After I approve the dry run: the apply-run summary and the sitemap verification result

## ACCEPTANCE CRITERIA

- All 79 articles report a new `updated_at`
- `https://byteoperator.com/sitemap/articles/1.xml` shows today's date in every `<lastmod>`
- Spot-check three articles in the browser: content renders exactly as before, publish dates unchanged
- Re-running the script is safe and does not accumulate duplicate HTML comments

## DO NOT

- Do not hardcode credentials, or print the token to logs or console
- Do not use the Storefront API
- Do not touch the Hydrogen storefront repository
- Do not modify, unpublish, delete, or reorder any article
- Do not "optimise" or reformat article HTML
- Do not proceed to `--apply` without showing me the dry-run output first

---

## Getting the token — do this before running the prompt

The app is created **in the store admin, not in Software Engineering Partners**. Partners is for apps distributed across multiple merchants; this is a single-store internal tool.

1. Software admin → **Settings → Apps and sales channels → Develop apps**
   If the button is greyed out, click **Allow custom app development** first. Store-owner account only, and it is a one-time toggle.
2. **Create an app** → name it `Byte Operator SEO Maintenance` → **Create app**
3. **Configuration → Admin API integration → Configure** → search "content" and tick:
   - `read_content`
   - `write_content`
   Nothing else. No orders, no customers, no products — this script has no business touching them, and a narrow token limits the blast radius if it leaks.
4. **Save**, then **API credentials → Install app**
5. **Reveal token once** — it starts with `shpat_`. Software shows it exactly once. Copy it straight into your password manager.

Then set it on the dev machine as environment variables, never in a file that gets committed:

```bash
export SHOPIFY_STORE_DOMAIN="your-store.mysoftware.com"
export SHOPIFY_ADMIN_TOKEN="shpat_..."
export SHOPIFY_API_VERSION="2026-07"   # use the current stable version
```

`SHOPIFY_STORE_DOMAIN` is the `.mysoftware.com` domain, not `byteoperator.com`. The Admin API only answers to the former.

**Token handling:** treat `shpat_` like a password. It is a full write credential for your store's content. Never paste it into a chat — including this one; I never need to see it. After the run, either keep the app for future SEO automation (recommended — schema deploys, bulk metadata edits and content audits all need it) or uninstall it, which revokes the token immediately.

## Notes for Malik

- Steps 2 to 6 of Section 1 (Search Console property, baseline export, sitemap submission, URL inspection, Bing) are browser work in Google's and Bing's interfaces. No agent prompt applies. Say the word and I will drive those in your Chrome directly, pausing before anything that submits.
- If your dev would rather not build this, the manual route is 79 posts × open, add a space, delete it, Save. About 45 minutes. Same result.
- The `<!-- lastmod-refresh:… -->` comment is permanent and harmless. It also gives you a machine-checkable record of which articles were touched and when.


---


# Prompt 2 — Harden, snapshot, canary, apply

**Status:** Complete — canary passed clean

# Agent Prompt 2 — Harden, snapshot, canary, then apply

Paste into the same agent session that produced the dry run. It has the script and context already.

---

## CONTEXT

Dry run approved. 79 articles matched to the sitemap, 2 unpublished articles correctly excluded, 0 existing refresh markers, reconciliation clean in both directions. We are now writing to 79 live articles, so three changes go in before any mutation runs.

## CHANGE 1 — Widen the post-write parity check

The current check compares `publishedAt`, `handle` and `title` after each mutation. Those are not the fields most at risk if `ArticleUpdateInput` clears omitted values. Extend the comparison to include:

- `summary`
- `tags`
- `image` including `image.altText` and the image URL
- `author` (whatever the schema exposes — `author.name` or equivalent)

Same behaviour as now: any drift on any field aborts the run immediately, before the next article is touched. Print which field drifted, its before value and its after value.

Rationale: losing 79 article summaries or images silently would be a worse outcome than the stale `lastmod` we are fixing. `summary` and `image` drive listing and social-preview rendering.

## CHANGE 2 — Full pre-apply snapshot

Before the first mutation of any `--apply` run, write `./logs/pre-apply-snapshot-<timestamp>.json` containing the **complete current record** for every article in scope:

```
id, blogHandle, handle, title, author, summary, tags,
image { url, altText }, publishedAt, updatedAt, body
```

Store the **full `body` HTML**, not a hash. A hash proves damage occurred; only the body allows repair. The file will be a few MB — that is fine.

Add `logs/` to `.gitignore`. Article bodies are business content and do not belong in a repository.

Then add a `--restore-body <snapshot-file> [--only <handle>]` mode that writes `body` back from a snapshot. Do not run it. It exists so that recovery is a command rather than an improvisation at the point where something has already gone wrong.

## CHANGE 3 — `--only <handle>` flag

Add an `--only <handle>` flag that restricts the run to a single article by handle, valid in both dry-run and apply mode.

## THEN — Canary run

Run exactly this:

```
node refresh-lastmod.mjs --apply --only atlanta-falcons-logo-design-services
```

One article, chosen because it is the lowest-value published post on the site — a 2025 logo-services piece with no bearing on the site's commercial priorities. If anything goes wrong, it goes wrong there.

Then verify and report, in this order:

1. **Field parity** — diff the post-write record against the snapshot. Confirm `body` and `updatedAt` changed and **nothing else** did. Print the diff.
2. **Render check** — fetch `https://byteoperator.com/articles/atlanta-falcons-logo-design-services/` and confirm HTTP 200, that the title and visible text are unchanged, and that the `<!-- lastmod-refresh:2026-09-12 -->` comment is present in the source but produces no visible output.
3. **Sitemap check** — poll `https://byteoperator.com/sitemap/articles/1.xml` until that URL's `<lastmod>` reads today, up to 5 attempts 60s apart. Report how long it took, since that number sets expectations for the full run.

**Stop after the canary. Do not proceed to the remaining 78 until I approve the canary report.**

## AFTER APPROVAL — Full run

```
node refresh-lastmod.mjs --apply
```

The already-refreshed canary article will be handled by the existing two-phase write logic, so no duplicate marker.

Report at the end:

- attempted / succeeded / failed
- any aborts and which field triggered them
- final sitemap verification: every one of the 79 `<lastmod>` values dated today, or a list of those that are not
- total elapsed time

## DO NOT

- Do not run the full apply before I approve the canary
- Do not commit `logs/`, `.env`, or any snapshot file
- Do not widen the scope beyond the 79 sitemap-matched articles
- Do not touch the two unpublished articles
- Do not modify `published_at`, `handle`, `title`, `summary`, `tags`, `image` or `author` under any circumstance


---


# Prompt 3 — Structured data deploy

**Status:** Complete — code on branch seo/structured-data

# Agent Prompt 3 — Section 2: Deploy structured data across the Hydrogen storefront

Repo: `D:\Hydrogen\Fold_Tech_Hydrogen_New` · Companion file: `schema.ts` (provided separately — do not rewrite its values)

---

## CONTEXT

byteoperator.com is a Software Hydrogen storefront on Oxygen. It currently serves **zero** `application/ld+json` on all 276 indexable URLs — no Organization, Service, Article, Breadcrumb or FAQ markup anywhere. This is the largest remaining gap in the site's search and AI-visibility profile.

You are given a complete, verified `schema.ts`. Every value in it is real and confirmed — address, founding year, headcount, logo, service definitions for all 28 live service pages. **Do not invent, substitute or "improve" any value in that file.** If something looks wrong, stop and report it rather than editing it.

## TASK

Wire structured data into the storefront so that every page emits the correct JSON-LD **in server-rendered HTML**.

## STEP 1 — Install the module

Place the provided file at `app/lib/seo/schema.ts`. Confirm the import alias used in this project (`~/`, `app/`, or relative) and use whatever the codebase already uses.

## STEP 2 — Sitewide graph

In the root layout (`app/root.tsx` or whatever this project uses as its document shell), inject inside `<head>`:

```tsx
import {SITEWIDE_GRAPH, jsonLdString} from '~/lib/seo/schema';

<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{__html: jsonLdString(SITEWIDE_GRAPH)}}
/>
```

This emits three linked nodes (parent Organization, ProfessionalService, WebSite) in one `@graph`. It must appear on **every** page, including 404s and the homepage.

## STEP 3 — Service pages

All 28 service paths are defined in `SERVICES` in the module. Emit, per service page:

- `serviceSchema(path)`
- `breadcrumbSchema([{name: 'Services', path: '/services'}, {name: <page name>, path: <path>}])`

**First inspect how these routes are built.** If they share a template or are generated from a single route module, wire this once in that template and pass the path through. Do not hand-edit 28 route files if one change covers them. Report which approach the codebase's structure dictates.

Paths must match exactly, trailing slashes included — `/geo-agency/` has one, `/software-plus-agency` does not. `serviceSchema()` returns `null` for an unmatched path; filter nulls out rather than emitting `null` into the graph.

## STEP 4 — Article pages

79 blog articles were just restored and are being re-crawled. Article schema materially affects how they are attributed.

On the article route, call `articleSchema()` with values from the route's existing loader data — do not refetch:

```
path            the article's public path, e.g. /articles/software-seo-in-2026/
headline        article title
description     article summary/excerpt, or first ~200 chars of body text if empty
imageUrl        article image URL
datePublished   publishedAt, ISO 8601
dateModified    updatedAt, ISO 8601
authorName      article author
```

Plus `breadcrumbSchema([{name: 'Articles', path: '/articles/'}, {name: <title>, path: <path>}])`.

Note: many articles have an empty `summary`. Derive the description from body text in that case — never emit an empty `description` field; omit it instead.

## STEP 5 — Case study pages

The 19 case studies live at `/pages/cs-*`. If they share a page route, use `caseStudySchema()` with the client name, headline and description from the page data. If they are individually authored routes, do the three highest-value ones as a pattern and report what the rest would take. Do not fabricate outcome figures.

## STEP 6 — Verification (this is the part that usually fails silently)

The site sits behind an edge cache. A normal fetch returns a stale copy and makes a successful deploy look broken — and a failed deploy look fine. **Cache-bust every verification request** (unique query string per fetch).

After building and deploying to a preview environment, for each of these URLs:

```
https://byteoperator.com/
https://byteoperator.com/geo-agency/
https://byteoperator.com/software-plus-agency
https://byteoperator.com/articles/software-seo-in-2026/
https://byteoperator.com/pages/cs-nevuu
https://byteoperator.com/contact/
```

Extract every `<script type="application/ld+json">` block **from the raw HTML response**, not from a rendered DOM — AI crawlers largely do not execute JavaScript, so anything only present after hydration does not count. Then assert:

1. Each block parses as valid JSON
2. The sitewide graph is present on all six
3. Service pages carry exactly one Service node with a `@id` matching their own URL
4. The article page carries an Article node with real `datePublished` and `dateModified`
5. No duplicate `@id` values within a page
6. Every `url` and `@id` in the emitted JSON resolves to HTTP 200 (no trailing-slash mismatches)

Report the JSON-LD block count per URL and any assertion that fails.

## STEP 7 — External validation

Run the homepage and one service page through Google's Rich Results Test and the schema.org validator. Report errors and warnings verbatim. Warnings about optional recommended fields are acceptable; errors are not.

## CONSTRAINTS

- **Do not add `AggregateRating` or `Review` schema.** The 4.9/415 reviews live on Software's Partner Directory, and marking up third-party reviews as first-party violates Google's structured data policy. This is deliberate, not an oversight.
- Do not modify existing `meta`, `title`, canonical or Open Graph handling. Schema is additive.
- Do not add FAQPage schema yet — FAQ content must be visible on the page first. That is a later section.
- Do not change any value inside `schema.ts`.
- Work on a branch. Show me the diff and the verification output. **Do not deploy to production without approval.**

## DELIVERABLES

- Branch with the changes, and the diff
- A note on how service routes are structured and whether one template covered all 28
- Verification output for all six URLs
- Rich Results Test and schema.org validator results


---


# Prompt 4 — Full apply + last_modified metafield + dateModified

**Status:** Complete — 79/79 verified

# Agent Prompt 4 — Full apply + `last_modified` metafield + wire `dateModified` + deploy validation

---

## CONTEXT AND CORRECTION

The full `--apply` run **was approved** — the approval didn't reach you. Right now exactly one of 79 articles carries a fresh timestamp; the other 78 still report `lastmod` dates between November 2025 and March 2026, which is the whole problem Section 1 exists to fix. That run is the priority in this session.

Your `dateModified` diagnosis is correct and your proposed fix is approved: the Storefront API's `Article` type genuinely has no `updatedAt`, and back-filling it with `publishedAt` would assert something false. We write a real value instead.

## PART A — Extend the refresh script to write a `last_modified` metafield

### A1. Create the metafield definition (once, before the run)

Using the Admin GraphQL API, create a metafield definition:

```
ownerType : ARTICLE
namespace : custom
key       : last_modified
type      : date_time
name      : Last modified
```

**Critical:** the definition must grant Storefront API read access, or the storefront cannot read it and this whole approach silently yields nothing. Set storefront access to public read on the definition (`access: { storefront: PUBLIC_READ }` or the equivalent in your API version — verify the exact shape against the docs for 2026-07 before running).

If creating the definition fails on a missing scope, stop and tell me which scope is needed. Adding it to the custom app takes a minute; guessing does not.

If a definition with that namespace/key already exists, reuse it — but verify its storefront access is enabled and report if it isn't.

### A2. Per-article sequence

For each of the 79 articles, in this order:

1. Write the body marker (existing logic, including the two-phase write for already-marked articles)
2. Read `updatedAt` back from the mutation response
3. `metafieldsSet` → `custom.last_modified` = that `updatedAt` value

Note and do not chase: step 3 may itself bump the article's Admin `updatedAt` by a second or two, so the sitemap `lastmod` can sit marginally later than the metafield value. That is harmless — the sitemap and the metafield serve different consumers and neither needs to match the other to the second.

Keep every existing guard: the eight-field parity check, abort-on-drift, the pre-apply snapshot, serial writes at 600ms, scoped sitemap verification.

### A3. Run it

```
node refresh-lastmod.mjs --apply
```

Report: attempted / succeeded / failed, any aborts and the field that triggered them, the scoped sitemap verification (all 79 `lastmod` dated today, or the list that are not), how many metafields were written, and total elapsed time.

## PART B — Wire `dateModified` in the storefront

On the article route, add the metafield to the existing article query:

```graphql
metafield(namespace: "custom", key: "last_modified") { value }
```

Pass it to `articleSchema()` as `dateModified`. Keep the current behaviour when it's absent: **omit the field entirely rather than substituting `publishedAt`.** Articles created after this run, before someone touches them, will legitimately have no modification date.

Re-run your local SSR verification. The article assertion count should go from 21/22 to 22/22.

## PART C — Deploy to preview and finish external validation

Deploy the branch to an Oxygen preview environment. Then:

1. Re-run the six-URL verification against the preview URL, cache-busted, extracting JSON-LD from raw HTML
2. Run the homepage and `/geo-agency/` through Google's Rich Results Test and validator.schema.org — both now have a public URL to fetch
3. Report errors and warnings verbatim

Warnings about optional recommended fields are acceptable. Errors are not.

## THEN STOP

Do not merge or deploy to production. Report:

- Part A run results
- Part B assertion count
- Part C validation output and the preview URL

## CONSTRAINTS UNCHANGED

No `AggregateRating` or `Review`. No `FAQPage` yet. No changes to existing meta, title, canonical or Open Graph. No edits to any value in `schema.ts`. Never substitute `publishedAt` for `dateModified`.


---


# Prompt 5 — Content recovery (MAIN theme only)

**Status:** Superseded by #6 — read the wrong theme

# Agent Prompt 5 — Recover the orphaned Liquid content into Hydrogen

**Supersedes** the 0.5 triage decisions for case studies, the AI-visibility funnel, and reviews. Those were written on the assumption the content didn't exist. It does.

---

## THE FINDING

The 74 "empty" pages are not unbuilt. They are **orphaned by the Liquid → Hydrogen migration.**

Their content lives in JSON templates in the MAIN Liquid theme `landingpage` (`gid://software/OnlineStoreTheme/147919143002`). The Hydrogen storefront renders the Software page `body` field, which is empty for these pages, and never reads the Liquid templates. So the copy sits in the store, fully written, and renders nowhere.

Confirmed by reading `templates/page.cs-nevuu.json` — it contains a complete case study: hero, summary, **four real metrics (+45%, −30%, +22%, 2.4s)**, challenge, solutions, results, and desktop/mobile screenshot references.

Template inventory in that theme:

```
18 × templates/page.cs-*.json              1.0–3.4 KB each  — case studies with metrics
     templates/page.ai-visibility.json        48 KB         — the AI-visibility funnel
     templates/page.freeaivisibility-snapshot.json  41 KB
     templates/page.ai-visibility-audit.json  15 KB
     templates/page.reviews.json              71 KB         — testimonials / reviews
     templates/page.about-us.json             45 KB
     ~25 × service page templates            ~4.3 KB each
```

That is the content the runbook had scheduled as weeks of writing.

## TASK — Phase A: extract and inventory (read-only)

1. For every `templates/page.*.json` file in theme `147919143002`, fetch the file body via the Admin API (`theme(id:) { files(filenames:) { nodes { filename body { ... on OnlineStoreThemeFileBodyText { content } } } } }`). Note the leading auto-generated comment block before the JSON — strip it before parsing.

2. Write `logs/liquid-content-inventory.json`, one entry per template:
   - filename, matching page handle (from `templateSuffix` on the Page object), matching public URL
   - every section: type, and all settings containing text
   - total extracted text length, stripped of HTML
   - any asset filenames referenced (`*_asset_name` settings)

3. Cross-reference against the empty-page list. Report three counts: empty pages **with** recoverable template content, empty pages **without**, and templates with no matching page.

4. Report — do not build yet.

## TASK — Phase B: the architecture decision (propose, don't implement)

Do **not** hardcode 18 case studies into React components. Propose a data-driven port instead, and show me the design before writing it:

- A Software **metaobject definition** per content type — start with `case_study`: client name, summary, four stat label/value pairs, challenge, solution, results, desktop image, mobile image, published date, and the outcome figures as discrete fields rather than buried in HTML.
- A migration script that reads each `page.cs-*.json` and creates the corresponding metaobject entry. Dry-run gated, snapshot first, per the standing rules.
- **One** Hydrogen route that renders any case study from its metaobject.

Why this shape and not a faster one: the stats are the asset. As discrete fields they can feed `caseStudySchema()` with real `datePublished` and quantified outcomes, be surfaced on `/work`, and be reused in proposals. Buried in a React component they are frozen decoration, and the nineteenth case study becomes another dev ticket rather than a form someone fills in.

Include in your proposal: the metaobject field list with types, how images move (theme assets → Software Files), and what the Hydrogen route needs.

## CONSTRAINTS

- Read-only in Phase A. No writes, no theme edits, no page edits.
- Never modify any theme file. The Liquid theme is the source of truth until the port is verified; treat it as an archive.
- Do not publish or unpublish anything.
- Extract text verbatim. Do not rewrite, summarise, or "improve" the copy — it is client-approved work.
- If a template references an asset that no longer exists in the theme, record it as missing rather than substituting.

## WHAT THIS PAUSES

Do not proceed with the 0.5 triage for `/pages/cs-*`, the four AI-visibility pages, `/pages/reviews`, `/pages/testimonials`, or `/pages/getting-started`. Those are recovery candidates, not cleanup candidates.

The 301 and unpublish work for the genuinely superseded legacy service pages still stands — but check each against the inventory first. A page whose template holds unique copy is a recovery candidate too.


---


# Prompt 6 — Scopes, live 404 fix, all-theme recovery

**Status:** Complete — inventory delivered

# Agent Prompt 6 — Scopes, the live 404 fix, and full content recovery

Single paste-ready prompt. Supersedes Prompt 5.

---

## CONTEXT

byteoperator.com is a Software Hydrogen storefront on Oxygen, store `byteoperator.mysoftware.com`.

74 of 128 Software pages render empty — header and footer only, `<main>` empty. The cause is now known: **they are orphaned by the Liquid → Hydrogen migration.** Their content lives in JSON templates inside the Liquid themes. Hydrogen renders the Software page `body` field, which is empty for these pages, and never reads the Liquid templates. So the copy exists in the store and renders nowhere.

Confirmed by reading `templates/page.cs-nevuu.json` from the MAIN theme `landingpage` (`gid://software/OnlineStoreTheme/147919143002`) — it contains a complete case study: hero, summary, four real metrics (+45%, −30%, +22%, 2.4s), challenge, solutions, results, and desktop/mobile screenshot references.

Known inventory in MAIN alone:

```
18 × templates/page.cs-*.json                   1.0–3.4 KB each
     templates/page.ai-visibility.json            48 KB
     templates/page.freeaivisibility-snapshot.json 41 KB
     templates/page.ai-visibility-audit.json      15 KB
     templates/page.reviews.json                  71 KB
     templates/page.about-us.json                 45 KB
     ~25 service page templates                  ~4.3 KB each
```

This is content previously scheduled as weeks of writing. It is a recovery job, not an authoring job.

## STEP 0 — Verify scopes, report, stop if missing

The custom app currently holds `read_content` and `write_content`. This work needs three more:

| Operation | Scope |
|---|---|
| Read Liquid theme templates | `read_themes` |
| Menu repoints (`menuUpdate`) | `write_online_store_navigation` |
| URL redirects (`urlRedirectCreate`) | `write_online_store_pages` |

Make one cheap probe call per scope (e.g. a `themes(first:1)` query for `read_themes`). Report which are present and which are missing. **If `read_themes` is missing, stop** — Step 2 is entirely theme reads. Adding scopes is done by Malik in Software admin (Configuration → Admin API integration → add → Save), and the app must be reinstalled afterwards, which issues a new token.

## STEP 1 — Fix the live 301-into-404 (ship this alone, before anything else)

`/pages/case-studies` currently 301s to `/case-studies`, which 404s — live right now, for anyone following an old link.

1. Repoint the redirect to `/work`
2. Remove the `/case-studies` entry from `route-mappings.ts`
3. Verify cache-busted: `/pages/case-studies` → 301 → `/work` → 200, no chain

This is independent of everything below. Do it, verify it, report it, then continue.

## STEP 2 — Content recovery inventory (READ-ONLY)

Sweep **all 11 themes, not just MAIN.** `page.getting-started` has no template in MAIN, so it is in one of the ten unpublished themes — and that page has 32 customers carrying a `getting-started-form` tag, meaning it was a working lead source.

For every theme, for every `templates/page.*.json` file:

1. Fetch the file body:
   ```graphql
   theme(id: $id) {
     name role
     files(filenames: ["templates/page.*"], first: 100) {
       nodes {
         filename
         body { ... on OnlineStoreThemeFileBodyText { content } }
       }
     }
   }
   ```
   Note the auto-generated comment block preceding the JSON — strip it before parsing.

2. Write `logs/liquid-content-inventory.json`, one entry per template:
   - theme name, theme id, theme role, filename
   - matching page handle (join on the Page object's `templateSuffix`) and public URL
   - every section: `type`, and all settings containing text
   - total extracted text length with HTML stripped
   - every asset filename referenced (`*_asset_name` and image settings)
   - `duplicate_of`: if the same template name exists in multiple themes, which theme holds the largest/most recent version

3. Cross-reference against the 74 empty pages and report four counts:
   - empty pages **with** recoverable content, and from which theme
   - empty pages **without** any recoverable content
   - templates with no matching page
   - templates that differ meaningfully between themes (so we recover the right version)

4. Flag specifically: `getting-started`, `reviews`, `testimonials`, the four AI-visibility pages, and all 18 `cs-*`.

**Report and stop. Write nothing.**

## STEP 3 — Propose the port architecture (design only, no implementation)

Do **not** hardcode 18 case studies into React components. Propose a data-driven port and show the design before writing any of it.

Starting point — a `case_study` **metaobject definition**:

- client name, slug, summary
- four stat pairs as **discrete fields** (label + value), not HTML
- challenge, solution, results
- desktop image, mobile image
- published date, services delivered, industry

Plus:
- a migration script reading each `page.cs-*.json` into a metaobject entry — dry-run gated, snapshot first, per the standing rules
- **one** Hydrogen route that renders any case study from its metaobject
- how theme assets (`portfolio-nevuu-desktop.png` etc.) move to Software Files, and what breaks if they don't

Why this shape rather than the faster one: the stats are the asset. As discrete fields they feed `caseStudySchema()` with real quantified outcomes, surface on `/work`, and get reused in proposals. Buried in JSX they are frozen decoration, and case study nineteen becomes another dev ticket instead of a form someone fills in.

Include in the proposal: full field list with types, the migration approach, the Hydrogen route shape, and what you'd do for the AI-visibility funnel and `reviews` — those are larger templates and may warrant a different structure than the case studies.

## CONSTRAINTS

- Step 2 is strictly read-only. No writes, no theme edits, no page edits.
- **Never modify any theme file.** The Liquid themes are the archive and the source of truth until a port is verified. Read only.
- Do not publish, unpublish, or delete anything.
- Extract text verbatim. Do not rewrite, summarise, shorten or "improve" copy — it is client-approved work.
- If a template references an asset that no longer exists, record it as missing rather than substituting one.
- Do not proceed to the B1 301s or B2 unpublishes. Those are gated on this inventory — a page whose template holds unique copy is a recovery candidate, not a cleanup candidate.

## STANDING RULES (apply to every step)

1. Dry run before write. Anything touching live content shows its plan first.
2. Snapshot before mutate — full records to `logs/`, never just hashes.
3. Cache-bust every verification request. The edge cache will show a stale copy and make a good change look broken, or a bad one look fine.
4. Verify from raw HTML, not the rendered DOM. AI crawlers largely do not execute JavaScript.
5. Verify API shapes against the schema, never from memory. `pageByHandle` and `Page.seo` don't exist in 2026-07; GraphQL uses `body` where REST uses `body_html`.
6. Never fabricate. No invented metrics, dates, addresses or review content. An omitted field beats a false one.
7. Stop on abort. Don't re-run past a failure — look first.

## DELIVERABLES

1. Scope probe results
2. Step 1 verification — the 301 chain resolving to `/work` with a 200
3. `logs/liquid-content-inventory.json` plus the four cross-reference counts
4. The metaobject design proposal

Then stop.


---
