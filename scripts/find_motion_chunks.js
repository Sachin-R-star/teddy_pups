async function inspectChunks() {
  const res = await fetch('https://puppy.instabizweb.com/');
  const html = await res.text();
  const scriptMatches = [...html.matchAll(/src="(\/_next\/static\/chunks\/[^"]+\.js)"/gi)].map(m => m[1]);
  console.log('Found script chunks:', scriptMatches);

  for (const s of scriptMatches) {
    try {
      const text = await fetch('https://puppy.instabizweb.com' + s).then(r => r.text());
      if (text.includes('tp-lineup') || text.includes('tp-hero') || text.includes('pup-buddy') || text.includes('peekaboo')) {
        console.log(`\n=== Chunk ${s} contains hero/teddy logic! Length: ${text.length} ===`);
        // Find matching snippets
        const idx = text.indexOf('tp-hero');
        console.log('Snippet around tp-hero:', text.slice(Math.max(0, idx - 200), idx + 400));
        
        // Check for scroll or motion
        const scrollIdx = text.indexOf('scroll');
        if (scrollIdx !== -1) {
          console.log('Has scroll logic!');
        }
      }
    } catch (e) {
      console.error('Error fetching', s, e);
    }
  }
}
inspectChunks();
