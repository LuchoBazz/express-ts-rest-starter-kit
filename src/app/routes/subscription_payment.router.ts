import { Router } from "express";

import {
  createPaymentController,
  deletePaymentController,
  findPaymentController,
  updatePaymentController,
} from "../../adapters/api/controllers/subscriptions/payment.controller";
import { permissionChecker } from "../../adapters/api/middlewares/permitions";
import { PermissionsValues } from "../../core/entities/users/authentication.enum";

const { GUEST_MODE } = PermissionsValues;

const subscriptionPaymentRouter = Router();

// Subscription Payment
subscriptionPaymentRouter.get("/:payment_id", permissionChecker([GUEST_MODE]), findPaymentController);
subscriptionPaymentRouter.post("/", permissionChecker([GUEST_MODE]), createPaymentController);
subscriptionPaymentRouter.put("/:payment_id", permissionChecker([GUEST_MODE]), updatePaymentController);
subscriptionPaymentRouter.delete("/:payment_id", permissionChecker([GUEST_MODE]), deletePaymentController);

export default subscriptionPaymentRouter;
