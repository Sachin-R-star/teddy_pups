import fs from 'fs';

const css = fs.readFileSync('scripts/ref_style_2.css', 'utf8');

const regex = /([^{}]*hero[^{}]*\{[^{}]*\})/gi;
let m;
while ((m = regex.exec(css)) !== null) {
  console.log(m[1]);
}
