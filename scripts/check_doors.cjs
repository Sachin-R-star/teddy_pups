const fs = require('fs');
const code = fs.readFileSync('src/pages/Home.jsx', 'utf8');
const count = (code.match(/data-open="true"/g) || []).length;
console.log('data-open="true" count:', count);
