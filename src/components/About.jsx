import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROFILE } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none reverse' },
      });

      tl.fromTo(imgRef.current, { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 1, ease: 'power3.out' }).fromTo(
        textRef.current.querySelectorAll('.stagger-reveal'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out' },
        '-=0.7'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full py-24 px-6 md:px-12 lg:px-24"
      style={{ background: 'var(--bg-primary)' }}
    >
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-14 items-start">
        {/* Portrait */}
        <div
          ref={imgRef}
          className="relative w-48 h-48 lg:w-full lg:h-64 mx-auto lg:mx-0 rounded-2xl overflow-hidden"
          style={{ border: '1px solid var(--border-subtle)' }}
        >
          <img
            src={PROFILE.profileImg}
            alt={`${PROFILE.name}, software developer`}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ boxShadow: 'inset 0 0 0 1px rgba(255,30,45,0.15)' }} />
        </div>

        {/* Profile block */}
        <div ref={textRef}>
          <p className="stagger-reveal section-eyebrow mb-4">About</p>
          <h2 className="stagger-reveal text-3xl md:text-5xl font-bold font-display text-white mb-2">
            {PROFILE.name}
          </h2>
          <p className="stagger-reveal text-sm font-mono tracking-widest uppercase mb-6" style={{ color: 'var(--accent)' }}>
            {PROFILE.title}
          </p>

          <p className="stagger-reveal text-base md:text-lg leading-relaxed max-w-2xl mb-8" style={{ color: 'var(--text-secondary)' }}>
            {PROFILE.bio}
          </p>

          <div className="stagger-reveal mb-8">
            <p className="text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>Focus</p>
            <div className="flex flex-wrap gap-2">
              {PROFILE.focus.map((f) => (
                <span
                  key={f}
                  className="px-3 py-1.5 rounded-full text-xs font-medium"
                  style={{ border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)', background: 'var(--surface)' }}
                >
                  {f}
                </span>
              ))}
            </div>
          </div>

          <blockquote className="stagger-reveal pl-5" style={{ borderLeft: '2px solid var(--accent)' }}>
            <p className="text-base md:text-lg italic font-display" style={{ color: 'var(--text-primary)' }}>
              &ldquo;{PROFILE.quote}&rdquo;
            </p>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
