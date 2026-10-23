import fs from 'fs';

const text = fs.readFileSync('scripts/chunk_pup_actor.js', 'utf8');

const idx = text.indexOf('pup-layer');
console.log('pup-layer at:', idx);
if (idx !== -1) {
  console.log(text.slice(idx - 200, idx + 800));
}
