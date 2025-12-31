// // veritas-website\lib\auth\session.ts

// import { prisma } from "@/db/client";
// import { cookies } from "next/headers";
// import { randomUUID } from "crypto";

// const SESSION_COOKIE = "veritas_admin_session";
// const SESSION_DURATION_HOURS = 12; // 12 hours session availaibility

// /**
//  * new admin session
//  */
// export async function createAdminSession(adminId: string) {
//   const sessionId = randomUUID();

//   const expiresAt = new Date();
//   expiresAt.setHours(expiresAt.getHours() + SESSION_DURATION_HOURS);

//   await prisma.adminSession.create({
//     data: {
//       id: sessionId,
//       adminId,
//       expiresAt,
//     },
//   });

//   const cookieStore = await cookies();

//   cookieStore.set(SESSION_COOKIE, sessionId, {
//     httpOnly: true,
//     sameSite: "strict",
//     secure: process.env.NODE_ENV === "production",
//     expires: expiresAt,
//     path: "/",
//   });
// }

// /**
//  * Get currently logged-in admin (or null)
//  */
// export async function getCurrentAdmin() {
//   const cookieStore = await cookies();
//   const sessionId = cookieStore.get(SESSION_COOKIE)?.value;

//   if (!sessionId) return null;

//   const session = await prisma.adminSession.findUnique({
//     where: { id: sessionId },
//     include: { admin: true },
//   });

//   if (!session) return null;

//   if (session.expiresAt < new Date()) {
//     await prisma.adminSession.delete({ where: { id: sessionId } });
//     cookieStore.delete(SESSION_COOKIE);
//     return null;
//   }

//   return session.admin;
// }

// /**
//  * Destroy current admin session
//  */
// export async function destroyAdminSession() {
//   const cookieStore = await cookies();
//   const sessionId = cookieStore.get(SESSION_COOKIE)?.value;

//   if (!sessionId) return;

//   await prisma.adminSession.deleteMany({
//     where: { id: sessionId },
//   });

//   cookieStore.delete(SESSION_COOKIE);
// }


// veritas-website\lib\auth\session.ts\
// willl later implement session management and longer session data to store in db with cron job cleanup

import { prisma } from "@/db/client";
import { cookies } from "next/headers";
import { randomUUID } from "crypto";

const SESSION_COOKIE = "veritas_admin_session";
const SESSION_DURATION_HOURS = 12;

/**
 * Clean up expired sessions
 */
async function cleanupExpiredSessions() {
  try {
    const result = await prisma.adminSession.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    });
    console.log(`🗑️ Cleaned up ${result.count} expired sessions`);
  } catch (error) {
    console.error("Error cleaning up sessions:", error);
  }
}

/**
 * Create new admin session
 */
export async function createAdminSession(adminId: string) {
  const sessionId = randomUUID();

  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + SESSION_DURATION_HOURS);

  // Clean up expired sessions BEFORE creating new one
  await cleanupExpiredSessions();

  await prisma.adminSession.create({
    data: {
      id: sessionId,
      adminId,
      expiresAt,
    },
  });

  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE, sessionId, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    path: "/",
  });
}

/**
 * Get currently logged-in admin (or null)
 */
export async function getCurrentAdmin() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(SESSION_COOKIE)?.value;

  if (!sessionId) return null;

  const session = await prisma.adminSession.findUnique({
    where: { id: sessionId },
    include: { admin: true },
  });

  if (!session) return null;

  if (session.expiresAt < new Date()) {
    await prisma.adminSession.delete({ where: { id: sessionId } });
    cookieStore.delete(SESSION_COOKIE);
    return null;
  }

  return session.admin;
}

/**
 * Destroy current admin session
 */
export async function destroyAdminSession() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(SESSION_COOKIE)?.value;

  if (!sessionId) return;

  await prisma.adminSession.deleteMany({
    where: { id: sessionId },
  });

  cookieStore.delete(SESSION_COOKIE);

  // Clean up expired sessions on logout too
  await cleanupExpiredSessions();
}
