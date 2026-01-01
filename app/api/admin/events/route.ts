// Veitas_IITM-web\veritas-website\app\api\admin\events\route.ts


import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth/admin";
import { listEvents, createEvent } from "@/lib/events/admin";
import { canCreateEvent } from "@/lib/auth/permissions";
import { EventAccess, EventStatus, EventType } from "@prisma/client";
// Revalidation path implemented to update public static event listings after admin changes
import { revalidatePublic } from "@/lib/revalidate";

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const events = await listEvents();
  return NextResponse.json(events);
}

export async function POST(req: Request) {
  const admin = await getCurrentAdmin();
  if (!admin || !canCreateEvent(admin)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const form = await req.formData();

  const type = form.get("type") as string | null;
  const status = form.get("status") as string | null;
  const access = form.get("access") as string | null;

  const event = await createEvent({
    name: form.get("name") as string,
    description: form.get("description") as string,

    type: type as EventType,
    status: status as EventStatus,
    access: access as EventAccess,

    venue: form.get("venue") as string,
    date: new Date(form.get("date") as string),
    time: form.get("time") as string,

    meetLink: form.get("meetLink")?.toString() || undefined,
    registrationLink: form.get("registrationLink")?.toString() || undefined,
    eventDocLink: form.get("eventDocLink")?.toString() || undefined,
    coverImageLink: form.get("coverImageLink")?.toString() || undefined,

    createdById: admin.id,
  });

  // Revalidate public pages
  await revalidatePublic([
    "/events",
  ]);


  return NextResponse.json(event);
}
