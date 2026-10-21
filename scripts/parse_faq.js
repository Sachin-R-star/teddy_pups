import fs from 'fs';

const html = fs.readFileSync('scraped/faq.html', 'utf8');
const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);

if (match) {
  const data = JSON.parse(match[1]);
  console.log('FAQ entities:', data.mainEntity.length);
  const faqs = data.mainEntity.map((q, idx) => ({
    id: idx + 1,
    question: q.name,
    answer: q.acceptedAnswer.text,
    category: idx < 3 ? 'Health & Meeting' : idx < 6 ? 'Import & Travel' : 'Care & Delivery'
  }));
  fs.writeFileSync('scripts/parsed_faqs.json', JSON.stringify(faqs, null, 2));
  console.log('Saved faqs successfully:', faqs.length);
} else {
  console.log('No ld+json found');
}
