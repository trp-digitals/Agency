// ─────────────────────────────────────────────────────────────────────────────
// Prisma Client Singleton — Prisma 7 + NeonDB Serverless
// Uses @prisma/adapter-neon for serverless-compatible connection pooling.
// Prevents multiple instances during Next.js hot reload in development.
// ─────────────────────────────────────────────────────────────────────────────
import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neonConfig } from "@neondatabase/serverless";
import ws from "ws";

// Required for NeonDB serverless WebSocket support in Node.js
neonConfig.webSocketConstructor = ws;

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL environment variable is not set");
  }
  // PrismaNeon accepts a PoolConfig object (not a Pool instance)
  const adapter = new PrismaNeon({ connectionString });
  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;

