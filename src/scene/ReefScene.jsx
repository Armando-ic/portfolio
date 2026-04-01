import { useState, useCallback } from 'react'
import { EffectComposer, Bloom, N8AO, Vignette, ToneMapping } from '@react-three/postprocessing'
import Diorama from './Diorama'
import FPSControls from './FPSControls'
import RackBillboards from './RackBillboard'

export default function ReefScene({ onLockChange, onMovingChange, controlsEnabled, expandedSection, onSectionChange, hasEntered }) {
  const [forestScene, setForestScene] = useState(null)

  const handleSceneReady = useCallback((scene) => {
    setForestScene(scene)
  }, [])

  return (
    <>
      {/* Cool overhead fluorescent light — bright server room */}
      <ambientLight intensity={0.7} color="#c0d8f0" />
      <directionalLight position={[0, 8, -5]} intensity={0.8} color="#d4e5f7" />
      <directionalLight position={[0, 8, 5]} intensity={0.6} color="#d4e5f7" />

      {/* Red accent lights — lower half of racks */}
      <pointLight position={[-2.2, 1.2, -1.5]} intensity={0.6} color="#ff3333" distance={4} decay={2} />
      <pointLight position={[-2.2, 1.2, 0.5]} intensity={0.6} color="#ff3333" distance={4} decay={2} />

      {/* Blue accent lights — lower half of racks */}
      <pointLight position={[-2.2, 0.6, -0.5]} intensity={0.5} color="#3366ff" distance={4} decay={2} />
      <pointLight position={[-2.2, 0.6, 1.5]} intensity={0.5} color="#3366ff" distance={4} decay={2} />

      {/* Yellow accent lights — top of racks */}
      <pointLight position={[-2.2, 2.6, -1.0]} intensity={0.5} color="#ffaa22" distance={4} decay={2} />
      <pointLight position={[-2.2, 2.6, 1.0]} intensity={0.5} color="#ffaa22" distance={4} decay={2} />

      {/* White fill lights from ceiling — pushed high above ceiling panels */}
      <directionalLight position={[0, 6, -4]} intensity={0.25} color="#e8f0ff" />
      <directionalLight position={[0, 6, 4]} intensity={0.25} color="#e8f0ff" />

      <Diorama onSceneReady={handleSceneReady} />
      <FPSControls
        forestScene={forestScene}
        onLockChange={onLockChange}
        onMovingChange={onMovingChange}
        onInteract={onSectionChange}
        expandedSection={expandedSection}
        enabled={controlsEnabled}
      />
      <RackBillboards expandedSection={expandedSection} onSectionChange={onSectionChange} visible={hasEntered} />

      {/* Post-processing */}
      <EffectComposer>
        <Bloom
          intensity={0.2}
          luminanceThreshold={0.95}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
        <N8AO
          aoRadius={0.5}
          intensity={1.5}
          distanceFalloff={0.5}
        />
        <Vignette eskil={false} offset={0.2} darkness={0.5} />
        <ToneMapping />
      </EffectComposer>
    </>
  )
}
