import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { portfolioData } from '../utils/data'

const stats = [
  { value: '90.46%', label: 'Diploma Score' },
  { value: '2+', label: 'Projects Built' },
  { value: '3', label: 'Certifications' },
  { value: '2024', label: 'First Internship' },
]

export default function About() {
  const ref = useRef()
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="section" ref={ref} style={{ padding: '8rem 0' }}>
      {/* Planet graphic - CSS 3D sphere simulation */}
      

      <div className="content-layer" style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 3rem',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '4rem',
        alignItems: 'center'
      }}>
        {/* Left: text */}
        <div>
          <motion.p
            className="section-label"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            ◆ About Me
          </motion.p>

          <motion.h2
            className="section-title"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ marginBottom: '1.5rem' }}
          >
            Crafting Intelligence Through Code
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              color: 'var(--text-secondary)',
              lineHeight: 1.9,
              marginBottom: '1.5rem',
              fontSize: '1.05rem'
            }}
          >
            {portfolioData.bio}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem', marginBottom: '2rem' }}
          >
            {[
              { icon: '◎', label: portfolioData.location },
              { icon: '◎', label: portfolioData.email },
              { icon: '◎', label: 'B.Tech CE — Vidyalankar Institute of Technology' },
            ].map(({ icon, label }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <span style={{ color: 'var(--electric-blue)', fontSize: '0.7rem' }}>{icon}</span>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{label}</span>
              </div>
            ))}
          </motion.div>

          {/* Education timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {portfolioData.education.map((edu, i) => (
              <div key={i} style={{
                display: 'flex',
                gap: '1rem',
                marginBottom: '1rem',
                paddingLeft: '1rem',
                borderLeft: `2px solid ${edu.type === 'current' ? 'var(--electric-blue)' : 'rgba(0,212,255,0.3)'}`
              }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.95rem', color: edu.type === 'current' ? 'var(--electric-blue)' : 'var(--text-primary)' }}>
                    {edu.degree}
                  </div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{edu.institution}</div>
                  <div style={{ color: 'rgba(0,212,255,0.6)', fontSize: '0.8rem', marginTop: '0.2rem' }}>
                    {edu.period}{edu.aggregate ? ` · ${edu.aggregate}` : ''}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: stats grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1.2rem',
            paddingRight: '8rem'
          }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
              className="glass-card"
              style={{ textAlign: 'center', padding: '1.5rem 1rem' }}
            >
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '2rem',
                fontWeight: 900,
                background: 'linear-gradient(135deg, #00d4ff, #00ffcc)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '0.5rem'
              }}>
                {stat.value}
              </div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.78rem', letterSpacing: '0.1em' }}>
                {stat.label}
              </div>
            </motion.div>
          ))}

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.9 }}
            className="glass-card"
            style={{ gridColumn: '1 / -1', padding: '1.5rem' }}
          >
            <div style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: 'var(--electric-blue)', marginBottom: '1rem' }}>CERTIFICATIONS</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {portfolioData.certifications.map((cert) => (
                <div key={cert.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem' }}>{cert.name}</span>
                  <span style={{ fontSize: '0.75rem', color: 'rgba(0,212,255,0.6)', background: 'rgba(0,212,255,0.08)', padding: '2px 10px', borderRadius: '20px' }}>{cert.issuer}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
