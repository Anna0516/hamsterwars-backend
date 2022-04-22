import express from 'express'
const router = express.Router()

import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore'

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
  console.log('random hamster')
  res.status(200).send(random_hamster(hamsters))
  return
})
router.get('/:id', async (req, res) => {
  const collectionRef = collection(db, 'hamsters') // här förbereder du endast vilken collection du vill kolla i

  const docRef = doc(collectionRef, req.params.id) //vid localhost:1975/hamsters/0K3w3E91K2DGVC är req.params.id = 0K3w3E91K2DGVC
  const snapShot = await getDoc(docRef) //Här sker hämtningen av ditt dokument därav ett promise
  const data = snapShot.data()
  if (!snapShot.exists()) {
    res.sendStatus(404)
  } else if (snapShot.exists()) {
    //här kollar vi ifall det vi fick tillbaka från firestore finns eller ej
    res.status(200).send(data)
  } else res.sendStatus(400)
})

router.post('/', async (req, res) => {
  let newObject = {
    name: req.body.name,
    age: req.body.age,
    favFood: req.body.favFood,
    loves: req.body.loves,
    imgName: req.body.imgName,
    wins: req.body.wins,
    defeats: req.body.defeats,
    games: req.body.games
  }

  const colRef = collection(db, 'hamsters')

  // lägg till objekt som ett dokument i en collection
  // addDoc returnerar Promise<DocumentReference>
  const newDocRef = await addDoc(colRef, newObject)

  console.log('Lade till nytt dokument med id=', newDocRef.id)
  res.status(200).send({ id: newDocRef.id })
})
router.put('/:id', async (req, res) => {
  const oldDocId = req.params.id

  const collectionRef = collection(db, 'hamsters')
  const oldDocRef = doc(collectionRef, oldDocId)
  const snapShot1 = await getDoc(oldDocRef)
  let newObject = req.body

  // updateDoc - ändrar i ett befintligt document

  try {
    if (!snapShot1.exists()) {
      res.status(404).send('Hamster not found')
      return
    } else if (!Object.keys(req.body).length) {
      res.status(400).send('Bad request, change object missing')
      return
    }
    await updateDoc(oldDocRef, newObject)
  } catch (error) {
    res.status(500).send({ error: 'something went wrong' + error })
    return
  }
  res.status(200).send({ success: true })
})
router.delete('/:id', async (req, res) => {
  const idToRemove = req.params.id
  const colRef = collection(db, 'hamsters')
  const oldDocRef = doc(colRef, idToRemove)

  const snapShot2 = await getDoc(oldDocRef)
  try {
    if (!snapShot2.exists()) {
      res.status(404).send('Hamster Not Found')
      return
    }
    await deleteDoc(oldDocRef)
  } catch (error) {
    res.status(500).send({ success: false })
    return
  }

  res.status(200).send({ success: true })
})

export default router
