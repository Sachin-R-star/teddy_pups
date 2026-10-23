import https from 'https';
import fs from 'fs';

const pages = [
  { name: 'puppies', path: '/puppies' },
  { name: 'gone-home', path: '/gone-home' },
  { name: 'happy-families', path: '/happy-families' },
  { name: 'how-it-works', path: '/how-it-works' },
  { name: 'faq', path: '/faq' },
  { name: 'contact', path: '/contact' }
];

function fetchPage(p) {
  return new Promise((resolve) => {
    https.get(`https://puppy.instabizweb.com${p.path}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        fs.writeFileSync(`scripts/live_${p.name}.html`, data);
        const mainMatch = data.match(/<main[\s\S]*?<\/main>/i);
        console.log(`Fetched ${p.name}, size: ${data.length}, main: ${mainMatch ? mainMatch[0].length : 'none'}`);
        resolve();
      });
    }).on('error', (err) => {
      console.error(`Error fetching ${p.name}:`, err);
      resolve();
    });
  });
}

async function main() {
  for (const p of pages) {
    await fetchPage(p);
  }
  console.log('All pages fetched!');
}

main();
