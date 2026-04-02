import { useEffect, useRef, useCallback, useState } from 'react'
import { RACK_SECTIONS, INTERACT_DISTANCE } from '../scene/RackBillboard'
import * as THREE from 'three'

const TOUCH_LOOK_SPEED = 0.003
const JOYSTICK_MAX_DIST = 50 // pixels — max drag distance for full speed

export default function MobileTouchControls({ mobileInput, cameraRef, expandedSection, onInteract, onPause }) {
  const lookTouchId = useRef(null)
  const lastLookPos = useRef({ x: 0, y: 0 })
  const [nearestRack, setNearestRack] = useState(null)

  // --- Left side: custom touch joystick (same pattern as right-side look) ---
  const joystickTouchId = useRef(null)
  const joystickStart = useRef({ x: 0, y: 0 })
  const [joystickPos, setJoystickPos] = useState(null) // { ox, oy, cx, cy } for visual

  const handleJoystickStart = useCallback((e) => {
    if (joystickTouchId.current !== null) return
    const touch = e.changedTouches[0]
    joystickTouchId.current = touch.identifier
    joystickStart.current = { x: touch.clientX, y: touch.clientY }
    setJoystickPos({ ox: touch.clientX, oy: touch.clientY, cx: touch.clientX, cy: touch.clientY })
    e.preventDefault()
  }, [])

  const handleJoystickMove = useCallback((e) => {
    for (let i = 0; i < e.changedTouches.length; i++) {
      const touch = e.changedTouches[i]
      if (touch.identifier !== joystickTouchId.current) continue

      const dx = touch.clientX - joystickStart.current.x
      const dy = touch.clientY - joystickStart.current.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      const force = Math.min(dist / JOYSTICK_MAX_DIST, 1)

      setJoystickPos(prev => prev ? { ...prev, cx: touch.clientX, cy: touch.clientY } : null)

      if (dist > 5) { // small dead zone in pixels
        mobileInput.current.moveX = (dx / dist) * force   // right = positive
        mobileInput.current.moveZ = -(dy / dist) * force  // up on screen = forward = positive
      } else {
        mobileInput.current.moveX = 0
        mobileInput.current.moveZ = 0
      }
    }
    e.preventDefault()
  }, [mobileInput])

  const handleJoystickEnd = useCallback((e) => {
    for (let i = 0; i < e.changedTouches.length; i++) {
      if (e.changedTouches[i].identifier === joystickTouchId.current) {
        joystickTouchId.current = null
        mobileInput.current.moveX = 0
        mobileInput.current.moveZ = 0
        setJoystickPos(null)
      }
    }
  }, [mobileInput])

  // Left-side touch listeners
  const leftRef = useRef(null)
  useEffect(() => {
    const el = leftRef.current
    if (!el) return
    el.addEventListener('touchstart', handleJoystickStart, { passive: false })
    el.addEventListener('touchmove', handleJoystickMove, { passive: false })
    el.addEventListener('touchend', handleJoystickEnd, { passive: false })
    el.addEventListener('touchcancel', handleJoystickEnd, { passive: false })
    return () => {
      el.removeEventListener('touchstart', handleJoystickStart)
      el.removeEventListener('touchmove', handleJoystickMove)
      el.removeEventListener('touchend', handleJoystickEnd)
      el.removeEventListener('touchcancel', handleJoystickEnd)
    }
  }, [handleJoystickStart, handleJoystickMove, handleJoystickEnd])

  // --- Right side: touch-drag camera look ---
  const handleTouchStart = useCallback((e) => {
    if (lookTouchId.current !== null) return
    const touch = e.changedTouches[0]
    lookTouchId.current = touch.identifier
    lastLookPos.current = { x: touch.clientX, y: touch.clientY }
    e.preventDefault()
  }, [])

  const handleTouchMove = useCallback((e) => {
    for (let i = 0; i < e.changedTouches.length; i++) {
      const touch = e.changedTouches[i]
      if (touch.identifier !== lookTouchId.current) continue

      const deltaX = touch.clientX - lastLookPos.current.x
      const deltaY = touch.clientY - lastLookPos.current.y
      lastLookPos.current = { x: touch.clientX, y: touch.clientY }

      mobileInput.current.lookDeltaX += deltaX * TOUCH_LOOK_SPEED
      mobileInput.current.lookDeltaY += deltaY * TOUCH_LOOK_SPEED
    }
    e.preventDefault()
  }, [mobileInput])

  const handleTouchEnd = useCallback((e) => {
    for (let i = 0; i < e.changedTouches.length; i++) {
      if (e.changedTouches[i].identifier === lookTouchId.current) {
        lookTouchId.current = null
      }
    }
  }, [])

  // Right-side touch listeners
  const rightRef = useRef(null)
  useEffect(() => {
    const el = rightRef.current
    if (!el) return
    el.addEventListener('touchstart', handleTouchStart, { passive: false })
    el.addEventListener('touchmove', handleTouchMove, { passive: false })
    el.addEventListener('touchend', handleTouchEnd, { passive: false })
    el.addEventListener('touchcancel', handleTouchEnd, { passive: false })
    return () => {
      el.removeEventListener('touchstart', handleTouchStart)
      el.removeEventListener('touchmove', handleTouchMove)
      el.removeEventListener('touchend', handleTouchEnd)
      el.removeEventListener('touchcancel', handleTouchEnd)
    }
  }, [handleTouchStart, handleTouchMove, handleTouchEnd])

  // Check proximity to racks
  useEffect(() => {
    if (!cameraRef.current) return
    const interval = setInterval(() => {
      const cam = cameraRef.current
      if (!cam) return
      let nearest = null
      let nearestDist = INTERACT_DISTANCE
      for (const section of RACK_SECTIONS) {
        const pos = new THREE.Vector3(...section.position)
        const dist = cam.position.distanceTo(pos)
        if (dist < nearestDist) {
          nearestDist = dist
          nearest = section
        }
      }
      setNearestRack(nearest)
    }, 200)
    return () => clearInterval(interval)
  }, [cameraRef])

  const handleInteract = useCallback(() => {
    if (expandedSection) {
      onInteract(null)
    } else if (nearestRack) {
      onInteract(nearestRack.id)
    }
  }, [expandedSection, nearestRack, onInteract])

  const showInteractBtn = nearestRack && !expandedSection
  const showCloseBtn = !!expandedSection

  // Joystick visual: teal ring + knob
  const joystickVisual = joystickPos && (
    <>
      {/* Outer ring */}
      <div style={{
        position: 'fixed',
        left: joystickPos.ox - 50,
        top: joystickPos.oy - 50,
        width: 100, height: 100,
        borderRadius: '50%',
        border: '2px solid rgba(13, 148, 136, 0.4)',
        pointerEvents: 'none',
        zIndex: 150,
      }} />
      {/* Knob */}
      <div style={{
        position: 'fixed',
        left: joystickPos.cx - 20,
        top: joystickPos.cy - 20,
        width: 40, height: 40,
        borderRadius: '50%',
        background: 'rgba(13, 148, 136, 0.6)',
        pointerEvents: 'none',
        zIndex: 150,
      }} />
    </>
  )

  return (
    <>
      <div className="mobile-touch-overlay" style={{
        pointerEvents: expandedSection ? 'none' : 'auto',
        visibility: expandedSection ? 'hidden' : 'visible',
      }}>
        <div className="mobile-touch-left" ref={leftRef} />
        <div className="mobile-touch-right" ref={rightRef} />
      </div>

      {joystickVisual}

      {showInteractBtn && (
        <button className="mobile-interact-btn" onClick={handleInteract}>
          Interact
        </button>
      )}

      {showCloseBtn && (
        <button className="mobile-interact-btn" onClick={handleInteract}>
          Close
        </button>
      )}

      <button className="mobile-pause-btn" onClick={onPause} style={{
        display: expandedSection ? 'none' : 'flex',
      }}>
        ⏸
      </button>
    </>
  )
}
