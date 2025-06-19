import { Router } from "express";

import {
  createPaymentController,
  deletePaymentController,
  findPaymentController,
  updatePaymentController,
} from "../../adapters/api/controllers/subscriptions/payment.controller";
import { permissionChecker } from "../../adapters/api/middlewares/permitions";
import { PermissionsValues } from "../../core/entities/users/authentication.enum";

const { GUEST_USER } = PermissionsValues;

const subscriptionPaymentRouter = Router();

// Subscription Payment
subscriptionPaymentRouter.get("/:payment_id", permissionChecker([GUEST_USER]), findPaymentController);
subscriptionPaymentRouter.post("/", permissionChecker([GUEST_USER]), createPaymentController);
subscriptionPaymentRouter.put("/:payment_id", permissionChecker([GUEST_USER]), updatePaymentController);
subscriptionPaymentRouter.delete("/:payment_id", permissionChecker([GUEST_USER]), deletePaymentController);

export default subscriptionPaymentRouter;
