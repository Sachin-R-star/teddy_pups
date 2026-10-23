import fs from 'fs';

const html = fs.readFileSync('scripts/reference_hero.html', 'utf8');

// The lineup section has seats
const seats = [...html.matchAll(/<li class="tp-lineup__seat"[^>]*>([\s\S]*?)<\/li>/g)];
console.log('Total seats in hero:', seats.length);

const parsedSeats = seats.map((m, idx) => {
  const seatHtml = m[0];
  const style = (seatHtml.match(/style="([^"]+)"/) || [])[1] || '';
  const aria = (seatHtml.match(/aria-label="([^"]+)"/) || [])[1] || '';
  const href = (seatHtml.match(/href="([^"]+)"/) || [])[1] || '';
  const alt = (seatHtml.match(/alt="([^"]+)"/) || [])[1] || '';
  const tag = (seatHtml.match(/<span class="tp-lineup__name[^>]*>([\s\S]*?)<\/span>/) || [])[1] || '';

  // image src
  const imgMatch = seatHtml.match(/src="([^"]+)"/) || seatHtml.match(/srcSet="([^"]+)"/);
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
    index: idx,
    style,
    aria,
    href,
    alt,
    tag: tag.trim(),
    image: image.startsWith('http') ? image : 'https://puppy.instabizweb.com' + image
  };
});

console.log('Seats 0 to 5:', JSON.stringify(parsedSeats.slice(0, 6), null, 2));
fs.writeFileSync('scripts/hero_seats_data.json', JSON.stringify(parsedSeats, null, 2));
