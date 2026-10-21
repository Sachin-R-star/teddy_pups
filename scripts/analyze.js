const fs = require('fs');

const indexHtml = fs.readFileSync('scraped/index.html', 'utf8');
const puppiesHtml = fs.readFileSync('scraped/puppies.html', 'utf8');

console.log('Index HTML size:', indexHtml.length);
console.log('Puppies HTML size:', puppiesHtml.length);

// Extract all <section> or main elements
function extractSections(html) {
  const sections = [];
  const regex = /<section[\s\S]*?<\/section>/g;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const s = match[0];
    const id = (s.match(/id="([^"]+)"/) || [])[1];
    const cl = (s.match(/class="([^"]+)"/) || [])[1];
    const h2 = (s.match(/<h2[^>]*>([\s\S]*?)<\/h2>/) || [])[1];
    const h1 = (s.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1];
    sections.push({ id, cl, h1: h1 ? h1.replace(/<[^>]+>/g, '').trim() : null, h2: h2 ? h2.replace(/<[^>]+>/g, '').trim() : null, length: s.length });
  }
  return sections;
}

console.log('--- Home Page Sections ---');
console.log(extractSections(indexHtml));

console.log('--- Puppies Page Sections ---');
console.log(extractSections(puppiesHtml));
