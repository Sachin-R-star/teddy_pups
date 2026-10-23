const fs = require('fs');
const filePath = 'src/pages/Home.jsx';
let content = fs.readFileSync(filePath, 'utf8');

const target = '<li className="tp-door" data-open="true">';
const replacement = '<li className="tp-door" data-open="false">';

const beforeCount = (content.match(new RegExp(target, 'g')) || []).length;
console.log('Target matches before:', beforeCount);

content = content.replaceAll(target, replacement);

const afterCount = (content.match(new RegExp(target, 'g')) || []).length;
console.log('Target matches after:', afterCount);

const falseCount = (content.match(/data-open="false"/g) || []).length;
console.log('data-open="false" count:', falseCount);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Updated Home.jsx successfully.');
