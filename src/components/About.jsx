import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HIGHLIGHTS = [
  'Full-Stack Web Development',
  'Android & Flutter Development',
  'UI/UX Design',
  'Firebase & REST APIs',
];

export default function About() {
  const sectionRef = useRef(null);
  const textContainerRef = useRef(null);
  const imageContainerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });

      const textElements = textContainerRef.current.querySelectorAll('.stagger-reveal');
      const imgElement = imageContainerRef.current;

      tl.fromTo(imgElement, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 1.2, ease: 'power3.out' }).fromTo(
        textElements,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out' },
        '-=0.8'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center justify-center py-24 px-6 md:px-12 lg:px-24 overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full mix-blend-screen"
          style={{ background: 'rgba(139,92,246,0.06)', filter: 'blur(120px)' }}
        />
      </div>

      <div className="max-w-[90rem] w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
        {/* Left Column: Portrait */}
        <div
          ref={imageContainerRef}
          className="relative w-full aspect-[4/5] max-w-md mx-auto lg:max-w-none rounded-2xl overflow-hidden shadow-2xl"
          style={{ border: '1px solid var(--border-subtle)' }}
        >
          <img
            src={`${import.meta.env.BASE_URL}profile.jpg`}
            alt="Nitin Makwana, software developer"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(5,5,7,0.65) 0%, transparent 40%)' }}
          />
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{ boxShadow: 'inset 0 0 0 1px rgba(139,92,246,0.15)' }}
          />
        </div>

        {/* Right Column: Story & Details */}
        <div ref={textContainerRef} className="flex flex-col justify-center space-y-10">
          <div className="overflow-hidden">
            <p className="stagger-reveal section-eyebrow mb-4">About Me</p>
            <h2 className="stagger-reveal text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white font-display leading-tight">
              Building with <span className="gradient-text">purpose</span>
            </h2>
          </div>

          <div className="overflow-hidden">
            <p className="stagger-reveal text-lg md:text-xl text-gray-400 font-light leading-relaxed max-w-xl">
              I am a dedicated software developer with a strong interest in Android development, Flutter,
              full-stack web development, and UI/UX design. I completed my Bachelor of Computer Applications
              (BCA) at Marwadi University and am currently pursuing my Master of Computer Applications (MCA).
              I enjoy solving real-world problems by building efficient and scalable applications.
            </p>
          </div>

          <div className="overflow-hidden">
            <div className="stagger-reveal grid grid-cols-2 gap-x-8 gap-y-4 pt-4 border-t border-white/10 max-w-xl">
              {HIGHLIGHTS.map((skill, i) => (
                <div key={i} className="flex items-center space-x-3 group">
                  <div
                    className="w-1.5 h-1.5 rounded-full transition-colors duration-300"
                    style={{ background: 'rgba(139,92,246,0.5)' }}
                  />
                  <span className="text-gray-300 text-sm md:text-base font-medium tracking-wide group-hover:text-white transition-colors duration-300">
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-hidden mt-2">
            <blockquote className="stagger-reveal pl-6 py-1" style={{ borderLeft: '2px solid rgba(139,92,246,0.5)' }}>
              <p className="text-lg md:text-xl text-gray-300 font-display italic">
                "Good software is built one thoughtful decision at a time."
              </p>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
