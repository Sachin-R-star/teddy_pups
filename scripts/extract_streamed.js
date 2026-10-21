const fs = require('fs');
const html = fs.readFileSync('scraped/puppy-maltipoo-max-male.html', 'utf8');

// Find all script tags or next_f
const scripts = [...html.matchAll(/<script>self\.__next_f\.push\(\[1,\s*"([\s\S]*?)"\]\)<\/script>/g)];
console.log('Script chunks count:', scripts.length);

let fullStreamed = '';
for (const s of scripts) {
  // unescape json string
  try {
    const raw = JSON.parse('"' + s[1] + '"');
    fullStreamed += raw;
  } catch (e) {
    fullStreamed += s[1];
  }
}

console.log('Streamed length:', fullStreamed.length);
fs.writeFileSync('scraped/puppy-max-streamed.txt', fullStreamed);

// Check if Max, Maltipoo, etc. are in streamed
console.log('Has Max:', fullStreamed.includes('Max'));
console.log('Has Maltipoo:', fullStreamed.includes('Maltipoo'));
