const fs = require('fs');
const html = fs.readFileSync('scraped/index.html', 'utf8');

// Find all sections
const sections = html.match(/<section[^>]*>[\s\S]*?<\/section>/g) || [];
console.log('Found sections:', sections.length);
sections.forEach((s, idx) => {
  const matchClass = s.match(/class="([^"]*)"/);
  const matchId = s.match(/id="([^"]*)"/);
  console.log(`Section ${idx + 1}: class="${matchClass ? matchClass[1] : ''}" id="${matchId ? matchId[1] : ''}"`);
});

// Search for door classes
const doorClasses = html.match(/tp-[a-z0-9_-]+/g) || [];
const uniqueDoor = [...new Set(doorClasses)].filter(c => c.includes('door') || c.includes('house') || c.includes('flight') || c.includes('meet') || c.includes('home'));
console.log('Door/House/Flight classes:', uniqueDoor);
