# 3D Server Room Portfolio

An immersive, interactive 3D portfolio built as a first-person walkable server room. Explore server racks to discover projects, certifications, resume details, and contact information.

**Live:** [armando-portfolio-3d.web.app](https://armando-portfolio-3d.web.app)

## Features

- **First-person exploration** — WASD movement, mouse look, sprint, and jump through a 3D server room environment
- **Interactive server racks** — Walk up to labeled racks and press E to expand full content panels (About, Projects, Certifications, Resume)
- **Ambient audio** — Server room hum and concrete footstep sounds with volume controls
- **Visual polish** — Mixed lighting (cool overhead + colored rack accents), bloom, ambient occlusion, vignette, and tone mapping
- **Flat portfolio fallback** — Scrollable portfolio page with all the same content for quick access
- **Landing screen** — Entry point with options to enter the 3D experience or view the flat portfolio

## Tech Stack

- **React 19** + **Vite** — Application framework and build tool
- **Three.js** + **React Three Fiber** + **Drei** — 3D rendering and scene management
- **@react-three/postprocessing** — Bloom, ambient occlusion, vignette effects
- **Firebase Hosting** — Deployment and hosting
- **Claude Code** — AI-assisted development (agentic workflows, iterative feature implementation)
- **Blender** — 3D model assembly and customization

## Controls

| Key | Action |
|-----|--------|
| W A S D | Move |
| Mouse | Look |
| Shift | Sprint |
| Space | Jump |
| E | Interact / Close panel |
| Esc | Pause menu |

## Project Structure

```
src/
  App.jsx                    # Root — manages view state, pointer lock, sections
  scene/
    ServerRoomScene.jsx      # 3D scene — lighting, post-processing, controls
    Diorama.jsx              # Loads server_room.glb, material fixes
    FPSControls.jsx          # Movement, gravity, collision, interaction
    RackBillboard.jsx        # Billboard labels + expanded content panels
    AudioManager.jsx         # Ambient hum + footstep sounds
  ui/
    LandingScreen.jsx        # Entry screen
    FlatPortfolio.jsx        # Scrollable flat portfolio page
    ControlsHUD.jsx          # Permanent HUD — controls list + audio
  content/
    About.jsx                # Bio, tech tags, timeline
    Projects.jsx             # Project cards
    Certifications.jsx       # Certs and progress
    Resume.jsx               # Full resume with PDF download
    Contact.jsx              # Contact form and links
```

## Development

```bash
npm install
npm run dev
```

## Build & Deploy

```bash
npm run build
cd .. && npx firebase deploy --only hosting --project armando-portfolio-3d
```

## Author

**Armando Irizarry-Cortes**
- [LinkedIn](https://www.linkedin.com/in/armando-irizarry-cortes/)
- [Portfolio](https://armando-portfolio-3d.web.app)
