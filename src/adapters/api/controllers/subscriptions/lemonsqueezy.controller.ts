import logger from "@open-syk/common/logger";
import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

import { onSession } from "../../../../infrastructure/database/prisma";
import { HttpStatusCode } from "../../../../infrastructure/http/basics";
import { BadRequestError } from "../../errors/bad_request.error";

const log = logger("LEMON_SQUEEZY:CONTROLLER");

const unlinkedSubscriptionId = "6a6a1946-edd8-46a8-9340-9c2fa536b5a9";
const mapStoreIdToOrganizationId: Record<number, string> = {
  187083: "SYK",
};

export const lemonSqueezyController = [
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { body } = request;
      const eventName = body.meta?.event_name;
      const payload = body.data;
      const attributes = payload.attributes;

      const stringPayload = JSON.stringify({ payload: body });
      log.debug("LEMON_SQUEEZY_PAYLOAD", { stringPayload });

      if (!eventName || !payload || attributes) {
        throw new BadRequestError("BAD_REQUEST_ERROR");
      }

      const cliendId = mapStoreIdToOrganizationId[attributes.store_id];

      await onSession(async (prisma: PrismaClient) => {
        const userEmail = attributes.user_email as string;

        const user = await prisma.user.findFirst({
          where: { user_email: userEmail, user_organization_client_id: cliendId },
        });

        if (!user) {
          throw new BadRequestError("BAD_REQUEST_ERROR");
        }

        if (eventName === "order_created") {
          const externalPaymentId = attributes.first_order_item.order_id.toString();
          const amount = attributes.first_order_item.price / 100;
          const productId = attributes.first_order_item.product_id.toString();
          const currency = attributes.currency;
          const createdAt = new Date(attributes.created_at as string);

          const plan = await prisma.subscriptionPlan.findFirst({
            where: {
              subscription_plan_product_id: productId,
              subscription_plan_is_active: true,
              subscription_plan_organization_client_id: cliendId,
            },
          });

          if (!plan) {
            throw new BadRequestError("BAD_REQUEST_ERROR");
          }

          await prisma.payment.create({
            data: {
              payment_subscription_id: unlinkedSubscriptionId,
              payment_amount: amount,
              payment_currency: currency,
              payment_date: createdAt,
              payment_external_payment_id: externalPaymentId,
              payment_status: "completed",
              payment_organization_client_id: cliendId,
            },
          });
        } else if (eventName === "subscription_created") {
          const productId = attributes.product_id.toString();
          const externalPaymentId = attributes.order_id.toString();
          const externalSubscriptionId = attributes.first_subscription_item.subscription_id.toString();

          const plan = await prisma.subscriptionPlan.findFirst({
            where: {
              subscription_plan_product_id: productId,
              subscription_plan_is_active: true,
              subscription_plan_organization_client_id: cliendId,
            },
          });

          if (!plan) {
            throw new BadRequestError("BAD_REQUEST_ERROR");
          }

          const subscription = await prisma.subscription.create({
            data: {
              subscriptions_user_id: user.user_id,
              subscriptions_subscription_plan_id: plan.subscription_plan_id,
              subscriptions_external_subscription_id: externalSubscriptionId,
              subscriptions_billing_cycle: plan.subscription_plan_billing_cycle,
              subscriptions_status: "active",
              subscriptions_is_active: true,
              subscriptions_renews_at: new Date(new Date().setMonth(new Date().getMonth() + 1)),
              subscriptions_ends_at: new Date(new Date().setMonth(new Date().getMonth() + 1)),
              subscriptions_organization_client_id: cliendId,
            },
          });

          await prisma.payment.update({
            where: { payment_id: externalPaymentId },
            data: { payment_subscription_id: subscription.subscriptions_id },
          });
        }
      });
      response.status(HttpStatusCode.OK).json({});
    } catch (error) {
      next(error);
    }
  },
];
