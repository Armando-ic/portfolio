import { useState, useEffect } from 'react'

export default function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof navigator === 'undefined') return false
    return navigator.maxTouchPoints > 0 && window.innerWidth < 1024
  })

  useEffect(() => {
    const check = () => {
      setIsMobile(navigator.maxTouchPoints > 0 && window.innerWidth < 1024)
    }
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return isMobile
}
