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

  // Fix reflections — reduce environment map on floor and glass
  useEffect(() => {
    if (!scene) return
    scene.traverse((child) => {
      if (!child.isMesh || !child.material) return
      const name = (child.name || '').toLowerCase()
      const matName = (child.material.name || '').toLowerCase()
      // Floor tiles — matte concrete
      if (name.includes('floor') || matName.includes('floor') || matName.includes('tile')) {
        child.material.roughness = 0.95
        child.material.metalness = 0.0
        child.material.envMapIntensity = 0.05
      }
      // Server glass doors — reduce reflection
      if (matName.includes('glass') || matName.includes('serverglass')) {
        child.material.roughness = 0.7
        child.material.metalness = 0.0
        child.material.envMapIntensity = 0.1
      }
      // Walls — no reflection
      if (matName.includes('wall') || matName.includes('interior')) {
        child.material.envMapIntensity = 0.05
      }
    })
  }, [scene])

  useEffect(() => {
    if (scene && onSceneReady) {
      onSceneReady(scene)
    }
  }, [scene, onSceneReady])

  return (
    <group ref={groupRef}>
      <primitive object={scene} scale={1} />
{/* Environment map removed — was causing apartment reflections on glass/walls */}
    </group>
  )
}

useGLTF.preload('/models/server_room.glb')
