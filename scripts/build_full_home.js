import fs from 'fs';

function cleanSection(html) {
  let jsx = html;

  // Replace Next.js relative image URLs with absolute reference URLs
  jsx = jsx.replace(/src="\/_next\/image\?url=([^"&]+)[^"]*"/g, (m, encodedUrl) => {
    const decoded = decodeURIComponent(encodedUrl);
    return `src="https://puppy.instabizweb.com${decoded}"`;
  });
  jsx = jsx.replace(/srcSet="[^"]*"/g, '');
  jsx = jsx.replace(/src="\/media\/([^"]+)"/g, 'src="https://puppy.instabizweb.com/media/$1"');
  jsx = jsx.replace(/poster="\/media\/([^"]+)"/g, 'poster="https://puppy.instabizweb.com/media/$1"');

  // Replace class= with className=
  jsx = jsx.replace(/class=/g, 'className=');

  // Fix SVG attribute names for JSX
  jsx = jsx.replace(/stroke-width=/g, 'strokeWidth=');
  jsx = jsx.replace(/stroke-linecap=/g, 'strokeLinecap=');
  jsx = jsx.replace(/stroke-linejoin=/g, 'strokeLinejoin=');
  jsx = jsx.replace(/stroke-dasharray=/g, 'strokeDasharray=');
  jsx = jsx.replace(/patternUnits=/g, 'patternUnits=');
  jsx = jsx.replace(/preserveAspectRatio=/g, 'preserveAspectRatio=');
  jsx = jsx.replace(/fetchPriority=/g, 'fetchPriority=');
  jsx = jsx.replace(/stop-color=/g, 'stopColor=');
  jsx = jsx.replace(/stop-opacity=/g, 'stopOpacity=');
  jsx = jsx.replace(/clip-path=/g, 'clipPath=');
  jsx = jsx.replace(/fill-rule=/g, 'fillRule=');
  jsx = jsx.replace(/clip-rule=/g, 'clipRule=');

  // Fix boolean attributes
  jsx = jsx.replace(/playsInline=""/gi, 'playsInline');
  jsx = jsx.replace(/muted=""/gi, 'muted');
  jsx = jsx.replace(/loop=""/gi, 'loop');

  // Convert style strings to objects
  jsx = jsx.replace(/style="([^"]*)"/g, (m, styleStr) => {
    const parts = styleStr.split(';').map(s => s.trim()).filter(Boolean);
    const obj = {};
    parts.forEach(p => {
      const idx = p.indexOf(':');
      if (idx > -1) {
        const key = p.slice(0, idx).trim();
        const val = p.slice(idx + 1).trim();
        obj[key] = val;
      }
    });
    return `style={${JSON.stringify(obj)}}`;
  });

  // Convert <a> with relative href to <Link to="...">
  jsx = jsx.replace(/<a\s+([^>]*?)href="(\/[^"]*)"([^>]*)>([\s\S]*?)<\/a>/g, (m, before, href, after, inner) => {
    return `<Link ${before} to="${href}" ${after}>${inner}</Link>`;
  });

  // Fix self-closing elements: img, input, hr, br
  jsx = jsx.replace(/<img([^>]*?)(?<!\/)>/g, '<img$1 />');
  jsx = jsx.replace(/<input([^>]*?)(?<!\/)>/g, '<input$1 />');
  jsx = jsx.replace(/<hr([^>]*?)(?<!\/)>/g, '<hr$1 />');
  jsx = jsx.replace(/<br([^>]*?)(?<!\/)>/g, '<br$1 />');

  // Fix comments
  jsx = jsx.replace(/<!--[\s\S]*?-->/g, '');

  return jsx;
}

let sectionsJsx = [];
for (let i = 1; i <= 8; i++) {
  const file = `scripts/live_section_${i}.html`;
  if (!fs.existsSync(file)) continue;
  const content = fs.readFileSync(file, 'utf8');
  console.log(`Processing section ${i}...`);
  sectionsJsx.push(cleanSection(content));
}

const homeComponent = `import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  return (
    <div data-page="home" className="tp-page">
      {/* 1. HERO SCENE */}
      ${sectionsJsx[0]}

      {/* 2. MEET THE PUPS SCENE */}
      ${sectionsJsx[1]}

      {/* 3. TWO WAYS SCENE */}
      ${sectionsJsx[2]}

      {/* 4. CHAT JOURNEY SCENE */}
      ${sectionsJsx[3]}

      {/* 5. PASSPORT TRUST SCENE */}
      ${sectionsJsx[4]}

      {/* 6. DUSK POLAROIDS SCENE */}
      ${sectionsJsx[5]}

      {/* 7. NIGHT FAQ SCENE */}
      ${sectionsJsx[6]}

      {/* 8. HOME READY SCENE */}
      ${sectionsJsx[7]}
    </div>
  );
}
`;

fs.writeFileSync('src/pages/Home.jsx', homeComponent);
console.log('Saved src/pages/Home.jsx, size:', homeComponent.length);
