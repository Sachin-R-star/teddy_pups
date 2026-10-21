const fs = require('fs');

function parsePuppies(filename, isGoneHome = false) {
  const html = fs.readFileSync(filename, 'utf8');
  const puppyMatches = [...html.matchAll(/<a class="tp-sketch"[\s\S]*?<\/a>/g)];
  console.log(`Found ${puppyMatches.length} cards in ${filename}`);

  const puppies = [];
  for (const m of puppyMatches) {
    const cardHtml = m[0];
    const href = (cardHtml.match(/href="([^"]+)"/) || [])[1] || '';
    const slug = href.replace('/puppies/', '');
    const ariaLabel = (cardHtml.match(/aria-label="([^"]+)"/) || [])[1] || '';
    const name = (cardHtml.match(/<span class="tp-sketch__name[^>]*>([\s\S]*?)<\/span>/) || [])[1] || '';
    const meta = (cardHtml.match(/<span class="tp-sketch__meta[^>]*>([\s\S]*?)<\/span>/) || [])[1] || '';
    const sticker = (cardHtml.match(/<span class="tp-sketch__sticker[^>]*>([\s\S]*?)<\/span>/) || [])[1] || (isGoneHome ? 'Gone Home' : 'Available');
    const hasVideo = cardHtml.includes('tp-sketch__video');

    // Extract image url
    // srcSet or src
    const imgMatch = cardHtml.match(/src="([^"]+)"/) || cardHtml.match(/srcSet="([^"]+)"/);
    let imageUrl = '';
    if (imgMatch) {
      const srcVal = imgMatch[1];
      // If it's a next/image url, extract original url
      const urlParam = srcVal.match(/url=([^&]+)/);
      if (urlParam) {
        imageUrl = decodeURIComponent(urlParam[1]);
      } else {
        imageUrl = srcVal.split(' ')[0];
      }
    }

    const cleanMeta = meta.replace(/<!--[\s\S]*?-->/g, '').replace(/&amp;/g, '&').trim();

    // Parse breed, gender, age from cleanMeta or ariaLabel
    // e.g. "Maltipoo · boy · 3 months"
    const parts = cleanMeta.split('·').map(s => s.trim());
    const breed = parts[0] || '';
    const gender = parts[1] || '';
    const age = parts[2] || '';

    puppies.push({
      slug,
      href,
      name: name.trim(),
      breed,
      gender,
      age,
      status: sticker.trim(),
      hasVideo,
      image: imageUrl.startsWith('http') ? imageUrl : 'https://puppy.instabizweb.com' + imageUrl,
      ariaLabel
    });
  }
  return puppies;
}

const available = parsePuppies('scraped/puppies.html', false);
const goneHome = parsePuppies('scraped/gone-home.html', true);

console.log('Available count:', available.length);
console.log('Sample available:', available[0]);
console.log('Gone home count:', goneHome.length);
if (goneHome[0]) console.log('Sample gone home:', goneHome[0]);

fs.writeFileSync('scripts/puppies_data.json', JSON.stringify({ available, goneHome }, null, 2));
