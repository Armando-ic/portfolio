export default function Certifications() {
  return (
    <div>
      <div className="cert-card">
        <div className="cert-header">
          <h3>CompTIA Security+</h3>
          <span className="cert-badge cert-badge--earned">Earned</span>
        </div>
        <div className="cert-meta">SY0-601 &bull; September 2022</div>
        <p style={{ fontSize: '0.85rem' }}>Industry-standard certification validating baseline cybersecurity skills including threat assessment, network security, identity management, and risk management.</p>
      </div>

      <div className="cert-card">
        <div className="cert-header">
          <h3>CompTIA Network+</h3>
          <span className="cert-badge cert-badge--progress">In Progress</span>
        </div>
        <div className="cert-meta">N10-008 &bull; Currently Studying</div>
        <p style={{ fontSize: '0.85rem' }}>Covers networking fundamentals, implementations, operations, security, and troubleshooting. Building on hands-on experience with Cisco Packet Tracer and cloud infrastructure.</p>
        <div className="progress-bar">
          <div className="progress-bar-fill" style={{ width: '45%' }} />
        </div>
      </div>

      <div className="section-divider" />

      <h3 style={{ marginBottom: '1rem' }}>Study Roadmap</h3>

      <div className="cert-card">
        <div className="cert-header">
          <h3 style={{ fontSize: '0.95rem' }}>Blue Team Level 1 (BTL1)</h3>
          <span className="cert-badge cert-badge--planned">Planned</span>
        </div>
        <p style={{ fontSize: '0.85rem' }}>Junior Security Operations certification — SOC analysis, phishing analysis, threat intelligence, SIEM, and incident response.</p>
      </div>

      <div className="cert-card">
        <div className="cert-header">
          <h3 style={{ fontSize: '0.95rem' }}>TryHackMe SOC Level 1 & 2</h3>
          <span className="cert-badge cert-badge--planned">Planned</span>
        </div>
        <p style={{ fontSize: '0.85rem' }}>Hands-on learning paths covering SOC fundamentals, log analysis, network traffic analysis, and endpoint security monitoring.</p>
      </div>

      <div className="cert-card">
        <div className="cert-header">
          <h3 style={{ fontSize: '0.95rem' }}>HTB Academy SOC Analyst</h3>
          <span className="cert-badge cert-badge--planned">Planned</span>
        </div>
        <p style={{ fontSize: '0.85rem' }}>Hack The Box practical training for SOC analyst roles — real-world attack detection, SIEM operations, and incident handling.</p>
      </div>
    </div>
  )
}
