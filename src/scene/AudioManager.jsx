import { useEffect, useRef } from 'react'

const AMBIENT_BASE = 0.05
const FOOTSTEPS_BASE = 0.1

export default function AudioManager({ isLocked, isMoving, masterVolume }) {
  const ambientRef = useRef(null)
  const footstepsRef = useRef(null)

  // Initialize audio elements once
  useEffect(() => {
    const ambient = new Audio('/audio/server-ambient.mp3')
    ambient.loop = true
    ambient.volume = AMBIENT_BASE
    ambientRef.current = ambient

    const footsteps = new Audio('/audio/footsteps.mp3')
    footsteps.loop = true
    footsteps.volume = FOOTSTEPS_BASE
    footstepsRef.current = footsteps

    return () => {
      ambient.pause()
      footsteps.pause()
    }
  }, [])

  // Update volumes when master volume changes
  useEffect(() => {
    if (ambientRef.current) ambientRef.current.volume = AMBIENT_BASE * masterVolume
    if (footstepsRef.current) footstepsRef.current.volume = FOOTSTEPS_BASE * masterVolume
  }, [masterVolume])

  // Ambient: play when locked, pause on landing screen
  useEffect(() => {
    const ambient = ambientRef.current
    if (!ambient) return

    if (isLocked) {
      ambient.play().catch(() => {})
    } else {
      ambient.pause()
    }
  }, [isLocked])

  // Footsteps: play when moving, pause when stopped
  useEffect(() => {
    const footsteps = footstepsRef.current
    if (!footsteps) return

    if (isLocked && isMoving) {
      footsteps.play().catch(() => {})
    } else {
      footsteps.pause()
    }
  }, [isLocked, isMoving])

  return null
}
