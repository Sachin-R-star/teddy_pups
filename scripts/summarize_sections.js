import fs from 'fs';

for (let i = 1; i <= 8; i++) {
  const file = `scripts/live_section_${i}.html`;
  if (!fs.existsSync(file)) continue;
  const content = fs.readFileSync(file, 'utf8');

  // get h1, h2, h3
  const headings = content.match(/<h[1-4][^>]*>[\s\S]*?<\/h[1-4]>/gi) || [];
  const cleanHeadings = headings.map(h => h.replace(/<[^>]+>/g, '').trim());

  console.log(`\n================== SECTION ${i} ==================`);
  console.log('Headings:', cleanHeadings);
  console.log('Length:', content.length);
  // find first 500 chars of text
  const cleanText = content.replace(/<style[\s\S]*?<\/style>/gi, '')
                           .replace(/<script[\s\S]*?<\/script>/gi, '')
                           .replace(/<svg[\s\S]*?<\/svg>/gi, '')
                           .replace(/<[^>]+>/g, ' ')
                           .replace(/\s+/g, ' ')
                           .trim();
  console.log('Snippet:', cleanText.slice(0, 300));
}
