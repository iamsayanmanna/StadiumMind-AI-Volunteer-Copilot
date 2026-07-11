import { db } from './config'
import { collection, doc, getDoc, addDoc, updateDoc } from 'firebase/firestore'
import type { DocumentData, WithFieldValue } from 'firebase/firestore'

/**
 * Generic add document to a collection.
 */
export const addRecord = async <T extends WithFieldValue<DocumentData>>(
  collectionName: string,
  data: T
): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      ...data,
      timestamp: new Date().toISOString(),
    })
    return docRef.id
  } catch (error) {
    console.error(`Firestore Error: Adding document to ${collectionName} failed`, error)
    throw error
  }
}

/**
 * Generic read document by ID.
 */
export const getRecord = async (
  collectionName: string,
  id: string
): Promise<DocumentData | null> => {
  try {
    const docRef = doc(db, collectionName, id)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() }
    }
    return null
  } catch (error) {
    console.error(`Firestore Error: Reading document ${id} from ${collectionName} failed`, error)
    throw error
  }
}

/**
 * Generic update document.
 */
export const updateRecord = async (
  collectionName: string,
  id: string,
  data: DocumentData
): Promise<void> => {
  try {
    const docRef = doc(db, collectionName, id)
    await updateDoc(docRef, data)
  } catch (error) {
    console.error(`Firestore Error: Updating document ${id} in ${collectionName} failed`, error)
    throw error
  }
}
