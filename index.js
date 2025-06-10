import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { auth } from 'express-oauth2-jwt-bearer'

import skillRoutes from './routes/skills.js'

dotenv.config({
  path:
    process.env.NODE_ENV === 'production'
      ? '.env.production'
      : '.env.development',
})

const app = express()
const PORT = process.env.PORT || 3000

// Setup Auth0 JWT middleware
const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_DOMAIN,
  tokenSigningAlg: 'RS256',
})

// Middleware order
app.use(cors())
app.use(express.json())

// Protect all routes under /api with JWT check
app.use('/api', jwtCheck)

// Your skill routes under /api/skills
app.use('/api/skills', skillRoutes)

// Connect to DB and start server
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  })
  .catch((err) => console.error('Mongo connection error:', err))

// Error handling middleware
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ message: 'Invalid or missing token' })
  }
  next(err)
})
