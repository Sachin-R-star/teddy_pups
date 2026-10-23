import fs from 'fs';

const html = fs.readFileSync('scraped/index.html', 'utf8');

// Find tp-hero
const heroStart = html.indexOf('class="tp-scene tp-hero');
const heroEnd = html.indexOf('</section>', heroStart);
console.log('Hero section start:', heroStart, 'end:', heroEnd);
const heroHtml = html.slice(heroStart, heroEnd + 10);
fs.writeFileSync('scripts/reference_hero.html', heroHtml);

// Find tp-header
const headerStart = html.indexOf('<header');
const headerEnd = html.indexOf('</header>', headerStart);
const headerHtml = html.slice(headerStart, headerEnd + 9);
fs.writeFileSync('scripts/reference_header.html', headerHtml);

console.log('Saved files. Inspecting hero elements...');
const tags = [...heroHtml.matchAll(/class="([^"]+)"/g)].map(m => m[1]);
console.log('Hero classes:', [...new Set(tags)]);
