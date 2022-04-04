import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import useAxialGrid from './useAxialGrid'
import SimplexNoise from 'simplex-noise'
import { qr, xz } from './types'

export default function App() {
  return <Scene />
}

function Scene() {
  return (
    <Canvas camera={{ position: [-10, 10, 0] }}>
      <CameraControls />
      <BaseGrid />
      <pointLight position={[4, 4, 5]} />
      <ambientLight />
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

function BaseGrid() {
  const cells = useAxialGrid(32)
  return (
    <>
      {cells.map((cell) => (
        <BaseGridCell position={toXZ(cell)} key={`${cell.q}-${cell.r}`} />
      ))}
    </>
  )
}

const simplex = new SimplexNoise()

interface BaseGridCellProps {
  position: xz
}
function BaseGridCell({ position: [x, z] }: BaseGridCellProps) {
  const value = simplex.noise2D(x / 10, z / 10)
  return (
    <mesh position={[x, value / 5, z]}>
      <meshStandardMaterial
        color={`hsl(123, 45%, ${40 + Math.floor(value)}%)`}
      />
      <cylinderGeometry args={[1, 1, 1, 6]} />
    </mesh>
  )
}

function toXZ({ q, r }: qr): xz {
  return [Math.sqrt(3) * q + (r * Math.sqrt(3)) / 2, (3 / 2) * -r]
}
