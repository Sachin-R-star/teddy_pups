import fs from 'fs';

const polaroids = JSON.parse(fs.readFileSync('scripts/parsed_polaroids.json', 'utf8'));
const faqs = JSON.parse(fs.readFileSync('scripts/parsed_faqs.json', 'utf8'));

const polaroidsCode = `/**
 * Happy Families Polaroid Gallery
 * Authentic photos of clients with their puppies in Dubai.
 */

export const polaroidsData = ${JSON.stringify(polaroids, null, 2)};
`;

const faqsCode = `/**
 * Frequently Asked Questions
 * Categorized questions and answers about health, meeting, travel, and care.
 */

export const faqsData = ${JSON.stringify(faqs, null, 2)};
`;

fs.writeFileSync('src/data/polaroids.js', polaroidsCode);
fs.writeFileSync('src/data/faqs.js', faqsCode);
console.log('Successfully wrote src/data/polaroids.js and src/data/faqs.js');
