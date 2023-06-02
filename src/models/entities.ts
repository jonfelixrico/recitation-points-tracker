export interface ClassEntity {
  id: string
  name: string
  tags: string[]
  seatingArrangement: SeatingArrangement
}

export interface SeatingArrangement {
  columns: number[]
  occupants: {
    [occupantId: string]: [number, number]
  }
}

export interface StudentEntity {
  id: string

  firstName: string
  lastName: string
}

export interface RecitationEntity {
  id: string
  classId: string
  name: string
  tags: string[]
}

export interface RecitedStudentsEntity {
  id: string
  recitationId: string
  points: number
}
