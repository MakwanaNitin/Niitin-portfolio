import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CURRENTLY_BUILDING } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

export default function CurrentlyBuilding() {
  const sectionRef = useRef(null);
  const barRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 85%',
      onEnter: () => setVisible(true),
    });
    return () => trigger.kill();
  }, []);

  useEffect(() => {
    if (!visible || !barRef.current) return;
    gsap.fromTo(barRef.current, { width: '0%' }, { width: `${CURRENTLY_BUILDING.progress}%`, duration: 1.2, ease: 'power2.out' });
  }, [visible]);

  return (
    <section ref={sectionRef} className="w-full py-16 px-6 md:px-12 lg:px-24" style={{ background: 'var(--bg-primary)' }}>
      <div
        className="max-w-3xl mx-auto w-full rounded-2xl p-8 flex flex-col md:flex-row md:items-center gap-6"
        style={{ background: 'var(--surface)', border: '1px solid var(--border-subtle)' }}
      >
        <div className="flex-shrink-0 flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ background: 'var(--accent)' }} />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ background: 'var(--accent)' }} />
          </span>
          <span className="text-xs uppercase tracking-widest font-mono" style={{ color: 'var(--accent)' }}>
            Currently Building
          </span>
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-bold font-display text-white mb-1">{CURRENTLY_BUILDING.title}</h3>
          <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>{CURRENTLY_BUILDING.description}</p>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--border-subtle)' }}>
              <div ref={barRef} className="h-full rounded-full" style={{ background: 'var(--accent)', width: '0%' }} />
            </div>
            <span className="text-xs font-mono flex-shrink-0" style={{ color: 'var(--text-muted)' }}>
              {CURRENTLY_BUILDING.status} &middot; {CURRENTLY_BUILDING.progress}%
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
