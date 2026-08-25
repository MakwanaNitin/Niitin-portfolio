import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SKILL_GROUPS = [
  {
    title: 'Frontend',
    icon: '◈',
    skills: ['React', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'Tailwind CSS'],
  },
  {
    title: 'Backend',
    icon: '◆',
    skills: ['Node.js', 'Express', 'Java', 'Python'],
  },
  {
    title: 'Database & Services',
    icon: '⬡',
    skills: ['MySQL', 'MongoDB', 'Firebase'],
  },
  {
    title: 'Tools',
    icon: '◉',
    skills: ['Git', 'GitHub', 'Android Studio', 'VS Code', 'Postman'],
  },
];

export default function Skills() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });

      tl.fromTo(
        sectionRef.current.querySelectorAll('.header-reveal'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out' }
      ).fromTo(
        sectionRef.current.querySelectorAll('.skill-card'),
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out' },
        '-=0.4'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative w-full py-28 px-6 md:px-12 lg:px-24"
      style={{ background: 'var(--bg-secondary)' }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.35), transparent)' }}
      />

      <div className="max-w-[90rem] mx-auto w-full relative z-10">
        <p className="header-reveal section-eyebrow mb-4">What I Work With</p>
        <h2 className="header-reveal text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white font-display mb-16">
          My <span className="gradient-text">Skills</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILL_GROUPS.map((group) => (
            <div
              key={group.title}
              className="skill-card relative p-7 rounded-2xl transition-all duration-300 hover:-translate-y-1"
              style={{ background: 'var(--surface)', border: '1px solid var(--border-subtle)' }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span style={{ color: 'var(--accent-bright)', fontSize: '1.2rem' }}>{group.icon}</span>
                <h3 className="font-display text-sm font-semibold tracking-widest uppercase text-white">
                  {group.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-full text-xs font-medium tracking-wide transition-colors duration-300"
                    style={{
                      color: 'var(--text-secondary)',
                      border: '1px solid var(--border-subtle)',
                      background: 'rgba(255,255,255,0.02)',
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
