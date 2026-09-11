# VS Code Agent Prompt — Meta Pixel + Conversions API for Hydrogen

**How to use**

1. Open the Hydrogen repo in VS Code. Create a branch: `git checkout -b feat/meta-tracking`.
2. Recommended: add the Shopify Dev MCP so the agent can check current Hydrogen and Storefront API docs (Command Palette → *MCP: Open User Configuration*):
   `{"servers":{"shopify-dev-mcp":{"command":"npx","args":["-y","@shopify/dev-mcp@latest"]}}}`
3. Fill in the **PROJECT CONFIG** block below. Do **not** paste your access token into the chat. It goes into Oxygen environment variables only.
4. Use Agent mode (Copilot Agent, Claude Code, or Cursor Agent) with your strongest model. Paste everything below the line.
5. The agent stops after Phase 0 and again after Phase 1 for your approval. Review both before letting it continue.

---

# ROLE

You are a senior Shopify Hydrogen engineer and marketing-measurement architect. You are working in this repository: a Shopify **Hydrogen** storefront deployed on **Oxygen**, using **Shopify-hosted checkout**. You write production-grade, strictly-typed TypeScript. You follow this repo's existing conventions: framework version, file layout, lint rules and test runner. You never guess an API. When unsure, verify with the Shopify Dev MCP / official docs (shopify.dev, developers.facebook.com) before writing code.

# OBJECTIVE

Implement complete, consent-aware, deduplicated **Meta Pixel + Meta Conversions API (CAPI)** tracking across the full customer journey. Meta Ads must receive accurate, high-match-quality conversion signals for campaign optimisation.

Build it as a **reusable, destination-agnostic tracking module**. Meta is the first destination. GA4, TikTok and Google Ads must be addable later as adapters, without touching event call sites.

# PROJECT CONFIG (filled in by the owner)

- Storefront URL: `https://__________`
- Checkout domain: `__________` (should be a subdomain of the storefront's root domain)
- Site type: `auto-detect` | `ecommerce` | `lead-gen` | `both`
- Purchase tracking at checkout: `custom-pixel-plus-webhook` (default) | `facebook-instagram-app`
- Meta catalog content_id format: `variant-numeric-id` (default) | `shopify_{COUNTRY}_{PRODUCT_ID}_{VARIANT_ID}` | other: `____`
- Consent: `shopify-cookie-banner` (default) | third-party CMP: `____`
- Markets/currencies: `____`

# NON-NEGOTIABLE RULES

1. **Consent first.** Meta is a *marketing* tracker. Load the pixel and send any browser or server event only when `window.Shopify.customerPrivacy.marketingAllowed()` is true. Never set Meta cookies and never send identifiers before consent. Respect consent granted mid-session (`visitorConsentCollected` document event).
2. **No double counting.** Every event sent from both the browser and the server shares one `event_id`, so Meta deduplicates. Each funnel event has exactly **one** owner (see the Event Map). Disable Meta's automatic SPA PageViews (`fbq.disablePushState = true`) and automatic events (`fbq('set','autoConfig',false,PIXEL_ID)`), because Hydrogen already publishes `page_viewed` on client navigation.
3. **Secrets stay server-side.** Only `PUBLIC_META_PIXEL_ID` may reach the client. The CAPI token is read from `context.env` in server code only, and is never logged or put in a URL.
4. **PII handling.** Hash `em`, `ph`, `fn`, `ln`, `ct`, `st`, `zp`, `country` and `external_id` with SHA-256 (via `crypto.subtle`) **on the server**, after Meta's normalisation rules. Never log raw PII. Never place PII in URLs or query strings.
5. **Don't guess APIs.** Detect the Hydrogen version and router: Remix (`@shopify/remix-oxygen`) or React Router 7 (Hydrogen 2025.5+). Use the matching imports and route conventions. Read the Meta Graph API version from an env var (`META_GRAPH_API_VERSION`); do not hardcode one.
6. **Minimal blast radius.** Don't refactor unrelated code. No new dependencies unless justified in the plan. Use `zod` for validation only if the repo already has it; otherwise write a small hand-rolled validator.
7. **Small, reviewable commits** with conventional commit messages.

# PHASE 0 — AUDIT (read-only). Output a report, then STOP and wait for approval.

Inspect the codebase and report:

1. Hydrogen and `@shopify/hydrogen` versions, router (Remix vs React Router 7), Node version, package manager, test runner, lint setup.
2. `app/root.tsx`: is `<Analytics.Provider>` present, with `cart`, `shop` (`getShopAnalytics`) and `consent` (`checkoutDomain`, `storefrontAccessToken`, `withPrivacyBanner`, `country`, `language`)?
3. The cart query/fragment: does it include `updatedAt` and `merchandise { id price { amount currencyCode } product { id title vendor productType } }`?
4. Do `Analytics.ProductView`, `Analytics.CollectionView`, `Analytics.SearchView` and `Analytics.CartView` exist on the right routes? Is `cart_viewed` published for a cart drawer/aside, if one exists?
5. `app/entry.server.tsx`: the current `createContentSecurityPolicy` config.
6. `env.d.ts` and the env vars in use. What is `PUBLIC_CHECKOUT_DOMAIN` set to?
7. Any existing tracking: `fbq`, GTM, GA, TikTok, Klaviyo, third-party scripts. Flag anything that would double-fire.
8. **Every conversion surface** in the site: add to cart, cart drawer, checkout button, wishlist, customer register/login, newsletter forms, contact/quote/lead forms, booking/calendar embeds, `mailto:`/`tel:`/WhatsApp links, search, product/variant selection, and key landing and service pages.
9. Site type conclusion (`ecommerce` / `lead-gen` / `both`), with evidence.
10. Risks and gaps: missing consent config, checkout on `*.myshopify.com`, missing `updatedAt`, and so on.

Then produce the **proposed Event Map** for *this* site: the table below, trimmed or extended to match what actually exists. **STOP. Wait for my approval.**

# EVENT MAP (reference — adapt to the audit)

| Funnel step | Source (owner) | Meta event | Browser | Server (CAPI) | Key params |
|---|---|---|---|---|---|
| Page view | Hydrogen `page_viewed` | `PageView` | ✅ | ✅ | — |
| Consent granted mid-session | `visitorConsentCollected` | `PageView` (current page) | ✅ | ✅ | — |
| Product view | Hydrogen `product_viewed` | `ViewContent` | ✅ | ✅ | content_ids, content_type, content_name, content_category, value, currency |
| Variant change on PDP | custom `custom_variant_selected` | `CustomizeProduct` | ✅ | ❌ | content_ids |
| Collection view | Hydrogen `collection_viewed` | custom `ViewCategory` (`trackCustom`) | ✅ | ✅ | content_category, content_ids (first 10) |
| Search | Hydrogen `search_viewed` | `Search` | ✅ | ✅ | search_string, content_ids (first 10) |
| Add to cart | Hydrogen `product_added_to_cart` | `AddToCart` | ✅ | ✅ | content_ids, contents[{id,quantity,item_price}], value (= unit price × added qty), currency |
| Remove from cart | Hydrogen `product_removed_from_cart` | custom `RemoveFromCart` | ✅ | ❌ | content_ids, value |
| Cart view (page or drawer) | Hydrogen `cart_viewed` | custom `ViewCart` | ✅ | ❌ | value, currency, num_items |
| Wishlist (if it exists) | custom `custom_wishlist_added` | `AddToWishlist` | ✅ | ✅ | content_ids, value |
| Account created | custom `custom_account_registered` | `CompleteRegistration` | ✅ | ✅ (hashed em) | status |
| Newsletter signup | custom `custom_newsletter_signup` | custom `NewsletterSignup` | ✅ | ✅ (hashed em) | content_name |
| Contact / quote / lead form | custom `custom_lead_submitted` (after server success) | `Lead` | ✅ | ✅ from the form's action route (hashed em/ph/fn/ln) | content_name, content_category, value (optional estimated lead value) |
| Booking confirmed | custom `custom_booking_confirmed` | `Schedule` | ✅ | ✅ | content_name |
| Click-to-contact (tel/mailto/WhatsApp) | custom `custom_contact_clicked` | `Contact` | ✅ | ✅ | content_name (channel) |
| Checkout started | **Shopify Customer Events** `checkout_started` | `InitiateCheckout` | ✅ custom pixel | — | value, currency, content_ids, contents, num_items |
| Payment info | Customer Events `payment_info_submitted` | `AddPaymentInfo` | ✅ custom pixel | — | value, currency |
| Purchase | Customer Events `checkout_completed` + `orders/create` webhook | `Purchase` | ✅ custom pixel | ✅ webhook (hashed customer data, fbp/fbc) | value, currency, content_ids, contents, num_items, order_id |

Rules for the map:

- **Do not** fire `InitiateCheckout` from the Hydrogen checkout button. The Shopify checkout owns it. If useful, track the click as custom `CheckoutClick` (browser only).
- Custom Hydrogen events must use the `custom_` prefix and be published with `useAnalytics().publish()`.
- `content_ids` and `contents[].id` use the configured catalog content_id format through **one** formatter function.
- `value` is a number and `currency` is ISO-4217, from the cart/checkout (multi-currency aware).
- Event ID formats: storefront events use `crypto.randomUUID()`; InitiateCheckout uses `ic_<checkout.token>`; Purchase uses `order_<numeric order id>` (identical in the custom pixel and the webhook); Lead uses a UUID generated client-side, submitted in a hidden form field and reused by the server.

# PHASE 1 — ARCHITECTURE PLAN. Output the plan, then STOP and wait for approval.

Propose the file tree, the interfaces and the data flow. The expected shape (adapt names to repo conventions):

```
app/lib/tracking/
  config.ts                 # reads public config; debug flag
  events.ts                 # canonical event names + typed payloads (single source of truth)
  consent.ts                # marketingAllowed(), onConsentChange()
  ids.ts                    # newEventId(), gidToId(), formatContentId()
  mappers/meta.ts           # pure functions: internal event → Meta event + custom_data
  destinations/types.ts     # Destination interface { name, init(), track(event) }
  destinations/meta-pixel.client.ts   # lazy loads fbevents.js, disablePushState, autoConfig=false
  destinations/meta-capi.client.ts    # navigator.sendBeacon('/api/track') with fetch keepalive fallback
  server/meta-capi.server.ts          # Graph API client: timeout, 1 retry on 5xx, error logging, test_event_code
  server/hash.server.ts               # Meta normalisation + SHA-256
  server/user-data.server.ts          # IP (oxygen-buyer-ip), UA, _fbp/_fbc cookies, fbc from fbclid
app/components/TrackingProvider.tsx   # useAnalytics().register/subscribe → dispatch to destinations; ready()
app/routes/api.track.ts               # POST endpoint for browser → CAPI mirror
app/routes/webhooks.orders-create.ts  # HMAC-verified Shopify webhook → Purchase CAPI (if config = custom-pixel-plus-webhook)
docs/tracking/shopify-custom-pixel.js # code to paste in Shopify Admin → Customer events
docs/tracking/README.md               # event dictionary, setup runbook, QA checklist
```

Also include: the CSP changes, the env vars, how cart attributes carry `_fbp`/`_fbc`/landing UTMs to the webhook, and the test plan. **STOP. Wait for my approval.**

# PHASE 2 — IMPLEMENTATION REQUIREMENTS

**Browser (Hydrogen)**

- `TrackingProvider` mounts inside `<Analytics.Provider>` in `root.tsx`. It calls `register('Tracking')`, subscribes to all standard Hydrogen events plus the `custom_*` events, and calls `ready()`.
- The pixel loads lazily on the first consented event, only once (guard against React StrictMode double effects). No `PageView` in the base code; PageView comes from `page_viewed` only.
- Every event goes through `mappers/meta.ts` (pure, unit-tested) and then to both destinations with the same `event_id`.
- Quantities and values on add to cart use the delta: `currentLine.quantity - (prevLine?.quantity ?? 0)`.
- Capture `fbclid` from the landing URL in memory. If consent arrives later in the session, make sure `_fbc` gets set (via the pixel) so it isn't lost. Store nothing before consent.
- With consent, when the cart is created or updated, write cart attributes `_fbp`, `_fbc`, `_fb_event_source_url` and the landing `utm_*` values (`cart.updateAttributes`) so the order webhook can read them from `note_attributes`.
- Instrument the conversion surfaces from the audit with `publish('custom_…')`. Lead, registration and newsletter fire **only after server-confirmed success**.
- Debug mode: when `PUBLIC_TRACKING_DEBUG=true` or `?tracking_debug=1`, `console.info` every event (name, event_id, params) and never PII.

**Server**

- `api.track.ts`: POST only; JSON body ≤ 8 KB; allow-listed event names; same-origin check on `Origin`/`event_source_url`; build `user_data` (IP from `oxygen-buyer-ip`, user agent, `_fbp`, `_fbc`; `external_id` = hashed customer ID if logged in); `action_source: 'website'`; `event_time` in seconds. Respond `204` immediately and do the Meta call in `context.waitUntil` when available.
- Lead/registration/newsletter: send the CAPI event from the **form's own action route** after success, with hashed `em`/`ph`/`fn`/`ln` and the client-supplied `event_id`. Don't route PII through `/api/track`.
- `webhooks.orders-create.ts`: verify `X-Shopify-Hmac-Sha256` against the raw body with `SHOPIFY_WEBHOOK_SECRET` using constant-time comparison. Build Purchase with `event_id = order_<id>`, full hashed customer data (email, phone, name, city, province code, zip, country code) and `fbp`/`fbc` from `note_attributes`. Set `event_source_url`, and set `event_time` from `processed_at`. Skip test/cancelled orders as appropriate. Return 200 quickly; it must be idempotent.
- Meta client: `POST https://graph.facebook.com/${META_GRAPH_API_VERSION}/${PUBLIC_META_PIXEL_ID}/events` with `access_token` in the JSON body, `test_event_code` when `META_TEST_EVENT_CODE` is set, a 5s timeout, and one retry on 5xx or network error. Log `fbtrace_id` on errors.

**Checkout (Shopify Admin — generate code; can't deploy from the repo)**

- `docs/tracking/shopify-custom-pixel.js`: Meta base code with `autoConfig=false`. Subscribe to `checkout_started`, `payment_info_submitted` and `checkout_completed`, using the same mapper logic, content_id format and event_id formats as above. Add header comments: set **Permission = Marketing** in Admin, and paste the real Pixel ID.
- If config = `facebook-instagram-app`: do **not** generate Purchase/InitiateCheckout code or the webhook. Document that the app owns checkout events and must use the same dataset.

**Config and security**

- CSP (`createContentSecurityPolicy`): add `https://connect.facebook.net` to `scriptSrc`; add `https://connect.facebook.net` and `https://www.facebook.com` to `connectSrc`; add `https://www.facebook.com` to `imgSrc`. Keep the existing directives.
- Env vars (add to `env.d.ts` and `.env.example`, with no real values):
  `PUBLIC_META_PIXEL_ID`, `META_CAPI_ACCESS_TOKEN`, `META_GRAPH_API_VERSION`, `META_TEST_EVENT_CODE` (QA only), `SHOPIFY_WEBHOOK_SECRET`, `PUBLIC_TRACKING_DEBUG`.
- If any required env var is missing, tracking disables itself gracefully and the site never breaks.

# PHASE 3 — TESTS & QA

- Unit tests (use the repo's runner; add Vitest only if none exists, and say so): mappers, `formatContentId`, `gidToId`, hashing normalisation (email/phone/name/zip/country vectors), consent gating, the add-to-cart delta, HMAC verification, and api.track payload validation and allow-list.
- `pnpm/npm run typecheck`, `lint` and `build` all pass.
- Write `docs/tracking/README.md` with: the architecture diagram (ASCII), the event dictionary (event → trigger → params → owner → dedup key), setup steps (Meta Events Manager dataset, domain verification, CAPI token, Shopify custom pixel, `orders/create` webhook subscription (Admin → Settings → Notifications → Webhooks, or a custom app with `read_orders` — document which secret signs it), env vars in Oxygen), and this **QA checklist**:
  1. Consent declined → zero requests to `facebook.com` / `facebook.net`.
  2. Consent accepted → exactly one PageView per client-side navigation.
  3. ViewContent / AddToCart / Search show as **Browser + Server** and are deduplicated in Events Manager → Test Events.
  4. Lead form → one Lead, deduplicated, with match keys present.
  5. Test order → one InitiateCheckout, one AddPaymentInfo, one Purchase (browser + server deduplicated) with the correct value and currency.
  6. No CSP violations; no PII in logs, URLs or console.
  7. `META_TEST_EVENT_CODE` removed after QA.

# FINAL OUTPUT

When finished, reply with:

1. A summary of the changes, file by file.
2. The Event Dictionary table as implemented.
3. The exact manual steps I must do: in Meta Events Manager, in Shopify Admin (custom pixel, customer privacy, webhook), and in Oxygen env vars.
4. Known limitations and recommended next steps (for example a GA4 adapter, a queue/retry for CAPI, a monitoring alert when Meta Purchases diverge from Shopify orders).
5. A suggested PR title and description.
