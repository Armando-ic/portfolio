export default function LandingScreen({ onEnter }) {
  return (
    <div className="landing-screen" onClick={(e) => e.stopPropagation()}>
      <div className="landing-content">
        <h1 className="landing-title">Armando Interiano</h1>
        <p className="landing-subtitle">IT & Cybersecurity Portfolio</p>

        <div className="landing-buttons">
          <button className="landing-btn landing-btn--primary" onClick={onEnter}>
            Enter the Server Room
          </button>
          <a
            className="landing-btn landing-btn--secondary"
            href="/resume/"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Portfolio
          </a>
        </div>
      </div>
    </div>
  )
}
