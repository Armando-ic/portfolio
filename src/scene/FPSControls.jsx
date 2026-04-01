import { useRef, useEffect, useCallback } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { PointerLockControls } from '@react-three/drei'
import * as THREE from 'three'

// --- Tunable constants ---
const MOVE_SPEED = 2.0
const SPRINT_SPEED = 4.0
const JUMP_FORCE = 3.0
const GRAVITY = 8.0
const EYE_HEIGHT = 1.6
const BOUNDARY_RADIUS = 50
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

// Debug position display
function useDebugPosition(camera) {
  useFrame(() => {
    const el = document.getElementById('debug-pos')
    if (el) {
      el.textContent = `X: ${camera.position.x.toFixed(3)}  Y: ${camera.position.y.toFixed(3)}  Z: ${camera.position.z.toFixed(3)}`
    }
  })
}

export default function FPSControls({ forestScene, onLockChange, onMovingChange, enabled = true }) {
  const controlsRef = useRef()
  const { camera } = useThree()
  useDebugPosition(camera)
  const wasMoving = useRef(false)

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

  // Collision check — cast rays at multiple heights to catch walls/racks
  const collisionRaycaster = useRef(new THREE.Raycaster())
  const collisionDir = useRef(new THREE.Vector3())
  const collisionOrigin = useRef(new THREE.Vector3())
  const PLAYER_RADIUS = 0.3
  const COLLISION_HEIGHTS = [0.3, 0.8, 1.4] // knee, waist, chest height

  const checkCollision = useCallback((fromX, fromZ, toX, toZ) => {
    if (walkableMeshes.current.length === 0) return false

    const dx = toX - fromX
    const dz = toZ - fromZ
    const dist = Math.sqrt(dx * dx + dz * dz)
    if (dist < 0.001) return false

    collisionDir.current.set(dx / dist, 0, dz / dist)

    const feetY = camera.position.y - EYE_HEIGHT
    for (const h of COLLISION_HEIGHTS) {
      collisionOrigin.current.set(fromX, feetY + h, fromZ)
      collisionRaycaster.current.set(collisionOrigin.current, collisionDir.current)
      collisionRaycaster.current.far = dist + PLAYER_RADIUS

      const hits = collisionRaycaster.current.intersectObjects(walkableMeshes.current, false)
      if (hits.length > 0 && hits[0].distance < dist + PLAYER_RADIUS) {
        return true
      }
    }
    return false
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

    const isMoving = moveDir.current.lengthSq() > 0
    if (isMoving) {
      moveDir.current.normalize()
      const newX = camera.position.x + moveDir.current.x * speed * dt
      const newZ = camera.position.z + moveDir.current.z * speed * dt

      if (!checkCollision(camera.position.x, camera.position.z, newX, newZ)) {
        camera.position.x = newX
        camera.position.z = newZ
      }
    }

    // Report movement state changes
    if (isMoving !== wasMoving.current) {
      wasMoving.current = isMoving
      if (onMovingChange) onMovingChange(isMoving)
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

  if (!enabled) return null

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
