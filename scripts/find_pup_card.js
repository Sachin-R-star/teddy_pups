import fs from 'fs';

const html = fs.readFileSync('scripts/live_puppies.html', 'utf8');

const idx = html.indexOf('/puppies/maltipoo-max-male');
if (idx > -1) {
  console.log('Snippet around maltipoo-max-male:');
  console.log(html.slice(idx - 150, idx + 800));
}
