import { useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Html, Billboard } from '@react-three/drei'
import * as THREE from 'three'
import About from '../content/About'
import Projects from '../content/Projects'
import Resume from '../content/Resume'
import Certifications from '../content/Certifications'
import Contact from '../content/Contact'

const INTERACT_DISTANCE = 3.0
const AUTO_CLOSE_DISTANCE = 5.0

const CONTENT_MAP = {
  about: About,
  projects: Projects,
  certifications: Certifications,
  resume: Resume,
}

const RACK_SECTIONS = [
  {
    id: 'about',
    title: 'About / Contact',
    subtitle: 'Get to know me',
    position: [-1.85, 1.8, -1.563],
  },
  {
    id: 'projects',
    title: 'Projects',
    subtitle: 'What I\'ve built',
    position: [-1.85, 1.8, -0.55],
  },
  {
    id: 'certifications',
    title: 'Certifications',
    subtitle: 'Credentials & growth',
    position: [-1.85, 1.8, 0.48],
  },
  {
    id: 'resume',
    title: 'Resume',
    subtitle: 'Experience & skills',
    position: [-1.85, 1.8, 1.50],
  },
]

function RackLabel({ section, camera, expanded }) {
  const groupRef = useRef()
  const [showPrompt, setShowPrompt] = useState(false)

  useFrame(() => {
    if (!groupRef.current) return
    const pos = new THREE.Vector3(...section.position)
    const dist = camera.position.distanceTo(pos)
    setShowPrompt(dist < INTERACT_DISTANCE && !expanded)
  })

  const ContentComponent = CONTENT_MAP[section.id]

  return (
    <group ref={groupRef} position={section.position}>
      <Billboard follow={true} lockX={false} lockY={false} lockZ={false}>
        <Html
          center
          distanceFactor={3}
          style={{ pointerEvents: expanded ? 'auto' : 'none', userSelect: 'none' }}
        >
          {!expanded && (
            <div style={{
              background: 'rgba(0, 8, 20, 0.75)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(100, 116, 139, 0.3)',
              borderRadius: '8px',
              padding: '12px 20px',
              textAlign: 'center',
              minWidth: '140px',
              transition: 'all 0.3s ease',
            }}>
              <div style={{
                fontSize: '14px',
                fontWeight: 700,
                color: '#e2e8f0',
                fontFamily: 'Inter, system-ui, sans-serif',
              }}>{section.title}</div>
              <div style={{
                fontSize: '10px',
                color: '#94a3b8',
                marginTop: '2px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                fontFamily: 'Inter, system-ui, sans-serif',
              }}>{section.subtitle}</div>
              {showPrompt && (
                <div style={{
                  fontSize: '10px',
                  color: '#0d9488',
                  marginTop: '6px',
                  fontFamily: 'Inter, system-ui, sans-serif',
                }}>[E] Interact</div>
              )}
            </div>
          )}
          {expanded && (
            <div onClick={(e) => e.stopPropagation()} onMouseDown={(e) => e.stopPropagation()} style={{
              background: 'rgba(0, 8, 20, 0.92)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(13, 148, 136, 0.5)',
              borderRadius: '12px',
              width: '420px',
              maxHeight: '500px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              transition: 'all 0.3s ease',
            }}>
              <div style={{
                padding: '1rem 1.5rem',
                borderBottom: '1px solid rgba(100, 116, 139, 0.25)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexShrink: 0,
              }}>
                <div>
                  <div style={{
                    fontSize: '10px',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    color: '#64748b',
                    fontFamily: 'Inter, system-ui, sans-serif',
                  }}>{section.subtitle}</div>
                  <div style={{
                    fontSize: '18px',
                    fontWeight: 700,
                    color: '#e2e8f0',
                    fontFamily: 'Inter, system-ui, sans-serif',
                  }}>{section.title}</div>
                </div>
                <div style={{
                  fontSize: '10px',
                  color: '#64748b',
                  fontFamily: 'Inter, system-ui, sans-serif',
                }}>[E] Close</div>
              </div>
              <div className="overlay-content" style={{
                flex: 1,
                overflowY: 'auto',
                padding: '1.5rem',
                maxHeight: '400px',
              }}>
                {ContentComponent && <ContentComponent />}
                {section.id === 'about' && (
                  <>
                    <div className="section-divider" />
                    <Contact />
                  </>
                )}
              </div>
            </div>
          )}
        </Html>
      </Billboard>
    </group>
  )
}

export default function RackBillboards({ onSectionChange, expandedSection, visible = true }) {
  const { camera } = useThree()

  // Auto-close when walking away
  useFrame(() => {
    if (!expandedSection) return
    const section = RACK_SECTIONS.find(s => s.id === expandedSection)
    if (!section) return
    const pos = new THREE.Vector3(...section.position)
    const dist = camera.position.distanceTo(pos)
    if (dist > AUTO_CLOSE_DISTANCE) {
      onSectionChange(null)
    }
  })

  if (!visible) return null

  return (
    <>
      {RACK_SECTIONS.map((section) => (
        <RackLabel
          key={section.id}
          section={section}
          camera={camera}
          expanded={expandedSection === section.id}
        />
      ))}
    </>
  )
}

export { RACK_SECTIONS, INTERACT_DISTANCE }
