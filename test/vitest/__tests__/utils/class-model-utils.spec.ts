import { validateAndCovertToClassEntity } from 'src/utils/class-model-utils'
import { describe, expect, it } from 'vitest'

describe('toClassEntity', () => {
  it('rejects empty input', async () => {
    await expect(validateAndCovertToClassEntity({})).rejects.toThrow()
    await expect(validateAndCovertToClassEntity(null)).rejects.toThrow()
    await expect(validateAndCovertToClassEntity(undefined)).rejects.toThrow()
  })

  it('accepts the correct input', async () => {
    await expect(
      validateAndCovertToClassEntity({
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
      validateAndCovertToClassEntity({
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
      validateAndCovertToClassEntity({
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
      validateAndCovertToClassEntity({
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
      validateAndCovertToClassEntity({
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
