import { z } from "zod";

const signUpSchema = z
  .object({
    lastname: z.string().min(2),
    firstname: z.string().min(2).optional(),
    email: z.string().email(),
    password: z.string().min(8),
  })
  .strict();

const signInSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
  })
  .strict();

export { signUpSchema, signInSchema };
