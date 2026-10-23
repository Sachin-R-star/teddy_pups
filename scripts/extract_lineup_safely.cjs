const fs = require('fs');
const code = fs.readFileSync('src/pages/Home.jsx', 'utf8');

const sIdx = code.indexOf('tp-lineup" aria-label');
const eIdx = code.indexOf('tp-lineup__wings');
console.log('Lineup found from', sIdx, 'to', eIdx);
const chunk = code.substring(sIdx - 10, eIdx);
fs.writeFileSync('scripts/extracted_lineup.jsx', chunk, 'utf8');
console.log('Wrote extracted_lineup.jsx');
