import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore'
import { useFirestore } from './firestore.composable'
import { useSessionUserId } from './session-user.composable'
import { ClassEntity, SeatingArrangement } from 'src/models/entities'
import { nanoid } from 'nanoid'

export function useClassesAPI() {
  const { firestore } = useFirestore()
  const uid = useSessionUserId()

  async function setClass(id: string, data: Omit<ClassEntity, 'id'>) {
    await setDoc(doc(firestore, `users/${uid}/classes`, id), data)
    return {
      id,
      ...data,
    }
  }

  async function getClass(id: string) {
    const docRef = doc(firestore, `users/${uid}/classes`, id)
    const docSnap = await getDoc(docRef)

    if (!docSnap.exists) {
      return null
    }

    return {
      ...docSnap.data(),
      id: docSnap.id,
    } as ClassEntity
  }

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

    getClass,

    async createClass(input: Omit<ClassEntity, 'id'>): Promise<ClassEntity> {
      return await setClass(nanoid(), input)
    },

    async setSeatOccupants(
      id: string,
      occupants: SeatingArrangement['occupants']
    ): Promise<ClassEntity> {
      const data = await getClass(id)
      if (!data) {
        throw new Error('Class not found')
      } else if (!data.seatingArrangement) {
        throw new Error('No arrangement yet')
      }

      data.seatingArrangement.occupants = occupants
      return await setClass(id, data)
    },
  }
}
