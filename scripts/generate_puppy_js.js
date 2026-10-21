import fs from 'fs';

const data = JSON.parse(fs.readFileSync('scripts/parsed_all_puppies.json', 'utf8'));

// Generate clean JS file for available puppies
const puppiesCode = `/**
 * Available Puppies Data
 * Each puppy includes full specifications, breed information, gallery, and origin.
 */

export const puppiesData = ${JSON.stringify(data.availablePuppies, null, 2)};

export const getPuppyBySlug = (slug) => {
  return puppiesData.find(p => p.slug === slug) || null;
};

export const getRelatedPuppies = (currentSlug, count = 3) => {
  return puppiesData.filter(p => p.slug !== currentSlug).slice(0, count);
};
`;

// Generate clean JS file for gone-home puppies
const goneHomeCode = `/**
 * Gone Home Puppies Data
 * Puppies who found their forever loving homes in Dubai & UAE.
 */

export const goneHomeData = ${JSON.stringify(data.goneHomeTickets, null, 2)};
`;

fs.writeFileSync('src/data/puppies.js', puppiesCode);
fs.writeFileSync('src/data/goneHome.js', goneHomeCode);
console.log('Successfully wrote src/data/puppies.js and src/data/goneHome.js');
