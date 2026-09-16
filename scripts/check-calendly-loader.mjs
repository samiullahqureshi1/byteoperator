/**
 * Checks the Calendly loader's two guarantees: the script and stylesheet are
 * injected exactly once no matter how many buttons ask for them, and the
 * booking URL is passed through clean.
 *
 * Run: node --experimental-strip-types scripts/check-calendly-loader.mjs
 */
import assert from 'node:assert/strict';

/* A DOM small enough to exercise the loader and nothing more. */
const created = [];
const nodes = [];
let loadHandler;
let timer;

const makeEl = (tag) => {
  const el = {
    tagName: tag.toUpperCase(),
    listeners: {},
    addEventListener(type, fn) {
      this.listeners[type] = fn;
      if (type === 'load' && tag === 'script') loadHandler = fn;
    },
  };
  created.push(el);
  return el;
};

globalThis.document = {
  createElement: makeEl,
  querySelector: (sel) =>
    nodes.find((n) => sel.includes(n.href ?? n.src ?? '\0')) ?? null,
  head: {appendChild: (el) => nodes.push(el)},
};
globalThis.window = {};

const {loadCalendly, openCalendly, CALENDLY_EVENT_URL} = await import(
  '../app/lib/calendly.ts'
);

// The event URL must carry no month/date state.
assert.equal(CALENDLY_EVENT_URL, 'https://calendly.com/theshopifyexperts/30min');
assert.ok(!CALENDLY_EVENT_URL.includes('?'), 'event URL must have no query params');

// Three buttons ask at once, as they would on a page with several CTAs.
const waiting = [loadCalendly(), loadCalendly(), loadCalendly()];

const scripts = nodes.filter((n) => n.tagName === 'SCRIPT');
const links = nodes.filter((n) => n.tagName === 'LINK');
assert.equal(scripts.length, 1, `expected 1 script, got ${scripts.length}`);
assert.equal(links.length, 1, `expected 1 stylesheet, got ${links.length}`);

// The widget finishes loading; every waiting caller resolves.
globalThis.window.Calendly = {
  initPopupWidget: (opts) => {
    globalThis.window.__opened = opts.url;
  },
};
loadHandler();

// A caller that never settles means the shared promise was not shared — fail
// loudly rather than hanging.
await Promise.race([
  Promise.all(waiting),
  new Promise((_, rej) => {
    timer = setTimeout(
      () => rej(new Error('a loadCalendly() caller never resolved — promise not shared')),
      2000,
    );
  }),
]);

clearTimeout(timer);

// A later button reuses the loaded widget without injecting anything more.
await loadCalendly();
assert.equal(nodes.filter((n) => n.tagName === 'SCRIPT').length, 1, 'script was injected twice');

await openCalendly();
assert.equal(globalThis.window.__opened, CALENDLY_EVENT_URL, 'popup opened with the wrong URL');

console.log('OK — 1 script, 1 stylesheet, 3 concurrent callers shared them,');
console.log(`     popup opens ${CALENDLY_EVENT_URL} with no date params.`);
