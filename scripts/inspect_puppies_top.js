import fs from 'fs';

const html = fs.readFileSync('scripts/live_puppies.html', 'utf8');
const main = html.match(/<main[\s\S]*?<\/main>/i)?.[0] || '';

// print the first 2500 chars of main
console.log('=== PUPPIES MAIN (first 2500 chars) ===');
console.log(main.slice(0, 2500));
