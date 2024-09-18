import logger from "@open-syk/common/logger";

import app from "./controllers/app";

const log = logger("Main Server");
const port = process.env.PORT ?? 3000;

app.listen(port, () => {
  log.info("APP_LISTENING_ON_PORT", { port });
});
