import fetch from 'node-fetch'

async function getToken() {
  const res = await fetch(
    'https://piwakawaka2022-ngahine.au.auth0.com/oauth/token',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: 'swrWBEIWrhQr21vFAJveLbQ88Hkjt7zF',
        client_secret:
          'KJk4NmkFLK7BqjfmaNdx13KWPsd1NM8kDbswdB_mAHjv7HVz9bV26UdWX6tth2CE',
        audience: 'https://api.stackmap.dev',
        grant_type: 'client_credentials',
        scope: 'write:skills',
      }),
    }
  )

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
