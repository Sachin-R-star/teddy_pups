import fs from 'fs';

async function parse() {
  const text = await fetch('https://puppy.instabizweb.com/_next/static/chunks/1wa3jfz4v5w2v.js').then(r=>r.text());
  fs.writeFileSync('scripts/chunk_home.js', text);
  console.log('Saved chunk_home.js, size:', text.length);

  // Search for hero and teddy mentions
  const lines = text.split(/[;,]/);
  const matches = lines.filter(l => l.includes('tp-hero') || l.includes('tp-lineup') || l.includes('pup-stop') || l.includes('Teddy') || l.includes('peekaboo'));
  console.log('Found matches:', matches.length);
  matches.slice(0, 30).forEach(m => console.log('MATCH:', m.slice(0, 150)));
}
parse();
