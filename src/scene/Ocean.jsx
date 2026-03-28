import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

function Bubbles({ count = 40 }) {
  const meshRef = useRef()
  const dummy = useMemo(() => new THREE.Object3D(), [])

  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 30,
      y: -35 + Math.random() * 40,
      z: (Math.random() - 0.5) * 30,
      speed: 0.2 + Math.random() * 0.5,
      wobble: Math.random() * Math.PI * 2,
      scale: 0.03 + Math.random() * 0.08,
    }))
  }, [count])

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    particles.forEach((p, i) => {
      const y = ((p.y + clock.elapsedTime * p.speed) % 40) - 35
      const x = p.x + Math.sin(clock.elapsedTime * 0.5 + p.wobble) * 0.3
      dummy.position.set(x, y, p.z)
      dummy.scale.setScalar(p.scale)
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    })
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshStandardMaterial
        color="#ffffff"
        transparent
        opacity={0.3}
        emissive="#4fc3f7"
        emissiveIntensity={0.2}
      />
    </instancedMesh>
  )
}

function OceanFloor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -36, 0]} receiveShadow>
      <planeGeometry args={[100, 100, 32, 32]} />
      <meshStandardMaterial
        color="#0a2a1a"
        roughness={0.9}
        metalness={0.1}
      />
    </mesh>
  )
}

function LightRays() {
  const raysRef = useRef()

  useFrame(({ clock }) => {
    if (raysRef.current) {
      raysRef.current.rotation.z = Math.sin(clock.elapsedTime * 0.2) * 0.05
      raysRef.current.material.opacity = 0.08 + Math.sin(clock.elapsedTime * 0.5) * 0.03
    }
  })

  return (
    <mesh ref={raysRef} position={[0, 5, -5]} rotation={[0, 0, -0.1]}>
      <planeGeometry args={[8, 40]} />
      <meshBasicMaterial
        color="#4fc3f7"
        transparent
        opacity={0.08}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  )
}

export default function Ocean() {
  const { scene } = useThree()

  useMemo(() => {
    scene.background = new THREE.Color('#001428')
    scene.fog = new THREE.FogExp2('#001428', 0.015)
  }, [scene])

  return (
    <>
      <OceanFloor />
      <Bubbles count={40} />
      <LightRays />
      <mesh position={[8, 5, -3]} rotation={[0, 0, 0.15]}>
        <planeGeometry args={[5, 35]} />
        <meshBasicMaterial
          color="#4fc3f7"
          transparent
          opacity={0.05}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
    </>
  )
}
