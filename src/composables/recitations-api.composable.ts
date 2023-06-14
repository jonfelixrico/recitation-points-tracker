import { RecitationEntity, RecitedStudentEntity } from 'src/models/entities'
import { useFirestore } from './firestore.composable'
import {
  DocumentReference,
  Firestore,
  FirestoreDataConverter,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from 'firebase/firestore'
import { useSessionUserId } from './session-user.composable'
import { nanoid } from 'nanoid'
import { validateAndConvertRecitation } from 'src/utils/recitation-model-utils'

function useRecitationsDataConverter(
  firestore: Firestore,
  uid: string
): FirestoreDataConverter<RecitationEntity> {
  return {
    fromFirestore(snapshot) {
      const data = snapshot.data()
      const classRef = data.classRef as DocumentReference
      return {
        id: snapshot.id,
        classId: classRef.id,
        name: data.name,
        tags: data.tags,
        recitationDt: data.recitationDt.toDate(),
      }
    },

    toFirestore({ classId, name, tags, recitationDt }) {
      return {
        classRef: doc(firestore, `users/${uid}/classes/${classId}`),
        name,
        tags,
        recitationDt,
      }
    },
  }
}

function useRecitedStudentsDataConverter(
  firestore: Firestore,
  uid: string,
  classId: string,
  recitationId: string
): FirestoreDataConverter<RecitedStudentEntity> {
  return {
    fromFirestore(snapshot) {
      const data = snapshot.data()
      return {
        // this kind of entity will have the id and studentId values the same
        studentId: snapshot.id,
        points: data.points,
      }
    },

    toFirestore({ points, studentId }) {
      return {
        points,
        studentId,
        classRef: doc(firestore, `users/${uid}/classes/${classId}`),
        recitation: doc(
          firestore,
          `users/${uid}/classes/${classId}/recitations/${recitationId}`
        ),
      }
    },
  }
}

export function useRecitationsAPI() {
  const { firestore } = useFirestore()
  const uid = useSessionUserId()

  const recitationConverter = useRecitationsDataConverter(
    firestore,
    String(uid)
  )

  return {
    async createRecitation(
      body: Omit<RecitationEntity, 'id'>
    ): Promise<RecitationEntity> {
      const id = nanoid()
      const newRecitation = {
        ...body,
        id,
      }

      const recitationRef = doc(
        firestore,
        `users/${uid}/classes/${body.classId}/recitations`,
        id
      ).withConverter(recitationConverter)
      await setDoc(recitationRef, await validateAndConvertRecitation(body))

      return newRecitation
    },

    async getRecitationList(classId: string) {
      const recitations: RecitationEntity[] = []

      const sourceCollection = collection(
        firestore,
        `users/${uid}/classes/${classId}/recitations`
      ).withConverter(recitationConverter)
      const results = await getDocs(sourceCollection)

      results.forEach((doc) => {
        recitations.push(doc.data())
      })

      return recitations
    },

    async getRecitedStudentList(classId: string, recitationId: string) {
      const recitedStudentConverter = useRecitedStudentsDataConverter(
        firestore,
        String(uid),
        classId,
        recitationId
      )
      const sourceCollection = collection(
        firestore,
        `users/${uid}/classes/${classId}/recitations/${recitationId}/recitedStudents`
      ).withConverter(recitedStudentConverter)
      const results = await getDocs(sourceCollection)

      const students: RecitedStudentEntity[] = []
      results.forEach((doc) => {
        students.push(doc.data())
      })

      return students
    },

    async getRecitation(
      classId: string,
      recitationId: string
    ): Promise<RecitationEntity | null> {
      const ref = doc(
        firestore,
        `users/${uid}/classes/${classId}/recitations/${recitationId}`
      ).withConverter(recitationConverter)

      const retrieved = await getDoc(ref)
      if (!retrieved.exists()) {
        return null
      }

      return retrieved.data()
    },
  }
}
