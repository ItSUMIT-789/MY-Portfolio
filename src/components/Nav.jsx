import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Education', href: '#education' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

const sectionIds = ['hero', 'about', 'skills', 'education', 'projects', 'testimonials', 'contact']

// Finds the ScrollControls scroll container injected by drei into the canvas DOM
function getScrollContainer() {
  // ScrollControls creates a div with overflow:scroll inside the canvas wrapper
  const canvasWrapper = document.querySelector('.canvas-wrapper')
  if (!canvasWrapper) return null
  // It's the first deeply-nested div with overflow:scroll or overflow:auto
  const all = canvasWrapper.querySelectorAll('*')
  for (const el of all) {
    const style = window.getComputedStyle(el)
    if (style.overflow === 'scroll' || style.overflow === 'auto' ||
        style.overflowY === 'scroll' || style.overflowY === 'auto') {
      return el
    }
  }
  return null
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('hero')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollContainer = getScrollContainer()
      const scrollTop = scrollContainer ? scrollContainer.scrollTop : window.scrollY
      setScrolled(scrollTop > 50)

      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 200 && rect.bottom > 200) {
            setActive(id)
            break
          }
        }
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (e, id) => {
    e.preventDefault()
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 1000,
          padding: scrolled ? '0.9rem 3rem' : '1.5rem 3rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          background: scrolled ? 'rgba(0,0,15,0.75)' : 'rgba(0,0,15,0.3)',
          borderBottom: `1px solid ${scrolled ? 'rgba(0,212,255,0.18)' : 'rgba(0,212,255,0.07)'}`,
          transition: 'padding 0.4s ease, background 0.4s ease, border-color 0.4s ease',
        }}
      >
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => scrollTo(e, 'hero')}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.15rem',
            fontWeight: 700,
            color: 'var(--electric-blue)',
            letterSpacing: '0.18em',
            textDecoration: 'none',
            textShadow: '0 0 20px rgba(0,212,255,0.5)',
            flexShrink: 0,
          }}
        >
          SS
        </a>

        {/* Desktop links */}
        <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none', margin: 0, padding: 0 }}>
          {navLinks.map(({ label, href }) => {
            const id = href.replace('#', '')
            const isActive = active === id
            return (
              <li key={href}>
                <a
                  href={href}
                  onClick={(e) => scrollTo(e, id)}
                  style={{
                    position: 'relative',
                    color: isActive ? 'var(--electric-blue)' : 'var(--text-secondary)',
                    textDecoration: 'none',
                    fontSize: '0.72rem',
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    fontFamily: 'var(--font-display)',
                    transition: 'color 0.3s ease',
                    paddingBottom: '4px',
                    display: 'inline-block',
                  }}
                  onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = '#fff' }}
                  onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = 'rgba(232,244,255,0.65)' }}
                >
                  {label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      style={{
                        position: 'absolute',
                        bottom: 0, left: 0, right: 0,
                        height: '1px',
                        background: 'var(--electric-blue)',
                        boxShadow: '0 0 8px rgba(0,212,255,0.8)',
                        borderRadius: '1px',
                        display: 'block',
                      }}
                    />
                  )}
                </a>
              </li>
            )
          })}
        </ul>

        {/* Right: Resume + hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0 }}>
          <a
            href={`${import.meta.env.BASE_URL}sumit-shidole resume.pdf`}
            download="Sumit_Shidole_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="resume-btn"
          >
            <svg width="11" height="12" viewBox="0 0 11 12" fill="none" style={{ flexShrink: 0 }}>
              <path d="M5.5 1v7M2.5 5.5l3 3 3-3M1 10.5h9"
                stroke="#00d4ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            RÉSUMÉ
          </a>

          <button
            onClick={() => setMenuOpen(prev => !prev)}
            aria-label="Toggle menu"
            className="nav-hamburger"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: 'var(--electric-blue)', display: 'none' }}
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              {menuOpen ? (
                <>
                  <line x1="3" y1="3" x2="19" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="19" y1="3" x2="3" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="19" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="3" y1="11" x2="19" y2="11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="3" y1="16" x2="19" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </>
              )}
            </svg>
          </button>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed',
              top: '64px', left: 0, right: 0,
              zIndex: 999,
              background: 'rgba(0,0,20,0.97)',
              borderBottom: '1px solid rgba(0,212,255,0.15)',
              backdropFilter: 'blur(20px)',
              padding: '1.5rem 2rem',
              display: 'flex', flexDirection: 'column', gap: '1rem',
              pointerEvents: 'auto',
            }}
          >
            {navLinks.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                onClick={(e) => scrollTo(e, href.replace('#', ''))}
                style={{
                  color: active === href.replace('#', '') ? 'var(--electric-blue)' : 'var(--text-secondary)',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.85rem',
                  letterSpacing: '0.2em',
                  padding: '0.5rem 0',
                  borderBottom: '1px solid rgba(0,212,255,0.08)',
                }}
              >
                {label}
              </a>
            ))}
            <a
              href={`${import.meta.env.BASE_URL}sumit-shidole resume.pdf`}
              download="Sumit_Shidole_Resume.pdf"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                marginTop: '0.4rem', padding: '0.6rem 1.4rem',
                background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.35)',
                borderRadius: '50px', color: 'var(--electric-blue)',
                fontFamily: 'var(--font-display)', fontSize: '0.72rem',
                letterSpacing: '0.15em', textDecoration: 'none', alignSelf: 'flex-start',
              }}
            >
              ↓ RESUME
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .resume-btn {
          display: inline-flex; align-items: center; gap: 0.45rem;
          padding: 0.48rem 1.2rem;
          background: linear-gradient(135deg, rgba(0,212,255,0.13), rgba(0,255,204,0.08));
          border: 1px solid rgba(0,212,255,0.4); border-radius: 50px;
          color: var(--electric-blue); font-family: var(--font-display);
          font-weight: 700; font-size: 0.68rem; letter-spacing: 0.18em;
          text-decoration: none; transition: background 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
          box-shadow: 0 0 14px rgba(0,212,255,0.1); white-space: nowrap;
        }
        .resume-btn:hover {
          background: linear-gradient(135deg, rgba(0,212,255,0.24), rgba(0,255,204,0.16));
          box-shadow: 0 0 28px rgba(0,212,255,0.32); border-color: rgba(0,212,255,0.75);
        }
        @media (max-width: 860px) {
          .nav-hamburger { display: block !important; }
          nav ul { display: none !important; }
          .resume-btn { display: none !important; }
        }
      `}</style>
    </>
  )
}
