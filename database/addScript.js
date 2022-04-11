import { collection, addDoc } from 'firebase/firestore'

import { db } from './firebase.js'

let newObject = {
  name: 'Olle',
  age: '2',
  favFood: 'Gurka',
  loves: 'Gosa',
  imgName: '',
  wins: '0',
  defeats: '0',
  games: '0'
}

const colRef = collection(db, 'hamsters')

// lägg till objekt som ett dokument i en collection
// addDoc returnerar Promise<DocumentReference>
const newDocRef = await addDoc(colRef, newObject)

console.log('Lade till nytt dokument med id=', newDocRef.id)
