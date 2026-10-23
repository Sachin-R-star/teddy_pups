import fs from 'fs';

const html = fs.readFileSync('scripts/live_puppies.html', 'utf8');

// Find filter bar
const filterMatch = html.match(/<nav aria-label="Filter puppies"[\s\S]*?<\/nav>/i) || html.match(/<div class="tp-filter[\s\S]*?<\/div>/i) || html.match(/<form[\s\S]*?<\/form>/i);
if (filterMatch) {
  console.log('=== FILTER BAR ===');
  console.log(filterMatch[0].slice(0, 1000));
} else {
  // search for "All breeds" or "Filter"
  const idx = html.indexOf('Filter');
  if (idx > -1) {
    console.log('Around "Filter":', html.slice(idx, idx + 1000));
  }
}

// Find a puppy card
const cardMatch = html.match(/<li class="tp-pup-card[\s\S]*?<\/li>/i) || html.match(/<a class="tp-pup-card[\s\S]*?<\/a>/i) || html.match(/<article[\s\S]*?<\/article>/i);
if (cardMatch) {
  console.log('=== CARD MATCH ===');
  console.log(cardMatch[0].slice(0, 1000));
} else {
  const cardIdx = html.indexOf('tp-card') || html.indexOf('tp-pup');
  console.log('Card idx snippet:', html.slice(cardIdx, cardIdx + 1000));
}
