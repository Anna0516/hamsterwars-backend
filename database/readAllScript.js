// Självständigt skript som hämtar data från databasen
import { collection, getDocs, doc, getDoc } from 'firebase/firestore'

import { db } from './firebase.js'

// Hämta alla dokument
const colRef = collection(db, 'hamsters')
let hamsters = []

const snapshot = await getDocs(colRef)
snapshot.docs.forEach((docSnapshot) => {
  hamsters.push({ ...docSnapshot.data(), id: docSnapshot.id })
})
console.log(hamsters)
