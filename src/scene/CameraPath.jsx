import { useEffect, useRef } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PATH_POINTS = [
  new THREE.Vector3(0, 2, 8),
  new THREE.Vector3(2, -3, 4),
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
        scrub: 1.5,
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

    camera.position.lerp(point, 0.1)
    camera.lookAt(lookAt)
  })

  return null
}
