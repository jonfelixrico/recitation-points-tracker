/**
 * Helper for computing the seat index.
 *
 * HOW TO USE:
 * Determine column index.
 * Determine row index within the column.
 * seat index will be seatCountPerColumn[columnIndex] + rowIndex
 *
 * @param columns
 * @returns Index in `columns` is directly mapped with the index in the return value.
 */
export function computeStartingSeatCountPerColumn(columns: number[]): number[] {
  const startingSeatCountPerColumn: number[] = []

  for (let index = 0; index < columns.length; index++) {
    const totalSeatCountOfPreviousColumns = columns
      .slice(0, index)
      .reduce((acc, val) => acc + val, 0)

    startingSeatCountPerColumn.push(totalSeatCountOfPreviousColumns)
  }

  return startingSeatCountPerColumn
}
