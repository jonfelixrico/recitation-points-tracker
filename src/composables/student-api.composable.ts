import { collection, getDocs } from 'firebase/firestore'
import { useFirestore } from './firestore.composable'
import { useSessionUserId } from './session-user.composable'
import { StudentEntity } from 'src/models/entities'

export function useStudentAPI() {
  const { firestore } = useFirestore()
  const uid = useSessionUserId()

  return {
    async getStudentList(classId: string): Promise<StudentEntity[]> {
      const docs = await getDocs(
        collection(firestore, `users/${uid}/classes/${classId}`)
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
  }
}
