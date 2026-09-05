export default function About() {
  return (
    <div>
      <p>I started my career in the food service industry, but I always knew technology was where I belonged. That drive led me to Northern Virginia Community College, then to George Mason University, where I earned my Bachelor's in Information Technology with a concentration in Cyber Security in May 2026.</p>

      <p>I'm pursuing SOC analyst and cyber defense roles. CompTIA Security+ ce certified through September 2029, I built and operate a Splunk SOC home lab — live Windows and Linux Universal Forwarders feeding Sysmon telemetry, the BOTSv1 incident dataset for multi-day investigations, and detections mapped to the MITRE ATT&CK framework. The lab pairs with the MyDFIR SOC Analyst Training Program for real analyst workflow practice.</p>

      <p>Alongside the SOC work, I serve as lead developer and communications manager on a real-world senior capstone — coordinating a 6-person team, liaising with the business sponsor, and shipping a production cloud application on Google Cloud Platform with 11 Cloud Functions, Stripe payment integration, and a full security audit covering admin auth, Firestore rules, and webhook verification. Building production systems gives me a defender's mindset: I know what to look for because I know how things are put together.</p>

      <div className="section-divider" />

      <h3>Technologies</h3>
      <div className="tags" style={{ marginTop: '0.5rem' }}>
        <span className="tag">Python</span>
        <span className="tag">JavaScript</span>
        <span className="tag">HTML/CSS</span>
        <span className="tag">SQL</span>
        <span className="tag tag--blue">GCP</span>
        <span className="tag tag--blue">Firebase</span>
        <span className="tag tag--purple">Splunk</span>
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
            <div className="timeline-year">2023</div>
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
