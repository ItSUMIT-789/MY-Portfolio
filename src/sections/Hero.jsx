import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { portfolioData } from '../utils/data'

const letterVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  })
}

function AnimatedTitle({ text }) {
  return (
    <span>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          custom={i}
          initial="hidden"
          animate="visible"
          variants={letterVariants}
          style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  )
}

export default function Hero() {
  const scanRef = useRef()

  useEffect(() => {
    if (scanRef.current) scanRef.current.style.animation = 'scanline 4s linear infinite'
  }, [])

  return (
    <section id="hero" className="section" style={{ minHeight: '100vh' }}>
      {/* Scanline */}
      <div
        ref={scanRef}
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.4), transparent)',
          pointerEvents: 'none',
          zIndex: 5
        }}
      />

      {/* Grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `linear-gradient(rgba(0,212,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,212,255,0.03) 1px,transparent 1px)`,
        backgroundSize: '80px 80px',
        pointerEvents: 'none'
      }} />

      {/* Glow */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '60vw', height: '60vh',
        background: 'radial-gradient(ellipse, rgba(0,212,255,0.06) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      <div className="content-layer" style={{
        textAlign: 'center',
        padding: '0 2rem',
        maxWidth: '900px',
        marginTop: '6rem'
      }}>
        {/* Orbit decoration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          style={{ position: 'relative', display: 'inline-block', marginBottom: '2rem' }}
        >
          <div style={{ width: '120px', height: '120px', borderRadius: '50%', border: '1px solid rgba(0,212,255,0.3)', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', animation: 'float 6s ease-in-out infinite' }} />
          <div style={{ width: '160px', height: '160px', borderRadius: '50%', border: '1px dashed rgba(0,212,255,0.15)', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
          <div style={{ width: '60px', height: '60px', background: 'radial-gradient(circle,rgba(0,212,255,0.8) 0%,rgba(0,212,255,0.1) 70%)', borderRadius: '50%', margin: '50px auto', boxShadow: '0 0 40px rgba(0,212,255,0.6),0 0 80px rgba(0,212,255,0.3)' }} />
        </motion.div>

        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="section-label"
          style={{ marginBottom: '1.5rem' }}
        >
          ◆ Software Developer ◆
        </motion.div>

        {/* Name */}
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(3rem, 10vw, 7rem)',
          fontWeight: 900,
          lineHeight: 1,
          marginBottom: '1.5rem',
          background: 'linear-gradient(135deg, #fff 0%, #00d4ff 40%, #00ffcc 80%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          letterSpacing: '-0.02em'
        }}>
          <AnimatedTitle text={portfolioData.name} />
        </h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.3rem)',
            color: 'var(--text-secondary)',
            maxWidth: '600px',
            margin: '0 auto 3rem',
            lineHeight: 1.7,
            fontWeight: 300
          }}
        >
          {portfolioData.tagline}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              padding: '0.9rem 2.5rem',
              background: 'linear-gradient(135deg, #00d4ff, #00ffcc)',
              border: 'none',
              borderRadius: '50px',
              color: '#00000f',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '0.75rem',
              letterSpacing: '0.15em',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 0 30px rgba(0,212,255,0.4)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-3px) scale(1.03)'
              e.target.style.boxShadow = '0 0 50px rgba(0,212,255,0.7)'
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = ''
              e.target.style.boxShadow = '0 0 30px rgba(0,212,255,0.4)'
            }}
          >
            VIEW PROJECTS
          </button>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              padding: '0.9rem 2.5rem',
              background: 'transparent',
              border: '1px solid rgba(0,212,255,0.5)',
              borderRadius: '50px',
              color: 'var(--electric-blue)',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '0.75rem',
              letterSpacing: '0.15em',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(0,212,255,0.1)'
              e.target.style.transform = 'translateY(-3px)'
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent'
              e.target.style.transform = ''
            }}
          >
            CONTACT ME
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          style={{
            position: 'absolute',
            bottom: '3rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.6rem', letterSpacing: '0.3em', color: 'var(--text-secondary)' }}>EXPLORE</span>
          <div style={{
            width: '1px', height: '50px',
            background: 'linear-gradient(to bottom,rgba(0,212,255,0.8),transparent)',
            animation: 'float 2s ease-in-out infinite'
          }} />
        </motion.div>
      </div>
    </section>
  )
}
