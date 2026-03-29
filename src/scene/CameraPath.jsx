import { useEffect, useRef } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PATH_POINTS = [
  // Surface approach — start further back, swing wide around the boat
  new THREE.Vector3(0, 4, 14),       // Start: further back, above water
  new THREE.Vector3(0, 2.5, 8),      // Approaching the boat
  new THREE.Vector3(1, 1, 5),        // Angling to the side of the boat
  new THREE.Vector3(3, 0, 3),        // Passing beside the boat (not through it)
  new THREE.Vector3(3, -1, 1),       // Slipping below, still to the side

  // Gentle spiral descent — smooth S-curves
  new THREE.Vector3(2, -3, 0),       // Easing into the dive
  new THREE.Vector3(3, -5.5, 0),     // Curving toward About
  new THREE.Vector3(4, -8, -1),      // About coral zone (-8)
  new THREE.Vector3(3, -11, -2),     // Easing away from About
  new THREE.Vector3(1, -14, -3),     // Gentle transition
  new THREE.Vector3(-1, -17, -3),    // Curving toward Projects
  new THREE.Vector3(-3, -20, -2),    // Projects coral zone (-20)
  new THREE.Vector3(-2, -23, -1),    // Easing away from Projects
  new THREE.Vector3(0, -26, 0),      // Gentle transition
  new THREE.Vector3(2, -29, -1),     // Curving toward Resume
  new THREE.Vector3(4, -31, -1),     // Approaching Resume from front
  new THREE.Vector3(5, -32, -3),     // Sweeping to the side of Resume
  new THREE.Vector3(4, -33, -5),     // Moving behind Resume
  new THREE.Vector3(2, -34, -6),     // Behind Resume, looking back at it
  new THREE.Vector3(1, -36, -5),     // Easing away from behind
  new THREE.Vector3(0, -38, -4),     // Gentle transition
  new THREE.Vector3(-1, -41, -3),    // Curving toward Certs
  new THREE.Vector3(-2, -44, -3),    // Certifications coral zone (-44)
  new THREE.Vector3(-1, -47, -2),    // Easing away from Certs
  new THREE.Vector3(0, -50, -1),     // Gentle transition
  new THREE.Vector3(1, -53, 0),      // Curving toward Contact
  new THREE.Vector3(1, -55, 1),      // At Contact coral
]

export default function CameraPath() {
  const { camera } = useThree()
  const progressRef = useRef({ value: 0 })
  const curveRef = useRef(null)

  useEffect(() => {
    curveRef.current = new THREE.CatmullRomCurve3(PATH_POINTS, false, 'catmullrom', 0.3)

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

    // Smoothly blend lookAt from "ahead on path" to "Contact coral" in the final stretch
    const pathLookAt = curveRef.current.getPointAt(Math.min(progress + 0.02, 0.98))
    const coralLookAt = new THREE.Vector3(1, -56, -2)  // Contact coral position

    const lookAt = new THREE.Vector3()
    if (progress > 0.85) {
      // Blend: 0.85 = 100% path, 1.0 = 100% coral
      const blend = (progress - 0.85) / 0.15
      lookAt.lerpVectors(pathLookAt, coralLookAt, blend)
    } else {
      lookAt.copy(pathLookAt)
    }

    // Set position directly — GSAP scrub handles all smoothing
    camera.position.copy(point)
    camera.lookAt(lookAt)
  })

  return null
}
