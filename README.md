# 3D Server Room Portfolio

An immersive, interactive 3D portfolio built as a first-person walkable server room. Explore server racks to discover projects, certifications, resume details, and contact information. Full mobile support with touch controls.

**Live:** [armando-portfolio-3d.web.app](https://armando-portfolio-3d.web.app)

## Features

- **First-person exploration** — WASD movement, mouse look, sprint, and jump through a 3D server room environment
- **Mobile touch controls** — Virtual joystick for movement, touch-drag camera look, floating interact/pause buttons, landscape orientation enforcement
- **Interactive server racks** — Walk up to labeled racks and press E (or tap Interact on mobile) to expand full content panels (About, Projects, Certifications, Resume)
- **Working contact form** — Submit messages directly from the portfolio, powered by a GCP Cloud Function with Gmail SMTP
- **Ambient audio** — Server room hum and concrete footstep sounds with volume controls
- **Visual polish** — Mixed lighting (cool overhead + colored rack accents), bloom, ambient occlusion, vignette, and tone mapping
- **Mobile performance** — Reduced post-processing on mobile (N8AO disabled, bloom lowered, pixel ratio capped)
- **Flat portfolio fallback** — Scrollable portfolio page with all the same content for quick access
- **Landing screen** — Entry point with options to enter the 3D experience or view the flat portfolio

## Tech Stack

- **React 19** + **Vite** — Application framework and build tool
- **Three.js** + **React Three Fiber** + **Drei** — 3D rendering and scene management
- **@react-three/postprocessing** — Bloom, ambient occlusion, vignette effects
- **GCP Cloud Functions** — Contact form email backend (Python/Flask, Gmail SMTP)
- **Firebase Hosting** — Deployment and hosting
- **Claude Code** — AI-assisted development (agentic workflows, iterative feature implementation)
- **Blender** — 3D model assembly and customization

## Controls

### Desktop

| Key | Action |
|-----|--------|
| W A S D | Move |
| Mouse | Look |
| Shift | Sprint |
| Space | Jump |
| E | Interact / Close panel |
| Esc | Pause menu |

### Mobile

| Touch | Action |
|-------|--------|
| Left side drag | Move (virtual joystick) |
| Right side drag | Look around |
| Interact button | Open rack panel (appears when near) |
| Close button | Close panel |
| Pause button | Pause menu (top-right) |

## Project Structure

```
src/
  App.jsx                    # Root — manages view state, pointer lock, sections
  hooks/
    useIsMobile.js           # Mobile detection hook
  scene/
    ServerRoomScene.jsx      # 3D scene — lighting, post-processing, controls
    Diorama.jsx              # Loads server_room.glb, material fixes
    FPSControls.jsx          # Movement, gravity, collision, interaction (desktop + mobile)
    RackBillboard.jsx        # Billboard labels + expanded content panels
    AudioManager.jsx         # Ambient hum + footstep sounds
  ui/
    LandingScreen.jsx        # Entry screen + landscape orientation prompt
    FlatPortfolio.jsx        # Scrollable flat portfolio page
    ControlsHUD.jsx          # Permanent HUD — controls list + audio
    MobileTouchControls.jsx  # Virtual joystick, touch-look, interact/pause buttons
    OverlayPanel.jsx         # Full-screen content panel (mobile)
  content/
    About.jsx                # Bio, tech tags, timeline
    Projects.jsx             # Project cards
    Certifications.jsx       # Certs and progress
    Resume.jsx               # Full resume with PDF download
    Contact.jsx              # Contact form (wired to Cloud Function)
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
- [GitHub](https://github.com/Armando-ic)
