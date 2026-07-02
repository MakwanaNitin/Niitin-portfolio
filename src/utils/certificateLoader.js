// ─── Dynamic Certificate Loader ────────────────────────────────────────────
// Automatically detects every PDF placed in src/assets/certificates/ and
// turns it into a certificate record. To add a new certificate, just drop a
// PDF into that folder — no code changes required.

// Vite's import.meta.glob statically discovers every matching file at build
// time and gives us a URL we can use for <a href> view/download links.
const pdfModules = import.meta.glob('../assets/certificates/*.pdf', {
  eager: true,
  query: '?url',
  import: 'default',
});

const CATEGORY_RULES = [
  { category: 'Cloud', keywords: ['cloud', 'aws', 'azure', 'amazon web services'] },
  { category: 'AI', keywords: ['ai', 'prompt engineering', 'chatgpt', 'machine learning', 'data analysis'] },
  { category: 'Cyber Security', keywords: ['security', 'networking', 'network technician', 'cyber'] },
  { category: 'Database', keywords: ['database', 'mongodb', 'normalization', 'sql'] },
  { category: 'Web Development', keywords: ['web development', 'express', 'node', 'html', 'css', 'react', 'frontend'] },
  { category: 'Android', keywords: ['android', 'kotlin', 'flutter'] },
  { category: 'Programming', keywords: ['python', 'java', 'software engineering', 'uml', 'programming', 'c++', 'algorithm'] },
];

function categorize(title) {
  const t = title.toLowerCase();
  for (const rule of CATEGORY_RULES) {
    if (rule.keywords.some((k) => t.includes(k))) return rule.category;
  }
  return 'Other';
}

function titleCase(slug) {
  return slug
    .replace(/-/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map((w) => {
      if (w.toUpperCase() === w) return w; // keep acronyms like AWS, UML
      const upperWords = ['aws', 'uml', 'ai', 'js', 'sql', 'mongodb'];
      if (upperWords.includes(w.toLowerCase())) return w.toUpperCase();
      return w.charAt(0).toUpperCase() + w.slice(1);
    })
    .join(' ');
}

function deriveSkills(title, category) {
  const t = title.toLowerCase();
  const skillBank = [
    'AWS', 'Azure', 'Cloud', 'Python', 'Java', 'Node.js', 'MongoDB', 'Express',
    'SQL', 'Database', 'UML', 'Networking', 'Security', 'Software Engineering',
    'AI', 'Prompt Engineering', 'Web Development',
  ];
  const found = skillBank.filter((s) => t.includes(s.toLowerCase()));
  if (found.length === 0) found.push(category);
  return [...new Set(found)].slice(0, 4);
}

function buildCertificates() {
  const entries = Object.entries(pdfModules).sort((a, b) => a[0].localeCompare(b[0]));

  return entries.map(([path, url], index) => {
    const filename = path.split('/').pop().replace(/\.pdf$/i, '');
    const title = titleCase(filename);
    const category = categorize(title);

    return {
      id: index + 1,
      title,
      filename: `${filename}.pdf`,
      issuer: 'Verified Credential',
      category,
      description: `Certificate of completion for ${title}, demonstrating practical, hands-on proficiency.`,
      skills: deriveSkills(title, category),
      url,
      // Used only for stable ordering (A-Z / Z-A / default). No fabricated
      // issue dates are shown since the original certificates don't expose one.
      sortIndex: index,
    };
  });
}

export const CERTIFICATES = buildCertificates();

export const CATEGORIES = [
  'All',
  ...Array.from(new Set(CERTIFICATES.map((c) => c.category))).sort(),
];
