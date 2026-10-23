import fs from 'fs';

const chunk = fs.readFileSync('scripts/chunk_home.js', 'utf8');

function findMatches(keyword) {
  const reg = new RegExp(`[^;{}]*${keyword}[^;{}]*`, 'gi');
  const res = chunk.match(reg) || [];
  return res.slice(0, 5);
}

console.log('runner:', findMatches('runner'));
console.log('pup-buddy:', findMatches('pup-buddy'));
console.log('butterfly:', findMatches('butterfly'));
console.log('flower:', findMatches('flower'));
console.log('walk:', findMatches('walk'));
console.log('trot:', findMatches('trot'));
console.log('treadmill:', findMatches('treadmill'));
console.log('pinned:', findMatches('pinned'));
