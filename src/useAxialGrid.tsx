import { useEffect, useState } from 'react'
import { qr, qrs } from './types'

export default function useAxialGrid(size: number) {
  const [cells, setCells] = useState<qr[]>([])

  useEffect(() => {
    setCells(makeAxialGrid(size))
  }, [size])

  return cells
}

export function makeAxialGrid(size: number) {
  const newCells = [] as qr[]
  for (let q = Math.floor(size / 2); q >= -size / 2; q--) {
    for (let r = Math.floor(size / 2); r >= -size / 2; r--) {
      let s = -q - r
      if (cubeDistance({ q: 0, r: 0, s: 0 }, { q, r, s }) <= size / 2) {
        newCells.push({ q, r })
      }
    }
  }
  return newCells
}

function cubeDistance(a: qrs, b: qrs) {
  const sub = cubeSubtract(a, b)
  return (Math.abs(sub.q) + Math.abs(sub.r) + Math.abs(sub.s)) / 2
}

function cubeSubtract(a: qrs, b: qrs): qrs {
  return { q: a.q - b.q, r: a.r - b.r, s: a.s - b.s }
}
