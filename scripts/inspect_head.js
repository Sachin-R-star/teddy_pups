import fs from 'fs';

const html = fs.readFileSync('scripts/live_home.html', 'utf8');

// Extract <head>
const headMatch = html.match(/<head[\s\S]*?<\/head>/i);
if (headMatch) {
  // Extract all stylesheets and scripts
  const links = headMatch[0].match(/<link[^>]*>/gi) || [];
  const scripts = headMatch[0].match(/<script[^>]*>[\s\S]*?<\/script>|<script[^>]*\/>/gi) || [];
  const styles = headMatch[0].match(/<style[^>]*>[\s\S]*?<\/style>/gi) || [];

  console.log('--- LINKS ---');
  links.forEach(l => console.log(l));

  console.log('--- SCRIPTS in HEAD ---');
  scripts.forEach(s => console.log(s.slice(0, 150)));

  console.log('--- STYLE TAGS COUNT ---', styles.length);
  styles.forEach((st, i) => console.log(`Style ${i} length: ${st.length}`));
}
