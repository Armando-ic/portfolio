import { Canvas } from '@react-three/fiber'

export default function App() {
  return (
    <>
      <Canvas
        camera={{ position: [0, 2, 5], fov: 60 }}
        style={{ position: 'fixed', top: 0, left: 0 }}
      >
        <ambientLight intensity={0.5} />
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#0d9488" />
        </mesh>
      </Canvas>
    </>
  )
}
