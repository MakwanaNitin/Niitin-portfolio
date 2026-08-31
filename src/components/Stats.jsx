import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROJECTS, SKILLS } from '../data/portfolioData';
import { CERTIFICATES } from '../utils/certificateLoader';

gsap.registerPlugin(ScrollTrigger);

function Counter({ target, suffix = '', inView }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const obj = { n: 0 };
    gsap.to(obj, { n: target, duration: 1.6, ease: 'power2.out', onUpdate: () => setVal(Math.round(obj.n)) });
  }, [inView, target]);
  return (
    <span className="text-3xl md:text-4xl font-bold font-display" style={{ color: 'var(--accent)' }}>
      {val}{suffix}
    </span>
  );
}

const STATS = [
  { target: PROJECTS.length, suffix: '+', label: 'Projects' },
  { target: CERTIFICATES.length, suffix: '+', label: 'Certifications' },
  { target: SKILLS.length, suffix: '+', label: 'Technologies' },
  { target: new Set(PROJECTS.flatMap((p) => p.tech)).size, suffix: '+', label: 'Tools Used' },
];

export default function Stats() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const trigger = ScrollTrigger.create({ trigger: ref.current, start: 'top 90%', onEnter: () => setVisible(true) });
    return () => trigger.kill();
  }, []);

  return (
    <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto w-full">
      {STATS.map((s) => (
        <div
          key={s.label}
          className="flex flex-col items-center gap-1 rounded-2xl py-6 px-4 text-center"
          style={{ background: 'var(--surface)', border: '1px solid var(--border-subtle)' }}
        >
          <Counter target={s.target} suffix={s.suffix} inView={visible} />
          <span className="text-xs uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>{s.label}</span>
        </div>
      ))}
    </div>
  );
}
