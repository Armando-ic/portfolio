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
  new THREE.Vector3(2, -2, 2),       // Descending under the boat
  new THREE.Vector3(4, -5, 1),
  new THREE.Vector3(1, -8, -1),
  new THREE.Vector3(-2, -12, -1),
  new THREE.Vector3(0, -16, -2),
  new THREE.Vector3(3, -20, 0),
  new THREE.Vector3(1, -24, -2),
  new THREE.Vector3(-1, -28, -2),
  new THREE.Vector3(0, -32, -1),
  new THREE.Vector3(1, -35, 2),
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
