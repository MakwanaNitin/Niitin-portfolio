import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef(null);
  const coreRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          gsap.to(containerRef.current, {
            opacity: 0,
            scale: 1.05,
            duration: 0.6,
            ease: 'power2.inOut',
            onComplete,
          });
          return 100;
        }
        return p + 4;
      });
    }, 40);
    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    gsap.to(coreRef.current, {
      scale: 1.15,
      opacity: 0.7,
      duration: 1.4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 flex flex-col items-center justify-center z-[100000]"
      style={{ background: 'var(--bg-primary)' }}
      role="status"
      aria-live="polite"
      aria-label={`Loading, ${progress}% complete`}
    >
      <div
        ref={coreRef}
        className="rounded-full mb-10"
        style={{
          width: 56,
          height: 56,
          background: 'radial-gradient(circle, #d6c6ff 0%, #8b5cf6 60%, transparent 100%)',
          boxShadow: '0 0 40px 10px rgba(139,92,246,0.5)',
        }}
      />

      <p className="font-display text-sm tracking-[0.3em] uppercase text-white mb-1">Nitin Makwana</p>
      <p className="text-xs tracking-[0.2em] uppercase mb-8" style={{ color: 'var(--text-muted)' }}>
        Software Developer
      </p>

      <div className="w-60 h-[2px] rounded-full overflow-hidden" style={{ background: 'rgba(139,92,246,0.15)' }}>
        <div
          className="h-full rounded-full transition-[width] duration-100 ease-linear"
          style={{
            width: `${progress}%`,
            background: 'linear-gradient(90deg, var(--accent) 0%, var(--accent-bright) 100%)',
            boxShadow: '0 0 10px rgba(139,92,246,0.8)',
          }}
        />
      </div>
      <p className="mt-3 text-xs font-display tracking-widest" style={{ color: 'var(--accent-soft)' }}>
        {progress}%
      </p>
    </div>
  );
}
