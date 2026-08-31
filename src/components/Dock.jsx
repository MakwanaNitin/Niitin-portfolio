import React, { useEffect, useRef, useState } from 'react';
import { PROFILE } from '../data/portfolioData';

const IconHome = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}>
    <path d="M3 11.5 12 4l9 7.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconAbout = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}>
    <circle cx="12" cy="8" r="3.2" />
    <path d="M5 20c1.2-3.6 4-5.4 7-5.4s5.8 1.8 7 5.4" strokeLinecap="round" />
  </svg>
);
const IconWork = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}>
    <rect x="3" y="7" width="18" height="13" rx="2" />
    <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" strokeLinecap="round" />
  </svg>
);
const IconSkills = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}>
    <circle cx="12" cy="12" r="2.2" />
    <circle cx="12" cy="4" r="1.6" />
    <circle cx="4.5" cy="18" r="1.6" />
    <circle cx="19.5" cy="18" r="1.6" />
    <path d="M12 6.2V10M10.2 13.6l-4.4 3M13.8 13.6l4.4 3" strokeLinecap="round" />
  </svg>
);
const IconJourney = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}>
    <path d="M5 4v16M12 4v16M19 4v16" strokeLinecap="round" />
    <circle cx="5" cy="8" r="1.6" fill="currentColor" stroke="none" />
    <circle cx="12" cy="14" r="1.6" fill="currentColor" stroke="none" />
    <circle cx="19" cy="10" r="1.6" fill="currentColor" stroke="none" />
  </svg>
);
const IconVault = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <circle cx="12" cy="12" r="3.4" />
    <path d="M12 9.5v1.2M14.3 12h-1.2" strokeLinecap="round" />
  </svg>
);
const IconContact = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m4 7 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const NAV_ITEMS = [
  { id: 'home', label: 'Home', Icon: IconHome },
  { id: 'about', label: 'About', Icon: IconAbout },
  { id: 'work', label: 'Work', Icon: IconWork },
  { id: 'skills', label: 'Skills', Icon: IconSkills },
  { id: 'journey', label: 'Journey', Icon: IconJourney },
  { id: 'vault', label: 'Certificates', Icon: IconVault },
  { id: 'contact', label: 'Contact', Icon: IconContact },
];

export default function Dock() {
  const [active, setActive] = useState('home');
  const sectionsRef = useRef([]);

  useEffect(() => {
    sectionsRef.current = NAV_ITEMS
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
    );

    sectionsRef.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const goTo = (id) => (e) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Desktop floating dock */}
      <nav
        aria-label="Primary"
        className="hidden md:flex fixed top-6 left-1/2 -translate-x-1/2 z-50 items-center gap-1 px-2 py-2 rounded-full"
        style={{
          background: 'rgba(11,13,14,0.75)',
          border: '1px solid var(--border-subtle)',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
        }}
      >
        <a
          href="#home"
          onClick={goTo('home')}
          className="flex items-center gap-2 pl-2 pr-3 py-1.5 mr-1 rounded-full group"
          aria-label="NITIN — back to top"
        >
          <span
            className="block w-7 h-7 rounded-full overflow-hidden"
            style={{ boxShadow: '0 0 0 1.5px var(--accent)' }}
          >
            <img src={PROFILE.profileImg} alt="" className="w-full h-full object-cover" />
          </span>
          <span className="hidden lg:inline text-xs font-display font-semibold tracking-wide text-white">
            NITIN
          </span>
        </a>

        <div className="w-px h-6 mx-1" style={{ background: 'var(--border-subtle)' }} />

        {NAV_ITEMS.map((item) => {
          const { id, label } = item;
          const isActive = active === id;
          return (
            <a
              key={id}
              href={`#${id}`}
              onClick={goTo(id)}
              aria-current={isActive ? 'true' : undefined}
              className="group relative flex items-center gap-2 px-3 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-300"
              style={{
                color: isActive ? 'var(--accent-ink)' : 'var(--text-secondary)',
                background: isActive ? 'var(--accent)' : 'transparent',
              }}
            >
              <item.Icon style={{ width: 16, height: 16, flexShrink: 0 }} />
              <span
                className="overflow-hidden whitespace-nowrap transition-all duration-300"
                style={{
                  maxWidth: isActive ? 96 : 0,
                  opacity: isActive ? 1 : 0,
                }}
              >
                {label}
              </span>
            </a>
          );
        })}
      </nav>

      {/* Mobile bottom dock */}
      <nav
        aria-label="Primary"
        className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-0.5 px-2 py-2 rounded-full"
        style={{
          background: 'rgba(11,13,14,0.85)',
          border: '1px solid var(--border-subtle)',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
        }}
      >
        {NAV_ITEMS.map((item) => {
          const { id, label } = item;
          const isActive = active === id;
          return (
            <a
              key={id}
              href={`#${id}`}
              onClick={goTo(id)}
              aria-label={label}
              aria-current={isActive ? 'true' : undefined}
              className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300"
              style={{
                color: isActive ? 'var(--accent-ink)' : 'var(--text-secondary)',
                background: isActive ? 'var(--accent)' : 'transparent',
              }}
            >
              <item.Icon style={{ width: 18, height: 18 }} />
            </a>
          );
        })}
      </nav>
    </>
  );
}
