import { validateClassEntity } from 'src/utils/class-model-utils'
import { describe, expect, it } from 'vitest'

describe('toClassEntity', () => {
  it('rejects empty input', async () => {
    await expect(validateClassEntity({})).rejects.toThrow()
    await expect(validateClassEntity(null)).rejects.toThrow()
    await expect(validateClassEntity(undefined)).rejects.toThrow()
  })

  it('accepts the correct input', async () => {
    await expect(
      validateClassEntity({
        name: 'test',
        tags: [],
        seatingArrangement: {
          columns: [1],
          // no seating arrangement yet
          occupants: {},
        },
      })
    ).resolves.toBeUndefined()

    await expect(
      validateClassEntity({
        name: 'test',
        tags: [],
        seatingArrangement: {
          columns: [1],
          occupants: {
            student1: [1, 2],
          },
        },
      })
    ).resolves.toBeUndefined()
  })

  it('reject incorrect input', async () => {
    await expect(
      validateClassEntity({
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
      validateClassEntity({
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
      validateClassEntity({
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
