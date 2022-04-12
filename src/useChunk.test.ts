import { Tile } from './types'
import { makeChunk } from './useChunk'

test('grid size one', () => {
  expect(makeChunk(1)).toStrictEqual([{ id: '0,0', x: 0, z: 0 }] as Tile[])
})

test('grid size two', () => {
  expect(makeChunk(2)).toStrictEqual([
    { id: '0,0', x: 0, z: 0 },
    { id: '1,0', x: 1, z: 0 },
    { id: '0,1', x: 0, z: 1 },
    { id: '1,1', x: 1, z: 1 },
  ] as Tile[])
})
