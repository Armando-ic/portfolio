import { useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import Lighting from './scene/Lighting'
import Ocean from './scene/Ocean'
import Boat from './scene/Boat'
import Corals from './scene/Corals'
import CameraPath from './scene/CameraPath'

export default function App() {
  const handleCoralClick = (sectionId) => {
    console.log('Coral clicked:', sectionId)
  }

  useEffect(() => {
    document.body.style.overflow = 'auto'
    document.body.style.height = '600vh'
    document.documentElement.style.overflow = 'auto'
    return () => {
      document.body.style.overflow = ''
      document.body.style.height = ''
      document.documentElement.style.overflow = ''
    }
  }, [])

  return (
    <>
      <Canvas
        camera={{ position: [0, 2, 8], fov: 60, near: 0.1, far: 200 }}
        style={{ position: 'fixed', top: 0, left: 0 }}
      >
        <Lighting />
        <Ocean />
        <Boat />
        <Corals onCoralClick={handleCoralClick} />
        <CameraPath />
      </Canvas>
      <div className="scroll-track" style={{ height: '600vh' }} />
    </>
  )
}
