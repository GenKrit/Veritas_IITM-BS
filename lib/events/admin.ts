// veritas-website\lib\events\admin.ts

import { prisma } from "@/db/client";
import { EventStatus, EventType, EventAccess } from "@prisma/client";

export async function createEvent(data: {
  name: string;
  description: string;
  type: EventType;
  status: EventStatus;
  access: EventAccess;
  venue: string;
  date: Date;
  time: string;
  meetLink?: string;
  registrationLink?: string;
  eventDocLink?: string;
  coverImageLink?: string;
  createdById: string;
}) {
  return prisma.event.create({ data });
}

export async function updateEvent(
  id: string,
  data: Partial<Omit<Parameters<typeof createEvent>[0], "createdById">>
) {
  return prisma.event.update({
    where: { id },
    data,
  });
}

export async function deleteEvent(id: string) {
  return prisma.event.delete({
    where: { id },
  });
}

export async function getEventById(id: string) {
  return prisma.event.findUnique({
    where: { id },
    include: {
      createdBy: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
}


export async function listEvents() {
  return prisma.event.findMany({
    orderBy: { date: "desc" },
  });
}
