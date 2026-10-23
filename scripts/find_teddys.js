const fs = require('fs');
const content = fs.readFileSync('src/pages/Home.jsx', 'utf8');
const matches = content.match(/className="[^"]*teddy[^"]*"/g);
console.log('Teddy matches in Home.jsx:', matches);
