import { useEffect, useRef } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PATH_POINTS = [
  new THREE.Vector3(0, 3, 10),       // Start: above water, looking at the boat
  new THREE.Vector3(0, 1.5, 5),      // Approaching the boat
  new THREE.Vector3(0, 0.5, 2.5),    // Right next to the boat, almost at water level
  new THREE.Vector3(0.5, 0, 1.5),    // At the boat, water surface
  new THREE.Vector3(1, -1, 1),       // Slipping just below the surface
  new THREE.Vector3(2, -4, 2),       // Descending under the boat
  new THREE.Vector3(4, -8, 0),       // About coral zone (-8)
  new THREE.Vector3(1, -14, -2),     // Transition
  new THREE.Vector3(-2, -20, -1),    // Projects coral zone (-20)
  new THREE.Vector3(0, -26, -3),     // Transition
  new THREE.Vector3(3, -32, 0),      // Resume coral zone (-32)
  new THREE.Vector3(1, -38, -2),     // Transition
  new THREE.Vector3(-1, -44, -2),    // Certifications coral zone (-44)
  new THREE.Vector3(0, -50, -1),     // Transition
  new THREE.Vector3(1, -56, 2),      // Contact coral zone (-56)
]

export default function CameraPath() {
  const { camera } = useThree()
  const progressRef = useRef({ value: 0 })
  const curveRef = useRef(null)

  useEffect(() => {
    curveRef.current = new THREE.CatmullRomCurve3(PATH_POINTS, false, 'catmullrom', 0.5)

    const scrollTrigger = gsap.to(progressRef.current, {
      value: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: '.scroll-track',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      },
    })

    return () => {
      scrollTrigger.kill()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  useFrame(() => {
    if (!curveRef.current) return

    const progress = progressRef.current.value
    const point = curveRef.current.getPointAt(progress)

    const lookAheadProgress = Math.min(progress + 0.02, 1)
    const lookAt = curveRef.current.getPointAt(lookAheadProgress)

    // Set position directly — GSAP scrub handles all smoothing
    camera.position.copy(point)
    camera.lookAt(lookAt)
  })

  return null
}
