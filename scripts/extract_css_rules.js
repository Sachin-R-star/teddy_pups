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

console.log('=== HEADER RULES ===');
console.log(extractRules('tp-header').join('\n\n'));

console.log('\n=== FOOTER RULES ===');
console.log(extractRules('tp-footer').join('\n\n'));

console.log('\n=== LOGO RULES ===');
console.log(extractRules('tp-header__logo').join('\n\n'));
