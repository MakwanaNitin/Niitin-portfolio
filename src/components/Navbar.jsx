import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

// Hand-written inline SVG icons — no external icon package required, so
// there's nothing extra to install and nothing that can go out of sync
// with package-lock.json.
const IconInstagram = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const IconX = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const IconGitHub = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.09 3.29 9.4 7.86 10.93.58.1.79-.25.79-.56 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.08-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11.06 11.06 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.77.11 3.06.74.8 1.19 1.82 1.19 3.08 0 4.41-2.7 5.38-5.27 5.67.42.36.78 1.07.78 2.17 0 1.56-.01 2.82-.01 3.2 0 .31.21.67.8.56A10.52 10.52 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
  </svg>
);

const IconLinkedIn = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.59 0 4.25 2.36 4.25 5.44v6.3ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
  </svg>
);

const NAV_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Certificates', href: '#certificates' },
  { name: 'Contact', href: '#contact' },
];

const SOCIALS = [
  { Icon: IconInstagram, href: 'https://instagram.com', label: 'Instagram' },
  { Icon: IconX, href: 'https://x.com', label: 'X (Twitter)' },
  { Icon: IconGitHub, href: 'https://github.com/MakwanaNitin', label: 'GitHub' },
  { Icon: IconLinkedIn, href: 'https://www.linkedin.com/in/makwana-niitin', label: 'LinkedIn' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navRef = useRef(null);
  const linksRef = useRef([]);
  const mobileMenuRef = useRef(null);
  const mobileLinksRef = useRef([]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
    );

    if (linksRef.current.length > 0) {
      tl.fromTo(
        linksRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: 'power3.out' },
        '-=0.6'
      );
    }
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      gsap.to(mobileMenuRef.current, { clipPath: 'circle(150% at 90% 10%)', duration: 0.8, ease: 'power3.inOut' });
      gsap.fromTo(
        mobileLinksRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out', delay: 0.3 }
      );
    } else {
      gsap.to(mobileMenuRef.current, { clipPath: 'circle(0% at 90% 10%)', duration: 0.6, ease: 'power3.inOut' });
    }
  }, [isMobileMenuOpen]);

  const handleNavClick = (href) => (e) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 overflow-hidden ${
          isScrolled
            ? 'bg-black/50 backdrop-blur-md border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center relative z-10">
          {/* Logo */}
          <a
            href="#home"
            onClick={handleNavClick('#home')}
            className="flex items-center gap-3 cursor-pointer group"
            aria-label="Nitin Makwana — back to top"
          >
            <span
              className="block w-9 h-9 rounded-full overflow-hidden transition-transform duration-500 group-hover:scale-110"
              style={{ boxShadow: '0 0 0 2px rgba(139,92,246,0.5)' }}
            >
              <img src={`${import.meta.env.BASE_URL}profile.jpg`} alt="" className="w-full h-full object-cover" />
            </span>
            <span className="text-white font-semibold tracking-wide text-sm opacity-90 group-hover:opacity-100 transition-opacity font-display">
              Nitin Makwana
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center space-x-8">
            {NAV_LINKS.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                onClick={handleNavClick(link.href)}
                ref={(el) => (linksRef.current[index] = el)}
                className="relative text-gray-400 hover:text-white text-sm font-medium tracking-wide transition-colors duration-300 group"
              >
                {link.name}
                <span
                  className="absolute -bottom-1 left-1/2 w-0 h-[1px] transition-all duration-300 group-hover:w-full group-hover:left-0"
                  style={{ background: 'var(--accent-bright)' }}
                />
              </a>
            ))}
          </div>

          {/* Social icons */}
          <div className="hidden lg:flex items-center gap-4">
            {SOCIALS.map((social, index) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                ref={(el) => (linksRef.current[NAV_LINKS.length + index] = el)}
                className="text-gray-400 hover:text-white transition-colors duration-300 hover:scale-110 transform"
              >
                <social.Icon style={{ width: 17, height: 17 }} />
              </a>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden text-white p-2 z-50 relative"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`w-full h-[1px] bg-white transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-[10px]' : ''}`} />
              <span className={`w-full h-[1px] bg-white transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-full h-[1px] bg-white transition-transform duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-[10px]' : ''}`} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Fullscreen Menu */}
      <div
        ref={mobileMenuRef}
        className="fixed inset-0 bg-black/95 backdrop-blur-xl z-40 flex flex-col justify-center items-center"
        style={{ clipPath: 'circle(0% at 90% 10%)' }}
      >
        <div className="flex flex-col space-y-7 text-center mt-10">
          {NAV_LINKS.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              onClick={handleNavClick(link.href)}
              ref={(el) => (mobileLinksRef.current[index] = el)}
              className="text-2xl font-light text-gray-400 hover:text-white transition-colors tracking-widest relative group"
            >
              {link.name}
            </a>
          ))}

          <div className="flex items-center gap-6 mt-6" ref={(el) => (mobileLinksRef.current[NAV_LINKS.length] = el)}>
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <social.Icon style={{ width: 22, height: 22 }} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
