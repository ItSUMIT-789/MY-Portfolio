import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

// ─── Temporary JSON data (replace with backend API later) ───────────────────
const initialTestimonials = [
  {
    id: 1,
    name: 'Abhay Sonone',
    avatar: 'AS',
    avatarColor: '#00d4ff',
    text: 'Sumit is focused and always serious about his work. He helps others and keeps learning new things.',
  },
  {
    id: 2,
    name: 'Harsh Aachrekar',
    avatar: 'HA',
    avatarColor: '#7b2fff',
    text: 'Working with Sumit is smooth and productive. He communicates well, shares ideas, and always supports the team',
  },
  {
    id: 3,
    name: 'Niraj Bhoir',
    avatar: 'NB',
    avatarColor: '#00ffcc',
    text: 'Sumit is a focused and hardworking developer. He learns quickly and is always ready to take on new challenges.',
  },
  {
    id: 4,
    name: 'Dipak Shelavle',
    avatar: 'DS',
    avatarColor: '#d900ff',
    text: 'Sumit is hardworking and passionate about what he does. He always stays motivated and encourages others too.',
  },
  {
    id: 5,
    name: 'Diksha Ghanghav',
    avatar: 'DG',
    avatarColor: '#ff2d8d',
    text: 'Nice! Portfolio',
  },
]

// ─── Single card ─────────────────────────────────────────────────────────────
function TestimonialCard({ t, index, isInView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.92 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: index * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{
        cursor: 'default',
        background: '#081225',
        border: '1px solid rgba(0, 212, 255, 0.24)',
        borderRadius: '28px',
        padding: '2rem 1.8rem 1.8rem',
        backdropFilter: 'blur(20px)',
        transition: 'all 0.4s ease',
        boxShadow: '0 16px 40px rgba(0, 0, 0, 0.35)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute',
        top: '0.9rem',
        left: '1rem',
        width: '110px',
        height: '110px',
        borderRadius: '50%',
        background: `radial-gradient(circle, ${t.avatarColor}15 0%, transparent 70%)`,
        pointerEvents: 'none',
        filter: 'blur(2px)',
      }} />

      <div style={{
        fontFamily: 'Georgia, serif',
        fontSize: '4.8rem',
        lineHeight: 0.55,
        color: `${t.avatarColor}30`,
        marginBottom: '1.6rem',
        userSelect: 'none',
        position: 'relative',
        zIndex: 1,
      }}>
        “
      </div>

      <p style={{
        color: '#98a5bc',
        fontSize: '1.18rem',
        lineHeight: 1.9,
        marginBottom: '4rem',
        fontStyle: 'italic',
        position: 'relative',
        zIndex: 1,
      }}>
        {t.text}
      </p>

      <div style={{
        height: '1px',
        background: 'rgba(255,255,255,0.08)',
        marginBottom: '1.3rem',
        position: 'relative',
        zIndex: 1,
      }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', position: 'relative', zIndex: 1 }}>
        <div style={{
          width: '56px', height: '56px', borderRadius: '50%', flexShrink: 0,
          background: 'transparent',
          border: `1px solid ${t.avatarColor}88`,
          boxShadow: `0 0 0 1px ${t.avatarColor}22, inset 0 0 18px ${t.avatarColor}22`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-display)',
          fontWeight: 700, fontSize: '0.95rem',
          color: t.avatarColor,
          letterSpacing: '0.06em',
        }}>
          {t.avatar}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.05rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            letterSpacing: '0.01em',
          }}>
            {t.name}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Main section ─────────────────────────────────────────────────────────────
export default function Testimonials() {
  const ref = useRef()
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [showAll, setShowAll] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [testimonials, setTestimonials] = useState(initialTestimonials)

  const displayedTestimonials = showAll ? testimonials : testimonials.slice(0, 3)

  const handleSubmit = (event) => {
    event.preventDefault()

    const trimmedName = name.trim()
    const trimmedMessage = message.trim()

    if (!trimmedName || !trimmedMessage) {
      return
    }

    const initials = trimmedName
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0].toUpperCase())
      .join('')

    setTestimonials((prev) => [
      {
        id: Date.now(),
        name: trimmedName,
        avatar: initials || 'NA',
        avatarColor: '#00d4ff',
        text: trimmedMessage,
      },
      ...prev,
    ])

    setName('')
    setMessage('')
    setShowForm(false)
    setShowAll(true)
  }

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

          
          
        </div>

        {/* Cards grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
        }}>
          {displayedTestimonials.map((t, i) => (
            <TestimonialCard
              key={t.id}
              t={t}
              index={i}
              isInView={isInView}
            />
          ))}
        </div>

        <div style={{
          marginTop: '2rem',
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          flexWrap: 'wrap',
        }}>
          <button
            type="button"
            onClick={() => setShowAll((prev) => !prev)}
            style={{
              padding: '0.75rem 1.4rem',
              borderRadius: '999px',
              border: '1px solid rgba(0, 212, 255, 0.5)',
              background: showAll ? 'rgba(0, 212, 255, 0.16)' : 'rgba(0, 212, 255, 0.08)',
              color: '#d4ebff',
              fontFamily: 'var(--font-display)',
              fontSize: '0.75rem',
              letterSpacing: '0.08em',
              cursor: 'pointer',
            }}
          >
            {showAll ? 'Show Top Three' : 'View All Testimonials'}
          </button>

          <button
            type="button"
            onClick={() => setShowForm((prev) => !prev)}
            style={{
              padding: '0.75rem 1.4rem',
              borderRadius: '999px',
              border: '1px solid rgba(123, 47, 255, 0.45)',
              background: showForm ? 'rgba(123, 47, 255, 0.2)' : 'rgba(123, 47, 255, 0.1)',
              color: '#e4d7ff',
              fontFamily: 'var(--font-display)',
              fontSize: '0.75rem',
              letterSpacing: '0.08em',
              cursor: 'pointer',
            }}
          >
            Share Your Experience
          </button>
        </div>

        {showForm && (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            style={{
              marginTop: '2rem',
              maxWidth: '760px',
              marginInline: 'auto',
              padding: '2rem',
              borderRadius: '26px',
              background: 'linear-gradient(135deg, rgba(4,14,40,0.94), rgba(2,10,30,0.98))',
              border: '1px solid rgba(0, 212, 255, 0.26)',
              boxShadow: '0 20px 50px rgba(0,0,0,0.35)',
            }}
          >
            <h3 style={{
              textAlign: 'center',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-display)',
              fontSize: '2rem',
              marginBottom: '0.6rem',
            }}>
              Leave a Testimonial
            </h3>

            <p style={{
              textAlign: 'center',
              color: 'var(--text-secondary)',
              marginBottom: '1.8rem',
            }}>
              Share your experience working with me.
            </p>

            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              style={{
                width: '100%',
                padding: '1rem 1.2rem',
                borderRadius: '14px',
                border: '1px solid rgba(255,255,255,0.12)',
                background: 'rgba(255,255,255,0.04)',
                color: 'var(--text-primary)',
                fontSize: '1.05rem',
                marginBottom: '1rem',
                outline: 'none',
              }}
            />

            <textarea
              placeholder="Write your testimonial..."
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              required
              rows={6}
              style={{
                width: '100%',
                padding: '1rem 1.2rem',
                borderRadius: '14px',
                border: '1px solid rgba(255,255,255,0.12)',
                background: 'rgba(255,255,255,0.04)',
                color: 'var(--text-primary)',
                fontSize: '1.05rem',
                marginBottom: '1.5rem',
                resize: 'vertical',
                outline: 'none',
              }}
            />

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button
                type="submit"
                style={{
                  padding: '0.9rem 2rem',
                  borderRadius: '999px',
                  border: '1px solid rgba(123, 47, 255, 0.7)',
                  background: 'linear-gradient(90deg, rgba(0,212,255,0.18), rgba(123,47,255,0.24))',
                  color: '#eaf4ff',
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.9rem',
                  letterSpacing: '0.05em',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Submit Testimonial
              </button>
            </div>
          </motion.form>
        )}
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