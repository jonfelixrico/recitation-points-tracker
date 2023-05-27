import { computeStartingSeatIndexPerColumn } from 'src/utils/seating-utils'
import { expect, describe, it } from 'vitest'

describe('starting seat count', () => {
  it('should provide correct starting seat count data per column', () => {
    const startingPerColumn = computeStartingSeatIndexPerColumn([5, 4, 3, 2])

    expect(startingPerColumn[0]).toBe(0)
    expect(startingPerColumn[1]).toBe(5)
    expect(startingPerColumn[2]).toBe(9)
    expect(startingPerColumn[3]).toBe(12)
  })
})
