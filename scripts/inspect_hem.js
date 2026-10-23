import fs from 'fs';

const headerHtml = fs.readFileSync('scripts/reference_header.html', 'utf8');
console.log('--- Header HTML ---');
console.log(headerHtml.slice(0, 1000));

const css = fs.readFileSync('10jf32vdx50lp.css', 'utf8');
const hemMatches = [...css.matchAll(/\.tp-header[^{]*\{[^}]*\}/g)].map(m => m[0]);
console.log('--- Header CSS ---');
console.log(hemMatches.slice(0, 10));

const hemSpecific = [...css.matchAll(/\.tp-header__hem[^{]*\{[^}]*\}/g)].map(m => m[0]);
console.log('--- Hem Specific ---');
console.log(hemSpecific);
