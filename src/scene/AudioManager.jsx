import { useEffect, useRef } from 'react'

const AMBIENT_BASE = 0.05
const FOOTSTEPS_BASE = 0.1

export default function AudioManager({ isLocked, isMoving, masterVolume, expandedSection }) {
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

  // Ambient: play when in scene (locked OR viewing a panel), pause on landing screen
  const inScene = isLocked || !!expandedSection
  useEffect(() => {
    const ambient = ambientRef.current
    if (!ambient) return

    if (inScene) {
      ambient.play().catch(() => {})
    } else {
      ambient.pause()
    }
  }, [inScene])

  // Footsteps: play when moving, pause when stopped or viewing panel
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
