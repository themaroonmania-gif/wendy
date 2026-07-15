// scripts/extractProviders.cjs
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

// Path to the scraped providers HTML file (the content.md file)
const sourcePath = path.resolve(__dirname, '..', '..', '.gemini', 'antigravity-cli', 'brain', '383e9e89-1306-4562-baa1-d3f2a701135f', '.system_generated', 'steps', '81', 'content.md');

let raw = fs.readFileSync(sourcePath, 'utf-8');
// Remove line-number prefixes like "123: "
raw = raw.replace(/^\d+:\s*/gm, '');

const dom = new JSDOM(raw);
const document = dom.window.document;

const providers = [];

// Each provider card is wrapped in an <a> with class "group flex flex-col"
const cards = document.querySelectorAll('a.group.flex.flex-col');
cards.forEach(card => {
  const href = card.getAttribute('href') || '';
  const id = href.replace(/^\/providers\//, '').replace(/\/.*/, '');

  const img = card.querySelector('img');
  const imageUrl = img ? img.getAttribute('src') : '';

  const nameEl = card.querySelector('h2');
  const name = nameEl ? nameEl.textContent.trim() : '';

  const titleEl = card.querySelector('p.mt-2');
  const title = titleEl ? titleEl.textContent.trim() : '';

  const supervisorEl = card.querySelector('p.mt-2.text-xs');
  const supervisedBy = supervisorEl && supervisorEl.textContent.includes('Supervised by')
    ? supervisorEl.textContent.replace('Supervised by', '').trim()
    : '';

  const tagSpans = card.querySelectorAll('span');
  const locations = [];
  const ageGroups = [];
  const issues = [];
  const specialties = [];
  let accepting = false;
  let telehealth = false;

  tagSpans.forEach(span => {
    const txt = span.textContent.trim();
    if (!txt) return;
    if (txt === 'Accepting') accepting = true;
    else if (/Telehealth/i.test(txt)) telehealth = true;
    else if (/Dallas|Addison|Prosper|Fort Worth|Dallas|Texas|Houston|Austin|San Antonio/i.test(txt)) locations.push(txt);
    else if (/(Teens|Adults|Children|Young Adults|Families|Couples|Parents)/i.test(txt)) ageGroups.push(txt);
    else if (/(ADHD|Anxiety|Depression|Trauma|PTSD|Autism|Relationships|"?Life Transitions"?|Self-Esteem|Eating Disorders|Abuse|Neglect|Sexual Abuse|Domestic Violence|LGBTQ\+|Dating and Relationship Issues|Communication|Parenting|Child)/i.test(txt)) issues.push(txt);
    else specialties.push(txt);
  });

  providers.push({
    id,
    name,
    title,
    imageUrl,
    locations,
    accepting,
    telehealth,
    ageGroups,
    issues,
    specialties,
    supervisedBy,
  });
});

// Write to public/data/providers.json (create directories if needed)
const outDir = path.resolve(__dirname, '..', 'public', 'data');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}
fs.writeFileSync(path.join(outDir, 'providers.json'), JSON.stringify(providers, null, 2), 'utf-8');
console.log('Generated providers.json with', providers.length, 'entries');
