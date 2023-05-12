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
