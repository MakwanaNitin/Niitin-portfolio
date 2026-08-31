// ─── NITIN — Portfolio Data ──────────────────────────────────────────────
// Single source of truth for real, factual content. Nothing here is
// fabricated — it is carried over from the original portfolio content.
// If you need to update a fact (a new project, a new skill), edit it here
// and every screen that references it updates automatically.

export const PROFILE = {
  name: 'Nitin Makwana',
  firstName: 'Nitin',
  title: 'Full-Stack Developer',
  tagline: 'Building digital experiences',
  positioning:
    'Building practical software and digital products with React, Node.js, and modern web technologies.',
  bio:
    'I am a dedicated software developer with a strong interest in Android development, Flutter, full-stack web development, and UI/UX design. I completed my Bachelor of Computer Applications (BCA) at Marwadi University and am currently pursuing my Master of Computer Applications (MCA). I enjoy solving real-world problems by building efficient and scalable applications.',
  focus: ['Frontend', 'Backend', 'Databases', 'Android & Flutter', 'UI/UX Design'],
  quote: 'Good software is built one thoughtful decision at a time.',
  resumeUrl: `${import.meta.env.BASE_URL}resume.pdf`,
  profileImg: `${import.meta.env.BASE_URL}profile.jpg`,
  email: 'nitinmakwana623@gmail.com',
  socials: {
    github: 'https://github.com/MakwanaNitin',
    linkedin: 'https://www.linkedin.com/in/makwana-niitin',
    instagram: 'https://instagram.com',
    x: 'https://x.com',
  },
};

// Core technologies. `category` powers the tech-map grouping; `usedIn`
// references project ids below so the map can draw real connections.
export const SKILLS = [
  { id: 'react', label: 'React', category: 'Frontend', usedIn: ['certihire'] },
  { id: 'js', label: 'JavaScript', category: 'Frontend', usedIn: ['certihire', 'mitra'] },
  { id: 'ts', label: 'TypeScript', category: 'Frontend', usedIn: [] },
  { id: 'html', label: 'HTML', category: 'Frontend', usedIn: ['mitra'] },
  { id: 'css', label: 'CSS', category: 'Frontend', usedIn: ['mitra'] },
  { id: 'tailwind', label: 'Tailwind CSS', category: 'Frontend', usedIn: ['certihire'] },
  { id: 'nodejs', label: 'Node.js', category: 'Backend', usedIn: ['certihire'] },
  { id: 'express', label: 'Express', category: 'Backend', usedIn: ['certihire'] },
  { id: 'php', label: 'PHP', category: 'Backend', usedIn: ['mitra'] },
  { id: 'py', label: 'Python', category: 'Backend', usedIn: ['chatx'] },
  { id: 'java', label: 'Java', category: 'Backend', usedIn: [] },
  { id: 'mongodb', label: 'MongoDB', category: 'Database', usedIn: ['certihire'] },
  { id: 'mysql', label: 'MySQL', category: 'Database', usedIn: ['chatx', 'mitra'] },
  { id: 'firebase', label: 'Firebase', category: 'Database', usedIn: ['lostfound'] },
  { id: 'androidstudio', label: 'Flutter / Dart', category: 'Mobile', usedIn: ['lostfound'] },
  { id: 'git', label: 'Git', category: 'Tools', usedIn: [] },
  { id: 'github', label: 'GitHub', category: 'Tools', usedIn: [] },
  { id: 'vscode', label: 'VS Code', category: 'Tools', usedIn: [] },
  { id: 'postman', label: 'Postman', category: 'Tools', usedIn: [] },
];

// Projects — the centerpiece of NITIN. Each has an optional case-study
// so recruiters can see reasoning, not just outcomes. Links are left null
// where no real URL exists yet (never fabricated).
export const PROJECTS = [
  {
    id: 'certihire',
    index: '01',
    name: 'CertiHire',
    tagline: 'Credential Management',
    description:
      'A certificate and credential management concept that helps candidates organize, verify, and showcase their certifications during the hiring process.',
    tech: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS', 'Express'],
    github: null,
    live: null,
    caseStudy: {
      problem:
        'Job candidates collect certifications across many platforms (Coursera, LinkedIn Learning, AWS, university programs) with no single place to organize or verify them for recruiters.',
      approach:
        'Designed a credential dashboard where a candidate uploads certificates once and generates a shareable, categorized profile — reducing the friction of proving skills during hiring.',
      features: [
        'Centralized certificate upload & storage',
        'Category-based organization',
        'Shareable candidate credential profile',
        'MongoDB-backed persistence with a React front end',
      ],
      architecture:
        'A React single-page front end talks to an Express + Node.js REST API, with MongoDB storing candidate and credential records. Tailwind CSS drives a component-based design system.',
      result:
        'A working proof-of-concept that demonstrates a full MERN-stack flow from upload to shareable profile.',
      learned:
        'Deepened practical experience with REST API design, MongoDB schema modeling, and building a cohesive design system in Tailwind.',
    },
  },
  {
    id: 'lostfound',
    index: '02',
    name: 'MU Lost & Found',
    tagline: 'Campus Recovery',
    description:
      'A Flutter-based mobile application for Marwadi University that helps students report, search, and recover lost and found items through a simple, user-friendly interface.',
    tech: ['Flutter', 'Dart', 'Firebase'],
    github: null,
    live: null,
    caseStudy: {
      problem:
        'Students at Marwadi University had no centralized way to report or search for lost items on campus, so recovery relied on word of mouth.',
      approach:
        'Built a mobile-first app where students can post a lost or found item with a description and photo, and search existing listings before posting a duplicate.',
      features: [
        'Report a lost or found item with photo and description',
        'Searchable listings feed',
        'Firebase-backed real-time data sync',
        'Simple, campus-friendly UI',
      ],
      architecture:
        'Flutter front end for cross-platform mobile delivery, backed by Firebase for authentication, storage, and a real-time database of listings.',
      result:
        'A functional mobile app tailored to a real campus problem, built and shipped as a Flutter + Firebase project.',
      learned:
        'Hands-on experience with Flutter widget composition, state handling, and wiring a real-time Firebase backend to a mobile client.',
    },
  },
  {
    id: 'chatx',
    index: '03',
    name: 'Chat-X',
    tagline: 'Desktop Messenger',
    description:
      'A desktop chat application featuring secure authentication, customizable themes, database integration, dynamic IP handling, and real-time communication.',
    tech: ['Python', 'Tkinter', 'MySQL', 'Socket Programming'],
    github: null,
    live: null,
    caseStudy: {
      problem:
        'Wanted to understand how real-time messaging actually works under the hood, below the level of a framework that hides sockets and connection handling.',
      approach:
        'Built a desktop chat client and server from scratch using raw socket programming, with a MySQL-backed user store and a Tkinter GUI.',
      features: [
        'Secure user authentication',
        'Customizable UI themes',
        'Dynamic IP handling for connections',
        'Real-time messaging over sockets',
      ],
      architecture:
        'A Python socket server accepts and routes client connections; each client runs a Tkinter GUI; user records and message history persist in MySQL.',
      result:
        'A working desktop chat system that demonstrates low-level networking concepts alongside a usable GUI.',
      learned:
        'Practical understanding of socket programming, concurrent connection handling, and building a GUI application without a web framework.',
    },
  },
  {
    id: 'mitra',
    index: '04',
    name: 'Mitra — AI Career Guidance',
    tagline: 'Career Exploration',
    description:
      'A web application designed to help students explore career opportunities using AI-powered guidance and recommendations.',
    tech: ['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
    github: null,
    live: null,
    caseStudy: {
      problem:
        'Students often pick career paths with limited information about what a field actually involves or which paths fit their interests.',
      approach:
        'Built a web platform that gathers a student\u2019s interests and background, then surfaces career recommendations and guidance content.',
      features: [
        'Student interest intake flow',
        'AI-assisted career recommendations',
        'MySQL-backed content and user data',
        'Responsive, accessible front end',
      ],
      architecture:
        'A classic PHP + MySQL server-rendered application, with vanilla HTML/CSS/JavaScript on the front end for interactivity.',
      result:
        'A functioning guidance tool that connects student input to relevant career information.',
      learned:
        'Reinforced fundamentals of server-side PHP development and relational data modeling for a content-driven application.',
    },
  },
];

// Journey / timeline — real education & development milestones only.
export const TIMELINE = [
  {
    year: '2024 — Present',
    title: 'Master of Computer Applications (MCA)',
    subtitle: 'Marwadi University',
    desc: 'Pursuing advanced coursework in software engineering, application development, and computer science fundamentals.',
    type: 'Education',
  },
  {
    year: '2023 — 2024',
    title: 'Full-Stack Development Projects',
    subtitle: 'Self-Directed',
    desc: 'Built and shipped multiple web and mobile applications using React, Node.js, Flutter, and Firebase.',
    type: 'Projects',
  },
  {
    year: '2021 — 2024',
    title: 'Bachelor of Computer Applications (BCA)',
    subtitle: 'Marwadi University',
    desc: 'Completed foundational studies in programming, data structures, algorithms, databases, and software development.',
    type: 'Education',
  },
  {
    year: '2022 — 2023',
    title: 'UI/UX Design Fundamentals',
    subtitle: 'Design & Prototyping',
    desc: 'Explored interface design principles and prototyping in Figma while building design systems for web applications.',
    type: 'Learning',
  },
];

// "Currently Building" — kept honest and generic; no fabricated progress
// numbers beyond what's reasonable to state about an evolving portfolio.
export const CURRENTLY_BUILDING = {
  title: 'NITIN — Portfolio 2.0',
  description:
    'Reworking this portfolio into a more interactive developer workspace, with a stronger focus on project storytelling and technical depth.',
  status: 'In progress',
  progress: 80,
};
