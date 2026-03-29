import { useEffect, useRef } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Shallow reef: descend to floor (~y=-6), then wind horizontally through the reef
const PATH_POINTS = [
  // Surface — above water, looking at boat
  new THREE.Vector3(0, 5, 18),
  new THREE.Vector3(0, 3, 12),
  new THREE.Vector3(0, 1, 7),

  // Descent to reef floor
  new THREE.Vector3(0, -2, 3),
  new THREE.Vector3(0, -4, -1),
  new THREE.Vector3(1, -5.5, -4),       // About coral — first stop during descent

  // Level out and begin horizontal winding path along the reef floor
  new THREE.Vector3(2, -6, -8),
  new THREE.Vector3(4, -6, -12),
  new THREE.Vector3(5, -6, -16),        // Projects coral — right side of reef

  // Curve left
  new THREE.Vector3(4, -6, -20),
  new THREE.Vector3(2, -6, -24),
  new THREE.Vector3(-1, -6, -28),       // Resume coral — center-left

  // Curve right
  new THREE.Vector3(-2, -6, -32),
  new THREE.Vector3(0, -6, -36),
  new THREE.Vector3(3, -6, -40),        // Certifications coral — right side

  // Curve left toward Contact
  new THREE.Vector3(2, -6, -44),
  new THREE.Vector3(0, -6, -48),
  new THREE.Vector3(-2, -6, -52),       // Contact coral — end of reef trail
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

    // Look ahead on path; at the end, look at the Contact coral
    const contactCoral = new THREE.Vector3(-2, -6, -52)
    const pathLookAt = curveRef.current.getPointAt(Math.min(progress + 0.02, 0.98))

    const lookAt = new THREE.Vector3()
    if (progress > 0.85) {
      const blend = (progress - 0.85) / 0.15
      lookAt.lerpVectors(pathLookAt, contactCoral, blend)
    } else {
      lookAt.copy(pathLookAt)
    }

    camera.position.copy(point)
    camera.lookAt(lookAt)
  })

  return null
}
