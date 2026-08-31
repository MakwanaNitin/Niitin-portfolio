import React, { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SKILLS, PROJECTS } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = ['Frontend', 'Backend', 'Database', 'Mobile', 'Tools'];

// Hub-and-spoke node positions (percentage-based, within a 360x360 box)
const CATEGORY_POS = {
  Frontend: { x: 50, y: 6 },
  Backend: { x: 92, y: 38 },
  Database: { x: 78, y: 92 },
  Mobile: { x: 22, y: 92 },
  Tools: { x: 8, y: 38 },
};

function projectNames(ids) {
  return ids
    .map((id) => PROJECTS.find((p) => p.id === id)?.name)
    .filter(Boolean);
}

export default function TechMap() {
  const sectionRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState('Frontend');
  const [activeSkill, setActiveSkill] = useState(null);

  const skillsInCategory = useMemo(
    () => SKILLS.filter((s) => s.category === activeCategory),
    [activeCategory]
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current.querySelectorAll('.reveal'),
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none reverse' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="relative w-full py-24 px-6 md:px-12 lg:px-24 overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-6xl mx-auto w-full">
        <div className="reveal mb-14 text-center">
          <p className="section-eyebrow mb-3">Tech Stack</p>
          <h2 className="text-3xl md:text-5xl font-bold font-display text-white mb-3">
            My <span className="gradient-text">Technology Map</span>
          </h2>
          <p className="text-sm md:text-base max-w-lg mx-auto" style={{ color: 'var(--text-secondary)' }}>
            A connected view of the technologies I work with, grouped by category and linked to the projects that use them.
          </p>
        </div>

        <div className="reveal grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-10 items-start">
          {/* Hub diagram */}
          <div className="relative mx-auto w-full max-w-[380px] aspect-square">
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
              {CATEGORIES.map((cat) => {
                const pos = CATEGORY_POS[cat];
                return (
                  <line
                    key={cat}
                    x1="50" y1="50" x2={pos.x} y2={pos.y}
                    stroke={activeCategory === cat ? 'var(--accent)' : 'var(--border-subtle)'}
                    strokeWidth={activeCategory === cat ? 0.6 : 0.4}
                  />
                );
              })}
            </svg>

            {/* Center node */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full flex items-center justify-center text-xs font-display font-bold"
              style={{ background: 'var(--accent)', color: 'var(--accent-ink)', boxShadow: '0 0 30px rgba(255,30,45,0.3)' }}
            >
              NITIN
            </div>

            {/* Category nodes */}
            {CATEGORIES.map((cat) => {
              const pos = CATEGORY_POS[cat];
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat); setActiveSkill(null); }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 px-3 py-2 rounded-full text-[10px] md:text-xs font-medium uppercase tracking-wide transition-all duration-300 whitespace-nowrap"
                  style={{
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                    background: isActive ? 'var(--accent)' : 'var(--bg-elevated)',
                    color: isActive ? 'var(--accent-ink)' : 'var(--text-secondary)',
                    border: '1px solid var(--border-subtle)',
                  }}
                  aria-pressed={isActive}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Skills grid + detail panel */}
          <div>
            <div className="flex flex-wrap gap-3 mb-8">
              {skillsInCategory.map((skill) => {
                const isActive = activeSkill?.id === skill.id;
                return (
                  <button
                    key={skill.id}
                    onClick={() => setActiveSkill(isActive ? null : skill)}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-300"
                    style={{
                      background: isActive ? 'var(--accent-soft)' : 'var(--surface)',
                      border: `1px solid ${isActive ? 'var(--accent)' : 'var(--border-subtle)'}`,
                      color: isActive ? 'var(--accent)' : 'var(--text-primary)',
                    }}
                    aria-pressed={isActive}
                  >
                    <img src={`https://skillicons.dev/icons?i=${skill.id}`} alt="" width={18} height={18} loading="lazy" />
                    {skill.label}
                  </button>
                );
              })}
            </div>

            <div
              className="rounded-2xl p-6 min-h-[160px]"
              style={{ background: 'var(--surface)', border: '1px solid var(--border-subtle)' }}
            >
              {activeSkill ? (
                <>
                  <div className="flex items-center gap-3 mb-3">
                    <img src={`https://skillicons.dev/icons?i=${activeSkill.id}`} alt="" width={28} height={28} />
                    <div>
                      <h3 className="text-lg font-bold font-display text-white">{activeSkill.label}</h3>
                      <p className="text-xs uppercase tracking-widest" style={{ color: 'var(--accent)' }}>{activeSkill.category}</p>
                    </div>
                  </div>
                  <p className="text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>Used in</p>
                  {activeSkill.usedIn.length > 0 ? (
                    <ul className="flex flex-wrap gap-2">
                      {projectNames(activeSkill.usedIn).map((name) => (
                        <li key={name} className="text-xs px-3 py-1.5 rounded-full" style={{ border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)' }}>
                          {name}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Core toolkit &mdash; used across day-to-day development.</p>
                  )}
                </>
              ) : (
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  Select a technology above to see where it&rsquo;s been put to use.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
