import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, Environment } from '@react-three/drei'

export default function Boat() {
  const groupRef = useRef()
  const { scene } = useGLTF('/models/fish-bundle/Boat.glb')

  useFrame(({ clock }) => {
    if (groupRef.current) {
      // Gentle bobbing motion on water surface
      groupRef.current.position.y = Math.sin(clock.elapsedTime * 0.8) * 0.15
      groupRef.current.rotation.z = Math.sin(clock.elapsedTime * 0.5) * 0.03
      groupRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.3) * 0.02
    }
  })

  return (
    <>
      {/* Environment lighting so the model is visible */}
      <Environment preset="sunset" environmentIntensity={0.6} />

      <group ref={groupRef} position={[0, 0, 0]}>
        {/* Warm light from above — sunlight on the boat */}
        <directionalLight position={[2, 5, 3]} intensity={2} color="#ffeedd" />
        <pointLight position={[0, 2, 0]} intensity={1.5} color="#ffffff" distance={15} />

        {/* Real boat model */}
        <primitive object={scene} scale={1.5} rotation={[0, Math.PI / 2, 0]} />

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
    </>
  )
}

// Preload the model
useGLTF.preload('/models/fish-bundle/Boat.glb')
