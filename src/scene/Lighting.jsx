import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function Lighting() {
  const spotRef = useRef()

  useFrame(({ clock }) => {
    if (spotRef.current) {
      spotRef.current.position.x = Math.sin(clock.elapsedTime * 0.3) * 2
    }
  })

  return (
    <>
      <ambientLight intensity={0.3} color="#4a90d9" />
      <directionalLight
        position={[5, 30, 5]}
        intensity={0.8}
        color="#87ceeb"
        castShadow={false}
      />
      <spotLight
        ref={spotRef}
        position={[0, 25, 0]}
        angle={0.6}
        penumbra={1}
        intensity={0.4}
        color="#4fc3f7"
      />
      <pointLight
        position={[0, -20, 0]}
        intensity={0.1}
        color="#0d9488"
      />
    </>
  )
}
