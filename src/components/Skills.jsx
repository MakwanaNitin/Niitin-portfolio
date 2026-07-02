import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const skillCategories = [
  {
    title: 'Frontend',
    icon: '◈',
    skills: [
      { name: 'React.js', level: 90 },
      { name: 'Next.js', level: 82 },
      { name: 'JavaScript', level: 88 },
      { name: 'Tailwind CSS', level: 92 },
      { name: 'HTML/CSS', level: 95 },
    ],
  },
  {
    title: 'Backend',
    icon: '◆',
    skills: [
      { name: 'Node.js', level: 80 },
      { name: 'Express.js', level: 78 },
      { name: 'REST APIs', level: 85 },
      { name: 'Python', level: 72 },
      { name: 'Java', level: 70 },
    ],
  },
  {
    title: 'Database',
    icon: '⬡',
    skills: [
      { name: 'MongoDB', level: 80 },
      { name: 'MySQL', level: 75 },
      { name: 'Firebase', level: 70 },
    ],
  },
  {
    title: 'Tools',
    icon: '◉',
    skills: [
      { name: 'Git / GitHub', level: 88 },
      { name: 'VS Code', level: 95 },
      { name: 'Figma', level: 75 },
      { name: 'Postman', level: 80 },
    ],
  },
];

function SkillBar({ name, level, inView, delay }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '0.9rem', color: 'rgba(255,255,255,0.75)' }}>{name}</span>
        <span style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '0.6rem', color: '#FFD700' }}>{level}%</span>
      </div>
      <div style={{ height: 3, background: 'rgba(255,255,255,0.08)', borderRadius: 2 }}>
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, delay, ease: 'easeOut' }}
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, #FFD700, #FFC107)',
            borderRadius: 2,
            boxShadow: '0 0 6px rgba(255,215,0,0.4)',
          }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="skills" ref={ref} style={{
      padding: '120px 5%',
      background: '#000',
      position: 'relative',
    }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(255,215,0,0.3), transparent)',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '0.65rem', color: '#FFD700', letterSpacing: '0.3em', marginBottom: 10 }}>ARSENAL</p>
          <h2 className="section-title">My <span>Skills</span></h2>
          <div className="gold-line" />
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 24,
        }}>
          {skillCategories.map((cat, ci) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: ci * 0.1 }}
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,215,0,0.1)',
                padding: 28,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Corner accent */}
              <div style={{ position: 'absolute', top: 0, right: 0, width: 40, height: 40, borderRight: '1px solid rgba(255,215,0,0.2)', borderTop: '1px solid rgba(255,215,0,0.2)' }} />

              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                <span style={{ color: '#FFD700', fontSize: '1.2rem' }}>{cat.icon}</span>
                <h3 style={{
                  fontFamily: 'Oswald, sans-serif', fontSize: '1rem',
                  fontWeight: 600, letterSpacing: '0.15em',
                  textTransform: 'uppercase', color: '#FFD700',
                }}>{cat.title}</h3>
              </div>

              {cat.skills.map((s, si) => (
                <SkillBar key={s.name} {...s} inView={inView} delay={ci * 0.1 + si * 0.08} />
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
