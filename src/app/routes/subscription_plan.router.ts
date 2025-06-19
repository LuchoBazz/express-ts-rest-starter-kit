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

const { GUEST_USER } = PermissionsValues;

const subscriptionPlanRouter = Router();

// Subscription Plan
subscriptionPlanRouter.get("/", permissionChecker([GUEST_USER]), findSubscriptionPlanByOrganizationController);
subscriptionPlanRouter.get("/:slug", permissionChecker([GUEST_USER]), findSubscriptionPlanController);
subscriptionPlanRouter.post("/", permissionChecker([GUEST_USER]), createSubscriptionPlanController);
subscriptionPlanRouter.put("/:slug", permissionChecker([GUEST_USER]), updateSubscriptionPlanController);
subscriptionPlanRouter.delete("/:slug", permissionChecker([GUEST_USER]), deleteSubscriptionPlanController);

export default subscriptionPlanRouter;
