import fs from 'fs';

const header = fs.readFileSync('scripts/live_header.html', 'utf8');
const footer = fs.readFileSync('scripts/live_footer.html', 'utf8');

console.log('=== LIVE HEADER (first 1000 chars) ===');
console.log(header.slice(0, 1000));

console.log('\n=== LIVE FOOTER (first 1000 chars) ===');
console.log(footer.slice(0, 1000));
