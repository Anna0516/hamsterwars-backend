import { collection, doc, updateDoc } from 'firebase/firestore'

import { db } from './firebase.js'

const newObject = {
  name: 'Olle',
  age: '2',
  favFood: 'Gurka och morot',
  loves: 'Gosa',
  imgName: '',
  wins: '0',
  defeats: '0',
  games: '0'
}

// Varning! Id kommer att ändras varje gång man tar bort och lägger till hamstrar med de andra skripten
const oldDocId = 'JHZF55wxSwj42UxqoPVi'

const collectionRef = collection(db, 'hamsters')
const oldDocRef = doc(collectionRef, oldDocId)

// updateDoc - ändrar i ett befintligt document
// setDoc - ändrar eller lägger till ett document

updateDoc(oldDocRef, newObject)
