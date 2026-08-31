import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import TechRadar from './TechRadar';
import { PROFILE, SKILLS } from '../data/portfolioData';

const FEATURED_TECH = ['react', 'nodejs', 'mongodb', 'py', 'js'];

function MagneticButton({ children, className, style, href, download, onClick }) {
  const ref = useRef(null);

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(el, { x: x * 0.25, y: y * 0.25, duration: 0.4, ease: 'power2.out' });
  };
  const handleLeave = () => gsap.to(ref.current, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });

  return (
    <a
      ref={ref}
      href={href}
      download={download}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={className}
      style={style}
    >
      {children}
    </a>
  );
}

export default function Hero() {
  const badgeRef = useRef(null);
  const headingRef = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);
  const chipsRef = useRef(null);
  const radarRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(badgeRef.current, { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 0.7 })
        .fromTo(
          headingRef.current.children,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.1 },
          '-=0.3'
        )
        .fromTo(subRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
        .fromTo(chipsRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.5')
        .fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
        .fromTo(radarRef.current, { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 1.1 }, '-=0.9');
    });

    return () => ctx.revert();
  }, []);

  const scrollTo = (id) => (e) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative w-full min-h-screen overflow-hidden flex items-center"
      style={{ background: 'var(--bg-primary)' }}
    >
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(255,30,45,0.14) 0%, rgba(255,30,45,0.04) 45%, transparent 70%)',
            filter: 'blur(50px)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.25]"
          style={{
            backgroundImage:
              'radial-gradient(1px 1px at 20% 30%, rgba(255,255,255,0.5) 0%, transparent 100%), radial-gradient(1px 1px at 70% 20%, rgba(255,255,255,0.4) 0%, transparent 100%), radial-gradient(1px 1px at 40% 70%, rgba(255,255,255,0.4) 0%, transparent 100%), radial-gradient(1px 1px at 85% 60%, rgba(255,255,255,0.3) 0%, transparent 100%), radial-gradient(1px 1px at 10% 85%, rgba(255,255,255,0.3) 0%, transparent 100%)',
            backgroundSize: '600px 600px',
          }}
        />
      </div>

      {/* Decorative tech radar, right side, behind copy */}
      <div ref={radarRef} className="absolute top-1/2 right-[-40px] -translate-y-1/2 z-0">
        <TechRadar />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-16 pt-32 pb-20">
        <div className="max-w-2xl">
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs md:text-sm font-medium mb-8 font-mono"
            style={{ background: 'var(--surface)', border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)' }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ background: 'var(--accent)' }} />
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: 'var(--accent)' }} />
            </span>
            SYSTEM ONLINE &middot; {PROFILE.title.toUpperCase()}
          </div>

          <h1
            ref={headingRef}
            className="font-display font-bold tracking-tight leading-[0.98] text-[clamp(2.6rem,7vw,5.25rem)] mb-6 uppercase"
          >
            <span className="block text-white">Building</span>
            <span className="block gradient-text">Digital</span>
            <span className="block text-white">Experiences</span>
          </h1>

          <p ref={subRef} className="max-w-lg text-base md:text-lg mb-3" style={{ color: 'var(--text-secondary)' }}>
            {PROFILE.positioning}
          </p>
          <p className="text-sm font-display font-semibold tracking-wide mb-8" style={{ color: 'var(--text-primary)' }}>
            {PROFILE.name} &mdash; {PROFILE.title}
          </p>

          <div ref={chipsRef} className="flex flex-wrap items-center gap-3 mb-10">
            {FEATURED_TECH.map((id) => {
              const skill = SKILLS.find((s) => s.id === id);
              if (!skill) return null;
              return (
                <span
                  key={id}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)' }}
                >
                  <img src={`https://skillicons.dev/icons?i=${id}`} alt="" width={16} height={16} loading="lazy" />
                  {skill.label}
                </span>
              );
            })}
          </div>

          <div ref={ctaRef} className="flex flex-wrap items-center gap-4">
            <MagneticButton
              href="#work"
              onClick={scrollTo('work')}
              className="px-7 py-3.5 rounded-full text-sm font-semibold tracking-wide transition-shadow duration-300"
              style={{ background: 'var(--accent)', color: 'var(--accent-ink)', boxShadow: '0 0 24px rgba(255,30,45,0.25)' }}
            >
              Explore My Work
            </MagneticButton>
            <MagneticButton
              href={PROFILE.resumeUrl}
              download
              className="px-7 py-3.5 rounded-full text-sm font-semibold tracking-wide"
              style={{ border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', background: 'var(--surface)' }}
            >
              Download Resume
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
