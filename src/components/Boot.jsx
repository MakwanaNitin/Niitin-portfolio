import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const BOOT_ITEMS = [
  'Developer Profile',
  'Projects',
  'Skills',
  'Experience',
  'Certificates',
];

const SESSION_KEY = 'nitinos_booted';

function prefersReducedMotion() {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export default function Boot({ onComplete }) {
  const alreadyBooted = typeof window !== 'undefined' && sessionStorage.getItem(SESSION_KEY) === '1';
  const reduced = prefersReducedMotion();
  const skip = alreadyBooted || reduced;

  const [checked, setChecked] = useState(0);
  const [ready, setReady] = useState(skip);
  const containerRef = useRef(null);

  useEffect(() => {
    if (skip) {
      sessionStorage.setItem(SESSION_KEY, '1');
      return;
    }
    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setChecked(i);
      if (i >= BOOT_ITEMS.length) {
        clearInterval(interval);
        setReady(true);
      }
    }, 220);
    return () => clearInterval(interval);
  }, [skip]);

  const handleEnter = () => {
    sessionStorage.setItem(SESSION_KEY, '1');
    if (skip) {
      onComplete();
      return;
    }
    gsap.to(containerRef.current, {
      opacity: 0,
      scale: 1.02,
      duration: 0.5,
      ease: 'power2.inOut',
      onComplete,
    });
  };

  if (skip) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100000] flex items-center justify-center px-6"
      style={{ background: 'var(--bg-primary)' }}
      role="status"
      aria-live="polite"
    >
      {/* faint grid backdrop */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative w-full max-w-sm font-mono">
        <div className="flex items-center gap-2 mb-6">
          <span className="w-2 h-2 rounded-full" style={{ background: 'var(--accent)' }} />
          <span className="text-sm tracking-[0.3em] uppercase text-white font-display font-bold">
            NITIN
          </span>
        </div>

        <p className="text-xs tracking-widest uppercase mb-5" style={{ color: 'var(--text-muted)' }}>
          {ready ? 'System ready' : 'Initializing'}
          <span className="blinking-cursor">_</span>
        </p>

        <ul className="space-y-2 mb-6">
          {BOOT_ITEMS.map((item, i) => (
            <li
              key={item}
              className="flex items-center justify-between text-sm"
              style={{ color: i < checked ? 'var(--text-primary)' : 'var(--text-muted)' }}
            >
              <span>{item}</span>
              <span style={{ color: i < checked ? 'var(--accent)' : 'var(--text-muted)' }}>
                {i < checked ? '\u2713' : '\u00b7\u00b7\u00b7'}
              </span>
            </li>
          ))}
        </ul>

        <div className="h-[2px] w-full rounded-full overflow-hidden mb-6" style={{ background: 'var(--border-subtle)' }}>
          <div
            className="h-full transition-[width] duration-200 ease-linear"
            style={{ width: `${(checked / BOOT_ITEMS.length) * 100}%`, background: 'var(--accent)' }}
          />
        </div>

        {ready && (
          <button
            onClick={handleEnter}
            className="w-full py-3 rounded-full text-sm tracking-[0.25em] uppercase font-semibold transition-transform duration-300 hover:scale-[1.02]"
            style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}
            autoFocus
          >
            [ Enter ]
          </button>
        )}
        {!ready && (
          <button
            onClick={handleEnter}
            className="w-full py-2.5 rounded-full text-xs tracking-[0.2em] uppercase font-medium border transition-colors duration-300"
            style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}
          >
            Skip
          </button>
        )}
      </div>
    </div>
  );
}
