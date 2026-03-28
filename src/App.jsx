import { Canvas } from '@react-three/fiber'
import Lighting from './scene/Lighting'

export default function App() {
  return (
    <>
      <Canvas
        camera={{ position: [0, 2, 5], fov: 60 }}
        style={{ position: 'fixed', top: 0, left: 0 }}
      >
        <Lighting />
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color="#ff6b9d" />
        </mesh>
      </Canvas>
    </>
  )
}
