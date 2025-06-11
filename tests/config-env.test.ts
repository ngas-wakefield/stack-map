import { describe, it, expect } from 'vitest'
import dotenv from 'dotenv'
import path from 'path'

describe('Actual .env file values', () => {
  it('loads values from .env file', () => {
    dotenv.config({ path: path.resolve(__dirname, '../.env') })

    expect(process.env.AUTH0_DOMAIN).toBe('https://stackmap.au.auth0.com')
    expect(process.env.AUTH0_AUDIENCE).toBe('https://api.stackmap.dev')
  })

  it('loads values from .env.production file', () => {
    dotenv.config({ path: path.resolve(__dirname, '../.env.production') })

    expect(process.env.AUTH0_DOMAIN).toMatch(/^https:\/\/.+\.auth0\.com$/)
    expect(process.env.MONGODB_URI).toMatch(/^mongodb/)
  })
})
