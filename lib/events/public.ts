// // veritas-website\lib\events\public.ts

// import { prisma } from "@/db/client";

// export async function listPublicEvents() {
//   return prisma.event.findMany({
//     orderBy: {
//       date: "desc",
//     },
//   });
// }

// veritas-website/lib/events/public.ts
import { prisma } from "@/db/client";

export async function listPublicEvents() {
  const events = await prisma.event.findMany({
    orderBy: {
      date: "desc", // Most recent/upcoming dates first
    },
  });

  // Define status priority for same-date events: UPCOMING > CURRENT > LIVE > COMPLETED
  const statusPriority = {
    UPCOMING: 2,
    CURRENT: 3,
    LIVE: 1,
    COMPLETED: 4,
  };

  // Sort by date first (desc), then by status if dates match
  return events.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    
    // Primary sort: by date (desc - newer first)
    if (dateA !== dateB) {
      return dateB - dateA;
    }
    
    // Secondary sort: by status priority (only if dates are the same)
    return statusPriority[a.status] - statusPriority[b.status];
  });
}
