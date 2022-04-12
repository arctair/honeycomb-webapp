import { Canvas } from '@react-three/fiber'
import EventEmitter from 'events'
import CameraControls from './CameraControls'
import { Tile } from './types'
import useChunk from './useChunk'
import ZoomControls from './ZoomControls'

export default function App() {
  const events = new EventEmitter()
  return (
    <>
      <ZoomControls onZoom={(delta) => events.emit('zoom', delta)} />
      <Scene events={events} />
    </>
  )
}

type SceneProps = { events: EventEmitter }
function Scene({ events }: SceneProps) {
  return (
    <Canvas>
      <CameraControls events={events} />
      <Chunk />
      <pointLight position={[4, 4, 5]} />
      <ambientLight />
      <color attach="background" args={['#777777']} />
    </Canvas>
  )
}

function Chunk() {
  const tiles = useChunk(32)
  return (
    <>
      {tiles.map((tile) => (
        <TileComponent tile={tile} key={tile.id} />
      ))}
    </>
  )
}

interface TileComponentProps {
  tile: Tile
}
function TileComponent({ tile: { x, z } }: TileComponentProps) {
  const color =
    (x + z) % 2 === 0 ? 'hsl(123, 45%, 45%)' : 'hsl(123, 45%, 40%)'
  return (
    <mesh position={[x + 0.5, 0, z + 0.5]}>
      <meshStandardMaterial color={color} />
      <boxGeometry args={[1, 1, 1]} />
    </mesh>
  )
}
