import React, { useEffect, useRef, useState, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CERTIFICATES, CATEGORIES } from '../utils/certificateLoader';

gsap.registerPlugin(ScrollTrigger);

// Certificate data is generated dynamically from every PDF found in
// src/assets/certificates/ — see src/utils/certificateLoader.js.
// Adding a new certificate is as simple as dropping a new PDF into that
// folder; no changes are required here.

const SORT_OPTIONS = ['Default', 'A-Z', 'Z-A', 'Category'];

// Category breakdown is generated from real certificate data — see render below.

// ─── Cert Placeholder Visual ──────────────────────────────────────────────────
function CertPlaceholder({ title, issuer, category }) {
  const colorMap = {
    Android: 'from-green-900/60 to-emerald-900/40',
    'Web Development': 'from-purple-900/60 to-indigo-900/40',
    Programming: 'from-orange-900/60 to-amber-900/40',
    Cloud: 'from-sky-900/60 to-blue-900/40',
    Database: 'from-pink-900/60 to-rose-900/40',
    'Cyber Security': 'from-red-900/60 to-rose-900/40',
    AI: 'from-violet-900/60 to-purple-900/40',
    Other: 'from-zinc-800/60 to-zinc-700/40',
  };
  const gradient = colorMap[category] || colorMap.Other;
  const iconMap = {
    Android: '🤖', 'Web Development': '🌐', Programming: '💻', Cloud: '☁️',
    Database: '🗄️', 'Cyber Security': '🔒', AI: '🧠', Other: '📜',
  };
  return (
    <div className={`w-full h-full bg-gradient-to-br ${gradient} flex flex-col items-center justify-center gap-3 relative overflow-hidden`}>
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: 'linear-gradient(#FFD700 1px, transparent 1px), linear-gradient(90deg, #FFD700 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
      <div style={{ fontSize: '2.5rem' }}>
        {iconMap[category] || iconMap.Other}
      </div>
      <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '0.55rem', color: 'rgba(255,215,0,0.7)', letterSpacing: '0.2em', textAlign: 'center', padding: '0 12px' }}>
        {issuer.toUpperCase()}
      </div>
      <div style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', textAlign: 'center', padding: '0 16px', lineHeight: 1.3 }}>
        {title}
      </div>
      <div className="absolute bottom-3 right-3 w-8 h-8 opacity-20">
        <svg viewBox="0 0 200 120" fill="#FFD700">
          <path d="M100 20 C85 5,55 0,30 15 C15 22,5 35,0 50 C15 40,35 38,55 45 C40 55,30 70,30 85 C40 75,55 68,70 70 C75 80,82 90,100 95 C118 90,125 80,130 70 C145 68,160 75,170 85 C170 70,160 55,145 45 C165 38,185 40,200 50 C195 35,185 22,170 15 C145 0,115 5,100 20Z"/>
        </svg>
      </div>
    </div>
  );
}

// ─── Modal ─────────────────────────────────────────────────────────────────────
function CertModal({ cert, onClose }) {
  const overlayRef = useRef(null);
  const boxRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
    gsap.fromTo(boxRef.current, { scale: 0.85, opacity: 0, y: 40 }, { scale: 1, opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' });

    const onKey = (e) => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, []);

  const handleClose = () => {
    gsap.to(boxRef.current, { scale: 0.9, opacity: 0, y: 20, duration: 0.3, ease: 'power2.in' });
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, onComplete: onClose });
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)' }}
      onClick={(e) => { if (e.target === overlayRef.current) handleClose(); }}
    >
      <div
        ref={boxRef}
        className="relative w-full max-w-2xl rounded-2xl overflow-hidden border"
        style={{ background: 'rgba(10,10,10,0.95)', borderColor: 'rgba(255,215,0,0.2)', boxShadow: '0 0 60px rgba(255,215,0,0.1)' }}
      >
        {/* Close */}
        <button
          onClick={handleClose}
          aria-label="Close certificate preview"
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-gray-400 hover:text-white hover:border-yellow-400/60 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400/60"
        >
          ✕
        </button>

        {/* Certificate Preview */}
        <div className="w-full aspect-video relative overflow-hidden">
          <CertPlaceholder title={cert.title} issuer={cert.issuer} category={cert.category} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute top-3 right-3 z-10" aria-hidden="true">
            <span style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '0.45rem', letterSpacing: '0.2em', padding: '4px 10px', borderRadius: 999, background: 'rgba(0,0,0,0.7)', border: '1px solid rgba(255,215,0,0.4)', color: '#FFD700' }}>
              PDF
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '0.6rem', color: '#FFD700', letterSpacing: '0.25em', marginBottom: 8 }}>
            CERTIFICATE OF COMPLETION
          </div>
          <h3 style={{ fontFamily: 'sans-serif', fontSize: '1.5rem', fontWeight: 700, color: '#fff', marginBottom: 4 }}>{cert.title}</h3>
          <div style={{ fontFamily: 'Rajdhani, sans-serif', color: 'rgba(255,215,0,0.8)', fontSize: '1rem', marginBottom: 16 }}>
            {cert.issuer} · {cert.category}
          </div>
          <p style={{ fontFamily: 'Rajdhani, sans-serif', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: 20 }}>
            {cert.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            {cert.skills.map(s => (
              <span key={s} style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '0.5rem', letterSpacing: '0.15em', padding: '5px 12px', border: '1px solid rgba(255,215,0,0.3)', borderRadius: 999, color: 'rgba(255,215,0,0.8)', background: 'rgba(255,215,0,0.05)' }}>{s}</span>
            ))}
          </div>
          <div className="flex gap-3">
            <a
              href={cert.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${cert.title} certificate PDF in a new tab`}
              className="flex-1 py-3 rounded-full border border-yellow-400/40 text-yellow-400 text-sm tracking-widest font-medium hover:bg-yellow-400 hover:text-black transition-all duration-400 text-center"
              style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '0.6rem', letterSpacing: '0.15em' }}
            >
              VIEW PDF
            </a>
            <a
              href={cert.url}
              download={cert.filename}
              aria-label={`Download ${cert.title} certificate PDF`}
              className="flex-1 py-3 rounded-full border border-white/20 text-white text-sm tracking-widest font-medium hover:border-yellow-400/60 transition-all duration-300 text-center"
              style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '0.6rem', letterSpacing: '0.15em' }}
            >
              DOWNLOAD PDF
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Animated Counter ──────────────────────────────────────────────────────────
function AnimCounter({ target, suffix = '', label, inView }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const obj = { n: 0 };
    gsap.to(obj, { n: target, duration: 2, ease: 'power2.out', onUpdate: () => setVal(Math.round(obj.n)) });
  }, [inView, target]);
  return (
    <div className="flex flex-col items-center">
      <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '2rem', fontWeight: 700, color: '#FFD700', textShadow: '0 0 20px rgba(255,215,0,0.4)' }}>
        {typeof target === 'string' ? target : `${val}${suffix}`}
      </div>
      <div style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: 4 }}>
        {label}
      </div>
    </div>
  );
}

// ─── Certificate Card ──────────────────────────────────────────────────────────
function CertCard({ cert, onView, index }) {
  const cardRef = useRef(null);
  const glowRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(cardRef.current, { rotateY: x * 8, rotateX: -y * 8, transformPerspective: 800, ease: 'power2.out', duration: 0.4 });
    gsap.to(glowRef.current, { x: e.clientX - rect.left, y: e.clientY - rect.top, opacity: 1, duration: 0.2 });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, { rotateY: 0, rotateX: 0, ease: 'power3.out', duration: 0.6 });
    gsap.to(glowRef.current, { opacity: 0, duration: 0.4 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="cert-card relative rounded-2xl overflow-hidden group cursor-pointer border"
      style={{
        background: 'rgba(255,255,255,0.03)',
        borderColor: 'rgba(255,255,255,0.08)',
        transformStyle: 'preserve-3d',
        transition: 'border-color 0.3s',
        animationDelay: `${index * 0.08}s`,
      }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(255,215,0,0.3)'; }}
      onMouseOut={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
    >
      {/* Hover Glow */}
      <div
        ref={glowRef}
        className="absolute w-48 h-48 rounded-full pointer-events-none z-10 -translate-x-1/2 -translate-y-1/2 opacity-0 mix-blend-screen"
        style={{ background: 'radial-gradient(circle, rgba(255,215,0,0.15) 0%, transparent 70%)' }}
      />

      {/* Image */}
      <div className="relative w-full aspect-video overflow-hidden">
        <CertPlaceholder title={cert.title} issuer={cert.issuer} category={cert.category} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        {/* Category Badge */}
        <div className="absolute top-3 left-3 z-10">
          <span style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '0.45rem', letterSpacing: '0.2em', padding: '4px 10px', borderRadius: 999, background: 'rgba(0,0,0,0.7)', border: '1px solid rgba(255,215,0,0.4)', color: '#FFD700' }}>
            {cert.category.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5" style={{ transform: 'translateZ(20px)' }}>
        <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '0.55rem', color: 'rgba(255,215,0,0.6)', letterSpacing: '0.2em', marginBottom: 6 }}>
          {cert.issuer.toUpperCase()}
        </div>
        <h3 style={{ fontFamily: 'sans-serif', fontSize: '1.05rem', fontWeight: 700, color: '#fff', marginBottom: 8, lineHeight: 1.3 }}>
          {cert.title}
        </h3>
        <p style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '0.9rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.6, marginBottom: 14, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {cert.description}
        </p>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {cert.skills.map(s => (
            <span key={s} style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '0.45rem', letterSpacing: '0.1em', padding: '3px 10px', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 999, color: 'rgba(255,255,255,0.5)' }}>
              {s}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => onView(cert)}
            aria-label={`View ${cert.title} certificate`}
            className="flex-1 py-2.5 rounded-full border text-xs tracking-widest font-medium transition-all duration-400 hover:scale-[1.02] group/btn relative overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400/60"
            style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '0.5rem', letterSpacing: '0.15em', borderColor: 'rgba(255,215,0,0.4)', color: '#FFD700' }}
          >
            <span className="absolute inset-0 bg-yellow-400 scale-x-0 origin-left group-hover/btn:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
            <span className="relative z-10 group-hover/btn:text-black transition-colors duration-300">VIEW</span>
          </button>
          <a
            href={cert.url}
            download={cert.filename}
            onClick={(e) => e.stopPropagation()}
            aria-label={`Download ${cert.title} certificate PDF`}
            className="flex-1 py-2.5 rounded-full border text-xs tracking-widest font-medium transition-all duration-300 hover:border-yellow-400/40 text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400/60"
            style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '0.5rem', letterSpacing: '0.15em', borderColor: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.5)' }}
          >
            DOWNLOAD
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── Main Certificates Section ─────────────────────────────────────────────────
export default function Certificates() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const statsRef = useRef(null);
  const timelineRef = useRef(null);
  const gridRef = useRef(null);

  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('Default');
  const [sortOpen, setSortOpen] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null);
  const [statsVisible, setStatsVisible] = useState(false);

  // Filter + Sort
  const filtered = useMemo(() => {
    let list = [...CERTIFICATES];
    if (activeCategory !== 'All') list = list.filter(c => c.category === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(c =>
        c.title.toLowerCase().includes(q) ||
        c.issuer.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.skills.some(s => s.toLowerCase().includes(q))
      );
    }
    if (sort === 'A-Z') list.sort((a, b) => a.title.localeCompare(b.title));
    else if (sort === 'Z-A') list.sort((a, b) => b.title.localeCompare(a.title));
    else if (sort === 'Category') list.sort((a, b) => a.category.localeCompare(b.category) || a.title.localeCompare(b.title));
    else list.sort((a, b) => a.sortIndex - b.sortIndex);
    return list;
  }, [activeCategory, search, sort]);

  // Group certificates by category for the breakdown section below the grid
  const categoryBreakdown = useMemo(() => {
    const groups = {};
    CERTIFICATES.forEach(c => {
      if (!groups[c.category]) groups[c.category] = [];
      groups[c.category].push(c.title);
    });
    return Object.entries(groups).sort((a, b) => b[1].length - a[1].length);
  }, []);

  // Entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      gsap.fromTo(headerRef.current?.children,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 80%', toggleActions: 'play none none reverse' }
        }
      );

      // Stats counter trigger
      ScrollTrigger.create({
        trigger: statsRef.current,
        start: 'top 85%',
        onEnter: () => setStatsVisible(true),
      });

      // Timeline
      if (timelineRef.current) {
        gsap.fromTo(timelineRef.current.querySelectorAll('.tl-item'),
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: timelineRef.current, start: 'top 80%', toggleActions: 'play none none reverse' }
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Animate cards on filter change
  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll('.cert-card');
    gsap.fromTo(cards,
      { opacity: 0, y: 30, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.07, ease: 'power3.out' }
    );
  }, [filtered]);

  return (
    <section
      id="certificates"
      ref={sectionRef}
      className="w-full min-h-screen bg-black py-32 px-6 md:px-12 lg:px-24 relative overflow-hidden"
    >
      {/* Background grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025] z-0"
        style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '100px 100px' }} />
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full pointer-events-none z-0"
        style={{ background: 'rgba(255,215,0,0.04)', filter: 'blur(120px)' }} />

      <div className="max-w-[90rem] mx-auto w-full relative z-10">

        {/* ── Header ── */}
        <div ref={headerRef} className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8">
          <div className="max-w-2xl">
            <p className="text-yellow-400 font-mono text-sm tracking-[0.3em] uppercase font-bold mb-4" style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '0.6rem' }}>
              [ Verified Credentials ]
            </p>
            <h2 style={{ fontFamily: 'sans-serif', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#fff', lineHeight: 1, marginBottom: 12 }}>
              Declassified{' '}
              <span style={{ fontStyle: 'italic', fontWeight: 300, background: 'linear-gradient(90deg, #FFD700, #fff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Achievements
              </span>
            </h2>
          </div>
          <p style={{ fontFamily: 'Rajdhani, sans-serif', color: 'rgba(255,255,255,0.35)', fontSize: '1rem', maxWidth: 320, lineHeight: 1.6, marginTop: 16 }}>
            Professional Certifications, Achievements & Learning Journey
          </p>
        </div>

        {/* ── Stats ── */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { target: CERTIFICATES.length, suffix: '+', label: 'Certificates' },
            { target: new Set(CERTIFICATES.flatMap(c => c.skills)).size, suffix: '', label: 'Skills Covered' },
            { target: CATEGORIES.length - 1, suffix: '', label: 'Categories' },
            { target: 'PDF Verified', suffix: '', label: 'Format' },
          ].map((s, i) => (
            <div key={i} className="rounded-2xl border p-6 text-center" style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }}>
              <AnimCounter target={s.target} suffix={s.suffix} label={s.label} inView={statsVisible} />
            </div>
          ))}
        </div>

        {/* ── Search + Sort ── */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* Search */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search certificates, skills, organizations..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full px-5 py-3.5 pr-12 rounded-xl border outline-none transition-all duration-300 text-white"
              style={{ background: 'rgba(255,255,255,0.04)', borderColor: search ? 'rgba(255,215,0,0.4)' : 'rgba(255,255,255,0.1)', fontFamily: 'Rajdhani, sans-serif', fontSize: '0.95rem' }}
              onFocus={e => { e.target.style.borderColor = 'rgba(255,215,0,0.5)'; e.target.style.boxShadow = '0 0 20px rgba(255,215,0,0.1)'; }}
              onBlur={e => { e.target.style.borderColor = search ? 'rgba(255,215,0,0.4)' : 'rgba(255,255,255,0.1)'; e.target.style.boxShadow = 'none'; }}
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">🔍</span>
          </div>

          {/* Sort */}
          <div className="relative">
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="flex items-center gap-3 px-5 py-3.5 rounded-xl border transition-all duration-300"
              style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.1)', fontFamily: 'Orbitron, sans-serif', fontSize: '0.55rem', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.7)', minWidth: 160 }}
            >
              <span>SORT: {sort.toUpperCase()}</span>
              <span style={{ transform: sortOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.3s', marginLeft: 'auto' }}>▾</span>
            </button>
            {sortOpen && (
              <div className="absolute right-0 top-full mt-2 rounded-xl border overflow-hidden z-30"
                style={{ background: 'rgba(10,10,10,0.95)', borderColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)', minWidth: 160 }}>
                {SORT_OPTIONS.map(o => (
                  <button key={o} onClick={() => { setSort(o); setSortOpen(false); }}
                    className="w-full text-left px-5 py-3 transition-colors duration-200"
                    style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '0.55rem', letterSpacing: '0.15em', color: sort === o ? '#FFD700' : 'rgba(255,255,255,0.5)', background: sort === o ? 'rgba(255,215,0,0.05)' : 'transparent' }}
                    onMouseEnter={e => { if (sort !== o) e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
                    onMouseLeave={e => { if (sort !== o) e.currentTarget.style.background = 'transparent'; }}
                  >
                    {o.toUpperCase()}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Category Filter Chips ── */}
        <div className="flex flex-wrap gap-2 mb-12">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-4 py-2 rounded-full border transition-all duration-300"
              style={{
                fontFamily: 'Orbitron, sans-serif', fontSize: '0.5rem', letterSpacing: '0.15em',
                borderColor: activeCategory === cat ? 'rgba(255,215,0,0.6)' : 'rgba(255,255,255,0.1)',
                color: activeCategory === cat ? '#FFD700' : 'rgba(255,255,255,0.4)',
                background: activeCategory === cat ? 'rgba(255,215,0,0.08)' : 'rgba(255,255,255,0.02)',
                boxShadow: activeCategory === cat ? '0 0 16px rgba(255,215,0,0.15)' : 'none',
                transform: activeCategory === cat ? 'scale(1.05)' : 'scale(1)',
              }}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* ── Grid ── */}
        <div ref={gridRef}>
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 gap-6">
              <div style={{ fontSize: '3rem', opacity: 0.3 }}>🔎</div>
              <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '0.65rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.25)' }}>
                NO CERTIFICATES FOUND
              </div>
              <p style={{ fontFamily: 'Rajdhani, sans-serif', color: 'rgba(255,255,255,0.2)', fontSize: '0.9rem' }}>
                Try adjusting your search or filter.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filtered.map((cert, i) => (
                <CertCard key={cert.id} cert={cert} onView={setSelectedCert} index={i} />
              ))}
            </div>
          )}
        </div>

        {/* ── Category Breakdown ── */}
        <div ref={timelineRef} className="mt-24 pt-16 border-t border-white/10">
          <div className="mb-10">
            <h3 style={{ fontFamily: 'sans-serif', fontWeight: 700, fontSize: '1.75rem', color: '#fff', letterSpacing: '-0.02em', marginBottom: 4 }}>
              Credential <span style={{ fontStyle: 'italic', fontWeight: 300, background: 'linear-gradient(90deg, #FFD700, #fff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Breakdown</span>
            </h3>
            <p style={{ fontFamily: 'Rajdhani, sans-serif', color: 'rgba(255,255,255,0.3)', fontSize: '0.9rem' }}>Every certificate, grouped by skill area</p>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[22px] top-0 bottom-0 w-[1px] hidden md:block"
              style={{ background: 'linear-gradient(180deg, transparent, rgba(255,215,0,0.3) 10%, rgba(255,215,0,0.3) 90%, transparent)' }} />

            <div className="flex flex-col gap-8">
              {categoryBreakdown.map(([category, titles]) => (
                <div key={category} className="tl-item flex gap-6 items-start">
                  {/* Dot */}
                  <div className="relative flex-shrink-0 hidden md:flex items-center justify-center w-11 h-11 rounded-full border"
                    style={{ background: 'rgba(255,215,0,0.08)', borderColor: 'rgba(255,215,0,0.3)', boxShadow: '0 0 16px rgba(255,215,0,0.15)' }}>
                    <span style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '0.6rem', color: '#FFD700', letterSpacing: '0.05em' }}>{titles.length}</span>
                  </div>
                  <div className="flex-1 pb-2">
                    <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '0.7rem', color: '#FFD700', letterSpacing: '0.2em', marginBottom: 8 }}>{category.toUpperCase()}</div>
                    <div className="flex flex-wrap gap-2">
                      {titles.map(item => (
                        <span key={item} style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '0.85rem', padding: '4px 14px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 999, color: 'rgba(255,255,255,0.55)', background: 'rgba(255,255,255,0.03)' }}>
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* ── Modal ── */}
      {selectedCert && <CertModal cert={selectedCert} onClose={() => setSelectedCert(null)} />}
    </section>
  );
}
