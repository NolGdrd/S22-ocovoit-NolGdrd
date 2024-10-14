import express, { Request, Response, NextFunction, Application } from "express";
import debug from "debug";
import router from "./routers";
import swagger from "./swagger";
import error from "./middlewares/error";

const log = debug("app:api-users");

function createServer(): Application {
  log("creating server");
  const app = express();
  swagger(app);

  app.use(express.json());
  app.use((req: Request, res: Response, next: NextFunction) => {
    log(`${req.method} ${req.url}`);
    next();
  });
  app.use("/api", router);
  app.use(error);

  return app;
}

export default createServer;
