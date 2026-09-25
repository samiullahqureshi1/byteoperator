import fs from 'fs';
import path from 'path';

const componentsDir = path.resolve(process.cwd(), 'app/components');

function checkAndAddUseClient(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      checkAndAddUseClient(filePath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      let content = fs.readFileSync(filePath, 'utf8');
      const usesHooks = /use(State|Effect|Ref|Callback|Memo|Id|Context|Reducer|LayoutEffect|ImperativeHandle)/.test(content);
      const isClientCandidate = usesHooks || content.includes('window.') || content.includes('document.');

      if (isClientCandidate && !content.startsWith("'use client'") && !content.startsWith('"use client"')) {
        content = `'use client';\n\n` + content;
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Added 'use client' to: ${path.relative(process.cwd(), filePath)}`);
      }
    }
  });
}

checkAndAddUseClient(componentsDir);
console.log('Finished updating components with use client.');
