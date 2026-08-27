import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Real, brand-colored technology badges via skillicons.dev (free, MIT-licensed
// icon badge service) — matches the reference site's flowing icon-grid look.
const SKILLS = [
  { id: 'html', label: 'HTML' },
  { id: 'css', label: 'CSS' },
  { id: 'js', label: 'JavaScript' },
  { id: 'ts', label: 'TypeScript' },
  { id: 'react', label: 'React' },
  { id: 'tailwind', label: 'Tailwind CSS' },
  { id: 'nodejs', label: 'Node.js' },
  { id: 'express', label: 'Express' },
  { id: 'java', label: 'Java' },
  { id: 'py', label: 'Python' },
  { id: 'mysql', label: 'MySQL' },
  { id: 'mongodb', label: 'MongoDB' },
  { id: 'firebase', label: 'Firebase' },
  { id: 'git', label: 'Git' },
  { id: 'github', label: 'GitHub' },
  { id: 'androidstudio', label: 'Android Studio' },
  { id: 'vscode', label: 'VS Code' },
  { id: 'postman', label: 'Postman' },
];

export default function Skills() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });

      tl.fromTo(
        sectionRef.current.querySelectorAll('.header-reveal'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out' }
      ).fromTo(
        sectionRef.current.querySelectorAll('.skill-icon'),
        { opacity: 0, scale: 0.4, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.04, ease: 'back.out(1.7)' },
        '-=0.3'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative w-full py-28 px-6 md:px-12 lg:px-24 overflow-hidden"
      style={{ background: 'var(--bg-secondary)' }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.35), transparent)' }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.10) 0%, transparent 65%)' }}
      />

      <div className="max-w-5xl mx-auto w-full relative z-10 text-center">
        <div
          className="header-reveal inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs md:text-sm font-medium mb-6"
          style={{ background: 'var(--surface)', border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)' }}
        >
          <span style={{ color: 'var(--accent-bright)' }}>✦</span>
          Practice makes progress, not perfection.
        </div>

        <h2 className="header-reveal text-3xl md:text-5xl font-bold tracking-tight text-white font-display mb-4">
          Building apps with <span className="gradient-text">modern technologies.</span>
        </h2>

        <p
          className="header-reveal text-xl md:text-2xl mb-16"
          style={{ color: 'var(--accent-bright)', fontFamily: "'Caveat', cursive" }}
        >
          Always learning, always shipping.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-5 md:gap-7">
          {SKILLS.map((skill) => (
            <div
              key={skill.id}
              className="skill-icon rounded-2xl overflow-hidden transition-transform duration-300 hover:-translate-y-2 hover:scale-110"
              style={{ width: 64, height: 64, background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)' }}
              title={skill.label}
            >
              <img
                src={`https://skillicons.dev/icons?i=${skill.id}`}
                alt={skill.label}
                width={64}
                height={64}
                loading="lazy"
                className="w-full h-full object-cover"
                style={{ textIndent: '100%', whiteSpace: 'nowrap', overflow: 'hidden', color: 'transparent' }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
