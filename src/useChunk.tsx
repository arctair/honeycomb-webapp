import { useEffect, useState } from 'react'
import { Tile } from './types'

export default function useChunk(size: number) {
  const [tiles, setTiles] = useState<Tile[]>([])

  useEffect(() => {
    setTiles(makeChunk(size))
  }, [size])

  return tiles
}

export function makeChunk(size: number) {
  const tiles: Tile[] = []
  for (let z = 0; z < size; z++) {
    for (let x = 0; x < size; x++) {
      tiles.push({ id: `${x},${z}`, x, z })
    }
  }
  return tiles
}
