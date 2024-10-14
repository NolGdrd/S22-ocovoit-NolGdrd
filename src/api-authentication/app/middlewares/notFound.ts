import { Request, Response, NextFunction } from "express";
import HttpError from "../errors/httpError";

const errorMiddleware = (
  _req: Request,
  _res: Response,
  next: NextFunction
): void => {
  next(new HttpError(404, "Not found"));
};

export default errorMiddleware;
