/**
 * Guards the approved facts register (app/data/companyFacts.ts).
 *
 * The homepage once said 16,500+ stores while the About page said 150+ —
 * both live, on the same domain. This fails the moment a retired figure,
 * a second founding year or the parent-company identity reappears in app/,
 * or a fact is defined in the register but shown on no surface.
 *
 * Run: node scripts/check-company-facts.mjs
 */
import {readFileSync} from 'node:fs';
import {readdir} from 'node:fs/promises';
import {join} from 'node:path';

const APP = join(process.cwd(), 'app');

/** Figures pulled in Phase 1. Any of these back in app/ is a regression. */
const RETIRED = [
  '22,000+', '16,500+', '$3.4B', '20K+', '15K+', '$3.1B',
  'Est. 2018', 'TAB ON TECH', 'parentOrganization',
  // Marketplace team band. Contradicts the canonical "~50 specialists".
  '51-200', '51\u2013200',
];

async function sources(dir) {
  const out = [];
  for (const entry of await readdir(dir, {withFileTypes: true})) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await sources(path)));
    else if (/\.(ts|tsx)$/.test(entry.name)) out.push(path);
  }
  return out;
}

const files = await sources(APP);
const failures = [];

for (const file of files) {
  // The register itself is allowed to name the figures it retired.
  if (file.endsWith('companyFacts.ts')) continue;

  const text = readFileSync(file, 'utf8');
  for (const term of RETIRED) {
    if (text.includes(term)) failures.push(`${file}: retired figure "${term}"`);
  }

  // A count-up stat defined outside the register. This is how WorkResults and
  // EcommerceSeoHero kept publishing 22,000+ and 20K+ after Phase 1: the
  // figure was split into `target: 22` + `suffix: ',000+'`, so no retired
  // string ever appeared in the file. Stats come from the register, always.
  const literal = text.match(/target:\s*\d/);
  if (literal) failures.push(`${file}: stat defined outside the register (${literal[0].trim()})`);
}

const facts = readFileSync(join(APP, 'data', 'companyFacts.ts'), 'utf8');
const schema = readFileSync(join(APP, 'lib', 'seo', 'schema.ts'), 'utf8');

// The visible founding year and the JSON-LD foundingDate must agree.
const visible = facts.match(/value: '(\d{4})',\s*\n\s*label: 'Established Since'/)?.[1];
const structured = schema.match(/foundingDate: '(\d{4})'/)?.[1];

if (!visible || !structured) {
  failures.push('could not read founding year from companyFacts.ts or schema.ts');
} else if (visible !== structured) {
  failures.push(`founding year differs: page says ${visible}, schema says ${structured}`);
}

// Every fact must reach a surface. A fact defined but listed in no subset is
// silently invisible — the failure mode this register exists to prevent.
const register = facts.slice(
  facts.indexOf('export const COMPANY_FACTS = {'),
  facts.indexOf('WHAT EACH SURFACE SHOWS'),
);
const subsets = facts.slice(facts.indexOf('WHAT EACH SURFACE SHOWS'));

const defined = [...register.matchAll(/^  (\w+): \{$/gm)].map((m) => m[1]);
const shown = new Set(
  [...subsets.matchAll(/COMPANY_FACTS\.(\w+)/g)].map((m) => m[1]),
);

if (!defined.length) failures.push('could not parse any facts from the register');
for (const key of defined) {
  if (!shown.has(key)) failures.push(`fact "${key}" is defined but shown on no surface`);
}

if (failures.length) {
  console.error(`FAIL — ${failures.length} issue(s):`);
  for (const f of failures) console.error(`  ${f}`);
  process.exit(1);
}

console.log(
  `OK — ${files.length} files clean, ${defined.length} facts all shown, founding year ${visible} everywhere.`,
);
