import { validateAndCleanStudentEntityBody } from 'src/utils/student-model-utils'
import { describe, expect, it } from 'vitest'

describe('StudentModelUtils', () => {
  it('rejects empty input', async () => {
    await expect(validateAndCleanStudentEntityBody({})).rejects.toThrow()
    await expect(validateAndCleanStudentEntityBody(null)).rejects.toThrow()
    await expect(validateAndCleanStudentEntityBody(undefined)).rejects.toThrow()
  })

  it('accepts the correct input', async () => {
    await expect(
      validateAndCleanStudentEntityBody({
        firstName: 'First name',
        lastName: 'Last name',
      })
    ).resolves.toEqual(
      expect.objectContaining({
        firstName: 'First name',
        lastName: 'Last name',
      })
    )
  })

  it('omits extra properties', async () => {
    const converted = await validateAndCleanStudentEntityBody({
      val1: 1,
      val2: 2,
      val3: 3,
      firstName: 'First name',
      lastName: 'Last name',
    })

    expect(converted).toEqual(
      expect.not.objectContaining({
        val1: 1,
        val2: 2,
        val3: 3,
      })
    )
  })

  it('reject incorrect input', async () => {
    await expect(
      validateAndCleanStudentEntityBody({
        firstName: 'First name',
        lastName: '',
      })
    ).rejects.toThrow()
  })
})
