const fs = require('fs');
const html = fs.readFileSync('scraped/puppy-maltipoo-max-male.html', 'utf8');

console.log('puppy detail size:', html.length);
const tpClasses = [...html.matchAll(/class="([^"]*tp-[^"]*)"/g)].map(m => m[1]);
console.log('tp- classes in puppy detail:', [...new Set(tpClasses)]);

// Let's find headings and content sections
const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
console.log('h1:', h1 ? h1[1].replace(/<[^>]+>/g, '').trim() : null);

// Look for price or details
const details = [...html.matchAll(/<dt[^>]*>([\s\S]*?)<\/dt>\s*<dd[^>]*>([\s\S]*?)<\/dd>/g)].map(m => ({
  label: m[1].replace(/<[^>]+>/g, '').trim(),
  value: m[2].replace(/<[^>]+>/g, '').trim()
}));
console.log('Puppy details / specs:', details);
