import { decryptPassword } from "@/app/lib/bcrypt/helpers";
import { selectUser } from "@/app/lib/drizzle/store/users/user-store";
import { Success, Unauthorized } from "@/app/lib/http/helpers";
import { createSession } from "@/app/lib/jwt/session";
import { LoginForm } from "@/app/lib/types/schema/login-form-schema";

export async function POST(request: Request): Promise<Response> {
  const data = (await request.json()) as LoginForm;
  const user = await selectUser(data.username);

  if (!user || !(await decryptPassword(data.password, user.password))) {
    return Unauthorized({
      msg: "Invalid username or password",
    });
  }

  await createSession(user.id);
  return Success({ msg: "Success", data: undefined });
}
