import { Canvas } from '@react-three/fiber'
import Lighting from './scene/Lighting'
import Ocean from './scene/Ocean'
import Boat from './scene/Boat'
import Corals from './scene/Corals'

export default function App() {
  const handleCoralClick = (sectionId) => {
    console.log('Coral clicked:', sectionId)
  }

  return (
    <>
      <Canvas
        camera={{ position: [0, 2, 5], fov: 60 }}
        style={{ position: 'fixed', top: 0, left: 0 }}
      >
        <Lighting />
        <Ocean />
        <Boat />
        <Corals onCoralClick={handleCoralClick} />
      </Canvas>
    </>
  )
}
