import { ListGroup, Button, Badge } from "react-bootstrap";
import type { SkillNode } from "../store/useSkills";

// eslint-disable-next-line react-refresh/only-export-components
export const placeholderSkills: SkillNode[] = [
  // Frontend
  { id: "f1", name: "React", category: "frontend", level: 4 },
  { id: "f2", name: "TypeScript", category: "frontend", level: 4 },
  { id: "f3", name: "Next.js", category: "frontend", level: 3 },
  { id: "f4", name: "Tailwind CSS", category: "frontend", level: 5 },
  { id: "f5", name: "Framer Motion", category: "frontend", level: 3 },
  { id: "f6", name: "Zustand", category: "frontend", level: 3 },

  // Backend
  { id: "b1", name: "Node.js", category: "backend", level: 4 },
  { id: "b2", name: "Express.js", category: "backend", level: 4 },
  { id: "b3", name: "PostgreSQL", category: "backend", level: 3 },
  { id: "b4", name: "MongoDB", category: "backend", level: 3 },
  { id: "b5", name: "Prisma", category: "backend", level: 2 },
  { id: "b6", name: "GraphQL", category: "backend", level: 3 },

  // Tooling
  { id: "t1", name: "Vite", category: "tooling", level: 4 },
  { id: "t2", name: "ESLint", category: "tooling", level: 4 },
  { id: "t3", name: "Prettier", category: "tooling", level: 4 },
  { id: "t4", name: "Webpack", category: "tooling", level: 2 },
  { id: "t5", name: "Vitest", category: "tooling", level: 3 },
  { id: "t6", name: "Jest", category: "tooling", level: 3 },

  // DevOps
  { id: "d1", name: "Docker", category: "devops", level: 3 },
  { id: "d2", name: "GitHub Actions", category: "devops", level: 2 },
  { id: "d3", name: "Vercel", category: "devops", level: 4 },
  { id: "d4", name: "Netlify", category: "devops", level: 3 },
  { id: "d5", name: "CI/CD Pipelines", category: "devops", level: 2 },
  { id: "d6", name: "Nginx", category: "devops", level: 2 },
];

interface SkillDisplayListProps {
  skills: SkillNode[];
  isAuthenticated: boolean;
  removeSkill: (id: string, getToken: () => Promise<string>) => void;
  getAccessTokenSilently: () => Promise<string>;
}

export function SkillDisplayList({
  skills,
  isAuthenticated,
  removeSkill,
  getAccessTokenSilently,
}: SkillDisplayListProps) {
  const sortedSkills = [...skills].sort(
    (a, b) => a.category.localeCompare(b.category) || b.level - a.level
  );

  return (
    <ListGroup>
      {sortedSkills.map(({ id, name, category, level }) => (
        <ListGroup.Item
          key={id}
          className="d-flex justify-content-between align-items-center"
        >
          <div>
            {name} <Badge bg="secondary">{category}</Badge>{" "}
            <small>Lvl {level}</small>
          </div>
          {isAuthenticated && (
            <Button
              variant="danger"
              size="sm"
              onClick={() => removeSkill(id, getAccessTokenSilently)}
            >
              Remove
            </Button>
          )}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
