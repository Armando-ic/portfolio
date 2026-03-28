import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function Boat() {
  const groupRef = useRef()

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(clock.elapsedTime * 0.8) * 0.15
      groupRef.current.rotation.z = Math.sin(clock.elapsedTime * 0.5) * 0.03
      groupRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.3) * 0.02
    }
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Hull */}
      <mesh position={[0, -0.3, 0]}>
        <boxGeometry args={[3, 0.6, 1.2]} />
        <meshStandardMaterial color="#8B4513" roughness={0.8} />
      </mesh>
      {/* Cabin */}
      <mesh position={[0.3, 0.2, 0]}>
        <boxGeometry args={[1.2, 0.6, 0.8]} />
        <meshStandardMaterial color="#A0522D" roughness={0.7} />
      </mesh>
      {/* Mast */}
      <mesh position={[-0.3, 1.2, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 2, 8]} />
        <meshStandardMaterial color="#654321" />
      </mesh>
      {/* Sail */}
      <mesh position={[-0.3, 1.0, 0.02]}>
        <planeGeometry args={[0.8, 1.2]} />
        <meshStandardMaterial color="#f5f5dc" side={2} />
      </mesh>
      {/* Water surface plane (visible from below) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial
          color="#006994"
          transparent
          opacity={0.3}
          side={2}
        />
      </mesh>
    </group>
  )
}
