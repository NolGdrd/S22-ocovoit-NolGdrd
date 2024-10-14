import { z } from "zod";

const createRoleSchema = z
  .object({
    name: z.string().min(2),
  })
  .strict();

const modifyRoleSchema = createRoleSchema;

export { createRoleSchema, modifyRoleSchema };
