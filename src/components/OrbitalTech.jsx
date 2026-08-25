import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

// Orbital technology visualization inspired by the space-portfolio reference.
// Pure CSS/SVG + GSAP — no WebGL, so it degrades gracefully everywhere and
// never blocks first paint. Rings rotate continuously at different speeds;
// each chip is counter-rotated by GSAP in perfect lockstep with its ring so
// the label text always stays upright, regardless of its position on the ring.

const RINGS = [
  {
    radius: 70,
    duration: 22,
    reverse: false,
    items: [{ label: 'React' }, { label: 'JS' }],
  },
  {
    radius: 130,
    duration: 34,
    reverse: true,
    items: [{ label: 'Node.js' }, { label: 'Java' }, { label: 'Python' }],
  },
  {
    radius: 190,
    duration: 46,
    reverse: false,
    items: [{ label: 'MongoDB' }, { label: 'Git' }, { label: 'MySQL' }],
  },
];

function RingItem({ label, angle, radius, chipRef }) {
  return (
    <div
      className="absolute top-1/2 left-1/2"
      style={{ width: 0, height: 0, transform: `rotate(${angle}deg)` }}
    >
      <div style={{ transform: `translateX(${radius}px)` }}>
        <div ref={chipRef}>
          <div
            className="flex items-center justify-center rounded-xl border text-[11px] md:text-xs font-semibold tracking-wide backdrop-blur-md select-none"
            style={{
              width: 56,
              height: 56,
              marginLeft: -28,
              marginTop: -28,
              background: 'rgba(139, 92, 246, 0.08)',
              borderColor: 'rgba(139, 92, 246, 0.35)',
              color: '#e9e3ff',
              boxShadow: '0 0 20px rgba(139, 92, 246, 0.15)',
            }}
          >
            {label}
          </div>
        </div>
      </div>
    </div>
  );
}

function getInitialReduceMotion() {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export default function OrbitalTech() {
  const containerRef = useRef(null);
  const groupRefs = useRef([]);
  const chipRefs = useRef({});
  const [reduceMotion, setReduceMotion] = useState(getInitialReduceMotion);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e) => setReduceMotion(e.matches);
    mq.addEventListener?.('change', handler);
    return () => mq.removeEventListener?.('change', handler);
  }, []);

  // Drive ring rotation + per-chip counter-rotation from GSAP so they cancel
  // out exactly (no CSS keyframe phase drift), keeping every label upright.
  useEffect(() => {
    const tweens = [];

    RINGS.forEach((ring, ri) => {
      const groupEl = groupRefs.current[ri];

      if (!reduceMotion && groupEl) {
        tweens.push(
          gsap.fromTo(
            groupEl,
            { rotate: 0 },
            { rotate: ring.reverse ? -360 : 360, duration: ring.duration, repeat: -1, ease: 'none' }
          )
        );
      } else if (groupEl) {
        gsap.set(groupEl, { rotate: 0 });
      }

      ring.items.forEach((item, ii) => {
        const angle = (360 / ring.items.length) * ii + ri * 35;
        const chipEl = chipRefs.current[`${ri}-${ii}`];
        if (!chipEl) return;

        if (!reduceMotion) {
          tweens.push(
            gsap.fromTo(
              chipEl,
              { rotate: -angle },
              {
                rotate: -angle + (ring.reverse ? 360 : -360),
                duration: ring.duration,
                repeat: -1,
                ease: 'none',
              }
            )
          );
        } else {
          // No animation, but still cancel the static positioning angle so
          // labels render upright.
          gsap.set(chipEl, { rotate: -angle });
        }
      });
    });

    return () => tweens.forEach((t) => t.kill());
  }, [reduceMotion]);

  // Subtle mouse-parallax on desktop only; touch-safe (no-op on touch devices).
  useEffect(() => {
    const el = containerRef.current;
    if (!el || reduceMotion) return;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(el, {
        rotateY: x * 8,
        rotateX: -y * 8,
        duration: 0.6,
        ease: 'power2.out',
        transformPerspective: 900,
      });
    };
    const onLeave = () => {
      gsap.to(el, { rotateY: 0, rotateX: 0, duration: 0.8, ease: 'power3.out' });
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [reduceMotion]);

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label="Animated diagram of technologies I work with: React, JavaScript, Node.js, Java, Python, MongoDB, Git, and MySQL"
      className="relative mx-auto"
      style={{ width: 420, height: 420, maxWidth: '100%', transformStyle: 'preserve-3d' }}
    >
      {/* Ambient glow behind the system */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(139,92,246,0.25) 0%, rgba(139,92,246,0.06) 45%, transparent 70%)',
          filter: 'blur(10px)',
        }}
      />

      {/* Static grid rings for depth */}
      {RINGS.map((ring, i) => (
        <div
          key={`ring-${i}`}
          className="absolute top-1/2 left-1/2 rounded-full border pointer-events-none"
          style={{
            width: ring.radius * 2,
            height: ring.radius * 2,
            marginLeft: -ring.radius,
            marginTop: -ring.radius,
            borderColor: 'rgba(139, 92, 246, 0.15)',
          }}
        />
      ))}

      {/* Rotating groups of orbiting tech chips */}
      {RINGS.map((ring, ri) => (
        <div
          key={`group-${ri}`}
          ref={(el) => (groupRefs.current[ri] = el)}
          className="absolute inset-0"
        >
          {ring.items.map((item, ii) => {
            const angle = (360 / ring.items.length) * ii + ri * 35;
            return (
              <RingItem
                key={item.label}
                label={item.label}
                angle={angle}
                radius={ring.radius}
                chipRef={(el) => (chipRefs.current[`${ri}-${ii}`] = el)}
              />
            );
          })}
        </div>
      ))}

      {/* Center core */}
      <div
        className="absolute top-1/2 left-1/2 rounded-full"
        style={{
          width: 18,
          height: 18,
          marginLeft: -9,
          marginTop: -9,
          background: 'radial-gradient(circle, #d6c6ff 0%, #8b5cf6 60%, transparent 100%)',
          boxShadow: '0 0 30px 6px rgba(139,92,246,0.6)',
          animation: reduceMotion ? 'none' : 'pulse-glow 3s ease-in-out infinite',
        }}
      />
    </div>
  );
}
