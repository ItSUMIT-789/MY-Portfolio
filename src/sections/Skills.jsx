import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { portfolioData } from '../utils/data'

const categoryColors = {
  Programming: { main: '#00d4ff', bg: 'rgba(0,212,255,0.1)' },
  ML:          { main: '#7b2fff', bg: 'rgba(123,47,255,0.1)' },
  Vision:      { main: '#00ffcc', bg: 'rgba(0,255,204,0.1)' },
  Backend:     { main: '#ff2d8d', bg: 'rgba(255,45,141,0.1)' },
  Web:         { main: '#ffaa00', bg: 'rgba(255,170,0,0.1)' },
  Tools:       { main: '#a0e4ff', bg: 'rgba(160,228,255,0.1)' },
  CS:          { main: '#ff6b6b', bg: 'rgba(255,107,107,0.1)' },
}

function SkillBar({ skill, index, isInView }) {
  const color = categoryColors[skill.category] || { main: '#00d4ff', bg: 'rgba(0,212,255,0.1)' }
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      style={{ marginBottom: '1.2rem' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
          <span style={{
            fontSize: '0.65rem',
            padding: '2px 8px',
            borderRadius: '20px',
            background: color.bg,
            color: color.main,
            letterSpacing: '0.1em'
          }}>
            {skill.category}
          </span>
          <span style={{ fontSize: '0.95rem', fontWeight: 400 }}>{skill.name}</span>
        </div>
        <span style={{ fontSize: '0.8rem', color: color.main, fontFamily: 'var(--font-display)' }}>
          {skill.level}%
        </span>
      </div>
      <div style={{
        height: '4px',
        background: 'rgba(255,255,255,0.06)',
        borderRadius: '2px',
        overflow: 'hidden'
      }}>
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : {}}
          transition={{ delay: index * 0.08 + 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{
            height: '100%',
            background: `linear-gradient(90deg, ${color.main}99, ${color.main})`,
            borderRadius: '2px',
            boxShadow: `0 0 8px ${color.main}66`
          }}
        />
      </div>
    </motion.div>
  )
}

// Orbital skill planet (decorative)
function OrbitingPlanet({ angle, distance, size, color, label, animSpeed }) {
  return (
    <motion.div
      style={{
        position: 'absolute',
        top: '50%', left: '50%',
        width: size, height: size,
      }}
      animate={{ rotate: 360 }}
      transition={{ duration: animSpeed, repeat: Infinity, ease: 'linear' }}
    >
      <div style={{
        position: 'absolute',
        transform: `translateX(${distance}px) translate(-50%, -50%)`,
        width: size, height: size,
      }}>
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: animSpeed, repeat: Infinity, ease: 'linear' }}
          style={{
            width: '100%', height: '100%',
            borderRadius: '50%',
            background: `radial-gradient(circle at 35% 35%, ${color}cc, ${color}44)`,
            boxShadow: `0 0 15px ${color}66`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.55rem',
            fontFamily: 'var(--font-display)',
            color: 'white',
            letterSpacing: '0.05em',
            textAlign: 'center',
            padding: '2px'
          }}
        >
          {label}
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const ref = useRef()
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const orbitData = [
    { distance: 90, size: 48, color: '#00d4ff', label: 'Python', animSpeed: 12 },
    { distance: 130, size: 42, color: '#7b2fff', label: 'TF', animSpeed: 18 },
    { distance: 160, size: 36, color: '#00ffcc', label: 'CV', animSpeed: 22 },
    { distance: 110, size: 40, color: '#ff2d8d', label: 'Flask', animSpeed: 15 },
    { distance: 75, size: 32, color: '#ffaa00', label: 'JS', animSpeed: 9 },
    { distance: 145, size: 38, color: '#a0e4ff', label: 'Git', animSpeed: 25 },
  ]

  return (
    <section id="skills" className="section" ref={ref} style={{ padding: '8rem 0' }}>
      <div className="content-layer" style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 3rem',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '4rem',
        alignItems: 'center'
      }}>
        {/* Left: orbit visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1 }}
          style={{
            position: 'relative',
            height: '420px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {/* Orbit rings */}
          {[75, 110, 130, 145, 160].map((r, i) => (
            <div key={r} style={{
              position: 'absolute',
              width: r * 2 + 'px', height: r * 2 + 'px',
              borderRadius: '50%',
              border: `1px solid rgba(0,212,255,${0.06 + i * 0.02})`,
              top: '50%', left: '50%',
              transform: 'translate(-50%,-50%)'
            }} />
          ))}

          {/* Center core */}
          <div style={{
            width: '70px', height: '70px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,212,255,0.9) 0%, rgba(0,100,200,0.4) 60%, transparent 100%)',
            boxShadow: '0 0 40px rgba(0,212,255,0.8), 0 0 80px rgba(0,212,255,0.3)',
            zIndex: 2
          }} />

          {/* Orbiting planets */}
          {orbitData.map((p, i) => (
            <OrbitingPlanet key={i} {...p} angle={i * 60} />
          ))}
        </motion.div>

        {/* Right: skill bars */}
        <div>
          <motion.p
            className="section-label"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            ◆ Technical Skills
          </motion.p>
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ marginBottom: '2rem' }}
          >
            My Cosmic Arsenal
          </motion.h2>

          {portfolioData.skills.map((skill, i) => (
            <SkillBar key={skill.name} skill={skill} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  )
}
