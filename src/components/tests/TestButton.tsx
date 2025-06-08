
import { useAuth0, type GetTokenSilentlyOptions } from '@auth0/auth0-react'

interface MyTokenOptions extends GetTokenSilentlyOptions {
  audience?: string
  scope?: string
}

export default function GetTokenButton() {
  const { getAccessTokenSilently } = useAuth0()

  const handleClick = async () => {
    try {
      const options: MyTokenOptions = {
        audience: 'https://api.stackmap.dev',
        scope: 'read:skills write:skills delete:skills',
      }
      const token = await getAccessTokenSilently(options)
      console.log('Access Token:', token)
    } catch (e) {
      console.error('Error getting token:', e)
    }
  }

  return <button onClick={handleClick}>Get Access Token</button>
}
