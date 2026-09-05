export default function Resume() {
  return (
    <div className="resume-content">
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <button className="btn btn-outline" onClick={() => window.open('/resume-print.html', '_blank')}>
          Download PDF
        </button>
      </div>

      <h2>Summary</h2>
      <p>BS Information Technology senior at George Mason University (Cyber Security concentration, graduating May 2026), pursuing SOC analyst and cyber defense roles. CompTIA Security+ certified, currently building a Splunk SOC home lab with live Windows and Linux Universal Forwarders, Sysmon telemetry, the BOTSv1 incident dataset, and MITRE ATT&CK-mapped detections. Concurrently serving as lead developer and communications manager on a real-world senior capstone — deploying and securing a production cloud application on Google Cloud Platform with Cloud Functions, Firestore, Stripe integration, and webhook verification.</p>

      <h2>Education</h2>
      <div className="resume-entry">
        <div className="resume-entry-header">
          <h3>George Mason University</h3>
          <span className="resume-date">Aug 2021 – May 2026</span>
        </div>
        <div className="resume-subtitle">BS in Information Technology, Concentration: Cyber Security</div>
        <p style={{ fontSize: '0.8rem' }}><strong style={{ color: '#e2e8f0' }}>Coursework:</strong> Information Defense Technologies, Computer Crime Forensics and Auditing, Network Security, Cyber Security of Data and Software</p>
      </div>
      <div className="resume-entry">
        <div className="resume-entry-header">
          <h3>Northern Virginia Community College</h3>
          <span className="resume-date">Aug 2017 – May 2021</span>
        </div>
        <div className="resume-subtitle">Associate of Science in Information Technology</div>
      </div>

      <h2>Certifications</h2>
      <p style={{ fontSize: '0.8rem' }}><strong style={{ color: '#e2e8f0' }}>CompTIA Security+ ce</strong> · September 2023 · Renewed Aug 2026 · Valid through Sep 2029 · DoD 8140 IAT Level II</p>
      <p style={{ fontSize: '0.8rem' }}><strong style={{ color: '#e2e8f0' }}>Splunk Core Certified User</strong> — Planned</p>
      <p style={{ fontSize: '0.8rem' }}><strong style={{ color: '#e2e8f0' }}>Splunk Core Certified Power User</strong> — Planned</p>

      <h2>Technical Skills</h2>
      <div className="resume-skills-grid">
        <div><strong>Security & Detection:</strong> Splunk Enterprise, Splunk SPL, Sysmon (SwiftOnSecurity), Universal Forwarders, MITRE ATT&CK, BOTSv1, log analysis, detection engineering, incident response</div>
        <div><strong>Cloud:</strong> GCP, Firebase</div>
        <div><strong>Languages:</strong> Python, JavaScript, PowerShell, SPL (Splunk), HTML/CSS, SQL</div>
        <div><strong>Frameworks:</strong> Flask, Three.js, React Three Fiber, Tailwind CSS, Stripe API, Google Maps API</div>
        <div><strong>DevOps:</strong> Git/GitHub, gcloud CLI, Firebase CLI, Firestore security rules</div>
        <div><strong>Networking:</strong> Cisco Packet Tracer, VLSM, static routing, VirtualBox</div>
        <div><strong>Tools:</strong> Blender, Claude Code (agentic workflows, MCP, automated QA)</div>
      </div>

      <h2>Experience</h2>
      <div className="resume-entry">
        <div className="resume-entry-header">
          <h3>Cloud Systems Developer & Communications Manager</h3>
          <span className="resume-date">Jan 2026 – Apr 2026</span>
        </div>
        <div className="resume-subtitle">Lola's Party Co. — GMU IT-493 Senior Design Project</div>
        <ul>
          <li>Served as lead developer for a real-world client engagement, gathering requirements, delivering demos, and iterating on feedback</li>
          <li>Deployed and managed 11 Google Cloud Functions (Python/Flask) handling bookings, payments, email automation, and scheduled tasks</li>
          <li>Integrated Stripe payment processing with webhook verification, deposit/balance tracking, and idempotent transaction handling</li>
          <li>Conducted a full security audit: admin auth, Firestore rules, XSS sanitization, CORS policies, cron endpoint protection</li>
          <li>Served as primary liaison between a 6-person team and business sponsor via email, text, and Discord</li>
          <li>Represented the team at an in-person sponsor meeting, presenting a live product demo and facilitating a 1.5-hour feedback session</li>
        </ul>
      </div>
      <div className="resume-entry">
        <div className="resume-entry-header">
          <h3>Line Cook / Dishwasher / Server</h3>
          <span className="resume-date">Mar 2022 – Mar 2024</span>
        </div>
        <div className="resume-subtitle">Brixx Wood Fired Pizza + Craft Bar</div>
        <ul>
          <li>Collaborated with kitchen and front-of-house staff under time pressure</li>
          <li>Maintained compliance with nutrition, sanitation, and safety standards</li>
        </ul>
      </div>

      <h2>Projects</h2>
      <div className="resume-entry">
        <div className="resume-entry-header">
          <h3>Splunk SOC Analyst Home Lab</h3>
          <span className="resume-date">Real Telemetry + BOTSv1 + MITRE ATT&CK</span>
        </div>
        <ul>
          <li>Built a SOC analyst training lab across three real data environments: live Windows 10 and Linux Universal Forwarders with Sysmon (SwiftOnSecurity), a 9-dataset course CSV corpus re-ingested through a custom Python pipeline, and the public BOTSv1 dataset for multi-day incident investigation</li>
          <li>Authored a 4-week progressive curriculum covering SPL fundamentals, data transformation (stats, eval, rex, timechart), lookups and dashboards, scheduled alerts, and correlation searches</li>
          <li>Mapped detections to MITRE ATT&CK techniques and deployed Splunk Technology Add-ons to ensure correct sourcetype parsing across custom datasets</li>
          <li>Enrolled concurrently in the MyDFIR SOC Analyst Training Program</li>
        </ul>
      </div>
      <div className="resume-entry">
        <div className="resume-entry-header">
          <h3>3D Server Room Portfolio</h3>
          <span className="resume-date">React Three Fiber + Blender</span>
        </div>
        <ul>
          <li>Conceptualized and directed development of an interactive 3D first-person portfolio, leveraging Claude Code for AI-assisted implementation</li>
          <li>Guided iterative development of FPS controls, ground raycasting, collision detection, and billboard content systems</li>
          <li>Implemented mobile touch support with virtual joystick, touch-drag camera, and landscape orientation enforcement</li>
          <li>Assembled 3D models from Sketchfab in Blender; managed full project lifecycle through AI-assisted workflows</li>
        </ul>
      </div>
      <div className="resume-entry">
        <div className="resume-entry-header">
          <h3>Lola's Party System</h3>
          <span className="resume-date">Full-Stack Cloud App</span>
        </div>
        <ul>
          <li>Built a production web app for a party rental business serving Northern Virginia</li>
          <li>5-step booking wizard, e-commerce page, admin dashboard, Google Maps delivery fees</li>
          <li>Wrote Firestore/Storage security rules, pinned dependencies, scrubbed secrets from history</li>
        </ul>
      </div>
      <div className="resume-entry">
        <div className="resume-entry-header">
          <h3>Network Infrastructure Lab</h3>
          <span className="resume-date">Cisco Packet Tracer</span>
        </div>
        <ul>
          <li>Multi-network topologies with VLSM addressing, static routing, physical-mode cabling</li>
        </ul>
      </div>
    </div>
  )
}
