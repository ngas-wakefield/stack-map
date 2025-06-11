import { useEffect } from 'react';
import { useAuth0, type GetTokenSilentlyOptions } from '@auth0/auth0-react';
import { useSkills, type SkillNodeFromBackend } from '../store/useSkills';
import { SkillList } from './SkillList';

interface MyTokenOptions extends GetTokenSilentlyOptions {
  audience?: string;
  scope?: string;
}

export function SkillsContainer() {
  const { user, getAccessTokenSilently, isAuthenticated } = useAuth0();
  const setSkills = useSkills((state) => state.setSkills);

  useEffect(() => {
    const fetchSkills = async () => {
      if (!user) return;

      try {
        const options: MyTokenOptions = {
          audience: 'https://api.stackmap.dev',
          scope: 'read:skills',
        };
        const token = await getAccessTokenSilently(options);

        const res = await fetch(`https://api.stackmap.dev/api/skills/${user.sub}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error('Failed to fetch skills');
        }

        const data: SkillNodeFromBackend[] = await res.json();
        setSkills(data);
      } catch (error) {
        console.error('Error fetching skills:', error);
      }
    };

    if (isAuthenticated) {
      fetchSkills();
    }
  }, [user, getAccessTokenSilently, isAuthenticated, setSkills]);

  return (
    <div>
      {/* You can render your SkillList component here */}
      <SkillList />
    </div>
  );
}
