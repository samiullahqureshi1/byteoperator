/**
 * Renders the article illustrations in ./illustrations.mjs (hand-written SVG)
 * to 1376×768 PNGs in public/images/articles/, using the same renderer as
 * app/opengraph-image.tsx.
 *
 *   node scripts/article-images/render.mjs            # all
 *   node scripts/article-images/render.mjs name ...   # only these
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import React from 'react';
import {ImageResponse} from 'next/dist/compiled/@vercel/og/index.node.js';
import illustrations from './illustrations.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const outDir = path.join(root, 'public/images/articles');
const size = {width: 1376, height: 768};

fs.mkdirSync(outDir, {recursive: true});

const only = process.argv.slice(2);

for (const [name, svg] of Object.entries(illustrations)) {
  if (only.length && !only.includes(name)) continue;
  const image = new ImageResponse(
    React.createElement('img', {
      src: `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`,
      ...size,
    }),
    size,
  );
  const file = path.join(outDir, `${name}.png`);
  fs.writeFileSync(file, Buffer.from(await image.arrayBuffer()));
  console.log(`${name}.png  ${Math.round(fs.statSync(file).size / 1024)}KB`);
}
