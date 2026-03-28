import Lighting from './Lighting'
import Ocean from './Ocean'
import Boat from './Boat'
import Corals from './Corals'
import CameraPath from './CameraPath'

export default function ReefScene({ onCoralClick }) {
  return (
    <>
      <Lighting />
      <Ocean />
      <Boat />
      <Corals onCoralClick={onCoralClick} />
      <CameraPath />
    </>
  )
}
