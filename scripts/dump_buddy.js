async function dumpModule() {
  const text = await fetch('https://puppy.instabizweb.com/_next/static/chunks/1llon2cx5n3pm.js').then(r=>r.text());
  const idx = text.indexOf('73459');
  console.log('Index:', idx);
  // Find where module ends
  const nextMod = text.indexOf('},', idx + 10);
  console.log('Next module at:', nextMod);
  const snippet = text.slice(idx - 10, idx + 8000);
  import('fs').then(fs => {
    fs.writeFileSync('scripts/extracted_pup_buddy.js', snippet);
    console.log('Saved extracted_pup_buddy.js');
  });
}
dumpModule();
