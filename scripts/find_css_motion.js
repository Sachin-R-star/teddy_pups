import fs from 'fs';

const css = fs.readFileSync('scripts/ref_style_2.css', 'utf8');

function findRules(term) {
  const regex = new RegExp(`[^{}]*${term}[^{}]*\\{[^{}]*\\}`, 'gi');
  return css.match(regex) || [];
}

console.log('tp-peek:', findRules('tp-peek'));
console.log('tp-lineup:', findRules('tp-lineup'));
console.log('pup-stop:', findRules('pup-stop'));
console.log('pup-buddy:', findRules('pup-buddy'));
console.log('data-pup:', findRules('data-pup'));
