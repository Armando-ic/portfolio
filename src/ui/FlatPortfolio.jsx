import About from '../content/About'
import Projects from '../content/Projects'
import Resume from '../content/Resume'
import Certifications from '../content/Certifications'
import Contact from '../content/Contact'
import '../styles/flat-portfolio.css'

const SECTIONS = [
  { id: 'about', title: 'About Me', component: About },
  { id: 'projects', title: 'Projects', component: Projects },
  { id: 'certifications', title: 'Certifications', component: Certifications },
  { id: 'resume', title: 'Resume', component: Resume },
  { id: 'contact', title: 'Contact', component: Contact },
]

export default function FlatPortfolio({ onBack }) {
  return (
    <div className="flat-portfolio">
      <header className="flat-header">
        <div className="flat-header-content">
          <div>
            <h1 className="flat-name">Armando Irizarry-Cortes</h1>
            <p className="flat-tagline">IT Infrastructure, Networking & Security</p>
          </div>
          <nav className="flat-nav">
            {SECTIONS.map(s => (
              <a key={s.id} href={`#${s.id}`} className="flat-nav-link">{s.title}</a>
            ))}
            {onBack && (
              <button className="flat-nav-back" onClick={onBack}>
                Enter Server Room
              </button>
            )}
          </nav>
        </div>
      </header>

      <main className="flat-main">
        {SECTIONS.map(s => {
          const Component = s.component
          return (
            <section key={s.id} id={s.id} className="flat-section">
              <h2 className="flat-section-title">{s.title}</h2>
              <div className="overlay-content">
                <Component />
              </div>
            </section>
          )
        })}
      </main>

      <footer className="flat-footer">
        <p>Armando Irizarry-Cortes &middot; IT Infrastructure, Networking & Security</p>
        <p style={{ marginTop: '0.5rem' }}>
          Server room model: <a href="https://sketchfab.com/3d-models/server-room-57a480597a20476f9f303fda4a089f86" target="_blank" rel="noopener noreferrer" style={{ color: '#94a3b8' }}>"Server Room"</a> by <a href="https://sketchfab.com/local.yany" target="_blank" rel="noopener noreferrer" style={{ color: '#94a3b8' }}>local.yany</a> on Sketchfab, licensed under <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer" style={{ color: '#94a3b8' }}>CC BY 4.0</a>.
        </p>
      </footer>
    </div>
  )
}
