import { useEffect, useRef, useCallback, useState } from 'react'
import nipplejs from 'nipplejs'
import { RACK_SECTIONS, INTERACT_DISTANCE } from '../scene/RackBillboard'
import * as THREE from 'three'

const TOUCH_LOOK_SPEED = 0.003

export default function MobileTouchControls({ mobileInput, cameraRef, expandedSection, onInteract, onPause, hasEntered }) {
  const joystickContainerRef = useRef(null)
  const lookTouchId = useRef(null)
  const lastLookPos = useRef({ x: 0, y: 0 })
  const [nearestRack, setNearestRack] = useState(null)

  // Set up nipplejs joystick
  useEffect(() => {
    if (!joystickContainerRef.current) return

    const joystick = nipplejs.create({
      zone: joystickContainerRef.current,
      mode: 'dynamic',
      position: { left: '50%', top: '50%' },
      color: 'rgba(13, 148, 136, 0.5)',
      size: 120,
      restOpacity: 0.3,
      fadeTime: 200,
    })

    joystick.on('move', (_, data) => {
      if (!data.direction) return
      const force = Math.min(data.force, 1)
      const rad = data.angle.radian
      mobileInput.current.moveX = Math.cos(rad) * force // left-right (cos: right=1, left=-1)
      mobileInput.current.moveZ = Math.sin(rad) * force // forward-back (sin: up=1=forward)
    })

    joystick.on('end', () => {
      mobileInput.current.moveX = 0
      mobileInput.current.moveZ = 0
    })

    return () => joystick.destroy()
  }, [mobileInput])

  // Touch-look handler (right side)
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

  return (
    <>
      {!expandedSection && (
        <div className="mobile-touch-overlay">
          <div className="mobile-touch-left" ref={joystickContainerRef} />
          <div className="mobile-touch-right" ref={rightRef} />
        </div>
      )}

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

      {!expandedSection && (
        <button className="mobile-pause-btn" onClick={onPause}>
          ⏸
        </button>
      )}
    </>
  )
}
