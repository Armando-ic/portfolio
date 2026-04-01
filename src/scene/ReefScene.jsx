import { useState, useCallback } from 'react'
import Diorama from './Diorama'
import FPSControls from './FPSControls'

export default function ReefScene({ onLockChange, onMovingChange, controlsEnabled }) {
  const [forestScene, setForestScene] = useState(null)

  const handleSceneReady = useCallback((scene) => {
    setForestScene(scene)
  }, [])

  return (
    <>
      <ambientLight intensity={0.6} color="#87ceeb" />
      <directionalLight position={[5, 10, 5]} intensity={0.8} />
      <Diorama onSceneReady={handleSceneReady} />
      <FPSControls forestScene={forestScene} onLockChange={onLockChange} onMovingChange={onMovingChange} enabled={controlsEnabled} />
    </>
  )
}
