import { keyBy, set } from 'lodash'
import { SeatingArrangement, StudentEntity } from 'src/models/entities'

/**
 * Helper for computing the "global seat index" by determining the "column seat index"
 * of the first seat in the column.
 *
 * Using the first "column seat index", you can compute the "global seat index" of the other
 * seats in the same column.
 *
 * Global seat index = seat index relative to the ENTIRE seating arrangement
 * Column seat index = seat index relative to the column a seat falls under
 *
 * @param columns
 * @returns
 */
export function computeStartingSeatIndexPerColumn(columns: number[]): number[] {
  const startingSeatCountPerColumn: number[] = []

  for (let index = 0; index < columns.length; index++) {
    if (index === 0) {
      startingSeatCountPerColumn.push(0)
      continue
    }

    const prevColStartingSeatCount = startingSeatCountPerColumn[index - 1]
    const prevColSeatCount = columns[index - 1]

    startingSeatCountPerColumn.push(prevColStartingSeatCount + prevColSeatCount)
  }

  return startingSeatCountPerColumn
}

export function getInverseOccupantMap(
  students: StudentEntity[],
  occupants: SeatingArrangement['occupants']
) {
  const indexedStudents = keyBy(students, ({ id }) => id)

  const map: Record<number, Record<number, StudentEntity>> = {}
  for (const [studentId, [colNo, rowNo]] of Object.entries(occupants)) {
    const student = indexedStudents[studentId]
    if (student) {
      set(map, [colNo, rowNo], student)
    }
  }

  return map
}
