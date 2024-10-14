import { z } from "zod";

const createUserSchema = z
  .object({
    lastname: z.string().min(2),
    firstname: z.string().min(2).optional(),
    email: z.string().email(),
    password: z.string().min(8),
    image: z.string().optional(),
  })
  .strict();

const modifyUserSchema = z
  .object({
    lastname: z.string().min(2).optional(),
    firstname: z.string().min(2).optional(),
    email: z.string().email().optional(),
    password: z.string().min(8).optional(),
    image: z.string().optional(),
  })
  .strict()
  .refine(data => Object.values(data).some(value => value !== undefined), {
    message: "At least one property must be defined",
  });

export { createUserSchema, modifyUserSchema };
