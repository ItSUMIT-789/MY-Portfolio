import { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'
import CustomCursor from './components/CustomCursor'
import Nav from './components/Nav'
import Hero from './sections/Hero'
import About from './sections/About'
import Skills from './sections/Skills'
import Education from './sections/Education'
import Projects from './sections/Projects'
import Testimonials from './sections/Testimonials'
import Contact from './sections/Contact'

// ─── Loader ────────────────────────────────────────────────────────────────
function Loader() {
  return (
    <div style={{
      position: 'fixed', inset: 0, background: '#00000f',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      zIndex: 99999, fontFamily: 'var(--font-display)',
    }}>
      <div style={{
        width: '60px', height: '60px', borderRadius: '50%',
        border: '2px solid rgba(0,212,255,0.2)',
        borderTop: '2px solid #00d4ff',
        animation: 'spin 1s linear infinite',
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <p style={{ color: 'rgba(0,212,255,0.6)', marginTop: '1.5rem', fontSize: '0.7rem', letterSpacing: '0.4em' }}>
        INITIALIZING UNIVERSE
      </p>
    </div>
  )
}

// ─── Three.js galaxy canvas — pure imperative, exactly matching the standalone ──
function GalaxyCanvas() {
  const canvasRef = useRef()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Renderer
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x00000f, 1)

    // Scene & camera
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 500)
    camera.position.set(0, 0, 10)

    // Lights
    scene.add(new THREE.AmbientLight(0x001133, 0.3))
    const pLight = new THREE.PointLight(0x00d4ff, 3, 80)
    pLight.position.set(0, 0, 0)
    scene.add(pLight)

    // ── Stars ──────────────────────────────────────────────────────────────
    const N = 6000
    const starPos = new Float32Array(N * 3)
    const starCol = new Float32Array(N * 3)
    for (let i = 0; i < N; i++) {
      starPos[i * 3]     = (Math.random() - 0.5) * 250
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 250
      starPos[i * 3 + 2] = (Math.random() - 0.5) * 250
      starCol[i * 3]     = 0.7 + Math.random() * 0.3
      starCol[i * 3 + 1] = 0.85 + Math.random() * 0.15
      starCol[i * 3 + 2] = 1
    }
    const starGeo = new THREE.BufferGeometry()
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3))
    starGeo.setAttribute('color',    new THREE.BufferAttribute(starCol, 3))
    const starField = new THREE.Points(starGeo, new THREE.PointsMaterial({
      size: 0.25, vertexColors: true, transparent: true,
      opacity: 0.85, sizeAttenuation: true, depthWrite: false,
    }))
    scene.add(starField)

    // ── Nebula dust ────────────────────────────────────────────────────────
    const nb = 800
    const nebPos = new Float32Array(nb * 3)
    for (let i = 0; i < nb; i++) {
      const t = Math.random() * Math.PI * 2
      const r = 20 + Math.random() * 50
      nebPos[i * 3]     = Math.cos(t) * r
      nebPos[i * 3 + 1] = (Math.random() - 0.5) * 25
      nebPos[i * 3 + 2] = Math.sin(t) * r - 40
    }
    const nebGeo = new THREE.BufferGeometry()
    nebGeo.setAttribute('position', new THREE.BufferAttribute(nebPos, 3))
    scene.add(new THREE.Points(nebGeo, new THREE.PointsMaterial({
      size: 0.7, color: 0x7b2fff, transparent: true,
      opacity: 0.2, sizeAttenuation: true, depthWrite: false,
    })))

    // ── Planet factory ─────────────────────────────────────────────────────
    function makeCanvasTex(c1, c2, seed) {
      const cv  = document.createElement('canvas'); cv.width = 512; cv.height = 256
      const ctx = cv.getContext('2d')
      const t1  = new THREE.Color(c1), t2 = new THREE.Color(c2)
      const g   = ctx.createLinearGradient(0, 0, 512, 256)
      g.addColorStop(0, `rgb(${~~(t1.r*255)},${~~(t1.g*255)},${~~(t1.b*255)})`)
      g.addColorStop(1, `rgb(${~~(t2.r*255)},${~~(t2.g*255)},${~~(t2.b*255)})`)
      ctx.fillStyle = g; ctx.fillRect(0, 0, 512, 256)
      const rng = n => { let x = Math.sin(n * seed) * 10000; return x - Math.floor(x) }
      for (let i = 0; i < 20; i++) {
        ctx.beginPath()
        ctx.ellipse(rng(i*3.1)*512, rng(i*2.7)*256, 15+rng(i*1.3)*55, 10+rng(i*4.1)*30, rng(i)*Math.PI, 0, Math.PI*2)
        ctx.fillStyle = `rgba(${~~(t2.r*255)},${~~(t2.g*255)},${~~(t2.b*255)},${0.07+rng(i*0.9)*0.12})`
        ctx.fill()
      }
      return new THREE.CanvasTexture(cv)
    }

    function makePlanet(sz, pos, c1, c2, glow, seed = 42, rings = false) {
      const g = new THREE.Group(); g.position.set(...pos)
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(sz, 48, 48),
        new THREE.MeshStandardMaterial({ map: makeCanvasTex(c1, c2, seed), roughness: 0.8, metalness: 0.1 })
      )
      g.add(mesh)
      // atmosphere
      g.add(new THREE.Mesh(
        new THREE.SphereGeometry(sz * 1.07, 24, 24),
        new THREE.MeshBasicMaterial({ color: new THREE.Color(glow), transparent: true, opacity: 0.07, side: THREE.BackSide, depthWrite: false })
      ))
      if (rings) {
        const ring = new THREE.Mesh(
          new THREE.TorusGeometry(sz * 1.5, sz * 0.07, 2, 80),
          new THREE.MeshBasicMaterial({ color: new THREE.Color(glow), transparent: true, opacity: 0.25, side: THREE.DoubleSide })
        )
        ring.rotation.x = Math.PI / 5
        g.add(ring)
      }
      g.add(new THREE.PointLight(new THREE.Color(glow), 1.5, sz * 8, 2))
      g.userData = { mesh, baseY: pos[1], rotSpeed: 0.002 + Math.random() * 0.003 }
      scene.add(g)
      return g
    }

    const planets = [
      makePlanet(2.4,  [ 3,   -0.5,   0], '#1a6fa8', '#0a3060', '#00d4ff', 77),
      makePlanet(3.2,  [ 5.5,  0.5, -12], '#1a4a8a', '#0d2255', '#4488ff', 33),
      makePlanet(1.1,  [-4.5,  2,   -24], '#7b2fff', '#3d1080', '#7b2fff', 55),
      makePlanet(0.75, [ 4.2, -1,   -27], '#00c4a0', '#005540', '#00ffcc', 88),
      makePlanet(0.9,  [-2.5, -2,   -22], '#dd2070', '#6b0038', '#ff2d8d', 21),
      makePlanet(3.8,  [ 0,    1,   -40], '#1a5080', '#0a2540', '#00d4ff', 99, true),
      makePlanet(1.8,  [-3.5,  0.5, -58], '#4a1080', '#1a0535', '#7b2fff', 66),
    ]

    // ── Shooting stars ─────────────────────────────────────────────────────
    const shooters = []
    for (let i = 0; i < 3; i++) {
      const m = new THREE.Mesh(
        new THREE.SphereGeometry(0.05, 4, 4),
        new THREE.MeshBasicMaterial({ color: 0x00d4ff, transparent: true })
      )
      scene.add(m)
      shooters.push({ mesh: m, offset: i * 2.5 })
    }

    // ── Scroll tracking — native window scroll ──────────────────────────────
    let scrollY = 0
    let targetScrollY = 0
    const onScroll = () => { targetScrollY = window.scrollY }
    window.addEventListener('scroll', onScroll, { passive: true })

    // ── Resize ─────────────────────────────────────────────────────────────
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', onResize)

    // ── Animation loop ─────────────────────────────────────────────────────
    const clock = new THREE.Clock()
    let rafId
    function animate() {
      rafId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()

      // Smooth scroll lerp
      scrollY += (targetScrollY - scrollY) * 0.06
      const maxScroll = Math.max(1, document.body.scrollHeight - window.innerHeight)
      const sf = scrollY / maxScroll  // 0 → 1

      // Camera flies forward exactly as in the standalone
      camera.position.z = 10 - sf * 70
      camera.position.y = Math.sin(sf * Math.PI * 1.5) * 2
      camera.position.x = Math.sin(sf * Math.PI) * 2.5

      // Planet rotation + float
      planets.forEach((g, i) => {
        g.userData.mesh.rotation.y += g.userData.rotSpeed
        g.position.y = g.userData.baseY + Math.sin(t * 0.3 + i) * 0.18
      })

      // Shooting stars
      shooters.forEach((s, i) => {
        const cycle = ((t + s.offset) % 9) / 9
        s.mesh.position.set(-30 + cycle * 90, -20 + Math.sin(cycle * Math.PI) * 10, -5 - i * 8)
        s.mesh.material.opacity = cycle < 0.15 ? cycle * 6 : cycle > 0.75 ? (1 - cycle) * 4 : 0.9
      })

      // Slow star-field rotation
      starField.rotation.y = t * 0.008

      renderer.render(scene, camera)
    }
    animate()

    // ── Cleanup ────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', top: 0, left: 0,
        width: '100%', height: '100%',
        zIndex: 0, pointerEvents: 'none',
        background: 'linear-gradient(to bottom, #00000f, #020213)',
      }}
    />
  )
}

// ─── App ───────────────────────────────────────────────────────────────────
export default function App() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 1200)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      <CustomCursor />
      {!loaded && <Loader />}

      {/*
        ARCHITECTURE — matching the standalone exactly:
        • <canvas> is position:fixed, z-index:0, pointer-events:none
          It renders Three.js and listens to native window.scroll
        • HTML sections are normal document flow (position:relative, z-index:10)
          They scroll naturally — no ScrollControls, no fixed overlay tricks
        • Nav is position:fixed as usual
        This is the only architecture that gives both working native scroll
        AND a scroll-driven Three.js camera simultaneously.
      */}

      {/* Fixed Three.js canvas */}
      <GalaxyCanvas />

      {/* Normal HTML flow — sections stack vertically, page scrolls naturally */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <Nav />
        <Hero />
        <About />
        <Skills />
        <Education />
        <Projects />
        <Testimonials />
        <Contact />
      </div>
    </>
  )
}
