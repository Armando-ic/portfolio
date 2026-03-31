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

  // Adjust floating objects in the scene
  useEffect(() => {
    if (!scene) return

    // Temple floats ~80 units above ground — lower so steps touch ground
    const temple = scene.getObjectByName('Temple')
    if (temple) temple.position.y -= 70

    // rockset1 (large rock formation) floats ~380 units — lower to ground
    const rockset = scene.getObjectByName('rockset1')
    if (rockset) rockset.position.y -= 350

    // pillar structure — slight float
    const pillar = scene.getObjectByName('pillar')
    if (pillar) pillar.position.y -= 10
  }, [scene])

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
