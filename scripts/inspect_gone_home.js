const fs = require('fs');
const html = fs.readFileSync('scraped/gone-home.html', 'utf8');

console.log('gone-home size:', html.length);
// Find all hrefs
const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map(m => m[1]);
console.log('Links in gone-home:', hrefs.filter(h => h.startsWith('/puppies/')));

// Find puppy cards or polaroids
const polaroids = [...html.matchAll(/class="([^"]*tp-[^"]*)"/g)].map(m => m[1]);
console.log('tp- classes in gone-home:', [...new Set(polaroids)]);
