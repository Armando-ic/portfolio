import { useEffect, useCallback } from 'react'

const SECTION_TITLES = {
  about: { subtitle: 'Get to know me', title: 'About Me' },
  projects: { subtitle: 'What I\'ve built', title: 'Projects' },
  resume: { subtitle: 'Experience & skills', title: 'Resume' },
  certifications: { subtitle: 'Credentials & growth', title: 'Certifications' },
  contact: { subtitle: 'Let\'s connect', title: 'Contact' },
}

export default function OverlayPanel({ activeSection, onClose, children }) {
  const isOpen = activeSection !== null

  const handleEscape = useCallback((e) => {
    if (e.key === 'Escape') onClose()
  }, [onClose])

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)

      // Block ALL window-level scroll so GSAP ScrollTrigger doesn't move the camera.
      // The overlay-content div scrolls via its own overflow-y: auto (CSS),
      // which is internal scrolling and doesn't affect window.scrollY.
      const blockWindowScroll = (e) => {
        e.preventDefault()
      }
      window.addEventListener('wheel', blockWindowScroll, { passive: false })
      window.addEventListener('touchmove', blockWindowScroll, { passive: false })
      document.body.style.overflow = 'hidden'

      return () => {
        document.removeEventListener('keydown', handleEscape)
        window.removeEventListener('wheel', blockWindowScroll)
        window.removeEventListener('touchmove', blockWindowScroll)
        document.body.style.overflow = 'auto'
      }
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, handleEscape])

  const sectionInfo = activeSection ? SECTION_TITLES[activeSection] : null

  return (
    <>
      <div
        className={`overlay-backdrop ${isOpen ? 'open' : ''}`}
        onClick={onClose}
      />
      <div className={`overlay-panel ${isOpen ? 'open' : ''}`}>
        {sectionInfo && (
          <>
            <div className="overlay-header">
              <div>
                <div className="overlay-subtitle">{sectionInfo.subtitle}</div>
                <div className="overlay-title">{sectionInfo.title}</div>
              </div>
              <button className="overlay-close" onClick={onClose} aria-label="Close panel">
                &times;
              </button>
            </div>
            <div className="overlay-content">
              {children}
            </div>
          </>
        )}
      </div>
    </>
  )
}
