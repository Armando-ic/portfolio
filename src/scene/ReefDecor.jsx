import { useGLTF } from '@react-three/drei'

const MODELS = {
  seaweed: '/models/coral-musical/Seaweed.glb',
  seaweed3: '/models/coral-musical/Seaweed 3.glb',
  kelp: '/models/coral-musical/kelp.glb',
  anemone: '/models/coral-musical/Anemone.glb',
  orangeCoral: '/models/coral-musical/Orange Coral.glb',
  coral: '/models/coral-musical/coral.glb',
  starfish: '/models/underwater/Starfish.glb',
  clam: '/models/underwater/Clam.glb',
  seaUrchin: '/models/underwater/Sea Urchin.glb',
  seashell: '/models/underwater/Seashell.glb',
  rock: '/models/pirate-kit/Rock.glb',
  rocks: '/models/pirate-kit/Rocks.glb',
  seahorse: '/models/coral-musical/Seahorse.glb',
  treasureChest: '/models/underwater/Treasure chest.glb',
  anchor: '/models/underwater/Anchor.glb',
  nautilus: '/models/underwater/Nautilus shell.glb',
  sandDollar: '/models/underwater/Sand dollar.glb',
}

// Section corals for reference:
// About [2,-6,-5], Projects [6,-6,-16], Resume [-2,-6,-28], Certs [4,-6,-40], Contact [-2,-6,-52]

const DECOR_ITEMS = [
  // Section corals: About [2,-6,-5], Projects [6,-6,-16], Resume [-2,-6,-28],
  //                 Certs [4,-6,-40], Contact [-2,-6,-52]
  // RULES: nothing before z=-10 (boat area), min 3 units apart, offset from camera path

  // ── Between About (z=-5) and Projects (z=-16) ──
  { model: 'seaweed', position: [-3, -7, -10], scale: 0.8, rotation: [0, 0.5, 0] },
  { model: 'rock', position: [7, -7, -13], scale: 0.4, rotation: [0, 0.8, 0] },

  // ── Between Projects (z=-16) and Resume (z=-28) ──
  { model: 'anemone', position: [-4, -7, -19], scale: 0.6, rotation: [0, 1.0, 0] },
  { model: 'kelp', position: [8, -7, -22], scale: 1.0, rotation: [0, 0.7, 0] },
  { model: 'orangeCoral', position: [-5, -7, -25], scale: 0.6, rotation: [0, 2.0, 0] },
  { model: 'seahorse', position: [7, -5.5, -20], scale: 0.5, rotation: [0, -0.5, 0] },

  // ── Between Resume (z=-28) and Certifications (z=-40) ──
  { model: 'coral', position: [6, -7, -31], scale: 0.7, rotation: [0, 1.8, 0] },
  { model: 'seaweed3', position: [-5, -7, -34], scale: 0.8, rotation: [0, 0.4, 0] },
  { model: 'clam', position: [7, -6.95, -37], scale: 0.3, rotation: [0, 0.9, 0] },

  // ── Between Certifications (z=-40) and Contact (z=-52) ──
  { model: 'orangeCoral', position: [-5, -7, -44], scale: 0.7, rotation: [0, 0.6, 0] },
  { model: 'seaweed', position: [6, -7, -47], scale: 0.8, rotation: [0, 2.8, 0] },
  { model: 'starfish', position: [-4, -6.9, -50], scale: 0.3, rotation: [0, 1.5, 0] },

  // ── Edge scatter — far sides of the reef ──
  { model: 'kelp', position: [-7, -7, -15], scale: 1.2, rotation: [0, 1.9, 0] },
  { model: 'rocks', position: [9, -7, -30], scale: 0.3, rotation: [0, 0.1, 0] },
  { model: 'rock', position: [-6, -7, -38], scale: 0.5, rotation: [0, 3.0, 0] },
  { model: 'seaweed3', position: [9, -7, -42], scale: 0.9, rotation: [0, 2.4, 0] },

  // ── Special extras — hidden treasures ──
  { model: 'treasureChest', position: [8, -6.9, -26], scale: 0.4, rotation: [0, 0.6, 0] },
  { model: 'anchor', position: [-6, -6.9, -16], scale: 0.4, rotation: [0, 1.2, 0.1] },
  { model: 'nautilus', position: [8, -6.9, -48], scale: 0.3, rotation: [0, 2.0, 0] },
  { model: 'sandDollar', position: [-6, -6.95, -22], scale: 0.3, rotation: [0, 0.7, 0] },
]

function DecorItem({ modelPath, position, scale, rotation }) {
  const { scene } = useGLTF(modelPath)
  return (
    <primitive
      object={scene.clone()}
      position={position}
      scale={scale}
      rotation={rotation}
    />
  )
}

export default function ReefDecor() {
  return (
    <group>
      {DECOR_ITEMS.map((item, i) => (
        <DecorItem
          key={i}
          modelPath={MODELS[item.model]}
          position={item.position}
          scale={item.scale}
          rotation={item.rotation}
        />
      ))}
    </group>
  )
}

// Preload all unique models
Object.values(MODELS).forEach((path) => useGLTF.preload(path))
