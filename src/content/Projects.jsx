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
        <p>Interactive 3D portfolio built as a first-person walkable server room. Features FPS controls (WASD + mouse look + jump), billboard content labels on server racks, ambient server audio with footstep sounds, volume controls, and a flat portfolio fallback page. 3D models sourced from Sketchfab, assembled and customized in Blender. Built with assistance from Claude Code.</p>
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
          <a href="https://github.com/Armando-ic/DMV_SoftPlayRentals_IT-493_Team5" target="_blank" rel="noopener noreferrer">GitHub &rarr;</a>
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
