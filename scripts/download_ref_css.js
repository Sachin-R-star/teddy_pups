import https from 'https';
import fs from 'fs';

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        fs.writeFileSync(dest, data);
        console.log(`Saved ${dest}, size: ${data.length}`);
        resolve();
      });
    }).on('error', reject);
  });
}

async function main() {
  await downloadFile('https://puppy.instabizweb.com/_next/static/chunks/2gh-2btcjgkih.css', 'scripts/ref_style_1.css');
  await downloadFile('https://puppy.instabizweb.com/_next/static/chunks/10jf32vdx50lp.css', 'scripts/ref_style_2.css');
}

main();
