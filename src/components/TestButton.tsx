import { useAuth0 } from '@auth0/auth0-react';

function GetTokenButton() {
  const { getAccessTokenSilently } = useAuth0();

  const handleClick = async () => {
    const token = await getAccessTokenSilently();
    console.log("Access Token:", token); // Copy this into Postman
  };

  return <button onClick={handleClick}>Get Access Token</button>;
}

export default GetTokenButton