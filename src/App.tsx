import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Tile } from './types'
import useChunk from './useChunk'

export default function App() {
  return <Scene />
}

function Scene() {
  return (
    <Canvas camera={{ position: [-10, 10, 0] }}>
      <CameraControls />
      <Chunk />
      <pointLight position={[4, 4, 5]} />
      <ambientLight />
      <color attach="background" args={['#777777']} />
    </Canvas>
  )
}

function CameraControls() {
  return (
    <OrbitControls
      minDistance={10}
      maxDistance={20}
      dampingFactor={0.2}
      minPolarAngle={Math.PI / 8}
      maxPolarAngle={(3 * Math.PI) / 8}
    />
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
    <mesh position={[x, 0, z]}>
      <meshStandardMaterial color={color} />
      <boxGeometry args={[1, 1, 1]} />
    </mesh>
  )
}
