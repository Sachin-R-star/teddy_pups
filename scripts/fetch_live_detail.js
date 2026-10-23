import https from 'https';
import fs from 'fs';

https.get('https://puppy.instabizweb.com/puppies/maltipoo-max-male', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    fs.writeFileSync('scripts/live_detail.html', data);
    const mainMatch = data.match(/<main[\s\S]*?<\/main>/i);
    console.log(`Fetched puppy detail page, size: ${data.length}, main: ${mainMatch ? mainMatch[0].length : 'none'}`);
  });
}).on('error', (err) => {
  console.error('Error fetching detail page:', err);
});
