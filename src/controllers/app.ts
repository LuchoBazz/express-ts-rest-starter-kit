import cors from "cors";
import express from "express";
import morgan from "morgan";

import { healthCheck, logError, logRequest, notFound } from "./middlewares/basics";
import organizationRouter from "./routes/organizations";

const router = express();
const logFormat =
  ":date[iso] :remote-addr :remote-user :method :url " +
  "HTTP/:http-version :status :res[content-length] - :response-time ms\n" +
  "Referer: :referrer\n" +
  "User-Agent: :user-agent";

router.use(cors());
router.disable("x-powered-by");
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.get("/", healthCheck);
router.get("/health", healthCheck);
router.use("/organizations", organizationRouter);
router.use(morgan(logFormat));
router.use(logRequest);

router.use(notFound);
router.use(logError);

export default router;
