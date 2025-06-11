import  { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { FULL_API_URL } from '../../../utils/config';

export default function SkillDeleteTest() {
  const { getAccessTokenSilently } = useAuth0();
  const [skillId, setSkillId] = useState('');
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function testDeleteSkill() {
    try {
      const token = await getAccessTokenSilently();
      console.log('Token:', token?.slice(0, 10) + '...');




const res = await fetch(`${FULL_API_URL}/${skillId}`, {

        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Failed to delete skill: ${res.status} ${text}`);
      }

      const result = await res.json();
      console.log('Delete result:', result);
      setResponseMessage('Skill successfully deleted');
      setError(null);
    } catch (err: unknown) {
  console.error(err);
  setError((err as Error).message || 'Unknown error');
  setResponseMessage(null);
}
  }

  return (
    <div>
      <h3>Test Delete Skill</h3>
      <input
        type="text"
        placeholder="Enter skill ID"
        value={skillId}
        onChange={(e) => setSkillId(e.target.value)}
        style={{ marginRight: '10px' }}
      />
      <button onClick={testDeleteSkill}>Test Delete</button>
      {responseMessage && <p style={{ color: 'green' }}>{responseMessage}</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </div>
  );
}
