import { create } from "zustand";
import { FULL_API_URL } from "../../utils/config";

export type SkillCategory = "frontend" | "backend" | "tooling" | "devops";

export interface SkillNode {
  id: string;
  name: string;
  category: SkillCategory;
  level: number;
}

export type SkillNodeFromBackend = {
  _id: string;
  skillName: string;
  category: SkillCategory;
  level: number;
};

type SkillStore = {
  skills: SkillNode[];
  isLoading: boolean;

  setSkills: (skills: SkillNodeFromBackend[]) => void;

  addSkill: (
    skill: Omit<SkillNode, "id">,
    getToken: () => Promise<string>
  ) => Promise<void>;

  removeSkill: (
    id: string,
    getToken: () => Promise<string>
  ) => Promise<void>;

  updateSkill: (
    id: string,
    updated: Partial<SkillNode>,
    getToken: () => Promise<string>
  ) => Promise<void>;

  fetchSkills: (getToken: () => Promise<string>) => Promise<void>;
};

// Helper to map backend skill to frontend skill
const formatSkill = (s: SkillNodeFromBackend): SkillNode => ({
  id: s._id,
  name: s.skillName,
  category: s.category,
  level: s.level,
});

export const useSkills = create<SkillStore>((set) => ({
  skills: [],
  isLoading: false,

  setSkills: (skillsFromBackend) =>
    set({
      skills: skillsFromBackend.map(formatSkill),
    }),

  addSkill: async (
    skill: Omit<SkillNode, "id">,
    getToken: () => Promise<string>
  ): Promise<void> => {
    try {
      const token = await getToken();

      const res = await fetch(FULL_API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          skillName: skill.name,
          category: skill.category,
          level: skill.level,
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Add skill failed:", res.status, errorText);
        throw new Error("Failed to add skill");
      }

      const savedSkill: SkillNodeFromBackend = await res.json();

      set((state) => ({
        skills: [...state.skills, formatSkill(savedSkill)],
      }));
    } catch (error) {
      console.error("addSkill error:", error);
      throw error;
    }
  },

  removeSkill: async (
    id: string,
    getToken: () => Promise<string>
  ): Promise<void> => {
    try {
      const token = await getToken();

      const res = await fetch(`${FULL_API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to remove skill");

      set((state) => ({
        skills: state.skills.filter((s) => s.id !== id),
      }));
    } catch (error) {
      console.error("removeSkill error:", error);
      throw error;
    }
  },

  updateSkill: async (
    id: string,
    updated: Partial<SkillNode>,
    getToken: () => Promise<string>
  ): Promise<void> => {
    try {
      const token = await getToken();

      const res = await fetch(`${FULL_API_URL}/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          skillName: updated.name,
          category: updated.category,
          level: updated.level,
        }),
      });

      if (!res.ok) throw new Error("Failed to update skill");

      const savedSkill: SkillNodeFromBackend = await res.json();

      set((state) => ({
        skills: state.skills.map((s) =>
          s.id === id ? formatSkill(savedSkill) : s
        ),
      }));
    } catch (error) {
      console.error("updateSkill error:", error);
      throw error;
    }
  },

  fetchSkills: async (getToken: () => Promise<string>): Promise<void> => {
    set({ isLoading: true }); // start loading
    try {
      const token = await getToken();

      const payload = JSON.parse(atob(token.split(".")[1]));
      const userId = payload.sub;

      const res = await fetch(`${FULL_API_URL}/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to fetch skills: ${res.status} ${errorText}`);
      }

      const skillsFromBackend: SkillNodeFromBackend[] = await res.json();

      set({
        skills: skillsFromBackend.map((s) => ({
          ...formatSkill(s),
          category: s.category.toLowerCase() as SkillCategory,
        })),
      });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (
        error.error === "login_required" ||
        (error.message && error.message.toLowerCase().includes("login required"))
      ) {
        set({ skills: [] });
        return;
      }
      console.error("fetchSkills error:", error);
      throw error;
    } finally {
      set({ isLoading: false }); // done loading
    }
  },
}));
