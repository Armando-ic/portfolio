export default function Projects() {
  return (
    <div>
      <div className="project-card">
        <h3>Home Network Monitoring Lab</h3>
        <div className="tags">
          <span className="tag">Managed switch</span>
          <span className="tag tag--blue">Zeek</span>
          <span className="tag tag--blue">Suricata</span>
          <span className="tag tag--purple">Splunk Enterprise</span>
          <span className="tag">Linux</span>
        </div>
        <p>A passive monitoring build for my home network: a managed switch mirrors traffic to a Linux sensor running Zeek and Suricata, which ships logs to a central Splunk server. Done so far: the design, the hardware purchase, and a hardened Splunk Enterprise server. Next: preparing the laptop that becomes the sensor, then the switch and a capture test.</p>
        <div className="project-links">
          <span style={{ color: '#64748b', fontSize: '0.8rem' }}>In Progress</span>
        </div>
      </div>

      <div className="project-card">
        <h3>Desktop PC Hardware</h3>
        <div className="tags">
          <span className="tag">PC assembly</span>
          <span className="tag tag--blue">MemTest86</span>
          <span className="tag tag--purple">Troubleshooting</span>
        </div>
        <p>Traced a run of blue-screen crashes on my desktop PC to a memory hardware fault: built a MemTest86 USB stick, reproduced the fault outside Windows, tested each memory module on its own, reseated both modules, and verified four clean test passes. Earlier, I assembled a desktop PC at home from parts I chose with PCPartPicker, installed Windows on it, and later upgraded its graphics card.</p>
      </div>

      <div className="project-card">
        <h3>Network Infrastructure Lab</h3>
        <div className="tags">
          <span className="tag">Cisco Packet Tracer</span>
          <span className="tag tag--blue">VLSM</span>
          <span className="tag tag--purple">Routing</span>
          <span className="tag">Switching</span>
        </div>
        <p>Multi-network topologies designed in Cisco Packet Tracer with VLSM addressing and static routing. Routers, switches and endpoints are configured in the simulator, including cabling and punch-downs in Packet Tracer's physical mode.</p>
      </div>

      <div className="project-card">
        <h3>SOC Automation Project</h3>
        <div className="tags">
          <span className="tag tag--purple">Splunk</span>
          <span className="tag tag--blue">n8n</span>
          <span className="tag tag--blue">DFIR-IRIS</span>
          <span className="tag">Sysmon</span>
          <span className="tag">VMware</span>
          <span className="tag tag--purple">Claude Code</span>
        </div>
        <p>A security monitoring pipeline on a 4-VM VMware lab, based on the MyDFIR course and extended with Claude Code: a Sysmon-instrumented Windows endpoint, Splunk, n8n automation, Claude triage with VirusTotal and AbuseIPDB enrichment, and DFIR-IRIS case management. Later moved to Azure, with a Microsoft Sentinel version built around a KQL rule and a Logic App playbook.</p>
        <div className="project-links">
          <a href="https://github.com/Armando-ic/SOC-Automation-Project" target="_blank" rel="noopener noreferrer">GitHub &rarr;</a>
        </div>
      </div>

      <div className="project-card">
        <h3>Honeypot Agentic SOC</h3>
        <div className="tags">
          <span className="tag tag--blue">Azure</span>
          <span className="tag">Windows Server 2022</span>
          <span className="tag tag--purple">Splunk</span>
          <span className="tag">Sysmon</span>
          <span className="tag tag--purple">Claude Code</span>
        </div>
        <p>An internet-exposed Windows Server 2022 honeypot in Azure (July to August 2026) that fed Sysmon and Windows event logs to Splunk, built with Claude Code. I investigated two interactive RDP intrusions and documented each in an ATT&CK-mapped incident report.</p>
        <div className="project-links">
          <a href="https://github.com/Armando-ic/soc-automation-honeypot-project" target="_blank" rel="noopener noreferrer">GitHub &rarr;</a>
        </div>
      </div>

      <div className="project-card">
        <h3>Splunk SOC Analyst Lab</h3>
        <div className="tags">
          <span className="tag tag--purple">Splunk Enterprise</span>
          <span className="tag tag--blue">SPL</span>
          <span className="tag tag--blue">Sysmon</span>
          <span className="tag">Universal Forwarder</span>
          <span className="tag">Python</span>
        </div>
        <p>Live Windows Event Logs and Sysmon forwarded from a Windows 10 VM to a Splunk Enterprise indexer on Linux, plus a nine-dataset course corpus re-ingested with a Python pipeline. I also designed and published a 23-lesson SOC analyst curriculum covering SPL, lookups, dashboards and alerting. The pipeline and the lessons were written with Claude Code.</p>
        <div className="project-links">
          <a href="https://github.com/Armando-ic/splunk-soc-training" target="_blank" rel="noopener noreferrer">GitHub &rarr;</a>
        </div>
      </div>

      <div className="project-card">
        <h3>Lola's Party System</h3>
        <div className="tags">
          <span className="tag">Python</span>
          <span className="tag tag--blue">Firebase</span>
          <span className="tag tag--blue">GCP</span>
          <span className="tag tag--purple">Stripe</span>
          <span className="tag">Team capstone</span>
        </div>
        <p>A production booking and payments site for a party rental business, built with a six-person capstone team at George Mason. It runs on Firebase Hosting, Python Cloud Functions, Firestore and Stripe. I was the team's liaison to the business owner and kept maintaining the site after graduation.</p>
        <div className="project-links">
          <a href="https://lolasparty.com" target="_blank" rel="noopener noreferrer">Live Site &rarr;</a>
          <a href="https://github.com/Armando-ic/lolas-party-system" target="_blank" rel="noopener noreferrer">GitHub &rarr;</a>
        </div>
      </div>

      <div className="project-card">
        <h3>3D Server Room Portfolio</h3>
        <div className="tags">
          <span className="tag">React</span>
          <span className="tag tag--blue">Three.js</span>
          <span className="tag tag--blue">React Three Fiber</span>
          <span className="tag">Vite</span>
          <span className="tag tag--purple">Claude Code</span>
        </div>
        <p>This site: a first-person walkable server room in React, Three.js and React Three Fiber, which I designed and directed and built with Claude Code. It has desktop and mobile controls, content panels on the server racks, and a working contact form. The room is the model "Server Room" by local.yany on Sketchfab (CC BY 4.0).</p>
        <div className="project-links">
          <a href="https://github.com/Armando-ic/portfolio" target="_blank" rel="noopener noreferrer">GitHub &rarr;</a>
        </div>
      </div>
    </div>
  )
}
