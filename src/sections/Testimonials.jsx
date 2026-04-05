import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

// ─── Temporary JSON data (replace with backend API later) ───────────────────
const testimonialsData = [
  {
    id: 1,
    name: 'Rahul Mehta',
    role: 'Senior Engineer',
    company: 'Live Coder',
    avatar: 'RM',
    avatarColor: '#00d4ff',
    relation: 'Internship Mentor',
    text: 'Sumit demonstrated exceptional problem-solving ability during his internship. He picked up new concepts faster than most developers I\'ve mentored. His work on workflow automation was genuinely impressive for someone at that stage.',
    rating: 5,
    date: 'Aug 2024',
  },
  {
    id: 2,
    name: 'Priya Desai',
    role: 'Professor, Computer Engineering',
    company: 'Vidyalankar Institute of Technology',
    avatar: 'PD',
    avatarColor: '#7b2fff',
    relation: 'Faculty Guide',
    text: 'One of the most self-driven students I\'ve taught. Sumit\'s Sign Language Translator project stood out in our department showcase — technically solid, well-documented, and solving a real-world accessibility problem.',
    rating: 5,
    date: 'Dec 2024',
  },
  {
    id: 3,
    name: 'Arjun Nair',
    role: 'Full Stack Developer',
    company: 'Freelance',
    avatar: 'AN',
    avatarColor: '#00ffcc',
    relation: 'Peer Collaborator',
    text: 'Collaborated with Sumit on a hackathon project. His understanding of computer vision is way beyond his year. He debugged an OpenCV pipeline issue in minutes that had us stuck for hours. A reliable teammate.',
    rating: 5,
    date: 'Mar 2025',
  },
  {
    id: 4,
    name: 'Sneha Patil',
    role: 'ML Engineer',
    company: 'TechStartup, Mumbai',
    avatar: 'SP',
    avatarColor: '#ff2d8d',
    relation: 'Workshop Instructor',
    text: 'Sumit attended my ML workshop and was consistently the most engaged participant. He asked questions that even intermediate developers struggle to articulate. His PaintVision project shows real creative application of computer vision.',
    rating: 5,
    date: 'Jan 2025',
  },
]

// ─── Star rating component ───────────────────────────────────────────────────
function Stars({ count, color }) {
  return (
    <div style={{ display: 'flex', gap: '3px' }}>
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path
            d="M6 1l1.2 3.6H11L8.1 6.9l1.1 3.4L6 8.4l-3.2 1.9 1.1-3.4L1 4.6h3.8L6 1z"
            fill={i < count ? color : 'rgba(255,255,255,0.1)'}
          />
        </svg>
      ))}
    </div>
  )
}

// ─── Single card ─────────────────────────────────────────────────────────────
function TestimonialCard({ t, index, isInView, isActive, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.92 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: index * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      style={{
        cursor: 'pointer',
        background: isActive
          ? `linear-gradient(145deg, ${t.avatarColor}0d 0%, rgba(0,5,25,0.8) 100%)`
          : 'rgba(0,5,20,0.55)',
        border: `1px solid ${isActive ? t.avatarColor + '55' : 'rgba(0,212,255,0.1)'}`,
        borderRadius: '20px',
        padding: '1.8rem',
        backdropFilter: 'blur(20px)',
        transition: 'all 0.4s ease',
        boxShadow: isActive ? `0 8px 40px ${t.avatarColor}22, 0 0 0 1px ${t.avatarColor}22` : 'none',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Glow corner on active */}
      {isActive && (
        <div style={{
          position: 'absolute', top: 0, right: 0,
          width: '120px', height: '120px',
          background: `radial-gradient(circle at 100% 0%, ${t.avatarColor}18 0%, transparent 70%)`,
          pointerEvents: 'none',
        }} />
      )}

      {/* Quote mark */}
      <div style={{
        fontFamily: 'Georgia, serif',
        fontSize: '4rem',
        lineHeight: 0.6,
        color: `${t.avatarColor}25`,
        marginBottom: '0.8rem',
        userSelect: 'none',
      }}>
        "
      </div>

      {/* Text */}
      <p style={{
        color: 'var(--text-secondary)',
        fontSize: '0.88rem',
        lineHeight: 1.85,
        marginBottom: '1.4rem',
        fontStyle: 'italic',
      }}>
        {t.text}
      </p>

      {/* Rating */}
      <div style={{ marginBottom: '1.2rem' }}>
        <Stars count={t.rating} color={t.avatarColor} />
      </div>

      {/* Divider */}
      <div style={{
        height: '1px',
        background: `linear-gradient(90deg, ${t.avatarColor}30, transparent)`,
        marginBottom: '1.2rem',
      }} />

      {/* Author row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
        {/* Avatar */}
        <div style={{
          width: '42px', height: '42px', borderRadius: '50%', flexShrink: 0,
          background: `radial-gradient(circle at 35% 35%, ${t.avatarColor}cc, ${t.avatarColor}44)`,
          border: `1px solid ${t.avatarColor}55`,
          boxShadow: `0 0 12px ${t.avatarColor}44`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-display)',
          fontWeight: 700, fontSize: '0.7rem',
          color: '#fff',
          letterSpacing: '0.05em',
        }}>
          {t.avatar}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.82rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '0.15rem',
          }}>
            {t.name}
          </div>
          <div style={{
            fontSize: '0.75rem',
            color: 'var(--text-secondary)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
            {t.role} · {t.company}
          </div>
        </div>

        {/* Relation badge */}
        <div style={{
          fontSize: '0.58rem',
          padding: '3px 9px',
          borderRadius: '20px',
          background: `${t.avatarColor}12`,
          border: `1px solid ${t.avatarColor}35`,
          color: t.avatarColor,
          fontFamily: 'var(--font-display)',
          letterSpacing: '0.08em',
          whiteSpace: 'nowrap',
          flexShrink: 0,
        }}>
          {t.relation}
        </div>
      </div>

      {/* Date chip */}
      <div style={{
        position: 'absolute', top: '1.2rem', right: '1.2rem',
        fontSize: '0.6rem',
        color: 'rgba(0,212,255,0.4)',
        fontFamily: 'var(--font-display)',
        letterSpacing: '0.1em',
      }}>
        {t.date}
      </div>
    </motion.div>
  )
}

// ─── Main section ─────────────────────────────────────────────────────────────
export default function Testimonials() {
  const ref = useRef()
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [activeId, setActiveId] = useState(null)

  const toggle = (id) => setActiveId(prev => (prev === id ? null : id))

  return (
    <section
      id="testimonials"
      ref={ref}
      style={{ position: 'relative', padding: '8rem 0', overflow: 'hidden' }}
    >
      {/* Ambient background */}
      <div style={{
        position: 'absolute',
        top: '40%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '70vw', height: '60vh',
        background: 'radial-gradient(ellipse, rgba(123,47,255,0.06) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      {/* Floating star particles */}
      {[...Array(20)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: `${5 + (i * 17) % 90}%`,
          top: `${10 + (i * 23) % 80}%`,
          width: `${1 + (i % 3)}px`,
          height: `${1 + (i % 3)}px`,
          borderRadius: '50%',
          background: i % 3 === 0 ? '#00d4ff' : i % 3 === 1 ? '#7b2fff' : '#00ffcc',
          opacity: 0.2 + (i % 5) * 0.06,
          animation: `float ${4 + (i % 4)}s ease-in-out infinite`,
          animationDelay: `${i * 0.4}s`,
          pointerEvents: 'none',
        }} />
      ))}

      <div className="content-layer" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 3rem' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <motion.p
            className="section-label"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
          >
            ◆ Testimonials
          </motion.p>
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            Mission Reports
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            style={{
              color: 'var(--text-secondary)',
              marginTop: '1rem',
              fontSize: '0.9rem',
              lineHeight: 1.7,
              maxWidth: '480px',
              margin: '1rem auto 0',
            }}
          >
            Words from mentors, colleagues & collaborators across the galaxy
          </motion.p>

          {/* Backend notice badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.35 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginTop: '1.2rem',
              padding: '0.3rem 1rem',
              background: 'rgba(255,170,0,0.06)',
              border: '1px solid rgba(255,170,0,0.2)',
              borderRadius: '30px',
              fontSize: '0.65rem',
              color: 'rgba(255,170,0,0.7)',
              fontFamily: 'var(--font-display)',
              letterSpacing: '0.12em',
            }}
          >
            <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#ffaa00', animation: 'blink 2s infinite' }} />
            LIVE BACKEND COMING SOON · DEMO DATA
          </motion.div>
        </div>

        {/* Cards grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
        }}>
          {testimonialsData.map((t, i) => (
            <TestimonialCard
              key={t.id}
              t={t}
              index={i}
              isInView={isInView}
              isActive={activeId === t.id}
              onClick={() => toggle(t.id)}
            />
          ))}
        </div>

        {/* Summary strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '4rem',
            marginTop: '4rem',
            paddingTop: '2.5rem',
            borderTop: '1px solid rgba(0,212,255,0.1)',
            flexWrap: 'wrap',
          }}
        >
          {[
            { value: `${testimonialsData.length}`, label: 'Testimonials', color: '#00d4ff' },
            { value: '5.0', label: 'Avg Rating', color: '#ffaa00' },
            { value: '3', label: 'Institutions', color: '#7b2fff' },
            { value: '100%', label: 'Recommended', color: '#00ffcc' },
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

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </section>
  )
}