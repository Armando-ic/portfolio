import { useRef, useEffect } from 'react'
import { useGLTF, useAnimations, Environment } from '@react-three/drei'

export default function Diorama({ onSceneReady }) {
  const groupRef = useRef()
  const { scene, animations } = useGLTF('/models/server_room.glb')
  const { actions } = useAnimations(animations, groupRef)

  useEffect(() => {
    Object.values(actions).forEach((action) => {
      action.reset().play()
    })
  }, [actions])

  useEffect(() => {
    if (scene && onSceneReady) {
      onSceneReady(scene)
    }
  }, [scene, onSceneReady])

  return (
    <group ref={groupRef}>
      <primitive object={scene} scale={1} />
      <Environment preset="apartment" environmentIntensity={0.4} />
    </group>
  )
}

useGLTF.preload('/models/server_room.glb')
