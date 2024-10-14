import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import HttpError from "../errors/httpError";

function validate(
  schema: z.ZodObject<z.ZodRawShape> | z.ZodEffects<z.ZodObject<z.ZodRawShape>>,
  data: "query" | "params" | "body"
) {
  return function (req: Request, res: Response, next: NextFunction) {
    try {
      schema.parse(req[data]);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.log(JSON.stringify(error.errors, null, 2));
        next(new HttpError(400, error.errors[0].message));
      } else {
        next(error);
      }
    }
  };
}

export default validate;
