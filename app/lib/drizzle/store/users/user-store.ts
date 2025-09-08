import { eq } from "drizzle-orm";
import { db } from "../..";
import { usersTable } from "../../db/schema";
import { RegisterForm } from "@/app/lib/types/schema/register-form-schema";

export async function selectUser(
  username: string
): Promise<{ id: number; password: string } | undefined> {
  const users = await db
    .select({ id: usersTable.id, password: usersTable.password })
    .from(usersTable)
    .where(eq(usersTable.username, username))
    .limit(1);

  return users[0];
}

export async function createUser(form: RegisterForm): Promise<{ id: number }> {
  const user: typeof usersTable.$inferInsert = {
    name: form.name,
    email: form.email,
    username: form.username,
    password: form.password,
  };

  const result = await db
    .insert(usersTable)
    .values(user)
    .returning({ id: usersTable.id });
  return result[0];
}
