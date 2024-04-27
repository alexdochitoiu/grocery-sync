import { ZodType, z } from "zod";

export type RegisterFormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

export const RegisterSchema: ZodType<RegisterFormData> = z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
  });
