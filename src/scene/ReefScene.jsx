import Lighting from './Lighting'
import Ocean from './Ocean'
import Boat from './Boat'
import Corals from './Corals'
import ReefDecor from './ReefDecor'
import ReefFish from './ReefFish'
import CameraPath from './CameraPath'

export default function ReefScene({ onCoralClick }) {
  return (
    <>
      <Lighting />
      <Ocean />
      <Boat />
      <Corals onCoralClick={onCoralClick} />
      <ReefDecor />
      <ReefFish />
      <CameraPath />
    </>
  )
}
