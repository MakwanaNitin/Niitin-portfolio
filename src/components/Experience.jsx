import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';

const timeline = [
  {
    year: '2024 – Present',
    title: 'Master of Computer Applications',
    subtitle: 'MCA – Advanced Coursework',
    desc: 'Pursuing advanced studies in computer science, focusing on software engineering, AI, and full-stack development methodologies.',
    type: 'education',
  },
  {
    year: '2023 – 2024',
    title: 'Full Stack Development',
    subtitle: 'Self-Directed Projects',
    desc: 'Built and deployed multiple production-grade web applications using React, Node.js, and cloud services.',
    type: 'work',
  },
  {
    year: '2021 – 2024',
    title: 'Bachelor of Computer Applications',
    subtitle: 'BCA – Computer Science',
    desc: 'Completed foundational studies in programming, data structures, algorithms, databases, and software development.',
    type: 'education',
  },
  {
    year: '2022 – 2023',
    title: 'UI/UX Design',
    subtitle: 'Design & Development',
    desc: 'Explored user interface design principles, prototyping in Figma, and building design systems for web applications.',
    type: 'work',
  },
];

const stats = [
  { num: 25, label: 'Projects Completed', suffix: '+' },
  { num: 20, label: 'Technologies', suffix: '+' },
  { num: 50, label: 'GitHub Repos', suffix: '+' },
  { num: 5, label: 'Hackathons', suffix: '+' },
];

export default function Experience() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [statsRef, statsInView] = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <section id="experience" style={{ background: '#000', position: 'relative' }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(255,215,0,0.3), transparent)',
      }} />

      {/* Stats */}
      <div ref={statsRef} style={{
        padding: '80px 5%',
        background: 'rgba(255,215,0,0.03)',
        borderBottom: '1px solid rgba(255,215,0,0.08)',
      }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 32, textAlign: 'center',
        }}>
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
            >
              <div style={{
                fontFamily: 'Orbitron, sans-serif',
                fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                fontWeight: 900,
                color: '#FFD700',
                lineHeight: 1,
                marginBottom: 8,
                textShadow: '0 0 20px rgba(255,215,0,0.4)',
              }}>
                {statsInView ? <CountUp end={stat.num} duration={2} delay={i * 0.15} /> : '0'}{stat.suffix}
              </div>
              <div style={{
                fontFamily: 'Rajdhani, sans-serif', fontSize: '0.85rem',
                color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}>{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div ref={ref} style={{ padding: '120px 5%' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '0.65rem', color: '#FFD700', letterSpacing: '0.3em', marginBottom: 10 }}>THE JOURNEY</p>
            <h2 className="section-title">Experience & <span>Education</span></h2>
            <div className="gold-line" />
          </motion.div>

          <div style={{ position: 'relative', paddingLeft: 40 }}>
            {/* Timeline line */}
            <div style={{
              position: 'absolute', left: 0, top: 0, bottom: 0,
              width: 1, background: 'linear-gradient(to bottom, #FFD700, rgba(255,215,0,0.05))',
            }} />

            {timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                style={{ position: 'relative', marginBottom: 48, paddingBottom: i < timeline.length - 1 ? 0 : 0 }}
              >
                {/* Dot */}
                <div style={{
                  position: 'absolute', left: -44, top: 6,
                  width: 10, height: 10, borderRadius: '50%',
                  background: item.type === 'education' ? '#FFD700' : '#FFC107',
                  boxShadow: '0 0 12px rgba(255,215,0,0.6)',
                }} />

                <div style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,215,0,0.08)',
                  padding: '24px 28px',
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    position: 'absolute', top: 0, left: 0,
                    width: 3, height: '100%',
                    background: item.type === 'education' ? '#FFD700' : '#FFC107',
                    opacity: 0.6,
                  }} />

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6, flexWrap: 'wrap' }}>
                        <span style={{
                          fontFamily: 'Orbitron, sans-serif', fontSize: '0.6rem',
                          color: '#FFD700', letterSpacing: '0.1em',
                          padding: '2px 8px',
                          border: '1px solid rgba(255,215,0,0.2)',
                        }}>{item.year}</span>
                        <span style={{
                          fontFamily: 'Orbitron, sans-serif', fontSize: '0.55rem',
                          color: item.type === 'education' ? 'rgba(255,215,0,0.6)' : 'rgba(255,255,255,0.3)',
                          letterSpacing: '0.1em', textTransform: 'uppercase',
                        }}>{item.type}</span>
                      </div>
                      <h3 style={{
                        fontFamily: 'Oswald, sans-serif', fontSize: '1.15rem',
                        fontWeight: 600, color: '#F5F5F5', marginBottom: 4, letterSpacing: '0.03em',
                      }}>{item.title}</h3>
                      <p style={{
                        fontFamily: 'Rajdhani, sans-serif', fontSize: '0.9rem',
                        color: '#FFD700', marginBottom: 10, letterSpacing: '0.05em',
                      }}>{item.subtitle}</p>
                      <p style={{
                        fontFamily: 'Rajdhani, sans-serif', fontSize: '0.95rem',
                        color: 'rgba(255,255,255,0.45)', lineHeight: 1.7,
                      }}>{item.desc}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
