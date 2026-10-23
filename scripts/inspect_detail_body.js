import fs from 'fs';

const html = fs.readFileSync('scripts/live_detail.html', 'utf8');
const mainMatch = html.match(/<main[\s\S]*?<\/main>/i);
console.log('MAIN MATCH:', mainMatch ? mainMatch[0] : 'none');

// check what tags are inside body
const bodyMatch = html.match(/<body[\s\S]*?<\/body>/i);
if (bodyMatch) {
  // list direct children tags of body
  console.log('Body length:', bodyMatch[0].length);
  // print first 1500 chars of body
  console.log('Body start:', bodyMatch[0].slice(0, 1500));
}
