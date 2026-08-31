import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PATHS = [
  {
    id: 'work',
    label: 'My Work',
    sub: 'Projects',
    desc: 'Real applications built to solve real problems — from mobile apps to full-stack platforms.',
  },
  {
    id: 'skills',
    label: 'My Skills',
    sub: 'Tech Stack',
    desc: 'A connected map of the technologies I use, and the projects I\u2019ve used them in.',
  },
  {
    id: 'journey',
    label: 'My Journey',
    sub: 'Experience',
    desc: 'Education, learning, and development milestones over time.',
  },
];

function PathCard({ path }) {
  const cardRef = useRef(null);

  const handleMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(el, { rotateY: x * 8, rotateX: -y * 8, transformPerspective: 800, duration: 0.4, ease: 'power2.out' });
  };
  const handleLeave = () => gsap.to(cardRef.current, { rotateY: 0, rotateX: 0, duration: 0.6, ease: 'power3.out' });

  const goTo = (e) => {
    e.preventDefault();
    document.getElementById(path.id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <a
      href={`#${path.id}`}
      onClick={goTo}
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="path-card group relative flex flex-col justify-between rounded-2xl p-8 h-64 overflow-hidden transition-colors duration-300"
      style={{ background: 'var(--surface)', border: '1px solid var(--border-subtle)', transformStyle: 'preserve-3d' }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: 'linear-gradient(135deg, rgba(255,30,45,0.08), transparent 60%)' }}
      />
      <div style={{ transform: 'translateZ(20px)' }}>
        <p className="section-eyebrow mb-3">{path.sub}</p>
        <h3 className="text-2xl md:text-3xl font-bold font-display text-white leading-tight">{path.label}</h3>
      </div>
      <div className="flex items-end justify-between" style={{ transform: 'translateZ(20px)' }}>
        <p className="text-sm max-w-[85%]" style={{ color: 'var(--text-secondary)' }}>{path.desc}</p>
        <span
          className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
          style={{ border: '1px solid var(--border-subtle)', color: 'var(--accent)' }}
        >
          &#8599;
        </span>
      </div>
    </a>
  );
}

export default function ChoosePath() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current.querySelectorAll('.reveal'),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none reverse' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 px-6 md:px-12 lg:px-24"
      style={{ background: 'var(--bg-secondary)' }}
    >
      <div className="max-w-6xl mx-auto w-full">
        <p className="reveal section-eyebrow mb-4 text-center">Explore</p>
        <h2 className="reveal text-3xl md:text-5xl font-bold font-display text-white text-center mb-14">
          What do you want to <span className="gradient-text">explore?</span>
        </h2>
        <div className="reveal grid grid-cols-1 md:grid-cols-3 gap-6">
          {PATHS.map((path) => (
            <PathCard key={path.id} path={path} />
          ))}
        </div>
      </div>
    </section>
  );
}
