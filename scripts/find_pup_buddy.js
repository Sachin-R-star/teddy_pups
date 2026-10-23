import fs from 'fs';

async function findModuleInChunks(targetId) {
  const html = fs.readFileSync('scripts/live_home.html', 'utf8');
  const chunks = [...html.matchAll(/src="(\/_next\/static\/chunks\/[^"]+\.js)"/gi)].map(m => m[1]);
  
  for (const c of chunks) {
    const text = await fetch('https://puppy.instabizweb.com' + c).then(r => r.text());
    if (text.includes(targetId)) {
      console.log(`Target ${targetId} found in chunk:`, c, 'length:', text.length);
      fs.writeFileSync(`scripts/chunk_${targetId}.js`, text);
    }
  }
}
findModuleInChunks('73459');
