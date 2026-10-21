import fs from 'fs';

const html = fs.readFileSync('scraped/happy-families.html', 'utf8');

// Find all buttons or prints
const buttonMatches = [...html.matchAll(/<button[^>]*class="[^"]*tp-wall__print[^"]*"[\s\S]*?<\/button>/g)];
console.log('Prints found:', buttonMatches.length);

const polaroids = buttonMatches.map((m, idx) => {
  const btn = m[0];
  const ariaLabel = (btn.match(/aria-label="([^"]+)"/) || [])[1] || '';
  const alt = (btn.match(/alt="([^"]+)"/) || [])[1] || '';
  const tilt = (btn.match(/--tilt:([^;"]+)/) || [])[1] || '0deg';
  const tapeColor = (btn.match(/--tape:([^;"]+)/) || [])[1] || '#f6d79a';

  const imgMatch = btn.match(/src="([^"]+)"/) || btn.match(/srcSet="([^"]+)"/);
  let image = '';
  if (imgMatch) {
    const srcVal = imgMatch[1];
    const urlParam = srcVal.match(/url=([^&]+)/);
    if (urlParam) {
      image = decodeURIComponent(urlParam[1]);
    } else {
      image = srcVal.split(' ')[0];
    }
  }

  return {
    id: idx + 1,
    image: image.startsWith('http') ? image : 'https://puppy.instabizweb.com' + image,
    label: ariaLabel,
    caption: alt || 'A happy TeddyPups family with their new puppy in Dubai',
    tilt: tilt.trim(),
    tapeColor: tapeColor.trim()
  };
});

console.log('Sample polaroids:', polaroids.slice(0, 3));
fs.writeFileSync('scripts/parsed_polaroids.json', JSON.stringify(polaroids, null, 2));
console.log(`Saved ${polaroids.length} polaroids to scripts/parsed_polaroids.json`);
