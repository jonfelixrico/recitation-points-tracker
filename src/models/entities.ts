export interface ClassEntity {
  id: string
  name: string
  seatColumns: number
  seatRows: number
  tags: string[]
}

export interface StudentEntity {
  id: string

  firstName: string
  lastName: string

  seatColumn: string
  seatRow: string
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
