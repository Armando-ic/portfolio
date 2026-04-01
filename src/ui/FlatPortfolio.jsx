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
            <p className="flat-tagline">IT & Cybersecurity Portfolio</p>
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
        <p>Armando Irizarry-Cortes &middot; IT & Cybersecurity</p>
      </footer>
    </div>
  )
}
