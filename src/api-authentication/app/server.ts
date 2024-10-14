import express, { Request, Response, NextFunction, Application } from "express";
import debug from "debug";
import router from "./routers";
import swagger from "./swagger";
import errorMw from "./middlewares/error";
import notFoundMw from "./middlewares/notFound";

const log = debug("app:api-authentication");

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
  app.use(notFoundMw);
  app.use(errorMw);

  return app;
}

export default createServer;
