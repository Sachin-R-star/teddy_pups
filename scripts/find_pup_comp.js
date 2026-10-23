import fs from 'fs';

const text = fs.readFileSync('scripts/chunk_home.js', 'utf8');

// Let's find where the engine starts and ends
const startIdx = text.indexOf('class="pup-layer"');
console.log('pup-layer at:', startIdx);

// Search for the component or hook that creates pup-layer
const compStart = text.lastIndexOf('function', startIdx);
console.log('compStart:', compStart);

const snippet = text.slice(Math.max(0, startIdx - 3000), Math.min(text.length, startIdx + 2000));
fs.writeFileSync('scripts/extracted_pup_layer_comp.js', snippet);
console.log('Saved extracted_pup_layer_comp.js');
