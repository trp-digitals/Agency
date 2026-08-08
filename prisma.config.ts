// ─────────────────────────────────────────────────────────────────────────────
// prisma.config.ts — Prisma 7 configuration file
// Prisma 7 requires connection URLs to be defined here instead of schema.prisma
// ─────────────────────────────────────────────────────────────────────────────
import path from "node:path";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: path.join("prisma", "schema.prisma"),
  datasource: {
    url: process.env.DIRECT_URL ?? process.env.DATABASE_URL ?? "",
  },
});
