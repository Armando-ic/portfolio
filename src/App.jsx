import { useState, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import ReefScene from './scene/ReefScene'
import LandingScreen from './ui/LandingScreen'
import ControlsHUD from './ui/ControlsHUD'
import OverlayPanel from './ui/OverlayPanel'
import About from './content/About'
import Projects from './content/Projects'
import Resume from './content/Resume'
import Certifications from './content/Certifications'
import Contact from './content/Contact'

const CONTENT_MAP = {
  about: About,
  projects: Projects,
  resume: Resume,
  certifications: Certifications,
  contact: Contact,
}

export default function App() {
  const [isLocked, setIsLocked] = useState(false)
  const [activeSection, setActiveSection] = useState(null)

  const handleLockChange = useCallback((locked) => {
    setIsLocked(locked)
  }, [])

  const handleEnter = useCallback(() => {
    // PointerLockControls.lock() must be called from a user gesture.
    // Clicking the canvas triggers pointer lock via the controls' built-in
    // click-to-lock behavior. We dispatch a click on the canvas element.
    const canvas = document.querySelector('canvas')
    if (canvas) canvas.click()
  }, [])

  const handleCoralClick = (sectionId) => {
    setActiveSection(sectionId)
  }

  const handleClose = () => {
    setActiveSection(null)
  }

  const ContentComponent = activeSection ? CONTENT_MAP[activeSection] : null

  return (
    <>
      <Canvas
        camera={{ position: [3064, 375, -4366], fov: 60, near: 1, far: 50000 }}
        style={{ position: 'fixed', top: 0, left: 0 }}
      >
        <ReefScene onLockChange={handleLockChange} />
      </Canvas>

      {!isLocked && <LandingScreen onEnter={handleEnter} />}

      <ControlsHUD isLocked={isLocked} />

      {isLocked && (
        <div id="debug-pos" style={{
          position: 'fixed', top: '1rem', left: '1rem', zIndex: 150,
          color: '#0f0', fontFamily: 'monospace', fontSize: '14px',
          background: 'rgba(0,0,0,0.6)', padding: '4px 8px', borderRadius: '4px',
          pointerEvents: 'none'
        }} />
      )}

      <OverlayPanel activeSection={activeSection} onClose={handleClose}>
        {ContentComponent && <ContentComponent />}
      </OverlayPanel>
    </>
  )
}
