import { useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import ReefScene from './scene/ReefScene'
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
  const [scrollHintVisible, setScrollHintVisible] = useState(true)
  const [activeSection, setActiveSection] = useState(null)

  const handleCoralClick = (sectionId) => {
    setActiveSection(sectionId)
  }

  const handleClose = () => {
    setActiveSection(null)
  }

  useEffect(() => {
    if (!activeSection) {
      document.body.style.overflow = 'auto'
      document.body.style.height = '800vh'
      document.documentElement.style.overflow = 'auto'
    }

    const hideHint = () => {
      if (window.scrollY > 50) {
        setScrollHintVisible(false)
        window.removeEventListener('scroll', hideHint)
      }
    }
    window.addEventListener('scroll', hideHint)

    return () => {
      window.removeEventListener('scroll', hideHint)
    }
  }, [activeSection])

  const ContentComponent = activeSection ? CONTENT_MAP[activeSection] : null

  return (
    <>
      <Canvas
        camera={{ position: [0, 4, 14], fov: 60, near: 0.1, far: 200 }}
        style={{ position: 'fixed', top: 0, left: 0 }}
      >
        <ReefScene onCoralClick={handleCoralClick} />
      </Canvas>

      {scrollHintVisible && !activeSection && (
        <div className="scroll-hint">
          <div>Scroll to Dive</div>
          <div className="scroll-hint-chevron">&#8744;</div>
        </div>
      )}

      <OverlayPanel activeSection={activeSection} onClose={handleClose}>
        {ContentComponent && <ContentComponent />}
      </OverlayPanel>

      <div className="scroll-track" style={{ height: '800vh' }} />
    </>
  )
}
