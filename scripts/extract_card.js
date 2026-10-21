const fs = require('fs');
const html = fs.readFileSync('scraped/puppies.html', 'utf8');
const start = html.indexOf('<a class="tp-sketch"');
const end = html.indexOf('</a>', start);
console.log(html.slice(start, end + 4));
