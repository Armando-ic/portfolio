export default function Projects() {
  return (
    <div>
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
          <a href="https://github.com/Armando-ic/DMV_SoftPlayRentals_IT-493_Team5" target="_blank" rel="noopener noreferrer">GitHub &rarr;</a>
        </div>
      </div>

      <div className="project-card">
        <h3>Azure Sentinel SIEM Lab</h3>
        <div className="tags">
          <span className="tag tag--blue">Azure</span>
          <span className="tag tag--purple">PowerShell</span>
          <span className="tag">SIEM</span>
          <span className="tag">Log Analytics</span>
        </div>
        <p>Built a security monitoring lab using Azure Sentinel. Extracted Windows Event Viewer metadata via PowerShell, ingested geolocation-enriched logs into Log Analytics, and visualized global RDP brute force attacks on an interactive world map.</p>
        <div className="project-links">
          <span style={{ color: '#64748b', fontSize: '0.8rem' }}>Sep 2023</span>
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
