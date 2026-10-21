const fs = require('fs');

// Let's inspect index.html, puppies.html, etc.
const puppiesHtml = fs.readFileSync('scraped/puppies.html', 'utf8');

// Find all puppy cards in puppies.html
// Let's search for links to /puppies/
const puppyLinks = [...puppiesHtml.matchAll(/href="(\/puppies\/[a-zA-Z0-9_-]+)"/g)].map(m => m[1]);
console.log('Unique puppy links found in puppies.html:', [...new Set(puppyLinks)]);

// Let's see how each puppy card is structured in puppies.html
const cardMatches = puppiesHtml.match(/<article[\s\S]*?<\/article>/g) || puppiesHtml.match(/<li[\s\S]*?<\/li>/g);
console.log('Possible article or li items count:', cardMatches ? cardMatches.length : 0);

// Let's inspect the first 2 puppy card blocks
const articleRegex = /<article[\s\S]*?<\/article>/g;
let aMatch;
let count = 0;
while ((aMatch = articleRegex.exec(puppiesHtml)) !== null && count < 3) {
  console.log(`\n--- Card ${count + 1} ---`);
  console.log(aMatch[0].slice(0, 500));
  count++;
}
