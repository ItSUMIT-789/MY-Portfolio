import { useRef, useMemo, forwardRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/* ===========================
   TEXTURE GENERATOR (IMPROVED)
=========================== */
function createPlanetTexture(color1, color2, seed = 42) {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 512
  const ctx = canvas.getContext('2d')

  const c1 = new THREE.Color(color1)
  const c2 = new THREE.Color(color2)

  const grad = ctx.createLinearGradient(0, 0, 1024, 512)
  grad.addColorStop(0, c1.getStyle())
  grad.addColorStop(0.5, c1.clone().lerp(c2, 0.5).getStyle())
  grad.addColorStop(1, c2.getStyle())
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, 1024, 512)

  // Add noise-like variation
  for (let i = 0; i < 4000; i++) {
    const x = Math.random() * 1024
    const y = Math.random() * 512
    const size = Math.random() * 2
    ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.05})`
    ctx.fillRect(x, y, size, size)
  }

  return new THREE.CanvasTexture(canvas)
}

/* ===========================
   ATMOSPHERE (FRESNEL EFFECT)
=========================== */
function Atmosphere({ radius, color }) {
  return (
    <mesh>
      <sphereGeometry args={[radius * 1.12, 64, 64]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.15}
        side={THREE.BackSide}
        depthWrite={false}
      />
    </mesh>
  )
}

/* ===========================
   REALISTIC RINGS
=========================== */
function PlanetRings({ radius, color }) {
  return (
    <mesh rotation={[Math.PI / 5, 0, 0]}>
      <ringGeometry args={[radius * 1.4, radius * 2.2, 128]} />
      <meshBasicMaterial
        color={color}
        side={THREE.DoubleSide}
        transparent
        opacity={0.25}
      />
    </mesh>
  )
}

/* ===========================
   PLANET COMPONENT
=========================== */
const Planet = forwardRef(function Planet({
  size = 2,
  position = [0, 0, 0],
  color1 = '#1a6fa8',
  color2 = '#0a3060',
  glowColor = '#00d4ff',
  rotationSpeed = 0.002,
  floatSpeed = 0.3,
  floatAmplitude = 0.15,
  hasRings = false,
}, ref) {

  const meshRef = useRef()
  const groupRef = useRef()

  const texture = useMemo(
    () => createPlanetTexture(color1, color2),
    [color1, color2]
  )

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed
    }

    if (groupRef.current) {
      groupRef.current.position.y =
        position[1] +
        Math.sin(state.clock.elapsedTime * floatSpeed) * floatAmplitude
    }
  })

  return (
    <group ref={groupRef} position={position}>

      {/* 🌍 PLANET */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[size, 128, 128]} />
        <meshStandardMaterial
          map={texture}
          roughness={0.6}
          metalness={0.2}
        />
      </mesh>

      {/* 🌫 ATMOSPHERE */}
      <Atmosphere radius={size} color={glowColor} />

      {/* 💫 RINGS */}
      {hasRings && <PlanetRings radius={size} color={glowColor} />}

      {/* 💡 LIGHT EMISSION */}
      <pointLight
        color={glowColor}
        intensity={2}
        distance={size * 10}
      />
    </group>
  )
})

export default Planet