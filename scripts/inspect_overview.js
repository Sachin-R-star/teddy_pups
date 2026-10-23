import fs from 'fs';

const header = fs.readFileSync('scripts/formatted_header.html', 'utf8');
const footer = fs.readFileSync('scripts/formatted_footer.html', 'utf8');

console.log('=== HEADER OVERVIEW ===');
// print without huge svgs
const cleanHeader = header.replace(/<svg[\s\S]*?<\/svg>/gi, (s) => `<svg (${s.length} chars)></svg>`);
console.log(cleanHeader);

console.log('\n=== FOOTER OVERVIEW ===');
const cleanFooter = footer.replace(/<svg[\s\S]*?<\/svg>/gi, (s) => `<svg (${s.length} chars)></svg>`);
console.log(cleanFooter);
