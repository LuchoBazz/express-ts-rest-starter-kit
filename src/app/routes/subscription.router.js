"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const payment_controller_1 = require("../../adapters/api/controllers/subscriptions/payment.controller");
const subscription_controller_1 = require("../../adapters/api/controllers/subscriptions/subscription.controller");
const subscription_plan_controller_1 = require("../../adapters/api/controllers/subscriptions/subscription_plan.controller");
const permitions_1 = require("../../adapters/api/middlewares/permitions");
const authentication_enum_1 = require("../../core/entities/users/authentication.enum");
const { GUEST_USER } = authentication_enum_1.PermissionsValues;
const subscription = (0, express_1.Router)();
// Subscription
subscription.get("/:client_id", (0, permitions_1.permissionChecker)([GUEST_USER]), subscription_controller_1.findSubscriptionController);
subscription.post("/:client_id", (0, permitions_1.permissionChecker)([GUEST_USER]), subscription_controller_1.createSubscriptionController);
subscription.put("/:client_id", (0, permitions_1.permissionChecker)([GUEST_USER]), subscription_controller_1.updateSubscriptionController);
subscription.delete("/:client_id", (0, permitions_1.permissionChecker)([GUEST_USER]), subscription_controller_1.deleteSubscriptionController);
// Subscription Plan
subscription.get("/:client_id/plans/:slug", (0, permitions_1.permissionChecker)([GUEST_USER]), subscription_plan_controller_1.findSubscriptionPlanController);
subscription.post("/:client_id/plans", (0, permitions_1.permissionChecker)([GUEST_USER]), subscription_plan_controller_1.createSubscriptionPlanController);
subscription.put("/:client_id/plans/:slug", (0, permitions_1.permissionChecker)([GUEST_USER]), subscription_plan_controller_1.updateSubscriptionPlanController);
subscription.delete("/:client_id/plans/:slug", (0, permitions_1.permissionChecker)([GUEST_USER]), subscription_plan_controller_1.deleteSubscriptionPlanController);
// Subscription Payment
subscription.get("/:client_id/payment", (0, permitions_1.permissionChecker)([GUEST_USER]), payment_controller_1.findPaymentController);
subscription.post("/:client_id/payment", (0, permitions_1.permissionChecker)([GUEST_USER]), payment_controller_1.createPaymentController);
subscription.put("/:client_id/payment", (0, permitions_1.permissionChecker)([GUEST_USER]), payment_controller_1.updatePaymentController);
subscription.delete("/:client_id/payment", (0, permitions_1.permissionChecker)([GUEST_USER]), payment_controller_1.deletePaymentController);
exports.default = subscription;
