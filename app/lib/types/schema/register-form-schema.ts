import z from "zod";

export const RegisterFormSchema = z.object({
  username: z
    .string()
    .min(5, "username must be at least 5 characters")
    .max(20, "username must be at most 20 characters "),
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export type RegisterForm = z.infer<typeof RegisterFormSchema>;
