import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

const FISH_MODELS = {
  clownfish: '/models/fish-bundle/Clownfish.glb',
  blueTang: '/models/fish-bundle/Blue Tang.glb',
  yellowTang: '/models/fish-bundle/Yellow Tang.glb',
  butterflyFish: '/models/fish-bundle/Butterfly Fish.glb',
  parrotFish: '/models/fish-bundle/Parrot Fish.glb',
  royalGramma: '/models/fish-bundle/Royal Gramma.glb',
  moorishIdol: '/models/fish-bundle/Moorish Idol.glb',
  puffer: '/models/fish-bundle/Puffer.glb',
}

// Each fish: model, center position, swim radius, speed, scale, y-offset for bobbing
const FISH_PLACEMENTS = [
  // Nothing before z=-11 (keep boat area clear)
  // Fish swim at y=-5 (1 unit above reef floor), well spaced apart

  // Between About (z=-5) and Projects (z=-16)
  { model: 'clownfish', center: [5, -5, -11], radius: 1.5, speed: 0.6, scale: 5, phase: 0 },

  // Near Projects coral
  { model: 'blueTang', center: [-3, -5, -17], radius: 2.0, speed: 0.5, scale: 5, phase: 1 },

  // Between Projects (z=-16) and Resume (z=-28)
  { model: 'parrotFish', center: [5, -4.5, -22], radius: 2.0, speed: 0.35, scale: 6, phase: 0.5 },
  { model: 'yellowTang', center: [-4, -5, -26], radius: 1.5, speed: 0.65, scale: 5, phase: 5 },

  // Near Resume coral
  { model: 'moorishIdol', center: [4, -5, -30], radius: 1.5, speed: 0.55, scale: 5, phase: 2.5 },

  // Between Resume (z=-28) and Certs (z=-40)
  { model: 'butterflyFish', center: [-4, -5, -34], radius: 1.8, speed: 0.45, scale: 5, phase: 1.5 },
  { model: 'puffer', center: [6, -5.5, -38], radius: 1.2, speed: 0.3, scale: 6, phase: 3.5 },

  // Near Certs coral
  { model: 'royalGramma', center: [-3, -5, -42], radius: 1.5, speed: 0.6, scale: 5, phase: 4.5 },

  // Between Certs (z=-40) and Contact (z=-52)
  { model: 'yellowTang', center: [5, -5, -46], radius: 1.8, speed: 0.5, scale: 5, phase: 0.8 },
  { model: 'clownfish', center: [-4, -5, -50], radius: 1.3, speed: 0.7, scale: 5, phase: 2.8 },
]

function SwimmingFish({ modelPath, center, radius, speed, scale, phase }) {
  const groupRef = useRef()
  const { scene } = useGLTF(modelPath)

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.elapsedTime * speed + phase

    // Oval swimming path
    const x = center[0] + Math.sin(t) * radius
    const z = center[2] + Math.cos(t) * radius * 0.6
    const y = center[1] + Math.sin(t * 1.5) * 0.3

    groupRef.current.position.set(x, y, z)

    // Face direction of movement
    groupRef.current.rotation.y = Math.atan2(
      Math.cos(t) * radius,
      -Math.sin(t) * radius * 0.6
    )
  })

  return (
    <group ref={groupRef}>
      <primitive object={scene.clone()} scale={scale} />
    </group>
  )
}

export default function ReefFish() {
  return (
    <group>
      {FISH_PLACEMENTS.map((fish, i) => (
        <SwimmingFish
          key={i}
          modelPath={FISH_MODELS[fish.model]}
          center={fish.center}
          radius={fish.radius}
          speed={fish.speed}
          scale={fish.scale}
          phase={fish.phase}
        />
      ))}
    </group>
  )
}

// Preload fish models
Object.values(FISH_MODELS).forEach((path) => useGLTF.preload(path))
