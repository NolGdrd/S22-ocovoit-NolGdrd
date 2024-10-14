import { Request, Response, NextFunction } from "express";
import debug from "debug";
import HttpError from "../errors/httpError";

const log = debug("app:api-users:error");

const errorMiddleware = (
  error: Error,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
): void => {
  log(error);
  if (error instanceof HttpError) {
    res.status(error.status).json({ status: "error", message: error.message });
  } else {
    if (process.env.NODE_ENV === "development") {
      res
        .status(500)
        .json({ status: "error", message: error.message, stack: error.stack });
      return;
    }
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

export default errorMiddleware;
