import { useState, useCallback, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import ReefScene from './scene/ReefScene'
import LandingScreen from './ui/LandingScreen'
import ControlsHUD from './ui/ControlsHUD'
import AudioManager from './scene/AudioManager'
import FlatPortfolio from './ui/FlatPortfolio'
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
  const [view, setView] = useState('landing') // 'landing' | '3d' | 'flat'
  const [isLocked, setIsLocked] = useState(false)
  const [hasEntered, setHasEntered] = useState(false)
  const [isMoving, setIsMoving] = useState(false)
  const [masterVolume, setMasterVolume] = useState(0.5)
  const [activeSection, setActiveSection] = useState(null)
  const [expandedSection, setExpandedSection] = useState(null)

  const handleSectionChange = useCallback((sectionId) => {
    setExpandedSection(sectionId)
  }, [])

  const blockNextLock = useRef(false)

  const handleLockChange = useCallback((locked) => {
    if (locked && blockNextLock.current) {
      // Block this lock — user clicked Main Menu, don't re-enter
      blockNextLock.current = false
      document.exitPointerLock()
      return
    }
    setIsLocked(locked)
    if (locked) setHasEntered(true)
    if (!locked) setIsMoving(false)
  }, [])

  const handleMovingChange = useCallback((moving) => {
    setIsMoving(moving)
  }, [])

  const handleEnter = useCallback(() => {
    setView('3d')
    setHasEntered(true)
    const canvas = document.querySelector('canvas')
    if (canvas) {
      canvas.style.pointerEvents = 'auto'
      canvas.click()
    }
  }, [])

  const handleViewPortfolio = useCallback(() => {
    setView('flat')
  }, [])

  const handleBackFrom3D = useCallback(() => {
    setView('landing')
  }, [])

  const handleResume = useCallback(() => {
    const canvas = document.querySelector('canvas')
    if (canvas) {
      canvas.style.pointerEvents = 'auto'
      canvas.click()
    }
  }, [])

  const handleExit = useCallback(() => {
    blockNextLock.current = true
    setHasEntered(false)
    setIsLocked(false)
    setView('landing')
  }, [])

  const handleClose = () => {
    setActiveSection(null)
  }

  const ContentComponent = activeSection ? CONTENT_MAP[activeSection] : null

  if (view === 'flat') {
    return <FlatPortfolio onBack={() => setView('landing')} />
  }

  return (
    <>
      <Canvas
        camera={{ position: [0.067, 1.687, -9.083], fov: 60, near: 0.01, far: 1000 }}
        style={{
          position: 'fixed', top: 0, left: 0,
          pointerEvents: isLocked ? 'auto' : 'none',
        }}
      >
        <ReefScene onLockChange={handleLockChange} onMovingChange={handleMovingChange} controlsEnabled={true} expandedSection={expandedSection} onSectionChange={handleSectionChange} hasEntered={hasEntered} />
      </Canvas>

      {view === 'landing' && !hasEntered && <LandingScreen onEnter={handleEnter} onViewPortfolio={handleViewPortfolio} />}

      <ControlsHUD isLocked={isLocked} hasEntered={hasEntered} masterVolume={masterVolume} onVolumeChange={setMasterVolume} onResume={handleResume} onExit={handleExit} />
      <AudioManager isLocked={isLocked} isMoving={isMoving} masterVolume={masterVolume} expandedSection={expandedSection} />

      <OverlayPanel activeSection={activeSection} onClose={handleClose}>
        {ContentComponent && <ContentComponent />}
      </OverlayPanel>
    </>
  )
}
