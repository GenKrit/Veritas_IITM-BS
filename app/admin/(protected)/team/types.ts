// app/admin/(protected)/team/types.ts
import { Department, AdminRole } from "@prisma/client";

export type TeamMember = {
  id: string;
  name: string;
  email: string;
  role: string;
  imageLink: string | null;
  linkedinLink: string | null;
  department: Department | null;
  orderIndex: number;
};

export type DepartmentRole = "Volunteer" | "Core Member" | "Head of Department";
