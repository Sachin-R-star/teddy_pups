const fs = require('fs');
const html = fs.readFileSync('scraped/index.html', 'utf8');

const regex = /<div[^>]*pup-stop[^>]*>[\s\S]*?<\/div>/gi;
const matches = html.match(/<div[^>]*class="[^"]*pup-stop[^"]*"[^>]*>/gi) || [];
console.log('pup-stop tags:', matches);

// Check if there is a fixed or absolute runner in the live page:
const pupRunner = html.match(/<div[^>]*pup-[^>]*>/gi) || [];
console.log('other pup- elements:', pupRunner.slice(0, 20));
