import { validateAndCovertClassEntityBody } from 'src/utils/class-model-utils'
import { describe, expect, it } from 'vitest'

describe('toClassEntity', () => {
  it('rejects empty input', async () => {
    await expect(validateAndCovertClassEntityBody({})).rejects.toThrow()
    await expect(validateAndCovertClassEntityBody(null)).rejects.toThrow()
    await expect(validateAndCovertClassEntityBody(undefined)).rejects.toThrow()
  })

  it('accepts the correct input', async () => {
    await expect(
      validateAndCovertClassEntityBody({
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
      validateAndCovertClassEntityBody({
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
    const converted = await validateAndCovertClassEntityBody({
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

    expect(converted).toEqual(
      expect.not.objectContaining({
        id: expect.arrayContaining([1, 2]),
      })
    )
  })

  it('reject incorrect input', async () => {
    await expect(
      validateAndCovertClassEntityBody({
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
      validateAndCovertClassEntityBody({
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
      validateAndCovertClassEntityBody({
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
