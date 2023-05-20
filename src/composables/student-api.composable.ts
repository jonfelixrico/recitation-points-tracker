import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  writeBatch,
} from 'firebase/firestore'
import { useFirestore } from './firestore.composable'
import { useSessionUserId } from './session-user.composable'
import { StudentEntity } from 'src/models/entities'
import { nanoid } from 'nanoid'

export function useStudentAPI() {
  const { firestore } = useFirestore()
  const uid = useSessionUserId()

  return {
    async getStudentList(classId: string): Promise<StudentEntity[]> {
      const docs = await getDocs(
        collection(firestore, `users/${uid}/classes/${classId}/students`)
      )

      const output: StudentEntity[] = []
      docs.forEach((doc) => {
        // TODO use validation or something
        output.push({
          ...doc.data(),
          id: doc.id,
        } as StudentEntity)
      })

      return output
    },

    async createStudents(
      classId: string,
      students: Omit<StudentEntity, 'id'>[]
    ): Promise<StudentEntity[]> {
      const path = `users/${uid}/classes/${classId}/students`

      const insertedStudents: StudentEntity[] = []

      const batch = writeBatch(firestore)

      for (const student of students) {
        const id = nanoid()

        const docRef = doc(firestore, path, id)
        batch.set(docRef, student)

        insertedStudents.push({
          ...student,
          id,
        })
      }

      await batch.commit()

      return insertedStudents
    },

    async deletStudent(classId: string, studentId: string) {
      const docRef = doc(
        firestore,
        `users/${uid}/classes/${classId}/students`,
        studentId
      )

      await deleteDoc(docRef)
    },
  }
}
