import logger from "@open-syk/common/logger";

import { statsig } from "../infrastructure/configurations/statsig";
import app from "./routes/app";

const log = logger("Main Server");
const port = process.env.PORT ?? 3000;

app.listen(port, async () => {
  await statsig.initialize();
  log.info("APP_LISTENING_ON_PORT", { port });
});
