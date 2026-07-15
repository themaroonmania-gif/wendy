// scripts/extractProviders.js
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

// Path to the scraped providers HTML file
const sourcePath = path.join(__dirname, '..', '..', '.gemini', 'antigravity-cli', 'brain', '383e9e89-1306-4562-baa1-d3f2a701135f', '.system_generated', 'steps', '81', 'content.md');
const html = fs.readFileSync(sourcePath, 'utf-8');

// The HTML content may have line numbers prefix; strip them
const cleanHtml = html.replace(/^\d+:\s*/gm, '');
const dom = new JSDOM(cleanHtml);
const document = dom.window.document;

const providers = [];

// Each provider is wrapped in an <a> element with class "group flex flex-col"
const providerLinks = document.querySelectorAll('a.group.flex.flex-col');
providerLinks.forEach(link => {
  const href = link.getAttribute('href') || '';
  const id = href.replace(/^\/providers\//, '').replace(/\/.*/, '');
  const img = link.querySelector('img');
  const imageUrl = img ? img.getAttribute('src') : '';
  const nameEl = link.querySelector('h2');
  const name = nameEl ? nameEl.textContent.trim() : '';
  const titleEl = link.querySelector('p.mt-2');
  const title = titleEl ? titleEl.textContent.trim() : '';
  const supervisorEl = link.querySelector('p.mt-2.text-xs');
  const supervisedBy = supervisorEl && supervisorEl.textContent.includes('Supervised by') ? supervisorEl.textContent.replace('Supervised by', '').trim() : '';

  // tags are in span elements inside .tags container or directly in the div after description
  const tagSpans = link.querySelectorAll('span.tag, span.inline-flex');
  const locations = [];
  const ageGroups = [];
  const issues = [];
  const specialties = [];
  let accepting = false;
  let telehealth = false;

  tagSpans.forEach(span => {
    const txt = span.textContent.trim();
    if (txt === 'Accepting') accepting = true;
    else if (txt === 'Telehealth' || txt === 'Telehealth only' || txt === 'Telehealth available') telehealth = true;
    else if (['Dallas','Addison','Prosper','Fort Worth','Dallas','Telehealth only'].includes(txt)) locations.push(txt);
    else if (txt.match(/(Teens|Adults|Children|Young Adults|Families|Couples|Parents)/i)) ageGroups.push(txt);
    else if (txt.match(/(ADHD|Anxiety|Depression|Trauma|PTSD|Autism|Relationships|Life Transitions|Self-Esteem|Eating Disorders|Abuse|Neglect|Sexual Abuse|Domestic Violence|LGBTQ\+|Dating and Relationship Issues|Communication|Abuse \/ Neglect|Parenting|Child)/i)) issues.push(txt);
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

// Write JSON file to public/data/providers.json
const outputDir = path.join(__dirname, '..', '..', 'public', 'data');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}
fs.writeFileSync(path.join(outputDir, 'providers.json'), JSON.stringify(providers, null, 2), 'utf-8');
console.log('Providers JSON generated with', providers.length, 'entries');
