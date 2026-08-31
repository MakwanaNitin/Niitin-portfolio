import React, { useRef, useState } from 'react';
import gsap from 'gsap';

const UNLOCK_CLICKS = 5;

export default function EasterEgg() {
  const [clicks, setClicks] = useState(0);
  const [unlocked, setUnlocked] = useState(false);
  const overlayRef = useRef(null);

  const handleClick = () => {
    const next = clicks + 1;
    setClicks(next);
    if (next >= UNLOCK_CLICKS) {
      setUnlocked(true);
      setClicks(0);
    }
  };

  const handleClose = () => {
    if (!overlayRef.current) {
      setUnlocked(false);
      return;
    }
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => setUnlocked(false),
    });
  };

  return (
    <>
      <button
        onClick={handleClick}
        aria-label="System mode"
        className="text-[10px] uppercase tracking-widest opacity-40 hover:opacity-70 transition-opacity duration-300 select-none"
        style={{ color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'default' }}
      >
        System Mode: Professional
      </button>

      {unlocked && (
        <div
          ref={overlayRef}
          role="dialog"
          aria-label="Secret mode unlocked"
          className="fixed inset-0 z-[100001] flex items-center justify-center p-6"
          style={{ background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(10px)' }}
          onClick={handleClose}
        >
          <div
            className="relative max-w-sm w-full rounded-2xl overflow-hidden text-center p-8"
            style={{ background: 'var(--bg-elevated)', border: '1px solid var(--accent)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={`${import.meta.env.BASE_URL}batman-hero.jpg`}
              alt=""
              className="w-24 h-24 object-cover rounded-full mx-auto mb-5"
              style={{ boxShadow: '0 0 30px rgba(255,30,45,0.4)' }}
            />
            <p className="section-eyebrow mb-2">Secret Mode</p>
            <h3 className="text-xl font-bold font-display text-white mb-2">Every developer needs an alter ego.</h3>
            <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
              You found it. Back to the professional build now.
            </p>
            <button
              onClick={handleClose}
              className="px-6 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold"
              style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
