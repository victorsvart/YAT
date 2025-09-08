import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./app/lib/drizzle/migrations",
  schema: "./app/lib/drizzle/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
