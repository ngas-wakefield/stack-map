import { expressjwt as jwt } from 'express-jwt'
import jwksRsa from 'jwks-rsa'

export const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${process.env.AUTH0_DOMAIN}.well-known/jwks.json`,
  }),
  audience: process.env.AUTH0_AUDIENCE,
  issuer: process.env.AUTH0_DOMAIN,
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
