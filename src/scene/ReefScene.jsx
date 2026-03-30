import { useState, useCallback } from 'react'
import { OrbitControls } from '@react-three/drei'
import Diorama from './Diorama'

export default function ReefScene({ onCoralClick }) {
  const [forestScene, setForestScene] = useState(null)

  const handleSceneReady = useCallback((scene) => {
    setForestScene(scene)
  }, [])

  return (
    <>
      <ambientLight intensity={0.6} color="#87ceeb" />
      <directionalLight position={[5, 10, 5]} intensity={0.8} />
      <Diorama onSceneReady={handleSceneReady} />
      <OrbitControls />
    </>
  )
}
