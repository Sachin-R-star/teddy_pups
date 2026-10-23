import fs from 'fs';

const html = fs.readFileSync('scripts/live_home.html', 'utf8');

// Match all sections
const sectionRegex = /<section[\s\S]*?<\/section>/gi;
let match;
let i = 1;
while ((match = sectionRegex.exec(html)) !== null) {
  const sectionContent = match[0];
  const opening = sectionContent.match(/<section[^>]*>/i)?.[0];
  fs.writeFileSync(`scripts/live_section_${i}.html`, sectionContent);
  console.log(`Saved scripts/live_section_${i}.html (${opening}, length: ${sectionContent.length})`);
  i++;
}
