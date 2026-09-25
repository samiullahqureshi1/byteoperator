import fs from 'fs';
import path from 'path';

const appDir = path.resolve(process.cwd(), 'app');

function checkAndAddUseClient(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      if (file !== 'api' && !filePath.includes('/app/api')) {
        checkAndAddUseClient(filePath);
      }
    } else if (file.endsWith('.tsx') || (file.startsWith('use') && file.endsWith('.ts'))) {
      let content = fs.readFileSync(filePath, 'utf8');
      const usesHooks = /use(State|Effect|Ref|Callback|Memo|Id|Context|Reducer|LayoutEffect|ImperativeHandle)/.test(content);
      const isClientCandidate = usesHooks || content.includes('window.') || content.includes('document.');

      // Skip page.tsx and layout.tsx if they export metadata
      if (file === 'page.tsx' || file === 'layout.tsx') {
        return;
      }

      if (isClientCandidate && !content.startsWith("'use client'") && !content.startsWith('"use client"')) {
        content = `'use client';\n\n` + content;
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Added 'use client' to: ${path.relative(process.cwd(), filePath)}`);
      }
    }
  });
}

checkAndAddUseClient(appDir);
console.log('Finished updating hooks with use client.');
