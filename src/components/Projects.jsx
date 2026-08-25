import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Project data. GitHub/live links are only shown when a real URL exists —
// projects without a confirmed link show a clearly-labelled placeholder
// instead of a fabricated href, per the "no invented URLs" content rule.
const PROJECTS = [
  {
    id: '01',
    name: 'CertiHire',
    description:
      'A certificate and credential management concept that helps candidates organize, verify, and showcase their certifications during the hiring process.',
    tech: ['React', 'Node.js', 'MongoDB'],
    github: null,
    live: null,
    gradient: 'from-violet-600/25 via-fuchsia-500/10 to-transparent',
    glyph: 'CH',
  },
  {
    id: '02',
    name: 'MU Lost & Found',
    description:
      'A Flutter-based mobile application for Marwadi University that helps students report, search, and recover lost and found items through a simple, user-friendly interface.',
    tech: ['Flutter', 'Dart', 'Firebase'],
    github: null,
    live: null,
    gradient: 'from-indigo-600/25 via-violet-500/10 to-transparent',
    glyph: 'LF',
  },
  {
    id: '03',
    name: 'Chat-X',
    description:
      'A desktop chat application featuring secure authentication, customizable themes, database integration, dynamic IP handling, and real-time communication.',
    tech: ['Python', 'Tkinter', 'MySQL', 'Socket Programming'],
    github: null,
    live: null,
    gradient: 'from-purple-600/25 via-indigo-500/10 to-transparent',
    glyph: 'CX',
  },
  {
    id: '04',
    name: 'Mitra — AI Career Guidance',
    description:
      'A web application designed to help students explore career opportunities using AI-powered guidance and recommendations.',
    tech: ['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
    github: null,
    live: null,
    gradient: 'from-fuchsia-600/25 via-purple-500/10 to-transparent',
    glyph: 'MT',
  },
];

function LinkOrPlaceholder({ href, label }) {
  if (!href) {
    return (
      <span
        className="text-xs uppercase tracking-widest font-medium"
        style={{ color: 'var(--text-muted)' }}
        title="Link not published yet"
      >
        {label} — coming soon
      </span>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-xs uppercase tracking-widest font-medium text-white hover:text-[var(--accent-bright)] transition-colors"
    >
      {label} ↗
    </a>
  );
}

const ProjectCard = ({ project }) => {
  const cardRef = useRef(null);
  const glowRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(cardRef.current, {
      rotateY: x * 10,
      rotateX: -y * 10,
      transformPerspective: 1000,
      ease: 'power2.out',
      duration: 0.4,
    });
    gsap.to(glowRef.current, { x: e.clientX - rect.left, y: e.clientY - rect.top, opacity: 1, duration: 0.2 });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, { rotateY: 0, rotateX: 0, ease: 'power3.out', duration: 0.6 });
    gsap.to(glowRef.current, { opacity: 0, duration: 0.4 });
  };

  return (
    <div
      className="project-card relative w-full h-[440px] rounded-2xl overflow-hidden cursor-pointer group"
      style={{ transformStyle: 'preserve-3d', background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Thumbnail — gradient + glyph placeholder (no fabricated screenshots) */}
      <div className={`absolute inset-0 z-0 bg-gradient-to-br ${project.gradient} flex items-center justify-center h-[55%]`}>
        <span
          className="font-display font-bold text-6xl tracking-tight opacity-30 group-hover:opacity-50 transition-opacity duration-500"
          style={{ color: '#e9e3ff' }}
        >
          {project.glyph}
        </span>
        <div
          className="absolute inset-0"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '32px 32px' }}
        />
        <div className="absolute inset-x-0 bottom-0 h-24" style={{ background: 'linear-gradient(to top, var(--bg-secondary), transparent)' }} />
      </div>

      {/* Dynamic Hover Glow */}
      <div
        ref={glowRef}
        className="absolute w-64 h-64 rounded-full blur-[80px] pointer-events-none z-10 -translate-x-1/2 -translate-y-1/2 opacity-0 mix-blend-screen"
        style={{ background: 'rgba(139,92,246,0.15)' }}
      />

      {/* Border glow on hover */}
      <div
        className="absolute inset-0 rounded-2xl transition-colors duration-500 z-20 pointer-events-none"
        style={{ boxShadow: 'inset 0 0 0 1px rgba(139,92,246,0)' }}
      />
      <div className="absolute inset-0 rounded-2xl transition-all duration-500 z-20 pointer-events-none group-hover:shadow-[inset_0_0_0_1px_rgba(139,92,246,0.4)]" />

      {/* Content */}
      <div className="absolute inset-0 z-30 p-7 flex flex-col justify-end" style={{ transform: 'translateZ(20px)' }}>
        <div className="text-[11px] font-display tracking-[0.25em] mb-2 uppercase" style={{ color: 'var(--accent-bright)' }}>
          Project {project.id}
        </div>

        <h3 className="text-2xl font-bold tracking-tight text-white mb-2 font-display leading-tight">{project.name}</h3>

        <p className="text-sm leading-relaxed mb-4 max-w-[95%]" style={{ color: 'var(--text-secondary)' }}>
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-5">
          {project.tech.map((tool) => (
            <span
              key={tool}
              className="text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full"
              style={{ border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)' }}
            >
              {tool}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <LinkOrPlaceholder href={project.github} label="GitHub" />
          <LinkOrPlaceholder href={project.live} label="Live Demo" />
        </div>
      </div>
    </div>
  );
};

export default function Projects() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none reverse' },
      });

      tl.fromTo(headerRef.current.children, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out' });

      const cards = sectionRef.current.querySelectorAll('.project-card');
      tl.fromTo(cards, { opacity: 0, y: 100, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 1.2, stagger: 0.15, ease: 'power3.out' }, '-=0.6');
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="w-full py-28 px-6 md:px-12 lg:px-24 relative overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-[90rem] mx-auto w-full relative z-10">
        <div ref={headerRef} className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end justify-between border-b pb-8" style={{ borderColor: 'var(--border-subtle)' }}>
          <div className="max-w-2xl">
            <p className="section-eyebrow mb-4">Selected Work</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white font-display leading-none">
              Featured <span className="gradient-text">Projects</span>
            </h2>
          </div>
          <p className="font-light tracking-wide text-base md:text-lg max-w-sm mt-6 md:mt-0 leading-relaxed md:text-right" style={{ color: 'var(--text-secondary)' }}>
            A selection of applications built for real problems, from mobile apps to full-stack platforms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-12">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>

      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '100px 100px' }}
      />
    </section>
  );
}
