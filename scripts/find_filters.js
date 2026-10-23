const fs = require('fs');
const html = fs.readFileSync('scraped/puppies.html', 'utf8');

// Look for where, breed, boy or girl
const whereMatch = html.match(new RegExp('where|breed|boy|girl', 'gi'));
console.log('Keyword occurrences:', whereMatch ? whereMatch.length : 0);

// Find surrounding context of 'Where' or 'Breed'
let idx = 0;
while ((idx = html.indexOf('Where', idx + 1)) !== -1) {
  console.log('Where context:', html.substring(idx - 100, idx + 200));
  break;
}
idx = 0;
while ((idx = html.indexOf('Breed', idx + 1)) !== -1) {
  console.log('Breed context:', html.substring(idx - 100, idx + 200));
  break;
}
