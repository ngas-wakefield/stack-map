import { useState, useEffect } from "react";
import { useSkills, type SkillCategory } from "../store/useSkills";
import { useAuth0 } from "@auth0/auth0-react";

import { Button, Form, ListGroup, Badge, Spinner, Alert } from "react-bootstrap";

const categories: SkillCategory[] = ["frontend", "backend", "tooling", "devops"];

export function SkillList() {
  const skills = useSkills((state) => state.skills);
  const addSkill = useSkills((state) => state.addSkill);
  const removeSkill = useSkills((state) => state.removeSkill);
  const fetchSkills = useSkills((state) => state.fetchSkills);

const { getAccessTokenSilently, isAuthenticated } = useAuth0();


  const [name, setName] = useState("");
  const [category, setCategory] = useState<SkillCategory>("frontend");
  const [level, setLevel] = useState(1);

  const [loading, setLoading] = useState(true); // start loading true for first fetch
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSkills(getAccessTokenSilently)
      .then(() => setLoading(false))
      .catch((err) => {
        console.error("Failed to fetch skills:", err);
        //setError("Failed to load skills");
        setLoading(false);
      });
  }, [fetchSkills, getAccessTokenSilently]);

  const handleAdd = async () => {
    if (name.trim() === "") return;

    setLoading(true);
    setError(null);

    try {
      await addSkill({ name, category, level }, getAccessTokenSilently);
      setName("");
      setLevel(1);
    } catch (err) {
      setError("Failed to add skill");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Skill List</h3>

      {error && <Alert variant="danger">{error}</Alert>}

<Form
  onSubmit={(e) => {
    e.preventDefault();
    handleAdd();
  }}
>
  <Form.Group className="mb-2" controlId="skillName">
    <Form.Control
      type="text"
      placeholder="Skill name"
      value={name}
      onChange={(e) => setName(e.target.value)}
      disabled={loading || !isAuthenticated}
    />
  </Form.Group>

  <Form.Group className="mb-2" controlId="skillCategory">
    <Form.Select
      value={category}
      onChange={(e) => setCategory(e.target.value as SkillCategory)}
      disabled={loading || !isAuthenticated}
    >
      {categories.map((c) => (
        <option key={c} value={c}>
          {c.charAt(0).toUpperCase() + c.slice(1)}
        </option>
      ))}
    </Form.Select>
  </Form.Group>

  <Form.Group className="mb-3" controlId="skillLevel">
    <Form.Label>Level: {level}</Form.Label>
    <Form.Range
      min={1}
      max={5}
      value={level}
      onChange={(e) => setLevel(Number(e.target.value))}
      disabled={loading || !isAuthenticated}
    />
  </Form.Group>

  <Button
    type="submit"
    variant="primary"
    size="sm"
    className="mb-3"
    disabled={loading || !isAuthenticated}
  >
    {loading ? (
      <>
        <Spinner animation="border" size="sm" /> Adding...
      </>
    ) : (
      "Add Skill"
    )}
  </Button>

{!isAuthenticated && (
  <Alert variant="info">
    Log in to see and save your skills!
  </Alert>
)}

</Form>


      {loading && (
        <div className="text-center my-3">
          <Spinner animation="border" role="status" />
          <div>Loading skills...</div>
        </div>
      )}

      {!loading && !error && skills.length > 0 && (
        <ListGroup>
          {skills.map(({ id, name, category, level }) => (
            <ListGroup.Item
              key={id}
              className="d-flex justify-content-between align-items-center"
            >
              <div>
                {name} <Badge bg="secondary">{category}</Badge> <small>Lvl {level}</small>
              </div>
              <Button
                variant="danger"
                size="sm"
                onClick={() => removeSkill(id, getAccessTokenSilently)}
                disabled={loading}
              >
                Remove
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
}
