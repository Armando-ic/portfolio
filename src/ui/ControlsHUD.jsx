import { useState, useRef } from 'react'

export default function ControlsHUD({ isLocked, hasEntered, masterVolume, onVolumeChange, onResume, onExit }) {
  const [muted, setMuted] = useState(false)
  const lastVolume = useRef(masterVolume || 0.5)

  const handleMute = () => {
    if (muted) {
      setMuted(false)
      onVolumeChange(lastVolume.current)
    } else {
      lastVolume.current = masterVolume || 0.5
      setMuted(true)
      onVolumeChange(0)
    }
  }

  const handleSlider = (e) => {
    const val = parseFloat(e.target.value)
    setMuted(val === 0)
    if (val > 0) lastVolume.current = val
    onVolumeChange(val)
  }

  if (!hasEntered) return null

  const isPaused = hasEntered && !isLocked

  return (
    <div className="controls-hud">
      <div className="controls-hud-section">
        <div className="controls-hud-row"><kbd>W A S D</kbd> Move</div>
        <div className="controls-hud-row"><kbd>Mouse</kbd> Look</div>
        <div className="controls-hud-row"><kbd>Shift</kbd> Sprint</div>
        <div className="controls-hud-row"><kbd>Space</kbd> Jump</div>
        <div className="controls-hud-row"><kbd>E</kbd> Interact</div>
        <div className="controls-hud-row"><kbd>Esc</kbd> Pause</div>
      </div>
      <div className="controls-hud-divider" />
      <div className="controls-hud-audio">
        <div className="controls-hud-audio-row">
          <button className="controls-hud-mute" onClick={handleMute}>
            {muted ? '\uD83D\uDD07' : '\uD83D\uDD0A'}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={muted ? 0 : (masterVolume || 0.5)}
            onChange={handleSlider}
            className="controls-hud-slider"
          />
        </div>
      </div>
      {isPaused && (
        <>
          <div className="controls-hud-divider" />
          <div className="controls-hud-pause-buttons">
            <button className="controls-hud-btn controls-hud-btn--resume" onClick={onResume}>
              Resume
            </button>
            <button className="controls-hud-btn controls-hud-btn--exit" onClick={onExit}>
              Main Menu
            </button>
          </div>
        </>
      )}
    </div>
  )
}
