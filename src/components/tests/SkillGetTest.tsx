import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { FULL_API_URL } from '../../../utils/config';

interface Skill {
  _id: string;
  name: string;
  category: string;
  level: string;
}
export default function SkillGetTest() {
  const { getAccessTokenSilently } = useAuth0();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function testGetSkills() {
    try {
      const token = await getAccessTokenSilently();
      console.log('Token:', token?.slice(0, 10) + '...');

      // Assuming userId is in token payload's sub claim
      const payload = JSON.parse(atob(token.split('.')[1]));
      const userId = payload.sub;

      const res = await fetch(`${FULL_API_URL}/${userId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Failed to fetch skills: ${res.status} ${text}`);
      }

      const data = await res.json();
      setSkills(data);
      setError(null);
      console.log('Fetched skills:', data);
    } catch (err: unknown) {
  console.error(err);
  setError((err as Error).message || 'Unknown error');
  setSkills([]);
}
  }

  return (
    <div>
      <button onClick={testGetSkills}>Test Get Skills</button>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {skills.length > 0 && (
        <ul>
          {skills.map((skill) => (
            <li key={skill._id}>
              {skill.name} — {skill.category} — Level {skill.level}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
