import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import { useFirestore } from './firestore.composable'
import { useSessionUserId } from './session-user.composable'
import { ClassEntity } from 'src/models/entities'

export function useClassesAPI() {
  const { firestore } = useFirestore()
  const uid = useSessionUserId()

  async function getClassList() {
    const docs = await getDocs(collection(firestore, `users/${uid}/classes`))
    const output: ClassEntity[] = []
    docs.forEach((doc) => {
      // TODO use validation or something
      output.push(doc.data() as ClassEntity)
    })
  }

  async function getClass(id: string) {
    const docRef = doc(firestore, `users/${uid}/classes`, id)
    const docSnap = await getDoc(docRef)
    // do something about this
    return docSnap.data() as ClassEntity
  }
}
