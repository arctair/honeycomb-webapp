import { OrbitControls } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import EventEmitter from 'events'
import { useCallback, useEffect, useRef } from 'react'

type CameraControlsProps = {
  events: EventEmitter
}
export default function CameraControls({ events }: CameraControlsProps) {
  const ref = useRef<any>()
  const { camera } = useThree()
  const onZoom = useCallback(
    (delta: number) => {
      const multiplier = delta > 0 ? 4 / 5 : 5 / 4
      const position = camera.position
      const target = ref.current.target
      camera.position.set(
        position.x * multiplier - target.x * (multiplier - 1),
        position.y * multiplier - target.y * (multiplier - 1),
        position.z * multiplier - target.z * (multiplier - 1),
      )
    },
    [camera.position],
  )
  useEffect(() => {
    events.addListener('zoom', onZoom)
    return () => {
      events.removeListener('zoom', onZoom)
    }
  }, [events, onZoom])
  return (
    <OrbitControls
      minDistance={15}
      maxDistance={40}
      ref={ref}
      dampingFactor={0.2}
      minPolarAngle={Math.PI / 8}
      maxPolarAngle={(3 * Math.PI) / 8}
      target={[16, 0, 16]}
    />
  )
}
