import { Router } from "express";

import {
  createSubscriptionController,
  deleteSubscriptionController,
  findSubscriptionByOrganizationsController,
  findSubscriptionController,
  updateSubscriptionController,
} from "../../adapters/api/controllers/subscriptions/subscription.controller";
import { permissionChecker } from "../../adapters/api/middlewares/permitions";
import { PermissionsValues } from "../../core/entities/users/authentication.enum";

const { GUEST_MODE } = PermissionsValues;

const subscription = Router();

// Subscription
subscription.get("/", permissionChecker([GUEST_MODE]), findSubscriptionByOrganizationsController);
subscription.get("/:id", permissionChecker([GUEST_MODE]), findSubscriptionController);
subscription.post("/", permissionChecker([GUEST_MODE]), createSubscriptionController);
subscription.put("/:id", permissionChecker([GUEST_MODE]), updateSubscriptionController);
subscription.delete("/:id", permissionChecker([GUEST_MODE]), deleteSubscriptionController);

export default subscription;
