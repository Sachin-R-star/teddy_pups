const fs = require('fs');
const lines = fs.readFileSync('src/pages/Home.jsx', 'utf8').split('\n');
const l33 = lines[32];
const doors = l33.match(/<li className="tp-door[^"]*"/g);
console.log('Doors count:', doors ? doors.length : 0);
