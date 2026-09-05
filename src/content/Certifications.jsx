export default function Certifications() {
  return (
    <div>
      <div className="cert-card">
        <div className="cert-header">
          <h3>CompTIA Security+</h3>
          <span className="cert-badge cert-badge--earned">Earned</span>
        </div>
        <div className="cert-meta">September 2023 &bull; Renewed August 2026 &bull; Valid through September 2029</div>
        <p style={{ fontSize: '0.85rem' }}>Industry-standard certification validating baseline cybersecurity skills including threat assessment, network security, identity management, and risk management.</p>
        <p style={{ fontSize: '0.8rem', color: '#0d9488', marginTop: '0.5rem' }}>Renewed August 2026 through CompTIA CertMaster CE. Satisfies DoD 8140 IAT Level II.</p>
      </div>

      <div className="cert-card">
        <div className="cert-header">
          <h3>Splunk Core Certified User</h3>
          <span className="cert-badge cert-badge--progress">Planned</span>
        </div>
        <div className="cert-meta">Splunk Education &bull; Targeted 2026</div>
        <p style={{ fontSize: '0.85rem' }}>Entry-level Splunk certification validating SPL search fundamentals, navigation, and basic reporting. Aligned with active Splunk SOC home lab training.</p>
      </div>

      <div className="cert-card">
        <div className="cert-header">
          <h3>Splunk Core Certified Power User</h3>
          <span className="cert-badge cert-badge--progress">Planned</span>
        </div>
        <div className="cert-meta">Splunk Education &bull; Targeted 2026</div>
        <p style={{ fontSize: '0.85rem' }}>Intermediate Splunk certification covering advanced SPL, data transformation, lookups, alerts, and dashboards — the detection-engineering work being practiced in the home lab.</p>
      </div>
    </div>
  )
}
