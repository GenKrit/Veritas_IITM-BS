// veritas-website\app\api\admin\events\[id]\route.ts

import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth/admin";
import {
  getEventById,
  updateEvent,
  deleteEvent,
} from "@/lib/events/admin";
import { canEditEvent, canDeleteEvent } from "@/lib/auth/permissions";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {

   const { id } = await params;
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const event = await getEventById(id);
  return NextResponse.json(event);
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {

  const { id } = await params;

  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!canEditEvent(admin)) {
    return NextResponse.json(
      { error: "Forbidden: insufficient permissions" },
      { status: 403 }
    );
  }

  const body = await req.json();

  const updated = await updateEvent(id, {
    ...body,
    date: body.date ? new Date(body.date) : undefined,
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {

  
  const { id } = await params;
  
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!canDeleteEvent(admin)) {
    return NextResponse.json(
      { error: "Forbidden: insufficient permissions" },
      { status: 403 }
    );
  }

  await deleteEvent(id);
  return NextResponse.json({ success: true });
}
