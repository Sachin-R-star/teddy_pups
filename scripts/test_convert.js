import fs from 'fs';

function htmlToJsx(html) {
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

  // Fix boolean attributes / self-closing tags
  jsx = jsx.replace(/playsInline=""/gi, 'playsInline');
  jsx = jsx.replace(/muted=""/gi, 'muted');
  jsx = jsx.replace(/loop=""/gi, 'loop');
  jsx = jsx.replace(/stroke-width=/g, 'strokeWidth=');
  jsx = jsx.replace(/stroke-linecap=/g, 'strokeLinecap=');
  jsx = jsx.replace(/stroke-linejoin=/g, 'strokeLinejoin=');
  jsx = jsx.replace(/stroke-dasharray=/g, 'strokeDasharray=');
  jsx = jsx.replace(/patternUnits=/g, 'patternUnits=');
  jsx = jsx.replace(/preserveAspectRatio=/g, 'preserveAspectRatio=');
  jsx = jsx.replace(/fetchPriority=/g, 'fetchPriority=');

  // Convert style strings to objects or keep inline
  // style="--sky-top:#fffdf8;--sky-bottom:#fff1d8;--quilt:#fff1d8"
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

  // Fix comment markers like <!-- -->
  jsx = jsx.replace(/<!--[\s\S]*?-->/g, '');

  return jsx;
}

// Test on section 1
const s1 = fs.readFileSync('scripts/live_section_1.html', 'utf8');
const jsx1 = htmlToJsx(s1);
fs.writeFileSync('scripts/test_s1.jsx', jsx1);
console.log('Saved test_s1.jsx, size:', jsx1.length);
