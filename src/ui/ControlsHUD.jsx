import { useState, useEffect, useRef } from 'react'

export default function ControlsHUD({ isLocked }) {
  const [visible, setVisible] = useState(false)
  const hasShown = useRef(false)
  const timerRef = useRef(null)

  useEffect(() => {
    if (isLocked && !hasShown.current) {
      hasShown.current = true
      setVisible(true)

      timerRef.current = setTimeout(() => {
        setVisible(false)
      }, 5000)
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [isLocked])

  if (!visible) return null

  return (
    <div className="controls-hud">
      <div className="controls-hud-row"><kbd>W A S D</kbd> Move</div>
      <div className="controls-hud-row"><kbd>Mouse</kbd> Look</div>
      <div className="controls-hud-row"><kbd>Shift</kbd> Sprint</div>
      <div className="controls-hud-row"><kbd>Space</kbd> Jump</div>
      <div className="controls-hud-row"><kbd>E</kbd> Interact</div>
      <div className="controls-hud-row"><kbd>Esc</kbd> Pause</div>
    </div>
  )
}
