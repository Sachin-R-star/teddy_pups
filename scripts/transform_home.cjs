const fs = require('fs');

let code = fs.readFileSync('src/pages/Home.jsx', 'utf8');

// 1. Imports
if (!code.includes("import TeddyMascot")) {
  code = code.replace(
    "import React, { useState } from 'react';",
    "import React, { useState, useEffect } from 'react';\nimport TeddyMascot from '../components/TeddyMascot';"
  );
}

// 2. Component State & Hooks
const oldCompHeader = /export default function Home\(\) \{\s*const \[selectedPhoto, setSelectedPhoto\] = useState\(null\);/;
const newCompHeader = `export default function Home() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const [hoveredSeat, setHoveredSeat] = useState(null);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHeroHere = scrollY < 60;`;

code = code.replace(oldCompHeader, newCompHeader);

// 3. tp-hero section
code = code.replace(
  'className="tp-scene tp-hero"',
  'className="tp-scene tp-hero" data-here={isHeroHere ? "true" : "false"}'
);

// 4. Update the 6 seats with hover handlers & lift
const seatsData = [
  { i: 0, link: 'maltipoo-max-male', name: 'Max' },
  { i: 1, link: 'korean-teacup-maltipoo-female', name: 'Korean Teacup Maltipoo' },
  { i: 2, link: 'korean-teacup-poodle-female', name: 'Korean Teacup Poodle' },
  { i: 3, link: 'maltipoo-cavapoo-male', name: 'Maltipoo &amp; Cavapoo' },
  { i: 4, link: 'toy-poodle-male-female', name: 'Toy Poodle' },
  { i: 5, link: 'maltipoo-female-2', name: 'Maltipoo' }
];

seatsData.forEach(({ i, link, name }) => {
  // Update link with hover
  const linkTarget = `to="/puppies/${link}"`;
  const linkReplacement = `to="/puppies/${link}" onMouseEnter={() => setHoveredSeat(${i})} onMouseLeave={() => setHoveredSeat(null)}`;
  code = code.replace(linkTarget, linkReplacement);

  // Update ghost with data-tag
  const ghostTarget = `<span className="tp-lineup__ghost"><span className="tp-lineup__name font-scrawl">${name}</span></span>`;
  const ghostReplacement = `<span className="tp-lineup__ghost" data-tag={hoveredSeat === ${i} ? "show" : undefined}><span className="tp-lineup__name font-scrawl" style={{ opacity: hoveredSeat === ${i} ? 1 : undefined, transform: hoveredSeat === ${i} ? 'translate(var(--tag-x, -50%), -12%)' : undefined }}>${name}</span></span>`;
  code = code.replace(ghostTarget, ghostReplacement);
});

// 5. Replace each of the 8 teddy SVG placeholders with <TeddyMascot ... />
const teddies = [
  { cls: 'tp-hero__teddy', pose: '{isHeroHere ? "peek" : "walk"}' },
  { cls: 'tp-meet__teddy', pose: '"sit"' },
  { cls: 'tp-fork__teddy', pose: '"sit"' },
  { cls: 'tp-chat__teddy', pose: '"sit"' },
  { cls: 'tp-book__teddy', pose: '"sit"' },
  { cls: 'tp-dusk__teddy', pose: '"sit"' },
  { cls: 'tp-night__teddy', pose: '"sit"' },
  { cls: 'tp-house__teddy', pose: '"sit"' }
];

teddies.forEach(t => {
  const marker = `className="pup-stop ${t.cls}">`;
  const idx = code.indexOf(marker);
  if (idx !== -1) {
    const after = code.substring(idx + marker.length);
    const endBuddy = after.indexOf('</div></div>');
    if (endBuddy !== -1) {
      const fullOld = code.substring(idx + marker.length, idx + marker.length + endBuddy + '</div>'.length);
      const replacement = `<TeddyMascot pose=${t.pose} facing="right" interactive={true} />`;
      code = code.substring(0, idx + marker.length) + replacement + code.substring(idx + marker.length + endBuddy + '</div>'.length);
      console.log(`Replaced ${t.cls} successfully!`);
    }
  }
});

fs.writeFileSync('src/pages/Home.jsx', code, 'utf8');
console.log('Finished transforming Home.jsx!');
