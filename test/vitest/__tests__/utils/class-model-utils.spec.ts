import { toClassEntity } from 'src/utils/class-model-utils'
import { describe, expect, it } from 'vitest'

describe('toClassEntity', () => {
  it('rejects empty input', async () => {
    await expect(toClassEntity({})).rejects.toThrow()
    await expect(toClassEntity(null)).rejects.toThrow()
    await expect(toClassEntity(undefined)).rejects.toThrow()
  })

  it('accepts the correct input', async () => {
    await expect(
      toClassEntity({
        id: 'test',
        name: 'test',
        tags: [],
        seatingArrangement: {
          columns: [1],
          // no seating arrangement yet
          occupants: {},
        },
      })
    ).resolves.toBeTruthy()

    await expect(
      toClassEntity({
        id: 'test',
        name: 'test',
        tags: [],
        seatingArrangement: {
          columns: [1],
          occupants: {
            student1: [1, 2],
          },
        },
      })
    ).resolves.toBeTruthy()
  })

  it('reject incorrect input', async () => {
    await expect(
      toClassEntity({
        id: 'test',
        name: 'test',
        tags: [],
        seatingArrangement: {
          columns: [],
          // no seating arrangement yet
          occupants: {
            student1: [1, 2],
          },
        },
      })
    ).rejects.toThrow()

    await expect(
      toClassEntity({
        id: 'test',
        name: 'test',
        tags: [],
        seatingArrangement: {
          columns: [1],
          // no seating arrangement yet
          occupants: {
            student1: [1],
          },
        },
      })
    ).rejects.toThrow()

    await expect(
      toClassEntity({
        id: 'test',
        name: 'test',
        tags: [],
        seatingArrangement: {
          columns: [1],
          // no seating arrangement yet
          occupants: {
            student1: true,
          },
        },
      })
    ).rejects.toThrow()
  })
})
