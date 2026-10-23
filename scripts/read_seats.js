import fs from 'fs';

const html = fs.readFileSync('scripts/reference_hero.html', 'utf8');

// The lineup section
const lineupStart = html.indexOf('<ul class="tp-lineup"');
const lineupEnd = html.indexOf('</ul>', lineupStart);
const lineup = html.slice(lineupStart, lineupEnd + 5);

fs.writeFileSync('scripts/extracted_lineup.html', lineup);
console.log('Lineup length:', lineup.length);

// Also look for teddy pup
const teddyStart = html.indexOf('<div data-behind="true"');
const teddyEnd = html.indexOf('</div></div></div>', teddyStart);
const teddy = html.slice(teddyStart, teddyEnd + 18);
fs.writeFileSync('scripts/extracted_teddy.html', teddy);
console.log('Teddy length:', teddy.length);

// Also look for quilt
const quiltStart = html.indexOf('<div aria-hidden="true" class="tp-quilt">');
const quiltEnd = html.indexOf('</div>', quiltStart + 20);
const quilt = html.slice(quiltStart, quiltEnd + 6);
fs.writeFileSync('scripts/extracted_quilt.html', quilt);
console.log('Quilt length:', quilt.length);
