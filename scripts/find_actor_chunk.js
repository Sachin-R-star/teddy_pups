import fs from 'fs';

async function findChunkWithActor() {
  const html = fs.readFileSync('scripts/live_home.html', 'utf8');
  const chunks = [...html.matchAll(/src="(\/_next\/static\/chunks\/[^"]+\.js)"/gi)].map(m => m[1]);
  
  for (const c of chunks) {
    const text = await fetch('https://puppy.instabizweb.com' + c).then(r => r.text());
    if (text.includes('pup-layer') || text.includes('pup-actor')) {
      console.log('FOUND in chunk:', c, 'length:', text.length);
      fs.writeFileSync('scripts/chunk_pup_actor.js', text);
    }
  }
}
findChunkWithActor();
