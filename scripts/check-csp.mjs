/**
 * Guards the Content Security Policy against a sharp edge in Hydrogen's
 * createContentSecurityPolicy.
 *
 * Hydrogen sets NO explicit script-src, img-src or frame-src — all three fall
 * back to default-src. Passing any of them here does not extend a default, it
 * CREATES the directive from nothing, silently dropping 'self', Shopify's
 * origins and the Turnstile iframe. Passing imgSrc alone would break every
 * image on the site with no build error and no type error.
 *
 * style-src and connect-src are the opposite: Hydrogen sets them explicitly
 * and merges what you pass, so a third-party origin must be named there.
 *
 * Run: node scripts/check-csp.mjs
 */
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {createContentSecurityPolicy} from '@shopify/hydrogen';

const ENTRY = 'app/entry.server.tsx';
const source = readFileSync(ENTRY, 'utf8');
const failures = [];

/* 1. The footgun: these directives must never be passed. */
for (const directive of ['imgSrc', 'scriptSrc', 'frameSrc']) {
  // Plain substring, not a regex: the surrounding comment names these in
  // kebab-case (img-src), so only a real `imgSrc:` option matches.
  if (source.includes(`${directive}:`)) {
    failures.push(
      `${ENTRY} passes ${directive}. Hydrogen has no default for it, so this ` +
        `creates the directive and drops 'self' and Shopify's origins. ` +
        `Add the origin to defaultSrc instead.`,
    );
  }
}

/* 2. The resulting policy still allows everything the site depends on. */
const TURNSTILE = 'https://challenges.cloudflare.com';
const CALENDLY_ASSETS = 'https://assets.calendly.com';
const CALENDLY = 'https://calendly.com';

const {header} = createContentSecurityPolicy({
  shop: {checkoutDomain: 'shop.myshopify.com', storeDomain: 'shop.myshopify.com'},
  defaultSrc: [TURNSTILE, CALENDLY_ASSETS, CALENDLY],
  styleSrc: [CALENDLY_ASSETS],
  connectSrc: [TURNSTILE, CALENDLY],
});

const directives = Object.fromEntries(
  header.split(';').map((d) => {
    const [name, ...values] = d.trim().split(/\s+/);
    return [name, values];
  }),
);

const expect = (directive, value) => {
  if (!directives[directive]?.includes(value)) {
    failures.push(`${directive} is missing ${value}`);
  }
};

// Calendly can load.
expect('style-src', CALENDLY_ASSETS);
expect('default-src', CALENDLY_ASSETS);
expect('default-src', CALENDLY);
expect('connect-src', CALENDLY);

// Nothing that was already working got dropped.
expect('style-src', "'self'");
expect('style-src', "'unsafe-inline'");
expect('style-src', 'https://cdn.shopify.com');
expect('default-src', "'self'");
expect('default-src', 'https://cdn.shopify.com');
expect('default-src', TURNSTILE);
expect('connect-src', "'self'");
expect('connect-src', TURNSTILE);

// The origins the entry file actually uses match the ones asserted above.
for (const origin of [TURNSTILE, CALENDLY_ASSETS, CALENDLY]) {
  if (!source.includes(origin)) failures.push(`${ENTRY} no longer names ${origin}`);
}

if (failures.length) {
  console.error(`FAIL — ${failures.length} issue(s):`);
  for (const f of failures) console.error(`  ${f}`);
  process.exit(1);
}

console.log('OK — Calendly allowed; Shopify, Turnstile and self all intact.');
for (const name of ['default-src', 'style-src', 'connect-src']) {
  console.log(`     ${name}: ${directives[name].join(' ')}`);
}
