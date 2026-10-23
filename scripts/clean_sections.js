import fs from 'fs';

for (let i = 1; i <= 8; i++) {
  const file = `scripts/live_section_${i}.html`;
  if (!fs.existsSync(file)) continue;
  const content = fs.readFileSync(file, 'utf8');

  // remove huge svgs
  const clean = content.replace(/<svg[\s\S]*?<\/svg>/gi, (s) => `<svg (${s.length}c)></svg>`);
  fs.writeFileSync(`scripts/clean_section_${i}.html`, clean);
  console.log(`Saved clean_section_${i}.html, length: ${clean.length}`);
}
