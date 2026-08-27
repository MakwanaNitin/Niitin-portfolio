import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import TechRadar from './TechRadar';

export default function Hero() {
  const badgeRef = useRef(null);
  const headingRef = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);
  const radarRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(badgeRef.current, { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 0.7 })
        .fromTo(
          headingRef.current.children,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.12 },
          '-=0.3'
        )
        .fromTo(subRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
        .fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.6')
        .fromTo(radarRef.current, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 1.1 }, '-=0.9');
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
      {/* Ambient space background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(139,92,246,0.35) 0%, rgba(139,92,246,0.08) 45%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              'radial-gradient(1px 1px at 20% 30%, rgba(255,255,255,0.6) 0%, transparent 100%), radial-gradient(1px 1px at 70% 20%, rgba(255,255,255,0.5) 0%, transparent 100%), radial-gradient(1px 1px at 40% 70%, rgba(255,255,255,0.5) 0%, transparent 100%), radial-gradient(1px 1px at 85% 60%, rgba(255,255,255,0.4) 0%, transparent 100%), radial-gradient(1px 1px at 10% 85%, rgba(255,255,255,0.4) 0%, transparent 100%)',
            backgroundSize: '600px 600px',
          }}
        />
      </div>

      {/* Decorative static tech radar, positioned right, behind copy */}
      <div ref={radarRef} className="absolute top-1/2 right-[-40px] -translate-y-1/2 z-0">
        <TechRadar />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-16 pt-32 pb-20">
        <div className="max-w-2xl">
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs md:text-sm font-medium mb-8"
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border-subtle)',
            color: 'var(--text-secondary)',
          }}
        >
          <span className="relative flex h-2 w-2">
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
              style={{ background: 'var(--accent-bright)' }}
            />
            <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: 'var(--accent-bright)' }} />
          </span>
          Software Developer &middot; Full-Stack Developer
        </div>

        <h1
          ref={headingRef}
          className="font-display font-bold tracking-tight leading-[1.02] text-[clamp(2.5rem,6.5vw,4.75rem)] mb-6 flex flex-wrap items-center gap-x-5 gap-y-2"
        >
          <span className="block text-white w-full">Hi, I'm</span>
          <span className="inline-flex items-center gap-5">
            <span className="gradient-text">Nitin</span>
            <span
              className="inline-block rounded-full overflow-hidden align-middle"
              style={{
                width: 84,
                height: 84,
                boxShadow: '0 0 0 3px rgba(139,92,246,0.55), 0 0 40px rgba(139,92,246,0.35)',
              }}
            >
              <img
                src={`${import.meta.env.BASE_URL}profile.jpg`}
                alt="Nitin Makwana"
                className="w-full h-full object-cover"
                loading="eager"
              />
            </span>
          </span>
          <span className="block text-white w-full">Makwana</span>
        </h1>

        <p ref={subRef} className="max-w-lg text-base md:text-lg mb-10" style={{ color: 'var(--text-secondary)' }}>
          Building practical software and digital products with React, Node.js, and modern web technologies.
        </p>

        <div ref={ctaRef} className="flex flex-wrap items-center gap-4">
          <a
            href="#projects"
            onClick={scrollTo('projects')}
            className="px-7 py-3.5 rounded-full text-sm font-semibold tracking-wide text-white transition-all duration-300 hover:scale-[1.03]"
            style={{
              background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-bright) 100%)',
              boxShadow: '0 0 24px rgba(139,92,246,0.35)',
            }}
          >
            View Projects
          </a>
          <a
            href={`${import.meta.env.BASE_URL}resume.pdf`}
            download
            className="px-7 py-3.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 hover:scale-[1.03]"
            style={{ border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', background: 'var(--surface)' }}
          >
            Download Resume
          </a>
        </div>
        </div>
      </div>
    </section>
  );
}
