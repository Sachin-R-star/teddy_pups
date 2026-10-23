import fs from 'fs';

const pages = ['puppies', 'gone-home', 'happy-families', 'how-it-works', 'faq', 'contact'];

pages.forEach(p => {
  const file = `scripts/live_${p}.html`;
  if (!fs.existsSync(file)) return;
  const content = fs.readFileSync(file, 'utf8');
  const mainMatch = content.match(/<main[\s\S]*?<\/main>/i);
  if (!mainMatch) return;
  const main = mainMatch[0];
  const h1 = main.match(/<h1[^>]*>[\s\S]*?<\/h1>/i)?.[0]?.replace(/<[^>]+>/g, '').trim();
  const headings = (main.match(/<h[2-3][^>]*>[\s\S]*?<\/h[2-3]>/gi) || []).slice(0, 4).map(h => h.replace(/<[^>]+>/g, '').trim());
  const classes = main.match(/class="([^"]*)"/i)?.[1];
  console.log(`\n=== PAGE: ${p} ===`);
  console.log('H1:', h1);
  console.log('Headings:', headings);
  console.log('Main class:', classes);
});
