import fs from 'fs';
import path from 'path';

const fontsDir = path.resolve('public/fonts');
if (!fs.existsSync(fontsDir)) {
  fs.mkdirSync(fontsDir, { recursive: true });
}

const fonts = [
  {
    name: 'fraunces-latin.woff2',
    url: 'https://puppy.instabizweb.com/_next/static/media/54fc36028e2bb174-s.p.20jfceqj9zyw9.woff2'
  },
  {
    name: 'fraunces-latin-ext.woff2',
    url: 'https://puppy.instabizweb.com/_next/static/media/23f1a98b08006014-s.0s5mkn35-hrc5.woff2'
  },
  {
    name: 'fraunces-vietnamese.woff2',
    url: 'https://puppy.instabizweb.com/_next/static/media/a5a3076f5a3c2968-s.09mqwf_zjnrdf.woff2'
  },
  {
    name: 'figtree-latin.woff2',
    url: 'https://puppy.instabizweb.com/_next/static/media/f7aa21714c1c53f8-s.p.0-95eo-012xnf.woff2'
  },
  {
    name: 'shantell-latin.woff2',
    url: 'https://puppy.instabizweb.com/_next/static/media/c25c3c50e24471d2-s.p.1-0ft7iz2f4p6.woff2'
  }
];

async function downloadAll() {
  for (const f of fonts) {
    const dest = path.join(fontsDir, f.name);
    console.log(`Downloading ${f.name}...`);
    const res = await fetch(f.url);
    if (!res.ok) {
      console.error(`Failed ${f.url}: ${res.status}`);
      continue;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(dest, buf);
    console.log(`Saved ${f.name} (${buf.length} bytes)`);
  }
}

downloadAll();
