import { useState } from 'react'
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
  const [activeSection, setActiveSection] = useState(null)

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
        camera={{ position: [-309, 300, -4643], fov: 60, near: 1, far: 50000 }}
        style={{ position: 'fixed', top: 0, left: 0 }}
      >
        <ReefScene onCoralClick={handleCoralClick} />
      </Canvas>

      <OverlayPanel activeSection={activeSection} onClose={handleClose}>
        {ContentComponent && <ContentComponent />}
      </OverlayPanel>
    </>
  )
}
