import fs from 'fs';
import path from 'path';

const appDir = path.resolve(process.cwd(), 'app');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.next') {
        walkDir(filePath, callback);
      }
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      callback(filePath);
    }
  });
}

walkDir(appDir, (filePath) => {
  // Skip router-compat itself
  if (filePath.endsWith('router-compat.tsx') || filePath.endsWith('image-compat.tsx') || filePath.endsWith('money-compat.tsx')) {
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // Replace react-router and react-router-dom
  if (content.includes("from 'react-router'") || content.includes('from "react-router"')) {
    content = content.replace(/from\s+['"]react-router['"]/g, "from '~/lib/router-compat'");
    changed = true;
  }

  if (content.includes("from 'react-router-dom'") || content.includes('from "react-router-dom"')) {
    content = content.replace(/from\s+['"]react-router-dom['"]/g, "from '~/lib/router-compat'");
    changed = true;
  }

  // Replace storefrontapi.generated
  if (content.includes("from 'storefrontapi.generated'") || content.includes('from "storefrontapi.generated"')) {
    content = content.replace(/from\s+['"]storefrontapi\.generated['"]/g, "from '~/lib/types'");
    changed = true;
  }

  // Replace @shopify/hydrogen imports in components
  if (content.includes('@shopify/hydrogen')) {
    // Check specific usages
    content = content.replace(/import\s*\{([^}]*)\}\s*from\s*['"]@shopify\/hydrogen['"]/g, (match, imports) => {
      const items = imports.split(',').map((s) => s.trim()).filter(Boolean);
      const replaced = [];
      let usesImage = false;
      let usesMoney = false;

      items.forEach((item) => {
        if (item === 'Image') usesImage = true;
        else if (item === 'Money') usesMoney = true;
        else if (item === 'useNonce') {
          // Handled separately or dummy
        }
      });

      let res = '';
      if (usesImage) {
        res += `import {Image} from '~/lib/image-compat';\n`;
      }
      if (usesMoney) {
        res += `import {Money} from '~/lib/money-compat';\n`;
      }
      if (items.includes('useNonce')) {
        res += `const useNonce = () => undefined;\n`;
      }
      return res || `// Removed hydrogen import: ${match}`;
    });
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${path.relative(process.cwd(), filePath)}`);
  }
});

console.log('Migration script complete.');
