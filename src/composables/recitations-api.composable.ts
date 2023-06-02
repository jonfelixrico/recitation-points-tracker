import { RecitationEntity } from 'src/models/entities'
import { useFirestore } from './firestore.composable'
import { collection, doc, getDocs, setDoc } from 'firebase/firestore'
import { useSessionUserId } from './session-user.composable'
import { nanoid } from 'nanoid'

export function useRecitationsAPI() {
  const { firestore } = useFirestore()
  const uid = useSessionUserId()

  return {
    async createRecitation(
      body: Omit<RecitationEntity, 'id'>
    ): Promise<RecitationEntity> {
      const id = nanoid()
      const { classId, ...others } = body

      const recitationRef = doc(
        firestore,
        `users/${uid}/classes/${classId}/recitations`,
        id
      )

      await setDoc(recitationRef, {
        ...others,
        classRef: doc(firestore, `users/${uid}/classes`, classId),
      })

      return {
        id,
        classId,
        ...others,
      }
    },

    async getRecitationList(classId: string) {
      const recitations: RecitationEntity[] = []

      const results = await getDocs(
        collection(firestore, `users/${uid}/classes/${classId}/recitations`)
      )
      results.forEach((doc) => {
        recitations.push({
          ...doc.data(),
          id: doc.id,
        } as RecitationEntity)
      })

      return recitations
    },
  }
}
