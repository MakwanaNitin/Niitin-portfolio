import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TIMELINE } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

export default function Journey() {
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
        sectionRef.current.querySelectorAll('.timeline-item'),
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.15, ease: 'power3.out' },
        '-=0.4'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="journey" ref={sectionRef} className="relative w-full py-24 px-6 md:px-12 lg:px-24" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-4xl mx-auto w-full">
        <p className="header-reveal section-eyebrow mb-4">The Journey</p>
        <h2 className="header-reveal text-4xl md:text-5xl font-bold tracking-tight text-white font-display mb-16">
          Experience &amp; <span className="gradient-text">Education</span>
        </h2>

        <div className="relative pl-10">
          <div
            className="absolute left-0 top-0 bottom-0 w-px"
            style={{ background: 'linear-gradient(to bottom, var(--accent), rgba(255,30,45,0.05))' }}
          />

          {TIMELINE.map((item, i) => (
            <div key={i} className="timeline-item relative mb-12 last:mb-0">
              <div
                className="absolute -left-[42px] top-1.5 w-2.5 h-2.5 rounded-full"
                style={{ background: 'var(--accent)', boxShadow: '0 0 12px rgba(255,30,45,0.6)' }}
              />

              <div className="relative overflow-hidden rounded-xl p-6" style={{ background: 'var(--surface)', border: '1px solid var(--border-subtle)' }}>
                <div className="absolute top-0 left-0 w-[3px] h-full opacity-70" style={{ background: 'var(--accent)' }} />

                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <span
                    className="text-[11px] font-display tracking-wider px-2 py-0.5 rounded"
                    style={{ color: 'var(--accent)', border: '1px solid rgba(255,30,45,0.25)' }}
                  >
                    {item.year}
                  </span>
                  <span className="text-[11px] uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                    {item.type}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-1 font-display">{item.title}</h3>
                <p className="text-sm mb-3" style={{ color: 'var(--accent)' }}>{item.subtitle}</p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
