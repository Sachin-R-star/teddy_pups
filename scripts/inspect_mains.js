import fs from 'fs';

const html = fs.readFileSync('scraped/how-it-works.html', 'utf8');
const idx = html.indexOf('id="why"');
console.log(html.substring(idx, idx + 1200));



