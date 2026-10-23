import fs from 'fs';

const header = fs.readFileSync('scripts/formatted_header.html', 'utf8');
const cleanHeader = header.replace(/<svg[\s\S]*?<\/svg>/gi, (s) => `<svg (${s.length} chars)></svg>`);
console.log(cleanHeader);
