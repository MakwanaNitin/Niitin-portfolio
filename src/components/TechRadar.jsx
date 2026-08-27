import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

// A static "radar" cluster of real, brand-colored technology icons, styled
// after the reference hero: concentric guide circles + a scattered set of
// icon badges (not spinning — just a gentle idle float), each icon sourced
// from skillicons.dev (a free, MIT-licensed icon badge service).
const ICONS = [
  { id: 'react', top: '6%', left: '18%', size: 46 },
  { id: 'js', top: '20%', left: '46%', size: 46 },
  { id: 'nodejs', top: '30%', left: '2%', size: 50 },
  { id: 'git', top: '2%', left: '58%', size: 42 },
  { id: 'py', top: '46%', left: '50%', size: 44 },
  { id: 'mongodb', top: '58%', left: '10%', size: 46 },
  { id: 'java', top: '68%', left: '38%', size: 44 },
  { id: 'mysql', top: '80%', left: '18%', size: 42 },
];

function getInitialReduceMotion() {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export default function TechRadar() {
  const containerRef = useRef(null);
  const iconRefs = useRef([]);

  useEffect(() => {
    const reduceMotion = getInitialReduceMotion();
    const tweens = [];

    // Entrance
    gsap.fromTo(
      iconRefs.current,
      { opacity: 0, scale: 0.5, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'back.out(1.6)', delay: 0.3 }
    );

    // Gentle idle float, staggered per icon so they don't move in unison
    if (!reduceMotion) {
      iconRefs.current.forEach((el, i) => {
        if (!el) return;
        tweens.push(
          gsap.to(el, {
            y: `+=${10 + (i % 3) * 4}`,
            duration: 2.6 + (i % 4) * 0.4,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: i * 0.15,
          })
        );
      });
    }

    return () => tweens.forEach((t) => t.kill());
  }, []);

  // Subtle mouse-parallax on desktop only.
  useEffect(() => {
    const el = containerRef.current;
    if (!el || getInitialReduceMotion()) return;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(el, { rotateY: x * 6, rotateX: -y * 6, duration: 0.6, ease: 'power2.out', transformPerspective: 900 });
    };
    const onLeave = () => gsap.to(el, { rotateY: 0, rotateX: 0, duration: 0.8, ease: 'power3.out' });

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label="Icons representing technologies I work with: React, JavaScript, Node.js, Git, Python, MongoDB, Java, and MySQL"
      className="relative mx-auto hidden md:block"
      style={{ width: 420, height: 420, maxWidth: '100%', transformStyle: 'preserve-3d' }}
    >
      {/* Radar guide rings */}
      {[80, 150, 210].map((r) => (
        <div
          key={r}
          className="absolute top-1/2 left-1/2 rounded-full pointer-events-none"
          style={{
            width: r * 2,
            height: r * 2,
            marginLeft: -r,
            marginTop: -r,
            border: '1px solid rgba(139,92,246,0.14)',
          }}
        />
      ))}
      {/* Radar cross-hair spokes */}
      <div
        className="absolute top-1/2 left-0 right-0 pointer-events-none"
        style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.12), transparent)' }}
      />
      <div
        className="absolute left-1/2 top-0 bottom-0 pointer-events-none"
        style={{ width: 1, background: 'linear-gradient(180deg, transparent, rgba(139,92,246,0.12), transparent)' }}
      />

      {/* Ambient glow */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(139,92,246,0.18) 0%, transparent 65%)',
          filter: 'blur(10px)',
        }}
      />

      {/* Scattered tech icon badges */}
      {ICONS.map((icon, i) => (
        <div
          key={icon.id}
          ref={(el) => (iconRefs.current[i] = el)}
          className="absolute rounded-2xl overflow-hidden"
          style={{
            top: icon.top,
            left: icon.left,
            width: icon.size,
            height: icon.size,
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(139,92,246,0.25)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
          }}
        >
          <img
            src={`https://skillicons.dev/icons?i=${icon.id}`}
            alt=""
            width={icon.size}
            height={icon.size}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}
