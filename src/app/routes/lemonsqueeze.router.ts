import { Router } from "express";

import { lemonSqueezyController } from "../../adapters/api/controllers/subscriptions/lemonsqueezy.controller";

const lemonSqueezeRouter = Router();
lemonSqueezeRouter.post("/payment/lemon-squeeze", lemonSqueezyController);
export default lemonSqueezeRouter;
