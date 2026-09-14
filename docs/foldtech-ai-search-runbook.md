# The Fold Tech — AI Search Visibility Runbook

**Version** 1.0 · **Date** 12 September 2026 · **Site** thefoldtech.com (Shopify Hydrogen / Oxygen)
**Wedge** Shopify SEO / GEO / AI Visibility · **Markets** US + UK

Every phase below is either a paste-ready prompt for Claude Code, a manual sequence for Malik, or a content task for Claude in chat. The owner column says which. Work top to bottom — phases are ordered by dependency, not by appeal.

## Where status lives

**Status is not in this file.** It lives in the Programme Tracker artifact, republished after every step.
This file holds procedure, decisions and reference data — so the two can never contradict each other.

If you need the current state of any phase, open the tracker. If you need to know *how* a step is done, it's below.

---|---|---|---|
| 0.1 | Restore 404'd articles | Malik | Done — Done — 79/79 live |
| 0.2 | Refresh `lastmod` + `last_modified` metafield | Claude Code | Done — Done — all 79 `lastmod` read 2026-09-12, verified |
| **0.5** | **74 empty pages in the sitemap** | **Malik decides, Claude Code applies** | **New — blocks 0.3 and 1.1** |
| 0.3 | Search Console + Bing | Malik / Claude-in-Chrome | Articles sitemap now; pages sitemap after 0.5 |
| 0.4 | llms.txt as a live route | Claude Code | At risk — Built, **not deployed** — live file still the old one; must drop empty-page links first |
| 1.1 | Structured data deploy | Claude Code | Code complete on branch; **case-study schema must not ship until 0.5 resolves** |
| 1.2 | 54 missing meta descriptions | Claude (chat) → Malik | Not started |
| 1.3 | Resolve 4 cannibalisation clusters | Claude Code | Not started |
| 1.4 | Alt text — homepage + 19 case studies | Claude (chat) → Claude Code | Not started |
| 2.1 | Answer-first rewrite, top 20 articles | Claude (chat) | Not started |
| 2.2 | FAQ content + FAQPage schema | Claude (chat) → Claude Code | Not started |
| 2.3 | Case studies → evidence with figures | Malik + Claude | Not started |
| 3.1 | Align 5 directory profiles | Malik | Not started |
| 3.2 | Clutch reviews | Malik | Not started |
| 3.3 | Listicles, communities, original data | Malik + Claude | Not started |
| 4.1 | Monthly prompt-set measurement | Claude + AI Visibility product | Not started |

---

# PHASE 0 — Stop the bleeding

## 0.2 — Full apply + `last_modified` metafield

**Owner:** Claude Code · **Prerequisite:** custom app token with `read_content`, `write_content`

This is Prompt 4, already delivered. If it needs re-pasting, the short form:

```
Run the approved full apply. Extend the script first:

A. Create an ARTICLE metafield definition — namespace custom, key last_modified,
   type date_time — WITH Storefront API read access (access: { storefront:
   PUBLIC_READ } or the 2026-07 equivalent; verify against docs). Without
   storefront access the definition is created, values written, everything
   reports success, and the Storefront API returns null. If it fails on a
   missing scope, STOP and name the scope.

B. Per article: write body marker (existing two-phase logic) → read updatedAt
   back → metafieldsSet custom.last_modified = that updatedAt. Keep every guard:
   eight-field parity check, abort-on-drift, pre-apply snapshot, serial 600ms,
   scoped sitemap verification.

C. node refresh-lastmod.mjs --apply

Report attempted/succeeded/failed, aborts and the triggering field, scoped
sitemap verification, metafields written, elapsed time.
```

**Done when:** all 79 `<lastmod>` values in `https://thefoldtech.com/sitemap/articles/1.xml` read today's date, and 79 metafields are written.

## 0.5 — 74 empty pages (new, and it outranks everything else in Phase 0)

**Owner:** Malik decides, Claude Code applies · **Found:** 13 September 2026, verified from rendered HTML

Your agent found 11 empty pages while preparing the redirect work. A full sweep of the pages sitemap found **74 of 125**. Every one returns 200, sits in the sitemap, and renders nothing but header and footer — `<main>` is literally empty.

| Group | Empty | Total |
|---|---|---|
| Case studies `/pages/cs-*` | **18** | 18 |
| Legacy `/pages/*` | 54 | 65 |
| Clean URLs | 2 (`/events`, `/careers`) | 42 |

**All 18 case studies are blank.** The earlier audit called them "the most citable asset on the site" — that was wrong. It checked status codes and markup, not rendered content, and 200 with a valid `<title>` looked like a live page. They are shells.

Three consequences that change the order of work:

1. **Don't submit the pages sitemap yet.** Inviting Google to crawl 74 empty URLs is a thin-content signal across the whole domain. Submit `sitemap/articles/1.xml` now — those are real — and hold the rest until this is resolved.
2. **`caseStudySchema()` must not ship.** Marking up a blank page as a `CreativeWork` asserts something that isn't there.
3. **llms.txt must drop them.** The current draft points AI engines at the AI-visibility pages and 19 case studies. All blank.

**Decision needed per group — three options, and they're not interchangeable:**

| Option | When it's right | Effect |
|---|---|---|
| **Build** | The page is a planned funnel step on a wedge term | Best outcome, slowest |
| **Unpublish** | Abandoned, no inbound links, no plan | Removes from sitemap, URL 404s |
| **noindex + keep** | Reachable from a live menu but not ready | Stays usable, leaves the index |

**The four AI-visibility pages are a special case.** `/pages/ai-visibility`, `-audit`, `-implementation`, `-monitoring` plus `/pages/free-ai-visibility-snapshot` form a deliberate funnel — Overview → Snapshot → Implementation → Monitoring — wired into a live Shopify menu, and all five are empty. That funnel sits on your wedge term, for the service you chose to win first, and it was never built. Redirecting them breaks the menu. **Build these five.** Not this week necessarily, but they are the highest-value empty pages on the site.

The 18 case studies are the second priority: real client outcomes with figures are the most quotable asset you could publish, and right now the pages exist as titles only.

```
TASK
Audit and triage every empty page in sitemap/pages/1.xml.

1. Produce logs/empty-pages-<ts>.json: for each URL in the pages sitemap, the
   rendered visible text length (strip scripts and tags), <main> inner length,
   title, meta description, and whether any Shopify menu links to it. Classify
   as EMPTY (<3000 visible chars — that threshold is header+footer chrome only)
   or CONTENT. Cache-bust every fetch.
2. Report grouped by prefix with counts, and list every menu that links to an
   EMPTY page.
3. Do NOT change anything. I will return a decision per group: build,
   unpublish, or noindex.

Then, once I give you decisions:
4. For noindex: add <meta name="robots" content="noindex,follow"> to those pages
   only, via the page route, driven by an explicit allowlist of handles — never
   a heuristic on content length at runtime.
5. For unpublish: list the exact Shopify admin steps; do not unpublish via API
   without a second confirmation from me.
6. Never delete a page.
```

**Done when:** no empty page is in the sitemap or indexable, and the five AI-visibility pages are either built or explicitly parked.

## 0.5b — Inventory results and the reversal they force (13 Sep, revision 2)

The all-theme extraction changed the shape of this phase. Recovery is now the default and cleanup is the exception.

| Finding | Number |
|---|---|
| Templates inventoried across 11 themes | 313 (110 unique names) |
| Empty pages **with** recoverable content | **58 of 74** |
| Empty pages with nothing to recover | 14 (`/careers`, `/events`, 12 legacy) |
| Templates with no matching page | 40 unique — includes written but unused FAQ copy |
| Templates differing meaningfully between themes | 37 |

**The theme matters more than the filename.** `latest_revamp 29-01-2026 (ANZLA)` holds the full versions; MAIN holds stripped copies. `shopify-seo-services` is 2,771 chars in MAIN and **29,168 in ANZLA**. Any extraction that reads one theme reaches the wrong conclusion — which is exactly what happened on the first pass.

**Consequence for B1/B2:** 17 of the 20 pages queued for 301 hold recoverable content. The redirect list is void as written. Rebuild it only from the 14 pages with nothing to recover, after the port lands.

**Two data-integrity findings that gate publication:**

1. **The case study stats are placeholders.** All 20 carry the identical `+45% / −30% / +22% / 2.4s`, copied from `cs-preview` — the only template that also carries the labels (CONVERSION LIFT, BOUNCE RATE, ORDER VALUE, LOAD SPEED), which every real case study left blank. Porting them would publish the same four fabricated metrics as structured data for twenty named clients. **Stats port empty; real figures are entered per client.**
2. **The screenshots are shared** — 40 references to 10 unique files. Some case studies would display another client's interface. Image mapping must be verified per case study, not ported in bulk.

**What is real:** the narratives. 20 distinct summary/challenge/results across 20 case studies — client-approved writing currently invisible to every crawler. That is the asset.

## 0.3 — Search Console + Bing

**Owner:** Malik (or Claude driving Chrome) · **No prompt — browser UI work**

Run **immediately after 0.2 completes.** The fresh `lastmod` is a signal with a short shelf life; its whole job is to win the next crawl-scheduling decision.

1. **Property type** — Search Console → property dropdown. You need a **Domain** property (`thefoldtech.com`, no protocol), not just URL-prefix. If missing: Add property → Domain → add the TXT record at your registrar.
2. **Baseline export, before anything else changes** — Performance → Search results → Last 16 months → Export → Google Sheets. Twice: once on the Queries tab, once on Pages. Then Indexing → Pages → Export.
3. **Submit sitemaps** — Indexing → Sitemaps, one at a time:
   ```
   sitemap.xml
   sitemap/articles/1.xml
   sitemap/pages/1.xml
   sitemap/collections/1.xml
   sitemap/products/1.xml
   ```
   The index alone suffices for Google; submitting children individually gives per-type discovered-vs-indexed counts.
4. **Force the priority ten** — URL Inspection → Request Indexing. Daily quota is small (~10), so spend it on comparison and migration content:
   ```
   /articles/shopify-seo-in-2026/
   /articles/best-shopify-themes/
   /articles/woocommerce-to-shopify-migration/
   /articles/magento-to-shopify-migration-guide/
   /articles/wix-to-shopify-migration-step-by-step-guide-for-2026/
   /articles/shopify-vs-bigcommerce-head-to-head-comparison/
   /articles/woocommerce-vs-shopify-full-comparison/
   /articles/wordpress-vs-shopify-features-pricing-benefits/
   /articles/shopify-pricing-plans-review/
   /articles/how-to-build-a-custom-shopify-theme/
   ```
5. **Bing Webmaster Tools** — matters more than it looks; ChatGPT's search layer leans on Bing's index. Import from Google Search Console (one click, inherits verification) → submit `sitemap.xml` → URL Submission → paste all 79 from `thefoldtech-article-urls.txt`. Bing allows thousands per day; force the whole set.

**Done when:** five sitemaps read Success, the ten priority URLs report indexed, Bing has all 79 submitted.

**Checkpoints:** 48h sitemaps Success · 5–7d priority URLs indexed · 2–3w indexed count climbing toward ~210 · 3–4w `/articles/` URLs reappearing in Performance.

## 0.4 — llms.txt as a live route

**Owner:** Claude Code

Today `/llms.txt` 302s to a Shopify-hosted file generated before the rebuild. It lists dead `/blogs/news/*` URLs and none of the current money pages. Serving it from the repo makes it version-controlled and self-updating.

```
TASK
Replace the /llms.txt redirect with a Hydrogen resource route that generates the
file at request time.

1. Create app/routes/[llms.txt].tsx as a resource route (loader only, no
   component) returning Content-Type: text/plain; charset=utf-8 with a sensible
   Cache-Control (public, max-age=3600).

2. Static curated sections come from the provided llms.txt file — company
   summary, core services, search/AI services, case studies, company links. Put
   this content in app/lib/seo/llms-static.ts as typed constants. Do not
   paraphrase or "improve" the copy.

3. Append a dynamically generated "## Articles" section: query the Storefront
   API for published articles across all four blogs (news, case-studies,
   featured, top-case-studies), sorted by publishedAt descending, and emit one
   line each:
     - [Title](https://thefoldtech.com/articles/{handle}/): {excerpt, one
       sentence, max 120 chars, no trailing ellipsis}
   Where excerpt is empty, derive one sentence from body text. Never emit a link
   with an empty description.

4. Remove or override the Shopify file redirect so /llms.txt serves this route.
   Confirm the old cdn.shopify.com file is no longer reachable at that path.

VERIFY (cache-busted)
- GET /llms.txt returns 200, text/plain, not HTML
- every URL in the output resolves 200 with no redirect
- no /blogs/news/ URLs appear
- the file contains shopify-plus-agency, ai-seo-agency, geo-agency and
  agentic-commerce
- total size under 100KB

Report the URL count and any link that failed.
```

**Done when:** `/llms.txt` serves from the repo, every link resolves 200, and it includes the current service set plus all live articles.

---

# PHASE 1 — Make the entity machine-readable

## 1.1 — Structured data (in progress)

**Owner:** Claude Code · Branch exists, 21/22 assertions pass

Remaining: `dateModified` wiring (Part B of Prompt 4), preview deploy, Rich Results Test + schema.org validation, then merge.

**Done when:** 22/22 assertions pass on a deployed preview, external validators report zero errors, and the branch is merged and live.

## 1.2 — 54 missing meta descriptions

**Owner:** Claude (chat) → Malik pastes into Shopify

54 pages ship with no meta description, including the wedge pages: `/ai-seo-agency/`, `/geo-agency/`, `/ecommerce-seo-agency/`, `/shopify-cro-agency/`, `/shopify-migrations/`, `/work`, `/ai-ecommerce-agency/`.

Ask in chat: *"Write the 54 missing meta descriptions."* Claude crawls each page, reads the actual content, and returns a table of URL → description (150–160 chars, specific, no boilerplate). You paste them into Shopify.

Do not delegate this to a coding agent. Meta descriptions are copy, and several AI retrieval pipelines use them as the page's summary chunk — generic ones are worse than useful.

## 1.3 — Resolve the four cannibalisation clusters

**Owner:** Claude Code · **Decisions needed from Malik first**

Four intents have two or three live pages each, all indexable, none canonicalised:

```
SEO:        /pages/shopify-seo-services · /seo-agency · /ecommerce-seo-agency/
CRO:        /pages/conversion-rate-optimization ·
            /pages/shopify-conversion-rate-optimization · /shopify-cro-agency/
Audits:     /pages/website-audit-service · /pages/website-audit-services ·
            /services/shopify-audits/
Migration:  /pages/woocommerce-to-shopify ·
            /pages/woocommerce-to-shopify-migration ·
            /woocommerce-shopify-migrations/
```

Decide the survivor per cluster (default: the new clean-URL page), then:

```
TASK
Consolidate four cannibalisation clusters. For each, I will give you the
surviving URL and the URLs to retire.

1. Before anything, capture each retiring page's full content to
   ./logs/retired-pages-<ts>.json. Some carry copy worth merging into the
   survivor; that decision is mine, not yours — just preserve it.
2. Create 301 redirects from each retiring path to its survivor using the Admin
   API urlRedirectCreate mutation. Verify the exact mutation and input shape
   against the 2026-07 docs first.
3. Verify each redirect returns 301 (not 302, not a 200 soft-redirect) and lands
   on the survivor with no chain — cache-busted requests.
4. Check for internal links pointing at retired URLs across the repo and report
   them. Do not rewrite them without showing me the list.
5. Confirm the retired URLs disappear from sitemap/pages/1.xml after Shopify
   regenerates.

DO NOT delete any page. Redirect only — a deleted page loses its content and its
link equity. Do not touch the survivor's content.
```

**Done when:** each cluster has one indexable URL, retiring URLs 301 cleanly, sitemap reflects it.

## 1.4 — Alt text

**Owner:** Claude (chat) writes, Claude Code applies

90 of 152 homepage images have no alt text, and the 19 case studies lean on screenshots that are invisible to text retrieval.

Step one, in chat: *"Write alt text for the homepage and case study images."* Claude inspects the images and returns URL → alt text. Describe the outcome, not the file: *"Nevuu product page after redesign, showing the new bundle selector"* — not *"screenshot"*.

Step two, to Claude Code: apply the provided mapping to the relevant components and page data. No invented alt text; if an image isn't in the mapping, leave it and report it.

---

# PHASE 2 — Build citable content

## 2.1 — Answer-first rewrite, top 20 articles

**Owner:** Claude (chat)

The 79 articles are live but written as blog posts, not as citable sources. The structure that gets lifted into AI answers: **the question as the H2, a direct two-sentence answer immediately under it, then the detail.**

Priority set — comparisons and migrations first, since those match buying-intent prompts:

```
shopify-seo-in-2026 · best-shopify-themes · woocommerce-to-shopify-migration
magento-to-shopify-migration-guide · wix-to-shopify-migration-step-by-step-guide-for-2026
shopify-vs-bigcommerce-head-to-head-comparison · woocommerce-vs-shopify-full-comparison
wordpress-vs-shopify-features-pricing-benefits · magento-vs-shopify-ecommerce-comparison
shopify-pricing-plans-review · is-shopify-worth-it · how-to-build-a-custom-shopify-theme
shopify-checkout-mistakes-to-avoid · shopify-markets-vs-expansion-stores-guide
shopify-migration-without-coding-knowledge · best-omnichannel-platforms
how-to-increase-customer-lifetime-value · shopify-marketing-agency-guide
does-shopify-use-stripe · shopify-theme-detector
```

Ask in chat, one article at a time: *"Rewrite [slug] answer-first."*

**Prune list** — off-topic filler that drags on quality signals: the logo posts (`atlanta-falcons-logo-design-services`, `your-trusted-construction-logo-partner`, `elevate-your-brand-identity-...-barber-logos`), local SEO posts (`miles-city-seo-services`, `boost-your-dental-practice-...`), and the generic marketing-manager series. Consolidate or unpublish once the top 20 are rewritten.

**Also:** the canary showed author `"Staff RS"`. Named humans with real bios carry materially more weight in AI attribution than a generic byline. Assign real authors across the 79.

**Unpublished article worth checking:** `how-to-cancel-and-remove-your-shopify-account-complete-step-by-step-guide` is on-topic, high-intent content sitting unpublished. If it's finished, publish it. (`the-pros-and-cons-of-law-firm-seo-services` should stay unpublished.)

## 2.2 — FAQ content, then FAQPage schema

**Owner:** Claude (chat) writes, Claude Code wires

Content first — FAQ schema whose Q&A isn't visible on the page is a policy violation, not a shortcut.

In chat: *"Write 4–6 FAQs for [service page]."* Real questions prospects ask, answered in two to four sentences, first sentence answering directly, no marketing preamble.

Then to Claude Code: render them on the page **and** emit `faqSchema(path, items)` from `schema.ts`. Every question and answer in the markup must also be in the visible DOM.

Start with the wedge pages: `/geo-agency/`, `/ai-seo-agency/`, `/ecommerce-seo-agency/`, then the four migration pages.

## 2.3 — Case studies into evidence

**Owner:** Malik supplies figures, Claude writes

19 case studies are published; none carry measured outcomes. Figures are what make a passage quotable — adjectives are not.

Per case study: named client, starting position, what was done, measured outcome with a figure and a date. Then extend `caseStudySchema()` with those outcomes.

No invented numbers. A case study with three real figures beats nineteen with none.

---

# PHASE 3 — Win the corroboration layer

**Owner:** Malik · Runs in parallel with Phase 2 · No prompts — this is relationship and profile work

Two of the four stages of AI answer assembly happen off your website. This is the half most agencies never compete on.

## 3.1 — Align the five profiles

They currently contradict each other — headcount varies by a factor of four, minimum project size by a factor of five. Push this identical fact sheet to Clutch, Techreviewer, SuperbCompanies, Land-book and the Shopify Partner Directory:

```
Legal entity     TAB ON TECH (PVT.) LTD
Brand            The Fold Tech (FoldTech)
Founded          2010 · Shopify Partner since 2016
Headcount        49
Address          1001 South Main Street, Suite 500, Kalispell, MT 59901, US
Email            info@thefoldtech.com
Phone            +1 (512) 387-6926
Website          https://thefoldtech.com
Positioning      Commerce technology company — Shopify and Shopify Plus
                 engineering, technical SEO, AI SEO / GEO, and CRO
```

**Still undecided:** rate card and minimum project size. Clutch shows $25–49/hr with a $1,000 minimum; Techreviewer shows $50–99/hr with $5,000. For US/UK Shopify Plus positioning, the Clutch figures price you as a commodity developer in exactly the market you're targeting. Pick one set, then make all five match.

## 3.2 — Clutch reviews

Your Clutch profile says "Not yet reviewed" while the Shopify directory carries 4.9 from 415. Clutch is the most-quoted source in AI answers for this category. Eight to ten verified reviews is the single highest-leverage off-site action available this quarter.

## 3.3 — Listicles, communities, original data

- Get into the third-party "best Shopify agency" listicles AI engines actually quote — most accept submissions; a few are competitor-owned and not worth pursuing.
- Earn genuine mentions in Reddit r/shopify, Shopify Community, Indie Hackers. Real answers from a named team member, not promotion.
- Publish two or three original data pieces — e.g. an AI visibility benchmark across 500 Shopify stores, run through your own AI Visibility product. Original data is the most reliably cited asset type in AI answers, and you own the tooling to produce it.

---

# PHASE 4 — Measure, then productise

**Owner:** Claude + AI Visibility product · Starts ~6 weeks after Phase 1 ships

Nothing meaningful shows for six to eight weeks after Phase 1. Judging earlier produces the wrong decision.

**Monthly, a fixed 30–50 prompt set** across ChatGPT, Perplexity, Gemini, Copilot and AI Overviews. For each: is the brand named, is it linked, is what the engine says accurate. Start with the tier-1 prompts:

```
who does generative engine optimisation for ecommerce brands
how do I get my Shopify store cited by ChatGPT
which agencies do AI visibility audits for Shopify
best agency for Magento to Shopify Plus migration
who can migrate WooCommerce to Shopify without losing SEO
Shopify Hydrogen headless development agency
Shopify B2B wholesale implementation partner
Klaviyo agency for Shopify brands
```

**In parallel:** Search Console impressions and average position for the wedge cluster; GA4 channel for referrals from `chatgpt.com`, `perplexity.ai`, `gemini.google.com`.

**The productisation step:** run this whole programme through AI Visibility rather than a spreadsheet. Every fix in this runbook is a feature the product should perform for clients. The audit becomes the sales asset; thefoldtech.com becomes the case study.

---

## Standing rules for every prompt in this runbook

1. **Dry run before write.** Any script touching live content shows its plan first.
2. **Snapshot before mutate.** Full records to `./logs/`, never just hashes.
3. **Cache-bust every verification.** The edge cache will report a stale copy and make a good deploy look broken, or a bad one look fine.
4. **Verify from raw HTML, not the DOM.** AI crawlers largely don't execute JavaScript.
5. **Verify API shapes against the docs, never from memory.** GraphQL `body` vs REST `body_html` is the example that already caught us.
6. **Never fabricate.** No invented metrics, review markup, addresses or dates. An omitted field beats a false one.
7. **Stop on abort.** Don't re-run past a failure; look first.

---

# Appendix A — Canonical fact sheet

The single set of values pushed to every profile and used in every schema block. Change it here first, then everywhere else.

```
Legal entity     TAB ON TECH (PVT.) LTD
Brand            The Fold Tech (FoldTech)
Founded          2010 · Shopify Partner since January 2016
Headcount        49
Address          1001 South Main Street, Suite 500, Kalispell, MT 59901, US
Email            info@thefoldtech.com
Phone            +1 (512) 387-6926
Website          https://thefoldtech.com
Shopify store    the-fold-tech.myshopify.com (Basic plan, USD)
Logo (512²)      cdn.shopify.com/oxygen-v2/57096/165594/338611/4441171/images/
                 favicon_the_fold_tech.png
Positioning      Commerce technology company — Shopify and Shopify Plus
                 engineering, technical SEO, AI SEO / GEO, and CRO
Service area     US, UK, CA, AU, DE, FR, IT
```

**Still undecided:** rate card and minimum project size. Clutch shows $25–49/hr with a $1,000 minimum; Techreviewer shows $50–99/hr with $5,000. The Clutch figures price the agency as a commodity developer in exactly the markets being targeted.

**Profiles carrying this data:** Shopify Partner Directory, Clutch, TechBehemoths, Techreviewer, SuperbCompanies, Land-book, LinkedIn, Instagram, Facebook. All nine appear in the schema `sameAs` array.

# Appendix B — Structured data coverage map

Source of truth: `app/lib/seo/schema.ts`. Suppression list: `app/lib/seo/empty-pages.ts`.

| Page type | Nodes emitted | Count |
|---|---|---|
| Every page | ProfessionalService + Organization (parent) + WebSite, one `@graph` | all |
| Service pages | Service + BreadcrumbList | 28 |
| Articles | Article + BreadcrumbList, `dateModified` from `custom.last_modified` | 79 |
| Case studies | CreativeWork + BreadcrumbList — **suppressed while pages are empty** | 20 |
| Pages with visible FAQs | + FAQPage | pending |

**Deliberately excluded:** `AggregateRating` and `Review`. The 4.9 from 415 reviews lives on the Shopify Partner Directory; marking up third-party reviews as first-party violates Google's review snippet policy. Cite the figure in visible copy with attribution and a link instead.

**Validation after any schema change:** Google Rich Results Test, `validator.schema.org`, Search Console → Enhancements at +48 h, and the local assertion suite (JSON parses, no duplicate `@id`, every emitted URL resolves 200).

# Appendix C — Working files

| File | Purpose | Rule |
|---|---|---|
| `foldtech-ai-search-runbook.md` | This file. Phases, decisions, status, reference data. | Update in place |
| `agent-prompts.md` | Every agent prompt in order, with outcome. | Append only |
| `seo-geo-requirements.md` | Reusable SEO/GEO standard, client-agnostic. | Update in place |
| `schema.ts` | Structured data module. | Lives in `app/lib/seo/` |
| `llms.txt` | Source content for the `/llms.txt` route. | Update in place |
| _(no URL list file)_ | The 79 article URLs are generated on demand from `sitemap/articles/1.xml` at the moment of submission — a stored copy only goes stale. |  |
| Tracker artifact | Status only, no procedure. | Republished after each step |

No new files unless a genuinely new artefact is needed.

## Version history

| Version | Date | Change |
|---|---|---|
| 1.0 | 12 Sep 2026 | Initial runbook — phases 0 to 4, status board, standing rules |
| 1.2 | 13 Sep 2026 | Added phase 0.5b (all-theme inventory, recovery-first reversal, placeholder-stat and shared-image gates). Folded the schema implementation guide in as Appendices A–C. Working-file set consolidated to six. |
| 1.2 | 13 Sep 2026 | Status board removed — status now lives only in the tracker artifact. Schema implementation guide folded in as Appendices A-C. Working files consolidated from 12 to 6. |
| 1.1 | 13 Sep 2026 | 0.2 verified complete (79/79 lastmod 2026-09-12). Added phase 0.5 — 74 empty pages found in a full sweep, including all 18 case studies. Corrected the earlier claim that case studies were a citable asset. Resequenced 0.3 (articles sitemap only for now) and gated case-study schema and llms.txt on 0.5. |