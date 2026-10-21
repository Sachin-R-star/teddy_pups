const fs = require('fs');

const pages = ['index', 'puppies', 'gone-home', 'happy-families', 'how-it-works', 'faq', 'contact', 'puppy-maltipoo-max-male'];

for (const p of pages) {
  const html = fs.readFileSync(`scraped/${p}.html`, 'utf8');
  const mainMatch = html.match(/<main id="main"[^>]*>([\s\S]*?)<\/main>/);
  if (mainMatch) {
    const mainContent = mainMatch[1];
    console.log(`\n=== MAIN: ${p} === (Length: ${mainContent.length})`);
    // Find all sub-tags or major classes inside main
    const classes = [...mainContent.matchAll(/class="([^"]+)"/g)].map(m => m[1]);
    const tpCl = [...new Set(classes.map(c => c.split(' ').filter(x => x.startsWith('tp-'))).flat())];
    console.log('Key tp- classes:', tpCl);
  }
}
