import fs from 'fs';

const html = fs.readFileSync('scripts/live_detail.html', 'utf8');

// look for $RC or template
const templates = html.match(/<div hidden id="S:0">[\s\S]*?<\/div>/) || html.match(/<div id="S:0">[\s\S]*?<\/div>/) || html.match(/\$RC\("B:0","S:0"\)/);
const s0Match = html.match(/<div hidden id="S:0">([\s\S]*?)<\/div>/);
if (s0Match) {
  console.log('Streamed S:0 length:', s0Match[1].length);
  fs.writeFileSync('scripts/live_detail_content.html', s0Match[1]);
  console.log('Saved scripts/live_detail_content.html');
} else {
  // search for Max or Maltipoo
  const idx = html.indexOf('Max');
  console.log('Max at index:', idx);
}
