import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const educationData = [
  {
    id: 1,
    period: '2025 – 2028',
    degree: 'B.Tech Computer Engineering',
    institution: 'Vidyalankar Institute of Technology',
    location: 'Mumbai',
    score: '9.9 CGPA',
    scoreLabel: 'Current CGPA',
    status: 'current',
    statusLabel: 'IN ORBIT',
    color: '#00d4ff',
    glowColor: 'rgba(0,212,255,0.25)',
    planetColor: 'radial-gradient(circle at 35% 35%, #1a6fa8 0%, #0a3060 50%, #010d1f 100%)',
    icon: '🛸',
    skills: [
      { name: 'Data Structures & Algorithms', cat: 'CS' },
      { name: 'Operating Systems', cat: 'CS' },
      { name: 'Machine Learning', cat: 'ML' },
      { name: 'Computer Networks', cat: 'Networking' },
      { name: 'Database Management', cat: 'Backend' },
      { name: 'Software Engineering', cat: 'Engineering' },
    ],
    description: 'Pursuing advanced computer engineering with specialization in AI/ML systems, real-time computer vision, and full-stack development. Active in research and hackathons.'
  },
  {
    id: 2,
    period: '2022 – 2025',
    degree: 'Diploma Computer Engineering',
    institution: 'Shivajirao S. Jhondhle Polytechnic',
    location: 'Mumbai',
    score: '90.46%',
    scoreLabel: 'Aggregate',
    status: 'completed',
    statusLabel: 'COMPLETED',
    color: '#7b2fff',
    glowColor: 'rgba(123,47,255,0.25)',
    planetColor: 'radial-gradient(circle at 35% 35%, #5a1fbf 0%, #2d0f70 50%, #0a0520 100%)',
    icon: '🪐',
    skills: [
      { name: 'Python Programming', cat: 'Programming' },
      { name: 'C / C++', cat: 'Programming' },
      { name: 'OpenCV & MediaPipe', cat: 'Vision' },
      { name: 'Flask Web Framework', cat: 'Backend' },
      { name: 'HTML / CSS / JS', cat: 'Web' },
      { name: 'Git & GitHub', cat: 'Tools' },
    ],
    description: 'Built a strong foundation in core computer science. Developed real-world projects including Sign Language Translator and PaintVision — both powered by computer vision.'
  },
  {
    id: 3,
    period: '2022',
    degree: 'SSC — Secondary School Certificate',
    institution: 'M.N. Barora Madhyamika Vidyalaya',
    location: 'Shahapur',
    score: '87.60%',
    scoreLabel: 'Percentage',
    status: 'completed',
    statusLabel: 'COMPLETED',
    color: '#00ffcc',
    glowColor: 'rgba(0,255,204,0.25)',
    planetColor: 'radial-gradient(circle at 35% 35%, #009970 0%, #004d3a 50%, #001510 100%)',
    icon: '🌍',
    skills: [
      { name: 'Mathematics', cat: 'Foundation' },
      { name: 'Science & Technology', cat: 'Foundation' },
      { name: 'Analytical Thinking', cat: 'SoftSkills' },
      { name: 'Problem Solving', cat: 'SoftSkills' },
    ],
    description: 'Completed secondary education with distinction. Developed a passion for mathematics and science which laid the intellectual groundwork for a career in engineering.'
  }
]

const catColors = {
  CS: '#00d4ff',
  ML: '#7b2fff',
  Vision: '#00ffcc',
  Backend: '#ff2d8d',
  Web: '#ffaa00',
  Tools: '#a0e4ff',
  Programming: '#00d4ff',
  Networking: '#4488ff',
  Engineering: '#ff6b6b',
  Foundation: '#00ffcc',
  SoftSkills: '#ffaa00',
}

function CardContent({ edu, expanded, setExpanded, align }) {
  return (
    <div
      onClick={() => setExpanded(!expanded)}
      style={{
        cursor: 'pointer',
        background: 'rgba(0,5,25,0.7)',
        border: `1px solid ${expanded ? edu.color + '60' : 'rgba(0,212,255,0.1)'}`,
        borderRadius: '20px',
        padding: '1.5rem',
        backdropFilter: 'blur(20px)',
        transition: 'all 0.4s ease',
        boxShadow: expanded ? `0 0 40px ${edu.glowColor}` : 'none',
        textAlign: align === 'right' ? 'right' : 'left',
      }}
    >
      {/* Status */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        justifyContent: align === 'right' ? 'flex-end' : 'flex-start',
        marginBottom: '0.7rem',
      }}>
        <div style={{
          width: '6px', height: '6px', borderRadius: '50%',
          background: edu.color,
          boxShadow: `0 0 6px ${edu.color}`,
          animation: edu.status === 'current' ? 'blink 1.5s ease-in-out infinite' : 'none',
        }} />
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: '0.6rem',
          letterSpacing: '0.2em',
          color: edu.color,
        }}>
          {edu.statusLabel}
        </span>
      </div>

      {/* Degree */}
      <h3 style={{
        fontFamily: 'var(--font-display)',
        fontSize: '1rem',
        fontWeight: 700,
        color: 'var(--text-primary)',
        marginBottom: '0.3rem',
        lineHeight: 1.3,
        letterSpacing: '0.02em',
      }}>
        {edu.degree}
      </h3>

      {/* Institution */}
      <p style={{
        color: 'var(--text-secondary)',
        fontSize: '0.82rem',
        marginBottom: '0.8rem',
        lineHeight: 1.5,
      }}>
        {edu.institution}, {edu.location}
      </p>

      {/* Score badge */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        background: `${edu.color}10`,
        border: `1px solid ${edu.color}35`,
        borderRadius: '30px',
        padding: '0.25rem 0.9rem',
        marginBottom: '0.8rem',
      }}>
        <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', letterSpacing: '0.1em' }}>{edu.scoreLabel}</span>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: '0.9rem',
          fontWeight: 700,
          color: edu.color,
        }}>{edu.score}</span>
      </div>

      {/* Expand hint */}
      <div style={{
        fontSize: '0.65rem',
        color: 'rgba(0,212,255,0.4)',
        fontFamily: 'var(--font-display)',
        letterSpacing: '0.1em',
        display: 'block',
      }}>
        {expanded ? '▲ COLLAPSE' : '▼ VIEW SKILLS'}
      </div>

      {/* Expanded */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{
              marginTop: '1rem',
              paddingTop: '1rem',
              borderTop: `1px solid ${edu.color}20`,
            }}>
              <p style={{
                color: 'var(--text-secondary)',
                fontSize: '0.82rem',
                lineHeight: 1.8,
                marginBottom: '1rem',
              }}>
                {edu.description}
              </p>

              <div style={{
                fontSize: '0.6rem',
                fontFamily: 'var(--font-display)',
                letterSpacing: '0.2em',
                color: edu.color,
                marginBottom: '0.7rem',
              }}>
                SKILLS ACQUIRED
              </div>

              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.4rem',
                justifyContent: align === 'right' ? 'flex-end' : 'flex-start',
              }}>
                {edu.skills.map(skill => (
                  <motion.span
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      fontSize: '0.7rem',
                      padding: '3px 10px',
                      borderRadius: '20px',
                      background: `${catColors[skill.cat] || '#00d4ff'}15`,
                      border: `1px solid ${catColors[skill.cat] || '#00d4ff'}40`,
                      color: catColors[skill.cat] || '#00d4ff',
                      fontFamily: 'var(--font-display)',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {skill.name}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function PeriodBadge({ edu, align }) {
  return (
    <div style={{ textAlign: align, paddingTop: '1rem' }}>
      <div style={{
        display: 'inline-block',
        fontFamily: 'var(--font-display)',
        fontSize: '0.75rem',
        color: edu.color,
        background: `${edu.color}12`,
        border: `1px solid ${edu.color}40`,
        borderRadius: '20px',
        padding: '0.3rem 1rem',
        letterSpacing: '0.1em',
        marginBottom: '0.5rem',
      }}>
        {edu.period}
      </div>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: '2rem',
        fontWeight: 900,
        color: `${edu.color}18`,
        letterSpacing: '-0.02em',
        lineHeight: 1,
      }}>
        {edu.period.split(' – ')[0]}
      </div>
    </div>
  )
}

function EducationCard({ edu, index, isInView }) {
  const [expanded, setExpanded] = useState(false)
  const isLeft = index % 2 === 0

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.2 + 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 80px 1fr',
        alignItems: 'flex-start',
        marginBottom: '3rem',
        position: 'relative',
      }}
    >
      {/* LEFT */}
      <div style={{ paddingRight: '2rem', paddingTop: '0.5rem' }}>
        {isLeft
          ? <CardContent edu={edu} expanded={expanded} setExpanded={setExpanded} align="right" />
          : <PeriodBadge edu={edu} align="right" />
        }
      </div>

      {/* CENTER NODE */}
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        position: 'relative', zIndex: 2,
      }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ delay: index * 0.2 + 0.5, type: 'spring', stiffness: 200 }}
          whileHover={{ scale: 1.15, rotate: 10 }}
          onClick={() => setExpanded(!expanded)}
          style={{
            width: '60px', height: '60px',
            borderRadius: '50%',
            background: edu.planetColor,
            border: `2px solid ${edu.color}`,
            boxShadow: `0 0 20px ${edu.glowColor}, 0 0 40px ${edu.glowColor}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.5rem',
            cursor: 'pointer',
            flexShrink: 0,
            position: 'relative',
            zIndex: 3,
          }}
        >
          {edu.icon}
        </motion.div>

        {/* Pulse ring for current */}
        {edu.status === 'current' && (
          <div style={{
            position: 'absolute',
            top: 0,
            width: '60px', height: '60px',
            borderRadius: '50%',
            border: `1px solid ${edu.color}`,
            animation: 'pulseRingEdu 2s ease-out infinite',
            pointerEvents: 'none',
            zIndex: 2,
          }} />
        )}
      </div>

      {/* RIGHT */}
      <div style={{ paddingLeft: '2rem', paddingTop: '0.5rem' }}>
        {isLeft
          ? <PeriodBadge edu={edu} align="left" />
          : <CardContent edu={edu} expanded={expanded} setExpanded={setExpanded} align="left" />
        }
      </div>

      <style>{`
        @keyframes pulseRingEdu {
          0% { transform: scale(1); opacity: 0.9; }
          100% { transform: scale(2.4); opacity: 0; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </motion.div>
  )
}

export default function Education() {
  const ref = useRef()
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="education" ref={ref} style={{
      position: 'relative',
      padding: '8rem 0',
      overflow: 'hidden',
    }}>
      {/* Ambient glow */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80vw', height: '80vh',
        background: 'radial-gradient(ellipse, rgba(123,47,255,0.05) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div className="content-layer" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 3rem' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <motion.p
            className="section-label"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
          >
            ◆ Education
          </motion.p>
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            Academic Trajectory
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            style={{ color: 'var(--text-secondary)', marginTop: '1rem', fontSize: '0.9rem' }}
          >
            Click any mission node to explore skills &amp; details
          </motion.p>
        </div>

        {/* Timeline */}
        <div style={{ position: 'relative' }}>

          {/* Glowing center line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute',
              left: 'calc(50% - 0.5px)',
              top: '30px', bottom: '30px',
              width: '1px',
              background: 'linear-gradient(to bottom, #00d4ff 0%, #7b2fff 50%, #00ffcc 100%)',
              transformOrigin: 'top',
              opacity: 0.5,
              zIndex: 1,
            }}
          />
          {/* Dashed overlay */}
          <div style={{
            position: 'absolute',
            left: 'calc(50% - 0.5px)',
            top: '30px', bottom: '30px',
            width: '1px',
            backgroundImage: 'repeating-linear-gradient(to bottom, rgba(0,212,255,0.12) 0px, rgba(0,212,255,0.12) 5px, transparent 5px, transparent 14px)',
            zIndex: 1,
            pointerEvents: 'none',
          }} />

          {educationData.map((edu, i) => (
            <EducationCard key={edu.id} edu={edu} index={i} isInView={isInView} />
          ))}
        </div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.6 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '4rem',
            marginTop: '1rem',
            paddingTop: '2.5rem',
            borderTop: '1px solid rgba(0,212,255,0.1)',
            flexWrap: 'wrap',
          }}
        >
          {[
            { value: '9.9', label: 'Current CGPA', color: '#00d4ff' },
            { value: '90.46%', label: 'Diploma Score', color: '#7b2fff' },
            { value: '87.60%', label: 'SSC Score', color: '#00ffcc' },
            { value: '14+', label: 'Skills Gained', color: '#ffaa00' },
          ].map(stat => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.8rem',
                fontWeight: 900,
                color: stat.color,
                textShadow: `0 0 20px ${stat.color}`,
                lineHeight: 1,
                marginBottom: '0.4rem',
              }}>
                {stat.value}
              </div>
              <div style={{
                fontSize: '0.65rem',
                color: 'var(--text-secondary)',
                letterSpacing: '0.15em',
                fontFamily: 'var(--font-display)',
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}