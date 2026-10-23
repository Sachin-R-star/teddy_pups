async function run() {
  const c1 = await fetch('https://puppy.instabizweb.com/_next/static/chunks/2gh-2btcjgkih.css').then(r=>r.text());
  const c2 = await fetch('https://puppy.instabizweb.com/_next/static/chunks/10jf32vdx50lp.css').then(r=>r.text());
  const all = c1 + '\n' + c2;

  const fontVars = all.match(/--font-[a-zA-Z0-9_-]+:[^;{}]+/g);
  console.log('Font vars:', fontVars);

  const fontFaces = all.match(/@font-face\s*\{[^}]+\}/g);
  console.log('Font faces count:', fontFaces ? fontFaces.length : 0);
  if (fontFaces) {
    fontFaces.forEach(f => console.log(f));
  }
}
run();
