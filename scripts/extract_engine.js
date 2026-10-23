import fs from 'fs';

const chunk = fs.readFileSync('scripts/chunk_home.js', 'utf8');

const idx = chunk.indexOf('setPose');
console.log('Found setPose at index:', idx);
if (idx !== -1) {
  const start = Math.max(0, idx - 1500);
  const end = Math.min(chunk.length, idx + 2500);
  fs.writeFileSync('scripts/extracted_teddy_engine.js', chunk.slice(start, end));
  console.log('Saved extracted_teddy_engine.js');
}
