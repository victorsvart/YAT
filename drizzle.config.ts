import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./lib/drizzle/migrations",
  schema: "./lib/drizzle/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  }
});
