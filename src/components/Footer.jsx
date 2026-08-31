import React from 'react';
import { PROFILE } from '../data/portfolioData';
import EasterEgg from './EasterEgg';

const NAV = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Work', id: 'work' },
  { label: 'Skills', id: 'skills' },
  { label: 'Journey', id: 'journey' },
  { label: 'Vault', id: 'vault' },
  { label: 'Contact', id: 'contact' },
];
const SOCIAL = [
  ['GitHub', PROFILE.socials.github],
  ['LinkedIn', PROFILE.socials.linkedin],
  ['Email', `mailto:${PROFILE.email}`],
];

export default function Footer() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer style={{ background: 'var(--bg-primary)', borderTop: '1px solid var(--border-subtle)', padding: '56px 5% 28px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 40, marginBottom: 44 }}>
          {/* Brand */}
          <div style={{ maxWidth: 280 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: 700,
                color: '#fff',
                marginBottom: 14,
                background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-bright) 100%)',
              }}
            >
              N
            </div>
            <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.75rem', color: 'var(--accent-bright)', letterSpacing: '0.15em', marginBottom: 8 }}>
              NITIN MAKWANA
            </p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              Software Developer &amp; MCA student building practical, well-crafted digital products.
            </p>
          </div>

          {/* Links */}
          <div style={{ display: 'flex', gap: 64, flexWrap: 'wrap' }}>
            <div>
              <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.7rem', color: 'var(--accent-bright)', letterSpacing: '0.15em', marginBottom: 16 }}>
                NAVIGATE
              </p>
              {NAV.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  style={{
                    display: 'block',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.9rem',
                    color: 'var(--text-secondary)',
                    marginBottom: 10,
                    textAlign: 'left',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.target.style.color = 'var(--accent)')}
                  onMouseLeave={(e) => (e.target.style.color = 'var(--text-secondary)')}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div>
              <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.7rem', color: 'var(--accent-bright)', letterSpacing: '0.15em', marginBottom: 16 }}>
                CONNECT
              </p>
              {SOCIAL.map(([name, url]) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'block',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.9rem',
                    color: 'var(--text-secondary)',
                    marginBottom: 10,
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.target.style.color = 'var(--accent-bright)')}
                  onMouseLeave={(e) => (e.target.style.color = 'var(--text-secondary)')}
                >
                  {name}
                </a>
              ))}
            </div>
          </div>

          {/* Profile */}
          <div style={{ textAlign: 'center' }}>
            <img
              src={`${import.meta.env.BASE_URL}profile.jpg`}
              alt="Nitin Makwana"
              loading="lazy"
              style={{
                width: 72,
                height: 72,
                objectFit: 'cover',
                borderRadius: '50%',
                border: '1px solid rgba(255,30,45,0.3)',
                marginBottom: 12,
              }}
            />
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: 'var(--text-muted)', fontStyle: 'italic', maxWidth: 200, lineHeight: 1.5 }}>
              "Good software is built one thoughtful decision at a time."
            </p>
          </div>
        </div>

        <div
          style={{
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: 22,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} Nitin Makwana. All Rights Reserved.
          </p>
          <div className="flex items-center gap-5">
            <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
              BUILT WITH REACT · GSAP · TAILWIND
            </p>
            <EasterEgg />
          </div>
        </div>
      </div>
    </footer>
  );
}
