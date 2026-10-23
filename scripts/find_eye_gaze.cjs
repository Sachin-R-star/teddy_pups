async function main() {
  const text = await fetch('https://puppy.instabizweb.com/_next/static/chunks/1llon2cx5n3pm.js').then(r=>r.text());
  const idx = text.indexOf('gazeX');
  console.log('gazeX at:', idx);
  if (idx !== -1) {
    const second = text.indexOf('gazeX', idx + 10);
    console.log('second gazeX at:', second);
    if (second !== -1) console.log(text.slice(second - 100, second + 400));
    const third = text.indexOf('gazeX', second + 10);
    console.log('third gazeX at:', third);
    if (third !== -1) console.log(text.slice(third - 100, third + 400));
  }
}
main();
