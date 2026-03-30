# Reef Art Direction Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the 3D coral reef portfolio to match a low-poly diorama art style with rolling hills terrain, animated sea creatures, and a denser reef ecosystem.

**Architecture:** Export individual 3D assets from Blender (terrain, animated fish, octopus, plants) as .glb files into `public/models/blender-exports/`. Replace the flat ocean floor with rolling hills terrain. Swap basic sin/cos fish animation for proper glTF animation playback via `useAnimations` from Drei. Add the octopus and upgrade reef density with new style-matched assets.

**Tech Stack:** React Three Fiber, Drei (`useGLTF`, `useAnimations`), Three.js, GSAP ScrollTrigger, Blender MCP (for exports)

---

## File Structure

### New Files
- `public/models/blender-exports/terrain-hills.glb` — Rolling hills seabed mesh
- `public/models/blender-exports/fish-animated-1.glb` — Animated fish (species 1, with swim armature)
- `public/models/blender-exports/fish-animated-2.glb` — Animated fish (species 2, with swim armature)
- `public/models/blender-exports/fish-animated-3.glb` — Animated fish (species 3, with swim armature)
- `public/models/blender-exports/octopus.glb` — Low-poly octopus
- `public/models/blender-exports/plants-seaweed.glb` — Underwater plants/seaweed
- `public/models/blender-exports/rocks-set.glb` — Low-poly rocks cluster
- `src/scene/AnimatedFish.jsx` — Fish component with glTF animation playback
- `src/scene/Octopus.jsx` — Octopus component

### Modified Files
- `src/scene/Ocean.jsx` — Replace flat plane OceanFloor with rolling hills terrain .glb
- `src/scene/ReefDecor.jsx` — Update with new style-matched plants/rocks from Blender exports
- `src/scene/ReefFish.jsx` — Replace with AnimatedFish (or delete entirely)
- `src/scene/ReefScene.jsx` — Add Octopus, update imports
- `src/scene/CameraPath.jsx` — Adjust waypoints if terrain changes heights
- `src/scene/Lighting.jsx` — Possible adjustments for new terrain

---

## Phase 1: Asset Extraction & Export from Blender

This phase is interactive — uses Blender MCP tools to isolate and export individual assets from the downloaded Sketchfab scenes as .glb files.

### Task 1.1: Export Rolling Hills Terrain

**Files:**
- Create: `public/models/blender-exports/terrain-hills.glb`

- [ ] **Step 1: Isolate terrain from Sea Life Challenge scene**

In Blender (via MCP): Load the Sea Life Challenge scene. Select only the `ground` and `rock`/`rock2` objects that form the canyon hills. Delete everything else (fish, corals, water, jellyfish, ship).

- [ ] **Step 2: Clean up and reshape terrain**

Scale/reshape the terrain to be a long strip (roughly 60 x 15 units) with gentle rolling hills rather than two sharp mountains. The terrain needs to span from z=0 to z=-60 to cover the full reef path.

- [ ] **Step 3: Export as .glb**

```python
# In Blender via MCP
bpy.ops.export_scene.gltf(
    filepath='F:/Claude_Code/Folder_1/portfolio-reef/public/models/blender-exports/terrain-hills.glb',
    export_format='GLB',
    use_selection=True
)
```

- [ ] **Step 4: Verify file exists and is reasonable size**

```bash
ls -la public/models/blender-exports/terrain-hills.glb
```

### Task 1.2: Export Animated Fish from Sealife Diorama

**Files:**
- Create: `public/models/blender-exports/fish-animated-1.glb`
- Create: `public/models/blender-exports/fish-animated-2.glb`
- Create: `public/models/blender-exports/fish-animated-3.glb`

- [ ] **Step 1: Load Sealife diorama in Blender**

Clear scene, re-download the Sealife diorama (UID: `fabe7df4946647baa760d53968720a35`).

- [ ] **Step 2: Identify animated fish armatures**

The diorama contains multiple fish with armatures: `fish1_*`, `fish2_*`, `white fish*`. Each has a `_correction` parent and an `Armature*` object. Isolate 3 distinct fish species.

- [ ] **Step 3: Export each fish species individually with animations**

For each fish: select the mesh + its armature, export as .glb with animations enabled:

```python
bpy.ops.export_scene.gltf(
    filepath='F:/Claude_Code/Folder_1/portfolio-reef/public/models/blender-exports/fish-animated-1.glb',
    export_format='GLB',
    use_selection=True,
    export_animations=True,
    export_skins=True
)
```

- [ ] **Step 4: Verify each .glb contains animation data**

Load each in a test Three.js scene or check file size (animated .glb should be larger than static).

### Task 1.3: Export Octopus

**Files:**
- Create: `public/models/blender-exports/octopus.glb`

- [ ] **Step 1: Load the standalone octopus model**

Clear scene, re-download the octopus (UID: `f791893db35147a5bba081c7b04af8db`).

- [ ] **Step 2: Export as .glb**

```python
bpy.ops.export_scene.gltf(
    filepath='F:/Claude_Code/Folder_1/portfolio-reef/public/models/blender-exports/octopus.glb',
    export_format='GLB',
    use_selection=False
)
```

### Task 1.4: Export Plants and Rocks

**Files:**
- Create: `public/models/blender-exports/plants-seaweed.glb`
- Create: `public/models/blender-exports/rocks-set.glb`

- [ ] **Step 1: Isolate plants from Sealife diorama**

Select all `plant*` and `plant1*` objects from the diorama. Export as a single .glb.

- [ ] **Step 2: Isolate rocks from Sealife diorama**

Select all `rock*` objects from the diorama. Export as a single .glb.

- [ ] **Step 3: Export both as .glb files**

```python
# Plants
bpy.ops.export_scene.gltf(
    filepath='F:/Claude_Code/Folder_1/portfolio-reef/public/models/blender-exports/plants-seaweed.glb',
    export_format='GLB',
    use_selection=True
)
# Rocks
bpy.ops.export_scene.gltf(
    filepath='F:/Claude_Code/Folder_1/portfolio-reef/public/models/blender-exports/rocks-set.glb',
    export_format='GLB',
    use_selection=True
)
```

---

## Phase 2: Rolling Hills Terrain

Replace the flat ocean floor plane with the exported rolling hills terrain mesh.

### Task 2.1: Replace Flat OceanFloor with Terrain Model

**Files:**
- Modify: `src/scene/Ocean.jsx` (lines 6-22, the OceanFloor component)

- [ ] **Step 1: Update OceanFloor to load terrain .glb**

Replace the flat `planeGeometry` mesh with a `useGLTF` loaded terrain:

```jsx
import { useGLTF } from '@react-three/drei'

function OceanFloor() {
  const { scene } = useGLTF('/models/blender-exports/terrain-hills.glb')
  return (
    <primitive
      object={scene.clone()}
      position={[0, -7, -25]}
      scale={1}
    />
  )
}

useGLTF.preload('/models/blender-exports/terrain-hills.glb')
```

- [ ] **Step 2: Verify terrain renders in browser**

Run dev server, scroll through the reef, confirm terrain is visible and properly positioned.

- [ ] **Step 3: Adjust position/scale/rotation to fit the reef layout**

The terrain must span z=0 to z=-60, sit at y=-7, and have hills that don't block the camera path (y=-6). Adjust `position` and `scale` props as needed.

- [ ] **Step 4: Verify camera path still works smoothly**

Scroll through entire reef. If camera clips into hills, adjust terrain scale or camera path heights in `CameraPath.jsx`.

### Task 2.2: Adjust Camera Path for Terrain (if needed)

**Files:**
- Modify: `src/scene/CameraPath.jsx` (lines 9-28, the waypoints array)

- [ ] **Step 1: Test current camera path against new terrain**

Scroll through the reef and note any positions where camera clips into terrain hills.

- [ ] **Step 2: Adjust waypoint y-values where needed**

If the terrain has hills at certain z-positions, raise the camera y at those waypoints. The camera should glide 1-2 units above the terrain surface.

- [ ] **Step 3: Verify smooth scroll through entire reef**

Full scroll test from surface to Contact coral. No clipping, no sudden jumps.

---

## Phase 3: Animated Sea Life

Replace basic sin/cos fish movement with proper glTF animation playback and add the octopus.

### Task 3.1: Create AnimatedFish Component

**Files:**
- Create: `src/scene/AnimatedFish.jsx`

- [ ] **Step 1: Build AnimatedFish component with useAnimations**

```jsx
import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'

function AnimatedFish({ modelPath, position, scale, speed, radius, phase }) {
  const groupRef = useRef()
  const { scene, animations } = useGLTF(modelPath)
  const clonedScene = scene.clone()
  const { actions } = useAnimations(animations, groupRef)

  useEffect(() => {
    // Play the first available animation (swim cycle)
    const actionName = Object.keys(actions)[0]
    if (actionName) {
      actions[actionName].reset().fadeIn(0.5).play()
    }
  }, [actions])

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.elapsedTime * speed + phase

    // Gentle swimming path
    const x = position[0] + Math.sin(t) * radius
    const z = position[2] + Math.cos(t) * radius * 0.6
    const y = position[1] + Math.sin(t * 1.5) * 0.3

    groupRef.current.position.set(x, y, z)
    groupRef.current.rotation.y = Math.atan2(
      Math.cos(t) * radius,
      -Math.sin(t) * radius * 0.6
    )
  })

  return (
    <group ref={groupRef}>
      <primitive object={clonedScene} scale={scale} />
    </group>
  )
}

export default AnimatedFish
```

- [ ] **Step 2: Test with one animated fish .glb**

Add a single `<AnimatedFish>` to `ReefScene.jsx` and verify the swim animation plays while the fish moves along its path.

### Task 3.2: Replace ReefFish with Animated Fish

**Files:**
- Modify: `src/scene/ReefFish.jsx` — rewrite to use AnimatedFish component

- [ ] **Step 1: Update ReefFish.jsx to use animated .glb models**

Replace the `FISH_MODELS` dictionary with paths to the new animated exports. Update `SwimmingFish` to use `useAnimations`. Keep the same placement positions and swimming parameters.

- [ ] **Step 2: Verify all fish animate and swim correctly**

Scroll through reef, confirm fish at each section have visible swim animations.

- [ ] **Step 3: Mix animated + static fish for variety**

Some fish can use the new animated .glb files, others can keep the existing fish-bundle models with sin/cos movement. This gives variety and controls performance.

### Task 3.3: Add Octopus to the Reef

**Files:**
- Create: `src/scene/Octopus.jsx`
- Modify: `src/scene/ReefScene.jsx` — add `<Octopus />`

- [ ] **Step 1: Create Octopus component**

```jsx
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

export default function Octopus() {
  const ref = useRef()
  const { scene } = useGLTF('/models/blender-exports/octopus.glb')

  useFrame(({ clock }) => {
    if (!ref.current) return
    // Gentle idle sway
    ref.current.rotation.y = Math.sin(clock.elapsedTime * 0.3) * 0.15
    ref.current.position.y = -6.5 + Math.sin(clock.elapsedTime * 0.5) * 0.1
  })

  return (
    <primitive
      ref={ref}
      object={scene.clone()}
      position={[3, -6.5, -35]}
      scale={1.5}
    />
  )
}

useGLTF.preload('/models/blender-exports/octopus.glb')
```

- [ ] **Step 2: Add to ReefScene.jsx**

```jsx
import Octopus from './Octopus'

// Inside the JSX:
<Octopus />
```

- [ ] **Step 3: Position the octopus prominently on the reef**

Place it between Resume (z=-28) and Certifications (z=-40) where it's clearly visible during the scroll. Adjust scale and position by testing in browser.

---

## Phase 4: Reef Ecosystem Density

Update decorative elements to use new style-matched assets and increase reef density.

### Task 4.1: Update ReefDecor with New Assets

**Files:**
- Modify: `src/scene/ReefDecor.jsx`

- [ ] **Step 1: Add new Blender export models to MODELS dictionary**

```jsx
const MODELS = {
  // ... keep existing models that match the art style ...
  // Add new exports:
  newPlants: '/models/blender-exports/plants-seaweed.glb',
  newRocks: '/models/blender-exports/rocks-set.glb',
}
```

- [ ] **Step 2: Replace/supplement DECOR_ITEMS with new models**

Swap out any decor items that clash with the new art style. Add more items to increase density — target 30-40 items total, spread across the full z=-10 to z=-55 range.

- [ ] **Step 3: Visual verification at every scroll position**

Take screenshots at 0%, 20%, 40%, 60%, 80%, 100% scroll to verify density and spacing look good.

### Task 4.2: Add Coral Variety from Existing Assets

**Files:**
- Modify: `src/scene/ReefDecor.jsx`

- [ ] **Step 1: Audit existing models that match the low-poly style**

Check which models from `coral-musical/`, `underwater/`, and `pirate-kit/` match the new art direction. Remove any that look photorealistic or out of place.

- [ ] **Step 2: Add style-matched models to fill gaps between sections**

Ensure every gap between section corals has 4-6 decorative elements visible at any time during scroll.

---

## Phase 5: Final Polish & Integration

### Task 5.1: Full Scroll-Through Verification

**Files:**
- All scene files

- [ ] **Step 1: Complete scroll test from surface to Contact**

Use Playwright to scroll through at 10% increments, screenshot each position. Verify:
- Boat visible at surface (0%)
- Smooth descent past About coral (15-25%)
- Rolling hills visible, no flat patches (20-50%)
- Fish swimming with animations (30-70%)
- Octopus visible and prominent (55-65%)
- Decorative elements throughout, no empty stretches
- Contact coral reached smoothly (90-100%)

- [ ] **Step 2: Fix any visual issues found**

Adjust positions, scales, or camera path as needed based on screenshots.

### Task 5.2: Performance Check

- [ ] **Step 1: Check frame rate with all new assets loaded**

Open browser devtools, monitor FPS during scroll. Target: 30+ FPS consistently.

- [ ] **Step 2: Optimize if needed**

If FPS drops below 30:
- Reduce number of animated fish (keep 4-6 animated, rest static)
- Lower poly count on terrain if too high
- Use `<Instances>` for repeated decorative elements

### Task 5.3: Lighting Adjustments

**Files:**
- Modify: `src/scene/Lighting.jsx`

- [ ] **Step 1: Test if current lighting works with new terrain**

Rolling hills may create dark shadows or unlit areas. Adjust light positions/intensities if needed.

- [ ] **Step 2: Add fill light if terrain creates dark spots**

Consider adding a second ambient or hemisphere light to softly illuminate terrain valleys.

---

## Execution Order

1. **Phase 1** (Blender exports) must be done first — all other phases depend on having .glb files
2. **Phase 2** (terrain) and **Phase 3** (animated fish + octopus) can run in parallel after Phase 1
3. **Phase 4** (density) depends on Phases 2+3 being stable
4. **Phase 5** (polish) is the final pass after everything is integrated

## Notes

- **Animation compatibility:** Not all Sketchfab glTF animations will work perfectly with `useAnimations`. Some may need armature cleanup in Blender before export.
- **Performance budget:** Each animated fish adds a per-frame animation mixer update. Keep total animated creatures under 10 for web performance.
- **Terrain scale:** The terrain .glb will likely need manual adjustment in Blender before export to match our scene's coordinate system (z=0 to z=-60, y=-7 floor).
