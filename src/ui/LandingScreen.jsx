import { useState, useEffect } from 'react'

export default function LandingScreen({ onEnter, onViewPortfolio, isMobile = false }) {
  const [isPortrait, setIsPortrait] = useState(false)

  useEffect(() => {
    if (!isMobile) return

    const check = () => {
      setIsPortrait(window.innerHeight > window.innerWidth)
    }
    check()

    window.addEventListener('resize', check)
    if (screen.orientation) {
      screen.orientation.addEventListener('change', check)
    }
    return () => {
      window.removeEventListener('resize', check)
      if (screen.orientation) {
        screen.orientation.removeEventListener('change', check)
      }
    }
  }, [isMobile])

  return (
    <div className="landing-screen" onClick={(e) => e.stopPropagation()}>
      {isMobile && isPortrait && (
        <div className="orientation-prompt">
          <div className="orientation-prompt-icon">📱</div>
          <div className="orientation-prompt-title">Rotate Your Phone</div>
          <div className="orientation-prompt-subtitle">This experience is best in landscape mode</div>
        </div>
      )}
      <div className="landing-content">
        <h1 className="landing-title">Armando Irizarry-Cortes</h1>
        <p className="landing-subtitle">IT & Cybersecurity Portfolio</p>

        <div className="landing-buttons">
          <button className="landing-btn landing-btn--primary" onClick={onEnter}>
            Enter the Server Room
          </button>
          <button className="landing-btn landing-btn--secondary" onClick={onViewPortfolio}>
            View Portfolio
          </button>
        </div>
      </div>
    </div>
  )
}
