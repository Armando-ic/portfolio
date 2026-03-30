import { useRef, useEffect } from 'react'
import { useGLTF, useAnimations, Environment } from '@react-three/drei'

export default function Diorama({ onSceneReady }) {
  const groupRef = useRef()
  const { scene, animations } = useGLTF('/models/mystical_forest_cartoon.glb')
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
      <Environment preset="forest" environmentIntensity={0.6} />
    </group>
  )
}

useGLTF.preload('/models/mystical_forest_cartoon.glb')
