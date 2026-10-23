import fs from 'fs';

const css = fs.readFileSync('scripts/ref_style_2.css', 'utf8');

console.log('Total css size:', css.length);

// check if it has font variables or root
const rootMatch = css.match(/:root[\s\S]*?\}/);
console.log('Root:', rootMatch ? rootMatch[0].slice(0, 300) : 'none');

// check key selectors
const sampleSelectors = [
  'tp-scene',
  'tp-hero',
  'tp-meet',
  'tp-paths',
  'tp-chat',
  'tp-passport',
  'tp-dusk',
  'tp-night',
  'tp-home',
  'tp-footer',
  'tp-header',
  'tp-lineup',
  'tp-quilt',
  'tp-basket',
  'tp-moon',
  'btn-primary',
  'btn-ghost',
  'btn-whatsapp'
];

sampleSelectors.forEach(sel => {
  const found = css.includes(sel);
  console.log(`Selector "${sel}": ${found ? 'FOUND' : 'MISSING'}`);
});
