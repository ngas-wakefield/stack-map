import fetch from 'node-fetch'

async function getToken() {
  const res = await fetch(`https://${process.env.AUTH0_DOMAIN}/oauth/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: process.env.AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
      audience: process.env.AUTH0_AUDIENCE,
      grant_type: 'client_credentials',
      scope: 'write:skills',
    }),
  })

  const { access_token } = await res.json()
  return access_token
}

async function testPostSkill() {
  const token = await getToken()

  const res = await fetch('http://localhost:3000/api/skills', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      skillName: 'Automated Test Skill',
      category: 'backend',
      level: 2,
    }),
  })

  const text = await res.text()
  console.log('Status:', res.status)
  console.log('Raw response:', text)

  try {
    const data = JSON.parse(text)
    console.log('Parsed JSON:', data)
  } catch (err) {
    console.error('Failed to parse JSON:', err.message)
  }
}

testPostSkill()
