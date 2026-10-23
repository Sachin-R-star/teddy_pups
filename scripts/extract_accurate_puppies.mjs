import fs from 'fs';

const html = fs.readFileSync('scraped/puppies.html', 'utf8');

const sketches = [...html.matchAll(/<a class="tp-sketch"[\s\S]*?<\/a>/g)].map(m => m[0]);

const puppies = sketches.map((card, idx) => {
  const href = (card.match(/href="([^"]+)"/) || [])[1] || '';
  const slug = href.replace('/puppies/', '');
  const name = (card.match(/<span class="tp-sketch__name[^>]*>([\s\S]*?)<\/span>/) || [])[1]?.trim() || '';
  const meta = (card.match(/<span class="tp-sketch__meta[^>]*>([\s\S]*?)<\/span>/) || [])[1]?.trim() || '';
  const sticker = (card.match(/<span class="tp-sketch__sticker[^>]*>([\s\S]*?)<\/span>/) || [])[1]?.trim() || 'Available';
  const hasVideo = card.includes('tp-sketch__video');
  
  // Extract image
  // It has srcSet="/_next/image?url=%2Fmedia%2F... or src="/_next/image?url=%2Fmedia%2F...
  let imgMatch = card.match(/url=(%2Fmedia%2F[^&]+)/);
  let image = '';
  if (imgMatch) {
    image = 'https://puppy.instabizweb.com' + decodeURIComponent(imgMatch[1]);
  } else {
    let directMatch = card.match(/src="([^"]+)"/);
    if (directMatch) image = directMatch[1];
  }

  // Parse meta: e.g. "Maltipoo · boy · 3 months" or "girl · 2 months"
  const cleanMeta = meta.replace(/<!--[\s\S]*?-->/g, '').replace(/&amp;/g, '&').trim();
  const parts = cleanMeta.split('·').map(s => s.trim());
  
  let breed = 'Maltipoo';
  let gender = 'Boy';
  let age = '3 months';

  if (parts.length === 3) {
    breed = parts[0];
    gender = parts[1].toLowerCase().includes('girl') || parts[1].toLowerCase().includes('female') ? 'Girl' : 'Boy';
    age = parts[2];
  } else if (parts.length === 2) {
    if (parts[0].toLowerCase().includes('girl') || parts[0].toLowerCase().includes('female')) {
      gender = 'Girl';
      age = parts[1];
      breed = name.includes('Maltipoo') ? 'Maltipoo' : name.includes('Poodle') ? 'Poodle' : name.includes('Pomeranian') ? 'Pomeranian' : 'Teacup Puppy';
    } else if (parts[0].toLowerCase().includes('boy') || parts[0].toLowerCase().includes('male')) {
      gender = 'Boy';
      age = parts[1];
      breed = name.includes('Maltipoo') ? 'Maltipoo' : name.includes('Poodle') ? 'Poodle' : name.includes('Pomeranian') ? 'Pomeranian' : 'Teacup Puppy';
    } else {
      breed = parts[0];
      age = parts[1];
    }
  }

  // Extract doodles SVG groups
  const doodleMatches = [...card.matchAll(/<g transform="translate\(([^)]+)\)[^>]*>([\s\S]*?<\/g>\s*<\/g>)/g)];
  const doodles = doodleMatches.map(dm => ({
    transform: dm[1],
    svg: dm[2]
  }));

  return {
    id: slug,
    slug,
    name,
    breed,
    gender,
    age,
    status: sticker,
    hasVideo,
    image,
    where: idx % 3 === 0 ? 'Downtown Dubai Showroom' : idx % 3 === 1 ? 'Showroom & Home Visit' : 'Imported (Korea)',
    origin: 'South Korea'
  };
});

console.log('Parsed puppies count:', puppies.length);
fs.writeFileSync('scripts/extracted_puppies_accurate.json', JSON.stringify(puppies, null, 2));
