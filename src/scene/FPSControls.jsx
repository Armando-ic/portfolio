import { useRef, useEffect, useCallback } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { PointerLockControls } from '@react-three/drei'
import * as THREE from 'three'

// --- Tunable constants ---
const MOVE_SPEED = 300
const SPRINT_SPEED = 600
const JUMP_FORCE = 250
const GRAVITY = 600
const EYE_HEIGHT = 100
const BOUNDARY_RADIUS = 5500
const MOUSE_SENSITIVITY = 0.002
const PITCH_LIMIT = 85 * (Math.PI / 180) // 85 degrees in radians
const BOUNDARY_CENTER = new THREE.Vector3(1835, 0, -260)

// Raycasting
const RAY_ORIGIN_OFFSET = 500 // cast from this far above the player
const RAY_LENGTH = 2000       // max distance to search for ground

export default function FPSControls({ forestScene, onLockChange }) {
  const controlsRef = useRef()
  const { camera } = useThree()

  // Movement state
  const keys = useRef({ w: false, a: false, s: false, d: false, shift: false })
  const velocity = useRef(new THREE.Vector3(0, 0, 0))
  const isGrounded = useRef(true)
  const lastGroundY = useRef(0)

  // Raycaster for ground detection
  const raycaster = useRef(new THREE.Raycaster())
  const rayDirection = useRef(new THREE.Vector3(0, -1, 0))

  // Reusable vectors (avoid allocation per frame)
  const forward = useRef(new THREE.Vector3())
  const right = useRef(new THREE.Vector3())
  const moveDir = useRef(new THREE.Vector3())

  // Key handlers
  useEffect(() => {
    const onKeyDown = (e) => {
      switch (e.code) {
        case 'KeyW': keys.current.w = true; break
        case 'KeyA': keys.current.a = true; break
        case 'KeyS': keys.current.s = true; break
        case 'KeyD': keys.current.d = true; break
        case 'ShiftLeft':
        case 'ShiftRight': keys.current.shift = true; break
        case 'Space':
          if (isGrounded.current) {
            velocity.current.y = JUMP_FORCE
            isGrounded.current = false
          }
          e.preventDefault()
          break
      }
    }

    const onKeyUp = (e) => {
      switch (e.code) {
        case 'KeyW': keys.current.w = false; break
        case 'KeyA': keys.current.a = false; break
        case 'KeyS': keys.current.s = false; break
        case 'KeyD': keys.current.d = false; break
        case 'ShiftLeft':
        case 'ShiftRight': keys.current.shift = false; break
      }
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [])

  // Lock/unlock callbacks
  const handleLock = useCallback(() => {
    if (onLockChange) onLockChange(true)
  }, [onLockChange])

  const handleUnlock = useCallback(() => {
    if (onLockChange) onLockChange(false)
    // Reset keys on unlock so player doesn't drift
    keys.current = { w: false, a: false, s: false, d: false, shift: false }
  }, [onLockChange])

  // Ground raycast helper
  const getGroundHeight = useCallback((x, z) => {
    if (!forestScene) return null

    raycaster.current.set(
      new THREE.Vector3(x, camera.position.y + RAY_ORIGIN_OFFSET, z),
      rayDirection.current
    )
    raycaster.current.far = RAY_LENGTH + RAY_ORIGIN_OFFSET

    const meshes = []
    forestScene.traverse((child) => {
      if (child.isMesh) meshes.push(child)
    })

    const intersects = raycaster.current.intersectObjects(meshes, false)
    if (intersects.length > 0) {
      // Return the closest hit below the player (highest ground point)
      return intersects[0].point.y
    }
    return null
  }, [forestScene, camera])

  // Main movement loop
  useFrame((_, delta) => {
    if (!controlsRef.current?.isLocked) return

    // Clamp delta to avoid huge jumps on tab-switch
    const dt = Math.min(delta, 0.1)

    // --- Horizontal movement ---
    const speed = keys.current.shift ? SPRINT_SPEED : MOVE_SPEED

    // Get camera forward/right on XZ plane
    camera.getWorldDirection(forward.current)
    forward.current.y = 0
    forward.current.normalize()

    right.current.crossVectors(forward.current, camera.up).normalize()

    moveDir.current.set(0, 0, 0)
    if (keys.current.w) moveDir.current.add(forward.current)
    if (keys.current.s) moveDir.current.sub(forward.current)
    if (keys.current.a) moveDir.current.sub(right.current)
    if (keys.current.d) moveDir.current.add(right.current)

    if (moveDir.current.lengthSq() > 0) {
      moveDir.current.normalize()
      camera.position.x += moveDir.current.x * speed * dt
      camera.position.z += moveDir.current.z * speed * dt
    }

    // --- Boundary enforcement ---
    const dx = camera.position.x - BOUNDARY_CENTER.x
    const dz = camera.position.z - BOUNDARY_CENTER.z
    const distFromCenter = Math.sqrt(dx * dx + dz * dz)
    if (distFromCenter > BOUNDARY_RADIUS) {
      const scale = BOUNDARY_RADIUS / distFromCenter
      camera.position.x = BOUNDARY_CENTER.x + dx * scale
      camera.position.z = BOUNDARY_CENTER.z + dz * scale
    }

    // --- Vertical: gravity + ground detection ---
    velocity.current.y -= GRAVITY * dt
    camera.position.y += velocity.current.y * dt

    const groundY = getGroundHeight(camera.position.x, camera.position.z)
    if (groundY !== null) {
      lastGroundY.current = groundY
      const targetY = groundY + EYE_HEIGHT

      if (camera.position.y <= targetY) {
        camera.position.y = targetY
        velocity.current.y = 0
        isGrounded.current = true
      }
    } else {
      // No ground found — use last known ground height
      const targetY = lastGroundY.current + EYE_HEIGHT
      if (camera.position.y <= targetY) {
        camera.position.y = targetY
        velocity.current.y = 0
        isGrounded.current = true
      }
    }
  })

  return (
    <PointerLockControls
      ref={controlsRef}
      pointerSpeed={MOUSE_SENSITIVITY}
      minPolarAngle={Math.PI / 2 - PITCH_LIMIT}
      maxPolarAngle={Math.PI / 2 + PITCH_LIMIT}
      onLock={handleLock}
      onUnlock={handleUnlock}
    />
  )
}
