import express from 'express'
const router = express.Router()

import { collection, getDocs, doc, getDoc } from 'firebase/firestore'
import { db } from '../database/firebase.js'

// Data hämtas från Firestore!

// Routes
// RESTful == har GET, POST, PUT och DELETE

router.get('/', async (req, res) => {
  const colRef = collection(db, 'hamsters')
  let hamsters = []

  const snapshot = await getDocs(colRef)
  snapshot.docs.forEach((docSnapshot) => {
    hamsters.push({ ...docSnapshot.data(), id: docSnapshot.id })
  })
  console.log(hamsters)
  res.send(hamsters)
})
router.get('/random', async (req, res) => {
  const colRef = collection(db, 'hamsters')
  let hamsters = []

  const snapshot = await getDocs(colRef)
  snapshot.docs.forEach((docSnapshot) => {
    hamsters.push({ ...docSnapshot.data(), id: docSnapshot.id })
  })
  function random_hamster(hamsters) {
    return hamsters[Math.floor(Math.random() * hamsters.length)]
  }
  res.send(random_hamster(hamsters))
  console.log('random hamster')
})
router.get('/:id', async (req, res) => {
  const collectionRef = collection(db, 'hamsters') // här förbereder du endast vilken collection du vill kolla i

  const docRef = doc(collectionRef, req.params.id) //vid localhost:1975/hamsters/0K3w3E91K2DGVC är req.params.id = 0K3w3E91K2DGVC
  const snapshot = await getDoc(docRef) //Här sker hämtningen av ditt dokument därav ett promise
  const data = snapshot.data()

  if (snapshot.exists()) {
    //här kollar vi ifall det vi fick tillbaka från firestore finns eller ej
    res.send(data)
  } else {
    res.sendStatus(404)
  }
})
/*router.get('/:id', async (req, res) => {
  const collectionRef = collection(db, 'hamsters')

  const docRef = doc(collectionRef, '0K3w3E91K2DGVC')
  const snapshot = await getDoc(docRef)
  const data = snapshot.data()

  console.log('data: ', data)

  if (req.params.id === '0K3w3E91K2DGVC') {
    res.send(data)
  } else {
    res.sendStatus(404)
  }
})*/

export default router
