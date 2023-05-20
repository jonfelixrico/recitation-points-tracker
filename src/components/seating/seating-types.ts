interface Occupant {
  id: string
  label: string
}

export type SeatingOccupants = {
  [key: `${number}/${number}`]: Occupant
}
