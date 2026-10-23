import fs from 'fs';

const text = fs.readFileSync('scripts/chunk_pup_actor.js', 'utf8');

function findModule(id) {
  const needle = `"${id}":` || `[${id},` || `,${id},`;
  const idx = text.indexOf(id);
  console.log(`Module ${id} at:`, idx);
  if (idx !== -1) {
    console.log(text.slice(idx - 50, idx + 400));
  }
}

findModule('73459');
findModule('41405');
findModule('72203');
findModule('91360');
