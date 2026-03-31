import { useRef, useEffect, useCallback } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { PointerLockControls } from '@react-three/drei'
import * as THREE from 'three'

// --- Tunable constants ---
const MOVE_SPEED = 300
const SPRINT_SPEED = 600
const JUMP_FORCE = 250
const GRAVITY = 600
const EYE_HEIGHT = 200
const PLAYER_RADIUS = 40 // horizontal collision radius
const BOUNDARY_RADIUS = 5500
const POINTER_SPEED = 1.0
const PITCH_LIMIT = 85 * (Math.PI / 180)
const BOUNDARY_CENTER = new THREE.Vector3(1835, 0, -260)

// Raycasting
const RAY_ORIGIN_OFFSET = 500
const RAY_LENGTH = 2000
const COLLISION_RAY_HEIGHT = 80 // cast horizontal rays from this height above feet

// --- Mesh classification by name prefix ---
// Passthrough: walk through these, ignore for all collision/ground
const PASSTHROUGH_PREFIXES = ['Grass', 'Ronce', 'Champi', 'Pentacle', 'CampFire']
// Trees: canopy is passthrough, but we rely on trunk geometry for collision
// Arbre and tree nodes contain both trunk and canopy in one mesh, so we skip them
// for ground raycast but include them in collision
const TREE_PREFIXES = ['Arbre', 'tree']

function classifyMesh(mesh) {
  // Walk up the parent chain to find a named node
  let node = mesh
  while (node) {
    const name = node.name || ''
    // Check passthrough
    for (const prefix of PASSTHROUGH_PREFIXES) {
      if (name.startsWith(prefix)) return 'passthrough'
    }
    // Check tree
    for (const prefix of TREE_PREFIXES) {
      if (name.startsWith(prefix)) return 'tree'
    }
    // Ground mesh
    if (name === 'Ground' || name.startsWith('Ground_')) return 'ground'
    node = node.parent
  }
  return 'solid' // everything else: rocks, fences, walls, lanterns, buildings, etc.
}

export default function FPSControls({ forestScene, onLockChange }) {
  const controlsRef = useRef()
  const { camera } = useThree()

  // Movement state
  const keys = useRef({ w: false, a: false, s: false, d: false, shift: false })
  const velocity = useRef(new THREE.Vector3(0, 0, 0))
  const isGrounded = useRef(true)
  const lastGroundY = useRef(0)

  // Raycasters
  const groundRaycaster = useRef(new THREE.Raycaster())
  const collisionRaycaster = useRef(new THREE.Raycaster())
  const rayDown = useRef(new THREE.Vector3(0, -1, 0))

  // Reusable vectors
  const forward = useRef(new THREE.Vector3())
  const right = useRef(new THREE.Vector3())
  const moveDir = useRef(new THREE.Vector3())
  const rayOrigin = useRef(new THREE.Vector3())
  const prevPosition = useRef(new THREE.Vector3())
  const collisionOrigin = useRef(new THREE.Vector3())
  const collisionDir = useRef(new THREE.Vector3())

  // Categorized mesh caches
  const groundMeshes = useRef([])    // only Ground — for walking on
  const solidMeshes = useRef([])     // rocks, fences, walls, etc — block movement
  const allWalkable = useRef([])     // ground + solid (for ground raycast — walk on top of rocks too)

  useEffect(() => {
    if (!forestScene) {
      groundMeshes.current = []
      solidMeshes.current = []
      allWalkable.current = []
      return
    }
    const ground = []
    const solid = []
    forestScene.traverse((child) => {
      if (!child.isMesh) return
      const category = classifyMesh(child)
      if (category === 'ground') ground.push(child)
      else if (category === 'solid') solid.push(child)
      // 'passthrough' and 'tree' meshes are excluded from both lists
    })
    groundMeshes.current = ground
    solidMeshes.current = solid
    allWalkable.current = [...ground, ...solid]
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

  // Ground raycast — finds walkable surface below player
  const getGroundHeight = useCallback((x, z) => {
    if (allWalkable.current.length === 0) return null

    rayOrigin.current.set(x, camera.position.y + RAY_ORIGIN_OFFSET, z)
    groundRaycaster.current.set(rayOrigin.current, rayDown.current)
    groundRaycaster.current.far = RAY_LENGTH + RAY_ORIGIN_OFFSET

    const intersects = groundRaycaster.current.intersectObjects(allWalkable.current, false)
    if (intersects.length === 0) return null

    // Return the first hit below or near our feet (highest walkable surface)
    const feetY = camera.position.y - EYE_HEIGHT
    for (let i = 0; i < intersects.length; i++) {
      if (intersects[i].point.y <= feetY + 80) {
        return intersects[i].point.y
      }
    }
    return null
  }, [camera])

  // Horizontal collision check — returns true if movement is blocked
  const checkCollision = useCallback((fromX, fromZ, toX, toZ) => {
    if (solidMeshes.current.length === 0) return false

    const dx = toX - fromX
    const dz = toZ - fromZ
    const dist = Math.sqrt(dx * dx + dz * dz)
    if (dist < 0.001) return false

    // Cast a ray from the old position toward the new position at chest height
    const feetY = camera.position.y - EYE_HEIGHT
    collisionOrigin.current.set(fromX, feetY + COLLISION_RAY_HEIGHT, fromZ)
    collisionDir.current.set(dx / dist, 0, dz / dist)

    collisionRaycaster.current.set(collisionOrigin.current, collisionDir.current)
    collisionRaycaster.current.far = dist + PLAYER_RADIUS

    const hits = collisionRaycaster.current.intersectObjects(solidMeshes.current, false)
    return hits.length > 0 && hits[0].distance < dist + PLAYER_RADIUS
  }, [camera])

  // Main movement loop
  useFrame((_, delta) => {
    if (!controlsRef.current?.isLocked) return

    const dt = Math.min(delta, 0.1)

    // --- Horizontal movement ---
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
      const newX = camera.position.x + moveDir.current.x * speed * dt
      const newZ = camera.position.z + moveDir.current.z * speed * dt

      // Check horizontal collision with solid objects
      if (!checkCollision(camera.position.x, camera.position.z, newX, newZ)) {
        camera.position.x = newX
        camera.position.z = newZ
      }
      // If blocked, position stays where it was (slide along wall not implemented)
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
      // No ground found — revert to previous position
      camera.position.x = prevPosition.current.x
      camera.position.z = prevPosition.current.z
      camera.position.y = prevPosition.current.y
      velocity.current.y = 0
      isGrounded.current = true
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
