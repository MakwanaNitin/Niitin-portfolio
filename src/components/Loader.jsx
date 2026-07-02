import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from "../assets/logo/logo.png";


const BatSymbol = () => (
  <img
    src={logo}
    alt="Logo"
    className="w-30 h-auto object-contain"
  />
);

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); setTimeout(onComplete, 500); return 100; }
        return p + 2;
      });
    }, 40);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        key="loader"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.1 }}
        transition={{ duration: 0.8 }}
        style={{
          position: 'fixed', inset: 0, background: '#000',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', zIndex: 100000,
        }}
      >
        {/* Bat symbol */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], filter: ['drop-shadow(0 0 20px #FFD700)', 'drop-shadow(0 0 50px #FFD700)', 'drop-shadow(0 0 20px #FFD700)'] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ color: '#FFD700', marginBottom: 40 }}
        >
          <BatSymbol />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{ textAlign: 'center' }}
        >
          <p style={{
            fontFamily: 'Orbitron, sans-serif',
            fontSize: 'clamp(1rem, 3vw, 1.4rem)',
            letterSpacing: '0.3em',
            fontWeight: 900,
            color: '#FFD700',
            marginBottom: 6,
          }}>BATMAN PORTFOLIO</p>
          <p style={{
            fontFamily: 'Rajdhani, sans-serif',
            fontSize: '0.9rem',
            letterSpacing: '0.2em',
            color: 'rgba(255,255,255,0.4)',
            marginBottom: 32,
          }}>NITIN MAKWANA</p>
        </motion.div>

        {/* Progress bar */}
        <div style={{ width: 240, height: 2, background: 'rgba(255,215,0,0.15)', borderRadius: 1 }}>
          <motion.div
            style={{
              height: '100%',
              background: 'linear-gradient(90deg, #FFD700, #FFC107)',
              borderRadius: 1,
              boxShadow: '0 0 10px rgba(255,215,0,0.8)',
              width: `${progress}%`,
            }}
          />
        </div>
        <p style={{
          marginTop: 12,
          fontFamily: 'Orbitron, sans-serif',
          fontSize: '0.7rem',
          color: 'rgba(255,215,0,0.5)',
          letterSpacing: '0.15em',
        }}>{progress}%</p>

        {/* Corner decorations */}
        {['top:20px;left:20px', 'top:20px;right:20px', 'bottom:20px;left:20px', 'bottom:20px;right:20px'].map((pos, i) => (
          <div key={i} style={{
            position: 'absolute',
            ...Object.fromEntries(pos.split(';').map(p => p.split(':'))),
            width: 30, height: 30,
            borderTop: i < 2 ? '1px solid rgba(255,215,0,0.3)' : 'none',
            borderBottom: i >= 2 ? '1px solid rgba(255,215,0,0.3)' : 'none',
            borderLeft: i % 2 === 0 ? '1px solid rgba(255,215,0,0.3)' : 'none',
            borderRight: i % 2 === 1 ? '1px solid rgba(255,215,0,0.3)' : 'none',
          }} />
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
