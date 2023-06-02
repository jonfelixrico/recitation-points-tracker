import { RecitationEntity } from 'src/models/entities'
import { useFirestore } from './firestore.composable'
import { doc, setDoc } from 'firebase/firestore'
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

      const ref = doc(
        firestore,
        'users',
        String(uid),
        'classes',
        classId,
        'recitations',
        id
      )

      await setDoc(ref, others)

      return {
        id,
        classId,
        ...others,
      }
    },
  }
}
