import { useState, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'

const CORAL_SECTIONS = [
  {
    id: 'about',
    label: 'About Me',
    tagline: 'My journey into tech',
    position: [3, -5, -2],
    color: '#ff6b9d',
    scale: 1.2,
  },
  {
    id: 'projects',
    label: 'Projects',
    tagline: 'What I\'ve built',
    position: [-3, -12, -4],
    color: '#a55eea',
    scale: 1.4,
  },
  {
    id: 'resume',
    label: 'Resume',
    tagline: 'Experience & skills',
    position: [4, -20, -3],
    color: '#26de81',
    scale: 1.3,
  },
  {
    id: 'certifications',
    label: 'Certifications',
    tagline: 'Credentials & growth',
    position: [-2, -28, -5],
    color: '#48dbfb',
    scale: 1.1,
  },
  {
    id: 'contact',
    label: 'Contact',
    tagline: 'Get in touch',
    position: [1, -35, -2],
    color: '#ff9f43',
    scale: 1.0,
  },
]

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
      {/* Main coral body */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.6, section.scale * 2, 8]} />
        <meshStandardMaterial
          color={section.color}
          emissive={section.color}
          emissiveIntensity={hovered ? 0.4 : 0.1}
          roughness={0.6}
        />
      </mesh>
      {/* Coral branch 1 */}
      <mesh position={[0.5, 0.3, 0.2]} rotation={[0, 0, 0.4]}>
        <cylinderGeometry args={[0.1, 0.25, section.scale * 1.2, 6]} />
        <meshStandardMaterial
          color={section.color}
          emissive={section.color}
          emissiveIntensity={hovered ? 0.4 : 0.1}
          roughness={0.6}
        />
      </mesh>
      {/* Coral branch 2 */}
      <mesh position={[-0.4, 0.2, -0.3]} rotation={[0, 0, -0.3]}>
        <cylinderGeometry args={[0.15, 0.3, section.scale * 1.0, 6]} />
        <meshStandardMaterial
          color={section.color}
          emissive={section.color}
          emissiveIntensity={hovered ? 0.4 : 0.1}
          roughness={0.6}
        />
      </mesh>
      {/* Coral top sphere */}
      <mesh position={[0, section.scale, 0]}>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial
          color={section.color}
          emissive={section.color}
          emissiveIntensity={hovered ? 0.5 : 0.15}
          roughness={0.5}
        />
      </mesh>

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
