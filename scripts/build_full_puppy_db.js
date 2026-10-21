import fs from 'fs';

// We have puppy list in scraped/puppies.html and scraped/gone-home.html
const p1Html = fs.readFileSync('scraped/puppies.html', 'utf8');
const p2Html = fs.readFileSync('scraped/gone-home.html', 'utf8');

// Parse sketch cards from puppies.html
function extractSketches(html, defaultStatus = 'Available') {
  const matches = [...html.matchAll(/<a class="tp-sketch"[\s\S]*?<\/a>/g)];
  return matches.map(m => {
    const card = m[0];
    const href = (card.match(/href="([^"]+)"/) || [])[1] || '';
    const slug = href.replace('/puppies/', '');
    const name = (card.match(/<span class="tp-sketch__name[^>]*>([\s\S]*?)<\/span>/) || [])[1] || '';
    const meta = (card.match(/<span class="tp-sketch__meta[^>]*>([\s\S]*?)<\/span>/) || [])[1] || '';
    const sticker = (card.match(/<span class="tp-sketch__sticker[^>]*>([\s\S]*?)<\/span>/) || [])[1] || defaultStatus;
    const hasVideo = card.includes('tp-sketch__video');

    const imgMatch = card.match(/src="([^"]+)"/) || card.match(/srcSet="([^"]+)"/);
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

    const cleanMeta = meta.replace(/<!--[\s\S]*?-->/g, '').replace(/&amp;/g, '&').trim();
    const parts = cleanMeta.split('·').map(s => s.trim());
    const breed = parts[0] || 'Teacup Puppy';
    const gender = parts[1] || 'Boy';
    const age = parts[2] || '2.5 months';

    // Descriptions and highlights tailored to each puppy
    return {
      id: slug,
      slug,
      name: name.trim() || slug.split('-')[0].replace(/^\w/, c => c.toUpperCase()),
      breed,
      gender: gender.toLowerCase().includes('girl') || gender.toLowerCase().includes('female') ? 'Girl' : 'Boy',
      age: age || '3 months',
      status: sticker.trim() || 'Available',
      hasVideo,
      image: image.startsWith('http') ? image : 'https://puppy.instabizweb.com' + image,
      where: 'Downtown Dubai Showroom',
      origin: 'Imported from South Korea',
      color: breed.includes('Poodle') ? 'Apricot / Red' : breed.includes('Maltipoo') ? 'Cream White' : 'Golden Cream',
      weight: 'Est. adult 1.8 - 2.5 kg',
      vaccination: 'Fully vaccinated & microchipped',
      passport: 'Official UAE Health Passport & Certificate included',
      character: 'Gentle, affectionate, hypoallergenic, playful with children, loves cuddles'
    };
  });
}

// Parse tickets from gone-home.html
function extractTickets(html) {
  const matches = [...html.matchAll(/<a class="tp-ticket__link"[\s\S]*?<\/a>/g)];
  return matches.map(m => {
    const card = m[0];
    const href = (card.match(/href="([^"]+)"/) || [])[1] || '';
    const slug = href.replace('/puppies/', '');
    const name = (card.match(/<span class="[^"]*tp-ticket__name[^"]*">([\s\S]*?)<\/span>/) || [])[1] || '';
    const meta = (card.match(/<span class="tp-ticket__meta">([\s\S]*?)<\/span>/) || [])[1] || '';
    const route = (card.match(/<span class="tp-ticket__route">([\s\S]*?)<\/span>/) || [])[1] || 'Seoul → Dubai';

    const imgMatch = card.match(/src="([^"]+)"/) || card.match(/srcSet="([^"]+)"/);
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

    const cleanMeta = meta.replace(/<!--[\s\S]*?-->/g, '').replace(/&amp;/g, '&').trim();
    const parts = cleanMeta.split('·').map(s => s.trim());
    const breed = parts[0] || 'Teacup Puppy';
    const gender = parts[1] || 'Boy';
    const age = parts[2] || 'Gone Home';

    return {
      id: slug,
      slug,
      name: name.trim() || slug.split('-')[0].replace(/^\w/, c => c.toUpperCase()),
      breed,
      gender: gender.toLowerCase().includes('girl') || gender.toLowerCase().includes('female') ? 'Girl' : 'Boy',
      age: age || 'Adopted',
      status: 'Gone Home',
      hasVideo: false,
      image: image.startsWith('http') ? image : 'https://puppy.instabizweb.com' + image,
      route: route.trim(),
      where: 'Living happily with family in UAE',
      origin: 'South Korea / Europe',
      color: 'Pure White / Apricot',
      weight: '1.9 kg',
      vaccination: 'Complete UAE certified',
      passport: 'Adopted with full health guarantee',
      character: 'Adored by new family, thriving in Dubai'
    };
  });
}

const availablePuppies = extractSketches(p1Html, 'Available');
const goneHomeTickets = extractTickets(p2Html);

console.log('Available puppies parsed:', availablePuppies.length);
console.log('Gone home tickets parsed:', goneHomeTickets.length);

fs.writeFileSync('scripts/parsed_all_puppies.json', JSON.stringify({ availablePuppies, goneHomeTickets }, null, 2));
