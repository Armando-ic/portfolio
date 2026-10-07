import resume from './resumeData'

const RESUME_PDF = '/Irizarry-Cortes_Armando_Resume.pdf'
const SMALL_TEXT = { fontSize: '0.8rem' }
const LABEL = { color: '#e2e8f0' }
const BULLETS = { margin: '0.25rem 0 0', paddingLeft: '1.1rem', fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.6 }

export default function Resume() {
  return (
    <div className="resume-content">
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <button className="btn btn-outline" onClick={() => window.open(RESUME_PDF, '_blank')}>
          Download resume (PDF)
        </button>
      </div>

      <h2>Summary</h2>
      <p>{resume.summary}</p>

      <h2>Education</h2>
      {resume.education.map((school) => (
        <div className="resume-entry" key={school.school}>
          <div className="resume-entry-header">
            <h3>{school.school}</h3>
            <span className="resume-date">{school.date}</span>
          </div>
          <div className="resume-subtitle">{school.degree}</div>
        </div>
      ))}

      <h2>Certifications</h2>
      {resume.certifications.map((cert) => (
        <p style={SMALL_TEXT} key={cert.name}>
          <strong style={LABEL}>{cert.name}</strong> {cert.detail}
        </p>
      ))}

      <h2>Experience</h2>
      {resume.experience.map((job) => (
        <div className="resume-entry" key={job.title}>
          <div className="resume-entry-header">
            <h3>{job.title}</h3>
            <span className="resume-date">{job.date}</span>
          </div>
          <div className="resume-subtitle">{job.note ? `${job.org}, ${job.note}` : job.org}</div>
          {job.bullets.length > 0 && (
            <ul style={BULLETS}>
              {job.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          )}
        </div>
      ))}

      <h2>Skills</h2>
      {resume.skills.map((row) => (
        <p style={SMALL_TEXT} key={row.category}>
          <strong style={LABEL}>{row.category}:</strong> {row.skills}
        </p>
      ))}
    </div>
  )
}
