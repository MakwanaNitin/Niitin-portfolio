import React from 'react';
import imgPerson from '../assets/person/mine_1.webp';

const BatSymbol = () => (
  <svg viewBox="0 0 200 120" width="40" height="24" fill="currentColor">
    <path d="M100 20 C85 5, 55 0, 30 15 C15 22, 5 35, 0 50 C15 40, 35 38, 55 45 C40 55, 30 70, 30 85 C40 75, 55 68, 70 70 C75 80, 82 90, 100 95 C118 90, 125 80, 130 70 C145 68, 160 75, 170 85 C170 70, 160 55, 145 45 C165 38, 185 40, 200 50 C195 35, 185 22, 170 15 C145 0, 115 5, 100 20Z"/>
  </svg>
);

export default function Footer() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer style={{
      background: '#000',
      borderTop: '1px solid rgba(255,215,0,0.1)',
      padding: '60px 5% 32px',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 40, marginBottom: 48 }}>
          {/* Brand */}
          <div>
            <div style={{ color: '#FFD700', filter: 'drop-shadow(0 0 8px rgba(255,215,0,0.4))', marginBottom: 12 }}>
              <BatSymbol />
            </div>
            <p style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '0.65rem', color: 'rgba(255,215,0,0.6)', letterSpacing: '0.2em', marginBottom: 8 }}>NITIN MAKWANA</p>
            <p style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '0.9rem', color: 'rgba(255,255,255,0.3)', maxWidth: 240, lineHeight: 1.6 }}>
              Full Stack Developer & MCA Student crafting premium digital experiences.
            </p>
          </div>

          {/* Links */}
          <div style={{ display: 'flex', gap: 64, flexWrap: 'wrap' }}>
            <div>
              <p style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '0.6rem', color: '#FFD700', letterSpacing: '0.2em', marginBottom: 16 }}>NAVIGATE</p>
              {['Home', 'About', 'Skills', 'Projects', 'Certificates', 'Contact'].map(link => (
                <button key={link} onClick={() => scrollTo(link.toLowerCase())} style={{
                  display: 'block', background: 'none', border: 'none', cursor: 'pointer',
                  fontFamily: 'Rajdhani, sans-serif', fontSize: '0.9rem',
                  color: 'rgba(255,255,255,0.4)', marginBottom: 10,
                  textTransform: 'uppercase', letterSpacing: '0.05em',
                  transition: 'color 0.2s',
                  textAlign: 'left',
                }}
                onMouseEnter={e => e.target.style.color = '#FFD700'}
                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.4)'}
                >{link}</button>
              ))}
            </div>

            <div>
              <p style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '0.6rem', color: '#FFD700', letterSpacing: '0.2em', marginBottom: 16 }}>CONNECT</p>
              {[['GitHub', 'https://github.com/MakwanaNitin'], ['LinkedIn', 'https://www.linkedin.com/in/makwana-niitin'], ['Email', 'mailto:nitinmakwana623@gmail.com']].map(([name, url]) => (
                <a key={name} href={url} target="_blank" rel="noreferrer" style={{
                  display: 'block',
                  fontFamily: 'Rajdhani, sans-serif', fontSize: '0.9rem',
                  color: 'rgba(255,255,255,0.4)', marginBottom: 10,
                  textDecoration: 'none', transition: 'color 0.2s',
                }}
                onMouseEnter={e => e.target.style.color = '#FFD700'}
                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.4)'}
                >{name}</a>
              ))}
            </div>
          </div>

          {/* Profile */}
          <div style={{ textAlign: 'center' }}>
            <img src={imgPerson} alt="Nitin" loading="lazy" style={{
              width: 80, height: 80, objectFit: 'cover', objectPosition: 'top',
              border: '1px solid rgba(255,215,0,0.2)',
              marginBottom: 12,
            }} />
            <p style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', fontStyle: 'italic', maxWidth: 200, lineHeight: 1.5 }}>
              "It's not who I am underneath, but what I do that defines me."
            </p>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid rgba(255,215,0,0.06)',
          paddingTop: 24,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12,
        }}>
          <p style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '0.85rem', color: 'rgba(255,255,255,0.25)' }}>
            © 2026 Nitin Makwana. All Rights Reserved.
          </p>
          <p style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '0.55rem', color: 'rgba(255,215,0,0.3)', letterSpacing: '0.15em' }}>
            BUILT WITH REACT + GSAP + THREE.JS
          </p>
        </div>
      </div>
    </footer>
  );
}
