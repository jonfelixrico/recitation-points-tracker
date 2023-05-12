import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore'
import { useFirestore } from './firestore.composable'
import { useSessionUserId } from './session-user.composable'
import { ClassEntity } from 'src/models/entities'

export function useClassesAPI() {
  const { firestore } = useFirestore()
  const uid = useSessionUserId()

  return {
    async getClassList() {
      const docs = await getDocs(collection(firestore, `users/${uid}/classes`))
      const output: ClassEntity[] = []
      docs.forEach((doc) => {
        // TODO use validation or something
        output.push({
          ...doc.data(),
          id: doc.id,
        } as ClassEntity)
      })

      return output
    },

    async getClass(id: string) {
      const docRef = doc(firestore, `users/${uid}/classes`, id)
      const docSnap = await getDoc(docRef)

      if (!docSnap.exists) {
        return null
      }

      return {
        ...docSnap.data(),
        id: docSnap.id,
      } as ClassEntity
    },

    async createClass(input: ClassEntity) {
      const { id, ...data } = input
      await setDoc(doc(firestore, `users/${uid}/classes`, id), data)
      return input
    },
  }
}
