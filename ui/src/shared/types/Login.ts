import { ZodType, z } from "zod";

export type LoginFormData = {
  email: string;
  password: string;
};

export const LoginSchema: ZodType<LoginFormData> = z.object({
  email: z.string().email(),
  password: z.string(),
});
