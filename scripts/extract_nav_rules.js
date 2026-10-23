import fs from 'fs';

const css = fs.readFileSync('scripts/ref_style_2.css', 'utf8');

function extractRules(selector) {
  const regex = new RegExp(`([^}{]*${selector}[^}{]*\\{[^}]*\\})`, 'gi');
  let match;
  const rules = [];
  while ((match = regex.exec(css)) !== null) {
    rules.push(match[1]);
  }
  return rules;
}

console.log('=== TP-NAV-LINK RULES ===');
console.log(extractRules('tp-nav-link').join('\n\n'));
