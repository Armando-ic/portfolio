import { Canvas } from '@react-three/fiber'
import Lighting from './scene/Lighting'
import Ocean from './scene/Ocean'

export default function App() {
  return (
    <>
      <Canvas
        camera={{ position: [0, 2, 5], fov: 60 }}
        style={{ position: 'fixed', top: 0, left: 0 }}
      >
        <Lighting />
        <Ocean />
      </Canvas>
    </>
  )
}
