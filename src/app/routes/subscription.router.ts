import { Router } from "express";

import {
  createPaymentController,
  deletePaymentController,
  findPaymentController,
  updatePaymentController,
} from "../../adapters/api/controllers/subscriptions/payment.controller";
import {
  createSubscriptionController,
  deleteSubscriptionController,
  findSubscriptionByOrganizationsController,
  findSubscriptionController,
  updateSubscriptionController,
} from "../../adapters/api/controllers/subscriptions/subscription.controller";
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

const subscription = Router();

// Subscription
subscription.get(
  "/:client_id/subscriptions",
  permissionChecker([GUEST_USER]),
  findSubscriptionByOrganizationsController,
);
subscription.get("/:client_id/subscriptions/:id", permissionChecker([GUEST_USER]), findSubscriptionController);
subscription.post("/:client_id/subscriptions", permissionChecker([GUEST_USER]), createSubscriptionController);
subscription.put("/:client_id/subscriptions/:id", permissionChecker([GUEST_USER]), updateSubscriptionController);
subscription.delete("/:client_id/subscriptions/:id", permissionChecker([GUEST_USER]), deleteSubscriptionController);

// Subscription Plan
subscription.get(
  "/:client_id/subscription-plans",
  permissionChecker([GUEST_USER]),
  findSubscriptionPlanByOrganizationController,
);
subscription.get(
  "/:client_id/subscription-plans/:slug",
  permissionChecker([GUEST_USER]),
  findSubscriptionPlanController,
);
subscription.post("/:client_id/subscription-plans", permissionChecker([GUEST_USER]), createSubscriptionPlanController);
subscription.put(
  "/:client_id/subscription-plans/:slug",
  permissionChecker([GUEST_USER]),
  updateSubscriptionPlanController,
);
subscription.delete(
  "/:client_id/subscription-plans/:slug",
  permissionChecker([GUEST_USER]),
  deleteSubscriptionPlanController,
);

// Subscription Payment
subscription.get(
  "/:client_id/subscription-payments/:payment_id",
  permissionChecker([GUEST_USER]),
  findPaymentController,
);
subscription.post("/:client_id/subscription-payments", permissionChecker([GUEST_USER]), createPaymentController);
subscription.put(
  "/:client_id/subscription-payments/:payment_id",
  permissionChecker([GUEST_USER]),
  updatePaymentController,
);
subscription.delete(
  "/:client_id/subscription-payments/:payment_id",
  permissionChecker([GUEST_USER]),
  deletePaymentController,
);

export default subscription;
