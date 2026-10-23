import fs from 'fs';

const refCss2 = fs.readFileSync('scripts/ref_style_2.css', 'utf8');

// Build main.css header with font definitions and custom cursor
const header = `/* TeddyPups Design System & Styles - Clone of puppy.instabizweb.com */
@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@500;700&family=Figtree:ital,wght@0,300..900;1,300..900&family=Fraunces:ital,opsz,wght@0,9..144,400..800;1,9..144,400..700&family=Patrick+Hand&family=Shantell+Sans:ital,wght@0,300..800;1,300..800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

:root {
  --font-fraunces: 'Fraunces', Georgia, serif;
  --font-figtree: 'Figtree', ui-sans-serif, system-ui, sans-serif;
  --font-shantell: 'Shantell Sans', 'Patrick Hand', cursive;
  --font-display: var(--font-fraunces);
  --font-sans: var(--font-figtree);
  --font-hand: var(--font-shantell);
}

/* Custom Paw Cursor & Trailing Prints */
@media (pointer: fine) {
  html.custom-cursor-active,
  html.custom-cursor-active body,
  html.custom-cursor-active a,
  html.custom-cursor-active button,
  html.custom-cursor-active input,
  html.custom-cursor-active select,
  html.custom-cursor-active textarea,
  html.custom-cursor-active [role="button"],
  html.custom-cursor-active .cursor-pointer {
    cursor: none !important;
  }
}

.tp-paw-trail-item {
  position: fixed;
  pointer-events: none;
  opacity: 0.6;
  z-index: 99998;
  animation: paw-print-fade 0.95s cubic-bezier(0.2, 0, 0.4, 1) forwards;
}

@keyframes paw-print-fade {
  0% {
    opacity: 0.65;
    transform: translate(-50%, -50%) scale(0.9);
  }
  40% {
    opacity: 0.5;
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.4);
  }
}

/* Ensure logo size is always neat and controlled in header and footer */
.tp-header__logo {
  width: 3rem !important;
  height: 3rem !important;
  border-radius: 9999px !important;
  object-fit: cover !important;
  display: block !important;
}

`;

const finalCss = header + '\n' + refCss2;

fs.writeFileSync('src/styles/main.css', finalCss);
console.log('Successfully written src/styles/main.css, total length:', finalCss.length);
