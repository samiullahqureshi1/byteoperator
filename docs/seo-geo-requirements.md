# The Complete SEO & GEO Requirements Standard

**Version** 1.0 · **Date** 13 September 2026 · **Owner** Byte Operator
**Applies to** byteoperator.com and, as a reusable standard, every client site Byte Operator delivers

---

## Purpose

One document covering everything required for a site to rank in traditional search engines **and** be cited by AI answer engines. Nothing is assumed known. Every item is either a specification with a number, a configuration step, or a decision rule.

This is written to be reused. What follows is a standard, not a task list for one site — the "Status on byteoperator.com" notes are current as of 13 September 2026 and will go stale; the requirements will not.

## Scope

| In scope | Out of scope |
|---|---|
| Technical SEO, on-page, structured data, GEO/AI visibility, off-site, analytics configuration, governance | Paid search, paid social, email marketing |
| Google, Bing, and AI answer engines (ChatGPT, Perplexity, Gemini, Copilot, Claude, AI Overviews) | Regional engines (Yandex, Baidu, Naver) — see §12 if expanding |
| Software, Enterprise Platform Solutions, Hydrogen, and platform-agnostic principles | Non-commerce CMS specifics |

## How to read the status markers

```
[DONE]  Done and verified on byteoperator.com
[AT RISK]  Partially done or at risk
[MISSING]  Not done
[N/A] Not applicable to this site
```

---

# 1. Foundations — domain, protocol, infrastructure

Everything else is worthless if a crawler cannot reach a stable, single, fast version of each page.

## 1.1 Domain and protocol

- [ ] **HTTPS on every URL.** No mixed content — a single `http://` asset on an HTTPS page breaks the padlock and can block resources.
- [ ] **One canonical host.** Pick `https://example.com` or `https://www.example.com` and 301 the other permanently. Never serve both with 200.
- [ ] **All four host/protocol variants resolve to one.** Test: `http://`, `https://`, `http://www.`, `https://www.` — every one must 301 to the canonical host in a **single hop**.
- [ ] **HSTS header** (`Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`) once you're certain HTTPS is permanent.
- [ ] **Trailing slash consistency.** Choose with or without, apply everywhere, 301 the other form. Inconsistency creates duplicate URLs and breaks structured-data `@id` matching.
- [ ] **Lowercase URLs only.** Servers treat `/Page` and `/page` as different; search engines mostly do too.
- [ ] **IPv6 and HTTP/2 or HTTP/3** enabled at the CDN.

> **Status on byteoperator.com:** [AT RISK] Trailing slashes are inconsistent — `/geo-agency/` has one, `/software-plus-agency` does not. Not fatal, but it complicates canonical and `@id` handling and should be normalised once, with 301s.

## 1.2 Crawlability

- [ ] **`robots.txt` at the root**, returning 200 with `Content-Type: text/plain`.
- [ ] Blocks only what must be blocked: admin, cart, checkout, account, internal search results with parameters.
- [ ] **Never blocks CSS or JS.** Google renders pages; blocked assets produce a broken render and a worse assessment.
- [ ] **`Sitemap:` directive** pointing to the sitemap index.
- [ ] **AI crawler directives explicitly decided** — see §6.2. Silence is a decision too, and usually the right one.
- [ ] **No `noindex` in robots.txt.** It is unsupported and ignored; use the meta tag.
- [ ] Crawl-delay only for aggressive third-party bots, never for Googlebot or Bingbot.

## 1.3 XML sitemaps

- [ ] **Sitemap index** at `/sitemap.xml` referencing child sitemaps by type (pages, products, collections, articles).
- [ ] **Only indexable, canonical, 200-returning URLs.** No 404s, no redirects, no `noindex` pages, no non-canonical duplicates.
- [ ] **Accurate `<lastmod>`,** reflecting real content change. A sitemap where everything says "today" is ignored; one where nothing updates gives no recrawl signal.
- [ ] Under 50,000 URLs and 50 MB uncompressed per file.
- [ ] Submitted in Google Search Console **and** Bing Webmaster Tools.
- [ ] **Image sitemap** entries or a separate image sitemap where images matter commercially.
- [ ] Video sitemap if hosting video.
- [ ] News sitemap only if Google News approved.

> **Status:** [DONE] Articles sitemap clean — all 79 URLs 200, `lastmod` refreshed 12 Sep 2026. [MISSING] Pages sitemap still contains 74 empty pages; hold submission until resolved. [MISSING] Neither submitted to GSC or Bing yet.

## 1.4 Status codes and redirects

| Code | Use for |
|---|---|
| 200 | Live content |
| 301 | Permanent move — passes ranking signals |
| 302 | Genuinely temporary only; does not consolidate signals |
| 404 | Gone, no replacement, no equity to preserve |
| 410 | Gone permanently and deliberately — drops from index faster than 404 |
| 451 | Legally restricted content |

- [ ] **No redirect chains.** A → B → C must become A → C. Every hop loses a little and adds latency.
- [ ] **No redirect loops.** Obvious, and they still happen.
- [ ] **No redirects into 404s.** A 301 whose destination 404s is worse than no redirect.
- [ ] **No mass redirects to the homepage.** Google treats them as soft 404s and discounts them.
- [ ] **Soft 404 check:** a page that says "not found" while returning 200 is a soft 404. Return a real 404.
- [ ] Redirect map maintained as a file in version control, not only in a platform admin UI.

> **Status:** [AT RISK] `/pages/case-studies` 301s to `/case-studies`, which 404s. Live now. Fix ships separately.

## 1.5 Rendering

- [ ] **Content must exist in the server-rendered HTML.** Googlebot renders JavaScript; most AI crawlers do not. Anything injected after hydration is invisible to a large share of the audience you're optimising for.
- [ ] Verify by fetching the raw HTML (`curl`, or "View source" — **not** the browser inspector, which shows the rendered DOM).
- [ ] Structured data, canonical, meta tags, headings and body copy all in the initial HTML response.
- [ ] Lazy-loaded content below the fold is fine; lazy-loaded *primary* content is not.
- [ ] If using a CDN or edge cache, **cache-bust every verification request** — a stale copy makes a good deploy look broken and a bad one look fine.

> **Status:** [DONE] Server-rendered, verified across homepage, About and three service pages.

## 1.6 Performance — Core Web Vitals

Thresholds are measured at the 75th percentile of real users (CrUX), not lab scores.

| Metric | Good | Needs work | Poor |
|---|---|---|---|
| **LCP** — Largest Contentful Paint | ≤ 2.5 s | 2.5–4.0 s | > 4.0 s |
| **INP** — Interaction to Next Paint | ≤ 200 ms | 200–500 ms | > 500 ms |
| **CLS** — Cumulative Layout Shift | ≤ 0.1 | 0.1–0.25 | > 0.25 |
| **TTFB** — supporting metric | ≤ 800 ms | — | — |

Practical requirements:

- [ ] LCP element identified per template and explicitly preloaded (`<link rel="preload">`), never lazy-loaded.
- [ ] `fetchpriority="high"` on the LCP image.
- [ ] Images in AVIF or WebP with correct `width`/`height` attributes to reserve space (prevents CLS).
- [ ] `loading="lazy"` on below-fold images only.
- [ ] Fonts: `font-display: swap`, preloaded, subset, self-hosted or from a fast CDN; limit families and weights.
- [ ] `preconnect` to required third-party origins; remove ones you don't need.
- [ ] JavaScript budget enforced — audit third-party scripts quarterly; each one is a tax on INP.
- [ ] No layout shift from banners, consent dialogs, or late-loading ads.
- [ ] Server response cached at the edge with sensible `Cache-Control`.

## 1.7 Mobile

- [ ] **Mobile-first indexing:** Google indexes the mobile rendering. Mobile content must equal desktop content — no hidden sections, no truncated copy.
- [ ] Responsive, single URL, no separate `m.` domain.
- [ ] Viewport meta tag present.
- [ ] Tap targets ≥ 48 px, no horizontal scroll at 360 px width.
- [ ] Structured data identical on both renderings.

## 1.8 Internationalisation (when applicable)

- [ ] `hreflang` annotations on every localised URL, including a self-reference and an `x-default`.
- [ ] Bidirectional — if A points to B, B must point to A, or both are ignored.
- [ ] Correct codes: language (ISO 639-1) optionally plus region (ISO 3166-1 alpha-2), e.g. `en-GB`, `en-US`, `de-DE`.
- [ ] One URL strategy: subfolders (`/uk/`), subdomains, or ccTLDs. Subfolders are usually strongest.
- [ ] Currency and language switchers must not rely on IP redirection alone — crawlers all appear to come from one place.
- [ ] In Software: Markets configured, with domains or subfolders per market.

---

# 2. On-page requirements — every page, every time

## 2.1 Title tag

- [ ] **Unique on every URL.** Duplicates are one of the highest-frequency, lowest-effort problems to fix.
- [ ] **50–60 characters** (roughly 580 px). Longer gets truncated; front-load the important words.
- [ ] Primary term first, brand last: `Enterprise Software Agency | Byte Operator`.
- [ ] Reads as a promise, not a keyword list. `Technical SEO & Search Architecture Services — Agency for Ecommerce Growth` beats `Technical SEO & Search Architecture, SEO Software, Technical SEO & Search Architecture Agency`.
- [ ] One `<title>` per page, in `<head>`, server-rendered.
- [ ] Templates for scaled pages, hand-written for money pages.

## 2.2 Meta description

- [ ] **Unique on every URL.**
- [ ] **140–160 characters.**
- [ ] Describes what the page delivers and includes a reason to click.
- [ ] Contains the primary term naturally — bolded in SERPs when it matches the query.
- [ ] **Matters more than it used to:** several AI retrieval pipelines use the meta description as the page's summary chunk. A blank one forfeits the cheapest possible signal.
- [ ] Never duplicated from the first sentence of the page.

> **Status:** [MISSING] 54 pages have no meta description, including `/ai-seo-agency/`, `/geo-agency/`, `/ecommerce-seo-agency/`, `/software-cro-agency/`, `/software-migrations/`, `/work`.

## 2.3 Headings

- [ ] **Exactly one `<h1>` per page**, describing the page's subject, not the brand.
- [ ] Logical hierarchy: H1 → H2 → H3, no skipped levels.
- [ ] Headings describe content beneath them; never used purely for visual size.
- [ ] **For AI extraction: phrase H2s as the questions people actually ask.** A heading that matches a prompt, with a direct answer beneath it, is the single most liftable unit of content on a page.

## 2.4 URL structure

- [ ] Short, readable, lowercase, hyphen-separated.
- [ ] Contains the primary term; no dates, no IDs, no stop-word padding.
- [ ] Stable — changing a URL costs you the redirect and some equity every time.
- [ ] No session IDs, no tracking parameters in canonical URLs.
- [ ] Logical hierarchy that matches breadcrumbs.

## 2.5 Canonical tags

- [ ] **Self-referencing canonical on every indexable page.**
- [ ] **Absolute URLs**, including protocol and host. Relative canonicals are legal but fragile.
- [ ] Exactly one `<link rel="canonical">` per page, in `<head>`.
- [ ] Canonical must point to a 200-returning, indexable URL — never to a redirect, a 404, or a `noindex` page.
- [ ] Parameterised and filtered URLs canonicalise to the clean version.
- [ ] Paginated pages self-canonicalise (do **not** canonicalise page 2 to page 1).
- [ ] Cross-domain canonical only for syndicated content you don't want ranking twice.

> **Status:** [AT RISK] Canonicals are emitted as relative paths. Legal, but should be absolute.

## 2.6 Meta robots and X-Robots-Tag

- [ ] Default: no meta robots tag, or `index,follow`.
- [ ] `noindex,follow` for thin, duplicate, or unready pages — **and remove it once they're ready.**
- [ ] **`max-snippet:-1, max-image-preview:large, max-video-preview:-1`** — sitewide, unless there's a reason not to. This is directly relevant to AI: `max-snippet` governs how much of your page can be used in a snippet or AI Overview. Restricting it reduces your visibility in generated answers.
- [ ] `data-nosnippet` attribute on specific elements you don't want quoted (prices that change, internal notes).
- [ ] `X-Robots-Tag` HTTP header for non-HTML files (PDFs, images) that need directives.
- [ ] Never combine `noindex` with a `robots.txt` disallow — if crawlers can't fetch the page, they can't see the `noindex`.

## 2.7 Open Graph and social cards

Not a ranking factor, but it governs how every shared link renders — and AI engines and social platforms both read it.

- [ ] `og:title` — can differ from the title tag; usually more human.
- [ ] `og:description`
- [ ] `og:image` — **1200 × 630 px**, absolute URL, under 8 MB, and it must be publicly fetchable.
- [ ] `og:image:alt`, `og:image:width`, `og:image:height`
- [ ] `og:url` — the canonical URL
- [ ] `og:type` — `website`, `article`, `product`
- [ ] `og:site_name`, `og:locale`
- [ ] `article:published_time`, `article:modified_time`, `article:author` on articles
- [ ] `twitter:card` = `summary_large_image`
- [ ] `twitter:title`, `twitter:description`, `twitter:image`, `twitter:site`, `twitter:creator`
- [ ] Verify with each platform's own debugger — they cache aggressively.

## 2.8 Icons and app metadata

- [ ] `favicon.ico` at root plus SVG and PNG variants
- [ ] `apple-touch-icon` 180 × 180
- [ ] `site.webmanifest` with name, icons, `theme-color`
- [ ] `<meta name="theme-color">`
- [ ] Google requires a crawlable favicon for it to appear in mobile SERPs — check it isn't blocked.

## 2.9 Images

- [ ] **Descriptive `alt` on every meaningful image.** Describe the content and its purpose, not the file. `"Nevuu product page after redesign, showing the new bundle selector"` — not `"screenshot"` or `"image1"`.
- [ ] Decorative images get `alt=""` — empty, not missing.
- [ ] Descriptive filenames: `software-plus-migration-dashboard.webp`, not `IMG_4821.png`.
- [ ] Explicit `width` and `height`.
- [ ] Modern formats (AVIF/WebP) with fallbacks.
- [ ] Responsive `srcset` and `sizes`.
- [ ] Compressed — no 4 MB hero images.
- [ ] Captions where they add meaning; captions are read as content.
- [ ] Images in the sitemap if image search matters.

> **Status:** [MISSING] 90 of 152 homepage images have no alt text.

## 2.10 Internal linking

- [ ] Every indexable page reachable within **3 clicks** of the homepage.
- [ ] **No orphan pages** — pages with zero internal links in.
- [ ] Descriptive anchor text — never "click here", never the bare URL.
- [ ] Contextual links in body copy, not only in nav and footer.
- [ ] Money pages receive the most internal links; links flow from high-authority pages to conversion pages.
- [ ] Breadcrumbs on every page below the homepage, with matching `BreadcrumbList` markup.
- [ ] Related content blocks on articles, pointing to service pages where genuinely relevant.
- [ ] No links to redirects or 404s — audit quarterly.
- [ ] `rel="nofollow"` or `sponsored` / `ugc` where required.

## 2.11 Content quality

- [ ] **One intent per page.** Two pages targeting the same intent split signals and often both lose — see §2.12.
- [ ] **Answer-first structure:** question as H2, direct two-sentence answer immediately beneath, then detail. This is the format that gets lifted into AI answers.
- [ ] Depth appropriate to intent — not word count for its own sake. Commercial pages: 800–1,500 words. Comparison and guide content: 1,500–3,000. Whatever it takes to be the complete answer, nothing more.
- [ ] **E-E-A-T signals:** named human author with a real bio and credentials, a visible publish date, a genuine `dateModified`, cited sources, first-hand evidence.
- [ ] Original data, screenshots, and specifics. Generic advice is what every competitor already has.
- [ ] Tables and lists for comparable facts — they are disproportionately extractable.
- [ ] Table of contents with jump links on long pages.
- [ ] FAQ block on commercial pages, with 4–6 real questions.
- [ ] No AI-written filler published at volume. Twenty genuinely good pieces beat two hundred adequate ones, and the gap widens as detection improves.

## 2.12 Keyword and entity mapping

- [ ] A **keyword-to-URL map** maintained as a living document: primary term, secondary terms, intent, target URL, current position.
- [ ] One primary term per URL, no two URLs sharing one.
- [ ] Cannibalisation audit quarterly: search `site:domain.com "term"` and check which URL Google actually returns. If it's the wrong one, consolidate.
- [ ] Consolidation method: pick the survivor, merge the best copy into it, 301 the losers. Never delete.
- [ ] Entity coverage, not just keywords — the topics, people, products and concepts a subject-matter authority would cover.

---

# 3. Structured data (schema.org)

Structured data is how a site states machine-readable facts about itself. For AI search it is disproportionately important: it's the difference between an engine inferring what you are and being told.

## 3.1 Implementation rules

- [ ] **JSON-LD only.** Not microdata, not RDFa.
- [ ] In the **server-rendered HTML**, inside `<head>` or `<body>` — not injected after hydration.
- [ ] One `@graph` per page linking nodes by `@id` rather than repeating them.
- [ ] Stable, absolute `@id` values (`https://example.com/#organization`) so the same entity is recognised across pages.
- [ ] Every `url` and `@id` must resolve to a 200.
- [ ] Markup must match what's visible on the page. Invisible markup is a manual-action risk.
- [ ] Single source of truth in code — one module, not copy-pasted blocks.

## 3.2 Required types

| Type | Where | Purpose |
|---|---|---|
| `Organization` / `ProfessionalService` / `LocalBusiness` | Sitewide | Who you are; carries `sameAs`, address, contact |
| `WebSite` + `SearchAction` | Sitewide | Site entity and internal search |
| `WebPage` | Per page | The page as an entity |
| `BreadcrumbList` | Every page below home | Hierarchy |
| `Service` | Service pages | What you sell, per capability |
| `Article` / `BlogPosting` | Editorial | Author, dates, publisher |
| `FAQPage` | Pages with visible Q&A | Extractable answers |
| `Person` | Author and team pages | Expert attribution |
| `Product` + `Offer` + `AggregateRating` | Ecommerce products | Price, availability, reviews |
| `CollectionPage` / `ItemList` | Category pages | Listings |
| `Review` / `AggregateRating` | Only for first-party reviews on the page | Social proof |
| `Event` | Webinars, conferences | Dates and registration |
| `VideoObject` | Pages with video | Video rich results |
| `JobPosting` | Careers | Job listings |
| `HowTo` | Instructional content | Step extraction |
| `Dataset` | Published research | Highly citable in AI answers |
| `SoftwareApplication` | Apps and SaaS | Product entity |

## 3.3 The `sameAs` array — underrated and decisive

`sameAs` links your website to your third-party profiles. This is how an engine confirms you're a real organisation and not a page claiming to be one.

Include every profile you actually maintain: LinkedIn, the platform partner directory, review platforms (Clutch, G2, Trustpilot), Crunchbase, GitHub, YouTube, X, Instagram, Facebook, Wikidata and Wikipedia where they legitimately exist.

- [ ] Every URL live and populated. A `sameAs` pointing at an empty profile weakens the entity rather than strengthening it — **fix the profile first.**
- [ ] Name, description and address identical across every listed profile. Contradictions are the fastest way to lower an engine's confidence in all of them.

## 3.4 Policy limits

- [ ] **Never mark up reviews collected on another platform as first-party `AggregateRating`.** It violates Google's review snippet policy and risks a manual action. Cite them in visible copy with attribution and a link instead.
- [ ] FAQ markup requires the Q&A to be visible on the page.
- [ ] No markup for content that isn't on the page.
- [ ] No invented ratings, prices, dates or authors.

## 3.5 Validation

- [ ] Google Rich Results Test — per template, on a live URL
- [ ] `validator.schema.org` — structural validity
- [ ] Search Console → Enhancements, 48 h after deploy, to confirm items are *picked up*, not merely parsed
- [ ] Automated assertion in CI: JSON parses, no duplicate `@id`, every URL resolves 200

> **Status:** [MISSING] Zero `application/ld+json` live across all 128 pages. Code complete on a branch, not deployed.

---

# 4. Analytics, verification and third-party configuration

## 4.1 Google Search Console

- [ ] **Domain property** (DNS TXT verified), not just URL-prefix — it covers every subdomain and protocol.
- [ ] Sitemaps submitted: index plus each child sitemap individually, for per-type discovered/indexed counts.
- [ ] **Export 16 months of Performance data before any major change.** It rolls off, and it's the only record of what you had.
- [ ] Indexing → Pages reviewed monthly: crawled-not-indexed, discovered-not-indexed, soft 404, duplicate-without-canonical, excluded-by-noindex.
- [ ] URL Inspection used for priority pages after significant changes.
- [ ] Enhancements monitored for structured-data errors.
- [ ] Core Web Vitals report monitored.
- [ ] Manual Actions and Security Issues checked — should be empty.
- [ ] Links report reviewed quarterly.
- [ ] Users and permissions set for the team, not one personal account.
- [ ] Change of address configured if migrating domains.

## 4.2 Bing Webmaster Tools

More important than its market share suggests: **ChatGPT's search layer leans on Bing's index.** Being absent there is a direct AI-visibility cost.

- [ ] Verified — "Import from Google Search Console" inherits verification in one click.
- [ ] Sitemap submitted.
- [ ] **URL Submission** used in bulk — Bing accepts thousands of URLs per day, unlike Google's ~10.
- [ ] **IndexNow** configured: a key file at the root and a ping on publish or update. Instant notification to Bing and other participating engines.
- [ ] Site Explorer and Crawl Information reviewed monthly.

## 4.3 Google Analytics 4

- [ ] Property created with the correct time zone and currency.
- [ ] Web data stream with Enhanced Measurement configured deliberately, not left at defaults.
- [ ] **Key events (conversions) defined:** form submissions, quote requests, calls, bookings, purchases.
- [ ] Cross-domain measurement if you own multiple domains.
- [ ] Internal traffic filtered by IP.
- [ ] Unwanted referrals excluded (payment gateways).
- [ ] **Custom channel group for AI referrals** — traffic from `chatgpt.com`, `perplexity.ai`, `gemini.google.com`, `copilot.microsoft.com`, `claude.ai` lands in Referral by default and gets lost. Create a dedicated channel; it is your only direct measure of AI-driven traffic.
- [ ] UTM convention documented and enforced.
- [ ] Google Signals and data retention set per your privacy policy.
- [ ] GSC linked to GA4.
- [ ] Consent Mode v2 implemented if serving the EU/UK.
- [ ] Looker Studio dashboard combining GSC + GA4 for reporting.

## 4.4 Tag management and consent

- [ ] GTM container, with a documented naming convention.
- [ ] Server-side tagging considered for accuracy and performance.
- [ ] Consent management platform: GDPR (EU/UK), CCPA/CPRA (California), plus local equivalents.
- [ ] Cookie banner must not cause layout shift or block the LCP element.
- [ ] Privacy policy, cookie policy and terms published and linked in the footer.

## 4.5 Business and profile configuration

- [ ] **Google Business Profile** if you have a genuine physical location or service area — categories, hours, photos, posts, Q&A, and review responses.
- [ ] Bing Places.
- [ ] Apple Business Connect.
- [ ] **NAP consistency** (Name, Address, Phone) — byte-identical everywhere.
- [ ] Industry directories and review platforms claimed and completed.
- [ ] LinkedIn company page complete with the website link.
- [ ] Wikidata entry if the organisation meets notability criteria.

## 4.6 Monitoring and tooling

- [ ] **Rank tracking** — Ahrefs, Semrush, or similar; separate desktop and mobile, target-market locale.
- [ ] **Site crawler** — Screaming Frog or Sitebulb, run monthly, results diffed against the previous run.
- [ ] **Log file analysis** quarterly: what crawlers actually fetch, how often, and what they waste budget on.
- [ ] **Uptime and status monitoring** with alerting.
- [ ] **Core Web Vitals field data** via CrUX and PageSpeed Insights; Lighthouse CI in the deploy pipeline.
- [ ] **Broken link checking** monthly.
- [ ] **AI visibility tracking** — a fixed prompt set run monthly across engines (§6.8).
- [ ] **Brand mention monitoring** — Google Alerts at minimum; a proper tool if budget allows.

---

# 5. Platform specifics — Software, Enterprise Platform Solutions, Hydrogen

## 5.1 Software (Liquid)

- [ ] `robots.txt.liquid` customised where the defaults don't fit — Software allows overrides.
- [ ] Product, collection and page SEO fields (title, description) filled deliberately, never left to auto-generate.
- [ ] **Duplicate product URLs:** `/collections/x/products/y` and `/products/y` both resolve. Ensure canonical points to `/products/y`.
- [ ] Tag-filtered collection URLs canonicalised or noindexed — they generate near-infinite duplicates.
- [ ] Sort and filter parameters excluded from indexation.
- [ ] `/search` pages noindexed.
- [ ] URL redirects managed in Online Store → Navigation → URL Redirects, and exported to version control.
- [ ] Metafields used for structured content rather than HTML dumped into a body field.
- [ ] Apps audited for script bloat — each adds JavaScript to every page.
- [ ] Theme JSON templates are **not** rendered by a headless storefront; see §5.3.

## 5.2 Enterprise Platform Solutions

- [ ] `checkout.liquid` or Checkout Extensibility configured; analytics fire on checkout steps.
- [ ] Markets configured for international, with correct domains and hreflang.
- [ ] B2B catalogues kept out of the public index where appropriate.
- [ ] Scripts and Functions audited for performance impact.

## 5.3 Hydrogen / Oxygen (headless)

- [ ] SEO is the developer's responsibility — nothing is automatic. Title, description, canonical, OG, and structured data are all route-level code.
- [ ] Sitemap generated by the app, not inherited from the Liquid theme.
- [ ] `robots.txt` served from a route.
- [ ] `llms.txt` served from a route rather than a static uploaded file, so it can never go stale.
- [ ] **Migration trap:** content stored in Liquid JSON templates is *not* read by Hydrogen. A route can 200 with a valid title while rendering an empty `<main>`. Audit rendered text length, not status codes.
- [ ] Oxygen edge cache means every verification must be cache-busted.
- [ ] Redirects live in two places — Software URL Redirects and the app's route mappings. Keep them reconciled.

> **Status:** This is exactly how 74 pages ended up empty on byteoperator.com — routes ported, content left behind in Liquid templates.

---

# 6. GEO — Generative Engine Optimisation

Ranking in AI answers is a different problem from ranking in blue links, and most of it is not on your website.

## 6.1 How an AI answer gets assembled

| Stage | What the engine does | What wins it |
|---|---|---|
| **Retrieval** | Pulls candidates from its index and live search | Being indexed, fast, crawlable, and matching the phrasing of the prompt |
| **Entity resolution** | Decides what kind of thing you are and whether you're real | Structured data, consistent NAP, third-party profiles that agree |
| **Corroboration** | Checks whether independent sources say the same thing | Directories, review platforms, third-party listicles, forums, press |
| **Extraction** | Lifts a quotable passage to build the answer | Direct-answer prose, FAQ blocks, named outcomes with figures |

**Two of the four stages happen off your website.** This is why a technically perfect site can still never get named, and why on-site work alone plateaus.

## 6.2 AI crawler access — decide explicitly

| User-agent | Operator | Purpose |
|---|---|---|
| `GPTBot` | OpenAI | Training |
| `OAI-SearchBot` | OpenAI | Search index for ChatGPT |
| `ChatGPT-User` | OpenAI | Live user-triggered fetch |
| `ClaudeBot` | Anthropic | Training |
| `Claude-User`, `Claude-SearchBot` | Anthropic | User-triggered fetch and search |
| `PerplexityBot`, `Perplexity-User` | Perplexity | Index and live fetch |
| `Google-Extended` | Google | Gemini training — **does not affect AI Overviews** |
| `Applebot-Extended` | Apple | Apple Intelligence training |
| `Bytespider` | ByteDance | Training |
| `CCBot` | Common Crawl | Feeds many models |
| `meta-externalagent` | Meta | Training |
| `Amazonbot`, `YouBot`, `cohere-ai`, `Diffbot` | Various | Index and training |

- [ ] Decision recorded: which are allowed. **For a business that wants to be cited, allow the search and user-triggered agents.** Blocking them removes you from the answers.
- [ ] Note the separation: blocking `Google-Extended` does not remove you from AI Overviews — those follow standard Googlebot access and `max-snippet` directives.
- [ ] Verify the actual behaviour in server logs, not just the robots.txt intent.

> **Status:** [DONE] No AI crawler is blocked on byteoperator.com.

## 6.3 llms.txt

A plain-text file at `/llms.txt` describing the site for language models: what the organisation is, its key URLs with one-line descriptions, structured in Markdown.

- [ ] Served at the root, `text/plain`, 200.
- [ ] Every URL resolves 200 with no redirect and no empty pages.
- [ ] Covers current commercial pages, not a historical snapshot.
- [ ] Generated from live data where possible so it can't go stale.
- [ ] Optionally `/llms-full.txt` with expanded content.

**Honest assessment:** no major engine has confirmed using it as a ranking input. It is cheap hygiene and a genuine agent-readability win — worth doing, not worth believing in. Structured data and third-party corroboration carry the actual weight.

## 6.4 Content built to be quoted

- [ ] **Answer-first:** the question as the heading, the answer in the first two sentences, detail after.
- [ ] **Self-contained paragraphs.** An extracted chunk must make sense without the paragraphs around it — avoid "as mentioned above" and unexplained pronouns.
- [ ] **Specific, checkable facts:** numbers, dates, named entities, prices, versions. Vague claims are unquotable.
- [ ] **Comparison tables** — among the most frequently extracted structures.
- [ ] **FAQ blocks** where question text matches real prompt phrasing.
- [ ] **Original data and research.** The single most reliably cited asset type: a benchmark, a survey, an analysis nobody else has run.
- [ ] **Named expert authors** with credentials and a bio page. Expert attribution is rising as a weighting factor.
- [ ] **Freshness:** a genuine `dateModified` and real updates. Stale content is deprioritised in generated answers more aggressively than in blue links.
- [ ] **Define your own terms.** If you name a methodology and explain it, you become the citation for it.

## 6.5 Entity and knowledge graph

- [ ] One consistent legal name, brand name and description everywhere.
- [ ] Organisation schema with complete `sameAs` (§3.3).
- [ ] Founding date, headcount, address and leadership consistent across site, schema and every profile.
- [ ] Founder/executive `Person` entities with their own presence — LinkedIn, bylines, talks, podcasts.
- [ ] Wikidata where notability allows; Wikipedia only if genuinely warranted — never self-created promotional entries.
- [ ] Crunchbase, industry associations, partner directories.

## 6.6 Corroboration — the half most people skip

- [ ] Every directory and review profile claimed, completed, and **mutually consistent**.
- [ ] Reviews on the platforms your category is actually judged by. For agencies: Clutch above all, then G2, Trustpilot, the platform partner directory.
- [ ] Presence in the third-party "best X" listicles that AI engines quote — most accept submissions or partnerships.
- [ ] Genuine participation in communities the engines index heavily: Reddit, Stack Overflow, industry forums, Q&A sites. Real answers from named people, not promotion.
- [ ] Podcast appearances, webinars, conference talks — each creates an indexed, attributed mention.
- [ ] Digital PR: original data pitched to publications that cover your sector.
- [ ] YouTube presence — transcripts are indexed and quoted.

## 6.7 Agentic commerce readiness

AI agents increasingly browse, compare and transact on a buyer's behalf.

- [ ] Product data complete and structured: `Product`, `Offer`, price, availability, GTIN/SKU, shipping, returns.
- [ ] Merchant feeds accurate and current.
- [ ] Policies (shipping, returns, warranty) as structured, machine-readable content, not PDFs.
- [ ] Prices and stock crawlable, not locked behind JavaScript.
- [ ] Checkout functional without JavaScript-heavy flows where possible.
- [ ] Consider an MCP endpoint exposing catalogue and availability to agents directly.

## 6.8 Measuring AI visibility

- [ ] A **fixed prompt set of 30–50** buying-intent questions, written once and held constant.
- [ ] Run monthly across ChatGPT, Perplexity, Gemini, Copilot, Claude and Google AI Overviews.
- [ ] Record three things per prompt: **is the brand named**, **is it linked**, **is what the engine says accurate**.
- [ ] Track share of voice against named competitors.
- [ ] Correct factual errors at the source — the pages and profiles the engine is drawing from.
- [ ] Pair with the GA4 AI-referral channel (§4.3) for the traffic side.
- [ ] Expect **six to eight weeks** before changes register. Judging earlier produces the wrong decision.

---

# 7. Off-site SEO

- [ ] **Backlink profile audited** — referring domains, authority, anchor distribution, topical relevance.
- [ ] Links earned through assets worth linking to: original research, tools, calculators, definitive guides.
- [ ] Digital PR rather than link buying. Paid links without `rel="sponsored"` violate guidelines.
- [ ] Anchor text natural and varied; over-optimised exact-match anchors are a risk signal.
- [ ] Broken backlinks reclaimed — 301 the dead URL to the right page.
- [ ] Unlinked brand mentions converted to links.
- [ ] Competitor link gap analysis quarterly.
- [ ] Disavow only for a genuine negative SEO problem — rarely needed.
- [ ] Social profiles complete, active, and linking to the site.

---

# 8. Process — checklists that prevent the expensive mistakes

## 8.1 Pre-publish checklist (every new page)

```
[ ] Unique title, 50–60 chars, term first, brand last
[ ] Unique meta description, 140–160 chars
[ ] One H1; logical heading hierarchy
[ ] Self-referencing absolute canonical
[ ] Indexable (no stray noindex)
[ ] Open Graph + Twitter card complete, og:image 1200×630
[ ] All images have alt text, dimensions, modern format
[ ] Structured data present and validating
[ ] Internal links in AND out; not orphaned
[ ] Breadcrumbs + BreadcrumbList markup
[ ] Answer-first structure on at least the primary question
[ ] FAQ block where appropriate, visible + marked up
[ ] Named author with bio, publish date, dateModified
[ ] URL clean, lowercase, correct trailing-slash convention
[ ] Added to sitemap; lastmod accurate
[ ] Mobile rendering equals desktop content
[ ] CWV spot-checked; LCP element preloaded
[ ] Verified in RAW HTML, cache-busted
```

## 8.2 Migration and replatform checklist

The most expensive failures in SEO happen here.

```
BEFORE
[ ] Full crawl of the existing site, archived
[ ] Export 16 months of Search Console data
[ ] Inventory every indexed URL, with traffic and links
[ ] Map every old URL to a new one — 1:1 where possible
[ ] Inventory all CONTENT, not just URLs — where does each page's
    body actually live, and does the new platform read it?
[ ] Note every template, metafield and CMS field in use
[ ] Baseline: rankings, traffic, conversions, CWV

DURING
[ ] Staging environment noindexed and password-protected
[ ] Redirect map implemented and tested before launch
[ ] Structured data ported, not rebuilt from memory
[ ] Meta titles and descriptions carried across
[ ] Images and alt text carried across
[ ] Analytics and GSC configured on the new stack

AFTER — first 48 hours
[ ] Staging noindex REMOVED from production
[ ] robots.txt correct on production
[ ] Sitemap regenerated and resubmitted
[ ] Crawl the new site; compare against the archived crawl
[ ] Every old URL returns 200 or 301 — zero 404s
[ ] Spot-check 20 pages for RENDERED CONTENT, not status codes
[ ] Structured data validating
[ ] Analytics recording

AFTER — weeks 1 to 8
[ ] GSC Pages report watched daily, then weekly
[ ] Rankings tracked against the pre-launch baseline
[ ] CWV field data monitored
[ ] 404 log reviewed and redirects added
```

> Two failures on byteoperator.com — 68 articles left 404 in the sitemap, and 74 pages whose content stayed behind in Liquid templates — would both have been caught by the two lines in bold above.

## 8.3 Ongoing cadence

| Frequency | Task |
|---|---|
| **Weekly** | GSC coverage and errors; rank movement on priority terms; 404 log |
| **Monthly** | Full crawl, diffed against last month; CWV field data; AI prompt set; backlink changes; content refresh on decaying pages |
| **Quarterly** | Cannibalisation audit; internal link audit; competitor gap analysis; log file analysis; structured data revalidation; directory consistency check; third-party script audit |
| **Annually** | Full technical audit; information architecture review; keyword map rebuild; migration readiness review |

---

# 9. Decision rules

When the answer isn't obvious, these settle it.

1. **An omitted field beats a false one.** Never fabricate a date, metric, address or author to fill a schema property.
2. **Redirect rather than delete** when a successor page exists. Delete only when nothing equivalent exists.
3. **Consolidate rather than compete.** Two pages for one intent is always worse than one good page.
4. **Visible before marked up.** Never mark up what a user can't see.
5. **Fix the source, not the symptom.** If an AI engine states something wrong about you, correct the page or profile it's reading.
6. **Reduce scope before reducing quality.** Ten excellent pages beat fifty adequate ones.
7. **Verify from raw HTML, cache-busted.** Every time.
8. **Measure before changing.** Export the baseline first; it can't be recovered later.

---

# 10. Common mistakes

| Mistake | Consequence |
|---|---|
| Sitemap containing 404s, redirects or noindexed URLs | Wasted crawl budget; a signal the site is unmaintained |
| `noindex` left on after launch from staging | Total deindexation — the most expensive single mistake in SEO |
| Blocking CSS/JS in robots.txt | Broken render, misjudged page |
| Redirecting everything to the homepage | Treated as soft 404s; equity lost |
| Marking up third-party reviews as first-party | Manual action risk |
| FAQ schema without visible FAQ content | Ignored at best, penalised at worst |
| Same meta description across a template | Lost snippet control and lost AI summary chunk |
| Relative or missing canonicals | Duplicate clusters; wrong URL ranks |
| Structured data injected client-side | Inconsistently read; invisible to non-JS crawlers |
| Contradictory NAP across directories | Weakens entity confidence everywhere at once |
| Checking a change without cache-busting | Believing a broken deploy worked, or vice versa |
| Judging AI visibility at week two | Wrong conclusion; programme abandoned early |
| Publishing AI-written content at volume | Domain-wide quality suppression |

---

# 11. Measurement — what "working" looks like

| Layer | Metric | Source |
|---|---|---|
| Crawl | Pages discovered vs indexed | GSC Pages report |
| Crawl | 404s, soft 404s, redirect errors | GSC + crawler |
| Visibility | Impressions and average position, by cluster | GSC Performance |
| Visibility | Rankings on the priority keyword set | Rank tracker |
| **AI** | **Citation rate across the fixed prompt set** | Monthly manual or tooled run |
| **AI** | **Referral sessions from AI platforms** | GA4 custom channel |
| **AI** | **Accuracy of AI statements about the brand** | Monthly prompt run |
| Entity | Profile consistency score; review counts | Manual audit |
| Engagement | Organic sessions, engaged sessions, conversion rate | GA4 |
| Performance | LCP / INP / CLS at p75 | CrUX |
| Business | Organic-sourced pipeline and revenue | CRM |

---

# 12. Future improvements

- Regional engines if expanding: Yandex Webmaster, Baidu Ziyuan, Naver Search Advisor
- Video SEO programme with transcripts and `VideoObject`
- Podcast with indexed transcripts
- A public data asset published annually as a citable `Dataset`
- MCP endpoint exposing catalogue and service data directly to AI agents
- Automated regression tests for SEO invariants in CI — title presence, canonical validity, schema parse, no-noindex-in-production
- Programmatic pages for long-tail comparisons, built from structured data rather than templated filler

---

## References

- Google Search Central — Search Essentials, structured data guidelines, review snippet policy
- schema.org vocabulary
- web.dev — Core Web Vitals
- Bing Webmaster Guidelines; IndexNow protocol
- Software — Hydrogen and Oxygen documentation
- Each AI operator's published crawler documentation

## Version history

| Version | Date | Change |
|---|---|---|
| 1.0 | 13 Sep 2026 | Initial standard — foundations, on-page, structured data, analytics configuration, platform specifics, GEO, off-site, process, decision rules, common mistakes, measurement |
