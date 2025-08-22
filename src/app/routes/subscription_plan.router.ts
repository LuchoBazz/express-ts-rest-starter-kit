import { Router } from "express";

import {
  createSubscriptionPlanController,
  deleteSubscriptionPlanController,
  findSubscriptionPlanByOrganizationController,
  findSubscriptionPlanController,
  updateSubscriptionPlanController,
} from "../../adapters/api/controllers/subscriptions/subscription_plan.controller";
import { permissionChecker } from "../../adapters/api/middlewares/permitions";
import { PermissionsValues } from "../../core/entities/users/authentication.enum";

const { GUEST_MODE } = PermissionsValues;

const subscriptionPlanRouter = Router();

// Subscription Plan
subscriptionPlanRouter.get("/", findSubscriptionPlanByOrganizationController);
subscriptionPlanRouter.get("/:slug", permissionChecker([GUEST_MODE]), findSubscriptionPlanController);
subscriptionPlanRouter.post("/", permissionChecker([GUEST_MODE]), createSubscriptionPlanController);
subscriptionPlanRouter.put("/:slug", permissionChecker([GUEST_MODE]), updateSubscriptionPlanController);
subscriptionPlanRouter.delete("/:slug", permissionChecker([GUEST_MODE]), deleteSubscriptionPlanController);

export default subscriptionPlanRouter;
