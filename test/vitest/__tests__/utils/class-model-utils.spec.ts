import { validateAndCleanClassEntityBody } from 'src/utils/class-model-utils'
import { describe, expect, it } from 'vitest'

describe('ClassModelUtils', () => {
  it('rejects empty input', async () => {
    await expect(validateAndCleanClassEntityBody({})).rejects.toThrow()
    await expect(validateAndCleanClassEntityBody(null)).rejects.toThrow()
    await expect(validateAndCleanClassEntityBody(undefined)).rejects.toThrow()
  })

  it('accepts the correct input', async () => {
    await expect(
      validateAndCleanClassEntityBody({
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
      validateAndCleanClassEntityBody({
        name: 'test',
        tags: [],
        seatingArrangement: {
          columns: [1],
          occupants: {
            student1: [1, 2],
          },
        },
      })
    ).resolves.toEqual(
      expect.objectContaining({
        seatingArrangement: expect.objectContaining({
          occupants: expect.objectContaining({
            student1: expect.anything(),
          }),
        }),
      })
    )
  })

  it('omits extra properties', async () => {
    await expect(
      validateAndCleanClassEntityBody({
        id: 'test',
        name: 'test',
        tags: [],
        seatingArrangement: {
          columns: [1],
          // no seating arrangement yet
          occupants: {
            student1: [1, 2],
          },
        },
      })
    ).resolves.toEqual(
      expect.not.objectContaining({
        id: expect.arrayContaining([1, 2]),
      })
    )
  })

  it('reject incorrect input', async () => {
    await expect(
      validateAndCleanClassEntityBody({
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
      validateAndCleanClassEntityBody({
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
      validateAndCleanClassEntityBody({
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
