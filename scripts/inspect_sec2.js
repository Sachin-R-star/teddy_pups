import fs from 'fs';

const sec2 = fs.readFileSync('scripts/clean_section_2.html', 'utf8');

// print first 2000 chars of sec2
console.log('=== SECTION 2 FIRST 2000 CHARS ===');
console.log(sec2.slice(0, 2000));
