export default function About() {
  return (
    <div>
      <p>I started my career in the food service industry, but I always knew technology was where I belonged. That drive led me to Northern Virginia Community College, then to George Mason University, where I'm completing my Bachelor's in Information Technology with a concentration in Cyber Security.</p>

      <p>Today, I'm a CompTIA Security+ certified professional with hands-on experience building and securing cloud infrastructure on Google Cloud Platform. As lead developer on a capstone client project, I've deployed 11 Cloud Functions, integrated Stripe payments, and conducted full security audits — all while managing client communications and coordinating a 6-person team.</p>

      <p>I'm driven by the challenge of building systems that are both powerful and secure. Whether it's configuring Firestore security rules, designing booking workflows, or setting up automated email pipelines, I bring the same attention to detail and commitment to quality.</p>

      <div className="section-divider" />

      <h3>Technologies</h3>
      <div className="tags" style={{ marginTop: '0.5rem' }}>
        <span className="tag">Python</span>
        <span className="tag">JavaScript</span>
        <span className="tag">HTML/CSS</span>
        <span className="tag">SQL</span>
        <span className="tag tag--blue">GCP</span>
        <span className="tag tag--blue">Firebase</span>
        <span className="tag tag--blue">Azure Sentinel</span>
        <span className="tag tag--purple">Flask</span>
        <span className="tag tag--purple">Stripe API</span>
        <span className="tag">Git/GitHub</span>
        <span className="tag">Cisco Packet Tracer</span>
        <span className="tag tag--purple">Claude Code</span>
      </div>

      <div className="section-divider" />

      <h3>My Journey</h3>
      <div className="timeline">
        <div className="timeline-item">
          <div className="timeline-dot" />
          <div>
            <div className="timeline-year">2017</div>
            <div className="timeline-label">NOVA — AS in IT</div>
          </div>
        </div>
        <div className="timeline-item">
          <div className="timeline-dot" style={{ background: '#2563eb' }} />
          <div>
            <div className="timeline-year">2021</div>
            <div className="timeline-label">George Mason</div>
          </div>
        </div>
        <div className="timeline-item">
          <div className="timeline-dot" style={{ background: '#7c3aed' }} />
          <div>
            <div className="timeline-year">2022</div>
            <div className="timeline-label">Security+</div>
          </div>
        </div>
        <div className="timeline-item">
          <div className="timeline-dot" />
          <div>
            <div className="timeline-year">2026</div>
            <div className="timeline-label">Lola's Party Co.</div>
          </div>
        </div>
        <div className="timeline-item">
          <div className="timeline-dot" style={{ background: '#2563eb' }} />
          <div>
            <div className="timeline-year">May '26</div>
            <div className="timeline-label">Graduation</div>
          </div>
        </div>
      </div>
    </div>
  )
}
