import fs from 'fs';

const header = fs.readFileSync('scripts/formatted_header.html', 'utf8');
console.log(header);
