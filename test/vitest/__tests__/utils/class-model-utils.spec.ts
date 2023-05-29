import { toClassEntity } from 'src/utils/class-model-utils'
import { describe, it, expect } from 'vitest'

describe('toClassEntity', () => {
  it('should not allow invalid data through', async () => {
    await expect(toClassEntity({})).rejects.toThrow()
  })
})
