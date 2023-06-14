import { RecitedStudentEntity } from 'src/models/entities'

export type RecitedStudentsEntityMap = Record<string, RecitedStudentEntity>

export interface PointUpdateEventValue {
  studentId: string
  points: number
}
