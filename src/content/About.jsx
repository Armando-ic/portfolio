export default function About() {
  return (
    <div>
      <p>I started my career in the food service industry, but I always knew technology was where I belonged. That drive led me to Northern Virginia Community College, then to George Mason University, where I earned my Bachelor's in Information Technology with a concentration in Cyber Security in May 2026.</p>

      <p>I'm moving into data center and network infrastructure work. The part of IT I enjoy most is the hands-on part: building networks, working with hardware, and following a procedure until the job is done right. I hold CompTIA Security+ ce, valid through September 2029, and I'm studying for the Cisco CCNA.</p>

      <p>So far I've assembled a desktop PC from parts I planned on PCPartPicker, and on my current desktop I traced a run of blue-screen crashes to a memory hardware fault. I'm building a home network monitoring lab (in progress): the Splunk server is installed and hardened, and a managed switch and a Linux capture sensor come next. I design Cisco Packet Tracer topologies with VLSM subnetting and static routing.</p>

      <p>My security background shapes how I work. I built a SOC automation pipeline (Splunk, n8n, Claude triage, DFIR-IRIS) from a MyDFIR course and extended it with Claude Code, investigated real RDP intrusions on an Azure honeypot, and helped build and secure a production cloud application for a local business as my senior capstone.</p>

      <div className="section-divider" />

      <h3>Technologies</h3>
      <div className="tags" style={{ marginTop: '0.5rem' }}>
        <span className="tag">Cisco Packet Tracer</span>
        <span className="tag">TCP/IP and subnetting</span>
        <span className="tag tag--blue">Linux</span>
        <span className="tag tag--blue">Windows</span>
        <span className="tag tag--blue">VMware</span>
        <span className="tag tag--blue">Docker</span>
        <span className="tag tag--purple">Splunk</span>
        <span className="tag">Python</span>
        <span className="tag">Bash</span>
        <span className="tag">PowerShell</span>
        <span className="tag tag--blue">GCP</span>
        <span className="tag tag--blue">Firebase</span>
        <span className="tag">Git/GitHub</span>
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
        <div className="timeline-item">
          <div className="timeline-dot" style={{ background: '#7c3aed' }} />
          <div>
            <div className="timeline-year">Sep '26</div>
            <div className="timeline-label">CCNA study</div>
          </div>
        </div>
      </div>
    </div>
  )
}
