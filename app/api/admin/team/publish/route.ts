// app/api/admin/team/publish/route.ts
import { prisma } from "@/db/client";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/requireAdmin";
import { canManageTeam } from "@/lib/auth/permissions";
import { Department } from "@prisma/client";
// Revalidation path implemented to update public static event listings after admin changes
import { revalidatePublic } from "@/lib/revalidate";

type TeamMemberInput = {
  id: string;
  name: string;
  email: string;
  role: string;
  imageLink: string | null;
  linkedinLink: string | null;
  orderIndex: number;
};

export async function POST(req: Request) {
  try {
    const admin = await requireAdmin();

    if (!canManageTeam(admin)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const {
      department,
      members,
    }: { department: Department | null; members: TeamMemberInput[] } =
      await req.json();

    // Validate department (allow null for society leadership)
    if (
      department !== null &&
      !Object.values(Department).includes(department)
    ) {
      return NextResponse.json(
        { error: "Invalid department" },
        { status: 400 }
      );
    }

    // Validate each member
    if (!Array.isArray(members)) {
      return NextResponse.json(
        { error: "Invalid members data" },
        { status: 400 }
      );
    }

    for (const member of members) {
      if (!member.name?.trim()) {
        return NextResponse.json(
          { error: "All members must have a name" },
          { status: 400 }
        );
      }
      if (!member.email?.trim() || !member.email.includes("@")) {
        return NextResponse.json(
          { error: "All members must have a valid email" },
          { status: 400 }
        );
      }
      if (!member.role?.trim()) {
        return NextResponse.json(
          { error: "All members must have a role" },
          { status: 400 }
        );
      }
    }

    // Perform database transaction
    await prisma.$transaction(async (tx) => {
      // Delete all existing members for this department (or null)
      await tx.teamMember.deleteMany({
        where: { department: department },
      });

      // Create fresh members (handles both new and existing)
      if (members.length > 0) {
        await tx.teamMember.createMany({
          data: members.map((m, index) => ({
            // If ID starts with "temp-", don't provide it (Prisma generates new UUID)
            id: m.id.startsWith("temp-") ? undefined : m.id,
            name: m.name.trim(),
            email: m.email.trim().toLowerCase(),
            role: m.role.trim(),
            imageLink: m.imageLink?.trim() || null,
            linkedinLink: m.linkedinLink?.trim() || null,
            department: department,
            orderIndex: index,
          })),
        });
      }
    });

    // Revalidate public team page
    await revalidatePublic([
      "/team",
    ]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Team update error:", err);
    return NextResponse.json(
      { error: "Failed to update team" },
      { status: 500 }
    );
  }
}
