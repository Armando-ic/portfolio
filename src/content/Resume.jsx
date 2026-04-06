export default function Resume() {
  return (
    <div className="resume-content">
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <button className="btn btn-outline" onClick={() => window.open('/resume-print.html', '_blank')}>
          Download PDF
        </button>
      </div>

      <h2>Summary</h2>
      <p>IT professional graduating from George Mason University with a concentration in Cyber Security and hands-on experience in detection engineering, SIEM operations, and cloud infrastructure. CompTIA Security+ certified with practical skills in Splunk, Active Directory security, MITRE ATT&CK framework mapping, and infrastructure hardening. Built a blue team home lab with attack simulations and detection rules to develop SOC analyst workflows.</p>

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
      <p style={{ fontSize: '0.8rem' }}><strong style={{ color: '#e2e8f0' }}>CompTIA Security+</strong> (SY0-601) — September 2022 · Expires Sep 2026, earning CEUs for renewal</p>
      <p style={{ fontSize: '0.8rem' }}><strong style={{ color: '#e2e8f0' }}>CompTIA Network+</strong> — In Progress</p>

      <h2>Technical Skills</h2>
      <div className="resume-skills-grid">
        <div><strong>Security & Detection:</strong> Splunk, Sysmon, MITRE ATT&CK, Atomic Red Team, Active Directory, Windows Event Logs, Kali Linux</div>
        <div><strong>Cloud:</strong> GCP, Firebase, Azure Sentinel</div>
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
          <h3>AD Detection Lab</h3>
          <span className="resume-date">Splunk + Active Directory + MITRE ATT&CK</span>
        </div>
        <ul>
          <li>Built a 4-VM Active Directory home lab (Windows Server 2022, Ubuntu/Splunk, Windows 11, Kali Linux) for blue team detection engineering</li>
          <li>Simulated attacks (RDP brute force, Atomic Red Team) and wrote Splunk detection queries mapped to MITRE ATT&CK techniques</li>
          <li>Configured Sysmon and Splunk Universal Forwarder to collect Security, System, Application, and Sysmon telemetry</li>
          <li>Documented analyst triage steps, false positive guidance, and 26 hands-on practice drills across Splunk and AD administration</li>
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
