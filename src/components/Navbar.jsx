import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const NAV_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Certificates', href: '#certificates' },
  { name: 'Contact', href: '#contact' },
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
            className="flex items-center gap-2 cursor-pointer group"
            aria-label="Nitin Makwana — back to top"
          >
            <span
              className="flex items-center justify-center w-9 h-9 rounded-lg text-sm font-bold font-display text-white transition-transform duration-500 group-hover:scale-110"
              style={{ background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-bright) 100%)' }}
            >
              N
            </span>
            <span className="text-white font-semibold tracking-wide text-sm ml-1 opacity-90 group-hover:opacity-100 transition-opacity font-display">
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

          {/* CTA Button */}
          <div className="hidden lg:block">
            <a
              href="#contact"
              onClick={handleNavClick('#contact')}
              ref={(el) => (linksRef.current[NAV_LINKS.length] = el)}
              className="relative px-6 py-2.5 rounded-full overflow-hidden group bg-transparent border border-white/15 text-white text-sm font-medium tracking-wide hover:border-[var(--accent-bright)] transition-colors duration-300"
            >
              <span className="relative z-10">Let's Talk</span>
              <div
                className="absolute inset-0 h-full w-full scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] -z-0 opacity-90"
                style={{ background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-bright) 100%)' }}
              />
            </a>
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

          <a
            href="#contact"
            onClick={handleNavClick('#contact')}
            ref={(el) => (mobileLinksRef.current[NAV_LINKS.length] = el)}
            className="mt-6 px-8 py-3 rounded-full tracking-widest transition-all duration-300"
            style={{ border: '1px solid var(--accent-bright)', color: 'var(--accent-bright)' }}
          >
            Let's Talk
          </a>
        </div>
      </div>
    </>
  );
}
