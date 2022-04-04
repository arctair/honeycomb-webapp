import { qr } from './types'
import { makeAxialGrid } from './useAxialGrid'

test('grid size one', () => {
  expect(makeAxialGrid(1)).toStrictEqual([{ q: 0, r: 0 }] as qr[])
})

test('grid size two', () => {
  expect(makeAxialGrid(2)).toStrictEqual([
    { q: 1, r: 0 },
    { q: 1, r: -1 },
    { q: 0, r: 1 },
    { q: 0, r: 0 },
    { q: 0, r: -1 },
    { q: -1, r: 1 },
    { q: -1, r: 0 },
  ] as qr[])
})
