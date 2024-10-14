import createServer from "./app/server";
import debug from "debug";

const log = debug("app:api-users");

const app = createServer();

app.listen(3000, () => {
  log("🚀 api-users ready on port 3000");
});
