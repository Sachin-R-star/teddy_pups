import fs from 'fs';

const css = fs.readFileSync('10jf32vdx50lp.css', 'utf8');

function findRules(selector) {
  const regex = new RegExp(`(?<=\\}|^)[^{}]*?${selector}[^{}]*?\\{[^{}]*?\\}`, 'g');
  const matches = [...css.matchAll(regex)].map(m => m[0]);
  console.log(`=== RULES FOR ${selector} ===`);
  matches.forEach(m => console.log(m));
}

findRules('whatsapp-bar');
findRules('--bar-h');
