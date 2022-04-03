import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useEffect, useState } from 'react'

export default function App() {
  return <Scene />
}

function Scene() {
  return (
    <Canvas camera={{ position: [-10, 10, 0] }}>
      <Camera />
      <Terrain />
      <pointLight position={[4, 4, 5]} />
      <ambientLight />
    </Canvas>
  )
}

function Camera() {
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

function Terrain() {
  const cells = useCells({ size: 32 })
  return (
    <>
      {cells.map(([x, z]) => (
        <mesh position={[x, 0, z]} key={`${x}-${z}`}>
          <meshStandardMaterial
            color={(x + z) % 2 === 0 ? '#080' : '#2A2'}
          />
          <boxGeometry args={[1, 1, 1]} />
        </mesh>
      ))}
    </>
  )
}

type xz = [x: number, z: number]
interface useCellsProps {
  size: number
}
function useCells({ size }: useCellsProps = { size: 16 }) {
  const [cells, setCells] = useState<xz[]>([])
  useEffect(() => {
    const cells = [] as xz[]
    for (let x = -size / 2; x <= size / 2; x++) {
      for (let z = -size / 2; z <= size / 2; z++) {
        cells.push([x, z])
      }
    }
    setCells(cells)
  }, [size])
  return cells
}
