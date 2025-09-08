import { integer, pgTable, varchar, date } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  username: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});

export const postsTable = pgTable("posts", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer()
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  content: varchar({ length: 1000 }).notNull(),
  // image: varchar({ length: 255 }),
  createdAt: date().notNull(),
  likes: integer().default(0).notNull(),
  comments: integer().default(0).notNull(),
  shares: integer().default(0).notNull(),
  category: varchar({ length: 50 }).notNull().default("general"),
});
