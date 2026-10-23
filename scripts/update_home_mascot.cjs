const fs = require('fs');

let code = fs.readFileSync('src/pages/Home.jsx', 'utf8');

// 1. Ensure TeddyMascot import is present
if (!code.includes("import TeddyMascot")) {
  code = code.replace(
    "import React, { useState } from 'react';",
    "import React, { useState, useEffect } from 'react';\nimport TeddyMascot from '../components/TeddyMascot';"
  );
}

// 2. Add scroll listener & hoveredSeat state to Home component
const stateHook = `export default function Home() {
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

code = code.replace(
  /export default function Home\(\) \{\s*const \[selectedPhoto, setSelectedPhoto\] = useState\(null\);/,
  stateHook
);

// 3. Add data-here={isHeroHere ? "true" : "false"} to tp-hero section
code = code.replace(
  'className="tp-scene tp-hero"',
  'className="tp-scene tp-hero" data-here={isHeroHere ? "true" : "false"}'
);

console.log('Step 1-3 complete.');
fs.writeFileSync('scripts/test_home_out.jsx', code, 'utf8');
