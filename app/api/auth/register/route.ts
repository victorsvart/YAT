import { createUser } from "@/app/lib/drizzle/store/users/user-store";
import { Success } from "@/app/lib/http/helpers";
import { createSession } from "@/app/lib/jwt/session";
import { RegisterForm } from "@/app/lib/types/schema/register-form-schema";

export async function POST(request: Request) {
  const data = (await request.json()) as RegisterForm;
  const result = await createUser(data);
  await createSession(result.id);
  return Success({ msg: "Success", data: undefined });
}
