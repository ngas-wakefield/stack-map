import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { auth } from 'express-oauth2-jwt-bearer' // <-- import auth middleware

import skillRoutes from './routes/skills.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

// Auth0 JWT middleware setup
const jwtCheck = auth({
  audience: 'https://api.stackmap.dev', // <-- your API identifier
  issuerBaseURL: 'https://piwakawaka2022-ngahine.au.auth0.com/', // <-- your Auth0 domain with trailing slash
  tokenSigningAlg: 'RS256',
})

const allowedOrigins = ['http://localhost:5173', 'https://www.stackmap.dev']

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
)

app.use(express.json())

app.use(jwtCheck) // <-- Protect all routes below with Auth0 JWT

app.use('/api/skills', skillRoutes)

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  })
  .catch((err) => console.error('Mongo connection error:', err))

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ message: 'Invalid or missing token' })
  }
  next(err)
})
