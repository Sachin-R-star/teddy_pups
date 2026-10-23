import fs from 'fs';

const footer = fs.readFileSync('scripts/live_footer.html', 'utf8');
console.log('FOOTER LENGTH:', footer.length);
fs.writeFileSync('scripts/formatted_footer.html', footer);

const header = fs.readFileSync('scripts/live_header.html', 'utf8');
console.log('HEADER LENGTH:', header.length);
fs.writeFileSync('scripts/formatted_header.html', header);
