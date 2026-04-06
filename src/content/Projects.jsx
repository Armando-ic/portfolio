export default function Projects() {
  return (
    <div>
      <div className="project-card">
        <h3>3D Server Room Portfolio</h3>
        <div className="tags">
          <span className="tag">React</span>
          <span className="tag tag--blue">Three.js</span>
          <span className="tag tag--blue">React Three Fiber</span>
          <span className="tag tag--purple">Blender</span>
          <span className="tag">Vite</span>
          <span className="tag tag--purple">Claude Code</span>
        </div>
        <p>Interactive 3D portfolio conceptualized and directed as a first-person walkable server room. Leveraged Claude Code to implement FPS controls (WASD + mouse look + jump), billboard content systems, ambient audio with footstep sounds, and post-processing effects. Full mobile support with virtual joystick and touch-drag camera controls. 3D models sourced from Sketchfab, assembled and customized in Blender. Demonstrates proficiency in AI-assisted development workflows and creative technical direction.</p>
        <div className="project-links">
          <a href="https://github.com/Armando-ic/portfolio" target="_blank" rel="noopener noreferrer">GitHub &rarr;</a>
        </div>
      </div>

      <div className="project-card">
        <h3>Lola's Party System</h3>
        <div className="tags">
          <span className="tag">Python</span>
          <span className="tag tag--blue">Firebase</span>
          <span className="tag tag--blue">GCP</span>
          <span className="tag tag--purple">Stripe</span>
          <span className="tag tag--purple">Flask</span>
          <span className="tag">HTML/CSS</span>
        </div>
        <p>Full-stack cloud application for a party rental business. Features a 5-step booking wizard, Stripe payments, admin dashboard, automated emails, and delivery fee calculation via Google Maps API. 11 Cloud Functions, 1,400+ lines of backend logic.</p>
        <div className="project-links">
          <a href="https://lolas-party-system.web.app" target="_blank" rel="noopener noreferrer">Live Site &rarr;</a>
          <a href="https://github.com/Armando-ic/lolas-party-system" target="_blank" rel="noopener noreferrer">GitHub &rarr;</a>
        </div>
      </div>

      <div className="project-card">
        <h3>AD Detection Lab</h3>
        <div className="tags">
          <span className="tag">Splunk</span>
          <span className="tag tag--blue">Active Directory</span>
          <span className="tag tag--blue">Sysmon</span>
          <span className="tag tag--purple">MITRE ATT&CK</span>
          <span className="tag tag--purple">Kali Linux</span>
          <span className="tag">PowerShell</span>
        </div>
        <p>Blue team home lab for practicing SOC analyst workflows. Built a 4-VM Active Directory environment, simulated real-world attacks (RDP brute force, Atomic Red Team), forwarded telemetry via Sysmon to Splunk SIEM, and wrote detection queries mapped to MITRE ATT&CK. Includes analyst triage steps, 26 hands-on practice drills, and documented lessons learned from troubleshooting.</p>
        <div className="project-links">
          <a href="https://github.com/Armando-ic/ad-detection-lab" target="_blank" rel="noopener noreferrer">GitHub &rarr;</a>
        </div>
      </div>

      <div className="project-card">
        <h3>Network Infrastructure Lab</h3>
        <div className="tags">
          <span className="tag">Cisco Packet Tracer</span>
          <span className="tag tag--blue">VLSM</span>
          <span className="tag tag--purple">Routing</span>
          <span className="tag">Switching</span>
        </div>
        <p>Designed and configured multi-network topologies using VLSM addressing and static routing. Configured routers, switches, and endpoints including physical-mode punchdowns and cabling.</p>
        <div className="project-links">
          <span style={{ color: '#64748b', fontSize: '0.8rem' }}>Ongoing</span>
        </div>
      </div>
    </div>
  )
}
