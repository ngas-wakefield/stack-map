import React, { useState } from "react";
import { useSkills, type SkillCategory } from "../store/useSkills";

import { Button, Form, ListGroup, Badge } from "react-bootstrap";

const categories: SkillCategory[] = ["frontend", "backend", "tooling", "devops"];

export function SkillList() {
  const skills = useSkills((state) => state.skills);
  const addSkill = useSkills((state) => state.addSkill);
  const removeSkill = useSkills((state) => state.removeSkill);

  const [name, setName] = useState("");
  const [category, setCategory] = useState<SkillCategory>("frontend");
  const [level, setLevel] = useState(1);

  const handleAdd = () => {
    if (name.trim() === "") return;
    addSkill({ name, category, level });
    setName("");
    setLevel(1);
  };

  return (
    <div>
      <h3>Skill List</h3>

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
          />
        </Form.Group>

        <Form.Group className="mb-2" controlId="skillCategory">
          <Form.Select
            value={category}
            onChange={(e) => setCategory(e.target.value as SkillCategory)}
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
          />
        </Form.Group>

        <Button type="submit" variant="primary" size="sm" className="mb-3">
          Add Skill
        </Button>
      </Form>

      <ListGroup>
        {skills.map(({ id, name, category, level }) => (
          <ListGroup.Item key={id} className="d-flex justify-content-between align-items-center">
            <div>
              {name} <Badge bg="secondary">{category}</Badge> <small>Lvl {level}</small>
            </div>
            <Button variant="danger" size="sm" onClick={() => removeSkill(id)}>
              Remove
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}
