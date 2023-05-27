export function computeStartingSeatCountPerColumn(columns: number[]) {
  const startingSeatCount: number[] = []

  for (let index = 0; index < columns.length; index++) {
    const totalSeatCountOfPreviousColumns = columns
      .slice(0, index)
      .reduce((acc, val) => acc + val, 0)

    startingSeatCount.push(totalSeatCountOfPreviousColumns)
  }
}
