import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Animated star particles with depth
function StarField() {
  const pointsRef = useRef()
  const count = 6000

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 250
      positions[i * 3 + 1] = (Math.random() - 0.5) * 250
      positions[i * 3 + 2] = (Math.random() - 0.5) * 250

      const r = 0.7 + Math.random() * 0.3
      const g = 0.85 + Math.random() * 0.15
      const b = 1.0
      colors[i * 3] = r
      colors[i * 3 + 1] = g
      colors[i * 3 + 2] = b
    }

    return { positions, colors }
  }, [])

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.008
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.25}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

// Nebula dust cloud effect
function NebulaDust() {
  const meshRef = useRef()
  const count = 800

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const radius = 20 + Math.random() * 50
      pos[i * 3] = Math.cos(theta) * radius
      pos[i * 3 + 1] = (Math.random() - 0.5) * 25
      pos[i * 3 + 2] = Math.sin(theta) * radius - 40
    }
    return pos
  }, [])

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.005
    }
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.7}
        color="#7b2fff"
        transparent
        opacity={0.2}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

// Shooting stars
function ShootingStar({ delay = 0 }) {
  const ref = useRef()

  useFrame((state) => {
    if (!ref.current) return
    const cycle = ((state.clock.elapsedTime + delay) % 9) / 9
    ref.current.position.x = -30 + cycle * 90
    ref.current.position.y = -20 + Math.sin(cycle * Math.PI) * 10
    ref.current.position.z = -5
    ref.current.material.opacity = cycle < 0.15 ? cycle * 6 : cycle > 0.75 ? (1 - cycle) * 4 : 0.9
  })

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.05, 4, 4]} />
      <meshBasicMaterial color="#00d4ff" transparent />
    </mesh>
  )
}

export default function GalaxyBackground() {
  return (
    <>
      <ambientLight intensity={0.3} color="#001133" />
      <pointLight position={[0, 0, 0]} intensity={3} color="#00d4ff" distance={80} />

      <StarField />
      <NebulaDust />

      <ShootingStar delay={0} />
      <ShootingStar delay={2.5} />
      <ShootingStar delay={5} />
    </>
  )
}
