const fs = require('fs');

for (const p of ['happy-families', 'how-it-works', 'faq', 'contact']) {
  const html = fs.readFileSync(`scraped/${p}.html`, 'utf8');
  console.log(`\n=================== ${p.toUpperCase()} ===================`);
  const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  console.log('h1:', h1 ? h1[1].replace(/<[^>]+>/g, '').trim() : null);

  const h2s = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
  console.log('h2s:', h2s);

  const tpClasses = [...html.matchAll(/class="([^"]*tp-[a-zA-Z0-9_-]+[^"]*)"/g)].map(m => m[1]);
  const unique = [...new Set(tpClasses.map(c => c.split(' ').filter(x => x.startsWith('tp-'))).flat())];
  console.log('tp- classes:', unique.slice(0, 15));
}
