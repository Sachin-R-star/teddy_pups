import fs from 'fs';

const pages = [
  'src/pages/HappyFamilies.jsx',
  'src/pages/Faq.jsx',
  'src/pages/HowItWorks.jsx',
  'src/pages/GoneHome.jsx',
  'src/pages/Contact.jsx'
];

for (const p of pages) {
  if (fs.existsSync(p)) {
    let content = fs.readFileSync(p, 'utf8');
    
    // Replace opening <main ...> with <>
    content = content.replace(/<main\s+id="main"[^>]*>/i, '<>');
    
    // Replace closing </main> with </>
    content = content.replace(/<\/main>/i, '</>');
    
    fs.writeFileSync(p, content, 'utf8');
    console.log(`Cleaned nested <main> from ${p}`);
  }
}
