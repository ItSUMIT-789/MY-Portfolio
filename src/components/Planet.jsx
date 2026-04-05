import { useRef, useMemo, forwardRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Procedural planet texture generator
function createPlanetTexture(color1, color2, seed = 42) {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 256
  const ctx = canvas.getContext('2d')

  const c1 = new THREE.Color(color1)
  const c2 = new THREE.Color(color2)

  // Base gradient
  const grad = ctx.createLinearGradient(0, 0, 512, 256)
  grad.addColorStop(0, `rgb(${Math.floor(c1.r*255)},${Math.floor(c1.g*255)},${Math.floor(c1.b*255)})`)
  grad.addColorStop(0.5, `rgb(${Math.floor((c1.r+c2.r)/2*255)},${Math.floor((c1.g+c2.g)/2*255)},${Math.floor((c1.b+c2.b)/2*255)})`)
  grad.addColorStop(1, `rgb(${Math.floor(c2.r*255)},${Math.floor(c2.g*255)},${Math.floor(c2.b*255)})`)
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, 512, 256)

  // Continent-like patches
  const rng = (n) => {
    let x = Math.sin(n * seed) * 10000
    return x - Math.floor(x)
  }

  for (let i = 0; i < 25; i++) {
    const x = rng(i * 3.1) * 512
    const y = rng(i * 2.7) * 256
    const rx = 15 + rng(i * 1.3) * 60
    const ry = 10 + rng(i * 4.1) * 35
    const alpha = 0.08 + rng(i * 0.9) * 0.15

    ctx.beginPath()
    ctx.ellipse(x, y, rx, ry, rng(i) * Math.PI, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(${Math.floor(c2.r*255)},${Math.floor(c2.g*255)},${Math.floor(c2.b*255)},${alpha})`
    ctx.fill()
  }

  // Cloud streaks
  for (let i = 0; i < 8; i++) {
    const y = rng(i * 7.7) * 256
    ctx.beginPath()
    ctx.moveTo(0, y)
    for (let x = 0; x <= 512; x += 20) {
      ctx.lineTo(x, y + (rng(x * 0.01 + i) - 0.5) * 20)
    }
    ctx.strokeStyle = `rgba(255,255,255,0.06)`
    ctx.lineWidth = 4 + rng(i) * 6
    ctx.stroke()
  }

  return new THREE.CanvasTexture(canvas)
}

// Atmosphere glow ring
function Atmosphere({ radius, color }) {
  return (
    <mesh>
      <sphereGeometry args={[radius * 1.08, 32, 32]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.08}
        side={THREE.BackSide}
        depthWrite={false}
      />
    </mesh>
  )
}

// Rings for gas giant style
function PlanetRings({ radius, color }) {
  return (
    <mesh rotation={[Math.PI / 6, 0, 0]}>
      <torusGeometry args={[radius * 1.5, radius * 0.08, 2, 128]} />
      <meshBasicMaterial color={color} transparent opacity={0.3} side={THREE.DoubleSide} />
    </mesh>
  )
}

function seededUnit(seed) {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453
  return x - Math.floor(x)
}

const Planet = forwardRef(function Planet({
  size = 2,
  position = [0, 0, 0],
  color1 = '#1a6fa8',
  color2 = '#0a3060',
  glowColor = '#00d4ff',
  rotationSpeed,
  rotationSeed = 42,
  textureSeed = 42,
  floatSpeed = 0.3,
  floatAmplitude = 0.18,
  floatPhase = 0,
  hasRings = false,
  visible = true,
  onClick,
}, ref) {
  const meshRef = useRef()
  const groupRef = useRef()

  const texture = useMemo(() => createPlanetTexture(color1, color2, textureSeed), [color1, color2, textureSeed])
  const computedRotationSpeed = useMemo(() => 0.002 + seededUnit(rotationSeed) * 0.003, [rotationSeed])

  useFrame((state) => {
    const speed = rotationSpeed ?? computedRotationSpeed

    if (meshRef.current) {
      meshRef.current.rotation.y += speed
    }
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * floatSpeed + floatPhase) * floatAmplitude
    }
  })

  if (!visible) return null

  return (
    <group ref={(node) => {
      groupRef.current = node
      if (ref) ref.current = node
    }} position={position} onClick={onClick}>
      {/* Planet sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[size, 64, 64]} />
        <meshStandardMaterial
          map={texture}
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      {/* Atmosphere */}
      <Atmosphere radius={size} color={glowColor} />

      {/* Optional rings */}
      {hasRings && <PlanetRings radius={size} color={glowColor} />}

      {/* Point light from planet */}
      <pointLight color={glowColor} intensity={1.5} distance={size * 8} decay={2} />
    </group>
  )
})

export default Planet
