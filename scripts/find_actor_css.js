import fs from 'fs';

const css = fs.readFileSync('scripts/ref_style_2.css', 'utf8');

function findRules(term) {
  const regex = new RegExp(`[^{}]*${term}[^{}]*\\{[^{}]*\\}`, 'gi');
  return css.match(regex) || [];
}

console.log('pup-layer:', findRules('pup-layer'));
console.log('pup-actor:', findRules('pup-actor'));
