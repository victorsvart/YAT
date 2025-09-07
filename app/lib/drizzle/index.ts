import { drizzle } from "drizzle-orm/node-postgres";
import { usersTable } from "./db/schema";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";

export const db = drizzle({
  connection: {
    connectionString: process.env.DATABASE_URL!,
  },
});

async function createAdminUser() {
  const exists = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.username, "admin"));

  if (exists.length > 0) {
    console.log("admin user is already seeded");
    return;
  }

  const user: typeof usersTable.$inferInsert = {
    name: "Admin Admin",
    email: "admin@admin.com",
    username: "admin",
    password: await bcrypt.hash(process.env.ADMIN_PASSWORD!, 10),
  };

  await db.insert(usersTable).values(user);
  console.log("Admin user created");

  const users = await db.select().from(usersTable);
  console.log("All users:", users);
  return;
}

async function main() {
  await createAdminUser();
  return;
}

main();
