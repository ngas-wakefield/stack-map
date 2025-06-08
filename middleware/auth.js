// checkJwt.js (your current file)
import { expressjwt as jwt } from 'express-jwt'
import jwksRsa from 'jwks-rsa'

export const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri:
      'https://piwakawaka2022-ngahine.au.auth0.com/.well-known/jwks.json',
  }),
  audience: 'https://api.stackmap.dev',
  issuer: 'https://piwakawaka2022-ngahine.au.auth0.com/',
  algorithms: ['RS256'],
})

// Middleware to check if required scopes exist in token
export function checkScopes(requiredScopes) {
  return (req, res, next) => {
    const tokenScopes = req.auth?.scope?.split(' ') || []
    const hasScopes = requiredScopes.every((scope) =>
      tokenScopes.includes(scope)
    )
    if (!hasScopes) {
      return res.status(403).json({ message: 'Insufficient scope' })
    }
    next()
  }
}
