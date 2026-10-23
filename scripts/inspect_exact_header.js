import fs from 'fs';

const header = fs.readFileSync('scripts/live_header.html', 'utf8');

// print the navbar structure
console.log('--- NAVBAR HTML ---');
console.log(header);
