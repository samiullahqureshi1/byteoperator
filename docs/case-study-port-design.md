# Case study port — design proposal

**Status** Design only. Nothing implemented. · **Date** 13 September 2026
**Inventory** `logs/liquid-content-inventory.json` (313 templates, 11 themes, read-only)

---

## 1. What the inventory actually found

The recovery premise holds: the copy exists and renders nowhere. But two of the
assumptions behind "the stats are the asset" do not survive contact with the data.

### The narrative is real

All 20 case-study templates carry genuinely distinct `summary`, `challenge` and
`results` copy — 20 distinct content hashes across 20 case studies. This is
client-approved writing, currently invisible to every crawler. **This is the
asset worth recovering.**

### The stats are placeholders, not outcomes

Every one of the 20 case studies carries the identical four values:

```
+45%   -30%   +22%   2.4s
```

They originate in `templates/page.cs-preview.json`, the only template that also
carries labels (`CONVERSION LIFT`, `BOUNCE RATE`, `ORDER VALUE`, `LOAD SPEED`).
Every real case study copied the values and left the labels empty.

**These are not measured client outcomes.** Porting them into discrete metaobject
fields and feeding them to `caseStudySchema()` would publish the same four
fabricated metrics as structured data for twenty named clients — precisely what
standing rule 6 and runbook 2.3 exist to prevent. Structured data is a
machine-readable *claim*; this one would be false twenty times over.

### The screenshots are shared too

40 asset references resolve to **10 unique files**. At least half the case
studies show another client's store.

### What this means for the design

The shape proposed below is still right — discrete stat fields, not HTML. But
the fields must start **empty**, and the port must carry across only what is
real. The stats become an input form for Malik to fill from analytics, not data
to migrate. That converts 2.3 ("case studies → evidence with figures") from a
rewrite into data entry against a defined schema.

---

## 2. Metaobject definition — `case_study`

Type: `case_study` · Display name field: `client_name`

| Field key | Type | Required | Validation | Source |
|---|---|---|---|---|
| `client_name` | `single_line_text_field` | ✅ | 1–80 chars | `hero.heading` |
| `slug` | `single_line_text_field` | ✅ | unique; `^[a-z0-9-]+$` | filename |
| `summary` | `multi_line_text_field` | ✅ | 40–400 chars | `hero.summary` |
| `challenge` | `rich_text_field` | ✅ | — | `narrative.challenge` |
| `solution` | `rich_text_field` | — | — | `narrative.solution` where present |
| `results` | `rich_text_field` | ✅ | — | `narrative.results` |
| `stat_1_label` … `stat_4_label` | `single_line_text_field` | — | ≤ 40 chars | **left empty — to be entered** |
| `stat_1_value` … `stat_4_value` | `single_line_text_field` | — | ≤ 16 chars | **left empty — to be entered** |
| `stat_1_basis` … `stat_4_basis` | `single_line_text_field` | — | ≤ 120 chars | **new** — how/when measured |
| `image_desktop` | `file_reference` | — | images only | `gallery.desktop_asset_name` |
| `image_mobile` | `file_reference` | — | images only | `gallery.mobile_asset_name` |
| `industry` | `single_line_text_field` | — | — | **new** — to be entered |
| `services_delivered` | `list.single_line_text_field` | — | — | **new** — to be entered |
| `published_date` | `date` | — | — | Page `publishedAt` |
| `project_year` | `number_integer` | — | 2010–2030 | **new** |
| `is_published` | `boolean` | ✅ | default `false` | — |

Storefront access: `PUBLIC_READ` on the definition — without it every value
writes successfully and the Storefront API returns `null`. Same trap as
`custom.last_modified` in 0.2.

### Why label/value/basis as three fields

`basis` is the field that makes the number defensible. "+45%" is decoration;
"+45% · checkout conversion, 90 days post-launch vs prior 90" is evidence, and
it is what stops a placeholder being quietly re-introduced later. A stat renders
only when label **and** value are both present, so partially-filled entries
degrade cleanly rather than showing a bare number.

---

## 3. Migration approach

`scripts/port-case-studies.mjs`, dry-run by default, `--apply` to write.

1. **Snapshot first.** Full template records to `logs/case-study-port-<ts>.json`
   before any write. The themes stay untouched and remain the archive.
2. **Read** the best template per slug from the inventory (`duplicate_of.isBest`).
3. **Map** narrative fields verbatim — no rewriting, shortening or "improving".
4. **Skip stats entirely.** Values and labels are written as empty. A
   `--include-placeholder-stats` flag exists only so the decision is explicit
   and greppable; default off, and it should stay off.
5. **Assets:** resolve `*_asset_name` against theme assets, upload to Software
   Files, reference by the returned GID. Record any unresolved reference as
   missing — never substitute another image.
6. **Idempotent:** keyed on `slug`; re-running updates rather than duplicating.
7. **Verify:** read every entry back through the *Storefront* API, not Admin —
   that is what the route will use, and it is where a missing
   `PUBLIC_READ` shows up.

Handle mismatches the inventory already found, which a naive `page.cs-<handle>`
join would miss:

- `cs-mann-co-bake-shop` (page) → `page.cs-mann--co-bake-shop.json` (double hyphen)
- `free-ai-visibility-snapshot` (page) → `page.freeaivisibility-snapshot.json`
- `cs-preview`, `cs-gold-custom-la` are templates with no live page — treat as
  reference material, not content to publish

---

## 4. Hydrogen route

One route renders all case studies:

```
app/routes/work.$handle.tsx        (already exists — extend, don't duplicate)
app/components/work/CaseStudy.tsx  (new — renders one metaobject)
```

- Loader queries the `case_study` metaobject by `slug`; 404 when absent or
  `is_published` is false.
- `/work` lists entries from the same source, so the index and detail pages can
  never disagree.
- `caseStudySchema()` gains real `about`/`result` values **only** for entries
  with a populated label+value pair. No stats → no stat markup. The schema
  helper should omit the field, never emit an empty one.
- Images via `Image` from `@software/hydrogen` for responsive sizing. The current
  desktop screenshot is 4 MB — served raw it would dominate LCP on a page whose
  entire purpose is being crawled and cited.

## 5. Assets — what breaks if they don't move

Theme assets live at `cdn.software.com/s/files/.../assets/<name>?v=<theme>`. They
are **tied to the theme**, not the store's Files. If a theme is deleted — and
there are eleven, several obvious duplicates — its assets go with it, and any
Hydrogen page referencing them shows broken images with no warning. Uploading to
Software Files first decouples them and is a precondition of the port, not a
follow-up.

---

## 6. AI-visibility funnel and reviews — different shape

These are much larger and should **not** be metaobjects.

| Template | Text | Sections |
|---|---|---|
| `page.reviews.json` | 24,056 | 12 |
| `page.ai-visibility.json` | 21,852 | 11 |
| `page.freeaivisibility-snapshot.json` | 17,460 | 13 |
| `page.ai-visibility-audit.json` | 6,960 | 5 |

A metaobject models *many instances of one shape*. These are four bespoke
landing pages with a dozen distinct section types each — that is a React
component tree, not a record.

**Recommendation:**

- **AI-visibility funnel** — port as Hydrogen components, the way
  `/ai-visibility-audit/` already was. The recovered templates become the
  content brief. Highest commercial priority: they sit on the wedge term, are
  wired into a live menu, and `ai-visibility-implementation` and
  `-monitoring` have **no template in any theme** — those two are genuinely
  new authoring, not recovery.
- **Reviews (24k chars, 12 sections)** — the testimonial quotes are the reusable
  unit and *should* be a `testimonial` metaobject (quote, author, company, role,
  rating, date, source). They already appear across many service-page templates,
  so one source removes the duplication. The surrounding page is a component.
  This also feeds 3.2: the same records support a `Review` schema once genuine
  Clutch reviews exist — never before.

---

## 7. What I recommend doing first

1. **Metaobject definition + port the 20 narratives, stats empty.** Turns 20
   invisible pages into 20 crawlable ones without asserting a single false
   number.
2. **Malik fills stats and `basis` from analytics** — a form, per case study,
   not a dev ticket.
3. **Only then** wire `caseStudySchema()` to the stat fields.
4. **Re-run the empty-pages audit** to confirm the 20 have left the empty set.

Step 1 alone resolves the largest block of empty pages on the site. Steps 2–3
are what make them citable.
