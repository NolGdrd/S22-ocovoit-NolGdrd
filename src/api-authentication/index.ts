import createServer from "./app/server";
import debug from "debug";

const log = debug("app:api-authentication");

const app = createServer();

app.listen(3000, () => {
  log("🚀 api-authentication ready on port 3000");
});
