// import { prisma } from "@/db/client";
// import { cookies } from "next/headers";

// const SESSION_COOKIE = "veritas_admin_session";

// export async function getAdminByEmail(email: string) {
//   return prisma.adminUser.findUnique({
//     where: { email },
//   });
// }

// export async function getCurrentAdmin() {
//   const cookieStore = await cookies(); // IMPORTANT
//   const sessionId = cookieStore.get(SESSION_COOKIE)?.value;

//   if (!sessionId) return null;

//   const session = await prisma.adminSession.findUnique({
//     where: { id: sessionId },
//     include: { admin: true },
//   });

//   if (!session) return null;

//   if (session.expiresAt < new Date()) {
//     await prisma.adminSession.delete({
//       where: { id: sessionId },
//     });
//     return null;
//   }

//   return session.admin;
// }

// export async function cleanupExpiredSessions() {
//   await prisma.adminSession.deleteMany({
//     where: {
//       expiresAt: {
//         lt: new Date(),
//       },
//     },
//   });
// }
// veritas-website\lib\auth\admin.ts

import { prisma } from "@/db/client";
import { cookies } from "next/headers";

const SESSION_COOKIE = "veritas_admin_session";

export async function getAdminByEmail(email: string) {
  return prisma.adminUser.findUnique({
    where: { email },
  });
}

export async function getCurrentAdmin() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(SESSION_COOKIE)?.value;

  if (!sessionId) return null;

  const session = await prisma.adminSession.findUnique({
    where: { id: sessionId },
    include: { admin: true },
  });

  if (!session) return null;

  // Enforce expiry in code
  if (session.expiresAt < new Date()) {
    await prisma.adminSession.delete({
      where: { id: sessionId },
    });
    return null;
  }

  return session.admin;
}

export async function cleanupExpiredSessions() {
  await prisma.adminSession.deleteMany({
    where: {
      expiresAt: {
        lt: new Date(),
      },
    },
  });
}