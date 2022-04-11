import { collection, doc, deleteDoc } from 'firebase/firestore'

import { db } from './firebase.js'

const idToRemove = 'z95qrp22Nl8my4WbL4hH'

const colRef = collection(db, 'hamsters')

const docRef = doc(colRef, idToRemove)

await deleteDoc(docRef)
