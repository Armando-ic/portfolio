export default function Certifications() {
  return (
    <div>
      <div className="cert-card">
        <div className="cert-header">
          <h3>CompTIA Security+ ce</h3>
          <span className="cert-badge cert-badge--earned">Earned</span>
        </div>
        <div className="cert-meta">September 2023 &bull; Renewed August 2026 &bull; Valid through September 2029</div>
        <p style={{ fontSize: '0.85rem' }}>Industry-standard certification validating baseline cybersecurity skills including threat assessment, network security, identity management, and risk management.</p>
        <p style={{ fontSize: '0.8rem', color: '#0d9488', marginTop: '0.5rem' }}>Renewed August 2026 through CompTIA CertMaster CE. Satisfies DoD 8140 IAT Level II.</p>
      </div>

      <div className="cert-card">
        <div className="cert-header">
          <h3>Cisco CCNA</h3>
          <span className="cert-badge cert-badge--progress">In Progress</span>
        </div>
        <div className="cert-meta">Cisco, exam target December 2026</div>
        <p style={{ fontSize: '0.85rem' }}>Studying for the CCNA alongside my job search: routing, switching, subnetting and network fundamentals, practiced in Cisco Packet Tracer.</p>
      </div>
    </div>
  )
}
