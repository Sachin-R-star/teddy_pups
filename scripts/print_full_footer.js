import fs from 'fs';

const footer = fs.readFileSync('scripts/formatted_footer.html', 'utf8');
console.log(footer);
