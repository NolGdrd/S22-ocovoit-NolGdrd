import express from "express";
import accessControlMatrix from "./app/models/accessControlMatrix"; // Corrigé le nom
import debug from "debug";

const log = debug("app:authorization");

const app = express();

app.use(express.json());


app.post("/check-access", (req: express.Request, res: express.Response) => {
  log("Authorization service", req.body);
  const { role, method, path } = req.body;

  const accessRule = accessControlMatrix.find(
    rule =>
      rule.role === role && 
      rule.method.toUpperCase() === method.toUpperCase() && 
      rule.path === path
  );

  if (accessRule?.allowed) {
    res.status(200).json({ status: "success", message: "Access granted" });
  } else {
    res.status(403).json({ status: "fail", message: "Access denied" });
  }
});

app.listen(3000, () => {
  log("Authorization service is running on port 3000");
});
