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

const { GUEST_USER } = PermissionsValues;

const subscription = Router();

// Subscription
subscription.get("/", permissionChecker([GUEST_USER]), findSubscriptionByOrganizationsController);
subscription.get("/:id", permissionChecker([GUEST_USER]), findSubscriptionController);
subscription.post("/", permissionChecker([GUEST_USER]), createSubscriptionController);
subscription.put("/:id", permissionChecker([GUEST_USER]), updateSubscriptionController);
subscription.delete("/:id", permissionChecker([GUEST_USER]), deleteSubscriptionController);

export default subscription;
