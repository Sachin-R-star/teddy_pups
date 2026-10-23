import fs from 'fs';

const html = fs.readFileSync('scripts/reference_hero.html', 'utf8');

const idx = html.indexOf('tp-hero__teddy');
console.log('tp-hero__teddy index:', idx);
if (idx !== -1) {
  const start = html.lastIndexOf('<div', idx);
  // find matching close tag or next section
  const nextSection = html.indexOf('<div aria-hidden="true" class="tp-quilt">', idx);
  const teddyHtml = html.slice(start, nextSection);
  fs.writeFileSync('scripts/extracted_teddy.html', teddyHtml);
  console.log('Teddy length:', teddyHtml.length);
}
