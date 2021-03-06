// Importera npm-paket och moduler
// Allmänna inställningar
import express from 'express'
import cors from 'cors'
import path from 'path'
const app = express()
const PORT = process.env.PORT || 1975
import hamsters from './routes/hamsters.js'

import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Middleware

// CORS öppnar vårt projekt så det kan användas från andra domäner
app.use(cors())
// Serve static files in this folder
app.use(express.static(path.join(__dirname, 'img')))
app.use(express.static(path.join(__dirname, 'public')))
// Parse request body
app.use(express.urlencoded({ extended: true }))
app.use(express.json({ extended: true }))
// Logger - skriv ut information om inkommande request
app.use((req, res, next) => {
  console.log(`Logger: ${req.method}  ${req.url} `, req.body)
  next()
})

// Routes
app.use('/hamsters', hamsters)

// Starta server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}.`)
})
