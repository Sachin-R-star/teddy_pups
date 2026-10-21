import fs from 'fs';

const origCss = fs.readFileSync('10jf32vdx50lp.css', 'utf8');

const customPreamble = `/* TeddyPups Design System & Styles */
@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@500;700&family=Fraunces:ital,opsz,wght@0,9..144,400..800;1,9..144,400..700&family=Patrick+Hand&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

:root {
  --color-honey: #fbe3b4;
  --color-honey-deep: #f6d79a;
  --color-cocoa: #2a170e;
  --color-milk: #fffdf8;
  --color-toffee: #d4893f;
  --color-toffee-deep: #c2622b;
  --color-peach: #f9cdbf;
  --font-plush: 'Fraunces', serif;
  --font-scrawl: 'Patrick Hand', 'Caveat', cursive;
  --font-sans: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
  --gutter: clamp(1rem, 4vw, 3.5rem);
  --header-h: 4.75rem;
  --bar-h: 0px;
}

body {
  margin: 0;
  padding: 0;
  font-family: var(--font-sans);
  background-color: var(--color-milk);
  color: var(--color-cocoa);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}

.font-plush {
  font-family: var(--font-plush) !important;
}

.font-scrawl {
  font-family: var(--font-scrawl) !important;
}

/* Modal and dialog helpers */
dialog::backdrop {
  background: rgba(42, 23, 14, 0.45);
  backdrop-filter: blur(4px);
}

/* Accessibility */
.sr-only-focusable:not(:focus):not(:focus-within) {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
`;

if (!fs.existsSync('src/styles')) {
  fs.mkdirSync('src/styles', { recursive: true });
}

fs.writeFileSync('src/styles/main.css', customPreamble + '\n' + origCss);
console.log('Saved src/styles/main.css, size:', fs.statSync('src/styles/main.css').size);
