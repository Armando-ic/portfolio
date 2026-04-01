export default function Certifications() {
  return (
    <div>
      <div className="cert-card">
        <div className="cert-header">
          <h3>CompTIA Security+</h3>
          <span className="cert-badge cert-badge--earned">Earned</span>
        </div>
        <div className="cert-meta">SY0-601 &bull; September 2022 &bull; Expires September 2026</div>
        <p style={{ fontSize: '0.85rem' }}>Industry-standard certification validating baseline cybersecurity skills including threat assessment, network security, identity management, and risk management.</p>
        <p style={{ fontSize: '0.8rem', color: '#0d9488', marginTop: '0.5rem' }}>Currently earning CEUs for renewal</p>
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
    </div>
  )
}
