import { create } from "zustand";
import { nanoid } from "nanoid";

export type SkillCategory = "frontend" | "backend" | "tooling" | "devops";

export interface SkillNode {
  id: string;
  name: string;
  category: SkillCategory;
  level: number; // 1 to 5
}

type SkillStore = {
  skills: SkillNode[];
  addSkill: (skill: Omit<SkillNode, "id">) => void;
  removeSkill: (id: string) => void;
  updateSkill: (id: string, updated: Partial<SkillNode>) => void;
};

const initialSkills: SkillNode[] = [
  { id: nanoid(), name: "React", category: "frontend", level: 4 },
  { id: nanoid(), name: "TypeScript", category: "frontend", level: 3 },
  { id: nanoid(), name: "Node.js", category: "backend", level: 3 },
  { id: nanoid(), name: "Docker", category: "devops", level: 2 },
  { id: nanoid(), name: "Git", category: "tooling", level: 4 },
];

export const useSkills = create<SkillStore>((set) => ({
  skills: initialSkills,
  addSkill: (skill) =>
    set((state) => ({
      skills: [...state.skills, { id: nanoid(), ...skill }],
    })),
  removeSkill: (id) =>
    set((state) => ({ skills: state.skills.filter((s) => s.id !== id) })),
  updateSkill: (id, updated) =>
    set((state) => ({
      skills: state.skills.map((s) => (s.id === id ? { ...s, ...updated } : s)),
    })),
}));
