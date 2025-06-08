import { useEffect } from "react";
import { useSkills, type SkillCategory, type SkillNode } from "../store/useSkills";
import { useAuth0 } from "@auth0/auth0-react";
import { Card, Row, Col, Badge, Spinner } from "react-bootstrap";
import { placeholderSkills } from "./SkillDisplayList"; // placeholder skills

const categoryColors: Record<SkillCategory, string> = {
  frontend: "primary",
  backend: "success",
  tooling: "warning",
  devops: "info",
};

export function SkillMap() {
  const skills = useSkills((state) => state.skills);
  const isLoading = useSkills((state) => state.isLoading);
  const fetchSkills = useSkills((state) => state.fetchSkills);

  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  // Fetch skills when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchSkills(getAccessTokenSilently).catch(console.error);
    }
  }, [isAuthenticated, fetchSkills, getAccessTokenSilently]);

  // Determine skills to display (placeholders if not authenticated)
  const displaySkills: SkillNode[] = !isAuthenticated ? placeholderSkills : skills;

  // Group skills by category
  const skillsByCategory = displaySkills.reduce<Record<SkillCategory, SkillNode[]>>(
    (acc, skill) => {
      (acc[skill.category] = acc[skill.category] || []).push(skill);
      return acc;
    },
    { frontend: [], backend: [], tooling: [], devops: [] }
  );

  return (
    <div>
      <h3>Skill Map</h3>

      {isAuthenticated && isLoading && (
        <div className="mb-3">
          <Spinner animation="border" size="sm" /> Loading your skills...
        </div>
      )}

      {isAuthenticated && !isLoading && skills.length === 0 && (
        <p>You have no skills yet. Start adding some!</p>
      )}

      {Object.entries(skillsByCategory).map(([category, skills]) => (
        <div key={category} className="mb-4">
          <h5>
            <Badge bg={categoryColors[category as SkillCategory]}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Badge>
          </h5>

          {skills.length === 0 && <p>No skills in this category.</p>}

          <Row xs={1} sm={2} md={3} lg={4} className="g-3">
            {skills.map(({ id, name, level }) => (
              <Col key={id}>
                <Card>
                  <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>Level: {level}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      ))}
    </div>
  );
}
