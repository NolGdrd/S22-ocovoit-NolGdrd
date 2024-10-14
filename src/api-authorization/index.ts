import express from "express";
import acesssControlMatrix from "./app/models/accessControlMatrix";
import debug from "debug";

const log = debug("app:authorization");

const app = express();

app.use(express.json());

// ce service doit être capable à partir d'un role, d'un chemin et d'une méthode de vérifier si l'utilisateur a le droit d'accéder à cette ressource

("/posts/fd54fgdg4654d56fh4d");

app.post("/", (req: express.Request, res: express.Response) => {
  log("authorization service", req.body);
  const { role, method, path } = req.body;

  const accessRule = acesssControlMatrix.find(
    rule =>
      rule.role === role &&
      rule.method === method &&
      rule.path === "/" + path.split("/")[1]
  );

  if (accessRule?.allowed) {
    res.status(200).json({ status: "success" });
  } else {
    res.status(403).json({ status: "fail" });
  }
});

app.listen(3000, () => {
  log("Authorization service is running on port 3000");
});