export interface ClassEntity {
  id: string
  name: string
  tags: string[]
  seatingArrangement: SeatingArrangement | null
}

/**
 * Index 0 is for the column
 * Index 1 is for the seat in the row
 */
type SeatCoordinates = [number, number]

export interface SeatingArrangement {
  columns: number[]
  occupants: {
    [occupantId: string]: SeatCoordinates
  }
}

export interface StudentEntity {
  id: string

  firstName: string
  lastName: string

  // TODO use a tighter typing here
  seatColumn?: number
  seatRow?: number
}

export interface RecitationEntity {
  id: string

  name: string

  tags: string[]
}

export interface RecitedStudentsEntity {
  id: string
  points: number
}
