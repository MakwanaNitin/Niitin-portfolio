import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROJECTS } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

function LinkOrPlaceholder({ href, label }) {
  if (!href) {
    return (
      <span className="text-xs uppercase tracking-widest font-medium" style={{ color: 'var(--text-muted)' }} title="Link not published yet">
        {label} &mdash; coming soon
      </span>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-xs uppercase tracking-widest font-medium text-white transition-colors"
      style={{ '--tw-text-opacity': 1 }}
      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
      onMouseLeave={(e) => (e.currentTarget.style.color = '#fff')}
    >
      {label} &#8599;
    </a>
  );
}

const CASE_STUDY_STEPS = [
  { key: 'problem', num: '01', label: 'Problem' },
  { key: 'approach', num: '02', label: 'Approach' },
  { key: 'features', num: '03', label: 'Features' },
  { key: 'architecture', num: '04', label: 'Architecture' },
  { key: 'result', num: '05', label: 'Result' },
  { key: 'learned', num: '06', label: 'What I Learned' },
];

function CaseStudyModal({ project, onClose }) {
  const overlayRef = useRef(null);
  const boxRef = useRef(null);

  const handleClose = useCallback(() => {
    gsap.to(boxRef.current, { scale: 0.94, opacity: 0, y: 20, duration: 0.25, ease: 'power2.in' });
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.25, onComplete: onClose });
  }, [onClose]);

  useEffect(() => {
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25 });
    gsap.fromTo(boxRef.current, { scale: 0.92, opacity: 0, y: 30 }, { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' });
    const onKey = (e) => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [handleClose]);

  const cs = project.caseStudy;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)' }}
      onClick={(e) => { if (e.target === overlayRef.current) handleClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.name} case study`}
    >
      <div
        ref={boxRef}
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl"
        style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}
      >
        <button
          onClick={handleClose}
          aria-label="Close case study"
          className="sticky top-4 float-right mr-4 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-colors"
          style={{ border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)', background: 'var(--bg-elevated)' }}
        >
          &#10005;
        </button>

        <div className="p-8 md:p-10">
          <p className="section-eyebrow mb-2">Case Study &mdash; {project.index}</p>
          <h3 className="text-3xl font-bold font-display text-white mb-1">{project.name}</h3>
          <p className="text-sm mb-8" style={{ color: 'var(--accent)' }}>{project.tagline}</p>

          <div className="space-y-8">
            {CASE_STUDY_STEPS.map(({ key, num, label }) => {
              if (key === 'features') {
                return (
                  <div key={key}>
                    <p className="text-xs font-mono tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>{num} &mdash; {label.toUpperCase()}</p>
                    <ul className="space-y-1.5">
                      {cs.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                          <span style={{ color: 'var(--accent)' }}>&#9642;</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              }
              return (
                <div key={key}>
                  <p className="text-xs font-mono tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>{num} &mdash; {label.toUpperCase()}</p>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{cs[key]}</p>
                </div>
              );
            })}

            <div>
              <p className="text-xs font-mono tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>07 &mdash; TECHNOLOGY</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="text-xs px-3 py-1 rounded-full" style={{ border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)' }}>{t}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6 mt-10 pt-6" style={{ borderTop: '1px solid var(--border-subtle)' }}>
            <LinkOrPlaceholder href={project.github} label="GitHub" />
            <LinkOrPlaceholder href={project.live} label="Live Demo" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectRow({ project, isActive, onSelect }) {
  return (
    <button
      onClick={() => onSelect(project.id)}
      className="w-full text-left flex items-center gap-5 py-5 px-2 md:px-4 border-b transition-colors duration-300 group"
      style={{ borderColor: 'var(--border-subtle)', background: isActive ? 'var(--surface)' : 'transparent' }}
      aria-expanded={isActive}
    >
      <span
        className="font-mono text-sm w-8 flex-shrink-0"
        style={{ color: isActive ? 'var(--accent)' : 'var(--text-muted)' }}
      >
        {project.index}
      </span>
      <div className="flex-1 min-w-0">
        <h3
          className="text-lg md:text-2xl font-bold font-display transition-colors duration-300 truncate"
          style={{ color: isActive ? 'var(--accent)' : 'var(--text-primary)' }}
        >
          {project.name}
        </h3>
        <p className="text-xs md:text-sm truncate" style={{ color: 'var(--text-muted)' }}>{project.tagline}</p>
      </div>
      <span
        className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300"
        style={{
          border: '1px solid var(--border-subtle)',
          color: 'var(--text-secondary)',
          transform: isActive ? 'rotate(45deg)' : 'rotate(0deg)',
        }}
      >
        +
      </span>
    </button>
  );
}

export default function Work() {
  const sectionRef = useRef(null);
  const [activeId, setActiveId] = useState(PROJECTS[0].id);
  const [caseStudyProject, setCaseStudyProject] = useState(null);
  const panelRef = useRef(null);

  const active = PROJECTS.find((p) => p.id === activeId);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current.querySelectorAll('.reveal'),
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none reverse' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!panelRef.current) return;
    gsap.fromTo(panelRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' });
  }, [activeId]);

  return (
    <section id="work" ref={sectionRef} className="relative w-full py-24 px-6 md:px-12 lg:px-24" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-6xl mx-auto w-full">
        <div className="reveal mb-14 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b pb-8" style={{ borderColor: 'var(--border-subtle)' }}>
          <div>
            <p className="section-eyebrow mb-3">Selected Work</p>
            <h2 className="text-4xl md:text-5xl font-bold font-display text-white leading-none">Projects</h2>
          </div>
          <p className="text-sm md:text-base max-w-sm" style={{ color: 'var(--text-secondary)' }}>
            A selection of applications built for real problems, from mobile apps to full-stack platforms.
          </p>
        </div>

        <div className="reveal grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_380px] gap-10 items-start">
          {/* Project index list */}
          <div>
            {PROJECTS.map((project) => (
              <ProjectRow key={project.id} project={project} isActive={project.id === activeId} onSelect={setActiveId} />
            ))}
          </div>

          {/* Live preview panel */}
          {active && (
            <div
              key={active.id}
              ref={panelRef}
              className="rounded-2xl p-6 sticky top-24"
              style={{ background: 'var(--surface)', border: '1px solid var(--border-subtle)' }}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono tracking-widest" style={{ color: 'var(--accent)' }}>PROJECT {active.index}</span>
              </div>
              <h3 className="text-xl font-bold font-display text-white mb-2">{active.name}</h3>
              <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--text-secondary)' }}>{active.description}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {active.tech.map((t) => (
                  <span key={t} className="text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full" style={{ border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)' }}>{t}</span>
                ))}
              </div>

              <button
                onClick={() => setCaseStudyProject(active)}
                className="w-full mb-5 py-3 rounded-full text-xs uppercase tracking-widest font-semibold transition-transform duration-300 hover:scale-[1.02]"
                style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}
              >
                View Case Study
              </button>

              <div className="flex items-center gap-6">
                <LinkOrPlaceholder href={active.github} label="GitHub" />
                <LinkOrPlaceholder href={active.live} label="Live Demo" />
              </div>
            </div>
          )}
        </div>
      </div>

      {caseStudyProject && <CaseStudyModal project={caseStudyProject} onClose={() => setCaseStudyProject(null)} />}
    </section>
  );
}
