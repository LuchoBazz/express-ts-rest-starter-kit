import cors from "cors";
import express from "express";
import morgan from "morgan";

import { healthCheck, logError, logRequest, notFound } from "../../adapters/api/middlewares/basics";
import { addUserToRequestMiddleware } from "../../adapters/api/middlewares/user.middlweare";
import authRouter from "./auth.router";
import lemonSqueezeRouter from "./lemonsqueeze.router";
import organizationRouter from "./organization.router";
import subscriptionRouter from "./subscription.router";
import subscriptionPaymentRouter from "./subscription_payment.router";
import subscriptionPlanRouter from "./subscription_plan.router";
import userRouter from "./user.route";

const router = express();
const logFormat =
  ":date[iso] :remote-addr :remote-user :method :url " +
  "HTTP/:http-version :status :res[content-length] - :response-time ms\n" +
  "Referer: :referrer\n" +
  "User-Agent: :user-agent";

router.use(addUserToRequestMiddleware);

router.use(cors());
router.disable("x-powered-by");
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.get("/", healthCheck);
router.get("/health", healthCheck);
router.use("/organizations", organizationRouter);
router.use("/subscriptions", subscriptionRouter);
router.use("/subscription-plans", subscriptionPlanRouter);
router.use("/subscription-payments", subscriptionPaymentRouter);
router.use("/authentication", authRouter);
router.use("/users", userRouter);
router.use("/webhooks", lemonSqueezeRouter);

router.use(morgan(logFormat));
router.use(logRequest);

router.use(notFound);
router.use(logError);

export default router;
