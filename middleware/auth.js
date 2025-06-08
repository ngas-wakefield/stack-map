import { expressjwt as jwt } from 'express-jwt'
import jwksRsa from 'jwks-rsa'

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://piwakawaka2022-ngahine.au.auth0.com/.well-known/jwks.json`,
  }),

  audience: 'https://api.stackmap.dev', // ✅ MUST match your Auth0 API identifier!
  issuer: 'https://piwakawaka2022-ngahine.au.auth0.com/', // ✅ Needs https:// prefix!
  algorithms: ['RS256'],
})

export default checkJwt
