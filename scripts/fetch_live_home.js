import https from 'https';
import fs from 'fs';

https.get('https://puppy.instabizweb.com/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    fs.writeFileSync('scripts/live_home.html', data);
    console.log('Downloaded live_home.html, size:', data.length);

    // Extract all <section>, <header>, <footer>
    const headerMatch = data.match(/<header[\s\S]*?<\/header>/i);
    if (headerMatch) fs.writeFileSync('scripts/live_header.html', headerMatch[0]);

    const footerMatch = data.match(/<footer[\s\S]*?<\/footer>/i);
    if (footerMatch) fs.writeFileSync('scripts/live_footer.html', footerMatch[0]);

    // find all sections
    const sections = [];
    const sectionRegex = /<section[\s\S]*?<\/section>/gi;
    let match;
    let count = 0;
    while ((match = sectionRegex.exec(data)) !== null) {
      count++;
      const openingTag = match[0].match(/<section[^>]*>/i)?.[0] || '<section>';
      const idMatch = openingTag.match(/id="([^"]*)"/i)?.[1] || '';
      const classMatch = openingTag.match(/class="([^"]*)"/i)?.[1] || '';
      console.log(`Section ${count}: id="${idMatch}", class="${classMatch}", length: ${match[0].length}`);
    }

    // find main
    const mainMatch = data.match(/<main[\s\S]*?<\/main>/i);
    if (mainMatch) {
      console.log('Main length:', mainMatch[0].length);
    }
  });
}).on('error', err => {
  console.error('Fetch error:', err);
});
