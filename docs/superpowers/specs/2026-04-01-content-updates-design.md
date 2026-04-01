# Content Updates Design

**Date:** 2026-04-01
**Scope:** Update portfolio content across Projects, Resume, and Certifications sections
**Out of scope:** Contact form backend, deployment, GitHub profile README

---

## Overview

Update the portfolio content to reflect current status: add the 3D Server Room Portfolio project, remove outdated items (Azure SIEM, planned certifications), and correct dates (Lola's end date, Brixx end date).

## 1. Projects.jsx

### Add: 3D Server Room Portfolio (first position)
- **Title:** 3D Server Room Portfolio
- **Tags:** React, Three.js, React Three Fiber, Blender, Vite, Claude Code
- **Description:** Interactive 3D portfolio built as a first-person walkable server room. Features FPS controls (WASD + mouse look + jump), billboard content labels on server racks, ambient server audio with footstep sounds, volume controls, and a flat portfolio fallback page. 3D models sourced from Sketchfab, assembled and customized in Blender. Built with assistance from Claude Code.
- **Links:** GitHub link to https://github.com/Armando-ic/portfolio, Live Site placeholder (TBD once deployed)

### Keep: Lola's Party System (second position)
- No changes

### Remove: Azure Sentinel SIEM Lab
- User no longer recalls project details

### Keep: Network Infrastructure Lab (third position)
- No changes

## 2. Resume.jsx

### Experience section
- **Lola's Party Co.:** Change date from "Jan 2026 – Present" to "Jan 2026 – Apr 2026"
- **Brixx Wood Fired Pizza:** Change date from "Mar 2022 – Present" to "Mar 2022 – Mar 2024". Keep all bullet points — the food service experience demonstrates work ethic and versatility.

### Projects section
- **Add:** 3D Server Room Portfolio
  - Bullet points: Interactive 3D first-person portfolio, React Three Fiber + Three.js + Blender, FPS controls with ground raycasting and collision, billboard content system, ambient audio, built with Claude Code assistance
- **Remove:** Azure Sentinel SIEM Lab
- **Keep:** Lola's Party System, Network Infrastructure Lab

### Technical Skills section
- Add "Three.js" and "React Three Fiber" under Frameworks
- Add "Blender" under DevOps/Tools

### Certifications subsection
- Keep both Security+ and Network+ lines — standard resume practice to list certs in progress

## 3. Certifications.jsx

### Remove entirely:
- "Study Roadmap" section header and divider
- Blue Team Level 1 (BTL1) card
- TryHackMe SOC Level 1 & 2 card
- HTB Academy SOC Analyst card

### Keep:
- CompTIA Security+ (earned) — no changes
- CompTIA Network+ (in progress) — no changes

## 4. About.jsx

No changes.

## 5. Contact.jsx

No changes.

## Files Modified

| File | Action |
|---|---|
| `src/content/Projects.jsx` | Add 3D portfolio project, remove Azure SIEM |
| `src/content/Resume.jsx` | Update dates, add 3D project, remove Azure SIEM, add skills |
| `src/content/Certifications.jsx` | Remove planned certs and study roadmap |
