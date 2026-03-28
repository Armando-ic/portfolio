import { useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import ReefScene from './scene/ReefScene'

export default function App() {
  const [scrollHintVisible, setScrollHintVisible] = useState(true)

  const handleCoralClick = (sectionId) => {
    console.log('Coral clicked:', sectionId)
  }

  useEffect(() => {
    document.body.style.overflow = 'auto'
    document.body.style.height = '800vh'
    document.documentElement.style.overflow = 'auto'

    const hideHint = () => {
      if (window.scrollY > 50) {
        setScrollHintVisible(false)
        window.removeEventListener('scroll', hideHint)
      }
    }
    window.addEventListener('scroll', hideHint)

    return () => {
      document.body.style.overflow = ''
      document.body.style.height = ''
      document.documentElement.style.overflow = ''
      window.removeEventListener('scroll', hideHint)
    }
  }, [])

  return (
    <>
      <Canvas
        camera={{ position: [0, 3, 10], fov: 60, near: 0.1, far: 200 }}
        style={{ position: 'fixed', top: 0, left: 0 }}
      >
        <ReefScene onCoralClick={handleCoralClick} />
      </Canvas>

      {scrollHintVisible && (
        <div className="scroll-hint">
          <div>Scroll to Dive</div>
          <div className="scroll-hint-chevron">&#8744;</div>
        </div>
      )}

      <div className="scroll-track" style={{ height: '800vh' }} />
    </>
  )
}
