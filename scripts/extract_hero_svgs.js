import fs from 'fs';

const hero = fs.readFileSync('scripts/reference_hero.html', 'utf8');

// Extract the wave underline under "every puppy is family"
const noteMatch = hero.match(/<span class="tp-hero__note[^"]*"[^>]*>([\s\S]*?)<\/span>/);
if (noteMatch) {
  console.log('--- Note content ---');
  console.log(noteMatch[0]);
}

// Extract cartoon teddy SVG
const teddyIdx = hero.indexOf('tp-hero__teddy');
if (teddyIdx !== -1) {
  console.log('--- Teddy SVG ---');
  const endTeddy = hero.indexOf('</div>', teddyIdx + 500);
  console.log(hero.slice(teddyIdx - 50, teddyIdx + 1200));
}

// Extract quilt and quilt edge SVG
const quiltIdx = hero.indexOf('tp-quilt');
if (quiltIdx !== -1) {
  console.log('--- Quilt HTML ---');
  console.log(hero.slice(quiltIdx - 50, quiltIdx + 1200));
}

// Extract all seats in lineup
const seats = [...hero.matchAll(/<li class="tp-lineup__seat"[\s\S]*?<\/li>/g)].map(m => m[0]);
console.log('Lineup seats count:', seats.length);
if (seats[0]) fs.writeFileSync('scripts/seat_0.html', seats[0]);
if (seats[1]) fs.writeFileSync('scripts/seat_1.html', seats[1]);
fs.writeFileSync('scripts/all_seats.html', seats.join('\n\n'));
