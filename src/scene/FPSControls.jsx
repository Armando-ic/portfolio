import { useRef, useEffect, useCallback } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { PointerLockControls } from '@react-three/drei'
import * as THREE from 'three'

// --- Tunable constants ---
const MOVE_SPEED = 0.15
const SPRINT_SPEED = 0.3
const JUMP_FORCE = 0.4
const GRAVITY = 1.2
const EYE_HEIGHT = 0.12
const BOUNDARY_RADIUS = 2.0
const POINTER_SPEED = 1.0
const PITCH_LIMIT = 85 * (Math.PI / 180)
const BOUNDARY_CENTER = new THREE.Vector3(0, 0, 0)

// --- Mesh classification by name prefix ---
const PASSTHROUGH_PREFIXES = ['fire', 'flame', 'glasslight']

function classifyMesh(mesh) {
  let node = mesh
  while (node) {
    const name = node.name || ''
    for (const prefix of PASSTHROUGH_PREFIXES) {
      if (name.startsWith(prefix)) return 'passthrough'
    }
    node = node.parent
  }
  return 'solid'
}

export default function FPSControls({ forestScene, onLockChange }) {
  const controlsRef = useRef()
  const { camera } = useThree()

  // Movement state
  const keys = useRef({ w: false, a: false, s: false, d: false, shift: false })
  const velocity = useRef(new THREE.Vector3(0, 0, 0))
  const isGrounded = useRef(true)
  const lastGroundY = useRef(0)

  // Raycaster for ground detection
  const groundRaycaster = useRef(new THREE.Raycaster())
  const rayDown = useRef(new THREE.Vector3(0, -1, 0))

  // Reusable vectors
  const forward = useRef(new THREE.Vector3())
  const right = useRef(new THREE.Vector3())
  const moveDir = useRef(new THREE.Vector3())
  const rayOrigin = useRef(new THREE.Vector3())
  const prevPosition = useRef(new THREE.Vector3())

  // Mesh cache
  const walkableMeshes = useRef([])

  useEffect(() => {
    if (!forestScene) { walkableMeshes.current = []; return }
    const meshes = []
    forestScene.traverse((child) => {
      if (child.isMesh && classifyMesh(child) !== 'passthrough') {
        meshes.push(child)
      }
    })
    walkableMeshes.current = meshes
  }, [forestScene])

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
    keys.current = { w: false, a: false, s: false, d: false, shift: false }
  }, [onLockChange])

  // Ground raycast
  const getGroundHeight = useCallback((x, z) => {
    if (walkableMeshes.current.length === 0) return null

    rayOrigin.current.set(x, camera.position.y + 0.5, z)
    groundRaycaster.current.set(rayOrigin.current, rayDown.current)
    groundRaycaster.current.far = 3.0

    const intersects = groundRaycaster.current.intersectObjects(walkableMeshes.current, false)
    if (intersects.length === 0) return null

    const feetY = camera.position.y - EYE_HEIGHT
    for (let i = 0; i < intersects.length; i++) {
      if (intersects[i].point.y <= feetY + 0.05) {
        return intersects[i].point.y
      }
    }
    return null
  }, [camera])

  // Main movement loop
  useFrame((_, delta) => {
    if (!controlsRef.current?.isLocked) return

    const dt = Math.min(delta, 0.1)
    const speed = keys.current.shift ? SPRINT_SPEED : MOVE_SPEED

    camera.getWorldDirection(forward.current)
    forward.current.y = 0
    forward.current.normalize()
    right.current.crossVectors(forward.current, camera.up).normalize()

    moveDir.current.set(0, 0, 0)
    if (keys.current.w) moveDir.current.add(forward.current)
    if (keys.current.s) moveDir.current.sub(forward.current)
    if (keys.current.a) moveDir.current.sub(right.current)
    if (keys.current.d) moveDir.current.add(right.current)

    prevPosition.current.copy(camera.position)

    if (moveDir.current.lengthSq() > 0) {
      moveDir.current.normalize()
      camera.position.x += moveDir.current.x * speed * dt
      camera.position.z += moveDir.current.z * speed * dt
    }

    // --- Boundary enforcement ---
    const bx = camera.position.x - BOUNDARY_CENTER.x
    const bz = camera.position.z - BOUNDARY_CENTER.z
    const distFromCenter = Math.sqrt(bx * bx + bz * bz)
    if (distFromCenter > BOUNDARY_RADIUS) {
      const scale = BOUNDARY_RADIUS / distFromCenter
      camera.position.x = BOUNDARY_CENTER.x + bx * scale
      camera.position.z = BOUNDARY_CENTER.z + bz * scale
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
      const fallbackY = lastGroundY.current + EYE_HEIGHT
      if (camera.position.y <= fallbackY) {
        camera.position.y = fallbackY
        velocity.current.y = 0
        isGrounded.current = true
      }
    }
  })

  return (
    <PointerLockControls
      ref={controlsRef}
      pointerSpeed={POINTER_SPEED}
      minPolarAngle={Math.PI / 2 - PITCH_LIMIT}
      maxPolarAngle={Math.PI / 2 + PITCH_LIMIT}
      onLock={handleLock}
      onUnlock={handleUnlock}
    />
  )
}
