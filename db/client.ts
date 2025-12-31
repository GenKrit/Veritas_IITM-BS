// // ../db/client.ts

// import { PrismaClient } from "@prisma/client"
// import { PrismaPg } from "@prisma/adapter-pg"
// import { Pool } from "pg"

// const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

// const pool = new Pool({ connectionString: process.env.DATABASE_URL! })
// const adapter = new PrismaPg(pool)

// export const prisma = globalForPrisma.prisma ?? 
//   new PrismaClient({ 
//     adapter,  // Add this
//     log: ["error"],
//   })

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

// ../db/client.ts

import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import { Pool } from "pg"

const connectionString = process.env.DATABASE_URL!

const globalForPrisma = globalThis as unknown as { 
  prisma: PrismaClient,
  pool: Pool  // Cache the pool too!
}

const createPrismaClient = () => {
  const pool = globalForPrisma.pool ?? new Pool({
    connectionString,
    max: 1  // Critical for serverless
  })
  // Cache pool in development
  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.pool = pool
  }
  const adapter = new PrismaPg(pool)

  return new PrismaClient({ 

    adapter,

    log: process.env.NODE_ENV === "development" ? ["query", "error"] : ["error"],

  })

}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma