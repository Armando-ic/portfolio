import { useState, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html, useGLTF } from '@react-three/drei'

const CORAL_SECTIONS = [
  {
    id: 'about',
    label: 'About Me',
    tagline: 'My journey into tech',
    position: [2, -6, -5],
    color: '#ff6b9d',
    scale: 1.2,
    model: '/models/coral-reef-kit/Coral Reef Set.glb',
    modelScale: 2,
  },
  {
    id: 'projects',
    label: 'Projects',
    tagline: 'What I\'ve built',
    position: [6, -6, -16],
    color: '#a55eea',
    scale: 1.4,
    model: '/models/coral-reef-kit/Coral Reef Set2.glb',
    modelScale: 2,
  },
  {
    id: 'resume',
    label: 'Resume',
    tagline: 'Experience & skills',
    position: [-2, -6, -28],
    color: '#26de81',
    scale: 1.3,
    model: '/models/coral-reef-kit/Coral Reef Set3.glb',
    modelScale: 2,
  },
  {
    id: 'certifications',
    label: 'Certifications',
    tagline: 'Credentials & growth',
    position: [4, -6, -40],
    color: '#48dbfb',
    scale: 1.1,
    model: '/models/coral-reef-kit/Coral Reef Set4.glb',
    modelScale: 2,
  },
  {
    id: 'contact',
    label: 'Contact',
    tagline: 'Get in touch',
    position: [-2, -6, -52],
    color: '#ff9f43',
    scale: 1.0,
    model: '/models/coral-reef-kit/Coral Reef Set5.glb',
    modelScale: 2,
  },
]

function PlaceholderCoral({ section, hovered }) {
  return (
    <>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.6, section.scale * 2, 8]} />
        <meshStandardMaterial
          color={section.color}
          emissive={section.color}
          emissiveIntensity={hovered ? 0.4 : 0.1}
          roughness={0.6}
        />
      </mesh>
      <mesh position={[0.5, 0.3, 0.2]} rotation={[0, 0, 0.4]}>
        <cylinderGeometry args={[0.1, 0.25, section.scale * 1.2, 6]} />
        <meshStandardMaterial
          color={section.color}
          emissive={section.color}
          emissiveIntensity={hovered ? 0.4 : 0.1}
          roughness={0.6}
        />
      </mesh>
      <mesh position={[-0.4, 0.2, -0.3]} rotation={[0, 0, -0.3]}>
        <cylinderGeometry args={[0.15, 0.3, section.scale * 1.0, 6]} />
        <meshStandardMaterial
          color={section.color}
          emissive={section.color}
          emissiveIntensity={hovered ? 0.4 : 0.1}
          roughness={0.6}
        />
      </mesh>
      <mesh position={[0, section.scale, 0]}>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial
          color={section.color}
          emissive={section.color}
          emissiveIntensity={hovered ? 0.5 : 0.15}
          roughness={0.5}
        />
      </mesh>
    </>
  )
}

function RealCoral({ model, modelScale }) {
  const { scene } = useGLTF(model)
  return <primitive object={scene.clone()} scale={modelScale} />
}

function CoralFormation({ section, onClick }) {
  const [hovered, setHovered] = useState(false)
  const groupRef = useRef()

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(clock.elapsedTime * 0.5 + section.position[0]) * 0.03
    }
  })

  return (
    <group
      ref={groupRef}
      position={section.position}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer' }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = 'default' }}
      onClick={(e) => { e.stopPropagation(); onClick(section.id) }}
    >
      {section.model ? (
        <RealCoral model={section.model} modelScale={section.modelScale} />
      ) : (
        <PlaceholderCoral section={section} hovered={hovered} />
      )}

      {/* Hover label */}
      {hovered && (
        <Html
          position={[0, section.scale + 1.2, 0]}
          center
          style={{
            background: 'rgba(10, 10, 30, 0.85)',
            backdropFilter: 'blur(8px)',
            padding: '8px 16px',
            borderRadius: '8px',
            border: '1px solid rgba(13, 148, 136, 0.4)',
            color: '#e2e8f0',
            fontSize: '14px',
            fontFamily: 'Inter, system-ui, sans-serif',
            textAlign: 'center',
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          <div style={{ fontWeight: 700 }}>{section.label}</div>
          <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>{section.tagline}</div>
        </Html>
      )}
    </group>
  )
}

export default function Corals({ onCoralClick }) {
  return (
    <group>
      {CORAL_SECTIONS.map((section) => (
        <CoralFormation
          key={section.id}
          section={section}
          onClick={onCoralClick}
        />
      ))}
    </group>
  )
}

// Preload models
useGLTF.preload('/models/coral-reef-kit/Coral Reef Set.glb')
useGLTF.preload('/models/coral-reef-kit/Coral Reef Set2.glb')
useGLTF.preload('/models/coral-reef-kit/Coral Reef Set3.glb')
useGLTF.preload('/models/coral-reef-kit/Coral Reef Set4.glb')
useGLTF.preload('/models/coral-reef-kit/Coral Reef Set5.glb')
