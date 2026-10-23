import fs from 'fs';

const header = fs.readFileSync('scripts/formatted_header.html', 'utf8');
const lastSvg = header.match(/<svg[^>]*class="tp-header__hem"[\s\S]*?<\/svg>/i) || header.match(/<svg[\s\S]*?<\/svg>$/i);
if (lastSvg) {
  console.log('HEADER BOTTOM SVG:');
  console.log(lastSvg[0]);
} else {
  // find all svgs in header
  const svgs = header.match(/<svg[\s\S]*?<\/svg>/gi) || [];
  console.log('Last SVG in header:');
  console.log(svgs[svgs.length - 1]);
}
