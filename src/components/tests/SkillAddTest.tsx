
import { useAuth0 } from '@auth0/auth0-react';
import { FULL_API_URL } from '../../../utils/config';

export default function SkillAddTest() {
  const { getAccessTokenSilently } = useAuth0();

  async function testAddSkill() {
    try {
      const token = await getAccessTokenSilently();
      console.log('Token:', token?.slice(0, 10) + '...');

      const res = await fetch(FULL_API_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          skillName: 'Test Skill',
          category: 'frontend',
          level: 1,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        console.log('Skill added:', data);
        alert('Skill added successfully!');
      } else {
        console.error('Add skill failed:', res.status, data);
        alert(`Failed to add skill: ${res.status}`);
      }
    } catch (error) {
  console.error('Error adding skill:', error);
  alert(`Error: ${(error as Error).message}`);
}
  }

  return (
    <button onClick={testAddSkill}>
      Test Add Skill
    </button>
  );
}
