import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { portfolioData } from '../utils/data'

const contactLinks = [
  {
    label: 'Email',
    value: portfolioData.email,
    href: `mailto:${portfolioData.email}`,
    icon: '✉',
    color: '#00d4ff'
  },
  {
    label: 'LinkedIn',
    value: portfolioData.linkedin,
    href: `https://${portfolioData.linkedin}`,
    icon: 'in',
    color: '#0077b5'
  },
  {
    label: 'GitHub',
    value: portfolioData.github,
    href: `https://${portfolioData.github}`,
    icon: '</>',
    color: '#7b2fff'
  },
  {
    label: 'Phone',
    value: portfolioData.phone,
    href: `tel:${portfolioData.phone}`,
    icon: '✆',
    color: '#00ffcc'
  },
]

function ContactCard({ link, index, isInView }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.a
      href={link.href}
      target={link.href.startsWith('http') ? '_blank' : undefined}
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1.2rem',
        padding: '1.2rem 1.5rem',
        background: hovered ? `${link.color}0a` : 'rgba(0,5,20,0.4)',
        border: `1px solid ${hovered ? link.color + '50' : 'rgba(0,212,255,0.1)'}`,
        borderRadius: '16px',
        textDecoration: 'none',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        transform: hovered ? 'translateX(8px)' : 'none'
      }}
    >
      <div style={{
        width: '46px', height: '46px',
        borderRadius: '50%',
        background: `${link.color}15`,
        border: `1px solid ${link.color}40`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '0.85rem',
        color: link.color,
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        flexShrink: 0
      }}>
        {link.icon}
      </div>
      <div>
        <div style={{ fontSize: '0.7rem', color: link.color, letterSpacing: '0.15em', fontFamily: 'var(--font-display)', marginBottom: '0.2rem' }}>
          {link.label}
        </div>
        <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>{link.value}</div>
      </div>
      <div style={{
        marginLeft: 'auto',
        color: hovered ? link.color : 'var(--text-secondary)',
        fontSize: '1.1rem',
        transition: 'color 0.3s, transform 0.3s',
        transform: hovered ? 'translateX(4px)' : 'none'
      }}>
        →
      </div>
    </motion.a>
  )
}

function ContactForm({ isInView }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [focused, setFocused] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) return
    setSending(true)
    setTimeout(() => {
      setSending(false)
      setSubmitted(true)
      setForm({ name: '', email: '', message: '' })
      setTimeout(() => setSubmitted(false), 4000)
    }, 1200)
  }

  const inputStyle = (field) => ({
    width: '100%',
    padding: '0.9rem 1.2rem',
    background: focused === field ? 'rgba(0,212,255,0.06)' : 'rgba(0,5,30,0.6)',
    border: `1px solid ${focused === field ? 'rgba(0,212,255,0.5)' : 'rgba(0,212,255,0.15)'}`,
    borderRadius: '12px',
    color: 'var(--text-primary)',
    fontSize: '0.95rem',
    fontFamily: 'var(--font-body)',
    outline: 'none',
    transition: 'all 0.3s ease',
    boxShadow: focused === field ? '0 0 20px rgba(0,212,255,0.1)' : 'none',
    resize: 'none',
  })

  const labelStyle = {
    display: 'block',
    fontSize: '0.78rem',
    letterSpacing: '0.12em',
    color: 'var(--text-secondary)',
    marginBottom: '0.5rem',
    fontFamily: 'var(--font-display)',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.5, duration: 0.7 }}
      style={{
        background: 'rgba(0,5,25,0.6)',
        border: '1px solid rgba(0,212,255,0.15)',
        borderRadius: '24px',
        padding: '2.5rem',
        backdropFilter: 'blur(20px)',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ marginBottom: '1.8rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--electric-blue)', boxShadow: '0 0 8px rgba(0,212,255,0.8)' }} />
        <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.7rem', letterSpacing: '0.3em', color: 'var(--electric-blue)' }}>
          SEND A MESSAGE
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem', flex: 1 }}>
        {/* Name */}
        <div>
          <label style={labelStyle}>Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            placeholder="Your name"
            onChange={handleChange}
            onFocus={() => setFocused('name')}
            onBlur={() => setFocused(null)}
            style={inputStyle('name')}
          />
        </div>

        {/* Email */}
        <div>
          <label style={labelStyle}>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            placeholder="your@email.com"
            onChange={handleChange}
            onFocus={() => setFocused('email')}
            onBlur={() => setFocused(null)}
            style={inputStyle('email')}
          />
        </div>

        {/* Message */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <label style={labelStyle}>Message</label>
          <textarea
            name="message"
            value={form.message}
            placeholder="Write your message..."
            rows={5}
            onChange={handleChange}
            onFocus={() => setFocused('message')}
            onBlur={() => setFocused(null)}
            style={{ ...inputStyle('message'), flex: 1, minHeight: '120px' }}
          />
        </div>

        {/* Send Button */}
        <button
          onClick={handleSubmit}
          disabled={sending || submitted}
          style={{
            width: '100%',
            padding: '1rem',
            background: submitted
              ? 'linear-gradient(135deg, #00ffcc, #00d4ff)'
              : sending
              ? 'rgba(0,212,255,0.3)'
              : 'linear-gradient(135deg, #00d4ff, #00ffcc)',
            border: 'none',
            borderRadius: '12px',
            color: submitted || !sending ? '#00000f' : 'var(--electric-blue)',
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '0.8rem',
            letterSpacing: '0.15em',
            cursor: sending || submitted ? 'default' : 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: submitted || sending ? 'none' : '0 0 30px rgba(0,212,255,0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.6rem',
          }}
          onMouseEnter={(e) => {
            if (!sending && !submitted) {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 0 50px rgba(0,212,255,0.6)'
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = ''
            e.currentTarget.style.boxShadow = submitted || sending ? 'none' : '0 0 30px rgba(0,212,255,0.35)'
          }}
        >
          {submitted ? (
            <>✓ MESSAGE SENT!</>
          ) : sending ? (
            <>
              <span style={{
                width: '14px', height: '14px',
                border: '2px solid rgba(0,212,255,0.3)',
                borderTop: '2px solid #00d4ff',
                borderRadius: '50%',
                display: 'inline-block',
                animation: 'spin 0.8s linear infinite'
              }} />
              SENDING...
            </>
          ) : (
            <>✉ SEND MESSAGE</>
          )}
        </button>

        {/* spin keyframe injection */}
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </motion.div>
  )
}

export default function Contact() {
  const ref = useRef()
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="contact" className="section" ref={ref} style={{ padding: '8rem 0', minHeight: '80vh' }}>
      {/* Cosmic radial bg */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: '50%',
        transform: 'translateX(-50%)',
        width: '80vw', height: '50vh',
        background: 'radial-gradient(ellipse, rgba(0,212,255,0.05) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      <div className="content-layer" style={{
        maxWidth: '1100px', margin: '0 auto', padding: '0 3rem', width: '100%'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <motion.p
            className="section-label"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
          >
            ◆ Contact
          </motion.p>
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            Open For Launch
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            style={{ color: 'var(--text-secondary)', marginTop: '1rem', lineHeight: 1.8, maxWidth: '500px', margin: '1rem auto 0' }}
          >
            Looking for internship and collaboration opportunities. Let's build something great together.
          </motion.p>
        </div>

        {/* Two-column layout: links + form */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.35fr',
          gap: '2rem',
          alignItems: 'stretch',
          marginBottom: '5rem'
        }}>
          {/* Left: contact links — stretch to fill full height */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {contactLinks.map((link, i) => (
              <ContactCard key={link.label} link={link} index={i} isInView={isInView} />
            ))}
          </div>

          {/* Right: contact form */}
          <ContactForm isInView={isInView} />
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          style={{
            textAlign: 'center',
            paddingTop: '2rem',
            borderTop: '1px solid rgba(0,212,255,0.1)',
            color: 'var(--text-secondary)',
            fontSize: '0.8rem',
            letterSpacing: '0.1em'
          }}
        >
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: 'var(--electric-blue)', marginBottom: '0.5rem' }}>
            SUMIT SHIDOLE
          </div>
          <div>Built with React · Three.js · Framer Motion</div>
          <div style={{ marginTop: '0.8rem', fontSize: '0.75rem', letterSpacing: '0.08em' }}>
            © 2026 Sumit Shidole. All rights reserved.
          </div>
        </motion.div>
      </div>
    </section>
  )
}