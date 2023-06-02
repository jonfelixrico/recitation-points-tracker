import { RecitationEntity } from 'src/models/entities'
import { useFirestore } from './firestore.composable'
import {
  DocumentReference,
  Firestore,
  FirestoreDataConverter,
  collection,
  doc,
  getDocs,
  setDoc,
} from 'firebase/firestore'
import { useSessionUserId } from './session-user.composable'
import { nanoid } from 'nanoid'
import { Expose, instanceToPlain, plainToInstance } from 'class-transformer'
import { IsNotEmpty, validateOrReject } from 'class-validator'

// TODO move this out
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
      }
    },

    toFirestore({ classId, name, tags }) {
      return {
        classRef: doc(firestore, `userse/${uid}/classes/${classId}`),
        name,
        tags,
      }
    },
  }
}

// TODO move this out
class RecitationEntityTransformer implements Omit<RecitationEntity, 'id'> {
  @IsNotEmpty()
  @Expose()
  classId!: string

  @IsNotEmpty()
  @Expose()
  name!: string

  @IsNotEmpty()
  @Expose()
  tags!: string[]
}

async function validateAndConvert(data: Omit<RecitationEntity, 'id'>) {
  const converted = plainToInstance(RecitationEntityTransformer, data)
  await validateOrReject(converted)
  return instanceToPlain(converted, {
    excludeExtraneousValues: true,
  })
}

export function useRecitationsAPI() {
  const { firestore } = useFirestore()
  const uid = useSessionUserId()

  const converter = useRecitationsDataConverter(firestore, String(uid))

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
      ).withConverter(converter)
      await setDoc(recitationRef, await validateAndConvert(body))

      return newRecitation
    },

    async getRecitationList(classId: string) {
      const recitations: RecitationEntity[] = []

      const sourceCollection = collection(
        firestore,
        `users/${uid}/classes/${classId}/recitations`
      ).withConverter(converter)
      const results = await getDocs(sourceCollection)

      results.forEach((doc) => {
        recitations.push(doc.data())
      })

      return recitations
    },
  }
}
