import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { auth } from 'express-oauth2-jwt-bearer' // <-- import auth middleware

import skillRoutes from './routes/skills.js'

dotenv.config({
  path: {
    production: '.env.production',
    development: '.env.development',
  }[process.env.NODE_ENV || 'development'], // fallback to dev
})

console.log('Auth0 config:', {
  audience: process.env.AUTH0_AUDIENCE,
  domain: process.env.AUTH0_DOMAIN,
  mongo: process.env.MONGODB_URI,
})

const app = express()
const PORT = process.env.PORT || 3000

// Auth0 JWT middleware setup
const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_DOMAIN,
  tokenSigningAlg: 'RS256',
})

app.use(cors())
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
