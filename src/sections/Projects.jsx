import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { portfolioData } from '../utils/data'

function ProjectPlanet({ project, index, isInView }) {
  const [hovered, setHovered] = useState(false)
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 80, scale: 0.85 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: index * 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{ position: 'relative' }}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setExpanded(!expanded)}
        style={{
          cursor: 'pointer',
          border: `1px solid ${hovered ? project.color + '60' : 'rgba(0,212,255,0.12)'}`,
          borderRadius: '24px',
          overflow: 'hidden',
          background: 'rgba(0,5,20,0.6)',
          backdropFilter: 'blur(20px)',
          transition: 'all 0.4s ease',
          transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
          boxShadow: hovered ? `0 20px 60px ${project.color}22, 0 0 40px ${project.color}15` : 'none'
        }}
      >
        {/* Planet visual header */}
        <div style={{
          height: '220px',
          position: 'relative',
          overflow: 'hidden',
          background: `radial-gradient(ellipse at 40% 40%, ${project.planetColor}88 0%, #020213 70%)`
        }}>
          {/* Grid lines */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `linear-gradient(${project.color}08 1px, transparent 1px), linear-gradient(90deg, ${project.color}08 1px, transparent 1px)`,
            backgroundSize: '30px 30px'
          }} />

          {/* Planet */}
          <motion.div
            animate={hovered ? { scale: 1.15, x: 20 } : { scale: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              right: '10%', top: '10%',
              width: '140px', height: '140px',
              borderRadius: '50%',
              background: `radial-gradient(circle at 35% 35%, ${project.color}cc 0%, ${project.planetColor} 50%, #010a1a 100%)`,
              boxShadow: `0 0 30px ${project.color}44, inset -10px -10px 30px rgba(0,0,0,0.6)`,
              animation: 'float 6s ease-in-out infinite'
            }}
          >
            {/* Surface detail */}
            {[...Array(5)].map((_, i) => (
              <div key={i} style={{
                position: 'absolute',
                left: '-5%', right: '-5%',
                top: `${15 + i * 15}%`,
                height: '8%',
                background: `rgba(255,255,255,0.04)`,
                borderRadius: '50%',
                transform: `rotate(${i * 3 - 6}deg)`
              }} />
            ))}
          </motion.div>

          {/* Project number */}
          <div style={{
            position: 'absolute', top: '1.5rem', left: '1.5rem',
            fontFamily: 'var(--font-display)',
            fontSize: '3rem',
            fontWeight: 900,
            color: `${project.color}20`,
            lineHeight: 1
          }}>
            0{project.id}
          </div>

          {/* Tech badges */}
          <div style={{
            position: 'absolute', bottom: '1rem', left: '1rem',
            display: 'flex', flexWrap: 'wrap', gap: '0.4rem'
          }}>
            {project.tech.slice(0, 3).map(t => (
              <span key={t} style={{
                fontSize: '0.65rem',
                padding: '3px 10px',
                borderRadius: '20px',
                background: `${project.color}18`,
                border: `1px solid ${project.color}40`,
                color: project.color,
                fontFamily: 'var(--font-display)',
                letterSpacing: '0.05em'
              }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '1.5rem' }}>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.2rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '0.5rem',
            letterSpacing: '0.03em'
          }}>
            {project.name}
          </h3>
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '0.9rem',
            lineHeight: 1.7,
            marginBottom: '1rem'
          }}>
            {project.shortDesc}
          </p>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
              >
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.8, marginBottom: '1rem' }}>
                  {project.description}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1rem' }}>
                  {project.highlights.map(h => (
                    <div key={h} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <div style={{
                        width: '5px', height: '5px', borderRadius: '50%',
                        background: project.color, flexShrink: 0
                      }} />
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{h}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {project.tech.map(t => (
                    <span key={t} style={{
                      fontSize: '0.7rem', padding: '3px 12px', borderRadius: '20px',
                      background: `${project.color}12`, border: `1px solid ${project.color}30`,
                      color: project.color
                    }}>{t}</span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            style={{
              marginTop: '1rem',
              background: 'transparent',
              border: `1px solid ${project.color}50`,
              borderRadius: '50px',
              padding: '0.5rem 1.5rem',
              color: project.color,
              fontFamily: 'var(--font-display)',
              fontSize: '0.7rem',
              letterSpacing: '0.15em',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => { e.target.style.background = project.color + '20' }}
            onMouseLeave={(e) => { e.target.style.background = 'transparent' }}
          >
            {expanded ? 'COLLAPSE ↑' : 'EXPLORE →'}
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const ref = useRef()
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="projects" className="section" ref={ref} style={{ padding: '8rem 0' }}>
      <div className="content-layer" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 3rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <motion.p
            className="section-label"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
          >
            ◆ Projects
          </motion.p>
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            Missions Launched
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            style={{ color: 'var(--text-secondary)', marginTop: '1rem', fontSize: '0.95rem' }}
          >
            Click any project to explore the full mission brief
          </motion.p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '2rem'
        }}>
          {portfolioData.projects.map((project, i) => (
            <ProjectPlanet key={project.id} project={project} index={i} isInView={isInView} />
          ))}
        </div>

        {/* Experience section embedded */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          style={{ marginTop: '5rem' }}
        >
          <p className="section-label" style={{ textAlign: 'center' }}>◆ Experience</p>
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '2rem' }}>Mission Log</h2>

          {portfolioData.experience.map((exp, i) => (
            <div
              key={i}
              className="glass-card"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: '2rem',
                flexWrap: 'wrap'
              }}
            >
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--electric-blue)', marginBottom: '0.3rem' }}>
                  {exp.role}
                </div>
                <div style={{ color: 'var(--text-primary)', fontSize: '1rem', marginBottom: '0.5rem' }}>{exp.company}</div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7, maxWidth: '600px' }}>{exp.description}</p>
              </div>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.75rem',
                color: 'rgba(0,212,255,0.6)',
                background: 'rgba(0,212,255,0.06)',
                border: '1px solid rgba(0,212,255,0.2)',
                borderRadius: '20px',
                padding: '0.4rem 1rem',
                whiteSpace: 'nowrap',
                alignSelf: 'flex-start'
              }}>
                {exp.period}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
